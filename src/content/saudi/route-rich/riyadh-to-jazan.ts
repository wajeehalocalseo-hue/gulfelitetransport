import type { RichRoute } from "../rich-types";

/**
 * Riyadh to Jazan: the fully designed route page (southern coastal gateway variant, in the site's green and gold palette).
 * Distance and driving time are estimates from OpenStreetMap routing between the Riyadh centre and the Jazan city centre
 * (reviewed November 2026: 1,141 km / 818 min Riyadh to Jazan, 1,141 km / 826 min Jazan to Riyadh, about 13 hr 40 min). The existing page figures,
 * about 1,140 km and about 13 hr 40 min, are retained because they match.
 * The fastest-by-time route in OSRM runs Highway 40, then Highway 30 southwest for about 750 km, then Highway 255 and Highway 10 along the
 * coastal plain into Jazan; the Highway 30 section is not named by town, because the towns on it were not confirmed.
 * Routing via Abha instead (Riyadh to Abha 946 km, Abha to Jazan 200 km) gives about 1,146 km and about 13 hr 45 min. Reported road-authority figures of about
 * 1,107 km / 11 hr 35 min for the Al-Rayn, Bisha, Abha, Al-Darb corridor, 1,152 km / 12 hr 5 min via Wadi Al-Dawasir and Tathleeth, and up to about 1,474 km via the
 * Makkah coast could not be reproduced with routing (the shorter figure may use other endpoints or speed assumptions), so they are not used as the page estimate.
 * The page says that several routes exist and that the stated figures are estimates for the main road. Rome2Rio (1,139.6 km, 15 hr 23 min) uses a
 * slower speed model and is not averaged in.
 * From the Jazan city centre (road distance, estimates): King Abdullah Bin Abdulaziz International Airport (GIZ) about 4 km, Al-Dosariyah Castle about 2 km,
 * Jazan Port about 3 km, North Corniche about 6 km, Jazan University about 13 km, Abu Arish about 34 km, Sabya about 40 km, Jazan Economic City about 76 km,
 * Fayfa about 102 km, Bani Malik (Al-Dayer) about 106 km, Al-Darb about 123 km. The Farasan ferry terminal and Al-Raith could not be located, so no
 * distances are given for them, and no ferry schedule, ticket price or terminal name is stated. Landmark descriptions are general public knowledge.
 * No fares, ratings, reviews, vehicle specifications, flight tracking, ferry partnership or ferry-timing guarantees. Photos are optional: see ImageSlot.
 */
export const jazanSeo = {
  title: "Riyadh to Jazan Taxi | Private Long-Distance Transfer",
  description: "Book a private taxi from Riyadh to Jazan. Check the road distance and travel time, then request a one-way or return transfer and confirm your fare first.",
  h1: "Private Taxi from Riyadh to Jazan",
  lead: "A private long-distance transfer from Riyadh to Jazan on the Red Sea coast, for family visits, business trips, airport connections and the Farasan ferry. Share your pickup, exact Jazan destination and group size, and we confirm the vehicle, driver and fare before you commit.",
  directAnswer:
    "Gulf Elite Transport Group accepts private transport requests between Riyadh and Jazan (also written Jizan or Gizan), on the Red Sea coast in the far south-west, about 1,140 km by road. The drive takes about 13 hours 40 minutes without stops, so it needs a planned departure and rest breaks. Several road routes link the two cities, and an overnight stop is optional. The service is used for family visits, business travel, connections with King Abdullah Bin Abdulaziz International Airport (GIZ) and trips to the Farasan ferry, one way or with a return. Send your pickup address, exact destination in Jazan, the date, time, and the number of passengers and bags. Our team checks vehicle and driver availability and confirms the vehicle, driver and fare with you before you book. Ferry tickets are not included. Fares are not listed here, because each journey is quoted for your request.",
};

export const jazanRich: RichRoute = {
  fromName: "Riyadh",
  toName: "Jazan",
  toHref: "/taxi-saudi-arabia/jazan-region/jazan",
  variant: "jazan",
  imageFolder: "riyadh-to-jazan",
  eyebrow: "Private intercity transfer · Riyadh to the Red Sea coast",
  heroPoints: ["Private vehicle for family, business or ferry travel", "City, airport, port or regional destination: tell us which", "One-way and return requests", "Vehicle, driver and fare confirmed before you commit"],
  heroAlt: "A private car on the long road from Riyadh to the Red Sea coast at Jazan",
  facts: [
    { label: "Origin", value: "Riyadh" },
    { label: "Destination", value: "Jazan, Jazan Region" },
    { label: "Approximate road distance", value: "About 1,140 km" },
    { label: "Approximate driving time", value: "About 13 hr 40 min, without stops" },
    { label: "Direction", value: "South-west, to the Red Sea coast" },
    { label: "Airport", value: "King Abdullah Bin Abdulaziz International Airport (GIZ)" },
  ],
  factsNote: "Approximate road distance between the Riyadh centre and the Jazan city centre, from OpenStreetMap routing, in light traffic and without stops. Several road routes link the two cities, and published figures range from roughly 1,100 km to about 1,470 km, depending on the route and the start and end points. Driving time is not door-to-door time: rest, meals, prayer, fuel, traffic and weather add to it. They are not a promised arrival time.",
  introHeading: "Riyadh to Jazan Taxi: A Private Transfer to the Red Sea Coast",
  intro: [
    "Jazan, also spelled Jizan or Gizan, is the capital of Jazan Region, on the Red Sea coast in the far south-west of Saudi Arabia. From Riyadh the road runs south-west across the central plateau, and then down towards the coastal plain. The journey is about 1,140 km, one of the longest private transfers from the capital.",
    "A private transfer lets you agree the pickup address, the vehicle and the departure time in advance, and be taken to an exact home, hotel, the airport or the ferry port. Many passengers are families visiting relatives, and others connect with a flight or with the ferry to the Farasan Islands.",
  ],
  terms: {
    heading: "Jazan City, Jazan Region and the Places Around It",
    intro: "Jazan is a city, a governorate and a region, and several places people mention are separate from the city. Each is its own destination.",
    items: [
      { title: "Jazan city", text: "The capital of Jazan Region, on the coast. The Corniche, Al-Dosariyah Castle, the port, the university and most hotels are in or near it." },
      { title: "Jazan Region", text: "The whole south-western region, with coastal plains, farmland and mountains. It is much larger than the city." },
      { title: "Abha and Khamis Mushait", text: "Cities in Asir Region, in the highlands, not in Jazan. They are on one of the road options, and a stop there is a separate request." },
      { title: "Al-Darb", text: "A separate governorate north of Jazan city, about 123 km away by road (an estimate)." },
      { title: "Farasan Islands", text: "An island group in the Red Sea, reached by sea from the mainland. They are not a road destination." },
      { title: "Jazan Economic City", text: "A large industrial and economic zone north of Jazan, about 76 km by road (an estimate). It is not the same as Jazan city." },
    ],
    note: "A standard Jazan city booking does not include regional excursions. Each extra destination is a separate request.",
  },
  whyHeading: "Why Take a Private Taxi from Riyadh to Jazan?",
  why: [
    { title: "A private ride", text: "The car is for you and your group only, not shared with other passengers." },
    { title: "Direct intercity travel", text: "One vehicle from your Riyadh address to your Jazan destination." },
    { title: "Built for families and luggage", text: "Passengers and bags planned together, with breaks agreed in advance." },
    { title: "The right vehicle for the load", text: "A sedan, SUV, van or executive car, chosen for passengers and luggage." },
    { title: "One-way and return requests", text: "Ask for the ride back from Jazan to Riyadh in the same request." },
    { title: "Fare confirmed before you commit", text: "You see the vehicle, driver and fare for your request, and you decide whether to go ahead." },
  ],
  route: {
    heading: "The Road from Riyadh to the Jazan Coast",
    intro: "Mapping shows the main road leaving Riyadh on Highway 40, joining Highway 30 south-west for a very long stage, and then descending to the coastal plain on Highways 255 and 10 into Jazan. The driver chooses the best road on the day, and your plan is confirmed with you.",
    stops: [
      { name: "Riyadh", detail: "Start", text: "Departure from your agreed pickup address." },
      { name: "Highway 30 south-west", detail: "Longest stage, about 750 km", text: "A long road across the central and southern plateau. Rest and fuel stops can be requested in advance." },
      { name: "Towards the highlands", detail: "Descent begins", text: "The road drops from the high ground towards the coastal plain. Weather can affect this stage." },
      { name: "The coastal plain", detail: "Final stretch", text: "The last stretch runs along the flat Red Sea plain on Highway 10." },
      { name: "Jazan", detail: "Drop-off", text: "Arrival at your home, hotel, the airport or the port." },
    ],
    note: "A stop is not included unless you request it and we confirm it. We do not name rest stops or promise facilities. Other routes exist, so tell us if you prefer one.",
  },
  railway: {
    heading: "Other Road Options: Via Abha, or Further North",
    intro: "Published guidance lists several road routes between Riyadh and Jazan. Distances and times differ by route and by the speed assumptions used.",
    items: [
      { title: "Via Bisha, Abha and Al-Darb", text: "A route through the Asir highlands. Our routing gives about 1,145 km for it, similar to the main road. A stop in Abha is a separate request." },
      { title: "Via the Hejaz and the Makkah coast", text: "A much longer route of up to about 1,470 km, mainly for people who also need to stop in Taif or Makkah." },
      { title: "How we plan it", text: "Tell us if you want a particular route or a stop. We confirm the route, the time and the fare with you before you book." },
    ],
    note: "Do not assume every journey passes through Abha. The standard transfer follows the main road, and a different route is a request.",
    href: "/taxi-saudi-arabia/routes/riyadh-to-abha",
    linkLabel: "Riyadh to Abha taxi page",
  },
  heritage: {
    heading: "Arriving in Jazan City",
    intro: "Jazan city is compact. These are the places visitors and residents ask about most. Each is a different drop-off, so give us a hotel, street or map pin.",
    items: [
      { name: "Jazan Corniche", detail: "About 6 km (north corniche)", text: "A seafront promenade, busy in the evenings and at weekends. There is a north and a south corniche, so say which." },
      { name: "Al-Dosariyah Castle", detail: "About 2 km from the centre", text: "A historic fort in the city. Check its current visiting arrangements." },
      { name: "Jazan Dam (Wadi Jazan Dam)", detail: "Inland of the city", text: "A dam in the valley, inland of the coast. Ask us for the exact access point." },
      { name: "Jazan Port", detail: "About 3 km from the centre", text: "The commercial port. Access to port-controlled areas is decided by the port, not by us." },
      { name: "Jazan University", detail: "About 13 km from the centre", text: "A major campus north of the city, about 13 km by road (an estimate)." },
      { name: "Hotels and homes", detail: "Across the city", text: "Name the hotel or district and send a map pin. We have no hotel partnerships." },
    ],
    note: "A precise address works better than a broad name like \"Jazan\". We do not promise access to any site, and a taxi booking does not include a guide.",
    slot: "corniche",
    alt: "The seafront promenade of Jazan city on the Red Sea",
  },
  airport: {
    heading: "Jazan Airport Transfers: King Abdullah Bin Abdulaziz International Airport (GIZ)",
    intro: "King Abdullah Bin Abdulaziz International Airport (GIZ) is the airport of Jazan. It is close to the city, about 4 km from the centre by road (an estimate), but it is still a separate pickup or drop-off from a hotel, a home or the port.",
    items: [
      { title: "A separate location", text: "Say whether you want the airport, your hotel, the port or another address. Each is its own destination." },
      { title: "Not Riyadh's airport", text: "King Khalid International Airport (RUH) is in Riyadh. GIZ is the airport for Jazan. Check which one your ticket uses." },
      { title: "What to send us", text: "Give your flight number, date, time and terminal, the number of passengers and bags, and your Jazan destination." },
    ],
    note: "The time depends on the terminal, your destination and traffic. Pickup arrangements are confirmed with you for each request. We do not promise flight tracking, delay monitoring or a fixed waiting time.",
    href: "/taxi-saudi-arabia/airports/king-abdullah-bin-abdulaziz-airport",
    slot: "airport",
    alt: "King Abdullah Bin Abdulaziz International Airport (GIZ), the airport serving Jazan",
  },
  causeway: {
    heading: "Farasan Islands: Road to the Ferry, Ferry Booked Separately",
    intro: "Jazan is the mainland gateway to the Farasan Islands. The islands are reached by sea, so the road part of the trip ends at the ferry port, and the sea part is a separate arrangement.",
    items: [
      { title: "What the taxi does", text: "It takes you from your Riyadh address to the agreed ferry port or port-side drop-off point in Jazan." },
      { title: "What the taxi does not do", text: "It does not include ferry tickets, island transport or boat transfers, and it does not carry you or a vehicle across the sea." },
      { title: "Check the sailing yourself", text: "Confirm the current sailing time and ticket availability with the ferry operator. We do not list schedules, prices or journey times." },
      { title: "Tell us your sailing time", text: "If you have a ferry departure, share it when you request the quote, so the journey can be discussed realistically." },
      { title: "No guarantee of connection", text: "We cannot guarantee that a vehicle arrives in time for a given sailing. Leave a safety margin, because the road is long." },
      { title: "Confirm the terminal", text: "Ask the operator for the exact terminal and meeting point, and send it to us." },
    ],
    note: "Plan the ferry day with spare time, and consider arriving in Jazan the day before. An overnight stay is optional and arranged separately.",
    links: [],
  },
  eastern: {
    heading: "The Wider Jazan Region",
    intro: "The region is known for its mountains, farmland and coffee. These are separate destinations, each with its own route, availability and fare. Some mountain roads are steep and suit some vehicles better than others.",
    items: [
      { name: "Abu Arish", detail: "About 34 km from Jazan", text: "A town on the plain north-east of the city, known for its farmland and markets." },
      { name: "Sabya", detail: "About 40 km from Jazan", text: "A town on the plain, in the agricultural belt, known for its mangoes." },
      { name: "Fayfa Mountains", detail: "About 102 km from Jazan", text: "A highland area known for terraced slopes and Saudi coffee. The final approach is steep, so ask us early." },
      { name: "Bani Malik", detail: "About 106 km from Jazan", text: "A mountain area with traditional villages and farms, north-east of Jazan." },
      { name: "Al-Raith", detail: "In the mountains", text: "A mountain area known for its villages. We have not verified its distance, so ask us for the route." },
      { name: "Al-Darb", detail: "About 123 km from Jazan", text: "A separate governorate north of Jazan city, near the coast and the road to Asir." },
    ],
    note: "A regional drop-off is not included in the Jazan city fare. Areas near the Yemen border can have controlled access, and a taxi booking does not give permission to enter. Check access yourself before you go. Distances are estimates by road from the Jazan city centre.",
  },
  umrah: {
    heading: "Families and Long-Distance Comfort",
    intro: "Many passengers on this road are families visiting relatives. A very long drive goes better when it is planned for.",
    items: [
      { title: "Departure time", text: "Plan an early start, so most of the driving is in daylight." },
      { title: "Breaks", text: "Tell us if you need regular breaks, or have children or older passengers." },
      { title: "Luggage", text: "Count every bag, so the vehicle fits the group." },
      { title: "Overnight stop", text: "An overnight stop is optional and not required. If you want one, it is arranged and confirmed separately." },
    ],
    note: "We do not promise child seats or specific luggage space unless we confirm them with you for your request.",
    slot: "family",
    alt: "A family travelling together by private car from Riyadh to Jazan",
  },
  vehiclesHeading: "Choose a Vehicle for a Very Long Journey",
  vehiclesIntro: "The vehicle depends on the number of passengers, the amount of luggage, the date, your requested category and availability. On a trip this long, comfort matters. We confirm the vehicle with you before you book.",
  vehicles: [
    { slot: "sedan", homePhoto: "sedan", name: "Sedan", best: "One or two travellers with light luggage", text: "A private car for a small group. Suitable when you travel light.", alt: "Private sedan for a Riyadh to Jazan trip" },
    { slot: "suv", homePhoto: "suv", name: "SUV", best: "Families and extra luggage", text: "More room for passengers and bags. Suitable for a family on a long road journey.", alt: "Private SUV for a family travelling from Riyadh to Jazan" },
    { slot: "van", homePhoto: "family-van", name: "Van or minibus", best: "Larger groups", text: "For groups who want to travel together with their luggage. Give us the group size and we confirm what fits.", alt: "Private van for a group travelling from Riyadh to Jazan" },
    { slot: "executive", name: "Executive car", best: "Formal arrivals", text: "A chauffeur-driven premium car for guests who want extra comfort. Subject to availability.", alt: "Executive car for a Riyadh to Jazan transfer" },
  ],
  dropHeading: "Where in Jazan Are You Going?",
  dropIntro: "Send the exact address, hotel or site, and a map pin, and we confirm the best drop-off point with you.",
  drops: [
    { name: "Homes and hotels", text: "Name the district and send a pin." },
    { name: "Airport or ferry port", text: "Say which. GIZ and the ferry port are each a separate drop-off." },
    { name: "Regional towns", text: "Name the town. Abu Arish, Sabya, Fayfa and Al-Darb are each a separate journey." },
  ],
  dropAlt: "Jazan on the Red Sea coast, the destination of a private taxi from Riyadh",
  pickupHeading: "Common Pickup Areas in Riyadh",
  pickupIntro: "Journeys start from your own address. Send the exact address or a map pin when you request a quote.",
  pickups: [
    { name: "Olaya", text: "Hotels, offices and apartments in central Riyadh.", href: "/riyadh-taxi-service/olaya-taxi-service" },
    { name: "Al Malaz", text: "An established district in the east of central Riyadh.", href: "/riyadh-taxi-service/al-malaz-taxi-service" },
    { name: "Al Nakheel", text: "A residential district in the north-west of the city.", href: "/riyadh-taxi-service/al-nakheel-taxi-service" },
    { name: "King Khalid International Airport (RUH)", text: "The main airport, in the north. Send your flight number and terminal.", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport" },
    { name: "Hotels and homes", text: "Any hotel, apartment or house in Riyadh." },
  ],
  pickupAlt: "Riyadh skyline where private transfers to Jazan begin",
  planHeading: "Planning Your Riyadh to Jazan Journey",
  plan: [
    { title: "Distance and time", text: "The road is about 1,140 km, about 13 hours 40 minutes of driving without stops. These are estimates. With rest, meals and prayer breaks, plan for roughly 15 hours door to door." },
    { title: "Departure and breaks", text: "Start early and tell us when you want to stop. We do not name rest stops or promise facilities." },
    { title: "Passengers and luggage", text: "Count every passenger and every bag, so the vehicle has room for the group." },
  ],
  mapQuery: { from: "Riyadh, Saudi Arabia", to: "Jazan, Saudi Arabia" },
  highwayAlt: "The highway from Riyadh to Jazan across the southern plateau",
  whoHeading: "Who Travels This Route?",
  who: [
    { title: "Families visiting relatives", text: "Families travelling to Jazan for a stay." },
    { title: "Business travellers", text: "Professionals travelling to the south-west." },
    { title: "Travellers with luggage", text: "Groups with several bags." },
    { title: "Farasan ferry travellers", text: "People connecting with the ferry from Jazan." },
    { title: "Airport passengers", text: "Passengers connecting with GIZ." },
    { title: "People arranging a return", text: "Travellers who also need the ride back to Riyadh." },
    { title: "Regional destinations", text: "Passengers heading to Abu Arish, Sabya or the mountains." },
  ],
  stepsHeading: "How Booking Works",
  steps: [
    { title: "Enter your locations", text: "Pickup and drop-off addresses." },
    { title: "Select date and time", text: "The day and time you want to travel." },
    { title: "Add passengers and luggage", text: "How many people and bags are travelling." },
    { title: "Continue with your details", text: "Choose the vehicle and add your contact details in the next steps of the form." },
    { title: "Check and confirm", text: "Our team checks availability and confirms the vehicle, driver and fare before you commit." },
  ],
  infoHeading: "Before You Travel",
  infoIntro: "A few points that make a long journey easier.",
  info: [
    { title: "Fare", text: "Fares are not published, because each journey is quoted for your request." },
    { title: "Exact addresses", text: "Send a map pin or landmark for the pickup and drop-off." },
    { title: "Ferry tickets", text: "Ferry tickets are booked separately with the operator." },
  ],
  relatedHeading: "Related Routes and Pages",
  related: [
    { name: "Riyadh to Abha", href: "/taxi-saudi-arabia/routes/riyadh-to-abha", text: "The Asir highlands, on one of the road options." },
    { name: "Riyadh to Najran", href: "/taxi-saudi-arabia/routes/riyadh-to-najran", text: "A long ride to the far south." },
    { name: "Riyadh to Al Baha", href: "/taxi-saudi-arabia/routes/riyadh-to-al-baha", text: "A ride to the Sarawat mountains in the south-west." },
    { name: "Riyadh to Taif", href: "/taxi-saudi-arabia/routes/riyadh-to-taif", text: "A ride to the mountain city, on the Hejaz road." },
    { name: "Jazan taxi service", href: "/taxi-saudi-arabia/jazan-region/jazan", text: "Rides within and around Jazan." },
    { name: "Jazan airport taxi", href: "/taxi-saudi-arabia/airports/king-abdullah-bin-abdulaziz-airport", text: "Transfers to and from GIZ." },
    { name: "Riyadh taxi service", href: "/riyadh-taxi-service", text: "Pickups and rides in Riyadh." },
  ],
  faqHeading: "Frequently Asked Questions: Riyadh to Jazan Taxi",
  faq: [
    { q: "How far is Jazan from Riyadh by road?", a: "About 1,140 km between the two city centres on the main road. Other routes differ, and the exact distance depends on your pickup and your Jazan destination." },
    { q: "How long does a private taxi from Riyadh to Jazan take?", a: "Driving takes about 13 hours 40 minutes without stops, in light traffic. Breaks, meals, prayer and traffic add time. We do not promise an arrival time." },
    { q: "Which road route is fastest from Riyadh to Jazan?", a: "Several routes exist, and published figures vary with the route and the speed assumptions. Our routing shows the main road and the route through Abha as close in length. Tell us if you want a particular route, and we confirm it with you." },
    { q: "Can I book a private taxi from Riyadh to Jazan?", a: "Yes. Send your pickup, exact destination, date, time and group size, and we confirm the vehicle, driver and fare before you commit." },
    { q: "Can I arrange a return taxi from Jazan to Riyadh?", a: "Yes. Ask for the return in the same request and give us the day and time you want to leave Jazan." },
    { q: "Can I request pickup or drop-off at Jazan airport?", a: "Yes, as a request. Send your flight number, time and destination, and we confirm the arrangement with you. We do not promise flight tracking." },
    { q: "What is the name of Jazan's international airport?", a: "King Abdullah Bin Abdulaziz International Airport, code GIZ. It is close to the city, but it is a separate pickup and drop-off from a hotel or home." },
    { q: "Can a taxi take me to the Farasan Islands ferry port?", a: "Yes, as a drop-off request in Jazan. Ask the ferry operator for the exact terminal, and send it to us. The taxi does not cross the sea." },
    { q: "Are ferry tickets included in the taxi fare?", a: "No. Ferry tickets, schedules and island transport are separate from the taxi booking. Check the sailing with the operator, and tell us your departure time." },
    { q: "Can I stop in Abha during the journey?", a: "Yes, as a request. A stop or a route through Abha has to be confirmed with you in advance, and it changes the time and the fare." },
    { q: "Can I request a drop-off outside Jazan city?", a: "Yes, as a separate request. Places such as Abu Arish, Sabya, Fayfa and Al-Darb need their own route, availability and fare. Border areas can have controlled access." },
    { q: "Which vehicle should I choose for a long-distance trip?", a: "Choose by passengers and luggage. A sedan suits one or two people, an SUV suits families, and a van suits groups. We confirm what fits." },
    { q: "Is the fare fixed or quoted for each request?", a: "Fares are quoted for each request, because they depend on the vehicle, the addresses and the date. We confirm the fare before you commit." },
    { q: "How do I book a Riyadh to Jazan taxi?", a: "Enter the pickup and drop-off, the date and time, then add passengers and luggage in the form. We check availability and confirm the vehicle, driver and fare before you commit." },
  ],
  ctaHeading: "Plan Your Private Riyadh to Jazan Journey",
  ctaText: "Share your Riyadh pickup address, exact Jazan destination, date and time, number of passengers, luggage, and any airport, ferry or regional details. Our team confirms the vehicle, driver and fare before you commit.",
  ctaButton: "Request Your Free Quote",
};
