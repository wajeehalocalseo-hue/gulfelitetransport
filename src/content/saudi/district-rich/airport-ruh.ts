import { fmtKm } from "../riyadh-districts";
import journeysJson from "../riyadh-journeys.json";
import type { PlacePage, Section } from "../types";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";
import { wordCount } from "./factory";

/**
 * King Khalid International Airport Taxi Service: the hand-written airport page (see build.ts airportPages, which uses this for RUH only).
 * Primary focus keyword: "King Khalid International Airport Taxi Service" (title, H1, lead, description). One primary keyword only.
 * Search intent: airport-first (arrivals, departures, airport-to-hotel, airport-to-business-district), not a neighbourhood page. The neighbourhood pages own "<district> Taxi Service";
 * this page owns the airport and links down to them, so the two sets do not compete.
 *
 * IMAGES: four reserved slots (about, departures, arrivals, business). Photos go in public/images/routes/riyadh-districts/king-khalid-international-airport/<slot>.webp.
 * Suggested files: king-khalid-airport-riyadh-terminal-exterior.webp (the terminal building), riyadh-airport-departures-taxi-pickup.webp (a car and driver at a kerb with luggage),
 * riyadh-airport-arrivals-private-transfer.webp (a driver and a traveller with a trolley), riyadh-airport-transfer-to-olaya-hotel.webp (a car outside a Riyadh hotel).
 * No photo of a real airport facility is claimed to be official; use only supplied photos.
 *
 * CENTRE POINT: riyadh-areas.ts stores the airport at 24.9578 / 46.6989, used unchanged for the map and the weather strip.
 * Figures: riyadh-journeys.json (OpenStreetMap routing, light traffic, reviewed November 2026), the same source as the neighbourhood pages.
 * Roads in the directions are those the routing returned for district-to-airport drives on the neighbourhood pages (King Saud Road, Makkah Al Mukarramah Road, Eastern Ring Road, Airport Road, King Salman Road, King Fahd Road).
 * NOT verified / left out: terminal numbers and airline allocation, terminal exits, kerb and pick-up zones, car-park rules, meeting points, fares, metro at the airport, hotel partnerships.
 * Company facts used: private pre-booked rides confirmed with vehicle, driver and fare before commitment (as on all pages). No flight tracking, meet-and-greet, fixed waiting time or airport permit is claimed.
 */

export const RUH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from King Khalid International Airport (RUH), Riyadh. The trip is [an arrival or a departure], my flight number is [flight number] and my terminal is [terminal, if known], my date and time are [date and time], my destination or pickup point in Riyadh is [district, hotel or building and entrance], and there are [number] passengers and [number] bags. I need a return transfer at [return time]. Please confirm availability and the fare.";

const KEYWORD = "King Khalid International Airport Taxi Service";
const JR = journeysJson as Record<string, Record<string, { km: number; min: number }>>;
const toRuh = (id: string) => JR[id]["king-khalid-international-airport"];
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

const DIRECTIONS =
  "King Khalid International Airport is in the north of Riyadh, and drives to it from the central districts use Airport Road. Routing data for a south-west district such as Al Badiah follows King Saud Road, Makkah Al Mukarramah Road, the Eastern Ring Road, Airport Road and King Salman Road. Leaving the airport, the same corridors lead back towards Olaya, KAFD, Diriyah and Ad Dirah. These roads come from OpenStreetMap routing and are a guide only. Terminal approaches and exits follow the airport's own rules, so we skip them. The best route depends on your destination, exact pickup point and traffic.";

const LINKS = {
  titles: ["Riyadh districts and business areas", "Landmarks, towers and shopping", "Heritage and city sights", "Other Saudi cities"],
  districts: ["Olaya", "King Abdullah Financial District", "Diplomatic Quarter", "Al Malqa", "Hittin", "Al Yasmin", "Al Nakheel", "Al Sahafah", "Al Rawdah", "Al Malaz", "Ad Dirah"],
  places: ["Kingdom Centre", "Al Faisaliah Tower", "Riyadh Front", "Boulevard Riyadh City", "Riyadh Park", "Masmak Fortress"],
  others: ["Diriyah", "At-Turaif District", "National Museum of Saudi Arabia", "Souq Al Zal", "Wadi Hanifah"],
  cities: ["Jeddah", "Dammam", "Makkah"],
};

export function airportRuhRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "king-khalid-international-airport");
  if (!me) throw new Error("King Khalid International Airport is missing from riyadh-areas.ts");
  const words = wordCount(DIRECTIONS);
  if (words !== 100) throw new Error(`King Khalid International Airport: the driving directions have ${words} words, not 100`);
  const all25 = [...LINKS.districts, ...LINKS.places, ...LINKS.others, ...LINKS.cities];
  if (all25.length !== 25 || new Set(all25.map((x) => x.toLowerCase())).size !== 25) throw new Error(`King Khalid International Airport: the Maps list has ${all25.length} entries, not 25 unique`);

  const title = "King Khalid International Airport Taxi Service | Riyadh RUH";
  const h1 = "King Khalid International Airport Taxi Service";
  const lead = "King Khalid International Airport Taxi Service from Gulf Elite Transport: pre-booked private rides between Riyadh's main airport (RUH) and your hotel, home or office. Send your flight details on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.";
  for (const [label, v] of [["title", title], ["h1", h1], ["lead", lead]] as const) if (!v.includes(KEYWORD)) throw new Error(`RUH: the primary keyword is missing from the ${label}`);

  const olaya = toRuh("olaya");
  const kafd = toRuh("king-abdullah-financial-district");
  const dirah = toRuh("ad-dirah");
  const diriyah = toRuh("diriyah");
  const pairHref = (id: string) => ctx.pairs.find((p) => p.href.endsWith(`king-khalid-international-airport-to-${id}`))?.href;

  const about = text("about", "About King Khalid International Airport (RUH)", [
    "King Khalid International Airport, known by its code RUH, is the main airport of Riyadh. It lies in the north of the city, well away from the old centre and from the business towers along Olaya Street, so almost every airport journey is a long drive across the city and not a short hop.",
    "That distance is why most travellers book ahead. A guest landing late wants a driver who knows the address, and a family leaving early wants a pickup time worked backwards from the flight. This page covers that kind of private, pre-booked ride, in both directions. It does not cover buses, rental cars or the airport's own services.",
    "The airport has more than one terminal and the airline you fly decides which one you use. We do not list terminal numbers here, because airlines can move between them. Check your ticket or the airline, and send us the terminal if you know it.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular transfers from King Khalid International Airport",
    kind: "table",
    intro: "Road distance and light-traffic driving time between the airport and the places travellers ask about most. Each row opens the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["RUH to Olaya", `about ${Math.round(olaya.km)} km`, `about ${olaya.min} min`], href: pairHref("olaya") },
      { cells: ["RUH to KAFD", `about ${Math.round(kafd.km)} km`, `about ${kafd.min} min`], href: pairHref("king-abdullah-financial-district") },
      { cells: ["RUH to Diriyah", `about ${Math.round(diriyah.km)} km`, `about ${diriyah.min} min`], href: pairHref("diriyah") },
      { cells: ["RUH to Ad Dirah", `about ${Math.round(dirah.km)} km`, `about ${dirah.min} min`], href: pairHref("ad-dirah") },
      { cells: ["RUH to Diplomatic Quarter", `about ${Math.round(toRuh("diplomatic-quarter").km)} km`, `about ${toRuh("diplomatic-quarter").min} min`], href: pairHref("diplomatic-quarter") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the airport and each district centre, reviewed in November 2026. They are not straight-line distances. Traffic, the terminal you use, your exact destination and any stops change the time, so they are not a promised journey time.",
  };

  const departures = text("departures", "Departures: a ride to the airport", [
    `For a flight out of Riyadh, send us the flight number, the date and time of departure, your terminal if you know it, and the address you leave from. Because the airport is in the north, even a district on the north side takes time, and a south-west district such as Al Badiah is about 48 km away by road. Build a generous margin into the pickup time, and tell us if you have a lot of luggage or an early check-in.`,
    "Name the gate or entrance of your hotel or building and give a phone number you will answer. If a return transfer is needed on the way back, ask for it in the same request. Where the car can stop at the terminal follows the airport's own rules, and we confirm the drop-off point with you instead of promising one.",
  ]);

  const arrivals = text("arrivals", "Arrivals: a ride from the airport", [
    "For an arrival, send your flight number, your landing time and where you are going in Riyadh. A hotel name is useful, and so is the district, because many Riyadh hotels share a name with a road or a tower. We plan the pickup around your landing time and confirm it with you.",
    "We do not promise flight tracking, a meet-and-greet service or a fixed waiting time, and we do not state where drivers wait inside the airport. The pickup point follows the airport's own rules and is agreed with you before you travel. If your flight changes, message us as early as you can so we can discuss it.",
  ]);

  const business = text("business", "Airport rides to hotels, offices and Riyadh districts", [
    `Most airport rides end in Olaya (about ${fmtKm(olaya.km)} km by road), KAFD (about ${fmtKm(kafd.km)} km), the Diplomatic Quarter, Diriyah or one of the residential districts. Hotel guests should give the exact hotel name and the entrance they want, and business travellers should give the tower, the floor-level entrance and a name to ask for.`,
    "The ride is a private car for your group, so the vehicle follows the number of passengers and bags you tell us. Say if you travel with children, need a car for a longer wait, or want a stop on the way. Each request is quoted separately and we confirm the fare before you commit.",
  ]);

  const family = text("prebook", "Why pre-book an airport taxi in Riyadh", [
    "Booking ahead lets you settle the pickup time, the vehicle and the fare before you fly. For a late arrival it also means a driver is already arranged for your landing time, subject to our confirmation. Families and groups can tell us how many seats and bags they need, and a return pickup is simpler to arrange in the same request.",
  ]);

  const ids = ["al-falah", "al-yasmin", "al-wadi", "al-arid", "al-malqa", "al-ghadir", "al-yarmuk", "ishbiliyah", "al-khaleej", "al-janadriyah", "al-qirawan", "al-nadhim", "al-irqah", "al-badiah", "dhahrat-laban", "banban", "al-mansourah"];
  const districts: Section = {
    id: "districts",
    h2: "Airport transfers from Riyadh districts",
    kind: "links",
    intro: "Each of these districts has its own taxi page with local roads and nearby places. The figure is the road distance to the airport from that district's centre, in light traffic.",
    items: ids
      .map((id) => ctx.all.find((x) => x.id === id))
      .filter((x): x is NonNullable<typeof x> => Boolean(x))
      .map((x) => ({ name: `${x.name} Taxi Service`, href: ctx.districtHref(x.id), note: `about ${Math.round(toRuh(x.id).km)} km to RUH, about ${toRuh(x.id).min} min` }))
      .sort((a, b) => parseInt(a.note!.replace(/\D+/, ""), 10) - parseInt(b.note!.replace(/\D+/, ""), 10)),
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your flight number, the terminal if you know it, the date and time, your hotel, street or district in Riyadh, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around the airport",
    kind: "links",
    items: [
      { name: "Riyadh Taxi Service", href: "/riyadh-taxi-service", note: "All Riyadh pickups and districts" },
      { name: "Intercity routes from Riyadh", href: "/taxi-saudi-arabia/routes", note: "Long-distance private transfers" },
      { name: "Book a ride", href: "/book", note: "The booking form" },
      { name: "Contact us", href: "/contact", note: "Other ways to reach us" },
    ],
  };

  const faq: Section = {
    id: "faq",
    h2: "Riyadh airport taxi: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi at King Khalid International Airport?", a: "Message us on WhatsApp or use the booking form. Send your flight number, date, time, terminal if you know it, your destination or pickup point in Riyadh, and the number of passengers and bags. We confirm the vehicle, driver and fare before you commit." },
      { q: "Which terminal should I give?", a: "Give the terminal printed on your ticket or shown by your airline. If you are not sure, send the airline and flight number and tell us. We do not list terminal numbers here because airlines can change them." },
      { q: "How long is the drive from the airport to Olaya?", a: `About ${Math.round(olaya.km)} km by road, roughly ${olaya.min} minutes in light traffic. Busy hours, your terminal and your exact destination change that, so it is not a promised journey time.` },
      { q: "How far is the airport from KAFD and Diriyah?", a: `About ${Math.round(kafd.km)} km to KAFD (roughly ${kafd.min} minutes) and about ${Math.round(diriyah.km)} km to Diriyah (roughly ${diriyah.min} minutes) in light traffic. These are road estimates, not guarantees.` },
      { q: "Do you offer meet-and-greet or flight tracking?", a: "We do not promise either. Pickup arrangements follow the airport's own rules and are agreed with you for each request." },
      { q: "What happens if my flight is delayed?", a: "Send us your flight number and tell us as early as you can. How a delay is handled, including any waiting, is agreed with you for each request." },
      { q: "Can I book a return transfer to the airport?", a: "Yes. Ask for the return in the same request with a time window. Availability and the fare are confirmed for each request." },
      { q: "Do you publish airport taxi fares?", a: "No. No standard fares are published. Each transfer is quoted for your request and you confirm the fare before you commit." },
      { q: "Can I book from a Riyadh district to the airport?", a: "Yes. Pickups from any Riyadh district are possible. Open the page for your district for local roads and places, then send your address or map pin." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for King Khalid International Airport",
    kind: "local",
    intro: "Find the airport on the map, read how the main roads connect it to Riyadh, and open common destinations in Google Maps.",
    mapQuery: `${me.lat},${me.lng}`,
    mapLabel: "King Khalid International Airport, Riyadh",
    directionsTitle: "Driving Directions from King Khalid International Airport",
    directions: DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: LINKS.titles[0], links: LINKS.districts.map((n) => ({ name: n, query: `${n}, Riyadh, Saudi Arabia` })) },
      { title: LINKS.titles[1], links: LINKS.places.map((n) => ({ name: n, query: `${n}, Riyadh, Saudi Arabia` })) },
      { title: LINKS.titles[2], links: LINKS.others.map((n) => ({ name: n, query: `${n}, Riyadh, Saudi Arabia` })) },
      { title: LINKS.titles[3], links: LINKS.cities.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: "Current Weather at King Khalid International Airport, Riyadh",
    weather: { place: "King Khalid International Airport, Riyadh", lat: me.lat, lng: me.lng },
  };

  const img = (slot: string, alt: string) => ({ slot, alt, label: `Photo: ${slot}`, w: 1000, h: 558 });
  const images: Record<string, ReturnType<typeof img>> = {
    about: img("king-khalid-airport-riyadh-terminal-exterior", "The passenger terminal building at King Khalid International Airport in north Riyadh"),
    departures: img("riyadh-airport-departures-taxi-pickup", "A driver loading luggage into a car at a kerb for a departure from Riyadh airport"),
    arrivals: img("riyadh-airport-arrivals-private-transfer", "A traveller with a luggage trolley meeting a private driver after arriving in Riyadh"),
    business: img("riyadh-airport-transfer-to-olaya-hotel", "A private car stopped outside a hotel entrance in Riyadh after an airport transfer"),
  };
  const sections = [about, journeys, departures, arrivals, business, family, districts, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local].map((s) => (images[s.id] ? { ...s, image: images[s.id] } : s));

  return {
    title,
    description: "King Khalid International Airport Taxi Service: pre-booked private rides between RUH and Olaya, KAFD, Diriyah and Riyadh hotels. Fare confirmed before you commit.",
    h1,
    lead,
    directAnswer: `Gulf Elite Transport takes bookings for private King Khalid International Airport (RUH) taxi rides in both directions. The airport is in the north of Riyadh, about ${fmtKm(olaya.km)} km by road from Olaya and about ${fmtKm(kafd.km)} km from KAFD. Send your flight number, terminal if you know it, destination and the number of passengers and bags by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request. We do not promise meet-and-greet or flight tracking.`,
    facts: [
      { label: "IATA code", value: "RUH" },
      { label: "Olaya", value: `about ${Math.round(olaya.km)} km by road` },
      { label: "KAFD", value: `about ${Math.round(kafd.km)} km by road` },
      { label: "Location", value: "north Riyadh" },
    ],
    sections: addLinks(sections, ctx, "king-khalid-international-airport"),
    whatsappMessage: RUH_WHATSAPP_MESSAGE,
  };
}
