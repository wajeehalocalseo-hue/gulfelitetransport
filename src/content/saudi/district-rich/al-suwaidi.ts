import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Suwaidi Taxi Service: the hand-written landing page for Al Suwaidi, a residential district in south-west Riyadh (see district-rich/index.ts).
 * Primary focus keyword: "Al Suwaidi Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 *
 * IMAGES (TODO for the owner): three slots are reserved, with these exact files in public/images/routes/riyadh-districts/al-suwaidi-taxi-service/ :
 *   al-suwaidi-neighbourhood.webp      a realistic Al Suwaidi residential neighbourhood (villas, apartments or streets)         -> "about" section
 *   al-suwaidi-airport-transfer.webp   a professional airport pickup or passenger-transfer scene suited to Saudi Arabia          -> "airport" section
 *   al-suwaidi-local-destinations.webp a local street, market area or park setting in or near Al Suwaidi                          -> "community" section
 * No supplied images were found in the project, so labelled placeholders of the final size are shown. Do not use fleet photographs that are not the company's own.
 *
 * CENTRE POINT: OpenStreetMap places the Al Suwaidi district at 24.5912/46.6730 (the brief gives about 24.588/46.673). riyadh-areas.ts stores Al Suwaidi at 24.595/46.635, about 4 km west of that and
 * between Al Suwaidi and Al Suwaidi Al Gharbi, so this page uses 24.5912/46.673 for every route, straight-line distance, the map and the weather, and does not change the shared file.
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from 24.5912/46.673):
 * RUH about 50 km and about 38 to 40 min (50.4 km / 39 min; old 53 / 40); Olaya about 14 km and about 14 to 15 min (14.0 / 14; old 17 / 15); KAFD about 26 km and about 25 min (26.2 / 25; old 30 / 25);
 * Ad Dirah about 8 km and about 9 to 10 min (7.7 / 9; old 10 / 10); Diriyah about 30 km and about 28 to 30 min (29.6 / 29; old 28 / 25); Diplomatic Quarter about 22 km and about 24 to 25 min (21.7 / 24).
 * Roads in the driving paragraph are those OSRM returns: King Fahd Branch Road, King Fahd Road, Imam Turki bin Abdullah Road, Makkah Al Mukarramah Road, Eastern Ring Road, Airport Road, Jeddah Road.
 * Western Ring Road and Madinah Al Munawwarah Road do not appear on these routes, so the driving paragraph does not use them; the metro site says the Orange Line runs along Madinah Munawwarah Road, and the page says so.
 * Al Suwaidi vs Al Suwaidi Al Gharbi: OSM places Al Suwaidi at 24.591/46.673 and the Western (Al Gharbi) side near 24.573/46.615, about 6 km apart. Western Station (24.5825/46.6144, riyadhmetro.org) is on the
 * western side, so it is NOT described as being in Al Suwaidi. Dhahrat Al Badiah (24.6074/46.6550), Sultanah (24.6148/46.6861) and Aishah bint Abi Bakr Street (24.6005/46.6437) are Orange Line (Line 3) stations on the
 * same independent site; the page gives straight-line distances computed from those listed coordinates and says the best station depends on the address. Official rpt.sa returned 403. No site page mentions Al Suwaidi.
 * NOT verified / left out: Al Suwaidi Park (the only park found is in Al Suwaidi Al Gharbi), Al Hammadi Hospital - Al Suwaidi (not found), the Central Vegetable Market, named markets, clinics, schools,
 * Riyadh Season or any event, Wadi Hanifa access points, the exact district boundary. No partnership with any park, hospital, market, school or Riyadh Metro; no fares, ratings, reviews, vehicle specifications,
 * child seats, free waiting, waiting promises, access to gated places or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const ALSUWAIDI_DIRECTIONS =
  "Most drives from Al Suwaidi head towards King Fahd Road through King Fahd Branch Road. For Olaya and KAFD, routing data follows King Fahd Road north. For Ad Dirah, the route uses Imam Turki bin Abdullah Road. For King Khalid International Airport, the route continues from King Fahd Road onto Makkah Al Mukarramah Road, the Eastern Ring Road and Airport Road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup location, your destination entrance and current traffic, and no fixed travel time is promised. Please confirm your pickup point with us.";

const STATIONS = [
  { name: "Dhahrat Al Badiah", lat: 24.6074, lng: 46.655 },
  { name: "Sultanah", lat: 24.6148, lng: 46.6861 },
  { name: "Aishah bint Abi Bakr Street", lat: 24.6005, lng: 46.6437 },
  { name: "Western Station", lat: 24.5825, lng: 46.6144 },
];

const DISTRICTS = ["Al Suwaidi", "Al Suwaidi Al Gharbi", "Al Uraija", "Al Badiah", "Al Shifa", "Al Aziziyah", "Dhahrat Laban"];
const STATION_LINKS = ["Western Station", "Dhahrat Al Badiah Metro Station", "Sultanah Metro Station", "Aishah bint Abi Bakr Street Metro Station"];
const OTHERS = ["Ad Dirah", "Al Murabba", "Diplomatic Quarter", "Olaya", "KAFD", "Diriyah", "Al Malaz", "Wadi Hanifa", "King Khalid International Airport"];
const CITIES = ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam"];
const riyadhQuery = (n: string) => (n === "KAFD" ? "King Abdullah Financial District, Riyadh, Saudi Arabia" : /Metro Station$|^Western Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const ALSUWAIDI_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Suwaidi, Riyadh. The trip is [for example a home pickup, an airport transfer, a family trip, a market or hospital visit or a metro station transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alSuwaidiRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const base = ctx.all.find((x) => x.id === "al-suwaidi");
  if (!base) throw new Error("Al Suwaidi is missing from riyadh-areas.ts");
  /** The verified OpenStreetMap centre of the district (see the header note). */
  const me: CityArea = { ...base, lat: 24.5912, lng: 46.673 };
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const st = STATIONS.map((s) => ({ ...s, km: haversine(me, s as unknown as CityArea), dir: compass(bearing(me, s as unknown as CityArea)) }));
  const stText = (n: string) => {
    const s = st.find((x) => x.name === n);
    return s ? `about ${fmtKm(s.km)} km to the ${s.dir}` : "";
  };

  const about = text("about", "Al Suwaidi: a residential district in south-west Riyadh", [
    "Al Suwaidi is a residential district in the south-west of Riyadh, in the Al Uraija municipality. It is made up mostly of villas and apartment buildings, with local markets, shops, schools and community services close to where people live. It sits near Al Badiah, Al Uraija and Al Shifa, and the old centre of the city at Ad Dirah is a short drive to the north-east.",
    "Al Suwaidi Taxi Service is for the everyday journeys of a family district. A household needs a comfortable ride to King Khalid International Airport with luggage. A parent needs a driver for a school run or a hospital visit. A resident wants to reach Olaya or KAFD without driving and parking. Others want a car to the market and a ride home afterwards, or a short transfer to a metro station.",
    "Please note that Al Suwaidi and Al Suwaidi Al Gharbi, also called Western Al Suwaidi, are different places. Al Suwaidi Al Gharbi lies to the west, roughly 6 km from the centre of Al Suwaidi in a straight line, and some landmarks and metro stations that carry the Suwaidi or Western name belong to that side. When you book, give your street and building rather than only the district name, so the driver goes to the right place.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Suwaidi",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Suwaidi to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Suwaidi to Riyadh Airport (RUH)", "about 50 km", "about 38 to 40 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Suwaidi to Olaya", "about 14 km", "about 14 to 15 min"], href: pairHref("olaya") },
      { cells: ["Al Suwaidi to Ad Dirah", "about 8 km", "about 9 to 10 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Suwaidi to KAFD", "about 26 km", "about 25 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Suwaidi to Diriyah", "about 30 km", "about 28 to 30 min"], href: pairHref("diriyah") },
      { cells: ["Al Suwaidi to Diplomatic Quarter", "about 22 km", "about 24 to 25 min"], href: pairHref("diplomatic-quarter") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Suwaidi and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const airport = text("airport", "Airport transfers between Al Suwaidi and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, and Al Suwaidi is in the south-west, so this is a substantial cross-city journey. The road distance from the centre of Al Suwaidi is about 50 km, and in light traffic the drive takes roughly 38 to 40 minutes. Busy hours, the terminal you are using and your exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. Because the trip is long, we suggest allowing generous time before a flight, and a return airport transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const residential = text("residential", "Home, villa and apartment pickups in Al Suwaidi", [
    "Most rides from Al Suwaidi start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a main-road junction. A location pin sent on WhatsApp is even better, because it marks exactly where you will be waiting.",
    "If you live in a compound or a building with a controlled entrance, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Families often book one ride for the whole group. Tell us how many adults and children are travelling and how many bags you have, and we confirm a vehicle that suits them before you commit. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const community = text("community", "Markets, hospitals, schools and local visits", [
    "Al Suwaidi has local markets and shops, and many families make short trips to them. We do not name specific markets, parks, schools or clinics on this page, because we could not confirm their exact locations, and some places with a Suwaidi name are in Al Suwaidi Al Gharbi rather than in Al Suwaidi. Tell us the name of the place and the entrance you want, and ask for the return in the same request. If you carry shopping, tell us so the vehicle suits it. We cannot promise a particular entrance, a restricted lane or a waiting position, and parking is not included in the fare.",
    "For hospital and clinic visits, give the name of the facility, the branch and the entrance you need, because hospitals often have several entrances and some branches are in neighbouring districts. We do not state the location of any hospital here. A ride does not include any appointment, it is not an emergency or medical transport service, and we cannot give medical advice. For a park visit, share the exact entrance or meeting point and plan the return pickup. We do not publish park hours or events, which change, and a taxi booking does not include tickets or parking.",
    "For school journeys, give the school and the exact gate, and allow extra time around start and finish times, because roads near schools can be busy at those hours.",
  ]);

  const business = text("business", "Business and city journeys from Al Suwaidi", [
    "Ad Dirah, the old centre of Riyadh, is about 8 km from Al Suwaidi by road, roughly 9 to 10 minutes in light traffic, via Imam Turki bin Abdullah Road according to routing data. Olaya is about 14 km away, roughly 14 to 15 minutes, and has many towers, hotels and shopping streets, so give the name of the building you are going to. Both journeys use King Fahd Road for part of the way.",
    "KAFD is about 26 km away by road, roughly 25 minutes, and has controlled tower entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and we do not promise access to towers or private car parks. The Diplomatic Quarter is about 22 km away and Diriyah about 30 km. Gulf Elite Transport has no partnership with KAFD or any business, and a booking is a private ride arranged for your request.",
  ]);

  const metro = text("metro", "Riyadh Metro near Al Suwaidi", [
    `Al Suwaidi does not have a confirmed metro station of its own. An independent Riyadh Metro information site lists several Orange Line (Line 3) stations along Madinah Munawwarah Road that you might consider: Dhahrat Al Badiah (${stText("Dhahrat Al Badiah")} of the centre of Al Suwaidi), Sultanah (${stText("Sultanah")}) and Aishah bint Abi Bakr Street (${stText("Aishah bint Abi Bakr Street")}). These distances are straight lines calculated from the coordinates that site lists. They are not walking or road distances, and the best station depends on your exact pickup address.`,
    `Western Station is on the same line, but its listed location is in Al Suwaidi Al Gharbi, about ${fmtKm(st.find((x) => x.name === "Western Station")?.km ?? 0)} km to the west of the centre of Al Suwaidi in a straight line, so it is not a station in Al Suwaidi. We could not check any of this against the official operator, so please check the official Riyadh Metro information for current stations and services. A taxi can link your door to a station, or a station to an address the metro does not reach, and it suits luggage, a group or a fixed pickup time. We do not publish walking times, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.`,
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters in a district of side streets and controlled entrances. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For the long airport journey, a planned pickup time works backwards from your flight, and for hospital and school runs it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy hospital entrances, markets and school gates. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["al-badiah", "al-uraija", "al-shifa", "ad-dirah", "diplomatic-quarter"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Suwaidi",
    kind: "links",
    intro: "These districts are close to Al Suwaidi but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Al Murabba", href: ctx.districtHref("al-murabba"), note: "Museum district in central Riyadh" },
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 14 km by road" },
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 26 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, an airport transfer, a family trip, a market or hospital visit or a metro station transfer), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Suwaidi",
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
    h2: "Al Suwaidi taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Suwaidi?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange an airport transfer from Al Suwaidi?", a: "Yes. Send your flight number, the date and time, your terminal if you know it, and your passengers and bags. A return airport transfer can be requested in the same booking." },
      { q: "How far is Al Suwaidi from Riyadh Airport?", a: "About 50 km by road from the centre of the district. In light traffic the drive takes roughly 38 to 40 minutes, and busy times add time, because it is a long cross-city journey." },
      { q: "Can I request a return journey?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "Can I book a family taxi?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "What pickup details should I provide?", a: "A map pin or the street and building number, the compound name and gate if there is one, a nearby landmark, your destination and its entrance, the number of passengers and bags, and a phone number." },
      { q: "Can I book a ride to a hospital?", a: "Yes, as an ordinary private ride. Give the facility, the branch and the entrance. It is not an emergency or medical transport service, and we do not state where any hospital is." },
      { q: "Which Riyadh Metro stations are near Al Suwaidi?", a: "Al Suwaidi has no confirmed station of its own. An independent metro site lists Orange Line stations such as Dhahrat Al Badiah, Sultanah and Aishah bint Abi Bakr Street. Check the official Riyadh Metro information." },
      { q: "Is Western Station inside Al Suwaidi?", a: "No. Its listed location is in Al Suwaidi Al Gharbi, to the west. Al Suwaidi and Al Suwaidi Al Gharbi are different places." },
      { q: "Can I book a transfer to Dhahrat Al Badiah station?", a: "Yes. A ride to a station is a normal private ride, quoted for your request. Tell us your address and the entrance you want." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Can I travel from Al Suwaidi to Olaya or KAFD?", a: "Yes. Olaya is about 14 km by road and KAFD about 26 km. Name the tower and the entrance. We cannot promise access to controlled tower entrances." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Al Suwaidi",
    kind: "local",
    intro: "Find Al Suwaidi on the map, read how the main roads lead out of the district, and open nearby neighbourhoods, metro stations and major cities in Google Maps.",
    mapQuery: "24.5912,46.673",
    mapLabel: "Al Suwaidi, Riyadh",
    directionsTitle: "Driving Directions from Al Suwaidi, Riyadh",
    directions: ALSUWAIDI_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby south-west Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Orange Line metro stations (Line 3)", links: STATION_LINKS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: OTHERS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Major Saudi cities", links: CITIES.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: "Current Weather in Al Suwaidi, Riyadh",
    weather: { place: "Al Suwaidi, Riyadh", lat: 24.5912, lng: 46.673 },
  };

  return {
    title: "Al Suwaidi Taxi Service Riyadh | Home Pickups and Airport",
    description: "Al Suwaidi Taxi Service for home pickups, family rides, hospital and market trips, metro transfers and airport trips in Riyadh. Fare confirmed first.",
    h1: "Al Suwaidi Taxi Service in Riyadh",
    lead: "Al Suwaidi Taxi Service from Gulf Elite Transport: private rides from your home in Al Suwaidi for airport transfers, family journeys, market and hospital visits and city trips, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Suwaidi, a residential district in south-west Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, airport transfers to King Khalid International Airport (RUH), about 50 km by road across the city, family and group journeys, market and hospital visits and rides to Olaya (about 14 km by road) and KAFD. Al Suwaidi is a different place from Al Suwaidi Al Gharbi, and Western Station is on the western side, not in Al Suwaidi. Al Suwaidi has no confirmed metro station of its own. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 50 km by road" },
      { label: "Olaya", value: "about 14 km by road" },
      { label: "Ad Dirah", value: "about 8 km by road" },
      { label: "Area type", value: "residential, south-west Riyadh" },
    ],
    sections: addLinks(addImages(
      [about, journeys, airport, residential, community, business, metro, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local],
      me.name,
      {
        about: { slot: "al-suwaidi-neighbourhood", alt: "Villas and residential streets in Al Suwaidi, Riyadh", label: "Photo: al-suwaidi-neighbourhood.webp" },
        airport: { slot: "al-suwaidi-airport-transfer", alt: "A private airport transfer for passengers travelling between Al Suwaidi and Riyadh Airport", label: "Photo: al-suwaidi-airport-transfer.webp" },
        community: { slot: "al-suwaidi-local-destinations", alt: "A local street and market area near Al Suwaidi, Riyadh", label: "Photo: al-suwaidi-local-destinations.webp" },
      },
    ), ctx, "al-suwaidi"),
    whatsappMessage: ALSUWAIDI_WHATSAPP_MESSAGE,
  };
}
