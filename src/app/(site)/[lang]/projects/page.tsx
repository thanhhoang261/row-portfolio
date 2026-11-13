import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  return { title: t.projects.title, description: t.projects.description };
}

export default async function Projects({
  params,
}: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <section className="py-14">
      <h1 className="font-mono text-3xl font-bold">
        <span className="gradient-text">{t.projects.title}</span>
      </h1>
      <p className="mt-2 text-muted">{t.projects.description}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} lang={lang} t={t} />
        ))}
      </div>
    </section>
  );
}
