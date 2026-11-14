import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries/vi";
import { LangSwitch } from "./lang-switch";
import { ThemeToggle } from "./theme-toggle";

export function Header({
  lang,
  t,
  handle,
}: {
  lang: Locale;
  t: Dictionary;
  handle: string;
}) {
  const links = [
    { href: `/${lang}/blog`, label: t.nav.blog },
    { href: `/${lang}/projects`, label: t.nav.projects },
    { href: `/${lang}/about`, label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
        <Link href={`/${lang}`} className="font-mono text-base font-semibold">
          <span className="text-cyan">~/</span>
          <span className="gradient-text">{handle}</span>
          <span className="caret ml-0.5" aria-hidden />
        </Link>
        <nav className="flex items-center gap-1 font-mono text-sm sm:gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-2 py-1.5 text-muted transition hover:text-fg"
            >
              <span className="text-violet">./</span>
              {l.label}
            </Link>
          ))}
          <div className="ml-1 flex items-center gap-2">
            <LangSwitch lang={lang} />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
