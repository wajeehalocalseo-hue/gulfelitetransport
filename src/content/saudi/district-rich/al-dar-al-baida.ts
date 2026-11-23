import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Dar Al Baida Taxi Service: the hand-written landing page for Al Dar Al Baida (Ad Dar Al Baida), a residential district on the southern edge of Riyadh (see district-rich/index.ts).
 * Primary focus keyword: "Al Dar Al Baida Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 * Not the Al Dar Al Baida of Riyadh Region (25.1664/45.3935); the page uses only the south Riyadh district.
 *
 * IMAGES: five photos from the owner's Google Drive (Al Dar Al Baida folder), resized to 1000 px wide WebP (35-115 KB) in public/images/routes/riyadh-districts/al-dar-al-baida-taxi-service/ and placed in the about, residential, family, airport, business sections. The photos show cars and drivers; the page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts stores Al Dar Al Baida at 24.5647/46.7883. The metro station (24.5596/46.7765) is about 1.3 km west-south-west of it and is NOT used as the district centre; the stored point is used
 * unchanged for the weather and the road estimates. It is not an official centre.
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from that point):
 * RUH about 52 km and about 43 min (52.1 / 43); Olaya about 21 km and about 25 min (20.9 / 25); KAFD about 33 km and about 36 min (33.1 / 36); Ad Dirah about 14 km and about 20 min (14.2 / 20);
 * Al Malaz about 16 km and about 19 min (15.6 / 19); Al Murabba about 16 km and about 21 min (16.1 / 21).
 * Roads in the driving paragraph are those OSRM returns: Arafat Road, Omar Bin Al Khattab Road, Eastern Ring Road, Airport Road, King Salman Road, Mohammed Rashid Rida Street, Al Hair Road, King Fahd Road,
 * Al Madinah Al Munawwarah Road. Al Kharj Road, Al Yaqout Road and Southern Ring Road did not appear on these routes, so they are not used and no boundary is stated. The brief's neighbour list
 * (Al Aziziyah north, Taybah and Al Mansourah south, Al Defaa east, Al Masani west) was not verified, so the page only says these districts are nearby.
 * Metro (independent site riyadhmetro.org, checked 18 Nov 2026; official sources not reachable): Ad Dar Al Baida is an elevated station at 24.5596/46.7765 and the southern terminus of Line 1 (Blue),
 * listed as opened in 2024, after Al Aziziah. Station code and park-and-ride are not stated, so none are claimed. The brief's RCRC code S25 was not re-checked.
 * Neighbouring districts found by OpenStreetMap search: Al Manakh (24.6085/46.8031), Manfuhah (24.5958/46.7278), Al Masani (24.5789/46.7300), Ghubayra, Al Khalidiyah. Al Aziziyah, Al Shifa, Al Mansourah and Al Suwaidi
 * come from the site's own district list.
 * NOT verified / left out: Taybah, Al Defaa, Al Uraija as neighbours, Haraj Bin Qasim Market, Al Aziziyah Mall, Manakh King Abdulaziz Park, Wadi Namar, all clinics, hospitals, police and schools (none found by OpenStreetMap
 * search), the exact district boundary, opening hours or facilities of any venue.
 * No partnership with any mall, market, park or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const ALDARALBAIDA_DIRECTIONS =
  "Most drives from Al Dar Al Baida join Arafat Road. For King Khalid International Airport, routing data continues on Omar Bin Al Khattab Road, the Eastern Ring Road, Airport Road and King Salman Road. For Olaya and KAFD, it uses Mohammed Rashid Rida Street, Arafat Road, Al Hair Road and King Fahd Road. For Ad Dirah, it follows Al Hair Road and Al Madinah Al Munawwarah Road. These roads come from OpenStreetMap routing and are only a guide. The best route depends on your exact pickup location, your destination entrance and current traffic. Please confirm your pickup point with us.";

const STATION = { name: "Ad Dar Al Baida", lat: 24.5596, lng: 46.7765 };

const DISTRICTS = ["Al Dar Al Baida", "Al Aziziyah", "Al Manakh", "Al Masani", "Manfuhah", "Al Mansourah", "Al Shifa", "Al Khalidiyah", "Ghubayra", "Al Suwaidi", "Al Uraija", "Al Badiah"];
const PLACES = ["Ad Dar Al Baida Metro Station", "Al Aziziyah Metro Station", "Arafat Road", "Wadi Hanifah"];
const OTHERS = ["Ad Dirah", "Al Murabba", "Al Malaz", "Olaya", "King Abdullah Financial District", "Diriyah", "King Khalid International Airport"];
const CITIES = ["Jeddah", "Dammam"];
const riyadhQuery = (n: string) => (/Metro Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const ALDARALBAIDA_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Dar Al Baida, Riyadh. The trip is [for example a home pickup, a shopping trip, a family trip, a transfer to or from Ad Dar Al Baida metro station or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alDarAlBaidaRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-dar-al-baida");
  if (!me) throw new Error("Al Dar Al Baida is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const stKm = fmtKm(haversine(me, STATION as unknown as CityArea));
  const stDir = compass(bearing(me, STATION as unknown as CityArea));

  const about = text("about", "Al Dar Al Baida: a residential district on the southern edge of Riyadh", [
    "Al Dar Al Baida, also written Ad Dar Al Baida, is a residential district on the southern edge of Riyadh. It is made up mostly of villas and apartment buildings, with shops, schools and mosques close to where people live. It lies near Al Aziziyah, Al Manakh and Al Masani, and an independent metro site lists the southern end of the Riyadh Metro Blue Line there. Other places in the Riyadh Region share the name, so please note that this page is only about the district in the south of the city.",
    "Al Dar Al Baida Taxi Service is for the ordinary journeys that fill a family's week. A household needs a comfortable ride to King Khalid International Airport with luggage. A parent needs a driver for a school run or an appointment. A worker wants to reach Olaya or Ad Dirah without driving and parking. Others want a car to the shops or the metro station, a lift to relatives in another district, and a ride home afterwards.",
    "Because the district is on the southern fringe, most journeys to the centre and the north are long city rides, which is why booking in advance helps. It lets you agree the pickup point and the return time before the day, and it lets us confirm a vehicle that suits your passengers and bags.",
    "District boundaries are not drawn in exactly the same place on every map, and Al Dar Al Baida is a separate district from Al Aziziyah, so we name each nearby place by its own district.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Dar Al Baida",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Dar Al Baida to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Dar Al Baida to Riyadh Airport (RUH)", "about 52 km", "about 43 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Dar Al Baida to Olaya", "about 21 km", "about 25 min"], href: pairHref("olaya") },
      { cells: ["Al Dar Al Baida to KAFD", "about 33 km", "about 36 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Dar Al Baida to Ad Dirah", "about 14 km", "about 20 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Dar Al Baida to Al Malaz", "about 16 km", "about 19 min"], href: pairHref("al-malaz") },
      { cells: ["Al Dar Al Baida to Al Murabba", "about 16 km", "about 21 min"], href: pairHref("al-murabba") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Dar Al Baida and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const residential = text("residential", "Door-to-door pickups in Al Dar Al Baida", [
    "Most rides from Al Dar Al Baida start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a main-road junction. A location pin sent on WhatsApp is even better, because it marks exactly where you will be waiting.",
    "If you live in a compound or a building with a controlled entrance, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Please also share a phone number you will answer, how many passengers there are and how many bags. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const family = text("family", "Family and group rides from Al Dar Al Baida", [
    "Families in Al Dar Al Baida often book one ride for the whole group, whether it is a trip to relatives, a shopping outing or the airport run with suitcases. Tell us how many adults and children are travelling and how many bags you have. The vehicle is chosen from that information and confirmed with you before you commit, so there is no need to guess what will fit.",
    "For school runs, give the school and the exact gate, and allow extra time around start and finish times, because roads near schools can be busy at those hours. We do not name specific schools on this page, because we could not confirm their locations. Ask for the return pickup in the same request, with a time window, and tell us if your plans change.",
  ]);

  const airport = text("airport", "Airport transfers between Al Dar Al Baida and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 52 km from the centre of Al Dar Al Baida by road, which is one of the longest rides from any Riyadh district we cover. In light traffic the drive takes roughly 43 minutes, along Arafat Road, Omar Bin Al Khattab Road, the Eastern Ring Road and Airport Road according to routing data. Busy hours, the terminal you are using and your exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. Because the drive is long, allow generous time for an early flight and say so in the request, so the pickup time is agreed in advance. A return airport transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const business = text("business", "City and business journeys from Al Dar Al Baida", [
    "Olaya is about 21 km from Al Dar Al Baida by road, roughly 25 minutes in light traffic, via Mohammed Rashid Rida Street, Arafat Road, Al Hair Road and King Fahd Road according to routing data. Olaya has many towers, hotels and shopping streets, so give the name of the building you are going to. Ad Dirah in the old centre of the city is about 14 km away, roughly 20 minutes, Al Malaz is about 16 km away, roughly 19 minutes, and Al Murabba is about 16 km away, roughly 21 minutes.",
    "KAFD is about 33 km away by road, roughly 36 minutes, and has controlled tower entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and we do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business, and a booking is a private ride arranged for your request.",
  ]);

  const community = text("community", "Shops, healthcare and nearby places", [
    "We could not confirm the current names and locations of the shops, clinics, parks and schools that people mention for Al Dar Al Baida, so this page does not name them. Wadi Hanifah, the long valley that runs through Riyadh, is a well-known destination in the south of the city, and its position relative to Al Dar Al Baida depends on which stretch you mean. Tell us the exact place and the entrance you want, and agree a meeting point the car can reach. We do not publish opening hours, facilities, parking or entrance details for any venue, and parking is not included in the fare.",
    "For a hospital or clinic visit, give the name of the facility, the branch and the entrance you need. A ride does not include any appointment, and it is not an emergency or medical transport service. Al Aziziyah is the neighbouring district, with its own shops and services, so tell us which district your destination is in.",
  ]);

  const metro = text("metro", "Riyadh Metro at Ad Dar Al Baida station", [
    `An independent Riyadh Metro information site lists Ad Dar Al Baida as an elevated station and the southern end of Line 1 (Blue), after Al Aziziah. Its listed coordinates put it about ${stKm} km to the ${stDir} of the centre of Al Dar Al Baida, in a straight line. That is not a walking or driving distance. The station was listed as opened in 2024. Al Aziziah is a different, separate station to the north, in the Al Aziziyah district.`,
    "We could not check this against the official operator, and the site does not mention a park-and-ride, so we do not claim one. Please check the official Riyadh Metro information for current stations and services. Not every address in Al Dar Al Baida is within walking distance of the station, and the best way to reach it depends on your pickup point. A taxi can take you from your door to the station, or collect you from it when you arrive with luggage, and it suits family groups, fixed pickup times and journeys the metro does not reach. We do not publish walking times, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters in a district of side streets and controlled entrances. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys a planned pickup time works backwards from your flight, and for school and appointment runs it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy school gates and shopping entrances. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["al-aziziyah", "al-shifa", "al-mansourah", "al-suwaidi", "al-uraija"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Dar Al Baida",
    kind: "links",
    intro: "These districts are in south Riyadh, close to Al Dar Al Baida but not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 21 km by road" },
      { name: "Ad Dirah", href: ctx.districtHref("ad-dirah"), note: "The old centre of Riyadh, about 14 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, a shopping trip, a family trip, a transfer to or from the metro station or the airport), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Dar Al Baida",
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
    h2: "Al Dar Al Baida taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Dar Al Baida, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange an airport transfer from Al Dar Al Baida?", a: "Yes. The airport is about 52 km by road, roughly 43 minutes in light traffic. Send your flight number, the date and time, and your passengers and bags." },
      { q: "Which roads connect Al Dar Al Baida with other parts of Riyadh?", a: "According to routing data, drives join Arafat Road and lead on to Omar Bin Al Khattab Road, Al Hair Road, King Fahd Road, the Eastern Ring Road and Airport Road. The best route depends on your pickup, destination and traffic." },
      { q: "Is there a Riyadh Metro station in Al Dar Al Baida?", a: "An independent metro site lists Ad Dar Al Baida as an elevated Line 1 (Blue) station. We could not check it against the official operator, so please check the official Riyadh Metro information." },
      { q: "Is Ad Dar Al Baida the southern end of the Blue Line?", a: "According to the independent site, yes: it is the southern terminus of Line 1, after Al Aziziah. Al Aziziah is a separate station in a neighbouring district." },
      { q: "Which neighbourhoods are near Al Dar Al Baida?", a: "Al Aziziyah, Al Manakh, Al Masani, Al Shifa and Al Mansourah are close in south Riyadh. Each is a separate district." },
      { q: "Can I arrange a taxi to central Riyadh?", a: "Yes. Ad Dirah is about 14 km by road, roughly 20 minutes in light traffic, and Olaya is about 21 km, roughly 25 minutes. Name the place and the entrance." },
      { q: "What information should I provide when requesting a booking?", a: "A map pin or the street and building number, the compound name and gate if there is one, your destination and its entrance, the date and time, the number of passengers and bags, and a phone number." },
      { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Do journey times change during the day?", a: "Yes. The times on this page are for light traffic, and busy hours, your exact pickup and the entrance of your destination change them. They are not promised journey times." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Al Dar Al Baida",
    kind: "local",
    intro: "Find Al Dar Al Baida on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps. The map and weather use a representative point in the district, not the metro station.",
    mapQuery: "24.5647,46.7883",
    mapLabel: "Al Dar Al Baida, Riyadh",
    directionsTitle: "Driving Directions from Al Dar Al Baida, Riyadh",
    directions: ALDARALBAIDA_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby south Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Metro stations, road and valley", links: PLACES.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: OTHERS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Saudi cities", links: CITIES.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: "Current Weather in Al Dar Al Baida, Riyadh",
    weather: { place: "Al Dar Al Baida, Riyadh", lat: 24.5647, lng: 46.7883 },
  };

  return {
    title: "Al Dar Al Baida Taxi Service Riyadh | Home and Airport",
    description: "Al Dar Al Baida Taxi Service for home pickups, family and shopping rides, city trips, metro transfers and airport rides in south Riyadh. Fare confirmed first.",
    h1: "Al Dar Al Baida Taxi Service in Riyadh",
    lead: "Al Dar Al Baida Taxi Service from Gulf Elite Transport: private rides from your home in Al Dar Al Baida for family trips, shopping, city journeys, metro transfers and airport transfers, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Dar Al Baida, a residential district on the southern edge of Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, shopping and school trips, rides to central Riyadh and to Ad Dar Al Baida metro station, and airport transfers to King Khalid International Airport (RUH), about 52 km by road. A booking does not give entry to private property or controlled entrances. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 52 km by road" },
      { label: "Olaya", value: "about 21 km by road" },
      { label: "Ad Dirah", value: "about 14 km by road" },
      { label: "Area type", value: "residential, southern edge of Riyadh" },
    ],
    sections: addLinks(
      addImages([about, journeys, residential, family, airport, business, community, metro, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local], me.name, {
        about: { slot: "al-dar-al-baida-neighbourhood-taxi-pickup", alt: "A silver saloon on a street of walled villas as two men in white thobes, a woman in a black abaya and a boy talk beside it", label: "Photo: al-dar-al-baida-neighbourhood-taxi-pickup.webp", w: 1000, h: 558 },
        residential: { slot: "al-dar-al-baida-doorstep-taxi-pickup", alt: "A man in a white thobe greets a man in a long pale-blue tunic who hands him a wheeled suitcase, beside a dark blue car at a house entrance", label: "Photo: al-dar-al-baida-doorstep-taxi-pickup.webp", w: 1000, h: 558 },
        family: { slot: "al-dar-al-baida-family-group-taxi", alt: "A white SUV beside a shopping street with a driver at the wheel as a family with two children and shopping bags stand next to it", label: "Photo: al-dar-al-baida-family-group-taxi.webp", w: 1000, h: 558 },
        airport: { slot: "al-dar-al-baida-ruh-airport-transfer", alt: "A silver SUV at an airport terminal canopy as a man in a white thobe and a man in a dark jacket stand with a woman and a wheeled suitcase", label: "Photo: al-dar-al-baida-ruh-airport-transfer.webp", w: 1000, h: 558 },
        business: { slot: "al-dar-al-baida-city-journeys-olaya-ad-dirah", alt: "A dark red saloon with a woman and a man inside on a Riyadh highway beneath road signs for Olaya and Ad Dirah, with city towers behind", label: "Photo: al-dar-al-baida-city-journeys-olaya-ad-dirah.webp", w: 1000, h: 558 },
      }),
      ctx,
      "al-dar-al-baida",
    ),
    whatsappMessage: ALDARALBAIDA_WHATSAPP_MESSAGE,
  };
}
