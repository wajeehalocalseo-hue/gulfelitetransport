import type { RichRoute } from "../rich-types";

/**
 * Riyadh to Najran: the fully designed route page (southern heritage variant, in the site's own green and gold palette).
 * Distance and driving time are estimates from OpenStreetMap routing between the Riyadh centre and the Najran city centre
 * (reviewed November 2026: 951 km / 683 min Riyadh to Najran, 952 km / 687 min Najran to Riyadh, about 11 hr 25 min). The old page figure of
 * 940 km is replaced by about 950 km; the time of about 11 hr 25 min is kept. Rome2Rio's 948.5 km agrees on distance, and its 13 hr 11 min
 * uses a slower speed model, so it is not averaged in.
 * Corridor from the routing steps: the Riyadh to Hawtat Bani Tamim road (about 100 km), Highway 10 (about 330 km), then Highway 177
 * (about 344 km) for the final stretch to Najran. No other intermediate towns are named, because they were not verified.
 * From the Najran city centre (road distance, estimates): Najran International Airport (EAM) about 37 km, King Fahd Park about 13 km,
 * Habuna about 68 km, Thar about 85 km, Sharurah about 348 km. Al-Ukhdood, the museum, the Emirate Palace, Al-Aan Palace, Raoum Castle, the
 * Valley Dam, Hima, Badr Al-Janoub and Yadamah could not be located reliably with routing, so no distances are given for them.
 * Heritage descriptions are general public knowledge; ticketing, hours and access are not stated. Hima (UNESCO) is north of Najran and
 * is treated as a separate onward journey, not as a place on the standard route. No fares, ratings, reviews, vehicle specifications, flight
 * tracking, border-access guarantees or site-access guarantees. Photos are optional: see ImageSlot.
 */
export const najranSeo = {
  title: "Riyadh to Najran Taxi | Private Long-Distance Transfer",
  description: "Book a private Riyadh to Najran taxi for families, heritage visits, business trips and airport transfers. Confirm your vehicle and fare before you commit.",
  h1: "Private Taxi from Riyadh to Najran",
  lead: "A private long-distance transfer from Riyadh to Najran, in the far south of Saudi Arabia, for families, business trips and visits to its heritage sites. Share your pickup, exact Najran destination and group size, and we confirm the vehicle, driver and fare before you commit.",
  directAnswer:
    "Gulf Elite Transport Group accepts private transport requests between Riyadh and Najran, the capital of Najran Region in southern Saudi Arabia, about 950 km by road. The drive takes about 11 hours 25 minutes without stops, so it needs a planned departure and rest breaks. The service is used for family visits, business travel, trips to Najran's heritage sites and connections with Najran International Airport (EAM), one way or with a return. Send your pickup address, exact destination in Najran, the date, time, and the number of passengers and bags. Our team checks vehicle and driver availability and confirms the vehicle, driver and fare with you before you book. Fares are not listed here, because each journey is quoted for your request. A booking does not give permission to enter restricted or border areas.",
};

export const najranRich: RichRoute = {
  fromName: "Riyadh",
  toName: "Najran",
  toHref: "/taxi-saudi-arabia/najran-region/najran",
  variant: "najran",
  imageFolder: "riyadh-to-najran",
  eyebrow: "Private intercity transfer · Riyadh to southern Arabia",
  heroPoints: ["Private vehicle for family, business or heritage travel", "City, airport or regional destination: tell us which", "One-way and return requests", "Vehicle, driver and fare confirmed before you commit"],
  heroAlt: "A private car on the long southbound road from Riyadh towards Najran",
  facts: [
    { label: "Origin", value: "Riyadh" },
    { label: "Destination", value: "Najran, Najran Region" },
    { label: "Approximate road distance", value: "About 950 km" },
    { label: "Approximate driving time", value: "About 11 hr 25 min, without stops" },
    { label: "Direction", value: "South of Riyadh, near the Yemen border" },
    { label: "Airport", value: "Najran International Airport (EAM)" },
  ],
  factsNote: "Approximate road distance between the Riyadh centre and the Najran city centre, from OpenStreetMap routing, in light traffic and without stops. Other routing sources give slightly different figures for other start and end points. Driving time is not door-to-door time: rest, meals, prayer, fuel, traffic and weather add to it. The actual distance and time depend on your exact addresses and the road. They are not a promised arrival time.",
  introHeading: "Riyadh to Najran Taxi: A Private Transfer South to the Najran Oasis",
  intro: [
    "Najran, also written Najrān, lies in the far south of Saudi Arabia, in a wide valley near the Yemen border. It is the capital of Najran Region, and one of the oldest settled places in the kingdom, known for its mud-brick towers and ancient sites. From Riyadh the road runs south for about 950 km, through the open desert of the central and southern plateau.",
    "A private transfer lets you agree the pickup address, the vehicle and the departure time in advance, and be taken to an exact home, hotel, the airport or a heritage site. On a road this long, a vehicle that fits your group, and a plan for breaks, make the journey easier.",
  ],
  terms: {
    heading: "Najran City, Najran Region and Hima: What Is What",
    intro: "Najran is a city, a governorate and a region, and its best-known sites are spread across all three. They are separate destinations, each with its own journey.",
    items: [
      { title: "Najran city", text: "The capital of Najran Region, in the Najran valley. Homes, hotels, markets, the museum, palaces and Al-Ukhdood are in and around it." },
      { title: "Najran Region", text: "The whole southern region, which includes towns such as Thar, Habuna, Badr Al-Janoub, Yadamah and Sharurah. It is much larger than the city." },
      { title: "Al-Ukhdood", text: "An archaeological site of an ancient settlement in Najran. It is a heritage site, not a name for the region." },
      { title: "Najran Regional Museum", text: "A museum of Najran's history and archaeology. It is a different visit from Al-Ukhdood and its visitor centre." },
      { title: "Hima Cultural Area", text: "A UNESCO World Heritage property of rock art and wells, north of Najran. It is not in the city centre." },
      { title: "Najran International Airport (EAM)", text: "The airport serving Najran, about 37 km from the city centre by road (an estimate). It is a separate drop-off." },
    ],
    note: "A standard Najran city booking does not include regional excursions. Each extra destination is a separate request.",
  },
  whyHeading: "Why Take a Private Taxi from Riyadh to Najran?",
  why: [
    { title: "A private ride", text: "The car is for you and your group only, not shared with other passengers." },
    { title: "Direct intercity travel", text: "One vehicle from your Riyadh address to your Najran destination." },
    { title: "Built for families", text: "Passengers and luggage planned together, with breaks agreed in advance." },
    { title: "The right vehicle for the load", text: "A sedan, SUV, van or executive car, chosen for passengers and luggage." },
    { title: "One-way and return requests", text: "Ask for the ride back from Najran to Riyadh in the same request." },
    { title: "Fare confirmed before you commit", text: "You see the vehicle, driver and fare for your request, and you decide whether to go ahead." },
  ],
  route: {
    heading: "The Southbound Road from Riyadh to Najran",
    intro: "The journey leaves Riyadh to the south on the Hawtat Bani Tamim road, continues on Highway 10, and then follows Highway 177 for the long final stretch to Najran. The driver chooses the best road on the day, and your plan is confirmed with you.",
    stops: [
      { name: "Riyadh", detail: "Start", text: "Departure from your agreed pickup address." },
      { name: "Hawtat Bani Tamim road", detail: "First stage", text: "The road south out of Riyadh, for roughly the first 100 km." },
      { name: "Highway 10", detail: "Middle stage", text: "A long road south across the plateau. Rest and fuel stops can be requested in advance." },
      { name: "Highway 177", detail: "Final stage", text: "The long final stretch of about 344 km, into Najran Region." },
      { name: "Najran", detail: "Drop-off", text: "Arrival at your home, hotel, the airport or an agreed place." },
    ],
    note: "A stop is not included unless you request it and we confirm it. We do not name rest stops or promise facilities. Hima lies north of Najran, so check with us if you want it on the same journey.",
  },
  heritage: {
    heading: "Najran's Heritage: Palaces, Museum, Ancient Site and Mountain Fort",
    intro: "Najran is known for mud-brick architecture and an ancient history of caravan trade. These are the places visitors ask about most. Each is a different drop-off.",
    items: [
      { name: "Al-Ukhdood Archaeological Site", detail: "Ancient settlement", text: "The remains of an ancient city, tied to Najran's long history as a trading settlement. The site has a visitor centre. Check current visiting arrangements before you go." },
      { name: "Najran Regional Museum", detail: "History and archaeology", text: "A museum presenting Najran's history and archaeology. It is a separate visit from Al-Ukhdood." },
      { name: "Emirate Palace", detail: "Historic palace", text: "A historic mud-brick palace in the city, also called the Historical Palace. It is not the same as Al-Aan Palace. Check its current name and access." },
      { name: "Al-Aan Palace", detail: "On Al-Aan Mountain", text: "A traditional mud-brick palace on a mountain setting on the edge of the city. Give us the exact approach." },
      { name: "Raoum Castle", detail: "Mountain fortress", text: "A separate historic fortress on a mountain. Access can be on foot or on rough ground, so we do not promise easy access. Ask before you plan." },
      { name: "Najran Valley Dam", detail: "Regional landscape", text: "A dam on the Najran valley, set in the farmland of the region. Check current visitor access." },
      { name: "King Fahd Park", detail: "About 13 km from the centre", text: "A public park for families, about 13 km from the city centre by road (an estimate)." },
    ],
    note: "Give a hotel, landmark or map pin for the exact drop-off. We do not list ticket prices, opening hours or tour availability, and a taxi booking does not include a guide.",
    slot: "old-najran",
    alt: "Traditional mud-brick towers in Najran, in southern Saudi Arabia",
  },
  market: {
    heading: "Hima Cultural Area: A Separate Journey North of Najran",
    intro: "Hima Cultural Area (Ḥimā) is a UNESCO World Heritage property of rock art, inscriptions and historic wells, on an ancient caravan route. It lies north of Najran, in the wider region, and is not part of the city.",
    items: [
      { title: "UNESCO World Heritage", text: "Hima is inscribed for its large body of rock art and inscriptions, and for its wells on the old caravan route." },
      { title: "Rock art and wells", text: "The Hima sites include Bir Hima. Not every Hima location is in one place, so the exact destination matters." },
      { title: "Outside Najran city", text: "The journey from Najran is its own trip, with its own distance and time." },
      { title: "Separate fare", text: "A city transfer does not include Hima. We confirm the route and the fare for it separately." },
    ],
    note: "We do not promise access to any Hima site or guided visit, and we do not list tickets or hours. Check with the official visitor arrangements before you travel.",
  },
  eastern: {
    heading: "The Wider Najran Region",
    intro: "Najran Region is large. These are places passengers sometimes ask about. Each is a separate destination, with its own availability and fare.",
    items: [
      { name: "Thar", detail: "About 85 km from Najran", text: "A governorate to the north of Najran city, known for its historic villages." },
      { name: "Habuna", detail: "About 68 km from Najran", text: "A governorate north-west of Najran city, with farmland and desert." },
      { name: "Badr Al-Janoub", detail: "Within the region", text: "A town within the region. Give the exact address." },
      { name: "Yadamah", detail: "North-east of Najran", text: "A governorate in the north-east of the region." },
      { name: "Sharurah", detail: "About 348 km from Najran", text: "A distant town in the east of the region. It is a long journey on its own, and needs its own plan." },
    ],
    note: "Distances are estimates by road from the Najran city centre. A drop-off outside the city is not included in the Najran fare.",
  },
  airport: {
    heading: "Najran Airport Transfers: Najran International Airport (EAM)",
    intro: "Najran International Airport (EAM), often called Najran Airport, serves the region. It is about 37 km from the city centre by road (an estimate), so it is a separate destination from the city.",
    items: [
      { title: "A separate location", text: "The airport is not in the city centre. A ride to or from it has its own timing, and depends on your destination." },
      { title: "Not Riyadh's airport", text: "King Khalid International Airport (RUH) is in Riyadh. EAM is the airport for Najran. Check which one your ticket uses." },
      { title: "What to send us", text: "Give your flight number, date, time and terminal, the number of passengers and bags, and your Najran destination." },
    ],
    note: "The time depends on the terminal, your destination and traffic. Pickup arrangements are confirmed with you for each request. We do not promise flight tracking, delay monitoring or a fixed waiting time.",
    href: "/taxi-saudi-arabia/airports/najran-airport",
    slot: "airport",
    alt: "Najran International Airport (EAM), the airport serving Najran",
  },
  business: {
    heading: "Border Areas and Controlled Access",
    intro: "Najran is close to the Yemen border. Some areas near the border, and some sites, have controlled access, set by the authorities.",
    items: [
      { title: "Say where you are going", text: "Tell us the exact village, site or address, and a map pin." },
      { title: "Confirm access yourself", text: "Check with the relevant authority or host that you may enter before the day." },
      { title: "Carry your documents", text: "Bring the identification and any permission the site or checkpoint needs." },
      { title: "Expect checkpoints", text: "Routine checks add time on roads in the south." },
      { title: "Plan the return separately", text: "Confirm the return pickup point and time with us." },
      { title: "Ask before you plan", text: "If a place is near a border area, ask us early so we confirm what is possible." },
    ],
    note: "A taxi booking does not give permission to enter restricted or border areas. We cannot promise entry, and the authorities decide who may enter.",
  },
  umrah: {
    heading: "Families and Long-Distance Comfort",
    intro: "Many passengers on this road are families visiting relatives. A long drive goes better when it is planned for.",
    items: [
      { title: "Departure time", text: "Plan an early start, so you arrive in daylight." },
      { title: "Breaks", text: "Tell us if you need regular breaks, or have children or older passengers." },
      { title: "Luggage", text: "Count every bag, so the vehicle fits the group." },
      { title: "Overnight stop", text: "An overnight stop is optional and not required. If you want one, it is arranged and confirmed separately." },
    ],
    note: "We do not promise child seats or specific luggage space unless we confirm them with you for your request.",
    slot: "family",
    alt: "A family travelling together by private car from Riyadh to Najran",
  },
  vehiclesHeading: "Choose a Vehicle for a Long Journey",
  vehiclesIntro: "The vehicle depends on the number of passengers, the amount of luggage, the date, your requested category and availability. On a trip this long, comfort matters. We confirm the vehicle with you before you book.",
  vehicles: [
    { slot: "sedan", homePhoto: "sedan", name: "Sedan", best: "One or two travellers with light luggage", text: "A private car for a small group. Suitable when you travel light.", alt: "Private sedan for a Riyadh to Najran trip" },
    { slot: "suv", homePhoto: "suv", name: "SUV", best: "Families and extra luggage", text: "More room for passengers and bags. Suitable for a family on a long road journey.", alt: "Private SUV for a family travelling from Riyadh to Najran" },
    { slot: "van", homePhoto: "family-van", name: "Van or minibus", best: "Larger groups", text: "For groups who want to travel together with their luggage. Give us the group size and we confirm what fits.", alt: "Private van for a group travelling from Riyadh to Najran" },
    { slot: "executive", name: "Executive car", best: "Formal arrivals", text: "A chauffeur-driven premium car for guests who want extra comfort. Subject to availability.", alt: "Executive car for a Riyadh to Najran transfer" },
  ],
  dropHeading: "Where in Najran Are You Going?",
  dropIntro: "Send the exact address, hotel or site, and a map pin, and we confirm the best drop-off point with you.",
  drops: [
    { name: "Homes and hotels", text: "Name the district and send a pin." },
    { name: "Heritage sites", text: "Name the site. Al-Ukhdood, the museum, the palaces and Raoum Castle are each a separate drop-off." },
    { name: "Airport or region", text: "Say which. EAM, Hima, Thar and Sharurah are each a separate journey." },
  ],
  dropAlt: "Najran valley and its mud-brick towers, the destination of a private taxi from Riyadh",
  pickupHeading: "Common Pickup Areas in Riyadh",
  pickupIntro: "Journeys start from your own address. Send the exact address or a map pin when you request a quote.",
  pickups: [
    { name: "Olaya", text: "Hotels, offices and apartments in central Riyadh.", href: "/riyadh-taxi-service/olaya-taxi-service" },
    { name: "Al Malaz", text: "An established district in the east of central Riyadh.", href: "/riyadh-taxi-service/al-malaz-taxi-service" },
    { name: "Al Nakheel", text: "A residential district in the north-west of the city.", href: "/riyadh-taxi-service/al-nakheel-taxi-service" },
    { name: "King Khalid International Airport (RUH)", text: "The main airport, in the north. Send your flight number and terminal.", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport" },
    { name: "Hotels and homes", text: "Any hotel, apartment or house in Riyadh." },
  ],
  pickupAlt: "Riyadh skyline where private transfers to Najran begin",
  planHeading: "Planning Your Riyadh to Najran Journey",
  plan: [
    { title: "Distance and time", text: "The road is about 950 km, about 11 hours 25 minutes of driving without stops. These are estimates. With rest, meals and prayer breaks, plan for a full day." },
    { title: "Departure and breaks", text: "Start early and tell us when you want to stop. We do not name rest stops or promise facilities." },
    { title: "Passengers and luggage", text: "Count every passenger and every bag, so the vehicle has room for the group." },
  ],
  mapQuery: { from: "Riyadh, Saudi Arabia", to: "Najran, Saudi Arabia" },
  highwayAlt: "The highway from Riyadh to Najran across the southern plateau",
  whoHeading: "Who Travels This Route?",
  who: [
    { title: "Families visiting relatives", text: "Families travelling to Najran for a stay." },
    { title: "Heritage visitors", text: "People visiting Al-Ukhdood, the palaces and the museum." },
    { title: "Business travellers", text: "Professionals travelling to the southern region." },
    { title: "Travellers with luggage", text: "Groups with several bags." },
    { title: "Airport passengers", text: "Passengers connecting with EAM." },
    { title: "People arranging a return", text: "Travellers who also need the ride back to Riyadh." },
    { title: "Regional destinations", text: "Passengers heading to Thar, Hima or Sharurah." },
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
    { title: "Tickets and tours", text: "Site tickets and tours are booked separately." },
  ],
  relatedHeading: "Related Routes and Pages",
  related: [
    { name: "Riyadh to Abha", href: "/taxi-saudi-arabia/routes/riyadh-to-abha", text: "A ride to the Asir highlands, also in the south." },
    { name: "Riyadh to Jazan", href: "/taxi-saudi-arabia/routes/riyadh-to-jazan", text: "A long ride to the south-west coast." },
    { name: "Riyadh to Taif", href: "/taxi-saudi-arabia/routes/riyadh-to-taif", text: "A ride to the Sarawat mountains." },
    { name: "Riyadh to Al Kharj", href: "/taxi-saudi-arabia/routes/riyadh-to-al-kharj", text: "A short ride south of Riyadh." },
    { name: "Riyadh to AlUla", href: "/taxi-saudi-arabia/routes/riyadh-to-alula", text: "A long ride to the north-west heritage destination." },
    { name: "Najran taxi service", href: "/taxi-saudi-arabia/najran-region/najran", text: "Rides within and around Najran." },
    { name: "Najran airport taxi", href: "/taxi-saudi-arabia/airports/najran-airport", text: "Transfers to and from EAM." },
    { name: "Riyadh taxi service", href: "/riyadh-taxi-service", text: "Pickups and rides in Riyadh." },
  ],
  faqHeading: "Frequently Asked Questions: Riyadh to Najran Taxi",
  faq: [
    { q: "How far is Najran from Riyadh by road?", a: "About 950 km between the two city centres. The exact distance depends on your pickup and your Najran destination." },
    { q: "How long does a taxi from Riyadh to Najran take?", a: "Driving takes about 11 hours 25 minutes without stops, in light traffic. Breaks, meals, prayer and traffic add time. We do not promise an arrival time." },
    { q: "Can I book a private taxi from Riyadh to Najran?", a: "Yes. Send your pickup, exact destination, date, time and group size, and we confirm the vehicle, driver and fare before you commit." },
    { q: "Can I arrange a return taxi from Najran to Riyadh?", a: "Yes. Ask for the return in the same request and give us the day and time you want to leave Najran." },
    { q: "Does Najran have an international airport?", a: "Yes. Najran International Airport, code EAM, often called Najran Airport, serves the region." },
    { q: "Can I book a taxi to Najran International Airport?", a: "Yes, as a request. Send your flight number, time and destination, and we confirm the arrangement with you. We do not promise flight tracking." },
    { q: "Can I visit Al-Ukhdood Archaeological Site by taxi?", a: "Yes, as a drop-off request. Check the current visiting arrangements first. A taxi booking does not include tickets or a guide." },
    { q: "Is Ḥimā Cultural Area inside Najran city?", a: "No. Hima is a UNESCO World Heritage property north of Najran, in the wider region. It is not a city-centre attraction." },
    { q: "Can I request a separate trip to Hima?", a: "Yes, as a separate request. We confirm the route and the fare for it separately from a city transfer." },
    { q: "Can I travel with family and luggage?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that fits. An SUV or a van suits most families." },
    { q: "Can I request a stop during the journey?", a: "Yes. Tell us when you request the quote. We do not name rest stops or promise facilities, and a stop is confirmed with you." },
    { q: "Can I request pickup near a border area?", a: "Ask us first. Access to areas near the border is controlled by the authorities, and a taxi booking does not give permission to enter. You must confirm access yourself." },
    { q: "Which vehicle should I choose for a long-distance trip?", a: "Choose by passengers and luggage. A sedan suits one or two people, an SUV suits families, and a van suits groups. We confirm what fits." },
    { q: "Is the fare fixed or quoted for each request?", a: "Fares are quoted for each request, because they depend on the vehicle, the addresses and the date. We confirm the fare before you commit." },
    { q: "How do I book a Riyadh to Najran taxi?", a: "Enter the pickup and drop-off, the date and time, then add passengers and luggage in the form. We check availability and confirm the vehicle, driver and fare before you commit." },
  ],
  ctaHeading: "Plan Your Private Riyadh to Najran Journey",
  ctaText: "Share your Riyadh pickup address, exact Najran destination, date and time, number of passengers, luggage, and any airport or site details. Our team confirms the vehicle, driver and fare before you commit.",
  ctaButton: "Request Your Free Quote",
};
