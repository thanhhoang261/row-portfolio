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
    { href: `/${lang}/games`, label: t.nav.games },
    { href: `/${lang}/sports`, label: t.nav.sports },
    { href: `/${lang}/favorites`, label: t.nav.favorites },
    { href: `/${lang}/about`, label: t.nav.about },
  ];

  return (
    <header className="z-40 border-b border-line/70 bg-bg/70 backdrop-blur-md md:sticky md:top-0">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 px-5">
        <Link
          href={`/${lang}`}
          className="order-1 py-4 font-mono text-base font-semibold"
        >
          <span className="text-cyan">~/</span>
          <span className="gradient-text">{handle}</span>
          <span className="caret ml-0.5" aria-hidden />
        </Link>
        <nav
          aria-label="Main"
          className="order-3 -mx-2 flex w-full flex-wrap items-center gap-x-1 pb-2 font-mono text-sm md:order-2 md:mx-0 md:ml-auto md:w-auto md:gap-x-2 md:pb-0"
        >
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
        </nav>
        <div className="order-2 ml-auto flex items-center gap-2 md:order-3 md:ml-3">
          <LangSwitch lang={lang} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
