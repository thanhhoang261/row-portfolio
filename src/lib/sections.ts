import { reader } from "./reader";
import type { Locale } from "./i18n";
import type { Dictionary } from "@/dictionaries/vi";

export const sectionKeys = ["games", "sports", "favorites"] as const;
export type SectionKey = (typeof sectionKeys)[number];
export const isSection = (value: string): value is SectionKey =>
  (sectionKeys as readonly string[]).includes(value);

export type InterestItem = {
  slug: string;
  title: string;
  chips: string[];
  rating: number | null;
  summary: string;
  cover: string | null;
  date: string;
  /** Suy nghĩ bản tiếng Anh (văn bản thường), có thể rỗng. */
  thoughtsEn: string;
};

// Cả ba bộ sưu tập có hình dạng dữ liệu khác nhau, nên đọc qua kiểu lỏng rồi chuẩn hoá ở dưới.
type RawEntry = Record<string, unknown> & { thoughts: () => Promise<string> };
type RawCollection = {
  list(): Promise<string[]>;
  read(slug: string): Promise<RawEntry | null>;
};

const collections: Record<SectionKey, RawCollection> = {
  games: reader.collections.games as unknown as RawCollection,
  sports: reader.collections.sports as unknown as RawCollection,
  favorites: reader.collections.favorites as unknown as RawCollection,
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function normalize(
  section: SectionKey,
  slug: string,
  e: RawEntry,
  lang: Locale,
  t: Dictionary,
): InterestItem {
  const i = t.interests;
  const pick = <T extends Record<string, string>>(map: T, key: string) =>
    (map as Record<string, string>)[key] ?? "";
  let chips: string[] = [];
  if (section === "games") {
    chips = [str(e.platform), pick(i.status, str(e.status))];
  } else if (section === "sports") {
    const since = str(e.since);
    chips = [
      pick(i.level, str(e.level)),
      since ? `${i.since} ${since}` : "",
      str(e.frequency),
    ];
  } else {
    chips = [
      pick(i.kind, str(e.kind)),
      str(e.creator),
      str(e.year),
    ];
  }
  const vi = str(e.summaryVi);
  const en = str(e.summaryEn);
  return {
    slug,
    title: str(e.name),
    chips: chips.filter(Boolean),
    rating: typeof e.rating === "number" ? e.rating : null,
    summary: lang === "vi" ? vi || en : en || vi,
    cover: typeof e.cover === "string" && e.cover ? e.cover : null,
    date: str(e.date),
    thoughtsEn: str(e.thoughtsEn),
  };
}

// Đọc từng mục trong try/catch: một mục lỗi chỉ bị bỏ qua, không làm hỏng cả bản build.
async function safeRead(section: SectionKey, slug: string) {
  try {
    const e = await collections[section].read(slug);
    return e && !e.hidden ? e : null;
  } catch (error) {
    console.warn(
      `[${section}] Bỏ qua "${slug}": ${error instanceof Error ? error.message : error}`,
    );
    return null;
  }
}

export async function getEntries(
  section: SectionKey,
  lang: Locale,
  t: Dictionary,
): Promise<InterestItem[]> {
  const slugs = await collections[section].list();
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const e = await safeRead(section, slug);
      return e ? normalize(section, slug, e, lang, t) : null;
    }),
  );
  return items
    .filter((x): x is InterestItem => x !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getEntry(
  section: SectionKey,
  lang: Locale,
  t: Dictionary,
  slug: string,
) {
  const e = await safeRead(section, slug);
  if (!e) return null;
  return {
    item: normalize(section, slug, e, lang, t),
    thoughts: (await e.thoughts()).trim(),
  };
}
