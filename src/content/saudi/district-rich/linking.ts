import type { Section } from "../types";
import type { DistrictRichCtx } from "./olaya";

/**
 * Adds natural internal links to the written text of a district page, as [anchor](/path), which RichText renders.
 * Rules: only text sections and the text of item cards (not the shared "what is confirmed" and WhatsApp sections); each target page is linked once per page, at its first mention; at most two links in one
 * paragraph and ten on the page; never a link to the page itself; the anchor is the place name exactly as written; and
 * a name that is part of a longer name (Granada Mall, Olaya Street, Al Hamra Square...) is never linked on its own.
 */
const AIRPORT = "/taxi-saudi-arabia/airports/king-khalid-international-airport";
const ALIASES: Record<string, string[]> = {
  "king-abdullah-financial-district": ["King Abdullah Financial District", "KAFD"],
  "al-badiah": ["Al Badi'ah", "Al Badiah"],
};
const PART_OF_LONGER = "Mall|Business|Metro|Square|Park|Hospital|Station|Palace|Museum|Road|Street|Hilton|Gate|Center|Centre";
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

type Target = { href: string; names: string[] };

export function addLinks(sections: Section[], ctx: DistrictRichCtx, selfId: string, maxLinks = 10): Section[] {
  const targets: Target[] = ctx.all
    .filter((a) => a.id !== selfId && a.id !== "king-khalid-international-airport")
    .map((a) => ({
      href: `/riyadh-taxi-service/${a.id}-taxi-service`,
      names: Array.from(new Set([...(ALIASES[a.id] ?? []), a.name.replace(/\s*\(.*\)\s*$/, "")])).sort((x, y) => y.length - x.length),
    }));
  targets.push({ href: AIRPORT, names: ["King Khalid International Airport"] });

  const used = new Set<string>();
  let total = 0;

  const linkParagraph = (p: string): string => {
    if (total >= maxLinks || p.includes("](")) return p;
    const found: { start: number; end: number; href: string }[] = [];
    for (const t of targets) {
      if (used.has(t.href)) continue;
      for (const name of t.names) {
        const re = new RegExp(`(?<![\\w\\[/'-])(?<!Dhahrat\\s)${esc(name)}(?![\\w'-])(?!\\s+(?:${PART_OF_LONGER})\\b)`);
        const m = re.exec(p);
        if (m) {
          found.push({ start: m.index, end: m.index + name.length, href: t.href });
          break;
        }
      }
    }
    found.sort((a, b) => a.start - b.start);
    const chosen: typeof found = [];
    for (const f of found) {
      if (chosen.length >= 2 || total + chosen.length >= maxLinks) break;
      if (chosen.some((c) => f.start < c.end && f.end > c.start)) continue;
      chosen.push(f);
    }
    let out = p;
    for (const c of [...chosen].sort((a, b) => b.start - a.start)) {
      out = `${out.slice(0, c.start)}[${out.slice(c.start, c.end)}](${c.href})${out.slice(c.end)}`;
      used.add(c.href);
      total += 1;
    }
    return out;
  };

  return sections.map((s) => {
    if (s.id === "whatsapp" || s.id === "limits") return s;
    if (s.kind === "text") return { ...s, paragraphs: s.paragraphs.map(linkParagraph) };
    if (s.kind === "items") {
      const intro = s.intro ? linkParagraph(s.intro) : s.intro;
      return { ...s, intro, items: s.items.map((it) => ({ ...it, text: linkParagraph(it.text) })) };
    }
    return s;
  });
}
