"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export function LangSwitch({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(vi|en)/, "") || "/";

  return (
    <div className="flex overflow-hidden rounded-lg border border-line font-mono text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest === "/" ? "" : rest}`}
          hrefLang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`px-2.5 py-2 uppercase transition ${
            l === lang
              ? "bg-violet/20 text-fg"
              : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
