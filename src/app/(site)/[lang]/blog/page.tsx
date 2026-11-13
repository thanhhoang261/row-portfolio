import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return { title: t.blog.title, description: t.blog.description };
}

export default async function Blog({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const posts = await getPosts(lang);

  return (
    <section className="py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-mono text-3xl font-bold">
            <span className="gradient-text">{t.blog.title}</span>
          </h1>
          <p className="mt-2 text-muted">{t.blog.description}</p>
        </div>
        <Link
          href={`/${lang}/feed.xml`}
          className="font-mono text-xs text-muted hover:text-cyan"
        >
          {t.blog.rss}
        </Link>
      </div>
      <div className="mt-8">
        <PostList posts={posts} lang={lang} t={t} />
      </div>
    </section>
  );
}
