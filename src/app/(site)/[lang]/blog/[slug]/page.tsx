import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { Mdx } from "@/components/mdx";


export const dynamicParams = false;

export async function generateStaticParams() {
  const all = await Promise.all(
    locales.map(async (lang) =>
      (await getPosts(lang)).map((p) => ({ lang, slug: p.slug })),
    ),
  );
  return all.flat();
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = await getPost(lang, slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      publishedTime: post.meta.date,
      modifiedTime: post.meta.updated ?? undefined,
      tags: post.meta.tags,
      images: post.meta.cover ? [post.meta.cover] : undefined,
    },
  };
}

export default async function Post({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = await getPost(lang, slug);
  if (!post) notFound();
  const t = await getDictionary(lang);
  const { meta, content } = post;

  return (
    <article className="mx-auto max-w-2xl py-14">
      <Link
        href={`/${lang}/blog`}
        className="font-mono text-xs text-muted hover:text-cyan"
      >
        ← {t.blog.back}
      </Link>
      <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
        {meta.title}
      </h1>
      <p className="mt-3 font-mono text-xs text-muted">
        {formatDate(meta.date, lang)} · {meta.readingMinutes} {t.blog.minRead}
        {meta.updated && meta.updated !== meta.date && (
          <> · {t.blog.updated} {formatDate(meta.updated, lang)}</>
        )}
        {meta.tags.map((tag) => (
          <span key={tag} className="ml-3 text-pink">
            #{tag}
          </span>
        ))}
      </p>
      {meta.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meta.cover}
          alt=""
          className="mt-8 aspect-[1200/630] w-full rounded-xl border border-line object-cover"
        />
      )}
      <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert prose-img:rounded-xl prose-img:border prose-img:border-line prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-cyan prose-a:no-underline hover:prose-a:underline">
        <Mdx source={content} />
      </div>
    </article>
  );
}
