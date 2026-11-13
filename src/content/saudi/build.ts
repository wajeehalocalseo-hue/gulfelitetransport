import { routeExtras, umrahPages, UMRAH_BASE } from "../umrah/pages";
import { airports, areas, routes } from "./places";
import { buildPairs } from "./pairs";
import { riyadhAreas } from "./riyadh-areas";
import { cities } from "./cities";
import { cityGeo, regionExtras } from "./geo";
import { regions } from "./regions";
import type { Airport, Area, City, PageKind, PlaceLayout, PlacePage, Section } from "./types";

export const BASE = "/taxi-saudi-arabia";
export const TAXI_SERVICE = "Taxi & Cab Services";
const COUNTRY_WIKI = "Saudi Arabia";

const byId = <T extends { id: string }>(list: T[]) => new Map(list.map((x) => [x.id, x]));
const regionById = byId(regions);
const cityById = byId(cities);
const airportById = byId(airports);

const need = <T,>(v: T | undefined, what: string): T => {
  if (!v) throw new Error(`Saudi taxi data: missing ${what}`);
  return v;
};

// ---------------------------------------------------------------------------- layouts
const HEROES: Record<PageKind, PlaceLayout["hero"][]> = {
  hub: ["centered"],
  region: ["dark", "ledger", "light", "inset", "centered"],
  city: ["dark", "light", "ledger", "inset", "centered"],
  area: ["light", "ledger", "inset", "dark"],
  airport: ["board", "dark"],
  route: ["routeline", "routeband"],
  pair: ["schematic", "routeline", "routeband", "ledger", "light", "inset", "dark"],
  topic: ["dark", "light", "ledger", "inset", "centered"],
};
const BODIES: PlaceLayout["body"][] = ["cards", "columns", "tiles", "checklist", "accordion", "table"];
const FORMS: PlaceLayout["form"][] = ["aside", "bottom", "hero"];

/** Placeholder; real layouts are assigned after all pages exist (see assignLayouts) so no two pages share a combination. */
function layoutFor(kind: PageKind, i: number): PlaceLayout {
  return { hero: HEROES[kind][i % HEROES[kind].length], body: "cards", form: "bottom" };
}

// ---------------------------------------------------------------------------- shared text
const names = (ids: string[]) => ids.map((id) => need(cityById.get(id), `city ${id}`).name);
const and = (xs: string[]) => (xs.length <= 1 ? (xs[0] ?? "") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const cityEntity = (c: City) => ({ type: "City" as const, name: c.name, wiki: c.wiki, ar: cityGeo[c.id]?.ar, lat: cityGeo[c.id]?.lat, lng: cityGeo[c.id]?.lng });
const regionEntity = (id: string, name: string) => ({ type: "AdministrativeArea" as const, name, wiki: regionExtras[id]?.wiki, ar: regionExtras[id]?.ar });
const join = (xs: string[]) => (xs.length <= 1 ? (xs[0] ?? "") : `${xs.slice(0, -1).join(", ")} or ${xs[xs.length - 1]}`);

const bookingSteps = (where: string) => ({
  id: "how",
  h2: "How a request works",
  kind: "steps" as const,
  items: [
    { title: "Send the details", text: `Tell us the pickup point ${where}, the destination, the date and time, and the number of passengers and bags.` },
    { title: "We check availability", text: "We look at whether a suitable car and driver can be arranged for that request." },
    { title: "You get the confirmation", text: "The vehicle, driver details and fare are confirmed with you before you commit to anything." },
    { title: "Take the ride", text: "Your driver collects you at the agreed point and takes you to your destination." },
  ],
});

const notAssumed: Section = {
  id: "limits",
  h2: "What is confirmed for each request",
  kind: "items",
  intro: "To keep this page accurate, the following are not published here and are agreed with you for each request.",
  items: [
    { title: "Fares", text: "No standard fares are published. The fare is confirmed before you commit." },
    { title: "Journey time", text: "Timing depends on traffic, route and stops, so no journey time is promised in advance." },
    { title: "Vehicle and driver", text: "The car type and driver are confirmed for your request." },
    { title: "Availability", text: "Availability depends on the place, the date and the time of day." },
  ],
};


/** A second, place-specific paragraph for each area page. */
const areaGetting: Record<string, string> = {
  olaya:
    "Olaya Street and the roads beside it are busy at lunchtime and in the evening, so a pickup on a side street next to the tower or hotel entrance is often quicker than waiting on the main road. King Khalid International Airport lies to the north, and the King Abdullah Financial District is further north again.",
  "king-abdullah-financial-district":
    "KAFD has its own internal roads, car parks and a metro station, and not every tower shares an entrance. State the tower name and whether you will be at the metro station, a podium entrance or a hotel lobby. Rides to the airport and to Olaya are the most common onward trips.",
  "diplomatic-quarter":
    "Ask your host which gate and which pass reference apply before the ride, and give us the host's name. The district's own roads are quiet, but queues form at the gates at busy times. Olaya and the airport are the most common onward destinations.",
  diriyah:
    "Roads into Diriyah can be congested on weekend evenings, and the main visitor car parks are set apart from the heritage area. Say whether you will be dropped at At-Turaif, Bujairi Terrace or another entrance, and agree the return pickup time before you go in.",
  hittin:
    "Hittin is mainly residential with business parks, so pickups are often from villa gates or office buildings; a gate number or building name speeds up the pickup. Rides to King Khalid International Airport, Olaya and KAFD are the most frequent.",
  "al-balad":
    "The narrow lanes and traditional houses of the old town limit vehicle access, and some streets are for walking only. Expect the car to meet you at an entrance on the edge of the district and allow time to walk the last stretch. The Corniche and Al-Hamra are short rides away.",
  "al-hamra":
    "Al-Hamra sits between the Corniche and the city's main roads, so traffic is heaviest at midday and in the evening. Name the hotel or office entrance for the pickup. King Abdulaziz International Airport is in the north of Jeddah, so airport rides are longer than most city trips.",
  "al-rawdah":
    "Evenings are the peak, when the cafes and restaurants fill up and the roads are crowded, so give a side-street landmark for the pickup. Malls, the Corniche and neighbouring districts are the most common short destinations.",
  "al-shati":
    "On weekend evenings the Corniche road is crowded and parking is scarce, so a pickup on a nearby side street can be quicker. Waterfront hotels make good named meeting points.",
  obhur:
    "Obhur is on the northern edge of Jeddah, so rides from the centre are long and are heaviest on Thursday and Friday afternoons. Many visitors go to private beach resorts, so name the resort and its entrance when you request a ride.",
};
const airportOf = (c: City): Airport | undefined => (c.airport ? airportById.get(c.airport) : undefined);

// ---------------------------------------------------------------------------- page builders
function cityPath(c: City) {
  return `${BASE}/${c.region}/${c.id}`;
}

const country = { type: "Country" as const, name: "Saudi Arabia", wiki: COUNTRY_WIKI };

// ---------------------------------------------------------------------------- Riyadh pilot: area-to-area rides
const RIYADH = need(cityById.get("riyadh"), "riyadh");
const RIYADH_PATH = `${BASE}/riyadh-region/riyadh`;
const shortName = (n: string) => n.replace(/\s*\(.*\)\s*$/, "");
/** Riyadh areas that do not yet have a hand-written area page get one generated from the area data. */
const riyadhExtraAreas: Area[] = riyadhAreas
  .filter((a) => a.kind !== "airport" && !areas.some((x) => x.id === a.id && x.city === "riyadh"))
  .map((a) => ({
    id: a.id,
    city: "riyadh",
    name: a.name,
    tagline: a.tagline,
    about: a.about,
    places: a.landmarks.map((l) => ({ name: l, note: `Found in or around ${shortName(a.name)}` })),
    faq: a.faq,
  }));
const allAreas: Area[] = [...areas, ...riyadhExtraAreas];
const riyadhAccess = Object.fromEntries(riyadhAreas.map((a) => [a.id, a.access]));
const riyadhPairs = buildPairs(riyadhAreas, {
  cityName: "Riyadh",
  basePath: BASE,
  hubPath: BASE,
  regionName: "Riyadh Region",
  regionPath: `${BASE}/riyadh-region`,
  cityPath: RIYADH_PATH,
  areaHref: (id) => (riyadhAreas.find((a) => a.id === id)?.kind === "airport" ? `${BASE}/airports/king-khalid-international-airport` : `${RIYADH_PATH}/${id}`),
  bookingSteps,
  notAssumed,
  entities: [country],
  cityEntity: cityEntity(RIYADH),
});

function hubPage(): PlacePage {
  return {
    kind: "hub",
    path: BASE,
    name: "Taxi & Cab Services in Saudi Arabia",
    title: "Taxi & Cab Services in Saudi Arabia by Region and City",
    description:
      "Find taxi and cab rides across Saudi Arabia by region, city, airport and route. Fares and availability are confirmed for each request by Gulf Elite Transport.",
    h1: "Taxi & Cab Services in Saudi Arabia",
    lead: "Choose your region, city, airport or route. Every page lists real places and what to tell us when you request a ride.",
    directAnswer:
      "Gulf Elite Transport arranges taxi and cab rides across Saudi Arabia, organised here by region, city, airport and intercity route. Tell us where you are starting, where you are going, when and how many people are travelling, and we confirm the vehicle, driver and fare for your request before you commit. Fares, journey times and availability are not published.",
    crumbs: [{ name: "Home", path: "/" }, { name: "Taxi & Cab Services in Saudi Arabia", path: BASE }],
    facts: [
      { label: "Regions", value: `${regions.length} regions of Saudi Arabia` },
      { label: "City pages", value: `${cities.length} cities so far` },
      { label: "Airports", value: `${airports.length} airport pages` },
      { label: "Routes", value: `${routes.length} intercity routes` },
    ],
    sections: [
      bookingSteps("(a city, airport or address)"),
      {
        id: "regions",
        h2: "Browse by region",
        kind: "links",
        intro: "Saudi Arabia has 13 regions. Pick yours to see its cities, airports and routes.",
        items: regions.map((r) => ({ name: r.name, href: `${BASE}/${r.id}`, note: `Capital: ${need(cityById.get(r.capital), r.capital).name}` })),
      },
      {
        id: "cities",
        h2: "Popular cities",
        kind: "links",
        items: cities.slice(0, 12).map((c) => ({ name: c.name, href: cityPath(c), note: need(regionById.get(c.region), c.region).name })),
      },
      {
        id: "airports",
        h2: "Airport transfers",
        kind: "links",
        items: airports.slice(0, 6).map((a) => ({ name: a.name, href: `${BASE}/airports/${a.id}`, note: a.code })),
      },
      {
        id: "routes",
        h2: "Popular intercity routes",
        kind: "links",
        items: routes.slice(0, 10).map((r) => ({ name: `${need(cityById.get(r.from), r.from).name} to ${need(cityById.get(r.to), r.to).name}`, href: `${BASE}/routes/${r.id}`, note: `about ${r.km} km` })),
      },
      notAssumed,
      {
        id: "faq",
        h2: "Taxi and cab services in Saudi Arabia: questions",
        kind: "faq",
        items: [
          { q: "Which cities can I request a ride in?", a: "Pages are published for the main cities of every region, and requests from other towns can be discussed. Availability is confirmed for each request." },
          { q: "Are your fares fixed?", a: "No standard fares are published. We confirm the fare for your ride before you commit." },
          { q: "Can I book an airport transfer?", a: "Yes. Each airport page explains what to tell us, such as your terminal, flight number and final destination." },
          { q: "Do you provide Hajj or Umrah transport?", a: "Yes. See the Umrah & Hajj taxi pages for airport transfers, rides to the Haram, journeys between Makkah and Madinah and groups of any size. Movement during Hajj is controlled by the authorities, so we confirm what can be arranged for your dates." },
          { q: "Do you serve countries other than Saudi Arabia?", a: "These pages cover Saudi Arabia only." },
        ],
      },
    ],
    layout: { hero: "centered", body: "cards", form: "bottom" },
    entities: [country],
    children: regions.map((r) => ({ name: r.name, path: `${BASE}/${r.id}` })),
  };
}

function regionPages(): PlacePage[] {
  return regions.map((r, i) => {
    const x = need(regionExtras[r.id], `region extras ${r.id}`);
    const regionCities = cities.filter((c) => c.region === r.id);
    const regionAirports = airports.filter((a) => need(cityById.get(a.city), a.city).region === r.id);
    const cityIds = new Set(regionCities.map((c) => c.id));
    const regionRoutes = routes.filter((q) => cityIds.has(q.from) || cityIds.has(q.to));
    const capital = need(cityById.get(r.capital), r.capital);
    const capGeo = need(cityGeo[r.capital], `geo ${r.capital}`);
    const codes = regionAirports.map((a) => a.code);
    const routeText = regionRoutes.slice(0, 2).map((q) => `${need(cityById.get(q.from), q.from).name} to ${need(cityById.get(q.to), q.to).name}`);
    const direct = `Gulf Elite Transport arranges taxi and cab rides in ${r.name} (${x.ar}), including ${and(regionCities.map((c) => c.name))}. ${r.tagline.replace(/\.$/, "")}. Rides cover city trips${codes.length ? `, airport transfers at ${and(codes)}` : ""}${routeText.length ? ` and intercity routes such as ${and(routeText)}` : ""}. Fares, journey times and availability are confirmed for each request and are not published.`;
    const sections: Section[] = [
      {
        id: "about",
        h2: `Getting around ${r.name}`,
        kind: "text",
        paragraphs: [r.about, `${r.name} is also written ${x.ar} in Arabic. Its capital is ${capital.name} (${cityGeo[r.capital]?.ar ?? ""}).`],
      },
      { id: "getting-in", h2: `How people reach and cross ${r.name}`, kind: "text", paragraphs: [x.gettingIn] },
      {
        id: "cities",
        h2: `Cities with a ride guide in ${r.name}`,
        kind: "links",
        intro: `The regional capital is ${capital.name}. Each guide lists the real places riders travel to.`,
        items: regionCities.map((c) => ({ name: `${c.name} (${cityGeo[c.id]?.ar ?? ""})`, href: cityPath(c), note: c.tagline.replace(/\.$/, "") })),
      },
      { id: "requests", h2: `Common ride requests in ${r.name}`, kind: "items", items: x.scenarios },
    ];
    if (regionAirports.length) {
      sections.push({
        id: "airports",
        h2: `Airport transfers in ${r.name}`,
        kind: "links",
        items: regionAirports.map((a) => ({ name: `${a.name} (${a.code})`, href: `${BASE}/airports/${a.id}`, note: a.tagline.replace(/\.$/, "") })),
      });
    }
    if (regionRoutes.length) {
      sections.push({
        id: "routes",
        h2: `Intercity routes from ${r.name}`,
        kind: "links",
        intro: "Road distances are approximate. The exact route, vehicle and fare are confirmed for each request.",
        items: regionRoutes.slice(0, 8).map((q) => ({ name: `${need(cityById.get(q.from), q.from).name} to ${need(cityById.get(q.to), q.to).name}`, href: `${BASE}/routes/${q.id}`, note: `about ${q.km} km` })),
      });
    }
    sections.push(
      { id: "tips", h2: `Planning notes for ${r.name}`, kind: "items", items: x.tips },
      {
        id: "nearby",
        h2: "Neighbouring regions",
        kind: "links",
        items: x.neighbours.map((id) => ({ name: need(regionById.get(id), id).name, href: `${BASE}/${id}`, note: need(regionExtras[id], id).ar })),
      },
      {
        id: "other",
        h2: `Other towns in ${r.name}`,
        kind: "text",
        paragraphs: [`Requests from other towns such as ${and(r.other)} can be discussed. These towns do not have their own page yet, and availability is confirmed for each request.`],
      },
      bookingSteps(`in ${r.name}`),
      notAssumed,
      {
        id: "faq",
        h2: `${r.name}: questions`,
        kind: "faq",
        items: [
          ...x.faqs,
          { q: `Do you cover every town in ${r.name}?`, a: `Main cities have their own guide, and requests from other towns in the region can be discussed. Availability is confirmed for each request.` },
          { q: `Can I travel from ${capital.name} to another region?`, a: "Yes, intercity rides can be requested. The route, vehicle and fare are confirmed for each request." },
          { q: "Are taxi fares published?", a: "No. The fare is confirmed with you before you commit, so there is no standard price list." },
        ],
      },
    );
    return {
      kind: "region" as const,
      path: `${BASE}/${r.id}`,
      name: r.name,
      title: `Taxi & Cab Rides in ${r.name}, Saudi Arabia`,
      description: `Taxi and cab rides in ${r.name} (${x.ar}): ${and(regionCities.slice(0, 3).map((c) => c.name))}${codes.length ? `, ${and(codes)} airport transfers` : ""} and intercity routes. Fares confirmed for each request.`,
      h1: `Taxi & Cab Services in ${r.name}`,
      lead: r.tagline,
      directAnswer: direct,
      crumbs: [{ name: "Home", path: "/" }, { name: "Taxi & Cab Services in Saudi Arabia", path: BASE }, { name: r.name, path: `${BASE}/${r.id}` }],
      facts: [
        { label: "Capital", value: `${capital.name} (${cityGeo[r.capital]?.ar ?? ""})` },
        { label: "Arabic name", value: x.ar },
        { label: "Main airports", value: codes.length ? and(codes) : "See city pages" },
        { label: "Ride guides", value: `${regionCities.length} cities, ${regionRoutes.length} routes` },
      ],
      sections,
      layout: layoutFor("region", i),
      entities: [
        { type: "AdministrativeArea", name: r.name, wiki: x.wiki, ar: x.ar, lat: capGeo.lat, lng: capGeo.lng },
        ...regionCities.map(cityEntity),
        country,
      ],
      children: regionCities.map((c) => ({ name: c.name, path: cityPath(c) })),
      prefill: { pickup: capital.name },
    };
  });
}
function cityPages(): PlacePage[] {
  return cities.map((c, i) => {
    const region = need(regionById.get(c.region), c.region);
    const ap = airportOf(c);
    const cityAreas = areas.filter((a) => a.city === c.id);
    const cityRoutes = routes.filter((x) => x.from === c.id || x.to === c.id);
    const p = c.places;
    const direct = [
      `You can request a taxi or cab in ${c.name} from Gulf Elite Transport for rides to places such as ${p[0].name}, ${p[1].name} and ${(p[2] ?? p[0]).name}. Tell us the pickup point, destination, date and number of passengers, and the vehicle, driver and fare are confirmed for each request before you commit.`,
      `Gulf Elite Transport arranges taxi and cab rides in ${c.name}: city trips${ap ? `, transfers to and from ${ap.name}` : ""} and longer rides to ${join(names(c.nearby.slice(0, 2)))}. Availability and fares are not published, so every request is confirmed with you first.`,
      `Need a car in ${c.name}? Send your pickup and drop-off points to Gulf Elite Transport and we confirm the vehicle, driver and fare before anything is agreed. Typical requests include ${p[0].name}, ${p[1].name} and ${ap ? ap.name : (p[2] ?? p[0]).name}.`,
    ][i % 3];
    const rides = {
      id: "rides",
      h2: `Ride types in ${c.name}`,
      kind: "items" as const,
      intro: "Each of these is confirmed for each request.",
      items: [
        { title: `City rides in ${c.name}`, text: `Trips between ${p[0].name}, ${p[1].name} and other districts, or to hotels, offices and shops.` },
        ...(ap ? [{ title: "Airport transfers", text: `Pickups and drop-offs at ${ap.name} (${ap.code}).` }] : []),
        { title: "Intercity trips", text: `Longer rides to ${join(names(c.nearby.slice(0, 2)))} and other cities.` },
        { title: "Several stops or longer hire", text: "A car for a series of stops over a few hours, which can be discussed." },
      ],
    };
    const links: { name: string; href: string; note?: string }[] = [
      ...(ap ? [{ name: ap.name, href: `${BASE}/airports/${ap.id}`, note: `Airport ${ap.code}` }] : []),
      ...(["makkah", "madinah", "jeddah", "taif"].includes(c.id) ? [{ name: "Umrah & Hajj taxi", href: UMRAH_BASE, note: "Pilgrim rides" }] : []),
      ...cityAreas.map((a) => ({ name: a.name, href: `${cityPath(c)}/${a.id}`, note: "Area guide" })),
      ...cityRoutes.map((x) => ({ name: `${need(cityById.get(x.from), x.from).name} to ${need(cityById.get(x.to), x.to).name}`, href: `${BASE}/routes/${x.id}`, note: `about ${x.km} km` })),
      ...(c.id === "riyadh" ? riyadhPairs.pages.slice(0, 12).map((x) => ({ name: x.name, href: x.path, note: "Area-to-area ride" })) : []),
      ...c.nearby.map((id) => ({ name: need(cityById.get(id), id).name, href: cityPath(need(cityById.get(id), id)), note: "Nearby city" })),
    ];
    const sections: Section[] = [
      { id: "about", h2: `Riding in ${c.name}`, kind: "text", paragraphs: [c.about, c.getting, `${c.name} (${cityGeo[c.id]?.ar ?? ""}) is in ${region.name}, Saudi Arabia.`] },
      { id: "places", h2: `Places people travel to in ${c.name}`, kind: "items", items: c.places.map((x) => ({ title: x.name, text: x.note })) },
      rides,
      bookingSteps(`in ${c.name}`),
      notAssumed,
      { id: "links", h2: `More around ${c.name}`, kind: "links", items: links },
      {
        id: "faq",
        h2: `${c.name}: questions`,
        kind: "faq",
        items: [
          { q: `How do I request a taxi or cab in ${c.name}?`, a: `Send the pickup point, destination, date, time and number of passengers. We confirm the vehicle, driver and fare for your request before you commit.` },
          c.faq,
          { q: "Do you publish fares?", a: "No. A fare is confirmed with you for each request, so there is no standard price list." },
        ],
      },
    ];
    return {
      kind: "city" as const,
      path: cityPath(c),
      name: c.name,
      title: `Taxi & Cab Service in ${c.name}, Saudi Arabia`,
      description: `Request a taxi or cab in ${c.name}: rides to ${p[0].name} and ${p[1].name}${ap ? `, plus ${ap.code} airport transfers` : ""}. Fares confirmed for each request.`,
      h1: `Taxi & Cab Service in ${c.name}`,
      lead: c.tagline,
      directAnswer: direct,
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Taxi & Cab Services in Saudi Arabia", path: BASE },
        { name: region.name, path: `${BASE}/${region.id}` },
        { name: c.name, path: cityPath(c) },
      ],
      facts: [
        { label: "Region", value: region.name },
        { label: "Airport", value: ap ? `${ap.name} (${ap.code})` : "No airport page yet" },
        { label: "Key places", value: p.slice(0, 2).map((x) => x.name).join(", ") },
        { label: "Nearby", value: names(c.nearby.slice(0, 3)).join(", ") },
      ],
      sections,
      layout: layoutFor("city", i),
      entities: [cityEntity(c), regionEntity(region.id, region.name), country, ...(ap ? [{ type: "Airport" as const, name: ap.name, iata: ap.code }] : [])],
      children: cityAreas.map((a) => ({ name: a.name, path: `${cityPath(c)}/${a.id}` })),
      prefill: { pickup: c.name },
    };
  });
}

function areaPages(): PlacePage[] {
  return allAreas.map((a, i) => {
    const c = need(cityById.get(a.city), a.city);
    const region = need(regionById.get(c.region), c.region);
    const ap = airportOf(c);
    const path = `${cityPath(c)}/${a.id}`;
    const siblings = allAreas.filter((x) => x.city === a.city && x.id !== a.id);
    const links = [
      { name: `Taxi & Cab Service in ${c.name}`, href: cityPath(c), note: "City page" },
      ...(ap ? [{ name: ap.name, href: `${BASE}/airports/${ap.id}`, note: `Airport ${ap.code}` }] : []),
      ...siblings.map((x) => ({ name: x.name, href: `${cityPath(c)}/${x.id}`, note: `Other area in ${c.name}` })),
    ];
    return {
      kind: "area" as const,
      path,
      name: a.name,
      title: `Taxi & Cab Rides in ${a.name}, ${c.name}`,
      description: `Request a taxi or cab in ${a.name}, ${c.name}: ${a.places[0].name} and nearby places. Fares and availability confirmed for each request.`,
      h1: `Taxi & Cab Service in ${a.name}, ${c.name}`,
      lead: a.tagline,
      directAnswer: `Gulf Elite Transport arranges taxi and cab rides to and from ${a.name} in ${c.name}. Tell us the exact building, gate or street for the pickup, plus your destination and the number of passengers, and we confirm the vehicle, driver and fare for your request before you commit.`,
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Taxi & Cab Services in Saudi Arabia", path: BASE },
        { name: region.name, path: `${BASE}/${region.id}` },
        { name: c.name, path: cityPath(c) },
        { name: a.name, path },
      ],
      facts: [
        { label: "City", value: c.name },
        { label: "Region", value: region.name },
        { label: "Known for", value: a.places[0].name },
        { label: "Airport", value: ap ? ap.code : "See city page" },
      ],
      sections: [
        { id: "about", h2: `About ${a.name}`, kind: "text", paragraphs: [a.about, areaGetting[a.id] ?? (a.city === "riyadh" ? riyadhAccess[a.id] : undefined) ?? ""].filter(Boolean) },
        { id: "places", h2: `Places in and around ${a.name}`, kind: "items", items: a.places.map((x) => ({ title: x.name, text: x.note })) },
        ...(a.city === "riyadh" && riyadhPairs.index[a.id]
          ? [{ id: "rides", h2: `Rides from ${shortName(a.name)} to nearby areas`, kind: "links" as const, intro: "Each page covers both directions, so the ride back is on the same page.", items: (riyadhPairs.index[a.id] ?? []).map((r) => ({ name: r.name, href: r.href, note: `about ${r.km < 10 ? r.km.toFixed(1) : Math.round(r.km)} km` })) }]
          : []),
        bookingSteps(`in ${a.name}`),
        { id: "links", h2: `More in ${c.name}`, kind: "links", items: links },
        { id: "faq", h2: `${a.name}: questions`, kind: "faq", items: [a.faq, { q: "Do you publish fares?", a: "No. The fare is confirmed with you before you commit." }] },
      ],
      layout: layoutFor("area", i),
      entities: [{ type: "Place", name: `${a.name}, ${c.name}` }, cityEntity(c), country],
      children: [],
      prefill: { pickup: `${a.name}, ${c.name}` },
    };
  });
}

function airportPages(): PlacePage[] {
  return airports.map((a, i) => {
    const c = need(cityById.get(a.city), a.city);
    const region = need(regionById.get(c.region), c.region);
    const path = `${BASE}/airports/${a.id}`;
    const served = cities.filter((x) => x.airport === a.id);
    const links = [
      ...(["king-abdulaziz-international-airport", "prince-mohammad-bin-abdulaziz-international-airport"].includes(a.id) ? [{ name: "Umrah & Hajj taxi", href: UMRAH_BASE, note: "Pilgrim rides" }] : []),
      ...served.map((x) => ({ name: `Taxi & Cab Service in ${x.name}`, href: cityPath(x), note: "City page" })),
      ...(a.id === "king-khalid-international-airport" ? riyadhPairs.pages.filter((x) => x.pair?.type === "airport").slice(0, 8).map((x) => ({ name: x.name, href: x.path, note: "Area-to-area ride" })) : []),
      ...routes.filter((r) => served.some((x) => x.id === r.from || x.id === r.to)).slice(0, 6).map((r) => ({ name: `${need(cityById.get(r.from), r.from).name} to ${need(cityById.get(r.to), r.to).name}`, href: `${BASE}/routes/${r.id}`, note: `about ${r.km} km` })),
    ];
    return {
      kind: "airport" as const,
      path,
      name: a.name,
      title: `Taxi & Cab Transfers at ${a.name} (${a.code})`,
      description: `Request a taxi or cab transfer at ${a.name} (${a.code}) for ${served.map((x) => x.name).slice(0, 3).join(", ")}. Fares and availability confirmed for each request.`,
      h1: `Taxi & Cab Transfers at ${a.name} (${a.code})`,
      lead: a.tagline,
      directAnswer: `Gulf Elite Transport arranges taxi and cab transfers to and from ${a.name} (${a.code}). Send your flight details, the terminal if you know it, your destination and the number of passengers and bags, and we confirm the vehicle, driver and fare for your request before you commit.`,
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Taxi & Cab Services in Saudi Arabia", path: BASE },
        { name: region.name, path: `${BASE}/${region.id}` },
        { name: a.name, path },
      ],
      facts: [
        { label: "IATA code", value: a.code },
        { label: "City", value: c.name },
        { label: "Region", value: region.name },
        { label: "Serves", value: served.map((x) => x.name).slice(0, 3).join(", ") },
      ],
      sections: [
        { id: "about", h2: `About ${a.name}`, kind: "text", paragraphs: [a.about] },
        { id: "tips", h2: "What to tell us for a transfer", kind: "items", items: a.tips.map((t, k) => ({ title: `Tip ${k + 1}`, text: t })) },
        bookingSteps(`(the terminal at ${a.code}, if you know it)`),
        notAssumed,
        { id: "links", h2: "Nearby pages", kind: "links", items: links },
        {
          id: "faq",
          h2: `${a.code} airport: questions`,
          kind: "faq",
          items: [
            { q: `Can I book a ride from ${a.name}?`, a: `Yes. Send your flight details and destination and we confirm the ride for your request.` },
            { q: "What if my flight is delayed?", a: "Give us your flight number so the plan can be discussed. How delays are handled is confirmed with you for each request." },
            { q: "Are airport fares published?", a: "No. The fare is confirmed with you before you commit." },
          ],
        },
      ],
      layout: layoutFor("airport", i),
      entities: [{ type: "Airport", name: a.name, iata: a.code }, cityEntity(c), country],
      children: [],
      prefill: { pickup: a.name },
    };
  });
}

function routePages(): PlacePage[] {
  return routes.map((r, i) => {
    const from = need(cityById.get(r.from), r.from);
    const to = need(cityById.get(r.to), r.to);
    const path = `${BASE}/routes/${r.id}`;
    const apFrom = airportOf(from);
    const apTo = airportOf(to);
    const related = routes.filter((x) => x.id !== r.id && (x.from === r.from || x.to === r.from || x.from === r.to || x.to === r.to)).slice(0, 5);
    const links = [
      { name: `Taxi & Cab Service in ${from.name}`, href: cityPath(from), note: "City page" },
      { name: `Taxi & Cab Service in ${to.name}`, href: cityPath(to), note: "City page" },
      ...(apFrom ? [{ name: apFrom.name, href: `${BASE}/airports/${apFrom.id}`, note: `Airport ${apFrom.code}` }] : []),
      ...(apTo && apTo.id !== apFrom?.id ? [{ name: apTo.name, href: `${BASE}/airports/${apTo.id}`, note: `Airport ${apTo.code}` }] : []),
      ...related.map((x) => ({ name: `${need(cityById.get(x.from), x.from).name} to ${need(cityById.get(x.to), x.to).name}`, href: `${BASE}/routes/${x.id}`, note: `about ${x.km} km` })),
    ];
    const direct = [
      `Gulf Elite Transport arranges taxi and cab rides from ${from.name} to ${to.name}, about ${r.km} km by road, and the same route in the other direction. Tell us the pickup point, drop-off point, date, passengers and bags, and we confirm the vehicle, driver and fare for your request before you commit.`,
      `Planning to travel between ${from.name} and ${to.name}? The road distance is roughly ${r.km} km. Send your details to Gulf Elite Transport and we confirm the vehicle, driver, route and fare before anything is agreed; no fare or journey time is promised in advance.`,
    ][i % 2];
    return {
      kind: "route" as const,
      path,
      name: `${from.name} to ${to.name}`,
      title: `Taxi from ${from.name} to ${to.name}: Intercity Cab Ride`,
      description: `Request an intercity taxi or cab from ${from.name} to ${to.name}, about ${r.km} km by road. Fare, vehicle and timing confirmed for each request.`,
      h1: `Taxi from ${from.name} to ${to.name}`,
      lead: `About ${r.km} km by road. Fare, vehicle and timing are confirmed for each request.`,
      directAnswer: direct,
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Taxi & Cab Services in Saudi Arabia", path: BASE },
        { name: "Routes", path: `${BASE}/routes` },
        { name: `${from.name} to ${to.name}`, path },
      ],
      facts: [
        { label: "Road distance", value: `about ${r.km} km (approximate)` },
        { label: "From", value: from.name },
        { label: "To", value: to.name },
        { label: "Direction", value: "Both directions" },
      ],
      sections: [
        { id: "about", h2: `About the ${from.name} to ${to.name} route`, kind: "text", paragraphs: [r.about] },
        { id: "riders", h2: "Who travels this route", kind: "items", items: r.riders.map((t, k) => ({ title: `Traveller ${k + 1}`, text: t })) },
        { id: "tips", h2: "Good to know before you ask", kind: "items", items: r.tips.map((t, k) => ({ title: `Note ${k + 1}`, text: t })) },
        ...(routeExtras[r.id] ?? []),
        bookingSteps(`in ${from.name}`),
        notAssumed,
        { id: "links", h2: "Both ends and related routes", kind: "links", items: links },
        {
          id: "faq",
          h2: `${from.name} to ${to.name}: questions`,
          kind: "faq",
          items: [
            { q: `How far is ${from.name} from ${to.name}?`, a: `About ${r.km} km by road. This is an approximate figure, and the exact route is confirmed for your request.` },
            { q: "How long does the journey take?", a: "It depends on traffic, the route and any stops, so we do not promise a journey time in advance. We confirm the plan for each request." },
            { q: "Can I book a one-way or return trip?", a: `Both can be discussed. Tell us whether you travel one way or want a return from ${to.name} to ${from.name}.` },
          ],
        },
      ],
      layout: layoutFor("route", i),
      route: { from: from.name, to: to.name, km: r.km },
      entities: [cityEntity(from), cityEntity(to), country],
      children: [],
      prefill: { pickup: from.name, dropoff: to.name },
    };
  });
}

/** Hub for /routes so the breadcrumb target is a real page. */
function routesIndex(): PlacePage {
  return {
    kind: "hub",
    path: `${BASE}/routes`,
    name: "Intercity taxi routes in Saudi Arabia",
    title: "Intercity Taxi & Cab Routes Across Saudi Arabia",
    description: `Intercity taxi and cab routes across Saudi Arabia, with approximate road distances: Riyadh, Jeddah, Makkah, Madinah, Dammam and more. Fares confirmed for each request.`,
    h1: "Intercity Taxi & Cab Routes in Saudi Arabia",
    lead: "Pick a route to see its approximate distance, who travels it and what to tell us when you request a ride.",
    directAnswer:
      "Gulf Elite Transport arranges intercity taxi and cab rides between Saudi cities. Each route page gives an approximate road distance, notes on the journey and what to include in your request. Fares, journey times and availability are confirmed for each request and are not published.",
    crumbs: [{ name: "Home", path: "/" }, { name: "Taxi & Cab Services in Saudi Arabia", path: BASE }, { name: "Routes", path: `${BASE}/routes` }],
    facts: [
      { label: "Routes", value: String(routes.length) },
      { label: "Longest listed", value: `${need(cityById.get("riyadh"), "riyadh").name} to ${need(cityById.get("jeddah"), "jeddah").name}, about 950 km` },
      { label: "Distances", value: "Approximate road distances" },
      { label: "Directions", value: "Both ways" },
    ],
    sections: [
      {
        id: "routes",
        h2: "All routes",
        kind: "links",
        items: routes.map((r) => ({ name: `${need(cityById.get(r.from), r.from).name} to ${need(cityById.get(r.to), r.to).name}`, href: `${BASE}/routes/${r.id}`, note: `about ${r.km} km` })),
      },
      notAssumed,
    ],
    layout: { hero: "ledger", body: "tiles", form: "aside" },
    entities: [country],
    children: routes.map((r) => ({ name: `${need(cityById.get(r.from), r.from).name} to ${need(cityById.get(r.to), r.to).name}`, path: `${BASE}/routes/${r.id}` })),
  };
}

export const placePages: PlacePage[] = [hubPage(), ...regionPages(), ...cityPages(), ...areaPages(), ...airportPages(), routesIndex(), ...routePages(), ...riyadhPairs.pages, ...umrahPages];

/** Pairs that the quality gate left out, for the build log. */
export const droppedPairs = riyadhPairs.dropped;

/**
 * Gives every page its own hero/body/form combination. Routes and airports are placed first because they
 * have their own heroes (route line, route band, departures board), then regions, cities and areas share the rest.
 */
function assignLayouts(pages: PlacePage[]) {
  const key = (l: PlaceLayout) => `${l.hero}/${l.body}/${l.form}`;
  const used = new Set<string>();
  for (const p of pages) if (p.kind === "hub") used.add(key(p.layout));
  for (const kind of ["route", "airport", "region", "area", "city"] as PageKind[]) {
    const h = HEROES[kind];
    pages
      .filter((p) => p.kind === kind)
      .forEach((p, i) => {
        for (let k = 0; k < h.length * BODIES.length * FORMS.length; k++) {
          const n = i + k;
          const cand: PlaceLayout = {
            hero: h[n % h.length],
            body: BODIES[Math.floor(n / h.length) % BODIES.length],
            form: FORMS[Math.floor(n / (h.length * BODIES.length)) % FORMS.length],
          };
          if (!used.has(key(cand))) {
            used.add(key(cand));
            p.layout = cand;
            return;
          }
        }
        throw new Error(`No unused layout left for ${p.path}`);
      });
  }
  // Umrah and Hajj pages also have their own pool, so they are unique among themselves.
  const usedTopic = new Set<string>();
  pages
    .filter((p) => p.kind === "topic")
    .forEach((p, i) => {
      // Hotel transfer pages carry a route (airport to hotel), so they may also use the route-line heroes.
      const h: PlaceLayout["hero"][] = p.name.startsWith("Jeddah Airport and ") ? [...HEROES.topic, "routeline", "routeband"] : HEROES.topic;
      for (let k = 0; k < h.length * BODIES.length * FORMS.length; k++) {
        const n = i + k;
        const cand: PlaceLayout = {
          hero: h[n % h.length],
          body: BODIES[Math.floor(n / h.length) % BODIES.length],
          form: FORMS[Math.floor(n / (h.length * BODIES.length)) % FORMS.length],
        };
        if (!usedTopic.has(key(cand))) {
          usedTopic.add(key(cand));
          p.layout = cand;
          return;
        }
      }
      throw new Error(`No unused layout left for ${p.path}`);
    });
  // Area-to-area pages have their own pool: each gets a different hero/body/form combination from the others.
  const usedPair = new Set<string>();
  pages
    .filter((p) => p.kind === "pair")
    .forEach((p, i) => {
      const h: PlaceLayout["hero"][] = p.pair?.type === "airport" ? ["board", "schematic"] : HEROES.pair;
      for (let k = 0; k < h.length * BODIES.length * FORMS.length; k++) {
        const n = i + k;
        const cand: PlaceLayout = {
          hero: h[n % h.length],
          body: BODIES[Math.floor(n / h.length) % BODIES.length],
          form: FORMS[Math.floor(n / (h.length * BODIES.length)) % FORMS.length],
        };
        if (!usedPair.has(key(cand))) {
          usedPair.add(key(cand));
          p.layout = cand;
          return;
        }
      }
      throw new Error(`No unused layout left for ${p.path}`);
    });
}
assignLayouts(placePages);

const byPath = new Map<string, PlacePage>();
for (const p of placePages) {
  if (byPath.has(p.path)) throw new Error(`Duplicate place page path: ${p.path}`);
  byPath.set(p.path, p);
}
const seenTitles = new Set<string>();
for (const p of placePages) {
  if (seenTitles.has(p.title)) throw new Error(`Duplicate place page title: ${p.title}`);
  seenTitles.add(p.title);
}

export const placeByPath = (path: string) => byPath.get(path);
export const subPages = placePages.filter((p) => p.path.startsWith(`${BASE}/`));
export const umrahHub = placePages.find((p) => p.path === UMRAH_BASE)!;
export const umrahSubPages = placePages.filter((p) => p.path.startsWith(`${UMRAH_BASE}/`));
