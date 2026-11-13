import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/vi";

export function ProjectCard({
  project,
  lang,
  t,
}: {
  project: Project;
  lang: Locale;
  t: Dictionary;
}) {
  return (
    <article className="card flex flex-col rounded-xl p-5">
      <h3 className="font-mono text-base font-semibold">
        <span className="text-violet">{"</>"}</span> {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {project.description[lang]}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <li
            key={s}
            className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-cyan"
          >
            {s}
          </li>
        ))}
      </ul>
      {(project.repo || project.demo) && (
        <div className="mt-4 flex gap-4 font-mono text-xs">
          {project.repo && (
            <a href={project.repo} className="text-muted hover:text-cyan">
              {t.projects.code} ↗
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="text-muted hover:text-cyan">
              {t.projects.demo} ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}
