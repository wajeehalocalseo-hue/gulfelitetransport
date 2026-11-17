import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Sahafah Taxi Service: the hand-written landing page for Al Sahafah, a mixed residential and commercial district in north Riyadh (see district-rich/index.ts).
 * Written mostly as prose paragraphs (the owner asked for more content and fewer boxed cards so she can add internal links).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Al Sahafah centre in riyadh-areas.ts and the other centres):
 * RUH about 25 km and about 18 to 20 min (24.8 km / 18 min; the old page said 26 km / 20 min); Olaya about 15 km and about 15 min (15.1 / 15; old 14 / 15); KAFD about 8 km and about 9 to 10 min
 * (7.5 / 9; the old page said 8.6 km / 10 min); Ad Dirah about 22 km and about 19 to 20 min (22.0 / 19; old 22 / 20); Diriyah about 14 km and about 15 min (14.1 / 16; old 15 / 15).
 * Straight-line distances to neighbouring districts are computed from the district centres (haversine) and labelled as straight lines.
 * Sources: none usable for local venues. A search could not place Al Sahafah Mall, the Saudi Press Agency, Al-Jazirah or Al Riyadh newspaper offices, or a Dr Sulaiman Al Habib hospital in Al Sahafah,
 * so the page names NO mall, media office, hospital or clinic, and says that tenants of offices and clinics should give the building and entrance.
 * Metro: the independent site riyadhmetro.org lists Dr Sulaiman Al Habib on Line 1 (Blue) as an elevated stop on King Fahad Road (24.8116/46.6265), between SAB Bank and KAFD, naming An Nakheel,
 * Ar Rahmaniyah and Al Aqiq as its districts and not Al Sahafah. The brief says a third-party guide places it in Al Sahafah, which could not be confirmed (official rpt.sa returned 403), so the page says
 * it is a station that may be considered, that sources differ on which district it is in, and that the best station depends on the address. No distances, walking times, fares or hours are published.
 * NOT verified / left out: Al Sahafah Mall, media offices, hospital and clinic names, Ar Rabi (no page), the exact district boundary and named roads. No partnership with any business, media body,
 * hospital or Riyadh Metro; no corporate accounts, fares, ratings, reviews, vehicle specifications, child seats, free waiting, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));
const text = (id: string, h2: string, paragraphs: string[]): Section => ({ id, h2, kind: "text", paragraphs });

export const ALSAHAFAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Sahafah, Riyadh. The trip is [for example an apartment pickup, an office ride, a clinic appointment, a metro station transfer or an airport transfer], my pickup point is [building, street and entrance], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alSahafahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-sahafah");
  if (!me) throw new Error("Al Sahafah is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about = text("about", "Al Sahafah: homes, offices and clinics in north Riyadh", [
    "Al Sahafah, also written Al Sahafa, is a district in the north of Riyadh that mixes apartment buildings, villas and compounds with offices, clinics, shops and restaurants. It sits between Al Aqiq, Al Yasmin and Al Malqa, and the King Abdullah Financial District (KAFD) is a short drive to the south.",
    "That mix of homes and workplaces creates a wide range of rides. Residents travel from their building to an office, an appointment, a metro station, KAFD or Olaya, or to the airport. Office workers and visitors arrive for meetings and need a driver who can find the right building and entrance. Many trips are short, but the streets are busy at commuting hours, so the exact address and entrance matter.",
    "District boundaries are not drawn in exactly the same place on every map. If your building is near the edge of Al Sahafah, give the street and the building name rather than only the district name, and tell us where you are going as well.",
  ]);

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Sahafah",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Sahafah to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Sahafah to Riyadh Airport (RUH)", "about 25 km", "about 18 to 20 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Sahafah to KAFD", "about 8 km", "about 9 to 10 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Sahafah to Olaya", "about 15 km", "about 15 min"], href: pairHref("olaya") },
      { cells: ["Al Sahafah to Diriyah", "about 14 km", "about 15 min"], href: pairHref("diriyah") },
      { cells: ["Al Sahafah to Ad Dirah", "about 22 km", "about 19 to 20 min"], href: pairHref("ad-dirah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup address, road access, the time of day and any stops change the time, so they are not a promised journey time.",
  };

  const residential = text("residential", "Apartment, villa and compound pickups", [
    "Most residential rides start at a building entrance. Send the building name or number, the street and a landmark that is easy to recognise. If the street is new or hard to find, a location pin sent on WhatsApp is the quickest way to mark the exact spot.",
    "If you live in a compound, tell us its name and the gate you will use. A booking does not give permission to enter a gated community, so please confirm the arrangement with your host or the property management, or agree a meeting point outside the gate that the car can reach. We do not promise access to private roads, compound parking or restricted entrances.",
    "Please share a phone number you will answer, the number of passengers and the amount of luggage. If you need a ride home afterwards, ask for the return pickup in the same request and give a time window.",
  ]);

  const office = text("office", "Office and business journeys", [
    "Al Sahafah has offices as well as homes, and many people travel here for meetings. We do not name specific offices, malls or media buildings on this page, because we could not confirm their exact locations. Tell us the building name and the entrance or reception you need, and we plan the meeting point around that. Many office buildings share a street, so the exact building avoids a wrong drop-off.",
    "KAFD is about 8 km from Al Sahafah by road, roughly 9 to 10 minutes in light traffic. It is a separate district with controlled tower entrances, so we agree a meeting point that the car can reach and we do not promise access to towers, visitor entrances or private car parks. Olaya is about 15 km away by road, roughly 15 minutes, so give the name of the tower or building you are going to.",
    "Gulf Elite Transport has no partnership with KAFD, any media body or any business. A booking is a private ride arranged for your request, with the vehicle, driver and fare confirmed before you commit.",
  ]);

  const metro = text("metro", "Taxi connections to the metro", [
    "An independent Riyadh Metro information site lists Dr Sulaiman Al Habib on Line 1 (Blue), an elevated stop on King Fahad Road between SAB Bank and KAFD. That site places the station in other districts, while other guides place it in Al Sahafah, so we cannot say which district it is in. It is a station you might consider, and which station suits you best depends on your exact address. We could not check this against the official operator, so please check the official Riyadh Metro information for current stations and services.",
    "A taxi can link your door to the station, or the station to an address the metro does not reach. A private ride suits luggage, a group or a fixed pickup time. Send your exact address and we suggest a drop-off. We do not publish walking distances, fares, operating hours or journey times, and Gulf Elite Transport is not part of the metro and has no partnership with it.",
  ]);

  const health = text("health", "Clinic and hospital appointments", [
    "Appointments are a common reason to book a ride, because they have a fixed time and place. We do not name specific hospitals or clinics on this page, because we could not confirm their exact branches and addresses, so please tell us the name of the facility, the branch and the entrance you need.",
    "Appointments can run over, so ask for a return pickup window and tell us if it changes. Waiting time is agreed separately and is never assumed. These are ordinary private rides: a booking does not include an appointment, it is not an emergency or medical transport service, and we cannot give patient assistance.",
  ]);

  const errands = text("errands", "Shopping and everyday trips", [
    "For local shops, cafes and restaurants, give the name of the place and the entrance you want, and ask for the return in the same request. If you will carry shopping bags, tell us so the vehicle suits them. We cannot promise a particular entrance, a restricted lane or a waiting position, and parking is not included in the fare.",
  ]);

  const airport = text("airport", "Airport transfers between Al Sahafah and RUH", [
    "King Khalid International Airport (RUH) is in the north of Riyadh, about 25 km from the centre of Al Sahafah by road. In light traffic the drive takes roughly 18 to 20 minutes, though busy hours, the terminal and your exact starting address can add time, so we plan the pickup with you and confirm it rather than promise a fixed duration.",
    "Airport rides work in both directions. For a departure, send your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and your building and street. For an arrival, send your landing time and where you are going in Al Sahafah. If your flight is early in the morning or late at night, say so in the request so the pickup time is agreed in advance.",
    "We do not promise flight tracking, delay monitoring, meet-and-greet service or a fixed waiting time. Pickup points at the airport follow the airport's own rules, and we confirm the meeting point with you before you travel.",
  ]);

  const family = text("family", "Family and group rides", [
    "Families in Al Sahafah often book a single ride for the whole group. Tell us how many adults and children are travelling and how many bags you have. The vehicle is chosen from that information and confirmed with you before you commit, and you can ask for the return pickup in the same request.",
  ]);

  const pickup = text("pickup", "Pickup and drop-off in Al Sahafah", [
    "Good pickup details save time. Send the building name or number and the street, the entrance or reception you will use, a point on a nearby road if the entrance is restricted, the building and entrance you are going to, the number of passengers and bags, and the time you want a return pickup if you need one.",
    "Busy commuting roads, office entrances and gated compounds can change where a driver is able to stop, so the exact meeting point is agreed for each request.",
  ]);

  const map: Section = {
    id: "map",
    h2: "Al Sahafah on the map",
    kind: "map",
    intro: "See where Al Sahafah is in Riyadh, and open the metro station below in Google Maps to check the roads before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Al Sahafah, Riyadh",
    places: [{ name: "Dr Sulaiman Al Habib Metro Station", query: "Dr Sulaiman Al Habib Metro Station, Riyadh", note: "Line 1 (Blue)" }],
  };

  const near = ["al-aqiq", "al-yasmin", "al-malqa", "al-ghadir", "king-abdullah-financial-district", "al-narjis"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Sahafah",
    kind: "links",
    intro: "These places are close to Al Sahafah but are not part of it. The distances below are straight-line distances between centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Offices, hotels and shopping, about 15 km by road" },
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 14 km by road" },
    ],
  };

  const whatsapp = text("whatsapp", "How to book on WhatsApp", [
    "Send us a message with your trip details and we reply with the next step. A good message includes the kind of trip (an apartment pickup, an office ride, a clinic appointment, a metro station transfer or the airport), your building, street and entrance or a map pin, where you are going, the date and time, the number of passengers and bags, and a return time if you need one.",
    "A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you, and you decide whether to go ahead.",
  ]);

  const links: Section = {
    id: "links",
    h2: "More around Al Sahafah",
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
    h2: "Al Sahafah taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Sahafah?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup building and street, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a private taxi from an apartment or an office?", a: "Yes. Give the building or business name, the street and the entrance you will use. If the entrance is restricted, we agree a nearby meeting point." },
      { q: "How far is Al Sahafah from Riyadh Airport?", a: "About 25 km by road. In light traffic the drive takes roughly 18 to 20 minutes, and busy times add time." },
      { q: "Can I book a taxi from Al Sahafah to KAFD?", a: "Yes. KAFD is about 8 km by road, roughly 9 to 10 minutes in light traffic. Name the tower and the entrance." },
      { q: "Can I book a taxi from Al Sahafah to Olaya?", a: "Yes. Olaya is about 15 km by road, roughly 15 minutes in light traffic. Name the tower or building you are going to." },
      { q: "Can a taxi take me to the Dr Sulaiman Al Habib metro station?", a: "Yes. A ride to the station is a normal private ride, quoted for your request. An independent metro site lists the station on Line 1 (Blue). Check the official Riyadh Metro information." },
      { q: "Is the Dr Sulaiman Al Habib station inside Al Sahafah?", a: "Sources differ on which district it is in, so we do not say. It is a station you might consider, and the best one depends on your address." },
      { q: "Can I book a clinic appointment ride?", a: "Yes, as an ordinary private ride. Give the facility, the branch and the entrance. It is not an emergency or medical transport service." },
      { q: "Can I book a family taxi in Al Sahafah?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "Can I arrange a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  return {
    title: "Al Sahafah Taxi Service Riyadh | Office and Airport Rides",
    description: "Book a private taxi in Al Sahafah, Riyadh for apartment pickups, office rides, appointments, KAFD and airport transfers. Fare confirmed first.",
    h1: "Al Sahafah Taxi Service in Riyadh",
    lead: "Private rides from your building in Al Sahafah for office trips, appointments, metro station transfers and airport journeys, with your meeting point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Sahafah, a mixed residential and commercial district in north Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from apartments, villas and offices, clinic and appointment trips with a planned return, rides to a Riyadh Metro station, business rides to KAFD (about 8 km by road) and Olaya, and airport transfers to King Khalid International Airport (RUH), about 25 km by road. Send your pickup building, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 25 km by road" },
      { label: "KAFD", value: "about 8 km by road" },
      { label: "Olaya", value: "about 15 km by road" },
      { label: "Area type", value: "homes, offices and clinics" },
    ],
    sections: addLinks(addImages([about, journeys, residential, office, metro, health, errands, airport, family, pickup, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name), ctx, "al-sahafah"),
    whatsappMessage: ALSAHAFAH_WHATSAPP_MESSAGE,
  };
}
