import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Naseem Taxi Service: the hand-written landing page for Al Naseem (An Nasim), a large residential area in east Riyadh (see district-rich/index.ts).
 * Primary focus keyword: "Al Naseem Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 *
 * IMAGES: the owner's Google Drive folder (Al Naseem subfolder) supplied five photos, compressed to 1000 px wide WebP and saved in
 * public/images/routes/riyadh-districts/al-naseem-taxi-service/ under their own descriptive names (about, residential, family, business, airport sections).
 * The photos show cars and drivers. The page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * EAST AND WEST: OpenStreetMap labels two areas, "Al Naseem District East" (Al Naseem Al Sharqi) and "Al Naseem District West" (Al Naseem Al Gharbi).
 * Al Naseem Park (24.7310/46.8141) is labelled West. Al Hafouf (24.7264/46.8412) is labelled East. Al Rawabi, Al Salam, Al Manar and Ar Rimayah (KSAU-HS, 24.7571/46.8572) are
 * separate districts that OpenStreetMap lists under the Al Naseem municipality, so they are described as nearby, never as part of Al Naseem.
 * A property guide (sa.sakan.co) describes Al Naseem Al Sharqi as west of Prince Meteb bin Abdullah bin Abdulaziz Road, east of Hassan bin Thabit Road and south of Khurais Road, with
 * Al Nahda to the north, Al Nadhim to the east, Al Naseem Al Gharbi to the west and the Naseem industrial area to the south. That guide is not an official map and does not agree with the metro
 * site about where Hassan bin Thabit sits, so the page repeats it only as "one property guide" and states no boundary of its own. No boundary for Al Naseem Al Gharbi was found anywhere.
 *
 * CENTRE POINT: riyadh-areas.ts stores Al Naseem at 24.7189/46.8256, between the East (24.7264/46.8412) and West (24.7310/46.8141) labelled places. It is used unchanged as one representative
 * point for both the weather and the road estimates. It is not the centre of either part and is not the metro station (24.7003/46.8278).
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from that centre point):
 * RUH about 40 km and about 30 min (40.1 / 30); Olaya about 20 km and about 19 min (19.9 / 19); KAFD about 33 km and about 31 min (32.6 / 31); Al Malaz about 14 km and about 15 min (14.2 / 15);
 * Ad Dirah about 19 km and about 20 min (19.1 / 20); Al Rawdah about 11 km and about 13 min (10.7 / 13).
 * Roads in the driving paragraph are those OSRM returns: Khurais Road (and Khurais Branch Road), Eastern Ring Road, Airport Road, King Salman Road, Makkah Al Mukarramah Road, King Fahd Road,
 * Northern Ring Road. The brief's Harun Al Rashid Road, Hassan Bin Thabit Road, Prince Meteb Road and Second Eastern Ring Road were not returned by any of these routes, and OpenStreetMap search could
 * not find Harun Al Rashid or Hassan Bin Thabit as roads, so they are named only as metro station names.
 * Metro (independent site riyadhmetro.org, checked 18 Nov 2026; official sources not reachable): An Naseem is a shallow underground interchange between Line 3 (Orange) and Line 6 (Purple) at 24.7003/46.8278,
 * between the Harun Ar Rashid Road and Hassan Bin Thabit Street stations on Line 3, listed as opened in 2025. Station code and park-and-ride are not stated, so none are claimed.
 * NOT verified / left out: King Abdullah Specialist Children's Hospital, King Fahd Security College, King Fahd Hospital, Prince Badr Residential City, the Naseem industrial area and the Al Naseem markets
 * (none found by OpenStreetMap search), the exact district boundaries, opening hours or facilities of any venue, schools.
 * No partnership with any mall, park, university or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const ALNASEEM_DIRECTIONS =
  "Most drives from Al Naseem begin locally and join Khurais Road. For King Khalid International Airport, routing data follows Khurais Road, the Eastern Ring Road, Airport Road and King Salman Road. For Olaya, it uses Khurais Road, Makkah Al Mukarramah Road and King Fahd Road. For KAFD, it continues along the Eastern Ring Road and the Northern Ring Road. These roads come from OpenStreetMap routing, are only a guide and may differ between eastern and western Al Naseem. The best route depends on your exact pickup location, your destination entrance and current traffic. Please confirm your pickup point with us.";

const STATION = { name: "An Naseem", lat: 24.7003, lng: 46.8278 };

const DISTRICTS = ["Al Naseem", "Al Naseem Al Sharqi", "Al Naseem Al Gharbi", "Al Rawabi", "Al Salam", "Al Manar", "Ar Rimayah", "Al Nadhim", "Al Khaleej", "Al Yarmuk", "Al Janadriyah", "Al Quds", "Al Rabwah", "Al Hamra"];
const PLACES = ["An Naseem Metro Station", "Harun Ar Rashid Road Metro Station", "Hassan Bin Thabit Street Metro Station", "Al Naseem Park", "Al Rayan Park", "King Saud bin Abdulaziz University for Health Sciences"];
const OTHERS = ["Olaya", "King Abdullah Financial District", "King Khalid International Airport"];
const CITIES = ["Jeddah", "Dammam"];
const riyadhQuery = (n: string) => (/Metro Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const ALNASEEM_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Naseem, Riyadh. The trip is [for example a home pickup, a shopping trip, a family trip, a transfer to or from An Naseem metro station or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin, and whether it is eastern or western Al Naseem], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alNaseemRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-naseem");
  if (!me) throw new Error("Al Naseem is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const stKm = fmtKm(haversine(me, STATION as unknown as CityArea));
  const stDir = compass(bearing(me, STATION as unknown as CityArea));

  const about = text("about", "Al Naseem: a large residential area in east Riyadh", [
    "Al Naseem, also written An Nasim or An Naseem, is a large residential area in the east of Riyadh. Maps divide it into two parts, Al Naseem Al Sharqi (eastern Al Naseem) and Al Naseem Al Gharbi (western Al Naseem), and the two are not the same place. OpenStreetMap labels them \"Al Naseem District East\" and \"Al Naseem District West\", and each has its own streets, parks and neighbours.",
    "Al Naseem Taxi Service covers requests from both parts. It is for the ordinary journeys that fill a family's week. A household needs a comfortable ride to King Khalid International Airport with luggage. A parent needs a driver for a school run or an appointment. A worker wants to reach Olaya or KAFD without driving and parking. Others want a car to a park or a shop in the evening, or a lift to the metro, and a ride home afterwards.",
    "Because the area is large, the exact pickup point matters more here than in a small district. When you book, tell us which part of Al Naseem you are in, the street and a landmark or a map pin. We use that to plan the route and the pickup time with you.",
    "Boundaries are not drawn in exactly the same place on every map, and several districts around Al Naseem, such as Al Rawabi, Al Salam, Al Manar and Ar Rimayah, belong to the same municipality but are separate districts. We name each place by its own district below.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Naseem",
    kind: "table",
    intro: "Road distance and light-traffic driving time from one representative point in Al Naseem, between its eastern and western parts, to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Naseem to Riyadh Airport (RUH)", "about 40 km", "about 30 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Naseem to Olaya", "about 20 km", "about 19 min"], href: pairHref("olaya") },
      { cells: ["Al Naseem to KAFD", "about 33 km", "about 31 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Naseem to Ad Dirah", "about 19 km", "about 20 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Naseem to Al Malaz", "about 14 km", "about 15 min"], href: pairHref("al-malaz") },
      { cells: ["Al Naseem to Al Rawdah", "about 11 km", "about 13 min"], href: pairHref("al-rawdah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between one representative point in Al Naseem and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Your exact pickup (eastern or western Al Naseem), the entrance of your destination, traffic, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const residential = text("residential", "Door-to-door pickups in Al Naseem", [
    "Most rides from Al Naseem start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a main-road junction. A location pin sent on WhatsApp is even better, because it marks exactly where you will be waiting, and it shows us whether you are in eastern or western Al Naseem.",
    "If you live in a compound or a building with a controlled entrance, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Please also share a phone number you will answer, how many passengers there are and how many bags. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const family = text("family", "Family and group rides from Al Naseem", [
    "Families in Al Naseem often book one ride for the whole group, whether it is a trip to relatives, a shopping outing or the airport run with suitcases. Tell us how many adults and children are travelling and how many bags you have. The vehicle is chosen from that information and confirmed with you before you commit, so there is no need to guess what will fit.",
    "For school runs, give the school and the exact gate, and allow extra time around start and finish times, because roads near schools can be busy at those hours. We do not name specific schools on this page, because we could not confirm their locations. Ask for the return pickup in the same request, with a time window, and tell us if your plans change.",
  ]);

  const airport = text("airport", "Airport transfers between Al Naseem and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 40 km from our representative point in Al Naseem by road. In light traffic the drive takes roughly 30 minutes, mostly along Khurais Road, the Eastern Ring Road and Airport Road. Busy hours, the terminal you are using and your exact starting address, in the east or the west of Al Naseem, can all add or save time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. If your flight leaves very early or lands late at night, say so in the request, so the pickup time is agreed in advance. A return airport transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const business = text("business", "City and business journeys from Al Naseem", [
    "Olaya is about 20 km from Al Naseem by road, roughly 19 minutes in light traffic, via Khurais Road, Makkah Al Mukarramah Road and King Fahd Road according to routing data. Olaya has many towers, hotels and shopping streets, so give the name of the building you are going to. Ad Dirah in the old centre of the city is about 19 km away, roughly 20 minutes, Al Malaz is about 14 km away, roughly 15 minutes, and Al Rawdah is about 11 km away, roughly 13 minutes.",
    "KAFD is about 33 km away by road, roughly 31 minutes, along the Eastern Ring Road and the Northern Ring Road, and has controlled tower entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and we do not promise access to towers or private car parks. Diriyah is further, about 35 km, roughly 33 minutes. Gulf Elite Transport has no partnership with KAFD or any business, and a booking is a private ride arranged for your request.",
  ]);

  const community = text("community", "Parks, studies and nearby places", [
    "OpenStreetMap places Al Naseem Park in the western part of Al Naseem. Al Rayan Park is in the neighbouring Al Rawabi district, not in Al Naseem. We do not publish opening hours, facilities, parking or entrance details for any park or shop, and we could not find the Al Naseem markets or shopping centres by name. Check each place's own information, tell us the entrance you want and agree a meeting point the car can reach. Parking is not included in the fare.",
    "King Saud bin Abdulaziz University for Health Sciences (KSAU-HS) is mapped in Ar Rimayah, a separate district under the same municipality, a few kilometres north-east of our Al Naseem point. It is a nearby destination, not an Al Naseem one. For a university, hospital or clinic visit, give the name of the facility, the branch and the entrance you need. We could not confirm the locations of several other hospitals and colleges that people mention for this area, so we do not name them here. A ride does not include any appointment, and it is not an emergency or medical transport service.",
  ]);

  const metro = text("metro", "Riyadh Metro at An Naseem", [
    `An independent Riyadh Metro information site lists An Naseem as a shallow underground interchange station where Line 3 (Orange) and Line 6 (Purple) meet, between the Harun Ar Rashid Road and Hassan Bin Thabit Street stations on Line 3. Its listed coordinates put it about ${stKm} km to the ${stDir} of our representative point in Al Naseem, in a straight line. That is not a walking or driving distance, and the site does not say whether the station is closer to eastern or western Al Naseem. The station was listed as opened in 2025.`,
    "We could not check this against the official operator, and the site does not mention a park-and-ride, so we do not claim one. Please check the official Riyadh Metro information for current stations and services. Not every address in Al Naseem is within walking distance of the station, and the best way to reach it depends on your pickup point. A taxi can take you from your door to the station, or collect you from it when you arrive with luggage, and it suits family groups, fixed pickup times and journeys the metro does not reach. We do not publish walking times, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters in a large area of side streets and controlled entrances. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys a planned pickup time works backwards from your flight, and for school and appointment runs it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy school gates and park entrances. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["al-khaleej", "al-nadhim", "al-rawdah", "al-quds", "al-rabwah"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Naseem",
    kind: "links",
    intro: "These districts are in east and north-east Riyadh, close to Al Naseem but not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 20 km by road" },
      { name: "Ad Dirah", href: ctx.districtHref("ad-dirah"), note: "The old centre of Riyadh, about 19 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, a shopping trip, a family trip, a transfer to or from the metro station or the airport), your street, building and gate or a map pin and whether you are in eastern or western Al Naseem, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Naseem",
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
    h2: "Al Naseem taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Naseem, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Does this page cover both eastern and western Al Naseem?", a: "Yes, you can request a pickup in either part. Maps label them Al Naseem Al Sharqi (east) and Al Naseem Al Gharbi (west), so tell us which part you are in and send a map pin." },
      { q: "Can I arrange an airport transfer from Al Naseem?", a: "Yes. The airport is about 40 km by road from our representative point, roughly 30 minutes in light traffic. Send your flight number, the date and time, and your passengers and bags." },
      { q: "Which roads connect Al Naseem with other parts of Riyadh?", a: "According to routing data, drives join Khurais Road and lead on to the Eastern Ring Road, Airport Road, Makkah Al Mukarramah Road and King Fahd Road. The best route depends on your pickup, destination and traffic." },
      { q: "Is there a Riyadh Metro station in Al Naseem?", a: "An independent metro site lists An Naseem as a Line 3 (Orange) and Line 6 (Purple) interchange. We could not check it against the official operator, so please check the official Riyadh Metro information." },
      { q: "How can I request a pickup near An Naseem metro station?", a: "Tell us which exit or street you will be on, or send a map pin. We agree a meeting point the car can reach. We do not promise a particular entrance or waiting spot." },
      { q: "Which neighbourhoods are near Al Naseem?", a: "Al Rawabi, Al Salam, Al Manar and Ar Rimayah are mapped under the same municipality, and Al Khaleej, Al Nadhim, Al Rawdah and Al Quds are close in east and north-east Riyadh. Each is a separate district." },
      { q: "Can I arrange a taxi to central Riyadh?", a: "Yes. Olaya is about 20 km by road, roughly 19 minutes in light traffic, and Ad Dirah is about 19 km, roughly 20 minutes. Name the place and the entrance." },
      { q: "What information should I provide when requesting a booking?", a: "A map pin or the street and building number, whether you are in eastern or western Al Naseem, the compound name and gate if there is one, your destination and its entrance, the date and time, the number of passengers and bags, and a phone number." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Do journey times change during the day?", a: "Yes. The times on this page are for light traffic, and busy hours, your exact pickup and the entrance of your destination change them. They are not promised journey times." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Al Naseem",
    kind: "local",
    intro: "Find Al Naseem on the map, read how the main roads lead out of the area, and open nearby neighbourhoods and destinations in Google Maps. The map and weather use one representative point between eastern and western Al Naseem.",
    mapQuery: "24.7189,46.8256",
    mapLabel: "Al Naseem, Riyadh",
    directionsTitle: "Driving Directions from Al Naseem, Riyadh",
    directions: ALNASEEM_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Al Naseem areas and nearby east Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Local places and metro stations", links: PLACES.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: OTHERS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Saudi cities", links: CITIES.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: "Current Weather in Al Naseem, Riyadh",
    weather: { place: "Al Naseem, Riyadh", lat: 24.7189, lng: 46.8256 },
  };

  return {
    title: "Al Naseem Taxi Service Riyadh | Home Pickups and Airport",
    description: "Al Naseem Taxi Service for eastern and western Al Naseem: home pickups, family rides, city trips, metro transfers and airport rides in Riyadh. Fare confirmed first.",
    h1: "Al Naseem Taxi Service in Riyadh",
    lead: "Al Naseem Taxi Service from Gulf Elite Transport: private rides from your home in eastern or western Al Naseem for family trips, shopping, city journeys and airport transfers, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Naseem, a large residential area in east Riyadh made up of Al Naseem Al Sharqi (east) and Al Naseem Al Gharbi (west), Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, shopping and school trips, rides to central Riyadh and to An Naseem metro station, and airport transfers to King Khalid International Airport (RUH), about 40 km by road. A booking does not give entry to private property or controlled entrances. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 40 km by road" },
      { label: "Olaya", value: "about 20 km by road" },
      { label: "KAFD", value: "about 33 km by road" },
      { label: "Area type", value: "residential, east Riyadh" },
    ],
    sections: addLinks(
      addImages(
        [about, journeys, residential, family, airport, business, community, metro, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local],
        me.name,
        {
          about: { slot: "al-naseem-private-taxi-service-riyadh", alt: "A man with a briefcase greeting a driver beside a white car outside apartment buildings on a quiet residential street", label: "Photo: al-naseem-private-taxi-service-riyadh", w: 1000, h: 563 },
          residential: { slot: "al-naseem-door-to-door-taxi-pickup", alt: "A man carrying shopping bags walks toward a driver standing beside a white car on a street lined with shops", label: "Photo: al-naseem-door-to-door-taxi-pickup", w: 1000, h: 563 },
          family: { slot: "al-naseem-family-group-taxi-transport", alt: "A driver loading shopping bags into the open boot of a gold SUV while a family waits on the pavement", label: "Photo: al-naseem-family-group-taxi-transport", w: 1000, h: 563 },
          airport: { slot: "al-naseem-to-riyadh-airport-taxi", alt: "A driver loading suitcases into the open rear of a silver van while a traveller with a backpack waits at an airport terminal kerb", label: "Photo: al-naseem-to-riyadh-airport-taxi", w: 1000, h: 563 },
          business: { slot: "al-naseem-to-olaya-kafd-city-taxi", alt: "A dark SUV driving along a busy highway with the Riyadh skyline and Al Faisaliyah tower in the background", label: "Photo: al-naseem-to-olaya-kafd-city-taxi", w: 1000, h: 563 },
        },
      ),
      ctx,
      "al-naseem",
    ),
    whatsappMessage: ALNASEEM_WHATSAPP_MESSAGE,
  };
}
