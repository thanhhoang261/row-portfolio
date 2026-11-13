import type { Locale } from "@/lib/i18n";

export type Project = {
  slug: string;
  title: string;
  stack: string[];
  repo?: string;
  demo?: string;
  featured?: boolean;
  description: Record<Locale, string>;
};

// TODO: replace with your real projects.
export const projects: Project[] = [
  {
    slug: "row-portfolio",
    title: "row-portfolio",
    stack: ["Next.js", "MDX", "Keystatic", "Docker"],
    repo: "https://github.com/thanhhoang261/row-portfolio",
    featured: true,
    description: {
      vi: "Chính trang web này: portfolio song ngữ kèm blog MDX, quản lý bài viết qua Git, tự host bằng Docker.",
      en: "This very site: a bilingual portfolio with an MDX blog, Git-backed content and Docker self-hosting.",
    },
  },
  {
    slug: "project-two",
    title: "project-two",
    stack: ["TypeScript", "Node.js", "PostgreSQL"],
    featured: true,
    description: {
      vi: "Dự án mẫu — thay bằng mô tả dự án thật của bạn.",
      en: "Sample project — replace with a description of your real work.",
    },
  },
  {
    slug: "project-three",
    title: "project-three",
    stack: ["React", "Tailwind CSS"],
    featured: true,
    description: {
      vi: "Dự án mẫu — thay bằng mô tả dự án thật của bạn.",
      en: "Sample project — replace with a description of your real work.",
    },
  },
];
