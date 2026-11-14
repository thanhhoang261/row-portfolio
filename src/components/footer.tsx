import type { Dictionary } from "@/dictionaries/vi";
import type { Profile } from "@/lib/profile";

export function Footer({ t, profile }: { t: Dictionary; profile: Profile }) {
  const links = [
    { label: "github", href: profile.github },
    { label: "linkedin", href: profile.linkedin },
    { label: "x", href: profile.x },
    { label: "email", href: `mailto:${profile.email}` },
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
