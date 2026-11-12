import { site } from "./site";

/**
 * Search results show about 60 characters of a title and about 155 of a description, so longer ones are
 * cut off mid-word and flagged by SEO tools. These helpers fit them without changing the page's own wording:
 * the brand suffix is added only when it fits, and long descriptions are cut at a sentence or clause end.
 */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 158;

export function fitTitle(base: string): { absolute: string } {
  const full = `${base} | ${site.name}`;
  if (full.length <= TITLE_MAX) return { absolute: full };
  const short = `${base} | Gulf Elite`;
  if (short.length <= TITLE_MAX) return { absolute: short };
  if (base.length <= TITLE_MAX) return { absolute: base };
  // Still too long on its own: cut at the last natural break (comma, "and", "for") so it ends cleanly.
  const cut = base.slice(0, TITLE_MAX + 1);
  const breaks = [cut.lastIndexOf(", "), cut.lastIndexOf(" and "), cut.lastIndexOf(" for ")].filter((i) => i >= 35 && i <= TITLE_MAX);
  const at = breaks.length ? Math.max(...breaks) : cut.lastIndexOf(" ");
  return { absolute: base.slice(0, at).replace(/[,:;\-\s]+$/, "") };
}

export function fitDescription(text: string, max = DESCRIPTION_MAX): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1);
  const clause = Math.max(cut.lastIndexOf("; "), cut.lastIndexOf(", "));
  if (clause > max * 0.6) return `${cut.slice(0, clause)}.`;
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\-]+$/, "")}...`;
}
