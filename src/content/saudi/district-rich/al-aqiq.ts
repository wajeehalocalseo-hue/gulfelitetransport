import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Aqiq Taxi Service: the hand-written landing page for Al Aqiq, a residential district in north-west Riyadh beside KAFD (see district-rich/index.ts).
 * Primary focus keyword: "Al Aqiq Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 *
 * IMAGES (TODO for the owner): three slots are reserved, with these exact files in public/images/routes/riyadh-districts/al-aqiq-taxi-service/ :
 *   al-aqiq-neighbourhood.webp      a realistic Al Aqiq residential neighbourhood (villas, apartments or streets)          -> "about" section
 *   al-aqiq-airport-transfer.webp   a professional airport pickup or passenger-transfer scene suited to Saudi Arabia          -> "airport" section
 *   al-aqiq-local-destinations.webp a KAFD or northern Riyadh destination setting near Al Aqiq                                 -> "community" section
 * No supplied images were found in the project, so labelled placeholders are shown. Do not use fleet photographs that are not the company's own.
 *
 * CENTRE POINT: OpenStreetMap places Al Aqiq at 24.7740/46.6309, which matches riyadh-areas.ts (24.774/46.631), so the shared point is used unchanged.
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from the Al Aqiq centre):
 * RUH about 31 km and about 24 to 25 min (31.5 km / 24 min; old 31 / 25); Olaya about 14 km and about 15 min (14.0 / 15; old 14 / 15); KAFD about 4.5 km and about 6 to 8 min (4.4 / 6; old 6.5 / 8);
 * Ad Dirah about 21 km and about 19 to 20 min (21.0 / 19; old 22 / 20); Diriyah about 11 km and about 14 to 15 min (11.0 / 14; the old 14 km was too long); Riyadh Park about 4 km and about 5 min (3.9 / 5);
 * King Saud University about 9 km and about 10 min (9.1 / 10).
 * Roads in the driving paragraph are those OSRM returns: Takhassussi Road, Thumamah Road, Northern Ring Road, KAFD ring road, King Fahd Road, Prince Mohammed bin Salman Road, Olaya Street, King Salman Road.
 * Places (OpenStreetMap / Nominatim): Riyadh Park (24.7569/46.6301) carries Al Aqiq in its address; Boulevard Riyadh City (24.7684/46.6045) is in Hittin; Digital City (24.7411/46.6337) is in An Nakheel;
 * Saudi German Hospital (24.8009/46.6285) is in Al Sahafah, not Al Aqiq. Boulevard World, Al-Raidah Digital City as a separate place and named schools could not be placed and are left out.
 * Metro (independent site riyadhmetro.org, date-checked 17 Nov 2026): KAFD (Lines 1 Blue, 4 Yellow and 6 Purple, an interchange where King Fahad Road crosses the Northern Ring Road, 24.768/46.6436, lists "Al Aqiq district"
 * among its surroundings) and Dr Sulaiman Al Habib (Line 1, 24.8116/46.6265, "among the An Nakheel, Ar Rahmaniyah and Al Aqiq districts"). Official rpt.sa returned 403, so both are named as stations that may
 * be considered; straight-line distances are computed from the listed coordinates and labelled as such; no fares, hours or times.
 * NOT verified / left out: Boulevard World, Riyadh Gallery Mall's district, named schools, Al Nafl details, the exact district boundary. No partnership with any venue, hospital, university or Riyadh Metro; no fares,
 * ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises, access to gated places or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const ALAQIQ_DIRECTIONS =
  "Most drives from Al Aqiq begin on Takhassussi Road. For KAFD, routing data follows Takhassussi Road to the KAFD ring road. For Riyadh Park, it uses Thumamah Road and the Northern Ring Road. For Olaya and Ad Dirah, it continues to King Fahd Road. For King Khalid International Airport, the route uses Prince Mohammed bin Salman Road, Olaya Street, King Fahd Road and King Salman Road. These roads come from OpenStreetMap routing and are only a guide. The best route depends on your exact pickup location, your destination entrance and current traffic. Please always confirm your pickup point with us.";

const STATIONS = [
  { name: "KAFD", lat: 24.768, lng: 46.6436 },
  { name: "Dr Sulaiman Al Habib", lat: 24.8116, lng: 46.6265 },
];

const DISTRICTS = ["Al Aqiq", "Hittin", "Al Malqa", "Al Nakheel", "Al Ghadir", "Al Sahafah", "Al Mohammadiyah", "Al Yasmin", "Al Wurud", "Al Murooj"];
const PLACES = ["KAFD", "Riyadh Park", "KAFD Metro Station", "Dr Sulaiman Al Habib Metro Station", "Boulevard Riyadh City", "King Saud University", "Digital City", "Saudi German Hospital"];
const OTHERS = ["Olaya", "Ad Dirah", "Diriyah", "King Khalid International Airport"];
const CITIES = ["Jeddah", "Makkah", "Dammam"];
const riyadhQuery = (n: string) => (n === "KAFD" ? "King Abdullah Financial District, Riyadh, Saudi Arabia" : /Metro Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const ALAQIQ_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Aqiq, Riyadh. The trip is [for example a home pickup, an office ride to KAFD, a Riyadh Park trip, a family trip or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alAqiqRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-aqiq");
  if (!me) throw new Error("Al Aqiq is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const st = (n: string) => {
    const s = STATIONS.find((x) => x.name === n);
    if (!s) return "";
    const c = s as unknown as CityArea;
    return `about ${fmtKm(haversine(me, c))} km to the ${compass(bearing(me, c))}`;
  };

  const about = text("about", "Al Aqiq: a residential district beside KAFD in north-west Riyadh", [
    "Al Aqiq is a residential district in the north-west of Riyadh, right beside the King Abdullah Financial District (KAFD). It is made up mostly of villas and apartment buildings, with shops, schools and services close to where people live, and offices and a major shopping destination close by. It lies near An Nakheel, Al Ghadir, Al Sahafah and Hittin.",
    "Al Aqiq Taxi Service is for the everyday journeys of a district that sits between homes and workplaces. A resident needs a short, reliable ride to a KAFD tower for a meeting. A family wants a car to Riyadh Park or a restaurant in the evening. A household needs a comfortable ride to King Khalid International Airport with luggage. Others need a driver for a school run, a university trip or a hospital appointment.",
    "Because KAFD is so close, many rides here are short. That makes the exact pickup point matter even more, since a driver who cannot find the right gate or tower entrance loses most of the journey's time. Give your street, building and gate or a map pin, and name the building you are going to.",
    "District boundaries are not drawn in exactly the same place on every map. Several landmarks near Al Aqiq belong to neighbouring districts, so we name each place by its own district below.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Aqiq",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Aqiq to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Aqiq to KAFD", "about 4.5 km", "about 6 to 8 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Aqiq to Riyadh Airport (RUH)", "about 31 km", "about 24 to 25 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Aqiq to Olaya", "about 14 km", "about 15 min"], href: pairHref("olaya") },
      { cells: ["Al Aqiq to Diriyah", "about 11 km", "about 14 to 15 min"], href: pairHref("diriyah") },
      { cells: ["Al Aqiq to Ad Dirah", "about 21 km", "about 19 to 20 min"], href: pairHref("ad-dirah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Aqiq and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const airport = text("airport", "Airport transfers between Al Aqiq and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 31 km from the centre of Al Aqiq by road. In light traffic the drive takes roughly 24 to 25 minutes. Busy hours, the terminal you are using and your exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. If your flight leaves very early or lands late at night, say so in the request, so the pickup time is agreed in advance. A return airport transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const business = text("business", "KAFD and business journeys from Al Aqiq", [
    "KAFD is about 4.5 km from Al Aqiq by road, roughly 6 to 8 minutes in light traffic, which suits meetings, office commutes and appointments. KAFD has many towers with controlled entrances, so name the tower and the entrance you need. We agree a meeting point that the car can reach and we do not promise access to towers, visitor entrances or private car parks. A short ride is still worth booking ahead, because the exact entrance is what saves time.",
    "Olaya is about 14 km away by road, roughly 15 minutes, and has many towers, hotels and shopping streets, so give the name of the building you are going to. Ad Dirah in the old centre of the city is about 21 km away, roughly 19 to 20 minutes, and Diriyah is about 11 km away, roughly 14 to 15 minutes. Gulf Elite Transport has no partnership with KAFD or any business. A booking is a private ride arranged for your request.",
  ]);

  const residential = text("residential", "Home, villa and apartment pickups in Al Aqiq", [
    "Most rides from Al Aqiq start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a main-road junction. A location pin sent on WhatsApp is even better, because it marks exactly where you will be waiting.",
    "If you live in a compound or a building with a controlled entrance, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Families often book one ride for the whole group. Tell us how many adults and children are travelling and how many bags you have, and we confirm a vehicle that suits them before you commit. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const community = text("community", "Riyadh Park, hospitals, universities and nearby places", [
    "OpenStreetMap lists Riyadh Park under Al Aqiq, about 4 km from the district centre by road, roughly 5 minutes in light traffic. We do not publish mall opening hours, parking conditions or entrance details, so check the mall's own information, tell us the entrance you want and agree a meeting point the car can reach. Parking is not included in the fare, and we cannot promise a particular entrance or waiting position. Ask for the return pickup in the same request, because busy evenings make it hard to find a car on the day.",
    "Several well-known places near Al Aqiq are in other districts. Boulevard Riyadh City is in Hittin. Digital City is in An Nakheel. Saudi German Hospital is in Al Sahafah, and King Saud University, which is about 9 km from Al Aqiq by road, roughly 10 minutes, has its own gates and medical buildings. Name the place, the building and the entrance you need, because hospitals and campuses have several. A ride does not include any appointment, it is not an emergency or medical transport service, and we cannot promise access to controlled gates or staff parking.",
    "For school journeys, give the school and the exact gate, and allow extra time around start and finish times, because roads near schools can be busy at those hours. We do not name specific schools on this page, because we could not confirm their locations.",
  ]);

  const metro = text("metro", "Riyadh Metro near Al Aqiq", [
    `Al Aqiq does not have a confirmed metro station of its own. An independent Riyadh Metro information site lists two nearby Line 1 (Blue) stations that you might consider: KAFD station (${st("KAFD")} of the centre of Al Aqiq), which is also where Line 4 (Yellow) and Line 6 (Purple) start, and Dr Sulaiman Al Habib station (${st("Dr Sulaiman Al Habib")}), the next stop to the north. That site names Al Aqiq among the districts around both stations. These distances are straight lines calculated from the coordinates that site lists. They are not walking or road distances, and the best station depends on your exact pickup address.`,
    "We could not check this against the official operator, so please check the official Riyadh Metro information for current stations and services. A taxi can link your door to a station, or a station to an address the metro does not reach, and it suits luggage, a group or a fixed pickup time. We do not publish walking times, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters when a tower entrance or a compound gate decides where the car can stop. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys a planned pickup time works backwards from your flight, and for meetings and appointments it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy mall and campus entrances. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["hittin", "al-malqa", "al-nakheel", "al-ghadir", "al-sahafah", "al-mohammadiyah", "al-yasmin"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Aqiq",
    kind: "links",
    intro: "These districts are close to Al Aqiq but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 4.5 km by road" },
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 14 km by road" },
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 11 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, an office ride to KAFD, a Riyadh Park trip, a family trip or an airport transfer), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Aqiq",
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
    h2: "Al Aqiq taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Aqiq?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange an airport transfer from Al Aqiq?", a: "Yes. Send your flight number, the date and time, your terminal if you know it, and your passengers and bags. A return airport transfer can be requested in the same booking." },
      { q: "How far is Al Aqiq from Riyadh Airport?", a: "About 31 km by road from the centre of the district. In light traffic the drive takes roughly 24 to 25 minutes, and busy times add time." },
      { q: "Can I book a taxi from Al Aqiq to KAFD?", a: "Yes. KAFD is about 4.5 km by road, roughly 6 to 8 minutes in light traffic. Name the tower and the entrance. We cannot promise access to controlled tower entrances." },
      { q: "Can I book a taxi to Riyadh Park?", a: "Yes. Tell us the entrance you want and a return time window. We cannot promise a particular entrance or waiting spot, and parking is not included in the fare." },
      { q: "Can I arrange a pickup from a nearby district such as Hittin or Al Nakheel?", a: "Yes. Both are neighbouring districts. Name the place you are going to, because several landmarks near Al Aqiq are in other districts." },
      { q: "Can I request a return journey?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "Can I book a family or group ride?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "Does Al Aqiq have a metro station?", a: "Not a confirmed one of its own. An independent metro site lists KAFD and Dr Sulaiman Al Habib stations on Line 1 (Blue) nearby. Check the official Riyadh Metro information." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Do journey times change during the day?", a: "Yes. The times on this page are for light traffic, and busy hours, your exact pickup and the entrance of your destination change them. They are not promised journey times." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Al Aqiq",
    kind: "local",
    intro: "Find Al Aqiq on the map, read how the main roads lead out of the district, and open nearby neighbourhoods, destinations and major cities in Google Maps.",
    mapQuery: "24.774,46.631",
    mapLabel: "Al Aqiq, Riyadh",
    directionsTitle: "Driving Directions from Al Aqiq, Riyadh",
    directions: ALAQIQ_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby north-west Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Nearby destinations and metro stations", links: PLACES.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: OTHERS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Major Saudi cities", links: CITIES.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: "Current Weather in Al Aqiq, Riyadh",
    weather: { place: "Al Aqiq, Riyadh", lat: 24.774, lng: 46.631 },
  };

  return {
    title: "Al Aqiq Taxi Service Riyadh | KAFD, Airport and Home Rides",
    description: "Al Aqiq Taxi Service for home pickups, KAFD and Riyadh Park rides, family trips and airport transfers in Riyadh. Fare confirmed before you commit.",
    h1: "Al Aqiq Taxi Service in Riyadh",
    lead: "Al Aqiq Taxi Service from Gulf Elite Transport: private rides from your home in Al Aqiq to KAFD, Riyadh Park, the airport and across the city, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Aqiq, a residential district in north-west Riyadh beside the King Abdullah Financial District (KAFD), Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, short business rides to KAFD (about 4.5 km by road), trips to Riyadh Park, family and group journeys and airport transfers to King Khalid International Airport (RUH), about 31 km by road. A booking does not give entry to private property or controlled tower entrances. Al Aqiq has no confirmed metro station of its own. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "KAFD", value: "about 4.5 km by road" },
      { label: "Riyadh Airport (RUH)", value: "about 31 km by road" },
      { label: "Olaya", value: "about 14 km by road" },
      { label: "Area type", value: "residential, beside KAFD" },
    ],
    sections: addLinks(addImages(
      [about, journeys, airport, business, residential, community, metro, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local],
      me.name,
      {
        about: { slot: "al-aqiq-neighbourhood", alt: "Villas and residential streets in Al Aqiq, Riyadh", label: "Photo: al-aqiq-neighbourhood.webp" },
        airport: { slot: "al-aqiq-airport-transfer", alt: "A private airport transfer for passengers travelling between Al Aqiq and Riyadh Airport", label: "Photo: al-aqiq-airport-transfer.webp" },
        community: { slot: "al-aqiq-local-destinations", alt: "A business and shopping area near Al Aqiq, Riyadh", label: "Photo: al-aqiq-local-destinations.webp" },
      },
    ), ctx, "al-aqiq"),
    whatsappMessage: ALAQIQ_WHATSAPP_MESSAGE,
  };
}
