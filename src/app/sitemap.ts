import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/projects", "/blog", "/about"];
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
  return entries;
}
