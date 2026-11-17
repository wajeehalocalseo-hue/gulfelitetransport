import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Hamra Taxi Service: the hand-written landing page for Al Hamra, a residential district in east Riyadh with a metro interchange (see district-rich/index.ts).
 * Primary focus keyword: "Al Hamra Taxi Service" (title, H1, opening sentence, description). Written mostly as prose.
 *
 * IMAGES (TODO for the owner): three slots are reserved, with these exact files in public/images/routes/riyadh-districts/al-hamra-taxi-service/ :
 *   al-hamra-neighbourhood.webp        a realistic Al Hamra residential street or local setting                    -> "about" section
 *   al-hamra-metro-interchange.webp    Al Hamra metro station or a local transport setting in east Riyadh          -> "metro" section
 *   al-hamra-local-destinations.webp   a shopping street or local destination in or near Al Hamra                   -> "community" section
 * No supplied images were found in the project, so labelled placeholders are shown. Do not use fleet photographs that are not the company's own.
 *
 * CENTRE POINT: riyadh-areas.ts stores Al Hamra at 24.7762/46.7527, which matches the brief (24.77617/46.75265). OpenStreetMap places Al Hamra Square (24.7665/46.7546) and Aster Sanad Hospital (24.7792/46.7395)
 * in Al Hamra, both within about 1.5 km of that point, so the shared point is used unchanged. The metro station is listed at 24.7764/46.7768, about 2.4 km east of that point, so it is described as a station "listed
 * in the Al Hamra area" with a straight-line distance computed from the listed coordinates, not as the centre of the district.
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from the Al Hamra centre):
 * RUH about 26 km and about 20 min (26.3 km / 20 min); Olaya about 17 km and about 18 to 20 min (17.3 / 18); KAFD about 20 km and about 19 to 20 min (19.5 / 19); Ad Dirah about 24 km and about 22 to 25 min (23.7 / 22);
 * Diriyah about 23 km and about 22 to 25 min (23.1 / 22); Granada Mall about 4 km and about 8 min (4.0 / 8).
 * Roads in the driving paragraph are those OSRM returns: Khalid Bin Al Waleed Street, King Abdullah Road, Eastern Ring Road, Makkah Al Mukarramah Road, Airport Road, Northern Ring Road, King Fahd Branch Road, Olaya Street.
 * Places (OpenStreetMap / Nominatim): Al Hamra Square (called "Hamra Mall" in the brief; the official name is unconfirmed) and Aster Sanad Hospital (the brief's "Sanad Hospital") are labelled Al Hamra;
 * Saqr Al Jazeera Aviation Museum (24.7528/46.7371) is labelled Al Quds, NOT Al Hamra; Granada Mall (24.7818/46.7312) is in Granada; King Fahd International Stadium (24.7886/46.8391) and the Riyadh International
 * Convention and Exhibition Center (24.7523/46.7263, Al Mughrizat) are elsewhere. Al Hokair Land closed in April 2021 and is not mentioned. The Water Splash, Al Marsa Resorts, Al Hamra Park and Jarir stores
 * could not be located, so they are left out. No opening hours, admission or parking are published for any place.
 * Metro (independent site riyadhmetro.org, date-checked 17 Nov 2026): Al Hamra is a shared elevated station of Line 2 (Red, between Khalid Bin Alwaleed Road and Al Khaleej) and Line 6 (Purple, between Al Yarmuk and Al Andalus),
 * opened 2024. The official rpt.sa site returned 403, so the page says "listed" and sends people to the official information; no fares, hours, frequencies or journey times.
 * NOT verified / left out: official names of the mall and hospital, named schools, King Faisal District's centre, the exact district boundary. No partnership with any venue, hospital or Riyadh Metro; no fares,
 * ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises, access to gated places or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const ALHAMRA_DIRECTIONS =
  "Most drives from Al Hamra start on Khalid Bin Al Waleed Street or King Abdullah Road. For Olaya, routing data follows King Abdullah Road to Olaya Street. For Ad Dirah, it continues to the Eastern Ring Road and Makkah Al Mukarramah Road. For the airport and KAFD, the route joins the Eastern Ring Road, then Airport Road or the Northern Ring Road and King Fahd Branch Road. These roads come from OpenStreetMap routing and are only a guide. The best route depends on your exact pickup location, your destination entrance and current traffic. Please confirm your pickup point with us.";

const METRO = { name: "Al Hamra", lat: 24.7764, lng: 46.7768 };

const DISTRICTS = ["Al Hamra", "Granada", "Al Quds", "Al Yarmuk", "Al Khaleej", "Al Mughrizat", "Ishbiliyah", "Al Rawdah", "Al Izdihar", "Al Andalus", "King Faisal District", "Al Falah", "Al Munsiyah"];
const PLACES = ["Al Hamra Metro Station", "Al Hamra Square", "Aster Sanad Hospital", "Granada Mall", "Saqr Al Jazeera Aviation Museum", "Riyadh International Convention and Exhibition Center", "King Fahd International Stadium"];
const OTHERS = ["Olaya", "KAFD", "Ad Dirah", "Diriyah", "King Khalid International Airport"];
const riyadhQuery = (n: string) => (n === "KAFD" ? "King Abdullah Financial District, Riyadh, Saudi Arabia" : /Metro Station$/.test(n) ? `${n}, Riyadh Metro, Riyadh, Saudi Arabia` : `${n}, Riyadh, Saudi Arabia`);

export const ALHAMRA_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Hamra, Riyadh. The trip is [for example a home pickup, a transfer to or from Al Hamra metro station, a family trip, a shopping trip or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alHamraRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-hamra");
  if (!me) throw new Error("Al Hamra is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;
  const stKm = fmtKm(haversine(me, METRO as unknown as CityArea));
  const stDir = compass(bearing(me, METRO as unknown as CityArea));

  const about = text("about", "Al Hamra: a residential district in east Riyadh", [
    "Al Hamra is a residential district in the east of Riyadh, in the Al Rawdah municipality. It is made up mostly of villas and apartment buildings, with shopping streets, schools and services close to where people live. King Abdullah Road runs through the area, and the Eastern Ring Road is close by. It lies near Granada, Al Quds, Al Yarmuk and Al Khaleej.",
    "Al Hamra Taxi Service is for the everyday journeys of a busy eastern district. A household needs a comfortable ride to King Khalid International Airport with luggage. A parent needs a driver for a school run or a clinic appointment. A worker wants to reach Olaya or KAFD without driving and parking. Others want a car to the shops in the evening, or a lift to the metro station and back.",
    "Al Hamra is also known for its metro interchange, which makes it a useful starting point for people who combine a train journey with a private ride. The taxi page below explains how the two can work together, and where a door-to-door taxi is the simpler choice.",
    "District boundaries are not drawn in exactly the same place on every map, and several places near Al Hamra belong to neighbouring districts. We name each place by its own district below, so you know where you are going.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Hamra",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Hamra to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Hamra to Riyadh Airport (RUH)", "about 26 km", "about 20 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Hamra to Olaya", "about 17 km", "about 18 to 20 min"], href: pairHref("olaya") },
      { cells: ["Al Hamra to KAFD", "about 20 km", "about 19 to 20 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Hamra to Diriyah", "about 23 km", "about 22 to 25 min"], href: pairHref("diriyah") },
      { cells: ["Al Hamra to Ad Dirah", "about 24 km", "about 22 to 25 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Hamra to Granada Mall", "about 4 km", "about 8 min"], href: pairHref("granada") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Hamra and the other district centres, the airport and Granada Mall, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const metro = text("metro", "Al Hamra Metro Station: a Line 2 and Line 6 interchange", [
    `An independent Riyadh Metro information site lists Al Hamra as a shared elevated station served by two lines: Line 2 (Red) and Line 6 (Purple). On Line 2 it sits between Khalid Bin Alwaleed Road and Al Khaleej stations, and on Line 6 between Al Yarmuk and Al Andalus. The site gives the station's location as ${stKm} km to the ${stDir} of the centre of Al Hamra, in a straight line calculated from its listed coordinates, so it is in the Al Hamra area but not at the middle of the district. The station was listed as opened in 2024.`,
    "We could not check this against the official operator, so please check the official Riyadh Metro and Darb information for current services, hours and fares. We do not publish fares, hours, train frequencies or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
    "A private taxi can work alongside the metro. It can take you from your door to the station at a time you agree, or collect you from the station when you arrive with luggage. It suits journeys beyond the metro network, family groups, and passengers who prefer one door-to-door ride to changing trains. Tell us the station and your address when you book, and we confirm the pickup point with you.",
  ]);

  const airport = text("airport", "Airport transfers between Al Hamra and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 26 km from the centre of Al Hamra by road. In light traffic the drive takes roughly 20 minutes. Busy hours, the terminal you are using and your exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "A private airport transfer works in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. If your flight leaves very early or lands late at night, say so in the request, so the pickup time is agreed in advance. A return airport transfer can be requested in the same booking.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const residential = text("residential", "Home, villa and apartment pickups in Al Hamra", [
    "Most rides from Al Hamra start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a main-road junction. A location pin sent on WhatsApp is even better, because it marks exactly where you will be waiting.",
    "If you live in a compound or a building with a controlled entrance, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Families often book one ride for the whole group. Tell us how many adults and children are travelling and how many bags you have, and we confirm a vehicle that suits them before you commit. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const community = text("community", "Shopping, healthcare and nearby places", [
    "OpenStreetMap lists Al Hamra Square, on King Abdullah Road, and Aster Sanad Hospital, on Khalid Bin Al Waleed Branch Street, in Al Hamra. We could not confirm their official names, so check each place's own information, and we do not publish opening hours, parking conditions or entrance details. Tell us the entrance you want and agree a meeting point the car can reach. Parking is not included in the fare, and we cannot promise a particular entrance or waiting position. For a hospital visit, give the building and the entrance you need. A ride does not include any appointment, and it is not an emergency or medical transport service.",
    "Several well-known places nearby are in other districts. Granada Mall is in Granada, about 4 km from Al Hamra by road. The Saqr Al Jazeera Aviation Museum is in Al Quds, and King Fahd International Stadium is further east. The Riyadh International Convention and Exhibition Center is in Al Mughrizat. Name the place you are going to, because a landmark near Al Hamra is not always inside it. For events at a stadium or an exhibition centre, ask for the return pickup in the same request, because exits are crowded.",
    "For school journeys, give the school and the exact gate, and allow extra time around start and finish times, because roads near schools can be busy at those hours. We do not name specific schools on this page, because we could not confirm their locations.",
  ]);

  const business = text("business", "Business and city journeys from Al Hamra", [
    "Olaya is about 17 km from Al Hamra by road, roughly 18 to 20 minutes in light traffic, via King Abdullah Road according to routing data. Olaya has many towers, hotels and shopping streets, so give the name of the building you are going to. KAFD is about 20 km away, roughly 19 to 20 minutes, and has controlled tower entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and we do not promise access to towers or private car parks.",
    "Diriyah is about 23 km away, roughly 22 to 25 minutes, and Ad Dirah in the old centre of the city is about 24 km away, roughly 22 to 25 minutes. Gulf Elite Transport has no partnership with KAFD or any business. A booking is a private ride arranged for your request.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters on busy roads and at controlled entrances. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys a planned pickup time works backwards from your flight, and for school and clinic runs it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy malls, hospital entrances and event venues. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["al-quds", "granada", "al-khaleej", "al-yarmuk", "al-mughrizat", "ishbiliyah", "al-izdihar", "al-rawdah"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 6);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Hamra",
    kind: "links",
    intro: "These districts are close to Al Hamra but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 17 km by road" },
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 20 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, a transfer to or from the metro station, a family trip, a shopping trip or an airport transfer), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Hamra",
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
    h2: "Al Hamra taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Hamra?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I arrange an airport transfer from Al Hamra?", a: "Yes. Send your flight number, the date and time, your terminal if you know it, and your passengers and bags. A return airport transfer can be requested in the same booking." },
      { q: "How far is Al Hamra from Riyadh Airport?", a: "About 26 km by road from the centre of the district. In light traffic the drive takes roughly 20 minutes, and busy times add time." },
      { q: "Can a taxi collect me from Al Hamra Metro Station?", a: "Yes. A ride to or from the station is a normal private ride, quoted for your request. Tell us the pickup point you want, and we confirm it with you." },
      { q: "Which metro lines serve Al Hamra station?", a: "An independent metro site lists Line 2 (Red) and Line 6 (Purple), which share the station. Check the official Riyadh Metro information for current services." },
      { q: "When is a taxi better than the metro?", a: "When you want one door-to-door ride, have luggage or a group, need a fixed pickup time or are going somewhere the metro does not reach." },
      { q: "Can I book a taxi from Al Hamra to KAFD?", a: "Yes. KAFD is about 20 km by road, roughly 19 to 20 minutes in light traffic. Name the tower and the entrance." },
      { q: "Is Granada Mall in Al Hamra?", a: "No. Granada Mall is in Granada, a neighbouring district about 4 km away by road. Name the place you are going to when you book." },
      { q: "Can I arrange a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "Can I book a family or group ride?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Do journey times change during the day?", a: "Yes. The times on this page are for light traffic, and busy hours, your exact pickup and the entrance of your destination change them. They are not promised journey times." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Al Hamra",
    kind: "local",
    intro: "Find Al Hamra on the map, read how the main roads lead out of the district, and open nearby neighbourhoods, destinations and the metro station in Google Maps.",
    mapQuery: "24.7762,46.7527",
    mapLabel: "Al Hamra, Riyadh",
    directionsTitle: "Driving Directions from Al Hamra, Riyadh",
    directions: ALHAMRA_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby east and north-east Riyadh districts", links: DISTRICTS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Nearby destinations and metro station", links: PLACES.map((n) => ({ name: n, query: riyadhQuery(n) })) },
      { title: "Other Riyadh destinations", links: OTHERS.map((n) => ({ name: n, query: riyadhQuery(n) })) },
    ],
    weatherTitle: "Current Weather in Al Hamra, Riyadh",
    weather: { place: "Al Hamra, Riyadh", lat: 24.7762, lng: 46.7527 },
  };

  return {
    title: "Al Hamra Taxi Service Riyadh | Metro, Home and Airport Rides",
    description: "Al Hamra Taxi Service for home pickups, metro station transfers, family trips and airport rides in Riyadh. Fare confirmed before you commit.",
    h1: "Al Hamra Taxi Service in Riyadh",
    lead: "Al Hamra Taxi Service from Gulf Elite Transport: private rides from your home in Al Hamra, to and from the metro station, to the airport and across the city, with your pickup point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Hamra, a residential district in east Riyadh with a Line 2 and Line 6 metro interchange, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, transfers to and from Al Hamra metro station, family and group journeys, shopping and school trips and airport transfers to King Khalid International Airport (RUH), about 26 km by road. A booking does not give entry to private property or controlled entrances. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 26 km by road" },
      { label: "Olaya", value: "about 17 km by road" },
      { label: "KAFD", value: "about 20 km by road" },
      { label: "Metro", value: "Line 2 and Line 6 interchange" },
    ],
    sections: addImages(
      [about, journeys, metro, airport, residential, community, business, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local],
      me.name,
      {
        about: { slot: "al-hamra-neighbourhood", alt: "Residential streets in Al Hamra, Riyadh", label: "Photo: al-hamra-neighbourhood.webp" },
        metro: { slot: "al-hamra-metro-interchange", alt: "A metro and local transport setting in Al Hamra, east Riyadh", label: "Photo: al-hamra-metro-interchange.webp" },
        community: { slot: "al-hamra-local-destinations", alt: "A shopping street and local places in Al Hamra, Riyadh", label: "Photo: al-hamra-local-destinations.webp" },
      },
    ),
    whatsappMessage: ALHAMRA_WHATSAPP_MESSAGE,
  };
}
