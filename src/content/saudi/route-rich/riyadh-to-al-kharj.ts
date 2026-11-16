import type { RichRoute } from "../rich-types";

/**
 * Riyadh to Al Kharj: the fully designed route page (oasis and business corridor variant).
 * Distance and driving time are estimates from OpenStreetMap routing between the Riyadh centre and Al-Saih, the urban centre of
 * Al Kharj (reviewed November 2026: about 85 km and 73 min in both directions; the old page figure of 95 km / 1 hr 20 min was replaced).
 * From the Al-Saih centre (road distance, estimates): Prince Sattam bin Abdulaziz University about 6 km, Al-Dilam about 26 km,
 * Al Kharj Industrial City about 39 km, Prince Sultan Air Base about 32 km (controlled access).
 * Local facts (palace built in 1940 in Al-Aziziyah neighbourhood, Al-Saih; springs; Ain Al-Dila as an archaeological site; farms and dairy)
 * come from Saudipedia. No fares, ratings, reviews, vehicle specifications, contracts with named sites, or access guarantees.
 * Photos are optional: see ImageSlot.
 */
export const kharjSeo = {
  title: "Riyadh to Al Kharj Taxi | Private Transfers",
  description: "Book a private Riyadh to Al Kharj taxi for commuting, business, farm visits and family travel. Request a vehicle and confirm your fare first.",
  h1: "Riyadh to Al Kharj Taxi – Private City Transfers",
  lead: "A private road transfer between Riyadh and Al Kharj for commuting, business trips, farm and site visits and family journeys. Share your pickup, destination and group size, and we confirm the vehicle, driver and fare before you commit.",
  directAnswer:
    "Gulf Elite Transport Group accepts private transport requests between Riyadh and Al Kharj in Riyadh Region, Saudi Arabia, about 85 km by road. The drive takes about 1 hour 15 minutes without stops. The service is used for daily commuting, business travel, visits to farms and industrial sites, and family journeys, one way or with a same-day return. Send your pickup address, destination, date, time, and the number of passengers and bags. Our team checks vehicle and driver availability and confirms the vehicle, driver and fare with you before you book. Fares are not listed here, because each journey is quoted for your request.",
};

export const kharjRich: RichRoute = {
  fromName: "Riyadh",
  toName: "Al Kharj",
  toHref: "/taxi-saudi-arabia/riyadh-region/al-kharj",
  variant: "kharj",
  imageFolder: "riyadh-to-al-kharj",
  eyebrow: "Private intercity transfer · Riyadh to Al Kharj",
  heroPoints: ["Private vehicle for commuting, business or family travel", "Pickup and drop-off at your named address or gate", "One-way, return and same-day return requests", "Vehicle, driver and fare confirmed before you commit"],
  heroAlt: "A private car on the road from Riyadh to the Al Kharj oasis",
  facts: [
    { label: "Origin", value: "Riyadh" },
    { label: "Destination", value: "Al Kharj, Riyadh Region" },
    { label: "Approximate road distance", value: "About 85 km" },
    { label: "Approximate driving time", value: "About 1 hr 15 min, without stops" },
    { label: "Direction", value: "South-east of Riyadh" },
    { label: "Service", value: "Private intercity transport, both directions" },
  ],
  factsNote: "Approximate road distance between the Riyadh centre and Al-Saih, the centre of Al Kharj, from OpenStreetMap routing, for light traffic and without stops. Other routing sources give slightly different figures. The actual distance and time depend on your exact addresses, the road, traffic and stops, and a site on the edge of the governorate adds distance. They are not a promised arrival time.",
  introHeading: "Riyadh to Al Kharj Taxi: A Private Transfer on a Busy Corridor",
  intro: [
    "Al Kharj lies about 85 km south-east of Riyadh and is one of the largest governorates in Riyadh Region. It is known for farms, dairy and industry, and many people travel between the two cities every day for work, business and family reasons.",
    "A private transfer lets you agree the pickup address, the vehicle and the time in advance, and be taken to an exact address, a hotel, an office or a named gate. Because the journey is short, a return on the same day is easy to plan.",
  ],
  terms: {
    heading: "Al Kharj, Al-Saih and Al-Dilam: Where Exactly?",
    intro: "These names are often mixed up, and the exact place changes the distance and the fare.",
    items: [
      { title: "Al Kharj governorate", text: "A large area of farms, towns and industry, not a single neighbourhood." },
      { title: "Al-Saih", text: "The urban and administrative centre of Al Kharj. The distance on this page is measured to Al-Saih." },
      { title: "Al-Dilam", text: "A separate locality, about 26 km from Al-Saih by road (an estimate). It is not another name for Al Kharj city." },
      { title: "Farms and industrial areas", text: "Many sites lie outside the urban centre, so give the site name, the gate and a map pin." },
    ],
    note: "Tell us the exact address when you request a quote. A drop-off far from Al-Saih is quoted for your request.",
  },
  whyHeading: "Why Take a Private Taxi from Riyadh to Al Kharj?",
  why: [
    { title: "A private ride", text: "The car is for you and your group only, not shared with other passengers." },
    { title: "Pickup and drop-off at your address", text: "From a home, hotel or office in Riyadh to an address, gate or site in Al Kharj." },
    { title: "The right vehicle for your group", text: "A sedan, SUV, van or executive car, chosen for passengers and luggage." },
    { title: "A same-day return that is easy to plan", text: "At this distance, a visit with a return the same day is realistic." },
    { title: "Business and site visits", text: "Plan the departure around a meeting or a site appointment." },
    { title: "Fare confirmed before you commit", text: "You see the vehicle, driver and fare for your request, and you decide whether to go ahead." },
  ],
  business: {
    heading: "The Riyadh to Al Kharj Commuter and Business Corridor",
    intro: "This is a working road. People travel it for jobs, meetings, site work and family, and the same service can be arranged for each of them.",
    items: [
      { title: "Daily work and commuting", text: "Regular travel arrangements can be discussed. Tell us the days, times and pickup points, and we confirm what is possible." },
      { title: "Business meetings", text: "Give the office, the building and the meeting time, and we plan the departure to arrive before it." },
      { title: "Contractors and site teams", text: "Several colleagues can travel in one vehicle from the same Riyadh address to the same site gate." },
      { title: "Family and personal journeys", text: "Visits to relatives, with luggage, children or older passengers, in a vehicle that fits them." },
    ],
    note: "We do not offer a fixed shuttle timetable or employee contract unless we confirm it with you. Every arrangement is confirmed for your request.",
  },
  market: {
    heading: "An Oasis of Farms, Dairy and Springs",
    intro: "Al Kharj has long been an agricultural area, fed by springs, and today it is also known for dairy and food production.",
    items: [
      { title: "Farms and palm groves", text: "The oasis grows vegetables, wheat and dates, and farms spread across the governorate." },
      { title: "Dairy and food industries", text: "Al-Saih is often called the dairy capital of the Kingdom, with dairy factories and poultry farms around it." },
      { title: "Springs that shaped the land", text: "Natural springs were historically important for farms and orchards, and some are now visitor landmarks." },
      { title: "A growing city", text: "Al Kharj is the second-largest governorate in Riyadh Region, with a university and an industrial city." },
    ],
    note: "This is general background, from Saudipedia. We provide transport only, not farm tours or visits arranged with farm owners.",
  },
  eastern: {
    heading: "Places in Al Kharj Visitors Ask About",
    intro: "Most rides are for work or family, but some passengers want to see the local sites. Each extra stop is a separate request, confirmed with you.",
    items: [
      { name: "King Abdulaziz Historical Palace", detail: "Al-Aziziyah neighbourhood, Al-Saih", text: "A historic palace built in 1940 on the order of King Abdulaziz, with two floors and Islamic architecture. It is overseen by the Heritage Commission. Check visiting arrangements before you go." },
      { name: "The historic springs", detail: "Al-Saih, Mawan, Al-Khubbi (Al-Khabi), Al-Dhahi", text: "Springs that were important for Al Kharj's farms and orchards. Access to each one varies, and we do not promise access to any spring." },
      { name: "Al-Kharj Park", detail: "A family recreation area", text: "A park for families, reported by the Saudi Press Agency to have opened recently. Check current visitor information before you plan a visit." },
      { name: "Ain Al-Dila", detail: "Archaeological site in the west of the oasis", text: "An archaeological site with traces of settlement thousands of years old. It is not a standard visitor attraction, and access is not confirmed." },
    ],
    note: "We do not offer tours or guides, and we do not promise waiting time or access to any site unless we confirm it with you.",
  },
  sites: {
    heading: "Farm, Factory and Industrial-Site Transfers",
    intro: "Many passengers travel to a farm, a factory or a work site. The more exactly you describe the place, the better we can plan the journey.",
    items: [
      { title: "Send the site name and the gate", text: "Name the farm, factory or company, the gate or entrance, and a map pin." },
      { title: "Give a contact", text: "A name and phone number for the person expecting you helps the driver at the gate." },
      { title: "Check permission in advance", text: "Private and controlled sites decide who may enter. Arrange permission with the site operator before the day." },
      { title: "Plan the return", text: "Tell us when you will finish, so the ride back can be arranged with the outward journey." },
    ],
    note: "We do not hold access authorisation for any site and have no contracts with named farms or factories. Access is always the site operator's decision.",
    slot: "farms",
    alt: "Farmland and palm groves in the Al Kharj oasis",
  },
  vehiclesHeading: "Choose a Vehicle for Your Journey",
  vehiclesIntro: "The vehicle depends on the number of passengers, the amount of luggage, whether the trip is for business or family, your requested category and availability. We confirm it with you before you book.",
  vehicles: [
    { slot: "sedan", homePhoto: "sedan", name: "Sedan", best: "Commuters and business travellers", text: "A private car for one to a few passengers with light luggage.", alt: "Private sedan for a Riyadh to Al Kharj trip" },
    { slot: "suv", homePhoto: "suv", name: "SUV", best: "Families and extra luggage", text: "More room for passengers and bags. Suitable for a family visiting relatives.", alt: "Private SUV for a family travelling from Riyadh to Al Kharj" },
    { slot: "van", homePhoto: "family-van", name: "Van or minibus", best: "Teams and groups", text: "For site teams and groups who want to travel together. Give us the group size and we confirm what fits.", alt: "Private van for a team travelling from Riyadh to Al Kharj" },
    { slot: "executive", name: "Executive car", best: "Formal arrivals", text: "A chauffeur-driven premium car for guests who want extra comfort. Subject to availability.", alt: "Executive car for a Riyadh to Al Kharj transfer" },
  ],
  dropHeading: "Where in Al Kharj Are You Going?",
  dropIntro: "Send the address, the site name or a map pin, and we confirm the best drop-off point with you.",
  drops: [
    { name: "Al-Saih and the city centre", text: "Hotels, offices and homes in the urban centre of Al Kharj." },
    { name: "Prince Sattam bin Abdulaziz University", text: "About 6 km from the Al-Saih centre (an estimate). Name the faculty or the gate." },
    { name: "Al Kharj Industrial City", text: "About 39 km from the Al-Saih centre (an estimate). Give the company name and the gate." },
    { name: "Farms and villages", text: "Addresses outside the city can be hard to find. Send a map pin and a phone contact." },
  ],
  dropNote: "Some sites have controlled entrances, and military and industrial areas are controlled by their operators. We confirm the access point with you before the journey.",
  dropAlt: "Al Kharj, the destination of a private taxi from Riyadh",
  pickupHeading: "Common Pickup Areas in Riyadh",
  pickupIntro: "Journeys start from your own address. Send the exact address or a map pin when you request a quote.",
  pickups: [
    { name: "Olaya", text: "Hotels, offices and apartments in central Riyadh.", href: "/riyadh-taxi-service/olaya-taxi-service" },
    { name: "Al Malaz", text: "An established district in the east of central Riyadh.", href: "/riyadh-taxi-service/al-malaz-taxi-service" },
    { name: "Al Nakheel", text: "A residential district in the north-west of the city.", href: "/riyadh-taxi-service/al-nakheel-taxi-service" },
    { name: "King Khalid International Airport (RUH)", text: "The main airport, in the north. Send your flight number and terminal.", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport" },
    { name: "Hotels and homes", text: "Any hotel, apartment or house in Riyadh." },
  ],
  pickupAlt: "Riyadh skyline where private transfers to Al Kharj begin",
  planHeading: "Planning the Journey from Riyadh to Al Kharj",
  plan: [
    { title: "Distance and time", text: "The road is about 85 km, about 1 hour 15 minutes of driving without stops. These are estimates. Your exact addresses and the traffic change them." },
    { title: "Rush hours", text: "The road is busiest in the morning and late afternoon, so allow extra time for a morning meeting." },
    { title: "Passengers and luggage", text: "Count every passenger and every bag, so the vehicle has room for the group." },
  ],
  mapQuery: { from: "Riyadh, Saudi Arabia", to: "Al-Saih, Al Kharj, Saudi Arabia" },
  highwayAlt: "The road between Riyadh and Al Kharj",
  cities: {
    heading: "Nearby Places and Distances in Al Kharj",
    intro: "Distances inside the governorate vary a lot. These are estimated road distances from the Al-Saih centre.",
    items: [
      { name: "Prince Sattam bin Abdulaziz University", detail: "About 6 km from Al-Saih", text: "The university campus in Al Kharj." },
      { name: "Al-Dilam", detail: "About 26 km from Al-Saih", text: "A separate locality, not Al Kharj city." },
      { name: "Al Kharj Industrial City", detail: "About 39 km from Al-Saih", text: "A large industrial area, with controlled entrances." },
    ],
    note: "We do not publish distances for individual farms or factories. Distances are estimates, and the fare is confirmed with you.",
  },
  whoHeading: "Who Uses This Route?",
  who: [
    { title: "Regular commuters", text: "People who travel between Al Kharj and Riyadh for work." },
    { title: "Business travellers", text: "Visitors with meetings and appointments in Al Kharj." },
    { title: "Contractors", text: "Site teams working in Al Kharj." },
    { title: "Farm and factory visitors", text: "Visitors going to farms, dairy and industrial sites." },
    { title: "Families", text: "Families visiting relatives in Al Kharj." },
    { title: "Small groups and visitors", text: "Groups travelling together, and visitors exploring Al Kharj." },
  ],
  stepsHeading: "How Booking Works",
  steps: [
    { title: "Enter your locations", text: "Pickup and destination." },
    { title: "Select date and time", text: "The day and time you want to travel." },
    { title: "Add passengers and luggage", text: "How many people and bags are travelling." },
    { title: "Continue with your details", text: "Choose the vehicle and add your contact details in the next steps of the form." },
    { title: "Receive the confirmation", text: "Our team checks availability and confirms the vehicle, driver and fare before you commit." },
  ],
  infoHeading: "Before You Travel",
  infoIntro: "A few points that make the journey easier.",
  info: [
    { title: "Fare", text: "Fares are not published, because each journey is quoted for your request." },
    { title: "Exact addresses", text: "Send a map pin or landmark for the pickup and drop-off." },
  ],
  relatedHeading: "Related Routes and Pages",
  related: [
    { name: "Riyadh to Al Hofuf", href: "/taxi-saudi-arabia/routes/riyadh-to-al-hofuf", text: "A ride east to the Al-Ahsa oasis." },
    { name: "Riyadh to Dammam", href: "/taxi-saudi-arabia/routes/riyadh-to-dammam", text: "The business route to the Gulf coast." },
    { name: "Riyadh to Al Khobar", href: "/taxi-saudi-arabia/routes/riyadh-to-al-khobar", text: "A ride to the Gulf coast, next to Dammam." },
    { name: "Riyadh to Buraydah", href: "/taxi-saudi-arabia/routes/riyadh-to-buraydah", text: "A ride north-west to Qassim." },
    { name: "Riyadh to Hail", href: "/taxi-saudi-arabia/routes/riyadh-to-hail", text: "A long ride north to Hail." },
    { name: "Al Kharj taxi service", href: "/taxi-saudi-arabia/riyadh-region/al-kharj", text: "Rides within and around Al Kharj." },
    { name: "Riyadh taxi service", href: "/riyadh-taxi-service", text: "Pickups and rides in Riyadh." },
  ],
  faqHeading: "Frequently Asked Questions: Riyadh to Al Kharj Taxi",
  faq: [
    { q: "How far is Al Kharj from Riyadh by road?", a: "About 85 km between the Riyadh centre and Al-Saih, the centre of Al Kharj. The exact distance depends on your addresses." },
    { q: "How long does a taxi from Riyadh to Al Kharj take?", a: "Driving takes about 1 hour 15 minutes without stops, in light traffic. Rush hours, stops and a site far from the centre add time. We do not promise an arrival time." },
    { q: "Can I book a private taxi from Riyadh to Al Kharj?", a: "Yes. Send your pickup, destination, date, time and group size, and we confirm the vehicle, driver and fare before you commit." },
    { q: "Can I arrange a return taxi from Al Kharj to Riyadh?", a: "Yes. Ask for the return in the same request and give us the day and time you want to leave Al Kharj." },
    { q: "Can I book regular transport between Riyadh and Al Kharj?", a: "Regular arrangements can be discussed. Tell us the days, times and pickup points, and we confirm what is possible. We do not offer a fixed shuttle timetable." },
    { q: "Can a taxi take me to an agricultural farm in Al Kharj?", a: "Yes, if you give us the farm's name, gate and a map pin. Entry is the farm owner's decision, so arrange permission in advance." },
    { q: "Can I arrange transport to an industrial or factory site?", a: "Yes, as a request. Give the company name and the gate. Industrial and military areas are controlled by their operators, and we cannot promise access." },
    { q: "What vehicle options can I request?", a: "A sedan, an SUV, a van or minibus, or an executive car. We confirm the vehicle after you tell us how many passengers and bags you have." },
    { q: "Can I arrange a same-day return journey?", a: "Yes. The distance makes it practical. Tell us the time you will finish, and we plan the return with the outward ride." },
    { q: "Can I book a private car for business travel?", a: "Yes. Give us the office or site address and the time you must arrive, and we plan the departure around it." },
    { q: "Can I provide a specific pickup gate or facility address?", a: "Yes, and it helps. Send the gate or entrance, a map pin and a phone contact for the person expecting you." },
    { q: "How do I get a quote for a Riyadh to Al Kharj taxi?", a: "Fill in the form on this page with your route, date, time and group size. Our team replies with the vehicle, driver and fare, and you decide whether to go ahead." },
  ],
  ctaHeading: "Arrange Your Private Journey from Riyadh to Al Kharj",
  ctaText: "Share your pickup address, destination, travel date, number of passengers and luggage, and any site gate we need to know. Our team confirms the vehicle, driver and fare before you commit.",
  ctaButton: "Request Your Free Quote",
};
