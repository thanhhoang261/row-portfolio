import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../../globals.css";
import { hasLocale, locales, siteUrl } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { fillName, getProfile } from "@/lib/profile";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "vietnamese"],
});

// Runs before paint so there is no theme flash. Default is dark.
const themeInit = `try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){document.documentElement.classList.add("dark")}`;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = await getDictionary(lang);
  const { name } = await getProfile(lang, t);
  const title = fillName(t.meta.title, name);
  const description = fillName(t.meta.description, name);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s · ${name}` },
    description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
      types: { "application/rss+xml": `/${lang}/feed.xml` },
    },
    openGraph: { title, description, type: "website" },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = await getDictionary(lang);
  const profile = await getProfile(lang, t);

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header lang={lang} t={t} handle={profile.handle} />
        <main className="mx-auto w-full max-w-5xl flex-1 px-5">{children}</main>
        <Footer t={t} profile={profile} />
      </body>
    </html>
  );
}
