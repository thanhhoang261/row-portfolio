import { site } from "@/data/site";
import type { Dictionary } from "@/dictionaries/vi";

export function Footer({ t }: { t: Dictionary }) {
  const links = [
    { label: "github", href: site.github },
    { label: "linkedin", href: site.linkedin },
    { label: "x", href: site.x },
    { label: "email", href: `mailto:${site.email}` },
  ];
  return (
    <footer className="mt-24 border-t border-line/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-lime">$</span> {t.footer.built}
        </p>
        <ul className="flex gap-4">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="transition hover:text-cyan">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
