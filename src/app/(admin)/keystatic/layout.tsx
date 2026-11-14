import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { adminDisabled } from "@/lib/keystatic-guard";
import KeystaticApp from "./keystatic";
import { AdminHelp } from "./admin-help";
import "./admin.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "vietnamese"],
});

export const metadata = {
  title: "Quản trị · Row Blog",
  robots: { index: false },
};

export default function Layout() {
  if (adminDisabled) notFound();
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <KeystaticApp />
        <AdminHelp />
      </body>
    </html>
  );
}
