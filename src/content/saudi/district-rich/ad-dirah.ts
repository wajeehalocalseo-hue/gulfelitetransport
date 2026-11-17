import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Ad Dirah Taxi Service: the hand-written landing page for Ad Dirah, the old centre of Riyadh (see district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Ad Dirah centre in riyadh-areas.ts and the other centres):
 * RUH about 44 km and about 35 to 40 min; Olaya about 9 km and about 10 min; KAFD about 20 km and about 20 min; Diriyah about 24 km and about 20 to 25 min.
 * Straight-line distances to neighbouring districts (Al Murabba 2.1, Al Badiah 3.7, Al Malaz 4.1, Al Uraija 5.8, Olaya 7.1 km) were rechecked from the district centres.
 * Visitor status of Masmak Fortress: the sources conflict (Riyadh.Travel lists it as a place to visit, the official Al Dirah site is reported to say it is not open) and
 * a search found only secondary sources that disagree on hours, so the page calls it a historic landmark and states nothing about admission, hours or prices.
 * The same rule applies to Qasr Al-Hukm, the squares, the mosque and the markets: no hours, fees or entry conditions. Only Al-Thumairi Gate could be placed on a
 * map (it is near the district centre); the other landmarks are opened through Google Maps search links, with no pins. Qasr Al-Hukm is named as the closest metro
 * interchange only as Riyadh.Travel's statement, and the page tells people to check official information. No partnership with RCRC, the Museums Commission or any
 * market or heritage body; no fares, ratings, reviews, vehicle specifications, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const ADDIRAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Ad Dirah, Old Riyadh. The landmark or market is [landmark or market], my meeting point is [meeting point], my destination is [destination], my date and time are [date and time], and I need a return pickup at [return time]. Please confirm availability and the fare.";

export function adDirahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "ad-dirah");
  if (!me) throw new Error("Ad Dirah is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "Ad Dirah and Old Riyadh",
    kind: "text",
    paragraphs: [
      "Ad Dirah, also written Al Dirah, is the historic core of central Riyadh. It is the old city, with traditional markets, historic streets and squares, and landmarks that tell the story of the capital. It is a very different place from the towers of Olaya and KAFD, with narrower, busier streets.",
      "The historic area around it, including the Qasr Al-Hukm district and its squares, is larger than the Ad Dirah neighbourhood on its own. Not every landmark below sits inside the exact boundary of Ad Dirah, so tell us the name of the place you are going to.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Ad Dirah",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Ad Dirah to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Ad Dirah to Riyadh Airport (RUH)", "about 44 km", "about 35 to 40 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Ad Dirah to Olaya", "about 9 km", "about 10 min"], href: pairHref("olaya") },
      { cells: ["Ad Dirah to KAFD", "about 20 km", "about 20 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Ad Dirah to Diriyah", "about 24 km", "about 20 to 25 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. The exact figure depends on your pickup point, the route and the time of day. They are not a promised journey time.",
  };

  const heritage: Section = {
    id: "heritage",
    h2: "Heritage landmarks in and around Ad Dirah",
    kind: "items",
    intro: "These are the places visitors name most often. We do not publish opening hours, ticket prices or entry conditions, because they change. Check current official information before you go.",
    items: [
      { title: "Masmak Fortress", text: "A historic fortress in the old centre. Visitor arrangements can change, and sources differ, so check the official visitor information before you plan a visit. A taxi booking does not include admission." },
      { title: "Qasr Al-Hukm and its squares", text: "The Qasr Al-Hukm area has restored historic squares and public spaces, including Justice Square, Safat Square, Imam Muhammad bin Saud Square and Masmak Square. It lies in the wider historic area around Ad Dirah." },
      { title: "Imam Turki bin Abdullah Mosque", text: "A historic mosque in the old city. It is a place of worship, so dress and behave accordingly. Ask us for the exact road you will be dropped on." },
      { title: "Historic gates", text: "Al-Thumairi Gate and Dakhnah Gate are part of the old city's story. Name the gate if it is your meeting point." },
    ],
  };

  const markets: Section = {
    id: "markets",
    h2: "Souq Al Zal and the traditional markets",
    kind: "items",
    intro: "Souq Al Zal is known for traditional goods such as carpets, incense, spices, antiques and traditional clothing. It is one of several market streets in the old centre.",
    items: [
      { title: "Say which market or street", text: "Name the market, the street or a shop you are going to. A broad word like \"souq\" can mean several places." },
      { title: "Evenings and weekends are busiest", text: "The streets fill with shoppers, so a pickup may need to be on a nearby road. Tell us how long you plan to shop, so we can plan the return." },
      { title: "Shopping with bags", text: "If you expect to carry purchases, tell us in advance so the vehicle suits your bags." },
    ],
  };

  const pickup: Section = {
    id: "pickup",
    h2: "Pickup and drop-off around the old centre",
    kind: "items",
    intro: "Roads around the old centre can be narrow and crowded, and some pedestrian areas may need a short walk from the drop-off point. Access and stopping rules vary by street, time and traffic controls, so the exact point is agreed for each request.",
    items: [
      { title: "Give the exact landmark", text: "The market, the street, the gate or the landmark you are going to, not only \"Ad Dirah\"." },
      { title: "Agree an accessible meeting point", text: "We agree a point the car can reach, such as a nearby road or a car park. We do not promise access to pedestrian-only streets, restricted roads, private compounds or market interiors." },
      { title: "Expect a short walk", text: "In some crowded areas you may walk the last part of the way. Tell us if anyone in your group needs a closer stop." },
      { title: "Share a reachable number", text: "A phone number you will answer makes meeting in a crowded area much easier." },
      { title: "We do not promise waiting at an entrance", text: "A driver can wait only where that is confirmed for your booking and the local rules allow it." },
    ],
  };

  const returnRide: Section = {
    id: "return",
    h2: "Planning your return pickup",
    kind: "items",
    items: [
      { title: "Agree it before you go in", text: "Visitors often leave at the same time as others. Arranging the return pickup point and time in advance is much easier than finding a car later." },
      { title: "Choose a clear point", text: "Pick a landmark or a road that is easy to find and reachable by car. We confirm the pickup point with you for each request." },
      { title: "Tell us if plans change", text: "Message us on WhatsApp and we adjust the pickup where availability allows." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Ad Dirah and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 44 km from Ad Dirah by road. A transfer can run in either direction.",
    items: [
      { title: "How long it takes", text: "In light traffic roughly 35 to 40 minutes. Peak hours and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and the hotel, street or landmark in Ad Dirah." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring or a fixed waiting time. Airport pickup points follow the airport's own rules, and we confirm the meeting point with you." },
    ],
  };

  const metro: Section = {
    id: "metro",
    h2: "Metro and public transport nearby",
    kind: "items",
    items: [
      { title: "Closest metro interchange", text: "Riyadh.Travel names Qasr Al-Hukm station as the closest metro interchange for the area. Check the official Riyadh Metro information for current services, hours and fares." },
      { title: "When a private taxi helps", text: "A private taxi suits luggage, shopping bags, a group, an agreed pickup time or a trip to a point the metro does not reach. It is a separate service, and Gulf Elite Transport is not part of the metro." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Ad Dirah on the map",
    kind: "map",
    intro: "See where Ad Dirah is in Riyadh, and open its landmarks in Google Maps to check the roads and entrances before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Ad Dirah, Old Riyadh",
    places: [
      { name: "Masmak Fortress", query: "Masmak Fortress, Riyadh", note: "Historic fortress" },
      { name: "Souq Al Zal", query: "Souq Al Zal, Riyadh", note: "Traditional market" },
      { name: "Qasr Al-Hukm", query: "Qasr Al-Hukm, Riyadh", note: "Historic district and squares" },
      { name: "Qasr Al-Hukm Metro Station", query: "Qasr Al-Hukm Metro Station, Riyadh", note: "Metro interchange" },
    ],
  };

  const near = ["al-murabba", "al-badiah", "al-malaz", "al-uraija", "olaya"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Ad Dirah",
    kind: "links",
    intro: "These districts are close to Ad Dirah but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 20 km by road" },
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 24 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "Landmark or market", text: "The place you are going to in Ad Dirah, and the meeting point you suggest." },
      { title: "Destination and return", text: "Where you are going afterwards, and the time you want the return pickup." },
      { title: "Date, time and group", text: "When you want to travel, and how many passengers and bags." },
      { title: "A reachable number", text: "So the driver can find you in a crowded area." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Ad Dirah",
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
    h2: "Ad Dirah taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi to Ad Dirah, Old Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your landmark or market, a meeting point, your destination, the date, the time and any return time. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can a car go right up to Masmak Fortress?", a: "Streets around the old centre can be busy and partly restricted, so the drop-off is often on a nearby road. We agree the point with you for each request." },
      { q: "Is Masmak Fortress open to visitors?", a: "Visitor arrangements change and sources differ, so we do not state opening hours or entry conditions. Check the current official visitor information. A taxi booking does not include admission." },
      { q: "Can I book a taxi to Souq Al Zal?", a: "Yes. Tell us the market or street you are going to, and when you want to be picked up again. The pickup may need to be on a nearby road." },
      { q: "Will I need to walk?", a: "Possibly. Some crowded or pedestrian areas need a short walk from the agreed drop-off point. Tell us if anyone needs a closer stop." },
      { q: "Can I arrange a return ride in advance?", a: "Yes, and we suggest it. Ask for the return in the same request. Availability is confirmed for each request." },
      { q: "Can the driver wait for me?", a: "Only where we confirm it for your booking and local rules allow it. We do not promise waiting at an entrance." },
      { q: "How far is Ad Dirah from Riyadh Airport?", a: "About 44 km by road. In light traffic the drive takes roughly 35 to 40 minutes, and busy times add time." },
      { q: "Can I travel from Ad Dirah to Olaya?", a: "Yes. Olaya is about 9 km by road, roughly 10 minutes in light traffic." },
      { q: "Is Ad Dirah the same as Diriyah?", a: "No. Ad Dirah is the old centre of Riyadh. Diriyah is a separate historic town on the north-western edge of the city, about 24 km away by road." },
      { q: "Is there a metro station near Ad Dirah?", a: "Riyadh.Travel names Qasr Al-Hukm station as the closest metro interchange. Check the official Riyadh Metro information for current services." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
      { q: "How is the fare confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
    ],
  };

  return {
    title: "Ad Dirah Taxi Service Riyadh | Old Riyadh Private Rides",
    description: "Book a private taxi to or from Ad Dirah, Old Riyadh for markets and heritage visits. Agree your meeting point and return. Fare confirmed first.",
    h1: "Ad Dirah Taxi Service in Riyadh",
    lead: "Private rides to and from Ad Dirah, the old centre of Riyadh, for traditional markets, heritage visits and airport transfers, with your meeting point and return pickup agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Ad Dirah, the historic centre of Riyadh, Gulf Elite Transport takes bookings for private taxi rides to the old markets, Souq Al Zal, Qasr Al-Hukm and the heritage area, planned return pickups and airport transfers to King Khalid International Airport (RUH), about 44 km by road. Streets in the old centre are busy and some areas need a short walk, so the meeting point is agreed for each request. A taxi booking does not include admission to any attraction. Send your landmark or market, meeting point, destination, date, time and return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 44 km by road" },
      { label: "Olaya", value: "about 9 km by road" },
      { label: "KAFD", value: "about 20 km by road" },
      { label: "Area type", value: "historic centre and markets" },
    ],
    sections: addLinks(addImages([about, journeys, heritage, markets, pickup, returnRide, airport, metro, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name), ctx, "ad-dirah"),
    whatsappMessage: ADDIRAH_WHATSAPP_MESSAGE,
  };
}