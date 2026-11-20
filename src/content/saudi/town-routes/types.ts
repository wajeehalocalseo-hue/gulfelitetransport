import type { Section } from "../types";

/** Six layout families for the town route pages. Every page uses one; the words are always its own. */
export type TownStyle = "road" | "journey" | "editorial" | "split" | "board" | "ledger";

export type TownSectionId = "intro" | "both" | "pickups" | "drops" | "places" | "plan" | "info" | "related" | "faq";

/** Everything the town route components (components/RichTown.tsx) draw. Built by town-routes/factory.ts from a hand-written TownSpec. */
export type TownRich = {
  style: TownStyle;
  order: TownSectionId[];
  fromName: string;
  toName: string;
  /** Folder under public/images/routes/ with the slots hero, highway, riyadh and destination. */
  imageFolder: string;
  eyebrow: string;
  heroPoints: string[];
  heroAlt: string;
  km: number;
  min: number;
  facts: { label: string; value: string }[];
  factsNote: string;
  introHeading: string;
  intro: string[];
  out: { heading: string; paragraphs: string[] };
  back: { heading: string; paragraphs: string[] };
  pickupHeading: string;
  pickupIntro: string;
  pickups: { name: string; text: string }[];
  pickupAlt: string;
  dropHeading: string;
  dropIntro: string;
  drops: { name: string; text: string }[];
  dropAlt: string;
  highwayAlt: string;
  placesHeading: string;
  placesIntro: string;
  places: { name: string; detail: string; text: string }[];
  planHeading: string;
  plan: { title: string; text: string }[];
  mapQuery: { from: string; to: string };
  infoHeading: string;
  infoIntro: string;
  info: { title: string; text: string }[];
  relatedHeading: string;
  related: { name: string; href: string; text: string }[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  /** Phone, WhatsApp (both directions) and the booking links shown in the contact strip. */
  contact: { outUrl?: string; backUrl?: string; callUrl: string; phone: string };
  local: Extract<Section, { kind: "local" }>;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
};
