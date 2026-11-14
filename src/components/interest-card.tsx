/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { InterestItem, SectionKey } from "@/lib/sections";
import type { Locale } from "@/lib/i18n";
import { Rating } from "./rating";

export function InterestCard({
  item,
  section,
  lang,
}: {
  item: InterestItem;
  section: SectionKey;
  lang: Locale;
}) {
  return (
    <Link
      href={`/${lang}/${section}/${item.slug}`}
      className="card flex flex-col overflow-hidden rounded-xl"
    >
      {item.cover && (
        <img
          src={item.cover}
          alt=""
          loading="lazy"
          className="aspect-[1200/630] w-full border-b border-line object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-base font-semibold">{item.title}</h3>
          <Rating value={item.rating} />
        </div>
        {item.chips.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {item.chips.map((c) => (
              <li
                key={c}
                className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-cyan"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
        {item.summary && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
            {item.summary}
          </p>
        )}
      </div>
    </Link>
  );
}
