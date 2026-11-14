/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getEntries, getEntry, isSection, sectionKeys } from "@/lib/sections";
import { Mdx } from "@/components/mdx";
import { Rating } from "@/components/rating";

export const dynamicParams = false;

export async function generateStaticParams() {
  const all = await Promise.all(
    locales.flatMap((lang) =>
      sectionKeys.map(async (section) => {
        const t = await getDictionary(lang);
        return (await getEntries(section, lang, t)).map((i) => ({
          lang,
          section,
          slug: i.slug,
        }));
      }),
    ),
  );
  return all.flat();
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[section]/[slug]">): Promise<Metadata> {
  const { lang, section, slug } = await params;
  if (!hasLocale(lang) || !isSection(section)) return {};
  const t = await getDictionary(lang);
  const entry = await getEntry(section, lang, t, slug);
  if (!entry) return {};
  const { item } = entry;
  return {
    title: item.title,
    description: item.summary || undefined,
    openGraph: {
      title: item.title,
      description: item.summary || undefined,
      images: item.cover ? [item.cover] : undefined,
    },
  };
}

export default async function InterestPage({
  params,
}: PageProps<"/[lang]/[section]/[slug]">) {
  const { lang, section, slug } = await params;
  if (!hasLocale(lang) || !isSection(section)) notFound();
  const t = await getDictionary(lang);
  const entry = await getEntry(section, lang, t, slug);
  if (!entry) notFound();
  const { item, thoughts } = entry;
  const s = t.interests[section];

  // Trang tiếng Anh ưu tiên bản EN (văn bản thường) nếu có, ngược lại dùng phần viết chính.
  const useEn = lang === "en" && item.thoughtsEn !== "";
  const enParagraphs = item.thoughtsEn.split(/\n{2,}/).filter(Boolean);

  return (
    <article className="mx-auto max-w-2xl py-14">
      <Link
        href={`/${lang}/${section}`}
        className="font-mono text-xs text-muted hover:text-cyan"
      >
        ← {s.title}
      </Link>
      <div className="mt-5 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {item.title}
        </h1>
        <Rating value={item.rating} />
      </div>
      {item.chips.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.chips.map((c) => (
            <li
              key={c}
              className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-cyan"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
      {item.cover && (
        <img
          src={item.cover}
          alt=""
          className="mt-8 aspect-[1200/630] w-full rounded-xl border border-line object-cover"
        />
      )}
      {item.summary && (
        <p className="mt-8 text-lg leading-relaxed text-muted">{item.summary}</p>
      )}
      {(useEn || thoughts) && (
        <>
          <h2 className="mt-10 font-mono text-lg font-semibold">
            <span className="text-pink">#</span> {t.interests.thoughts}
          </h2>
          {useEn ? (
            <div className="mt-4 space-y-4 leading-relaxed">
              {enParagraphs.map((p) => (
                <p key={p} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          ) : (
            <div className="prose prose-neutral mt-4 max-w-none dark:prose-invert prose-img:rounded-xl prose-img:border prose-img:border-line prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-cyan prose-a:no-underline hover:prose-a:underline">
              <Mdx source={thoughts} />
            </div>
          )}
        </>
      )}
    </article>
  );
}
