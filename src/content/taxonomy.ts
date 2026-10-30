import { allServices, services } from "./services";
import type { Faq } from "./services";

/**
 * Scalable service taxonomy.
 *
 *   Level 1: main service categories   (/services/<slug>)
 *   Level 2: sub-services              (/services/<parent>/<slug>)
 *   Level 3: micro-services            (/services/<parent>/<child>/<slug>)
 *
 * Only nodes with status "published" are indexable (sitemap, llms.txt, internal links).
 * Add Level 2 / 3 records only after the business confirms the service is genuinely
 * available, and only with unique, useful content.
 */
export type NodeStatus = "published" | "pending-approval" | "draft";

export type ServiceNode = {
  id: string;
  level: 1 | 2 | 3;
  name: string;
  slug: string;
  parentId: string | null;
  description: string;
  status: NodeStatus;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Entities this service relates to (industries, customer types, vehicle categories). */
  relatedEntities: string[];
  /** Ids of related service nodes. */
  relatedServices: string[];
  faqs: Faq[];
  schema: { type: "Service"; serviceType: string };
  /** Contextual internal links to show with the service. */
  internalLinks: { label: string; href: string }[];
};

// Keyword themes per Level 1 service (supporting data; never inserted as a keywords meta tag).
const keywordThemes: Record<string, string[]> = {
  "freight-cargo-transport": ["freight and cargo transport", "commercial cargo transportation", "business transportation services"],
  "passenger-transport": ["passenger transport services", "corporate passenger transport", "staff transportation services", "airport passenger transfers"],
  "equipment-machinery-moving": ["equipment and machinery transportation", "heavy equipment moving", "industrial machinery relocation"],
  "contract-fleet-services": ["contract fleet services", "monthly fleet contracts", "recurring business transport"],
};

const publishedSlugs = new Set(services.map((s) => s.slug));

const level1: ServiceNode[] = allServices.map((s) => ({
  id: s.slug,
  level: 1,
  name: s.title,
  slug: s.slug,
  parentId: null,
  description: s.short,
  status: publishedSlugs.has(s.slug) ? "published" : "pending-approval",
  seoTitle: s.metaTitle,
  metaDescription: s.metaDescription,
  keywords: keywordThemes[s.slug] ?? [],
  relatedEntities: s.audience,
  relatedServices: s.related,
  faqs: s.faqs,
  schema: { type: "Service", serviceType: s.title },
  internalLinks: s.related.map((r) => ({ label: r, href: `/services/${r}` })),
}));

// Level 2 / Level 3 records go here once confirmed, e.g.:
// { id: "airport-transfers", level: 2, parentId: "passenger-transport", status: "pending-approval", ... }
export const serviceNodes: ServiceNode[] = [...level1];

export const getNode = (id: string) => serviceNodes.find((n) => n.id === id);
export const childrenOf = (id: string) => serviceNodes.filter((n) => n.parentId === id);
export const isIndexable = (n: ServiceNode) => n.status === "published";
export const indexableNodes = () => serviceNodes.filter(isIndexable);

export function ancestorsOf(n: ServiceNode): ServiceNode[] {
  const chain: ServiceNode[] = [];
  let cur = n.parentId ? getNode(n.parentId) : undefined;
  while (cur) {
    chain.unshift(cur);
    cur = cur.parentId ? getNode(cur.parentId) : undefined;
  }
  return chain;
}

export const pathOf = (n: ServiceNode) =>
  `/services/${[...ancestorsOf(n), n].map((x) => x.slug).join("/")}`;

/** Breadcrumb trail: Home > Services > ...ancestors > node. */
export function breadcrumbFor(n: ServiceNode) {
  return [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    ...[...ancestorsOf(n), n].map((x) => ({ name: x.name, path: pathOf(x) })),
  ];
}
