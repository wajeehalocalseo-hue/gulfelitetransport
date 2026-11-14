import journeysJson from "./riyadh-journeys.json";
import type { CityArea } from "./riyadh-areas";
import { bearing, haversine } from "./pairs";
import type { Area, PlacePage, Section } from "./types";

/**
 * Landing-page content for each Riyadh district page.
 *
 * Every figure comes from data we hold: district centres from OpenStreetMap, and driving distance and time from
 * OpenStreetMap routing between those centres (rounded; light traffic). Pickup notes, riders and purposes are the
 * reviewed notes in riyadh-areas.ts and places.ts. Nothing states a fare, a rating or a guarantee.
 */
const J = journeysJson as Record<string, Record<string, { km: number; min: number }>>;
const REVIEWED = "November 2026";

const HUBS: { id: string; name: string }[] = [
  { id: "king-khalid-international-airport", name: "Riyadh Airport (RUH)" },
  { id: "olaya", name: "Olaya" },
  { id: "king-abdullah-financial-district", name: "KAFD" },
  { id: "ad-dirah", name: "Ad Dirah (old city)" },
  { id: "diriyah", name: "Diriyah" },
];

const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
export const fmtKm = (km: number) => (km < 10 ? km.toFixed(1) : String(Math.round(km)));
export const fmtMin = (m: number) => {
  const r = m <= 10 ? m : Math.round(m / 5) * 5;
  return r >= 60 ? `${Math.floor(r / 60)} hr${r % 60 ? ` ${r % 60} min` : ""}` : `${r} min`;
};
const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];

/** Names in the landmark lists that are generic descriptions, not places that can be opened in a map. */
const GENERIC = /\b(streets?|roads?|shops?|markets?|villas?|apartments?|homes?|housing|schools?|clinics?|services?|blocks?|towers|offices|restaurants|cafes|gates?|ring|areas?|neighbourhood|residential|edge of the city|northern|eastern|western|southern)\b/i;

type Kind = CityArea["kind"];

const KIND = {
  business: {
    word: "business district",
    title: (L: string) => `${L} Taxi Service Riyadh: Business & Airport Rides`,
    h1: (L: string) => `${L} Taxi Service in Riyadh: Business Rides and Airport Transfers`,
    lead: (L: string) => `Book a private taxi or chauffeur for meetings, hotels and airport runs in ${L}. The vehicle, driver and fare are confirmed before you commit.`,
    description: (L: string, km: string) => `Book a private taxi or chauffeur in ${L}, Riyadh: meetings, hotels and RUH airport rides (about ${km} km). Fare confirmed before you commit.`,
  },
  residential: {
    word: "residential district",
    title: (L: string) => `${L} Taxi Service Riyadh: Private Airport Rides`,
    h1: (L: string) => `${L} Taxi Service in Riyadh: Private Rides from Your Door`,
    lead: (L: string) => `Book a private taxi from your door in ${L} to the airport, to work or across the city. We confirm the vehicle, driver and fare first.`,
    description: (L: string, km: string) => `Private taxi service in ${L}, Riyadh: airport (RUH) rides about ${km} km, trips to Olaya and KAFD, return rides. Fare confirmed first.`,
  },
  commercial: {
    word: "commercial district",
    title: (L: string) => `${L} Taxi Service, Riyadh: Book Private Rides`,
    h1: (L: string) => `${L} Taxi Service in Riyadh: Book a Private Ride`,
    lead: (L: string) => `Hire a professional driver for shopping, offices and appointments in ${L}, or for the airport. Vehicle, driver and fare are confirmed before you commit.`,
    description: (L: string, km: string) => `Book a private taxi in ${L}, Riyadh for shopping, offices and RUH airport rides (about ${km} km). Fare and vehicle confirmed before you commit.`,
  },
  heritage: {
    word: "heritage and visitor district",
    title: (L: string) => `${L} Taxi Service Riyadh: Private Rides for Visitors`,
    h1: (L: string) => `${L} Taxi Service in Riyadh: Private Rides for Visitors`,
    lead: (L: string) => `Book a private taxi to and from ${L}, with the return pickup arranged in advance. We confirm the vehicle, driver and fare before you commit.`,
    description: (L: string, km: string) => `Private taxi service for ${L}, Riyadh: visitor rides, return pickups and RUH airport transfers (about ${km} km). Fare confirmed before you commit.`,
  },
  diplomatic: {
    word: "controlled-access district",
    title: (L: string) => `${L} Taxi Service: Private Rides in Riyadh`,
    h1: (L: string) => `${L} Taxi Service in Riyadh: Gate-Aware Private Rides`,
    lead: (L: string) => `Book a private taxi or chauffeur for appointments in the ${L}, planned around the gate and your host. Fare confirmed before you commit.`,
    description: (L: string, km: string) => `Private taxi service for the ${L}, Riyadh: gate-aware rides and RUH airport transfers (about ${km} km). Fare confirmed first.`,
  },
  airport: { word: "airport", title: (L: string) => L, h1: (L: string) => L, lead: (L: string) => L, description: (L: string) => L },
} satisfies Record<Kind, unknown>;

export type DistrictInput = {
  area: Area;
  info: CityArea;
  all: CityArea[];
  index: number;
  pairs: { name: string; href: string; km: number }[];
  districtHref: (id: string) => string;
  bookingSteps: Section;
  notAssumed: Section;
  moreLinks: { name: string; href: string; note?: string }[];
};

export function districtOverrides(d: DistrictInput) {
  const { area: a, info, all } = d;
  const L = short(info);
  const k = KIND[info.kind];
  const me = J[info.id] ?? {};
  const ruh = me["king-khalid-international-airport"];
  const ruhKm = ruh ? fmtKm(ruh.km) : "?";
  const The = info.id === "diplomatic-quarter" ? "Diplomatic Quarter" : L;

  // Journeys: distance and time to the main hubs, each linked to its ride page where there is one.
  const pairHref = (hubId: string) => d.pairs.find((p) => p.href.includes(`${info.id}-to-${hubId}`) || p.href.includes(`${hubId}-to-${info.id}`))?.href;
  const journeys: Section = {
    id: "journeys",
    h2: `Popular journeys from ${L}`,
    kind: "table",
    intro: `Driving distance and time from ${L} to the places people ask about most. Pick a row to open the full ride page, which covers both directions.`,
    head: ["Route", "Approx. distance", "Typical driving time"],
    rows: HUBS.filter((h) => h.id !== info.id && me[h.id]).map((h) => ({
      cells: [`${L} to ${h.name}`, `~${fmtKm(me[h.id].km)} km`, `~${fmtMin(me[h.id].min)}`],
      href: pairHref(h.id),
    })),
    note: `Estimates for light traffic from OpenStreetMap routing between district centres, reviewed ${REVIEWED}. Peak hours add time.`,
  };

  const hubKm = (id: string) => (me[id] ? `about ${fmtKm(me[id].km)} km` : "");
  const services: Record<Kind, { title: string; text: string }[]> = {
    business: [
      { title: "Meetings and corporate rides", text: `A professional driver for meetings in ${L}, with the pickup time agreed in advance and a return arranged in the same request.` },
      { title: "Hotel and visitor transfers", text: `Rides between ${L} hotels and offices and the airport, with the pickup planned around your flight.` },
      { title: "Airport transfers (RUH)", text: `King Khalid International Airport is ${hubKm("king-khalid-international-airport")} from ${L} by road. Give your flight number and terminal and the car is planned around it.` },
      { title: "Regular and account travel", text: `If your team needs rides in and out of ${L} on a regular basis, tell us what you need and we agree how it is arranged.` },
    ],
    residential: [
      { title: "Airport runs from home", text: `The airport is ${hubKm("king-khalid-international-airport")} from ${L}. Early flights and late arrivals are easier with a driver booked in advance.` },
      { title: "Family and group rides", text: `Tell us the passengers and bags and we confirm a vehicle that fits, from a sedan to a larger car for a family.` },
      { title: "Rides across the city", text: `Olaya is ${hubKm("olaya")} and KAFD ${hubKm("king-abdullah-financial-district")} from ${L}, so work and meeting rides are common from here.` },
      { title: "Appointments and visits", text: `${info.riders} often ask for rides for ${info.purpose}. A return pickup can be requested together.` },
    ],
    commercial: [
      { title: "Shopping and errands", text: `A car for a shopping trip or a few stops in ${L}, with the waiting time and the return agreed in advance.` },
      { title: "Offices and appointments", text: `Rides to offices, clinics and cafes around ${L}, with a pickup beside the building you name.` },
      { title: "Airport transfers (RUH)", text: `The airport is ${hubKm("king-khalid-international-airport")} from ${L}. Give your flight number and terminal and the pickup is planned back from it.` },
      { title: "Rides to Olaya and beyond", text: `Olaya is ${hubKm("olaya")} from ${L}, and a car can be arranged to any other district or city.` },
    ],
    heritage: [
      { title: "Visitor and sightseeing rides", text: `A private car to and from ${L} for ${info.purpose}, with a driver who knows where the set-down points are.` },
      { title: "Return pickup arranged for you", text: `Busy evenings and weekends make a return ride hard to find, so we arrange the pickup time before you go in.` },
      { title: "Airport transfers (RUH)", text: `The airport is ${hubKm("king-khalid-international-airport")} from ${L}. Send your flight details and the car is planned around them.` },
      { title: "Groups and families", text: `Tell us how many are travelling and we confirm a vehicle with room for everyone and the bags.` },
    ],
    diplomatic: [
      { title: "Appointments inside the district", text: `Rides built around your host's name and the gate, since entry is controlled by the district.` },
      { title: "Official and business visitors", text: `Rides between the ${The} and Olaya, KAFD or your hotel, planned around your appointment time.` },
      { title: "Airport transfers (RUH)", text: `The airport is ${hubKm("king-khalid-international-airport")} from the ${The}. Send your flight details and the pickup is planned around them.` },
      { title: "Allowance for gate queues", text: `Queues form at the gates at busy times, so the plan allows a little extra time on arrival.` },
    ],
    airport: [],
  };

  const servicesSection: Section = { id: "services", h2: `Hire a taxi or chauffeur in ${L}`, kind: "items", intro: `${a.tagline.replace(/\.$/, "")}. Tell us what you need and we confirm the right vehicle and driver for it.`, items: services[info.kind] };

  const aboutParas = [a.about, info.access].filter(Boolean);
  const about: Section = { id: "about", h2: `About ${L}`, kind: "text", paragraphs: aboutParas };

  const pickup: Section = {
    id: "pickup",
    h2: `Pickup and drop-off in ${L}`,
    kind: "items",
    items: [
      { title: "Where the car meets you", text: info.access },
      { title: `Who rides from ${L}`, text: `${info.riders}.` },
      { title: "What people travel for", text: `Most rides to and from ${L} are for ${info.purpose}.` },
      { title: "Return ride", text: `Ask for the ride back in the same request and give the time you want to travel, or tell us you will confirm it later.` },
    ],
  };

  const named = a.places.filter((p) => !GENERIC.test(p.name));
  const map: Section = {
    id: "map",
    h2: `${L} on the map`,
    kind: "map",
    intro: `See where ${L} is in Riyadh${named.length ? ", and open its landmarks in Google Maps to check the exact entrance before you ride" : ""}.`,
    query: `${info.lat},${info.lng}`,
    label: `${L}, Riyadh`,
    places: named.slice(0, 6).map((p) => ({ name: p.name, query: `${p.name}, ${L}, Riyadh`, note: p.note })),
  };

  // Nearest districts, each linking to its own district page.
  const near = all
    .filter((x) => x.id !== info.id && x.kind !== "airport")
    .map((x) => ({ x, km: haversine(info, x), dir: compass(bearing(info, x)) }))
    .sort((m, n) => m.km - n.km)
    .slice(0, 5);
  const ridePages = d.pairs.slice(0, 6);
  const nearby: Section = {
    id: "nearby",
    h2: `Districts near ${L} and rides from here`,
    kind: "links",
    intro: `The closest districts, with the distance in a straight line. Each ride page covers both directions, so the ride back is on the same page.`,
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: d.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}` })),
      ...ridePages.map((r) => ({ name: r.name, href: r.href, note: `Ride page, about ${fmtKm(r.km)} km` })),
    ],
  };


  const compare: Section = {
    id: "compare",
    h2: `Why pre-book your ${L} taxi`,
    kind: "items",
    items: [
      { title: "A booked driver, not a search", text: `${info.kind === "residential" ? "Early flights and school or work runs" : "Meetings, flights and visits"} start on time when the car is arranged in advance, instead of looking for one on the day.` },
      { title: "Fare confirmed first", text: "You see the vehicle, driver and fare for your request before you commit, so there is nothing to agree at the kerb." },
      { title: "Right-sized vehicle", text: "Tell us the passengers and bags and we confirm a vehicle that fits, instead of hoping an app car is big enough." },
    ],
  };

  const sources: Section = {
    id: "sources",
    h2: "How this page is kept accurate",
    kind: "items",
    items: [
      { title: "Distances and times", text: `They are estimates from OpenStreetMap routing between district centres, for light traffic, and were reviewed in ${REVIEWED}. Your own ride is confirmed with you.` },
      { title: "Places and access notes", text: `District and landmark names come from public map data, and the pickup notes are reviewed by Gulf Elite Transport. Gates and entrances can change, so confirm them with your host.` },
      { title: "Who arranges your ride", text: "Gulf Elite Transport takes your request and confirms the vehicle, driver and fare with you before you commit." },
    ],
  };

  const faq: Section = {
    id: "faq",
    h2: `${L} taxi service: questions`,
    kind: "faq",
    items: [
      { q: `How do I book a taxi or chauffeur in ${L}?`, a: `Use the request form at the top of this page, or contact us, and send your pickup point in ${L}, your destination, the date, the time and the number of passengers. We confirm the vehicle, driver and fare before you commit.` },
      ...(ruh ? [{ q: `How far is ${L} from Riyadh airport?`, a: `About ${ruhKm} km by road, which is roughly ${fmtMin(ruh.min)} in light traffic. Traffic and the time of day change this, so the plan for your ride is confirmed with you.` }] : []),
      a.faq,
      { q: `Can I book a return ride from ${L}?`, a: `Yes. Ask for the return in the same request and give the time you want to travel back, or tell us you will confirm it later.` },
      { q: `Do you publish fares for ${L} rides?`, a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
    ],
  };

  const body: Record<string, Section | null> = { journeys, services: servicesSection, about, pickup, map, nearby, compare, sources };
  const ORDERS = [
    ["journeys", "services", "about", "pickup", "map", "nearby", "compare", "sources"],
    ["services", "journeys", "map", "about", "pickup", "compare", "nearby", "sources"],
    ["about", "journeys", "services", "nearby", "map", "pickup", "compare", "sources"],
    ["pickup", "journeys", "compare", "services", "about", "map", "nearby", "sources"],
  ];
  const order = ORDERS[d.index % ORDERS.length];
  const sections: Section[] = [
    ...order.map((id) => body[id]).filter((s): s is Section => Boolean(s)),
    d.bookingSteps,
    d.notAssumed,
    { id: "links", h2: `More around ${L}`, kind: "links", items: d.moreLinks },
    faq,
  ];

  const others = HUBS.filter((h) => h.id !== info.id && h.id !== "king-khalid-international-airport" && me[h.id]).slice(0, 2);
  const facts: PlacePage["facts"] = [
    ...(ruh ? [{ label: "Riyadh Airport (RUH)", value: `about ${ruhKm} km by road` }] : []),
    ...others.map((h) => ({ label: h.name, value: `about ${fmtKm(me[h.id].km)} km by road` })),
    { label: "Area type", value: k.word },
    { label: "Arabic name", value: info.ar },
  ].slice(0, 4);

  return {
    title: k.title(L).slice(0, 80),
    description: k.description(The, ruhKm),
    h1: k.h1(L),
    lead: k.lead(The),
    directAnswer: `Gulf Elite Transport takes bookings for private taxi and chauffeur rides to and from ${L} in Riyadh${ruh ? `, including transfers to King Khalid International Airport, about ${ruhKm} km away by road` : ""}. Send your pickup point, destination, date, time and number of passengers, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.`,
    facts,
    sections,
  };
}
