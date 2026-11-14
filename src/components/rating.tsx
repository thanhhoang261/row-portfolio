export function Rating({ value }: { value: number | null }) {
  if (value === null || value < 1) return null;
  const n = Math.min(5, Math.round(value));
  return (
    <span
      role="img"
      aria-label={`${n}/5`}
      className="shrink-0 font-mono text-sm tracking-tight text-pink"
    >
      {"★".repeat(n)}
      <span className="text-line">{"★".repeat(5 - n)}</span>
    </span>
  );
}
