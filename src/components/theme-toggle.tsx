"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};
const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  // null on the server / first render so markup matches, then the real value.
  const dark = useSyncExternalStore<boolean | null>(subscribe, isDark, () => null);

  function toggle() {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="grid h-9 w-9 place-items-center rounded-lg border border-line font-mono text-sm text-muted transition hover:border-violet hover:text-fg"
    >
      {dark === null ? "·" : dark ? "☾" : "☀"}
    </button>
  );
}
