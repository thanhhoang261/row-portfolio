import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { getDictionary } from "@/lib/dictionaries";
import { getEntries, sectionKeys } from "@/lib/sections";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/blog", "/projects", "/games", "/sports", "/favorites", "/about"];
  const entries: MetadataRoute.Sitemap = locales.flatMap((lang) =>
    pages.map((p) => ({ url: `${siteUrl}/${lang}${p}` })),
  );
  for (const lang of locales) {
    for (const post of await getPosts(lang)) {
      entries.push({
        url: `${siteUrl}/${lang}/blog/${post.slug}`,
        lastModified: post.date,
      });
    }
  }
  for (const lang of locales) {
    const t = await getDictionary(lang);
    for (const section of sectionKeys) {
      for (const item of await getEntries(section, lang, t)) {
        entries.push({
          url: `${siteUrl}/${lang}/${section}/${item.slug}`,
          lastModified: item.date || undefined,
        });
      }
    }
  }
  return entries;
}
