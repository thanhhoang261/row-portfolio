const vi = {
  meta: {
    title: "{name} — Kỹ sư phần mềm",
    description: "Trang giới thiệu và blog cá nhân của {name}.",
  },
  nav: { home: "home", blog: "blog", about: "about" },
  hero: {
    greeting: "Xin chào, mình là",
    role: "Kỹ sư phần mềm",
    tagline:
      "Mình viết blog để ghi lại những điều học được và chia sẻ với mọi người.",
    ctaAbout: "Về mình",
    ctaBlog: "Đọc blog",
    terminal: {
      whoami: "whoami",
      blog: "cat blog.txt",
      blogOut: "ghi chép, bài học và suy nghĩ",
      status: "status",
      statusOut: "luôn sẵn lòng trò chuyện ✨",
    },
  },
  sections: {
    about: "Vài dòng về mình",
    latest: "Bài viết mới",
    all: "Xem tất cả",
    more: "Đọc tiếp",
  },
  blog: {
    title: "Blog",
    description: "Ghi chép, bài học và suy nghĩ.",
    empty: "Chưa có bài viết nào.",
    back: "Tất cả bài viết",
    minRead: "phút đọc",
    updated: "cập nhật",
    rss: "Đăng ký RSS",
  },
  about: {
    title: "Giới thiệu",
    description: "Mình là ai.",
    paragraphs: [
      "Mình là kỹ sư phần mềm.",
      "Ngoài công việc, mình viết blog để ghi lại những điều học được và chia sẻ với mọi người. Nếu bạn muốn trao đổi, cứ liên hệ nhé.",
    ],
    contact: "Liên hệ",
  },
  notFound: { title: "404 — không tìm thấy", back: "Về trang chủ" },
};

export default vi;
export type Dictionary = typeof vi;
