# row-portfolio

Song ngữ (vi/en) portfolio + blog. Next.js · Tailwind v4 · MDX · Keystatic (viết bài trên web, lưu vào Git) · Docker + Caddy.

## Chạy local

```bash
npm install
npm run dev        # http://localhost:3000
```

- Viết bài: mở `http://localhost:3000/keystatic` (chế độ local, ghi thẳng file vào `content/posts/{vi,en}/*.mdx`).
- Chỉnh thông tin cá nhân: `src/data/site.ts`, dự án: `src/data/projects.ts`, chữ trên site: `src/dictionaries/{vi,en}.ts`.

## Cấu trúc

```
content/posts/vi|en/*.mdx   bài viết (mỗi ngôn ngữ một thư mục)
src/app/(site)/[lang]/…     trang công khai, route theo /vi và /en
src/app/(admin)/…           Keystatic (/keystatic) + API
src/proxy.ts                tự chuyển / → /vi hoặc /en theo Accept-Language
keystatic.config.ts         schema bài viết
```

## Deploy lên server riêng

Điều kiện: server có Docker + Compose. Có IP public thì trỏ A record và dùng Caddy (mở cổng 80/443); không có thì dùng Cloudflare Tunnel (xem ghi chú bên dưới).

1. **Tạo GitHub App cho Keystatic** (để editor trên web commit vào repo):
   chạy local `NEXT_PUBLIC_KEYSTATIC_STORAGE=github NEXT_PUBLIC_KEYSTATIC_REPO=<user>/<repo> npm run dev`,
   vào `/keystatic`, làm theo hướng dẫn tạo GitHub App; nó ghi ra file `.env` (ở thư mục gốc) chứa
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
   Sau đó thêm callback URL production của App: `https://<domain>/api/keystatic/github/oauth/callback`.
2. **Trên server:** `git clone` repo, `cp .env.example .env`, điền `DOMAIN`, repo và 3 khóa ở trên.
3. `docker compose up -d --build` → Caddy tự cấp HTTPS.
4. **Tự deploy khi có commit mới (pull-based, không cần IP public):** server tự kiểm tra GitHub mỗi phút.
   Thêm vào crontab của user chạy Docker (`crontab -e`):
   ```
   * * * * * PATH=/usr/local/bin:/usr/bin:/bin /home/<user>/row-portfolio/deploy/deploy.sh
   ```
   Log: `~/.local/state/row-portfolio/deploy.log`. Build lỗi thì container cũ vẫn chạy; commit lỗi không bị build lại
   liên tục (xóa `~/.local/state/row-portfolio/failed` để thử lại).

Luồng viết bài: `https://<domain>/keystatic` → đăng nhập GitHub → Save → commit lên `main` → server tự phát hiện và build lại → bài lên sau ~1–3 phút.

> Server không có IP public: dùng Cloudflare Tunnel trỏ `<domain>` tới `http://localhost:<cổng>` và mở cổng app bằng
> `docker-compose.override.yml` (chỉ trên server, không commit), ví dụ `ports: ["5175:3000"]`; luôn chạy `docker compose up -d app` (không bật Caddy).

> Admin `/keystatic` bị chặn (404) ở production nếu `NEXT_PUBLIC_KEYSTATIC_STORAGE` khác `github`, để tránh lộ editor không cần đăng nhập.
> Chỉ tài khoản GitHub có quyền ghi vào repo mới sửa được bài.
