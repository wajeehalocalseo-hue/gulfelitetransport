import type { PlacePage, Section } from "../types";
import { site, whatsappUrl } from "@/lib/site";
import type { TownRich, TownSectionId, TownStyle } from "./types";

/**
 * Builder for the Riyadh Region town taxi route pages ("Riyadh to <town> Taxi Service", see specs-*.ts and build.ts townRoutePages).
 * Every page is hand-written in its spec; this file holds the shared structure and the build-time checks. A failed check stops the build:
 *  - the driving directions are exactly 100 words, one paragraph;
 *  - the Google Maps list has no duplicates and at most 25 entries (fewer only when the spec says why in `shortfall`);
 *  - the primary keyword "Riyadh to <name> taxi service" is in the title, H1 and lead;
 *  - the description is at most 158 characters (the page head cuts longer ones) and points the reader to WhatsApp (no phone number or call option anywhere);
 *  - the title is at most 60 characters, and there are at least five FAQs.
 * One page covers both directions (Riyadh to the town and the town to Riyadh); there is no separate reverse page.
 * The page is drawn by components/RichTown.tsx in one of six styles (TownStyle), so the pages do not share one layout.
 */

export type LinkEntry = string | [label: string, query: string];

export type TownSpec = {
  /** URL part: the route id is `riyadh-to-${id}`. */
  id: string;
  /** Name as shown on the page, for example "Al Majma'ah". */
  name: string;
  ar: string;
  lat: number;
  lng: number;
  /** For example "Al Majma'ah Governorate, Riyadh Region". */
  area: string;
  /** Region wording used in map queries and weather labels (default Riyadh Region). */
  regionLabel?: string;
  /** Suffix for default Maps queries, for example "Makkah Region, Saudi Arabia". */
  areaSuffix?: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  directAnswer: string;
  eyebrow: string;
  heroPoints: [string, string, string, string];
  /** Road distance and light-traffic time from the Riyadh centre (OpenStreetMap routing, reviewed November 2026). */
  km: number;
  min: number;
  /** Extra route facts (two or three), after the distance, direction and area facts the builder adds. */
  facts: { label: string; value: string }[];
  introHeading: string;
  intro: string[];
  out: { heading: string; paragraphs: string[] };
  back: { heading: string; paragraphs: string[] };
  pickups: { name: string; text: string }[];
  drops: { name: string; text: string }[];
  placesHeading: string;
  placesIntro: string;
  places: { name: string; detail: string; text: string }[];
  plan: { title: string; text: string }[];
  info: { title: string; text: string }[];
  /** Other route ids to link to: ids of other town pages ("al-kharj" style short ids) and existing route ids ("riyadh-to-al-kharj"). */
  related: string[];
  faq: { q: string; a: string }[];
  /** Exactly 100 words, one paragraph. */
  directions: string;
  localIntro: string;
  /** Groups of Google Maps entries: a label, or [label, query] when the query needs more detail. */
  linkTitles: [string, string, string, string];
  linkGroups: [LinkEntry[], LinkEntry[], LinkEntry[], LinkEntry[]];
  /** Set only when fewer than 25 verified places exist; says why. */
  shortfall?: string;
  ctaHeading: string;
  ctaText: string;
};


/**
 * The same instruction (how many passengers, how the fare is confirmed, how waiting works) is true on every page, but it is not worded the same way on all 26.
 * Each standard sentence has a few equivalent wordings, and a page uses one of them, chosen from its position, so the pages do not repeat each other word for word.
 * The facts in every wording are identical: nothing here changes what the page promises.
 */
const WORDINGS: Record<string, string[]> = {
  "Passengers, bags, child seats if needed. The group size decides the vehicle.": [
    "Tell us how many people are travelling and how many bags. Add child seats or bulky items if you have them, because they change the vehicle.",
    "Give the number of passengers and bags, and say if you need a child seat. This decides which vehicle we propose.",
    "How many people, and how much luggage? Child seats and large items matter, so mention them early.",
  ],
  "We reply with the vehicle, driver details and fare. Nothing is agreed until you say yes.": [
    "We send back the vehicle, the driver's details and the fare. You decide whether to go ahead.",
    "You receive the vehicle, driver and fare from us. Nothing is booked until you agree.",
    "We reply with a vehicle, a driver and a fare for your request. The booking starts only when you accept.",
  ],
  "Message us on WhatsApp with the direction you need, or send the booking form. The vehicle, driver and fare are confirmed with you before you commit.": [
    "Send us the direction you need on WhatsApp, or fill in the booking form. We confirm the vehicle, driver and fare first, and you decide after that.",
    "WhatsApp us the trip you want, or use the booking form. Vehicle, driver and fare are confirmed before you commit to anything.",
    "Use the WhatsApp button for your direction, or the booking form. We confirm every detail with you before the booking is final.",
  ],
  "Waiting can be requested. Tell us how long you expect, and we agree it and its cost before you commit.": [
    "You can ask for waiting time. Say how long you expect to need, and we agree the time and the cost with you first.",
    "If the driver needs to wait, tell us for how long. The waiting time and its cost are agreed before you commit.",
    "Waiting can be added to a trip. Give us your expected time and we confirm the details and the cost.",
  ],
  "The distance, exact addresses, date and time, passengers, bags, waiting time and whether you want a return. Fares are not published.": [
    "The fare depends on the distance, the exact pickup and drop-off, the date and time, your group and luggage, any waiting, and a return if you want one. Fares are not published.",
    "Price is set per request, using the route, the addresses, the date, the number of passengers and bags, waiting time and any return trip. We publish no standard fares.",
    "What moves the quotation: the distance, where exactly you start and finish, when you travel, who and what travels, how long the driver waits and whether you return. No fares are published.",
  ],
  "Give the building name and the entrance, and a phone number that will be answered.": [
    "Name the hotel or building and the entrance you want, and give a phone number that will be answered.",
    "Say which hotel, office or tower, which door, and a number we can call on the day.",
    "Give the building and its entrance, plus a phone number the driver can reach.",
  ],
  "Send flight number, date, terminal if known, passengers and bags. The pickup point follows the airport's own rules and is agreed first.": [
    "Give the flight number, date, terminal if you know it, and the number of passengers and bags. The airport sets where cars may collect, and we agree the pickup point with you first.",
    "Send your flight details, your terminal if known, and your group size and luggage. Pickup follows the airport's own rules, and we confirm the point before you travel.",
    "Share the flight number and date, the terminal if you know it, and how many people and bags. We agree the pickup point with you, following the airport's rules.",
  ],
  "These names come from OpenStreetMap and Nominatim and are useful as drop-off or pickup references. We do not publish opening hours or entry rules for any of them.": [
    "The places below come from OpenStreetMap and Nominatim. Use them as pickup or drop-off references; we do not publish their opening hours or entry rules.",
    "Names here are taken from OpenStreetMap and Nominatim, and work well as meeting points. Opening hours and entry rules are not published by us.",
    "Each place is listed on OpenStreetMap or Nominatim. They help describe where to meet; check opening hours and entry rules with the site itself.",
  ],
};

export const PHONE_DISPLAY = "+966 57 985 8464";
const PHONE_DIGITS = "966579858464";
export const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

const STYLES: TownStyle[] = ["road", "journey", "editorial", "split", "board", "ledger"];
/** Section orders per style, so that the same content is arranged differently from page to page. */
const ORDERS: Record<TownStyle, TownSectionId[]> = {
  road: ["intro", "both", "pickups", "drops", "places", "plan", "info", "related", "faq"],
  journey: ["both", "intro", "places", "pickups", "drops", "plan", "info", "faq", "related"],
  editorial: ["intro", "places", "both", "drops", "pickups", "info", "plan", "related", "faq"],
  split: ["intro", "both", "drops", "places", "pickups", "plan", "faq", "info", "related"],
  board: ["both", "intro", "pickups", "drops", "plan", "places", "info", "faq", "related"],
  ledger: ["intro", "pickups", "both", "drops", "info", "places", "plan", "faq", "related"],
};

export type Origin = { name: string; slot: string; idPrefix: string; areaSuffix: string; regionName?: string; moreLinks?: { href: string; label: string }[]; pickupIntro?: string };
export const RIYADH_ORIGIN: Origin = { name: "Riyadh", slot: "riyadh", idPrefix: "riyadh-to-", areaSuffix: "Riyadh Region, Saudi Arabia" };

export type TownCtx = {
  origin?: Origin;
  riyadh: { lat: number; lng: number };
  /** Link targets that exist: every town route id and existing route id, mapped to its path and display name. */
  routeTargets: Record<string, { href: string; name: string; note: string }>;
  airportHref: string;
  regionHref: string;
  routesHref: string;
  index: number;
};

const vary = (text: string, index: number, salt: number): string => {
  const alt = WORDINGS[text];
  if (!alt) return text;
  const k = (index + salt) % (alt.length + 1);
  return k === 0 ? text : alt[k - 1];
};

export function buildTownRoute(spec: TownSpec, ctx: TownCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections" | "town"> & { whatsappMessage: string; keyword: string; mapCount: number } {
  if (site.whatsapp !== PHONE_DIGITS) throw new Error("site.whatsapp no longer matches the verified number used in the descriptions");
  const O = ctx.origin ?? RIYADH_ORIGIN;
  const keyword = `${O.name} to ${spec.name} taxi service`;
  for (const [label, v] of [["title", spec.title], ["h1", spec.h1], ["lead", spec.lead]] as const) {
    if (!v.toLowerCase().includes(keyword.toLowerCase())) throw new Error(`${spec.name}: the primary keyword "${keyword}" is missing from the ${label}`);
  }
  if (spec.title.length > 60) throw new Error(`${spec.name}: the title is ${spec.title.length} characters`);
  if (spec.description.length > 158) throw new Error(`${spec.name}: the description is ${spec.description.length} characters (max 158)`);
  if (!/whatsapp/i.test(spec.description) || /call|\+966|phone/i.test(spec.description)) throw new Error(`${spec.name}: the description must send readers to WhatsApp and must not mention a call or a number`);
  if (spec.faq.length < 5) throw new Error(`${spec.name}: fewer than five FAQs`);
  const words = wordCount(spec.directions);
  if (words !== 100) throw new Error(`${spec.name}: the driving directions have ${words} words, not 100`);
  const labels = spec.linkGroups.flat().map((e) => (typeof e === "string" ? e : e[0]));
  const queries = spec.linkGroups.flat().map((e) => (typeof e === "string" ? `${e}, ${spec.areaSuffix ?? O.areaSuffix}` : e[1]));
  if (labels.length > 25 || new Set(labels.map((x) => x.toLowerCase())).size !== labels.length || new Set(queries.map((x) => x.toLowerCase())).size !== queries.length) {
    throw new Error(`${spec.name}: the Maps list has ${labels.length} entries or contains duplicates`);
  }
  if (labels.length < 25 && !spec.shortfall) throw new Error(`${spec.name}: only ${labels.length} Maps entries and no shortfall note`);

  const out = whatsappUrl(`Hello Gulf Elite Transport Group, I would like to request a private taxi from ${O.name} to ${spec.name}. Please confirm availability, vehicle options and fare.`);
  const back = whatsappUrl(`Hello Gulf Elite Transport Group, I would like to request a private taxi from ${spec.name} to ${O.name}. Please confirm availability, vehicle options and fare.`);

  const related = spec.related.map((id) => {
    const t = ctx.routeTargets[id];
    if (!t) throw new Error(`${spec.name}: related route "${id}" does not exist`);
    return { name: t.name, href: t.href, text: t.note };
  });

  const q = (e: LinkEntry) => ({ name: typeof e === "string" ? e : e[0], query: typeof e === "string" ? `${e}, ${spec.areaSuffix ?? O.areaSuffix}` : e[1] });
  const local: Extract<Section, { kind: "local" }> = {
    id: "local",
    h2: `Local information for ${spec.name}`,
    kind: "local",
    intro: spec.localIntro,
    mapQuery: `${spec.lat},${spec.lng}`,
    mapLabel: `${spec.name}, ${spec.regionLabel ?? "Riyadh Region"}`,
    directionsTitle: `Driving Directions from ${O.name} to ${spec.name}`,
    directions: spec.directions,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: spec.linkGroups.map((g, i) => ({ title: spec.linkTitles[i], links: g.map(q) })).filter((g) => g.links.length > 0),
    weatherTitle: `Current Weather in ${O.name} (departure)`,
    weather: { place: O.name, lat: ctx.riyadh.lat, lng: ctx.riyadh.lng },
    weather2Title: `Current Weather in ${spec.name} (arrival)`,
    weather2: { place: `${spec.name}, ${spec.regionLabel ?? "Riyadh Region"}`, lat: spec.lat, lng: spec.lng },
  };

  const style = STYLES[ctx.index % STYLES.length];
  const n = spec.name;
  const at = <T extends { text: string }>(arr: T[], salt: number): T[] => arr.map((x, j) => ({ ...x, text: vary(x.text, ctx.index, salt + j) }));
  const town: TownRich = {
    style,
    order: ORDERS[style],
    fromName: O.name,
    originSlot: O.slot,
    moreLinks: O.moreLinks,
    toName: n,
    imageFolder: `${O.idPrefix}${spec.id}`,
    eyebrow: spec.eyebrow,
    heroPoints: [...spec.heroPoints],
    heroAlt: `The road between ${O.name} and ${n} in ${spec.regionLabel ?? "Riyadh Region"}`,
    km: spec.km,
    min: spec.min,
    facts: [
      { label: "Road distance", value: `about ${Math.round(spec.km)} km` },
      { label: "Light-traffic drive", value: `about ${spec.min} min` },
      { label: "Place", value: spec.area },
      { label: "Directions", value: "Both ways, one page" },
      ...spec.facts,
    ],
    factsNote: `Road distance and time are estimates from OpenStreetMap routing between the centres of ${O.name} and ${n}, reviewed in November 2026. They are not straight-line distances or a promised journey time: traffic, your exact addresses, rest stops and the time of day change the drive.`,
    introHeading: spec.introHeading,
    intro: spec.intro,
    out: spec.out,
    back: spec.back,
    pickupHeading: `Starting in ${O.name}: where we collect you`,
    pickupIntro: O.pickupIntro ?? `Tell us exactly where in ${O.name} the trip begins. A clear pin or building name saves time on the day.`,
    pickups: at(spec.pickups, 0),
    pickupAlt: `A private car waiting for a passenger in ${O.name} before a trip to ${n}`,
    dropHeading: `Arriving in ${n}: where we drop you`,
    dropIntro: `Give the street, district or place you are going to in ${n}. If you are not sure, send a map pin and we confirm the stop with you.`,
    drops: at(spec.drops, 1),
    dropAlt: `${n} in ${spec.regionLabel ?? "Riyadh Region"}`,
    highwayAlt: `The highway from ${O.name} towards ${n}`,
    placesHeading: spec.placesHeading,
    placesIntro: vary(spec.placesIntro, ctx.index, 2),
    places: spec.places,
    planHeading: `Plan your ride between ${O.name} and ${n}`,
    plan: at(spec.plan, 0),
    mapQuery: { from: `${O.name}, Saudi Arabia`, to: `${n}, ${spec.areaSuffix ?? O.areaSuffix}` },
    infoHeading: `What to know before you book ${O.name} to ${n}`,
    infoIntro: `Four things decide how smoothly this trip runs. Having them ready also gives you a faster quotation.`,
    info: at(spec.info, 3),
    relatedHeading: `Other routes from ${O.name}`,
    related,
    faqHeading: `${O.name} to ${n}: questions`,
    faq: spec.faq.map((x, j) => ({ ...x, a: vary(x.a, ctx.index, 2 + j) })),
    contact: { outUrl: out ?? undefined, backUrl: back ?? undefined },
    local,
    ctaHeading: spec.ctaHeading,
    ctaText: vary(spec.ctaText, ctx.index, 1),
    ctaButton: `Request your ${n} ride`,
  };

  // The page is drawn from `town`; these sections are what the structured data and the site's text exports read.
  const sections: Section[] = [
    { id: "faq", h2: town.faqHeading, kind: "faq", items: spec.faq },
    {
      id: "links",
      h2: `More around ${O.name} and ${n}`,
      kind: "links",
      items: [
        ...(O.idPrefix !== RIYADH_ORIGIN.idPrefix
          ? [
              { name: `${O.regionName ?? O.name + " Region"} taxi pages`, href: ctx.regionHref, note: "Cities and towns in the region" },
              { name: "Taxi and cab services", href: "/services/taxi-cab-services", note: "The service behind these routes" },
              { name: "Passenger transport", href: "/services/passenger-transport", note: "Transport for groups and families" },
            ]
          : [
              { name: "Riyadh Taxi Service", href: "/riyadh-taxi-service", note: "City rides, districts and airport transfers" },
              { name: "Riyadh Region taxi pages", href: ctx.regionHref, note: "Cities and towns in the region" },
              { name: "King Khalid International Airport (RUH)", href: ctx.airportHref, note: "Airport transfers" },
            ]),
        ...related.map((r) => ({ name: r.name, href: r.href, note: r.text })),
        { name: "All intercity routes", href: ctx.routesHref, note: "Every route page" },
        { name: "Book a ride", href: "/book", note: "The booking form" },
        { name: "Contact us", href: "/contact", note: "Other ways to reach us" },
      ],
    },
    local,
  ];

  return {
    title: spec.title,
    description: spec.description,
    h1: spec.h1,
    lead: spec.lead,
    directAnswer: spec.directAnswer,
    facts: town.facts.slice(0, 4),
    sections,
    town,
    whatsappMessage: `Hello Gulf Elite Transport Group, I would like to request a private taxi from ${O.name} to ${spec.name}. Please confirm availability, vehicle options and fare.`,
    keyword,
    mapCount: labels.length,
  };
}
