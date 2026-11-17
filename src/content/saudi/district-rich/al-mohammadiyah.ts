import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Mohammadiyah Taxi Service: the hand-written landing page for Al Mohammadiyah, a residential district of north-central Riyadh with villas, apartments and compounds (see district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Al Mohammadiyah centre in riyadh-areas.ts and the other centres):
 * RUH about 32 km and about 23 to 25 min (32.1 km / 23 min; the old page said 33 km / 25 min); Olaya about 9 km and about 10 min (8.7 km / 10 min; old 8.6 km / 9 min);
 * KAFD about 5 km and about 8 min (5.4 / 8; old 5.1 / 7); Ad Dirah about 16 km and about 15 min (15.6 / 14); Diriyah about 11 km and about 15 min (11.5 / 15). All old figures were confirmed within rounding.
 * Straight-line distances to neighbouring districts (including KAFD) are computed from the district centres in riyadh-areas.ts (haversine) and labelled as straight lines.
 * Metro: Al Mohammadiyah has no station of its own. The independent site riyadhmetro.org lists At Takhassussi (Line 2 Red, where Takhassussi Road meets King Abdullah Road, 24.7234/46.6546),
 * KACST (Line 2 Red, on King Abdullah Road next to the King Abdulaziz City for Science and Technology, 24.7202/46.6469) and King Fahad District 2 (Line 1 Blue, beneath King Fahad Road,
 * 24.7367/46.6634). None of the three pages mentions Al Mohammadiyah, and the official rpt.sa site could not be opened (403), so the page names the three as candidates, says the best one
 * depends on the exact address, and gives no station distances, walking times, fares, hours, entrances or train frequencies.
 * NOT verified / left out: the exact district boundary, any named compound, clinic, mall or restaurant, and the road names King Fahd Road and Prince Turki bin Abdulaziz Al Awwal Road.
 * Gated community access is never promised. No partnership with Riyadh Metro, KAFD, PIF or any business; no corporate accounts, fares, ratings, reviews, vehicle specifications, child seats,
 * free waiting, unlimited stops, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const ALMOHAMMADIYAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Mohammadiyah, Riyadh. The trip is [for example a villa pickup, a gated compound pickup, a family airport transfer, an office ride to KAFD or a metro station transfer], my pickup point is [villa or building, compound name and gate], my destination is [destination], my date and time are [date and time], and there are [number] passengers and [number] bags. Please confirm availability and the fare.";

export function alMohammadiyahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-mohammadiyah");
  if (!me) throw new Error("Al Mohammadiyah is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "Al Mohammadiyah: villas, apartments and compounds in north-central Riyadh",
    kind: "text",
    paragraphs: [
      "Al Mohammadiyah is a residential district in north-central Riyadh, south of the King Abdullah Financial District (KAFD) and close to Al Nakheel, Al Wurud and Olaya. It has villas, apartment buildings and residential compounds, with local shops, services and offices nearby.",
      "Most rides here start at a home: a family going to the airport, a commuter heading to KAFD or Olaya, or a resident going to a clinic or a shopping trip. Many addresses are villas on quiet streets or units inside a gated compound, so the exact pickup details matter more than in a busy commercial area.",
      "KAFD and Olaya are separate districts. Their towers, offices and hotels are in KAFD and Olaya, not in Al Mohammadiyah, so tell us the name of the building you are going to.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Mohammadiyah",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Mohammadiyah to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Mohammadiyah to Riyadh Airport (RUH)", "about 32 km", "about 23 to 25 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Mohammadiyah to Olaya", "about 9 km", "about 10 min"], href: pairHref("olaya") },
      { cells: ["Al Mohammadiyah to KAFD", "about 5 km", "about 8 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Mohammadiyah to Ad Dirah", "about 16 km", "about 15 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Mohammadiyah to Diriyah", "about 11 km", "about 15 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, road access, the time of day and any stops change the time, so they are not a promised journey time.",
  };

  const villas: Section = {
    id: "villas",
    h2: "Villa and compound pickups",
    kind: "items",
    intro: "Access to a villa, a compound or a gated street depends on the property. A taxi booking does not give entry to a gated community, and we cannot promise access to private roads, compound parking or restricted entrances. Where access is controlled, confirm the pickup arrangement with your host or the property management.",
    items: [
      { title: "Compound or community name", text: "The name, so the driver goes to the right place." },
      { title: "Villa or building number", text: "And the street, plus a nearby landmark if it helps." },
      { title: "Gate number", text: "Where the compound has more than one gate, say which one you will use." },
      { title: "A meeting point", text: "If the driver cannot enter, agree a point outside the gate or on a nearby road that the car can reach." },
      { title: "Host or reception contact", text: "A phone number the driver can call if the gate needs to be opened or the meeting point changes." },
    ],
  };

  const family: Section = {
    id: "family",
    h2: "Family and group journeys",
    kind: "items",
    items: [
      { title: "Family outings and shopping", text: "A private ride from your door and back, with the return pickup arranged in the same request." },
      { title: "Airport journeys with luggage", text: "Tell us how many passengers and bags there are, so we confirm a vehicle that suits them." },
      { title: "Scheduled return pickups", text: "Ask for a return at a time you choose. Waiting is agreed separately, and we do not promise free waiting time." },
      { title: "Vehicle choice", text: "The vehicle is chosen for each booking from your passenger and luggage count and confirmed with you before you commit." },
    ],
  };

  const office: Section = {
    id: "office",
    h2: "Rides to KAFD and offices",
    kind: "items",
    intro: "KAFD is about 5 km from Al Mohammadiyah by road. It is a separate district with controlled tower entrances.",
    items: [
      { title: "Office commutes", text: "A private pickup from your door at an agreed time." },
      { title: "Meetings", text: "Tell us the tower name and the entrance. KAFD has many buildings, so the exact one avoids a wrong drop-off." },
      { title: "Return journeys", text: "Ask for the return in the same request, with a time window." },
      { title: "Access is controlled", text: "We do not promise access to towers, visitor entrances or private car parks. We agree a meeting point you can reach, and Gulf Elite has no partnership with KAFD." },
    ],
  };

  const olaya: Section = {
    id: "olaya",
    h2: "Rides to Olaya and nearby districts",
    kind: "items",
    intro: "Olaya is a separate district, about 9 km from Al Mohammadiyah by road.",
    items: [
      { title: "Offices and meetings", text: "Name the tower or building you are going to, because Olaya has many." },
      { title: "Hotels, shopping and dining", text: "A private ride there and back, with a return pickup if you want one." },
      { title: "Other nearby districts", text: "Al Nakheel, Al Wurud, Al Ghadir and Al Aqiq are close. See the list below for straight-line distances." },
    ],
  };

  const metro: Section = {
    id: "metro",
    h2: "Riyadh Metro: Al Mohammadiyah has no station of its own",
    kind: "items",
    intro: "An independent Riyadh Metro information site lists three nearby stations that residents may consider. We could not check this against the official operator, and none of the sources places Al Mohammadiyah's boundary against them, so the best station depends on your exact address. Check the official Riyadh Metro information for current stations and services.",
    items: [
      { title: "At Takhassussi (Line 2, Red)", text: "Listed where Takhassussi Road meets King Abdullah Road." },
      { title: "KACST (Line 2, Red)", text: "Listed on King Abdullah Road, next to the King Abdulaziz City for Science and Technology." },
      { title: "King Fahad District 2 (Line 1, Blue)", text: "Listed beneath King Fahad Road, where the district meets Olaya." },
      { title: "How a taxi helps", text: "Send your exact address and we suggest a suitable station drop-off. A private ride also suits luggage, a group, a fixed pickup time or an address the metro does not reach." },
      { title: "What we do not publish", text: "We do not publish walking distances, fares, hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Al Mohammadiyah and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 32 km from Al Mohammadiyah by road. A transfer can run in either direction, from a villa, a compound or an apartment.",
    items: [
      { title: "How long it takes", text: "In light traffic roughly 23 to 25 minutes. Peak hours and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and your villa, compound or building address." },
      { title: "Arriving in Al Mohammadiyah", text: "For an arrival transfer, tell us your landing time and the address you are going to, with the gate or meeting point if it is a compound." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring or a fixed waiting time. Airport pickup points follow the airport's own rules." },
    ],
  };

  const pickup: Section = {
    id: "pickup",
    h2: "Pickup and drop-off in Al Mohammadiyah",
    kind: "items",
    intro: "Gated entrances, private roads and parking arrangements can change where the driver can meet you, so the exact point is agreed for each request.",
    items: [
      { title: "Street address", text: "The street, the villa or apartment number and a nearby landmark." },
      { title: "Compound name and gate", text: "If you live in a compound, the name and the gate you will use." },
      { title: "Your meeting point", text: "The entrance or a point on a nearby road that the car can reach." },
      { title: "Your destination", text: "The building and entrance you are going to." },
      { title: "Passengers and luggage", text: "How many people, and how many bags." },
      { title: "A return time", text: "When you want to be collected again, if you need a return." },
    ],
  };

  const prebook: Section = {
    id: "prebook",
    h2: "Why book in advance",
    kind: "items",
    items: [
      { title: "Compound access", text: "Time to arrange the gate and the meeting point with your host or property management." },
      { title: "The exact pickup", text: "The villa or building number is agreed before the driver sets out." },
      { title: "The fare before you commit", text: "You confirm the vehicle, driver and fare before the booking is final." },
      { title: "The right vehicle", text: "We choose a vehicle that suits your passengers and bags for each booking." },
      { title: "Flights and appointments", text: "A planned pickup time works backwards from your flight or your meeting." },
      { title: "A planned return", text: "Arranging the return in the same request is easier than finding a car later." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Al Mohammadiyah on the map",
    kind: "map",
    intro: "See where Al Mohammadiyah is in Riyadh, and open the metro stations below in Google Maps to check the roads and entrances before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Al Mohammadiyah, Riyadh",
    places: [
      { name: "At Takhassussi Metro Station", query: "At Takhassussi Metro Station, Riyadh", note: "Line 2 (Red)" },
      { name: "KACST Metro Station", query: "KACST Metro Station, Riyadh", note: "Line 2 (Red)" },
      { name: "King Fahad District 2 Metro Station", query: "King Fahad District 2 Metro Station, Riyadh", note: "Line 1 (Blue)" },
    ],
  };

  const near = ["al-nakheel", "king-abdullah-financial-district", "al-ghadir", "al-wurud", "al-aqiq"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Mohammadiyah",
    kind: "links",
    intro: "These districts are close to Al Mohammadiyah but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 9 km by road" },
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 11 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "The trip", text: "A villa or compound pickup, a family airport transfer, an office ride to KAFD or a metro station transfer." },
      { title: "Pickup and destination", text: "Your address, compound name and gate if relevant, and where you are going." },
      { title: "Date, time and group", text: "When you want to travel, and how many passengers and bags." },
      { title: "A return time", text: "If you need a pickup afterwards." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Al Mohammadiyah",
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
    h2: "Al Mohammadiyah taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Mohammadiyah?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can a taxi collect me from a gated villa or compound?", a: "We can plan a pickup there, but a booking does not give entry to a gated community, and we cannot promise access to private roads or parking. Confirm the arrangement with your host or the property management, or agree a meeting point outside the gate." },
      { q: "What details should I provide for a compound pickup?", a: "The compound name, your villa or building number, the street, the gate you will use, a nearby landmark and a phone number the driver can call." },
      { q: "How far is Al Mohammadiyah from Riyadh Airport?", a: "About 32 km by road. In light traffic the drive takes roughly 23 to 25 minutes, and busy times add time." },
      { q: "Can I book a private ride to KAFD?", a: "Yes. KAFD is about 5 km by road, roughly 8 minutes in light traffic. Name the tower and the entrance. We cannot promise access to towers or private car parks." },
      { q: "Can I arrange a taxi to Olaya?", a: "Yes. Olaya is about 9 km by road, roughly 10 minutes in light traffic. Name the tower or building you are going to." },
      { q: "Does Al Mohammadiyah have a Metro station?", a: "Not by itself. An independent metro information site lists nearby stations on the Red and Blue lines. Check the official Riyadh Metro information for current services." },
      { q: "Which nearby Metro station can I use?", a: "That site lists At Takhassussi and KACST on Line 2 (Red) and King Fahad District 2 on Line 1 (Blue). The best one depends on your exact address, so send it and we suggest a drop-off." },
      { q: "Can I book a family or group ride?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "Can I arrange a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  return {
    title: "Al Mohammadiyah Taxi Service Riyadh | Villa and Airport",
    description: "Book a private taxi in Al Mohammadiyah, Riyadh for villa and compound pickups, family rides, KAFD trips and airport transfers. Fare confirmed first.",
    h1: "Al Mohammadiyah Taxi Service in Riyadh",
    lead: "Private rides from your villa, compound or apartment in Al Mohammadiyah for family trips, KAFD and Olaya journeys and airport transfers, with your meeting point and gate agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Mohammadiyah, a residential district of villas, apartments and compounds in north-central Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from homes and compounds, family and group journeys, office rides to KAFD (about 5 km by road) and Olaya, and airport transfers to King Khalid International Airport (RUH), about 32 km by road. A booking does not give entry to a gated community, so the gate and meeting point are agreed with you and your host for each request. Al Mohammadiyah has no metro station of its own, and a taxi can connect you to a nearby station. Send your pickup address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 32 km by road" },
      { label: "KAFD", value: "about 5 km by road" },
      { label: "Olaya", value: "about 9 km by road" },
      { label: "Area type", value: "villas, apartments and compounds" },
    ],
    sections: addLinks(addImages([about, journeys, villas, family, office, olaya, metro, airport, pickup, prebook, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name), ctx, "al-mohammadiyah"),
    whatsappMessage: ALMOHAMMADIYAH_WHATSAPP_MESSAGE,
  };
}
