import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Murabba Taxi Service: the hand-written landing page for Al Murabba, the district around the King Abdulaziz Historical Center (see district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Al Murabba centre in riyadh-areas.ts and the other centres):
 * RUH about 42 km and about 30 to 35 min (centre 41.4 km / 31 min, National Museum point 42.1 km / 31 min); Olaya about 6 km and about 7 to 10 min;
 * KAFD about 18 km and about 18 to 20 min; Ad Dirah about 3 km and about 5 min; Diriyah about 22 km and about 20 to 25 min.
 * The old figures on the page (RUH 42, Olaya 6.2, KAFD 18, Ad Dirah 3.2, Diriyah 22) were all confirmed within rounding.
 * Straight-line distances to neighbouring districts are computed from the district centres in riyadh-areas.ts (haversine).
 * Sources: Riyadh.Travel (Al Murabba is centred on the King Abdulaziz Historical Center, which includes the National Museum and the restored Murabba Palace;
 * "National Museum (Blue/Green)" metro station; the page itself says its details are not verified by its editors). The National Museum station was cross-checked
 * against a Wikipedia-based source that lists it as an interchange of the Blue and Green lines beside the Historical Center, and sources conflict on how long it has been open.
 * NOT verified: the official Ministry of Culture visitor and FAQ pages returned 403 and the RCRC pages returned "Request Rejected", so the page publishes NO opening
 * hours, ticket or admission rules, parking or entrance details for the museum, the palace or the Historical Center. It states only that admission is separate and tells
 * people to check the official source. Al Fouta Park, Darat Al-Malik Abdulaziz and named streets could not be confirmed from a source and are left out.
 * No partnership with the Ministry of Culture, RCRC or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const ALMURABBA_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Murabba, Riyadh. The place I am visiting is [for example the National Museum], my pickup point is [pickup point], my destination is [destination], my date and time are [date and time], and I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alMurabbaRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-murabba");
  if (!me) throw new Error("Al Murabba is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "Al Murabba and the King Abdulaziz Historical Center",
    kind: "text",
    paragraphs: [
      "Al Murabba is a central district of Riyadh, just north of the old centre. It is centred on the King Abdulaziz Historical Center, a large landscaped cultural complex that includes the National Museum of Saudi Arabia and the restored Murabba Palace, once the residence of King Abdulaziz.",
      "Al Murabba is the neighbourhood, and the Historical Center is the complex inside it. They are not the same thing, and some maps place parts of the complex under neighbouring area names such as Al Fouta. When you book, give the name of the building you are visiting, not only \"Al Murabba\", so the driver goes to the right entrance.",
      "People ride here for museum visits, heritage trips, school and group outings, and as a stop between the old centre and Olaya. A private taxi saves hunting for a car at the end of a long museum visit, because the return pickup can be arranged in advance.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Murabba",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Murabba to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Murabba to Riyadh Airport (RUH)", "about 42 km", "about 30 to 35 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Murabba to Olaya", "about 6 km", "about 7 to 10 min"], href: pairHref("olaya") },
      { cells: ["Al Murabba to KAFD", "about 18 km", "about 18 to 20 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Murabba to Ad Dirah", "about 3 km", "about 5 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Murabba to Diriyah", "about 22 km", "about 20 to 25 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances. The exact figure depends on your pickup point, the route and the time of day, and they are not a promised journey time.",
  };

  const heritage: Section = {
    id: "heritage",
    h2: "Museum and heritage destinations",
    kind: "items",
    intro: "These are the places visitors name most often in Al Murabba. We do not publish opening hours, ticket rules or entry conditions, because they change and we could not confirm them from the official sources when this page was written. Check the current official information before you go. A taxi booking does not include admission, parking or any reservation.",
    items: [
      { title: "National Museum of Saudi Arabia", text: "The national museum, with galleries that run from Arabia's prehistory to the founding of the kingdom. It is part of the Historical Center. Tell us which entrance or set-down area you want, and confirm the right one with the museum, because visitor entrances and parking are set by the venue." },
      { title: "King Abdulaziz Historical Center", text: "The wider cultural complex that Al Murabba is centred on. It includes the museum, the palace and landscaped public spaces. Because it is large, name the exact building you are going to." },
      { title: "Murabba Palace", text: "The restored palace of King Abdulaziz, beside the National Museum. We cannot confirm its current visitor access, so check the official information before you plan a visit. We do not promise entry or a guided tour." },
    ],
  };

  const uses: Section = {
    id: "uses",
    h2: "Rides we arrange to and from Al Murabba",
    kind: "items",
    items: [
      { title: "Museum and heritage visits", text: "A private ride to the museum or the Historical Center, with the return pickup agreed in the same request." },
      { title: "Family and group trips", text: "Families, school groups and visiting parties. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { title: "Hotel and home pickups", text: "From a hotel, a home or an office in Riyadh to Al Murabba, or back again at the end of the visit." },
      { title: "Airport transfers", text: "Between Al Murabba, or a hotel nearby, and King Khalid International Airport (RUH)." },
      { title: "Between districts", text: "Short rides to Ad Dirah, Olaya and other central districts, for example from the museum to the old markets." },
    ],
  };

  const pickup: Section = {
    id: "pickup",
    h2: "Pickup and drop-off at the Historical Center",
    kind: "items",
    intro: "The complex is large and entrances, parking and set-down areas are set by the venue and can change with events and holidays. Access varies, so the exact point is agreed for each request.",
    items: [
      { title: "Name the building or entrance", text: "For example the National Museum or Murabba Palace, and the entrance if you know it, not only \"Al Murabba\"." },
      { title: "Confirm the meeting point with the venue", text: "If entrances or parking are controlled, confirm the correct set-down point with the museum or the Historical Center. We do not promise to reach a particular entrance or road inside the complex." },
      { title: "Tell us who is travelling", text: "The number of passengers, any luggage or bags, and anyone who needs a closer stop." },
      { title: "Share a reachable number", text: "A phone number you will answer, so the driver can find you in a busy area." },
      { title: "We do not promise waiting at an entrance", text: "A driver can wait only where that is confirmed for your booking and the local rules allow it." },
    ],
  };

  const returnRide: Section = {
    id: "return",
    h2: "Planning your return pickup",
    kind: "items",
    items: [
      { title: "Agree it before you go in", text: "Museum visits are hard to time exactly. Arranging the pickup point and a time window in advance is much easier than finding a car later." },
      { title: "Choose a clear point", text: "Pick an entrance or road that is easy to find and reachable by car. We confirm the pickup point with you for each request." },
      { title: "Tell us if plans change", text: "Message us on WhatsApp if you finish early or late and we adjust the pickup where availability allows." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Al Murabba and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 42 km from Al Murabba by road. A transfer can run in either direction.",
    items: [
      { title: "How long it takes", text: "In light traffic roughly 30 to 35 minutes. Peak hours and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and the hotel, street or building in Al Murabba." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring or a fixed waiting time. Airport pickup points follow the airport's own rules, and we confirm the meeting point with you." },
    ],
  };

  const metro: Section = {
    id: "metro",
    h2: "Riyadh Metro and your taxi",
    kind: "items",
    items: [
      { title: "National Museum station", text: "Riyadh.Travel lists National Museum as the nearest metro station for Al Murabba, on the Blue and Green lines. Other sources describe it as an interchange beside the Historical Center. Check the official Riyadh Metro information for current services, hours and fares." },
      { title: "When a private taxi helps", text: "A private taxi suits luggage, a group, an agreed pickup time or a trip to a point the metro does not reach, such as the airport. It is a separate service, and Gulf Elite Transport is not part of the metro and has no partnership with it." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Al Murabba on the map",
    kind: "map",
    intro: "See where Al Murabba is in Riyadh, and open the places below in Google Maps to check the roads and entrances before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Al Murabba, Riyadh",
    places: [
      { name: "National Museum of Saudi Arabia", query: "National Museum of Saudi Arabia, Riyadh", note: "Museum" },
      { name: "King Abdulaziz Historical Center", query: "King Abdulaziz Historical Center, Riyadh", note: "Cultural complex" },
      { name: "Murabba Palace", query: "Murabba Palace, Riyadh", note: "Restored palace" },
      { name: "National Museum Metro Station", query: "National Museum Metro Station, Riyadh", note: "Metro station" },
    ],
  };

  const near = ["ad-dirah", "al-malaz", "al-badiah", "olaya", "al-sulaimaniyah"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Murabba",
    kind: "links",
    intro: "These districts are close to Al Murabba but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 18 km by road" },
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 22 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "Place and pickup point", text: "The building you are visiting in Al Murabba, and where we collect you." },
      { title: "Destination and return", text: "Where you are going afterwards, and the time you want the return pickup." },
      { title: "Date, time and group", text: "When you want to travel, and how many passengers and bags." },
      { title: "A reachable number", text: "So the driver can find you at a busy entrance." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Al Murabba",
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
    h2: "Al Murabba taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Murabba?", a: "Message us on WhatsApp or use the booking form on this page. Send the building you are visiting, a pickup point, your destination, the date, the time and any return time. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange a ride to the Saudi National Museum?", a: "Yes. Tell us the date, the time and where you start, and we confirm the ride. The ride does not include a ticket or any museum reservation. Check the museum's official information for visiting rules." },
      { q: "Can I book a return pickup after the museum?", a: "Yes, and we suggest it. Ask for the return in the same request, with a pickup point and a time window. We confirm availability for each request." },
      { q: "Can the driver collect me from a specific museum entrance?", a: "We can note the entrance you ask for, but we cannot promise a particular entrance or road, because access is set by the venue. Confirm the correct meeting point with the museum." },
      { q: "Can I book a ride to Murabba Palace?", a: "We can take you to the Al Murabba area. We cannot confirm the palace's current visitor access, so check the official information, and note that a taxi booking does not include entry." },
      { q: "How far is Al Murabba from Riyadh Airport?", a: "About 42 km by road. In light traffic the drive takes roughly 30 to 35 minutes, and busy times add time." },
      { q: "Is Al Murabba close to Ad Dirah?", a: "Yes. The two are neighbours in the older centre of the city. Ad Dirah is about 3 km away by road, roughly 5 minutes in light traffic." },
      { q: "Can I arrange a family or group ride?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "Is there a metro station near Al Murabba?", a: "Riyadh.Travel lists National Museum station, on the Blue and Green lines, as the nearest. Check the official Riyadh Metro information for current services and hours." },
      { q: "Is Al Murabba the same as the King Abdulaziz Historical Center?", a: "No. Al Murabba is the district. The Historical Center is the cultural complex inside it, and it includes the National Museum and Murabba Palace." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
      { q: "Are taxi fares fixed or quoted individually?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
    ],
  };

  return {
    title: "Al Murabba Taxi Service Riyadh | Museum Visit Rides",
    description: "Book a private taxi to or from Al Murabba, Riyadh for National Museum visits and heritage trips. Agree your return pickup. Fare confirmed first.",
    h1: "Al Murabba Taxi Service in Riyadh",
    lead: "Private rides to and from Al Murabba for National Museum visits, heritage trips and airport transfers, with your meeting point and return pickup agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Murabba, the central Riyadh district around the King Abdulaziz Historical Center, Gulf Elite Transport takes bookings for private taxi rides to the National Museum of Saudi Arabia and the surrounding heritage area, planned return pickups and airport transfers to King Khalid International Airport (RUH), about 42 km by road. Entrances and parking at the complex are set by the venue, so the meeting point is agreed for each request. A taxi booking does not include admission to any attraction. Send the building, pickup point, destination, date, time and return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 42 km by road" },
      { label: "Olaya", value: "about 6 km by road" },
      { label: "Ad Dirah", value: "about 3 km by road" },
      { label: "Area type", value: "museums and heritage" },
    ],
    sections: addLinks(addImages(
        [about, journeys, heritage, uses, pickup, returnRide, airport, metro, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq],
        me.name,
        {
          about: { slot: "al-murabba-riyadh-taxi-service", alt: "A white SUV with a driver greeting a family with a young child on a paved street near sand-coloured heritage walls", label: "Photo: al-murabba-riyadh-taxi-service", w: 1000, h: 558 },
          return: { slot: "al-murabba-private-taxi-journey", alt: "Inside a taxi, a woman driver at the wheel with two passengers in the back, one taking a photo, with the Kingdom Centre in the distance", label: "Photo: al-murabba-private-taxi-journey", w: 1000, h: 558 },
          heritage: { slot: "murabba-palace-riyadh-heritage-taxi", alt: "A chauffeur helping an elderly woman with a walking stick beside a red SUV in front of the mud-brick wall and wooden doors of a historic palace", label: "Photo: murabba-palace-riyadh-heritage-taxi", w: 1000, h: 558 },
          uses: { slot: "national-museum-riyadh-taxi-pickup", alt: "A driver greeting three visitors, one with a camera, beside a grey minivan in front of a sand-coloured museum building", label: "Photo: national-museum-riyadh-taxi-pickup", w: 1000, h: 558 },
          airport: { slot: "al-murabba-riyadh-airport-transfer", alt: "A white minivan with its side door open as travellers with a wheeled suitcase walk along an airport arrivals kerb", label: "Photo: al-murabba-riyadh-airport-transfer", w: 1000, h: 558 },
        },
      ), ctx, "al-murabba"),
    whatsappMessage: ALMURABBA_WHATSAPP_MESSAGE,
  };
}
