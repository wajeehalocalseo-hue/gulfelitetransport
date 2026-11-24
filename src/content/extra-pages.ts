import journeysJson from "./saudi/riyadh-journeys.json";
import routeTimes from "./saudi/route-times.json";
import { intlRoutes } from "./saudi/international";
import { routes } from "./saudi/places";
import { cities } from "./saudi/cities";
import { riyadhAreas } from "./saudi/riyadh-areas";
import { fmtKm, fmtMin } from "./saudi/riyadh-districts";
import type { PlacePage, Section } from "./saudi/types";
import { articles } from "./blog";
import { formatDate, type Article, type Block } from "./blog/types";

/**
 * The Fleet page and the Blog (index plus four guides). The guides are built from data this site already holds
 * (district and city routing figures, border crossings), so each one adds a table or a checklist that is not
 * on any other page. No fares, ratings or availability claims.
 */
const BASE = "/taxi-saudi-arabia";
const RIYADH = "/riyadh-taxi-service";
/** The author of the blog. Only what the owner has confirmed is written about the author: name, role and that the guides are theirs. */
export const AUTHOR = {
  name: "Wajeeha Amin",
  slug: "wajeeha-amin",
  path: "/author/wajeeha-amin",
  role: "Owner",
  photo: "/images/author/wajeeha-amin.webp",
  /** The author's own profiles, given by the author. */
  profiles: ["https://www.linkedin.com/in/wajeeha-amin-3569233a4/", "https://www.facebook.com/share/1HJVZxgZmM/"],
} as const;
const PUBLISHED = "2026-11-16";
const PUBLISHED_TEXT = "16 November 2026";

const J = journeysJson as Record<string, Record<string, { km: number; min: number }>>;
const RT = routeTimes as Record<string, { km: number; min: number }>;
const AP = "king-khalid-international-airport";

const bookingNote: Section = {
  id: "limits",
  h2: "What is confirmed for each request",
  kind: "items",
  intro: "This guide gives estimates. The following are not published here and are agreed with you for each request.",
  items: [
    { title: "Fares", text: "No standard fares are published. The fare is confirmed before you commit." },
    { title: "Journey time", text: "Timing depends on traffic, route and stops, so no journey time is promised in advance." },
    { title: "Vehicle and driver", text: "The car type and driver are confirmed for your request." },
    { title: "Availability", text: "Availability depends on the place, the date and the time of day." },
  ],
};

const base = (o: Partial<PlacePage> & Pick<PlacePage, "path" | "name" | "title" | "description" | "h1" | "lead" | "directAnswer" | "sections" | "crumbs" | "facts">): PlacePage => ({
  kind: "topic",
  layout: { hero: "light", body: "cards", form: "bottom" },
  entities: [{ type: "Country", name: "Saudi Arabia" }],
  children: [],
  simple: true,
  ...o,
});

// ------------------------------------------------------------------ Fleet
export const fleetPage: PlacePage = base({
  path: "/fleet",
  name: "Fleet",
  title: "Our Fleet: Sedans, SUVs, Vans and Executive Cars",
  description: "Choose a sedan, SUV, van or executive car for your ride in Saudi Arabia. Private, chauffeur-driven, with the vehicle and fare confirmed before you commit.",
  h1: "Our Fleet: Private Cars for Every Trip",
  lead: "Four vehicle classes for city rides, airport transfers and long journeys. Tell us your group and your bags and we confirm the right one before you commit.",
  directAnswer:
    "Gulf Elite Transport arranges private, chauffeur-driven cars in four classes: sedan, SUV, van or minibus, and executive car. Available 24 hours a day, 7 days a week, licensed and insured. The vehicle for your ride is chosen from your passengers, your luggage and the length of the trip, and it is confirmed with you together with the driver and the fare before you commit. Fares are not published, because each ride is quoted for your request.",
  crumbs: [{ name: "Home", path: "/" }, { name: "Fleet", path: "/fleet" }],
  facts: [
    { label: "Vehicle classes", value: "4: sedan, SUV, van, executive" },
    { label: "Availability", value: "24 hours, 7 days a week" },
    { label: "Licensing", value: "Licensed and insured" },
    { label: "Fare", value: "Confirmed before you commit" },
  ],
  layout: { hero: "dark", body: "cards", form: "bottom" },
  sections: [
    {
      id: "classes",
      h2: "Vehicle classes",
      kind: "items",
      intro: "Every ride is private, with a professional driver. The class is confirmed for your request.",
      items: [
        { title: "Sedan", text: "A comfortable private car for one to three passengers with light luggage. Suited to airport rides, city meetings and short intercity trips." },
        { title: "SUV", text: "More space for families and for passengers with more luggage, and a good choice for long roads such as Riyadh to Dammam or Jeddah." },
        { title: "Van or minibus", text: "For groups travelling together, with room for everyone and their bags in one vehicle. Suited to Umrah groups, teams and family trips." },
        { title: "Executive car", text: "A chauffeur-driven premium car for business guests, official visits and special occasions." },
      ],
    },
    {
      id: "guide",
      h2: "Which vehicle for which trip",
      kind: "table",
      intro: "A starting point. The final choice depends on your passengers, your bags and the route, and is confirmed with you.",
      head: ["Trip", "Suggested class"],
      rows: [
        { cells: ["Airport transfer, one or two passengers", "Sedan"] },
        { cells: ["Family with luggage", "SUV"] },
        { cells: ["Group, team or Umrah party", "Van or minibus"] },
        { cells: ["Business guests and official visits", "Executive car"] },
        { cells: ["Long intercity journey, for example Riyadh to Jeddah", "SUV or van, for room and comfort"] },
      ],
    },
    {
      id: "choose",
      h2: "How we choose your vehicle",
      kind: "items",
      items: [
        { title: "Passengers", text: "Tell us how many people are travelling, including children, so every passenger has a seat." },
        { title: "Luggage", text: "Tell us the number of bags and any large items, so they fit without crowding the cabin." },
        { title: "Route and length", text: "A long road suits a larger, more comfortable car, while a short city ride may only need a sedan." },
        { title: "Time and place", text: "Early flights, late arrivals and busy periods are planned in advance so the right car is ready." },
      ],
    },
    {
      id: "included",
      h2: "What every ride includes",
      kind: "items",
      items: [
        { title: "A private ride", text: "The car is for you and your group, from your pickup point to your drop-off point." },
        { title: "A professional driver", text: "Your driver collects you at the agreed point. Driver details are confirmed with you before you travel." },
        { title: "Fare confirmed first", text: "You see the vehicle, driver and fare for your request before you commit." },
        { title: "Licensed and insured", text: "Gulf Elite Transport operates as a licensed and insured transport business." },
        { title: "Available 24/7", text: "Requests are taken every day of the week, at any hour." },
      ],
    },
    {
      id: "routes",
      h2: "Where our cars go",
      kind: "links",
      items: [
        { name: "Riyadh Taxi Service", href: RIYADH, note: "City rides and airport transfers" },
        { name: "Riyadh to Jeddah", href: `${BASE}/routes/riyadh-to-jeddah`, note: "Long-distance intercity" },
        { name: "Riyadh to Dammam", href: `${BASE}/routes/riyadh-to-dammam`, note: "Eastern Province" },
        { name: "Umrah & Hajj taxi", href: "/umrah-hajj-taxi", note: "Makkah and Madinah" },
        { name: "All intercity routes", href: `${BASE}/routes`, note: "Routes within Saudi Arabia" },
        { name: "International routes", href: `${BASE}/international`, note: "UAE, Gulf and Jordan" },
      ],
    },
    {
      id: "faq",
      h2: "Fleet: questions",
      kind: "faq",
      items: [
        { q: "Can I choose a specific vehicle?", a: "You can tell us the class you prefer, and we confirm whether it can be arranged for your date and route." },
        { q: "What if my group is larger than a car?", a: "Ask for a van or minibus, or tell us the group size and we confirm what fits. More than one vehicle can be arranged for large groups." },
        { q: "Are fares fixed per vehicle or per person?", a: "Each ride is quoted for the whole vehicle for your request, and you confirm the fare before you commit." },
        { q: "Can I request the same vehicle for the return trip?", a: "Ask for the return in the same request. Whether the same vehicle is available is confirmed with you." },
      ],
    },
    bookingNote,
  ],
});

// ------------------------------------------------------------------ Blog posts
const districtRows = riyadhAreas
  .filter((a) => a.kind !== "airport" && J[a.id]?.[AP])
  .map((a) => ({ a, m: J[a.id][AP] }))
  .sort((x, y) => x.m.km - y.m.km)
  .map(({ a, m }) => ({
    cells: [a.id === "king-abdullah-financial-district" ? "KAFD" : a.name.replace(/\s*\(.*\)\s*$/, ""), `~${fmtKm(m.km)} km`, `~${fmtMin(m.min)}`],
    href: `${RIYADH}/${a.id}-taxi-service`,
  }));

const cityName = (id: string) => cities.find((c) => c.id === id)?.name ?? id;
const cityRows = routes
  .filter((r) => r.from === "riyadh" && RT[r.id])
  .sort((x, y) => x.km - y.km)
  .map((r) => ({ cells: [cityName(r.to), `~${r.km} km`, `~${fmtMin(RT[r.id].min)}`], href: `${BASE}/routes/${r.id}` }));

const CROSSING: Record<string, string> = {
  "United Arab Emirates": "Batha (Saudi) and Ghuwaifat (UAE)",
  Bahrain: "King Fahd Causeway",
  Qatar: "Salwa (Saudi) and Abu Samra (Qatar)",
  Kuwait: "Northern land border, confirmed per request",
  Oman: "Through the UAE or a direct desert crossing, confirmed per request",
  Jordan: "Haditha (Saudi) and Al Omari (Jordan)",
};
const intlRows = intlRoutes.map((r) => ({ cells: [r.name, r.country, `~${r.km} km`, CROSSING[r.country] ?? "Confirmed per request"], href: `${BASE}/international/${r.id}` }));

type LegacyPost = { slug: string; page: PlacePage };
/** A published blog post: the article (what is shown), and the page record used by the sitemap, the tracker and the blog index. */
export type Post = { slug: string; page: PlacePage; article: Article; published: string };
const post = (slug: string, o: Omit<Parameters<typeof base>[0], "crumbs">, hero: PlacePage["layout"]["hero"], body: PlacePage["layout"]["body"]): LegacyPost => ({
  slug,
  page: base({
    ...o,
    sections: [
      ...o.sections,
      { id: "author", h2: "About the author", kind: "links", items: [{ name: AUTHOR.name, href: AUTHOR.path, note: "Owner of Gulf Elite Transport Group and author of this blog" }] },
    ],
    path: `/blog/${slug}`,
    layout: { hero, body, form: "bottom" },
    crumbs: [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: o.name, path: `/blog/${slug}` }],
    facts: [
      { label: "Published", value: PUBLISHED_TEXT },
      { label: "By", value: AUTHOR.name },
      { label: "Data", value: "OpenStreetMap routing, reviewed November 2026" },
      { label: "Topic", value: o.facts[3]?.value ?? "Travel planning" },
    ],
  }),
});

const sourcesBlock = (what: string): Section => ({
  id: "sources",
  h2: "How this guide was made",
  kind: "items",
  items: [
    { title: "Where the figures come from", text: `${what} They are estimates from OpenStreetMap routing between place centres, for light traffic, and were reviewed in November 2026.` },
    { title: "What they do not include", text: "Rest stops, border queues, peak-hour traffic and roadworks add time. Your own ride is planned and confirmed with you." },
    { title: "Who wrote it", text: "Wajeeha Amin, owner of Gulf Elite Transport Group, which arranges the rides described here. The author page tells you more." },
  ],
});

/** Tags shown under each post and in its sidebar, by post slug. */
export const POST_TAGS: Record<string, string[]> = {
  "riyadh-airport-to-city-districts-distance-and-time": ["Riyadh airport", "King Khalid Airport", "Riyadh districts", "Airport taxi", "Distance and time"],
  "riyadh-to-saudi-cities-road-distance-and-driving-time": ["Intercity taxi", "Riyadh routes", "Road distance", "Driving time", "Saudi cities"],
  "riyadh-to-gulf-by-road-border-crossings-and-documents": ["Gulf by road", "Border crossings", "Travel documents", "Riyadh to Dubai", "Riyadh to Doha"],
  "how-to-plan-a-long-distance-taxi-from-riyadh": ["Long-distance taxi", "Trip planning", "Checklist", "Riyadh intercity", "Return trip"],
};

const legacyPosts: LegacyPost[] = [
  post(
    "riyadh-airport-to-city-districts-distance-and-time",
    {
      path: "",
      name: "Riyadh airport to every district",
      title: "Riyadh Airport (RUH) to Every District: Distance and Time",
      description: "How far King Khalid International Airport is from 46 Riyadh districts by road, with estimated driving times and a page for booking a private taxi to each.",
      h1: "Riyadh Airport (RUH) to Every District: Distance and Driving Time",
      lead: "King Khalid International Airport is in the north of Riyadh, so the ride depends on where you are going. Here is how far it is from each district.",
      directAnswer: `King Khalid International Airport (RUH) is about ${fmtKm(J["olaya"][AP].km)} km by road from Olaya and about ${fmtKm(J["king-abdullah-financial-district"][AP].km)} km from KAFD. Northern districts such as Al Narjis and Al Malqa are the closest, and southern districts such as Al Suwaidi and Al Mansourah are the furthest. The table lists ${districtRows.length} districts with an estimated distance and driving time.`,
      facts: [{ label: "", value: "" }, { label: "", value: "" }, { label: "", value: "" }, { label: "Topic", value: "Airport transfers" }],
      sections: [
        { id: "intro", h2: "Why the distance matters", kind: "text", paragraphs: ["The airport sits north of the built-up centre, so almost every airport ride is a long city ride rather than a short hop. A district in the far north can be about half an hour closer than one in the south, and that changes when you should leave and what you should expect.", "Use the table to see roughly how far you are from the airport. Each district name opens its own page, with pickup notes and rides to nearby places."] },
        { id: "table", h2: "Distance and driving time from RUH to each district", kind: "table", head: ["District", "Approx. distance", "Typical driving time"], rows: districtRows, note: "Sorted from nearest to furthest. Estimates for light traffic; peak hours add time." },
        { id: "tips", h2: "Planning an airport ride", kind: "items", items: [
          { title: "Leave earlier from the south", text: "Southern districts are the furthest from the airport, so allow more time for a departure." },
          { title: "Give your flight number", text: "For an arrival, the flight number lets the pickup follow the flight, not the scheduled time." },
          { title: "Name the terminal", text: "Tell us the terminal if you know it, and the plan is built around it." },
          { title: "Ask for the return together", text: "A return ride can be requested in the same booking, with the time you want to travel back." },
        ] },
        sourcesBlock(`The distances for ${districtRows.length} districts.`),
        { id: "links", h2: "Related pages", kind: "links", items: [
          { name: "King Khalid International Airport transfer", href: `${BASE}/airports/king-khalid-international-airport`, note: "Airport page" },
          { name: "Riyadh Taxi Service", href: RIYADH, note: "Main Riyadh page" },
          { name: "Riyadh to Saudi cities by road", href: "/blog/riyadh-to-saudi-cities-road-distance-and-driving-time", note: "Guide" },
        ] },
        { id: "faq", h2: "Riyadh airport transfers: questions", kind: "faq", items: [
          { q: "How far is Riyadh airport from the city centre?", a: `It depends on the district. It is about ${fmtKm(J["olaya"][AP].km)} km by road from Olaya and about ${fmtKm(J["king-abdullah-financial-district"][AP].km)} km from KAFD.` },
          { q: "Which districts are closest to the airport?", a: "The northern districts, such as Al Narjis, Al Malqa and Al Yasmin, are the closest by road." },
          { q: "Can I book a private taxi from the airport to my district?", a: "Yes. Open your district page from the table or use the booking form, and the vehicle, driver and fare are confirmed before you commit." },
        ] },
        bookingNote,
      ],
    },
    "light",
    "table",
  ),
  post(
    "riyadh-to-saudi-cities-road-distance-and-driving-time",
    {
      path: "",
      name: "Riyadh to Saudi cities by road",
      title: "Riyadh to Saudi Cities by Road: Distance and Driving Time",
      description: "Road distance and estimated driving time from Riyadh to 22 Saudi cities, from Al Kharj to Tabuk, with a page for booking a private taxi on each route.",
      h1: "Riyadh to Saudi Cities by Road: Distance and Driving Time",
      lead: "From a one-hour run to Al Kharj to a full day on the road to Tabuk. Here is how far each city is from Riyadh.",
      directAnswer: `By road, Al Kharj is the nearest city to Riyadh at about ${cityRows[0].cells[1].replace("~", "")}, while Tabuk is the furthest listed at about ${cityRows[cityRows.length - 1].cells[1].replace("~", "")}. The table lists ${cityRows.length} cities with an estimated distance and driving time, and each row opens the route page for a private taxi.`,
      facts: [{ label: "", value: "" }, { label: "", value: "" }, { label: "", value: "" }, { label: "Topic", value: "Intercity travel" }],
      sections: [
        { id: "intro", h2: "Short, medium and long trips", kind: "text", paragraphs: ["Saudi Arabia is large, and the road from Riyadh to the nearest cities is very different from the road to the far coasts. A trip to Al Kharj is a short run, to Buraydah or Dammam a half-day drive, and to Jeddah, Abha or Tabuk a full day or more.", "The table sorts the cities from nearest to furthest so you can see which group your trip belongs to."] },
        { id: "table", h2: "Riyadh to each city: distance and driving time", kind: "table", head: ["City", "Road distance", "Typical driving time"], rows: cityRows, note: "Estimates for light traffic, without rest stops. Sorted from nearest to furthest." },
        { id: "groups", h2: "How to plan by distance", kind: "items", items: [
          { title: "Under four hours", text: "Al Kharj, Buraydah, Al Hofuf and Dammam suit a same-day trip with a return, or a morning departure." },
          { title: "Half a day to a full day", text: "Hail, Jubail, Al Khobar, Dhahran, Taif and Madinah need an early start and planned rest stops." },
          { title: "A full day or more", text: "Makkah, Jeddah, Abha, Najran, Al Baha, Sakaka, Arar, Yanbu, AlUla, Jazan and Tabuk are long road journeys, and many travellers plan an overnight stop." },
          { title: "Think about flying for one traveller", text: "For a single traveller on the longest routes, a flight is faster. A private car suits groups, families, equipment and travellers who want one vehicle at both ends." },
        ] },
        sourcesBlock(`The distances and times for ${cityRows.length} cities.`),
        { id: "links", h2: "Related pages", kind: "links", items: [
          { name: "All intercity routes", href: `${BASE}/routes`, note: "Routes within Saudi Arabia" },
          { name: "Riyadh Taxi Service", href: RIYADH, note: "Main Riyadh page" },
          { name: "Planning a long-distance taxi", href: "/blog/how-to-plan-a-long-distance-taxi-from-riyadh", note: "Checklist" },
        ] },
        { id: "faq", h2: "Riyadh road trips: questions", kind: "faq", items: [
          { q: "How far is Jeddah from Riyadh by road?", a: `About ${routes.find((r) => r.id === "riyadh-to-jeddah")?.km} km, and roughly ${fmtMin(RT["riyadh-to-jeddah"].min)} of driving without stops.` },
          { q: "What is the nearest city to Riyadh?", a: "Al Kharj, south-east of Riyadh, is the nearest city in this list." },
          { q: "Can I book a return trip?", a: "Yes. Every route page covers both directions, and you can ask for the return in the same request." },
        ] },
        bookingNote,
      ],
    },
    "ledger",
    "columns",
  ),
  post(
    "riyadh-to-gulf-by-road-border-crossings-and-documents",
    {
      path: "",
      name: "Riyadh to the Gulf by road",
      title: "Riyadh to the Gulf by Road: Crossings and Documents",
      description: "Border crossings, road distances and what to prepare for a taxi from Riyadh to Dubai, Doha, Manama, Kuwait City, Muscat and Amman. Fare confirmed per request.",
      h1: "Riyadh to the Gulf and Jordan by Road: Crossings and Documents",
      lead: "Which border you cross, how far it is and what to prepare before a cross-border taxi ride from Riyadh.",
      directAnswer: `The shortest cross-border road trip from Riyadh is to Manama in Bahrain, about 465 km over the King Fahd Causeway. Doha is about 585 km, Kuwait City about 715 km and Dubai about 1,040 km. Passports, visas and permits are the traveller's responsibility, and requirements differ by nationality. The table lists ${intlRows.length} destinations with the crossing used.`,
      facts: [{ label: "", value: "" }, { label: "", value: "" }, { label: "", value: "" }, { label: "Topic", value: "Cross-border travel" }],
      sections: [
        { id: "intro", h2: "Before you choose a destination", kind: "text", paragraphs: ["A cross-border ride adds a border to the journey. The crossing, the queue and the paperwork matter as much as the distance, so it helps to know them before you book.", "The table lists the crossings that are well known. Where the crossing depends on the route, it says so, and it is confirmed with you before you travel."] },
        { id: "table", h2: "Destinations, distances and crossings", kind: "table", head: ["Destination", "Country", "Road distance", "Crossing"], rows: intlRows, note: "Distances are approximate road distances from Riyadh. Queues at borders vary by day and time." },
        { id: "documents", h2: "What to prepare", kind: "items", items: [
          { title: "Passports", text: "Every passenger needs a valid passport, and many countries require it to be valid for several months after entry." },
          { title: "Visas and permits", text: "Visa rules differ by nationality and destination and can change. Check them with the official source before you travel." },
          { title: "Residence and exit-entry documents", text: "Residents of Saudi Arabia should check that their exit and re-entry permissions allow the trip." },
          { title: "Tell us who is travelling", text: "Send the number of passengers and their nationalities with your request, so the plan can allow for the border checks." },
        ] },
        { id: "time", h2: "Allow for the border", kind: "items", items: [
          { title: "Queues vary", text: "The time at a border changes with the day, the hour and the season, so no crossing time is promised." },
          { title: "Weekends and holidays", text: "Crossings such as the King Fahd Causeway are busiest on weekends and public holidays." },
          { title: "Plan the return too", text: "Ask for the return in the same request and give the day you want to come back." },
        ] },
        sourcesBlock(`The distances for ${intlRows.length} destinations; the named crossings are the well-known ones for each country.`),
        { id: "links", h2: "Related pages", kind: "links", items: [
          { name: "International taxi routes from Riyadh", href: `${BASE}/international`, note: `${intlRoutes.length} destinations` },
          { name: "Riyadh to Manama", href: `${BASE}/international/riyadh-to-manama`, note: "Bahrain" },
          { name: "Riyadh to Dubai", href: `${BASE}/international/riyadh-to-dubai`, note: "United Arab Emirates" },
        ] },
        { id: "faq", h2: "Cross-border taxi: questions", kind: "faq", items: [
          { q: "Who arranges the visa?", a: "The traveller is responsible for visas, passports and permits. We plan the ride around the border checks once you tell us who is travelling." },
          { q: "Which crossing does the Bahrain route use?", a: "The King Fahd Causeway, which links the Eastern Province with Bahrain." },
          { q: "Do you publish fares for cross-border rides?", a: "No. Each ride is quoted for your request, and you confirm the fare before you commit." },
        ] },
        bookingNote,
      ],
    },
    "centered",
    "checklist",
  ),
  post(
    "how-to-plan-a-long-distance-taxi-from-riyadh",
    {
      path: "",
      name: "Planning a long-distance taxi from Riyadh",
      title: "Planning a Long-Distance Taxi from Riyadh: A Checklist",
      description: "A practical checklist for a private taxi from Riyadh to another city: passengers and bags, timing, rest stops, documents and the return trip.",
      h1: "Planning a Long-Distance Taxi from Riyadh: A Checklist",
      lead: "Six things to settle before a long road trip, so the ride runs smoothly from the first kilometre.",
      directAnswer: "Before a long-distance taxi from Riyadh, settle six things: how many passengers and bags, when to leave, where to stop, which documents you need, whether you want a return, and the fare. Give these details when you request the ride and the vehicle, driver and fare are confirmed with you before you commit.",
      facts: [{ label: "", value: "" }, { label: "", value: "" }, { label: "", value: "" }, { label: "Topic", value: "Trip planning" }],
      sections: [
        { id: "checklist", h2: "The six-point checklist", kind: "items", items: [
          { title: "1. Passengers and bags", text: "Count everyone, including children, and every bag. The vehicle is chosen from these numbers." },
          { title: "2. Timing", text: "Leave early for the longest routes and avoid arriving in the dark. Summer afternoons are very hot, and weekday mornings and late afternoons are the busiest on city roads." },
          { title: "3. Stops", text: "Agree rest and prayer stops in advance, and an overnight stop for journeys of more than a day." },
          { title: "4. Documents", text: "Carry identity documents for every passenger. For Makkah, remember that entry is restricted to Muslims, and for borders, prepare passports, visas and permits." },
          { title: "5. The return", text: "Ask for the return in the same request and give the day and time, or tell us you will confirm it later." },
          { title: "6. The fare", text: "Confirm the vehicle, driver and fare before you commit, so there is nothing to agree on the road." },
        ] },
        { id: "choose", h2: "Pick the right route page", kind: "links", intro: "Each route page covers both directions and lists the destination's places and questions.", items: [
          { name: "Riyadh to Jeddah", href: `${BASE}/routes/riyadh-to-jeddah`, note: `about ${routes.find((r) => r.id === "riyadh-to-jeddah")?.km} km` },
          { name: "Riyadh to Makkah", href: `${BASE}/routes/riyadh-to-makkah`, note: "Umrah and family trips" },
          { name: "Riyadh to Dammam", href: `${BASE}/routes/riyadh-to-dammam`, note: "Eastern Province" },
          { name: "Riyadh to Taif", href: `${BASE}/routes/riyadh-to-taif`, note: "Mountain roads" },
          { name: "All intercity routes", href: `${BASE}/routes`, note: "22 routes from Riyadh" },
          { name: "Our fleet", href: "/fleet", note: "Vehicle classes" },
        ] },
        { id: "comfort", h2: "Making the journey comfortable", kind: "items", items: [
          { title: "Water and snacks", text: "Carry water for everyone, especially in summer, and plan where you will eat." },
          { title: "Children and elderly passengers", text: "Tell us in advance, so the vehicle and the stops suit them." },
          { title: "Charging and entertainment", text: "Long roads are easier with devices charged and a plan for the time in the car." },
          { title: "A named contact", text: "Give us a phone number for the passenger who will be with the driver, so the plan can be followed on the day." },
        ] },
        sourcesBlock("The route distances referred to in this checklist."),
        { id: "faq", h2: "Long-distance taxi: questions", kind: "faq", items: [
          { q: "How early should I request a long trip?", a: "As early as you can, especially for busy periods such as Ramadan, school holidays and public holidays. How much notice a ride needs is confirmed for each request." },
          { q: "Can I add stops along the way?", a: "Yes. Tell us where and for how long, and the stops are included in the plan." },
          { q: "Is a private taxi better than a flight?", a: "For one traveller on a long route, a flight is faster. A private car suits groups, families, luggage and travellers who want one vehicle at both ends." },
        ] },
        bookingNote,
      ],
    },
    "inset",
    "accordion",
  ),
];

/** The first four guides were written as page sections. This turns them into the article format, so every post is shown the same way. */
function legacyArticle(l: LegacyPost): Article {
  const sec = (id: string) => l.page.sections.find((s) => s.id === id);
  const blocksOf = (s: Section): Block[] => {
    switch (s.kind) {
      case "text": return s.paragraphs.map((t) => ({ t: "p" as const, text: t }));
      case "items": return [...(s.intro ? [{ t: "p" as const, text: s.intro }] : []), { t: "ul" as const, items: s.items }];
      case "steps": return [{ t: "ol" as const, items: s.items }];
      case "table": return [...(s.intro ? [{ t: "p" as const, text: s.intro }] : []), { t: "table" as const, head: s.head, rows: s.rows.map((r) => r.cells), hrefs: s.rows.map((r) => r.href), note: s.note }];
      case "links": return [...(s.intro ? [{ t: "p" as const, text: s.intro }] : []), { t: "links" as const, items: s.items }];
      default: return [];
    }
  };
  const faq = sec("faq");
  const limits = sec("limits");
  return {
    slug: l.slug,
    h1: l.page.h1,
    description: l.page.description,
    category: l.page.facts.find((f) => f.label === "Topic")?.value ?? "Guide",
    tags: POST_TAGS[l.slug] ?? [],
    published: PUBLISHED,
    answer: l.page.directAnswer,
    sections: l.page.sections.filter((s) => !["faq", "limits", "author"].includes(s.id) && s.kind !== "topic" as never).map((s) => ({ id: s.id, h2: s.h2, blocks: blocksOf(s) })).filter((s) => s.blocks.length),
    faq: faq && faq.kind === "faq" ? faq.items : [],
    takeaways: limits && limits.kind === "items" ? { intro: limits.intro, items: limits.items } : undefined,
  };
}

/** A page record for an article, so the sitemap, the tracker and the blog index list it like any other page. */
function articlePage(a: Article): PlacePage {
  return base({
    path: `/blog/${a.slug}`,
    name: a.h1,
    title: a.h1,
    description: a.description,
    h1: a.h1,
    lead: a.description,
    directAnswer: a.answer,
    crumbs: [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: a.h1, path: `/blog/${a.slug}` }],
    facts: [
      { label: "Published", value: formatDate(a.published) },
      { label: "By", value: AUTHOR.name },
      { label: "Topic", value: a.category },
      { label: "Type", value: "Guide" },
    ],
    sections: [
      { id: "answer", h2: "Quick answer", kind: "text", paragraphs: [a.answer] },
      ...a.sections.map((s) => ({ id: s.id, h2: s.h2, kind: "text" as const, paragraphs: s.blocks.flatMap((b) => (b.t === "p" ? [b.text] : b.t === "ul" || b.t === "ol" ? b.items.map((i) => (i.title ? `${i.title}. ${i.text}` : i.text)) : [])) })),
      { id: "faq", h2: "Questions", kind: "faq", items: a.faq },
    ],
  });
}

/** Every published guide, newest first. */
export const blogPosts: Post[] = [
  ...articles.map((a) => ({ slug: a.slug, page: articlePage(a), article: a, published: a.published })),
  ...legacyPosts.map((l) => ({ ...l, article: legacyArticle(l), published: PUBLISHED })),
].sort((x, y) => (x.published < y.published ? 1 : x.published > y.published ? -1 : 0));

// ------------------------------------------------------------------ Blog index
export const blogIndex: PlacePage = base({
  path: "/blog",
  name: "Blog",
  title: "Taxi Travel Guides for Riyadh and Saudi Arabia",
  description: "Practical guides for taxi travel in Saudi Arabia: airports, Umrah arrivals, intercity routes, how fares work and how to plan a long trip.",
  h1: "Taxi Travel Guides for Riyadh and Saudi Arabia",
  lead: "Airports, Umrah arrivals, intercity routes and fares: planning guides written from the rides we arrange.",
  directAnswer: "These guides explain the practical side of taxi travel in Saudi Arabia: how an airport pickup works, how far each Riyadh district is from the airport, how long the road to each Saudi city takes, how fares are worked out, and what to settle before a long trip. Each guide uses the same distance and route data as our route pages, says clearly what is an estimate, and links to the pages where you can book.",
  crumbs: [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }],
  facts: [
    { label: "Guides", value: String(blogPosts.length) },
    { label: "Updated", value: PUBLISHED_TEXT },
    { label: "Focus", value: "Riyadh and Saudi Arabia" },
    { label: "Data", value: "OpenStreetMap routing" },
  ],
  layout: { hero: "ledger", body: "cards", form: "bottom" },
  sections: [
    { id: "guides", h2: "All guides", kind: "links", items: blogPosts.map((p) => ({ name: p.page.name, href: p.page.path, note: p.page.description })) },
    { id: "how", h2: "How these guides are made", kind: "items", items: [
      { title: "Real figures", text: "Distances and times come from OpenStreetMap routing between place centres, reviewed in November 2026." },
      { title: "No invented claims", text: "The guides give estimates and checklists. They do not publish fares, ratings or availability." },
      { title: "Linked to the routes", text: "Every guide links to the route, airport and district pages where you can request a ride." },
    ] },
  ],
});

/** The author page: what it says is limited to the name, the role and how the guides are written. No qualifications, years or personal details are claimed. */
export const authorPage: PlacePage = base({
  path: AUTHOR.path,
  name: AUTHOR.name,
  title: "Wajeeha Amin, Owner and Author | Gulf Elite Transport",
  description: "Wajeeha Amin, owner of Gulf Elite Transport Group, has 8 years in travel and transport and writes its guides on airports, Umrah, Hajj and routes.",
  portrait: { src: AUTHOR.photo, alt: "Portrait of Wajeeha Amin, smiling, with long dark hair and round glasses, in a striped top against an orange background", width: 640, height: 640 },
  h1: "Wajeeha Amin",
  lead: "Owner of Gulf Elite Transport Group and author of the guides on this blog.",
  directAnswer:
    "Wajeeha Amin is the owner of Gulf Elite Transport Group, a taxi, cab and freight transport company serving Saudi Arabia, and the author of the guides on this website's blog. With 8 years of experience in travel and transportation, Wajeeha Amin focuses on airport transfers, Umrah and Hajj transport, and city-to-city routes.",
  crumbs: [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: AUTHOR.name, path: AUTHOR.path }],
  facts: [
    { label: "Role", value: "Owner, Gulf Elite Transport Group" },
    { label: "Experience", value: "8 years in travel and transportation" },
    { label: "Focus", value: "Airports, Umrah and Hajj, city-to-city routes" },
    { label: "Guides", value: String(blogPosts.length) },
  ],
  sections: [
    {
      id: "about",
      h2: "About Wajeeha Amin",
      kind: "text",
      paragraphs: [
        "Wajeeha Amin is the owner of Gulf Elite Transport Group, which arranges private taxi and cab rides, airport transfers, intercity trips, Umrah and Hajj transport and freight services in Saudi Arabia.",
        "With 8 years of experience in travel and transportation, Wajeeha Amin focuses on three things: airport transfers, Umrah and Hajj transport, and city-to-city routes. Wajeeha Amin also writes the blog on this website, and the guides are written to help a reader decide how to travel, and what to prepare, before contacting the company.",
      ],
    },
    {
      id: "covers",
      h2: "What the guides cover",
      kind: "items",
      items: [
        { title: "Airports and cities", text: "How airport pickups work, how to give a pickup point, and getting around Saudi cities." },
        { title: "Intercity routes", text: "Road trips between cities, with distances and driving times where the figures are known, and what changes them." },
        { title: "Umrah and Hajj travel", text: "Planning transport between the airport, Makkah and Madinah for individuals, families and groups." },
        { title: "Freight and moving", text: "What to prepare before booking a vehicle for cargo, furniture or equipment." },
      ],
    },
    {
      id: "method",
      h2: "How the guides are written",
      kind: "items",
      items: [
        { title: "Figures are marked as estimates", text: "Distances and driving times come from published mapping data for light traffic. The guides say so, and give the review date." },
        { title: "No fares are published", text: "Fares depend on the date, the route and the vehicle, so they are confirmed with you before you commit. A guide explains what changes a fare, and never promises one." },
        { title: "Nothing is invented", text: "The guides do not claim ratings, awards, partnerships or guaranteed journey times. If something could not be checked, it is left out." },
        { title: "Corrections", text: "If you find a mistake, tell us on WhatsApp or through the contact page and it will be checked and fixed." },
      ],
    },
    {
      id: "guides",
      h2: "Guides by Wajeeha Amin",
      kind: "links",
      items: [...blogPosts.map((p) => ({ name: p.page.name, href: p.page.path, note: p.page.description })), { name: "All guides", href: "/blog", note: "The full list on the blog" }],
    },
    {
      id: "profiles",
      h2: "Find Wajeeha Amin online",
      kind: "links",
      intro: "The author's own profiles.",
      items: [
        { name: "LinkedIn", href: AUTHOR.profiles[0], note: "Professional profile" },
        { name: "Facebook", href: AUTHOR.profiles[1], note: "Facebook profile" },
      ],
    },
    {
      id: "contact",
      h2: "Contact",
      kind: "links",
      items: [
        { name: "Contact page", href: "/contact", note: "Ways to reach the company" },
        { name: "Book a ride", href: "/book", note: "The booking form" },
        { name: "About Gulf Elite Transport", href: "/about", note: "The company" },
      ],
    },
  ],
});

export const extraPages: PlacePage[] = [fleetPage, blogIndex, authorPage, ...blogPosts.map((p) => p.page)];
export const extraByPath = new Map(extraPages.map((p) => [p.path, p]));
