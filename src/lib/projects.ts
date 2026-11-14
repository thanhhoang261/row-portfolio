import { reader } from "./reader";
import type { Locale } from "./i18n";

export type ProjectItem = {
  slug: string;
  name: string;
  summary: string;
  url: string | null;
  cover: string | null;
  date: string;
  featured: boolean;
};

// Đọc từng dự án trong try/catch: một mục lỗi chỉ bị bỏ qua, không làm hỏng cả bản build.
export async function getProjects(lang: Locale): Promise<ProjectItem[]> {
  const col = reader.collections.projects;
  const slugs = await col.list();
  const items = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const e = await col.read(slug);
        if (!e || e.hidden) return null;
        const summary =
          (lang === "vi" ? e.summaryVi : e.summaryEn).trim() ||
          (lang === "vi" ? e.summaryEn : e.summaryVi).trim();
        return {
          slug,
          name: e.name,
          summary,
          url: e.url || null,
          cover: e.cover ?? null,
          date: e.date ?? "",
          featured: e.featured,
        } satisfies ProjectItem;
      } catch (error) {
        console.warn(
          `[projects] Bỏ qua "${slug}": ${error instanceof Error ? error.message : error}`,
        );
        return null;
      }
    }),
  );
  return items
    .filter((p): p is ProjectItem => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}
