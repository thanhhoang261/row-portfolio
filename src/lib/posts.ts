import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";
import type { Locale } from "./i18n";

const reader = createReader(process.cwd(), config);

const collectionFor = (lang: Locale) =>
  lang === "vi" ? reader.collections.postsVi : reader.collections.postsEn;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
};

const readingMinutes = (text: string) =>
  Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));

export async function getPosts(lang: Locale): Promise<PostMeta[]> {
  const entries = await collectionFor(lang).all();
  const posts = await Promise.all(
    entries
      .filter(({ entry }) => !entry.draft)
      .map(async ({ slug, entry }) => ({
        slug,
        title: entry.title,
        description: entry.description,
        date: entry.date ?? "",
        tags: [...entry.tags],
        readingMinutes: readingMinutes(await entry.content()),
      })),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(lang: Locale, slug: string) {
  const entry = await collectionFor(lang).read(slug);
  if (!entry || entry.draft) return null;
  const content = await entry.content();
  return {
    meta: {
      slug,
      title: entry.title,
      description: entry.description,
      date: entry.date ?? "",
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
