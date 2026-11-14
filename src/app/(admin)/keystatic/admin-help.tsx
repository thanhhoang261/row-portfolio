"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const SEEN_KEY = "admin-help-seen";
const repo = process.env.NEXT_PUBLIC_KEYSTATIC_REPO;

/** Copy vài màu từ theme Keystatic hiện tại (sáng/tối) để bảng hướng dẫn khớp giao diện. */
function themeVars(): Record<string, string> {
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) =>
    cs.getPropertyValue(name).trim() || fallback;
  return {
    "--adm-bg": v("--kui-color-scale-slate1", "#ffffff"),
    "--adm-fg": v("--kui-color-scale-slate11", "#24223c"),
    "--adm-muted": v("--kui-color-scale-slate10", "#4f4d6c"),
    "--adm-border": v("--kui-color-scale-slate5", "#e2e1ef"),
    "--adm-chip": v("--kui-color-scale-slate3", "#f4f3fa"),
    "--adm-accent": v("--kui-color-scale-indigo11", "#5b3fb8"),
  };
}

// "Đã xem hướng dẫn chưa" đọc từ localStorage; phía server coi như đã xem để không lệch markup.
const subscribeSeen = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};
const getSeen = () => {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return true;
  }
};

export function AdminHelp() {
  const [open, setOpen] = useState(false);
  const [vars, setVars] = useState<Record<string, string>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const seen = useSyncExternalStore(subscribeSeen, getSeen, () => true);
  const isNew = !seen;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function show() {
    setVars(themeVars());
    setOpen(true);
    try {
      localStorage.setItem(SEEN_KEY, "1");
      window.dispatchEvent(new Event("storage"));
    } catch {}
  }

  return (
    <>
      <button
        type="button"
        className={`adm-help-fab${isNew ? " is-new" : ""}`}
        onClick={show}
        aria-haspopup="dialog"
      >
        <span aria-hidden>?</span> Hướng dẫn
      </button>

      {open && (
        <>
          <div className="adm-help-backdrop" onClick={() => setOpen(false)} />
          <aside
            className="adm-help-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Hướng dẫn viết bài"
            style={vars as React.CSSProperties}
          >
            <button
              ref={closeRef}
              type="button"
              className="adm-help-close"
              onClick={() => setOpen(false)}
              aria-label="Đóng"
            >
              ×
            </button>
            <h2>Hướng dẫn viết bài</h2>
            <p>Từ lúc bấm lưu đến khi bài lên site.</p>

            <h3>Đăng một bài trong 4 bước</h3>
            <ol>
              <li>
                Ở thanh bên chọn <b>Bài viết (Tiếng Việt)</b> hoặc <b>Posts (English)</b>,
                rồi bấm <b>Add</b>.
              </li>
              <li>
                Điền <b>Tiêu đề</b>, <b>Mô tả ngắn</b>, ngày đăng. Chưa muốn đăng thì bật{" "}
                <b>Bản nháp</b>.
              </li>
              <li>
                Viết nội dung ở khung chính. Gõ <kbd>/</kbd> để chèn tiêu đề, ảnh, bảng,
                code...
              </li>
              <li>
                Bấm <b>Create</b> (bài mới) hoặc <b>Save</b> (sửa bài).
              </li>
            </ol>
            <div className="adm-help-tip">
              <b>Bấm lưu là đã xong.</b> Bài được lưu thành một commit trên GitHub; server tự
              phát hiện và build lại, nên bài lên site sau khoảng <b>1–2 phút</b>.
            </div>

            <h3>Gõ / để chèn</h3>
            <ul>
              <li><b>Callout</b>: hộp lưu ý (thông tin, mẹo, cảnh báo, nguy hiểm).</li>
              <li><b>Details</b>: nội dung thu gọn, bấm để mở.</li>
              <li><b>Ảnh có chú thích</b>: ảnh kèm dòng chú thích bên dưới.</li>
              <li><b>Video YouTube</b>: dán link, video hiện ngay trong bài.</li>
              <li><b>Code block</b>: chọn ngôn ngữ để tô màu cú pháp.</li>
              <li><b>Image / Table / Divider</b>: ảnh, bảng, đường kẻ ngang.</li>
            </ul>

            <h3>Phím tắt</h3>
            <ul>
              <li><kbd>Ctrl/⌘</kbd> + <kbd>B</kbd> in đậm, <kbd>I</kbd> in nghiêng</li>
              <li><kbd>Ctrl/⌘</kbd> + <kbd>Z</kbd> hoàn tác</li>
              <li><kbd>/</kbd> mở menu chèn</li>
            </ul>

            <h3>Mẹo</h3>
            <ul>
              <li>Bài tiếng Việt và tiếng Anh là <b>hai bài riêng</b>, viết ở hai mục khác nhau.</li>
              <li>
                Đường dẫn (slug) tự tạo từ tiêu đề và bỏ dấu. <b>Đừng đổi sau khi đã đăng</b>,
                vì link cũ sẽ hỏng.
              </li>
              <li>Ảnh bìa nên ngang, tỉ lệ <b>1200×630</b>. Ảnh lưu trong Git nên nén dưới ~500KB.</li>
              <li>Tag viết thường, không dấu cách (ví dụ <code>nextjs</code>, <code>docker</code>).</li>
              <li>
                Mục <b>Dự án</b>: thêm những thứ bạn đã làm (tên, mô tả, ảnh, link). Đánh dấu{" "}
                <b>Hiện ở trang chủ</b> để đưa lên trang chủ.
              </li>
              <li>
                Mục <b>Nội dung trang</b> sửa tên, email, link và trang Giới thiệu của site.
              </li>
            </ul>

            <h3>Liên kết</h3>
            <div className="adm-help-links">
              <a href="/vi" target="_blank" rel="noreferrer">Xem site ↗</a>
              {repo && (
                <a
                  href={`https://github.com/${repo}/commits/main`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Lịch sử lưu trên GitHub ↗
                </a>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
