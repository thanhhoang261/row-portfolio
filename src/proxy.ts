import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

function pickLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().slice(0, 2));
  return (preferred.find((l) => (locales as readonly string[]).includes(l)) ??
    defaultLocale) as Locale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${pickLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Keystatic admin/API, Next internals, and any file with an extension
  matcher: ["/((?!api|keystatic|_next|.*\\..*).*)"],
};
