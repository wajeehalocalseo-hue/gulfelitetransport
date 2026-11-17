import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Narjis Taxi Service: the hand-written landing page for Al Narjis, a large residential district in north Riyadh (see district-rich/index.ts).
 * Written mostly as prose paragraphs (the owner asked for more content and fewer boxed cards so she can add internal links).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Al Narjis centre in riyadh-areas.ts and the other centres):
 * RUH about 21 km and about 18 to 20 min (21.3 km / 18 min; the old page said 21 km / 20 min); Olaya about 22 km and about 24 to 25 min (22.3 / 24; old 23 / 25); KAFD about 14 km and about 19 to 20 min
 * (13.8 / 19; the old page said 16 km / 20 min); Ad Dirah about 29 km and about 29 to 30 min (29.2 / 29; old 30 / 30); Diriyah about 20 km and about 20 min (19.8 / 20; old 20 / 20).
 * Straight-line distances to neighbouring districts are computed from the district centres (haversine) and labelled as straight lines.
 * Sources: Riyadh.Travel has no Al Narjis page (404). OpenStreetMap (Nominatim) places Imam Mohammad Ibn Saud Islamic University at 24.8132/46.7019 (north Riyadh, east of the Al Narjis centre, not in the district);
 * Princess Nourah bint Abdulrahman University, King Abdullah bin Abdulaziz University Hospital, Al Narjis Plaza (the only match was a hotel) and the named hospitals could not be geocoded or placed, so the page
 * names the universities only as in northern Riyadh, with no distance or location claim, and names no hospital or mall.
 * Metro: Al Narjis has no confirmed station; no station could be checked, so the page says so and gives no station names or distances. Official rpt.sa was not reachable (403).
 * NOT verified / left out: PNU's exact location, hospital names and branches, Al Narjis Plaza, Riyadh Front, Banban, the exact district boundary, road names. No partnership with any university, hospital,
 * business or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises, restricted campus or gate access, or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

export const ALNARJIS_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Narjis, Riyadh. The trip is [for example a home pickup, an airport transfer, a university visit, a clinic appointment or a family trip], my pickup point is [street, building, compound and gate, or I will send a map pin], my destination is [destination, building and gate], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alNarjisRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-narjis");
  if (!me) throw new Error("Al Narjis is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about = text("about", "Al Narjis: a large residential district in north Riyadh", [
    "Al Narjis is a large residential district in the north of Riyadh. It has villas, apartment buildings, newer compounds, schools and everyday services, and it lies north of Al Yasmin. From here the main roads lead towards King Khalid International Airport (RUH) in the north and towards KAFD and central Riyadh to the south.",
    "Because the district is large and still growing, many of its streets and developments are new. Some of them may be missing from certain maps, or may be named differently on different apps. This is why a location pin is so useful in Al Narjis: a pin sent on WhatsApp marks exactly where you are standing, even when the street does not show up in a search.",
    "Daily life here creates a steady mix of journeys. Families travel to the airport with luggage, students and staff travel to universities in northern Riyadh, residents go to clinics and appointments, and many people commute towards KAFD or Olaya. A private ride arranged in advance suits all of these, especially when the pickup point and the return time are agreed beforehand.",
    "District boundaries are not drawn in exactly the same place on every map. If your address is near the edge of Al Narjis, give the street, the building and the gate, or send a pin, rather than relying on the district name alone.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Narjis",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Narjis to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Narjis to Riyadh Airport (RUH)", "about 21 km", "about 18 to 20 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Narjis to KAFD", "about 14 km", "about 19 to 20 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Narjis to Olaya", "about 22 km", "about 24 to 25 min"], href: pairHref("olaya") },
      { cells: ["Al Narjis to Diriyah", "about 20 km", "about 20 min"], href: pairHref("diriyah") },
      { cells: ["Al Narjis to Ad Dirah", "about 29 km", "about 29 to 30 min"], href: pairHref("ad-dirah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances, and the airport figure is an estimate from the district centre, not a guarantee from every address. Traffic, your exact pickup address, road access, the time of day and any stops change the time, so they are not a promised journey time.",
  };

  const pinsIntro = text("pins-intro", "Pickups from new streets and compounds", [
    "If your street is new, or your development has its own internal roads, the most reliable way to be found is to share your location. On WhatsApp you can send a location pin, or a live location while the driver is on the way. Together with the building number and the compound name, this removes most of the guesswork.",
    "If your compound has controlled gates, a booking does not give permission to enter private property. Please check with your host or the property management whether a taxi may enter, and if not, agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
  ]);

  const pins: Section = {
    id: "pins",
    h2: "Six steps to share your pickup point",
    kind: "steps",
    items: [
      { title: "Send a map pin", text: "On WhatsApp, share your location pin, or the live location if you can." },
      { title: "Add the street and building", text: "The street name, the villa or building number and the compound or development name." },
      { title: "Say which gate", text: "If the development has more than one gate, say which one you will use." },
      { title: "Name a landmark", text: "A nearby mosque, shop or junction that is easy to recognise." },
      { title: "Agree a meeting point", text: "If the driver cannot enter, agree a point outside the gate and confirm access with your host." },
      { title: "Share a number", text: "A phone number you will answer, so the driver can call when they arrive." },
    ],
  };

  const airport = text("airport", "Airport transfers between Al Narjis and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 21 km from the centre of Al Narjis by road. In light traffic the drive takes roughly 18 to 20 minutes. This is an estimate from the district centre, not a guarantee from every address, because Al Narjis is large and your exact starting point, the time of day and the terminal can all change the journey.",
    "Booking ahead helps most for early departures and late arrivals. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, along with your pin or address. For an arrival, send your landing time and where you are going in Al Narjis. If your flight is at an unusual hour, say so in the request, and the pickup time is agreed with you in advance.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service, restricted airport access or a fixed waiting time. Airport pickup points follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const university = text("university", "University journeys in northern Riyadh", [
    "Several large universities are in northern Riyadh, including Princess Nourah bint Abdulrahman University and Imam Mohammad Ibn Saud Islamic University. Students, staff and visiting families often need a ride at the start and end of term or for appointments on campus. We could not confirm the exact distances between these campuses and Al Narjis, so we do not state them, and Gulf Elite Transport has no partnership with any university.",
    "Campuses are large and have several gates, so tell us the university, the building and the gate you want. We cannot promise access to restricted areas, staff parking or controlled gates. If a gate is controlled, agree an approved meeting point with the university or your host. For a return trip, ask for the pickup in the same request and give a time window.",
  ]);

  const health = text("health", "Clinic and hospital appointments", [
    "Appointments are a common reason to book a ride, because they have a fixed time and a fixed place. We do not name specific hospitals or clinics on this page, because we could not confirm their exact branches and addresses, so please tell us the name of the facility, the branch and the entrance you need.",
    "Appointments can run over, so ask for a return pickup window and let us know if it changes. Waiting time is agreed separately and is never assumed. These are ordinary private rides: a booking does not include an appointment, it is not an emergency or medical transport service, and we cannot give patient assistance.",
  ]);

  const family = text("family", "Family, group and everyday journeys", [
    "Families in Al Narjis often travel together, whether it is the airport run with suitcases, a visit to relatives or a trip to the shops. Tell us how many adults and children are travelling and how many bags you have. The vehicle is chosen from that information and confirmed with you before you commit.",
    "For shopping and errands, give the place and the entrance you want, and ask for the return in the same request. For school runs, give the school and the exact entrance and allow extra time, because school start and finish times are busy.",
  ]);

  const business = text("business", "Business and cross-city journeys", [
    "KAFD is about 14 km from Al Narjis by road, roughly 19 to 20 minutes in light traffic. KAFD has controlled tower entrances, so name the tower and the entrance, and we agree a meeting point that the car can reach. We do not promise access to towers, visitor entrances or private car parks.",
    "Olaya is about 22 km away by road, roughly 24 to 25 minutes, so give the name of the building you are going to. Diriyah is about 20 km away, roughly 20 minutes, and Ad Dirah in the old centre of the city is about 29 km away, roughly 29 to 30 minutes. Gulf Elite Transport has no partnership with KAFD or any business.",
  ]);

  const metro = text("metro", "Riyadh Metro and Al Narjis", [
    "Al Narjis does not have a confirmed metro station of its own. A station in another district is not a station inside Al Narjis, and we do not state which station is nearest, because we could not check station details against the official operator. Please check the official Riyadh Metro information for stations and services.",
    "A taxi can still help. A private ride can take you from your door to a station, or from a station to an address the metro does not reach. Send your exact address and we suggest a drop-off. We do not publish walking distances, fares, hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const pickup = text("pickup", "Pickup and drop-off in Al Narjis", [
    "Good pickup details save time. Send a map pin or the street and building number, the compound name and gate if there is one, the entrance or road where the car can meet you, the building or gate you are going to, the number of passengers and bags, and the time you want a return pickup if you need one.",
    "Gates, private roads and busy campus or school entrances can change where a driver is able to stop, so the exact meeting point is agreed for each request.",
  ]);

  const map: Section = {
    id: "map",
    h2: "Al Narjis on the map",
    kind: "map",
    intro: "See where Al Narjis is in Riyadh. Open your destination in Google Maps to check the roads and gates before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Al Narjis, Riyadh",
    places: [
      { name: "Princess Nourah bint Abdulrahman University", query: "Princess Nourah bint Abdulrahman University, Riyadh", note: "University" },
      { name: "Imam Mohammad Ibn Saud Islamic University", query: "Imam Mohammad Ibn Saud Islamic University, Riyadh", note: "University" },
    ],
  };

  const near = ["al-yasmin", "al-sahafah", "al-malqa", "al-arid", "al-wadi"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Narjis",
    kind: "links",
    intro: "These districts are close to Al Narjis but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Al Falah", href: ctx.districtHref("al-falah"), note: "A north-eastern district" },
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 14 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, an airport transfer, a university visit, an appointment or a family trip), a map pin or your street, building and gate, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Narjis",
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
    h2: "Al Narjis taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Narjis?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup pin or address, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "My street is new and not on the map. Can you still collect me?", a: "Usually yes. Send a location pin on WhatsApp, with the building number, the compound and gate, and a landmark. We agree the meeting point with you." },
      { q: "Can a taxi enter my gated compound?", a: "A booking does not give permission to enter private property. Confirm access with your host or the property management, or agree a meeting point outside the gate." },
      { q: "How far is Al Narjis from Riyadh Airport?", a: "About 21 km by road from the district centre. In light traffic the drive takes roughly 18 to 20 minutes, and busy times add time. The exact figure depends on your address." },
      { q: "Can I book a taxi from Al Narjis to KAFD?", a: "Yes. KAFD is about 14 km by road, roughly 19 to 20 minutes in light traffic. Name the tower and the entrance." },
      { q: "Can I book a taxi to a university in northern Riyadh?", a: "Yes. Tell us the university, the building and the gate. We cannot promise access to controlled gates or staff parking, so agree an approved meeting point." },
      { q: "Can I book a clinic or hospital appointment ride?", a: "Yes, as an ordinary private ride. Give the facility, the branch and the entrance. It is not an emergency or medical transport service." },
      { q: "Can I book a family or group ride?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "Can I arrange a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "Does Al Narjis have a metro station?", a: "Not a confirmed one of its own. Check the official Riyadh Metro information for stations and services. A taxi can connect you to a station." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  return {
    title: "Al Narjis Taxi Service Riyadh | Home Pickups and Airport",
    description: "Book a private taxi in Al Narjis, Riyadh for home pickups, university trips, family rides, KAFD and airport transfers. Fare confirmed first.",
    h1: "Al Narjis Taxi Service in Riyadh",
    lead: "Private rides from your home in Al Narjis for airport transfers, university trips, family journeys and KAFD rides, with your pin, gate and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Narjis, a large residential district in north Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas, apartments and newer compounds, airport transfers to King Khalid International Airport (RUH), about 21 km by road from the district centre, university and appointment journeys, family and group rides and business rides to KAFD (about 14 km by road). Many streets are new and may be missing from some maps, so send a location pin and the gate. A booking does not give entry to private property. Al Narjis has no confirmed metro station of its own. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 21 km by road" },
      { label: "KAFD", value: "about 14 km by road" },
      { label: "Olaya", value: "about 22 km by road" },
      { label: "Area type", value: "large residential, north Riyadh" },
    ],
    sections: addImages([about, journeys, pinsIntro, pins, airport, university, health, family, business, metro, pickup, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name),
    whatsappMessage: ALNARJIS_WHATSAPP_MESSAGE,
  };
}
