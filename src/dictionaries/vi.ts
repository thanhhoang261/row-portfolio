const vi = {
  meta: {
    title: "{name} — Lập trình viên & Blog",
    description: "Portfolio và blog cá nhân của {name}: dự án, ghi chép kỹ thuật và hành trình làm nghề.",
  },
  nav: { home: "home", projects: "projects", blog: "blog", about: "about" },
  hero: {
    greeting: "Xin chào, mình là",
    role: "Lập trình viên full-stack",
    tagline:
      "Mình xây sản phẩm web, thích tối ưu trải nghiệm và hay viết lại những gì học được.",
    ctaAbout: "Về mình",
    ctaBlog: "Đọc blog",
    terminal: {
      whoami: "whoami",
      stack: "cat stack.txt",
      stackOut: "TypeScript · React · Next.js · Node.js · Docker",
      status: "git status",
      statusOut: "đang mở cho các dự án thú vị ✨",
    },
  },
  sections: {
    about: "Vài dòng về mình",
    latest: "Bài viết mới",
    all: "Xem tất cả",
    more: "Đọc tiếp",
  },
  projects: {
    title: "Dự án",
    description: "Một vài thứ mình đã xây dựng.",
    code: "Mã nguồn",
    demo: "Demo",
  },
  blog: {
    title: "Blog",
    description: "Ghi chép kỹ thuật, bài học và suy nghĩ.",
    empty: "Chưa có bài viết nào.",
    back: "Tất cả bài viết",
    minRead: "phút đọc",
    updated: "cập nhật",
    rss: "Đăng ký RSS",
  },
  about: {
    title: "Giới thiệu",
    description: "Mình là ai và mình làm gì.",
    paragraphs: [
      "Mình là lập trình viên thích biến ý tưởng thành sản phẩm chạy được. Mình làm việc xuyên suốt từ giao diện đến hạ tầng, và tin rằng chi tiết nhỏ tạo nên trải nghiệm tốt.",
      "Ngoài giờ code, mình viết blog để hệ thống lại kiến thức và chia sẻ với mọi người. Nếu bạn muốn trao đổi hoặc hợp tác, cứ liên hệ nhé.",
    ],
    skills: "Kỹ năng",
    contact: "Liên hệ",
  },
  footer: { built: "Xây bằng Next.js, tự host trên server riêng." },
  notFound: { title: "404 — không tìm thấy", back: "Về trang chủ" },
};

export default vi;
export type Dictionary = typeof vi;
