import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Rawdah Taxi Service: the hand-written landing page for Al Rawdah (Ar Rawdah), a residential district in east Riyadh (see district-rich/index.ts).
 * Primary focus keyword: "Al Rawdah Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 *
 * IMAGES (TODO for the owner): three slots are reserved, with these exact files in public/images/routes/riyadh-districts/al-rawdah-taxi-service/ :
 *   al-rawdah-neighbourhood.webp      a realistic Al Rawdah residential neighbourhood (villas, apartments or streets)        -> "about" section
 *   al-rawdah-airport-transfer.webp   a professional airport pickup or passenger-transfer scene suited to Saudi Arabia      -> "airport" section
 *   al-rawdah-local-destinations.webp a park, shopping street or local setting in Al Rawdah                                 -> "community" section
 * No supplied images were found in the project, so labelled placeholders of the final size are shown. Do not use fleet photographs that are not the company's own.
 *
 * CENTRE POINT: OpenStreetMap places the Al Rawdah district (Riyadh) at 24.7341/46.7672, which matches the brief. riyadh-areas.ts stores Al Rawdah at 24.735/46.725, about 4 km west of that, so this page
 * uses 24.734/46.767 for every route, straight-line distance, the map and the weather, and does not change the shared file. (The generic route pages that link from the table still use the older point.)
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from 24.734/46.767):
 * RUH about 30 km and about 22 to 25 min (30.3 km / 22 min; old 30 / 25); Olaya about 13 km and about 13 to 15 min (12.9 / 13; old 13 / 15); KAFD about 24 km and about 22 to 25 min (23.5 / 22; the old 16 km / 20 min was wrong);
 * Ad Dirah about 17 km and about 17 to 20 min (16.5 / 17; old 22 / 20); Diriyah about 27 km and about 25 min (27.1 / 25; old 22 / 20); Al Malaz about 11 km and about 11 to 12 min (11.1 / 11).
 * Road names in the driving paragraph are those OSRM returns: Khurais Road, Makkah Al Mukarramah Road, Eastern Ring Road, Northern Ring Road, King Fahd Branch Road, Airport Road, King Salman Road.
 * Parks (OpenStreetMap): "Al Rawdah Amusement Park" (24.7423/46.7676) and "Rawdah Park" (24.7313/46.7749) are labelled Al Rawdah; no facilities, hours or admission are stated.
 * Metro (independent site riyadhmetro.org, date-checked 17 Nov 2026, none mentions Al Rawdah): Khurais Road (Line 6, 24.7381/46.8001), Al Andalus (Line 6, 24.7567/46.7905), Al Hamra (Lines 2 and 6 interchange,
 * 24.7764/46.7768), As Salam (Line 6, 24.7222/46.8114), Al Khaleej and Ishbiliyah (Line 2). Official rpt.sa returned 403, so these are named as stations that may be considered; no distances, fares, hours or times.
 * NOT verified / left out: Anwar Plaza (not found), all named clinics, hospitals and schools (could not be placed), the exact district boundary, Al Mursalat. No partnership with any venue, school, clinic or Riyadh Metro;
 * no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises, access to gated places or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const ALRAWDAH_DIRECTIONS =
  "Most drives from Al Rawdah begin on Khurais Road, leading towards Makkah Al Mukarramah Road for Olaya, Ad Dirah and central Riyadh. For King Khalid International Airport and KAFD, the route joins the Eastern Ring Road and then the Northern Ring Road. The airport route continues on Airport Road, and the KAFD route on King Fahd Branch Road. These roads come from OpenStreetMap routing and are only a guide. The best route depends on your exact pickup location, your destination entrance and current traffic, so we do not promise a fixed travel time. Please confirm your pickup point with us.";

const DISTRICTS = ["Al Rawdah", "Al Quds", "Al Mughrizat", "Al Hamra", "Al Izdihar", "Al Khaleej", "Al Andalus", "Al Rayyan", "Al Rawabi", "Al Naseem", "Al Yarmuk", "Granada", "Al Malaz", "Ishbiliyah"];
const RIYADH = ["Olaya", "Al Sulaimaniyah", "KAFD", "Ad Dirah", "Diriyah", "King Khalid International Airport"];
const CITIES = ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam"];
const riyadhQuery = (n: string) => (n === "KAFD" ? "King Abdullah Financial District, Riyadh, Saudi Arabia" : `${n}, Riyadh, Saudi Arabia`);

export const ALRAWDAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Rawdah, Riyadh. The trip is [for example a home pickup, an airport transfer, a family trip, a school or clinic run or a ride to Olaya or KAFD], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alRawdahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const base = ctx.all.find((x) => x.id === "al-rawdah");
  if (!base) throw new Error("Al Rawdah is missing from riyadh-areas.ts");
  /** The verified OpenStreetMap centre of the district (see the header note). */
  const me: CityArea = { ...base, lat: 24.734, lng: 46.767 };
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about = text("about", "Al Rawdah: a residential district in east Riyadh", [
    "Al Rawdah, also written Ar Rawdah, is a residential district in the east of Riyadh. It is made up mostly of villas and apartment buildings, with schools, shops and neighbourhood services close to where people live, and parks nearby. It lies close to Al Quds and Al Mughrizat, and the Eastern Ring Road and Khurais Road are the main roads that link it to the rest of the city.",
    "Al Rawdah Taxi Service is for the ordinary journeys that fill a family's week. A parent needs a driver for a school run or a clinic appointment. A household needs a comfortable ride to King Khalid International Airport with luggage. A worker wants to reach Olaya or KAFD without driving or parking. Others want a car to the shops in the evening and a ride home afterwards.",
    "Many of these trips have a fixed time, such as a flight, a school bell or an appointment, which is why booking in advance helps. It lets you agree the pickup point and the return time before the day, and it lets us confirm a vehicle that suits your passengers and bags.",
    "District boundaries are not drawn in exactly the same place on every map. If your address is near the edge of Al Rawdah, give the street and the building rather than only the district name, and tell us the place you are going to as well.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Rawdah",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Rawdah to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Rawdah to Riyadh Airport (RUH)", "about 30 km", "about 22 to 25 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Rawdah to Olaya", "about 13 km", "about 13 to 15 min"], href: pairHref("olaya") },
      { cells: ["Al Rawdah to Ad Dirah", "about 17 km", "about 17 to 20 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Rawdah to KAFD", "about 24 km", "about 22 to 25 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Rawdah to Diriyah", "about 27 km", "about 25 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Rawdah and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const airport = text("airport", "Airport transfers between Al Rawdah and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 30 km from the centre of Al Rawdah by road. In light traffic the drive takes roughly 22 to 25 minutes. Busy hours, the terminal you are using and your exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. If your flight leaves very early or lands late at night, say so in the request, so the pickup time is agreed in advance. A return airport transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const residential = text("residential", "Home, villa and apartment pickups in Al Rawdah", [
    "Most rides from Al Rawdah start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a main-road junction. A location pin sent on WhatsApp is even better, because it marks exactly where you will be waiting.",
    "If you live in a compound or a building with a controlled entrance, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Families often book one ride for the whole group. Tell us how many adults and children are travelling and how many bags you have, and we confirm a vehicle that suits them before you commit. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const community = text("community", "Parks, schools, clinics and everyday trips", [
    "OpenStreetMap lists parks in Al Rawdah, including one named Al Rawdah Amusement Park and another named Rawdah Park. We do not publish opening hours, facilities, admission or parking for any park, so check the park's own information before you go, tell us the entrance you want and agree a meeting point the car can reach. Ask for the return pickup in the same request.",
    "For school journeys, give the name of the school and the exact gate, and allow extra time around start and finish times, because roads near schools can be busy at those hours. For a clinic or hospital visit, give the name of the facility, the branch and the entrance you need. We do not name specific schools, clinics or shopping centres on this page, because we could not confirm their exact locations, and a facility close to Al Rawdah is not always inside it. A ride does not include any appointment, and it is not an emergency or medical transport service.",
    "For shopping and errands, name the shop or centre and the entrance, and tell us if you will carry bags so the vehicle suits them. We cannot promise a particular entrance, a restricted lane or a waiting position, and parking is not included in the fare.",
  ]);

  const business = text("business", "Business and city journeys from Al Rawdah", [
    "Olaya is about 13 km from Al Rawdah by road, roughly 13 to 15 minutes in light traffic, via Khurais Road and Makkah Al Mukarramah Road according to routing data. Olaya has many towers, hotels and shopping streets, so give the name of the building you are going to. Ad Dirah in the old centre of the city is about 17 km away, roughly 17 to 20 minutes, and Al Malaz is about 11 km away.",
    "KAFD is about 24 km away by road, roughly 22 to 25 minutes, and Diriyah is about 27 km away, roughly 25 minutes. KAFD has controlled tower entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and we do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business.",
  ]);

  const metro = text("metro", "Riyadh Metro near Al Rawdah", [
    "Al Rawdah does not have a confirmed metro station of its own. An independent Riyadh Metro information site lists stations in the east that you might consider: Khurais Road, Al Andalus and As Salam on Line 6 (Purple), Al Hamra, where Line 2 (Red) and Line 6 meet, and Al Khaleej and Ishbiliyah on Line 2. These are stations in neighbouring areas, not stations inside Al Rawdah, and the site does not link any of them to Al Rawdah. Which one is most practical depends on your exact pickup address, and you may need a short road journey to reach it.",
    "We could not check this against the official operator, so please check the official Riyadh Metro information for current stations and services. A taxi can be a useful link: a private ride can take you from your door to a station, or from a station to an address the metro does not reach, and it suits luggage, a group or a fixed pickup time. We do not publish walking distances, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters in a district of side streets and controlled entrances. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys a planned pickup time works backwards from your flight, and for school and clinic runs it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy school gates and shopping entrances. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["al-quds", "al-mughrizat", "al-hamra", "al-izdihar", "al-khaleej", "al-malaz"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Rawdah",
    kind: "links",
    intro: "These districts are close to Al Rawdah but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 13 km by road" },
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 24 km by road" },
      { name: "Qurtubah", href: ctx.districtHref("qurtubah"), note: "A residential district to the north" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, an airport transfer, a family trip, a school or clinic run or a ride to Olaya or KAFD), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Rawdah",
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
    h2: "Al Rawdah taxi service: questions",
    kind: "faq",
    items: [
      { q: "How do I book a taxi in Al Rawdah?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange an airport transfer from Al Rawdah?", a: "Yes. Send your flight number, the date and time, your terminal if you know it, and your passengers and bags. A return airport transfer can be requested in the same booking." },
      { q: "How far is Al Rawdah from Riyadh Airport?", a: "About 30 km by road from the centre of the district. In light traffic the drive takes roughly 22 to 25 minutes, and busy times add time." },
      { q: "Can I request a return journey?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "Can I arrange family transportation?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "What pickup information should I provide?", a: "A map pin or the street and building number, the compound name and gate if there is one, a nearby landmark, your destination and its entrance, the number of passengers and bags, and a phone number." },
      { q: "Can I book a ride to Olaya or KAFD?", a: "Yes. Olaya is about 13 km by road and KAFD about 24 km. Name the tower or building and the entrance. We cannot promise access to controlled tower entrances." },
      { q: "Which Riyadh Metro stations are near Al Rawdah?", a: "Al Rawdah has no confirmed station of its own. An independent metro site lists Khurais Road, Al Andalus, As Salam and Al Hamra in neighbouring areas. Check the official Riyadh Metro information." },
      { q: "Can I arrange transport for a school or clinic appointment?", a: "Yes, as an ordinary private ride. Give the school gate or the facility, branch and entrance, and a return time. It is not an emergency or medical transport service." },
      { q: "Can I book a taxi from Al Rawdah to Al Hamra or Al Quds?", a: "Yes. Both are neighbouring districts. Al Quds is the closer of the two. Name the place you are going to." },
      { q: "How is the fare confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Can I pre-book a ride?", a: "Yes. Booking in advance lets us agree the pickup point and confirm a suitable vehicle. A WhatsApp message is a request, and the booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Al Rawdah",
    kind: "local",
    intro: "Find Al Rawdah on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and major cities in Google Maps.",
    mapQuery: "24.734,46.767",
    mapLabel: "Al Rawdah, Riyadh",
    directionsTitle: "Driving Directions from Al Rawdah, Riyadh",
    directions: ALRAWDAH_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby east and north-east Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: RIYADH.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Major Saudi cities", links: CITIES.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: "Current Weather in Al Rawdah, Riyadh",
    weather: { place: "Al Rawdah, Riyadh", lat: 24.734, lng: 46.767 },
  };

  return {
    title: "Al Rawdah Taxi Service Riyadh | Home Pickups and Airport",
    description: "Al Rawdah Taxi Service for home pickups, school and clinic rides, Olaya and KAFD trips and airport transfers in Riyadh. Fare confirmed before you commit.",
    h1: "Al Rawdah Taxi Service in Riyadh",
    lead: "Al Rawdah Taxi Service from Gulf Elite Transport: private rides from your home in Al Rawdah for airport transfers, family journeys, school and clinic runs and city trips, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Rawdah, a residential district in east Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, airport transfers to King Khalid International Airport (RUH), about 30 km by road, family and group journeys, school and clinic runs and rides to Olaya (about 13 km by road) and KAFD. A booking does not give entry to private property or controlled entrances. Al Rawdah has no confirmed metro station of its own. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 30 km by road" },
      { label: "Olaya", value: "about 13 km by road" },
      { label: "KAFD", value: "about 24 km by road" },
      { label: "Area type", value: "residential, east Riyadh" },
    ],
    sections: addImages(
      [about, journeys, airport, residential, community, business, metro, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local],
      me.name,
      {
        about: { slot: "al-rawdah-neighbourhood", alt: "Villas and residential streets in Al Rawdah, Riyadh", label: "Photo: al-rawdah-neighbourhood.webp" },
        airport: { slot: "al-rawdah-airport-transfer", alt: "A private airport transfer for passengers travelling between Al Rawdah and Riyadh Airport", label: "Photo: al-rawdah-airport-transfer.webp" },
        community: { slot: "al-rawdah-local-destinations", alt: "A park and local streets in Al Rawdah, Riyadh", label: "Photo: al-rawdah-local-destinations.webp" },
      },
    ),
    whatsappMessage: ALRAWDAH_WHATSAPP_MESSAGE,
  };
}
