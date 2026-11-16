import type { RichRoute } from "../rich-types";

/**
 * Riyadh to Taif: the fully designed route page (mountain escape and rose heritage variant).
 * Distance and driving time are estimates from OpenStreetMap routing between the two city centres (reviewed November 2026:
 * about 790 km and 518 min, about 791 km and 521 min back; the old page figures of 790 km and 8 hr 40 min are confirmed).
 * The routed road follows Route 65 then Route 40 and passes Al-Quwayiyah, Al-Humiyat and Dhalm (each within about 1 km of the road).
 * Published road-authority estimates are slightly lower (7 to 8 hours); the page keeps the routed figure and says times vary.
 * From the Taif centre (road distance, estimates): Shubra Palace about 3 km, Abdullah ibn Abbas Mosque about 4 km, Al Hada about 20 km,
 * Taif International Airport about 36 km. Al Shafa, Jabal Daka, Souq Okaz and Al Rudaf Park could not be located reliably, so no distances are given.
 * No fares, ratings, reviews, vehicle specifications, flight tracking, opening hours, rose-season dates or access guarantees.
 * Photos are optional: see ImageSlot.
 */
export const taifSeo = {
  title: "Riyadh to Taif Taxi | Private Mountain Transfers",
  description: "Book a private Riyadh to Taif taxi for family travel, Al Hada, Al Shafa, rose farms and airport transfers. Confirm your fare before you travel.",
  h1: "Private Taxi from Riyadh to Taif",
  lead: "Comfortable private travel from Riyadh to Taif's mountain city and its highland destinations. Share your pickup, destination and group size, and we confirm the vehicle, driver and fare before you commit. One-way and return journeys can be requested.",
  directAnswer:
    "Gulf Elite Transport Group accepts private transport requests between Riyadh and Taif in Makkah Region, Saudi Arabia, about 790 km by road. The drive takes about 8 hours 40 minutes without stops, so most passengers plan it as a full day. The main road passes Al-Quwayiyah, Al-Humiyat and Dhalm. The service is used for family holidays, mountain resort stays, visits to Al Hada, Al Shafa and the rose farms, and airport transfers, one way or with a return. Send your pickup address, destination, date, time, and the number of passengers and bags. Our team checks vehicle and driver availability and confirms the vehicle, driver and fare with you before you book. Fares are not listed here, because each journey is quoted for your request.",
};

export const taifRich: RichRoute = {
  fromName: "Riyadh",
  toName: "Taif",
  toHref: "/taxi-saudi-arabia/makkah-region/taif",
  variant: "taif",
  imageFolder: "riyadh-to-taif",
  eyebrow: "Private intercity transfer · Riyadh to the Taif highlands",
  heroPoints: ["Private vehicle for family and group travel", "Hotel, resort and airport transfers", "One-way and return requests", "Vehicle, driver and fare confirmed before you commit"],
  heroAlt: "A private car on the road from Riyadh towards the Sarawat mountains and Taif",
  facts: [
    { label: "Origin", value: "Riyadh" },
    { label: "Destination", value: "Taif, Makkah Region" },
    { label: "Approximate road distance", value: "About 790 km" },
    { label: "Approximate driving time", value: "About 8 hr 40 min, without stops" },
    { label: "Direction", value: "South-west of Riyadh" },
    { label: "Main road", value: "Through Al-Quwayiyah, Al-Humiyat and Dhalm" },
  ],
  factsNote: "Approximate road distance between the two city centres, from OpenStreetMap routing, for light traffic and without rest stops. This is road distance, not straight-line distance. Published estimates for this road differ a little, from about 7 to 8 hours, because of routing and traffic assumptions. The actual time depends on the road taken, traffic, weather, stops and your exact addresses. It is not a promised arrival time.",
  introHeading: "Riyadh to Taif Taxi: A Private Road Transfer to the Mountains",
  intro: [
    "Taif sits high in the Sarawat mountains in Makkah Region, so it is much cooler than Riyadh in summer. Families travel there for the mountain views, the rose farms, parks and resorts, and for visits to relatives.",
    "The road is long, so most passengers plan it in advance. A private transfer lets you agree the pickup address, the vehicle and the departure time, and be taken to an exact hotel, resort or home in Taif, Al Hada or Al Shafa.",
  ],
  terms: {
    heading: "Taif, Makkah and Jeddah: Separate Places",
    intro: "Taif is in Makkah Region, but it is a separate city from Makkah and Jeddah. Please tell us the exact place you want to reach.",
    items: [
      { title: "Taif city", text: "The main city, with Shubra Palace, historic markets and the city centre. This is the destination on this page." },
      { title: "Taif Governorate", text: "A wider area around the city. Al Hada and Al Shafa are highland destinations in it, not districts of the city centre." },
      { title: "Makkah and Jeddah", text: "Separate cities. A ride on to either is an additional leg, and is subject to confirmation." },
      { title: "Entering Makkah", text: "Entry to Makkah is restricted to Muslims. Check the current official requirements before you plan a Makkah leg." },
    ],
    note: "A Riyadh to Taif booking does not include an onward transfer. Any extra leg is confirmed separately with you.",
  },
  whyHeading: "Why Take a Private Taxi from Riyadh to Taif?",
  why: [
    { title: "A private ride", text: "The car is for you and your group only, not shared with other passengers." },
    { title: "Direct to your hotel or resort", text: "One vehicle takes you from your address in Riyadh to your hotel, resort or home in Taif." },
    { title: "The right vehicle for your group", text: "A sedan, SUV, van or executive car, chosen for passengers and luggage." },
    { title: "A long journey, planned in advance", text: "Departure time and stops are discussed with you before you book." },
    { title: "Return journey requests", text: "Ask for the ride back from Taif to Riyadh in the same request." },
    { title: "Fare confirmed before you commit", text: "You see the vehicle, driver and fare for your request, and you decide whether to go ahead." },
  ],
  route: {
    heading: "The Road from Riyadh to Taif",
    intro: "The journey leaves Riyadh to the west and crosses the central plateau towards the Sarawat mountains. The main road passes Al-Quwayiyah, Al-Humiyat and Dhalm before the climb to Taif. The driver chooses the road on the day, and your plan is confirmed with you.",
    stops: [
      { name: "Riyadh", detail: "Start", text: "Departure from your agreed pickup address." },
      { name: "Al-Quwayiyah", detail: "On the road", text: "A town on the road west of Riyadh." },
      { name: "Al-Humiyat", detail: "On the road", text: "A settlement on the long middle stretch of the journey." },
      { name: "Dhalm", detail: "On the road", text: "A town on the road in the western part of the journey." },
      { name: "Taif", detail: "Arrival", text: "Arrival in the city, or on to your hotel or resort in the highlands." },
    ],
    note: "The main road does not automatically pass Al Hada or Al Shafa. They are reached from Taif, and the exact route is confirmed with you. A stop is not included unless you request it and we confirm it.",
  },
  planHeading: "Planning Your Riyadh to Taif Journey",
  plan: [
    { title: "Distance and time", text: "The road is about 790 km, about 8 hours 40 minutes of driving without stops. These are estimates. With rest and prayer breaks, plan for a full day." },
    { title: "Weather and the climb", text: "The last stretch climbs into the mountains. Fog and rain can slow the road, especially at Al Hada and Al Shafa." },
    { title: "Passengers and luggage", text: "Count every passenger and every bag, and tell us if you carry extra holiday luggage." },
  ],
  mapQuery: { from: "Riyadh, Saudi Arabia", to: "Taif, Saudi Arabia" },
  highwayAlt: "The road from Riyadh climbing towards the Sarawat mountains near Taif",
  cities: {
    heading: "Taif's Mountain Destinations",
    intro: "Taif's best-known highland places are outside the city centre. Each is a separate destination, so tell us whether you are going to the city, Al Hada, Al Shafa or somewhere else.",
    items: [
      { name: "Al Hada", detail: "West of Taif, about 20 km from the centre", text: "A mountain destination with a cable car, viewpoints and resorts. The mountain road is steep and winding, so the ride takes longer than the distance suggests." },
      { name: "Al Shafa", detail: "South-west of the city", text: "A highland area with farms, parks and mountain views. It is a separate destination from Al Hada." },
      { name: "Jabal Daka", detail: "In the Al Shafa highlands", text: "A mountain landmark associated with Al Shafa, known for its panoramic views. We do not promise access conditions or travel times." },
    ],
    note: "Distances are estimates by road. Access depends on the road, the weather and the vehicle, and we confirm whether a suitable ride can be arranged. We do not promise access to off-road locations.",
  },
  market: {
    heading: "Taif's Rose Heritage",
    intro: "Taif is famous for its roses, grown in highland areas such as Al Hada and Al Shafa. The roses are connected to a long local tradition.",
    items: [
      { title: "Roses of the highlands", text: "Rose farms are spread across several areas, including Al Hada and Al Shafa." },
      { title: "A spring harvest", text: "The rose harvest generally takes place in spring. The exact weeks change with the season and the weather, so check before you plan." },
      { title: "Rosewater and rose oil", text: "The roses are used to make rosewater and rose oil, a craft that is part of Taif's heritage." },
      { title: "Visiting a farm", text: "Not every farm welcomes visitors, and visiting hours vary. Check a farm's current visitor details before you go." },
    ],
    note: "We provide transport only. We do not run rose-farm tours, and we do not promise that any farm is open or that the harvest is under way.",
  },
  eastern: {
    heading: "Taif City Heritage and Attractions",
    intro: "Some visitors also ask about the city's historic and family places. Each extra stop is a separate request, confirmed with you.",
    items: [
      { name: "Shubra Palace", detail: "In the city, about 3 km from the centre", text: "A historic palace in Taif, now a museum, known for its architecture. It is a city attraction." },
      { name: "Souq Okaz", detail: "Outside central Taif", text: "A historic cultural and market site, separate from the city centre. Check current event and visitor arrangements before you go." },
      { name: "Al Rudaf Park", detail: "A family outdoor area", text: "A park for family recreation. Check current visiting details, since we do not publish hours or prices." },
      { name: "Abdullah ibn Abbas Mosque", detail: "In the historic centre, about 4 km", text: "An important historic mosque in Taif. Visit it respectfully and check current visiting arrangements." },
    ],
    note: "Distances are estimates by road from the Taif city centre. We do not offer tours or guides, and we do not promise waiting time or access to any site unless we confirm it with you.",
  },
  umrah: {
    heading: "Family and Holiday Travel to Taif",
    intro: "Many passengers on this road are families on holiday, or visitors going to a mountain resort. A direct pickup and drop-off makes a long journey simpler.",
    items: [
      { title: "Families from Riyadh", text: "One vehicle for the family and its luggage, from your door to your hotel or rental." },
      { title: "Summer visitors", text: "Summer is busy. Ask early for the school holidays and public holidays." },
      { title: "Resort guests", text: "Send the resort name and whether it is in Taif, Al Hada or Al Shafa, so the drop-off is planned correctly." },
      { title: "Visiting relatives", text: "Send the exact address, so the driver can go to the right door." },
      { title: "Couples and personal travel", text: "A private car for two, with the departure time you choose." },
      { title: "Luggage", text: "Holiday trips often carry more bags. Count every bag, including large ones." },
    ],
    note: "We do not promise child seats or specific luggage space unless we confirm them with you for your request.",
    slot: "family",
    alt: "A family travelling together by private car from Riyadh to Taif",
  },
  airport: {
    heading: "Airport Transfers: Taif International Airport (TIF)",
    intro: "Taif International Airport (TIF) is outside the city. An airport ride is a separate request from the long-distance journey from Riyadh.",
    items: [
      { title: "Riyadh to the airport, or the airport to your hotel", text: "You can ask for a road transfer between Riyadh and the airport, or between the airport and a hotel or home in Taif. The airport is roughly 35 km from the city centre by road (an estimate)." },
      { title: "To Al Hada or Al Shafa", text: "A ride from the airport up to Al Hada or Al Shafa can be requested. The mountain roads take longer, so the timing is planned with you." },
      { title: "Share your flight details", text: "Send your flight number, date and time, and the number of passengers and bags. We use them to plan the ride." },
    ],
    note: "Pickup arrangements are confirmed with you for each request. We do not promise flight tracking, meet-and-greet or a fixed waiting time.",
    href: "/taxi-saudi-arabia/airports/taif-international-airport",
    slot: "airport",
    alt: "Taif International Airport, outside the city of Taif",
  },
  vehiclesHeading: "Choose a Vehicle for Your Journey",
  vehiclesIntro: "The vehicle depends on the number of passengers, the amount of luggage, your requested category, the destination and availability. For a mountain resort, tell us where it is. We confirm the vehicle with you before you book.",
  vehicles: [
    { slot: "sedan", homePhoto: "sedan", name: "Sedan", best: "Couples and small groups", text: "A private car for one to a few passengers with light luggage.", alt: "Private sedan for a Riyadh to Taif trip" },
    { slot: "suv", homePhoto: "suv", name: "SUV", best: "Families and mountain roads", text: "More room for passengers and bags. A good choice for a family trip that includes the mountain roads.", alt: "Private SUV for a family travelling from Riyadh to Taif" },
    { slot: "van", homePhoto: "family-van", name: "Van or minibus", best: "Larger families and groups", text: "For groups who want to travel together with their luggage. Give us the group size and we confirm what fits.", alt: "Private van for a group travelling from Riyadh to Taif" },
    { slot: "executive", name: "Executive car", best: "Formal arrivals", text: "A chauffeur-driven premium car for guests who want extra comfort. Subject to availability.", alt: "Executive car for a Riyadh to Taif transfer" },
  ],
  dropHeading: "Where in Taif Are You Going?",
  dropIntro: "Send the hotel, resort or home address and a map pin, and tell us whether it is in the city, Al Hada or Al Shafa.",
  drops: [
    { name: "Taif city", text: "Hotels, apartments and homes in the city." },
    { name: "Al Hada", text: "Resorts and hotels on the mountain, west of the city." },
    { name: "Al Shafa", text: "Hotels, farms and parks in the south-west highlands." },
  ],
  dropAlt: "Taif and the Sarawat mountains, the destination of a private taxi from Riyadh",
  pickupHeading: "Common Pickup Areas in Riyadh",
  pickupIntro: "Journeys start from your own address. Send the exact address or a map pin when you request a quote.",
  pickups: [
    { name: "Olaya", text: "Hotels, offices and apartments in central Riyadh.", href: "/riyadh-taxi-service/olaya-taxi-service" },
    { name: "Al Malaz", text: "An established district in the east of central Riyadh.", href: "/riyadh-taxi-service/al-malaz-taxi-service" },
    { name: "Al Nakheel", text: "A residential district in the north-west of the city.", href: "/riyadh-taxi-service/al-nakheel-taxi-service" },
    { name: "King Khalid International Airport (RUH)", text: "The main airport, in the north. Send your flight number and terminal.", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport" },
    { name: "Hotels and homes", text: "Any hotel, apartment or house in Riyadh." },
  ],
  pickupAlt: "Riyadh skyline where private transfers to Taif begin",
  whoHeading: "Who Uses This Route?",
  who: [
    { title: "Families on holiday", text: "Families escaping the Riyadh summer heat." },
    { title: "Resort and hotel guests", text: "Visitors going to a mountain hotel or resort." },
    { title: "Rose-season visitors", text: "Visitors going to see the roses in spring." },
    { title: "Visitors to relatives", text: "People visiting family in Taif." },
    { title: "Airport passengers", text: "Passengers connecting with Taif International Airport." },
    { title: "Travellers continuing to Makkah or Jeddah", text: "Passengers who ask for an extra leg, confirmed separately." },
  ],
  stepsHeading: "How Booking Works",
  steps: [
    { title: "Enter your locations", text: "Pickup and destination." },
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
    { name: "Riyadh to Makkah", href: "/taxi-saudi-arabia/routes/riyadh-to-makkah", text: "A private ride for Umrah and family trips." },
    { name: "Riyadh to Jeddah", href: "/taxi-saudi-arabia/routes/riyadh-to-jeddah", text: "The long road west to the Red Sea coast." },
    { name: "Riyadh to Al Bahah", href: "/taxi-saudi-arabia/routes/riyadh-to-al-baha", text: "Another highland destination in the south-west." },
    { name: "Riyadh to Abha", href: "/taxi-saudi-arabia/routes/riyadh-to-abha", text: "A ride to the Asir mountains." },
    { name: "Riyadh to Madinah", href: "/taxi-saudi-arabia/routes/riyadh-to-madinah", text: "A long road trip to Madinah." },
    { name: "Taif taxi service", href: "/taxi-saudi-arabia/makkah-region/taif", text: "Rides within and around Taif." },
    { name: "Taif airport taxi", href: "/taxi-saudi-arabia/airports/taif-international-airport", text: "Rides to and from Taif airport." },
    { name: "Riyadh taxi service", href: "/riyadh-taxi-service", text: "Pickups and rides in Riyadh." },
  ],
  faqHeading: "Frequently Asked Questions: Riyadh to Taif Taxi",
  faq: [
    { q: "How far is Taif from Riyadh by road?", a: "About 790 km between the two city centres, by road. This is road distance, not straight-line distance, and it depends on your exact addresses." },
    { q: "How long does a private taxi from Riyadh to Taif take?", a: "Driving takes about 8 hours 40 minutes without stops, in light traffic. With rest and prayer breaks, plan for a full day. We do not promise an arrival time." },
    { q: "Can I book a one-way Riyadh to Taif taxi?", a: "Yes. You can ask for a one-way journey or a return. Availability is confirmed for each request." },
    { q: "Can I arrange a return taxi from Taif to Riyadh?", a: "Yes. Ask for the return in the same request and give us the day and time you want to leave Taif." },
    { q: "Can a private taxi take me directly to Al Hada?", a: "Yes, as a request. Al Hada is a mountain destination west of Taif city, and the road is steep, so we confirm the timing and the vehicle with you." },
    { q: "Can I book a transfer to Al Shafa?", a: "Yes, as a request. Al Shafa is a separate highland area south-west of the city. Send the hotel or place you want to reach." },
    { q: "Can I arrange a taxi to Taif rose farms?", a: "You can ask for it as a separate request. Not every farm welcomes visitors, so check the farm's visitor details, and tell us the exact place." },
    { q: "Can I book a Riyadh to Taif airport transfer?", a: "Yes, as a request. Taif International Airport is outside the city. Send your flight number, time and destination, and we confirm the arrangement." },
    { q: "Can I request an SUV or van for family travel?", a: "Yes. Tell us how many people and bags you have, and we confirm a suitable vehicle, such as an SUV or a van, depending on availability." },
    { q: "When is the Taif rose harvesting season?", a: "The harvest generally takes place in spring. The exact weeks change each year, so check current local information before you plan." },
    { q: "Can I continue from Taif to Makkah or Jeddah?", a: "You can ask for it as an extra leg. It is confirmed separately and is not included in the Taif fare. Entry to Makkah is restricted to Muslims." },
    { q: "How do I get a quote for a Riyadh to Taif private taxi?", a: "Fill in the form on this page with your route, date, time and group size. Our team replies with the vehicle, driver and fare, and you decide whether to go ahead." },
  ],
  ctaHeading: "Plan Your Private Journey from Riyadh to Taif",
  ctaText: "Share your pickup address, destination in Taif, travel date, number of passengers and luggage, and any extra stop you need. Our team confirms the vehicle, driver and fare before you commit.",
  ctaButton: "Request Your Free Quote",
};
