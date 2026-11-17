import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Malaz Taxi Service: the hand-written landing page for Al Malaz, an older planned residential district in central-eastern Riyadh (see district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Al Malaz centre in riyadh-areas.ts and the other centres):
 * RUH about 39 km and about 28 to 30 min (38.7 km / 28 min); Olaya about 7 km and about 8 to 10 min (7.2 km / 8 min); KAFD about 19 km and about 19 to 20 min (19.3 / 19);
 * Ad Dirah about 5.5 km and about 7 min (5.5 / 7); Diriyah about 23 km and about 20 to 25 min (22.8 / 23). The old page figures (39, 7.5, 20, 5.4, 24) were close; Olaya, KAFD,
 * Ad Dirah and Diriyah are updated to the rechecked values. Straight-line distances to neighbouring districts are computed from the district centres (haversine).
 * Sources: Riyadh.Travel (older planned district; King Abdullah Park with lawns, play areas and an evening musical fountain, "check whether the fountain is operating before
 * you visit", admission "check current admission"; the pages say their own details are not verified by their editors). OpenStreetMap (Nominatim) places King Abdullah Park, the
 * Prince Faisal bin Fahd Sports City stadium on Salah Al-Din Al-Ayyubi Road, and King Abdulaziz University Hospital in Al Malaz. The independent site riyadhmetro.org lists Al Malaz
 * station on Line 3 (Orange), between Railway and Jarir District, with no interchange; the official rpt.sa site returned 403, so the line and opening status are described only as
 * "listed" and people are told to check the official information.
 * NOT verified / left out: Riyadh Zoo (current status and location could not be confirmed, so it is not named), Omar bin Abdulaziz Road and Jarir Street (not confirmed), park hours,
 * admission, entrances and parking, stadium event schedules and any access or parking. No partnership with the park, the stadium or Riyadh Metro; no fares, ratings, reviews,
 * vehicle specifications, child seats, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const ALMALAZ_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Malaz, Riyadh. The trip is [for example a home pickup, King Abdullah Park, the stadium or an airport transfer], my pickup point is [address or landmark], my destination is [destination], my date and time are [date and time], and there are [number] passengers. Please confirm availability and the fare.";

export function alMalazRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-malaz");
  if (!me) throw new Error("Al Malaz is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "Al Malaz: an older residential district in central-eastern Riyadh",
    kind: "text",
    paragraphs: [
      "Al Malaz is one of Riyadh's older planned districts, developed in the mid-20th century in the central-eastern part of the city. Today it is a lived-in area of apartment buildings, schools, clinics, local shops and everyday restaurants, with large green spaces including King Abdullah Park.",
      "Transport here is mostly about everyday life rather than business or tourism. People need a car from their own street to the shops, a school run, a clinic, the park, a match, or the airport. Streets are busiest at school and work hours, and on park and event evenings.",
      "Because the district is dense and busy, the pickup point matters. Give the exact building or the main road you can reach easily, and we agree the meeting point with you for each request.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Malaz",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Malaz to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Malaz to Riyadh Airport (RUH)", "about 39 km", "about 28 to 30 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Malaz to Olaya", "about 7 km", "about 8 to 10 min"], href: pairHref("olaya") },
      { cells: ["Al Malaz to KAFD", "about 19 km", "about 19 to 20 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Malaz to Ad Dirah", "about 5.5 km", "about 7 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Malaz to Diriyah", "about 23 km", "about 20 to 25 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, road access, stops and your exact pickup point change the time, so they are not a promised journey time.",
  };

  const park: Section = {
    id: "park",
    h2: "Rides to King Abdullah Park",
    kind: "items",
    intro: "King Abdullah Park is the best-known park in Al Malaz, with open lawns, children's play areas and a musical fountain that draws crowds in the evening. We do not publish opening hours, admission details or fountain times, because they change. Check the current information before you go, and check whether the fountain is operating.",
    items: [
      { title: "Family outings", text: "A private ride from your home to the park and back, with the number of adults, children and bags confirmed in advance." },
      { title: "Share the entrance", text: "Tell us the entrance or the road where you want to be dropped, and where you want to be collected. We cannot promise access to a particular internal road or car park." },
      { title: "Evening pickups", text: "Evenings are the busiest time, so a meeting point on a quieter nearby road can be easier than the main gate. Agree it before you go." },
      { title: "Plan the return", text: "Ask for the return pickup in the same request, with a time window. Finding a car as the crowd leaves is much harder than arranging it earlier." },
    ],
  };

  const sports: Section = {
    id: "sports",
    h2: "Stadium and event-day rides",
    kind: "items",
    intro: "The Prince Faisal bin Fahd Sports City stadium is in Al Malaz, on Salah Al-Din Al-Ayyubi Road according to OpenStreetMap. We do not publish event schedules, ticketing or access details, and Gulf Elite has no partnership with the stadium or any event.",
    items: [
      { title: "Before the event", text: "Ask for a drop-off point you can reach. Roads close to the venue can be busy or restricted, so we agree a point with you and do not promise access to a particular gate or road." },
      { title: "After the event", text: "Everyone leaves at the same time. A pickup point a short walk away from the crowd is usually quicker than the entrance. Arrange the time and the place in advance." },
      { title: "Groups", text: "Tell us how many passengers are travelling and whether you are all leaving from the same place. We confirm a suitable vehicle for each booking." },
      { title: "Traffic planning", text: "Match nights and large events add traffic on the roads around Al Malaz. Allow extra time and keep your phone nearby." },
    ],
  };

  const everyday: Section = {
    id: "everyday",
    h2: "Family and everyday journeys in Al Malaz",
    kind: "items",
    items: [
      { title: "Shopping and restaurants", text: "Rides from home to the local shopping streets and restaurants, with a return pickup if you want one." },
      { title: "Clinic and hospital appointments", text: "Al Malaz has clinics and hospitals, including King Abdulaziz University Hospital. Give the building and the entrance you need. A ride does not include any appointment or hospital arrangement." },
      { title: "School and education journeys", text: "A ride to or from a school or institute at a time you agree. School hours are busy, so give the exact entrance and allow extra time." },
      { title: "Home and apartment pickups", text: "Give the building name or number and the street, and a landmark if it helps. A pickup on a main road is often easier than a small side street." },
      { title: "Scheduled returns", text: "If you need a car to take you home after an appointment or an outing, ask for it in the same request. We confirm availability for each request." },
    ],
  };

  const pickup: Section = {
    id: "pickup",
    h2: "Pickup and drop-off in Al Malaz",
    kind: "items",
    intro: "Busy streets, school periods, stadium events and park evenings can change the best meeting point. Not every street is equally easy to reach, so the exact point is agreed for each request.",
    items: [
      { title: "Your exact address", text: "The building name or number and the street. A nearby landmark helps." },
      { title: "A main-road option", text: "If your street is narrow or crowded, suggest a point on a nearby main road." },
      { title: "The destination entrance", text: "The gate, building or entrance you are going to, not only the district name." },
      { title: "Passengers and luggage", text: "How many people, and how many bags." },
      { title: "A return time", text: "When you want to be collected again, if you need a return." },
      { title: "We do not promise kerbside access", text: "Where parking or stopping is restricted, we agree a nearby point instead. A driver waits only where that is confirmed for your booking." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Al Malaz and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 39 km from Al Malaz by road. A transfer can run in either direction, and early booking helps for family trips with luggage.",
    items: [
      { title: "How long it takes", text: "In light traffic roughly 28 to 30 minutes. Peak hours and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and your address in Al Malaz." },
      { title: "Arriving in Al Malaz", text: "For an arrival transfer, tell us your landing time and the address you are going to. We confirm the meeting point with you." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring or a fixed waiting time. Airport pickup points follow the airport's own rules." },
    ],
  };

  const metro: Section = {
    id: "metro",
    h2: "Riyadh Metro and your taxi",
    kind: "items",
    items: [
      { title: "Al Malaz station", text: "An independent Riyadh Metro information site lists Al Malaz station on Line 3 (Orange), between Railway and Jarir District, with no interchange to another line. We could not check this against the official operator, so check the official Riyadh Metro information for the current station, services and hours." },
      { title: "When a private taxi helps", text: "A taxi can take you from your door to a station, or from a station to an address the metro does not reach. It also suits luggage, a family, an agreed pickup time and the airport. It is a separate service, and Gulf Elite Transport is not part of the metro and has no partnership with it." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Al Malaz on the map",
    kind: "map",
    intro: "See where Al Malaz is in Riyadh, and open the places below in Google Maps to check the roads and entrances before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Al Malaz, Riyadh",
    places: [
      { name: "King Abdullah Park", query: "King Abdullah Park, Al Malaz, Riyadh", note: "Park" },
      { name: "Prince Faisal bin Fahd Stadium", query: "Prince Faisal bin Fahd Stadium, Riyadh", note: "Stadium" },
      { name: "King Abdulaziz University Hospital", query: "King Abdulaziz University Hospital, Riyadh", note: "Hospital" },
      { name: "Al Malaz Metro Station", query: "Al Malaz Metro Station, Riyadh", note: "Metro station" },
    ],
  };

  const near = ["al-murabba", "ad-dirah", "al-rabwah", "al-sulaimaniyah", "olaya", "al-naseem"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Malaz",
    kind: "links",
    intro: "These districts are close to Al Malaz but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 19 km by road" },
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 23 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "The trip", text: "A home pickup, King Abdullah Park, the stadium, an appointment or the airport." },
      { title: "Pickup and destination", text: "Your address or landmark in Al Malaz, and where you are going." },
      { title: "Date, time and group", text: "When you want to travel, and how many passengers and bags." },
      { title: "A return time", text: "If you need a pickup afterwards." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Al Malaz",
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
    h2: "Al Malaz taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Malaz?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a private taxi from my home in Al Malaz?", a: "Yes. Give the building and street, plus a landmark if it helps. If your street is narrow or busy, we may suggest a nearby main road as the meeting point." },
      { q: "Can I arrange a family or group ride?", a: "Yes. Tell us how many adults, children and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "How far is Al Malaz from Riyadh Airport?", a: "About 39 km by road. In light traffic the drive takes roughly 28 to 30 minutes, and busy times add time." },
      { q: "Can I book a taxi to King Abdullah Park?", a: "Yes. Tell us the entrance or road you want and when you want to be picked up again. Check the park's current information, and whether the fountain is operating, before you go." },
      { q: "Can I arrange a return pickup after a park visit?", a: "Yes, and we suggest it. Ask for the return in the same request. Evenings are busy, so agree a clear meeting point in advance." },
      { q: "Can I book a ride to Prince Faisal bin Fahd Stadium?", a: "Yes. We can agree a drop-off and a return pickup point, but we cannot promise access to a particular gate, road or parking area. Roads near events can be busy." },
      { q: "Is there a Riyadh Metro station in Al Malaz?", a: "An independent metro information site lists Al Malaz station on Line 3 (Orange). Check the official Riyadh Metro information for current services and hours." },
      { q: "Can I book an airport pickup to Al Malaz?", a: "Yes. Send your flight number, landing time, terminal if you know it, passengers, bags and your Al Malaz address. We confirm the meeting point with you, and we do not promise flight tracking." },
      { q: "Is Al Malaz close to Ad Dirah and Olaya?", a: "Ad Dirah is about 5.5 km by road (about 7 minutes in light traffic) and Olaya about 7 km (about 8 to 10 minutes)." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
      { q: "Are fares fixed or quoted for each journey?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
    ],
  };

  return {
    title: "Al Malaz Taxi Service Riyadh | Family and Airport Rides",
    description: "Book a private taxi in Al Malaz, Riyadh for family rides, King Abdullah Park, event nights and airport transfers. Fare confirmed before you commit.",
    h1: "Al Malaz Taxi Service in Riyadh",
    lead: "Private rides from your door in Al Malaz for family trips, King Abdullah Park, event nights and airport transfers, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Malaz, an older planned residential district in central-eastern Riyadh, Gulf Elite Transport takes bookings for private taxi rides from homes and apartments, family and group trips, King Abdullah Park and stadium journeys with planned return pickups, and airport transfers to King Khalid International Airport (RUH), about 39 km by road. Streets are busy at school hours and on park and event evenings, so the meeting point is agreed for each request. Send your pickup address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 39 km by road" },
      { label: "Olaya", value: "about 7 km by road" },
      { label: "Ad Dirah", value: "about 5.5 km by road" },
      { label: "Area type", value: "residential, parks and sport" },
    ],
    sections: addLinks(addImages([about, journeys, park, sports, everyday, pickup, airport, metro, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name), ctx, "al-malaz"),
    whatsappMessage: ALMALAZ_WHATSAPP_MESSAGE,
  };
}
