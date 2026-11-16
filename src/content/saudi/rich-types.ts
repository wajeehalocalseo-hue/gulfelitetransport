/** Content for one fully designed route page (used by RichRoute). Everything here is plain data, so the page layout stays the same for any route that gets this treatment. */
export type RichRoute = {
  fromName: string;
  /** Link to the destination city page, shown under related routes. */
  toHref?: string;
  toName: string;
  /** "road" is the standard long-journey design; "business" is a darker, work-focused design with extra sections. */
  variant?: "road" | "business" | "umrah";
  /** Umrah variant: family and group travel section. */
  umrah?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string; slot: string; alt: string };
  /** Umrah variant: religious travel preparation (informational only), with official links. */
  miqat?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string; links: { name: string; href: string }[] };
  /** Drop-off planning: what to send, and a short access warning. */
  dropChecklist?: string[];
  dropNote?: string;
  business?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string };
  eastern?: { heading: string; intro: string; items: { name: string; detail: string; text: string; href?: string }[]; note: string };
  airport?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string; href: string; slot: string; alt: string };
  /** Folder under public/images/routes/ for this route's photos, for example "riyadh-to-jeddah". */
  imageFolder: string;
  eyebrow: string;
  heroPoints: string[];
  heroAlt: string;
  facts: { label: string; value: string }[];
  factsNote: string;
  introHeading: string;
  intro: string[];
  whyHeading: string;
  why: { title: string; text: string }[];
  vehiclesHeading: string;
  vehiclesIntro: string;
  vehicles: { slot: string; homePhoto?: string; name: string; best: string; text: string; alt: string }[];
  pickupHeading: string;
  pickupIntro: string;
  pickups: { name: string; text: string; href?: string }[];
  pickupAlt: string;
  dropHeading: string;
  dropIntro: string;
  drops: { name: string; text: string; href?: string }[];
  dropAlt: string;
  planHeading: string;
  plan: { title: string; text: string }[];
  mapQuery: { from: string; to: string };
  highwayAlt: string;
  whoHeading: string;
  who: { title: string; text: string }[];
  stepsHeading: string;
  steps: { title: string; text: string }[];
  infoHeading: string;
  infoIntro: string;
  info: { title: string; text: string }[];
  relatedHeading: string;
  related: { name: string; href: string; text: string }[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
};
