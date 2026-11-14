import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getEntries, isSection, sectionKeys } from "@/lib/sections";
import { InterestCard } from "@/components/interest-card";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => sectionKeys.map((section) => ({ lang, section })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[section]">): Promise<Metadata> {
  const { lang, section } = await params;
  if (!hasLocale(lang) || !isSection(section)) return {};
  const t = await getDictionary(lang);
  const s = t.interests[section];
  return { title: s.title, description: s.description };
}

export default async function SectionPage({
  params,
}: PageProps<"/[lang]/[section]">) {
  const { lang, section } = await params;
  if (!hasLocale(lang) || !isSection(section)) notFound();
  const t = await getDictionary(lang);
  const s = t.interests[section];
  const items = await getEntries(section, lang, t);

  return (
    <section className="py-14">
      <h1 className="font-mono text-3xl font-bold">
        <span className="gradient-text">{s.title}</span>
      </h1>
      <p className="mt-2 text-muted">{s.description}</p>
      {items.length === 0 ? (
        <p className="mt-8 font-mono text-sm text-muted">{s.empty}</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <InterestCard key={item.slug} item={item} section={section} lang={lang} />
          ))}
        </div>
      )}
    </section>
  );
}
