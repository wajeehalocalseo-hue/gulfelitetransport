import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Rabwah Taxi Service: the hand-written landing page for Al Rabwah (Ar Rabwah), a residential district in east Riyadh (see district-rich/index.ts).
 * Primary focus keyword: "Al Rabwah Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 *
 * IMAGES: the owner's Google Drive folder (Al Rabwah subfolder) supplied five photos, compressed to 1000 x 563 WebP and saved in
 * public/images/routes/riyadh-districts/al-rabwah-taxi-service/ under their own descriptive names (about, residential, family, business, airport sections).
 * The photos show premium cars and drivers. The page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts stores Al Rabwah at 24.6934/46.7589 (the brief's value). OpenStreetMap labels Al Othaim Mall (24.6857/46.7749), Al Nahda Park (24.6956/46.7511), Al Thimar Park (24.6886/46.7386)
 * and a Jarir Bookstore (24.6918/46.7661) as Al Rabwah, all within about 1.8 km of it, so the shared point is used unchanged.
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from the Al Rabwah centre):
 * RUH about 35 km and about 27 min (34.9 km / 27 min); KAFD about 23 km and about 23 min (23.2 / 23); Olaya about 11 km and about 12 min (11.0 / 12); Ad Dirah about 11 km and about 13 min (11.0 / 13);
 * Diriyah about 26 km and about 26 min (26.5 / 26); Al Malaz about 6 km and about 7 min (5.8 / 7).
 * Roads in the driving paragraph are those OSRM returns: Omar Bin Abdulaziz Road, Eastern Ring Road, Airport Road, King Salman Road, Al Ahsa Street, Makkah Al Mukarramah Road,
 * King Fahd Branch Road, Salah Al Din Al Ayyubi Road. Al Nahda Road did not appear on any of these routes, so it is not used. The Eastern Ring Road Exit 14 and 15 wording in the brief comes from a
 * retailer prospectus we could not open, so no exit numbers are stated.
 * Places: OpenStreetMap places King Abdullah Park and Prince Faisal bin Fahd Sports City Stadium (24.6626/46.7399) in Al Malaz, not in Al Rabwah. King Abdulaziz Historical Center is in Al Murabba.
 * Metro (independent site riyadhmetro.org, checked 18 Nov 2026): Jarir District is an elevated Line 3 (Orange) station between Al Malaz and Al Rajhi Grand Mosque, listed at 24.6730/46.7605, opened 2025, no interchange;
 * Al Rajhi Grand Mosque (24.6797/46.7785) is the next station east. None of the pages mentions Al Rabwah or a park-and-ride, and the official rpt.sa site returned 403, so no park-and-ride is claimed. Straight-line distances
 * are computed from the listed coordinates.
 * NOT verified / left out: opening hours or facilities of any mall, park or store, Al Mazen Park and the Chinese Garden (not found), schools, hospitals, the exact district boundary.
 * No partnership with any mall, store, park or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const ALRABWAH_DIRECTIONS =
  "Most drives from Al Rabwah start on Omar Bin Abdulaziz Road or the Eastern Ring Road. For King Khalid International Airport, routing data follows the Eastern Ring Road, then Airport Road and King Salman Road. For Olaya, it uses Makkah Al Mukarramah Road and King Fahd Branch Road. For Ad Dirah and Al Malaz, it follows Omar Bin Abdulaziz Road and Salah Al Din Al Ayyubi Road. These roads come from OpenStreetMap routing and are only a guide. The best route depends on your exact pickup location, your destination entrance and current traffic. Please confirm your pickup point with us.";

const STATION = { name: "Jarir District", lat: 24.673, lng: 46.7605 };

const DISTRICTS = ["Al Rabwah", "Jarir", "Al Zahra", "Al Rawabi", "Al Rayyan", "Al Safa", "Al Malaz", "Al Nahdah", "Al Faisaliyah", "Al Manar", "Al Salam", "Al Naseem", "Al Quds"];
const PLACES = ["Al Othaim Mall Al Rabwah", "Al Nahda Park", "Jarir Bookstore Al Rabwah", "Prince Faisal bin Fahd Stadium", "King Abdullah Park", "Jarir District Metro Station", "Al Rajhi Grand Mosque Metro Station"];
const OTHERS = ["Olaya", "Ad Dirah", "King Khalid International Airport"];
const CITIES = ["Jeddah", "Dammam"];
const riyadhQuery = (n: string) => (/Metro Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const ALRABWAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Rabwah, Riyadh. The trip is [for example a home pickup, a shopping trip, a family trip, a transfer to or from Jarir District metro station or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alRabwahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-rabwah");
  if (!me) throw new Error("Al Rabwah is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const stKm = fmtKm(haversine(me, STATION as unknown as CityArea));
  const stDir = compass(bearing(me, STATION as unknown as CityArea));

  const about = text("about", "Al Rabwah: a residential district in east Riyadh", [
    "Al Rabwah, also written Ar Rabwah, is a residential district in the east of Riyadh. It is made up mostly of villas and apartment buildings, with shops, schools, mosques and parks close to where people live. OpenStreetMap places a large shopping mall, several parks and a bookstore in the district, and it lies close to Al Malaz and Al Rawabi.",
    "Al Rabwah Taxi Service is for the ordinary journeys that fill a family's week. A household needs a comfortable ride to King Khalid International Airport with luggage. A parent needs a driver for a school run or an appointment. A worker wants to reach Olaya or Ad Dirah without driving and parking. Others want a car to the mall or a park in the evening, and a ride home afterwards.",
    "Many of these trips have a fixed time, such as a flight, a school bell or an appointment, which is why booking in advance helps. It lets you agree the pickup point and the return time before the day, and it lets us confirm a vehicle that suits your passengers and bags.",
    "District boundaries are not drawn in exactly the same place on every map, and several well-known places nearby belong to neighbouring districts. We name each place by its own district below.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Rabwah",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Rabwah to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Rabwah to Riyadh Airport (RUH)", "about 35 km", "about 27 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Rabwah to Olaya", "about 11 km", "about 12 min"], href: pairHref("olaya") },
      { cells: ["Al Rabwah to Ad Dirah", "about 11 km", "about 13 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Rabwah to KAFD", "about 23 km", "about 23 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Rabwah to Diriyah", "about 26 km", "about 26 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Rabwah and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const residential = text("residential", "Door-to-door pickups in Al Rabwah", [
    "Most rides from Al Rabwah start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a main-road junction. A location pin sent on WhatsApp is even better, because it marks exactly where you will be waiting.",
    "If you live in a compound or a building with a controlled entrance, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Please also share a phone number you will answer, how many passengers there are and how many bags. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const family = text("family", "Family and group rides from Al Rabwah", [
    "Families in Al Rabwah often book one ride for the whole group, whether it is a trip to relatives, an outing to a park or the airport run with suitcases. Tell us how many adults and children are travelling and how many bags you have. The vehicle is chosen from that information and confirmed with you before you commit, so there is no need to guess what will fit.",
    "For school runs, give the school and the exact gate, and allow extra time around start and finish times, because roads near schools can be busy at those hours. We do not name specific schools on this page, because we could not confirm their locations. Ask for the return pickup in the same request, with a time window, and tell us if your plans change.",
  ]);

  const airport = text("airport", "Airport transfers between Al Rabwah and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 35 km from the centre of Al Rabwah by road. In light traffic the drive takes roughly 27 minutes, mostly along the Eastern Ring Road and Airport Road. Busy hours, the terminal you are using and your exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. If your flight leaves very early or lands late at night, say so in the request, so the pickup time is agreed in advance. A return airport transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const business = text("business", "City and business journeys from Al Rabwah", [
    "Olaya is about 11 km from Al Rabwah by road, roughly 12 minutes in light traffic, via Al Ahsa Street and Makkah Al Mukarramah Road according to routing data. Olaya has many towers, hotels and shopping streets, so give the name of the building you are going to. Ad Dirah in the old centre of the city is also about 11 km away, roughly 13 minutes, and Al Malaz is about 6 km away, roughly 7 minutes.",
    "KAFD is about 23 km away by road, roughly 23 minutes, and has controlled tower entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and we do not promise access to towers or private car parks. Diriyah is about 26 km away, roughly 26 minutes. Gulf Elite Transport has no partnership with KAFD or any business, and a booking is a private ride arranged for your request.",
  ]);

  const community = text("community", "Shopping, parks and nearby places", [
    "OpenStreetMap places Al Othaim Mall in Al Rabwah, on Zuhair bin Al Musayyab street, and a Jarir Bookstore branch on Prince Mitaeb bin Abdulaziz Street. It also places Al Nahda Park and Al Thimar Park in Al Rabwah. We could not confirm the current names of every venue, and we do not publish opening hours, facilities, parking or entrance details. Check each place's own information, tell us the entrance you want and agree a meeting point the car can reach. Parking is not included in the fare.",
    "Some well-known places near Al Rabwah are in other districts. King Abdullah Park and Prince Faisal bin Fahd Sports City Stadium are in Al Malaz, and the King Abdulaziz Historical Center is in Al Murabba. For a stadium event or a busy evening at the mall, ask for the return pickup in the same request, because exits are crowded, and agree a meeting point a short walk from the crowd.",
    "For a hospital or clinic visit, give the name of the facility, the branch and the entrance you need. A ride does not include any appointment, and it is not an emergency or medical transport service.",
  ]);

  const metro = text("metro", "Riyadh Metro near Al Rabwah", [
    `Al Rabwah does not have a metro station of its own that we could confirm. An independent Riyadh Metro information site lists Jarir District as an elevated station on Line 3 (Orange), between Al Malaz and Al Rajhi Grand Mosque. Its listed coordinates put it about ${stKm} km to the ${stDir} of the centre of Al Rabwah, in a straight line. That is not a walking or driving distance, and Jarir District is a nearby station, not an Al Rabwah station. The station was listed as opened in 2025.`,
    "We could not check this against the official operator, and the site does not mention a park-and-ride for these stations, so we do not claim one. Please check the official Riyadh Metro information for current stations and services. A taxi can take you from your door to a station, or collect you from it when you arrive with luggage, and it suits family groups, fixed pickup times and journeys the metro does not reach. We do not publish walking times, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters in a district of side streets and controlled entrances. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys a planned pickup time works backwards from your flight, and for school and appointment runs it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy mall entrances and school gates. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["al-malaz", "al-rawdah", "al-quds", "al-naseem"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Rabwah",
    kind: "links",
    intro: "These districts are close to Al Rabwah but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 11 km by road" },
      { name: "Ad Dirah", href: ctx.districtHref("ad-dirah"), note: "The old centre of Riyadh, about 11 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, a shopping trip, a family trip, a transfer to or from the metro station or the airport), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Rabwah",
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
    h2: "Al Rabwah taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Rabwah, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange an airport transfer from Al Rabwah?", a: "Yes. The airport is about 35 km by road, roughly 27 minutes in light traffic. Send your flight number, the date and time, and your passengers and bags." },
      { q: "Is Al Othaim Mall in Al Rabwah a useful pickup reference?", a: "OpenStreetMap places it in Al Rabwah. Tell us the entrance you want or agree a meeting point the car can reach. We cannot promise a particular entrance or waiting spot, and we do not state the mall's hours or parking." },
      { q: "Which roads connect Al Rabwah with other parts of Riyadh?", a: "According to routing data, drives start on Omar Bin Abdulaziz Road or the Eastern Ring Road, and lead on to Airport Road, Al Ahsa Street and Makkah Al Mukarramah Road. The best route depends on your pickup, destination and traffic." },
      { q: "Is there a Riyadh Metro station inside Al Rabwah?", a: "We could not confirm one. An independent metro site lists Jarir District on Line 3 (Orange) as a nearby station. Check the official Riyadh Metro information." },
      { q: "Which neighbourhoods are near Al Rabwah?", a: "Al Malaz, Al Rawdah and Al Quds are close. King Abdullah Park and Prince Faisal bin Fahd Sports City Stadium are in Al Malaz, not in Al Rabwah." },
      { q: "Can I arrange a taxi to central Riyadh?", a: "Yes. Olaya and Ad Dirah are each about 11 km by road, roughly 12 to 13 minutes in light traffic. Name the place and the entrance." },
      { q: "What information should I provide when requesting a booking?", a: "A map pin or the street and building number, the compound name and gate if there is one, your destination and its entrance, the date and time, the number of passengers and bags, and a phone number." },
      { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Do journey times change during the day?", a: "Yes. The times on this page are for light traffic, and busy hours, your exact pickup and the entrance of your destination change them. They are not promised journey times." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Al Rabwah",
    kind: "local",
    intro: "Find Al Rabwah on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
    mapQuery: "24.6934,46.7589",
    mapLabel: "Al Rabwah, Riyadh",
    directionsTitle: "Driving Directions from Al Rabwah, Riyadh",
    directions: ALRABWAH_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby east and central Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Local places and metro stations", links: PLACES.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: OTHERS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Saudi cities", links: CITIES.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: "Current Weather in Al Rabwah, Riyadh",
    weather: { place: "Al Rabwah, Riyadh", lat: 24.6934, lng: 46.7589 },
  };

  return {
    title: "Al Rabwah Taxi Service Riyadh | Home Pickups and Airport",
    description: "Al Rabwah Taxi Service for home pickups, family and shopping rides, city trips, metro transfers and airport rides in Riyadh. Fare confirmed first.",
    h1: "Al Rabwah Taxi Service in Riyadh",
    lead: "Al Rabwah Taxi Service from Gulf Elite Transport: private rides from your home in Al Rabwah for family trips, shopping, city journeys and airport transfers, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Rabwah, a residential district in east Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, shopping and school trips, rides to central Riyadh and to a nearby metro station, and airport transfers to King Khalid International Airport (RUH), about 35 km by road. A booking does not give entry to private property or controlled entrances. Al Rabwah has no metro station of its own that we could confirm. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 35 km by road" },
      { label: "Olaya", value: "about 11 km by road" },
      { label: "Ad Dirah", value: "about 11 km by road" },
      { label: "Area type", value: "residential, east Riyadh" },
    ],
    sections: addLinks(
      addImages(
        [about, journeys, residential, family, airport, business, community, metro, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local],
        me.name,
        {
          about: { slot: "al-rabwah-private-taxi-service-riyadh", alt: "A driver standing beside a silver private car on a quiet residential street with apartment buildings", label: "Photo: al-rabwah-private-taxi-service-riyadh", w: 1000, h: 563 },
          residential: { slot: "al-rabwah-door-to-door-taxi-pickup", alt: "A driver opening the rear door of a dark red private car for a passenger on a city street", label: "Photo: al-rabwah-door-to-door-taxi-pickup", w: 1000, h: 563 },
          family: { slot: "al-rabwah-family-group-taxi-service", alt: "A family with luggage next to a dark blue van while a driver loads a suitcase", label: "Photo: al-rabwah-family-group-taxi-service", w: 1000, h: 563 },
          airport: { slot: "al-rabwah-to-riyadh-airport-transfer", alt: "A driver and a traveller with a suitcase beside a white van at an airport terminal entrance", label: "Photo: al-rabwah-to-riyadh-airport-transfer", w: 1000, h: 563 },
          business: { slot: "al-rabwah-to-olaya-ad-dirah-city-taxi", alt: "A white private car driving along a palm-lined road with the Kingdom Centre tower in the background", label: "Photo: al-rabwah-to-olaya-ad-dirah-city-taxi", w: 1000, h: 563 },
        },
      ),
      ctx,
      "al-rabwah",
    ),
    whatsappMessage: ALRABWAH_WHATSAPP_MESSAGE,
  };
}
