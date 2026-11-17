import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import type { DistrictRichCtx } from "./olaya";

/**
 * Hittin Taxi Service: the hand-written landing page for Hittin (see district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Hittin centre in riyadh-areas.ts and the other centres):
 * RUH about 34 km and about 30 to 35 min; Olaya about 20 km and about 20 min; KAFD about 14 km and about 15 min; Ad Dirah about 26 km and about 20 to 25 min;
 * Diriyah about 6 km and about 10 min. From Boulevard Riyadh City (found in OpenStreetMap in Hittin): Hittin centre about 3 km and 6 min; RUH about 33 km and
 * 30 to 35 min; Olaya about 19 km and about 20 min; KAFD about 12 km and about 15 min. The old page said RUH about 34 km and 25 min; routing gave 30 to 33 min.
 * Boulevard World was found in OpenStreetMap on Prince Turki bin Abdulaziz Al Awwal Road in Hittin; Riyadh Park is in Al Nakheel, not Hittin. Kingdom Arena, Hittin Square
 * and Rubeen Plaza could not be located reliably, so they are not mentioned. Straight-line distances to neighbouring districts are computed from the district centres
 * and labelled as such. Venue opening hours, events, ticketing, entrances and parking change, so none is stated. Visitor guides say there is no metro station near
 * Hittin; the page says only that public transport options are limited and to check official information.
 * No partnership with Riyadh Season, Boulevard City or any organiser; no fares, ratings, reviews, vehicle specifications, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const HITTIN_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a taxi to or from Hittin, Riyadh. My pickup location is [pickup location], my destination is [Boulevard City / other], my date and arrival time are [date and time], I need a return pickup at [return time], and there are [number] passengers. Please confirm availability and the fare.";

export function hittinRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "hittin");
  if (!me) throw new Error("Hittin is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "Hittin and where it is",
    kind: "text",
    paragraphs: [
      "Hittin is a modern, mostly residential district in the north-west of Riyadh. Visitors know it for Boulevard City and other entertainment destinations linked with Riyadh Season, and outside the big event periods it is a district of homes, cafes and shops. It has road links to the Northern Ring Road and to Prince Turki bin Abdulaziz Al Awwal Road.",
      "Hittin is separate from its neighbours. Diriyah, with At-Turaif, lies to the south-west, KAFD to the east, and districts such as Al Nakheel and Al Aqiq nearby. Not every venue in north Riyadh is in Hittin, so tell us the exact place you are going to.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Hittin",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Hittin to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Hittin to Riyadh Airport (RUH)", "about 34 km", "about 30 to 35 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Hittin to Olaya", "about 20 km", "about 20 min"], href: pairHref("olaya") },
      { cells: ["Hittin to KAFD", "about 14 km", "about 15 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Hittin to Ad Dirah (old city)", "about 26 km", "about 20 to 25 min"], href: pairHref("ad-dirah") },
      { cells: ["Hittin to Diriyah", "about 6 km", "about 10 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. The exact figure depends on your pickup point and the route. They are not a promised journey time, and they do not apply to event nights.",
  };

  const boulevard: Section = {
    id: "boulevard-city",
    h2: "Rides to Boulevard City",
    kind: "items",
    intro: "Boulevard City, also known as Boulevard Riyadh City, is an entertainment destination in Hittin, in the north of Riyadh. These are the details that help us plan your ride.",
    items: [
      { title: "Say Boulevard City, not just Hittin", text: "Give the destination or the restaurant, show or attraction you are heading for. About 3 km separates the centre of Hittin from Boulevard City, and the entrance matters more than the district." },
      { title: "Check the venue's official information", text: "Opening times, events, ticketing and entrances change with the season. We do not publish them. Check the venue's official event and ticket information before you go." },
      { title: "Admission is separate", text: "A taxi booking does not include tickets, reservations or entry. We are not partnered with Riyadh Season, Boulevard City or event organisers." },
      { title: "Other nearby venues", text: "Boulevard World is another entertainment destination on Prince Turki bin Abdulaziz Al Awwal Road in Hittin, according to map data. Riyadh Park is a mall in Al Nakheel, a different district." },
    ],
  };

  const fromBoulevard: Section = {
    id: "from-boulevard",
    h2: "Journeys from Boulevard City",
    kind: "table",
    intro: "Road estimates from the Boulevard Riyadh City area, in light traffic. After an event the roads are much busier, so allow extra time.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Boulevard City to Riyadh Airport (RUH)", "about 33 km", "about 30 to 35 min"] },
      { cells: ["Boulevard City to Olaya", "about 19 km", "about 20 min"] },
      { cells: ["Boulevard City to KAFD", "about 12 km", "about 15 min"] },
    ],
    note: "Estimates from OpenStreetMap routing, reviewed in November 2026. They are not representative of event nights, and they are not a promised journey time.",
  };

  const eventNight: Section = {
    id: "event-nights",
    h2: "Event-night pickup planning",
    kind: "items",
    items: [
      { title: "Heavier traffic", text: "Event nights can bring heavy traffic around entertainment destinations, and traffic management may change where cars can stop. Plan extra time." },
      { title: "Agree the meeting point", text: "Share the entrance or approved meeting point you were given. We confirm the pickup arrangement for each request." },
      { title: "Book the return early", text: "A return ride is far easier to arrange before the evening than at closing time. Ask for it in the same request." },
      { title: "What we do not promise", text: "We cannot promise that a driver can wait inside a venue, enter a restricted area or park at a particular entrance." },
    ],
  };

  const residential: Section = {
    id: "residential",
    h2: "Residential pickups in Hittin",
    kind: "items",
    items: [
      { title: "Homes, compounds and gated streets", text: "Many homes are on gated streets. Send the gate number or building name and a map pin so the driver finds the entrance." },
      { title: "Early flights and late arrivals", text: "A pre-booked car is easier than finding one at night or at dawn." },
      { title: "Families and shopping trips", text: "Tell us the passengers and bags, and we confirm a vehicle that fits. A car can be arranged for shopping and a few stops, with the return agreed in advance." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Hittin and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 34 km from Hittin by road. A transfer can run in either direction.",
    items: [
      { title: "How long it takes", text: "In light traffic roughly 30 to 35 minutes. Peak hours and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and your home or building in Hittin." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring or a fixed waiting time. Airport pickup points follow the airport's own rules, and we confirm the meeting point with you." },
    ],
  };

  const business: Section = {
    id: "business",
    h2: "Business and hotel travel across north Riyadh",
    kind: "items",
    items: [
      { title: "To KAFD and Olaya", text: "KAFD is about 14 km and Olaya about 20 km from Hittin by road. Give us the exact tower, hotel or office." },
      { title: "Business parks and offices", text: "Tell us the building and the time you need to arrive, and a return can be arranged in the same request." },
      { title: "Regular rides", text: "If you travel often, tell us what you need and we agree how it is arranged, with no standard package assumed." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Hittin on the map",
    kind: "map",
    intro: "See where Hittin is in Riyadh, and open its destinations in Google Maps to check the exact entrance before you ride.",
    query: "24.7539,46.6008",
    label: "Hittin, Riyadh",
    places: [
      { name: "Boulevard Riyadh City", query: "Boulevard Riyadh City, Hittin, Riyadh", note: "Entertainment destination" },
      { name: "Boulevard World", query: "Boulevard World, Hittin, Riyadh", note: "Entertainment destination" },
    ],
  };

  const getting: Section = {
    id: "getting-around",
    h2: "Getting to and from Hittin",
    kind: "items",
    items: [
      { title: "Public transport", text: "Visitor guides say there are no metro stations near Hittin, and public transport options are limited. Check the official Riyadh transport information before you travel." },
      { title: "When a private taxi helps", text: "A pre-arranged taxi suits a family, an evening out, luggage or an early flight. It is a separate service. Gulf Elite Transport is not part of any public transport network." },
    ],
  };

  const near = ["al-nakheel", "al-aqiq", "al-malqa", "al-qirawan", "al-irqah", "al-mohammadiyah"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Hittin",
    kind: "links",
    intro: "These districts are close to Hittin but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 6 km by road" },
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 14 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "Pickup and destination", text: "Your gate or building in Hittin, and your destination, for example Boulevard City." },
      { title: "Date and arrival time", text: "When you need to arrive, and when you want the return pickup." },
      { title: "Passengers", text: "How many people and bags are travelling." },
      { title: "Flight details", text: "For airport transfers, add your flight number and terminal." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Hittin",
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
    h2: "Hittin taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Hittin, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup, destination, the date, the time and the number of passengers. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a taxi to Boulevard City?", a: "Yes. Tell us the restaurant, show or entrance you are heading for, and any return time. Tickets and reservations are separate, so check the venue's official information." },
      { q: "Is Boulevard City in Hittin?", a: "Yes. Boulevard City, also called Boulevard Riyadh City, is in Hittin, in north Riyadh, about 3 km from the centre of the district." },
      { q: "Will traffic be heavy on event nights?", a: "It can be. Event nights bring heavy traffic around entertainment destinations, so the light-traffic estimates on this page do not apply. Allow extra time and agree your meeting point." },
      { q: "Can I arrange a return ride from Boulevard City?", a: "Yes, and on busy evenings we suggest booking it in advance. Ask for the return in the same request. Availability is confirmed for each request." },
      { q: "Can the driver wait for me inside a venue?", a: "We cannot promise this. Waiting inside a venue or at a particular entrance depends on the venue's rules and traffic arrangements, and is only agreed if we confirm it for your booking." },
      { q: "How far is Hittin from Riyadh Airport?", a: "About 34 km by road. In light traffic the drive takes roughly 30 to 35 minutes, and peak hours add time." },
      { q: "Can I travel from Hittin to Olaya or KAFD?", a: "Yes. Olaya is about 20 km and KAFD about 14 km by road, roughly 20 and 15 minutes in light traffic." },
      { q: "Can I book a ride from Hittin to Diriyah?", a: "Yes. Diriyah is about 6 km by road, roughly 10 minutes in light traffic. Tell us whether you are going to At-Turaif, Bujairi Terrace or another place." },
      { q: "Can I book a pickup from a gated street or compound?", a: "Yes. Send the gate number or building name and a map pin. Access to private compounds is decided by the compound, so we agree an entrance the car can reach." },
      { q: "Is there a metro station near Hittin?", a: "Visitor guides say there is none nearby, and public transport options are limited. Check the official Riyadh transport information before you travel." },
      { q: "Can I travel with family and luggage?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that fits for your date." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
      { q: "How is the fare confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
    ],
  };

  return {
    title: "Hittin Taxi Service Riyadh | Boulevard City & Private Rides",
    description: "Book a private taxi in Hittin, Riyadh for Boulevard City visits, homes, offices and airport transfers. Plan your return pickup. Fare confirmed first.",
    h1: "Hittin Taxi Service in Riyadh",
    lead: "Private rides in Hittin for Boulevard City visits, homes, offices and airport transfers, with your return pickup planned in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Hittin, a district in north-west Riyadh, Gulf Elite Transport takes bookings for private taxi rides: rides to Boulevard City and other entertainment destinations, residential pickups, business and hotel trips, planned return pickups and airport transfers to King Khalid International Airport (RUH), about 34 km by road. Event nights bring heavier traffic, so share your exact entrance or meeting point and arrange your return in advance. Send your pickup, destination, date, time and number of passengers by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 34 km by road" },
      { label: "KAFD", value: "about 14 km by road" },
      { label: "Diriyah", value: "about 6 km by road" },
      { label: "Area type", value: "residential and entertainment district" },
    ],
    sections: addImages([about, journeys, boulevard, fromBoulevard, eventNight, residential, airport, business, map, getting, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name),
    whatsappMessage: HITTIN_WHATSAPP_MESSAGE,
  };
}