import type { TownSpec } from "./factory";

/**
 * Riyadh to Al Majma'ah, Al Dawadmi and Az Zulfi.
 * Sources: OpenStreetMap routing from the Riyadh centre (24.7136, 46.6753) to each town centre, reviewed November 2026 (roads, distance, light-traffic time);
 * OpenStreetMap place, hospital, college, museum and heritage names within 30 km of each town centre; Nominatim for the administrative area (Riyadh Region).
 * Not claimed: fares, journey-time guarantees, offices or drivers in the town, opening hours, access to any site. No coordinates are invented.
 */
export const specs1: TownSpec[] = [
  {
    id: "al-majmaah",
    name: "Al Majma'ah",
    ar: "المجمعة",
    lat: 25.9039,
    lng: 45.3456,
    area: "Al Majma'ah, Riyadh Region",
    title: "Riyadh to Al Majma'ah Taxi Service | Private Rides",
    description: "Riyadh to Al Majma'ah taxi service: private rides both ways, fare confirmed before you commit. Call +966 57 985 8464 or message us on WhatsApp.",
    h1: "Riyadh to Al Majma'ah Taxi Service",
    lead: "A private Riyadh to Al Majma'ah taxi service for the drive north-west on Route 65, in both directions. Send your pickup, drop-off, date and passengers, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "Gulf Elite Transport Group takes requests for private taxi rides between Riyadh and Al Majma'ah, about 195 km by road and roughly 1 hour 55 minutes in light traffic, and the same trip back from Al Majma'ah to Riyadh. You send the pickup address, the drop-off address, the date and time and how many people and bags are travelling, by WhatsApp, phone or the booking form. We confirm the vehicle, the driver and the fare before you commit. Fares and availability are not published and depend on the date and your addresses.",
    eyebrow: "Private intercity taxi · Riyadh to Al Majma'ah",
    heroPoints: ["Door-to-door pickup in Riyadh or Al Majma'ah", "One-way, return and same-day return requests", "Family, business and university trips", "Vehicle, driver and fare confirmed first"],
    km: 194.7,
    min: 114,
    facts: [
      { label: "Main road", value: "Route 65 (King Fahd Road, then Qassim Expressway)" },
      { label: "Seat of", value: "Al Majma'ah governorate" },
    ],
    introHeading: "The north-west road from Riyadh to Al Majma'ah",
    intro: [
      "Al Majma'ah lies in the north-west of Riyadh Region, on the road that carries traffic from the capital towards Qassim. A private taxi from Riyadh to Al Majma'ah is a single-car journey of about 195 km, so it suits people who want one driver for the whole trip: families visiting relatives, staff and students travelling to the University of Majmaah, and visitors who prefer not to drive the highway themselves.",
      "This page covers both directions. If you are in Al Majma'ah and need to reach Riyadh, the airport or an appointment in the capital, send the same details the other way round and we plan the return in the same way. There is no separate page for the reverse trip, and a return pickup can be requested in the same message.",
    ],
    out: {
      heading: "Riyadh to Al Majma'ah",
      paragraphs: [
        "The drive starts on King Fahd Road in Riyadh, which carries Route 65, and stays on Route 65 for most of the way, first as King Fahd Road and then as the Qassim Expressway. Routing data shows only a short final stretch on a different road: the approach into the city is King Fahd Road again, this time signed Route 535.",
        "Plan the pickup time around your own deadline, not the clock on the road. Leave a margin if you must reach a university appointment, a hospital visit or a family event on time, and tell us if you need rest or prayer stops on the way.",
      ],
    },
    back: {
      heading: "Al Majma'ah to Riyadh",
      paragraphs: [
        "For the trip back, we collect you from the address you give in Al Majma'ah and drive the same road in reverse. A return is easier to arrange in the same request as the outbound ride, with a pickup window instead of a fixed minute, because waiting times and visits can run over.",
        "If your destination in Riyadh is the airport or a hotel, say so in the request. King Khalid International Airport is in the north of Riyadh, and the pickup point and the time to leave Al Majma'ah are worked out from your flight, not from the distance alone.",
      ],
    },
    pickups: [
      { name: "A home, villa or apartment in Riyadh", text: "Send the district, street and building or villa number, or a map pin. Tell us the gate or entrance the car should use. A taxi booking does not give access to private roads or compounds, so an agreed meeting point outside the gate is common." },
      { name: "A hotel or office tower", text: "Give the hotel or building name and the entrance, and a phone number that will be answered. Large towers and hotels have several doors, and naming the right one avoids a long wait on the road." },
      { name: "King Khalid International Airport (RUH)", text: "Send the flight number, the date, the terminal if you know it and your passengers and bags. The pickup point follows the airport's own rules and is agreed with you before you travel." },
    ],
    drops: [
      { name: "Al Majma'ah city centre", text: "The central neighbourhoods include King Fahd, Al Fayha, Al Marqab and King Abdulaziz, so give the neighbourhood and street, or a pin, instead of only the city name." },
      { name: "University of Majmaah", text: "OpenStreetMap places the university and its University City about 8 to 9 km from the city centre. Send the building or gate you need, because the campus is large." },
      { name: "King Khalid Hospital and clinics", text: "King Khalid Hospital is about 1 km from the centre. Give the hospital entrance and the time of the appointment. A ride is not a medical transport service." },
      { name: "Harmah and nearby villages", text: "Harmah is a town about 3 km from the centre, and several villages lie 10 to 30 km away. Name the village and a landmark, since small places can have several roads in." },
    ],
    placesHeading: "Real places around Al Majma'ah",
    placesIntro: "These names come from OpenStreetMap and are useful as drop-off or pickup references. We do not publish opening hours or entry rules for any of them.",
    places: [
      { name: "Bayt Al Rabia Heritage House", detail: "Heritage, about 1 km from the centre", text: "A heritage house in the central area. Many visitors name it as a landmark when they arrange a pickup in the old part of the city." },
      { name: "Harmah", detail: "Town and old town, about 3 km", text: "Harmah lies just outside the centre of Al Majma'ah, and OpenStreetMap also marks the old town of Harmah as ruins. Say which one you mean." },
      { name: "University of Majmaah", detail: "University, about 9 km", text: "The main university campus is outside the centre, so name the building or gate you need when you send the request." },
      { name: "King Khalid Hospital", detail: "Hospital, about 1 km", text: "The main hospital in the central area. Agree the entrance and a pickup window if the visit time is uncertain." },
      { name: "Industrial areas", detail: "First and Second Industrial, about 6 to 8 km", text: "Work trips often end in the industrial neighbourhoods on the edge of the city. Give the factory or company gate, and a contact name at the site." },
    ],
    plan: [
      { title: "Decide the direction and the time", text: "Choose Riyadh to Al Majma'ah, the reverse, or both. For a return, give a pickup window instead of one minute." },
      { title: "Send both addresses", text: "Give a street, building or map pin in Riyadh and the neighbourhood, village or campus gate in Al Majma'ah." },
      { title: "Say who and what is travelling", text: "Passengers, bags, child seats if needed, and any stop on the way. The number decides the vehicle." },
      { title: "Confirm the fare before you commit", text: "We reply with the vehicle, the driver details and the fare. Nothing is agreed until you say yes." },
    ],
    info: [
      { title: "What changes the quotation", text: "The distance, the exact addresses, the date and time, the number of passengers and bags, waiting time and whether you want a return. Fares are not published because of this." },
      { title: "Time on the road", text: "Routing data suggests about 1 hour 55 minutes in light traffic, but traffic, weather, rest stops and the time of day can change it. It is not a promised journey time." },
      { title: "No airport on this route", text: "We could not confirm a commercial airport at Al Majma'ah, so air travellers can use King Khalid International Airport in Riyadh. OpenStreetMap shows airstrips used for flying, not scheduled flights." },
      { title: "Controlled sites", text: "Universities, industrial plants and hospitals can restrict who may drive in. Arrange permission yourself, or agree a meeting point at the gate." },
    ],
    related: [],
    faq: [
      { q: "How can I book a taxi from Riyadh to Al Majma'ah?", a: "Send us the pickup address in Riyadh, the drop-off in Al Majma'ah, the date and time and the number of passengers and bags by WhatsApp, phone (+966 57 985 8464) or the booking form. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book Al Majma'ah to Riyadh on this page?", a: "Yes. This page covers both directions. Use the Al Majma'ah to Riyadh WhatsApp button, or send the pickup in Al Majma'ah and the drop-off in Riyadh by any other route." },
      { q: "How far is Al Majma'ah from Riyadh by road?", a: "About 195 km by road, roughly 1 hour 55 minutes in light traffic. Traffic and stops change this, so it is not a promised journey time." },
      { q: "Which road do taxis use between Riyadh and Al Majma'ah?", a: "Routing data shows King Fahd Road and the Qassim Expressway, both Route 65, with a short final approach on King Fahd Road signed Route 535. The exact route depends on your addresses and traffic." },
      { q: "Can I travel to the University of Majmaah?", a: "Yes, give us the campus gate or building. The university is about 9 km from the city centre, and entry to the campus follows its own rules." },
      { q: "Is there an airport in Al Majma'ah?", a: "We could not confirm a commercial airport. Travellers usually fly through Riyadh and take a private ride on this route." },
      { q: "Can I ask for a return pickup?", a: "Yes. Ask for the return in the same request with a time window. Waiting is agreed separately, and availability is confirmed for the date." },
    ],
    directions:
      "From central Riyadh, drivers head north-west on King Fahd Road, which carries Route 65 out of the city. Route 65 then continues as the Qassim Expressway for much of the drive towards Al Majma'ah. Near the city, the route leaves Route 65 and follows King Fahd Road, signed Route 535, into the centre. In the other direction, the same roads lead back to Riyadh. These road names come from OpenStreetMap routing and are a guide only. The exact route depends on your pickup address in Riyadh, your drop-off address in Al Majma'ah, traffic, and any road works on the day.",
    localIntro: "Find Al Majma'ah on the map, read how the main road runs from Riyadh, and open the city's neighbourhoods and nearby towns in Google Maps.",
    linkTitles: ["Al Majma'ah neighbourhoods", "Landmarks and services", "Nearby towns and villages", "Riyadh and nearby cities"],
    linkGroups: [
      [
        ["King Fahd, Al Majma'ah", "حي الملك فهد, المجمعة, السعودية"],
        ["Al Fayha, Al Majma'ah", "حي الفيحاء, المجمعة, السعودية"],
        ["Al Marqab, Al Majma'ah", "حي المرقب, المجمعة, السعودية"],
        ["King Abdulaziz, Al Majma'ah", "حي الملك عبدالعزيز, المجمعة, السعودية"],
        ["King Salman, Al Majma'ah", "حي الملك سلمان, المجمعة, السعودية"],
        ["Al Yarmuk, Al Majma'ah", "حي اليرموك, المجمعة, السعودية"],
        ["Al Jamiyin, Al Majma'ah", "حي الجامعيين, المجمعة, السعودية"],
        ["Ar Rafiah, Al Majma'ah", "حي الرفيعة, المجمعة, السعودية"],
        ["Al Andalus, Al Majma'ah", "حي الاندلس, المجمعة, السعودية"],
        ["Ar Rawdah, Al Majma'ah", "حي الروضة, المجمعة, السعودية"],
      ],
      [
        ["King Khalid Hospital, Al Majma'ah", "مستشفى الملك خالد, المجمعة, السعودية"],
        ["University of Majmaah", "جامعة المجمعة, السعودية"],
        ["Bayt Al Rabia Heritage House", "بيت الربيعة التراثي, المجمعة, السعودية"],
        ["Old town of Harmah", "Old town of Harmah, Al Majma'ah, Saudi Arabia"],
        ["First Industrial area, Al Majma'ah", "الصناعية الأولى, المجمعة, السعودية"],
      ],
      [
        ["Harmah", "حرمة, المجمعة, السعودية"],
        ["Juwayy", "جوي, المجمعة, السعودية"],
        ["Al Ha'ir", "الحائر, المجمعة, السعودية"],
        ["Wushayy", "وشي, المجمعة, السعودية"],
        ["Ar Ruwaydah", "الرويضة, المجمعة, السعودية"],
      ],
      [
        ["Riyadh", "Riyadh, Saudi Arabia"],
        ["King Khalid International Airport", "King Khalid International Airport, Riyadh, Saudi Arabia"],
        ["Az Zulfi", "Az Zulfi, Riyadh Region, Saudi Arabia"],
        ["Shaqra", "Shaqra, Riyadh Region, Saudi Arabia"],
        ["Buraydah", "Buraydah, Saudi Arabia"],
      ],
    ],
    ctaHeading: "Ready to travel between Riyadh and Al Majma'ah?",
    ctaText: "Message us in the direction you need, or call +966 57 985 8464. The vehicle, driver and fare are confirmed with you before you commit.",
  },
];
