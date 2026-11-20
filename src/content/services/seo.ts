import { seoA } from "./seo-a";
import { seoB } from "./seo-b";
import { seoC } from "./seo-c";
import { briefA } from "./seo-brief-a";
import { briefB } from "./seo-brief-b";
import type { ServiceBase, ServiceBrief, ServiceSeo } from "./seo-types";

export type { ServiceSeo } from "./seo-types";

/** Page-level SEO, coverage and layout data for the 18 service pages. See seo-types.ts. */
const base: Record<string, ServiceBase> = { ...seoA, ...seoB, ...seoC };
const briefs: Record<string, ServiceBrief> = { ...briefA, ...briefB };

/** The original page data (seo-a/b/c: layouts, images, coverage notes, CTA) with the brief overrides from seo-brief-a/b applied on top. */
export const serviceSeo: Record<string, ServiceSeo> = Object.fromEntries(
  Object.entries(base).map(([slug, b]) => {
    const o = briefs[slug];
    if (!o) throw new Error(`Service page ${slug} has no brief in seo-brief-a/b.ts`);
    return [slug, { ...b, ...o } as ServiceSeo];
  }),
);

export const getServiceSeo = (slug: string): ServiceSeo | undefined => serviceSeo[slug];

/**
 * Base FAQs from the original service data that repeat a question the brief copy already answers. They are dropped so a page
 * never shows two versions of the same question (for example "Where can I book a taxi?" and "Where can I request a taxi?").
 */
const duplicateBaseFaqs: Record<string, string[]> = {
  "commercial-distribution-services": ["How is it different from a single freight job?"],
  "container-transportation": ["Can you collect from a port?"],
  "contract-fleet-services": ["How is a contract different from one-off bookings?"],
  "equipment-machinery-moving": ["Do you transport heavy machinery?", "What information do you need to plan a machinery move?"],
  "express-urgent-delivery": ["Can you guarantee same-day delivery?", "What do you need for an urgent request?"],
  "freight-cargo-transport": ["How do I get a freight quotation?"],
  "furniture-household-moving": ["Do you pack and dismantle?", "Do you provide storage?"],
  "industrial-project-logistics": ["What should I prepare?"],
  "last-mile-delivery": ["What information do you need to plan deliveries?"],
  "packaging-cargo-handling": ["Do you supply packing materials?"],
  "passenger-transport": ["Can I arrange transport for my employees?"],
  "spare-parts-automotive-logistics": ["Can you deliver urgently?"],
  "taxi-cab-services": ["Where can I request a taxi or cab?", "Can I book an airport transfer?", "How do I request a ride?"],
  "trade-show-exhibition-logistics": ["Do you build stands?"],
  "vehicle-transportation": ["Is insurance included?"],
  "warehousing-storage": ["Is short-term storage possible?"],
};

/** The questions shown on a service page (and in its FAQ schema): the brief FAQs first, then the original ones that do not repeat them. */
export const pageFaqs = (slug: string, seo: ServiceSeo, base: { q: string; a: string }[]) => [
  ...seo.faqs,
  ...base.filter((f) => !(duplicateBaseFaqs[slug] ?? []).includes(f.q)),
];
