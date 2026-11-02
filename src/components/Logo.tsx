/**
 * Gulf Elite Transport logo: a hexagon badge with a white "G" whose crossbar leads into a gold forward arrow (direction, route, movement).
 * The mark is a plain SVG so it stays sharp at any size and needs no image file.
 */
export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={className}>
      <path d="M32 3L57.1 17.5V46.5L32 61L6.9 46.5V17.5Z" fill="#101c2c" stroke="#f5a623" strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M41.5 23.5A13 13 0 1 0 45 32H33" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48.5 26l6 6-6 6" fill="none" stroke="#f5a623" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
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
