import type { RichRoute } from "../rich-types";

/**
 * Riyadh to Arar: the fully designed route page (Northern Gateway variant, in the site's green and gold palette).
 * Distance and driving time are estimates from OpenStreetMap routing between the Riyadh centre and the Arar city centre
 * (reviewed November 2026: 1,054.5 km / 679 min Riyadh to Arar, 1,054.7 km / 680 min Arar to Riyadh, about 11 hr 20 min). The existing page figures,
 * about 1,055 km and about 11 hr 20 min, are retained because they match, and Rome2Rio (1,061 km, 11 hr 23 min) is consistent.
 * Corridor from the routing steps: Highway 65 north (King Fahd Road and the Qassim Expressway, about 185 km), the Al Majma'ah to Artawiyah road, Highway 50
 * (the Umm Al-Jamajim to Hafar Al Batin road, about 175 km), then Highway 85 north for about 530 km (the Rafha to Arar international road).
 * The route does not pass through Hail. The road named for Hafar Al Batin and the Rafha to Arar road are road names; whether the route enters those
 * towns was not confirmed, so the page does not say it passes through them.
 * From the Arar city centre (road distance, estimates): Northern Borders University about 11 km, Arar Domestic Airport (RAE) about 18 km, Umm Khinsir about 79 km,
 * Al-Uwayqilah about 199 km, Turaif about 244 km, Rafha about 287 km, Linah about 395 km. The Old Emirate Palace and the Traditional Market could not be located
 * with routing, so no distances are given for them. The site has no Arar airport page, so the page does not link one. Landmark descriptions are general
 * public knowledge (the Old Emirate Palace is described as built in 1954 in the brief); hours and access are not stated.
 * No fares, ratings, reviews, vehicle specifications, flight tracking, or site or border-access guarantees. Photos are optional: see ImageSlot.
 */
export const ararSeo = {
  title: "Riyadh to Arar Taxi | Private Long-Distance Transfer",
  description: "Book a private taxi from Riyadh to Arar. Share your pickup, destination and travel date, and get your vehicle and fare confirmed before you commit.",
  h1: "Private Taxi from Riyadh to Arar",
  lead: "A private long-distance transfer from Riyadh to Arar, the capital of the Northern Borders Region, for families, business and contract travel. Share your pickup, exact Arar destination and group size, and we confirm the vehicle, driver and fare before you commit.",
  directAnswer:
    "Gulf Elite Transport Group accepts private transport requests between Riyadh and Arar (also written Ar'ar), the capital of the Northern Borders Region in the far north, about 1,055 km by road. The drive takes about 11 hours 20 minutes without stops, so it needs a planned departure and rest breaks, and an overnight stop is an option if you prefer to split the journey. The service is used for family visits, business and contract travel and connections with Arar Domestic Airport (RAE), one way or with a return from Arar to Riyadh. Send your pickup address, exact destination in Arar, the date, time, and the number of passengers and bags. Our team checks vehicle and driver availability and confirms the vehicle, driver and fare with you before you book. A booking does not give permission to enter restricted border areas. Fares are not listed here, because each journey is quoted for your request.",
};

export const ararRich: RichRoute = {
  fromName: "Riyadh",
  toName: "Arar",
  toHref: "/taxi-saudi-arabia/northern-borders-region/arar",
  variant: "arar",
  imageFolder: "riyadh-to-arar",
  eyebrow: "Private intercity transfer · Riyadh to the Northern Borders",
  heroPoints: ["Private vehicle for family, business or contract travel", "City, airport or regional destination: tell us which", "One-way and return requests, both directions", "Vehicle, driver and fare confirmed before you commit"],
  heroAlt: "A private car on the long northern road from Riyadh towards Arar",
  facts: [
    { label: "Origin", value: "Riyadh" },
    { label: "Destination", value: "Arar, Northern Borders Region" },
    { label: "Approximate road distance", value: "About 1,055 km" },
    { label: "Approximate driving time", value: "About 11 hr 20 min, without stops" },
    { label: "Direction", value: "North, towards the Iraqi border" },
    { label: "Return", value: "Arar to Riyadh available on request" },
  ],
  factsNote: "Approximate road distance between the Riyadh centre and the Arar city centre, from OpenStreetMap routing, in light traffic and without stops. Other routing sources give nearly the same figures, about 1,055 to 1,061 km and about 11 hr 20 min. Driving time is not door-to-door time: rest, meals, prayer, fuel, traffic, weather and any checkpoints add to it. They are not a promised arrival time.",
  introHeading: "Riyadh to Arar Taxi: A Private Transfer to the Northern Gateway",
  intro: [
    "Arar is the capital of the Northern Borders Region, on a flat desert plain in the far north, near the Iraqi border. It is an administrative and transport centre for the surrounding towns. From Riyadh the road runs north for about 1,055 km, and most of the way it follows a long highway across the open desert.",
    "A private transfer lets you agree the pickup address, the vehicle and the departure time in advance, and be taken to an exact home, hotel or the airport. You can also book the trip back, from Arar to Riyadh.",
  ],
  terms: {
    heading: "Arar, the Northern Borders Region and the Towns Around It",
    intro: "Arar is a city and also the capital of a large region. Several places people mention are in the region, but they are separate from Arar.",
    items: [
      { title: "Arar city", text: "The regional capital. The old emirate palace, the traditional market, the university and most hotels are in or near it." },
      { title: "Northern Borders Region", text: "The wider northern region, with several governorates and long desert roads between them." },
      { title: "Rafha and Turaif", text: "Separate governorates, about 287 km and 244 km from Arar by road (estimates). They are not Arar neighbourhoods." },
      { title: "Linah and Umm Khinsir", text: "Heritage villages outside the city. Umm Khinsir is about 79 km from Arar and Linah about 395 km (estimates)." },
      { title: "Al-Uwayqilah", text: "A separate governorate, about 199 km from Arar by road (an estimate)." },
      { title: "Arar Domestic Airport (RAE)", text: "The airport serving Arar, about 18 km from the centre by road (an estimate). It is a separate drop-off." },
    ],
    note: "A standard Arar city booking does not include trips to other towns. Each extra destination is a separate request.",
  },
  whyHeading: "Why Take a Private Taxi from Riyadh to Arar?",
  why: [
    { title: "A private ride", text: "The car is for you and your group only, not shared with other passengers." },
    { title: "Direct intercity travel", text: "One vehicle from your Riyadh address to your Arar destination." },
    { title: "Built for families and luggage", text: "Passengers and bags planned together, with breaks agreed in advance." },
    { title: "The right vehicle for the load", text: "A sedan, SUV, van or executive car, chosen for passengers and luggage." },
    { title: "Both directions", text: "Book Riyadh to Arar, Arar to Riyadh, or both in one request." },
    { title: "Fare confirmed before you commit", text: "You see the vehicle, driver and fare for your request, and you decide whether to go ahead." },
  ],
  route: {
    heading: "The Northern Road from Riyadh to Arar",
    intro: "Mapping shows the journey leaving Riyadh on Highway 65 north, crossing to Highway 50 on the road for Hafar Al Batin, and then following Highway 85 north for the long final stage into Arar. It does not go through Hail. The driver chooses the best road on the day.",
    stops: [
      { name: "Riyadh", detail: "Start · 0 km", text: "Departure from your agreed pickup address." },
      { name: "Highway 65 north", detail: "First stage, about 185 km", text: "King Fahd Road and the Qassim Expressway, out of the capital." },
      { name: "Al Majma'ah road and Highway 50", detail: "About 230 km", text: "A link road, then the highway towards the Hafar Al Batin side." },
      { name: "Highway 85 north", detail: "Final stage, about 530 km", text: "The long road to Arar, on the Rafha to Arar international road. Rest and fuel stops can be requested in advance." },
      { name: "Arar", detail: "About 1,055 km", text: "Arrival at your home, hotel or the airport." },
    ],
    note: "A stop is not included unless you request it and we confirm it. We do not name rest stops or promise facilities.",
  },
  heritage: {
    heading: "Arriving in Arar: City Places",
    intro: "Arar is a modest regional capital. These are the places visitors and residents ask about most. Each is a different drop-off, so give us a hotel, street or map pin.",
    items: [
      { name: "Old Emirate Palace", detail: "Historic landmark", text: "A historic palace in the city, built in 1954 in the reign of King Saud. It is a landmark, not a hotel, and public access is not guaranteed. Check before you go." },
      { name: "Arar Traditional Market", detail: "Crafts and heritage", text: "A market known for traditional products and handicrafts, and for helping to keep local crafts alive. Check opening times." },
      { name: "Northern Borders University", detail: "About 11 km from the centre", text: "The regional university, about 11 km from the centre by road (an estimate)." },
      { name: "Arar city centre", detail: "Shops and offices", text: "The main shopping and government area, with hotels and restaurants." },
    ],
    note: "A landmark is not the same as a drop-off address. We do not list opening hours or fees, and a taxi booking does not include a guide.",
    slot: "old-emirate-palace",
    alt: "The Old Emirate Palace, a historic landmark in Arar",
  },
  market: {
    heading: "Arar's Place in the North",
    intro: "Arar is the administrative capital of the Northern Borders Region and an important northern transport centre. Its history includes the Tapline oil pipeline, which ran across this part of the north.",
    items: [
      { title: "A regional capital", text: "Government offices, a university and services for the surrounding towns are based here." },
      { title: "A northern crossroads", text: "Long highways link Arar with Riyadh, Sakaka and the other northern cities." },
      { title: "A long history on the route", text: "The old pipeline and its stations are part of the area's twentieth-century story." },
      { title: "Our role", text: "We are a private transport service. We have no involvement in industry or government business here." },
    ],
    note: "This is local background only. It does not mean any special access or service.",
  },
  eastern: {
    heading: "Beyond Arar City: Regional Trips",
    intro: "Some passengers travel on to other towns and heritage villages in the region. These are separate trips, each with its own route, availability and fare.",
    items: [
      { name: "Umm Khinsir Historical Village", detail: "About 79 km from Arar", text: "A historic village outside the city, in the desert. It needs its own plan, and the final approach can be on rough ground." },
      { name: "Al-Uwayqilah", detail: "About 199 km from Arar", text: "A separate governorate to the south-east, on the road back towards the south." },
      { name: "Turaif", detail: "About 244 km from Arar", text: "A separate governorate to the north-west, near the border with Jordan." },
      { name: "Rafha", detail: "About 287 km from Arar", text: "A separate governorate to the south-east. It is not part of Arar." },
      { name: "Linah Heritage Village", detail: "About 395 km from Arar", text: "A heritage village with a heritage market and the King Abdulaziz Historical Palace. Far from Arar, so a long journey of its own." },
    ],
    note: "A regional drop-off is not included in the Arar city fare. Distances are estimates by road from the Arar city centre.",
  },
  business: {
    heading: "Border Areas and Controlled Access",
    intro: "Arar is in the Northern Borders Region. Some areas near the border, and some sites, have controlled access, set by the authorities.",
    items: [
      { title: "Say where you are going", text: "Tell us the exact village, site or address, and a map pin." },
      { title: "Confirm access yourself", text: "Check with the relevant authority or host that you may enter, before the day." },
      { title: "Carry your documents", text: "Bring the identification and any permission the site or checkpoint needs." },
      { title: "Expect checkpoints", text: "Routine checks can add time on roads in the north." },
      { title: "We confirm what we can serve", text: "We check whether a requested drop-off is one we can serve, before you commit." },
      { title: "Plan the return separately", text: "Confirm the return pickup point and time with us." },
    ],
    note: "A taxi booking does not give access authorisation. The booking is for the agreed, accessible destination, and the authorities decide who may enter restricted areas.",
  },
  airport: {
    heading: "Arar Airport Transfers: Arar Domestic Airport (RAE)",
    intro: "Arar Domestic Airport (RAE) serves Arar and the region. It is outside the city centre, about 18 km by road (an estimate), so it is a separate drop-off from the city.",
    items: [
      { title: "A separate location", text: "The airport is not in the city centre. A ride to or from it has its own timing, and depends on your destination." },
      { title: "Not Riyadh's airport", text: "King Khalid International Airport (RUH) is in Riyadh. RAE is the airport for Arar. Check which one your ticket uses." },
      { title: "What to send us", text: "Give your flight number, date, time and terminal, the number of passengers and bags, and your Arar destination." },
    ],
    note: "The time depends on the terminal, your destination and traffic. Pickup arrangements are confirmed with you for each request. We do not promise flight tracking, delay monitoring or a fixed waiting time.",
    href: "/taxi-saudi-arabia/northern-borders-region/arar",
    slot: "airport",
    alt: "Arar Domestic Airport (RAE), the airport serving Arar",
  },
  cities: {
    heading: "Other Northern Routes",
    intro: "Other northern cities are separate destinations, each with its own distance and fare.",
    items: [
      { name: "Sakaka", detail: "In Al Jouf Region", text: "The capital of Al Jouf, on a different road. See the Riyadh to Sakaka ride.", href: "/taxi-saudi-arabia/routes/riyadh-to-sakaka" },
      { name: "Hail", detail: "Not on this road", text: "A large northern city. The route to Arar does not go through it. See the Riyadh to Hail ride.", href: "/taxi-saudi-arabia/routes/riyadh-to-hail" },
      { name: "Hafar Al Batin", detail: "In the Eastern Province", text: "A northern border city on the road side of the journey. See the Riyadh to Hafar Al Batin ride.", href: "/taxi-saudi-arabia/routes/riyadh-to-hafar-al-batin" },
    ],
    note: "A drop-off in another city is not included in the Arar fare.",
  },
  umrah: {
    heading: "Families and Long-Distance Comfort",
    intro: "Many passengers on this road are families visiting relatives. A long drive goes better when it is planned for.",
    items: [
      { title: "Departure time", text: "Plan an early start, so most of the driving is in daylight." },
      { title: "Breaks", text: "Agree your rest stops in advance, and tell us if you have children or older passengers." },
      { title: "Luggage", text: "Count every bag, so the vehicle fits the group." },
      { title: "Overnight stop", text: "An overnight stop is optional and not required. If you want one, it is arranged and confirmed separately." },
    ],
    note: "We do not promise child seats or specific luggage space unless we confirm them with you for your request.",
    slot: "family",
    alt: "A family travelling together by private car from Riyadh to Arar",
  },
  vehiclesHeading: "Choose a Vehicle for a Long Journey",
  vehiclesIntro: "The vehicle depends on the number of passengers, the amount of luggage, the date, your requested category and availability. On a trip this long, comfort matters. We confirm the vehicle with you before you book.",
  vehicles: [
    { slot: "sedan", homePhoto: "sedan", name: "Sedan", best: "One or two travellers with light luggage", text: "A private car for a small group. Suitable when you travel light.", alt: "Private sedan for a Riyadh to Arar trip" },
    { slot: "suv", homePhoto: "suv", name: "SUV", best: "Families and extra luggage", text: "More room for passengers and bags. Suitable for a family on a long road journey.", alt: "Private SUV for a family travelling from Riyadh to Arar" },
    { slot: "van", homePhoto: "family-van", name: "Van or minibus", best: "Larger groups", text: "For groups who want to travel together with their luggage. Give us the group size and we confirm what fits.", alt: "Private van for a group travelling from Riyadh to Arar" },
    { slot: "executive", name: "Executive car", best: "Formal arrivals", text: "A chauffeur-driven premium car for guests who want extra comfort. Subject to availability.", alt: "Executive car for a Riyadh to Arar transfer" },
  ],
  dropHeading: "Where in Arar Are You Going?",
  dropIntro: "Send the exact address, hotel or site, and a map pin, and we confirm the best drop-off point with you.",
  drops: [
    { name: "Homes and hotels", text: "Name the district and send a pin." },
    { name: "City places", text: "Name the site. The old emirate palace, the market and the university are each a separate drop-off." },
    { name: "Airport or region", text: "Say which. RAE, Umm Khinsir, Turaif and Rafha are each a separate journey." },
  ],
  dropAlt: "Arar on its desert plain in the Northern Borders Region, the destination of a private taxi from Riyadh",
  pickupHeading: "Common Pickup Areas in Riyadh",
  pickupIntro: "Journeys start from your own address. Send the exact address or a map pin when you request a quote.",
  pickups: [
    { name: "Olaya", text: "Hotels, offices and apartments in central Riyadh.", href: "/riyadh-taxi-service/olaya-taxi-service" },
    { name: "Al Malaz", text: "An established district in the east of central Riyadh.", href: "/riyadh-taxi-service/al-malaz-taxi-service" },
    { name: "Al Nakheel", text: "A residential district in the north-west of the city.", href: "/riyadh-taxi-service/al-nakheel-taxi-service" },
    { name: "King Khalid International Airport (RUH)", text: "The main airport, in the north. Send your flight number and terminal.", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport" },
    { name: "Hotels and homes", text: "Any hotel, apartment or house in Riyadh." },
  ],
  pickupAlt: "Riyadh skyline where private transfers to Arar begin",
  planHeading: "Planning Your Riyadh to Arar Journey",
  plan: [
    { title: "Distance and time", text: "The road is about 1,055 km, about 11 hours 20 minutes of driving without stops. These are estimates. With rest, meals and prayer breaks, plan for roughly 13 hours door to door." },
    { title: "Departure and breaks", text: "Start early and agree your rest stops with us in advance. We do not name rest stops or promise facilities." },
    { title: "Passengers and luggage", text: "Count every passenger and every bag, so the vehicle has room for the group." },
  ],
  mapQuery: { from: "Riyadh, Saudi Arabia", to: "Arar, Saudi Arabia" },
  highwayAlt: "The highway from Riyadh to Arar across the northern desert",
  whoHeading: "Who Travels This Route?",
  who: [
    { title: "Families visiting relatives", text: "Families travelling to the north for a stay." },
    { title: "Business and contract travellers", text: "Professionals travelling to the Northern Borders." },
    { title: "Visitors to Arar", text: "People visiting the city and its heritage." },
    { title: "Travellers with luggage", text: "Groups with several bags." },
    { title: "Airport passengers", text: "Passengers connecting with RAE." },
    { title: "People on the return trip", text: "Travellers who need the ride from Arar back to Riyadh." },
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
    { title: "Border areas", text: "Check access to restricted areas yourself." },
  ],
  relatedHeading: "Related Routes and Pages",
  related: [
    { name: "Riyadh to Sakaka", href: "/taxi-saudi-arabia/routes/riyadh-to-sakaka", text: "The capital of Al Jouf, in the north." },
    { name: "Riyadh to Hail", href: "/taxi-saudi-arabia/routes/riyadh-to-hail", text: "A northern city, on a different road." },
    { name: "Riyadh to Hafar Al Batin", href: "/taxi-saudi-arabia/routes/riyadh-to-hafar-al-batin", text: "A northern border city in the Eastern Province." },
    { name: "Riyadh to Tabuk", href: "/taxi-saudi-arabia/routes/riyadh-to-tabuk", text: "A long ride to the north-west." },
    { name: "Arar taxi service", href: "/taxi-saudi-arabia/northern-borders-region/arar", text: "Rides within and around Arar." },
    { name: "Riyadh taxi service", href: "/riyadh-taxi-service", text: "Pickups and rides in Riyadh." },
  ],
  faqHeading: "Frequently Asked Questions: Riyadh to Arar Taxi",
  faq: [
    { q: "How far is Arar from Riyadh by road?", a: "About 1,055 km between the two city centres. The exact distance depends on your pickup and your Arar destination." },
    { q: "How long does a taxi from Riyadh to Arar take?", a: "Driving takes about 11 hours 20 minutes without stops, in light traffic. Breaks, meals, prayer, traffic and checkpoints add time. We do not promise an arrival time." },
    { q: "Can I book a private taxi from Arar to Riyadh?", a: "Yes. Ask for the return in the same request, or book it separately, and give us the day and time you want to leave Arar." },
    { q: "Can I request a stop during the journey?", a: "Yes. Tell us when you request the quote, and agree your rest stops in advance. We do not name rest stops or promise facilities." },
    { q: "Can I book a transfer to Arar Domestic Airport (RAE)?", a: "Yes, as a request. The airport is about 18 km from the city centre (an estimate). Send your flight number and time. We do not promise flight tracking." },
    { q: "Can I travel with family and luggage?", a: "Yes. Tell us how many passengers and bags, and we confirm a vehicle that fits. An SUV or a van suits most families." },
    { q: "Can I request an SUV or van?", a: "Yes. Choose the category in your request. We confirm the vehicle according to your passengers, luggage, date and availability." },
    { q: "Can a taxi take me to a destination outside Arar city?", a: "Yes, as a separate request. Towns such as Rafha, Turaif and Al-Uwayqilah, and villages such as Umm Khinsir, need their own route, availability and fare." },
    { q: "Can I travel near the Saudi border?", a: "Some places near the border have controlled access. A taxi booking does not give permission to enter. Check access yourself, and we confirm whether we can serve the drop-off." },
    { q: "How is the fare confirmed?", a: "Fares are quoted for each request, because they depend on the vehicle, the addresses and the date. We confirm the fare before you commit." },
    { q: "Do I need to arrange an overnight stop?", a: "No. The drive is about 11 hours 20 minutes. An overnight stop is optional, and if you want one, it is arranged and confirmed separately." },
  ],
  ctaHeading: "Plan Your Private Riyadh to Arar Journey",
  ctaText: "Share your Riyadh pickup address, exact Arar destination, date and time, number of passengers, luggage, and any airport or regional details. Our team confirms the vehicle, driver and fare before you commit.",
  ctaButton: "Request Your Free Quote",
};
