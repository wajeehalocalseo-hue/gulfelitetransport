import type { RichRoute } from "../rich-types";

/**
 * Riyadh to Hafar Al Batin: the fully designed route page (eastern desert corridor variant, in the site's green and gold palette).
 * Distance and driving time are estimates from OpenStreetMap routing between the Riyadh centre and the Hafar Al Batin city centre
 * (reviewed November 2026: 499 km / 329 min Riyadh to Hafar Al Batin, 501 km / 331 min Hafar Al Batin to Riyadh, about 5 hr 30 min). The existing page figures,
 * about 500 km and about 5 hr 30 min, are retained because they match. Rome2Rio (506 km, 6 hr 8 min) and Travelmath (498 km, 5 hr 14 min) use other endpoints and
 * speed models and are not averaged in.
 * Corridor from the routing steps: Highway 65 north (King Fahd Road and the Qassim Expressway, about 185 km), the Al Majma'ah to Artawiyah road (about 55 km), then
 * Highway 50, the Umm Al-Jamajim to Hafar Al Batin road (about 175 km). No other towns were confirmed, so none is named as a stop.
 * Three different destinations, with their own distances (road, estimates): the city centre about 499 km, Al-Qaisumah town about 507 km (about 25 km from the city centre) and
 * Al-Qaisumah/Hafr Al-Batin Airport (AQI) about 508 km (about 25 km from the city centre). The airport is in Al-Qaisumah, not in the city.
 * From the Hafar Al Batin city centre (road distance, estimates): University of Hafr Al Batin about 25 km, Al-Sadawi about 86 km, King Khalid Military City about 88 km,
 * Umm Qulayb about 99 km. The Al-Ruqai crossing, Al-Dhibiyah, Al-Suairah, Umm Kedad, Hafar Al Batin Industrial City and the municipality could not be located reliably, so no
 * distances are given for them. The site has no Al-Qaisumah airport page, so the page does not link one; it does link the existing Riyadh to Kuwait City page.
 * No cross-border promise, no fares, ratings, reviews, vehicle specifications, flight tracking or access guarantees. Photos are optional: see ImageSlot.
 */
export const hafarSeo = {
  title: "Riyadh to Hafar Al Batin Taxi | Private Transfer",
  description: "Arrange a private taxi from Riyadh to Hafar Al Batin. Share your pickup, destination and date, and get your vehicle and fare confirmed before you book.",
  h1: "Private Taxi from Riyadh to Hafar Al Batin",
  lead: "A private road transfer from Riyadh to Hafar Al Batin in the north of the Eastern Province, for families, business and work travel, and Al-Qaisumah airport. Share your pickup, exact destination and group size, and we confirm the vehicle, driver and fare before you commit.",
  directAnswer:
    "Gulf Elite Transport Group accepts private transport requests between Riyadh and Hafar Al Batin (also written Hafr Al-Batin), a governorate in the north of the Eastern Province, about 500 km by road. The drive takes about 5 hours 30 minutes without stops, so it is a half-day journey, and breaks or an overnight stop can be discussed if you want them. The service is used for family visits, business and work travel, trips to Al-Qaisumah and its airport, one way or with a return from Hafar Al Batin to Riyadh. The city, Al-Qaisumah town and the airport (AQI) are three different destinations, so say which one you need. Send your pickup address, exact destination, the date, time, and the number of passengers and bags. Our team checks vehicle and driver availability and confirms the vehicle, driver and fare with you before you book. A booking does not include travel to Kuwait. Fares are not listed here, because each journey is quoted for your request.",
};

export const hafarRich: RichRoute = {
  fromName: "Riyadh",
  toName: "Hafar Al Batin",
  toHref: "/taxi-saudi-arabia/eastern-province/hafar-al-batin",
  variant: "hafar",
  imageFolder: "riyadh-to-hafar-al-batin",
  eyebrow: "Private intercity transfer · Riyadh to the north-east",
  heroPoints: ["Private vehicle for family, business or work travel", "City, Al-Qaisumah or airport: tell us which", "One-way and return requests, both directions", "Vehicle, driver and fare confirmed before you commit"],
  heroAlt: "A private car on the long desert road from Riyadh towards Hafar Al Batin",
  facts: [
    { label: "Origin", value: "Riyadh" },
    { label: "Destination", value: "Hafar Al Batin, Eastern Province" },
    { label: "Approximate road distance", value: "About 500 km" },
    { label: "Approximate driving time", value: "About 5 hr 30 min, without stops" },
    { label: "Direction", value: "North, towards the Kuwait border" },
    { label: "Airport", value: "Al-Qaisumah/Hafr Al-Batin Airport (AQI), in Al-Qaisumah" },
  ],
  factsNote: "Approximate road distance between the Riyadh centre and the Hafar Al Batin city centre, from OpenStreetMap routing, in light traffic and without stops. Other routing sources give about 498 to 506 km and about 5 hr 15 min to 6 hr 10 min, depending on the start and end points and the speed assumed. Al-Qaisumah and its airport are a little further. Driving time is not door-to-door time: rest, meals, prayer, fuel, traffic and weather add to it. They are not a promised arrival time.",
  introHeading: "Riyadh to Hafar Al Batin Taxi: A Private Transfer to the North-East",
  intro: [
    "Hafar Al Batin is a governorate in the north of the Eastern Province, close to the borders with Kuwait and Iraq. The city is the centre of the governorate, and it takes its name from Wadi Al-Batin, a dry valley. The Eastern Province's capital is Dammam, not Hafar Al Batin.",
    "From Riyadh the road runs north for about 500 km, mostly on long, straight desert highway. A private transfer lets you agree the pickup address, the vehicle and the departure time in advance, and be taken to an exact home, hotel, the university or the airport.",
  ],
  terms: {
    heading: "Hafar Al Batin City, Al-Qaisumah and the Airport",
    intro: "People often say \"Hafar Al Batin\" for the whole area. In fact there are three common destinations, with different road distances, and the right one depends on where you are going.",
    items: [
      { title: "Hafar Al Batin city", text: "About 499 km from Riyadh. The city centre of the governorate. Homes, hotels, shops and offices. The distance used throughout this page." },
      { title: "Al-Qaisumah town", text: "About 507 km from Riyadh. A separate town, about 25 km from the city centre by road (an estimate). It is not a neighbourhood of Hafar Al Batin." },
      { title: "Al-Qaisumah/Hafr Al-Batin Airport (AQI)", text: "About 508 km from Riyadh. The airport serving the governorate. It is in Al-Qaisumah, not in the city centre, and about 25 km from it by road (an estimate)." },
    ],
    note: "Do not assume the three are the same drop-off. Tell us the exact one, and we confirm the distance, the time and the fare for it.",
  },
  whyHeading: "Why Take a Private Taxi from Riyadh to Hafar Al Batin?",
  why: [
    { title: "A private ride", text: "The car is for you and your group only, not shared with other passengers." },
    { title: "Direct intercity travel", text: "One vehicle from your Riyadh address to your destination in the governorate." },
    { title: "Built for families and luggage", text: "Passengers and bags planned together, with breaks agreed in advance." },
    { title: "The right vehicle for the load", text: "A sedan, SUV, van or executive car, chosen for passengers and luggage." },
    { title: "Both directions", text: "Book Riyadh to Hafar Al Batin, the return, or both in one request." },
    { title: "Fare confirmed before you commit", text: "You see the vehicle, driver and fare for your request, and you decide whether to go ahead." },
  ],
  route: {
    heading: "The Northern Road from Riyadh to Hafar Al Batin",
    intro: "Mapping shows a simple road: out of Riyadh on Highway 65 north, across by the Al Majma'ah to Artawiyah link road, and then Highway 50, the Umm Al-Jamajim to Hafar Al Batin road, for the last stretch. The driver chooses the best road on the day.",
    stops: [
      { name: "Riyadh", detail: "Start · 0 km", text: "Departure from your agreed pickup address." },
      { name: "Highway 65 north", detail: "First stage, about 185 km", text: "King Fahd Road and the Qassim Expressway, out of the capital." },
      { name: "The link road", detail: "About 55 km", text: "The Al Majma'ah to Artawiyah road, joining Highway 50." },
      { name: "Highway 50", detail: "Final stage, about 175 km", text: "The Umm Al-Jamajim to Hafar Al Batin road, across open desert. Rest and fuel stops can be requested in advance." },
      { name: "Hafar Al Batin", detail: "About 500 km", text: "Arrival in the city, or on to Al-Qaisumah and the airport." },
    ],
    note: "A stop is not included unless you request it and we confirm it. We do not name rest stops or promise facilities.",
  },
  heritage: {
    heading: "In Hafar Al Batin City: Places to Name",
    intro: "Hafar Al Batin is a working regional centre, more than a visitor destination. These are the places passengers name most often.",
    items: [
      { name: "City centre", detail: "Shops and offices", text: "The main shopping, business and government area, with hotels and restaurants." },
      { name: "University of Hafr Al Batin", detail: "About 25 km from the centre", text: "A university campus, about 25 km from the city centre by road (an estimate). Useful for students, staff and visitors. We have no arrangement with the university." },
      { name: "Wadi Al-Batin", detail: "A dry valley", text: "The valley that gives the city its name. It is a geographic feature, not a visitor attraction, and we do not promise access to it." },
      { name: "Homes and hotels", detail: "Across the city", text: "Name the district or hotel and send a map pin. We have no hotel partnerships." },
    ],
    note: "A precise address works better than a broad name like \"Hafar Al Batin\". Hafar Al Batin Municipality and other local offices are not drop-off points unless you name them.",
    slot: "hafar-al-batin",
    alt: "A street in Hafar Al Batin, a regional city in the north of the Eastern Province",
  },
  eastern: {
    heading: "The Wider Hafar Al Batin Governorate",
    intro: "The governorate is large, and it has several separate centres. These are not neighbourhoods of the city. Each is its own trip, with its own route, availability and fare.",
    items: [
      { name: "Al-Qaisumah", detail: "About 25 km from Hafar Al Batin", text: "A separate town with its own airport. The road from Riyadh reaches it a little after the city." },
      { name: "Al-Sadawi", detail: "About 86 km from Hafar Al Batin", text: "A separate centre in the east of the governorate." },
      { name: "King Khalid Military City", detail: "About 88 km from Hafar Al Batin", text: "A military city. Access is controlled, and a taxi booking does not give permission to enter." },
      { name: "Umm Qulayb", detail: "About 99 km from Hafar Al Batin", text: "A separate centre in the south of the governorate." },
      { name: "Al-Dhibiyah, Al-Suairah and Umm Kedad", detail: "In the governorate", text: "Smaller centres. We have not verified their distances, so ask us for the route." },
    ],
    note: "A drop-off outside the city is not included in the Hafar Al Batin city fare. Distances are estimates by road from the Hafar Al Batin city centre.",
  },
  cities: {
    heading: "Riyadh to the City, Al-Qaisumah or the Airport",
    intro: "These three destinations have different road distances from Riyadh. We confirm the exact distance and fare for the one you choose.",
    items: [
      { name: "Hafar Al Batin city", detail: "About 499 km · about 5 hr 30 min", text: "The standard transfer, to an address in the city." },
      { name: "Al-Qaisumah town", detail: "About 507 km · about 5 hr 40 min", text: "A separate town, a little further north-east." },
      { name: "Al-Qaisumah/Hafr Al-Batin Airport (AQI)", detail: "About 508 km · about 5 hr 40 min", text: "The airport. A separate drop-off, with its own meeting point." },
    ],
    note: "Driving times are without stops. Figures for Al-Qaisumah and the airport are estimates from routing, and may differ by exact address.",
  },
  airport: {
    heading: "Airport Transfers: Al-Qaisumah/Hafr Al-Batin Airport (AQI)",
    intro: "Al-Qaisumah/Hafr Al-Batin Airport, code AQI (also called Al-Qaisumah Airport), serves the governorate. It is in Al-Qaisumah, not in the city centre, about 25 km from it by road (an estimate).",
    items: [
      { title: "Not in the city", text: "A ride to or from the airport is separate from a city drop-off, and has its own timing." },
      { title: "Not Riyadh's airport", text: "King Khalid International Airport (RUH) is in Riyadh. AQI is the airport for Hafar Al Batin. Check which one your ticket uses." },
      { title: "What to send us", text: "Give your flight number, date, time and terminal, the number of passengers and bags, and your destination, when you request the transfer." },
    ],
    note: "Flight details help us discuss the request. They are subject to confirmation. We do not promise flight tracking, delay monitoring, a driver schedule tied to your flight or a fixed waiting time.",
    href: "/taxi-saudi-arabia/eastern-province/hafar-al-batin",
    slot: "airport",
    alt: "Al-Qaisumah/Hafr Al-Batin Airport (AQI), the airport serving Hafar Al Batin",
  },
  causeway: {
    heading: "Kuwait and the Al-Ruqai Border Crossing",
    intro: "Hafar Al Batin is close to Kuwait. The Al-Ruqai crossing, in the governorate, connects Saudi Arabia and Kuwait. Kuwait is a separate international destination.",
    items: [
      { title: "A domestic booking is not a Kuwait booking", text: "A Riyadh to Hafar Al Batin booking does not include Kuwait, and does not carry on across the border." },
      { title: "Cross-border needs separate confirmation", text: "The vehicle, the driver, the route and the border arrangements must be confirmed before you commit." },
      { title: "Your documents", text: "You are responsible for valid travel documents, visas and immigration permissions. We cannot handle them for you." },
      { title: "Border formalities", text: "Border procedures are decided by the authorities. They are not part of a taxi booking, and we cannot promise access." },
      { title: "A drop-off near the crossing", text: "Tell us the exact place. We confirm whether we can serve it, before you commit." },
    ],
    note: "Ordinary travel in Hafar Al Batin is not restricted, and most journeys here are routine. This note is only for people who plan to continue towards the border.",
    links: [
      { name: "Riyadh to Kuwait City taxi page", href: "/taxi-saudi-arabia/international/riyadh-to-kuwait-city" },
    ],
  },
  umrah: {
    heading: "Families and the Half-Day Drive",
    intro: "Many passengers on this road are families visiting relatives, or workers. A drive of about five and a half hours is easier when it is planned for.",
    items: [
      { title: "Departure time", text: "Choose a time that suits your group. Heat and traffic vary through the day." },
      { title: "Breaks", text: "Agree your rest stops in advance, and tell us if you have children or older passengers." },
      { title: "Luggage", text: "Count every bag, so the vehicle fits the group." },
      { title: "Overnight stop", text: "An overnight stop is not required. If you want one, it is arranged and confirmed separately." },
    ],
    note: "We do not promise child seats or specific luggage space unless we confirm them with you for your request.",
    slot: "family",
    alt: "A family travelling together by private car from Riyadh to Hafar Al Batin",
  },
  vehiclesHeading: "Choose a Vehicle for the Journey",
  vehiclesIntro: "The vehicle depends on the number of passengers, the amount of luggage, the date, your requested category and availability. We confirm the vehicle with you before you book.",
  vehicles: [
    { slot: "sedan", homePhoto: "sedan", name: "Sedan", best: "One or two travellers with light luggage", text: "A private car for a small group. Suitable when you travel light.", alt: "Private sedan for a Riyadh to Hafar Al Batin trip" },
    { slot: "suv", homePhoto: "suv", name: "SUV", best: "Families and extra luggage", text: "More room for passengers and bags. Suitable for a family on a long road journey.", alt: "Private SUV for a family travelling from Riyadh to Hafar Al Batin" },
    { slot: "van", homePhoto: "family-van", name: "Van or minibus", best: "Larger groups", text: "For groups who want to travel together with their luggage. Give us the group size and we confirm what fits.", alt: "Private van for a group travelling from Riyadh to Hafar Al Batin" },
    { slot: "executive", name: "Executive car", best: "Formal arrivals", text: "A chauffeur-driven premium car for guests who want extra comfort. Subject to availability.", alt: "Executive car for a Riyadh to Hafar Al Batin transfer" },
  ],
  dropHeading: "Where Are You Going?",
  dropIntro: "Send the exact address, hotel or site, and a map pin, and we confirm the best drop-off point with you. We do not change your requested destination.",
  drops: [
    { name: "City addresses", text: "Name the district, hotel or the university, and send a pin." },
    { name: "Al-Qaisumah", text: "Say whether you want the town or the airport. They are separate drop-offs." },
    { name: "Elsewhere in the governorate", text: "Name the centre. Al-Sadawi and Umm Qulayb are separate journeys." },
  ],
  dropAlt: "Hafar Al Batin and the desert plain of the north-east, the destination of a private taxi from Riyadh",
  pickupHeading: "Common Pickup Areas in Riyadh",
  pickupIntro: "Journeys start from your own address. Send the exact address or a map pin when you request a quote.",
  pickups: [
    { name: "Olaya", text: "Hotels, offices and apartments in central Riyadh.", href: "/riyadh-taxi-service/olaya-taxi-service" },
    { name: "Al Malaz", text: "An established district in the east of central Riyadh.", href: "/riyadh-taxi-service/al-malaz-taxi-service" },
    { name: "Al Nakheel", text: "A residential district in the north-west of the city.", href: "/riyadh-taxi-service/al-nakheel-taxi-service" },
    { name: "King Khalid International Airport (RUH)", text: "The main airport, in the north. Send your flight number and terminal.", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport" },
    { name: "Hotels and homes", text: "Any hotel, apartment or house in Riyadh." },
  ],
  pickupAlt: "Riyadh skyline where private transfers to Hafar Al Batin begin",
  planHeading: "Planning Your Riyadh to Hafar Al Batin Journey",
  plan: [
    { title: "Distance and time", text: "The road is about 500 km, about 5 hours 30 minutes of driving without stops. These are estimates. With rest, meals and prayer breaks, plan for roughly 7 hours door to door." },
    { title: "Departure and breaks", text: "Agree your rest stops in advance. We do not name rest stops or promise that they are included." },
    { title: "Passengers and luggage", text: "Count every passenger and every bag, so the vehicle has room for the group." },
  ],
  mapQuery: { from: "Riyadh, Saudi Arabia", to: "Hafar Al Batin, Saudi Arabia" },
  highwayAlt: "The highway from Riyadh to Hafar Al Batin across the northern desert",
  whoHeading: "Who Travels This Route?",
  who: [
    { title: "Families visiting relatives", text: "Families travelling to Hafar Al Batin for a stay." },
    { title: "Business and work travellers", text: "Professionals travelling to the north-east." },
    { title: "Students and staff", text: "People travelling for the University of Hafr Al Batin." },
    { title: "Travellers with luggage", text: "Groups with several bags." },
    { title: "Airport passengers", text: "Passengers connecting with AQI in Al-Qaisumah." },
    { title: "People on the return trip", text: "Travellers who need the ride from Hafar Al Batin back to Riyadh." },
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
  infoIntro: "A few points that make the journey easier.",
  info: [
    { title: "Fare", text: "Fares are not published, because each journey is quoted for your request." },
    { title: "Exact addresses", text: "Send a map pin or landmark for the pickup and drop-off." },
    { title: "Airport and border", text: "Airport details and any border plans need separate confirmation." },
  ],
  relatedHeading: "Related Routes and Pages",
  related: [
    { name: "Riyadh to Arar", href: "/taxi-saudi-arabia/routes/riyadh-to-arar", text: "The Northern Borders capital, further along the same road." },
    { name: "Riyadh to Jubail", href: "/taxi-saudi-arabia/routes/riyadh-to-jubail", text: "The Gulf coast industrial city." },
    { name: "Riyadh to Dhahran", href: "/taxi-saudi-arabia/routes/riyadh-to-dhahran", text: "The Eastern Province's energy and university city." },
    { name: "Riyadh to Dammam", href: "/taxi-saudi-arabia/routes/riyadh-to-dammam", text: "The capital of the Eastern Province." },
    { name: "Riyadh to Sakaka", href: "/taxi-saudi-arabia/routes/riyadh-to-sakaka", text: "A long ride to the north." },
    { name: "Riyadh to Kuwait City", href: "/taxi-saudi-arabia/international/riyadh-to-kuwait-city", text: "An international route, with its own confirmation." },
    { name: "Hafar Al Batin taxi service", href: "/taxi-saudi-arabia/eastern-province/hafar-al-batin", text: "Rides within and around Hafar Al Batin." },
    { name: "Riyadh taxi service", href: "/riyadh-taxi-service", text: "Pickups and rides in Riyadh." },
  ],
  faqHeading: "Frequently Asked Questions: Riyadh to Hafar Al Batin Taxi",
  faq: [
    { q: "How far is Hafar Al Batin from Riyadh by road?", a: "About 500 km between the two city centres. Al-Qaisumah and its airport are a little further, at about 507 to 508 km." },
    { q: "How long does a taxi from Riyadh to Hafar Al Batin take?", a: "Driving takes about 5 hours 30 minutes without stops, in light traffic. Breaks, meals, prayer and traffic add time. We do not promise an arrival time." },
    { q: "Can I book a private taxi from Hafar Al Batin to Riyadh?", a: "Yes. Ask for the return in the same request, or book it separately, and give us the day and time you want to leave." },
    { q: "Can I request a stop along the journey?", a: "Yes. Tell us when you request the quote, and agree the stop in advance. We do not name rest stops or promise that they are included." },
    { q: "Can I book a taxi to Al-Qaisumah/Hafr Al-Batin Airport?", a: "Yes, as a request. The airport code is AQI. Send your flight number and time when you request the transfer. It is subject to confirmation, and we do not promise flight tracking." },
    { q: "Is Al-Qaisumah Airport inside Hafar Al Batin city?", a: "No. The airport is in Al-Qaisumah, about 25 km from the city centre by road (an estimate)." },
    { q: "Can I book a taxi to Al-Qaisumah town?", a: "Yes, as a request. Al-Qaisumah is a separate town, with its own distance and fare." },
    { q: "Can I travel with family and luggage?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that fits. An SUV or a van suits most families." },
    { q: "Can I request an SUV or van?", a: "Yes. Choose the category in your request. We confirm the vehicle according to your passengers, luggage, date and availability." },
    { q: "Can I arrange a transfer to the Al-Ruqai border crossing?", a: "Ask us first. Tell us the exact place, and we confirm whether we can serve it. A taxi booking does not give access, and the authorities decide who may enter." },
    { q: "Can I continue from Hafar Al Batin to Kuwait?", a: "Only as a separate cross-border request. A domestic booking does not include Kuwait. The vehicle, driver, route and border arrangements must be confirmed first." },
    { q: "Are border formalities included in a taxi booking?", a: "No. Valid documents, visas and border procedures are your responsibility, and the authorities decide them." },
    { q: "How is the fare confirmed?", a: "Fares are quoted for each request, because they depend on the vehicle, the addresses and the date. We confirm the fare before you commit." },
    { q: "Do I need to arrange an overnight stop?", a: "No. The drive is about 5 hours 30 minutes. An overnight stop is optional, and if you want one, it is arranged and confirmed separately." },
  ],
  ctaHeading: "Plan Your Private Riyadh to Hafar Al Batin Journey",
  ctaText: "Share your Riyadh pickup address, exact destination (the city, Al-Qaisumah or the airport), date and time, number of passengers, luggage, and any border plans. Our team confirms the vehicle, driver and fare before you commit.",
  ctaButton: "Request Your Free Quote",
};
