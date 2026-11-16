import type { RichRoute } from "../rich-types";

/**
 * Riyadh to Jubail: the fully designed route page (Gulf coast business corridor variant).
 * Distance and driving time are estimates from OpenStreetMap routing between the Riyadh centre and the Jubail city centre
 * (reviewed November 2026: about 459 km and 281 min in both directions, along Highway 40 and then the Jubail road; the old page figure of
 * 455 km / 4 hr 35 min is replaced by about 460 km and about 4 hr 40 min). Other routing sources give slightly different figures for other endpoints.
 * From the Jubail city centre (road distance, estimates): Jubail Corniche about 7 km, Jubail Commercial Port about 3 km, the Jubail Industrial City
 * area about 27 km, Ras Tanura about 71 km, King Fahd International Airport about 82 km, Dammam about 85 km.
 * Al Fanateer, Dareen Hills Park, Al Nakheel Beach, the Marina, the Crease Tower, the fish market and the Royal Commission offices could not be located
 * with routing, so no distances are given for them. No fares, ratings, reviews, vehicle specifications, flight tracking, contracts with
 * named companies, or site-access guarantees. Photos are optional: see ImageSlot.
 */
export const jubailSeo = {
  title: "Riyadh to Jubail Taxi | Private Industrial City Transfer",
  description: "Book a private Riyadh to Jubail taxi for business, Industrial City visits and family travel. Request a vehicle and confirm your fare before you commit.",
  h1: "Private Taxi from Riyadh to Jubail",
  lead: "A private road transfer from Riyadh to Jubail on the Gulf coast, for business trips, contractor and project travel, and family visits. Share your pickup, exact destination and group size, and we confirm the vehicle, driver and fare before you commit.",
  directAnswer:
    "Gulf Elite Transport Group accepts private transport requests between Riyadh and Jubail in the Eastern Province of Saudi Arabia, about 460 km by road. The drive takes about 4 hours 40 minutes without stops. The service is used for business and contractor travel, visits to Jubail Industrial City, family journeys and airport connections, one way or with a return. Send your pickup address, exact destination (the company, gate or district), date, time, and the number of passengers and bags. Our team checks vehicle and driver availability and confirms the vehicle, driver and fare with you before you book. A booking does not give access to restricted industrial premises. Fares are not listed here, because each journey is quoted for your request.",
};

export const jubailRich: RichRoute = {
  fromName: "Riyadh",
  toName: "Jubail",
  toHref: "/taxi-saudi-arabia/eastern-province/jubail",
  variant: "jubail",
  imageFolder: "riyadh-to-jubail",
  eyebrow: "Private intercity transfer · Riyadh to the Gulf coast",
  heroPoints: ["Private vehicle for business, project or family travel", "Gate and district details planned before you leave", "One-way and return requests", "Vehicle, driver and fare confirmed before you commit"],
  heroAlt: "A private car on the highway from Riyadh towards Jubail on the Arabian Gulf coast",
  facts: [
    { label: "Origin", value: "Riyadh" },
    { label: "Destination", value: "Jubail, Eastern Province" },
    { label: "Approximate road distance", value: "About 460 km" },
    { label: "Approximate driving time", value: "About 4 hr 40 min, without stops" },
    { label: "Direction", value: "North-east of Riyadh, on the Arabian Gulf" },
    { label: "Service", value: "Private intercity transport, both directions" },
  ],
  factsNote: "Approximate road distance between the Riyadh centre and the Jubail city centre, from OpenStreetMap routing, for light traffic and without stops. Other routing sources give slightly different figures for other start and end points. A destination in the Industrial City is further than the city centre. The actual distance and time depend on your exact addresses, the road, traffic, gate checks and stops. They are not a promised arrival time.",
  introHeading: "Riyadh to Jubail Taxi: A Private Transfer for Business and Family Travel",
  intro: [
    "Jubail lies on the Arabian Gulf coast of the Eastern Province, north of Dammam. The road from Riyadh runs east across the desert and then north along the coast for about 460 km. People travel for work in the Industrial City, for meetings and projects, and to visit relatives.",
    "A private transfer lets you agree the pickup address, the vehicle and the departure time in advance, and be taken to an exact company gate, hotel or district. Because Jubail has more than one part, the exact destination matters.",
  ],
  terms: {
    heading: "Old Jubail, Jubail Industrial City and Al Fanateer: Which One?",
    intro: "Jubail is not one place. The old town and the Industrial City are different areas, and the right drop-off depends on which one you mean.",
    items: [
      { title: "Jubail Balad (Old Jubail)", text: "The older coastal town, with local districts, the Corniche and the waterfront. Travel context: homes, hotels, shops and visits." },
      { title: "Jubail Industrial City", text: "A planned industrial and urban area run by the Royal Commission for Jubail and Yanbu, about 27 km from the city centre (an estimate). Travel context: offices, plants, camps and housing." },
      { title: "Al Fanateer", text: "A coastal recreation area in the Industrial City side of Jubail, known for its beach and waterfront. Travel context: leisure and family outings." },
      { title: "Industrial facilities", text: "Individual company sites with controlled entry. Travel context: a named gate, with permission arranged by the site." },
    ],
    note: "Enter the real destination, not only \"Jubail\", when you have a specific site or district. A drop-off far from the city centre changes the distance and the fare.",
  },
  whyHeading: "Why Take a Private Taxi from Riyadh to Jubail?",
  why: [
    { title: "A private ride", text: "The car is for you and your group only, not shared with other passengers." },
    { title: "Pickup and drop-off at your address", text: "From a home, hotel or office in Riyadh to a company gate, hotel or district in Jubail." },
    { title: "The right vehicle for your group", text: "A sedan, SUV, van or executive car, chosen for passengers and luggage." },
    { title: "Planned around shifts and meetings", text: "Tell us your meeting or shift time, and we plan the departure around it." },
    { title: "Return journey requests", text: "Ask for the ride back from Jubail to Riyadh in the same request." },
    { title: "Fare confirmed before you commit", text: "You see the vehicle, driver and fare for your request, and you decide whether to go ahead." },
  ],
  business: {
    heading: "Industrial City Access and Business Travel",
    intro: "Many journeys on this road are work trips to Jubail Industrial City, which includes industrial, commercial and residential areas. Access to each industrial site is controlled by its operator or security authority.",
    items: [
      { title: "Give the full company or facility name", text: "The name on your visitor pass or appointment, not only the area." },
      { title: "Give the gate or visitor entrance", text: "Name the designated entrance and send a map pin if you have one." },
      { title: "Share the host or contact", text: "The name and phone number of the person expecting you." },
      { title: "Confirm your site permission", text: "Check that you hold the access the site requires before the day." },
      { title: "Allow time for security", text: "Gate checks take time, so plan extra time before an appointment." },
      { title: "Plan the return separately", text: "Tell us the shift or meeting end time, and we plan the return ride with you." },
    ],
    note: "A taxi booking does not give access to restricted industrial premises. We cannot promise entry, security clearance or permission to enter a plant. Entry is always decided by the site operator.",
  },
  eastern: {
    heading: "Jubail Destinations: Where Will You Be Dropped?",
    intro: "These are the places passengers ask about most. Each is a different drop-off, so tell us the exact one. Not all of them are near each other.",
    items: [
      { name: "Jubail Balad (Old Jubail)", detail: "The historic older town", text: "Homes, local shops and hotels in the older part of the city, on the coast." },
      { name: "Jubail Industrial City", detail: "About 27 km from the city centre", text: "The planned industrial and urban area, with offices, plants, camps and housing. Access to sites is controlled." },
      { name: "Al Fanateer", detail: "Coastal area on the Industrial City side", text: "A beach and waterfront area, popular for family outings. Check current visiting details before you go." },
      { name: "Jubail Corniche", detail: "About 7 km from the city centre", text: "A coastal park and promenade. Weekend evenings are busy, so a side-street drop-off may be easier." },
      { name: "Jubail Fish Market", detail: "A waterfront market", text: "A traditional waterfront market. Check its current location and hours before you go." },
      { name: "Jubail Commercial Port", detail: "About 3 km from the city centre", text: "A port area with controlled access. Give the company, the gate and the host." },
    ],
    note: "Distances are estimates by road from the Jubail city centre. We do not offer tours or guides, and we do not promise waiting time or access to any place unless we confirm it with you.",
  },
  airport: {
    heading: "Airport Transfers: King Fahd International Airport (DMM)",
    intro: "King Fahd International Airport (DMM) serves the Eastern Province. It is in the Dammam area, not in Jubail.",
    items: [
      { title: "A separate location", text: "The airport is about 82 km from the Jubail city centre by road (an estimate), so a ride to or from it is its own journey with its own timing." },
      { title: "Not Riyadh's airport", text: "King Khalid International Airport (RUH) is in Riyadh. King Fahd International Airport (DMM) is in the Dammam area. Check which one your ticket uses." },
      { title: "What to send us", text: "Give your flight number, date and time, the number of passengers and bags, and your Jubail district or company gate." },
    ],
    note: "The time depends on the terminal, your destination district and traffic. Pickup arrangements are confirmed with you for each request. We do not promise flight tracking, meet-and-greet or a fixed waiting time.",
    href: "/taxi-saudi-arabia/airports/king-fahd-international-airport",
    slot: "airport",
    alt: "King Fahd International Airport in the Dammam area, which serves Jubail travellers",
  },
  cities: {
    heading: "Neighbouring Cities on the Gulf Coast",
    intro: "Other Eastern Province cities are separate destinations, each with its own distance and fare.",
    items: [
      { name: "Dammam", detail: "About 85 km from Jubail", text: "The regional capital. See the Dammam to Jubail ride or the Riyadh to Dammam page.", href: "/taxi-saudi-arabia/routes/dammam-to-jubail" },
      { name: "Ras Tanura", detail: "About 71 km from Jubail", text: "A separate coastal town and industrial area, with controlled access to company sites." },
      { name: "Al Khobar and Dhahran", detail: "Further south", text: "Separate cities near Dammam. See the Riyadh to Al Khobar and Riyadh to Dhahran pages.", href: "/taxi-saudi-arabia/routes/riyadh-to-al-khobar" },
    ],
    note: "Distances are estimates by road from the Jubail city centre. A drop-off in another city is not included in the Jubail fare.",
  },
  umrah: {
    heading: "Families and Coastal Visitors",
    intro: "Not every passenger is travelling for work. Families visiting relatives and visitors staying near the coast also use this road.",
    items: [
      { title: "Visiting relatives", text: "Send the exact address in Jubail, so the driver can go to the right door." },
      { title: "Staying near Al Fanateer or the Corniche", text: "Send your hotel or rental, and tell us which district it is in." },
      { title: "Families with luggage", text: "Count every bag, and tell us about children's seats, so the vehicle suits the family." },
      { title: "Weekend travel", text: "Weekends and evenings are busier at the waterfront, so ask early." },
    ],
    note: "We do not promise child seats or specific luggage space unless we confirm them with you for your request.",
    slot: "family",
    alt: "A family travelling together by private car from Riyadh to Jubail",
  },
  vehiclesHeading: "Choose a Vehicle for Your Journey",
  vehiclesIntro: "The vehicle depends on the number of passengers, the amount of luggage, whether the trip is for business or family, your requested category and availability. We confirm it with you before you book.",
  vehicles: [
    { slot: "sedan", homePhoto: "sedan", name: "Sedan", best: "Business travellers and small groups", text: "A private car for one to a few passengers with light luggage.", alt: "Private sedan for a Riyadh to Jubail trip" },
    { slot: "suv", homePhoto: "suv", name: "SUV", best: "Families and extra luggage", text: "More room for passengers and bags. Suitable for a family on a long road journey.", alt: "Private SUV for a family travelling from Riyadh to Jubail" },
    { slot: "van", homePhoto: "family-van", name: "Van or minibus", best: "Project teams and groups", text: "For teams and groups who want to travel together with their luggage. Give us the group size and we confirm what fits.", alt: "Private van for a project team travelling from Riyadh to Jubail" },
    { slot: "executive", name: "Executive car", best: "Formal arrivals", text: "A chauffeur-driven premium car for guests who want extra comfort. Subject to availability.", alt: "Executive car for a Riyadh to Jubail transfer" },
  ],
  dropHeading: "Where in Jubail Are You Going?",
  dropIntro: "Send the exact address, company gate or hotel, and a map pin, and we confirm the best drop-off point with you.",
  drops: [
    { name: "Company gates and offices", text: "Name the company, the building and the gate." },
    { name: "Hotels and camps", text: "Share the name, the district and a nearby landmark." },
    { name: "Homes and districts", text: "Share the address and a map pin." },
  ],
  dropAlt: "Jubail on the Arabian Gulf coast, the destination of a private taxi from Riyadh",
  pickupHeading: "Common Pickup Areas in Riyadh",
  pickupIntro: "Journeys start from your own address. Send the exact address or a map pin when you request a quote.",
  pickups: [
    { name: "Olaya", text: "Hotels, offices and apartments in central Riyadh.", href: "/riyadh-taxi-service/olaya-taxi-service" },
    { name: "Al Malaz", text: "An established district in the east of central Riyadh.", href: "/riyadh-taxi-service/al-malaz-taxi-service" },
    { name: "Al Nakheel", text: "A residential district in the north-west of the city.", href: "/riyadh-taxi-service/al-nakheel-taxi-service" },
    { name: "King Khalid International Airport (RUH)", text: "The main airport, in the north. Send your flight number and terminal.", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport" },
    { name: "Hotels and homes", text: "Any hotel, apartment or house in Riyadh." },
  ],
  pickupAlt: "Riyadh skyline where private transfers to Jubail begin",
  planHeading: "Planning Your Riyadh to Jubail Journey",
  plan: [
    { title: "Distance and time", text: "The road is about 460 km, about 4 hours 40 minutes of driving without stops. These are estimates. With rest and prayer breaks, plan for about five and a half hours." },
    { title: "Shift and meeting times", text: "Industrial traffic follows shift changes, mostly early in the morning and late in the afternoon. Tell us your times." },
    { title: "Passengers and luggage", text: "Count every passenger and every bag, so the vehicle has room for the group." },
  ],
  route: {
    heading: "The Road from Riyadh to Jubail",
    intro: "The journey leaves Riyadh to the east and follows Highway 40 towards the Dammam area, then turns north along the Gulf coast to Jubail. The driver chooses the best road on the day, and your plan is confirmed with you.",
    stops: [
      { name: "Riyadh", detail: "Start", text: "Departure from your agreed pickup address." },
      { name: "Highway 40", detail: "On the road", text: "A long, mostly straight road east. Rest and fuel stops can be requested in advance." },
      { name: "The Gulf coast road", detail: "Final stretch", text: "The road turns north along the coast towards Jubail." },
      { name: "Jubail", detail: "Drop-off", text: "Arrival at your gate, hotel or district." },
    ],
    note: "A stop is not included unless you request it and we confirm it. We do not promise a particular stop or journey time in advance.",
  },
  mapQuery: { from: "Riyadh, Saudi Arabia", to: "Jubail, Saudi Arabia" },
  highwayAlt: "The Riyadh to Dammam highway on the way to Jubail",
  whoHeading: "Who Uses This Route?",
  who: [
    { title: "Contractors and engineers", text: "People working on projects in Jubail." },
    { title: "Corporate visitors and project teams", text: "Teams with meetings and site visits." },
    { title: "Industrial and operations professionals", text: "Staff travelling to and from sites." },
    { title: "Families", text: "Families visiting relatives in Jubail." },
    { title: "Coastal visitors", text: "People staying near Al Fanateer or the Corniche." },
    { title: "Airport passengers", text: "Passengers connecting with King Fahd International Airport." },
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
  ],
  relatedHeading: "Related Routes and Pages",
  related: [
    { name: "Riyadh to Dammam", href: "/taxi-saudi-arabia/routes/riyadh-to-dammam", text: "The business route to the regional capital." },
    { name: "Riyadh to Al Khobar", href: "/taxi-saudi-arabia/routes/riyadh-to-al-khobar", text: "A ride to the Gulf coast, next to Dammam." },
    { name: "Riyadh to Dhahran", href: "/taxi-saudi-arabia/routes/riyadh-to-dhahran", text: "A ride to Dhahran and its campuses." },
    { name: "Riyadh to Hafar Al Batin", href: "/taxi-saudi-arabia/routes/riyadh-to-hafar-al-batin", text: "A ride north-east to the border area." },
    { name: "Riyadh to Yanbu", href: "/taxi-saudi-arabia/routes/riyadh-to-yanbu", text: "The other Royal Commission industrial city, on the Red Sea." },
    { name: "Jubail taxi service", href: "/taxi-saudi-arabia/eastern-province/jubail", text: "Rides within and around Jubail." },
    { name: "Dammam to Jubail", href: "/taxi-saudi-arabia/routes/dammam-to-jubail", text: "The ride between Dammam and Jubail." },
    { name: "Riyadh taxi service", href: "/riyadh-taxi-service", text: "Pickups and rides in Riyadh." },
  ],
  faqHeading: "Frequently Asked Questions: Riyadh to Jubail Taxi",
  faq: [
    { q: "How far is Jubail from Riyadh by road?", a: "About 460 km between the two city centres. The exact distance depends on your addresses, and a site in the Industrial City is further." },
    { q: "How long does a taxi from Riyadh to Jubail take?", a: "Driving takes about 4 hours 40 minutes without stops, in light traffic. Stops, traffic and gate checks add time. We do not promise an arrival time." },
    { q: "Which road route connects Riyadh and Jubail?", a: "The journey follows Highway 40 east towards the Dammam area, then goes north along the Gulf coast. The driver chooses the road on the day." },
    { q: "Can I book a private taxi from Riyadh to Jubail?", a: "Yes. Send your pickup, exact destination, date, time and group size, and we confirm the vehicle, driver and fare before you commit." },
    { q: "Can I book a taxi directly to Jubail Industrial City?", a: "Yes, as a request. Give the company, the gate and a map pin. The Industrial City is about 27 km from the city centre, an estimate, so the fare reflects it." },
    { q: "Can a taxi enter a restricted industrial facility?", a: "Only if the operator allows it. A taxi booking does not give access, and we cannot promise entry or security clearance." },
    { q: "What details should I provide for an industrial-site drop-off?", a: "The full company name, the gate or visitor entrance, a map pin, and your host's name and phone number. Make sure you hold the access the site requires." },
    { q: "Is Jubail Industrial City the same as Old Jubail?", a: "No. Old Jubail (Jubail Balad) is the older coastal town. The Industrial City is a separate planned area run by the Royal Commission." },
    { q: "Can I book a taxi to Al Fanateer?", a: "Yes, as a request. Al Fanateer is a coastal area on the Industrial City side of Jubail. Tell us the exact place and check current visiting details." },
    { q: "Can I travel to Jubail Fish Market or Jubail Corniche?", a: "Yes. Tell us the exact place. Weekend evenings are busy at the waterfront, so a side-street drop-off may be easier." },
    { q: "Can I book a transfer to King Fahd International Airport?", a: "Yes, as a separate request. Send your flight number, time and destination, and we confirm the arrangement with you." },
    { q: "Is DMM Airport located in Jubail?", a: "No. King Fahd International Airport is in the Dammam area, about 82 km from the Jubail centre by road (an estimate)." },
    { q: "Can I arrange a return taxi from Jubail to Riyadh?", a: "Yes. Ask for the return in the same request and give us the day and time you want to leave Jubail." },
    { q: "Can a company arrange regular staff transport?", a: "Regular arrangements can be discussed. Tell us the days, times and sites, and we confirm what is possible. We do not offer a fixed shuttle timetable." },
    { q: "Do you publish fixed fares for this route?", a: "No. Fares are quoted for each request, because they depend on the vehicle, the addresses and the date. We confirm the fare before you commit." },
    { q: "Does the journey estimate include stops?", a: "No. The 4 hours 40 minutes is driving time without stops. Rest and prayer breaks are agreed with you and add time." },
  ],
  ctaHeading: "Plan Your Riyadh to Jubail Transfer",
  ctaText: "Share your pickup address, exact destination, travel date, number of passengers and luggage, and any gate details we need. Our team confirms the vehicle, driver and fare before you commit.",
  ctaButton: "Request Your Free Quote",
};
