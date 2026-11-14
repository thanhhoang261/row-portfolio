import { reader } from "./reader";
import type { Locale } from "./i18n";

const collectionFor = (lang: Locale) =>
  lang === "vi" ? reader.collections.postsVi : reader.collections.postsEn;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string | null;
  cover: string | null;
  tags: string[];
  readingMinutes: number;
};

const readingMinutes = (text: string) =>
  Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));

// Đọc từng bài trong try/catch: một bài lỗi (thiếu tiêu đề, sai định dạng...) chỉ bị bỏ qua
// và ghi cảnh báo, không làm hỏng cả bản build của site.
async function readEntry(lang: Locale, slug: string) {
  try {
    return await collectionFor(lang).read(slug);
  } catch (error) {
    console.warn(
      `[posts] Bỏ qua bài "${slug}" (${lang}): ${error instanceof Error ? error.message : error}`,
    );
    return null;
  }
}

export async function getPosts(lang: Locale): Promise<PostMeta[]> {
  const slugs = await collectionFor(lang).list();
  const entries = (
    await Promise.all(
      slugs.map(async (slug) => ({ slug, entry: await readEntry(lang, slug) })),
    )
  ).filter(
    (item): item is { slug: string; entry: NonNullable<typeof item.entry> } =>
      item.entry !== null,
  );
  const posts = await Promise.all(
    entries
      .filter(({ entry }) => !entry.draft)
      .map(async ({ slug, entry }) => ({
        slug,
        title: entry.title,
        description: entry.description,
        date: entry.date ?? "",
        updated: entry.updated ?? null,
        cover: entry.cover ?? null,
        tags: [...entry.tags],
        readingMinutes: readingMinutes(await entry.content()),
      })),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(lang: Locale, slug: string) {
  const entry = await readEntry(lang, slug);
  if (!entry || entry.draft) return null;
  const content = await entry.content();
  return {
    meta: {
      slug,
      title: entry.title,
      description: entry.description,
      date: entry.date ?? "",
      updated: entry.updated ?? null,
      cover: entry.cover ?? null,
      tags: [...entry.tags],
      readingMinutes: readingMinutes(content),
    } satisfies PostMeta,
    content,
  };
}

export const formatDate = (date: string, lang: Locale) =>
  new Intl.DateTimeFormat(lang === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
