import type { ChildRecord } from "../subservices";

type Item = { title: string; text: string };

export type MicroInput = {
  id: string;
  parentId: string;
  name: string;
  icon: string;
  order: number;
  short: string;
  audienceShort: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  semanticKeywords: string[];
  searchIntent: string;
  related: string[];
  relatedMain: string[];
  layout: ChildRecord["layout"];
  lead: string;
  directAnswer: string;
  differs: { heading: string; text: string };
  overview: string[];
  includes: Item[];
  audience: string[];
  applications: Item[];
  steps: Item[];
  considerations: Item[];
  quoteInfo: string[];
  faqs: { q: string; a: string }[];
};

/** Builds a Level 3 record from a flat description, so a batch file only contains the page content. */
export const makeMicro = (publishedAt: string) => (r: MicroInput): ChildRecord => ({
  id: r.id,
  slug: r.id,
  parentId: r.parentId,
  level: 3,
  name: r.name,
  icon: r.icon,
  featured: false,
  order: r.order,
  short: r.short,
  audienceShort: r.audienceShort,
  seoTitle: r.seoTitle,
  metaDescription: r.metaDescription,
  primaryKeyword: r.primaryKeyword,
  secondaryKeywords: r.secondaryKeywords,
  semanticKeywords: r.semanticKeywords,
  searchIntent: r.searchIntent,
  related: r.related,
  relatedMain: r.relatedMain,
  publishedAt,
  layout: r.layout,
  content: {
    h1: r.name,
    lead: r.lead,
    directAnswer: r.directAnswer,
    differs: r.differs,
    overview: r.overview,
    includes: r.includes,
    audience: r.audience,
    applications: r.applications,
    steps: r.steps,
    considerations: r.considerations,
    quoteInfo: r.quoteInfo,
    faqs: r.faqs,
  },
});