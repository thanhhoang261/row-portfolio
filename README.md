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

Điều kiện: server có Docker + Compose, domain đã trỏ A record về server, mở cổng 80/443.

1. **Tạo GitHub App cho Keystatic** (để editor trên web commit vào repo):
   chạy local `NEXT_PUBLIC_KEYSTATIC_STORAGE=github NEXT_PUBLIC_KEYSTATIC_REPO=<user>/<repo> npm run dev`,
   vào `/keystatic`, làm theo hướng dẫn tạo GitHub App; nó ghi ra file `.env` chứa
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`.
   Sau đó thêm callback URL production của App: `https://<domain>/api/keystatic/github/oauth/callback`.
2. **Trên server:** `git clone` repo, `cp .env.example .env`, điền `DOMAIN`, repo và 3 khóa ở trên.
3. `docker compose up -d --build` → Caddy tự cấp HTTPS.
4. **Tự deploy khi push:** thêm secrets cho GitHub Actions: `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `DEPLOY_PATH`
   (workflow `.github/workflows/deploy.yml`).

Luồng viết bài: `https://<domain>/keystatic` → đăng nhập GitHub → Save → commit lên `main` → Actions build lại → bài lên sau ~1–2 phút.

> Admin `/keystatic` bị chặn (404) ở production nếu `NEXT_PUBLIC_KEYSTATIC_STORAGE` khác `github`, để tránh lộ editor không cần đăng nhập.
> Chỉ tài khoản GitHub có quyền ghi vào repo mới sửa được bài.
