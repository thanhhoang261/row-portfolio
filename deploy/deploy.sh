#!/usr/bin/env bash
# Tự deploy kiểu pull: chạy mỗi phút bằng cron trên server.
# Có commit mới trên origin/main -> pull -> build lại container `app`.
# Server chỉ kết nối đi ra GitHub, không cần IP public, không cần secret nào.
#
# Nếu build lỗi: container cũ giữ nguyên chạy, commit lỗi bị đánh dấu và không build lại
# liên tục (xóa file $STATE_DIR/failed hoặc push commit mới để thử lại).
set -uo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_DIR="${DEPLOY_STATE_DIR:-$HOME/.local/state/row-portfolio}"
LOG="$STATE_DIR/deploy.log"
mkdir -p "$STATE_DIR"

# Chỉ cho một lần chạy tại một thời điểm.
exec 9>"$STATE_DIR/lock"
flock -n 9 || exit 0

# Giữ log dưới ~1MB.
if [ -f "$LOG" ] && [ "$(stat -c %s "$LOG")" -gt 1048576 ]; then : > "$LOG"; fi
exec >>"$LOG" 2>&1

cd "$REPO_DIR" || exit 1
log() { echo "[$(date -Is)] $*"; }

if ! git fetch --quiet origin main; then
  log "git fetch lỗi (mạng?), bỏ qua lượt này"
  exit 0
fi

remote="$(git rev-parse origin/main)"
deployed="$(cat "$STATE_DIR/deployed" 2>/dev/null || true)"
failed="$(cat "$STATE_DIR/failed" 2>/dev/null || true)"

[ "$remote" = "$deployed" ] && exit 0
[ "$remote" = "$failed" ] && exit 0

log "deploy ${deployed:0:7} -> ${remote:0:7}"

if ! git merge --ff-only origin/main; then
  log "LỖI: không fast-forward được (server có commit local?)"
  echo "$remote" > "$STATE_DIR/failed"
  exit 1
fi

if docker compose up -d --build app; then
  echo "$remote" > "$STATE_DIR/deployed"
  rm -f "$STATE_DIR/failed"
  docker image prune -f >/dev/null 2>&1 || true
  log "OK: đang chạy ${remote:0:7}"
else
  echo "$remote" > "$STATE_DIR/failed"
  log "LỖI build/chạy ${remote:0:7}; container cũ giữ nguyên"
  exit 1
fi
