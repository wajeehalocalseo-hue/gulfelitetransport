import Link from "next/link";
import type { ReactNode } from "react";

const LINK_SOURCE = "\\[([^\\]]+)\\]\\((/[^)\\s]*)\\)";

const styles = {
  light: "font-semibold text-navy underline decoration-accent decoration-2 underline-offset-4 transition hover:bg-accent/15",
  dark: "font-semibold text-white underline decoration-accent decoration-2 underline-offset-4 transition hover:text-accent",
};

/**
 * Renders text that may contain internal links written as [anchor text](/path).
 * Only site-relative paths are accepted. Text without that syntax is returned unchanged.
 */
export default function RichText({ text, tone = "light" }: { text: string; tone?: keyof typeof styles }) {
  const link = new RegExp(LINK_SOURCE, "g");
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = link.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <Link key={`${m.index}-${m[2]}`} href={m[2]} className={styles[tone]}>
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (out.length === 0) return <>{text}</>;
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
