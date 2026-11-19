import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Wurud Taxi Service: the hand-written landing page for Al Wurud, a mixed residential and commercial district in northern central Riyadh next to Olaya (see district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Al Wurud centre in riyadh-areas.ts and the other centres):
 * RUH about 36 km and about 25 to 30 min (35.7 km / 26 min; the old page said 36 km / 25 min); Olaya about 3 km and about 5 min (3.3 km / 5 min); KAFD about 10 km and about 10 to 12 min (10.1 / 12);
 * Ad Dirah about 11 km and about 10 min (11.2 / 10); Diriyah about 16 km and about 15 to 20 min (16.0 / 18). All old figures were confirmed within rounding.
 * Straight-line distances to neighbouring districts are computed from the district centres in riyadh-areas.ts (haversine) and labelled as straight lines.
 * Metro (the key accuracy point): the independent site riyadhmetro.org lists two SEPARATE stations. "Al Wurud" is on Line 2 (Red), "Deep underground station in the Al Wurud district on
 * King Abdullah Road", between stc and King Abdulaziz Road, opened 2024. "Al Wurud 2" is on Line 1 (Blue), "east of the Line 1 (Blue) corridor in northern Olaya", beside King Fahad Road,
 * between stc and Al Urubah, opened 2025. Both pages say the two are not an interchange, "you cannot walk between them", and that the Red/Blue change is at stc. The official rpt.sa site
 * could not be opened (403), so the page says the stations are "listed" and sends people to the official Riyadh Metro information. The two pages describe stc's position differently
 * (west of Al Wurud, north of Al Wurud 2) so the page gives no direction or distance to stc. No station-to-station or station-to-pickup distances, fares, hours or opening dates are published.
 * NOT verified / left out: any named clinic, office building, restaurant or mall, and street names other than King Abdullah Road (named only as the road the Al Wurud station is listed on).
 * No partnership with Riyadh Metro or any business; no corporate accounts, fares, ratings, reviews, vehicle specifications, free waiting, unlimited stops, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const ALWURUD_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Wurud, Riyadh. The trip is [for example an apartment pickup, an office pickup, a transfer to Al Wurud metro station (Red Line), a transfer to Al Wurud 2 metro station (Blue Line) or an airport transfer], my pickup point is [building and street], my destination is [destination], my date and time are [date and time], and there are [number] passengers. Please confirm availability and the fare.";

export function alWurudRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-wurud");
  if (!me) throw new Error("Al Wurud is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "Al Wurud: homes, offices and the road to Olaya",
    kind: "text",
    paragraphs: [
      "Al Wurud is a district of central-northern Riyadh, just north-west of Olaya. It is neither purely residential nor purely commercial. Apartment and villa streets sit beside offices, shops, restaurants, clinics, schools and mosques, and the King Abdullah Road corridor runs through the area.",
      "That mix creates short, practical rides: from a home to an office, to an appointment, to a metro station, or across the border to Olaya and KAFD. The streets are busy at commuting hours, and many buildings are on side streets, so the exact address and meeting point matter.",
      "Al Wurud and Olaya are separate districts. Olaya's towers and malls are in Olaya, not in Al Wurud, so give us the name of the building you are going to.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Wurud",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Wurud to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Wurud to Riyadh Airport (RUH)", "about 36 km", "about 25 to 30 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Wurud to Olaya", "about 3 km", "about 5 min"], href: pairHref("olaya") },
      { cells: ["Al Wurud to KAFD", "about 10 km", "about 10 to 12 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Wurud to Ad Dirah", "about 11 km", "about 10 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Wurud to Diriyah", "about 16 km", "about 15 to 20 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, road access, the time of day and any stops change the time, so they are not a promised journey time.",
  };

  const residential: Section = {
    id: "residential",
    h2: "Apartment and home pickups",
    kind: "items",
    intro: "Many Al Wurud rides start at a door. A few details make the pickup quick.",
    items: [
      { title: "Building and street", text: "The building name or number and the street, plus a nearby landmark if it helps." },
      { title: "Your entrance", text: "The entrance you will use. If your street is narrow or one-way, suggest a point on a nearby main road." },
      { title: "Passengers and bags", text: "How many people and how many bags, so the vehicle suits them." },
      { title: "A reachable number", text: "A phone number you will answer, so the driver can find you." },
      { title: "No promised private access", text: "We do not promise entry to private parking, compounds or restricted entrances. We agree an accessible meeting point with you for each request." },
    ],
  };

  const office: Section = {
    id: "office",
    h2: "Office rides and appointments",
    kind: "items",
    items: [
      { title: "Office commutes", text: "A private pickup from your building at an agreed time." },
      { title: "Meetings and appointments", text: "Tell us the building name and the entrance. Many offices here share a street, so the exact building avoids a wrong drop-off." },
      { title: "Clinic visits", text: "Give the clinic or building name and the entrance. A ride does not include any appointment, and it is not an emergency or medical transport service." },
      { title: "Return pickups", text: "Ask for the return in the same request, with a time window. Waiting is agreed separately, and we do not promise free waiting time." },
      { title: "Olaya and KAFD", text: "Olaya is about 3 km by road and KAFD about 10 km. Name the tower or building you are going to." },
    ],
  };

  const errands: Section = {
    id: "errands",
    h2: "Shopping, restaurants and errands",
    kind: "items",
    items: [
      { title: "Shops and restaurants", text: "Short rides to local shops, cafes and restaurants, with a return pickup if you want one." },
      { title: "Errands with bags", text: "Tell us about shopping bags so the vehicle suits them." },
      { title: "Several stops", text: "List each stop in your request. We confirm whether they can be included, and we do not promise unlimited stops." },
    ],
  };

  const metro: Section = {
    id: "metro",
    h2: "Metro: Al Wurud and Al Wurud 2 are two different stations",
    kind: "table",
    intro: "An independent Riyadh Metro information site lists two stations with similar names. They are separate, they are on different lines, and you cannot walk between them. Pick the right one before you book. We could not check this against the official operator, so confirm the station name and your entrance with the official Riyadh Metro information.",
    head: ["Station", "Metro line", "What to know"],
    rows: [
      { cells: ["Al Wurud", "Line 2 (Red)", "Listed on King Abdullah Road, in the Al Wurud district"] },
      { cells: ["Al Wurud 2", "Line 1 (Blue)", "A separate station, listed in northern Olaya beside King Fahad Road"] },
    ],
    note: "The two lines are listed as changing at the stc station, not between these two stations. We do not publish station distances, fares, hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  };

  const metroRides: Section = {
    id: "metro-rides",
    h2: "Taxi rides to and from the metro",
    kind: "items",
    items: [
      { title: "Home or office to a station", text: "Tell us which station you mean: Al Wurud on the Red Line or Al Wurud 2 on the Blue Line. The names are close, so say the line too." },
      { title: "Station to an address", text: "A pickup at the station for an address the metro does not reach, or when you have luggage or a group." },
      { title: "Changing between the lines", text: "If you need stc, tell us. A taxi to stc is a normal private ride, and we confirm the entrance with you." },
      { title: "Return after a metro trip", text: "Book a pickup for when you come back, with the station name, the line and the time." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Al Wurud and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 36 km from Al Wurud by road. A transfer can run in either direction, from a home or an office.",
    items: [
      { title: "How long it takes", text: "In light traffic roughly 25 to 30 minutes. Peak hours and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and the building and street in Al Wurud." },
      { title: "Arriving in Al Wurud", text: "For an arrival transfer, tell us your landing time and the address you are going to. We confirm the meeting point with you." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring or a fixed waiting time. Airport pickup points follow the airport's own rules." },
    ],
  };

  const pickup: Section = {
    id: "pickup",
    h2: "Pickup and drop-off in Al Wurud",
    kind: "items",
    intro: "Busy main roads and narrow side streets can change the best meeting point, so the exact point is agreed for each request.",
    items: [
      { title: "The building and street", text: "The exact building name and address, with a nearby landmark." },
      { title: "Your entrance or meeting point", text: "The entrance you will use, or a point on a nearby main road." },
      { title: "A metro station, if relevant", text: "The station name and the line, because Al Wurud and Al Wurud 2 are different stations." },
      { title: "Passengers and luggage", text: "How many people, and how many bags." },
      { title: "A return time", text: "When you want to be collected again, if you need a return." },
      { title: "We do not promise restricted access", text: "We do not promise pickup from private parking or restricted entrances. A driver waits only where that is confirmed for your booking." },
    ],
  };

  const prebook: Section = {
    id: "prebook",
    h2: "Why book in advance",
    kind: "items",
    items: [
      { title: "A clear meeting point", text: "Agreeing the exact building and entrance before the driver sets out saves time on busy streets." },
      { title: "The fare before you commit", text: "You confirm the vehicle, driver and fare before the booking is final." },
      { title: "The right vehicle", text: "We choose a vehicle that suits your passengers and bags for each booking." },
      { title: "Office, appointments and flights", text: "A planned pickup time works backwards from your appointment or your flight." },
      { title: "A planned return", text: "Arranging the return in the same request is easier than finding a car later." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Al Wurud on the map",
    kind: "map",
    intro: "See where Al Wurud is in Riyadh, and open the two metro stations below in Google Maps to check which one you need before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Al Wurud, Riyadh",
    places: [
      { name: "Al Wurud Metro Station", query: "Al Wurud Metro Station, Riyadh", note: "Line 2 (Red)" },
      { name: "Al Wurud 2 Metro Station", query: "Al Wurud 2 Metro Station, Riyadh", note: "Line 1 (Blue)" },
      { name: "stc Metro Station", query: "stc Metro Station, Riyadh", note: "Red and Blue line change" },
    ],
  };

  const near = ["al-sulaimaniyah", "olaya", "al-mohammadiyah", "al-rawdah", "al-nakheel", "al-ghadir"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Wurud",
    kind: "links",
    intro: "These districts are close to Al Wurud but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 10 km by road" },
      { name: "Diplomatic Quarter", href: ctx.districtHref("diplomatic-quarter"), note: "Western Riyadh, across the city" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "The trip", text: "An apartment or office pickup, a metro station transfer (say Al Wurud Red Line or Al Wurud 2 Blue Line) or the airport." },
      { title: "Pickup and destination", text: "Your building and street in Al Wurud, and where you are going." },
      { title: "Date, time and group", text: "When you want to travel, and how many passengers and bags." },
      { title: "A return time", text: "If you need a pickup afterwards." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Al Wurud",
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
    h2: "Al Wurud taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Wurud?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup building and street, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange a pickup from an apartment or an office?", a: "Yes. Give the building or business name, the street and the entrance you will use. If your street is narrow or busy, we may suggest a nearby main road." },
      { q: "How far is Al Wurud from Riyadh Airport?", a: "About 36 km by road. In light traffic the drive takes roughly 25 to 30 minutes, and busy times add time." },
      { q: "Can I book a taxi to Olaya?", a: "Yes. Olaya is about 3 km by road, roughly 5 minutes in light traffic. Name the tower or building you are going to." },
      { q: "Which Riyadh Metro station serves Al Wurud?", a: "An independent metro information site lists Al Wurud station on Line 2 (Red), on the King Abdullah Road corridor. Check the official Riyadh Metro information for current services." },
      { q: "What is the difference between Al Wurud and Al Wurud 2 stations?", a: "They are two separate stations. Al Wurud is listed on Line 2 (Red). Al Wurud 2 is listed on Line 1 (Blue), in northern Olaya. Say the station and the line when you book." },
      { q: "Are the two stations directly connected?", a: "No. The same site says you cannot walk between them. The Red and Blue lines are listed as changing at the stc station." },
      { q: "Can I book a taxi to the stc metro station?", a: "Yes. A ride to stc is a normal private ride, quoted for your request. Tell us your pickup address and the entrance you want." },
      { q: "Can I arrange a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Is Al Wurud the same as Olaya?", a: "No. They are neighbouring districts. Olaya's towers and malls are in Olaya, so name the building you are going to." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  return {
    title: "Al Wurud Taxi Service Riyadh | Office and Airport Rides",
    description: "Book a private taxi in Al Wurud, Riyadh for apartment pickups, office rides, metro station transfers and airport trips. Fare confirmed first.",
    h1: "Al Wurud Taxi Service in Riyadh",
    lead: "Private rides from your building in Al Wurud for office trips, appointments, metro station transfers and airport journeys, with your meeting point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Wurud, a mixed residential and commercial district of central-northern Riyadh next to Olaya, Gulf Elite Transport takes bookings for private taxi rides from apartments and offices, appointment trips with a planned return, rides to Riyadh Metro stations and airport transfers to King Khalid International Airport (RUH), about 36 km by road. Al Wurud station (Line 2, Red) and Al Wurud 2 station (Line 1, Blue) are two separate stations, so say which one you need. Send your pickup building, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 36 km by road" },
      { label: "Olaya", value: "about 3 km by road" },
      { label: "KAFD", value: "about 10 km by road" },
      { label: "Metro", value: "two separate stations: Al Wurud (Red) and Al Wurud 2 (Blue)" },
    ],
    sections: addLinks(addImages(
        [about, journeys, residential, office, errands, metro, metroRides, airport, pickup, prebook, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq],
        me.name,
        {
          about: { slot: "al-wurud-riyadh-taxi-service", alt: "A white SUV with two passengers and a driver in a white thobe on a street of apartment blocks, shops and a pharmacy", label: "Photo: al-wurud-riyadh-taxi-service", w: 1000, h: 558 },
          residential: { slot: "al-wurud-riyadh-private-taxi-journey", alt: "Inside a taxi, a woman driver in a black headscarf at the wheel with a male passenger in the back seat", label: "Photo: al-wurud-riyadh-private-taxi-journey", w: 1000, h: 558 },
          office: { slot: "al-wurud-riyadh-office-taxi-transfer", alt: "A man in a white thobe shakes hands with a woman in a business suit beside a navy BMW outside an office entrance", label: "Photo: al-wurud-riyadh-office-taxi-transfer", w: 1000, h: 558 },
          airport: { slot: "al-wurud-riyadh-airport-private-transfer", alt: "A driver loading a brown parcel into a dark green van at an airport kerb while a couple with a suitcase waits", label: "Photo: al-wurud-riyadh-airport-private-transfer", w: 1000, h: 558 },
          pickup: { slot: "al-wurud-riyadh-taxi-pickup-point", alt: "A silver minivan with a driver in a white thobe, a woman and a girl with a wheeled suitcase outside a residential building", label: "Photo: al-wurud-riyadh-taxi-pickup-point", w: 1000, h: 558 },
        },
      ), ctx, "al-wurud"),
    whatsappMessage: ALWURUD_WHATSAPP_MESSAGE,
  };
}
