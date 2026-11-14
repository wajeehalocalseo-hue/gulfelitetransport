import { placePages } from "@/content/saudi/build";
import { indexableNodes, pathOf } from "@/content/taxonomy";
import { abs } from "./site";

/**
 * The site's sitemaps, split so each one covers one kind of page:
 *   pages        home, services overview, about, contact, legal
 *   services     every published service, sub-service and micro-service page
 *   taxi         Saudi taxi hub, regions, airports and intercity routes
 *   taxi-<city>  one per city: the city page, its area pages and its area-to-area ride pages
 * /sitemap.xml is the index that lists them all. Submit that one file in Search Console.
 */
export type SitemapEntry = { path: string; priority: number; changefreq: "monthly" | "yearly" };

const staticPages: SitemapEntry[] = [
  { path: "/", priority: 1, changefreq: "monthly" },
  { path: "/services", priority: 0.9, changefreq: "monthly" },
  { path: "/about", priority: 0.6, changefreq: "yearly" },
  { path: "/contact", priority: 0.7, changefreq: "yearly" },
  { path: "/book", priority: 0.7, changefreq: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changefreq: "yearly" },
  { path: "/terms-and-conditions", priority: 0.2, changefreq: "yearly" },
];

const priorityFor = (kind: string) => (kind === "hub" ? 0.8 : kind === "region" || kind === "city" ? 0.7 : kind === "pair" ? 0.5 : 0.6);

function build(): Map<string, SitemapEntry[]> {
  const groups = new Map<string, SitemapEntry[]>();
  groups.set("pages", staticPages);
  groups.set(
    "services",
    indexableNodes().map((n) => ({ path: pathOf(n), priority: n.level === 1 ? 0.8 : 0.7, changefreq: "monthly" as const })),
  );

  const cityPages = placePages.filter((p) => p.kind === "city");
  const inCity = (p: { path: string }) => cityPages.find((c) => p.path === c.path || p.path.startsWith(`${c.path}/`));
  const taxi: SitemapEntry[] = [];
  const umrah: SitemapEntry[] = [];
  for (const c of cityPages) groups.set(`taxi-${c.path.split("/").pop()}`, []);
  for (const p of placePages) {
    const entry: SitemapEntry = { path: p.path, priority: priorityFor(p.kind), changefreq: "monthly" };
    const city = inCity(p);
    if (p.path === "/umrah-hajj-taxi" || p.path.startsWith("/umrah-hajj-taxi/")) umrah.push({ ...entry, priority: p.kind === "hub" ? 0.9 : 0.7 });
    else if (city) groups.get(`taxi-${city.path.split("/").pop()}`)!.push(entry);
    else taxi.push(entry);
  }
  groups.set("taxi", taxi);
  groups.set("umrah-hajj-taxi", umrah);
  return groups;
}

const groups = build();

/** Sitemap ids in the order they are listed in the index. */
export const sitemapIds = [...groups.keys()];

export const entriesFor = (id: string) => groups.get(id);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const sitemapUrl = (id: string) => abs(`/sitemaps/${id}.xml`);

export function urlsetXml(entries: SitemapEntry[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map((e) => `  <url><loc>${esc(abs(e.path))}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`)
    .join("\n")}\n</urlset>\n`;
}

export function indexXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapIds
    .map((id) => `  <sitemap><loc>${esc(sitemapUrl(id))}</loc></sitemap>`)
    .join("\n")}\n</sitemapindex>\n`;
}