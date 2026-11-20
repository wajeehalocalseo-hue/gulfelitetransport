import type { TownSpec } from "./factory";

/**
 * Riyadh to Al Aflaj and Riyadh to Al Sih (As Sayh).
 * Sources: OpenStreetMap routing from the Riyadh centre to each point, reviewed November 2026; OpenStreetMap place and hospital names within 30 km; Nominatim for the administrative area.
 * Al Aflaj: the point used is the centre of the Al Aflaj administrative area in OpenStreetMap (22.25, 46.825), about 12 km from the town of Layla, which has its own page. The page serves the wider oasis area.
 * Al Sih: OpenStreetMap places "As Sayh" (السيح) as a village in Al Aflaj, 9.8 km from Layla. Other places called Al Saih (the Al Kharj city centre) and As Sayh (a suburb of Az Zulfi) are not this one.
 * Not claimed: fares, journey-time guarantees, offices or drivers in the area, opening hours, access to any site.
 */
export const specs3: TownSpec[] = [
  {
    id: "al-aflaj",
    name: "Al Aflaj",
    ar: "الأفلاج",
    lat: 22.25,
    lng: 46.825,
    area: "Al Aflaj governorate, Riyadh Region",
    title: "Riyadh to Al Aflaj Taxi Service | Private Rides",
    description: "Riyadh to Al Aflaj taxi service: private long-distance rides both ways, fare confirmed first. Call +966 57 985 8464 or use WhatsApp to arrange.",
    h1: "Riyadh to Al Aflaj Taxi Service",
    lead: "A private Riyadh to Al Aflaj taxi service for the long drive south, in both directions. Send your pickup, drop-off, date and passengers, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "Gulf Elite Transport Group takes requests for private taxi rides between Riyadh and the Al Aflaj area, about 300 km by road and roughly 4 hours in light traffic, and from Al Aflaj back to Riyadh. Al Aflaj is a governorate, so send the town or village you are going to, such as Layla or As Sayh. You send the addresses, date, time and the number of passengers and bags, and we confirm the vehicle, driver and fare before you commit. Fares and availability are not published.",
    eyebrow: "Private intercity taxi · Riyadh to Al Aflaj",
    heroPoints: ["Private car and driver for the whole drive south", "Pickup and drop-off in Layla, As Sayh or nearby villages", "Return in the same request", "Vehicle, driver and fare confirmed first"],
    km: 302.6,
    min: 246,
    facts: [
      { label: "Main roads", value: "Route 65, then Route 10" },
      { label: "Main town", value: "Layla" },
    ],
    introHeading: "South from Riyadh to the Al Aflaj oasis area",
    intro: [
      "Al Aflaj is a governorate in the south of Riyadh Region, built around a group of oasis settlements. Layla is its main town, with villages such as As Sayh, Qutayn, Ghasibah and Ammar close by. A private taxi from Riyadh covers about 300 km by road, so it is a long day trip or an overnight stay, and planning the pickup, the return and the stops matters.",
      "This page is for the wider Al Aflaj area. If you are going to the town of Layla, see the Layla page, and if you are going to As Sayh, see the Al Sih page. The pages are separate because the places are, and each has its own roads and landmarks. The same page covers the trip back to Riyadh.",
    ],
    out: {
      heading: "Riyadh to Al Aflaj",
      paragraphs: [
        "The drive begins on King Fahd Road in Riyadh, Route 65, and then follows Al Haer Road south. The longest middle stretch is the Riyadh to Hawtat Bani Tamim Road, about 100 km, and routing data then joins King Fahd Road signed Route 10 for another long run.",
        "The final kilometres into the oasis use Route 5030. Because so much of the trip is on one highway, rest and prayer stops are usually planned in advance, and we can agree them when you send the request.",
      ],
    },
    back: {
      heading: "Al Aflaj to Riyadh",
      paragraphs: [
        "For the trip back, we collect you from the town or village you give and drive north on the same roads. Send the time you must arrive in Riyadh so the departure time can be worked backwards.",
        "If you are going to King Khalid International Airport, tell us the flight time and terminal if you know it. Allow a generous margin on a drive of this length.",
      ],
    },
    pickups: [
      { name: "A home or apartment in Riyadh", text: "Send the district, street, building or a map pin, and the gate. Agree a meeting point outside a controlled gate if needed." },
      { name: "A hotel or office in Riyadh", text: "Give the building name and the entrance, and a phone number that will be answered." },
      { name: "King Khalid International Airport (RUH)", text: "Send flight number, date, terminal if known, passengers and bags. The pickup point follows the airport's own rules." },
    ],
    drops: [
      { name: "Layla", text: "The main town of the area. Give the neighbourhood or a landmark, or a map pin. Layla has its own page for rides to the town itself." },
      { name: "Al Aflaj Hospital", text: "OpenStreetMap places a hospital in the Al Aflaj area, about 12 km from the area centre on the map. Give the entrance and appointment time. A ride is not a medical transport service." },
      { name: "As Sayh, Qutayn and Ghasibah", text: "Villages close to Layla. Send a pin and a landmark, because village roads are not easy to find." },
      { name: "The old town of Al Aflaj", text: "OpenStreetMap marks an old-town neighbourhood about 10 km from the area centre. Name the entrance and agree a pickup window." },
    ],
    placesHeading: "Real places in the Al Aflaj area",
    placesIntro: "These names come from OpenStreetMap and are useful as pickup or drop-off references. We do not publish opening hours or entry rules for any of them.",
    places: [
      { name: "Layla", detail: "City, about 12 km", text: "The main town of the governorate. Name it clearly if you are going there, not only to the wider area." },
      { name: "As Sayh", detail: "Village, about 6 km", text: "A village near Layla. It has its own page for travellers who are going only there." },
      { name: "Qutayn and Ghasibah", detail: "Villages, 5 to 10 km", text: "Two of several villages around the oasis. Send a pin and a landmark." },
      { name: "Al Aflaj Hospital", detail: "Hospital, about 12 km", text: "The main hospital marked on the map in the area. Agree an entrance and a pickup window." },
      { name: "Old town", detail: "Neighbourhood, about 10 km", text: "A neighbourhood labelled Old Town on the map. Say clearly which place you mean, as the name can be used more than once." },
    ],
    plan: [
      { title: "Pick the town or village", text: "Choose Layla, As Sayh or another place in Al Aflaj. This decides the final road." },
      { title: "Send both addresses", text: "A street, building or pin in Riyadh, and a neighbourhood, village or landmark in Al Aflaj." },
      { title: "Say who and what is travelling", text: "Passengers, bags, child seats if needed. The group size decides the vehicle." },
      { title: "Confirm the fare before you commit", text: "We reply with the vehicle, driver details and fare. Nothing is agreed until you say yes." },
    ],
    info: [
      { title: "Allow for the distance", text: "Routing data gives about 4 hours in light traffic. It is not a promised journey time, and rest stops, traffic and weather add to it." },
      { title: "What changes the quotation", text: "The distance, exact addresses, date, passengers, bags, waiting time and whether you want a return. Fares are not published." },
      { title: "Name the place, not just the area", text: "Al Aflaj covers several towns and villages. Naming the one you are going to keeps the quotation accurate." },
      { title: "Few mapped landmarks", text: "Fewer places are mapped around the oasis than in a large city, so a map pin helps more than a street name." },
    ],
    related: [],
    faq: [
      { q: "How can I book a taxi from Riyadh to Al Aflaj?", a: "Send the pickup in Riyadh, the town or village in Al Aflaj, the date, time and passengers by WhatsApp, phone (+966 57 985 8464) or the booking form. We confirm the vehicle, driver and fare before you commit." },
      { q: "How far is Al Aflaj from Riyadh by road?", a: "About 300 km, roughly 4 hours in light traffic. It is not a promised journey time." },
      { q: "Is Layla the same as Al Aflaj?", a: "Al Aflaj is the governorate and Layla is its main town. If you are going to the town itself, use the Layla page. For other places in the area, use this page." },
      { q: "Can I book the return trip on this page?", a: "Yes. This page covers both directions. Use the Al Aflaj to Riyadh WhatsApp button, or send the pickup in Al Aflaj and the drop-off in Riyadh." },
      { q: "Which roads does the route use?", a: "Routing data shows King Fahd Road (Route 65), Al Haer Road, the Riyadh to Hawtat Bani Tamim Road and Route 10. The exact route depends on your addresses and traffic." },
      { q: "Can the driver wait while I finish my visit?", a: "Waiting can be requested. Tell us how long you expect, and we agree it and its cost before you commit." },
    ],
    directions:
      "Leaving Riyadh, drivers join King Fahd Road, Route 65, and then Al Haer Road, heading south. The long middle stretch is the Riyadh to Hawtat Bani Tamim Road, followed by King Fahd Road, Route 10, which carries the drive for well over 100 km towards Al Aflaj. The last kilometres then use Route 5030. In the other direction, the same roads lead north to Riyadh. These road names come from OpenStreetMap routing and are a guide only. The exact route depends on your pickup address in Riyadh, your drop-off address in the Al Aflaj area, current traffic and road works.",
    localIntro: "Find the Al Aflaj area on the map, read how the roads run south from Riyadh, and open the oasis towns and villages in Google Maps.",
    linkTitles: ["Towns and villages in Al Aflaj", "Landmarks and services", "On the road south", "Riyadh and nearby cities"],
    linkGroups: [
      [
        ["Layla", "Layla, Al Aflaj, Riyadh Region, Saudi Arabia"],
        ["As Sayh, Al Aflaj", "السيح, الأفلاج, السعودية"],
        ["Qutayn", "قطين, الأفلاج, السعودية"],
        ["Qusayrat Ad", "قصيرات عاد, الأفلاج, السعودية"],
        ["Ghasibah", "غصيبة, الأفلاج, السعودية"],
        ["Ammar, Al Aflaj", "العمار, الأفلاج, السعودية"],
        ["Al Jubaylah, Al Aflaj", "الجبيله, الأفلاج, السعودية"],
        ["Suwaydan", "سويدان, الأفلاج, السعودية"],
        ["Marwan, Al Aflaj", "مروان, الأفلاج, السعودية"],
        ["An Naifiyah", "النايفية, الأفلاج, السعودية"],
        ["Badiah Al Tarid", "بديعة آل طارد, الأفلاج, السعودية"],
      ],
      [
        ["Al Aflaj Hospital", "مستشفى الافلاج, السعودية"],
        ["Old Town, Al Aflaj", "المدينة القديمة, الأفلاج, السعودية"],
      ],
      [
        ["Al Haer", "الحائر, الرياض, السعودية"],
        ["Hawtat Bani Tamim", "Hawtat Bani Tamim, Riyadh Region, Saudi Arabia"],
        ["Al Hariq", "Al Hariq, Riyadh Region, Saudi Arabia"],
      ],
      [
        ["Riyadh", "Riyadh, Saudi Arabia"],
        ["King Khalid International Airport", "King Khalid International Airport, Riyadh, Saudi Arabia"],
        ["Al Kharj", "Al Kharj, Riyadh Region, Saudi Arabia"],
        ["Wadi Al-Dawasir", "Wadi Ad Dawasir, Riyadh Region, Saudi Arabia"],
        ["As Sulayyil", "As Sulayyil, Riyadh Region, Saudi Arabia"],
      ],
    ],
    shortfall: "OpenStreetMap lists only about 13 named places and one hospital around the Al Aflaj oasis, so the list is completed with the road towns and the cities people travel to, and stops short of 25 rather than inventing places.",
    ctaHeading: "Ready to travel between Riyadh and Al Aflaj?",
    ctaText: "Message us in the direction you need, or call +966 57 985 8464. The vehicle, driver and fare are confirmed with you before you commit.",
  },

  {
    id: "al-sih",
    name: "Al Sih",
    ar: "السيح",
    lat: 22.2217,
    lng: 46.7732,
    area: "As Sayh village, Al Aflaj, Riyadh Region",
    title: "Riyadh to Al Sih Taxi Service | As Sayh, Al Aflaj",
    description: "Riyadh to Al Sih taxi service for As Sayh in Al Aflaj: private rides both ways, fare first. Call +966 57 985 8464 or use WhatsApp to book.",
    h1: "Riyadh to Al Sih Taxi Service (As Sayh, Al Aflaj)",
    lead: "A private Riyadh to Al Sih taxi service for the village of As Sayh near Layla, in both directions. Check which Al Sih you mean, then send your pickup, drop-off, date and passengers, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "Gulf Elite Transport Group takes requests for private taxi rides between Riyadh and Al Sih, written As Sayh on maps, a village in the Al Aflaj area about 300 km by road from Riyadh, roughly 3 hours 45 minutes in light traffic, and back. This is not the Al Saih centre of Al Kharj, which the Riyadh to Al Kharj page covers. You send the addresses, date, time and the number of passengers and bags, and we confirm the vehicle, driver and fare before you commit. Fares and availability are not published.",
    eyebrow: "Private intercity taxi · Riyadh to Al Sih (As Sayh)",
    heroPoints: ["Pickup and drop-off in As Sayh and nearby villages", "Not the Al Saih centre of Al Kharj", "Return in the same request", "Vehicle, driver and fare confirmed first"],
    km: 299.1,
    min: 223,
    facts: [
      { label: "Spelling", value: "Al Sih, As Sayh, Al Sayh" },
      { label: "Nearest town", value: "Layla, about 10 km" },
    ],
    introHeading: "Which Al Sih is this?",
    intro: [
      "The name Al Sih, also written As Sayh, Al Sayh or Al Saih, belongs to several places in Saudi Arabia. One is a suburb of Al Zulfi, one is the Al Saih centre of Al Kharj, and one is a village in the Al Aflaj oasis area in the south of Riyadh Region. This page is for the Al Aflaj village, about 10 km from the town of Layla.",
      "If your address is in Al Kharj or Al Zulfi, use those route pages instead. If you are going to Layla or to the wider Al Aflaj area, see the Layla and Al Aflaj pages. This page is written for pickups and drop-offs in As Sayh and its immediate neighbours.",
    ],
    out: {
      heading: "Riyadh to Al Sih",
      paragraphs: [
        "The route is the long road south from Riyadh: King Fahd Road (Route 65), Al Haer Road, the Riyadh to Hawtat Bani Tamim Road, then King Fahd Road signed Route 10, with a short final stretch on Route 5030 into the village.",
        "Send a map pin for the final address, because village roads are not easy to find by name. We confirm the stop with you before the day.",
      ],
    },
    back: {
      heading: "Al Sih to Riyadh",
      paragraphs: [
        "For the trip back, we collect you from the address you give in As Sayh and drive north on the same roads. Say where in Riyadh you are going and the time you must arrive.",
        "If the return is on the same day, agree a pickup window instead of one fixed minute. Waiting is agreed separately.",
      ],
    },
    pickups: [
      { name: "A home or apartment in Riyadh", text: "Send the district, street, building or a map pin, and the gate. Agree a meeting point outside a controlled gate if needed." },
      { name: "A hotel or office in Riyadh", text: "Give the building name and the entrance, and a phone number that will be answered." },
      { name: "King Khalid International Airport (RUH)", text: "Send the flight number, date, terminal if known, passengers and bags. The pickup point follows the airport's own rules." },
    ],
    drops: [
      { name: "As Sayh village", text: "Send a map pin and a landmark. The village is small and the name is shared with other places." },
      { name: "Qutayn and Qusayrat Ad", text: "Two nearby villages, within 1.5 and 2.5 km. Tell us which one the address is in." },
      { name: "Layla and Al Aflaj Hospital", text: "The town of Layla and a hospital in the Al Aflaj area lie within about 10 km. Give the entrance and the appointment time." },
      { name: "Ammar, Ghasibah and the old town", text: "Villages and a neighbourhood labelled Old Town lie 5 to 9 km away. Name the one you need." },
    ],
    placesHeading: "Real places around As Sayh",
    placesIntro: "These names come from OpenStreetMap and help locate the village. We do not publish opening hours or entry rules for any of them.",
    places: [
      { name: "Qutayn", detail: "Village, about 1.5 km", text: "The nearest named village to As Sayh on the map." },
      { name: "Qusayrat Ad", detail: "Locality, about 2.5 km", text: "A locality close to the village. Send a pin if you are not sure of the road." },
      { name: "Ammar", detail: "Village, about 5.5 km", text: "A village north-east of As Sayh. Use it as a reference in your request." },
      { name: "Al Aflaj Hospital", detail: "Hospital, about 9.5 km", text: "The main hospital in the Al Aflaj area on the map. Agree the entrance and a pickup window." },
      { name: "Layla", detail: "City, about 10 km", text: "The main town of the governorate, a short drive from the village. It has its own page." },
    ],
    plan: [
      { title: "Confirm it is As Sayh in Al Aflaj", text: "Check that your address is in the Al Aflaj village, not Al Kharj or Al Zulfi. Send a pin to be sure." },
      { title: "Pick the direction and the day", text: "Choose Riyadh to Al Sih, the reverse, or both. Plan a full day for a trip of this length." },
      { title: "Say who and what is travelling", text: "Passengers, bags, child seats if needed. The group size decides the vehicle." },
      { title: "Confirm the fare before you commit", text: "We reply with the vehicle, driver details and fare. Nothing is agreed until you say yes." },
    ],
    info: [
      { title: "Same road as Al Aflaj", text: "The distance is almost the same as Riyadh to Al Aflaj, about 300 km. The page is separate because the place is a village with its own name searches." },
      { title: "What changes the quotation", text: "The distance, exact addresses, date, passengers, bags, waiting time and whether you want a return. Fares are not published." },
      { title: "Time on the road", text: "Routing data gives about 3 hours 45 minutes in light traffic. It is not a promised journey time." },
      { title: "Use a map pin", text: "Several places share the name, so a map pin is the safest way to give the address." },
    ],
    related: [],
    faq: [
      { q: "Which Al Sih does this page cover?", a: "The village of As Sayh in Al Aflaj, in the south of Riyadh Region. Al Saih in Al Kharj and As Sayh near Al Zulfi are different places with their own pages." },
      { q: "How do I book a taxi from Riyadh to Al Sih?", a: "Send the pickup in Riyadh, the drop-off in As Sayh, the date, time and passengers by WhatsApp, phone (+966 57 985 8464) or the booking form. We confirm the vehicle, driver and fare before you commit." },
      { q: "How far is Al Sih from Riyadh by road?", a: "About 300 km, roughly 3 hours 45 minutes in light traffic. It is not a promised journey time." },
      { q: "Can I book the return trip on this page?", a: "Yes. This page covers both directions. Use the Al Sih to Riyadh WhatsApp button, or send the pickup in As Sayh and the drop-off in Riyadh." },
      { q: "How is this different from the Al Aflaj page?", a: "Al Aflaj covers the whole oasis area. This page is for the village of As Sayh and its immediate neighbours." },
      { q: "Can the driver wait while I finish my visit?", a: "Waiting can be requested. Tell us how long you expect, and we agree it and its cost before you commit." },
    ],
    directions:
      "Leaving Riyadh, drivers join King Fahd Road, Route 65, and then Al Haer Road, heading south. The long middle stretch is the Riyadh to Hawtat Bani Tamim Road, followed by King Fahd Road, Route 10, which carries the drive for well over 100 km. A short final stretch then uses Route 5030 to reach As Sayh. In the other direction, the same roads lead north to Riyadh. These road names come from OpenStreetMap routing and are a guide only. The exact route depends on your pickup address in Riyadh, your drop-off address in As Sayh, current traffic and road works.",
    localIntro: "Find As Sayh on the map, and open the nearby villages, Layla and the roads south from Riyadh in Google Maps.",
    linkTitles: ["Villages near As Sayh", "Services and areas", "On the road south", "Riyadh and nearby cities"],
    linkGroups: [
      [
        ["As Sayh, Al Aflaj", "السيح, الأفلاج, السعودية"],
        ["Qutayn", "قطين, الأفلاج, السعودية"],
        ["Qusayrat Ad", "قصيرات عاد, الأفلاج, السعودية"],
        ["Ammar, Al Aflaj", "العمار, الأفلاج, السعودية"],
        ["Ghasibah", "غصيبة, الأفلاج, السعودية"],
        ["Al Jubaylah, Al Aflaj", "الجبيله, الأفلاج, السعودية"],
        ["Badiah Al Tarid", "بديعة آل طارد, الأفلاج, السعودية"],
        ["Suwaydan", "سويدان, الأفلاج, السعودية"],
        ["Marwan, Al Aflaj", "مروان, الأفلاج, السعودية"],
        ["An Naifiyah", "النايفية, الأفلاج, السعودية"],
        ["Saqi Al Nahid", "ساقي ال ناهض, الأفلاج, السعودية"],
      ],
      [
        ["Layla", "Layla, Al Aflaj, Riyadh Region, Saudi Arabia"],
        ["Al Aflaj Hospital", "مستشفى الافلاج, السعودية"],
        ["Old Town, Al Aflaj", "المدينة القديمة, الأفلاج, السعودية"],
      ],
      [
        ["Al Haer", "الحائر, الرياض, السعودية"],
        ["Hawtat Bani Tamim", "Hawtat Bani Tamim, Riyadh Region, Saudi Arabia"],
        ["Al Hariq", "Al Hariq, Riyadh Region, Saudi Arabia"],
      ],
      [
        ["Riyadh", "Riyadh, Saudi Arabia"],
        ["King Khalid International Airport", "King Khalid International Airport, Riyadh, Saudi Arabia"],
        ["Al Kharj", "Al Kharj, Riyadh Region, Saudi Arabia"],
        ["Wadi Al-Dawasir", "Wadi Ad Dawasir, Riyadh Region, Saudi Arabia"],
      ],
    ],
    shortfall: "OpenStreetMap lists only about 13 named places around As Sayh, so the list is completed with Layla, the road towns and the cities people travel to, and stops short of 25 rather than inventing places.",
    ctaHeading: "Ready to travel between Riyadh and Al Sih?",
    ctaText: "Message us in the direction you need, or call +966 57 985 8464. The vehicle, driver and fare are confirmed with you before you commit.",
  },
];
