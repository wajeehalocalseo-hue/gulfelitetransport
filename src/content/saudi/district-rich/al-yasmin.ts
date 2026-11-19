import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Yasmin Taxi Service: the hand-written landing page for Al Yasmin, a residential district in north Riyadh (see district-rich/index.ts).
 * Written mostly as prose paragraphs (the owner asked for more content and fewer boxed cards so she can add internal links).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Al Yasmin centre in riyadh-areas.ts and the other centres):
 * RUH about 21 km and about 15 min (20.7 km / 15 min; the old page said 21 km / 15 min); Olaya about 19 km and about 19 to 20 min (19.1 / 19; old 19 / 20); KAFD about 11 km and about 14 to 15 min
 * (10.6 / 14; the old page said 12 km / 15 min); Ad Dirah about 26 km and about 23 to 25 min (26.1 / 23; old 26 / 25); Diriyah about 20 km and about 18 to 20 min (19.6 / 18; old 20 / 20).
 * Straight-line distances to neighbouring districts are computed from the district centres (haversine) and labelled as straight lines.
 * Sources: none usable for local detail. Riyadh.Travel has no Al Yasmin page (404), and the park, hospitals, university and schools named in the brief could not be geocoded or placed in the district
 * (a search for "Al Yasmin Park" returned a park in Harmah governorate, not in Riyadh), so the page names NO park, hospital, university, school or mall and describes only everyday residential journeys.
 * Metro: Al Yasmin has no confirmed station. The independent site riyadhmetro.org lists Dr Sulaiman Al Habib on Line 1 (Blue) as an elevated stop on King Fahad Road (24.8116/46.6265), naming
 * An Nakheel, Ar Rahmaniyah and Al Aqiq as its districts and not Al Yasmin. The official rpt.sa site could not be opened (403), so the page calls it a station that may be considered and gives no distances.
 * NOT verified / left out: Al Yasmin Park, Dr Sulaiman Al Habib Hospital, Kingdom Hospital, Al Yamamah University, Riyadh Park, the exact district boundary and named roads. No partnership with any business,
 * hospital, school or Riyadh Metro; no fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

export const ALYASMIN_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Yasmin, Riyadh. The trip is [for example a home pickup, an airport transfer, a family trip, a school or appointment run or a ride to KAFD], my pickup point is [street, building and gate], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alYasminRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-yasmin");
  if (!me) throw new Error("Al Yasmin is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about = text("about", "Al Yasmin: a residential district in north Riyadh", [
    "Al Yasmin is a residential district in the north of Riyadh. It is made up mostly of villas and apartment buildings, with schools, small shopping streets and everyday services close to where people live. It lies near Al Narjis, Al Sahafah and Al Malqa, and the King Abdullah Financial District (KAFD) is a short drive away to the south.",
    "People who live here use a taxi for ordinary reasons. A family needs a comfortable ride to the airport with luggage. A parent needs a driver for a school run or an appointment. A worker wants to reach KAFD or Olaya without driving or parking. Others simply want a car to the shops or a restaurant in the evening and a ride home afterwards.",
    "Many streets in this part of Riyadh are fairly new, and some addresses are inside compounds with their own gates. For that reason this page spends time on how to describe your pickup point. A clear street, building number, gate and landmark, or a location pin sent on WhatsApp, is the quickest way to make sure the driver finds you.",
    "District boundaries are not drawn in exactly the same place on every map. If your address is near the edge of Al Yasmin, give the street and the building rather than only the district name, and tell us the place you are going to as well.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Yasmin",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Yasmin to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Yasmin to Riyadh Airport (RUH)", "about 21 km", "about 15 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Yasmin to KAFD", "about 11 km", "about 14 to 15 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Yasmin to Olaya", "about 19 km", "about 19 to 20 min"], href: pairHref("olaya") },
      { cells: ["Al Yasmin to Diriyah", "about 20 km", "about 18 to 20 min"], href: pairHref("diriyah") },
      { cells: ["Al Yasmin to Ad Dirah", "about 26 km", "about 23 to 25 min"], href: pairHref("ad-dirah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, road access, the time of day and any stops change the time, so they are not a promised journey time.",
  };

  const residential = text("residential", "Home, villa and apartment pickups in Al Yasmin", [
    "Most rides from Al Yasmin start at a front door or a building entrance. To make the pickup smooth, send the street name, the villa or building number and a landmark that is easy to recognise, such as a mosque, a shop or a junction. If your street is new and does not show properly on some maps, a location pin sent on WhatsApp usually works better than any written address.",
    "If you live in a compound, tell us its name and which gate you will use, because compounds often have more than one. A taxi booking does not give permission to enter a gated community. Where entry is controlled, please confirm the arrangement with your host or the property management, or agree a meeting point just outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Please also share a phone number you will answer, how many passengers there are and how many bags. This lets us confirm a vehicle that suits the trip and lets the driver call you when they arrive. If you need a ride home later, ask for the return pickup in the same request and give a time window.",
  ]);

  const airport = text("airport", "Airport transfers between Al Yasmin and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 21 km from the centre of Al Yasmin by road. In light traffic the drive takes roughly 15 minutes, which makes Al Yasmin one of the closer residential districts to the airport. Busy hours, the terminal you are using and the exact starting address can all add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "Airport rides work in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and the amount of luggage, together with your street, building and gate. For an arrival, send your landing time and the address you are going to. If your flight leaves very early in the morning or lands late at night, tell us in the request so the pickup time is agreed in advance and the car is arranged for that hour.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const family = text("family", "Family rides, school runs and everyday trips", [
    "Families in Al Yasmin often book a single ride for the whole group, whether it is a trip to a restaurant, a visit to relatives or the airport run with suitcases. Tell us how many adults and children are travelling and how many bags you have. The vehicle is chosen from that information and confirmed with you before you commit, so there is no need to guess what will fit.",
    "For school runs, give the school and the exact entrance, and allow extra time, because school start and finish times are busy on residential streets. For clinic or hospital visits, give the name of the facility, the branch and the entrance you need. We do not name specific schools, clinics or shops on this page, because we could not confirm their exact locations, so the details you send are what the driver relies on. A ride does not include any appointment, and it is not an emergency or medical transport service.",
    "For shopping, cafes, restaurants and park visits, share the exact entrance or meeting point and ask for the return in the same request. Waiting time is agreed separately and is never assumed, and we cannot promise a particular entrance, a restricted lane or a waiting position.",
  ]);

  const business = text("business", "Business and cross-city journeys from Al Yasmin", [
    "KAFD is about 11 km from Al Yasmin by road, roughly 14 to 15 minutes in light traffic, which suits office commutes and meetings. KAFD is a separate district with controlled tower entrances, so name the tower and the entrance you need. We agree a meeting point that the car can reach and we do not promise access to towers, visitor entrances or private car parks.",
    "Olaya is about 19 km away by road, roughly 19 to 20 minutes, and has many towers, hotels and shopping streets, so give the name of the building you are going to. Diriyah is about 20 km away by road, roughly 18 to 20 minutes, and Ad Dirah in the old centre of the city is about 26 km away, roughly 23 to 25 minutes. Gulf Elite Transport has no partnership with KAFD or any business, and the booking is simply a private ride arranged for your request.",
  ]);

  const metro = text("metro", "Riyadh Metro and Al Yasmin", [
    "Al Yasmin does not have a confirmed metro station of its own. An independent Riyadh Metro information site lists Dr Sulaiman Al Habib on Line 1 (Blue), an elevated stop on King Fahad Road, and it places that station in other districts. It is a station you might consider, not a station in Al Yasmin, and which station suits you best depends on your exact address. We could not check this against the official operator, so please check the official Riyadh Metro information for current stations and services.",
    "A taxi can be a useful link. A private ride can take you from your door to a station, or from a station to an address the metro does not reach, and it suits luggage, a group or a fixed pickup time. Send your exact address and we suggest a drop-off. We do not publish walking distances, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const pickup = text("pickup", "How to describe your pickup and drop-off", [
    "Good pickup details save time for everyone. Send the street and building number, the compound name and gate if there is one, and a nearby landmark. Add the entrance or the point on a nearby road where the car can meet you, the building and entrance you are going to, the number of passengers and bags, and the time you want a return pickup if you need one.",
    "New streets, gated compounds and busy school or evening entrances can all change where a driver is able to stop. That is why the exact meeting point is agreed for each request, and why we ask for a reachable phone number.",
  ]);

  const map: Section = {
    id: "map",
    h2: "Al Yasmin on the map",
    kind: "map",
    intro: "See where Al Yasmin is in Riyadh, and open the metro station below in Google Maps to check the roads before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Al Yasmin, Riyadh",
    places: [{ name: "Dr Sulaiman Al Habib Metro Station", query: "Dr Sulaiman Al Habib Metro Station, Riyadh", note: "Line 1 (Blue), outside the district" }],
  };

  const near = ["al-narjis", "al-sahafah", "al-malqa", "al-ghadir", "al-aqiq"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Yasmin",
    kind: "links",
    intro: "These districts are close to Al Yasmin but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 11 km by road" },
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 20 km by road" },
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 19 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (a home pickup, an airport transfer, a family trip, a school or appointment run or a ride to KAFD), your street, building and gate or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Yasmin",
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
    h2: "Al Yasmin taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Yasmin?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a private taxi from my home in Al Yasmin?", a: "Yes. Give the street, the building number, the gate if there is one, and a landmark. A booking does not give entry to a gated community, so we may agree a meeting point outside the gate." },
      { q: "How far is Al Yasmin from Riyadh Airport?", a: "About 21 km by road. In light traffic the drive takes roughly 15 minutes, and busy times add time." },
      { q: "Can I book a taxi from Al Yasmin to KAFD?", a: "Yes. KAFD is about 11 km by road, roughly 14 to 15 minutes in light traffic. Name the tower and the entrance." },
      { q: "Can I book a taxi from Al Yasmin to Olaya?", a: "Yes. Olaya is about 19 km by road, roughly 19 to 20 minutes in light traffic. Name the tower or building you are going to." },
      { q: "Can I book a family taxi in Al Yasmin?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "Can I book a taxi from Al Yasmin to Al Narjis?", a: "Yes. Al Narjis is a neighbouring district about 2 km to the north in a straight line. Name the place you are going to." },
      { q: "Can I arrange an early-morning or late-night pickup?", a: "Yes. Tell us the time in your request. Availability is confirmed for each request, and the pickup time is agreed with you in advance." },
      { q: "Does Al Yasmin have a metro station?", a: "Not a confirmed one of its own. An independent metro site lists Dr Sulaiman Al Habib on Line 1 (Blue) in a neighbouring area. Check the official Riyadh Metro information." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Is Al Yasmin the same as Al Malqa or Al Sahafah?", a: "No. They are neighbouring districts. Name the place you are going to when you book." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  return {
    title: "Al Yasmin Taxi Service Riyadh | Home Pickups and Airport",
    description: "Book a private taxi in Al Yasmin, Riyadh for home pickups, family trips, school runs, KAFD rides and airport transfers. Fare confirmed first.",
    h1: "Al Yasmin Taxi Service in Riyadh",
    lead: "Private rides from your home in Al Yasmin for family trips, school and appointment runs, KAFD journeys and airport transfers, with your meeting point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Yasmin, a residential district in north Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, school and appointment runs, business rides to KAFD (about 11 km by road) and airport transfers to King Khalid International Airport (RUH), about 21 km by road. Al Yasmin has no confirmed metro station of its own, and a taxi can connect you to one. Send your pickup address or map pin, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 21 km by road" },
      { label: "KAFD", value: "about 11 km by road" },
      { label: "Olaya", value: "about 19 km by road" },
      { label: "Area type", value: "residential, north Riyadh" },
    ],
    sections: addLinks(addImages([about, journeys, residential, airport, family, business, metro, pickup, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name, {
        about: { slot: "al-yasmin-riyadh-taxi-service", alt: "A white SUV in front of villa gates while a woman in black holds the door and a couple with a girl carrying a backpack stand beside it", label: "Photo: al-yasmin-riyadh-taxi-service", w: 1000, h: 558 },
        airport: { slot: "al-yasmin-riyadh-airport-transfer", alt: "A man in a white shirt lifts a suitcase beside a navy SUV with its door open while an older woman and a man with a briefcase wait at an airport kerb", label: "Photo: al-yasmin-riyadh-airport-transfer", w: 1000, h: 558 },
        family: { slot: "al-yasmin-family-school-run-taxi", alt: "A woman in a dark suit and a man stand with a boy and a girl carrying school backpacks beside an open silver van", label: "Photo: al-yasmin-family-school-run-taxi", w: 1000, h: 558 },
        business: { slot: "al-yasmin-riyadh-private-taxi-journey", alt: "The inside of a car where a woman in the rear seat holds a phone behind a driver in a suit, with city towers through the window", label: "Photo: al-yasmin-riyadh-private-taxi-journey", w: 1000, h: 558 },
        pickup: { slot: "al-yasmin-riyadh-taxi-pickup-point", alt: "A man in a suit, a girl with a school backpack and a woman in a headscarf beside a maroon SUV with its door open at a gate", label: "Photo: al-yasmin-riyadh-taxi-pickup-point", w: 1000, h: 558 },
      }), ctx, "al-yasmin"),
    whatsappMessage: ALYASMIN_WHATSAPP_MESSAGE,
  };
}
