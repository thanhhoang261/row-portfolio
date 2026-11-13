import { notFound } from "next/navigation";
import { adminDisabled } from "@/lib/keystatic-guard";
import KeystaticApp from "./keystatic";

export const metadata = { title: "Keystatic", robots: { index: false } };

export default function Layout() {
  if (adminDisabled) notFound();
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
