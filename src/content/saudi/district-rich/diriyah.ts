import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import type { DistrictRichCtx } from "./olaya";

/**
 * Diriyah Taxi Service: the hand-written landing page for Diriyah (see district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Diriyah centre and the other centres): RUH about 36 km and
 * about 30 to 35 min; Olaya about 19 km and about 20 min; KAFD about 12 km and about 15 min (two routings gave 11 and 13 km); Ad Dirah about 25 km and about 20 to 25 min;
 * Hittin about 6 km and about 10 min. Straight-line distances to neighbouring districts are computed from the centres in riyadh-areas.ts and labelled as such.
 * At-Turaif (UNESCO World Heritage, 2010) and Bab Samhan Hotel were found in OpenStreetMap; Bujairi Terrace was not located, so no pin is given for it.
 * Official visitor information (diriyah.sa) lists parking and drop-off arrangements, but parking prices, valet charges, passes, hours and road access change, so none is stated.
 * Metro: visitor guides say there is no station in Diriyah; the page says only that public transport options are limited and to check official information.
 * No partnership with Diriyah, UNESCO, the Diriyah Company, hotels or restaurants; no fares, ratings, reviews, vehicle capacities, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const DIRIYAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a taxi to or from Diriyah, Riyadh. My pickup location is [pickup location], my destination is [At-Turaif / Bujairi Terrace / other], my visit date and arrival time are [date and time], I need a return pickup at [return time], and there are [number] passengers. Please confirm availability and the fare.";

export function diriyahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "diriyah");
  if (!me) throw new Error("Diriyah is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "Diriyah and where it is",
    kind: "text",
    paragraphs: [
      "Diriyah lies on the north-western edge of Riyadh, beside Wadi Hanifah. It is the historic birthplace of the first Saudi state, and today it is a heritage, cultural and dining destination. At-Turaif, with its restored Najdi mud-brick buildings, museums and galleries, is a UNESCO World Heritage Site, inscribed in 2010.",
      "Diriyah is not one single place to be dropped. At-Turaif, Al Bujairi Terrace, which faces it across the wadi, Wadi Hanifah and the hotels and restaurants nearby each have their own entrances. Tell us which one you are going to.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Diriyah",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Diriyah to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Diriyah to Riyadh Airport (RUH)", "about 36 km", "about 30 to 35 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Diriyah to Olaya", "about 19 km", "about 20 min"], href: pairHref("olaya") },
      { cells: ["Diriyah to KAFD", "about 12 km", "about 15 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Diriyah to Ad Dirah (old city)", "about 25 km", "about 20 to 25 min"], href: pairHref("ad-dirah") },
      { cells: ["Diriyah to Hittin", "about 6 km", "about 10 min"], href: pairHref("hittin") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. Evenings, weekends and event nights are busier, and the exact figure depends on your drop-off point and the route. They are not a promised journey time.",
  };

  const turaif: Section = {
    id: "at-turaif",
    h2: "Rides to At-Turaif",
    kind: "items",
    intro: "At-Turaif is the heritage heart of Diriyah. Visitors usually come for the restored mud-brick buildings, museums and galleries, and many stay into the evening.",
    items: [
      { title: "Agree the drop-off point", text: "Official visitor information includes designated parking and drop-off arrangements, and these can change. Ask us for the point you are heading to, and check the official Diriyah visitor information for the one currently approved." },
      { title: "Admission is separate", text: "A taxi booking does not include At-Turaif entry, access passes, parking, valet or museum tickets. Check the official Diriyah visitor information for what applies to your visit." },
      { title: "Plan for a short walk", text: "From the drop-off area the final part of the visit may be on foot. Wear comfortable shoes, and tell us if anyone in your group needs a closer stop." },
      { title: "Share the time you will finish", text: "Tell us when you expect to leave, so we can plan the return pickup with you." },
    ],
  };

  const bujairi: Section = {
    id: "bujairi",
    h2: "Bujairi Terrace and evening visits",
    kind: "items",
    intro: "Al Bujairi Terrace is a dining and visitor destination across the wadi from At-Turaif. Evenings and weekends are the busiest times.",
    items: [
      { title: "Restaurants and evening rides", text: "If you have a restaurant booking, send the restaurant name and your reservation time. We plan the pickup around it. Restaurant reservations are made with the restaurant, not with us." },
      { title: "Busy nights", text: "Traffic and car parks fill up on busy evenings, and visitor traffic management may change where cars can stop. Share the entrance or drop-off point you were given, and expect it to be confirmed for each request." },
      { title: "Arrange the return in advance", text: "A return ride is much easier to arrange before the evening than at closing time. Ask for it in the same request, and availability is confirmed for each request." },
    ],
  };

  const access: Section = {
    id: "pickup",
    h2: "Pickup, drop-off and return planning",
    kind: "items",
    items: [
      { title: "Name the exact destination", text: "Please give At-Turaif, Bujairi Terrace, your hotel or restaurant, not only \"Diriyah\"." },
      { title: "Use the approved drop-off", text: "Use the visitor drop-off point that is currently approved. We cannot promise that a driver can wait inside a visitor area, enter a restricted area or park at a particular entrance." },
      { title: "Parking and valet are separate", text: "Visitor car parks and valet services are run by the destination. A taxi booking does not include them, and the charges change." },
      { title: "Keep a contact number handy", text: "A reachable phone number makes the pickup quicker when the area is crowded." },
      { title: "Return pickup time", text: "Tell us when you plan to leave, or say you will confirm later. The plan is confirmed for each request." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Diriyah and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 36 km from Diriyah by road. A transfer can run in either direction.",
    items: [
      { title: "How long it takes", text: "In light traffic roughly 30 to 35 minutes. Evenings, weekends and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and your hotel or drop-off point in Diriyah." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring or a fixed waiting time. Airport pickup points follow the airport's own rules, and we confirm the meeting point with you." },
    ],
  };

  const groups: Section = {
    id: "groups",
    h2: "Families, groups and visitors with luggage",
    kind: "items",
    items: [
      { title: "Tell us who is travelling", text: "Give the number of passengers and bags, and mention children, older passengers or anyone who needs extra help. We confirm a vehicle that suits your group and your date." },
      { title: "Planning a longer visit", text: "If you are visiting for several hours, ask for the return in the same request so it is already planned." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Diriyah on the map",
    kind: "map",
    intro: "See where Diriyah is in Riyadh, and open its main places in Google Maps to check the exact entrance before you ride.",
    query: "24.7330,46.5734",
    label: "At-Turaif, Diriyah, Riyadh",
    places: [
      { name: "At-Turaif", query: "At-Turaif, Diriyah, Riyadh", note: "UNESCO World Heritage Site" },
      { name: "Bujairi Terrace", query: "Bujairi Terrace, Diriyah, Riyadh", note: "Dining and visitor destination" },
      { name: "Bab Samhan Hotel", query: "Bab Samhan Hotel, Diriyah, Riyadh", note: "Hotel in Diriyah" },
    ],
  };

  const getting: Section = {
    id: "getting-around",
    h2: "Getting to Diriyah",
    kind: "items",
    items: [
      { title: "Public transport", text: "Public transport options to Diriyah are limited, and visitor guides say there is no metro station there. Check the official Riyadh transport information before you travel." },
      { title: "When a private taxi helps", text: "A pre-arranged taxi suits a family, luggage, an evening visit and a planned return. It is a separate service. Gulf Elite Transport has no partnership with Diriyah, its attractions or its operators." },
    ],
  };

  const near = ["hittin", "al-irqah", "al-nakheel", "al-aqiq", "al-mohammadiyah", "al-malqa"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Diriyah",
    kind: "links",
    intro: "These districts are close to Diriyah but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 12 km by road" },
      { name: "Olaya", href: ctx.districtHref("olaya"), note: "Hotel and business district, about 19 km by road" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "Pickup and destination", text: "Where you start, and whether you are going to At-Turaif, Bujairi Terrace or another place in Diriyah." },
      { title: "Date and time", text: "Your visit date and arrival time, and when you want the return pickup." },
      { title: "Passengers", text: "How many people and bags are travelling." },
      { title: "Flight details", text: "For airport transfers, add your flight number and terminal." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Diriyah",
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
    h2: "Diriyah taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi to Diriyah?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup, your destination in Diriyah, the date, your arrival time, the number of passengers and any return time. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a taxi to At-Turaif?", a: "Yes, as a drop-off request. Tell us the entrance or drop-off point you are heading to. Entry and passes are separate, so check the official Diriyah visitor information." },
      { q: "Can I book a taxi to Bujairi Terrace?", a: "Yes. Send the restaurant name and your reservation time if you have one, and we plan the pickup around it." },
      { q: "Does the taxi fare include tickets, parking or valet?", a: "No. A taxi booking is transport only. Admission, access passes, parking, valet and restaurant reservations are separate." },
      { q: "Where will the taxi drop me off?", a: "At an approved drop-off point that the car can reach. These arrangements can change, so we confirm the point with you for each request and you can check the official Diriyah visitor information." },
      { q: "Can I arrange my return ride in advance?", a: "Yes, and on busy evenings we suggest it. Ask for the return in the same request. Availability is confirmed for each request." },
      { q: "Can the driver wait for me inside?", a: "We cannot promise this. Waiting inside a visitor area or at a particular entrance depends on the destination's rules, and is only agreed if we confirm it for your booking." },
      { q: "How far is Diriyah from Riyadh Airport?", a: "About 36 km by road. In light traffic the drive takes roughly 30 to 35 minutes, and busy times add time." },
      { q: "Can I travel from Diriyah to Olaya or KAFD?", a: "Yes. Olaya is about 19 km and KAFD about 12 km by road, roughly 20 and 15 minutes in light traffic." },
      { q: "Is there a metro station in Diriyah?", a: "Visitor guides say there is none, and public transport options are limited. Check the official Riyadh transport information before you travel." },
      { q: "Can I travel with family and luggage?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that fits for your date." },
      { q: "Is Diriyah the same as Ad Dirah?", a: "No. Diriyah is the historic town on the north-western edge of Riyadh. Ad Dirah is the old centre of the city. They are separate destinations." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
      { q: "How is the fare confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
    ],
  };

  return {
    title: "Diriyah Taxi Service Riyadh | Private Rides & Transfers",
    description: "Book a private taxi to or from Diriyah, Riyadh for At-Turaif, Bujairi Terrace and airport transfers. Plan your return pickup. Fare confirmed first.",
    h1: "Diriyah Taxi Service in Riyadh",
    lead: "Private rides to and from Diriyah for heritage visits, restaurant evenings and airport transfers, with your return pickup planned in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Diriyah, on the north-western edge of Riyadh, Gulf Elite Transport takes bookings for private taxi rides to At-Turaif, Al Bujairi Terrace and other places in Diriyah, planned return pickups, evening and restaurant rides, and airport transfers to King Khalid International Airport (RUH), about 36 km by road. A taxi booking is transport only: admission, access passes, parking, valet and restaurant reservations are separate. Send your pickup, destination, visit date, arrival time, return time and number of passengers by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 36 km by road" },
      { label: "Olaya", value: "about 19 km by road" },
      { label: "KAFD", value: "about 12 km by road" },
      { label: "Area type", value: "heritage and visitor destination" },
    ],
    sections: addImages([about, journeys, turaif, bujairi, access, airport, groups, map, getting, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name),
    whatsappMessage: DIRIYAH_WHATSAPP_MESSAGE,
  };
}