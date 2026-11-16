import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";

/**
 * Olaya Taxi Service: the hand-written landing page for the Olaya district (see build.ts, which uses this instead of the generic district template).
 * Figures (road distance, reviewed November 2026): Olaya centre to King Khalid International Airport (RUH) about 38 to 40 km and 30 to 35 min in light
 * traffic (the airport entrance used changes the figure by a few km and minutes), to KAFD about 12 to 13 km and 15 min, to Ad Dirah about 9 km and 10 min,
 * to Diriyah about 19 km and 20 min; Olaya centre to Kingdom Centre about 3 km and to Al Faisaliah Tower about 2 km. Straight-line distances to
 * neighbouring districts are computed from the district centres in riyadh-areas.ts and are labelled as straight-line.
 * Facts about Kingdom Centre and Al Faisaliah Tower (towers, malls, hotels) are public knowledge; opening hours, access and ticketing are not stated.
 * The Riyadh Metro Blue Line (Line 1) runs along Olaya Street, but station names and entrances were not verified, so none is named.
 * No hotel, mall, airport, metro or corporate partnership is claimed; no fares, ratings, reviews, vehicle specifications, waiting-time promises or
 * flight tracking are stated.
 */

type Ctx = {
  all: CityArea[];
  districtHref: (id: string) => string;
  pairs: { name: string; href: string; km: number }[];
  bookingSteps: Section;
  notAssumed: Section;
};

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const OLAYA_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a taxi in Olaya, Riyadh. My pickup location is [pickup location], my destination is [destination], and my preferred date and time are [date and time]. Please confirm availability and the fare.";

export function olayaRich(ctx: Ctx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "olaya");
  if (!me) throw new Error("Olaya is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Olaya",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Olaya to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Olaya to Riyadh Airport (RUH)", "about 40 km", "about 30 to 35 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Olaya to KAFD", "about 13 km", "about 15 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Olaya to Ad Dirah (old city)", "about 9 km", "about 10 min"], href: pairHref("ad-dirah") },
      { cells: ["Olaya to Diriyah", "about 19 km", "about 20 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. The exact figure depends on your pickup point, the airport entrance and the time of day. They are not a promised journey time.",
  };

  const business: Section = {
    id: "business",
    h2: "Business and chauffeur rides in Olaya",
    kind: "items",
    intro: "Olaya is where many Riyadh offices, meeting rooms and hotels sit side by side. A pre-arranged private car lets you plan the pickup around your meeting instead of looking for a ride on the day.",
    items: [
      { title: "Meetings and corporate rides", text: "A professional driver for meetings in Olaya, with the pickup time agreed in advance and the return ride arranged in the same request. If you need the car to wait, say so when you ask, because any waiting time is stated in your quote." },
      { title: "Between Olaya and KAFD", text: "King Abdullah Financial District is about 13 km from Olaya by road. It is a separate district, so give us the exact tower or gate when you ask for a ride there." },
      { title: "A driver for several stops", text: "If your day has more than one stop, tell us the places and the times. We confirm whether it can be arranged and what the quote covers before you commit." },
      { title: "Regular and team travel", text: "If your office needs rides in and out of Olaya on a regular basis, tell us what you need and we agree how it is arranged. There is no standard corporate package to assume." },
    ],
  };

  const hotels: Section = {
    id: "hotels",
    h2: "Hotel and visitor pickups",
    kind: "items",
    intro: "Many visitors stay in Olaya, around Kingdom Centre and Al Faisaliah. For a smooth pickup, send us these details when you ask for a ride.",
    items: [
      { title: "Hotel name and entrance", text: "Name the hotel and the entrance you will wait at. Large hotels have several, and a landmark name alone may not show which one." },
      { title: "Pickup time and passengers", text: "Give the time you want to leave, the number of passengers and the number of bags, so the vehicle suits your group." },
      { title: "Busy entrances", text: "Hotel entrances can be busy and some are restricted. Confirm the exact pickup point with the hotel or your driver. We cannot promise access to a private entrance or parking area." },
      { title: "Return and onward travel", text: "Ask for your ride back, or your transfer to the airport, in the same request. We confirm each ride with you before you commit." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Olaya and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 40 km from Olaya by road. It is the airport serving Riyadh, and a transfer can run in either direction.",
    items: [
      { title: "How long it takes", text: "In light traffic the drive is about 30 to 35 minutes. Rush hours, events and the airport terminal can add time, so we plan the pickup around your flight and confirm it with you." },
      { title: "What to send us", text: "Give your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and your pickup point in Olaya." },
      { title: "Pickup and airport rules", text: "Airport pickup and drop-off points follow the airport's own rules. We confirm the meeting point with you. We do not promise flight tracking, delay monitoring or a fixed waiting time." },
      { title: "Early flights and late arrivals", text: "A pre-booked car is easier than finding one at night or at dawn. Ask early, and give us the pickup time you want." },
    ],
  };

  const landmarks: Section = {
    id: "landmarks",
    h2: "Kingdom Centre, Al Faisaliah and other pickup landmarks",
    kind: "items",
    intro: "These are the places visitors name most often. A landmark can have several entrances, so share the exact entrance or a map pin, or agree a meeting point with your driver.",
    items: [
      { title: "Kingdom Centre", text: "A tower on King Fahd Road, at the northern end of Olaya, with a shopping mall and the Four Seasons Hotel Riyadh at Kingdom Centre. About 3 km from the middle of Olaya by road." },
      { title: "Al Faisaliah Tower", text: "A tower and centre on Olaya's main road, with The Globe and the Mandarin Oriental Al Faisaliah hotel. About 2 km from the middle of Olaya by road." },
      { title: "Centria Mall", text: "A shopping and dining address on Olaya Street. Mall entrances and parking areas differ, so name the entrance you want." },
      { title: "Olaya Street, Tahlia Street and King Fahd Road", text: "The main roads of the district. They are very busy at lunchtime and in the evening, so a pickup on a side street beside your building is often quicker." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Olaya on the map",
    kind: "map",
    intro: "See where Olaya is in Riyadh, and open its landmarks in Google Maps to check the exact entrance before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Olaya, Riyadh",
    places: [
      { name: "Kingdom Centre", query: "Kingdom Centre, Riyadh", note: "Tower, mall and hotel on King Fahd Road" },
      { name: "Al Faisaliah Tower", query: "Al Faisaliah Tower, Riyadh", note: "Tower, centre and hotel on Olaya's main road" },
      { name: "Centria Mall", query: "Centria Mall, Riyadh", note: "Shopping and dining" },
      { name: "Four Seasons Hotel Riyadh at Kingdom Centre", query: "Four Seasons Hotel Riyadh at Kingdom Centre", note: "Hotel inside the Kingdom Centre complex" },
    ],
  };

  const metro: Section = {
    id: "getting-around",
    h2: "Metro or private taxi in Olaya",
    kind: "items",
    items: [
      { title: "Riyadh Metro Blue Line", text: "The Blue Line (Line 1) of the Riyadh Metro runs along Olaya Street, so you may find a station near your hotel or office. Check the official Riyadh Metro map for the nearest station and its entrance." },
      { title: "When a private taxi helps", text: "A private taxi takes you from the door to the door, which suits luggage, late nights, formal meetings or a group. It is a separate service. Gulf Elite Transport is not part of the metro." },
      { title: "King Fahd Road corridor", text: "King Fahd Road is the main north-south route past Olaya, towards KAFD and the airport. Traffic on it and on Olaya Street changes through the day, so allow extra time at peak hours." },
    ],
  };

  const pickup: Section = {
    id: "pickup",
    h2: "Pickup and drop-off in Olaya",
    kind: "items",
    items: [
      { title: "Where the car meets you", text: "Olaya Street is busy at lunchtime and in the evening. A pickup on a side street beside the tower, hotel or office is often quicker than one on the main road." },
      { title: "Name the exact spot", text: "Send the building, the entrance and a map pin if you can. Underground parking, hotel drives and mall entrances can have their own rules." },
      { title: "Who rides from Olaya", text: "Hotel guests, office workers, shoppers, and visitors travelling to and from the airport." },
      { title: "Return ride", text: "Ask for the ride back in the same request and give the time you want to travel, or tell us you will confirm it later." },
    ],
  };

  const near = ["al-sulaimaniyah", "al-wurud", "al-murabba", "al-malaz", "al-rawdah", "al-mohammadiyah"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }));
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Olaya",
    kind: "links",
    intro: "These districts are next to Olaya but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 13 km by road" },
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 19 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "Pickup and destination", text: "The hotel, building or entrance in Olaya, and where you are going." },
      { title: "Date and time", text: "When you want to travel, and whether you need a return ride." },
      { title: "Passengers and bags", text: "So the vehicle suits your group." },
      { title: "Flight details", text: "For airport transfers, add your flight number and terminal." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Olaya",
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
    h2: "Olaya taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Olaya, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup point, destination, date, time and number of passengers. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a private chauffeur in Olaya?", a: "Yes. Tell us the times, the places and whether you need the car to wait. We confirm what can be arranged and what the quote covers before you commit." },
      { q: "Can I arrange a taxi from Olaya to King Khalid International Airport?", a: "Yes. Send your flight number, date, time and passengers. The airport is about 40 km by road, and we plan the pickup around your flight." },
      { q: "How far is Olaya from Riyadh Airport?", a: "About 40 km by road. In light traffic the drive takes about 30 to 35 minutes, and rush hours add time." },
      { q: "Can I arrange a hotel pickup in Olaya?", a: "Yes. Give us the hotel name, the entrance, the pickup time and the passengers and bags. Confirm the exact pickup point with the hotel or your driver." },
      { q: "Can I book a taxi from Kingdom Centre?", a: "Yes, as a pickup request. Kingdom Centre has more than one entrance, so share the entrance or a map pin." },
      { q: "Can I arrange a ride from Al Faisaliah Tower?", a: "Yes. Tell us which entrance, or the hotel or office you are at, and we agree the meeting point with you." },
      { q: "Can I travel from Olaya to KAFD?", a: "Yes. KAFD is about 13 km from Olaya by road, about 15 minutes in light traffic. Give us the exact tower or gate." },
      { q: "Can I book a taxi to Diriyah?", a: "Yes. Diriyah is about 19 km from Olaya by road, about 20 minutes in light traffic. Tell us the exact place you are going to, and any return time." },
      { q: "Can I request a return journey?", a: "Yes. Ask for the return in the same request and give the time you want to travel back, or tell us you will confirm it later." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
      { q: "How is the fare confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "Can I request a specific vehicle?", a: "Yes. Tell us the category you want and the passengers and bags. We confirm what is available for your date and time." },
      { q: "Can a company arrange recurring rides?", a: "Yes, regular travel can be discussed. Tell us what you need and we agree how it is arranged, with no standard package assumed." },
    ],
  };

  return {
    title: "Olaya Taxi Service Riyadh | Private Taxi & Chauffeur",
    description: "Book a private taxi in Olaya, Riyadh for hotel pickups, business meetings and airport transfers. Confirm your vehicle and fare before booking.",
    h1: "Olaya Taxi Service in Riyadh",
    lead: "Private taxi and chauffeur rides for business meetings, hotel pickups, local trips and airport transfers in Al Olaya. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Olaya, Riyadh, Gulf Elite Transport takes bookings for private taxi and chauffeur rides: business and meeting transfers, hotel pickups, local trips, rides to nearby districts such as KAFD and Diriyah, and airport transfers to King Khalid International Airport (RUH), about 40 km by road. Send your pickup point, destination, date, time and number of passengers by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 40 km by road" },
      { label: "KAFD", value: "about 13 km by road" },
      { label: "Ad Dirah (old city)", value: "about 9 km by road" },
      { label: "Area type", value: "business, hotel and shopping district" },
    ],
    sections: [journeys, business, hotels, airport, landmarks, map, metro, pickup, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq],
    whatsappMessage: OLAYA_WHATSAPP_MESSAGE,
  };
}
