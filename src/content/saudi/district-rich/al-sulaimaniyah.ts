import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage, Section } from "../types";
import { addImages } from "./images";
import { addLinks } from "./linking";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Sulaimaniyah Taxi Service: the hand-written landing page for Al Sulaimaniyah, a mixed residential and commercial central district beside Olaya (see district-rich/index.ts).
 * Figures (road distance, reviewed November 2026, light traffic, from OpenStreetMap routing between the Al Sulaimaniyah centre in riyadh-areas.ts and the other centres):
 * RUH about 37 km and about 28 to 30 min (37.2 km / 29 min; the old page said 39 km / 30 min); Olaya about 3 km and about 4 to 6 min (2.8 km / 4 min; old 2.7 km / 4 min);
 * KAFD about 13 km and about 15 min (13.3 / 15); Ad Dirah about 10 km and about 10 to 12 min (10.0 / 11); Diriyah about 19 km and about 20 min (19.1 / 21).
 * Straight-line distances to neighbouring districts (the Olaya figure is the straight line between the two district centres, a different measure from the 3 km road distance)
 * are computed from the district centres in riyadh-areas.ts (haversine).
 * Metro: the independent site riyadhmetro.org lists As Sulimaniyah, Ad Dhabab and Abu Dhabi Square as consecutive stations on Line 5 (Green), from north to south, with no interchange,
 * opened 2024, at about 24.7130/46.6995, 24.7092/46.7084 and 24.7061/46.7163. The official rpt.sa site could not be opened (403), Riyadh.Travel has no Al Sulaimaniyah page (404), and
 * Nominatim found none of the stations, so the page names the stations as "listed", says which is nearest depends on the exact address, and gives no station distances, fares, hours,
 * entrances or accessibility details. Ad Dhabab Street and King Abdulaziz Road are named only as the roads the site places the stations beside.
 * NOT verified / left out: any named clinic, office building, mall, restaurant, school or mosque, and Tahlia Street (location not confirmed). No partnership with Riyadh Metro or any
 * business; no corporate accounts, fares, ratings, reviews, vehicle specifications, child seats, free waiting, unlimited stops, waiting promises or flight tracking.
 */

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];
const short = (a: { id: string; name: string }) => (a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""));

export const ALSULAIMANIYAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Sulaimaniyah, Riyadh. The trip is [for example an office pickup, an apartment pickup, a clinic appointment, a metro station transfer or an airport transfer], my pickup point is [building and street], my destination is [destination], my date and time are [date and time], and there are [number] passengers. Please confirm availability and the fare.";

export function alSulaimaniyahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-sulaimaniyah");
  if (!me) throw new Error("Al Sulaimaniyah is missing from riyadh-areas.ts");
  const pairHref = (needle: string) => ctx.pairs.find((p) => p.href.includes(needle))?.href;

  const about: Section = {
    id: "about",
    h2: "Al Sulaimaniyah: apartments, offices and clinics beside Olaya",
    kind: "text",
    paragraphs: [
      "Al Sulaimaniyah is a central district of Riyadh that lies next to Olaya, just north-east of it. It mixes apartment buildings with offices, clinics, cafes, restaurants, shops, schools and mosques, so many rides here are short and have a clear purpose.",
      "People ride from a home to an office, from an office to an appointment, to the metro, or across the border to Olaya. Many of these trips are only a few kilometres, but the streets are dense and parking is limited, which is why the exact building and meeting point matter.",
      "Al Sulaimaniyah and Olaya are separate districts. Olaya's towers, malls and hotels are in Olaya, not in Al Sulaimaniyah, so give us the name of the building you are going to.",
    ],
  };

  const journeys: Section = {
    id: "journeys",
    h2: "Popular journeys from Al Sulaimaniyah",
    kind: "table",
    intro: "Road distance and light-traffic driving time from the centre of Al Sulaimaniyah to the places people ask about most. Pick a row to open the full ride page, which covers both directions.",
    head: ["Route", "Approx. road distance", "Light-traffic estimate"],
    rows: [
      { cells: ["Al Sulaimaniyah to Riyadh Airport (RUH)", "about 37 km", "about 28 to 30 min"], href: pairHref("king-khalid-international-airport") },
      { cells: ["Al Sulaimaniyah to Olaya", "about 3 km", "about 4 to 6 min"], href: pairHref("olaya") },
      { cells: ["Al Sulaimaniyah to KAFD", "about 13 km", "about 15 min"], href: pairHref("king-abdullah-financial-district") },
      { cells: ["Al Sulaimaniyah to Ad Dirah", "about 10 km", "about 10 to 12 min"], href: pairHref("ad-dirah") },
      { cells: ["Al Sulaimaniyah to Diriyah", "about 19 km", "about 20 min"], href: pairHref("diriyah") },
    ],
    note: "These are road estimates for light traffic, from OpenStreetMap routing between district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your pickup and drop-off addresses, road access, the time of day and any stops change the time, so they are not a promised journey time.",
  };

  const office: Section = {
    id: "office",
    h2: "Office and business rides",
    kind: "items",
    intro: "For people who work or meet in Al Sulaimaniyah, or travel between it, Olaya and KAFD.",
    items: [
      { title: "Home to office", text: "A private pickup from your building at an agreed time, so you are not hunting for a car in the morning rush." },
      { title: "Meetings and appointments", text: "Tell us the building name and the entrance you want. Many offices here share a street, so the exact building avoids a wrong drop-off." },
      { title: "Return trips", text: "Ask for the return pickup in the same request, with a time window, and tell us if your meeting runs late." },
      { title: "Short hops to Olaya and KAFD", text: "Olaya is about 3 km by road and KAFD about 13 km. Name the tower or building you are going to." },
    ],
  };

  const clinics: Section = {
    id: "clinics",
    h2: "Clinic and appointment rides",
    kind: "items",
    intro: "There are clinics and everyday services in and around Al Sulaimaniyah. A ride does not include any appointment, and it is not an emergency or medical transport service.",
    items: [
      { title: "Give the exact building", text: "The clinic or building name and the entrance you need. This helps the driver find the right place." },
      { title: "Plan the return in advance", text: "Appointment times can run over. Ask for a return pickup window and tell us if it changes." },
      { title: "Waiting is agreed separately", text: "A driver can wait only where that is confirmed for your booking. We do not promise free waiting time." },
      { title: "Expect busy entrances", text: "Traffic and limited parking near clinics can change the best meeting point. We agree it with you for each request." },
    ],
  };

  const errands: Section = {
    id: "errands",
    h2: "Shopping, cafes and local errands",
    kind: "items",
    items: [
      { title: "Shops and restaurants", text: "Short rides to local shops, cafes and restaurants, with a return pickup if you want one." },
      { title: "Errands with bags", text: "Tell us about shopping bags or luggage so the vehicle suits them." },
      { title: "Several stops", text: "If you need more than one stop, list them in your request. We confirm whether they can be included, and we do not promise unlimited stops." },
    ],
  };

  const metro: Section = {
    id: "metro",
    h2: "Taxi connections to Green Line stations",
    kind: "items",
    intro: "An independent Riyadh Metro information site lists three Green Line (Line 5) stations along this side of the city, in order from north to south: As Sulimaniyah, Ad Dhabab and Abu Dhabi Square. We could not check this against the official operator, so check the official Riyadh Metro information for current services and hours.",
    items: [
      { title: "Which station is closest depends on your address", text: "These stations are not equally close to every pickup point, and we do not state distances. Send us your exact building and we suggest a suitable station drop-off." },
      { title: "Home or office to a station", text: "A private ride to the station you choose, at a time you agree." },
      { title: "Station to an appointment", text: "A pickup at the station for a clinic, an office or an address the metro does not reach." },
      { title: "Return after a metro trip", text: "Book a pickup for when you come back, with the station and the time." },
      { title: "A separate service", text: "Gulf Elite Transport is not part of the metro and has no partnership with it. We do not publish metro fares, schedules or journey times." },
    ],
  };

  const airport: Section = {
    id: "airport",
    h2: "Airport transfers between Al Sulaimaniyah and RUH",
    kind: "items",
    intro: "King Khalid International Airport (RUH) is in the north of Riyadh, about 37 km from Al Sulaimaniyah by road. A transfer can run in either direction, from a home or an office.",
    items: [
      { title: "How long it takes", text: "In light traffic roughly 28 to 30 minutes. Peak hours and the airport terminal can add time, so we plan the pickup with you and confirm it." },
      { title: "What to send us", text: "Your flight number, the date and time, your terminal if you know it, the number of passengers and bags, and the building and street in Al Sulaimaniyah." },
      { title: "Arriving in Al Sulaimaniyah", text: "For an arrival transfer, tell us your landing time and the address you are going to. We confirm the meeting point with you." },
      { title: "What we do not promise", text: "We do not promise flight tracking, delay monitoring or a fixed waiting time. Airport pickup points follow the airport's own rules." },
    ],
  };

  const pickup: Section = {
    id: "pickup",
    h2: "Pickup and drop-off in Al Sulaimaniyah",
    kind: "items",
    intro: "The streets are dense, with apartments and offices side by side, and parking is limited. Busy roads can change the best meeting point, so the exact point is agreed for each request.",
    items: [
      { title: "The building or business name", text: "And the street and building number if you have them." },
      { title: "A nearby landmark", text: "A shop, a mosque or a junction that is easy to spot." },
      { title: "Your entrance or meeting point", text: "The entrance you will use, or a point on a nearby main road if your street is narrow." },
      { title: "Passengers and luggage", text: "How many people, and how many bags." },
      { title: "A return time", text: "When you want to be collected again, if you need a return." },
      { title: "We do not promise restricted access", text: "We do not promise pickup from private parking, restricted entrances or places where stopping is not allowed. A driver waits only where that is confirmed for your booking." },
    ],
  };

  const prebook: Section = {
    id: "prebook",
    h2: "Why book in advance",
    kind: "items",
    items: [
      { title: "A clear meeting point", text: "Agreeing the exact building and entrance before the driver sets out avoids circling busy streets." },
      { title: "The fare before you commit", text: "You confirm the vehicle, driver and fare before the booking is final." },
      { title: "The right vehicle", text: "We choose a vehicle that suits your passengers and bags for each booking." },
      { title: "Appointments and flights", text: "A planned pickup time works backwards from your appointment or your flight." },
      { title: "A planned return", text: "Arranging the return ride in the same request is easier than finding a car later." },
    ],
  };

  const map: Section = {
    id: "map",
    h2: "Al Sulaimaniyah on the map",
    kind: "map",
    intro: "See where Al Sulaimaniyah is in Riyadh, and open the metro stations below in Google Maps to check the roads and entrances before you ride.",
    query: `${me.lat},${me.lng}`,
    label: "Al Sulaimaniyah, Riyadh",
    places: [
      { name: "As Sulimaniyah Metro Station", query: "As Sulimaniyah Metro Station, Riyadh", note: "Green Line" },
      { name: "Ad Dhabab Metro Station", query: "Ad Dhabab Metro Station, Riyadh", note: "Green Line" },
      { name: "Abu Dhabi Square Metro Station", query: "Abu Dhabi Square Metro Station, Riyadh", note: "Green Line" },
    ],
  };

  const near = ["olaya", "al-wurud", "al-rawdah", "al-malaz", "al-murabba", "ad-dirah"]
    .map((id) => ctx.all.find((x) => x.id === id))
    .filter((x): x is CityArea => Boolean(x))
    .map((x) => ({ x, km: haversine(me, x), dir: compass(bearing(me, x)) }))
    .sort((a, b) => a.km - b.km);
  const nearby: Section = {
    id: "nearby",
    h2: "Districts near Al Sulaimaniyah",
    kind: "links",
    intro: "These districts are close to Al Sulaimaniyah but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
    items: [
      ...near.map(({ x, km, dir }) => ({ name: short(x), href: ctx.districtHref(x.id), note: `about ${fmtKm(km)} km to the ${dir}, in a straight line` })),
      { name: "KAFD", href: ctx.districtHref("king-abdullah-financial-district"), note: "Business district, about 13 km by road" },
      { name: "Diplomatic Quarter", href: ctx.districtHref("diplomatic-quarter"), note: "Western Riyadh, a longer ride across the city" },
    ],
  };

  const whatsapp: Section = {
    id: "whatsapp",
    h2: "How to book on WhatsApp",
    kind: "items",
    intro: "Send us a message with your trip details and we reply with the next step. A WhatsApp message is a request. The booking is not confirmed until we confirm the vehicle, driver and fare with you.",
    items: [
      { title: "The trip", text: "An office pickup, an apartment pickup, a clinic appointment, a metro station transfer or the airport." },
      { title: "Pickup and destination", text: "Your building and street in Al Sulaimaniyah, and where you are going." },
      { title: "Date, time and group", text: "When you want to travel, and how many passengers and bags." },
      { title: "A return time", text: "If you need a pickup afterwards, for example after an appointment." },
    ],
  };

  const links: Section = {
    id: "links",
    h2: "More around Al Sulaimaniyah",
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
    h2: "Al Sulaimaniyah taxi service: questions",
    kind: "faq",
    items: [
      { q: "How can I book a taxi in Al Sulaimaniyah?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup building and street, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a taxi from an apartment or an office?", a: "Yes. Give the building or business name, the street and the entrance you will use. If parking or the street is difficult, we may suggest a nearby point." },
      { q: "Can I arrange an airport transfer from Al Sulaimaniyah?", a: "Yes. It is about 37 km by road to King Khalid International Airport, roughly 28 to 30 minutes in light traffic. Send your flight details, passengers and bags, and we confirm the plan." },
      { q: "How far is Al Sulaimaniyah from Olaya?", a: "About 3 km by road, roughly 4 to 6 minutes in light traffic. The two district centres are about 1.5 km apart in a straight line, which is a different measure from the road distance." },
      { q: "Which Riyadh Metro stations serve Al Sulaimaniyah?", a: "An independent metro information site lists As Sulimaniyah, Ad Dhabab and Abu Dhabi Square on the Green Line (Line 5). Which is closest depends on your address. Check the official Riyadh Metro information for current services." },
      { q: "Can a taxi take me to a metro station?", a: "Yes. Send your exact building and we suggest a suitable station drop-off. A ride to a station is a normal private ride, quoted for your request." },
      { q: "Can I book a return ride after an appointment?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
      { q: "Can I arrange a family or group ride?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that suits the group for each booking." },
      { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      { q: "What pickup information should I provide?", a: "The building or business name, the street, a nearby landmark, your entrance or meeting point, the number of passengers and bags, and a return time if you need one." },
      { q: "Is Al Sulaimaniyah the same as Olaya?", a: "No. They are neighbouring districts. Olaya's towers and malls are in Olaya, so name the building you are going to." },
      { q: "Can I book through WhatsApp?", a: "Yes. Send your trip details by WhatsApp. The booking is confirmed only after we confirm the vehicle, driver and fare with you." },
    ],
  };

  return {
    title: "Al Sulaimaniyah Taxi Service Riyadh | Office and Airport",
    description: "Book a private taxi in Al Sulaimaniyah, Riyadh for office rides, appointments, metro transfers and airport trips. Fare confirmed before you commit.",
    h1: "Al Sulaimaniyah Taxi Service in Riyadh",
    lead: "Private rides from your building in Al Sulaimaniyah for office trips, appointments, metro station transfers and airport journeys, with your meeting point and return agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "In Al Sulaimaniyah, a mixed residential and commercial district beside Olaya in central Riyadh, Gulf Elite Transport takes bookings for private taxi rides from apartments and offices, clinic and appointment trips with a planned return, short rides to Olaya and to Riyadh Metro stations, and airport transfers to King Khalid International Airport (RUH), about 37 km by road. The streets are dense and parking is limited, so the exact building and meeting point are agreed for each request. Send your pickup building, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
    facts: [
      { label: "Riyadh Airport (RUH)", value: "about 37 km by road" },
      { label: "Olaya", value: "about 3 km by road" },
      { label: "KAFD", value: "about 13 km by road" },
      { label: "Area type", value: "homes, offices and clinics" },
    ],
    sections: addLinks(addImages([about, journeys, office, clinics, errands, metro, airport, pickup, prebook, map, nearby, ctx.bookingSteps, whatsapp, ctx.notAssumed, links, faq], me.name), ctx, "al-sulaimaniyah"),
    whatsappMessage: ALSULAIMANIYAH_WHATSAPP_MESSAGE,
  };
}
