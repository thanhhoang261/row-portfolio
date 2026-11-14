/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/vi";

export function PostList({
  posts,
  lang,
  t,
}: {
  posts: PostMeta[];
  lang: Locale;
  t: Dictionary;
}) {
  if (posts.length === 0) {
    return <p className="font-mono text-sm text-muted">{t.blog.empty}</p>;
  }
  return (
    <ul className="grid gap-4">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/${lang}/blog/${p.slug}`}
            className="card block overflow-hidden rounded-xl"
          >
            {p.cover && (
              <img
                src={p.cover}
                alt=""
                loading="lazy"
                className="aspect-[1200/630] w-full border-b border-line object-cover"
              />
            )}
            <div className="p-5">
            <p className="font-mono text-xs text-muted">
              {formatDate(p.date, lang)} · {p.readingMinutes} {t.blog.minRead}
            </p>
            <h3 className="mt-1.5 text-lg font-semibold">{p.title}</h3>
            {p.description && (
              <p className="mt-1.5 text-sm text-muted">{p.description}</p>
            )}
            {p.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[11px] text-pink"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
