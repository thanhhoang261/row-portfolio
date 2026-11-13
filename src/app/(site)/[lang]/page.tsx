import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getPosts } from "@/lib/posts";
import { Terminal } from "@/components/terminal";
import { PostList } from "@/components/post-list";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const posts = (await getPosts(lang)).slice(0, 5);

  return (
    <>
      <section className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-mono text-sm text-cyan">
            <span className="text-lime">$</span> {t.hero.greeting}
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
            <span className="gradient-text">Row</span>
          </h1>
          <p className="mt-3 font-mono text-lg text-violet">{t.hero.role}</p>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            {t.hero.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
            <Link
              href={`/${lang}/blog`}
              className="rounded-lg bg-violet px-4 py-2.5 font-semibold text-bg transition hover:brightness-110"
            >
              {t.hero.ctaBlog}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="rounded-lg border border-line px-4 py-2.5 transition hover:border-cyan hover:text-cyan"
            >
              {t.hero.ctaAbout}
            </Link>
          </div>
        </div>
        <Terminal t={t.hero.terminal} />
      </section>

      <section className="py-10">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-mono text-xl font-semibold">
            <span className="text-pink">#</span> {t.sections.latest}
          </h2>
          <Link
            href={`/${lang}/blog`}
            className="font-mono text-xs text-muted hover:text-cyan"
          >
            {t.sections.all} →
          </Link>
        </div>
        <PostList posts={posts} lang={lang} t={t} />
      </section>

      <section className="py-10">
        <h2 className="font-mono text-xl font-semibold">
          <span className="text-pink">#</span> {t.sections.about}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          {t.about.paragraphs[0]}
        </p>
        <Link
          href={`/${lang}/about`}
          className="mt-3 inline-block font-mono text-xs text-muted hover:text-cyan"
        >
          {t.sections.more} →
        </Link>
      </section>
    </>
  );
}
