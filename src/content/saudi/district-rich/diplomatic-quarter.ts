import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import type { DistrictRichCtx } from "./olaya";

/**
 * Diplomatic Quarter Taxi Service: the hand-written landing page for the Diplomatic Quarter (Hay Al Safarat), see district-rich/index.ts.
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the district centre and the other centres):
 * RUH about 47 km and about 35 to 45 min; Olaya about 11 km and about 15 min; KAFD about 17 km and about 20 min; Ad Dirah about 16 km and about 20 min;
 * Diriyah about 15 km and about 20 min. Straight-line distances to neighbouring districts are computed from the centres in riyadh-areas.ts and labelled as such.
 * District facts (about 8 km2 planned district, western and north-western Riyadh, embassies and international organisations, Wadi Hanifa on the west, parks and
 * walking trails) come from the brief's RCRC and Riyadh.Travel references; the RCRC pages could not be opened here, so nothing beyond them is stated.
 * Al-Kindi Plaza is confirmed inside the district in OpenStreetMap. The Riyadh Bus route reported in 2025 and the metro position could not be verified, so the page
 * says only that public transport options are limited and to check the official transport information. No embassy names, gate numbers, visitor procedures, opening
 * hours or security arrangements are stated, and access is never promised. No partnership, fares, ratings, reviews, vehicle specifications or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const DQ_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a taxi to or from the Diplomatic Quarter (Hay Al Safarat), Riyadh. The destination or organisation is [name], the approved meeting point or gate is [meeting point], and my preferred date and time are [date and time]. Please confirm availability and the fare.";

export function diplomaticQuarterRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "diplomatic-quarter");
  if (!me) throw new Error("Diplomatic Quarter is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "The Diplomatic Quarter and where it is",
    kind: "text",
    paragraphs: [
      "The Diplomatic Quarter, also called Hay Al Safarat, is a planned district of about 8 square kilometres in the west and north-west of Riyadh. It is home to foreign embassies and international organisations, and also has residential areas, public services, commercial areas, roads, parks and landscaped public spaces. Wadi Hanifa runs along its western side.",
      "Visitor guides describe it as a green, low-rise neighbourhood with parks, walking trails and cafes. It is separate from Olaya, KAFD and Diriyah, which are other parts of Riyadh with their own pages.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from the Diplomatic Quarter",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of the Diplomatic Quarter to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Diplomatic Quarter to Riyadh Airport (RUH)", "about 47 km", "about 35 to 45 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Diplomatic Quarter to Olaya", "about 11 km", "about 15 min"], href: pairHref("olaya") },
      { cells: ["Diplomatic Quarter to KAFD", "about 17 km", "about 20 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Diplomatic Quarter to Ad Dirah (old city)", "about 16 km", "about 20 min"], href: pairHref("ad-dirah") },
      { cells: ["Diplomatic Quarter to Diriyah", "about 15 km", "about 20 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. The exact figure depends on your destination, the entrance or gate used, the route and the time of day. They are not a promised journey time.",
  };

  const appointments: Section = {
    id: "appointments",
    h2: "Rides for appointments and business visits",
    kind: "items",
    intro: "Most rides to and from the Diplomatic Quarter are planned around an appointment. A pre-arranged private car lets you set the pickup time with that appointment in mind.",
    items: [
      { title: "Embassy and organisation appointments", text: "Tell us the organisation you are visiting, your appointment time and the meeting point your host has given you. We plan the pickup around it and arrange a return in the same request if you need one." },
      { title: "Business travel to Olaya and KAFD", text: "Olaya is about 11 km and KAFD about 17 km from the district by road. Give us the exact building or hotel at the other end." },
      { title: "Residents and regular travel", text: "Residents and staff who travel often can ask for regular rides. Tell us what you need and we agree how it is arranged, with no standard package assumed." },
      { title: "Return rides", text: "Say when you expect to finish, or tell us you will confirm the return later. Availability is confirmed for each request." },
    ],
  };

  const access: Section = {
    id: "access",
    h2: "Access and approved meeting points",
    kind: "items",
    intro: "The Diplomatic Quarter has embassies, organisations and security arrangements, and access requirements vary by destination. Please confirm the details with your host or organisation before you travel.",
    items: [
      { title: "Confirm permission with your host", text: "Visitor permission, registration and the approved meeting point are set by the organisation you are visiting, not by us. Ask your host what applies to your visit." },
      { title: "Send us the details", text: "Give the exact destination, the approved entrance or gate, your host or meeting-point details and a contact number if your host needs one." },
      { title: "The pickup point may be outside an entrance", text: "Where the authorities or the organisation require it, the pickup or drop-off may be outside a restricted entrance. We agree the point with you for each request." },
      { title: "What a booking does not do", text: "A taxi booking does not give permission to enter the district, an embassy or a restricted facility. We cannot promise entry, security clearance or passage through a checkpoint, and drivers follow the security instructions given on the day." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between the Diplomatic Quarter and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 47 km from the Diplomatic Quarter by road. A transfer can run in either direction.",
    items: [
      { title: "How long it takes", text: "In light traffic the drive takes roughly 35 to 45 minutes. Peak hours, events and the airport terminal can add time, so we plan the pickup with you." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and the approved pickup point." },
      { title: "Early flights and late arrivals", text: "A pre-booked car is easier than finding one at night or at dawn. Ask early, and give us the pickup time you want." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring or a fixed waiting time. Airport pickup points follow the airport's own rules, and we confirm the meeting point with you." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "The Diplomatic Quarter on the map",
    kind: "map",
    intro: "See where the Diplomatic Quarter is in Riyadh, and open its public places in Google Maps to check the exact entrance before you ride.",
    query: "24.6771,46.6251",
    label: "Diplomatic Quarter (Hay Al Safarat), Riyadh",
    places: [{ name: "Al-Kindi Plaza", query: "Al-Kindi Plaza, Diplomatic Quarter, Riyadh", note: "A public plaza inside the district" }],
  };

  const getting: Section = {
    id: "getting-around",
    h2: "Getting to and from the district",
    kind: "items",
    items: [
      { title: "Public transport", text: "Public transport options to and from the district are limited, and visitor guides say there is no metro station inside it. Check the official Riyadh transport information before you travel." },
      { title: "When a private taxi helps", text: "A pre-arranged taxi suits a fixed appointment time, luggage, a group or a late return. It is a separate service. Gulf Elite Transport is not part of any public transport network." },
      { title: "Wadi Hanifa", text: "Wadi Hanifa lies along the western side of the district and has parks and walking areas. If you are heading to a park or viewpoint, tell us the exact spot you want." },
    ],
  };

  const near = ["al-irqah", "al-uraija", "al-wurud", "olaya", "al-mohammadiyah", "al-nakheel", "hittin"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near the Diplomatic Quarter",
    kind: "links",
    intro: "These districts are next to the Diplomatic Quarter but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 15 km by road" },
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 17 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "Destination and meeting point", text: "The organisation or place, and the approved entrance, gate or meeting point your host gave you." },
      { title: "Date and time", text: "Your appointment or flight time, and whether you need a return ride." },
      { title: "Passengers and bags", text: "So the vehicle suits your group." },
      { title: "Flight details", text: "For airport transfers, add your flight number and terminal." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around the Diplomatic Quarter",
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
    h2: "Diplomatic Quarter taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi to the Diplomatic Quarter, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your destination, the approved meeting point, the date, the time and the number of passengers. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I enter the Diplomatic Quarter by taxi?", a: "Access requirements vary by destination, embassy, organisation and security arrangements. A taxi booking does not give permission to enter. Confirm visitor permission and the meeting point with your host. We cannot promise entry." },
      { q: "What details should I give for a pickup?", a: "The exact destination, the approved entrance or gate, your host or meeting-point details and a contact number if your host needs one." },
      { q: "Can the pickup be outside the entrance?", a: "Yes. If the authorities or the organisation require it, the pickup or drop-off may be outside a restricted entrance. We agree the point with you for each request." },
      { q: "Can I arrange a taxi for an embassy appointment?", a: "Yes. Tell us the organisation, your appointment time and the meeting point your host gave you. We plan the pickup around it and arrange a return if you ask." },
      { q: "How far is the Diplomatic Quarter from Riyadh Airport?", a: "About 47 km by road. In light traffic the drive takes roughly 35 to 45 minutes, and peak hours add time." },
      { q: "Can I arrange an airport transfer to or from RUH?", a: "Yes. Send your flight number, the date, the time and the number of passengers and bags. We plan the pickup with you and do not promise flight tracking." },
      { q: "Can I travel from the Diplomatic Quarter to Olaya or KAFD?", a: "Yes. Olaya is about 11 km and KAFD about 17 km by road, about 15 and 20 minutes in light traffic. Give us the exact building at the other end." },
      { q: "Can I book a ride to Diriyah?", a: "Yes. Diriyah is about 15 km by road, about 20 minutes in light traffic. Tell us whether you are going to At-Turaif, Bujairi Terrace or another place, and your return time." },
      { q: "Is there a metro station in the Diplomatic Quarter?", a: "Visitor guides say there is no metro station inside the district, and public transport options are limited. Check the official Riyadh transport information before you travel." },
      { q: "Can I request a return ride?", a: "Yes. Ask for the return in the same request and give the time you want to travel back, or tell us you will confirm it later." },
      { q: "Can residents or staff arrange regular rides?", a: "Yes, regular travel can be discussed. Tell us what you need and we agree how it is arranged, with no standard package assumed." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
      { q: "How is the fare confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
    ],
  };

  return {
    title: "Diplomatic Quarter Taxi Service Riyadh | Private Rides",
    description: "Book a private taxi to or from the Diplomatic Quarter (Hay Al Safarat), Riyadh for appointments and airport transfers. Fare confirmed before you commit.",
    h1: "Diplomatic Quarter Taxi Service in Riyadh",
    lead: "Private rides to and from the Diplomatic Quarter (Hay Al Safarat), planned around your appointment, your host's meeting point and the airport. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In the Diplomatic Quarter (Hay Al Safarat), Riyadh, Gulf Elite Transport takes bookings for private taxi and chauffeur rides: rides for embassy and organisation appointments, business trips to Olaya and KAFD, return rides and airport transfers to King Khalid International Airport (RUH), about 47 km by road. Access to the district and to embassies is controlled by the district and the organisations, so a booking does not give permission to enter. Send your destination, approved meeting point, date, time and number of passengers by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 47 km by road" },
      { label: "Olaya", value: "about 11 km by road" },
      { label: "KAFD", value: "about 17 km by road" },
      { label: "Area type", value: "planned embassy district, controlled access" },
    ],
    sections: [about, journeys, appointments, access, airport, getting, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq],
    whatsappMessage: DQ_WHATSAPP_MESSAGE,
  };
}