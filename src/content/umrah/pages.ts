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
      items: topics.map((t) => ({ name: t.name, href: t.path, note: t.lead.length > 70 ? t.lead.slice(0, 68).trimEnd().replace(/[,.\s]+\S*$/, "") + "..." : t.lead })),
    },
    {
      id: "cities",
      h2: "City and airport guides",
      kind: "links",
      items: [L.makkah, L.madinah, L.jeddah, { name: "Taxi & Cab Service in Taif", href: TAIF, note: "City guide" }, L.jed, L.med, L.jedMakkah, L.makkahMadinah, L.taif],
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
        { q: "Can non-Muslims enter Makkah?", a: "Entry to Makkah is restricted to Muslims. Visitors should carry the documents their trip requires." },
      ],
    },
  ],
  layout: { hero: "centered", body: "cards", form: "bottom" },
  entities: [makkahE, madinahE, jeddahE, country],
  children: topics.map((t) => ({ name: t.name, path: t.path })),
  prefill: { pickup: "Jeddah airport or hotel" },
};

export const umrahPages: PlacePage[] = [hub, ...topics];
