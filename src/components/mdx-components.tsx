/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

const tones = {
  info: { color: "var(--cyan)", icon: "ℹ" },
  tip: { color: "var(--lime)", icon: "✦" },
  warning: { color: "#e0a100", icon: "⚠" },
  danger: { color: "var(--pink)", icon: "✖" },
} as const;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof tones;
  title?: string;
  children?: ReactNode;
}) {
  const tone = tones[type] ?? tones.info;
  return (
    <aside
      className="my-6 rounded-xl border border-l-4 px-4 py-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
      style={{
        borderColor: tone.color,
        background: `color-mix(in srgb, ${tone.color} 10%, transparent)`,
      }}
    >
      {title && (
        <p className="!mb-1 font-mono text-sm font-semibold" style={{ color: tone.color }}>
          {tone.icon} {title}
        </p>
      )}
      {children}
    </aside>
  );
}

export function Details({
  summary,
  children,
}: {
  summary: string;
  children?: ReactNode;
}) {
  return (
    <details className="my-6 rounded-xl border border-line bg-elev/60 px-4 py-3 open:pb-4">
      <summary className="cursor-pointer font-mono text-sm font-semibold text-violet">
        {summary}
      </summary>
      <div className="mt-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{children}</div>
    </details>
  );
}

export function Figure({
  src,
  alt = "",
  caption,
}: {
  src: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="mx-auto w-full rounded-xl border border-line"
      />
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-xs text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function youTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = u.pathname.slice(1);
    else if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      id = u.searchParams.get("v");
      if (!id) {
        const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/);
        id = m ? m[1] : null;
      }
    }
    return id && /^[\w-]{6,20}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function YouTube({ url, title }: { url: string; title?: string }) {
  const id = youTubeId(url);
  if (!id) return null;
  return (
    <div className="my-8 aspect-video overflow-hidden rounded-xl border border-line">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title || "YouTube video"}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full w-full"
      />
    </div>
  );
}

export const mdxComponents = { Callout, Details, Figure, YouTube };
