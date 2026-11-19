import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Malqa Taxi Service: the hand-written landing page for Al Malqa, a newer residential and lifestyle district in north Riyadh (see district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Al Malqa centre in riyadh-areas.ts and the other centres):
 * RUH about 26 km and about 18 to 20 min (26.4 km / 18 min; the old page said 27 km / 20 min); Olaya about 20 km and about 18 to 20 min (19.6 / 18; old 20 / 20);
 * KAFD about 13 km and about 13 to 15 min (12.7 / 13; the old page said 16 km / 15 min, corrected); Ad Dirah about 27 km and about 22 to 25 min (26.5 / 22; the old page said 30 km / 25 min, corrected);
 * Diriyah about 16 km and about 15 to 20 min (16.1 / 16; the old page said 15 km / 15 min); Hittin about 8 km and about 10 min (8.4 / 10). Straight-line distances to neighbouring districts are
 * computed from the district centres (haversine) and labelled as straight lines.
 * Sources: Riyadh.Travel (a newer northern residential district known for speciality coffee shops, casual restaurants and evening atmosphere; "few sights as such"; "Nearest Metro stations: None close, use a taxi";
 * the page says its details are not verified by its editors). OpenStreetMap (Nominatim) places Al Makan Mall at 24.7906/46.6118 labelled Al Malqa, about 4 km by road from the district centre; no address,
 * hours, entrances or parking were checked, so none are published. The independent site riyadhmetro.org lists Dr Sulaiman Al Habib on Line 1 (Blue) as an elevated stop on King Fahad Road (24.8116/46.6265,
 * between SAB Bank and KAFD, opened 2024-2025), naming An Nakheel, Ar Rahmaniyah and Al Aqiq as its districts and not mentioning Al Malqa; the official rpt.sa site could not be opened (403), so the page names
 * it as a station to consider, not as a station in Al Malqa, and gives no distances, walking times, fares or hours.
 * NOT verified / left out: Al Malqa Park (location not confirmed), named cafes and restaurants, Anas bin Malik Road (not found), the exact district boundary, and Al Makan Mall's address, hours and parking.
 * No partnership with any mall, cafe, KAFD or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const ALMALQA_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Malqa, Riyadh. The trip is [for example a home pickup, Al Makan Mall, a cafe or restaurant visit, a family trip or an airport transfer], my pickup point is [street, building and landmark], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alMalqaRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-malqa");
  if (!me) throw new Error("Al Malqa is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "Al Malqa: a newer residential district in north Riyadh",
    kind: "text",
    paragraphs: [
      "Al Malqa is one of the newer residential districts in the north of Riyadh. It is known for its speciality coffee shops, casual restaurants and a lively evening atmosphere, and it is mostly a place where people live and meet rather than a sightseeing district.",
      "Most rides here are everyday ones: a family going out for dinner, a short trip to a mall, a resident heading to the airport or to KAFD, or a late return home. Many streets are new and similar-looking, and evenings can be busy, so the exact street and building matter.",
      "Al Malqa sits beside Al Sahafah, Hittin and Al Aqiq. These are separate districts, so name the place you are going to rather than only the area.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Malqa",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Malqa to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Malqa to Riyadh Airport (RUH)", "about 26 km", "about 18 to 20 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Malqa to KAFD", "about 13 km", "about 13 to 15 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Malqa to Olaya", "about 20 km", "about 18 to 20 min"], href: pairHref("olaya") },
      { cells: ["Al Malqa to Diriyah", "about 16 km", "about 15 to 20 min"], href: pairHref("diriyah") },
      { cells: ["Al Malqa to Hittin", "about 8 km", "about 10 min"], href: pairHref("hittin") },
      { cells: ["Al Malqa to Ad Dirah", "about 27 km", "about 22 to 25 min"], href: pairHref("ad-dirah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, road access, the time of day and any stops change the time, so they are not a promised journey time.",
  };

  const residential: Section = {
    id: "residential",
    h2: "Home, villa and apartment pickups",
    kind: "items",
    intro: "Many Al Malqa rides start at a door. A few details make the pickup quick.",
    items: [
      { title: "Street and building", text: "The street, the villa or building number and a nearby landmark, because many new streets look alike." },
      { title: "Gate or compound", text: "If you live in a compound or behind a gate, the name and the gate you will use. A booking does not give entry to a gated community, so agree a meeting point outside it if needed." },
      { title: "A reachable number", text: "A phone number you will answer, so the driver can find you." },
      { title: "Passengers and bags", text: "How many people and how many bags, so the vehicle suits them." },
      { title: "No promised private access", text: "We do not promise entry to private roads or parking. We agree an accessible meeting point with you for each request." },
    ],
  };

  const dining: Section = {
    id: "dining",
    h2: "Shopping, cafes and family outings",
    kind: "items",
    intro: "Al Malqa is known for cafes and casual restaurants, and OpenStreetMap places Al Makan Mall in Al Malqa, about 4 km from the district centre by road. We do not publish opening hours, parking conditions or entrance details for any venue. Check the venue's own information before you go.",
    items: [
      { title: "Al Makan Mall", text: "Say \"Al Makan Mall\" and the entrance you want, or agree a point the car can reach. We cannot promise a particular entrance, a restricted lane or a waiting position, and parking is not included in the fare." },
      { title: "Cafes and restaurants", text: "Give the name of the place and the street, because Al Malqa has many. Evenings are the busiest time." },
      { title: "Evening return rides", text: "Ask for the return in the same request, with a time window. Finding a car as everyone leaves at once is much harder than arranging it in advance." },
      { title: "A contact number", text: "A number you will answer helps the driver find you at a busy entrance or on a crowded street." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Al Malqa and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 26 km from Al Malqa by road. A transfer can run in either direction, and booking ahead helps for early flights and late arrivals.",
    items: [
      { title: "How long it takes", text: "In light traffic roughly 18 to 20 minutes. Peak hours and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and your address in Al Malqa." },
      { title: "Arriving in Al Malqa", text: "For an arrival transfer, tell us your landing time and the address you are going to. We confirm the meeting point with you." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring, meet-and-greet or a fixed waiting time. Airport pickup points follow the airport's own rules." },
    ],
  };

  const business: Section = {
    id: "business",
    h2: "Business and northern Riyadh journeys",
    kind: "items",
    items: [
      { title: "KAFD", text: "KAFD is about 13 km by road, roughly 13 to 15 minutes in light traffic. Name the tower and the entrance. Access is controlled, so we agree a meeting point and do not promise access to towers or private car parks." },
      { title: "Olaya", text: "Olaya is about 20 km by road, roughly 18 to 20 minutes. Name the tower or building you are going to." },
      { title: "Hittin, Al Aqiq and Diriyah", text: "Hittin is about 8 km by road and Diriyah about 16 km. Give the place you are going to, because these are separate districts." },
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
    h2: "Riyadh Metro and Al Malqa",
    kind: "items",
    intro: "Riyadh.Travel lists no metro station close to Al Malqa and suggests a taxi. Al Malqa does not have a confirmed station of its own.",
    items: [
      { title: "A station outside the district", text: "An independent Riyadh Metro information site lists Dr Sulaiman Al Habib on Line 1 (Blue), an elevated stop on King Fahad Road, which it places in other districts. It is a station you might consider, not a station in Al Malqa. Which station is best depends on your exact address." },
      { title: "How a taxi helps", text: "A private ride can take you from your door to a station, or from a station to an address the metro does not reach. Send your exact address and we suggest a drop-off." },
      { title: "What we do not publish", text: "We could not check this against the official operator. We do not publish walking distances, fares, hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it." },
    ],
  };

  const pickup: Section = {
    id: "pickup",
    h2: "Pickup and drop-off in Al Malqa",
    kind: "items",
    intro: "New streets, gated compounds and busy evening entrances can change where the driver can meet you, so the exact point is agreed for each request.",
    items: [
      { title: "Street address", text: "The street, the building number and a nearby landmark." },
      { title: "Compound and gate", text: "The compound name and the gate, if relevant." },
      { title: "Your meeting point", text: "The entrance or a point on a nearby road that the car can reach." },
      { title: "Your destination", text: "The building and entrance, or the mall, cafe or restaurant name." },
      { title: "Passengers and luggage", text: "How many people, and how many bags." },
      { title: "A return time", text: "When you want to be collected again, if you need a return." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Al Malqa on the map",
    kind: "map",
    intro: "See where Al Malqa is in Riyadh, and open the places below in Google Maps to check the roads and entrances before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Al Malqa, Riyadh",
    places: [
      { name: "Al Makan Mall", query: "Al Makan Mall, Riyadh", note: "Shopping" },
      { name: "Dr Sulaiman Al Habib Metro Station", query: "Dr Sulaiman Al Habib Metro Station, Riyadh", note: "Line 1 (Blue), outside the district" },
    ],
  };

  const near = ["al-sahafah", "al-yasmin", "al-aqiq", "hittin", "al-narjis"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Malqa",
    kind: "links",
    intro: "These districts are close to Al Malqa but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 13 km by road" },
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 16 km by road" },
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 20 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "The trip", text: "A home pickup, Al Makan Mall, a cafe or restaurant visit, a family trip or the airport." },
      { title: "Pickup and destination", text: "Your street, building and gate, and where you are going, with the entrance." },
      { title: "Date, time and group", text: "When you want to travel, and how many passengers and bags." },
      { title: "A return time", text: "If you need a pickup afterwards, for example after dinner or shopping." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Al Malqa",
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
    h2: "Al Malqa taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Malqa?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a private taxi from my home in Al Malqa?", a: "Yes. Give the street, the building number, the gate if there is one, and a landmark. A booking does not give entry to a gated community, so we may agree a meeting point outside the gate." },
      { q: "How far is Al Malqa from Riyadh Airport?", a: "About 26 km by road. In light traffic the drive takes roughly 18 to 20 minutes, and busy times add time." },
      { q: "Can I book a taxi from Al Malqa to KAFD?", a: "Yes. KAFD is about 13 km by road, roughly 13 to 15 minutes in light traffic. Name the tower and the entrance." },
      { q: "Can I book a taxi to Al Makan Mall?", a: "Yes. Tell us the entrance you want and a return time window. We cannot promise a particular entrance or waiting spot, and parking is not included in the fare. Check the mall's own information for hours and parking." },
      { q: "Can I book a family taxi in Al Malqa?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "Can I book a taxi from Al Malqa to Hittin?", a: "Yes. Hittin is a separate district about 8 km away by road, roughly 10 minutes in light traffic. Name the place you are going to." },
      { q: "Can I book a return taxi from Al Malqa?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "Does Al Malqa have a metro station?", a: "Not a confirmed one of its own. Riyadh.Travel lists none close. An independent metro site lists Dr Sulaiman Al Habib on Line 1 (Blue) in a neighbouring area. Check the official Riyadh Metro information." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Is Al Malqa the same as Al Sahafah or Hittin?", a: "No. They are neighbouring districts. Name the place you are going to when you book." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  return {
    title: "Al Malqa Taxi Service Riyadh | Home Pickups and Airport",
    description: "Book a private taxi in Al Malqa, Riyadh for home pickups, family outings, cafes, KAFD rides and airport transfers. Fare confirmed before you commit.",
    h1: "Al Malqa Taxi Service in Riyadh",
    lead: "Private rides from your home in Al Malqa for family outings, cafes and shopping, KAFD journeys and airport transfers, with your meeting point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Malqa, a newer residential district in north Riyadh known for cafes and restaurants, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and evening outings including Al Makan Mall, business rides to KAFD (about 13 km by road) and airport transfers to King Khalid International Airport (RUH), about 26 km by road. Al Malqa has no confirmed metro station of its own, and a taxi can connect you to one. Send your pickup address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 26 km by road" },
      { label: "KAFD", value: "about 13 km by road" },
      { label: "Hittin", value: "about 8 km by road" },
      { label: "Area type", value: "homes, cafes and dining" },
    ],
    sections: addLinks(addImages([about, journeys, residential, dining, airport, business, family, metro, pickup, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name, {
        about: { slot: "al-malqa-riyadh-taxi-service", alt: "A dark blue SUV parked on a paved street of sand-coloured villas and cafes while a man in a thobe greets a woman and a boy with a backpack", label: "Photo: al-malqa-riyadh-taxi-service", w: 1000, h: 558 },
        dining: { slot: "al-makan-mall-al-malqa-taxi-transfer", alt: "Two women and a man carrying shopping bags stand beside a brown sedan on a busy pavement outside a mall", label: "Photo: al-makan-mall-al-malqa-taxi-transfer", w: 1000, h: 558 },
        airport: { slot: "al-malqa-riyadh-airport-taxi-transfer", alt: "A man in a suit and a woman with a black suitcase beside a dark SUV with its door open at an airport terminal", label: "Photo: al-malqa-riyadh-airport-taxi-transfer", w: 1000, h: 558 },
        business: { slot: "al-malqa-riyadh-private-taxi-journey", alt: "The rear seat of a car where a man in a suit reads a tablet while a woman drives, with the Riyadh skyline through the window", label: "Photo: al-malqa-riyadh-private-taxi-journey", w: 1000, h: 558 },
        pickup: { slot: "al-malqa-riyadh-taxi-pickup-point", alt: "An older man and a woman step out of a white van beside a gate while a woman in uniform holds a suitcase", label: "Photo: al-malqa-riyadh-taxi-pickup-point", w: 1000, h: 558 },
      }), ctx, "al-malqa"),
    whatsappMessage: ALMALQA_WHATSAPP_MESSAGE,
  };
}
