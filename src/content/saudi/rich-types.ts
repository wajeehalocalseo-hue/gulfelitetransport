/** Content for one fully designed route page (used by RichRoute). Everything here is plain data, so the page layout stays the same for any route that gets this treatment. */
export type RichRoute = {
  fromName: string;
  /** Link to the destination city page, shown under related routes. */
  toHref?: string;
  toName: string;
  /** "road" is the standard long-journey design; "business" is a darker, work-focused design with extra sections. */
  variant?: "road" | "business" | "umrah" | "madinah" | "qassim" | "ahsa" | "hail" | "kharj" | "khobar" | "dhahran" | "taif" | "abha" | "jubail" | "yanbu" | "alula" | "najran" | "tabuk" | "jazan" | "albaha" | "sakaka" | "arar" | "hafar";
  /** Yanbu variant: the historic old town (Yanbu Al-Bahr). */
  heritage?: { heading: string; intro: string; items: { name: string; detail: string; text: string }[]; note: string; slot: string; alt: string };
  /** Umrah variant: family and group travel section. */
  umrah?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string; slot: string; alt: string };
  /** Umrah variant: religious travel preparation (informational only), with official links. */
  miqat?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string; links: { name: string; href: string }[] };
  /** Drop-off planning: what to send, and a short access warning. */
  dropChecklist?: string[];
  dropNote?: string;
  /** Madinah variant: the road via Qassim, as a short list of stops with a note. */
  route?: { heading: string; intro: string; stops: { name: string; detail: string; text: string }[]; note: string };
  /** Madinah variant: railway connection, with a link to the existing transfers page. */
  railway?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string; href: string; linkLabel: string };
  /** Madinah variant: visit planning for destinations in and around the city, with official links. */
  ziyarat?: { heading: string; intro: string; items: { name: string; text: string; href?: string }[]; note: string; links: { name: string; href: string }[] };
  /** Qassim variant: the date market and seasonal travel. */
  market?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string };
  /** Qassim variant: nearby cities that are separate destinations, with estimated distances from the Buraydah centre. */
  cities?: { heading: string; intro: string; items: { name: string; detail: string; text: string; href?: string }[]; note: string };
  /** Al-Ahsa variant: what the place names mean (city, governorate, oasis). */
  terms?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string };
  /** Al Kharj variant: farm, factory and site transfers. */
  sites?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string; slot: string; alt: string };
  /** Al Khobar variant: the King Fahd Causeway and Bahrain, with official links (internal links start with "/"). */
  causeway?: { heading: string; intro: string; items: { title: string; text: string }[]; note: string; links: { name: string; href: string }[] };
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
