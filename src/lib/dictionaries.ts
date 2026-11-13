import "server-only";
import type { Locale } from "./i18n";
import type { Dictionary } from "@/dictionaries/vi";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  vi: () => import("@/dictionaries/vi").then((m) => m.default),
  en: () => import("@/dictionaries/en").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
