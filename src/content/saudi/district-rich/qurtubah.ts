import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import type { DistrictRichCtx } from "./olaya";

/**
 * Qurtubah Taxi Service: the hand-written landing page for Qurtubah, a residential district in north-east Riyadh (see district-rich/index.ts).
 * Written mostly as prose paragraphs (the owner asked for more content and fewer boxed cards).
 *
 * IMAGES (TODO for the owner): three slots are reserved, with these exact files in public/images/routes/riyadh-districts/qurtubah-taxi-service/ :
 *   qurtubah-neighbourhood.webp      a realistic Qurtubah residential neighbourhood (villas, apartments or streets)    -> "about" section
 *   qurtubah-airport-transfer.webp   a professional airport pickup or passenger-transfer scene suited to Saudi Arabia   -> "airport" section
 *   qurtubah-local-destinations.webp a verified local destination or business setting in the Qurtubah area               -> "destinations" section
 * No supplied images were found in the project, so labelled placeholders of the final size are shown. Do not use fleet photographs that are not the company's own.
 *
 * Figures (road distance, reviewed November 2026, light traffic, OpenStreetMap routing from the Qurtubah centre in riyadh-areas.ts to the other centres):
 * RUH about 25 km and about 19 to 20 min (24.7 km / 19 min; the old page said 25 km / 20 min); Olaya about 24 km and about 21 to 22 min (24.0 / 21; old 23 / 20); KAFD about 18 km and about 18 to 20 min
 * (18.1 / 18; old 19 / 20); Ad Dirah about 28 km and about 24 to 25 min (27.6 / 24; old 29 / 25); Diriyah about 22 km and about 20 to 22 min (21.7 / 21; old 22 / 20).
 * Road names in the driving paragraph are the ones OSRM returns on those routes (Dammam Road, Airport Road, Northern Ring Road, King Fahd Branch Road, Eastern Ring Road, Makkah Al Mukarramah Road).
 * Straight-line distances to neighbouring districts are computed from the district centres (haversine).
 * Places (OpenStreetMap / Nominatim): Park Avenue Mall is placed in Qurtubah on Said bin Zaid Road (24.8275/46.7284); Granada Mall (24.7818/46.7312) and Granada Business Park (24.7863/46.7273) are in Granada
 * (Ghirnatah), not in Qurtubah; Riyadh International Convention & Exhibition Center is in Al Mughrizat (24.7523/46.7263). Princess Nourah University, King Abdullah bin Abdulaziz University Hospital, Riyadh Front
 * and SABIC headquarters could not be geocoded, so they are not located or described beyond what the metro site says.
 * Metro: the independent site riyadhmetro.org lists SABIC (Lines 4 Yellow and 6 Purple, an interchange, 24.8072/46.7098), Granadia (Line 6 Purple, 24.7865/46.7293), PNU 1 (Line 4, 24.8404/46.7167, southern
 * end of the PNU campus) and PNU 2 (Line 4, 24.8598/46.7043, northern side of the campus), all opened 2024, none mentioning Qurtubah. The official rpt.sa site could not be opened (403), so the page names them as stations
 * that may be considered, says Qurtubah has no confirmed station of its own, and gives no distances, walking times, fares or hours.
 * NOT verified / left out: Riyadh Front, SABIC headquarters address, hospital names, the exact district boundary, Al Shuhada and Al Munisiyah (not in the district list). No partnership with any mall, university,
 * hospital, company or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises, access to gated places or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

/** Exactly 100 words, one paragraph. Checked in the QA step. */
export const QURTUBAH_DIRECTIONS =
  "Most drives from Qurtubah start on Dammam Road. For King Khalid International Airport, routing data follows Dammam Road and Airport Road. For KAFD and north-west Riyadh, the route usually continues on the Northern Ring Road and then King Fahd Branch Road. For Olaya and central Riyadh, the Eastern Ring Road connects to Makkah Al Mukarramah Road. These roads come from OpenStreetMap routing and are a guide, not instructions. The best route depends on your exact pickup location, your destination entrance and current traffic, so we do not promise a fixed travel time. Please always confirm your pickup point with us.";

const DISTRICTS = [
  "Qurtubah", "Granada", "Al Yarmuk", "Al Hamra", "Al Falah", "Al Izdihar", "Al Quds", "Al Rawdah", "Al Naseem", "Al Wadi",
  "Al Ghadir", "Al Narjis", "Al Yasmin", "Al Sahafah", "Al Malqa", "Al Mughrizat", "Al Rabwah", "Ishbiliyah", "KAFD", "Olaya",
];
const CITIES = ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam"];

export const QURTUBAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Qurtubah, Riyadh. The trip is [for example a home pickup, an airport transfer, a family trip, a shopping trip or a university visit], my pickup point is [street, building, compound and gate, or I will send a map pin], my destination is [destination, building and gate], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function qurtubahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "qurtubah");
  if (!me) throw new Error("Qurtubah is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about = text("about", "Qurtubah: a residential district in north-east Riyadh", [
    "Qurtubah is a residential district in the north-east of Riyadh. It is made up mostly of villas, apartment buildings and compounds, with shopping streets and everyday services close to where people live. It lies near Granada, Al Yarmuk and Al Izdihar, and the main road out of the area, Dammam Road, leads west towards the city centre and north towards the airport.",
    "People who live here use a taxi for ordinary reasons. A family needs a comfortable ride to King Khalid International Airport with luggage. A resident wants to reach KAFD, Olaya or an appointment without driving or parking. Students and staff travel to the large universities in the north of the city, and others simply want a car to the shops and a ride home afterwards.",
    "Many streets in this part of Riyadh are new, and some addresses are inside compounds with their own gates. For that reason this page spends time on how to describe your pickup point. A clear street, building number, gate and landmark, or a location pin sent on WhatsApp, is the quickest way to make sure the driver finds you.",
    "District boundaries are not drawn in exactly the same place on every map. If your address is near the edge of Qurtubah, give the street and the building rather than only the district name, and tell us the place you are going to as well.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Qurtubah",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Qurtubah to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Qurtubah to Riyadh Airport (RUH)", "about 25 km", "about 19 to 20 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Qurtubah to KAFD", "about 18 km", "about 18 to 20 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Qurtubah to Olaya", "about 24 km", "about 21 to 22 min"], href: pairHref("olaya") },
      { cells: ["Qurtubah to Diriyah", "about 22 km", "about 20 to 22 min"], href: pairHref("diriyah") },
      { cells: ["Qurtubah to Ad Dirah", "about 28 km", "about 24 to 25 min"], href: pairHref("ad-dirah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, the entrance of your destination, your choice of route and any stops change the time, so they are not a promised journey time.",
  };

  const airport = text("airport", "Airport transfers between Qurtubah and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 25 km from the centre of Qurtubah by road. In light traffic the drive takes roughly 19 to 20 minutes. Busy hours, the terminal you are using and your exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "Airport rides work in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate or a map pin. For an arrival, send your landing time and the address you are going to. If your flight leaves very early or lands late at night, say so in the request, so the pickup time is agreed in advance and the car is arranged for that hour.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const residential = text("residential", "Home, villa and family pickups in Qurtubah", [
    "Most rides from Qurtubah start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a junction. If your street is new and does not show properly on some maps, a location pin sent on WhatsApp usually works better than any written address.",
    "If you live in a compound, tell us its name and which gate you will use, because compounds often have more than one. A taxi booking does not give permission to enter a gated community. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Families often book one ride for the whole group. Tell us how many adults and children are travelling and how many bags you have. The vehicle is chosen from that information and confirmed with you before you commit. If you need a ride home later, ask for the return pickup in the same request and give a time window. Waiting time is agreed separately and is never assumed.",
  ]);

  const destinations = text("destinations", "Shopping, universities and nearby destinations", [
    "OpenStreetMap places Park Avenue Mall in Qurtubah itself, on Said bin Zaid Road. Granada Mall and Granada Business Park are different. They are in Granada, also written Ghirnatah, which is a neighbouring district and not part of Qurtubah, so say which one you mean when you book. We do not publish opening hours, parking conditions or entrance details for any mall. Check the mall's own information, tell us the entrance you want and agree a meeting point the car can reach. Parking is not included in the fare, and we cannot promise a particular entrance or waiting position.",
    "Princess Nourah bint Abdulrahman University (PNU) is a very large campus in northern Riyadh, and Imam Mohammad Ibn Saud Islamic University is another large campus in the north. Campuses have several gates and many buildings, so tell us the university, the building and the gate, or the entrance of the hospital or clinic you are visiting. We cannot promise access to restricted areas, staff parking or controlled gates, and Gulf Elite Transport has no partnership with any university or hospital.",
    "The Riyadh International Convention and Exhibition Center (RICEC) is in Al Mughrizat. Riyadh Front is a different place, so please name the exact venue and the hall or gate when you book for an event. We do not state details for either venue, because they change with each event.",
  ]);

  const business = text("business", "Business and cross-city journeys from Qurtubah", [
    "KAFD is about 18 km from Qurtubah by road, roughly 18 to 20 minutes in light traffic, which suits office commutes and meetings. KAFD is a separate district with controlled tower entrances, so name the tower and the entrance you need. We agree a meeting point that the car can reach and we do not promise access to towers, visitor entrances or private car parks.",
    "Olaya is about 24 km away by road, roughly 21 to 22 minutes, and has many towers, hotels and shopping streets, so give the name of the building you are going to. Diriyah is about 22 km away, roughly 20 to 22 minutes, and Ad Dirah in the old centre of the city is about 28 km away, roughly 24 to 25 minutes. Gulf Elite Transport has no partnership with KAFD, SABIC or any business. A booking is a private ride arranged for your request.",
  ]);

  const metro = text("metro", "Riyadh Metro near Qurtubah", [
    "Qurtubah does not have a confirmed metro station of its own. An independent Riyadh Metro information site lists several stations in the north-east that you might consider: SABIC, where Line 4 (Yellow) and Line 6 (Purple) meet; Granadia on Line 6 (Purple); and PNU 1 and PNU 2 on Line 4 (Yellow), which serve the Princess Nourah University campus. These are stations in neighbouring areas, not stations inside Qurtubah, and the site does not link any of them to Qurtubah. Which one suits you best depends on your exact address.",
    "We could not check this against the official operator, so please check the official Riyadh Metro information for current stations and services. A taxi can be a useful link: a private ride can take you from your door to a station, or from a station to an address the metro does not reach, and it suits luggage, a group or a fixed pickup time. We do not publish walking distances, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const prebook = text("prebook", "Why pre-book your ride", [
    "Booking ahead gives you time to agree the exact pickup point, which matters on new streets and in gated compounds. It lets us confirm a vehicle that suits your passengers and bags, and it means you know the fare before you commit. For airport journeys, a planned pickup time works backwards from your flight, and for appointments and meetings it works backwards from the time you must arrive.",
    "A return pickup is also much easier to arrange in advance than to find later, especially at busy shopping and campus entrances. Ask for it in the same request, with a time window, and tell us if your plans change.",
  ]);

  const near = ["granada", "al-yarmuk", "al-izdihar", "al-hamra", "al-falah", "ishbiliyah"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Qurtubah",
    kind: "links",
    intro: "These districts are close to Qurtubah but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 18 km by road" },
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 24 km by road" },
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 22 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, an airport transfer, a family trip, a shopping trip or a university visit), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Qurtubah",
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
    h2: "Qurtubah taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Qurtubah?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "How far is Qurtubah from Riyadh Airport?", a: "About 25 km by road. In light traffic the drive takes roughly 19 to 20 minutes, and busy times add time." },
      { q: "Can a taxi collect me from a gated compound in Qurtubah?", a: "A booking does not give entry to a gated community. Confirm access with your host or the property management, or agree a meeting point outside the gate." },
      { q: "Is Granada Mall in Qurtubah?", a: "No. Granada Mall and Granada Business Park are in Granada, also written Ghirnatah, a neighbouring district. Park Avenue Mall is placed in Qurtubah on OpenStreetMap. Name the one you mean when you book." },
      { q: "Can I book a taxi to Princess Nourah University?", a: "Yes. Tell us the building and the gate, or the entrance of the hospital or clinic you are visiting. We cannot promise access to controlled gates or staff parking." },
      { q: "Can I book a taxi from Qurtubah to KAFD?", a: "Yes. KAFD is about 18 km by road, roughly 18 to 20 minutes in light traffic. Name the tower and the entrance." },
      { q: "Can I book a family or group ride?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "Can I arrange a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "Does Qurtubah have a metro station?", a: "Not a confirmed one of its own. An independent metro site lists SABIC, Granadia, PNU 1 and PNU 2 in neighbouring areas. Check the official Riyadh Metro information." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Is Riyadh Front the same as the Riyadh Exhibition Center?", a: "No. They are different places. The Riyadh International Convention and Exhibition Center is in Al Mughrizat. Name the exact venue and the gate when you book." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  const local: Section = {
    id: "local",
    h2: "Local information for Qurtubah",
    kind: "local",
    intro: "Find Qurtubah on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and major cities in Google Maps.",
    mapQuery: "24.8132,46.7329",
    mapLabel: "Qurtubah, Riyadh",
    directionsTitle: "Driving Directions from Qurtubah, Riyadh",
    directions: QURTUBAH_DIRECTIONS,
    linksTitle: "Neighbourhoods and Destinations",
    linkGroups: [
      { title: "Nearby Riyadh neighbourhoods", links: DISTRICTS.map((n) => ({ name: n, query: n === "KAFD" ? "King Abdullah Financial District, Riyadh, Saudi Arabia" : `${n}, Riyadh, Saudi Arabia` })) },
      { title: "Major Saudi cities", links: CITIES.map((n) => ({ name: n, query: `${n}, Saudi Arabia` })) },
    ],
    weatherTitle: "Current Weather in Qurtubah, Riyadh",
    weather: { place: "Qurtubah, Riyadh", lat: 24.8132, lng: 46.7329 },
  };

  return {
    title: "Qurtubah Taxi Service Riyadh | Home Pickups and Airport",
    description: "Book a private taxi in Qurtubah, Riyadh for home pickups, family rides, university and mall trips and airport transfers. Fare confirmed first.",
    h1: "Qurtubah Taxi Service in Riyadh",
    lead: "Private rides from your home in Qurtubah for airport transfers, family journeys, shopping and university trips, with your pin, gate and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Qurtubah, a residential district in north-east Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas, apartments and compounds, airport transfers to King Khalid International Airport (RUH), about 25 km by road, family and group journeys, shopping and university trips and business rides to KAFD (about 18 km by road). Many streets are new and may be missing from some maps, so send a location pin and the gate. A booking does not give entry to private property. Qurtubah has no confirmed metro station of its own, and Granada Mall is in the neighbouring district of Granada. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 25 km by road" },
      { label: "KAFD", value: "about 18 km by road" },
      { label: "Olaya", value: "about 24 km by road" },
      { label: "Area type", value: "residential, north-east Riyadh" },
    ],
    sections: addImages(
      [about, journeys, airport, residential, destinations, business, metro, prebook, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq, local],
      me.name,
      {
        about: { slot: "qurtubah-neighbourhood", alt: "Villas and residential streets in Qurtubah, Riyadh", label: "Photo: qurtubah-neighbourhood.webp" },
        airport: { slot: "qurtubah-airport-transfer", alt: "A private airport transfer for passengers travelling between Qurtubah and Riyadh Airport", label: "Photo: qurtubah-airport-transfer.webp" },
        destinations: { slot: "qurtubah-local-destinations", alt: "A shopping and business area near Qurtubah, Riyadh", label: "Photo: qurtubah-local-destinations.webp" },
      },
    ),
    whatsappMessage: QURTUBAH_WHATSAPP_MESSAGE,
  };
}
