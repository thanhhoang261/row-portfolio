import { reader } from "./reader";
import { site } from "@/data/site";
import type { Locale } from "./i18n";
import type { Dictionary } from "@/dictionaries/vi";

export type Profile = {
  name: string;
  handle: string;
  email: string;
  github: string;
  linkedin: string;
  x: string;
  role: string;
  tagline: string;
};

const pick = (value: string | null | undefined, fallback: string) =>
  value && value.trim() ? value.trim() : fallback;

const toHandle = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .split(/\s+/)[0]
    .replace(/[^a-z0-9]/g, "") || "row";

/** Thay {name} trong chuỗi của dictionary bằng tên hiển thị. */
export const fillName = (text: string, name: string) =>
  text.replaceAll("{name}", name);

/** Thông tin từ Keystatic (singleton "profile"); thiếu thì dùng giá trị mặc định trong code. */
export async function getProfile(lang: Locale, t: Dictionary): Promise<Profile> {
  const p = await reader.singletons.profile.read();
  const name = pick(p?.name, site.name);
  return {
    name,
    handle: toHandle(name),
    email: pick(p?.email, site.email),
    github: pick(p?.github, site.github),
    linkedin: pick(p?.linkedin, site.linkedin),
    x: pick(p?.x, site.x),
    role: pick(lang === "vi" ? p?.roleVi : p?.roleEn, t.hero.role),
    tagline: pick(lang === "vi" ? p?.taglineVi : p?.taglineEn, t.hero.tagline),
  };
}

/** Nội dung trang Giới thiệu (MDX) viết trong Keystatic; null nếu chưa viết. */
export async function getAbout(lang: Locale): Promise<string | null> {
  const entry =
    lang === "vi"
      ? await reader.singletons.aboutVi.read()
      : await reader.singletons.aboutEn.read();
  if (!entry) return null;
  const content = await entry.content();
  return content.trim() ? content : null;
}
