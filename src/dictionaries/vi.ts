const vi = {
  meta: {
    title: "{name} — Kỹ sư phần mềm",
    description: "Trang giới thiệu và blog cá nhân của {name}.",
  },
  nav: {
    home: "home",
    blog: "blog",
    projects: "projects",
    games: "games",
    sports: "sports",
    favorites: "favorites",
    about: "about",
  },
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
    projects: "Những thứ mình đã làm",
    latest: "Bài viết mới",
    all: "Xem tất cả",
    more: "Đọc tiếp",
  },
  projects: {
    title: "Dự án",
    description: "Một vài thứ mình đã làm.",
    empty: "Chưa có dự án nào, sẽ cập nhật sớm.",
    visit: "Xem",
  },
  interests: {
    games: {
      title: "Game mình chơi",
      description: "Những tựa game mình đã và đang chơi, kèm vài suy nghĩ.",
      empty: "Chưa có game nào, sẽ cập nhật sớm.",
    },
    sports: {
      title: "Thể thao",
      description: "Những môn thể thao mình chơi.",
      empty: "Chưa có môn nào, sẽ cập nhật sớm.",
    },
    favorites: {
      title: "Tác phẩm yêu thích",
      description: "Phim, sách, nhạc... mình thích, và vì sao.",
      empty: "Chưa có tác phẩm nào, sẽ cập nhật sớm.",
    },
    back: "Quay lại",
    thoughts: "Suy nghĩ của mình",
    ratingLabel: "Điểm",
    since: "Từ",
    status: {
      playing: "Đang chơi",
      finished: "Đã chơi xong",
      paused: "Tạm dừng",
    },
    level: {
      casual: "Chơi cho vui",
      regular: "Chơi đều đặn",
      competitive: "Thi đấu",
      former: "Đã từng chơi",
    },
    kind: {
      film: "Phim",
      series: "Series",
      book: "Sách",
      music: "Nhạc",
      anime: "Anime / Manga",
      podcast: "Podcast",
      other: "Khác",
    },
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
