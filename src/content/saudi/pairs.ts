import type { CityArea } from "./riyadh-areas";
import type { PlacePage, Section } from "./types";

/**
 * Area-to-area ride pages for one city.
 *
 * Safe-by-design rules (this is programmatic SEO, so it is deliberately restrictive):
 *  - Only useful pairs get a page: each area's nearest neighbours, plus the city's hubs (airport, business,
 *    heritage) with their nearest districts. Far-apart pairs are listed on the area page, not given a page.
 *  - One page per pair. Both directions are answered on it, so there is no reversed duplicate.
 *  - A page is only built when it has enough real facts, and is dropped if its text is too close to a page that
 *    is already built (see `similarity`).
 *  - Nothing states a fare, a journey time or availability.
 */

const EARTH_KM = 6371;
const rad = (x: number) => (x * Math.PI) / 180;

export function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.sqrt(h));
}

export function bearing(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const y = Math.sin(rad(b.lng - a.lng)) * Math.cos(rad(b.lat));
  const x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lng - a.lng));
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];

export type PairContext = {
  cityName: string;
  basePath: string;
  hubPath: string;
  regionName: string;
  regionPath: string;
  cityPath: string;
  /** Page to link for an area (area page, or airport page). */
  areaHref: (id: string) => string | undefined;
  bookingSteps: (where: string) => Section;
  notAssumed: Section;
  entities: PlacePage["entities"];
  cityEntity: PlacePage["entities"][number];
};

const label = (a: CityArea) => {
  if (a.id === "king-abdullah-financial-district") return "KAFD";
  if (a.kind === "airport") return "Riyadh Airport (RUH)";
  return a.name.replace(/\s*\(.*\)\s*$/, "");
};

const sentence = (s: string) => (/[.!?]$/.test(s) ? s : `${s}.`);
const lower1 = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

// --------------------------------------------------------------------------- selection
type Pair = { a: CityArea; b: CityArea; km: number; type: "airport" | "hub" | "district" };

function selectPairs(areas: CityArea[]): Pair[] {
  const dist = (x: CityArea, y: CityArea) => haversine(x, y);
  const keys = new Map<string, [CityArea, CityArea]>();
  const add = (x: CityArea, y: CityArea) => {
    if (x.id === y.id || dist(x, y) < 1.5) return;
    const [p, q] = x.rank < y.rank ? [x, y] : [y, x];
    keys.set(`${p.id}|${q.id}`, [p, q]);
  };
  const nearest = (x: CityArea, n: number) =>
    areas
      .filter((y) => y.id !== x.id && dist(x, y) >= 1.5)
      .sort((p, q) => dist(x, p) - dist(x, q))
      .slice(0, n);

  // Each area with its nearest neighbours.
  for (const x of areas) for (const y of nearest(x, 4)) add(x, y);
  // Each hub with its nearest districts, and every hub with every other hub.
  const hubs = areas.filter((x) => x.tier === "hub");
  for (const h of hubs) {
    for (const y of nearest(h, h.kind === "airport" ? 6 : 9)) add(h, y);
    for (const o of hubs) add(h, o);
  }

  // Cap the number of pages any single area takes part in.
  const CAP = 12;
  let pairs = [...keys.values()];
  const count = (id: string) => pairs.filter(([p, q]) => p.id === id || q.id === id).length;
  for (const x of areas) {
    while (count(x.id) > CAP) {
      const mine = pairs
        .filter(([p, q]) => p.id === x.id || q.id === x.id)
        .sort((m, n) => Number(n[0].tier === "hub" || n[1].tier === "hub") - Number(m[0].tier === "hub" || m[1].tier === "hub") || dist(n[0], n[1]) - dist(m[0], m[1]));
      const drop = mine[0];
      pairs = pairs.filter((pp) => pp !== drop);
    }
  }
  return pairs
    .map(([a, b]) => ({ a, b, km: dist(a, b), type: (a.kind === "airport" || b.kind === "airport" ? "airport" : a.tier === "hub" || b.tier === "hub" ? "hub" : "district") as Pair["type"] }))
    .sort((m, n) => (m.type === "airport" ? 0 : m.type === "hub" ? 1 : 2) - (n.type === "airport" ? 0 : n.type === "hub" ? 1 : 2) || m.km - n.km);
}

// --------------------------------------------------------------------------- content
function band(km: number): "near" | "mid" | "far" {
  return km < 4 ? "near" : km <= 12 ? "mid" : "far";
}

const bandNote = {
  near: "This is a short ride, so much of the time goes on leaving the pickup point and reaching the right entrance rather than on the road itself.",
  mid: "This is a typical cross-district ride. It usually crosses at least one main road, so traffic at the time you travel matters more than the distance.",
  far: "This is a long city ride. It is likely to use a main road or a ring road for much of the way, so peak-hour traffic can add a lot to the time.",
};

function build(p: Pair, ctx: PairContext): PlacePage {
  const { a, b, km } = p;
  const A = label(a);
  const B = label(b);
  const lo = Math.max(1, Math.round(km * 1.25));
  const hi = Math.max(lo + 1, Math.round(km * 1.55));
  const d = km < 10 ? km.toFixed(1) : String(Math.round(km));
  const dirAB = compass(bearing(a, b));
  const bd = band(km);
  const path = `${ctx.cityPath}/${a.id}-to-${b.id}`;
  const controlled = Boolean(a.controlled || b.controlled);
  const airport = a.kind === "airport" ? a : b.kind === "airport" ? b : undefined;
  const other = airport ? (airport === a ? b : a) : undefined;
  const hub = p.type === "hub" ? (a.tier === "hub" ? a : b) : undefined;
  const mid = Math.max(1, Math.round(km));

  const direct =
    p.type === "airport" && airport && other
      ? `Gulf Elite Transport arranges taxi and cab rides between ${label(other)} and ${airport.name} in ${ctx.cityName}, in both directions. The airport is about ${d} km from ${label(other)} in a straight line, roughly ${lo} to ${hi} km by road, to the ${compass(bearing(other, airport))} of ${label(other)}. Send your flight number, terminal and time, and we confirm the vehicle, driver and fare for your request before you commit.`
      : p.type === "hub" && hub
        ? `Looking for a taxi between ${A} and ${B} in ${ctx.cityName}? Gulf Elite Transport arranges rides in both directions. The two are about ${d} km apart in a straight line (roughly ${lo} to ${hi} km by road), with ${B} to the ${dirAB} of ${A}. ${hub === a ? A : B} is one of the city's main destinations, so tell us the exact entrance you need; the vehicle, driver and fare are confirmed for each request.`
        : `Gulf Elite Transport arranges taxi and cab rides between ${A} and ${B} in ${ctx.cityName}, in both directions. They are about ${d} km apart in a straight line, roughly ${lo} to ${hi} km by road, and ${B} lies ${dirAB} of ${A}. Give us the pickup street or landmark, the destination and the time, and the vehicle, driver and fare are confirmed for your request before you commit.`;

  const hubOther = hub ? (hub === a ? b : a) : undefined;
  const typePara =
    p.type === "airport" && airport && other
      ? `Rides to and from ${airport.name} follow flight times. For a departure, tell us your flight time and terminal so the pickup can be planned back from it. For an arrival, give the flight number and terminal so the car is ready when you come out. Most airport rides start in districts like ${label(other)}, where ${other.riders.toLowerCase()} are the usual riders.`
      : p.type === "hub" && hub && hubOther
        ? `${hub.name} is a place people travel to on purpose, for ${hub.purpose}. Rides between it and ${label(hubOther)} are mostly ${hubOther.riders.toLowerCase()} going there, or heading home afterwards.`
        : `Both ${A} and ${B} are everyday districts rather than single landmarks, so rides between them are usually local errands, family visits and commutes. Giving a street and a nearby landmark at each end is the quickest way to get a precise pickup.`;

  const sections: Section[] = [
    {
      id: "about",
      h2: `About the ${A} to ${B} ride`,
      kind: "text",
      paragraphs: [
        `${A} (${a.ar}) and ${B} (${b.ar}) are about ${d} km apart in a straight line, and ${B} lies to the ${dirAB} of ${A}. By road the distance is longer, roughly ${lo} to ${hi} km, depending on the route. ${bandNote[bd]}`,
        typePara,
      ],
    },
    { id: "start", h2: `${A}: pickup and drop-off notes`, kind: "text", paragraphs: [sentence(a.about), sentence(a.access)] },
    { id: "end", h2: `${B}: pickup and drop-off notes`, kind: "text", paragraphs: [sentence(b.about), sentence(b.access)] },
    {
      id: "directions",
      h2: "Both directions on one page",
      kind: "items",
      intro: `This page covers ${A} to ${B} and ${B} to ${A}. Each direction is confirmed separately for your request.`,
      items: [
        { title: `${A} to ${B}`, text: `${a.riders} starting in ${A} usually head to ${B} for ${b.purpose}. At the pickup end: ${lower1(sentence(a.access))}` },
        { title: `${B} to ${A}`, text: `${b.riders} starting in ${B} usually head to ${A} for ${a.purpose}. At the pickup end: ${lower1(sentence(b.access))}` },
        { title: "Return trips", text: `A return ride can be requested together with the outward one. Give the time you want to travel back, or tell us you will confirm it later.` },
      ],
    },
    airport && other
      ? {
          id: "timing",
          h2: "Flights and timing",
          kind: "items" as const,
          items: [
            { title: "Departures", text: `Plan the pickup back from your flight time. Tell us the airline and terminal if you know them.` },
            { title: "Arrivals", text: `Give the flight number so the plan can follow the flight rather than the scheduled time.` },
            { title: "Luggage", text: `Tell us the number of bags, so the vehicle suits them.` },
          ],
        }
      : controlled
        ? {
            id: "access",
            h2: "Gates and access",
            kind: "items" as const,
            items: [
              { title: "Name the gate", text: `${a.controlled ? A : B} has controlled entry, so tell us the gate or tower and the contact who expects you.` },
              { title: "Passes and checks", text: "Any pass or registration is arranged by the place you are visiting. We do not assume access on your behalf." },
              { title: "Allow waiting time", text: "Queues form at controlled entrances at busy times, so allow a little extra on arrival." },
            ],
          }
        : {
            id: "busy",
            h2: "When the ride is busiest",
            kind: "items" as const,
            items: [
              { title: "Weekday peaks", text: `Morning and late-afternoon traffic is heaviest around ${hub ? hub.name : `${A} and ${B}`}, so a ride at those times takes more planning.` },
              { title: "Evenings and weekends", text: `${hub && (hub.kind === "heritage" || hub.kind === "commercial") ? `Visits to ${hub.name} peak in the evening and at weekends.` : "Evenings and weekends are busier near shops, cafes and visitor areas."}` },
              { title: "Prayer times", text: "Roads and entrances can be busier just before and after prayer times, particularly near mosques and markets." },
            ],
          },
    {
      id: "landmarks",
      h2: "Landmarks at each end",
      kind: "items",
      items: [
        { title: A, text: a.landmarks.join(", ") },
        { title: B, text: b.landmarks.join(", ") },
      ],
    },
    ctx.bookingSteps(`in ${A}`),
    ctx.notAssumed,
  ];

  const faq: { q: string; a: string }[] = [
    { q: `How far is ${A} from ${B}?`, a: `About ${d} km in a straight line, with ${B} to the ${dirAB} of ${A}, and roughly ${lo} to ${hi} km by road. These are approximate figures, and the actual route is confirmed for each request.` },
    { q: `Is a taxi from ${B} to ${A} the same as from ${A} to ${B}?`, a: `Both directions are covered on this page. No standard fares are published, so the fare for each direction is confirmed with you before you commit.` },
    p.type === "airport"
      ? { q: "Which terminal should I give?", a: "Give the terminal shown on your ticket or flight information. If you are not sure, send the airline and flight number and we will confirm the details with you." }
      : controlled
        ? { q: `Can the car enter ${a.controlled ? A : B}?`, a: "Entry is controlled by the place itself. Tell us the gate or tower and the contact who expects you, and we confirm what is possible for your request." }
        : { q: `When is the ${A} to ${B} ride busiest?`, a: "Weekday mornings and late afternoons are the busiest, and evenings near shops and visitor areas. Sending your time in advance helps us confirm the plan." },
    b.rank > a.rank ? b.faq : a.faq,
  ];
  sections.push({ id: "faq", h2: `${A} and ${B}: questions`, kind: "faq", items: faq });

  const title = `Taxi from ${A} to ${B}, ${ctx.cityName}`;
  return {
    kind: "pair",
    path,
    name: `${A} to ${B}`,
    title,
    description: `Taxi and cab between ${A} and ${B} in ${ctx.cityName}, both directions: about ${d} km apart, roughly ${lo} to ${hi} km by road. Fare confirmed for each request.`,
    h1: `Taxi Between ${A} and ${B}`,
    lead: `About ${d} km apart in a straight line, in both directions. Fare, vehicle and timing are confirmed for each request.`,
    directAnswer: direct,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Taxi & Cab Services in Saudi Arabia", path: ctx.hubPath },
      { name: ctx.regionName, path: ctx.regionPath },
      { name: ctx.cityName, path: ctx.cityPath },
      { name: `${A} to ${B}`, path },
    ],
    facts: [
      p.type === "airport" ? { label: "Airport code", value: "RUH" } : { label: "Both ways", value: `${A} to ${B} and ${B} to ${A}` },
      { label: "Straight-line distance", value: `about ${d} km` },
      { label: "By road", value: `roughly ${lo} to ${hi} km` },
      { label: "Direction", value: `${B} is ${dirAB} of ${A}` },
    ],
    sections,
    layout: { hero: "schematic", body: "cards", form: "bottom" },
    entities: [
      { type: "Place", name: `${A}, ${ctx.cityName}`, ar: a.ar, lat: a.lat, lng: a.lng },
      { type: "Place", name: `${B}, ${ctx.cityName}`, ar: b.ar, lat: b.lat, lng: b.lng },
      ctx.cityEntity,
      ...ctx.entities,
    ],
    route: { from: A, to: B, km: mid },
    pair: { a: { name: A, lat: a.lat, lng: a.lng }, b: { name: B, lat: b.lat, lng: b.lng }, km, type: p.type },
    children: [],
    prefill: { pickup: `${A}, ${ctx.cityName}`, dropoff: `${B}, ${ctx.cityName}` },
  };
}

// --------------------------------------------------------------------------- quality gate
const UNIQUE_SECTIONS = new Set(["about", "start", "end", "directions", "landmarks", "faq", "timing", "access", "busy"]);

function shingles(page: PlacePage, n = 5): Set<string> {
  const text = [
    page.directAnswer,
    ...page.sections
      .filter((s) => UNIQUE_SECTIONS.has(s.id))
      .flatMap((s) => (s.kind === "text" ? s.paragraphs : s.kind === "items" ? s.items.map((i) => `${i.title} ${i.text}`) : s.kind === "faq" ? s.items.map((f) => `${f.q} ${f.a}`) : [])),
  ]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + n <= text.length; i++) out.add(text.slice(i, i + n).join(" "));
  return out;
}

export const similarity = (x: Set<string>, y: Set<string>) => {
  let inter = 0;
  for (const s of x) if (y.has(s)) inter++;
  return inter / (x.size + y.size - inter || 1);
};

const MIN_UNIQUE_WORDS = 380;
const MAX_SIMILARITY = 0.5;

const wordCount = (page: PlacePage) =>
  page.sections
    .filter((s) => UNIQUE_SECTIONS.has(s.id))
    .flatMap((s) => (s.kind === "text" ? s.paragraphs : s.kind === "items" ? s.items.map((i) => `${i.title} ${i.text}`) : s.kind === "faq" ? s.items.map((f) => `${f.q} ${f.a}`) : []))
    .join(" ")
    .split(/\s+/).length;

export type PairResult = {
  pages: PlacePage[];
  dropped: { name: string; reason: string }[];
  /** Links to the pair pages each area takes part in, nearest first. */
  index: Record<string, { name: string; href: string; km: number }[]>;
};

export function buildPairs(areas: CityArea[], ctx: PairContext): PairResult {
  const selected = selectPairs(areas);
  const kept: { page: PlacePage; sh: Set<string>; a: string; b: string }[] = [];
  const dropped: PairResult["dropped"] = [];
  for (const p of selected) {
    const page = build(p, ctx);
    if (wordCount(page) < MIN_UNIQUE_WORDS) {
      dropped.push({ name: page.name, reason: "not enough unique content" });
      continue;
    }
    const sh = shingles(page);
    const clash = kept.find((k) => similarity(sh, k.sh) > MAX_SIMILARITY);
    if (clash) {
      dropped.push({ name: page.name, reason: `too similar to ${clash.page.name}` });
      continue;
    }
    kept.push({ page, sh, a: p.a.id, b: p.b.id });
  }

  // Related-rides links, built once the final set of pages is known.
  const index: PairResult["index"] = {};
  for (const k of kept) {
    for (const id of [k.a, k.b]) (index[id] ??= []).push({ name: k.page.name, href: k.page.path, km: k.page.pair!.km });
  }
  for (const k of Object.keys(index)) index[k].sort((m, n) => m.km - n.km);

  for (const k of kept) {
    const related = [k.a, k.b].flatMap((id) => (index[id] ?? []).filter((r) => r.href !== k.page.path).slice(0, 4));
    const seen = new Set<string>();
    const unique = related.filter((r) => (seen.has(r.href) ? false : (seen.add(r.href), true)));
    const links = [
      ...[k.a, k.b].map((id) => {
        const href = ctx.areaHref(id);
        const ar = areas.find((x) => x.id === id)!;
        return href ? { name: `${label(ar)} ride guide`, href, note: "Area guide" } : undefined;
      }).filter((x): x is { name: string; href: string; note: string } => Boolean(x)),
      { name: `Taxi & Cab Service in ${ctx.cityName}`, href: ctx.cityPath, note: "City guide" },
      ...unique.map((r) => ({ name: r.name, href: r.href, note: `about ${r.km < 10 ? r.km.toFixed(1) : Math.round(r.km)} km` })),
    ];
    const at = k.page.sections.findIndex((s) => s.id === "how");
    k.page.sections.splice(at < 0 ? k.page.sections.length - 1 : at, 0, { id: "related", h2: "Related rides and guides", kind: "links", items: links });
    k.page.children = [];
  }

  return { pages: kept.map((k) => k.page), dropped, index };
}
