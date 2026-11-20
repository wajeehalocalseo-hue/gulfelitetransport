import { cache } from "react";
import { placePages } from "@/content/saudi/build";

/**
 * Natural internal links inside running text (used by components/RichText.tsx).
 * The first time a place, district, airport or route name appears in a page's body copy it becomes a link to that
 * page. Each target is linked once per page, a page never links to itself, and a page gets at most MAX_PER_PAGE
 * automatic links, so the text still reads as writing and not as a link list. Matching is exact (same capital letters,
 * whole words) and the longest name wins, so "Riyadh to Al Zulfi" links as one route and not as two places.
 */
const MAX_PER_PAGE = 7;

type Entry = { phrase: string; href: string };

const buildEntries = (): Entry[] => {
  const byName = new Map<string, Set<string>>();
  for (const p of placePages) {
    if (!["city", "area", "airport", "route", "region"].includes(p.kind)) continue;
    if (p.name.length < 5) continue;
    (byName.get(p.name) ?? byName.set(p.name, new Set()).get(p.name)!).add(p.path);
  }
  // A town that has only a route page ("Riyadh to Al Zulfi") is linked by its own name, "Al Zulfi", when no place page has that name.
  for (const p of placePages) {
    if (p.kind !== "route" || !p.name.startsWith("Riyadh to ")) continue;
    const dest = p.name.slice("Riyadh to ".length);
    if (dest.length >= 5 && !byName.has(dest)) byName.set(dest, new Set([p.path]));
  }
  const out: Entry[] = [];
  for (const [phrase, paths] of byName) {
    if (paths.size === 1) out.push({ phrase, href: [...paths][0] }); // a name that points to two pages is ambiguous: skip it
  }
  return out.sort((a, b) => b.phrase.length - a.phrase.length);
};

let entries: Entry[] | null = null;
let regex: RegExp | null = null;
let hrefOf: Map<string, string> | null = null;
const prepare = () => {
  if (entries) return;
  entries = buildEntries();
  hrefOf = new Map(entries.map((e) => [e.phrase, e.href]));
  const esc = entries.map((e) => e.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  regex = new RegExp(`(?<![\\w'’-])(${esc.join("|")})(?![\\w'’-])`, "g");
};

/** Per-render state: which targets are already linked on the page being drawn, and which page that is. */
const state = cache(() => ({ used: new Set<string>(), count: 0, self: "" }));

/** Call once at the top of a page view so the page does not link to itself and the counters start fresh. */
export function setLinkPage(path: string) {
  const s = state();
  s.self = path;
  s.used.clear();
  s.count = 0;
}

export type Piece = string | { text: string; href: string };

export function autolink(text: string): Piece[] {
  prepare();
  const s = state();
  if (s.count >= MAX_PER_PAGE || text.length < 12) return [text];
  const out: Piece[] = [];
  let last = 0;
  regex!.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = regex!.exec(text)) !== null) {
    const href = hrefOf!.get(m[1]);
    if (!href || href === s.self || s.used.has(href) || s.count >= MAX_PER_PAGE) continue;
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push({ text: m[1], href });
    s.used.add(href);
    s.count += 1;
    last = m.index + m[1].length;
  }
  if (out.length === 0) return [text];
  if (last < text.length) out.push(text.slice(last));
  return out;
}
