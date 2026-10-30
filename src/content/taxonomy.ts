import { microServices, publishedMicroServices } from "./microservices";
import { microProposals, type Verification } from "./microproposals";
import { proposals, statusOverrides } from "./proposals";
import { allServices, services } from "./services";
import type { Faq } from "./services";
import { subServices, type PageContent } from "./subservices";

/**
 * Three-level service graph, the single source of truth for URLs, breadcrumbs, sitemap,
 * related links and schema relationships.
 *
 *   Level 1: main services      /services/<main>
 *   Level 2: sub-services       /services/<main>/<sub>
 *   Level 3: micro-services     /services/<main>/<sub>/<micro>
 *
 * Only nodes with status "published" (and whose parents are published) are public.
 */
export type NodeStatus = "draft" | "pending-verification" | "published" | "archived";

export type ServiceNode = {
  id: string;
  level: 1 | 2 | 3;
  name: string;
  slug: string;
  parentId: string | null;
  /** Level 3 only: the sub-service this micro-service belongs to (same as parentId). */
  parentSubServiceId?: string;
  mainServiceId: string;
  /** Full nested path, e.g. /services/<main>/<sub>/<micro>. */
  fullUrl: string;
  canonicalUrl: string;
  shortDescription: string;
  fullDescription: string;
  status: NodeStatus;
  verificationStatus: Verification;
  featured: boolean;
  order: number;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  semanticKeywords: string[];
  searchIntent: string;
  relatedServices: string[];
  relatedMicroServices: string[];
  relatedEntities: string[];
  faqs: Faq[];
  breadcrumbs: { name: string; path: string }[];
  schema: { type: "Service"; serviceType: string };
  cta: { label: string; href: string };
  image: { sceneSlug: string; alt: string };
  icon: string;
  audienceShort: string;
  publishedAt?: string;
  /** Page body for sub / micro-services (Level 1 pages use their own content in ./services). */
  content?: PageContent;
  /** Unpublished proposals: the customer use case and FAQ topics to cover when written. */
  useCase?: string;
  faqTopics?: string[];
  note?: string;
  mergedInto?: string;
};

type Raw = Omit<ServiceNode, "fullUrl" | "canonicalUrl" | "breadcrumbs">;

// Keyword themes for Level 1 services (supporting data; never output as a keywords meta tag).
const l1Keywords: Record<string, { primary: string; secondary: string[] }> = {
  "freight-cargo-transport": { primary: "freight and cargo transport", secondary: ["business transportation services", "cargo pickup and delivery"] },
  "passenger-transport": { primary: "passenger transport services", secondary: ["corporate passenger transport", "staff transportation services", "airport passenger transfers"] },
  "equipment-machinery-moving": { primary: "equipment and machinery transportation", secondary: ["heavy equipment moving", "industrial machinery relocation"] },
  "contract-fleet-services": { primary: "contract fleet services", secondary: ["monthly fleet contracts", "recurring business transport"] },
};

const publishedSlugs = new Set(services.map((s) => s.slug));
const previewPending = process.env.PUBLISH_PENDING === "1";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const level1: Raw[] = allServices.map((s, i) => ({
  id: s.slug,
  level: 1,
  name: s.title,
  slug: s.slug,
  parentId: null,
  mainServiceId: s.slug,
  shortDescription: s.short,
  fullDescription: s.overview.join(" "),
  status: publishedSlugs.has(s.slug) ? "published" : "pending-verification",
  verificationStatus: publishedSlugs.has(s.slug) ? "verified" : "pending-verification",
  featured: i < 4,
  order: i + 1,
  seoTitle: s.metaTitle,
  metaDescription: s.metaDescription,
  primaryKeyword: l1Keywords[s.slug]?.primary ?? s.title.toLowerCase(),
  secondaryKeywords: l1Keywords[s.slug]?.secondary ?? [],
  semanticKeywords: s.audience,
  searchIntent: "Commercial: a business researching or requesting this transport service.",
  relatedServices: s.related,
  relatedMicroServices: [],
  relatedEntities: s.audience,
  faqs: s.faqs,
  schema: { type: "Service", serviceType: s.title },
  cta: { label: "Get a Free Quote", href: `/services/${s.slug}#quote` },
  image: { sceneSlug: s.slug, alt: `Illustration of ${s.title}` },
  icon: s.icon,
  audienceShort: s.audienceShort,
}));

const mainOf = (parentId: string, byId: Map<string, Raw>): string => {
  const p = byId.get(parentId);
  return p ? p.mainServiceId : parentId;
};

const children = (): Raw[] => {
  const byId = new Map<string, Raw>(level1.map((n) => [n.id, n]));
  const out: Raw[] = [];
  const add = (node: Raw) => {
    if (byId.has(node.id)) throw new Error(`Duplicate service id in taxonomy: ${node.id}`);
    byId.set(node.id, node);
    out.push(node);
  };

  // Records with full page content (Level 2 sub-services, then Level 3 micro-services).
  for (const r of [...subServices, ...microServices]) {
    const status: NodeStatus =
      statusOverrides[r.id] ??
      (r.level === 2 || publishedMicroServices.includes(r.id) ? "published" : "pending-verification");
    add({
      id: r.id,
      level: r.level,
      name: r.name,
      slug: r.slug,
      parentId: r.parentId,
      parentSubServiceId: r.level === 3 ? r.parentId : undefined,
      mainServiceId: mainOf(r.parentId, byId),
      shortDescription: r.short,
      fullDescription: r.content.overview.join(" "),
      status,
      verificationStatus: status === "published" ? "verified" : "pending-verification",
      featured: r.featured,
      order: r.order,
      seoTitle: r.seoTitle,
      metaDescription: r.metaDescription,
      primaryKeyword: r.primaryKeyword,
      secondaryKeywords: r.secondaryKeywords,
      semanticKeywords: r.semanticKeywords,
      searchIntent: r.searchIntent,
      relatedServices: [...r.related, ...r.relatedMain],
      relatedMicroServices: r.level === 3 ? r.related.filter((id) => microServices.some((m) => m.id === id)) : [],
      relatedEntities: r.content.audience,
      faqs: r.content.faqs,
      schema: { type: "Service", serviceType: r.name },
      cta: { label: "Get a Free Quote", href: "#quote" },
      image: { sceneSlug: mainOf(r.parentId, byId), alt: `Illustration for ${r.name}` },
      icon: r.icon,
      audienceShort: r.audienceShort,
      publishedAt: r.publishedAt,
      content: r.content,
    });
  }

  // Level 2 proposals without a page.
  for (const p of proposals) {
    const id = slugify(p.name);
    add({
      id,
      level: 2,
      name: p.name,
      slug: id,
      parentId: p.main,
      mainServiceId: p.main,
      shortDescription: p.note,
      fullDescription: p.note,
      status: p.status,
      verificationStatus: p.status === "archived" ? "not-applicable" : "pending-verification",
      featured: false,
      order: 99,
      seoTitle: p.name,
      metaDescription: p.note,
      primaryKeyword: p.name.toLowerCase(),
      secondaryKeywords: [],
      semanticKeywords: [],
      searchIntent: "",
      relatedServices: [],
      relatedMicroServices: [],
      relatedEntities: [],
      faqs: [],
      schema: { type: "Service", serviceType: p.name },
      cta: { label: "Get a Free Quote", href: "#quote" },
      image: { sceneSlug: p.main, alt: p.name },
      icon: "check",
      audienceShort: "",
      note: p.note,
      mergedInto: p.mergedInto,
    });
  }

  // Level 3 proposals without a page.
  for (const m of microProposals) {
    const id = slugify(m.name);
    const parent = byId.get(m.sub);
    if (!parent) throw new Error(`Micro-service "${m.name}" has an unknown sub-service: ${m.sub}`);
    add({
      id,
      level: 3,
      name: m.name,
      slug: id,
      parentId: m.sub,
      parentSubServiceId: m.sub,
      mainServiceId: parent.mainServiceId,
      shortDescription: m.useCase,
      fullDescription: m.useCase,
      status: m.verification === "not-applicable" ? "archived" : m.recommendation === "merge" ? "draft" : "pending-verification",
      verificationStatus: m.verification,
      featured: false,
      order: 99,
      seoTitle: m.name,
      metaDescription: m.useCase,
      primaryKeyword: m.name.toLowerCase(),
      secondaryKeywords: m.themes,
      semanticKeywords: m.themes,
      searchIntent: `Commercial: ${m.useCase.charAt(0).toLowerCase()}${m.useCase.slice(1)}`,
      relatedServices: [],
      relatedMicroServices: [],
      relatedEntities: m.entities,
      faqs: [],
      schema: { type: "Service", serviceType: m.name },
      cta: { label: "Get a Free Quote", href: "#quote" },
      image: { sceneSlug: parent.mainServiceId, alt: m.name },
      icon: "check",
      audienceShort: m.entities.join(", "),
      useCase: m.useCase,
      faqTopics: m.faqTopics,
      note: m.recommendation === "merge" ? `Merged: ${m.useCase}` : "Needs owner confirmation before publication.",
      mergedInto: m.mergedInto,
    });
  }
  return out;
};

const raw: Raw[] = [...level1, ...children()];
const rawById = new Map(raw.map((n) => [n.id, n]));

const chainOf = (n: Raw): Raw[] => {
  const chain: Raw[] = [];
  let cur: Raw | undefined = n;
  while (cur) {
    chain.unshift(cur);
    cur = cur.parentId ? rawById.get(cur.parentId) : undefined;
  }
  return chain;
};

const pathFor = (n: Raw) => `/services/${chainOf(n).map((x) => x.slug).join("/")}`;

export const serviceNodes: ServiceNode[] = raw.map((n) => ({
  ...n,
  fullUrl: pathFor(n),
  canonicalUrl: pathFor(n),
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    ...chainOf(n).map((x) => ({ name: x.name, path: pathFor(x) })),
  ],
}));

// Slugs must be unique within a parent and full URLs must be unique across the whole graph.
{
  const seen = new Set<string>();
  for (const n of serviceNodes) {
    if (seen.has(n.fullUrl)) throw new Error(`Duplicate service URL in taxonomy: ${n.fullUrl}`);
    seen.add(n.fullUrl);
  }
}

const byId = new Map(serviceNodes.map((n) => [n.id, n]));

export const getNode = (id: string) => byId.get(id);
export const childrenOf = (id: string) =>
  serviceNodes.filter((n) => n.parentId === id).sort((a, b) => a.order - b.order);
export const pathOf = (n: ServiceNode) => n.fullUrl;
export const breadcrumbFor = (n: ServiceNode) => n.breadcrumbs;

export function ancestorsOf(n: ServiceNode): ServiceNode[] {
  const out: ServiceNode[] = [];
  let cur = n.parentId ? byId.get(n.parentId) : undefined;
  while (cur) {
    out.unshift(cur);
    cur = cur.parentId ? byId.get(cur.parentId) : undefined;
  }
  return out;
}

/** Public and indexable: published, with every ancestor published too. */
export const isIndexable = (n: ServiceNode) =>
  n.status === "published" && ancestorsOf(n).every((a) => a.status === "published");

/** Has a page body and should be generated: indexable nodes, plus unpublished ones in preview builds. */
export const isBuildable = (n: ServiceNode) =>
  n.level > 1 &&
  Boolean(n.content) &&
  (isIndexable(n) || (previewPending && n.status !== "archived"));

export const indexableNodes = () => serviceNodes.filter(isIndexable);
export const publishedChildren = (id: string) => childrenOf(id).filter(isIndexable);
export const nodeByPath = (segments: string[]) =>
  serviceNodes.find((n) => n.level > 1 && n.fullUrl === `/services/${segments.join("/")}`);
