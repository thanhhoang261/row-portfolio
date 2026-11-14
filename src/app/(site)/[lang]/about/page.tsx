import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getAbout, getProfile } from "@/lib/profile";
import { Mdx } from "@/components/mdx";

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Tailwind CSS",
  "Git",
];

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return { title: t.about.title, description: t.about.description };
}

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const profile = await getProfile(lang, t);
  const about = await getAbout(lang);

  return (
    <section className="max-w-2xl py-14">
      <h1 className="font-mono text-3xl font-bold">
        <span className="gradient-text">{t.about.title}</span>
      </h1>
      {about ? (
        <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert prose-a:text-cyan prose-a:no-underline hover:prose-a:underline">
          <Mdx source={about} />
        </div>
      ) : (
        <div className="mt-6 space-y-4 leading-relaxed text-muted">
          {t.about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}

      <h2 className="mt-10 font-mono text-lg font-semibold">
        <span className="text-pink">#</span> {t.about.skills}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {skills.map((s) => (
          <li
            key={s}
            className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-cyan"
          >
            {s}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-mono text-lg font-semibold">
        <span className="text-pink">#</span> {t.about.contact}
      </h2>
      <p className="mt-3 font-mono text-sm">
        <a href={`mailto:${profile.email}`} className="text-cyan hover:underline">
          {profile.email}
        </a>
      </p>
    </section>
  );
}
