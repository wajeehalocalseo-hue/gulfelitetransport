import Link from "next/link";
import type { ReactNode } from "react";
import { autolink } from "@/lib/autolink";

const LINK_SOURCE = "\\[([^\\]]+)\\]\\((/[^)\\s]*)\\)";

const styles = {
  light: "font-semibold text-navy underline decoration-accent decoration-2 underline-offset-4 transition hover:bg-accent/15",
  dark: "font-semibold text-white underline decoration-accent decoration-2 underline-offset-4 transition hover:text-accent",
};

/**
 * Renders text that may contain internal links written as [anchor text](/path).
 * Only site-relative paths are accepted. Text without that syntax is returned unchanged.
 */
export default function RichText({ text, tone = "light", auto = true }: { text: string; tone?: keyof typeof styles; /** Also link the first mention of a known place, district or route to its page (see lib/autolink.ts). */ auto?: boolean }) {
  const plain = (t: string, key: string): ReactNode[] =>
    !auto ? [t] : autolink(t).map((x, i) => (typeof x === "string" ? x : <Link key={`${key}-a${i}`} href={x.href} className={styles[tone]}>{x.text}</Link>));
  const link = new RegExp(LINK_SOURCE, "g");
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = link.exec(text)) !== null) {
    if (m.index > last) out.push(...plain(text.slice(last, m.index), `${last}`));
    out.push(
      <Link key={`${m.index}-${m[2]}`} href={m[2]} className={styles[tone]}>
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (out.length === 0) return <>{plain(text, "0")}</>;
  if (last < text.length) out.push(...plain(text.slice(last), `${last}`));
  return <>{out}</>;
}
