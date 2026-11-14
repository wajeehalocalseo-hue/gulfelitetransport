import type { Section } from "./types";

/**
 * Landing-page content for the main Riyadh page (/taxi-saudi-arabia/riyadh-region/riyadh).
 *
 * Distances and driving times come from OpenStreetMap routing between the district centres, rounded, and are
 * estimates for light traffic; border waits, rest stops and peak hours are extra. Nothing here states a fare
 * or promises availability, a journey time or a rating.
 */
const R = "/taxi-saudi-arabia/riyadh-region/riyadh";

export const riyadhMain = {
  title: "Riyadh Taxi Service: Private Airport, City & Intercity Rides",
  description:
    "Pre-book a private Riyadh taxi service: RUH airport transfers, KAFD, Olaya, Diriyah and intercity rides. Fare and vehicle confirmed before you commit.",
  h1: "Riyadh Taxi Service: Private Taxi & Chauffeur Rides",
  lead: "Book a professional driver in Riyadh for airport transfers, business meetings, hotel rides and trips to other cities. You get the vehicle, driver and fare confirmed before you commit.",
  directAnswer:
    "Gulf Elite Transport is a Riyadh taxi service for pre-booked private taxi and chauffeur rides: transfers to and from King Khalid International Airport (RUH), rides between Olaya, KAFD, Diriyah and the old city, and longer trips to Dammam, Makkah, Jeddah and other cities. Send your pickup point, destination, date, time and number of passengers, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
};

export function riyadhSections(extra: {
  bookingSteps: Section;
  notAssumed: Section;
  moreLinks: { name: string; href: string; note?: string }[];
  km: { dammam: number; buraydah: number; hofuf: number; makkah: number; madinah: number; jeddah: number; kharj: number };
}): Section[] {
  const k = extra.km;
  return [
    {
      id: "journeys",
      h2: "Popular journeys from Riyadh",
      kind: "table",
      intro:
        "Distances and driving times for the rides people ask about most. Pick a row to see the full ride page. A driver meets you at your pickup point and handles the route, so you can sit back.",
      head: ["Route", "Approx. distance", "Typical driving time"],
      rows: [
        { cells: ["Airport (RUH) to Olaya", "~41 km", "~30 min"], href: `${R}/king-khalid-international-airport-to-olaya` },
        { cells: ["Airport (RUH) to KAFD", "~31 km", "~25 min"], href: `${R}/king-khalid-international-airport-to-king-abdullah-financial-district` },
        { cells: ["Airport (RUH) to Diriyah", "~38 km", "~30 min"], href: `${R}/king-khalid-international-airport-to-diriyah` },
        { cells: ["Airport (RUH) to Ad Dirah (old city)", "~45 km", "~35 min"], href: `${R}/king-khalid-international-airport-to-ad-dirah` },
        { cells: ["Olaya to KAFD", "~12 km", "~15 min"], href: `${R}/king-abdullah-financial-district-to-olaya` },
        { cells: ["Olaya to Diriyah", "~18 km", "~20 min"], href: `${R}/olaya-to-diriyah` },
        { cells: ["Olaya to Ad Dirah (old city)", "~9 km", "~10 min"], href: `${R}/olaya-to-ad-dirah` },
        { cells: ["Olaya to Boulevard City", "~16 km", "~20 min"] },
        { cells: ["Riyadh to Al Kharj", `~${k.kharj} km`, "~1 hr 20 min"], href: "/taxi-saudi-arabia/routes/riyadh-to-al-kharj" },
        { cells: ["Riyadh to Dammam", `~${k.dammam} km`, "~4 hr"], href: "/taxi-saudi-arabia/routes/riyadh-to-dammam" },
        { cells: ["Riyadh to Buraydah", `~${k.buraydah} km`, "~3 hr 20 min"], href: "/taxi-saudi-arabia/routes/riyadh-to-buraydah" },
        { cells: ["Riyadh to Al Hofuf", `~${k.hofuf} km`, "~3 hr 45 min"], href: "/taxi-saudi-arabia/routes/riyadh-to-al-hofuf" },
        { cells: ["Riyadh to Madinah", `~${k.madinah} km`, "~7 hr 40 min"], href: "/taxi-saudi-arabia/routes/riyadh-to-madinah" },
        { cells: ["Riyadh to Makkah", `~${k.makkah} km`, "~9 hr 35 min"], href: "/taxi-saudi-arabia/routes/riyadh-to-makkah" },
        { cells: ["Riyadh to Jeddah", `~${k.jeddah} km`, "~10 hr 25 min"], href: "/taxi-saudi-arabia/routes/riyadh-to-jeddah" },
        { cells: ["Riyadh to Manama (Bahrain)", "~465 km", "~4 hr 40 min plus border"], href: "/taxi-saudi-arabia/international/riyadh-to-manama" },
        { cells: ["Riyadh to Doha (Qatar)", "~585 km", "~6 hr 35 min plus border"], href: "/taxi-saudi-arabia/international/riyadh-to-doha" },
        { cells: ["Riyadh to Dubai (UAE)", "~1,040 km", "~10 hr 20 min plus border"], href: "/taxi-saudi-arabia/international/riyadh-to-dubai" },
      ],
      note: "Distances and times are approximate estimates for light traffic. Peak hours, border queues and rest stops add time, and the plan for your ride is confirmed with you.",
    },
    {
      id: "services",
      h2: "Hire a taxi or chauffeur in Riyadh",
      kind: "items",
      intro: "Whatever the reason for your trip, tell us what you need and we confirm the right vehicle and driver for it.",
      items: [
        { title: "Airport transfers", text: "Pickups and drop-offs at King Khalid International Airport (RUH). Send your flight number and terminal and the pickup is planned around your flight." },
        { title: "Business and corporate travel", text: "Rides to meetings in KAFD, Olaya and Riyadh Front, for a single executive or a whole team, with a professional driver and a pickup time agreed in advance." },
        { title: "Hotel and door-to-door rides", text: "A private car from your hotel, apartment or office to wherever you are going, with no sharing and no waiting for a street hail." },
        { title: "Family and group travel", text: "Larger vehicles for families and groups with luggage, with the number of seats and bags confirmed before you travel." },
        { title: "Sightseeing and day trips", text: "Rides to Diriyah, the old city and Masmak Fort, the National Museum and the city's malls, with a return pickup arranged for you." },
        { title: "Intercity and cross-border trips", text: "Long-distance rides from Riyadh to Dammam, Makkah, Jeddah and other Saudi cities, and cross-border requests to the Gulf." },
      ],
    },
    {
      id: "why",
      h2: "Why book your Riyadh taxi with Gulf Elite Transport",
      kind: "items",
      items: [
        { title: "Fare confirmed before you commit", text: "You see the vehicle, driver and fare for your request before you agree to anything, so there is no haggling at the kerb." },
        { title: "Private, point-to-point rides", text: "A car for you and your group from your pickup point to your drop-off point, not a shared ride." },
        { title: "Planned around your flight or meeting", text: "Give us the flight number or the meeting time and the pickup is planned back from it." },
        { title: "One request for both ways", text: "Ask for a return in the same request. Every route page covers both directions." },
        { title: "Riyadh, other cities and beyond", text: "City rides, airport transfers, intercity trips and cross-border requests, all arranged through one booking." },
      ],
    },
    {
      id: "airport",
      h2: "Riyadh airport transfers (RUH)",
      kind: "text",
      paragraphs: [
        "King Khalid International Airport lies in the north of Riyadh, about 41 km by road from Olaya and about 31 km from KAFD, so almost every airport ride is a long city ride rather than a short hop. Booking in advance means a driver is arranged for your flight instead of you hunting for a car after landing.",
        "For an arrival, give us your flight number and terminal and the car is planned around the flight. For a departure, tell us your flight time and where you are leaving from, and the pickup time is planned back from it, allowing for traffic on the roads to the north.",
      ],
    },
    {
      id: "vehicles",
      h2: "Vehicle options in Riyadh",
      kind: "items",
      intro: "The vehicle for your ride is confirmed with you before you commit.",
      items: [
        { title: "Sedan", text: "A comfortable private car for one to three passengers with light luggage, suited to airport rides and city meetings." },
        { title: "SUV", text: "More space for families and for passengers with more luggage, and a good choice for longer rides." },
        { title: "Van or minibus", text: "For groups, with room for passengers and their bags in one vehicle." },
        { title: "Premium or executive car", text: "A chauffeur-driven executive car for business guests and special occasions." },
      ],
    },
    {
      id: "fares",
      h2: "How Riyadh taxi fares work",
      kind: "items",
      intro: "We do not publish a price list, because the right fare depends on your ride. This is what shapes it.",
      items: [
        { title: "Distance and route", text: "A short ride between Olaya and KAFD is a different job from the airport run or a trip to another city." },
        { title: "Vehicle type", text: "A sedan, an SUV, a van and an executive car are priced differently." },
        { title: "Time and waiting", text: "Early mornings, late nights, busy event periods and any waiting time can change the fare." },
        { title: "Return or several stops", text: "A return ride or a series of stops is quoted together, so you see the whole price." },
        { title: "Confirmed first", text: "You see the fare for your request before you commit, and it is not changed at the end of the ride." },
      ],
    },
    {
      id: "areas",
      h2: "Areas we cover in Riyadh",
      kind: "links",
      intro: "Pickups and drop-offs across the city. Open an area to see its landmarks, access notes and the rides that start there.",
      items: [
        { name: "Olaya", href: `${R}/olaya`, note: "Business district, hotels and malls" },
        { name: "King Abdullah Financial District (KAFD)", href: `${R}/king-abdullah-financial-district`, note: "Towers, offices and metro" },
        { name: "Diriyah", href: `${R}/diriyah`, note: "Heritage district and evening dining" },
        { name: "Ad Dirah (old city)", href: `${R}/ad-dirah`, note: "Masmak Fort and the old markets" },
        { name: "Al Malaz", href: `${R}/al-malaz`, note: "Established eastern district" },
        { name: "Al Nakheel", href: `${R}/al-nakheel`, note: "Residential and Al Nakheel Mall" },
        { name: "Hittin", href: `${R}/hittin`, note: "North-west villas and business parks" },
        { name: "Al Malqa", href: `${R}/al-malqa`, note: "Northern residential district" },
        { name: "Diplomatic Quarter", href: `${R}/diplomatic-quarter`, note: "Embassies, controlled gates" },
        { name: "Al Murabba", href: `${R}/al-murabba`, note: "National Museum and historical centre" },
      ],
    },
    {
      id: "business",
      h2: "Corporate and executive transport in Riyadh",
      kind: "items",
      items: [
        { title: "KAFD", text: "A planned financial district with controlled entrances and car parks. Tell us the tower, the entrance and the contact who expects you." },
        { title: "Olaya business corridor", text: "Offices, hotels and malls along Olaya Street. A side-street pickup beside the tower is often quicker than the main road." },
        { title: "Riyadh Front and exhibition venues", text: "Events and exhibitions bring crowds at set times, so we plan the pickup and the return with the event schedule in mind." },
        { title: "Regular and account travel", text: "If your company needs rides on a regular basis, tell us what you need and we agree how it is arranged." },
      ],
    },
    {
      id: "daytrips",
      h2: "Sightseeing and day trips from Riyadh",
      kind: "items",
      items: [
        { title: "Diriyah and At-Turaif", text: "The birthplace of the first Saudi state and a UNESCO World Heritage Site, on the north-west edge of the city. Evenings are busiest, so we arrange the return pickup in advance." },
        { title: "Old city and Masmak Fort", text: "Masmak Fort, Souq Al Zal and Qasr Al Hukm sit close together in Ad Dirah. Streets are narrow, so the drop-off is usually at the edge of the market." },
        { title: "Boulevard City and Riyadh Season", text: "Boulevard City is about 16 km from Olaya. Entertainment zones draw crowds at night, so we plan the pickup and the way home with that in mind." },
        { title: "Edge of the World (Jebel Fihrayn)", text: "A cliff-edge viewpoint reached by a long drive out of the city. Many visitors use a 4WD for the final stretch of track, so tell us you want this trip and we confirm which vehicle is suitable." },
        { title: "National Museum and Al Murabba", text: "The National Museum of Saudi Arabia and the King Abdulaziz Historical Centre are close to each other in central Riyadh." },
      ],
    },
    {
      id: "compare",
      h2: "Pre-booked Riyadh taxi or a ride app?",
      kind: "items",
      intro: "Ride apps such as Uber and Careem work in Riyadh and are handy for a quick short trip. A pre-booked private ride suits other jobs better.",
      items: [
        { title: "Airport arrivals and early flights", text: "A booked driver is arranged for your flight, so you are not searching for a car after a long journey or at an early hour." },
        { title: "Groups and luggage", text: "You tell us the passengers and bags and we confirm a vehicle that fits, instead of hoping an app car is big enough." },
        { title: "Intercity and cross-border trips", text: "Long rides to Dammam, Makkah or the Gulf are planned with you in advance, with the fare confirmed first." },
        { title: "A plan you can show others", text: "The vehicle, driver and fare are confirmed in writing before you travel, which helps when a company or a family is paying." },
      ],
    },
    {
      id: "directions",
      h2: "Driving directions around Riyadh",
      kind: "text",
      paragraphs: [
        "Riyadh is a large, spread-out city built around a few long roads. King Fahd Road and Olaya Street run north to south through the business centre, with Tahlia Street crossing Olaya. The Northern Ring Road and the Eastern Ring Road carry traffic around the edges, and Makkah Road leads west toward the holy city and Jeddah. King Khalid International Airport is on the northern side of the city, and KAFD lies in the north-west. Traffic is heaviest on weekday mornings and late afternoons, so allow extra time for rides across town, and your driver will choose the best route on the day.",
      ],
    },
    {
      id: "map",
      h2: "Riyadh map and places we go to",
      kind: "map",
      intro: "See where Riyadh's main destinations are, and open any of them in Google Maps to check the exact entrance before you ride.",
      query: "Riyadh, Saudi Arabia",
      places: [
        { name: "King Khalid International Airport (RUH)", query: "King Khalid International Airport Riyadh", note: "Airport transfers" },
        { name: "Kingdom Centre Tower", query: "Kingdom Centre Riyadh", note: "Olaya landmark and mall" },
        { name: "Al Faisaliah Tower", query: "Al Faisaliah Tower Riyadh", note: "Olaya landmark and hotel" },
        { name: "Riyadh Front", query: "Riyadh Front Riyadh", note: "Events and exhibitions" },
        { name: "Boulevard City", query: "Boulevard City Riyadh", note: "Riyadh Season entertainment zone" },
        { name: "Riyadh Park", query: "Riyadh Park Mall Riyadh", note: "Shopping and dining" },
        { name: "At-Turaif, Diriyah", query: "At-Turaif Diriyah", note: "UNESCO World Heritage Site" },
        { name: "Masmak Fort", query: "Masmak Fortress Riyadh", note: "Old city landmark" },
        { name: "National Museum of Saudi Arabia", query: "National Museum of Saudi Arabia Riyadh", note: "Al Murabba" },
        { name: "King Abdullah Financial District", query: "King Abdullah Financial District Riyadh", note: "KAFD towers and metro" },
        { name: "King Saud University", query: "King Saud University Riyadh", note: "Campus rides" },
        { name: "King Faisal Specialist Hospital", query: "King Faisal Specialist Hospital Riyadh", note: "Patient and visitor rides" },
        { name: "Riyadh Railway Station", query: "Riyadh Railway Station", note: "Train connections" },
      ],
    },
    {
      id: "practical",
      h2: "Practical information for travelling in Riyadh",
      kind: "items",
      items: [
        { title: "Summer heat", text: "Afternoons are very hot in summer, so ask for an indoor or shaded pickup and keep water with you for longer rides." },
        { title: "Traffic and events", text: "Weekday mornings, late afternoons and big events bring heavy traffic. Booking ahead and giving your time early helps us plan." },
        { title: "A spread-out city", text: "Districts can be tens of kilometres apart, so give the exact address or a pin location and a nearby landmark." },
        { title: "Prayer times", text: "Roads and entrances near mosques are busier around prayer times, which can affect pickups." },
        { title: "Metro and buses", text: "Riyadh has a public metro and bus network, which suits some city trips. A private ride suits door-to-door travel, luggage, the airport and trips between cities." },
      ],
    },
    extra.bookingSteps,
    extra.notAssumed,
    { id: "links", h2: "More rides around Riyadh", kind: "links", items: extra.moreLinks },
    {
      id: "faq",
      h2: "Riyadh taxi and chauffeur: questions",
      kind: "faq",
      items: [
        { q: "How do I book a taxi or chauffeur in Riyadh?", a: "Use the request form at the top of this page, or contact us, and send your pickup point, destination, date, time and number of passengers. We confirm the vehicle, driver and fare for your request before you commit." },
        { q: "Can I book an airport transfer to or from King Khalid International Airport?", a: "Yes. Send your flight number, terminal and time. We plan the pickup around your flight and confirm the driver and fare before you commit." },
        { q: "How far is Riyadh airport from the city centre?", a: "King Khalid International Airport is in the north of the city. It is about 41 km by road from Olaya and about 31 km from KAFD, and the driving time depends on traffic." },
        { q: "Do you publish fares for Riyadh rides?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
        { q: "How much does a taxi cost in Riyadh?", a: "It depends on the distance, the vehicle, the time of day and any waiting or return. Send your pickup and destination and we confirm the fare for your ride before you commit." },
        { q: "Is a pre-booked taxi better than a ride app in Riyadh?", a: "Apps are handy for quick short trips. A pre-booked private ride suits airport arrivals, early flights, groups with luggage and long trips, because the vehicle, driver and fare are confirmed in advance." },
        { q: "Can you take me to the Edge of the World?", a: "Yes, a trip to Jebel Fihrayn can be requested. Many visitors use a 4WD for the last stretch, so tell us your plan and we confirm a suitable vehicle." },
        { q: "Can I hire a car with a driver for a day or for several stops?", a: "Yes, a car for a series of stops or for a longer period can be arranged. Tell us what you plan and for how long, and we confirm what is possible." },
        { q: "Can you take me to KAFD or Olaya for a business meeting?", a: "Yes. Tell us the tower or hotel and the time of your meeting, and we plan the pickup around it. KAFD has controlled entrances, so name the entrance you will use." },
        { q: "Can I book a ride from Riyadh to another city?", a: "Yes. Riyadh to Dammam, Makkah, Madinah, Jeddah and many other cities can be requested, and the distance and plan are confirmed with you." },
        { q: "Can I ask for a larger vehicle for a group?", a: "Yes. Tell us how many passengers and bags you have, and we confirm a vehicle that suits the group." },
        { q: "How far in advance should I book?", a: "As early as you can, especially for airport rides, early mornings and busy event periods. How much notice a ride needs is confirmed for each request." },
      ],
    },
    {
      id: "weather",
      h2: "Riyadh weather today",
      kind: "weather",
      intro: "Check the weather before you travel. It helps you decide what to wear and when to ask for your pickup.",
      place: "Riyadh",
      lat: 24.7136,
      lng: 46.6753,
    },
  ];
}
