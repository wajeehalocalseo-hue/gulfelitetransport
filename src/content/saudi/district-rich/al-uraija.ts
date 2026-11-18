import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Uraija Taxi Service: the hand-written landing page for Al Uraija (Al Uraija Al Wusta / Al Uraija Al Gharbiyah area), a residential district in west Riyadh (see district-rich/index.ts).
 * Primary focus keyword: "Al Uraija Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 *
 * IMAGES: three reserved slots (area, journey, pickup) from addImages' defaults. No Drive photos exist yet for this page. Add them later as
 * public/images/routes/riyadh-districts/al-uraija-taxi-service/<name>.webp with a custom map in addImages (see al-naseem.ts for the pattern).
 *
 * CENTRE POINT: riyadh-areas.ts stores Al Uraija at 24.6257/46.6566. It is used unchanged for the weather and the road estimates. It is not an official centre and it does not distinguish between
 * Al Uraija Al Wusta and Al Uraija Al Gharbiyah, so the page does not claim either sub-area.
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from that point):
 * RUH about 48 km and about 39 min (47.6 / 39); Olaya about 11 km and about 14 min (11.3 / 14); KAFD about 24 km and about 26 min (23.5 / 26); Ad Dirah about 6 km and about 10 min (6.2 / 10);
 * Al Malaz about 11 km and about 14 min (10.6 / 14); Al Murabba about 8 km and about 12 min (8.3 / 12).
 * Roads in the driving paragraph are those OSRM returns: Al Uraija Street (first road returned), King Saud Road, Makkah Al Mukarramah Road, Eastern Ring Road, Airport Road, King Salman Road, King Fahd Branch Road,
 * King Fahd Road, Al Washm Street. The brief's Al Madinah Al Munawwarah Road, Hamza Ibn Abdul Muttalib Road, Al Uraija General Street and Aishah bint Abi Bakr Street were not returned by these routes
 * (Aishah bint Abi Bakr Street appears only as a metro station name), so they are not stated as roads of the district.
 * Metro (independent site riyadhmetro.org, checked 18 Nov 2026; official sources not reachable): Dhahrat Al Badiah is an elevated Line 3 (Orange) station at 24.6074/46.6550, listed as opened 2025, between Aishah bint Abi Bakr Street
 * and Sultanah. The page also says another line is reachable there, which contradicts its own infobox, so only Line 3 is stated. Station code and park-and-ride are not stated, so none are claimed.
 * Neighbouring districts: Al Badiah, Al Suwaidi, Al Irqah and Dhahrat Laban come from the site's own district list; Manfuhah (24.5958/46.7278), Ghubayra (24.6223/46.7390), Al Khalidiyah (24.6246/46.7559) were found by OpenStreetMap search.
 * No boundary was checked, so they are described as nearby only.
 * NOT verified / left out: Alharam Plaza, Al Badiah Plaza, Al Douh Park, Al Uraija Al Wusta Park, Triangle Park, Wadi Rahat, all clinics, hospitals and schools, the exact district boundary, opening hours or facilities of any venue.
 * No partnership with any mall, park or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const ALURAIJA_DIRECTIONS =
  "Most drives from Al Uraija start on Al Uraija Street. For King Khalid International Airport, routing data uses King Saud Road, Makkah Al Mukarramah Road, Eastern Ring Road, Airport Road and King Salman Road. For Olaya and KAFD, it follows King Saud Road, King Fahd Branch Road and King Fahd Road. For Ad Dirah, it uses King Fahd Branch Road. For Al Malaz, it uses Al Washm Street. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup location, your destination entrance and current traffic. Please confirm your pickup point with us.";

const STATION = { name: "Dhahrat Al Badiah", lat: 24.6074, lng: 46.655 };

const DISTRICTS = ["Al Uraija", "Al Badiah", "Dhahrat Al Badiah", "Al Suwaidi", "Al Irqah", "Dhahrat Laban", "Al Shifa", "Manfuhah", "Ghubayra", "Al Khalidiyah", "Al Masani", "Al Aziziyah"];
const PLACES = ["Dhahrat Al Badiah Metro Station", "Aishah bint Abi Bakr Street Metro Station", "Sultanah Metro Station", "Wadi Hanifah"];
const OTHERS = ["Ad Dirah", "Al Murabba", "Al Malaz", "Olaya", "King Abdullah Financial District", "Diriyah", "King Khalid International Airport"];
const CITIES = ["Jeddah", "Dammam"];
const riyadhQuery = (n: string) => (/Metro Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const ALURAIJA_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Uraija, Riyadh. The trip is [for example a home pickup, a shopping trip, a family trip, a transfer to or from Dhahrat Al Badiah metro station or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alUraijaRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-uraija");
  if (!me) throw new Error("Al Uraija is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const stKm = fmtKm(haversine(me, STATION as unknown as CityArea));
  const stDir = compass(bearing(me, STATION as unknown as CityArea));

  const about = text("about", "Al Uraija: a residential district in west Riyadh", [
    "Al Uraija, also written Al Oraija or Al Uraija Al Wusta in part of the district, is a residential district in the west of Riyadh. It is made up mostly of villas and apartment buildings, with shops, schools and mosques close to where people live. It lies near Al Badiah, Al Suwaidi and Dhahrat Al Badiah, and it is closer to Ad Dirah and the old centre of Riyadh than most western districts. Maps split the area into sub-areas such as Al Uraija Al Wusta and Al Uraija Al Gharbiyah, and this page covers requests from the district as a whole.",
    "Al Uraija Taxi Service is for the ordinary journeys that fill a family's week. A household needs a comfortable ride to King Khalid International Airport with luggage. A parent needs a driver for a school run or an appointment. A worker wants to reach Ad Dirah, Olaya or Al Malaz without driving and parking. Others want a car to the shops or the metro, a lift to relatives in another district, and a ride home afterwards.",
    "Many of these trips have a fixed time, such as a flight, a school bell or an appointment, which is why booking in advance helps. It lets you agree the pickup point and the return time before the day, and it lets us confirm a vehicle that suits your passengers and bags.",
    "District boundaries are not drawn in exactly the same place on every map, and several places nearby belong to neighbouring districts, so we name each place by its own district.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Uraija",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Uraija to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Uraija to Riyadh Airport (RUH)", "about 48 km", "about 39 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Uraija to Olaya", "about 11 km", "about 14 min"], href: pairHref("olaya") },
      { cells: ["Al Uraija to KAFD", "about 24 km", "about 26 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Uraija to Ad Dirah", "about 6 km", "about 10 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Uraija to Al Malaz", "about 11 km", "about 14 min"], href: pairHref("al-malaz") },
      { cells: ["Al Uraija to Al Murabba", "about 8 km", "about 12 min"], href: pairHref("al-murabba") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Uraija and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const residential = text("residential", "Door-to-door pickups in Al Uraija", [
    "Most rides from Al Uraija start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a main-road junction. A location pin sent on WhatsApp is even better, because it marks exactly where you will be waiting, and it shows us which part of Al Uraija you are in.",
    "If you live in a compound or a building with a controlled entrance, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Please also share a phone number you will answer, how many passengers there are and how many bags. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const family = text("family", "Family and group rides from Al Uraija", [
    "Families in Al Uraija often book one ride for the whole group, whether it is a trip to relatives, a shopping outing or the airport run with suitcases. Tell us how many adults and children are travelling and how many bags you have. The vehicle is chosen from that information and confirmed with you before you commit, so there is no need to guess what will fit.",
    "For school runs, give the school and the exact gate, and allow extra time around start and finish times, because roads near schools can be busy at those hours. We do not name specific schools on this page, because we could not confirm their locations. Ask for the return pickup in the same request, with a time window, and tell us if your plans change.",
  ]);

  const airport = text("airport", "Airport transfers between Al Uraija and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 48 km from the centre of Al Uraija by road, which makes it a long ride from the west of the city. In light traffic the drive takes roughly 39 minutes, along King Saud Road, Makkah Al Mukarramah Road, the Eastern Ring Road and Airport Road according to routing data. Busy hours, the terminal you are using and your exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. Because the drive is long, allow generous time for an early flight and say so in the request, so the pickup time is agreed in advance. A return airport transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const business = text("business", "City and business journeys from Al Uraija", [
    "Ad Dirah in the old centre of Riyadh is about 6 km from Al Uraija by road, roughly 10 minutes in light traffic, so it is one of the shortest city rides from the district. Al Murabba is about 8 km away, roughly 12 minutes, and Al Malaz is about 11 km away, roughly 14 minutes. Olaya is about 11 km away, roughly 14 minutes, via King Saud Road, King Fahd Branch Road and King Fahd Road according to routing data. Olaya has many towers, hotels and shopping streets, so give the name of the building you are going to.",
    "KAFD is about 24 km away by road, roughly 26 minutes, and has controlled tower entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and we do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business, and a booking is a private ride arranged for your request.",
  ]);

  const community = text("community", "Shops, parks and nearby places", [
    "We could not confirm the current names, locations and status of the shopping plazas, parks and valleys that people mention for Al Uraija, so this page does not name them. Tell us the exact place and the entrance you want, and agree a meeting point the car can reach. We do not publish opening hours, facilities, parking or entrance details for any venue, and parking is not included in the fare.",
    "For a hospital or clinic visit, give the name of the facility, the branch and the entrance you need. A ride does not include any appointment, and it is not an emergency or medical transport service. Several well-known places near Al Uraija sit in neighbouring districts such as Al Badiah and Dhahrat Al Badiah, so tell us which district your destination is in.",
  ]);

  const metro = text("metro", "Riyadh Metro near Al Uraija", [
    `We could not confirm a metro station inside Al Uraija. An independent Riyadh Metro information site lists Dhahrat Al Badiah as an elevated station on Line 3 (Orange), between Aishah bint Abi Bakr Street and Sultanah. Its listed coordinates put it about ${stKm} km to the ${stDir} of the centre of Al Uraija, in a straight line. That is not a walking or driving distance, and Dhahrat Al Badiah is a nearby station, not an Al Uraija station. The station was listed as opened in 2025.`,
    "We could not check this against the official operator, and the site does not mention a park-and-ride, so we do not claim one. Please check the official Riyadh Metro information for current stations and services. Not every address in Al Uraija is within walking distance of the station. A taxi can take you from your door to a station, or collect you from it when you arrive with luggage, and it suits family groups, fixed pickup times and journeys the metro does not reach. We do not publish walking times, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters in a district of side streets and controlled entrances. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys a planned pickup time works backwards from your flight, and for school and appointment runs it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy school gates and shopping entrances. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["al-badiah", "al-suwaidi", "al-irqah", "dhahrat-laban", "al-murabba"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Uraija",
    kind: "links",
    intro: "These districts are in west and south-west Riyadh, close to Al Uraija but not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 11 km by road" },
      { name: "Ad Dirah", href: ctx.districtHref("ad-dirah"), note: "The old centre of Riyadh, about 6 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, a shopping trip, a family trip, a transfer to or from the metro station or the airport), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Uraija",
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
    h2: "Al Uraija taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Uraija, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange an airport transfer from Al Uraija?", a: "Yes. The airport is about 48 km by road, roughly 39 minutes in light traffic. Send your flight number, the date and time, and your passengers and bags." },
      { q: "Does this page cover Al Uraija Al Wusta and Al Uraija Al Gharbiyah?", a: "You can request a pickup anywhere in the district. Maps label sub-areas differently, so send a map pin and we confirm the pickup point with you." },
      { q: "Which roads connect Al Uraija with other parts of Riyadh?", a: "According to routing data, drives start on Al Uraija Street and lead on to King Saud Road, King Fahd Branch Road, Makkah Al Mukarramah Road and the Eastern Ring Road. The best route depends on your pickup, destination and traffic." },
      { q: "Is there a Riyadh Metro station in Al Uraija?", a: "We could not confirm one. An independent metro site lists Dhahrat Al Badiah on Line 3 (Orange) as a nearby station. Check the official Riyadh Metro information." },
      { q: "Which neighbourhoods are near Al Uraija?", a: "Al Badiah, Al Suwaidi, Al Irqah and Dhahrat Laban are close in west and south-west Riyadh. Each is a separate district." },
      { q: "Can I arrange a taxi to central Riyadh?", a: "Yes. Ad Dirah is about 6 km by road, roughly 10 minutes in light traffic, and Olaya is about 11 km, roughly 14 minutes. Name the place and the entrance." },
      { q: "What information should I provide when requesting a booking?", a: "A map pin or the street and building number, the compound name and gate if there is one, your destination and its entrance, the date and time, the number of passengers and bags, and a phone number." },
      { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Do journey times change during the day?", a: "Yes. The times on this page are for light traffic, and busy hours, your exact pickup and the entrance of your destination change them. They are not promised journey times." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Al Uraija",
    kind: "local",
    intro: "Find Al Uraija on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
    mapQuery: "24.6257,46.6566",
    mapLabel: "Al Uraija, Riyadh",
    directionsTitle: "Driving Directions from Al Uraija, Riyadh",
    directions: ALURAIJA_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby west and south Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Metro stations and the valley", links: PLACES.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: OTHERS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Saudi cities", links: CITIES.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: "Current Weather in Al Uraija, Riyadh",
    weather: { place: "Al Uraija, Riyadh", lat: 24.6257, lng: 46.6566 },
  };

  return {
    title: "Al Uraija Taxi Service Riyadh | Home Pickups and Airport",
    description: "Al Uraija Taxi Service for home pickups, family and shopping rides, city trips, metro transfers and airport rides in west Riyadh. Fare confirmed first.",
    h1: "Al Uraija Taxi Service in Riyadh",
    lead: "Al Uraija Taxi Service from Gulf Elite Transport: private rides from your home in Al Uraija for family trips, shopping, city journeys, metro transfers and airport transfers, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Uraija, a residential district in west Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, shopping and school trips, rides to central Riyadh and to a nearby metro station, and airport transfers to King Khalid International Airport (RUH), about 48 km by road. A booking does not give entry to private property or controlled entrances. Al Uraija has no metro station of its own that we could confirm. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 48 km by road" },
      { label: "Ad Dirah", value: "about 6 km by road" },
      { label: "Olaya", value: "about 11 km by road" },
      { label: "Area type", value: "residential, west Riyadh" },
    ],
    sections: addLinks(
      addImages([about, journeys, residential, family, airport, business, community, metro, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local], me.name),
      ctx,
      "al-uraija",
    ),
    whatsappMessage: ALURAIJA_WHATSAPP_MESSAGE,
  };
}
