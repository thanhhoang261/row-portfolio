import { config, collection, singleton, fields } from "@keystatic/core";
import { block, wrapper } from "@keystatic/core/content-components";

const repo = (process.env.NEXT_PUBLIC_KEYSTATIC_REPO ??
  "your-github-user/row-portfolio") as `${string}/${string}`;

/** "Xin chào, Việt Nam!" -> "xin-chao-viet-nam" (slug ASCII từ tiêu đề tiếng Việt) */
const slugify = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const IMAGE_DIR = "public/images/posts";
const IMAGE_PATH = "/images/posts/";
const sanitizeFilename = (name: string) => {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot).toLowerCase() : "";
  return `${slugify(base) || "image"}${ext}`;
};

// ---- Component dùng được trong bài viết (Insert → ...) -------------------------------
const calloutTones = {
  info: { bg: "#e8f1ff", bar: "#3b82f6" },
  tip: { bg: "#e7f8ee", bar: "#22a559" },
  warning: { bg: "#fff6e0", bar: "#e0a100" },
  danger: { bg: "#ffeaea", bar: "#e03131" },
} as const;

const components = {
  Callout: wrapper({
    label: "Callout (hộp lưu ý)",
    description: "Hộp nổi bật: thông tin, mẹo, cảnh báo, nguy hiểm",
    schema: {
      type: fields.select({
        label: "Loại",
        defaultValue: "info",
        options: [
          { label: "Thông tin", value: "info" },
          { label: "Mẹo", value: "tip" },
          { label: "Cảnh báo", value: "warning" },
          { label: "Nguy hiểm", value: "danger" },
        ],
      }),
      title: fields.text({ label: "Tiêu đề (không bắt buộc)" }),
    },
    ContentView: ({ value, children }) => {
      const tone = calloutTones[value.type];
      return (
        <div
          style={{
            background: tone.bg,
            borderLeft: `4px solid ${tone.bar}`,
            borderRadius: 8,
            padding: "8px 14px",
          }}
        >
          {value.title ? <strong>{value.title}</strong> : null}
          {children}
        </div>
      );
    },
  }),

  Details: wrapper({
    label: "Details (nội dung thu gọn)",
    description: "Khối bấm để mở/đóng, hợp cho phần giải thích dài hoặc spoiler",
    schema: {
      summary: fields.text({
        label: "Dòng tiêu đề",
        validation: { isRequired: true },
      }),
    },
    ContentView: ({ value, children }) => (
      <div style={{ border: "1px dashed #999", borderRadius: 8, padding: "8px 14px" }}>
        <strong>▸ {value.summary}</strong>
        {children}
      </div>
    ),
  }),

  Figure: block({
    label: "Ảnh có chú thích",
    description: "Ảnh kèm chú thích bên dưới",
    schema: {
      src: fields.image({
        label: "Ảnh",
        directory: IMAGE_DIR,
        publicPath: IMAGE_PATH,
        validation: { isRequired: true },
      }),
      alt: fields.text({
        label: "Mô tả ảnh (alt, cho người dùng đọc màn hình và SEO)",
      }),
      caption: fields.text({ label: "Chú thích hiển thị bên dưới" }),
    },
    ContentView: ({ value }) => (
      <div style={{ textAlign: "center", opacity: 0.8 }}>
        🖼 {value.caption || value.alt || "Ảnh"}
      </div>
    ),
  }),

  YouTube: block({
    label: "Video YouTube",
    description: "Nhúng video YouTube bằng đường link",
    schema: {
      url: fields.url({
        label: "Link YouTube",
        description: "Ví dụ: https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        validation: { isRequired: true },
      }),
      title: fields.text({ label: "Tiêu đề video (cho trình đọc màn hình)" }),
    },
    ContentView: ({ value }) => (
      <div style={{ textAlign: "center", opacity: 0.8 }}>▶ YouTube: {value.url}</div>
    ),
  }),
};

const editorOptions = {
  bold: true,
  italic: true,
  strikethrough: true,
  code: true,
  heading: [2, 3, 4] as (2 | 3 | 4)[],
  blockquote: true,
  orderedList: true,
  unorderedList: true,
  table: true,
  link: true,
  divider: true,
  codeBlock: true,
  image: {
    directory: IMAGE_DIR,
    publicPath: IMAGE_PATH,
    transformFilename: sanitizeFilename,
  },
};

// ---- Trường dùng chung cho bài viết ---------------------------------------------------
const postFields = {
  title: fields.slug({
    name: {
      label: "Tiêu đề / Title",
      validation: { isRequired: true, length: { max: 120 } },
    },
    slug: {
      label: "Đường dẫn (slug)",
      description: "Tự tạo từ tiêu đề, bỏ dấu tiếng Việt. Có thể sửa trước khi lưu lần đầu.",
      generate: slugify,
    },
  }),
  description: fields.text({
    label: "Mô tả ngắn / Description",
    description: "Hiện ở danh sách bài, kết quả tìm kiếm và khi chia sẻ link (nên 100–160 ký tự).",
    multiline: true,
    validation: { length: { max: 300 } },
  }),
  date: fields.date({
    label: "Ngày đăng / Date",
    defaultValue: { kind: "today" },
    validation: { isRequired: true },
  }),
  updated: fields.date({
    label: "Ngày cập nhật / Updated (không bắt buộc)",
  }),
  cover: fields.image({
    label: "Ảnh bìa / Cover (không bắt buộc)",
    description: "Hiện đầu bài, ở danh sách và khi chia sẻ link. Tỉ lệ ngang 1200×630 là đẹp nhất.",
    directory: "public/images/covers",
    publicPath: "/images/covers/",
  }),
  tags: fields.array(fields.text({ label: "Tag" }), {
    label: "Tags",
    description: "Viết thường, không dấu cách thì dễ nhìn hơn (ví dụ: nextjs, docker).",
    itemLabel: (props) => props.value,
  }),
  draft: fields.checkbox({
    label: "Bản nháp / Draft",
    description: "Bật thì bài không hiện trên site. Tắt khi muốn đăng.",
    defaultValue: false,
  }),
  content: fields.mdx({
    label: "Nội dung / Content",
    options: editorOptions,
    components,
  }),
};

// ---- Các mục "sở thích": game, thể thao, tác phẩm yêu thích -------------------------
const nameField = (label: string) =>
  fields.slug({
    name: { label, validation: { isRequired: true, length: { max: 100 } } },
    slug: { label: "Mã (slug)", generate: slugify },
  });
const summaryVi = () =>
  fields.text({
    label: "Giới thiệu ngắn (VI)",
    description: "1–2 câu, hiện ở danh sách.",
    multiline: true,
    validation: { length: { max: 300 } },
  });
const summaryEn = () =>
  fields.text({
    label: "Short intro (EN, không bắt buộc)",
    description: "Để trống thì trang tiếng Anh dùng bản tiếng Việt.",
    multiline: true,
    validation: { length: { max: 300 } },
  });
const thoughtsEn = () =>
  fields.text({
    label: "Suy nghĩ bản tiếng Anh (EN, không bắt buộc)",
    description:
      "Văn bản thường, cách đoạn bằng một dòng trống. Để trống thì trang tiếng Anh dùng phần viết ở khung chính.",
    multiline: true,
  });
const rating = () =>
  fields.integer({
    label: "Điểm / Rating (1–5, không bắt buộc)",
    validation: { min: 1, max: 5 },
  });
const addedDate = () =>
  fields.date({
    label: "Ngày thêm / Date",
    description: "Dùng để sắp xếp, mới nhất lên đầu.",
    defaultValue: { kind: "today" },
    validation: { isRequired: true },
  });
const hiddenField = () =>
  fields.checkbox({
    label: "Ẩn khỏi site",
    description: "Bật thì mục này không hiện ở đâu cả.",
    defaultValue: false,
  });
const coverFor = (dir: string) =>
  fields.image({
    label: "Ảnh / Image (không bắt buộc)",
    description: "Ảnh ngang, tỉ lệ 1200×630 là đẹp nhất. Nên nén dưới ~500KB.",
    directory: `public/images/${dir}`,
    publicPath: `/images/${dir}/`,
  });
const thoughts = () =>
  fields.mdx({
    label: "Suy nghĩ của mình",
    options: editorOptions,
    components,
  });

export default config({
  // GitHub mode (commit qua GitHub App) khi NEXT_PUBLIC_KEYSTATIC_STORAGE=github,
  // ngược lại là local mode (ghi thẳng file, chỉ dùng khi dev).
  storage:
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
      ? { kind: "github", repo }
      : { kind: "local" },

  ui: {
    brand: {
      name: "Row · Blog",
      mark: ({ colorScheme }) => (
        <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
          <rect
            width="26"
            height="26"
            rx="7"
            fill={colorScheme === "dark" ? "#1b1f33" : "#14142b"}
          />
          <text
            x="13"
            y="17.5"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="12"
            fontWeight="700"
            fill="#22d3ee"
          >
            ~/
          </text>
        </svg>
      ),
    },
    navigation: {
      "Bài viết": ["postsVi", "postsEn"],
      "Dự án": ["projects"],
      "Sở thích": ["games", "sports", "favorites"],
      "Nội dung trang": ["profile", "aboutVi", "aboutEn"],
    },
  },

  collections: {
    postsVi: collection({
      label: "Bài viết (Tiếng Việt)",
      slugField: "title",
      path: "content/posts/vi/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["date", "draft"],
      previewUrl: "/vi/blog/{slug}",
      schema: postFields,
    }),
    postsEn: collection({
      label: "Posts (English)",
      slugField: "title",
      path: "content/posts/en/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["date", "draft"],
      previewUrl: "/en/blog/{slug}",
      schema: postFields,
    }),

    games: collection({
      label: "Game mình chơi",
      slugField: "name",
      path: "content/games/*",
      format: { contentField: "thoughts" },
      entryLayout: "content",
      columns: ["date", "status", "hidden"],
      previewUrl: "/vi/games/{slug}",
      schema: {
        name: nameField("Tên game / Name"),
        platform: fields.text({
          label: "Nền tảng / Platform",
          description: "Ví dụ: PC, PS5, Switch, điện thoại.",
        }),
        status: fields.select({
          label: "Trạng thái",
          defaultValue: "playing",
          options: [
            { label: "Đang chơi", value: "playing" },
            { label: "Đã chơi xong", value: "finished" },
            { label: "Tạm dừng", value: "paused" },
          ],
        }),
        rating: rating(),
        cover: coverFor("games"),
        summaryVi: summaryVi(),
        summaryEn: summaryEn(),
        date: addedDate(),
        hidden: hiddenField(),
        thoughtsEn: thoughtsEn(),
        thoughts: thoughts(),
      },
    }),

    sports: collection({
      label: "Thể thao",
      slugField: "name",
      path: "content/sports/*",
      format: { contentField: "thoughts" },
      entryLayout: "content",
      columns: ["date", "level", "hidden"],
      previewUrl: "/vi/sports/{slug}",
      schema: {
        name: nameField("Tên môn / Name"),
        level: fields.select({
          label: "Mức độ chơi",
          defaultValue: "regular",
          options: [
            { label: "Chơi cho vui", value: "casual" },
            { label: "Chơi đều đặn", value: "regular" },
            { label: "Thi đấu", value: "competitive" },
            { label: "Đã từng chơi", value: "former" },
          ],
        }),
        since: fields.text({
          label: "Chơi từ khi nào",
          description: "Ví dụ: 2015, hoặc hồi cấp 3.",
        }),
        frequency: fields.text({
          label: "Tần suất",
          description: "Ví dụ: 2 buổi mỗi tuần.",
        }),
        cover: coverFor("sports"),
        summaryVi: summaryVi(),
        summaryEn: summaryEn(),
        date: addedDate(),
        hidden: hiddenField(),
        thoughtsEn: thoughtsEn(),
        thoughts: thoughts(),
      },
    }),

    favorites: collection({
      label: "Tác phẩm yêu thích",
      slugField: "name",
      path: "content/favorites/*",
      format: { contentField: "thoughts" },
      entryLayout: "content",
      columns: ["date", "kind", "hidden"],
      previewUrl: "/vi/favorites/{slug}",
      schema: {
        name: nameField("Tên tác phẩm / Title"),
        kind: fields.select({
          label: "Loại",
          defaultValue: "film",
          options: [
            { label: "Phim", value: "film" },
            { label: "Series", value: "series" },
            { label: "Sách", value: "book" },
            { label: "Nhạc", value: "music" },
            { label: "Anime / Manga", value: "anime" },
            { label: "Podcast", value: "podcast" },
            { label: "Khác", value: "other" },
          ],
        }),
        creator: fields.text({
          label: "Tác giả / Đạo diễn / Nghệ sĩ",
        }),
        year: fields.text({ label: "Năm phát hành" }),
        rating: rating(),
        cover: coverFor("favorites"),
        summaryVi: summaryVi(),
        summaryEn: summaryEn(),
        date: addedDate(),
        hidden: hiddenField(),
        thoughtsEn: thoughtsEn(),
        thoughts: thoughts(),
      },
    }),

    projects: collection({
      label: "Dự án / Projects",
      slugField: "name",
      path: "content/projects/*",
      columns: ["date", "featured", "hidden"],
      previewUrl: "/vi/projects",
      schema: {
        name: fields.slug({
          name: {
            label: "Tên dự án / Name",
            validation: { isRequired: true, length: { max: 80 } },
          },
          slug: { label: "Mã (slug)", generate: slugify },
        }),
        summaryVi: fields.text({
          label: "Mô tả ngắn (VI)",
          description: "1–3 câu: đây là gì, bạn làm gì trong đó.",
          multiline: true,
          validation: { length: { max: 400 } },
        }),
        summaryEn: fields.text({
          label: "Short description (EN)",
          description: "Nếu để trống, site sẽ dùng bản tiếng Việt.",
          multiline: true,
          validation: { length: { max: 400 } },
        }),
        url: fields.url({
          label: "Liên kết / Link (không bắt buộc)",
          description: "Trang giới thiệu, bài viết, hoặc nơi xem dự án. Có link thì cả thẻ bấm được.",
        }),
        cover: fields.image({
          label: "Ảnh minh hoạ / Image (không bắt buộc)",
          description: "Ảnh ngang, tỉ lệ 1200×630 là đẹp nhất. Nên nén dưới ~500KB.",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        date: fields.date({
          label: "Ngày / Date",
          description: "Dùng để sắp xếp (mới nhất lên đầu) và hiện năm trên thẻ.",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        featured: fields.checkbox({
          label: "Hiện ở trang chủ",
          description: "Tối đa 3 dự án mới nhất được đánh dấu sẽ hiện ở trang chủ.",
          defaultValue: false,
        }),
        hidden: fields.checkbox({
          label: "Ẩn khỏi site",
          description: "Bật thì dự án không hiện ở đâu cả (giống bản nháp).",
          defaultValue: false,
        }),
      },
    }),
  },

  singletons: {
    profile: singleton({
      label: "Thông tin cá nhân / Profile",
      path: "content/profile",
      schema: {
        name: fields.text({
          label: "Tên hiển thị / Display name",
          validation: { isRequired: true },
        }),
        email: fields.text({
          label: "Email liên hệ / Contact email",
          description: "Nên dùng email riêng cho site để tránh spam. Để trống thì không hiện mục Liên hệ.",
        }),
        github: fields.url({ label: "GitHub URL" }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
        x: fields.url({ label: "X (Twitter) URL" }),
        roleVi: fields.text({ label: "Vai trò (VI)", description: "Ví dụ: Kỹ sư phần mềm" }),
        taglineVi: fields.text({ label: "Giới thiệu ngắn trang chủ (VI)", multiline: true }),
        roleEn: fields.text({ label: "Role (EN)", description: "e.g. Software engineer" }),
        taglineEn: fields.text({ label: "Home tagline (EN)", multiline: true }),
      },
    }),
    aboutVi: singleton({
      label: "Trang Giới thiệu (VI)",
      path: "content/pages/about-vi",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        content: fields.mdx({
          label: "Nội dung",
          options: { heading: [2, 3], image: { directory: IMAGE_DIR, publicPath: IMAGE_PATH, transformFilename: sanitizeFilename } },
          components,
        }),
      },
    }),
    aboutEn: singleton({
      label: "About page (EN)",
      path: "content/pages/about-en",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        content: fields.mdx({
          label: "Content",
          options: { heading: [2, 3], image: { directory: IMAGE_DIR, publicPath: IMAGE_PATH, transformFilename: sanitizeFilename } },
          components,
        }),
      },
    }),
  },
});
