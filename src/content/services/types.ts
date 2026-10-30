export type Faq = { q: string; a: string };

export type ServiceGroup = "freight" | "passenger" | "equipment" | "fleet";

export type Service = {
  slug: string;
  icon: string;
  title: string;
  group: ServiceGroup;
  /**
   * Publication switch. `false` = pending business approval: the page is not built,
   * linked, listed in the sitemap or included in llms.txt. Set to `true` only after
   * the business confirms it genuinely offers this service.
   */
  approved: boolean;
  /** Short card description. */
  short: string;
  /** One-line audience shown on cards. */
  audienceShort: string;
  benefits: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  /** Direct, extractable definition shown at the top of the page. */
  directAnswer: string;
  overview: string[];
  includes: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  audience: string[];
  useCases: { title: string; text: string }[];
  considerations: { title: string; text: string }[];
  quoteInfo: string[];
  quoteFactors: string[];
  faqs: Faq[];
  /** Slugs of genuinely related services (unpublished ones are dropped automatically). */
  related: string[];
};
