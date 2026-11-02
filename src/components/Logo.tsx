/**
 * Gulf Elite Transport logo: a gold badge with a navy "G" whose crossbar points forward, over a dashed road line.
 * The mark is a plain SVG so it stays sharp at any size and needs no image file.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      <rect width="48" height="48" rx="12" fill="#f5a623" />
      <path
        d="M32.5 13.5A12 12 0 1 0 36 22H25"
        fill="none"
        stroke="#101c2c"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 40h6M22 40h6M32 40h4" stroke="#101c2c" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Mark plus wordmark. `tone="dark"` is for navy backgrounds, `light` for white ones. */
export default function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const main = tone === "dark" ? "text-white" : "text-navy";
  const sub = tone === "dark" ? "text-accent" : "text-navy-2";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.05rem] font-extrabold uppercase tracking-[0.12em] ${main}`}>Gulf Elite</span>
        <span className={`mt-1 text-[0.62rem] font-bold uppercase tracking-[0.42em] ${sub}`}>Transport</span>
      </span>
      <span className="sr-only"> (Gulf Elite Transport)</span>
    </span>
  );
}
