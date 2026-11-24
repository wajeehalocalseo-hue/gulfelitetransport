/**
 * The blog article format. One file per post in src/content/blog/posts/, written with the helpers below.
 * Nothing is published that cannot be backed: figures come from the site's own route data and are marked as estimates,
 * fares are never quoted, and nothing is claimed about ratings, awards or fleet.
 */
export type Item = { title?: string; text: string };

export type Block =
  | { t: "p"; text: string }
  | { t: "ul"; items: Item[] }
  | { t: "ol"; items: Item[] }
  | { t: "table"; head: string[]; rows: string[][]; hrefs?: (string | undefined)[]; note?: string }
  | { t: "links"; items: { name: string; href: string; note?: string }[] }
  | { t: "cta"; title: string; text: string };

export type ArticleSection = { id: string; h2: string; blocks: Block[] };

export type Article = {
  slug: string;
  /** The H1. The page title is this text, shortened if needed. */
  h1: string;
  /** Up to 158 characters. */
  description: string;
  category: string;
  tags: string[];
  /** ISO date, for example 2026-11-24. */
  published: string;
  updated?: string;
  /** The short answer shown at the top and used as the page's direct answer. */
  answer: string;
  sections: ArticleSection[];
  faq: { q: string; a: string }[];
  /** The "Key takeaways" box. */
  takeaways?: { intro?: string; items: { title: string; text: string }[] };
};

export const p = (text: string): Block => ({ t: "p", text });
export const ul = (...items: Item[]): Block => ({ t: "ul", items });
export const ol = (...items: Item[]): Block => ({ t: "ol", items });
export const table = (head: string[], rows: string[][], opts: { hrefs?: (string | undefined)[]; note?: string } = {}): Block => ({ t: "table", head, rows, ...opts });
export const links = (...items: { name: string; href: string; note?: string }[]): Block => ({ t: "links", items });
/** A call-to-action box between sections. It has no heading, so it is not listed in the table of contents. */
export const cta = (title: string, text: string): ArticleSection => ({ id: `cta-${title.length}`, h2: "", blocks: [{ t: "cta", title, text }] });
export const section = (id: string, h2: string, ...blocks: Block[]): ArticleSection => ({ id, h2, blocks });

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** 2026-11-24 becomes "24 November 2026". */
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

/** The standard "what is confirmed" box that closes every guide. */
export const standardTakeaways = (intro: string) => ({
  intro,
  items: [
    { title: "Fares", text: "No standard fares are published. The fare is confirmed with you before you commit." },
    { title: "Journey time", text: "Timing depends on traffic, route and stops, so no journey time is promised in advance." },
    { title: "Vehicle and driver", text: "The car type and driver are confirmed for your request." },
    { title: "Availability", text: "Availability depends on the place, the date and the time of day." },
  ],
});
