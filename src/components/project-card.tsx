/* eslint-disable @next/next/no-img-element */
import type { ProjectItem } from "@/lib/projects";
import type { Dictionary } from "@/dictionaries/vi";

export function ProjectCard({
  project,
  t,
}: {
  project: ProjectItem;
  t: Dictionary;
}) {
  const body = (
    <>
      {project.cover && (
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          className="aspect-[1200/630] w-full border-b border-line object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-mono text-base font-semibold">{project.name}</h3>
          {project.date && (
            <span className="font-mono text-xs text-muted">
              {project.date.slice(0, 4)}
            </span>
          )}
        </div>
        {project.summary && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {project.summary}
          </p>
        )}
        {project.url && (
          <span className="mt-4 font-mono text-xs text-cyan">
            {t.projects.visit} ↗
          </span>
        )}
      </div>
    </>
  );

  const cls = "card flex flex-col overflow-hidden rounded-xl";
  return project.url ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <article className={cls}>{body}</article>
  );
}
