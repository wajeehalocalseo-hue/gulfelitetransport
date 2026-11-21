import type { TownSpec } from "../town-routes/factory";
import { mk, sa, plain } from "./shared";

/**
 * Makkah to Al Hawiyah, Dhahban, Ash Shafa, Hali and Qiya.
 * Sources: OpenStreetMap routing from the Makkah centre (21.4225, 39.8262) to each town or village centre, reviewed November 2026 (roads, distance, light-traffic time);
 * OpenStreetMap place, hospital, university and park names near each centre (many only in Arabic); Nominatim for the administrative area (Makkah Region).
 * Not claimed: fares, journey-time guarantees, offices or drivers in any place, opening hours, access to any site.
 */
export const specs6: TownSpec[] = [
  {
    id: "al-hawiyah",
    name: "Al Hawiyah",
    ar: "الحوية",
    lat: 21.4449,
    lng: 40.503,
    area: "Al Hawiyah, Taif Governorate, Makkah Region",
    regionLabel: "Makkah Region",
    areaSuffix: "Al Hawiyah, Taif, Saudi Arabia",
    title: "Makkah to Al Hawiyah Taxi Service | Private Rides",
    description: "Makkah to Al Hawiyah taxi service: private rides both ways on Route 40 past Taif, fare confirmed first. Send your trip on WhatsApp to book.",
    h1: "Makkah to Al Hawiyah Taxi Service",
    lead: "A private Makkah to Al Hawiyah taxi service for the drive east on Route 40, in both directions. Send your pickup, drop-off, date and passengers, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "Gulf Elite Transport Group takes requests for private taxi rides between Makkah and Al Hawiyah, a town in Taif Governorate east of Taif city, about 109 km by road and roughly 1 hour 20 minutes in light traffic, and the same trip back from Al Hawiyah to Makkah. You send the pickup address, the drop-off address, the date and time and how many people and bags are travelling, by WhatsApp or the booking form. We confirm the vehicle, the driver and the fare before you commit. Fares and availability are not published and depend on the date and your addresses.",
    eyebrow: "Private intercity taxi · Makkah to Al Hawiyah",
    heroPoints: ["Door-to-door pickup in Makkah or Al Hawiyah", "Transfers for students, staff and families", "One-way, return and same-day return requests", "Vehicle, driver and fare confirmed first"],
    km: 109.4,
    min: 80,
    facts: [
      { label: "Main road", value: "Route 40, the Makkah to Riyadh highway" },
      { label: "Place", value: "Town in Taif Governorate" },
    ],
    introHeading: "East on Route 40 to Al Hawiyah",
    intro: [
      "Al Hawiyah is a town in Taif Governorate, east of Taif city, on the highway towards Riyadh. At about 109 km from Makkah it is a medium-length trip by one main road. The map lists university campuses, a university hospital and health centres close to the town, so a private taxi suits students, staff and patients, as well as families visiting relatives.",
      "This page covers both directions. For an Al Hawiyah to Makkah taxi service, send the same details the other way round. A Makkah to Al Hawiyah private car and the return can be requested together, and there is no separate page for the reverse journey. Taif city has its own page.",
    ],
    out: {
      heading: "Makkah to Al Hawiyah",
      paragraphs: [
        "Routing data leaves Makkah on King Abdulaziz Road and King Faisal Road, then joins Route 40, the Makkah Al Mukarramah Road, which carries the drive for about 86 km. The road passes the Taif side of the mountains, so fog and rain can slow it. The last stretch leaves the highway for the town.",
        "If you are going to a university site or a hospital, give the gate or building and the time of your appointment, and we plan the departure from Makkah backwards from it.",
      ],
    },
    back: {
      heading: "Al Hawiyah to Makkah",
      paragraphs: [
        "For an Al Hawiyah to Makkah private taxi, we collect you from the address you give in Al Hawiyah and drive west on the same highway. A return in the same request, with a pickup window, is easier to plan, especially after a hospital or campus visit when the end time is not known.",
        "Vehicle access around the Haram is controlled, so tell us which hotel or district you are going to in Makkah and agree the drop-off point before you travel. Entry to Makkah is for Muslims only, and this is the traveller's responsibility.",
      ],
    },
    pickups: [
      { name: "A hotel or tower in Makkah", text: "Give the hotel or building name and the entrance you want, and a phone number that will be answered. Access near the Haram is controlled, so the meeting point is agreed with you first." },
      { name: "A home or apartment in Makkah", text: "Send the district, street and building, or a map pin. Districts such as Al Hindawiyah, Ash Shuhada and Ar Rusayfah are a few kilometres from the centre." },
      { name: "A pickup on the Taif side of Makkah", text: "The route leaves by the east of the city. If you are on that side, a pin saves time at the start." },
    ],
    drops: [
      { name: "Al Hawiyah town centre", text: "The map shows neighbourhoods such as Al Mutarid, Al Wakra and Al Huwaya within about 3 km of the centre. Give the neighbourhood and a street or pin." },
      { name: "The university sites", text: "Taif University campuses and a university hospital are listed within about 3 km of the town. Controlled campuses decide who may drive in, so agree a meeting point at the gate." },
      { name: "Taif International Airport", text: "The airport is listed about 6 km from the centre. Send the flight number and date. The airport sets where cars may collect and drop, and we agree the point with you first." },
      { name: "King Salman Specialized Hospital", text: "A specialised hospital is listed about 7 km from the centre. Give the entrance and the appointment time. A ride is not a medical transport service." },
    ],
    placesHeading: "Real places around Al Hawiyah",
    placesIntro: "These names come from OpenStreetMap and Nominatim and are useful as drop-off or pickup references. We do not publish opening hours or entry rules for any of them.",
    places: [
      { name: "Taif University, Al Hawiyah", detail: "University, about 2 km", text: "A campus on the map close to the town. Name the college and the gate." },
      { name: "University hospital", detail: "Hospital, about 2 km", text: "A hospital listed with the campus. Give the entrance you need." },
      { name: "Taif International Airport", detail: "Airport, about 6 km", text: "The airport on the map. Tell us the terminal if you know it." },
      { name: "King Salman Specialized Hospital", detail: "Hospital, about 7 km", text: "A specialised hospital on the map. Give the entrance you need." },
    ],
    plan: [
      { title: "Pick the direction and the day", text: "Choose Makkah to Al Hawiyah, the reverse, or both. A same-day return is realistic at this distance." },
      { title: "Send both addresses", text: "A hotel, tower or district in Makkah, and a campus, hospital, neighbourhood or pin in Al Hawiyah." },
      { title: "Say who and what is travelling", text: "Passengers, bags, child seats if needed. The group size decides the vehicle." },
      { title: "Confirm the fare before you commit", text: "We reply with the vehicle, driver details and fare. Nothing is agreed until you say yes." },
    ],
    info: [
      { title: "Time on the road", text: "Routing data gives about 1 hour 20 minutes in light traffic. It is not a promised journey time. Mountain weather and holiday traffic add to it." },
      { title: "What changes the quotation", text: "The distance, exact addresses, date and time, passengers, bags, waiting time and whether you want a return. Fares are not published." },
      { title: "Same name, different places", text: "Maps show Al Hawiyah near Taif and other places with similar names. Send a map pin if you are not sure." },
      { title: "Controlled access in Makkah", text: "Roads near the Haram are controlled. The meeting point in Makkah is agreed in advance." },
    ],
    related: ["makkah-to-taif", "hada", "ash-shafa", "turbah"],
    faq: [
      { q: "How can I book a Makkah to Al Hawiyah taxi?", a: "Send the pickup in Makkah, the drop-off in Al Hawiyah, the date, time and passengers by WhatsApp or the booking form. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book Al Hawiyah to Makkah on this page?", a: "Yes. This page covers both directions. Use the Al Hawiyah to Makkah WhatsApp button, or send the pickup in Al Hawiyah and the drop-off in Makkah." },
      { q: "Which Al Hawiyah is this?", a: "This page covers Al Hawiyah in Taif Governorate, east of Taif city. If your destination is a different place with a similar name, send a map pin." },
      { q: "How far is Al Hawiyah from Makkah by road?", a: "About 109 km, roughly 1 hour 20 minutes in light traffic. It is not a promised journey time." },
      { q: "Which road does the route use?", a: "Routing data shows Route 40, the Makkah Al Mukarramah Road, for about 86 km. The exact route depends on your addresses and traffic." },
      { q: "Can I request a return journey?", a: "Yes. Ask for the outbound ride and the return in one request, with a pickup window for the return. Availability is confirmed with you." },
    ],
    directions:
      "From central Makkah, drivers take King Abdulaziz Road and King Faisal Road east and join Route 40, the Makkah Al Mukarramah Road, the highway towards Taif and Riyadh. Route 40 carries the drive for roughly eighty-six kilometres and passes the mountain side of Taif before a final stretch leaves the highway for Al Hawiyah. Routing data gives about 109 kilometres. The exact route depends on your pickup point, your drop-off, the weather and the traffic on the day, so the driver confirms the best road. Allow extra time if fog or rain is forecast, and name your exact campus gate.",
    localIntro: "Find Al Hawiyah on the map, read how Route 40 runs east from Makkah, and open the campuses and neighbourhoods of Al Hawiyah in Google Maps.",
    linkTitles: ["Makkah districts", "Al Hawiyah neighbourhoods and campuses", "On the highway and nearby", "Other Saudi destinations"],
    linkGroups: [
      mk("Al Hindawiyah", "Ash Shuhada", "Ar Rusayfah", "Al Utaybiyah", "Az Zahir", "Al Kakiyah"),
      [
        ["Al Hawiyah town centre", "Al Hawiyah, Taif, Saudi Arabia"],
        ["Taif University, Al Hawiyah", "جامعة الطائف, الحوية, السعودية"],
        ["Taif University College of Medicine", "Taif University College of Medicine, Al Hawiyah, Saudi Arabia"],
        ["University hospital, Al Hawiyah", "مستشفى الجامعة, الحوية, السعودية"],
        ["King Salman Specialized Hospital", "مستشفى الملك سلمان التخصصي, الطائف, السعودية"],
        ["Taif International Airport", "Taif International Airport, Saudi Arabia"],
        ["Al Mutarid", "المعترض, الحوية, السعودية"],
        ["Al Wakra", "الوكرة, الحوية, السعودية"],
        ["Al Jawharah", "الجوهرة, الحوية, السعودية"],
        ["As Sayl as Saghir", "السيل الصغير, الحوية, السعودية"],
      ],
      [...plain("Taif"), ...sa("Taif", "Al Hada", "Ash Shafa", "Qiya")],
      plain("Jeddah", "Riyadh", "Abha", "Al Baha", "Madinah"),
    ],
    ctaHeading: "Ready to travel between Makkah and Al Hawiyah?",
    ctaText: "Message us on WhatsApp with the direction you need, or send the booking form. The vehicle, driver and fare are confirmed with you before you commit.",
  },
  {
    id: "dhahban",
    name: "Dhahban",
    ar: "ذهبان",
    lat: 21.931,
    lng: 39.1182,
    area: "Dhahban, Jeddah Governorate, Makkah Region",
    regionLabel: "Makkah Region",
    areaSuffix: "Dhahban, Saudi Arabia",
    title: "Makkah to Dhahban Taxi Service | Private Rides",
    description: "Makkah to Dhahban taxi service: private rides both ways via the Jeddah expressway and coast road, fare confirmed first. Send your trip on WhatsApp to book.",
    h1: "Makkah to Dhahban Taxi Service",
    lead: "A private Makkah to Dhahban taxi service for the drive west to Jeddah and north on the coast road, in both directions. Send your pickup, drop-off, date and passengers, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "Gulf Elite Transport Group takes requests for private taxi rides between Makkah and Dhahban, a village north of Jeddah in Jeddah Governorate, about 127 km by road and roughly 1 hour 30 minutes in light traffic, and the same trip back from Dhahban to Makkah. You send the pickup address, the drop-off address, the date and time and how many people and bags are travelling, by WhatsApp or the booking form. We confirm the vehicle, the driver and the fare before you commit. Fares and availability are not published and depend on the date and your addresses.",
    eyebrow: "Private intercity taxi · Makkah to Dhahban",
    heroPoints: ["Door-to-door pickup in Makkah or Dhahban", "Transfers by way of Jeddah", "One-way, return and same-day return requests", "Vehicle, driver and fare confirmed first"],
    km: 126.6,
    min: 91,
    facts: [
      { label: "Main roads", value: "Jeddah to Makkah Expressway, then Al Haramain Road (Route 5)" },
      { label: "Place", value: "Village in Jeddah Governorate" },
    ],
    introHeading: "Through Jeddah to Dhahban",
    intro: [
      "Dhahban is a village on the coast north of Jeddah, in Jeddah Governorate. The drive from Makkah is about 127 km, and it runs along the expressway to Jeddah and then north on the coastal road. A private taxi suits residents and families going home, visitors to the neighbourhoods the map lists around the village, and travellers who want one car for the whole journey.",
      "This page covers both directions. For a Dhahban to Makkah taxi service, send the same details the other way round. A Makkah to Dhahban private car and the return can be requested together, and there is no separate page for the reverse journey. Jeddah has its own page.",
    ],
    out: {
      heading: "Makkah to Dhahban",
      paragraphs: [
        "Routing data leaves Makkah on Umm Al Qura Road, follows the Jeddah to Makkah Expressway for about 57 km, then Al Haramain Road, Route 5, for about 44 km, and finishes on a road of about 16 km into Dhahban. Most of the drive is on two big roads, with one change of road near Jeddah.",
        "Dhahban lies north of Jeddah, so tell us whether you are going to the village or to one of the many neighbourhoods around it. A map pin is the clearest answer.",
      ],
    },
    back: {
      heading: "Dhahban to Makkah",
      paragraphs: [
        "For a Dhahban to Makkah private taxi, we collect you from the address you give in Dhahban and drive back on the same roads. A return in the same request, with a pickup window instead of a fixed minute, is easier to plan.",
        "Vehicle access around the Haram is controlled, so tell us which hotel or district you are going to in Makkah and agree the drop-off point before you travel. Entry to Makkah is for Muslims only, and this is the traveller's responsibility.",
      ],
    },
    pickups: [
      { name: "A hotel or tower in Makkah", text: "Give the hotel or building name and the entrance you want, and a phone number that will be answered. Access near the Haram is controlled, so the meeting point is agreed with you first." },
      { name: "A home or apartment in Makkah", text: "Send the district, street and building, or a map pin. Districts such as Al Aziziyah, Ash Shawqiyah and Al Utaybiyah are a few kilometres from the centre." },
      { name: "A pickup on the Jeddah side of Makkah", text: "The route leaves by the west of the city. If you are on that side, a pin saves time at the start." },
    ],
    drops: [
      { name: "Dhahban village", text: "The map shows Dhahban Town and neighbourhoods such as Al Gharbiyyah, Al Zahur and Al Majami within about 4 km. Give the neighbourhood and a street or pin." },
      { name: "The neighbourhoods near the coast", text: "Neighbourhoods such as Al Shuwaidhi, Al Ushayriyyah and Tabah are within about 4 km. Name the neighbourhood and a landmark." },
      { name: "Northern Jeddah", text: "Many districts of northern Jeddah, such as Al Aqiq and Al Furqan, are within about 6 km. Give the district and the building or a pin." },
      { name: "University of Jeddah", text: "The university is listed about 15 km from the village. Controlled campuses decide who may drive in, so agree a meeting point at the gate." },
    ],
    placesHeading: "Real places around Dhahban",
    placesIntro: "These names come from OpenStreetMap and Nominatim and are useful as drop-off or pickup references. We do not publish opening hours or entry rules for any of them.",
    places: [
      { name: "Dhahban Town", detail: "Neighbourhood, about 1 km", text: "The old village core on the map. Say clearly whether you are going to the town or a newer district." },
      { name: "Al Zahur", detail: "Neighbourhood, about 4 km", text: "A neighbourhood on the map. Say a street or landmark." },
      { name: "Al Majami", detail: "Neighbourhood, about 3 km", text: "A neighbourhood on the map. Name a landmark." },
      { name: "University of Jeddah", detail: "University, about 15 km", text: "The campus on the map. Name the gate or the building." },
    ],
    plan: [
      { title: "Pick the direction and the day", text: "Choose Makkah to Dhahban, the reverse, or both. A same-day return is realistic at this distance." },
      { title: "Send both addresses", text: "A hotel, tower or district in Makkah, and a neighbourhood, landmark or pin in Dhahban." },
      { title: "Say who and what is travelling", text: "Passengers, bags, child seats if needed. The group size decides the vehicle." },
      { title: "Confirm the fare before you commit", text: "We reply with the vehicle, driver details and fare. Nothing is agreed until you say yes." },
    ],
    info: [
      { title: "Time on the road", text: "Routing data gives about 1 hour 30 minutes in light traffic. It is not a promised journey time. Traffic around Jeddah can add to it." },
      { title: "What changes the quotation", text: "The distance, exact addresses, date and time, passengers, bags, waiting time and whether you want a return. Fares are not published." },
      { title: "A map pin helps", text: "Northern Jeddah has many neighbourhoods with similar names. A map pin from your phone is the surest way to give the exact stop." },
      { title: "Controlled access in Makkah", text: "Roads near the Haram are controlled. The meeting point in Makkah is agreed in advance." },
    ],
    related: ["jeddah", "thuwal", "bahrah", "rabigh"],
    faq: [
      { q: "How can I book a Makkah to Dhahban taxi?", a: "Send the pickup in Makkah, the drop-off in Dhahban, the date, time and passengers by WhatsApp or the booking form. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book Dhahban to Makkah on this page?", a: "Yes. This page covers both directions. Use the Dhahban to Makkah WhatsApp button, or send the pickup in Dhahban and the drop-off in Makkah." },
      { q: "Where is Dhahban?", a: "Dhahban is a village on the coast north of Jeddah, in Jeddah Governorate. If your destination is a different place with a similar name, send a map pin." },
      { q: "How far is Dhahban from Makkah by road?", a: "About 127 km, roughly 1 hour 30 minutes in light traffic. It is not a promised journey time." },
      { q: "Which roads does the route use?", a: "Routing data shows the Jeddah to Makkah Expressway and Al Haramain Road, Route 5. The exact route depends on your addresses and traffic." },
      { q: "Can I request a return journey?", a: "Yes. Ask for the outbound ride and the return in one request, with a pickup window for the return. Availability is confirmed with you." },
    ],
    directions:
      "From central Makkah, drivers take Umm Al Qura Road and join the Jeddah to Makkah Expressway, which carries the drive for roughly fifty-seven kilometres. Near Jeddah the route continues north on Al Haramain Road, Route 5, for about forty-four kilometres, and a final road of around sixteen kilometres leads into Dhahban. Routing data gives about 127 kilometres. The exact route depends on your pickup point, your drop-off, and the traffic on the day, so the driver confirms the best road with you before leaving. Name the neighbourhood in Dhahban or send a pin, because northern Jeddah has many similar names.",
    localIntro: "Find Dhahban on the map, read how the expressway and coast road run from Makkah, and open the neighbourhoods around Dhahban in Google Maps.",
    linkTitles: ["Makkah districts", "Dhahban and northern Jeddah", "On the road and nearby", "Other Saudi destinations"],
    linkGroups: [
      mk("Al Aziziyah", "Ash Shawqiyah", "Al Utaybiyah", "An Nuzhah", "Al Misfalah", "Az Zahir"),
      [
        ["Dhahban village", "Dhahban, Saudi Arabia"],
        ["Dhahban Town", "بلدة ذهبان, ذهبان, السعودية"],
        ["Al Gharbiyyah, Dhahban", "الغربية, ذهبان, السعودية"],
        ["Al Zahur", "الزهور, ذهبان, السعودية"],
        ["Al Majami", "المجامع, ذهبان, السعودية"],
        ["Al Shuwaidhi", "الشويضي, ذهبان, السعودية"],
        ["Al Ushayriyyah", "العشيرية, ذهبان, السعودية"],
        ["Tabah", "طابة, ذهبان, السعودية"],
        ["Al Aqiq, Jeddah", "العقيق, جدة, السعودية"],
        ["University of Jeddah", "جامعة جدة, السعودية"],
      ],
      sa("Makkah Region", "Jeddah", "Thuwal", "Bahrah", "Rabigh", "Khulais"),
      plain("Madinah", "Yanbu", "Taif", "Riyadh"),
    ],
    ctaHeading: "Ready to travel between Makkah and Dhahban?",
    ctaText: "Message us on WhatsApp with the direction you need, or send the booking form. The vehicle, driver and fare are confirmed with you before you commit.",
  },
];
