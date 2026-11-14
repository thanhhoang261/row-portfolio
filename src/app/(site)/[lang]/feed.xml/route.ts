import { hasLocale, locales, siteUrl } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getPosts } from "@/lib/posts";
import { fillName, getProfile } from "@/lib/profile";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET(
  _req: Request,
  ctx: RouteContext<"/[lang]/feed.xml">,
) {
  const { lang } = await ctx.params;
  if (!hasLocale(lang)) return new Response("Not found", { status: 404 });
  const t = await getDictionary(lang);
  const posts = await getPosts(lang);
  const { name } = await getProfile(lang, t);

  const items = posts
    .map(
      (p) => `<item>
<title>${esc(p.title)}</title>
<link>${siteUrl}/${lang}/blog/${p.slug}</link>
<guid>${siteUrl}/${lang}/blog/${p.slug}</guid>
<pubDate>${new Date(p.date).toUTCString()}</pubDate>
<description>${esc(p.description)}</description>
</item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(fillName(t.meta.title, name))}</title>
<link>${siteUrl}/${lang}</link>
<description>${esc(fillName(t.meta.description, name))}</description>
<language>${lang}</language>
${items}
</channel></rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
