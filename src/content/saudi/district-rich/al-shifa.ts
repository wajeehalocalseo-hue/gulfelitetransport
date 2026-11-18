import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Shifa Taxi Service: the hand-written landing page for Al Shifa (Ash Shifa), a residential district in south Riyadh (see district-rich/index.ts).
 * Primary focus keyword: "Al Shifa Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 *
 * IMAGES: three reserved slots (area, journey, pickup) from addImages' defaults. The owner's Drive folder (Al Shifa) holds five photos that are to be compressed and wired in later,
 * at the owner's request, as public/images/routes/riyadh-districts/al-shifa-taxi-service/<name>.webp with a custom map in addImages (see al-naseem.ts for the pattern).
 *
 * CENTRE POINT: riyadh-areas.ts stores Al Shifa at 24.5631/46.6967. The brief's reference (24.5763/46.6989) is about 1.5 km north of it. OpenStreetMap labels "Ash Shifa District" streets
 * Al Tirmizi (24.5693/46.7009), Dirab Road (24.5803/46.7035) and Al Khalil Ibn Ahmed (24.5475/46.6878) within about 2 km of the stored point on every side, so the shared point is used unchanged for the
 * weather and the road estimates. It is not an official centre.
 * Al Shifa is a district. The Al-Shifa Municipality covers several districts and OpenStreetMap lists Ash Shifa under the Namar municipality, so the page never calls the municipality "Al Shifa the neighbourhood".
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from that point):
 * RUH about 53 km and about 41 min (52.6 / 41); Olaya about 16 km and about 15 min (16.2 / 15); KAFD about 28 km and about 27 min (28.4 / 27); Ad Dirah about 10 km and about 11 min (9.9 / 11);
 * Al Murabba about 12 km and about 14 min (12.2 / 14); Al Malaz about 15 km and about 16 min (14.6 / 16); Al Aziziyah about 9 km and about 12 min (9.2 / 12).
 * Roads in the driving paragraph are those OSRM returns: Dirab Road, King Fahd Road, King Fahd Branch Road, Makkah Al Mukarramah Road, Eastern Ring Road, Airport Road, King Salman Road, Ibn Taymiyyah Road and An Nasar Road
 * (for Al Aziziyah). Al Khalil Bin Ahmad Road is not returned by any of these routes and OpenStreetMap search did not find it as a road, so it is not used.
 * Neighbouring districts found by OpenStreetMap search: Al Masani (24.5789/46.73), Badr (24.5287/46.7278), Okaz (24.5119/46.6649), Al Marwah (24.5387/46.6741), Al Hazm (24.5473/46.6536). Okaz, Al Marwah and Al Hazm are about 3 to 4 km away
 * and are described only as nearby districts, not as adjoining, because no boundary was checked.
 * Metro: no station in Al Shifa was found. The Al Aziziyah (24.5861/46.7612) and Ad Dar Al Baida (24.5596/46.7765) Blue Line stations come from the owner's brief, which cites RCRC open data; they were not re-checked here, so the
 * page says only that they are listed and gives a straight-line gap computed from those coordinates.
 * NOT verified / left out: Al Shifa Mall, City Mall, Al-Oudah Markets, Qamar Al Oroba Medical Complex, Namar Dam Lake Park, Okaz Park, Dallah Hospital Namar, Riyadh Driving School, Al Shifa Education Office (none found by
 * OpenStreetMap search), Ibn Taymiyyah and Al Khalil Bin Ahmad as boundary roads, the exact district boundary, opening hours or facilities of any venue, schools.
 * No partnership with any mall, park, hospital or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const ALSHIFA_DIRECTIONS =
  "Most drives from Al Shifa start on local streets and join Dirab Road. For central Riyadh and Olaya, routing data follows Dirab Road, King Fahd Road and King Fahd Branch Road. For King Khalid International Airport, it continues via Makkah Al Mukarramah Road, the Eastern Ring Road, Airport Road and King Salman Road. For Al Aziziyah, it uses Ibn Taymiyyah Road and then An Nasar Road. These roads come from OpenStreetMap routing and are only a guide. The best route depends on your exact pickup location, your destination entrance and current traffic. Please confirm your final pickup point with us.";

const STATION = { name: "Al Aziziyah", lat: 24.5861, lng: 46.7612 };

const DISTRICTS = ["Al Shifa", "Al Masani", "Al Aziziyah", "Al Marwah", "Okaz", "Badr", "Al Hazm", "Al Dar Al Baida", "Al Suwaidi", "Al Uraija", "Al Badiah", "Al Mansourah"];
const PLACES = ["Dirab Road", "Wadi Hanifah", "Al Aziziyah Metro Station", "Ad Dar Al Baida Metro Station"];
const OTHERS = ["Ad Dirah", "Al Murabba", "Al Malaz", "Olaya", "King Abdullah Financial District", "Diriyah", "King Khalid International Airport"];
const CITIES = ["Jeddah", "Dammam"];
const riyadhQuery = (n: string) => (/Metro Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const ALSHIFA_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Shifa, Riyadh. The trip is [for example a home pickup, a shopping trip, a family trip, a city transfer or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alShifaRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-shifa");
  if (!me) throw new Error("Al Shifa is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const stKm = fmtKm(haversine(me, STATION as unknown as CityArea));
  const stDir = compass(bearing(me, STATION as unknown as CityArea));

  const about = text("about", "Al Shifa: a residential district in south Riyadh", [
    "Al Shifa, also written Ash Shifa, is a residential district in the south of Riyadh. It is made up mostly of villas and apartment buildings, with shops, schools and mosques close to where people live. OpenStreetMap maps its streets alongside Dirab Road, and it lies near Al Masani, Al Aziziyah and the districts further south such as Badr, Okaz and Al Marwah.",
    "Al Shifa Taxi Service is for the ordinary journeys that fill a family's week. A household needs a comfortable ride to King Khalid International Airport with luggage. A parent needs a driver for a school run or an appointment. A worker wants to reach Olaya or Ad Dirah without driving and parking. Others want a car to the shops in the evening, a lift to a relative's home in another district, and a ride back afterwards.",
    "Many of these trips have a fixed time, such as a flight, a school bell or an appointment, which is why booking in advance helps. It lets you agree the pickup point and the return time before the day, and it lets us confirm a vehicle that suits your passengers and bags.",
    "The Al-Shifa Municipality covers several districts, and Al Shifa is only one of them, so this page is about the district itself. District boundaries are not drawn in exactly the same place on every map, and we name each nearby place by its own district.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Shifa",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Shifa to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Shifa to Riyadh Airport (RUH)", "about 53 km", "about 41 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Shifa to Olaya", "about 16 km", "about 15 min"], href: pairHref("olaya") },
      { cells: ["Al Shifa to KAFD", "about 28 km", "about 27 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Shifa to Ad Dirah", "about 10 km", "about 11 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Shifa to Al Murabba", "about 12 km", "about 14 min"], href: pairHref("al-murabba") },
      { cells: ["Al Shifa to Al Aziziyah", "about 9 km", "about 12 min"], href: pairHref("al-aziziyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Shifa and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const residential = text("residential", "Door-to-door pickups in Al Shifa", [
    "Most rides from Al Shifa start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a main-road junction. A location pin sent on WhatsApp is even better, because it marks exactly where you will be waiting.",
    "If you live in a compound or a building with a controlled entrance, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Please also share a phone number you will answer, how many passengers there are and how many bags. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const family = text("family", "Family and group rides from Al Shifa", [
    "Families in Al Shifa often book one ride for the whole group, whether it is a trip to relatives, a shopping outing or the airport run with suitcases. Tell us how many adults and children are travelling and how many bags you have. The vehicle is chosen from that information and confirmed with you before you commit, so there is no need to guess what will fit.",
    "For school runs, give the school and the exact gate, and allow extra time around start and finish times, because roads near schools can be busy at those hours. We do not name specific schools on this page, because we could not confirm their locations. Ask for the return pickup in the same request, with a time window, and tell us if your plans change.",
  ]);

  const airport = text("airport", "Airport transfers between Al Shifa and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 53 km from the centre of Al Shifa by road, which makes it one of the longer rides from the district. In light traffic the drive takes roughly 41 minutes, along Dirab Road, King Fahd Road, Makkah Al Mukarramah Road, the Eastern Ring Road and Airport Road according to routing data. Busy hours, the terminal you are using and your exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. Because the drive is long, allow generous time for an early flight and say so in the request, so the pickup time is agreed in advance. A return airport transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const business = text("business", "City and business journeys from Al Shifa", [
    "Olaya is about 16 km from Al Shifa by road, roughly 15 minutes in light traffic, via Dirab Road, King Fahd Road and King Fahd Branch Road according to routing data. Olaya has many towers, hotels and shopping streets, so give the name of the building you are going to. Ad Dirah in the old centre of the city is about 10 km away, roughly 11 minutes, Al Murabba is about 12 km away, roughly 14 minutes, and Al Malaz is about 15 km away, roughly 16 minutes.",
    "KAFD is about 28 km away by road, roughly 27 minutes, and has controlled tower entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and we do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business, and a booking is a private ride arranged for your request.",
  ]);

  const community = text("community", "Shops, healthcare and nearby places", [
    "We could not confirm the names and locations of the shopping centres, parks and clinics that people mention for Al Shifa, so this page does not name them. Wadi Hanifah, the long valley that runs through Riyadh, is a well-known destination in the south of the city, and its position relative to Al Shifa depends on which stretch you mean. Tell us the exact place and the entrance you want, and agree a meeting point the car can reach. We do not publish opening hours, facilities, parking or entrance details for any venue, and parking is not included in the fare.",
    "For a hospital or clinic visit, give the name of the facility, the branch and the entrance you need. A ride does not include any appointment, and it is not an emergency or medical transport service. For a school, give the school and the gate.",
  ]);

  const metro = text("metro", "Riyadh Metro near Al Shifa", [
    `We could not find a metro station inside Al Shifa. The nearest Blue Line (Line 1) station we have listed is Al Aziziyah, in the neighbouring Al Aziziyah district, about ${stKm} km to the ${stDir} of the centre of Al Shifa in a straight line. That is not a walking or driving distance, and we have not re-checked the station against the official operator, so please check the official Riyadh Metro information for current stations and services.`,
    "A taxi can take you from your door to a station, or collect you from it when you arrive with luggage, and it suits family groups, fixed pickup times and journeys the metro does not reach. We do not publish walking times, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters in a district of side streets and controlled entrances. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys a planned pickup time works backwards from your flight, and for school and appointment runs it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy school gates and shopping entrances. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["al-aziziyah", "al-dar-al-baida", "al-suwaidi", "al-uraija", "al-badiah"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Shifa",
    kind: "links",
    intro: "These districts are in south Riyadh, close to Al Shifa but not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 16 km by road" },
      { name: "Ad Dirah", href: ctx.districtHref("ad-dirah"), note: "The old centre of Riyadh, about 10 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, a shopping trip, a family trip, a city transfer or the airport), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Shifa",
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
    h2: "Al Shifa taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Shifa, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange an airport transfer from Al Shifa?", a: "Yes. The airport is about 53 km by road, roughly 41 minutes in light traffic. Send your flight number, the date and time, and your passengers and bags." },
      { q: "Is Al Shifa the same as the Al-Shifa Municipality?", a: "No. The municipality covers several districts. This page is for requests from the Al Shifa district and the streets around it, and you can also send us a map pin." },
      { q: "Which roads connect Al Shifa with other parts of Riyadh?", a: "According to routing data, drives join Dirab Road and lead on to King Fahd Road, King Fahd Branch Road, Makkah Al Mukarramah Road and the Eastern Ring Road. The best route depends on your pickup, destination and traffic." },
      { q: "Is there a Riyadh Metro station in Al Shifa?", a: "We could not find one. Al Aziziyah is the nearest Blue Line station we have listed, in a neighbouring district. Please check the official Riyadh Metro information." },
      { q: "Which neighbourhoods are near Al Shifa?", a: "Al Masani and Al Aziziyah are close, and Badr, Okaz, Al Marwah and Al Hazm lie further south and south-west. Each is a separate district." },
      { q: "Can I arrange a taxi to central Riyadh?", a: "Yes. Ad Dirah is about 10 km by road, roughly 11 minutes in light traffic, and Olaya is about 16 km, roughly 15 minutes. Name the place and the entrance." },
      { q: "What information should I provide when requesting a booking?", a: "A map pin or the street and building number, the compound name and gate if there is one, your destination and its entrance, the date and time, the number of passengers and bags, and a phone number." },
      { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Do journey times change during the day?", a: "Yes. The times on this page are for light traffic, and busy hours, your exact pickup and the entrance of your destination change them. They are not promised journey times." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Al Shifa",
    kind: "local",
    intro: "Find Al Shifa on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
    mapQuery: "24.5631,46.6967",
    mapLabel: "Al Shifa, Riyadh",
    directionsTitle: "Driving Directions from Al Shifa, Riyadh",
    directions: ALSHIFA_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby south Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Roads, valley and metro stations", links: PLACES.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: OTHERS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Saudi cities", links: CITIES.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: "Current Weather in Al Shifa, Riyadh",
    weather: { place: "Al Shifa, Riyadh", lat: 24.5631, lng: 46.6967 },
  };

  return {
    title: "Al Shifa Taxi Service Riyadh | Home Pickups and Airport",
    description: "Al Shifa Taxi Service for home pickups, family and shopping rides, city trips and airport rides from south Riyadh. Fare confirmed before you commit.",
    h1: "Al Shifa Taxi Service in Riyadh",
    lead: "Al Shifa Taxi Service from Gulf Elite Transport: private rides from your home in Al Shifa for family trips, shopping, city journeys and airport transfers, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Shifa, a residential district in south Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, shopping and school trips, rides to central Riyadh, and airport transfers to King Khalid International Airport (RUH), about 53 km by road. A booking does not give entry to private property or controlled entrances. Al Shifa has no metro station of its own that we could find. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 53 km by road" },
      { label: "Olaya", value: "about 16 km by road" },
      { label: "Ad Dirah", value: "about 10 km by road" },
      { label: "Area type", value: "residential, south Riyadh" },
    ],
    sections: addLinks(
      addImages(
        [about, journeys, residential, family, airport, business, community, metro, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local],
        me.name,
      ),
      ctx,
      "al-shifa",
    ),
    whatsappMessage: ALSHIFA_WHATSAPP_MESSAGE,
  };
}
