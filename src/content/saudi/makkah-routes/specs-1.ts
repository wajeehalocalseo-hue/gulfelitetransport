import type { TownSpec } from "../town-routes/factory";
import { mk, sa, plain } from "./shared";

/**
 * Makkah to Jeddah and Makkah to Taif.
 * Sources: OpenStreetMap routing from the Makkah centre (21.4225, 39.8262) to each city centre, reviewed November 2026 (roads, distance, light-traffic time);
 * OpenStreetMap place, park, museum and historic names near each centre; Nominatim for the administrative area (Makkah Region).
 * Not claimed: fares, journey-time guarantees, offices or drivers in either city, opening hours, access to any site.
 */
export const specs1: TownSpec[] = [
  {
    id: "jeddah",
    name: "Jeddah",
    ar: "جدة",
    lat: 21.5433,
    lng: 39.1728,
    area: "Jeddah, Makkah Region",
    regionLabel: "Makkah Region",
    areaSuffix: "Jeddah, Saudi Arabia",
    title: "Makkah to Jeddah Taxi Service | Private Rides",
    description: "Makkah to Jeddah taxi service: private rides both ways, return trips and airport transfers, fare confirmed first. Send your trip on WhatsApp to book.",
    h1: "Makkah to Jeddah Taxi Service",
    lead: "A private Makkah to Jeddah taxi service for the expressway to the Red Sea coast, in both directions. Send your pickup, drop-off, date and passengers, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "Gulf Elite Transport Group takes requests for private taxi rides between Makkah and Jeddah, about 89 km by road and roughly 1 hour 5 minutes in light traffic, and the same trip back from Jeddah to Makkah, including transfers to and from King Abdulaziz International Airport. You send the pickup address, the drop-off address, the date and time and how many people and bags are travelling, by WhatsApp or the booking form. We confirm the vehicle, the driver and the fare before you commit. Fares and availability are not published and depend on the date and your addresses.",
    eyebrow: "Private intercity taxi · Makkah to Jeddah",
    heroPoints: ["Door-to-door pickup in Makkah or Jeddah", "Airport, hotel and home transfers", "One-way, return and same-day return requests", "Vehicle, driver and fare confirmed first"],
    km: 88.7,
    min: 65,
    facts: [
      { label: "Main road", value: "Jeddah to Makkah Expressway (Route 40)" },
      { label: "Airport", value: "King Abdulaziz International Airport (JED)" },
    ],
    introHeading: "The expressway between the two cities",
    intro: [
      "Makkah and Jeddah are the two ends of the busiest road in Makkah Region. A private taxi from Makkah to Jeddah is a single-car journey of about 89 km, so it suits people who want one driver from the hotel door to the next stop: pilgrims leaving for the airport, families visiting relatives on the coast, and visitors who combine a stay in Makkah with a day in Jeddah.",
      "This page covers both directions. If you are in Jeddah and need to reach Makkah, send the same details the other way round and we plan the trip in the same way. A Makkah to Jeddah private car and the return can be requested in one message, and there is no separate page for the reverse journey.",
    ],
    out: {
      heading: "Makkah to Jeddah",
      paragraphs: [
        "Routing data starts on Umm Al Qura Road in Makkah, joins the Jeddah to Makkah Expressway, Route 40, for most of the distance, and ends on Al Haramain Road and King Abdullah Road in Jeddah. A Makkah to Jeddah taxi booking therefore follows one main road, which is easy for a driver to plan and for you to follow on a map.",
        "Many requests are for King Abdulaziz International Airport, which OpenStreetMap places about 16 km from the centre of Jeddah. Send the flight number and the time you must be at the terminal, and the departure from Makkah is worked out backwards from it, with a margin that you choose.",
      ],
    },
    back: {
      heading: "Jeddah to Makkah",
      paragraphs: [
        "For a Jeddah to Makkah taxi service we collect you from the address you give in Jeddah and drive the same expressway in the other direction. Pilgrims arriving at the airport often ask for a car straight to a hotel in Makkah, and a Jeddah to Makkah private taxi can be booked in the same request as the outbound ride.",
        "Vehicle access around the Haram is controlled, so tell us which hotel or tower you are going to and agree the drop-off point before you travel. Entry to Makkah is for Muslims only, and this is the traveller's responsibility.",
      ],
    },
    pickups: [
      { name: "A hotel or tower in Makkah", text: "Give the hotel or building name and the entrance you want, and a phone number that will be answered. Access near the Haram is controlled, so the meeting point is often on the edge of the zone and is agreed with you first." },
      { name: "A home or apartment in Makkah", text: "Send the district, street and building number, or a map pin. Districts such as Al Aziziyah, Ash Shawqiyah and Al Utaybiyah are all within a few kilometres of the centre, so the district name helps us plan the pickup time." },
      { name: "Makkah Haramain railway station", text: "OpenStreetMap lists the Haramain High Speed Railway station in Makkah. If you arrive by train and want a car on to Jeddah, send the train time and your passengers and bags, and we agree the pickup point with you." },
    ],
    drops: [
      { name: "King Abdulaziz International Airport", text: "Send the flight number, the date and the terminal if you know it. The airport sets where cars may collect and drop, and we agree the point with you before you travel." },
      { name: "A hotel or home in Jeddah", text: "Jeddah is large, so name the district, such as Al Hamra, Al Rawdah or Ash Sharafiyah, and the building or a pin. This saves the driver time on arrival." },
      { name: "Historic Jeddah (Al Balad)", text: "The old district about 6 km from the centre has narrow streets, so the car often waits at an edge of the quarter. Agree where to meet and allow time to walk the last stretch." },
      { name: "The Jeddah railway station", text: "OpenStreetMap lists the Haramain High Speed Railway station in the Al Sulimaniyah district. Send the train time if you are connecting." },
    ],
    placesHeading: "Real places around Jeddah",
    placesIntro: "These names come from OpenStreetMap and Nominatim and are useful as drop-off or pickup references. We do not publish opening hours or entry rules for any of them.",
    places: [
      { name: "Historic Jeddah (Al Balad)", detail: "Historic district, about 6 km", text: "The old quarter on the map, with city gates and heritage houses. Check opening hours of any site you plan to visit; we do not publish them." },
      { name: "King Abdulaziz International Airport", detail: "Airport, about 16 km", text: "The airport is north of the centre. Tell us the terminal if you know it." },
      { name: "Al Tayibat City Museum for International Civilization", detail: "Museum, about 4 km", text: "A museum listed on the map in the city. Confirm opening hours with the museum itself." },
      { name: "Matbouli House Museum", detail: "Museum, about 7 km", text: "A heritage house in the old quarter on the map. Streets around it are narrow, so agree where the car waits." },
      { name: "Haramain railway station, Al Sulimaniyah", detail: "Station, about 8 km", text: "The Jeddah stop on the high-speed line between the holy cities." },
    ],
    plan: [
      { title: "Pick the direction and the day", text: "Choose Makkah to Jeddah, the reverse, or both. A same-day return is realistic for this distance." },
      { title: "Send both addresses", text: "A hotel, tower or district in Makkah, and a terminal, hotel or district in Jeddah." },
      { title: "Say who and what is travelling", text: "Passengers, bags, child seats if needed. The group size decides the vehicle." },
      { title: "Confirm the fare before you commit", text: "We reply with the vehicle, driver details and fare. Nothing is agreed until you say yes." },
    ],
    info: [
      { title: "Time on the road", text: "Routing data gives about 1 hour 5 minutes in light traffic. It is not a promised journey time. Prayer times, pilgrim seasons and airport peaks make the road slower." },
      { title: "What changes the quotation", text: "The distance, exact addresses, date and time, passengers, bags, waiting time and whether you want a return. Fares are not published." },
      { title: "Peak seasons", text: "Ramadan, Hajj and school holidays are the busiest periods on this road. Book early and give a pickup window instead of a fixed minute." },
      { title: "Controlled access in Makkah", text: "Roads near the Haram are controlled. We cannot promise a door-to-door stop in the central zone, and the meeting point is agreed in advance." },
    ],
    related: ["taif", "bahrah", "riyadh-to-makkah", "makkah-to-madinah", "makkah-to-yanbu"],
    faq: [
      { q: "How can I book a Makkah to Jeddah taxi?", a: "Send the pickup in Makkah, the drop-off in Jeddah, the date, time and passengers by WhatsApp or the booking form. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a Jeddah to Makkah taxi service on this page?", a: "Yes. This page covers both directions. Use the Jeddah to Makkah WhatsApp button, or send the pickup in Jeddah and the drop-off in Makkah." },
      { q: "How far is Jeddah from Makkah by road?", a: "About 89 km, roughly 1 hour 5 minutes in light traffic. It is not a promised journey time." },
      { q: "Can you take me from Makkah to Jeddah airport?", a: "Yes. Send the flight number, date and terminal if known. The pickup time in Makkah is worked out from your flight, and the airport sets where cars may drop off." },
      { q: "Can I request a return taxi from Jeddah to Makkah?", a: "Yes. Ask for the outbound ride and the return in one request, with a pickup window for the return. Availability is confirmed with you." },
      { q: "Can the driver wait while I finish my visit?", a: "Waiting can be requested. Tell us how long you expect, and we agree it and its cost before you commit." },
    ],
    directions:
      "Drivers leave central Makkah on Umm Al Qura Road and join the Jeddah to Makkah Expressway, Route 40, which carries the traffic west for most of the distance. Near Jeddah the route continues on Al Haramain Road, Route 5, and then on King Abdullah Road towards the city centre. Routing data gives about 89 kilometres in all. The exact route depends on your pickup point, your drop-off in Jeddah or at the airport, and the traffic on the day, so the driver confirms the best road with you before you set out, and may change it if road conditions change.",
    localIntro: "Find Jeddah on the map, read how the expressway runs west from Makkah, and open the districts of both cities in Google Maps.",
    linkTitles: ["Makkah districts", "Jeddah districts and landmarks", "Along the route and nearby", "Other Saudi destinations"],
    linkGroups: [
      mk("Al Aziziyah", "Ash Shawqiyah", "Al Utaybiyah", "An Nuzhah", "Al Misfalah", "Az Zahir", "Makkah Haramain railway station"),
      [
        ...sa("Jeddah", "Al Balad", "Al Hamra", "Al Rawdah", "Ash Sharafiyah", "Al Faisaliyyah", "Al Safa", "Ar Ruwais"),
        ["King Abdulaziz International Airport", "King Abdulaziz International Airport, Jeddah, Saudi Arabia"],
        ["Jeddah Islamic Seaport", "Jeddah Islamic Port, Jeddah, Saudi Arabia"],
      ],
      sa("Makkah Region", "Bahrah", "Dhahban", "Thuwal", "Rabigh"),
      plain("Taif", "Madinah", "Yanbu", "Al Lith", "Riyadh"),
    ],
    ctaHeading: "Ready to travel between Makkah and Jeddah?",
    ctaText: "Message us on WhatsApp with the direction you need, or send the booking form. The vehicle, driver and fare are confirmed with you before you commit.",
  },
  {
    id: "taif",
    name: "Taif",
    ar: "الطائف",
    lat: 21.2703,
    lng: 40.4158,
    area: "Taif, Makkah Region",
    regionLabel: "Makkah Region",
    areaSuffix: "Taif, Saudi Arabia",
    title: "Makkah to Taif Taxi Service | Private Rides",
    description: "Makkah to Taif taxi service: private family rides both ways over the mountain road, fare confirmed first. Send your trip on WhatsApp to book.",
    h1: "Makkah to Taif Taxi Service",
    lead: "A private Makkah to Taif taxi service for the climb from the holy city to the hills, in both directions. Send your pickup, drop-off, date and passengers, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "Gulf Elite Transport Group takes requests for private taxi rides between Makkah and Taif, about 89 km by road and roughly 1 hour 15 minutes in light traffic, and the same trip back from Taif to Makkah. You send the pickup address, the drop-off address, the date and time and how many people and bags are travelling, by WhatsApp or the booking form. We confirm the vehicle, the driver and the fare before you commit. Fares and availability are not published and depend on the date, the weather on the mountain road and your addresses.",
    eyebrow: "Private intercity taxi · Makkah to Taif",
    heroPoints: ["Door-to-door pickup in Makkah or Taif", "Family trips and weekend breaks in the hills", "One-way, return and same-day return requests", "Vehicle, driver and fare confirmed first"],
    km: 88.8,
    min: 73,
    facts: [
      { label: "Main road", value: "Al Kara to Al Hada mountain road" },
      { label: "Climb", value: "From the Makkah basin to the Taif plateau" },
    ],
    introHeading: "Up the mountain road to Taif",
    intro: [
      "Taif sits on a plateau in the Hijaz mountains, so the drive from Makkah is a climb, and the air is noticeably cooler when you arrive. A private taxi for this trip is a single-car journey of about 89 km. It suits families taking a break from the heat, groups combining a visit to Makkah with a few days in the hills, and travellers who would rather not drive the mountain road themselves.",
      "This page covers both directions. For a Taif to Makkah taxi service, send the same details the other way round and we plan the return in the same way. A Makkah to Taif private car and the return can be requested together, and there is no separate page for the reverse journey.",
    ],
    out: {
      heading: "Makkah to Taif",
      paragraphs: [
        "Routing data leaves Makkah on King Abdulaziz Road, then follows Prince Sultan Road for about 21 km before the climb begins on the Al Kara to Al Hada road. About 60 km of the drive is on that road, and it ends on King Faisal Road in Taif. The road is steep and winding in places, so the driver sets the pace for the conditions.",
        "Tell us if you are going on to Al Hada, Ash Shafa or Al Hawiyah, which are all on the Taif side of the mountain, so the plan can cover the extra stretch. A Makkah to Taif family transport request should also say how many children are travelling.",
      ],
    },
    back: {
      heading: "Taif to Makkah",
      paragraphs: [
        "For a Taif to Makkah private taxi, we collect you from the address you give in Taif and drive down the same mountain road. The descent is shorter in time than the climb, but fog, rain and heavy traffic can slow it, so a pickup window is better than a fixed minute.",
        "Vehicle access around the Haram is controlled, so tell us which hotel or tower you are going to in Makkah and agree the drop-off point before you travel. Entry to Makkah is for Muslims only, and this is the traveller's responsibility.",
      ],
    },
    pickups: [
      { name: "A hotel or tower in Makkah", text: "Give the hotel or building name and the entrance you want, and a phone number that will be answered. Access near the Haram is controlled, so the meeting point is agreed with you first." },
      { name: "A home or apartment in Makkah", text: "Send the district, street and building number, or a map pin. Districts such as Al Hindawiyah, Ash Shuhada and Ar Rusayfah are a few kilometres from the centre, so the district name helps us plan the pickup." },
      { name: "A pickup on the Makkah side of the climb", text: "If you are staying near the Taif road, say so. A pin on the road side of the city can save time at the start of the journey." },
    ],
    drops: [
      { name: "Taif city centre", text: "The old quarter has city gates, Al-Aabbas, Al-Reea and Al-Hazm, within about 1 km of the centre on the map. Give the street or a pin, since traffic in the centre is slow at busy times." },
      { name: "Shubra and Al Aqeeq", text: "Neighbourhoods such as Shubra, Al Aqeeq and Al Nuzha are within about 2 km of the centre. Name the neighbourhood and a landmark." },
      { name: "A park, palace or museum", text: "Taif Zoo, King Fahad Park, Shubra Palace and the Al-Sharif Museum are all marked on the map. We do not publish opening hours or entry rules, so check them with the site." },
      { name: "Al Hada, Ash Shafa and Al Hawiyah", text: "These places lie on the Taif side of the mountain, between about 5 and 25 km from the centre. Name the exact place and a landmark so the driver does not take the wrong road." },
    ],
    placesHeading: "Real places around Taif",
    placesIntro: "These names come from OpenStreetMap and Nominatim and are useful as drop-off or pickup references. We do not publish opening hours or entry rules for any of them.",
    places: [
      { name: "Shubra Palace", detail: "Museum, about 2 km", text: "A palace listed as a museum on the map, in the Shubra neighbourhood. Check its opening hours before you go." },
      { name: "Taif Zoo", detail: "Zoo, about 5 km", text: "A zoo listed on the map. Agree the gate where the car should wait." },
      { name: "King Fahad Park", detail: "Park, about 4 km", text: "A large park on the map, useful as an easy-to-find meeting point." },
      { name: "Al-Sharif Museum", detail: "Museum, about 4 km", text: "A museum on the map. Confirm opening hours with the museum itself." },
      { name: "Jabra Historic Palace", detail: "Attraction, about 4 km", text: "A historic palace in the Jabrah neighbourhood on the map." },
    ],
    plan: [
      { title: "Pick the direction and the day", text: "Choose Makkah to Taif, the reverse, or both. A same-day return is possible, and many families stay overnight." },
      { title: "Send both addresses", text: "A hotel, tower or district in Makkah, and a hotel, neighbourhood or landmark in Taif." },
      { title: "Say who and what is travelling", text: "Passengers, children, bags, child seats if needed. The group size decides the vehicle." },
      { title: "Confirm the fare before you commit", text: "We reply with the vehicle, driver details and fare. Nothing is agreed until you say yes." },
    ],
    info: [
      { title: "Time on the road", text: "Routing data gives about 1 hour 15 minutes in light traffic. It is not a promised journey time. The climb, fog, rain and holiday traffic add to it." },
      { title: "What changes the quotation", text: "The distance, exact addresses, date and time, passengers, bags, waiting time and whether you want a return. Fares are not published." },
      { title: "Weather on the mountain", text: "Taif is cooler than Makkah, and the mountain road can be foggy or wet. The weather strip below shows current conditions in both places." },
      { title: "Controlled access in Makkah", text: "Roads near the Haram are controlled. The meeting point in Makkah is agreed in advance." },
    ],
    related: ["jeddah", "hada", "al-hawiyah", "ash-shafa", "makkah-to-madinah"],
    faq: [
      { q: "How can I book a Makkah to Taif taxi?", a: "Send the pickup in Makkah, the drop-off in Taif, the date, time and passengers by WhatsApp or the booking form. We confirm the vehicle, driver and fare before you commit." },
      { q: "Can I book a Taif to Makkah taxi service on this page?", a: "Yes. This page covers both directions. Use the Taif to Makkah WhatsApp button, or send the pickup in Taif and the drop-off in Makkah." },
      { q: "How far is Taif from Makkah by road?", a: "About 89 km, roughly 1 hour 15 minutes in light traffic. It is not a promised journey time, and the mountain road can be slower in fog or rain." },
      { q: "Can I request a family trip from Makkah to Taif?", a: "Yes. Tell us how many adults and children are travelling, and how many bags, and say if you need a child seat. We confirm the vehicle before you commit." },
      { q: "Can I book a return taxi from Taif to Makkah?", a: "Yes. Ask for the outbound ride and the return in one request, with a pickup window for the return. Availability is confirmed with you." },
      { q: "Which road does the route use?", a: "Routing data shows King Abdulaziz Road and Prince Sultan Road in Makkah, then the Al Kara to Al Hada road up the mountain. The exact route depends on your addresses and conditions." },
    ],
    directions:
      "From central Makkah, drivers take King Abdulaziz Road and then Prince Sultan Road east for about twenty kilometres. The climb to the plateau follows the Al Kara to Al Hada road, which carries most of the distance and is steep and winding in places. The route ends on King Faisal Road in Taif. Routing data gives about 89 kilometres. The exact route depends on your pickup point, your drop-off in Taif or at Al Hada, the weather on the mountain and the traffic on the day, so the driver confirms the best road with you before leaving, adjusting if needed.",
    localIntro: "Find Taif on the map, read how the mountain road climbs east from Makkah, and open the districts and landmarks of both cities in Google Maps.",
    linkTitles: ["Makkah districts", "Taif districts and landmarks", "Along the climb and nearby", "Other Saudi destinations"],
    linkGroups: [
      mk("Al Hindawiyah", "Ash Shuhada", "Ar Rusayfah", "Al Kakiyah", "Al Mansur", "Jarwal", "Kudy"),
      sa("Taif", "Shubra Palace", "Al-Hazm Gate", "King Fahad Park", "Taif Zoo", "Al Faisaliyah", "Al Nuzha", "Shubra", "Al Narjis", "Al-Sharif Museum"),
      sa("Taif", "Al Hada", "Ash Shafa", "Al Hawiyah"),
      plain("Jeddah", "Madinah", "Al Baha", "Abha", "Riyadh", "Al Lith"),
    ],
    ctaHeading: "Ready to travel between Makkah and Taif?",
    ctaText: "Message us on WhatsApp with the direction you need, or send the booking form. The vehicle, driver and fare are confirmed with you before you commit.",
  },
];
