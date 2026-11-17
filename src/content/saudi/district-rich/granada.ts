import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import type { DistrictRichCtx } from "./olaya";

/**
 * Granada Taxi Service: the hand-written landing page for Granada (Ghirnatah), an east Riyadh district with a mall, a business park and a metro station (see district-rich/index.ts).
 * Primary focus keyword: "Granada Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 *
 * IMAGES (TODO for the owner): three slots are reserved, with these exact files in public/images/routes/riyadh-districts/granada-taxi-service/ :
 *   granada-neighbourhood.webp       a realistic Granada (Ghirnatah) streetscape or residential setting                       -> "about" section
 *   granada-mall-business-park.webp  Granada Mall or Granada Business Park, only if the image is authentic                    -> "community" section
 *   granada-local-transport.webp     the metro station or a local transport setting near Granada                             -> "metro" section
 * No supplied images were found in the project, so labelled placeholders are shown. Do not use fleet photographs that are not the company's own.
 *
 * CENTRE POINT: riyadh-areas.ts stores Granada at 24.7912/46.7437. OpenStreetMap places Granada Mall (24.7818/46.7312), Hilton Riyadh Hotel and Residences (24.7852/46.7282), Mouwasat Hospital (24.7874/46.7327) and
 * Granada Business Park (24.7863/46.7273) in Granada, all within about 2 km of that point, so the shared point is used unchanged for routes, distances, the map and the weather (the brief suggests the mall point 24.7818/46.7312).
 * Official sources (read in November 2026): granadamall.com/visitor-info says the mall is on the Eastern Ring Road between Exit 8 and Exit 9 in the Ghernata (Ghirnatah) District, reachable by car, metro, bus or taxi,
 * with a main entrance (Gate 1) and a southern wing entrance (Gate 10); granadabusiness.com/visitor-information gives Eastern Ring Branch Rd, Ghirnatah, Riyadh 13241, says the park is directly connected to Granada Metro Station
 * and has a pedestrian sky bridge to Granada Mall. Opening hours, parking terms and the "4,000 spaces" claim on those pages are NOT repeated, because they change.
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from the Granada centre):
 * RUH about 24 km and about 18 min (23.7 km / 18 min); KAFD about 17 km and about 17 min (17.2 / 17); Olaya about 22 km and about 19 to 20 min (22.0 / 19); Ad Dirah about 26 km and about 23 to 25 min (25.6 / 23);
 * Diriyah about 21 km and about 20 min (20.8 / 20).
 * Roads in the driving paragraph are those OSRM returns or the official addresses give: Khalid Bin Al Waleed Street, Dammam Road, Airport Road, Northern Ring Road, King Fahd Branch Road,
 * Imam Saud bin Abdulaziz bin Mohammed Road, Eastern Ring Road, Makkah Al Mukarramah Road, Eastern Ring Branch Road.
 * Metro (independent site riyadhmetro.org, checked 17 Nov 2026): Granadia, Line 6 (Purple), elevated, between SABIC and Al Yarmuk, opened 2024, listed at 24.7865/46.7293. The Granada Business page calls the station
 * "Granada Metro Station". The page treats them as the same station and says the spelling differs by source. The official rpt.sa site returned 403, so the station is "listed"; no fares, hours, frequencies or times.
 * NOT verified / left out: the National Center for Events and The Arena Riyadh (not found), any park, school or hotel other than the Hilton, opening hours, parking terms, official names of the mall's taxi arrangements.
 * No partnership with Granada Mall, Granada Business Park, any hotel, hospital or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises, access to gated places or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const GRANADA_DIRECTIONS =
  "Most drives from Granada begin on Khalid Bin Al Waleed Street or the Eastern Ring Road. For King Khalid International Airport and KAFD, routing data follows Dammam Road, then Airport Road for the airport, or the Northern Ring Road and King Fahd Branch Road for KAFD. For Olaya and Ad Dirah, it uses Imam Saud bin Abdulaziz bin Mohammed Road to the Eastern Ring Road and Makkah Al Mukarramah Road. Granada Business Park is on Eastern Ring Branch Road. The best route depends on your exact pickup location, destination and current traffic. Please always confirm your pickup point with us.";

const STATION = { name: "Granadia", lat: 24.7865, lng: 46.7293 };
const MALL = { name: "Granada Mall", lat: 24.7818, lng: 46.7312 };

const DISTRICTS = ["Granada", "Al Yarmuk", "Al Hamra", "Al Izdihar", "Al Mughrizat", "Al Falah", "Qurtubah", "Al Wadi", "Al Quds", "Al Rawdah", "Al Munsiyah", "Ash Shuhada", "Al Khaleej", "Ishbiliyah"];
const PLACES = ["Granada Mall", "Granada Business Park", "Granadia Metro Station", "Mouwasat Hospital", "Hilton Riyadh Hotel and Residences", "Saqr Al Jazeera Aviation Museum"];
const OTHERS = ["Olaya", "KAFD", "Ad Dirah", "Diriyah", "King Khalid International Airport"];
const riyadhQuery = (n: string) => (n === "KAFD" ? "King Abdullah Financial District, Riyadh, Saudi Arabia" : /Metro Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const GRANADA_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Granada, Riyadh. The trip is [for example Granada Mall, Granada Business Park, a hotel or hospital visit, a metro station transfer or an airport transfer], my pickup point is [place, entrance or street], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function granadaRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "granada");
  if (!me) throw new Error("Granada is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const mallToStation = fmtKm(haversine(MALL as unknown as CityArea, STATION as unknown as CityArea));

  const about = text("about", "Granada, also written Ghirnatah: a district in east Riyadh", [
    "Granada, also written Ghirnatah or Ghernata, is a district in the east of Riyadh, in the Al Rawdah municipality. It is known for two large developments on the Eastern Ring Road side of the district: Granada Mall and Granada Business Park. A hotel, a hospital and a metro station are close to them, and residential streets lie around.",
    "Granada Taxi Service is for people who live, work, shop and stay here. A resident needs a car to the airport with luggage. A visitor wants a ride from a hotel to a meeting at the business park. A shopper wants a pickup at the mall and a ride home. A commuter wants a short transfer to the metro station and back.",
    "Because so much of the area is one cluster of large buildings, the exact meeting point matters more than the district name. Tell us the mall, the business park, the hotel or the street, and the entrance or gate you will use.",
    "Several nearby places that people connect with Granada are in other districts. Al Yarmuk, Al Hamra and Al Izdihar are neighbouring districts, and the Saqr Al Jazeera Aviation Museum is in Al Quds. We name each place by its own district below.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Granada",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Granada to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Granada to Riyadh Airport (RUH)", "about 24 km", "about 18 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Granada to KAFD", "about 17 km", "about 17 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Granada to Olaya", "about 22 km", "about 19 to 20 min"], href: pairHref("olaya") },
      { cells: ["Granada to Diriyah", "about 21 km", "about 20 min"], href: pairHref("diriyah") },
      { cells: ["Granada to Ad Dirah", "about 26 km", "about 23 to 25 min"], href: pairHref("ad-dirah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Granada and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const community = text("community", "Granada Mall and Granada Business Park", [
    "Granada Mall's own visitor information says it is on the Eastern Ring Road between Exit 8 and Exit 9 in the Ghirnatah district, and that visitors can arrive by car, metro, bus or taxi. It lists a main entrance, Gate 1, and a southern wing entrance, Gate 10. Tell us which entrance you want, or agree a meeting point the car can reach. We cannot promise a particular entrance or waiting position, and we do not publish opening hours or parking terms, which change. Check the mall's own information, and ask for the return pickup in the same request, because evenings and weekends are busy.",
    "Granada Business Park gives its address as Eastern Ring Branch Road, Ghirnatah, and says it is directly connected to Granada Metro Station and has a pedestrian sky bridge to the mall. For a meeting there, give the building, the reception or the gate, because a large business park has several. Gulf Elite Transport has no partnership with Granada Mall, Granada Business Park or any tenant, and a booking is a private ride arranged for your request.",
  ]);

  const hotel = text("hotel", "Hotels, hospital visits and visitor transfers", [
    "OpenStreetMap places the Hilton Riyadh Hotel and Residences in Granada, on the Eastern Ring Road, and Mouwasat Hospital in Granada, on Abi Jaafar Al Mansour street. For a hotel pickup, send the hotel name, the entrance and your guest name if the hotel needs it, plus your destination and time. We do not state hotel services or partnerships, and a booking does not include any room or hotel arrangement.",
    "For a hospital visit, give the building and the entrance you need, because hospitals often have several. A ride does not include any appointment, it is not an emergency or medical transport service, and we cannot give medical advice. For a return trip, ask for the pickup in the same request, with a time window. Waiting is agreed separately and is never assumed.",
  ]);

  const metro = text("metro", "Granada Metro Station and your taxi", [
    `An independent Riyadh Metro information site lists a station called Granadia on Line 6 (Purple), an elevated station between SABIC and Al Yarmuk that opened in 2024. The Granada Business page calls it Granada Metro Station, so the spelling differs by source. The site's listed coordinates put it about ${mallToStation} km from Granada Mall's mapped position, in a straight line. That is not a walking distance, and we do not say how long the walk or the connection takes.`,
    "We could not check this against the official operator, so please check the official Riyadh Metro and Darb information for current services, hours and fares. A taxi can work alongside the metro: it can take you from your door to the station, or collect you from it when you arrive with luggage, and it suits family groups, fixed pickup times and journeys the metro does not reach. We do not publish fares, hours, train frequencies or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const airport = text("airport", "Airport transfers between Granada and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 24 km from the centre of Granada by road. In light traffic the drive takes roughly 18 minutes, which makes Granada one of the closer eastern districts to the airport. Busy hours, the terminal you are using and your exact starting point can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your hotel, building or street. For an arrival, send your landing time and where you are going. If your flight is at an unusual hour, say so in the request, so the pickup time is agreed in advance. A return transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const business = text("business", "Business and city journeys from Granada", [
    "KAFD is about 17 km from Granada by road, roughly 17 minutes in light traffic, via Dammam Road and the Northern Ring Road according to routing data. KAFD has controlled tower entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and we do not promise access to towers or private car parks.",
    "Olaya is about 22 km away, roughly 19 to 20 minutes, and has many towers, hotels and shopping streets, so give the name of the building you are going to. Diriyah is about 21 km away, roughly 20 minutes, and Ad Dirah in the old centre of the city is about 26 km away, roughly 23 to 25 minutes.",
  ]);

  const residential = text("residential", "Home pickups and family rides in Granada", [
    "Residents of Granada and the streets around it often book a ride from the front door. Send the street, the building number and a landmark that is easy to recognise, or a location pin on WhatsApp. If you live in a compound or a building with a controlled entrance, tell us the gate you will use. A taxi booking does not give permission to enter private property, so confirm access with your host or the property management, or agree a meeting point outside the gate.",
    "Families can book one ride for the whole group. Tell us how many adults and children are travelling and how many bags you have, and we confirm a vehicle that suits them before you commit. For school journeys, give the school and the exact gate, and allow extra time at start and finish times.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact meeting point, which matters around a large mall, a business park and a hospital. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys a planned pickup time works backwards from your flight, and for meetings and appointments it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy mall entrances and hospital gates. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["al-izdihar", "al-yarmuk", "al-hamra", "al-mughrizat", "al-falah", "qurtubah", "al-wadi"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 6);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Granada",
    kind: "links",
    intro: "These districts are close to Granada but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 22 km by road" },
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 17 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (Granada Mall, Granada Business Park, a hotel or hospital visit, a metro station transfer or an airport transfer), your pickup place and entrance, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Granada",
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
    h2: "Granada taxi service: questions",
    kind: "faq",
    items: [
      { q: "Can I book a taxi in Granada, Riyadh?", a: "Yes. Message us on WhatsApp or use the booking form on this page. Send your pickup place, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange a taxi to Granada Mall?", a: "Yes. Tell us the entrance you want, such as the main entrance or the southern wing, or agree a meeting point. We cannot promise a particular entrance or waiting spot, and we do not state the mall's hours or parking terms." },
      { q: "Is taxi service available for Granada Business Park journeys?", a: "Yes. Give the building, the reception or the gate you need. The park gives its address as Eastern Ring Branch Road, Ghirnatah." },
      { q: "Can I book an airport transfer from Granada?", a: "Yes. The airport is about 24 km by road, roughly 18 minutes in light traffic. Send your flight number, the date and time, and your passengers and bags." },
      { q: "Can I arrange a pickup near Granada Metro Station?", a: "Yes. A ride to or from the station is a normal private ride, quoted for your request. Tell us the pickup point you want, and we confirm it with you." },
      { q: "Is Granada the same as Ghirnatah?", a: "They are two spellings of the same district. Granada Mall and Granada Business Park both use their district name in official addresses." },
      { q: "Can I travel from Granada to nearby districts?", a: "Yes. Al Yarmuk, Al Hamra, Al Izdihar and Al Mughrizat are neighbouring districts. Name the place you are going to." },
      { q: "Can I request a hotel pickup in the Granada area?", a: "Yes. Send the hotel name, the entrance, your destination and the time. A booking does not include any hotel service, and we have no hotel partnership." },
      { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Do journey times change during the day?", a: "Yes. The times on this page are for light traffic, and busy hours, your exact pickup and the entrance of your destination change them. They are not promised journey times." },
      { q: "How can I contact Gulf Elite Transport Group to arrange a ride?", a: "Use WhatsApp or the booking form on this page. A WhatsApp message is a request, and the booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Granada",
    kind: "local",
    intro: "Find Granada on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
    mapQuery: "24.7912,46.7437",
    mapLabel: "Granada, Riyadh",
    directionsTitle: "Driving Directions from Granada, Riyadh",
    directions: GRANADA_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby east and north-east Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Granada destinations and nearby places", links: PLACES.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: OTHERS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
    ],
    weatherTitle: "Current Weather in Granada, Riyadh",
    weather: { place: "Granada, Riyadh", lat: 24.7912, lng: 46.7437 },
  };

  return {
    title: "Granada Taxi Service Riyadh | Mall, Metro and Airport Rides",
    description: "Granada Taxi Service for Granada Mall and Business Park trips, hotel and metro transfers, home pickups and airport rides in Riyadh. Fare confirmed first.",
    h1: "Granada Taxi Service in Riyadh",
    lead: "Granada Taxi Service from Gulf Elite Transport: private rides to Granada Mall and Granada Business Park, to and from the metro station and the airport, and from your home or hotel, with your meeting point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Granada, also written Ghirnatah, an east Riyadh district with Granada Mall, Granada Business Park and a Line 6 metro station, Gulf Elite Transport takes bookings for private taxi rides to the mall and the business park, hotel and hospital transfers, rides to and from the metro station, home pickups and airport transfers to King Khalid International Airport (RUH), about 24 km by road. A booking does not give entry to private property or a particular mall entrance. Send your pickup place, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 24 km by road" },
      { label: "KAFD", value: "about 17 km by road" },
      { label: "Olaya", value: "about 22 km by road" },
      { label: "Metro", value: "Granada station on Line 6" },
    ],
    sections: addImages(
      [about, journeys, community, hotel, metro, airport, business, residential, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local],
      me.name,
      {
        about: { slot: "granada-neighbourhood", alt: "Streets and buildings in Granada, Riyadh", label: "Photo: granada-neighbourhood.webp" },
        community: { slot: "granada-mall-business-park", alt: "Granada Mall and Granada Business Park area in Riyadh", label: "Photo: granada-mall-business-park.webp" },
        metro: { slot: "granada-local-transport", alt: "A local transport setting near Granada Metro Station in Riyadh", label: "Photo: granada-local-transport.webp" },
      },
    ),
    whatsappMessage: GRANADA_WHATSAPP_MESSAGE,
  };
}
