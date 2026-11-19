import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Shared builder for the hand-written Riyadh district pages in the "16-page batch" (Al Badiah ... Al Mansourah).
 * The structure is common (about, journeys table, written blocks, nearby districts, booking steps, WhatsApp, links, FAQ, local information),
 * but every sentence on a page comes from that district's own spec file, and each spec chooses its own blocks and their order.
 *
 * Build-time checks (a failed check stops the build): the directions paragraph is exactly 100 words, the Google Maps list has exactly 25
 * unique entries, the primary keyword is in the title, H1 and lead, and the district exists in riyadh-areas.ts.
 */

export type Fig = { km: number; min: number };
export type Block = { id: string; h2: string; paragraphs: string[] };

export type DistrictSpec = {
  id: string;
  /** Name as written on the page, for example "Al Badiah". The primary keyword is `${name} Taxi Service`. */
  name: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  directAnswer: string;
  facts: { label: string; value: string }[];
  aboutH2: string;
  about: string[];
  journeysIntro?: string;
  journeysNote: string;
  /** Road figures from the centre of the district (OpenStreetMap routing, light traffic): airport, Olaya, KAFD, Ad Dirah, Al Malaz. */
  figs: { ruh: Fig; olaya: Fig; kafd: Fig; adDirah: Fig; malaz: Fig };
  /** Written blocks, in page order, placed after the journeys table. */
  blocks: Block[];
  nearIds: string[];
  nearH2?: string;
  nearIntro: string;
  nearExtra?: { name: string; id: string; note: string; href?: string }[];
  whatsappTrips: string;
  whatsappExtra?: string;
  faqH2?: string;
  faq: { q: string; a: string }[];
  /** Exactly 100 words, one paragraph. */
  directions: string;
  localIntro: string;
  /** 25 Google Maps entries in four groups. Names are used as the search query; a trailing "Metro Station" or "Line n" adds the metro context. */
  linkLists: { districts: string[]; places: string[]; others: string[]; cities: string[]; titles: [string, string, string, string] };
  waMessage: string;
};

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });
const riyadhQuery = (n: string) => (/Metro Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

export function buildDistrictRich(spec: DistrictSpec, ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === spec.id);
  if (!me) throw new Error(`${spec.name} is missing from riyadh-areas.ts`);
  const keyword = `${spec.name} Taxi Service`;
  for (const [label, v] of [["title", spec.title], ["h1", spec.h1], ["lead", spec.lead]] as const) {
    if (!v.includes(keyword)) throw new Error(`${spec.name}: the primary keyword "${keyword}" is missing from the ${label}`);
  }
  const words = wordCount(spec.directions);
  if (words !== 100) throw new Error(`${spec.name}: the driving directions have ${words} words, not 100`);
  const l = spec.linkLists;
  const all25 = [...l.districts, ...l.places, ...l.others, ...l.cities];
  if (all25.length !== 25 || new Set(all25.map((x) => x.toLowerCase())).size !== 25) throw new Error(`${spec.name}: the Maps list has ${all25.length} entries (${new Set(all25).size} unique), not 25`);

  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const f = spec.figs;
  const row = (label: string, fig: Fig, hub: string) => ({ cells: [`${spec.name} to ${label}`, `about ${Math.round(fig.km)} km`, `about ${fig.min} min`], href: pairHref(hub) });

  const about = text("about", spec.aboutH2, spec.about);
  const journeys: Section = {
    id: "journeys",
    h2: `Popular journeys from ${spec.name}`,
    kind: "table",
    intro: spec.journeysIntro ?? `Road distance and light-traffic driving time from the centre of ${spec.name} to the places people ask about most. Pick a row to open the full ride page, which covers both directions.`,
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      row("Riyadh Airport (RUH)", f.ruh, "king-khalid-international-airport"),
      row("Olaya", f.olaya, "olaya"),
      row("KAFD", f.kafd, "king-abdullah-financial-district"),
      row("Ad Dirah", f.adDirah, "ad-dirah"),
      row("Al Malaz", f.malaz, "al-malaz"),
    ],
    note: spec.journeysNote,
  };
  const blocks = spec.blocks.map((b) => text(b.id, b.h2, b.paragraphs));

  const near = spec.nearIds
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  if (near.length !== spec.nearIds.length) throw new Error(`${spec.name}: a nearby district id is missing from riyadh-areas.ts`);
  const nearby: Section = {
    id: "nearby",
    h2: spec.nearH2 ?? `Districts near ${spec.name}`,
    kind: "links",
    intro: spec.nearIntro,
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      ...(spec.nearExtra ?? []).map((e) => ({ name: e.name, href: e.href ?? ctx.districtHref(e.id), note: e.note })),
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    `Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (${spec.whatsappTrips}), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.`,
    spec.whatsappExtra ?? "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: `More around ${spec.name}`,
    kind: "links",
    items: [
      { name: "Riyadh Taxi Service", href: "/riyadh-taxi-service", note: "All Riyadh pickups and districts" },
      { name: "King Khalid International Airport (RUH)", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport", note: "Airport transfers" },
      { name: "Intercity routes from Riyadh", href: "/taxi-saudi-arabia/routes", note: "Long-distance private transfers" },
      { name: "Book a ride", href: "/book", note: "The booking form" },
      { name: "Contact us", href: "/contact", note: "Other ways to reach us" },
    ],
  };

  const faq: Section = { id: "faq", h2: spec.faqH2 ?? `${spec.name} taxi service: questions`, kind: "faq", items: spec.faq };

  const local: Section = {
    id: "local",
    h2: `Local information for ${spec.name}`,
    kind: "local",
    intro: spec.localIntro,
    mapQuery: `${me.lat},${me.lng}`,
    mapLabel: `${spec.name}, Riyadh`,
    directionsTitle: `Driving Directions from ${spec.name}, Riyadh`,
    directions: spec.directions,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: l.titles[0], links: l.districts.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: l.titles[1], links: l.places.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: l.titles[2], links: l.others.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: l.titles[3], links: l.cities.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: `Current Weather in ${spec.name}, Riyadh`,
    weather: { place: `${spec.name}, Riyadh`, lat: me.lat, lng: me.lng },
  };

  return {
    title: spec.title,
    description: spec.description,
    h1: spec.h1,
    lead: spec.lead,
    directAnswer: spec.directAnswer,
    facts: spec.facts,
    sections: addLinks(addImages([about, journeys, ...blocks, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local], spec.name, undefined, 4), ctx, spec.id),
    whatsappMessage: spec.waMessage,
  };
}
