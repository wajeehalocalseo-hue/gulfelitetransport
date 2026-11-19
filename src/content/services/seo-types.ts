import type { Faq } from "./types";

/**
 * Page-level SEO, geography and layout data for the 18 service pages (see seo-a.ts, seo-b.ts, seo-c.ts).
 * It sits on top of the service data in core.ts, delivery.ts, extended.ts, international.ts and storage.ts: the page reads the
 * original service first and then applies anything set here, so the original facts stay in one place.
 *
 * Rules kept in the copy: no invented fleet, warehouses, branches, prices, transit times, certificates or customer stories.
 * Cities are named as places where goods and people move. A city is never described as having a Gulf Elite office or depot.
 */
export type HeroStyle = "split" | "band" | "light-image" | "ledger" | "centered" | "banner";
export type IncludesStyle = "cards" | "ledger" | "tiles";
export type StepsStyle = "grid" | "timeline" | "chevrons";
export type UseCaseStyle = "navy" | "columns" | "list";
export type PlanningStyle = "cards" | "split" | "table";
export type AsideStyle = "sticky" | "band";
export type SectionId = "overview" | "includes" | "solutions" | "how" | "audience" | "usecases" | "coverage" | "planning" | "info" | "faq" | "related";

export type ServiceImage = {
  /** File name without extension, in public/images/routes/services/<slug>/ (for example "freight-cargo-transport"). */
  slot: string;
  alt: string;
  /** Text shown in the placeholder while the photo is missing. */
  label: string;
};

export type ServiceSeo = {
  /** Exactly one primary keyword for the page. */
  primary: string;
  secondary: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  directAnswer: string;
  /** Opening paragraph(s) of the overview, with the primary keyword and contextual links written as [anchor](/path). */
  intro: string[];
  h2: { overview: string; includes: string; how: string; coverage: string; planning: string; usecases: string; faq: string };
  coverage: { paragraphs: string[]; cities: { name: string; note: string }[] };
  /** Extra FAQs placed first. */
  faqs: Faq[];
  /** Three placements: [hero or top, middle, coverage]. */
  images: [ServiceImage, ServiceImage, ServiceImage];
  layout: {
    hero: HeroStyle;
    includes: IncludesStyle;
    steps: StepsStyle;
    usecases: UseCaseStyle;
    planning: PlanningStyle;
    aside: AsideStyle;
    order: SectionId[];
  };
  waMessage: string;
  cta: { heading: string; text: string };
};
