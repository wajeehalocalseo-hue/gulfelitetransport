import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Nakheel Taxi Service: the hand-written landing page for Al Nakheel, a residential district in north-west Riyadh (see district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Al Nakheel centre in riyadh-areas.ts and the other centres):
 * RUH about 33 km and about 25 min (32.6 km / 25 min; the old page said 33 km / 25 min); Olaya about 13 km and about 15 min (12.7 / 15; old 12 / 15);
 * KAFD about 8 km and about 10 to 12 min (8.0 / 12; the old page said 6.2 km / 10 min, which was wrong and is corrected); Ad Dirah about 19 km and about 20 min (19.3 / 19; old 20 / 20);
 * Diriyah about 9 km and about 15 min (9.2 / 16; old 9.1 / 15). Straight-line distances to neighbouring districts are computed from the district centres (haversine).
 * AL NAKHEEL MALL IS NOT IN AL NAKHEEL DISTRICT. OpenStreetMap (Nominatim) places the mall at 24.7668/46.7158, labelled An Nuzhah / Ash Shawki in north-east Riyadh, about 9 km in a straight line
 * and about 13 km (about 14 min) by road from the Al Nakheel centre. The owner's brief says the official Cenomi listing gives Exit 9, Imam Saud Ibn Abdul Aziz Branch Road, Al Mughrizat, but the
 * cenomicenters.com site returned 429 so that address could not be checked; the page therefore states only that the mall is in north-east Riyadh outside the district, and tells people to
 * confirm the address and entrances on the mall's own listing. No mall hours, parking or entrance details are published. (The generic district text in riyadh-areas.ts still says the district is
 * "known for Al Nakheel Mall"; it is overridden by this page.)
 * King Saud University: OpenStreetMap labels the campus (24.7242/46.6232, King Khalid Road) as in Hay Al Nakheel and the KSU campus page says it has gates on King Khalid Road, King Abdullah Road and
 * Prince Turki bin Abdulaziz Al Awal Road, and that the University Medical City is within the campus. Some maps therefore place the campus inside the district; the page says "next to or beside" and gives no
 * road distance. Metro: the independent site riyadhmetro.org lists King Saud University station as the western end of Line 2 (Red), elevated, at 24.7097/46.6287, no interchange, opened 2024; the official
 * rpt.sa site could not be opened (403). Al Nakheel has no confirmed station of its own, and the page says so. No metro fares, hours, schedules or journey times.
 * NOT verified / left out: Al Murooj (no page), the exact district boundary, the mall's address, entrances and parking, hospital departments and appointment details. No partnership with the mall, KSU,
 * its medical city, Riyadh Metro or KAFD; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const ALNAKHEEL_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Nakheel, Riyadh. The trip is [for example a home pickup, Al Nakheel Mall, King Saud University, a family trip or an airport transfer], my pickup point is [street, building and gate], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alNakheelRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-nakheel");
  if (!me) throw new Error("Al Nakheel is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "Al Nakheel: a residential district in north-west Riyadh",
    kind: "text",
    paragraphs: [
      "Al Nakheel is a residential district in north-west Riyadh, close to Al Mohammadiyah, Al Aqiq and the King Abdullah Financial District (KAFD). It is mostly villas, apartments and family streets, with shops and services close by and King Saud University beside it.",
      "Most rides here start at home: a family going to the airport, a commuter heading to KAFD, a student or staff member travelling to the university, or a shopping trip. The district's exact boundary is not fixed on every map, so give your street, building and gate rather than relying on the district name alone.",
      "Al Nakheel Mall is not in Al Nakheel district, despite the name. It is in north-east Riyadh, so a ride there crosses the city. See the mall section below.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Nakheel",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Nakheel to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Nakheel to Riyadh Airport (RUH)", "about 33 km", "about 25 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Nakheel to KAFD", "about 8 km", "about 10 to 12 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Nakheel to Olaya", "about 13 km", "about 15 min"], href: pairHref("olaya") },
      { cells: ["Al Nakheel to Diriyah", "about 9 km", "about 15 min"], href: pairHref("diriyah") },
      { cells: ["Al Nakheel to Ad Dirah", "about 19 km", "about 20 min"], href: pairHref("ad-dirah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, road access, the time of day and any stops change the time, so they are not a promised journey time.",
  };

  const residential: Section = {
    id: "residential",
    h2: "Home, villa and apartment pickups",
    kind: "items",
    intro: "Many Al Nakheel rides start at a door. A few details make the pickup quick.",
    items: [
      { title: "Street and building", text: "The street, the villa or building number and a nearby landmark if it helps." },
      { title: "Gate or compound", text: "If you live in a compound or behind a gate, the name and the gate you will use. A booking does not give entry to a gated community, so agree a meeting point outside it if needed." },
      { title: "A reachable number", text: "A phone number you will answer, so the driver can find you." },
      { title: "Passengers and bags", text: "How many people and how many bags, so the vehicle suits them." },
      { title: "No promised private access", text: "We do not promise entry to private roads or parking. We agree an accessible meeting point with you for each request." },
    ],
  };

  const mall: Section = {
    id: "mall",
    h2: "Rides to Al Nakheel Mall",
    kind: "items",
    intro: "Al Nakheel Mall is a shopping centre in north-east Riyadh, about 9 km from the centre of Al Nakheel in a straight line and about 13 km by road, roughly 14 minutes in light traffic. It is not in Al Nakheel district, so say that you mean the mall when you book. Check the mall's own listing for its current address, entrances and visitor information.",
    items: [
      { title: "Say it is the mall", text: "Write \"Al Nakheel Mall\" and the entrance you want, so the driver does not go to the district." },
      { title: "Choose an entrance or meeting point", text: "Name the entrance, or agree a point the car can reach. We cannot promise a particular entrance, a restricted lane or a waiting position." },
      { title: "Drop-off or return pickup", text: "Tell us whether the ride is a drop-off, a pickup or both. For a return, give a time window." },
      { title: "A contact number", text: "A number you will answer helps the driver find you in a busy car park or at a crowded entrance." },
      { title: "Parking is separate", text: "A taxi fare does not include parking, and we do not state mall hours or parking rules. Check the mall's own information." },
    ],
  };

  const university: Section = {
    id: "university",
    h2: "King Saud University and medical city journeys",
    kind: "items",
    intro: "King Saud University's main campus is next to Al Nakheel. According to the university, the campus has gates on King Khalid Road, King Abdullah Road and Prince Turki bin Abdulaziz Al Awal Road, and its University Medical City is within the campus. Some maps show the campus inside the district, which is why we ask for the exact gate.",
    items: [
      { title: "Visits and campus travel", text: "Rides for students, staff and visitors. Tell us the gate or the building you are going to, because the campus is large." },
      { title: "Hospital and clinic visits", text: "Give the building and entrance. A ride does not include any appointment, and it is not an emergency or medical transport service." },
      { title: "Return trips", text: "Appointments can run over. Ask for a return pickup window and tell us if it changes. Waiting is agreed separately." },
      { title: "No partnership", text: "Gulf Elite Transport has no partnership with the university or its hospitals." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Al Nakheel and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 33 km from Al Nakheel by road. A transfer can run in either direction.",
    items: [
      { title: "How long it takes", text: "In light traffic roughly 25 minutes. Peak hours and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and your address in Al Nakheel." },
      { title: "Arriving in Al Nakheel", text: "For an arrival transfer, tell us your landing time and the address you are going to. We confirm the meeting point with you." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring, meet-and-greet or a fixed waiting time. Airport pickup points follow the airport's own rules." },
    ],
  };

  const business: Section = {
    id: "business",
    h2: "Business and cross-city journeys",
    kind: "items",
    items: [
      { title: "KAFD", text: "KAFD is about 8 km by road, roughly 10 to 12 minutes in light traffic. Name the tower and the entrance. Access is controlled, so we agree a meeting point and do not promise access to towers or private car parks." },
      { title: "Olaya", text: "Olaya is about 13 km by road, roughly 15 minutes. Name the tower or building you are going to." },
      { title: "Diriyah", text: "Diriyah is about 9 km by road, roughly 15 minutes, and Hittin is also close. Give the place you are going to." },
      { title: "No corporate claims", text: "Gulf Elite Transport has no partnership with KAFD or any business." },
    ],
  };

  const family: Section = {
    id: "family",
    h2: "Family and group travel",
    kind: "items",
    items: [
      { title: "Tell us who is travelling", text: "How many adults, children and bags." },
      { title: "The vehicle is confirmed for your request", text: "We choose a vehicle that suits your group and confirm it with you before you commit." },
      { title: "Plan the return", text: "Ask for the return pickup in the same request, with a time window." },
    ],
  };

  const metro: Section = {
    id: "metro",
    h2: "Riyadh Metro near Al Nakheel",
    kind: "items",
    intro: "Al Nakheel does not have a confirmed metro station of its own. A station that serves a nearby destination is not a station inside the district.",
    items: [
      { title: "King Saud University station", text: "An independent Riyadh Metro information site lists King Saud University as the western end of Line 2 (Red), serving the campus. We could not check this against the official operator, so check the official Riyadh Metro information for current services and hours." },
      { title: "How a taxi helps", text: "A private ride can take you from your door to a station, or from a station to an address the metro does not reach. Send your exact address and we suggest a suitable drop-off." },
      { title: "What we do not publish", text: "We do not publish walking distances, fares, hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it." },
    ],
  };

  const pickup: Section = {
    id: "pickup",
    h2: "Pickup and drop-off in Al Nakheel",
    kind: "items",
    intro: "Gates, private roads and busy campus or mall entrances can change where the driver can meet you, so the exact point is agreed for each request.",
    items: [
      { title: "Street address", text: "The street, the building number and a nearby landmark." },
      { title: "Compound and gate", text: "The compound name and the gate, if relevant." },
      { title: "Your meeting point", text: "The entrance or a point on a nearby road that the car can reach." },
      { title: "Your destination", text: "The building and entrance, or the mall or campus gate." },
      { title: "Passengers and luggage", text: "How many people, and how many bags." },
      { title: "A return time", text: "When you want to be collected again, if you need a return." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Al Nakheel on the map",
    kind: "map",
    intro: "See where Al Nakheel is in Riyadh, and open the places below in Google Maps to check the roads and entrances before you ride. Note that Al Nakheel Mall is far to the east of the district.",
    query: `${me.lat},${me.lng}`,
    label: "Al Nakheel, Riyadh",
    places: [
      { name: "Al Nakheel Mall", query: "Al Nakheel Mall, Riyadh", note: "North-east Riyadh, not in the district" },
      { name: "King Saud University", query: "King Saud University, Riyadh", note: "Main campus" },
      { name: "King Saud University Metro Station", query: "King Saud University Metro Station, Riyadh", note: "Line 2 (Red)" },
    ],
  };

  const near = ["al-mohammadiyah", "king-abdullah-financial-district", "al-aqiq", "al-ghadir", "hittin"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Nakheel",
    kind: "links",
    intro: "These districts are close to Al Nakheel but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 9 km by road" },
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 13 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "The trip", text: "A home pickup, Al Nakheel Mall, King Saud University, a family trip or the airport." },
      { title: "Pickup and destination", text: "Your street, building and gate, and where you are going, with the entrance." },
      { title: "Date, time and group", text: "When you want to travel, and how many passengers and bags." },
      { title: "A return time", text: "If you need a pickup afterwards, for example after shopping or an appointment." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Al Nakheel",
    kind: "links",
    items: [
      { name: "Riyadh Taxi Service", href: "/riyadh-taxi-service", note: "All Riyadh pickups and districts" },
      { name: "King Khalid International Airport (RUH)", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport", note: "Airport transfers" },
      { name: "Intercity routes from Riyadh", href: "/taxi-saudi-arabia/routes", note: "Long-distance private transfers" },
      { name: "Book a ride", href: "/book", note: "The booking form" },
      { name: "Contact us", href: "/contact", note: "Other ways to reach us" },
    ],
  };

  const faq: Section = {
    id: "faq",
    h2: "Al Nakheel taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Nakheel?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a private taxi from my home in Al Nakheel?", a: "Yes. Give the street, the building number, the gate if there is one, and a landmark. A booking does not give entry to a gated community, so we may agree a meeting point outside the gate." },
      { q: "How far is Al Nakheel from Riyadh Airport?", a: "About 33 km by road. In light traffic the drive takes roughly 25 minutes, and busy times add time." },
      { q: "Can I book a taxi from Al Nakheel to KAFD?", a: "Yes. KAFD is about 8 km by road, roughly 10 to 12 minutes in light traffic. Name the tower and the entrance." },
      { q: "Is Al Nakheel Mall in Al Nakheel district?", a: "No. Despite the name, the mall is in north-east Riyadh, about 13 km from the district by road. Say \"Al Nakheel Mall\" when you book, and check the mall's own listing for its address and entrances." },
      { q: "Can I book a taxi to Al Nakheel Mall and a return pickup?", a: "Yes. Tell us the entrance or meeting point and a return time window. We cannot promise a particular entrance or waiting spot, and parking is not included in the fare." },
      { q: "Can I book a taxi to King Saud University?", a: "Yes. The campus is next to Al Nakheel and has several gates. Tell us the gate or building you are going to." },
      { q: "Does Al Nakheel have a metro station?", a: "Not a confirmed one of its own. An independent metro information site lists King Saud University station on Line 2 (Red), which serves the campus. Check the official Riyadh Metro information." },
      { q: "Can I arrange a family or group ride?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "Can I arrange a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  return {
    title: "Al Nakheel Taxi Service Riyadh | Home Pickups and Airport",
    description: "Book a private taxi in Al Nakheel, Riyadh for home pickups, family trips, KAFD rides and airport transfers. Fare confirmed before you commit.",
    h1: "Al Nakheel Taxi Service in Riyadh",
    lead: "Private rides from your home in Al Nakheel for family trips, King Saud University, KAFD journeys and airport transfers, with your meeting point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Nakheel, a residential district in north-west Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, rides to King Saud University, business rides to KAFD (about 8 km by road) and airport transfers to King Khalid International Airport (RUH), about 33 km by road. Al Nakheel Mall is not in Al Nakheel district but in north-east Riyadh, so say that you mean the mall when you book. Al Nakheel has no confirmed metro station of its own. Send your pickup address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 33 km by road" },
      { label: "KAFD", value: "about 8 km by road" },
      { label: "Olaya", value: "about 13 km by road" },
      { label: "Al Nakheel Mall", value: "north-east Riyadh, not in the district" },
    ],
    sections: addLinks(addImages([about, journeys, residential, mall, university, airport, business, family, metro, pickup, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name), ctx, "al-nakheel"),
    whatsappMessage: ALNAKHEEL_WHATSAPP_MESSAGE,
  };
}
