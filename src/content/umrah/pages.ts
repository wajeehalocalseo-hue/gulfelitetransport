import { fleet } from "../home";
import { routes } from "../saudi/places";
import type { PlacePage, Section } from "../saudi/types";

/**
 * Umrah and Hajj transport pages: taxi and car transfers for pilgrims and visitors in Makkah, Madinah and Jeddah.
 * These pages are about the pilgrim journey (airport to hotel, hotel to the Haram, between the holy cities).
 * The city, airport and route pages under /taxi-saudi-arabia are about the places themselves; they link here and back.
 *
 * Wording rules (same as the rest of the site): no fares, journey times or availability are promised, and nothing says
 * the company holds a particular licence. Hajj movement is described as controlled by the authorities.
 */
export const UMRAH_BASE = "/umrah-hajj-taxi";
const TAXI = "/taxi-saudi-arabia";
const MAKKAH = `${TAXI}/makkah-region/makkah`;
const MADINAH = `${TAXI}/madinah-region/madinah`;
const JEDDAH = `${TAXI}/makkah-region/jeddah`;
const TAIF = `${TAXI}/makkah-region/taif`;
const JED = `${TAXI}/airports/king-abdulaziz-international-airport`;
const MED = `${TAXI}/airports/prince-mohammad-bin-abdulaziz-international-airport`;
const km = (id: string) => routes.find((r) => r.id === id)?.km ?? 0;
const KM_JED_MAKKAH = km("jeddah-to-makkah");
const KM_JED_MADINAH = km("jeddah-to-madinah");
const KM_MAKKAH_MADINAH = km("makkah-to-madinah");

const country = { type: "Country" as const, name: "Saudi Arabia", wiki: "Saudi Arabia" };
const makkahE = { type: "City" as const, name: "Makkah", wiki: "Mecca", ar: "مكة المكرمة", lat: 21.4225, lng: 39.8262 };
const madinahE = { type: "City" as const, name: "Madinah", wiki: "Medina", ar: "المدينة المنورة", lat: 24.4672, lng: 39.6111 };
const jeddahE = { type: "City" as const, name: "Jeddah", wiki: "Jeddah", ar: "جدة", lat: 21.4858, lng: 39.1925 };

const crumbs = (name: string, path: string) => [
  { name: "Home", path: "/" },
  { name: "Umrah & Hajj Taxi", path: UMRAH_BASE },
  { name, path },
];

const steps = (where: string): Section => ({
  id: "how",
  h2: "How a request works",
  kind: "steps",
  items: [
    { title: "Send the details", text: `Tell us ${where}, the date and time, how many people are travelling and how many bags.` },
    { title: "We check and plan", text: "We look at the vehicle size, the pickup point and the timing, and tell you plainly if something cannot be arranged." },
    { title: "You get the confirmation", text: "The vehicle, driver details and fare are confirmed with you before you commit to anything." },
    { title: "Your driver meets you", text: "The driver collects you at the agreed point and takes you to your destination." },
  ],
});

const confirmed: Section = {
  id: "limits",
  h2: "What is confirmed for each request",
  kind: "items",
  intro: "To keep this page accurate, these are agreed with you for each request rather than published here.",
  items: [
    { title: "Fares", text: "No standard fares are published. The fare is confirmed before you commit." },
    { title: "Journey time", text: "Traffic around the holy cities changes by hour and season, so no journey time is promised in advance." },
    { title: "Vehicle and driver", text: "The car type and driver are confirmed for your request." },
    { title: "Availability and permits", text: "Availability depends on the date, and during Hajj the authorities control movement. We tell you what can be arranged for your dates." },
  ],
};

const vehicleItems = fleet.items.map((v) => ({ title: v.name, text: `${v.pax} passengers, ${v.bags.toLowerCase()}. ${v.best}` }));
const vehicles: Section = {
  id: "vehicles",
  h2: "Vehicles for your group",
  kind: "items",
  intro: "Typical capacities. The exact vehicle is confirmed for each request, and for luggage-heavy trips choose the next size up.",
  items: vehicleItems,
};

type Draft = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  direct: string;
  facts: { label: string; value: string }[];
  sections: Section[];
  entities?: PlacePage["entities"];
  route?: { from: string; to: string; km: number };
  prefill?: { pickup?: string; dropoff?: string };
};

function page(d: Draft): PlacePage {
  const path = `${UMRAH_BASE}/${d.slug}`;
  return {
    kind: "topic",
    path,
    name: d.name,
    title: d.title,
    description: d.description,
    h1: d.h1,
    lead: d.lead,
    directAnswer: d.direct,
    crumbs: crumbs(d.name, path),
    facts: d.facts,
    sections: [...d.sections, vehicles, steps("the pickup point, the destination"), confirmed],
    layout: { hero: "dark", body: "cards", form: "bottom" },
    entities: d.entities ?? [makkahE, madinahE, country],
    route: d.route,
    children: [],
    prefill: d.prefill,
  };
}

const related = (items: { name: string; href: string; note?: string }[]): Section => ({ id: "links", h2: "Related pages", kind: "links", items });
const L = {
  makkah: { name: "Taxi & Cab Service in Makkah", href: MAKKAH, note: "City guide" },
  madinah: { name: "Taxi & Cab Service in Madinah", href: MADINAH, note: "City guide" },
  jeddah: { name: "Taxi & Cab Service in Jeddah", href: JEDDAH, note: "City guide" },
  jed: { name: "King Abdulaziz International Airport (JED)", href: JED, note: "Airport guide" },
  med: { name: "Prince Mohammad bin Abdulaziz International Airport (MED)", href: MED, note: "Airport guide" },
  jedMakkah: { name: "Jeddah to Makkah route", href: `${TAXI}/routes/jeddah-to-makkah`, note: `about ${KM_JED_MAKKAH} km` },
  jedMadinah: { name: "Jeddah to Madinah route", href: `${TAXI}/routes/jeddah-to-madinah`, note: `about ${KM_JED_MADINAH} km` },
  makkahMadinah: { name: "Makkah to Madinah route", href: `${TAXI}/routes/makkah-to-madinah`, note: `about ${KM_MAKKAH_MADINAH} km` },
  taif: { name: "Makkah to Taif route", href: `${TAXI}/routes/makkah-to-taif`, note: "Route guide" },
  hub: { name: "Umrah & Hajj Taxi: all pages", href: UMRAH_BASE, note: "Hub" },
};
const topic = (slug: string, name: string, note = "Umrah guide") => ({ name, href: `${UMRAH_BASE}/${slug}`, note });

// ------------------------------------------------------------------------------------------ topic pages
const topics: PlacePage[] = [
  page({
    slug: "jeddah-airport-to-makkah",
    name: "Jeddah Airport to Makkah",
    title: "Jeddah Airport (JED) to Makkah Hotel Taxi for Umrah",
    description: "Taxi from Jeddah airport (JED) to your Makkah hotel for Umrah or Hajj visitors: any group size, flight details first, fare confirmed before you commit.",
    h1: "Jeddah Airport to Makkah Hotel Taxi",
    lead: `The usual first leg of an Umrah trip, about ${KM_JED_MAKKAH} km by road. We confirm the car, driver and fare before you commit.`,
    direct: `Gulf Elite Transport arranges taxi and car transfers from King Abdulaziz International Airport in Jeddah to hotels in Makkah, for individuals, families and larger groups. Send your flight number, the number of passengers and bags, and the name of your Makkah hotel. The vehicle, driver and fare are confirmed with you before you commit.`,
    facts: [
      { label: "Route", value: "Jeddah airport (JED) to Makkah" },
      { label: "Road distance", value: `about ${KM_JED_MAKKAH} km (approximate)` },
      { label: "Group size", value: "One traveller to full groups" },
      { label: "Direction", value: "Both ways, including the return to JED" },
    ],
    sections: [
      {
        id: "about",
        h2: "From the arrivals hall to your Makkah hotel",
        kind: "text",
        paragraphs: [
          `Most visitors to Makkah arrive by air at Jeddah and continue by road. The drive from King Abdulaziz International Airport to Makkah is about ${KM_JED_MAKKAH} km, mostly on the main highway that links the two cities. It is one of the busiest roads in the country, and the traffic changes sharply with the season, so the practical time depends on when you land.`,
          "Immigration and baggage collection at a busy airport can take a while, especially on peak days, so give us your flight number rather than a fixed pickup time. That lets the plan follow your actual arrival. Tell us the name of your hotel in Makkah, because the final drop-off point near the Haram is often set by road controls rather than by the hotel door.",
        ],
      },
      {
        id: "tell",
        h2: "What to tell us for this transfer",
        kind: "items",
        items: [
          { title: "Flight details", text: "Airline, flight number and arrival date, so we can follow your flight if it is delayed." },
          { title: "Your hotel in Makkah", text: "The hotel name and area. If you do not have one yet, tell us the area you prefer." },
          { title: "People and bags", text: "How many adults and children, and how many large bags. Pilgrims often carry more luggage than they expect." },
          { title: "Special needs", text: "Elderly travellers, wheelchair users or young children, so the vehicle and the pickup are planned around them." },
        ],
      },
      {
        id: "notes",
        h2: "Good to know about this journey",
        kind: "items",
        items: [
          { title: "Entry to Makkah", text: "Entry to Makkah is restricted to Muslims. Pilgrims must carry the documents their visit requires." },
          { title: "Near the Haram", text: "Vehicle access close to Al-Masjid al-Haram is controlled and can be restricted at busy times, so a short walk from the drop-off point is normal." },
          { title: "Peak periods", text: "Ramadan, the last ten nights and the Hajj season are the busiest. Request early in those periods." },
          { title: "Ihram on arrival", text: "If you are travelling in ihram, mention it so the driver knows to plan a straight run to your hotel." },
        ],
      },
      related([L.jed, L.jedMakkah, L.makkah, topic("makkah-hotel-to-haram", "Makkah hotel to the Haram"), topic("group-transport-for-umrah", "Group transport for Umrah"), L.hub]),
      {
        id: "faq",
        h2: "Jeddah airport to Makkah: questions",
        kind: "faq",
        items: [
          { q: "Can you pick me up if my flight is delayed?", a: "Give us your flight number so the plan can follow the flight. How a delay is handled is confirmed with you for each request." },
          { q: "Can we travel as a large group?", a: "Yes. Tell us how many people and bags, and we arrange one or several vehicles of the right size." },
          { q: "Can I book the return to the airport too?", a: "Yes. A return from Makkah to Jeddah airport can be requested together with the arrival transfer." },
        ],
      },
    ],
    entities: [{ type: "Airport", name: "King Abdulaziz International Airport", iata: "JED" }, makkahE, jeddahE, country],
    route: { from: "Jeddah Airport", to: "Makkah", km: KM_JED_MAKKAH },
    prefill: { pickup: "King Abdulaziz International Airport (JED)", dropoff: "Makkah" },
  }),

  page({
    slug: "jeddah-airport-to-madinah",
    name: "Jeddah Airport to Madinah",
    title: "Jeddah Airport (JED) to Madinah Hotel Taxi",
    description: "Taxi from Jeddah airport (JED) to your Madinah hotel near the Prophet's Mosque: families, groups and luggage, fare confirmed before you commit.",
    h1: "Jeddah Airport to Madinah Hotel Taxi",
    lead: `A long road transfer of about ${KM_JED_MADINAH} km, popular with families and groups who want a direct ride to the hotel.`,
    direct: `Gulf Elite Transport arranges taxi and car transfers from Jeddah's King Abdulaziz International Airport to hotels in Madinah, in both directions. Send your flight details, your hotel and the size of your group. The vehicle, driver and fare are confirmed with you before you commit.`,
    facts: [
      { label: "Route", value: "Jeddah airport (JED) to Madinah" },
      { label: "Road distance", value: `about ${KM_JED_MADINAH} km (approximate)` },
      { label: "Best for", value: "Families, groups and heavy luggage" },
      { label: "Alternative", value: "Haramain high-speed train" },
    ],
    sections: [
      {
        id: "about",
        h2: "Why choose a road transfer to Madinah",
        kind: "text",
        paragraphs: [
          `Jeddah to Madinah is roughly ${KM_JED_MADINAH} km by road, a long drive that most pilgrims make once at the start or end of their visit. Many visitors fly into Jeddah because of its international connections, then travel north to the Prophet's Mosque.`,
          "A high-speed train also links the two cities, and it suits travellers who are light on luggage and happy to use stations at both ends. A private road transfer suits people who want one journey from the airport to the hotel door, who travel with elderly relatives or children, or who have a lot of luggage and want to avoid changing between airport, station and hotel.",
        ],
      },
      {
        id: "tell",
        h2: "What to tell us",
        kind: "items",
        items: [
          { title: "Flight and arrival time", text: "Flight number and date. A long drive after a long flight is easier when the pickup follows your real arrival." },
          { title: "Hotel in Madinah", text: "Most hotels are near the Central Area around Al-Masjid an-Nabawi. Traffic there can be restricted at prayer times, so the exact drop-off point is agreed first." },
          { title: "Rest stops", text: "Tell us if you need prayer or rest stops on the way, and we plan them with the driver." },
          { title: "Luggage and mobility", text: "The number of bags and anyone who needs extra help getting in or out of the vehicle." },
        ],
      },
      related([L.jed, L.jedMadinah, L.madinah, topic("haramain-train-station-transfers", "Haramain train station transfers"), topic("madinah-to-makkah-for-umrah", "Madinah to Makkah for Umrah"), L.hub]),
      {
        id: "faq",
        h2: "Jeddah airport to Madinah: questions",
        kind: "faq",
        items: [
          { q: "Is a taxi better than the train?", a: "It depends on your trip. A road transfer is door to door and suits groups and luggage. The train suits lighter travellers. Both are common, and you can ask us about the road option." },
          { q: "Can we stop on the way?", a: "Stops for prayer or rest can be planned. Tell us when you request the ride." },
          { q: "Can you take a group of ten or more?", a: "Yes. We arrange a larger vehicle or several vehicles, confirmed for your request." },
        ],
      },
    ],
    entities: [{ type: "Airport", name: "King Abdulaziz International Airport", iata: "JED" }, madinahE, jeddahE, country],
    route: { from: "Jeddah Airport", to: "Madinah", km: KM_JED_MADINAH },
    prefill: { pickup: "King Abdulaziz International Airport (JED)", dropoff: "Madinah" },
  }),

  page({
    slug: "madinah-airport-to-madinah-hotel",
    name: "Madinah Airport to Madinah Hotel",
    title: "Madinah Airport (MED) to Madinah Hotel Taxi",
    description: "Taxi from Madinah airport (MED) to hotels near the Prophet's Mosque and back for Umrah and Hajj visitors. Fare confirmed before you commit.",
    h1: "Madinah Airport to Madinah Hotel Taxi",
    lead: "A short transfer, but the drop-off near the Prophet's Mosque needs planning. Tell us your hotel and your flight.",
    direct: `Gulf Elite Transport arranges taxi and car transfers between Prince Mohammad bin Abdulaziz International Airport in Madinah and hotels in the city, in both directions. Send your flight details, hotel name and the number of passengers and bags. The vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Route", value: "Madinah airport (MED) to the city" },
      { label: "Distance", value: "A short city ride (confirmed per hotel)" },
      { label: "Hotels", value: "Mostly around the Central Area" },
      { label: "Direction", value: "Both ways" },
    ],
    sections: [
      {
        id: "about",
        h2: "From MED to the Prophet's Mosque area",
        kind: "text",
        paragraphs: [
          "Prince Mohammad bin Abdulaziz International Airport lies north-east of Madinah. Most arrivals are pilgrims and visitors heading for hotels close to Al-Masjid an-Nabawi, so the transfer is short compared with the one from Jeddah, but it ends in the busiest part of the city.",
          "Roads in the Central Area can be restricted around prayer times and in busy seasons, so the practical drop-off point is often a nearby road rather than the hotel door. Giving us the hotel name in advance lets us plan the closest permitted point and tell you where to walk.",
        ],
      },
      {
        id: "tell",
        h2: "What to tell us",
        kind: "items",
        items: [
          { title: "Flight number and terminal", text: "So the pickup follows your flight rather than a fixed time." },
          { title: "Hotel name", text: "The exact hotel, since several are on the same streets near the mosque." },
          { title: "Luggage", text: "The number of bags. Hotels near the mosque often have limited vehicle access, so you may unload a short distance away." },
          { title: "Departure day", text: "For the return, give your flight time and we plan the pickup back from it." },
        ],
      },
      related([L.med, L.madinah, topic("madinah-hotel-to-prophets-mosque", "Madinah hotel to the Prophet's Mosque"), topic("madinah-to-makkah-for-umrah", "Madinah to Makkah for Umrah"), L.hub]),
      {
        id: "faq",
        h2: "Madinah airport transfer: questions",
        kind: "faq",
        items: [
          { q: "Can the car stop at my hotel door?", a: "Access near the mosque is controlled and can change through the day. We confirm the closest permitted point for your hotel." },
          { q: "Can I book the airport run for my departure?", a: "Yes. Send your flight time and hotel and we plan the pickup back from your flight." },
          { q: "Do you handle large groups?", a: "Yes. We arrange vehicles of the right size, confirmed for each request." },
        ],
      },
    ],
    entities: [{ type: "Airport", name: "Prince Mohammad bin Abdulaziz International Airport", iata: "MED" }, madinahE, country],
    prefill: { pickup: "Prince Mohammad bin Abdulaziz International Airport (MED)", dropoff: "Madinah hotel" },
  }),

  page({
    slug: "madinah-airport-to-makkah",
    name: "Madinah Airport to Makkah",
    title: "Madinah Airport (MED) to Makkah Hotel Taxi",
    description: "Taxi from Madinah airport (MED) straight to your Makkah hotel, with an optional ihram stop: fare confirmed before you commit.",
    h1: "Madinah Airport to Makkah Hotel Taxi",
    lead: `Land in Madinah and go straight to Makkah, about ${KM_MAKKAH_MADINAH} km by road, with an optional stop at the Miqat.`,
    direct: `Gulf Elite Transport arranges taxi and car transfers from Madinah's Prince Mohammad bin Abdulaziz International Airport directly to hotels in Makkah. A stop at the Miqat for ihram can be planned if you ask. Send your flight, hotel and group size, and the vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Route", value: "Madinah airport (MED) to Makkah" },
      { label: "Road distance", value: `about ${KM_MAKKAH_MADINAH} km (approximate)` },
      { label: "Optional stop", value: "Dhul Hulayfah (Abyar Ali) Miqat" },
      { label: "Direction", value: "Both ways" },
    ],
    sections: [
      {
        id: "about",
        h2: "One journey from Madinah airport to Makkah",
        kind: "text",
        paragraphs: [
          `Some pilgrims fly into Madinah first and then travel on to Makkah for Umrah. The road between the two holy cities is about ${KM_MAKKAH_MADINAH} km, so this is a long transfer that needs a rested driver, a comfortable vehicle and a plan for stops.`,
          "Travellers going to Makkah to perform Umrah from Madinah usually enter the state of ihram at Dhul Hulayfah, known as Abyar Ali, which lies on the way out of Madinah. If you want a stop there to change and pray, tell us when you request the ride so the time is planned into the journey.",
        ],
      },
      {
        id: "tell",
        h2: "What to tell us",
        kind: "items",
        items: [
          { title: "Flight and arrival time", text: "Flight number and date, so the pickup follows your real landing time." },
          { title: "Miqat stop", text: "Whether you want to stop at Abyar Ali, and roughly how long you will need there." },
          { title: "Makkah hotel", text: "The hotel name and area, so the drop-off point near the Haram can be planned." },
          { title: "Group and luggage", text: "Number of people and bags, so one vehicle of the right size can be arranged." },
        ],
      },
      related([L.med, L.makkahMadinah, topic("madinah-to-makkah-for-umrah", "Madinah to Makkah for Umrah"), L.makkah, L.hub]),
      {
        id: "faq",
        h2: "Madinah airport to Makkah: questions",
        kind: "faq",
        items: [
          { q: "Can we stop at the Miqat on the way?", a: "Yes, a stop at Abyar Ali can be planned if you tell us when you request the ride." },
          { q: "Is it a long drive?", a: "It is a long road transfer. We plan rest and prayer stops with you, and the time depends on traffic and stops, so we do not promise it in advance." },
          { q: "Can we go as a family with luggage?", a: "Yes. Tell us how many people and bags and we arrange the right size of vehicle." },
        ],
      },
    ],
    entities: [{ type: "Airport", name: "Prince Mohammad bin Abdulaziz International Airport", iata: "MED" }, madinahE, makkahE, country],
    route: { from: "Madinah Airport", to: "Makkah", km: KM_MAKKAH_MADINAH },
    prefill: { pickup: "Prince Mohammad bin Abdulaziz International Airport (MED)", dropoff: "Makkah" },
  }),

  page({
    slug: "madinah-to-makkah-for-umrah",
    name: "Madinah to Makkah for Umrah",
    title: "Madinah to Makkah Taxi for Umrah, with Miqat Stop",
    description: "Private taxi from your Madinah hotel to Makkah for Umrah, with a stop at the Abyar Ali Miqat if you want one. Groups welcome, fare confirmed first.",
    h1: "Madinah to Makkah Taxi for Umrah",
    lead: "From your Madinah hotel to your Makkah hotel, with time to enter ihram at the Miqat on the way.",
    direct: `Gulf Elite Transport arranges private taxi and car journeys from Madinah to Makkah for pilgrims travelling to perform Umrah, with an optional stop at the Abyar Ali Miqat. The distance is about ${KM_MAKKAH_MADINAH} km. Send your hotels, date and group size, and the vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Journey", value: "Madinah hotel to Makkah hotel" },
      { label: "Road distance", value: `about ${KM_MAKKAH_MADINAH} km (approximate)` },
      { label: "Miqat stop", value: "Dhul Hulayfah (Abyar Ali), if requested" },
      { label: "Best for", value: "Pilgrim families and groups" },
    ],
    sections: [
      {
        id: "about",
        h2: "The pilgrim journey between the two holy cities",
        kind: "text",
        paragraphs: [
          "Many visitors spend time in Madinah first and then travel to Makkah to perform Umrah. The route runs south-west out of Madinah and passes Dhul Hulayfah, the Miqat for people travelling from Madinah, then continues across the desert plain to Makkah.",
          `The distance is about ${KM_MAKKAH_MADINAH} km, a long drive that is comfortable in a vehicle chosen for the group. A private journey lets you set the departure time around prayers and checkout, plan a stop at the Miqat, and arrive at your Makkah hotel without changing between car, station and hotel.`,
        ],
      },
      {
        id: "journey",
        h2: "How the journey is usually planned",
        kind: "items",
        items: [
          { title: "Pickup in Madinah", text: "The driver meets you at the agreed point near your hotel. Because access near the mosque is controlled, the point is agreed in advance." },
          { title: "Stop at the Miqat", text: "If you want to change into ihram and pray at Dhul Hulayfah, the stop is built into the plan. Tell us how long you expect to need." },
          { title: "The road to Makkah", text: "A long drive, with prayer and rest stops planned with the driver for your group." },
          { title: "Arrival in Makkah", text: "The drop-off is as close to your hotel as road controls allow. Near the Haram, a short walk is normal." },
        ],
      },
      related([L.makkahMadinah, L.madinah, L.makkah, topic("madinah-airport-to-makkah", "Madinah airport to Makkah"), topic("group-transport-for-umrah", "Group transport for Umrah"), L.hub]),
      {
        id: "faq",
        h2: "Madinah to Makkah for Umrah: questions",
        kind: "faq",
        items: [
          { q: "Do you stop at the Miqat?", a: "Yes, if you ask. A stop at Abyar Ali can be planned, and you tell us how much time your group needs." },
          { q: "Can elderly relatives travel comfortably?", a: "Tell us about anyone who needs extra help or more rest stops, and we plan the vehicle and the journey around them." },
          { q: "Can the same car take us on to Umrah rituals?", a: "A ride from your Makkah hotel to the Haram and back can be requested separately. See the Makkah hotel to the Haram page." },
        ],
      },
    ],
    entities: [madinahE, makkahE, country],
    route: { from: "Madinah", to: "Makkah", km: KM_MAKKAH_MADINAH },
    prefill: { pickup: "Madinah", dropoff: "Makkah" },
  }),

  page({
    slug: "makkah-to-madinah-for-umrah",
    name: "Makkah to Madinah for Umrah",
    title: "Makkah to Madinah Taxi After Umrah: Private Transfer",
    description: "Private taxi from your Makkah hotel to your Madinah hotel after Umrah, for families and groups, with prayer and rest stops. Fare confirmed first.",
    h1: "Makkah to Madinah Taxi After Umrah",
    lead: "After Umrah, continue to the Prophet's Mosque in one comfortable journey chosen for your group.",
    direct: `Gulf Elite Transport arranges private taxi and car journeys from Makkah to Madinah, a distance of about ${KM_MAKKAH_MADINAH} km, for pilgrims continuing to the Prophet's Mosque after Umrah. Tell us your hotels, date and group size, and the vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Journey", value: "Makkah hotel to Madinah hotel" },
      { label: "Road distance", value: `about ${KM_MAKKAH_MADINAH} km (approximate)` },
      { label: "Stops", value: "Prayer and rest stops can be planned" },
      { label: "Best for", value: "Families, elders and groups" },
    ],
    sections: [
      {
        id: "about",
        h2: "From Makkah to Madinah once Umrah is done",
        kind: "text",
        paragraphs: [
          `Pilgrims often travel from Makkah to Madinah after completing Umrah, to visit Al-Masjid an-Nabawi. The road covers about ${KM_MAKKAH_MADINAH} km and is one of the most travelled pilgrim routes in the world. A high-speed train runs along the same corridor, and a private road journey is the option for groups, families with luggage and travellers who prefer a single door-to-door ride.`,
          "Leaving Makkah, the main question is the pickup. Roads close to the Haram are controlled, so the driver meets you at an agreed point that may be a short walk from your hotel. Checkout times, prayer times and heavy luggage all affect when to leave, so tell us your plan and we work around it.",
        ],
      },
      {
        id: "tell",
        h2: "What to tell us",
        kind: "items",
        items: [
          { title: "Your Makkah hotel and pickup point", text: "The hotel name and the street where the vehicle can meet you." },
          { title: "Departure time", text: "When you want to leave, and whether you need to wait for prayer or checkout." },
          { title: "Madinah hotel", text: "The hotel name and area so the drop-off near the Prophet's Mosque can be planned." },
          { title: "Group and luggage", text: "Number of people and bags, and anyone who needs extra help." },
        ],
      },
      related([L.makkahMadinah, L.makkah, L.madinah, topic("makkah-hotel-to-haram", "Makkah hotel to the Haram"), topic("madinah-to-makkah-for-umrah", "Madinah to Makkah for Umrah"), L.hub]),
      {
        id: "faq",
        h2: "Makkah to Madinah after Umrah: questions",
        kind: "faq",
        items: [
          { q: "Can we leave straight after the last prayer?", a: "Yes. Tell us the time you expect to be ready and we plan the pickup around it, subject to road conditions." },
          { q: "Is the train a better choice?", a: "Some travellers prefer it. A road transfer suits groups, heavy luggage and those who want to be driven from hotel to hotel." },
          { q: "Can we return to Makkah or Jeddah later?", a: "Yes. A later return to Makkah or to Jeddah airport can be requested at the same time." },
        ],
      },
    ],
    entities: [makkahE, madinahE, country],
    route: { from: "Makkah", to: "Madinah", km: KM_MAKKAH_MADINAH },
    prefill: { pickup: "Makkah", dropoff: "Madinah" },
  }),

  page({
    slug: "makkah-hotel-to-haram",
    name: "Makkah Hotel to the Haram",
    title: "Makkah Hotel to Masjid al-Haram Taxi for Umrah",
    description: "Taxi from your Makkah hotel to Masjid al-Haram for Umrah and back, with a drop-off and return pickup agreed in advance. Fare confirmed first.",
    h1: "Makkah Hotel to Masjid al-Haram Taxi",
    lead: "Rides to the Haram for Umrah and prayers, with the drop-off point and the return pickup agreed before you go.",
    direct: `Gulf Elite Transport arranges taxi rides from hotels in Makkah to Al-Masjid al-Haram and back for Umrah and prayers. Roads near the Haram are controlled, so the drop-off point and return pickup are agreed with you in advance. The vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Journey", value: "Makkah hotel to Al-Masjid al-Haram and back" },
      { label: "Best for", value: "Hotels outside walking distance, elders, families" },
      { label: "Return pickup", value: "Agreed in advance" },
      { label: "Peak times", value: "Ramadan, Hajj season and Friday prayers" },
    ],
    sections: [
      {
        id: "about",
        h2: "Getting to the Haram when you are not next door",
        kind: "text",
        paragraphs: [
          "Hotels close to Al-Masjid al-Haram are within a short walk, but many pilgrims stay further out in districts such as Aziziyah or beyond, where a ride is the practical way to reach the Haram. The ride is short in distance, yet the final stretch is controlled, so the car cannot always stop at the door.",
          "That is why we agree the drop-off point and, just as importantly, the return pickup before you set out. Agreeing the meeting place and a rough time for the return avoids the common problem of coming out of the Haram into a crowd with no idea where your driver is waiting.",
        ],
      },
      {
        id: "plan",
        h2: "Planning a ride to the Haram",
        kind: "items",
        items: [
          { title: "Drop-off point", text: "Roads near the Haram are controlled and can change at prayer times. We agree the nearest permitted point for your hotel." },
          { title: "Return pickup", text: "Agree a landmark and an approximate time before you leave. Tell the driver when you are close to finishing." },
          { title: "Waiting", text: "If you want the driver to wait, say so when you request the ride. The arrangement is confirmed with you first." },
          { title: "Mobility needs", text: "Tell us if a relative needs a wheelchair or extra time, so the pickup and the vehicle suit them." },
        ],
      },
      {
        id: "busy",
        h2: "When it is busiest",
        kind: "items",
        items: [
          { title: "Around prayer times", text: "Roads and entrances fill just before and after prayers, and especially for Friday prayers. Plan extra time." },
          { title: "Ramadan and the last ten nights", text: "Crowds are at their heaviest. Request early and keep to the agreed pickup." },
          { title: "Hajj season", text: "Movement is controlled by the authorities. We confirm what can be arranged for your dates." },
        ],
      },
      related([L.makkah, topic("umrah-taxi-with-waiting", "Umrah taxi with waiting time"), topic("jeddah-airport-to-makkah", "Jeddah airport to Makkah"), topic("makkah-ziyarat-rides", "Rides to places in Makkah"), L.hub]),
      {
        id: "faq",
        h2: "Hotel to the Haram: questions",
        kind: "faq",
        items: [
          { q: "Can the car take me to the Haram gate?", a: "Not usually. Access is controlled, so the driver stops at the nearest permitted point and you walk the rest." },
          { q: "How do I find my driver after Umrah?", a: "Agree a landmark and a time window beforehand and message the driver when you are close to finishing." },
          { q: "Can I book rides for every day of my stay?", a: "Yes. Tell us your dates and times and we arrange them together, confirmed for each request." },
        ],
      },
    ],
    entities: [makkahE, country],
    prefill: { pickup: "Makkah hotel", dropoff: "Al-Masjid al-Haram" },
  }),

  page({
    slug: "umrah-taxi-with-waiting",
    name: "Umrah Taxi with Waiting Time",
    title: "Umrah Taxi from Makkah Hotel with Waiting Time",
    description: "A taxi for your Umrah from your Makkah hotel, with the driver waiting for the return. Ihram, Tan'eem and the Haram: plan it with us first.",
    h1: "Umrah Taxi with Waiting Time in Makkah",
    lead: "Go for Umrah and come back to a driver who is expecting you. Waiting and return times are agreed first.",
    direct: `Gulf Elite Transport arranges a taxi or car for Umrah in Makkah with the driver waiting for you or returning at an agreed time. This can include a ride to Masjid A'isha (Tan'eem) for another Umrah, and the ride to the Haram. The vehicle, driver, waiting arrangement and fare are confirmed before you commit.`,
    facts: [
      { label: "Service", value: "Taxi with waiting time or timed return" },
      { label: "Can include", value: "Hotel to the Haram, and Masjid A'isha (Tan'eem)" },
      { label: "Agreed first", value: "Pickup point, waiting time and return" },
      { label: "Group size", value: "Individuals to larger groups" },
    ],
    sections: [
      {
        id: "about",
        h2: "An Umrah ride you do not have to rush",
        kind: "text",
        paragraphs: [
          "Umrah does not run to a timetable. Tawaf and sa'i can take longer than expected on a crowded day, and elderly pilgrims need to go at their own pace. A ride with waiting time takes the pressure out of it: the driver knows roughly when you will be done and where to meet you, so you are not searching for a car in the crowd.",
          "We plan the arrangement with you before the day. You tell us when you expect to start and finish, whether you want the driver to wait or to return at a set time, and how many people are in your group. For a longer stay, the same arrangement can be repeated on several days.",
        ],
      },
      {
        id: "options",
        h2: "Ways to arrange it",
        kind: "items",
        items: [
          { title: "Driver waits", text: "The driver waits near the agreed point while you perform Umrah, and takes you back to your hotel afterwards." },
          { title: "Timed return", text: "The driver drops you and returns at an agreed time, with a message when you are close to finishing." },
          { title: "Masjid A'isha (Tan'eem)", text: "Pilgrims already in Makkah who want to perform another Umrah commonly begin it at Masjid A'isha at Tan'eem, a short ride outside the Haram boundary. We plan the ride there and the return to the Haram or your hotel." },
          { title: "Several days", text: "The same pickup arrangement for each day of your stay, so you know your driver and your timing." },
        ],
      },
      related([topic("makkah-hotel-to-haram", "Makkah hotel to the Haram"), topic("makkah-ziyarat-rides", "Rides to places in Makkah"), topic("family-and-elderly-pilgrims", "Family and elderly pilgrims"), L.makkah, L.hub]),
      {
        id: "faq",
        h2: "Umrah taxi with waiting: questions",
        kind: "faq",
        items: [
          { q: "Do you charge for waiting?", a: "How waiting is handled and charged is confirmed with you before you commit. No waiting fee is published here." },
          { q: "What if Umrah takes longer than planned?", a: "Tell the driver as soon as you know. The arrangement for extra time is agreed with you when you book." },
          { q: "Can you take us to Tan'eem and back?", a: "Yes. A ride to Masjid A'isha and the return can be requested; availability is confirmed for each request." },
        ],
      },
    ],
    entities: [makkahE, country],
    prefill: { pickup: "Makkah hotel", dropoff: "Al-Masjid al-Haram" },
  }),

  page({
    slug: "madinah-hotel-to-prophets-mosque",
    name: "Madinah Hotel to the Prophet's Mosque",
    title: "Madinah Hotel to the Prophet's Mosque Taxi",
    description: "Taxi from your Madinah hotel to Al-Masjid an-Nabawi and back, with the drop-off and return pickup agreed in advance. Fare confirmed first.",
    h1: "Madinah Hotel to the Prophet's Mosque Taxi",
    lead: "For hotels outside walking distance, elders and families: a ride to the mosque and a timed pickup afterwards.",
    direct: `Gulf Elite Transport arranges taxi rides from hotels in Madinah to Al-Masjid an-Nabawi (the Prophet's Mosque) and back. Traffic around the mosque is restricted at prayer times, so the drop-off point and return pickup are agreed in advance. The vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Journey", value: "Madinah hotel to Al-Masjid an-Nabawi and back" },
      { label: "Best for", value: "Hotels beyond walking distance, elders, families" },
      { label: "Return pickup", value: "Agreed in advance" },
      { label: "Peak times", value: "Prayer times, Fridays, Ramadan" },
    ],
    sections: [
      {
        id: "about",
        h2: "Reaching the mosque from further out",
        kind: "text",
        paragraphs: [
          "Hotels in the Central Area are within walking distance of Al-Masjid an-Nabawi, but not every visitor stays there. Some stay in districts a few kilometres out, often at lower prices or in larger family hotels, and need a ride at the start and end of each visit to the mosque.",
          "Roads close to the mosque can be restricted around prayer times and in busy seasons, so the car stops at a nearby road and you walk the final part. We agree that meeting point and the return pickup in advance, with a time window, so the ride back after prayers is as smooth as the ride out.",
        ],
      },
      {
        id: "plan",
        h2: "What to agree before you go",
        kind: "items",
        items: [
          { title: "Drop-off point", text: "The nearest permitted road for your hotel and the gate you want to reach." },
          { title: "Return pickup", text: "A landmark and a time window, so you are not searching for the car after prayer." },
          { title: "Prayer schedule", text: "Tell us which prayers you plan to attend, since roads are busiest around them." },
          { title: "Mobility", text: "If a relative uses a wheelchair or walks slowly, we plan the pickup close to the point where they can enter." },
        ],
      },
      related([L.madinah, topic("madinah-ziyarat-rides", "Rides to places in Madinah"), topic("madinah-airport-to-madinah-hotel", "Madinah airport to hotel"), topic("family-and-elderly-pilgrims", "Family and elderly pilgrims"), L.hub]),
      {
        id: "faq",
        h2: "Madinah hotel to the mosque: questions",
        kind: "faq",
        items: [
          { q: "Can the car stop at the mosque?", a: "Not at the gates. The driver stops at the nearest permitted point and the last stretch is on foot." },
          { q: "Can I book rides for all prayers?", a: "Yes, a set of rides for your stay can be arranged together, confirmed for each request." },
          { q: "Is it needed if my hotel is close?", a: "Often not. It helps most for hotels further out, for elders and for families with young children." },
        ],
      },
    ],
    entities: [madinahE, country],
    prefill: { pickup: "Madinah hotel", dropoff: "Al-Masjid an-Nabawi" },
  }),

  page({
    slug: "makkah-ziyarat-rides",
    name: "Rides to Places in Makkah",
    title: "Taxi to Holy Sites in Makkah: Hira, Thawr, Mina",
    description: "Taxi rides to the places visitors go in and around Makkah: Jabal al-Noor, Jabal Thawr, Mina, Arafat and Masjid A'isha. Fare confirmed first.",
    h1: "Taxi to Holy Sites and Places in Makkah",
    lead: "Rides to the places pilgrims and visitors go in and around Makkah, with the driver and timing agreed first.",
    direct: `Gulf Elite Transport arranges taxi rides to places pilgrims and visitors go in and around Makkah, such as Jabal al-Noor, Jabal Thawr, Mina, Arafat and Masjid A'isha. These are point-to-point rides with the driver and timing agreed first. The vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Type", value: "Point-to-point rides, not guided tours" },
      { label: "Places", value: "Jabal al-Noor, Jabal Thawr, Mina, Arafat, Masjid A'isha" },
      { label: "Waiting", value: "Can be arranged" },
      { label: "Peak times", value: "Hajj season and Ramadan" },
    ],
    sections: [
      {
        id: "about",
        h2: "Places people ask for rides to in Makkah",
        kind: "text",
        paragraphs: [
          "Beyond the Haram, visitors often ask for a ride to the places connected with the Prophet's life and with the rites of Hajj. These are rides to a place, not guided tours: the driver takes you there, waits if you ask, and brings you back. A guide, if you want one, is a separate arrangement that you make yourself.",
          "Distances inside the Makkah area are short to medium, but traffic and crowd control make timing hard to predict. In the weeks around Hajj, the sacred sites at Mina, Muzdalifah and Arafat are controlled by the authorities, so we do not assume access and tell you plainly what can be arranged for your dates.",
        ],
      },
      {
        id: "places",
        h2: "Places in and around Makkah",
        kind: "items",
        items: [
          { title: "Jabal al-Noor (Cave of Hira)", text: "The mountain with the cave where the first revelation is said to have come. Visitors usually drive to the foot of the mountain and walk up." },
          { title: "Jabal Thawr", text: "The mountain associated with the Prophet's journey to Madinah. It lies on the southern side of the city." },
          { title: "Mina", text: "The tent city a few kilometres east of the Haram, central to the Hajj rites." },
          { title: "Arafat and Muzdalifah", text: "Further east along the same corridor. Access during the Hajj period is controlled by the authorities." },
          { title: "Masjid A'isha (Tan'eem)", text: "The usual starting point for pilgrims already in Makkah who want to perform another Umrah." },
        ],
      },
      related([L.makkah, topic("umrah-taxi-with-waiting", "Umrah taxi with waiting time"), topic("makkah-hotel-to-haram", "Makkah hotel to the Haram"), topic("hajj-season-transport", "Hajj season transport"), L.hub]),
      {
        id: "faq",
        h2: "Rides to places in Makkah: questions",
        kind: "faq",
        items: [
          { q: "Do you offer guided tours?", a: "No. These are rides to a place with the driver waiting if you ask. Guides, if you want one, are arranged separately." },
          { q: "Can the driver wait while we visit?", a: "Yes, if you tell us when you request the ride. The waiting arrangement is confirmed with you first." },
          { q: "Can you take us to Arafat during Hajj?", a: "Access during Hajj is controlled by the authorities. We tell you plainly what can be arranged for your dates." },
        ],
      },
    ],
    entities: [makkahE, country],
    prefill: { pickup: "Makkah hotel" },
  }),

  page({
    slug: "madinah-ziyarat-rides",
    name: "Rides to Places in Madinah",
    title: "Taxi to Holy Sites in Madinah: Quba, Uhud, Qiblatain",
    description: "Taxi rides to the places visitors go in and around Madinah: Masjid Quba, Masjid al-Qiblatayn, Uhud and Abyar Ali. Fare confirmed first.",
    h1: "Taxi to Holy Sites and Places in Madinah",
    lead: "Rides to the places visitors go in and around Madinah, with the driver and timing agreed first.",
    direct: `Gulf Elite Transport arranges taxi rides to places visitors go in and around Madinah, such as Masjid Quba, Masjid al-Qiblatayn, the Uhud area and the Abyar Ali Miqat. These are point-to-point rides with waiting arranged if you ask. The vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Type", value: "Point-to-point rides, not guided tours" },
      { label: "Places", value: "Quba, Qiblatayn, Uhud, Seven Mosques, Abyar Ali" },
      { label: "Waiting", value: "Can be arranged" },
      { label: "Start", value: "Your Madinah hotel" },
    ],
    sections: [
      {
        id: "about",
        h2: "Places people ask for rides to in Madinah",
        kind: "text",
        paragraphs: [
          "Visitors to Madinah usually spend most of their time at Al-Masjid an-Nabawi, and many also visit a handful of places that are spread across the city. A taxi is the practical way to link them, especially for families and elders who would struggle with the distances on foot or in the heat.",
          "We arrange these as point-to-point rides: the driver takes you to a place, waits if you ask, and takes you on to the next, or back to your hotel. If you want a guide to explain the places, that is a separate arrangement. You tell us the places and the order, and we agree the route and the timing with you first.",
        ],
      },
      {
        id: "places",
        h2: "Places in and around Madinah",
        kind: "items",
        items: [
          { title: "Masjid Quba", text: "The first mosque built in Islam, on the southern side of the city." },
          { title: "Masjid al-Qiblatayn", text: "The mosque of the two qiblas, on the north-western side." },
          { title: "Uhud", text: "The mountain and battle site north of the city, where many visitors stop." },
          { title: "The Seven Mosques area", text: "A group of small mosques near the site of the Battle of the Trench." },
          { title: "Dhul Hulayfah (Abyar Ali)", text: "The Miqat for pilgrims leaving Madinah for Makkah, a short drive out of the city." },
        ],
      },
      related([L.madinah, topic("madinah-hotel-to-prophets-mosque", "Madinah hotel to the Prophet's Mosque"), topic("madinah-to-makkah-for-umrah", "Madinah to Makkah for Umrah"), topic("family-and-elderly-pilgrims", "Family and elderly pilgrims"), L.hub]),
      {
        id: "faq",
        h2: "Rides to places in Madinah: questions",
        kind: "faq",
        items: [
          { q: "Is this a guided tour?", a: "No. It is a ride between places with the driver waiting if you ask. A guide is a separate arrangement." },
          { q: "Can we visit several places in one ride?", a: "Yes. Tell us the places and the order, and we agree the route and timing with you." },
          { q: "Can you pick us up at the airport and take us to these places?", a: "Yes. A ride from the airport can be combined with visits on the same day, confirmed for each request." },
        ],
      },
    ],
    entities: [madinahE, country],
    prefill: { pickup: "Madinah hotel" },
  }),

  page({
    slug: "haramain-train-station-transfers",
    name: "Haramain Train Station Transfers",
    title: "Haramain Train Station Taxi: Makkah, Madinah, Jeddah",
    description: "Taxi between Haramain high-speed train stations and hotels in Makkah, Madinah and Jeddah, with luggage and family groups. Fare confirmed first.",
    h1: "Haramain Train Station Taxi Transfers",
    lead: "Arrive by train and be met at the station, or travel to the station for your train, with the vehicle sized for your luggage.",
    direct: `Gulf Elite Transport arranges taxi transfers between Haramain high-speed railway stations and hotels in Makkah, Madinah and Jeddah, in both directions. Send your train time, station and group size, and the vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Stations", value: "Makkah, Madinah, Jeddah and King Abdullah Economic City" },
      { label: "Direction", value: "Station to hotel and hotel to station" },
      { label: "Best for", value: "Groups and luggage" },
      { label: "Train times", value: "Give us your booking details" },
    ],
    sections: [
      {
        id: "about",
        h2: "The first and last stretch of a train journey",
        kind: "text",
        paragraphs: [
          "The Haramain high-speed railway links Makkah, Jeddah, King Abdullah Economic City and Madinah, and many pilgrims use it between the holy cities. The train covers the long distance, but the first and last stretch, between the station and your hotel, is where luggage and families make life harder.",
          "A taxi arranged in advance removes the queue for a car at the station and the search for a vehicle large enough for your bags. Give us your train time and the station, and we plan the pickup around your arrival or the time you need to reach the platform.",
        ],
      },
      {
        id: "tell",
        h2: "What to tell us",
        kind: "items",
        items: [
          { title: "Station and train time", text: "Which station, the train time, and whether you are arriving or departing." },
          { title: "Hotel", text: "The hotel name and area, so we plan the drop-off or pickup point." },
          { title: "Luggage", text: "The number of bags. Some stations have set pickup areas, and a larger vehicle may need a particular spot." },
          { title: "Group", text: "How many are travelling, including children and anyone who needs extra help." },
        ],
      },
      related([L.makkah, L.madinah, L.jeddah, topic("jeddah-airport-to-madinah", "Jeddah airport to Madinah"), topic("madinah-to-makkah-for-umrah", "Madinah to Makkah for Umrah"), L.hub]),
      {
        id: "faq",
        h2: "Train station transfers: questions",
        kind: "faq",
        items: [
          { q: "Can you meet me at the station?", a: "Yes. Give us the station, train and arrival time, and we confirm the meeting point with you." },
          { q: "Can you take me to the station for a train?", a: "Yes. Tell us the train time and we plan the pickup back from it, allowing for check-in." },
          { q: "What if my train is delayed?", a: "Give us your booking details so the plan can follow the train. How delays are handled is confirmed with you for each request." },
        ],
      },
    ],
    entities: [makkahE, madinahE, jeddahE, country],
    prefill: { pickup: "Haramain train station" },
  }),

  page({
    slug: "group-transport-for-umrah",
    name: "Group Transport for Umrah",
    title: "Umrah Group Transport: Cars, Vans, Minibuses, Coaches",
    description: "Transport for Umrah groups of any size in Makkah, Madinah and Jeddah: cars, vans, minibuses and coaches arranged to match your group and luggage.",
    h1: "Group Transport for Umrah",
    lead: "From a couple to a coach party: we arrange the right vehicles for your group and your luggage.",
    direct: `Gulf Elite Transport arranges transport for Umrah groups of any size in Makkah, Madinah and Jeddah: cars and SUVs for families, vans for larger groups, minibuses and coaches for organised parties. Tell us how many people and bags, and the vehicles, drivers and fare are confirmed before you commit.`,
    facts: [
      { label: "Group size", value: "One traveller up to large parties" },
      { label: "Vehicles", value: "Sedan, SUV, vans, minibus, coach" },
      { label: "Several vehicles", value: "Arranged together if one is not enough" },
      { label: "Routes", value: "Airport, hotel, Haram and between cities" },
    ],
    sections: [
      {
        id: "about",
        h2: "Matching the vehicle to the group",
        kind: "text",
        paragraphs: [
          "Umrah groups vary a great deal, from a couple travelling alone to families of several generations and organised parties from a mosque or travel agency. The right vehicle depends on two numbers: how many people, and how many large bags. Pilgrims usually carry more luggage than they expect, so a vehicle that seats everyone comfortably can still be too small once the bags are loaded.",
          "Tell us both numbers and we recommend a vehicle. For groups too large for one vehicle, we arrange several that travel together, so your party arrives at the same time and the drivers coordinate the pickup. The same arrangement can cover each stage of the trip, from the airport to the hotel, between the holy cities and back to the airport.",
        ],
      },
      {
        id: "planning",
        h2: "Planning a group trip",
        kind: "items",
        items: [
          { title: "Send the whole itinerary", text: "Airport arrival, hotels in each city, the move between Makkah and Madinah and the departure flight, so each stage is planned together." },
          { title: "Give one contact", text: "A group leader we can reach, so changes are communicated to one person." },
          { title: "Count the bags", text: "Large suitcases, hand luggage and anything unusual such as wheelchairs or prams." },
          { title: "Mention special needs", text: "Elderly travellers, wheelchair users and young children, so the vehicles and pickups suit them." },
        ],
      },
      related([topic("jeddah-airport-to-makkah", "Jeddah airport to Makkah"), topic("madinah-to-makkah-for-umrah", "Madinah to Makkah for Umrah"), topic("family-and-elderly-pilgrims", "Family and elderly pilgrims"), topic("ramadan-umrah-transport", "Ramadan Umrah transport"), L.hub]),
      {
        id: "faq",
        h2: "Group transport for Umrah: questions",
        kind: "faq",
        items: [
          { q: "How large a group can you transport?", a: "Groups of any size can be discussed. We arrange one vehicle or several of the right size, and confirm what is possible for your dates." },
          { q: "Can you provide a coach?", a: "Coaches and minibuses can be requested for larger parties. Availability is confirmed for each request." },
          { q: "Do prices change with the group size?", a: "Prices depend on the vehicles used, the distance and the dates, and are confirmed with you before you commit." },
        ],
      },
    ],
    prefill: { pickup: "Jeddah airport or hotel" },
  }),

  page({
    slug: "family-and-elderly-pilgrims",
    name: "Family and Elderly Pilgrims",
    title: "Taxi for Elderly and Family Pilgrims in Makkah, Madinah",
    description: "Comfortable taxi for elderly pilgrims and families with children in Makkah, Madinah and Jeddah: plan pickups, stops and vehicles around your needs.",
    h1: "Taxi for Elderly and Family Pilgrims",
    lead: "Rides planned around people who walk slowly, need rest stops or travel with young children.",
    direct: `Gulf Elite Transport arranges taxi and car rides for elderly pilgrims and families with children in Makkah, Madinah and Jeddah, with the vehicle, pickup point and stops planned around your needs. Tell us who is travelling and what they need, and the vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "For", value: "Elderly pilgrims, families, young children" },
      { label: "Planned around", value: "Pickup point, stops, vehicle height and space" },
      { label: "Child seats and help", value: "Can be requested; confirmed per booking" },
      { label: "Where", value: "Makkah, Madinah, Jeddah and between them" },
    ],
    sections: [
      {
        id: "about",
        h2: "A ride that suits the slowest traveller",
        kind: "text",
        paragraphs: [
          "Pilgrimage involves a lot of walking, crowds and heat, and the people who find it hardest are often the ones travelling because it matters most to them: elderly parents, relatives with limited mobility and families with small children. The ride between the airport, the hotel and the Haram is where a little planning makes the biggest difference.",
          "Tell us who is travelling and what each person needs. We plan the vehicle for easy access, the pickup point as close as road controls allow, and rest or prayer stops on longer journeys. The more we know in advance, the less your group has to work out on the day.",
        ],
      },
      {
        id: "plan",
        h2: "What helps us plan",
        kind: "items",
        items: [
          { title: "Mobility", text: "Whether anyone uses a wheelchair, a stick or needs help getting in and out, and whether a folded wheelchair must be carried." },
          { title: "Children", text: "The number and ages of children, and whether you need a child seat. Availability is confirmed per booking." },
          { title: "Stops", text: "Prayer, rest or medication stops on longer journeys, such as between Makkah and Madinah." },
          { title: "Pickup point", text: "The closest point where the vehicle can wait, and how far the walk is from the hotel or gate." },
        ],
      },
      related([topic("makkah-hotel-to-haram", "Makkah hotel to the Haram"), topic("madinah-hotel-to-prophets-mosque", "Madinah hotel to the Prophet's Mosque"), topic("jeddah-airport-to-makkah", "Jeddah airport to Makkah"), topic("group-transport-for-umrah", "Group transport for Umrah"), L.hub]),
      {
        id: "faq",
        h2: "Elderly and family pilgrims: questions",
        kind: "faq",
        items: [
          { q: "Can you carry a wheelchair?", a: "Tell us when you request the ride so a suitable vehicle is planned. What is possible is confirmed for each request." },
          { q: "Do you provide child seats?", a: "Child seats can be requested. Availability is confirmed with you when you book." },
          { q: "Can the driver help with luggage?", a: "Tell us what help you need and we confirm what the driver can do for your request." },
        ],
      },
    ],
    prefill: { pickup: "Makkah or Madinah hotel" },
  }),

  page({
    slug: "ramadan-umrah-transport",
    name: "Ramadan Umrah Transport",
    title: "Ramadan Umrah Taxi in Makkah and Madinah: Book Early",
    description: "Taxi and group transport for Umrah in Ramadan: airport, hotel and Haram rides in Makkah and Madinah, planned around crowds. Fare confirmed first.",
    h1: "Ramadan Umrah Taxi and Transport",
    lead: "The busiest weeks of the year for the holy cities. Plan early and keep to the agreed pickups.",
    direct: `Gulf Elite Transport arranges taxi and group transport for Umrah in Ramadan, covering airport transfers, hotel rides, the Haram and journeys between Makkah, Madinah and Jeddah. Ramadan is the busiest period, so request early. The vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Season", value: "Ramadan, especially the last ten nights" },
      { label: "Advice", value: "Request early; agree pickups in advance" },
      { label: "Covers", value: "Airport, hotel, Haram, between cities" },
      { label: "Group size", value: "Individuals to large groups" },
    ],
    sections: [
      {
        id: "about",
        h2: "Why Ramadan needs more planning",
        kind: "text",
        paragraphs: [
          "Ramadan brings more visitors to Makkah and Madinah than almost any other time of year, and the crowds are heaviest in the last ten nights. Roads close to the Haram and the Prophet's Mosque are controlled for longer, queues build at airports and stations, and a ride that is simple in a quiet week can take much longer.",
          "Plan in three ways. Request your transfers early, since availability is tighter. Agree the pickup and drop-off points in advance and keep to them, because the car cannot always wait where it normally would. And allow extra time between prayers, iftar and your ride, since everyone is moving at once.",
        ],
      },
      {
        id: "tips",
        h2: "Practical planning for Ramadan",
        kind: "items",
        items: [
          { title: "Book transfers early", text: "Airport and city rides in the last ten nights are in highest demand." },
          { title: "Agree meeting points", text: "Landmarks and a time window for each pickup near the Haram or the Prophet's Mosque." },
          { title: "Plan around iftar and taraweeh", text: "Roads fill before iftar and after night prayers. Tell us when you plan to move." },
          { title: "Keep luggage minimal in the city", text: "Heavy bags are easier to deal with at the hotel than in crowds near the mosque." },
        ],
      },
      related([topic("makkah-hotel-to-haram", "Makkah hotel to the Haram"), topic("madinah-hotel-to-prophets-mosque", "Madinah hotel to the Prophet's Mosque"), topic("jeddah-airport-to-makkah", "Jeddah airport to Makkah"), topic("group-transport-for-umrah", "Group transport for Umrah"), L.hub]),
      {
        id: "faq",
        h2: "Ramadan Umrah transport: questions",
        kind: "faq",
        items: [
          { q: "How early should I request a ride in Ramadan?", a: "As early as you can, especially for the last ten nights. How early we need the details depends on the day and is confirmed for each request." },
          { q: "Are rides more expensive in Ramadan?", a: "No standard prices are published. The fare for your dates is confirmed with you before you commit." },
          { q: "Can you take a group during the last ten nights?", a: "Groups can be requested. Availability is confirmed for each request, so send the details early." },
        ],
      },
    ],
    prefill: { pickup: "Makkah or Madinah hotel" },
  }),

  page({
    slug: "hajj-season-transport",
    name: "Hajj Season Transport",
    title: "Hajj Season Taxi and Transport in Makkah and Madinah",
    description: "Taxi and transfers for Hajj visitors in Makkah, Madinah and Jeddah: airport, hotel and city rides. Hajj movement is controlled; we confirm what is possible.",
    h1: "Hajj Season Taxi and Transport",
    lead: "Rides around the Hajj season, with honest guidance on what can and cannot be arranged.",
    direct: `Gulf Elite Transport arranges taxi and car transfers for Hajj visitors in Makkah, Madinah and Jeddah, including airport, hotel and city rides. During the Hajj season, movement into Makkah and between the sacred sites is controlled by the authorities, so we confirm what can be arranged for your dates and tell you plainly if something cannot.`,
    facts: [
      { label: "Covers", value: "Airport, hotel and city rides around Hajj" },
      { label: "Controlled", value: "Movement to the sacred sites is set by the authorities" },
      { label: "Advice", value: "Send dates and documents early" },
      { label: "We confirm", value: "What can be arranged for your dates" },
    ],
    sections: [
      {
        id: "about",
        h2: "Transport in the Hajj season",
        kind: "text",
        paragraphs: [
          "Hajj brings millions of pilgrims to Makkah in the same few days, and the authorities control movement carefully: who may enter Makkah, how pilgrims travel between Mina, Arafat and Muzdalifah, and which vehicles may use which roads. These controls change from year to year and can apply with little notice.",
          "For that reason we do not publish a fixed Hajj package, and we do not assume that a ride on a given day will be allowed. What we do is arrange the transfers around the Hajj season that can be arranged, such as airport and hotel rides in Jeddah, Makkah and Madinah, and tell you plainly where a request depends on permits or on rules for the pilgrim movement itself.",
        ],
      },
      {
        id: "arranged",
        h2: "What we can discuss",
        kind: "items",
        items: [
          { title: "Airport transfers", text: "Arrival and departure transfers at Jeddah and Madinah airports, sized for your group and luggage." },
          { title: "Hotel and city rides", text: "Rides between hotels and the places you need to reach, subject to road controls." },
          { title: "Between the holy cities", text: "Journeys between Makkah, Madinah and Jeddah before and after the Hajj days." },
          { title: "What depends on permits", text: "Anything involving movement to the sacred sites during the Hajj period is confirmed against the rules in force for your dates." },
        ],
      },
      related([topic("jeddah-airport-to-makkah", "Jeddah airport to Makkah"), topic("madinah-airport-to-makkah", "Madinah airport to Makkah"), topic("group-transport-for-umrah", "Group transport for Umrah"), topic("makkah-ziyarat-rides", "Rides to places in Makkah"), L.hub]),
      {
        id: "faq",
        h2: "Hajj season transport: questions",
        kind: "faq",
        items: [
          { q: "Do you offer a Hajj package?", a: "No fixed package is published. We discuss what can be arranged for your dates and your group, and confirm it with you." },
          { q: "Can you take us to Mina and Arafat?", a: "Access to the sacred sites during Hajj is controlled by the authorities. We tell you plainly what can be arranged for your dates." },
          { q: "What should I send when I ask?", a: "Your dates, the cities, the group size and any documents you hold. The more we know early, the clearer the answer." },
        ],
      },
    ],
    prefill: { pickup: "Jeddah airport or hotel" },
  }),
];

// ------------------------------------------------------------------------------------------ more journeys
const moreTopics: PlacePage[] = [
  page({
    slug: "makkah-hotel-to-jeddah-airport",
    name: "Makkah Hotel to Jeddah Airport",
    title: "Makkah Hotel to Jeddah Airport (JED) Taxi for Departure",
    description: "Taxi from your Makkah hotel to Jeddah airport (JED) for your flight home: pickup planned back from your flight time. Fare confirmed first.",
    h1: "Makkah Hotel to Jeddah Airport Taxi",
    lead: `The last ride of an Umrah trip, about ${KM_JED_MAKKAH} km. We plan the pickup back from your flight so you are not rushing.`,
    direct: `Gulf Elite Transport arranges taxi and car transfers from hotels in Makkah to King Abdulaziz International Airport in Jeddah for departing pilgrims, for individuals and groups. Send your flight time, hotel and group size, and the pickup is planned back from your flight. The vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Route", value: "Makkah hotel to Jeddah airport (JED)" },
      { label: "Road distance", value: `about ${KM_JED_MAKKAH} km (approximate)` },
      { label: "Planned from", value: "Your flight time, not a fixed pickup time" },
      { label: "Group size", value: "One traveller to full groups" },
    ],
    sections: [
      {
        id: "about",
        h2: "Getting from Makkah to your flight",
        kind: "text",
        paragraphs: [
          "The ride out of Makkah is the one pilgrims most often worry about, because the flight cannot wait. The distance to Jeddah airport is about " + KM_JED_MAKKAH + " km, and the road is among the busiest in the country, with traffic that varies a great deal by day and season. Heavy luggage and a group moving out of a hotel near the Haram add to the time.",
          "The safest approach is to plan the pickup back from your flight rather than from your checkout. Tell us the flight time and the airline, and we agree a pickup time with a margin for traffic and for the airport itself. Airports ask international passengers to arrive well before departure, and your airline sets the time, so check your ticket.",
        ],
      },
      {
        id: "plan",
        h2: "Planning the departure ride",
        kind: "items",
        items: [
          { title: "Give the airline and flight time", text: "Jeddah airport has several terminals, so your airline tells us where to go." },
          { title: "Agree the pickup point", text: "Roads near the Haram are controlled. We agree a point the vehicle can reach and tell you how far the walk is from your hotel." },
          { title: "Allow for luggage", text: "Bags bought during the trip, such as Zamzam containers, add weight. Tell us the number of bags and any large items." },
          { title: "Leave a margin", text: "Traffic on the Makkah to Jeddah road can change quickly. Build in extra time, especially in Ramadan and the Hajj season." },
        ],
      },
      related([topic("jeddah-airport-to-makkah", "Jeddah airport to Makkah"), L.jed, L.jedMakkah, topic("night-and-early-morning-transfers", "Night and early-morning transfers"), L.makkah, L.hub]),
      {
        id: "faq",
        h2: "Makkah to Jeddah airport: questions",
        kind: "faq",
        items: [
          { q: "How early should the pickup be?", a: "We plan it back from your flight, with a margin for traffic and for the airport. We agree the time with you when you book." },
          { q: "Can I book the arrival and the departure together?", a: "Yes. Both rides can be requested at the same time for the same group." },
          { q: "What if my flight time changes?", a: "Tell us as soon as you know so the pickup can be moved. How changes are handled is confirmed with you when you book." },
        ],
      },
    ],
    entities: [makkahE, jeddahE, { type: "Airport", name: "King Abdulaziz International Airport", iata: "JED" }, country],
    route: { from: "Makkah", to: "Jeddah Airport", km: KM_JED_MAKKAH },
    prefill: { pickup: "Makkah hotel", dropoff: "King Abdulaziz International Airport (JED)" },
  }),

  page({
    slug: "madinah-hotel-to-madinah-airport",
    name: "Madinah Hotel to Madinah Airport",
    title: "Madinah Hotel to Madinah Airport (MED) Taxi for Departure",
    description: "Taxi from your Madinah hotel to Madinah airport (MED) for your flight, with the pickup planned back from your flight time. Fare confirmed first.",
    h1: "Madinah Hotel to Madinah Airport Taxi",
    lead: "A short ride that still needs planning, since hotels near the mosque have limited vehicle access.",
    direct: `Gulf Elite Transport arranges taxi and car transfers from hotels in Madinah to Prince Mohammad bin Abdulaziz International Airport for departing visitors, in both directions. Send your flight time, hotel and group size, and the pickup is planned back from your flight. The vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Route", value: "Madinah hotel to Madinah airport (MED)" },
      { label: "Distance", value: "A short city ride" },
      { label: "Planned from", value: "Your flight time" },
      { label: "Hotels", value: "Mostly around the Central Area" },
    ],
    sections: [
      {
        id: "about",
        h2: "From the Prophet's Mosque to your flight",
        kind: "text",
        paragraphs: [
          "Prince Mohammad bin Abdulaziz International Airport lies north-east of Madinah, so the ride from a hotel near the Prophet's Mosque is short compared with the journey from Makkah or Jeddah. The difficulty is the start of the ride. Roads around the mosque are restricted at prayer times and in busy seasons, and a large group with luggage cannot always be picked up at the hotel door.",
          "Because the ride is short, the margin for error is small in one respect: if the pickup point is wrong, the group loses time before the car has even left the area. Giving us the hotel name and agreeing a meeting point in advance avoids that, and the flight time lets us plan a sensible departure.",
        ],
      },
      {
        id: "plan",
        h2: "Planning the ride",
        kind: "items",
        items: [
          { title: "Meeting point", text: "The nearest road the vehicle can reach for your hotel, agreed in advance." },
          { title: "Flight and airline", text: "So the pickup is planned back from your flight and the right terminal is used." },
          { title: "Luggage and group", text: "Bags and the number of travellers, so a vehicle of the right size comes." },
          { title: "After the last prayer", text: "If you want to pray at the mosque before leaving, tell us the time you expect to be ready." },
        ],
      },
      related([topic("madinah-airport-to-madinah-hotel", "Madinah airport to Madinah hotel"), L.med, L.madinah, topic("night-and-early-morning-transfers", "Night and early-morning transfers"), L.hub]),
      {
        id: "faq",
        h2: "Madinah to the airport: questions",
        kind: "faq",
        items: [
          { q: "Can the car wait at the hotel door?", a: "Access near the mosque is controlled. We agree the closest permitted point for your hotel." },
          { q: "Can I book this with my arrival transfer?", a: "Yes. Both can be requested together for the same group." },
          { q: "Do you handle large groups at the airport?", a: "Yes. We arrange vehicles of the right size and confirm what is possible for your request." },
        ],
      },
    ],
    entities: [{ type: "Airport", name: "Prince Mohammad bin Abdulaziz International Airport", iata: "MED" }, madinahE, country],
    prefill: { pickup: "Madinah hotel", dropoff: "Prince Mohammad bin Abdulaziz International Airport (MED)" },
  }),

  page({
    slug: "jeddah-hotel-to-jeddah-airport",
    name: "Jeddah Hotel to Jeddah Airport",
    title: "Jeddah Hotel to Jeddah Airport (JED) Taxi for Pilgrims",
    description: "Taxi from your Jeddah hotel to Jeddah airport (JED) for pilgrims and visitors arriving early or leaving late. Pickup planned from your flight.",
    h1: "Jeddah Hotel to Jeddah Airport Taxi",
    lead: "For pilgrims who stay a night in Jeddah before or after Makkah and Madinah.",
    direct: `Gulf Elite Transport arranges taxi rides from hotels in Jeddah to King Abdulaziz International Airport and back, for pilgrims and visitors who stay in Jeddah before or after their Umrah. Send your hotel, flight time and group size, and the pickup is planned back from your flight. The vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Route", value: "Jeddah hotel to Jeddah airport (JED)" },
      { label: "Distance", value: "A long city ride; the airport is north of the city" },
      { label: "Planned from", value: "Your flight time" },
      { label: "Best for", value: "Pilgrims staying in Jeddah" },
    ],
    sections: [
      {
        id: "about",
        h2: "Why Jeddah is more than a stopover",
        kind: "text",
        paragraphs: [
          "Many pilgrims spend a night or two in Jeddah, either because their flight arrives late and the drive to Makkah can wait until morning, or because they leave from Jeddah and want a rest day after Umrah. King Abdulaziz International Airport lies in the north of the city, so a ride from a hotel in the centre or on the Corniche is a long city ride rather than a short hop.",
          "Jeddah's traffic changes through the day, with the heaviest periods in the morning and the evening, and on Thursday and Friday afternoons. Planning the pickup back from your flight time, with a margin, matters more here than the distance suggests.",
        ],
      },
      {
        id: "plan",
        h2: "What to tell us",
        kind: "items",
        items: [
          { title: "Hotel and area", text: "The hotel name and its district, so we can plan the pickup point." },
          { title: "Flight and terminal", text: "Airline and flight time, since the airport has more than one terminal." },
          { title: "Luggage", text: "Number of bags, especially if you are carrying extra luggage from the trip." },
          { title: "Time of day", text: "Early-morning and late-night flights are common. Tell us your flight time and we plan around it." },
        ],
      },
      related([L.jed, L.jeddah, topic("makkah-hotel-to-jeddah-airport", "Makkah hotel to Jeddah airport"), topic("jeddah-airport-to-makkah", "Jeddah airport to Makkah"), topic("night-and-early-morning-transfers", "Night and early-morning transfers"), L.hub]),
      {
        id: "faq",
        h2: "Jeddah hotel to the airport: questions",
        kind: "faq",
        items: [
          { q: "Is the airport far from the city centre?", a: "It is in the north of Jeddah, so rides from the centre are long city rides. The time depends on traffic." },
          { q: "Can I go from the airport to Jeddah and later on to Makkah?", a: "Yes. Tell us the full plan and we arrange each ride, confirmed for each request." },
          { q: "Can you visit Al-Balad on the way?", a: "A stop at Al-Balad or another place can be discussed when you request the ride." },
        ],
      },
    ],
    entities: [jeddahE, { type: "Airport", name: "King Abdulaziz International Airport", iata: "JED" }, country],
    prefill: { pickup: "Jeddah hotel", dropoff: "King Abdulaziz International Airport (JED)" },
  }),

  page({
    slug: "taif-to-makkah-for-umrah",
    name: "Taif to Makkah for Umrah",
    title: "Taif to Makkah Taxi for Umrah, with Qarn al-Manazil Stop",
    description: "Private taxi from Taif to Makkah for Umrah, with a stop at Qarn al-Manazil Miqat on the way. Families and groups welcome. Fare confirmed first.",
    h1: "Taif to Makkah Taxi for Umrah",
    lead: "Come down from the Taif plateau to Makkah, with time to enter ihram at the Miqat on the way.",
    direct: `Gulf Elite Transport arranges private taxi and car journeys from Taif to Makkah for pilgrims travelling to perform Umrah, with an optional stop at Qarn al-Manazil, the Miqat on the Taif road. Tell us your pickup in Taif, your Makkah hotel and the group size, and the vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Journey", value: "Taif to Makkah" },
      { label: "Miqat on the way", value: "Qarn al-Manazil (As-Sayl al-Kabir)" },
      { label: "Road", value: "Mountain road with steep sections" },
      { label: "Best for", value: "Families and groups combining Taif and Umrah" },
    ],
    sections: [
      {
        id: "about",
        h2: "From the hills to the holy city",
        kind: "text",
        paragraphs: [
          "Taif sits on a cool plateau in the mountains east of Makkah, and many families combine a stay there with Umrah, especially in summer. The journey down to Makkah follows a mountain road with several steep and winding sections, and it passes Qarn al-Manazil, also known as As-Sayl al-Kabir, one of the Miqat points for pilgrims coming from this direction.",
          "A private ride is comfortable for this road, since the vehicle can be chosen for the group and the driver knows the climb and the descent. If you want to enter ihram at the Miqat, tell us when you request the ride so the stop is built into the plan.",
        ],
      },
      {
        id: "plan",
        h2: "How to plan it",
        kind: "items",
        items: [
          { title: "Pickup in Taif", text: "The hotel or address in Taif, and the time you want to leave." },
          { title: "Stop at Qarn al-Manazil", text: "Tell us if you want to change into ihram and pray at the Miqat, and how much time your group needs." },
          { title: "Makkah hotel", text: "The hotel name and area, so the drop-off near the Haram can be planned." },
          { title: "Group and luggage", text: "Number of travellers and bags, so the vehicle suits the road and the group." },
        ],
      },
      related([{ name: "Taxi & Cab Service in Taif", href: TAIF, note: "City guide" }, L.makkah, L.taif, topic("group-transport-for-umrah", "Group transport for Umrah"), topic("madinah-to-makkah-for-umrah", "Madinah to Makkah for Umrah"), L.hub]),
      {
        id: "faq",
        h2: "Taif to Makkah for Umrah: questions",
        kind: "faq",
        items: [
          { q: "Do you stop at the Miqat?", a: "Yes, if you ask. A stop at Qarn al-Manazil can be planned, and you tell us how long you need." },
          { q: "Is the road difficult?", a: "It is a mountain road with steep sections, so a rested driver and a vehicle chosen for the group matter. We plan both." },
          { q: "Can we return to Taif afterwards?", a: "Yes. A return from Makkah to Taif can be requested together with the outward ride." },
        ],
      },
    ],
    entities: [{ type: "City", name: "Taif", wiki: "Taif", ar: "الطائف", lat: 21.2703, lng: 40.4158 }, makkahE, country],
    prefill: { pickup: "Taif", dropoff: "Makkah" },
  }),

  page({
    slug: "umrah-transport-for-travel-agents",
    name: "Umrah Transport for Travel Agents",
    title: "Umrah Transport for Travel Agents and Group Leaders",
    description: "Ground transport for Umrah travel agents, tour operators and group leaders: airport, hotel and holy-city transfers for groups of any size, planned together.",
    h1: "Umrah Transport for Travel Agents and Group Leaders",
    lead: "One partner for the ground transport of your groups, from the airport to the hotel and between the holy cities.",
    direct: `Gulf Elite Transport arranges ground transport for Umrah travel agents, tour operators and group leaders: airport transfers, hotel runs and journeys between Makkah, Madinah and Jeddah, for groups of any size. Send your group's itinerary and numbers, and the vehicles, drivers and fares are confirmed with you before you commit.`,
    facts: [
      { label: "For", value: "Travel agents, tour operators, group leaders" },
      { label: "Covers", value: "Airport, hotel and holy-city transfers" },
      { label: "Group size", value: "Small parties to coach groups" },
      { label: "Contact", value: "One coordinator for the whole itinerary" },
    ],
    sections: [
      {
        id: "about",
        h2: "Ground transport that follows your itinerary",
        kind: "text",
        paragraphs: [
          "An agent or group leader is judged on whether the group arrives on time, together and without confusion. Ground transport is where small mistakes show up: a coach waiting at the wrong terminal, a group split between two vehicles, a pickup at a hotel door that the vehicle cannot reach. Planning every stage together reduces those mistakes.",
          "Send us the whole itinerary: arrival airport and flight, hotels in Makkah and Madinah, the dates of the move between the two cities and the departure flight. We plan each leg, recommend the vehicles, and agree the meeting points. Changes to flights or dates are handled through one contact, so you do not have to chase several drivers.",
        ],
      },
      {
        id: "send",
        h2: "What to send us",
        kind: "items",
        items: [
          { title: "Itinerary", text: "Airports and flight numbers, hotels in each city, move dates and the departure flight." },
          { title: "Group numbers", text: "The number of travellers and the number of large bags, by arrival, so the right vehicles are planned." },
          { title: "Special needs", text: "Elderly travellers, wheelchair users and families with young children." },
          { title: "One contact", text: "A name and phone number on your side for changes and on-the-day coordination." },
        ],
      },
      {
        id: "how-we-work",
        h2: "How we work with agents",
        kind: "items",
        items: [
          { title: "One plan for every leg", text: "Airport, hotel, holy-city and departure transfers are planned together." },
          { title: "Vehicles matched to numbers", text: "One coach, several minibuses or a mix of vans, depending on the group and the access at each hotel." },
          { title: "Agreed meeting points", text: "Pickup and drop-off points near the Haram and the Prophet's Mosque are agreed in advance." },
          { title: "Clear confirmation", text: "Vehicles, drivers and fares are confirmed in writing before you commit." },
        ],
      },
      related([topic("group-transport-for-umrah", "Group transport for Umrah"), topic("umrah-itinerary-transport-plan", "A typical Umrah transport plan"), topic("coach-for-umrah-groups", "Coach for Umrah groups"), topic("minibus-for-umrah-groups", "Minibus for Umrah groups"), L.hub]),
      {
        id: "faq",
        h2: "Umrah transport for agents: questions",
        kind: "faq",
        items: [
          { q: "Can you handle several groups arriving on the same day?", a: "Send the details of each group and we plan the vehicles for each, confirmed for each request." },
          { q: "Do you provide a single contact?", a: "Yes. We keep one point of contact for your itinerary so changes are communicated through one person." },
          { q: "Are agent prices different?", a: "No standard prices are published. Fares for each request, including regular work, are confirmed with you before you commit." },
        ],
      },
    ],
    prefill: { pickup: "Jeddah airport" },
  }),

  page({
    slug: "umrah-itinerary-transport-plan",
    name: "A Typical Umrah Transport Plan",
    title: "Umrah Transport Plan: Jeddah, Makkah, Madinah, Airport",
    description: "See how the ground transport of a typical Umrah trip is planned: Jeddah airport, Makkah, Madinah and the flight home. Book each leg or the whole plan.",
    h1: "A Typical Umrah Transport Plan",
    lead: "Leg by leg, from landing in Jeddah to your flight home. Book each ride, or the whole plan together.",
    direct: `A typical Umrah trip needs five or six rides: Jeddah airport to Makkah, rides to the Haram during your stay, Makkah to Madinah, rides around Madinah, and Madinah airport for your flight home. Gulf Elite Transport arranges each leg or the whole plan, and the vehicle, driver and fare for each are confirmed before you commit.`,
    facts: [
      { label: "Typical legs", value: "Five or six rides" },
      { label: "Order", value: "Jeddah airport, Makkah, Madinah, airport" },
      { label: "Book", value: "Each leg or the whole plan" },
      { label: "Group size", value: "One traveller to full groups" },
    ],
    sections: [
      {
        id: "about",
        h2: "How the legs fit together",
        kind: "text",
        paragraphs: [
          "Many first-time visitors are unsure what transport they need. The usual pattern is simple: land at Jeddah, travel to Makkah, perform Umrah and spend some days there, travel to Madinah, visit the Prophet's Mosque and the places around it, then fly home from Madinah. Visitors who start in Madinah simply reverse the order of the two cities.",
          "Each leg has its own considerations, from the airport pickup and the drop-off near the Haram to the Miqat on the way between the cities. Planning them together lets us match the vehicle to your group for every ride and agree meeting points in advance, so you only decide once.",
        ],
      },
      {
        id: "legs",
        h2: "The legs of a typical trip",
        kind: "items",
        items: [
          { title: "1. Jeddah airport to Makkah", text: `The first long ride, about ${KM_JED_MAKKAH} km. See Jeddah airport to Makkah.` },
          { title: "2. In Makkah", text: "Rides between your hotel and the Haram, and to Tan'eem for a further Umrah. See Makkah hotel to the Haram and the Umrah taxi with waiting." },
          { title: "3. Makkah to Madinah", text: `About ${KM_MAKKAH_MADINAH} km between the holy cities, with prayer stops. See Makkah to Madinah after Umrah.` },
          { title: "4. In Madinah", text: "Rides to the Prophet's Mosque and to places such as Quba and Uhud." },
          { title: "5. Madinah hotel to the airport", text: "The ride for your flight home, planned back from your flight time." },
          { title: "Variation", text: "If you fly out of Jeddah, the last ride is Makkah to Jeddah airport instead." },
        ],
      },
      related([topic("jeddah-airport-to-makkah", "Jeddah airport to Makkah"), topic("makkah-to-madinah-for-umrah", "Makkah to Madinah after Umrah"), topic("madinah-hotel-to-madinah-airport", "Madinah hotel to Madinah airport"), topic("makkah-hotel-to-jeddah-airport", "Makkah hotel to Jeddah airport"), topic("umrah-transport-for-travel-agents", "For travel agents"), L.hub]),
      {
        id: "faq",
        h2: "Umrah transport plan: questions",
        kind: "faq",
        items: [
          { q: "Do I have to book every ride at once?", a: "No. You can book each leg separately or ask us to plan the whole trip, confirmed for each request." },
          { q: "What if my hotel dates change?", a: "Tell us as soon as you know and we adjust the rides. How changes are handled is confirmed with you when you book." },
          { q: "Can I fly into Madinah and out of Jeddah?", a: "Yes. Tell us the airports and dates and we plan the legs in that order." },
        ],
      },
    ],
    prefill: { pickup: "Jeddah airport" },
  }),

  page({
    slug: "night-and-early-morning-transfers",
    name: "Night and Early-Morning Transfers",
    title: "Night and Early-Morning Airport Transfers: Jeddah, Madinah",
    description: "Taxi for late-night arrivals and early-morning flights at Jeddah and Madinah airports, to Makkah, Madinah and hotels. Fare confirmed before you commit.",
    h1: "Night and Early-Morning Airport Transfers",
    lead: "Late landings and dawn departures: plan the ride around your flight, not around business hours.",
    direct: `Gulf Elite Transport arranges taxi transfers for late-night arrivals and early-morning departures at Jeddah and Madinah airports, to and from hotels in Makkah, Madinah and Jeddah. Send your flight number and time, and the pickup follows your flight. The vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "For", value: "Late arrivals and early departures" },
      { label: "Airports", value: "Jeddah (JED) and Madinah (MED)" },
      { label: "Planned from", value: "Your flight number and time" },
      { label: "Confirmed", value: "Vehicle, driver and fare, before you commit" },
    ],
    sections: [
      {
        id: "about",
        h2: "When your flight is at an awkward hour",
        kind: "text",
        paragraphs: [
          "Many flights to and from the holy cities land after midnight or leave before dawn, and arriving tired in the middle of the night is when pilgrims most need a driver who is expecting them. Roads are quieter at those hours, which can make the ride faster, but hotel reception, check-in and the pickup point near the Haram or mosque may work differently from during the day.",
          "Send us your flight number so the pickup follows the actual landing time, not a fixed one. Tell us the hotel and whether it accepts late check-in, so you are not left in the car park at 3 a.m. For an early departure, plan the pickup back from your flight with a margin, and tell the hotel the night before.",
        ],
      },
      {
        id: "plan",
        h2: "Things to confirm for a night ride",
        kind: "items",
        items: [
          { title: "Flight number", text: "So the driver tracks your arrival and waits if the flight is late." },
          { title: "Hotel check-in", text: "That the hotel will receive you at that hour, and whether a room is ready." },
          { title: "Pickup point", text: "Where the driver will meet you in the arrivals hall, and a phone number to reach them." },
          { title: "Departure margin", text: "For a dawn flight, a margin for check-in and traffic, and a quiet word with the hotel the night before." },
        ],
      },
      related([topic("jeddah-airport-to-makkah", "Jeddah airport to Makkah"), topic("madinah-airport-to-madinah-hotel", "Madinah airport to Madinah hotel"), topic("makkah-hotel-to-jeddah-airport", "Makkah hotel to Jeddah airport"), L.jed, L.med, L.hub]),
      {
        id: "faq",
        h2: "Night and early-morning transfers: questions",
        kind: "faq",
        items: [
          { q: "Will the driver wait if my flight is late?", a: "Give us your flight number so the pickup follows the flight. How delays are handled is confirmed with you when you book." },
          { q: "Do you charge extra at night?", a: "No standard fares are published. The fare for your request, including the time of day, is confirmed before you commit." },
          { q: "Is it safe to travel at night?", a: "Roads between the airports and the holy cities are busy day and night, and a pre-arranged driver means you are not looking for a car on arrival." },
        ],
      },
    ],
    prefill: { pickup: "Jeddah airport" },
  }),
];

// ------------------------------------------------------------------------------------------ places (one page per place)
type Spot = {
  slug: string;
  name: string;
  ar: string;
  city: "makkah" | "madinah" | "jeddah" | "taif";
  /** Distance reference; defaults to the main mosque of the holy cities. */
  from?: { name: string; lat: number; lng: number };
  lat: number;
  lng: number;
  kind: "holy-site" | "district";
  tagline: string;
  about: string;
  know: { title: string; text: string }[];
  taxi: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

const HARAM = { name: "Al-Masjid al-Haram", lat: 21.4225, lng: 39.8262 };
const NABAWI = { name: "Al-Masjid an-Nabawi", lat: 24.4672, lng: 39.6111 };
const rad = (x: number) => (x * Math.PI) / 180;
const dist = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const h = Math.sin(rad(b.lat - a.lat) / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};

const spots: Spot[] = [
  {
    slug: "jabal-al-noor-taxi", name: "Jabal al-Noor (Cave of Hira)", ar: "جبل النور", city: "makkah", lat: 21.4573, lng: 39.8586, kind: "holy-site",
    tagline: "The Mountain of Light, with the cave where the first revelation is said to have come to the Prophet.",
    about: "Jabal al-Noor rises north-east of the Haram, and near its summit is the Cave of Hira, where the first verses of the Quran are traditionally said to have been revealed. It is one of the most visited places outside the Haram, and many people go to see it and the view over Makkah rather than to climb all the way.",
    know: [
      { title: "The climb is steep", text: "A path of stairs and rough steps leads up the mountain. It takes real effort and is not suitable for everyone, so many visitors stop at the lower levels." },
      { title: "Heat and timing", text: "Early morning and the hours after sunset are far more comfortable than midday, particularly in summer." },
      { title: "Crowds", text: "Weekends, school holidays and Ramadan bring large crowds around the base and on the path." },
    ],
    taxi: [
      { title: "Where the car stops", text: "The car stops at the base of the mountain, where stalls and a small car park serve visitors. The climb itself is on foot." },
      { title: "Waiting", text: "Most visitors ask the driver to wait, since a taxi back from the base can be hard to find. Tell us how long you expect to be." },
      { title: "Combine with other places", text: "Jabal al-Noor is often combined with Jabal Thawr and Masjid A'isha in one half-day of rides. Give us the order you want." },
    ],
    faq: [
      { q: "Can the taxi take me up the mountain?", a: "No. The vehicle stops at the base and the climb is on foot." },
      { q: "How long should the driver wait?", a: "It depends on how far you climb. Tell us your plan and we agree the waiting arrangement before you commit." },
    ],
  },
  {
    slug: "jabal-thawr-taxi", name: "Jabal Thawr", ar: "جبل ثور", city: "makkah", lat: 21.3774, lng: 39.8483, kind: "holy-site",
    tagline: "The mountain south of Makkah where the Prophet and Abu Bakr are said to have sheltered at the start of the Hijra.",
    about: "Jabal Thawr stands south of the city, and a cave near its top is associated with the days the Prophet and Abu Bakr spent hiding before their journey to Madinah. It is quieter than Jabal al-Noor, and visitors usually go for the history and for the walk rather than the crowds.",
    know: [
      { title: "A longer, harder climb", text: "The path is longer and steeper than many people expect, and shade is limited. Sensible shoes and water matter." },
      { title: "Quieter side of the city", text: "It lies away from the Haram on the southern side, so the ride is through a different part of Makkah from the usual pilgrim routes." },
      { title: "Best time to go", text: "Early morning, before the heat builds, is the most practical time." },
    ],
    taxi: [
      { title: "Where the car stops", text: "The car stops at the foot of the mountain. From there it is a walk and then a climb." },
      { title: "Waiting", text: "A wait is usual, since a taxi back from the foot of the mountain is not easy to find. Agree the waiting time with us first." },
      { title: "Planning the round trip", text: "From a hotel near the Haram it is a ride out and back. Tell us your pickup point and the time you want to start." },
    ],
    faq: [
      { q: "Is Jabal Thawr suitable for elderly visitors?", a: "The climb is demanding. Many visitors view the mountain from the base, and the driver can wait while others go up." },
      { q: "Can we combine it with Jabal al-Noor?", a: "Yes. Tell us the order and we plan the route and the waiting with you." },
    ],
  },
  {
    slug: "mina-taxi", name: "Mina", ar: "منى", city: "makkah", lat: 21.4133, lng: 39.8933, kind: "holy-site",
    tagline: "The valley east of Makkah, known for the tent city where pilgrims stay during Hajj.",
    about: "Mina is a valley east of the Haram, a few kilometres from Makkah, known for its vast tent city where pilgrims stay during the days of Hajj and for the Jamarat, where the stoning rite is performed. For most of the year it is quiet. Around Hajj it becomes one of the most crowded places on earth, and movement there is controlled by the authorities.",
    know: [
      { title: "Outside the Hajj days", text: "The valley is open and quiet for much of the year, and visitors may ask for a ride to see it or to pass through on the way to Arafat." },
      { title: "During Hajj", text: "Roads, tents and the Jamarat area are managed by the authorities, and vehicle access is tightly controlled. We do not assume that a ride to Mina will be allowed on a Hajj date." },
      { title: "Between the sacred sites", text: "Mina, Muzdalifah and Arafat run along one corridor east of Makkah, so a ride to one often passes the others." },
    ],
    taxi: [
      { title: "Short ride from the Haram", text: "Mina is a short ride in distance from central Makkah, though traffic can make it long on busy days." },
      { title: "Say your purpose", text: "Tell us whether you want to see the area, visit the Jamarat or continue to Arafat, so the right route and stops are planned." },
      { title: "Hajj dates", text: "For Hajj dates, we tell you plainly what can be arranged under the rules in force." },
    ],
    faq: [
      { q: "Can I visit Mina outside Hajj?", a: "Yes, the area is open for much of the year. Tell us the date and the places you want to see." },
      { q: "Can you take us to Mina during Hajj?", a: "Access then is controlled by the authorities. We confirm what can be arranged for your dates." },
    ],
  },
  {
    slug: "muzdalifah-taxi", name: "Muzdalifah", ar: "مزدلفة", city: "makkah", lat: 21.385, lng: 39.936, kind: "holy-site",
    tagline: "The open plain between Mina and Arafat where pilgrims spend the night after Arafat.",
    about: "Muzdalifah is a wide open plain between Mina and Arafat. During Hajj, pilgrims arrive here after sunset on the day of Arafat, pray and spend part of the night in the open before moving on to Mina. For the rest of the year it is empty ground beside the road and has little to see.",
    know: [
      { title: "A place for a few hours of the year", text: "Outside the Hajj days there are no crowds and no facilities. Visitors who stop here usually do so on the way between the other sacred sites." },
      { title: "Controlled movement", text: "During Hajj the movement of vehicles and people here is organised by the authorities. We do not assume access on those dates." },
      { title: "The route", text: "It lies between Mina and Arafat, so most visitors see it as part of a longer ride along the corridor." },
    ],
    taxi: [
      { title: "As part of a route", text: "Muzdalifah is normally one stop on a ride that includes Mina and Arafat. Tell us the places and the order." },
      { title: "Short stops", text: "A stop to pray and look is typically brief. Agree the time with the driver." },
      { title: "Hajj dates", text: "On Hajj dates, we confirm what can be arranged under the rules in force." },
    ],
    faq: [
      { q: "Is there anything to see outside Hajj?", a: "Very little. It is an open plain and most visitors stop briefly as part of a longer route." },
      { q: "Can a taxi stop here?", a: "Outside Hajj, a short stop can be planned. On Hajj dates, access is controlled by the authorities." },
    ],
  },
  {
    slug: "arafat-taxi", name: "Arafat", ar: "عرفات", city: "makkah", lat: 21.3549, lng: 39.9841, kind: "holy-site",
    tagline: "The plain and hill where the central rite of Hajj, the standing at Arafat, takes place.",
    about: "Arafat is a broad plain east of Makkah with a low granite hill known as Jabal al-Rahmah. The standing at Arafat on the ninth of Dhul Hijjah is the central rite of Hajj. The area is empty and quiet for most of the year, and visitors who come outside Hajj are usually there to see the plain and the hill, to pray and to take in the place.",
    know: [
      { title: "Further than Mina and Muzdalifah", text: "It is the furthest of the three sacred sites from the Haram, so the ride is longer, with the road passing Mina and Muzdalifah on the way." },
      { title: "Little shade", text: "The plain is open and hot for much of the year. Water and sun protection matter." },
      { title: "During Hajj", text: "Entry and movement are managed by the authorities, and we do not assume access on those dates." },
    ],
    taxi: [
      { title: "A longer half-day ride", text: "Allow time for the ride out, the visit and the way back. Tell us the time you want to start." },
      { title: "Waiting", text: "A taxi back from the plain is hard to find, so most visitors ask the driver to wait." },
      { title: "Combine the sites", text: "Arafat is often visited with Muzdalifah and Mina in one trip. Give us the order you prefer." },
    ],
    faq: [
      { q: "Can I visit Arafat outside Hajj?", a: "Yes, the area is generally accessible outside the Hajj days. We confirm the arrangement for your date." },
      { q: "How long does the visit take?", a: "It depends on how long you stay, and traffic on the road. We agree the waiting time with you first." },
    ],
  },
  {
    slug: "masjid-aisha-tanim-taxi", name: "Masjid A'isha (Tan'eem)", ar: "مسجد عائشة (التنعيم)", city: "makkah", lat: 21.4627, lng: 39.7817, kind: "holy-site",
    tagline: "The mosque at Tan'eem, the usual starting point for a further Umrah for pilgrims already in Makkah.",
    about: "Masjid A'isha lies at Tan'eem, on the north-western edge of Makkah, just outside the boundary of the Haram. It is the place where pilgrims who are already in Makkah commonly enter ihram to perform another Umrah, and it is among the busiest of the Miqat stops because of the number of people who use it.",
    know: [
      { title: "A short, busy ride", text: "The ride from the Haram area is short, but the road and the car park can be very busy, especially on weekends and in Ramadan." },
      { title: "Ihram and prayer", text: "Pilgrims enter ihram and pray here before returning to the Haram. Allow time for this, particularly with a group." },
      { title: "Women and families", text: "Facilities are large, but queues form at busy times, so allow extra time for families and groups." },
    ],
    taxi: [
      { title: "Out and back", text: "The usual plan is a ride from the hotel to Tan'eem and then on to the Haram. Tell us the sequence you want." },
      { title: "Waiting", text: "Many pilgrims ask the driver to wait while they enter ihram, then take them on to the Haram." },
      { title: "Timing", text: "Early morning and late evening are quieter than the afternoon." },
    ],
    faq: [
      { q: "Can you take us from Tan'eem to the Haram?", a: "Yes. The ride on to the Haram can be planned in the same arrangement, with the drop-off point agreed first." },
      { q: "Is the driver able to wait?", a: "Yes, if you ask. The waiting arrangement is confirmed before you commit." },
    ],
  },
  {
    slug: "jannat-al-mualla-taxi", name: "Jannat al-Mu'alla", ar: "جنة المعلاة", city: "makkah", lat: 21.431, lng: 39.83, kind: "holy-site",
    tagline: "The historic cemetery north of the Haram, also known as al-Hajun.",
    about: "Jannat al-Mu'alla is a historic cemetery on the northern side of the Haram, where several members of the Prophet's family and Companions are traditionally said to be buried. It is close enough to the Haram that many visitors walk, but a short ride helps those who cannot walk far or are in a group.",
    know: [
      { title: "Very close to the Haram", text: "It lies on the north side of the Haram, so it is a short ride or a walk." },
      { title: "Visiting arrangements", text: "Access and visiting times are set by the authorities and can change. Ask on the day or ask us when you request the ride." },
      { title: "Respect and dress", text: "Visitors are expected to behave with reverence, and signs on site set out what is allowed." },
    ],
    taxi: [
      { title: "A short ride", text: "From hotels near the Haram, it is a short ride. The drop-off is on a nearby road rather than at the gate." },
      { title: "Timed return", text: "Because the visit is brief, agree a pickup time instead of a long wait." },
      { title: "With other places", text: "It is often combined with Jabal al-Noor, since both are on the northern side of the city." },
    ],
    faq: [
      { q: "Can the car wait outside?", a: "A short wait or a timed pickup can be agreed. The point where the car can stop depends on road controls." },
      { q: "Are there visiting times?", a: "Visiting arrangements are set by the authorities and can change, so check on the day." },
    ],
  },
  {
    slug: "aziziyah-to-haram-taxi", name: "Aziziyah", ar: "العزيزية", city: "makkah", lat: 21.4, lng: 39.868, kind: "district",
    tagline: "A large residential district east of the Haram, popular with visitors who stay a few kilometres out.",
    about: "Aziziyah is a large residential and hotel district to the south-east of the Haram, with apartment buildings, family hotels and shops. Many visitors choose it for lower prices and larger rooms, and travel to the Haram by road for each prayer, which makes a ride the practical choice.",
    know: [
      { title: "Far enough to need a ride", text: "It is several kilometres from the Haram, so walking is not realistic for most visitors, especially elders and families." },
      { title: "Pickup points", text: "Streets are crowded with parked cars and shops. Give a landmark such as the hotel name or a nearby mosque for a precise pickup." },
      { title: "Peak times", text: "The roads towards the Haram fill before the main prayers, particularly Friday, and in Ramadan." },
    ],
    taxi: [
      { title: "To the Haram", text: "Rides from Aziziyah stop at the nearest permitted point to the Haram, and the last stretch is on foot. Agree it before you go." },
      { title: "Return pickup", text: "Plan the return ride with a landmark and a time window, since the roads near the Haram are controlled." },
      { title: "Several rides per day", text: "A regular pattern of rides for each prayer or visit can be arranged together, confirmed for each request." },
    ],
    faq: [
      { q: "Is Aziziyah a good area to stay in?", a: "It suits visitors who want more space and lower prices and accept that every visit to the Haram needs a ride." },
      { q: "Can you arrange daily rides from Aziziyah?", a: "Yes. Tell us your dates and times, and we confirm the arrangement before you commit." },
    ],
  },
  {
    slug: "abraj-al-bait-jabal-omar-taxi", name: "Abraj Al Bait and Jabal Omar", ar: "أبراج البيت وجبل عمر", city: "makkah", lat: 21.417, lng: 39.825, kind: "district",
    tagline: "The towers and hotel complexes right beside the Haram, where the main challenge is the pickup point.",
    about: "Abraj Al Bait, known for its Clock Tower, and the Jabal Omar development stand beside the Haram and hold some of the largest hotels in Makkah. They are within walking distance of the Haram, so rides here are less about reaching the mosque and more about arriving, leaving and getting to the places beyond it.",
    know: [
      { title: "Controlled roads", text: "Roads around the complexes are controlled, and a car may not be able to stop at the hotel entrance. The pickup is on a road the driver can reach." },
      { title: "Large buildings", text: "The complexes have many entrances and floors. Tell us the hotel and tower name and where you will wait." },
      { title: "Busy at prayer times", text: "Thousands of people leave the Haram at the same moment. Plan the pickup away from the busiest few minutes." },
    ],
    taxi: [
      { title: "Airport and station transfers", text: "The most common rides from here are to Jeddah airport and the Haramain station. Send the flight or train time so the pickup is planned back from it." },
      { title: "Luggage", text: "Large groups with luggage should say so, since a bigger vehicle may need a different pickup point." },
      { title: "Rides to other places", text: "Rides to Jabal al-Noor, Tan'eem and other places can be planned from here, with a timed return." },
    ],
    faq: [
      { q: "Do I need a taxi if my hotel is next to the Haram?", a: "Not to reach the Haram. You need one for the airport, the station, and the places beyond the Haram." },
      { q: "Where will the car meet us?", a: "At a point the driver can reach, which may be a short walk from the hotel. We agree it before the day." },
    ],
  },
  {
    slug: "quba-mosque-taxi", name: "Quba Mosque", ar: "مسجد قباء", city: "madinah", lat: 24.4393, lng: 39.6173, kind: "holy-site",
    tagline: "The first mosque built in Islam, on the southern side of Madinah.",
    about: "Quba Mosque is generally regarded as the first mosque built in Islam, started by the Prophet on his arrival near Madinah. It lies on the southern side of the city, and many visitors go there during their stay, often as an early morning visit, since there is a tradition of praying there.",
    know: [
      { title: "A popular half-hour visit", text: "Most visitors spend a short time at the mosque and the area around it, which has shops and cafes." },
      { title: "Early morning is quieter", text: "The mosque is busiest at weekends and in the afternoon. Early morning is calmer." },
      { title: "Visiting times", text: "Prayer times affect when you can go in. Plan around them." },
    ],
    taxi: [
      { title: "Short ride from the Central Area", text: "From hotels near the Prophet's Mosque it is a short ride south." },
      { title: "Drop-off and pickup", text: "A car park serves the mosque. Agree a pickup point and time before you go in." },
      { title: "With other places", text: "Quba is often combined with Masjid al-Qiblatayn and Uhud in one morning's rides." },
    ],
    faq: [
      { q: "How long should the driver wait?", a: "Most visits are short. Tell us how long you expect to stay and we agree the arrangement first." },
      { q: "Can we visit several places in one ride?", a: "Yes. Give us the places and the order, and we plan the route and the timing with you." },
    ],
  },
  {
    slug: "masjid-al-qiblatayn-taxi", name: "Masjid al-Qiblatayn", ar: "مسجد القبلتين", city: "madinah", lat: 24.4849, lng: 39.5806, kind: "holy-site",
    tagline: "The Mosque of the Two Qiblas, where the direction of prayer is said to have changed.",
    about: "Masjid al-Qiblatayn, the Mosque of the Two Qiblas, is on the north-western side of Madinah. It is named for the tradition that the direction of prayer was changed here from Jerusalem to Makkah during a prayer. It is a regular stop on visits to the places of Madinah.",
    know: [
      { title: "A short stop", text: "Most people stop for a short visit and to pray." },
      { title: "On the western side", text: "It lies north-west of the Prophet's Mosque, on the way towards Uhud and the Seven Mosques." },
      { title: "Prayer times", text: "Go outside the main prayer times to avoid queues at the entrance." },
    ],
    taxi: [
      { title: "A short ride", text: "From hotels near the Prophet's Mosque it is a short ride north-west." },
      { title: "Meeting point", text: "A car park and a road beside the mosque serve visitors. We agree a meeting point with you." },
      { title: "Part of a route", text: "It is usually visited with the Seven Mosques and Uhud." },
    ],
    faq: [
      { q: "Can we combine it with other places?", a: "Yes. A ride to the Seven Mosques and Uhud can be planned in the same arrangement." },
      { q: "Can the driver wait?", a: "Yes, if you ask. We confirm the waiting arrangement first." },
    ],
  },
  {
    slug: "uhud-taxi", name: "Mount Uhud", ar: "جبل أحد", city: "madinah", lat: 24.5, lng: 39.61, kind: "holy-site",
    tagline: "The mountain and battlefield north of Madinah, linked to the Battle of Uhud.",
    about: "Mount Uhud rises north of Madinah, and the plain at its foot is the site of the Battle of Uhud. The cemetery where martyrs of the battle are buried is nearby. Visitors usually stop at the foot of the mountain and the cemetery area, which has a car park and a small set of shops.",
    know: [
      { title: "A short visit", text: "Most people stop for a short time to see the mountain and the plain and to reflect." },
      { title: "Heat", text: "The area is open and the sun is strong most of the year. Visit early or late in the day." },
      { title: "Respectful dress and conduct", text: "Visitors are expected to behave with reverence, and signs on site set out what is allowed." },
    ],
    taxi: [
      { title: "Short ride from the city", text: "It is a short ride north from the Prophet's Mosque." },
      { title: "Where the car stops", text: "The car stops at a car park near the foot of the mountain and the cemetery." },
      { title: "With other places", text: "Often combined with the Seven Mosques and Masjid al-Qiblatayn." },
    ],
    faq: [
      { q: "Can the taxi go up the mountain?", a: "Visitors stop at the base. We agree the stop and the return with you." },
      { q: "How long is the visit?", a: "Most visits are brief. Tell us your plan and we agree the waiting time first." },
    ],
  },
  {
    slug: "seven-mosques-madinah-taxi", name: "The Seven Mosques", ar: "المساجد السبعة", city: "madinah", lat: 24.4833, lng: 39.5942, kind: "holy-site",
    tagline: "A group of small mosques near the site of the Battle of the Trench.",
    about: "The Seven Mosques, known locally as al-Masajid as-Sab'ah, are a group of small mosques at the foot of Mount Sala' on the north-western side of Madinah, associated with the Battle of the Trench. Visitors come to see the group and to pray, and it is a regular stop on a morning of visits to the places of Madinah.",
    know: [
      { title: "Small, busy stop", text: "The mosques are small and can be crowded at busy times, so most visits are brief." },
      { title: "Near other places", text: "It is close to Masjid al-Qiblatayn, so the two are often visited together." },
      { title: "Information on site", text: "Signs explain the mosques. A guide, if you want one, is a separate arrangement." },
    ],
    taxi: [
      { title: "A short ride", text: "From the Central Area it is a short ride to the north-west." },
      { title: "Parking", text: "Parking is limited near the mosques. We agree a meeting point with you." },
      { title: "Planning the morning", text: "Many visitors do Quba, Qiblatayn, the Seven Mosques and Uhud in one morning. Tell us your order." },
    ],
    faq: [
      { q: "Is it far from the Prophet's Mosque?", a: "It is a short ride to the north-west. Traffic around prayer times affects the time." },
      { q: "Can you take us to all four places in one morning?", a: "Yes, a route covering them can be planned and confirmed with you." },
    ],
  },
  {
    slug: "dhul-hulayfah-abyar-ali-taxi", name: "Dhul Hulayfah (Abyar Ali)", ar: "ذو الحليفة (أبيار علي)", city: "madinah", lat: 24.4139, lng: 39.5436, kind: "holy-site",
    tagline: "The Miqat for pilgrims travelling from Madinah to Makkah, a short drive south-west of the city.",
    about: "Dhul Hulayfah, commonly known as Abyar Ali, is the Miqat for pilgrims travelling from Madinah to Makkah to perform Umrah or Hajj. Here, pilgrims change into ihram, pray and make their intention before continuing. It lies south-west of Madinah, on the road to Makkah, and has a large mosque and washing facilities.",
    know: [
      { title: "A planned stop on the way to Makkah", text: "Most visitors come here as part of the journey from Madinah to Makkah, not as a separate trip." },
      { title: "Time to change and pray", text: "Allow time for ablution, ihram and prayer. Groups usually need longer than individuals." },
      { title: "Busy in Ramadan and Hajj", text: "The car park and facilities fill up in the busy seasons. Plan extra time." },
    ],
    taxi: [
      { title: "On the way to Makkah", text: "The simplest plan is the Madinah to Makkah ride with a stop at the Miqat built in. Tell us how long you will need." },
      { title: "A separate ride from Madinah", text: "If you want to go from your hotel to the Miqat first, perhaps for a group to change together, that can be arranged." },
      { title: "Departure", text: "After the stop, the driver continues straight on to Makkah." },
    ],
    faq: [
      { q: "Do you stop at the Miqat on request?", a: "Yes. A stop at Abyar Ali can be planned, and you tell us how much time your group needs." },
      { q: "Is it far from Madinah?", a: "It is a short drive south-west of the city, on the road to Makkah." },
    ],
  },
  {
    slug: "jeddah-al-balad-taxi", name: "Al-Balad (Historic Jeddah)", ar: "البلد (جدة التاريخية)", city: "jeddah", from: { name: "King Abdulaziz International Airport", lat: 21.6796, lng: 39.1565 }, lat: 21.4858, lng: 39.1873, kind: "holy-site",
    tagline: "The old walled town of Jeddah, with coral-stone houses and traditional markets.",
    about: "Al-Balad is the historic centre of Jeddah, a district of coral-stone merchant houses with carved wooden balconies, narrow lanes and traditional souqs, recognised as a UNESCO World Heritage Site. Pilgrims who spend a night or an afternoon in Jeddah often visit it, usually in the evening when the heat eases.",
    know: [
      { title: "Narrow lanes", text: "Vehicles cannot enter the older lanes. The car stops at the edge of the district and visitors walk in." },
      { title: "Evenings are best", text: "The district is quieter and cooler in the early morning and after sunset, and the souqs are busiest in the evening." },
      { title: "Prayer times", text: "Some shops close for prayers, so plan your visit around them." },
    ],
    taxi: [
      { title: "From the airport", text: "Al-Balad is a long ride south from the airport. Arrivals with a long wait before their onward ride sometimes stop here." },
      { title: "Meeting point", text: "A road at the edge of the district serves as a pickup point. We agree it with you before you go in." },
      { title: "Timed return", text: "Agree a return time, since finding a car in the old town can be difficult." },
    ],
    faq: [
      { q: "Can the taxi enter the old town?", a: "Not the older lanes. The car stops at the edge of the district and visitors walk in." },
      { q: "Can we combine it with the Corniche?", a: "Yes. A ride covering Al-Balad and other places can be planned and confirmed with you." },
    ],
  },
  {
    slug: "jeddah-floating-mosque-taxi", name: "Al-Rahma Mosque (Floating Mosque)", ar: "مسجد الرحمة", city: "jeddah", from: { name: "King Abdulaziz International Airport", lat: 21.6796, lng: 39.1565 }, lat: 21.5546, lng: 39.1132, kind: "holy-site",
    tagline: "The white mosque on the Corniche that appears to float at high tide.",
    about: "Al-Rahma Mosque stands on the Jeddah Corniche, built on pilings over the Red Sea so that it seems to float at high tide. It is one of the best-known sights of the city, and visitors, including pilgrims on a short stay, go to see it and the waterfront around it.",
    know: [
      { title: "Best at sunset", text: "The light on the white domes and the water is at its best around sunset, but that is also the busiest time." },
      { title: "A short stop", text: "Most people spend a short time at the mosque and the Corniche around it." },
      { title: "Weekends", text: "The Corniche is crowded on Thursday and Friday evenings, and parking is limited." },
    ],
    taxi: [
      { title: "From hotels in Jeddah", text: "It is a ride along the Corniche from most central hotels." },
      { title: "Pickup", text: "Parking is scarce on busy evenings, so agree a pickup point on a nearby road." },
      { title: "With other places", text: "It is often combined with Al-Balad. Give us the order and we plan the route with you." },
    ],
    faq: [
      { q: "Is it far from the airport?", a: "It lies in the north of the Corniche, closer to the airport than Al-Balad. The ride time depends on traffic." },
      { q: "Can the driver wait?", a: "Yes, if you ask. The waiting arrangement is confirmed before you commit." },
    ],
  },
  {
    slug: "qarn-al-manazil-miqat-taxi", name: "Qarn al-Manazil (As-Sayl al-Kabir)", ar: "قرن المنازل (السيل الكبير)", city: "taif", from: HARAM, lat: 21.6316, lng: 40.4254, kind: "holy-site",
    tagline: "The Miqat on the Taif road, for pilgrims arriving from the east and for those travelling up from Makkah.",
    about: "Qarn al-Manazil, also known as As-Sayl al-Kabir, is one of the Miqat points for Umrah and Hajj. It lies on the road between Makkah and Taif, in the mountains east of the holy city, and serves pilgrims arriving from that direction. It has a mosque and facilities for changing into ihram and praying.",
    know: [
      { title: "A planned stop", text: "Most visitors stop here as part of a longer journey between Taif and Makkah, not as a separate trip." },
      { title: "Time to change and pray", text: "Allow time for ablution, ihram and prayer. Groups usually need longer than individuals." },
      { title: "Mountain road", text: "The road is steep and winding in sections. A rested driver and a suitable vehicle matter." },
    ],
    taxi: [
      { title: "Between Taif and Makkah", text: "The simplest plan is a ride from Taif to Makkah with the stop at the Miqat built in." },
      { title: "From Makkah", text: "If you want to start from Makkah and enter ihram here, the ride up and the ride back can be arranged together." },
      { title: "Waiting", text: "Tell us how long your group will need, so the driver waits and continues to the Haram afterwards." },
    ],
    faq: [
      { q: "Is it on the way from Taif to Makkah?", a: "Yes. It lies on the road between the two cities, so a stop can be built into the journey." },
      { q: "How long does the stop take?", a: "It depends on your group. Tell us how long you expect and we plan the stop with you." },
    ],
  },
];

function spotPage(s: Spot): PlacePage {
  const from = s.from ?? (s.city === "makkah" ? HARAM : NABAWI);
  const d = dist(s, from);
  const lo = Math.max(1, Math.round(d * 1.25));
  const hi = Math.max(lo + 1, Math.round(d * 1.6));
  const km1 = d < 10 ? d.toFixed(1) : String(Math.round(d));
  const cityName = { makkah: "Makkah", madinah: "Madinah", jeddah: "Jeddah", taif: "Taif" }[s.city];
  const cityLink = { makkah: L.makkah, madinah: L.madinah, jeddah: L.jeddah, taif: { name: "Taxi & Cab Service in Taif", href: TAIF, note: "City guide" } }[s.city];
  const sameCity = spots.filter((x) => x.city === s.city && x.slug !== s.slug);
  const isDistrict = s.kind === "district";
  const entity = { type: "Place" as const, name: `${s.name}, ${cityName}`, ar: s.ar, lat: s.lat, lng: s.lng };
  const title = isDistrict ? `Taxi in ${s.name}, ${cityName}: Rides to the ${s.city === "makkah" ? "Haram" : "Mosque"}` : `Taxi to ${s.name}, ${cityName}`;
  return page({
    slug: s.slug,
    name: s.name,
    title,
    description: `${isDistrict ? `Taxi rides from ${s.name} in ${cityName}` : `Taxi to ${s.name} in ${cityName}`}: ${s.tagline.replace(/\.$/, "")}. Fare confirmed before you commit.`,
    h1: isDistrict ? `Taxi in ${s.name}, ${cityName}` : `Taxi to ${s.name}, ${cityName}`,
    lead: s.tagline,
    direct: `Gulf Elite Transport arranges taxi rides ${isDistrict ? `from ${s.name} in ${cityName} to the Haram, the airport and other places` : `to ${s.name} in ${cityName}`}, with waiting arranged if you ask. It is about ${km1} km from ${from.name} in a straight line, roughly ${lo} to ${hi} km by road. The vehicle, driver and fare are confirmed with you before you commit.`,
    facts: [
      { label: "Place", value: `${s.name} (${s.ar})` },
      { label: "City", value: cityName },
      { label: `From ${from.name}`, value: `about ${km1} km in a straight line` },
      { label: "By road", value: `roughly ${lo} to ${hi} km (approximate)` },
    ],
    sections: [
      { id: "about", h2: `About ${s.name}`, kind: "text", paragraphs: [s.about, `${s.name} is about ${km1} km from ${from.name} in a straight line, and roughly ${lo} to ${hi} km by road depending on the route. These are approximate figures; the actual route and the time it takes depend on traffic and road controls at the time you travel.`] },
      { id: "know", h2: `What to know before you go to ${s.name}`, kind: "items", items: s.know },
      { id: "taxi", h2: `Getting to ${s.name} by taxi`, kind: "items", items: s.taxi },
      related([cityLink, ...sameCity.slice(0, 3).map((x) => ({ name: x.name, href: `${UMRAH_BASE}/${x.slug}`, note: "Place guide" })), ...(s.city === "makkah" || s.city === "madinah" ? [topic(s.city === "makkah" ? "makkah-ziyarat-rides" : "madinah-ziyarat-rides", s.city === "makkah" ? "Rides to places in Makkah" : "Rides to places in Madinah")] : []), L.hub]),
      { id: "faq", h2: `${s.name}: questions`, kind: "faq", items: [...s.faq, { q: "Do you publish fares?", a: "No. The fare is confirmed with you before you commit." }] },
    ],
    entities: [entity, { makkah: makkahE, madinah: madinahE, jeddah: jeddahE, taif: { type: "City" as const, name: "Taif", wiki: "Taif", ar: "الطائف", lat: 21.2703, lng: 40.4158 } }[s.city], country],
    prefill: { pickup: `${cityName} hotel`, dropoff: s.name },
  });
}

// ------------------------------------------------------------------------------------------ vehicle pages
type Veh = { slug: string; name: string; pax: string; bags: string; title: string; lead: string; about: string; fits: { title: string; text: string }[]; tips: { title: string; text: string }[]; faq: { q: string; a: string }[] };
const vehicleTopics: Veh[] = [
  {
    slug: "sedan-taxi-for-umrah", name: "Sedan", pax: "1-4", bags: "2 large bags", title: "Sedan Taxi for Umrah: Makkah, Madinah, Jeddah", lead: "The simplest choice for one to four travellers with light luggage.",
    about: "A sedan is the standard car for a single traveller, a couple or a small family. It suits airport transfers, rides to the Haram and journeys between the holy cities when the group is small and luggage is light. A sedan boot takes about two large suitcases, so a party of four with a bag each will be full.",
    fits: [{ title: "One or two travellers", text: "Comfortable for a couple, with room for luggage and for the elderly to get in and out." }, { title: "Short city rides", text: "Hotel to the Haram, hotel to the Prophet's Mosque and rides to nearby places." }, { title: "Airport transfers", text: "Suitable when the group is small and bags are few." }],
    tips: [{ title: "Count the bags first", text: "Four passengers with four large bags will not fit in one sedan. Ask for the next size up." }, { title: "Ihram and comfort", text: "Tell us if you are in ihram or travelling with someone unwell, so the journey is planned around them." }, { title: "Long journeys", text: "For Makkah to Madinah, many travellers prefer an SUV or van for the extra space." }],
    faq: [{ q: "How many people fit in a sedan?", a: "Typically up to four passengers, but the exact vehicle and its seats are confirmed for each request." }, { q: "Is a sedan enough for Makkah to Madinah?", a: "For one or two people with light bags, yes. For more people or luggage, an SUV or van is more comfortable." }],
  },
  {
    slug: "suv-taxi-for-umrah", name: "SUV", pax: "4-6", bags: "3-4 large bags", title: "SUV Taxi for Umrah: Family Comfort in Makkah", lead: "More space and comfort for families, and a good fit for long journeys between the holy cities.",
    about: "An SUV seats a family of four to six and carries more luggage than a sedan. It sits higher, which makes getting in and out easier for older travellers, and it is a popular choice for the long drive between Makkah and Madinah.",
    fits: [{ title: "Families", text: "Parents, children and grandparents travelling together with a few bags." }, { title: "Long journeys", text: "Makkah to Madinah or the airport transfer from Jeddah, where space and comfort matter." }, { title: "Elders", text: "The higher seat makes entry and exit easier for those who find a low car difficult." }],
    tips: [{ title: "Ask about the luggage space", text: "Space varies with the model. Tell us your bag count and we confirm what fits." }, { title: "Third row", text: "If six people are travelling, tell us, since the third row reduces luggage space." }, { title: "Stops", text: "Rest and prayer stops on long journeys can be built into the plan." }],
    faq: [{ q: "Is an SUV better for elderly parents?", a: "Many find it easier to get into and out of. Tell us about anyone with mobility needs and we plan the vehicle around them." }, { q: "Can an SUV take six people with luggage?", a: "It depends on the model and the bags. Tell us the numbers and we confirm what fits." }],
  },
  {
    slug: "family-van-taxi-for-umrah", name: "Family van", pax: "6-8", bags: "5-7 large bags", title: "Family Van for Umrah: 6 to 8 Passengers", lead: "A van for extended families who want to travel together with their bags.",
    about: "A family van is the practical choice for six to eight travellers with the luggage a pilgrimage involves. Sliding doors, wide seats and a large luggage area make loading easier than in a car, and the group stays in one vehicle for the whole transfer.",
    fits: [{ title: "Extended families", text: "Several generations travelling together with a bag each." }, { title: "Airport to hotel", text: "One van from the arrivals hall to the hotel, instead of splitting the group." }, { title: "Between the holy cities", text: "A long ride is easier when everyone has space and the bags are in the same vehicle." }],
    tips: [{ title: "Agree the pickup point", text: "Vans are larger, so the pickup point near the Haram or the mosque needs to suit them." }, { title: "Mobility", text: "Tell us if anyone uses a wheelchair, so we confirm the vehicle and the loading." }, { title: "Children", text: "Say how many and their ages so we plan seats and space." }],
    faq: [{ q: "Can a van take eight people with bags?", a: "Typically six to eight passengers with luggage, depending on the model. We confirm what fits for your numbers." }, { q: "Is a van better than two cars?", a: "For many families, yes: the group stays together and arrives at the same time." }],
  },
  {
    slug: "group-van-taxi-for-umrah", name: "Group van", pax: "8-12", bags: "8-10 large bags", title: "Group Van for Umrah: 8 to 12 Passengers", lead: "Larger groups travelling together, with space for the luggage of the whole party.",
    about: "A group van, in the class of a Hiace-type minibus van, carries eight to twelve passengers with luggage space for the whole party. It suits small organised groups, large families and friends travelling together, and keeps them in one vehicle from the airport to the hotel and between the holy cities.",
    fits: [{ title: "Organised small groups", text: "A mosque or community group of ten with one group leader." }, { title: "Very large families", text: "Two or three generations travelling as one party." }, { title: "Airport and city transfers", text: "A single vehicle for arrivals, departures and moves between hotels." }],
    tips: [{ title: "Give a group leader", text: "One contact who can speak for the group helps with changes on the day." }, { title: "Count luggage carefully", text: "Large groups usually bring more than they expect. Send the bag count." }, { title: "Pickup points", text: "Large vans cannot stop everywhere. We agree a pickup point that suits the vehicle." }],
    faq: [{ q: "What is the largest group a van can take?", a: "Typically up to about twelve passengers, depending on the model. Larger parties use a minibus or coach." }, { q: "Can we hire two vans for a bigger group?", a: "Yes. Several vehicles can travel together, confirmed for your request." }],
  },
  {
    slug: "minibus-for-umrah-groups", name: "Minibus", pax: "13-29", bags: "ample luggage space", title: "Minibus for Umrah Groups: 13 to 29 Seats", lead: "A single vehicle for organised groups, tours and large family parties.",
    about: "A minibus carries a group of roughly thirteen to twenty-nine travellers and a matching amount of luggage. It is the usual choice for organised parties, such as a mosque group or travel agency's pilgrims, who want to travel together, with one driver and one meeting point.",
    fits: [{ title: "Organised groups", text: "Pilgrims travelling with a group leader, a mosque or an agency." }, { title: "Airport and hotel runs", text: "One vehicle collects the whole party from the airport and delivers them to the hotel." }, { title: "Holy-city journeys", text: "Makkah to Madinah and back, with stops, for a party that wants to stay together." }],
    tips: [{ title: "Confirm access", text: "Minibuses may be restricted near the Haram and the Prophet's Mosque. We agree a drop-off point that suits the vehicle." }, { title: "One contact", text: "A group leader who gives us numbers and changes keeps things simple." }, { title: "Luggage", text: "State large bags and any special items so the luggage space is right." }],
    faq: [{ q: "Can a minibus enter the area around the Haram?", a: "Large vehicles face stricter controls. We agree the drop-off point in advance and confirm what is possible." }, { q: "What if my group is over 29?", a: "Use a coach, or several vehicles that travel together." }],
  },
  {
    slug: "coach-for-umrah-groups", name: "Coach", pax: "30+", bags: "under-coach storage", title: "Coach for Umrah Groups: 30+ Passengers", lead: "Coach travel for large parties, with storage under the floor for the whole group's luggage.",
    about: "A coach carries thirty or more passengers, with luggage stored under the floor. It is used for large organised parties travelling together between the airport, the hotels and the two holy cities, and for corporate or community groups who want a single, coordinated arrival.",
    fits: [{ title: "Large organised parties", text: "Travel agencies, mosques and communities moving thirty or more people." }, { title: "Between the holy cities", text: "Makkah to Madinah, with a stop at the Miqat if requested." }, { title: "Airport arrivals", text: "A group arriving on one flight and moving together to the hotel." }],
    tips: [{ title: "Drop-off planning", text: "Coaches are among the most restricted vehicles near the Haram. We agree a drop-off point well in advance." }, { title: "Timing", text: "Allow longer for loading and unloading a large group." }, { title: "Number of vehicles", text: "For very large parties, several coaches can travel together." }],
    faq: [{ q: "Can a coach go near the Haram?", a: "Access near the Haram is tightly controlled for large vehicles. We agree the nearest permitted drop-off and tell you plainly what is possible." }, { q: "Can you provide a coach during Hajj?", a: "Movement during Hajj is controlled by the authorities. We confirm what can be arranged for your dates." }],
  },
];

function vehiclePage(v: Veh): PlacePage {
  return page({
    slug: v.slug,
    name: `${v.name} for Umrah`,
    title: v.title,
    description: `${v.name} for Umrah in Makkah, Madinah and Jeddah: ${v.pax} passengers, ${v.bags}. Airport, hotel and Haram rides. Fare confirmed first.`,
    h1: `${v.name} for Umrah and Hajj Visitors`,
    lead: v.lead,
    direct: `Gulf Elite Transport arranges a ${v.name.toLowerCase()} for Umrah and Hajj visitors in Makkah, Madinah and Jeddah, typically for ${v.pax} passengers with ${v.bags}. It can be used for airport transfers, hotel rides and journeys between the holy cities. The exact vehicle, driver and fare are confirmed before you commit.`,
    facts: [
      { label: "Vehicle", value: v.name },
      { label: "Typical passengers", value: v.pax },
      { label: "Typical luggage", value: v.bags },
      { label: "Used for", value: "Airport, hotel, Haram, between cities" },
    ],
    sections: [
      { id: "about", h2: `${v.name}: who it suits`, kind: "text", paragraphs: [v.about] },
      { id: "fits", h2: `When a ${v.name.toLowerCase()} is the right choice`, kind: "items", items: v.fits },
      { id: "tips", h2: "Planning tips", kind: "items", items: v.tips },
      related([topic("group-transport-for-umrah", "Group transport for Umrah"), topic("family-and-elderly-pilgrims", "Family and elderly pilgrims"), topic("jeddah-airport-to-makkah", "Jeddah airport to Makkah"), ...vehicleTopics.filter((x) => x.slug !== v.slug).slice(0, 2).map((x) => topic(x.slug, `${x.name} for Umrah`, "Vehicle guide")), L.hub]),
      { id: "faq", h2: `${v.name} for Umrah: questions`, kind: "faq", items: [...v.faq, { q: "Are your fares fixed?", a: "No standard fares are published. The fare is confirmed with you before you commit." }] },
    ],
    prefill: { pickup: "Jeddah airport or hotel" },
  });
}

const spotPages = spots.map(spotPage);
const vehiclePages = vehicleTopics.map(vehiclePage);

// ------------------------------------------------------------------------------------------ hub
const hub: PlacePage = {
  kind: "hub",
  path: UMRAH_BASE,
  name: "Umrah & Hajj Taxi in Makkah and Madinah",
  title: "Umrah & Hajj Taxi in Makkah, Madinah and Jeddah",
  description: "Taxi and transport for Umrah and Hajj visitors: airport transfers, hotel to the Haram, Makkah to Madinah and group travel. Fare confirmed before you commit.",
  h1: "Umrah & Hajj Taxi and Transport",
  lead: "Airport, hotel, Haram and between the holy cities, for any size of group.",
  directAnswer: `Gulf Elite Transport arranges taxi and car transport for Umrah and Hajj visitors in Makkah, Madinah and Jeddah: airport transfers, hotel to the Haram and back, Makkah to Madinah, and ride arrangements for groups of any size, from a single traveller to a large party. Tell us where you are going, when and how many people, and the vehicle, driver and fare are confirmed before you commit.`,
  crumbs: [{ name: "Home", path: "/" }, { name: "Umrah & Hajj Taxi", path: UMRAH_BASE }],
  facts: [
    { label: "Cities", value: "Makkah, Madinah, Jeddah and Taif" },
    { label: "Rides", value: "Airport, hotel, Haram, between cities" },
    { label: "Groups", value: "One traveller to large parties" },
    { label: "Fares", value: "Confirmed before you commit" },
  ],
  sections: [
    {
      id: "what",
      h2: "What we arrange for pilgrims and visitors",
      kind: "items",
      intro: "Every request is confirmed with you before anything is arranged.",
      items: [
        { title: "Airport transfers", text: "Pickups and drop-offs at Jeddah and Madinah airports, following your flight if it is delayed." },
        { title: "Hotel to the Haram and back", text: "Rides to Al-Masjid al-Haram and to the Prophet's Mosque, with a timed pickup afterwards." },
        { title: "Between the holy cities", text: "Makkah to Madinah and back, with prayer stops and a stop at the Miqat if you ask." },
        { title: "Groups of any size", text: "One vehicle or several, from sedans and vans to minibuses and coaches." },
        { title: "Train station transfers", text: "To and from the Haramain stations, sized for your luggage." },
        { title: "Rides to holy sites", text: "Point-to-point rides to the places visitors go in and around the two cities." },
      ],
    },
    {
      id: "pages",
      h2: "Pilgrim journeys",
      kind: "links",
      intro: "Each page explains one part of the trip and what to tell us.",
      items: [...topics, ...moreTopics].map((t) => ({ name: t.name, href: t.path, note: t.lead.length > 70 ? t.lead.slice(0, 68).trimEnd().replace(/[,.\s]+\S*$/, "") + "..." : t.lead })),
    },
    {
      id: "cities",
      h2: "City and airport guides",
      kind: "links",
      items: [L.makkah, L.madinah, L.jeddah, { name: "Taxi & Cab Service in Taif", href: TAIF, note: "City guide" }, L.jed, L.med, L.jedMakkah, L.makkahMadinah, L.taif],
    },
    {
      id: "places",
      h2: "Places in Makkah and Madinah",
      kind: "links",
      intro: "Rides to the places visitors go, and to the districts they stay in.",
      items: spotPages.map((p) => ({ name: p.name, href: p.path, note: p.lead.length > 70 ? p.lead.slice(0, 68).trimEnd().replace(/[,.\s]+\S*$/, "") + "..." : p.lead })),
    },
    {
      id: "vehicle-guides",
      h2: "Choose a vehicle for your group",
      kind: "links",
      intro: "Typical capacities and when each size is the right choice.",
      items: vehiclePages.map((p) => ({ name: p.name, href: p.path, note: p.lead })),
    },
    vehicles,
    {
      id: "seasons",
      h2: "Peak seasons",
      kind: "items",
      items: [
        { title: "Ramadan", text: "The busiest weeks for Umrah, especially the last ten nights. Request early." },
        { title: "Hajj season", text: "Movement into Makkah and between the sacred sites is controlled by the authorities. We confirm what can be arranged for your dates." },
        { title: "School holidays", text: "Family travel is heavy at the start and end of the main holidays." },
        { title: "Friday prayers", text: "Roads near the Haram and the Prophet's Mosque fill early on Fridays all year." },
      ],
    },
    steps("where you are travelling from and to"),
    confirmed,
    {
      id: "faq",
      h2: "Umrah & Hajj taxi: questions",
      kind: "faq",
      items: [
        { q: "Do you provide transport for Umrah and Hajj visitors?", a: "Yes. We arrange taxi and car transport for pilgrims and visitors in Makkah, Madinah and Jeddah, including airport transfers, rides to the Haram and journeys between the holy cities." },
        { q: "Can you take a large group?", a: "Yes. Groups of any size can be discussed. We arrange one vehicle or several of the right size and confirm what is possible for your dates." },
        { q: "Do you provide guided tours?", a: "No. We provide rides, including rides to holy sites with the driver waiting if you ask. A guide is a separate arrangement." },
        { q: "Are your fares fixed?", a: "No standard fares are published. We confirm the fare for your request before you commit." },
        { q: "Can I book an airport transfer in Jeddah or Madinah?", a: "Yes. Send your flight details, hotel and group size. See the Jeddah airport and Madinah airport pages." },
        { q: "What about the Hajj season?", a: "Movement during Hajj is controlled by the authorities, so we confirm what can be arranged for your dates and tell you plainly if something cannot." },
        { q: "Who provides the rides?", a: "Rides are arranged with licensed local drivers and transport providers in Saudi Arabia. Gulf Elite Transport Group takes your request, passes it to a suitable provider and confirms the vehicle, driver and fare with you before you commit." },
        { q: "Can non-Muslims enter Makkah?", a: "Entry to Makkah is restricted to Muslims. Visitors should carry the documents their trip requires." },
      ],
    },
  ],
  layout: { hero: "centered", body: "cards", form: "bottom" },
  entities: [makkahE, madinahE, jeddahE, country],
  children: [...topics, ...moreTopics, ...spotPages, ...vehiclePages].map((t) => ({ name: t.name, path: t.path })),
  prefill: { pickup: "Jeddah airport or hotel" },
};

// Ziyarat pages link to the single-place pages.
for (const t of topics) {
  const city = t.path.endsWith("/makkah-ziyarat-rides") ? "makkah" : t.path.endsWith("/madinah-ziyarat-rides") ? "madinah" : "";
  if (!city) continue;
  const links = t.sections.find((x) => x.id === "links");
  if (links && links.kind === "links") links.items.unshift(...spots.filter((x) => x.city === city).map((x) => ({ name: x.name, href: `${UMRAH_BASE}/${x.slug}`, note: "Place guide" })));
}

export const umrahPages: PlacePage[] = [hub, ...topics, ...moreTopics, ...spotPages, ...vehiclePages];
