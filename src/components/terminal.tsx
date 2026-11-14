import type { Dictionary } from "@/dictionaries/vi";

function Line({
  cmd,
  out,
  delay,
}: {
  cmd: string;
  out: string;
  delay: number;
}) {
  return (
    <div className="mb-3">
      <p>
        <span className="text-lime">➜</span> <span className="text-cyan">~</span>{" "}
        <span
          className="type-line align-bottom"
          style={
            { "--chars": cmd.length, "--delay": `${delay}s` } as React.CSSProperties
          }
        >
          {cmd}
        </span>
      </p>
      <p
        className="fade-in pl-4 text-muted"
        style={{ "--delay": `${delay + 1.15}s` } as React.CSSProperties}
      >
        {out}
      </p>
    </div>
  );
}

export function Terminal({
  t,
  handle,
  name,
  role,
}: {
  t: Dictionary["hero"]["terminal"];
  handle: string;
  name: string;
  role: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-elev/90 shadow-2xl shadow-violet/10 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-pink" />
        <span className="h-3 w-3 rounded-full bg-lime" />
        <span className="h-3 w-3 rounded-full bg-cyan" />
        <span className="ml-3 font-mono text-xs text-muted">{handle}: ~</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        <Line cmd={t.whoami} out={`${name} — ${role}`} delay={0.3} />
        <Line cmd={t.blog} out={t.blogOut} delay={2.2} />
        <Line cmd={t.status} out={t.statusOut} delay={4.1} />
        <p>
          <span className="text-lime">➜</span> <span className="text-cyan">~</span>{" "}
          <span className="caret" aria-hidden />
        </p>
      </div>
    </div>
  );
}
