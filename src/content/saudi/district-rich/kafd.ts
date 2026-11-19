import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * KAFD Taxi Service: the hand-written landing page for King Abdullah Financial District (see build.ts and district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic): KAFD centre to King Khalid International Airport (RUH) about 34 to 37 km and 25 to 35 min
 * (the old page said about 34 km and 25 min; the airport entrance and routing give a range, so the page says about 35 km and about 25 to 35 min),
 * to Olaya about 13 km and 15 min, to Ad Dirah (old city) about 20 to 21 km and 20 min, to Diriyah about 10 to 11 km and 12 to 15 min.
 * Straight-line distances to neighbouring districts are computed from the district centres in riyadh-areas.ts and are labelled as such.
 * No official KAFD visitor guide could be found, so no gate numbers, pickup-point names or valet rules are stated: the page tells customers to name the
 * tower and entrance and to confirm access with their host or reception. The metro station is described only generally (an interchange; Line 1 Blue and
 * Line 4 Yellow towards the airport); the claim that Line 6 also serves it could not be confirmed, so it is not stated. Metro hours and fares are not stated.
 * KAFD DMC and PIF are mentioned only as the district's developer and owner, with no relationship to Gulf Elite claimed.
 * No hotel, tower, airport, metro or corporate partnership; no fares, ratings, reviews, vehicle specifications, waiting-time promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const KAFD_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a taxi to or from King Abdullah Financial District (KAFD), Riyadh. My tower/building is [building name], pickup point is [pickup point], destination is [destination], and my preferred date and time are [date and time]. Please confirm availability and the fare.";

export function kafdRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "king-abdullah-financial-district");
  if (!me) throw new Error("KAFD is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from KAFD",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of KAFD to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["KAFD to Riyadh Airport (RUH)", "about 35 km", "about 25 to 35 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["KAFD to Olaya", "about 13 km", "about 15 min"], href: pairHref("olaya") },
      { cells: ["KAFD to Ad Dirah (old city)", "about 20 km", "about 20 min"], href: pairHref("ad-dirah") },
      { cells: ["KAFD to Diriyah", "about 10 km", "about 15 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. The exact figure depends on your tower, the entrance used, the airport entrance and the time of day. They are not a promised journey time.",
  };

  const business: Section = {
    id: "business",
    h2: "Business and meeting transfers in KAFD",
    kind: "items",
    intro: "Many KAFD rides are for work: meetings in the towers, trips between offices and hotels, and journeys to the airport. A pre-arranged private car lets you plan the pickup around your meeting.",
    items: [
      { title: "Meetings and office rides", text: "A professional driver for rides to and from KAFD offices, with the pickup time agreed in advance and a return arranged in the same request. Tell us the meeting location, the building and the time you need to arrive." },
      { title: "Hotel to office", text: "Rides between a KAFD hotel and the tower where your meeting is, or between KAFD and your hotel elsewhere in Riyadh." },
      { title: "To the airport and other districts", text: "KAFD to King Khalid International Airport, to Olaya, to Diriyah and to other Riyadh business areas, one way or with a return." },
      { title: "Regular and team travel", text: "If your company needs rides in and out of KAFD on a regular basis, tell us what you need and we agree how it is arranged. There is no standard corporate package, billing facility or waiting arrangement to assume." },
    ],
  };

  const access: Section = {
    id: "access",
    h2: "Tower pickup and drop-off guide",
    kind: "items",
    intro: "KAFD is a planned district of towers, internal roads and car parks, not an ordinary open neighbourhood. Many entrances and car parks are controlled, so the more exact your pickup details are, the smoother the ride.",
    items: [
      { title: "Name the tower and entrance", text: "Send the tower or building name, the building number if you know it, and the gate or entrance you will use." },
      { title: "Agree an accessible pickup point", text: "Pickups and drop-offs use an agreed point the car can reach. We confirm it with you for each request." },
      { title: "Confirm access with your host", text: "If you are a visitor, ask your host or the building's reception which entrance and visitor arrangements apply. A taxi booking does not give permission to enter a tower, a car park or a private entrance." },
      { title: "Tell us who you are meeting", text: "Add the contact person or meeting point, and say whether you are a visitor, a hotel guest or an office employee." },
    ],
  };

  const hotels: Section = {
    id: "hotels",
    h2: "Hotel and visitor transfers",
    kind: "items",
    intro: "Visitors and conference guests often stay in or near KAFD. When you ask for a hotel transfer, send us these details.",
    items: [
      { title: "Hotel name and entrance", text: "The hotel, the building and the entrance you will wait at." },
      { title: "Pickup time", text: "When you want to leave, so the plan fits your meeting, flight or event." },
      { title: "Passengers and bags", text: "The number of passengers and bags, so the vehicle suits your group." },
      { title: "Destination", text: "Where you are going, and whether you need a return ride." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between KAFD and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 35 km from KAFD by road. A transfer can run in either direction.",
    items: [
      { title: "How long it takes", text: "In light traffic, roughly 25 to 35 minutes. Peak hours, events and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "The date and time, your flight number and terminal if you know them, the number of passengers and bags, and your tower or hotel in KAFD." },
      { title: "Airport pickups differ", text: "Airport pickup points follow the airport's own rules and are not like a roadside pickup. We confirm the meeting point with you." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring or a fixed waiting time. The arrangements are agreed for each request." },
    ],
  };

  const metro: Section = {
    id: "metro",
    h2: "KAFD Metro Station and public transport",
    kind: "items",
    items: [
      { title: "A Riyadh Metro interchange", text: "KAFD has a Riyadh Metro station that connects several lines, including the Blue Line (Line 1) and the Yellow Line (Line 4), which serves the airport. Check the official Riyadh Metro map for lines, hours and fares, which can change." },
      { title: "When a private taxi helps", text: "A private taxi takes you from the door to the door. It suits luggage, a fixed pickup time, a hotel or tower entrance, or a group. It is a separate service, and Gulf Elite Transport is not part of the metro." },
      { title: "Use both if you like", text: "Some visitors take the metro for part of a trip and book a car for the rest. Tell us where you will be, and we plan the pickup there." },
    ],
  };

  const about: Section = {
    id: "about",
    h2: "About King Abdullah Financial District",
    kind: "text",
    paragraphs: [
      "King Abdullah Financial District (KAFD) is a purpose-built financial and business district in the north of Riyadh, with office towers, hotels, shops, restaurants, public spaces, a grand mosque and a metro station. It is developed and managed by KAFD DMC, which is owned by the Public Investment Fund. Gulf Elite Transport has no relationship with these organisations.",
      "Because KAFD is a campus of towers rather than an ordinary neighbourhood, rides here depend on naming the right tower and entrance. KAFD is separate from Olaya, which is Riyadh's older business and hotel district further south, and from Diriyah, the heritage district to the north-west.",
    ],
  };

  const map: Section = {
    id: "map",
    h2: "KAFD on the map",
    kind: "map",
    intro: "See where KAFD is in Riyadh, and open its landmarks in Google Maps to check the exact entrance before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "King Abdullah Financial District, Riyadh",
    places: [
      { name: "KAFD Metro Station", query: "KAFD Metro Station, Riyadh", note: "Riyadh Metro interchange" },
      { name: "KAFD Grand Mosque", query: "KAFD Grand Mosque, Riyadh", note: "Mosque in the district" },
      { name: "Financial Plaza", query: "Financial Plaza, KAFD, Riyadh", note: "Central plaza of the district" },
    ],
  };

  const near = ["al-aqiq", "al-ghadir", "al-nakheel", "al-mohammadiyah", "hittin", "al-malqa", "al-wurud"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }));
  const olaya = ctx.all.find((x) => x.id === "olaya");
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near KAFD",
    kind: "links",
    intro: "These districts are next to KAFD but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      ...(olaya ? [{ name: "Olaya", href: ctx.districtHref("olaya"), note: `Business and hotel district, about ${fmtKm(haversine(me, olaya))} km to the south-east in a straight line` }] : []),
      { name: "Diriyah", href: ctx.districtHref("diriyah"), note: "Heritage district, about 10 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "Tower and pickup point", text: "The tower or building, the entrance and the pickup point you will use." },
      { title: "Destination", text: "Where you are going, and whether you need a return ride." },
      { title: "Date, time and group", text: "When you want to travel, and how many passengers and bags." },
      { title: "Flight details", text: "For airport transfers, add your flight number and terminal." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around KAFD",
    kind: "links",
    items: [
      { name: "Riyadh Taxi Service", href: "/riyadh-taxi-service", note: "All Riyadh pickups and districts" },
      { name: "King Khalid International Airport (RUH)", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport", note: "Airport transfers" },
      { name: "Passenger transport for companies", href: "/services/passenger-transport", note: "Staff and corporate transport" },
      { name: "Intercity routes from Riyadh", href: "/taxi-saudi-arabia/routes", note: "Long-distance private transfers" },
      { name: "Book a ride", href: "/book", note: "The booking form" },
      { name: "Contact us", href: "/contact", note: "Other ways to reach us" },
    ],
  };

  const faq: Section = {
    id: "faq",
    h2: "KAFD taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in KAFD, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send the tower or building, the pickup point, your destination, the date, the time and the number of passengers. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a private chauffeur for a KAFD business meeting?", a: "Yes. Tell us the building, the arrival time you need and whether you want a return ride. We confirm what can be arranged and what the quote covers before you commit." },
      { q: "Can I request pickup from a specific KAFD tower?", a: "Yes, as a request. Name the tower and the entrance. We confirm an accessible pickup point with you." },
      { q: "Where can a taxi pick me up inside KAFD?", a: "At an agreed point the car can reach, such as a visitor drop-off area or a hotel entrance. The exact point depends on the building and the district's rules, and we confirm it for each request." },
      { q: "Do I need to provide a building name or entrance?", a: "Yes, please. KAFD has many towers and entrances, so a tower name and entrance, or a map pin, avoids delays." },
      { q: "Can a taxi enter KAFD underground parking?", a: "We cannot promise this. Access to car parks and private entrances is decided by the building and the district. Confirm visitor access with your host or the building's reception, and we agree a pickup point you can reach." },
      { q: "Can I arrange a hotel pickup in KAFD?", a: "Yes. Send the hotel name, the entrance, the pickup time and the passengers and bags." },
      { q: "How far is KAFD from King Khalid International Airport?", a: "About 35 km by road. In light traffic the drive takes roughly 25 to 35 minutes, and peak hours add time." },
      { q: "Can I travel from KAFD to Olaya?", a: "Yes. Olaya is about 13 km from KAFD by road, about 15 minutes in light traffic." },
      { q: "Can I arrange a ride from KAFD to Diriyah?", a: "Yes. Diriyah is about 10 km from KAFD by road, about 15 minutes in light traffic. Tell us the exact place and any return time." },
      { q: "Is KAFD connected to Riyadh Metro?", a: "Yes. KAFD has a Riyadh Metro station that connects more than one line. Check the official Riyadh Metro map for the lines, hours and fares." },
      { q: "Can I travel to the airport by metro from KAFD?", a: "The Yellow Line (Line 4) serves the airport, and KAFD station connects to it. Check the official Riyadh Metro information for the route, hours and fares. A private taxi is a separate option for door-to-door travel." },
      { q: "Can I book a return ride?", a: "Yes. Ask for the return in the same request and give the time you want to travel back, or tell us you will confirm it later." },
      { q: "Can a company request recurring transport?", a: "Yes, regular travel can be discussed. Tell us what you need and we agree how it is arranged, with no standard package assumed." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
      { q: "How is the fare confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
    ],
  };

  return {
    title: "KAFD Taxi Service Riyadh | Private & Business Transfers",
    description: "Book a private taxi to or from KAFD, Riyadh for business rides, hotel pickups and airport transfers. Vehicle, driver and fare confirmed before you commit.",
    h1: "KAFD Taxi Service in Riyadh",
    lead: "Private taxi and chauffeur rides to, from and around King Abdullah Financial District for business meetings, hotel pickups and airport transfers. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In King Abdullah Financial District (KAFD), Riyadh, Gulf Elite Transport takes bookings for private taxi and chauffeur rides: business and meeting transfers, hotel pickups, rides to Olaya and Diriyah, return journeys and airport transfers to King Khalid International Airport (RUH), about 35 km by road. Rides are arranged to an agreed tower, entrance or visitor pickup point. Send your tower, pickup point, destination, date, time and number of passengers by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 35 km by road" },
      { label: "Olaya", value: "about 13 km by road" },
      { label: "Ad Dirah (old city)", value: "about 20 km by road" },
      { label: "Area type", value: "financial and business district" },
    ],
    sections: addLinks(addImages(
        [journeys, business, access, hotels, airport, metro, about, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq],
        me.name,
        {
          airport: { slot: "airport-transfers-kafd-to-ruh", alt: "A black Mercedes saloon at an airport terminal kerb with a chauffeur pushing a luggage trolley behind it", label: "Photo: airport-transfers-kafd-to-ruh", w: 1000, h: 558 },
          business: { slot: "business-and-meeting-transfers", alt: "A man in a suit with a briefcase walks toward a black Mercedes and a chauffeur beside glass towers", label: "Photo: business-and-meeting-transfers", w: 1000, h: 558 },
          hotels: { slot: "hotel-and-visitor-transfers", alt: "A chauffeur and a woman guest with luggage beside a black Mercedes at a stone-pillared hotel entrance with glass towers behind", label: "Photo: hotel-and-visitor-transfers", w: 1000, h: 558 },
          about: { slot: "main-kafd-taxi-service", alt: "A black Mercedes and a chauffeur on a wide road near a white lattice-shaped canopy and tall glass towers", label: "Photo: main-kafd-taxi-service", w: 1000, h: 558 },
          access: { slot: "tower-pickup-and-drop-off-guide", alt: "A chauffeur standing beside a black Mercedes in front of the covered entrance of a diagonal-patterned glass tower", label: "Photo: tower-pickup-and-drop-off-guide", w: 1000, h: 558 },
        },
      ), ctx, "king-abdullah-financial-district"),
    whatsappMessage: KAFD_WHATSAPP_MESSAGE,
  };
}