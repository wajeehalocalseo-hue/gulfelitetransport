import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Quds Taxi Service: the hand-written landing page for Al Quds (also written Al Qods), a residential district in east Riyadh (see district-rich/index.ts).
 * Primary focus keyword: "Al Quds Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 *
 * IMAGES: the owner's Google Drive folder (Al Quds subfolder) supplied five photos, compressed from about 3 MB JPEG to 65-110 KB WebP at 1000 x 563 and saved in
 * public/images/routes/riyadh-districts/al-quds-taxi-service/ under their own descriptive names:
 *   al-quds-private-taxi-service-riyadh   -> "about", al-quds-door-to-door-taxi-pickup -> "residential", al-quds-family-private-taxi-service -> "family",
 *   al-quds-to-kafd-olaya-business-taxi   -> "business", al-quds-to-riyadh-airport-taxi-transfer -> "airport".
 * The photos show premium cars and drivers. The page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts stores Al Quds at 24.755/46.754. OpenStreetMap places the Saqr Al-Jazira Aviation Museum (24.7528/46.7371) in Al Quds on the Eastern Ring Road, about 1.7 km from it,
 * so the shared point is used unchanged (the brief's park coordinate 24.7483/46.7502 is 0.8 km away).
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from the Al Quds centre):
 * RUH about 29 km and about 21 to 22 min (29.3 km / 21 min); KAFD about 22 km and about 21 to 22 min (22.4 / 21); Olaya about 16 km and about 15 to 16 min (15.9 / 15);
 * Ad Dirah about 20 km and about 19 to 20 min (19.5 / 19); Diriyah about 26 km and about 24 to 25 min (26.1 / 24).
 * Roads in the driving paragraph are those OSRM returns: Eastern Ring Road, Airport Road, King Salman Road, Northern Ring Road, King Fahd Branch Road, Makkah Al Mukarramah Road, Imam Turki bin Abdullah Road.
 * Metro (independent site riyadhmetro.org, checked 18 Nov 2026): Khalid Bin Alwaleed Road is a shallow underground Line 2 (Red) station between Riyadh Exhibition Center and Al Hamra, listed at
 * 24.7671/46.7590, opened 2024, no interchange (Al Hamra, the next stop, is the Line 2 / Line 6 interchange). An Nuzhah (King Abdullah Road, 24.7478/46.7131) and Riyadh Exhibition Center (24.7538/46.7272) are
 * the next stations west. The official rpt.sa site returned 403, and the pages do not mention a park-and-ride, so none is claimed. Straight-line distances are computed from the listed coordinates.
 * Places: OpenStreetMap labels the Saqr Al-Jazira Aviation Museum as Al Quds; Al Hamra Square is in Al Hamra. Al Quds Fourth Park, Al Ghaf Garden, Health Oasis Hospital, Landmarks Park, East Boulevard Plaza,
 * Al Quds High School and King Salman Social Center come from the brief's local listings and could not be placed on a map by us, so the page mentions the two parks only as "named in local listings" and
 * states no hours, facilities, admission or addresses; the others appear only as Google Maps search links.
 * NOT verified / left out: park facilities and hours, Health Oasis's exact location, the exact district boundary, King Faisal District's centre. No partnership with any hospital, park, venue or Riyadh Metro;
 * no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const ALQUDS_DIRECTIONS =
  "Most drives from Al Quds join the Eastern Ring Road. For King Khalid International Airport, routing data follows the Eastern Ring Road, then Airport Road and King Salman Road. For KAFD, it continues on the Northern Ring Road and King Fahd Branch Road. For Olaya, it follows Makkah Al Mukarramah Road. For Ad Dirah, it uses Makkah Al Mukarramah Road and Imam Turki bin Abdullah Road. These roads come from OpenStreetMap routing and are only a guide. The best route depends on your exact pickup location, your destination entrance and current traffic. Please always confirm your pickup point with us.";

const STATION = { name: "Khalid Bin Alwaleed Road", lat: 24.7671, lng: 46.759 };

const DISTRICTS = ["Al Quds", "Al Mughrizat", "Al Hamra", "Al Rawdah", "Al Izdihar", "Al Rabwah", "Al Naseem", "Granada", "An Nuzhah", "King Faisal District", "King Abdullah District", "Al Nahdah"];
const PLACES = ["Al Quds Fourth Park", "Al Ghaf Garden", "Health Oasis Hospital", "Khalid Bin Alwaleed Road Metro Station", "Saqr Al Jazeera Aviation Museum", "Al Hamra Square", "Riyadh International Convention and Exhibition Center", "King Salman Social Center"];
const OTHERS = ["Olaya", "KAFD", "Ad Dirah", "Diriyah", "King Khalid International Airport"];
const riyadhQuery = (n: string) => (n === "KAFD" ? "King Abdullah Financial District, Riyadh, Saudi Arabia" : /Metro Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const ALQUDS_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Quds, Riyadh. The trip is [for example a home pickup, a family trip, a transfer to or from Khalid Bin Alwaleed Road metro station, an appointment or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alQudsRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-quds");
  if (!me) throw new Error("Al Quds is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const stKm = fmtKm(haversine(me, STATION as unknown as CityArea));
  const stDir = compass(bearing(me, STATION as unknown as CityArea));

  const about = text("about", "Al Quds: a residential district in east Riyadh", [
    "Al Quds, also written Al Qods, is a residential district in the east of Riyadh, in the Al Rawdah municipality. It is made up mostly of villas and apartment buildings, with schools, mosques, small parks and everyday services close to where people live. The Eastern Ring Road runs along its edge, and Al Hamra, Al Mughrizat and Al Rawdah are its neighbours.",
    "Al Quds Taxi Service is for the ordinary journeys that fill a family's week. A parent needs a driver for a school run or a hospital appointment. A household needs a comfortable ride to King Khalid International Airport with luggage. A worker wants to reach Olaya or KAFD without driving and parking. Others want a car to a park or the shops in the evening, and a ride home afterwards.",
    "Many of these trips have a fixed time, such as a flight, a school bell or an appointment, which is why booking in advance helps. It lets you agree the pickup point and the return time before the day, and it lets us confirm a vehicle that suits your passengers and bags.",
    "District boundaries are not drawn in exactly the same place on every map, and several well-known places nearby belong to neighbouring districts. We name each place by its own district below.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Quds",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Quds to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Quds to Riyadh Airport (RUH)", "about 29 km", "about 21 to 22 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Quds to Olaya", "about 16 km", "about 15 to 16 min"], href: pairHref("olaya") },
      { cells: ["Al Quds to KAFD", "about 22 km", "about 21 to 22 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Quds to Ad Dirah", "about 20 km", "about 19 to 20 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Quds to Diriyah", "about 26 km", "about 24 to 25 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Quds and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const residential = text("residential", "Door-to-door pickups in Al Quds", [
    "Most rides from Al Quds start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a main-road junction. A location pin sent on WhatsApp is even better, because it marks exactly where you will be waiting.",
    "If you live in a compound or a building with a controlled entrance, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Please also share a phone number you will answer, how many passengers there are and how many bags. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const family = text("family", "Family and group rides from Al Quds", [
    "Families in Al Quds often book one ride for the whole group, whether it is a trip to relatives, an outing to a park or the airport run with suitcases. Tell us how many adults and children are travelling and how many bags you have. The vehicle is chosen from that information and confirmed with you before you commit, so there is no need to guess what will fit.",
    "For school runs, give the school and the exact gate, and allow extra time around start and finish times, because roads near schools can be busy at those hours. We do not name specific schools on this page, because we could not confirm their locations. Ask for the return pickup in the same request, with a time window, and tell us if your plans change.",
  ]);

  const airport = text("airport", "Airport transfers between Al Quds and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 29 km from the centre of Al Quds by road. In light traffic the drive takes roughly 21 to 22 minutes, mostly along the Eastern Ring Road and Airport Road. Busy hours, the terminal you are using and your exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. If your flight leaves very early or lands late at night, say so in the request, so the pickup time is agreed in advance. A return airport transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const business = text("business", "Business and city journeys from Al Quds", [
    "Olaya is about 16 km from Al Quds by road, roughly 15 to 16 minutes in light traffic, via the Eastern Ring Road and Makkah Al Mukarramah Road according to routing data. Olaya has many towers, hotels and shopping streets, so give the name of the building you are going to. KAFD is about 22 km away, roughly 21 to 22 minutes, and has controlled tower entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and we do not promise access to towers or private car parks.",
    "Ad Dirah in the old centre of the city is about 20 km away, roughly 19 to 20 minutes, and Diriyah is about 26 km away, roughly 24 to 25 minutes. Gulf Elite Transport has no partnership with KAFD or any business. A booking is a private ride arranged for your request, with the vehicle, driver and fare confirmed before you commit.",
  ]);

  const community = text("community", "Parks, healthcare and nearby places", [
    "Local listings name parks in Al Quds, such as Al Quds Fourth Park and Al Ghaf Garden. We could not confirm them on a map, so we do not publish their facilities, opening hours or entrances. Tell us the name of the park and the entrance you want, and agree a meeting point the car can reach, then ask for the return pickup in the same request.",
    "For a hospital or clinic visit, give the name of the facility, the branch and the entrance you need, because hospitals often have several and some are in neighbouring districts. We could not confirm the exact location of Health Oasis Hospital, so we do not say whether it is inside Al Quds. A ride does not include any appointment, it is not an emergency or medical transport service, and we cannot give medical advice.",
    "Several well-known places nearby are in other districts. Al Hamra Square is in Al Hamra, and the Riyadh International Convention and Exhibition Center is in Al Mughrizat. OpenStreetMap labels the Saqr Al-Jazira Aviation Museum, on the Eastern Ring Road, as being in Al Quds. We do not publish opening hours or admission for any venue, and a taxi booking does not include tickets or parking.",
  ]);

  const metro = text("metro", "Khalid Bin Alwaleed Road Metro Station and your taxi", [
    `An independent Riyadh Metro information site lists Khalid Bin Alwaleed Road as a shallow underground station on Line 2 (Red), between Riyadh Exhibition Center and Al Hamra. Its listed coordinates put it about ${stKm} km to the ${stDir} of the centre of Al Quds, in a straight line, so it is in the Al Quds area but not at the middle of the district. The next station, Al Hamra, is where Line 2 meets Line 6 (Purple). The station was listed as opened in 2024. It is a different station from Al Hamra and from Riyadh Exhibition Center.`,
    "We could not check this against the official operator, and the site does not mention a park-and-ride, so we do not claim one. Please check the official Riyadh Metro and Darb information for current services, hours and fares. A taxi can take you from your door to the station, or collect you from it when you arrive with luggage, and it suits family groups, fixed pickup times and journeys the metro does not reach. We do not say that every address is within walking distance of the station, and we do not publish walking times, fares, operating hours or journey times. Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters in a district of side streets and controlled entrances. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys a planned pickup time works backwards from your flight, and for school and hospital runs it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy hospital entrances, parks and school gates. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["al-mughrizat", "al-hamra", "al-rawdah", "al-izdihar", "granada", "al-rabwah", "al-naseem"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 6);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Quds",
    kind: "links",
    intro: "These districts are close to Al Quds but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 16 km by road" },
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 22 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, a family trip, a transfer to or from the metro station, an appointment or the airport), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Quds",
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
    h2: "Al Quds taxi service: questions",
    kind: "faq",
    items: [
      { q: "Can I book a taxi in Al Quds, Riyadh?", a: "Yes. Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange a pickup near a park in Al Quds?", a: "Yes. Tell us the name of the park and the entrance you want, and agree a meeting point the car can reach. We do not publish park hours or facilities, so check the park's own information." },
      { q: "Can I book a taxi to a hospital?", a: "Yes, as an ordinary private ride. Give the hospital, the branch and the entrance. It is not an emergency or medical transport service." },
      { q: "Can I arrange a pickup near Khalid Bin Alwaleed Road Metro Station?", a: "Yes. A ride to or from the station is a normal private ride, quoted for your request. An independent metro site lists it on Line 2 (Red). Check the official Riyadh Metro information." },
      { q: "Can I book an airport transfer from Al Quds?", a: "Yes. The airport is about 29 km by road, roughly 21 to 22 minutes in light traffic. Send your flight number, the date and time, and your passengers and bags." },
      { q: "Can I travel from Al Quds to nearby Riyadh districts?", a: "Yes. Al Hamra, Al Mughrizat and Al Rawdah are neighbouring districts. Name the place you are going to, because several landmarks near Al Quds are in other districts." },
      { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "Can I book a family or group ride?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Do journey times change during the day?", a: "Yes. The times on this page are for light traffic, and busy hours, your exact pickup and the entrance of your destination change them. They are not promised journey times." },
      { q: "How can I contact Gulf Elite Transport Group to arrange a ride?", a: "Use WhatsApp or the booking form on this page. A WhatsApp message is a request, and the booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Al Quds",
    kind: "local",
    intro: "Find Al Quds on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
    mapQuery: "24.755,46.754",
    mapLabel: "Al Quds, Riyadh",
    directionsTitle: "Driving Directions from Al Quds, Riyadh",
    directions: ALQUDS_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby east and north-east Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Local places, healthcare and metro station", links: PLACES.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: OTHERS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
    ],
    weatherTitle: "Current Weather in Al Quds, Riyadh",
    weather: { place: "Al Quds, Riyadh", lat: 24.755, lng: 46.754 },
  };

  return {
    title: "Al Quds Taxi Service Riyadh | Home Pickups and Airport",
    description: "Al Quds Taxi Service for home pickups, family and school rides, hospital trips, metro transfers and airport rides in Riyadh. Fare confirmed first.",
    h1: "Al Quds Taxi Service in Riyadh",
    lead: "Al Quds Taxi Service from Gulf Elite Transport: private rides from your home in Al Quds for family trips, appointments, metro station transfers and airport journeys, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Quds, a residential district in east Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, school and hospital trips, rides to and from Khalid Bin Alwaleed Road metro station and airport transfers to King Khalid International Airport (RUH), about 29 km by road. A booking does not give entry to private property or controlled entrances. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 29 km by road" },
      { label: "Olaya", value: "about 16 km by road" },
      { label: "KAFD", value: "about 22 km by road" },
      { label: "Metro", value: "Khalid Bin Alwaleed Road, Line 2" },
    ],
    sections: addLinks(
      addImages(
        [about, journeys, residential, family, airport, business, community, metro, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local],
        me.name,
        {
          about: { slot: "al-quds-private-taxi-service-riyadh", alt: "A private car and driver waiting on a villa street in a Riyadh residential district", label: "Photo: al-quds-private-taxi-service-riyadh", w: 1000, h: 563 },
          residential: { slot: "al-quds-door-to-door-taxi-pickup", alt: "A driver welcoming a passenger with a suitcase beside a private car outside a villa", label: "Photo: al-quds-door-to-door-taxi-pickup", w: 1000, h: 563 },
          family: { slot: "al-quds-family-private-taxi-service", alt: "A family with children and luggage loading an SUV with the help of a driver outside a villa", label: "Photo: al-quds-family-private-taxi-service", w: 1000, h: 563 },
          airport: { slot: "al-quds-to-riyadh-airport-taxi-transfer", alt: "A driver loading luggage into an SUV for two travellers outside an airport terminal", label: "Photo: al-quds-to-riyadh-airport-taxi-transfer", w: 1000, h: 563 },
          business: { slot: "al-quds-to-kafd-olaya-business-taxi", alt: "A business traveller with a briefcase meeting a driver beside a private car in front of Riyadh office towers", label: "Photo: al-quds-to-kafd-olaya-business-taxi", w: 1000, h: 563 },
        },
      ),
      ctx,
      "al-quds",
    ),
    whatsappMessage: ALQUDS_WHATSAPP_MESSAGE,
  };
}
