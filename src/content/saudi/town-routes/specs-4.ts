import type { TownSpec } from "./factory";

/**
 * Riyadh to Shaqra (and the towns added to this file later).
 * Sources: OpenStreetMap routing from the Riyadh centre to the town centre, reviewed November 2026; OpenStreetMap and Nominatim place, hospital, university, museum and park names near the town centre.
 * Not claimed: fares, journey-time guarantees, offices or drivers in the town, opening hours, access to any site.
 */
export const specs4: TownSpec[] = [
  {
    id: "shaqra",
    name: "Shaqra",
    ar: "شقراء",
    lat: 25.2483,
    lng: 45.2528,
    area: "Shaqra, Riyadh Region",
    title: "Riyadh to Shaqra Taxi Service | Private Rides",
    description: "Riyadh to Shaqra taxi service: private rides both ways, fare confirmed before you commit. Call +966 57 985 8464 or message us on WhatsApp.",
    h1: "Riyadh to Shaqra Taxi Service",
    lead: "A private Riyadh to Shaqra taxi service for the drive west on Routes 546 and 50, in both directions. Send your pickup, drop-off, date and passengers, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer:
      "Gulf Elite Transport Group takes requests for private taxi rides between Riyadh and Shaqra, about 187 km by road and roughly 2 hours 10 minutes in light traffic, and the same trip back from Shaqra to Riyadh. Send the pickup address, the drop-off address, the date and time and the number of passengers and bags by WhatsApp, phone or the booking form. We confirm the vehicle, driver and fare before you commit. Fares and availability are not published and depend on the date and your addresses.",
    eyebrow: "Private intercity taxi · Riyadh to Shaqra",
    heroPoints: ["Door-to-door pickup in Riyadh or Shaqra", "One-way, return and same-day return requests", "Family visits, work trips and university journeys", "Vehicle, driver and fare confirmed first"],
    km: 186.9,
    min: 131,
    facts: [
      { label: "Main roads", value: "Routes 65, 535, 546 and 50" },
      { label: "Heritage", value: "Al-Subai'i House for Heritage" },
    ],
    introHeading: "West from Riyadh to Shaqra",
    intro: [
      "Shaqra is a city in the west of Riyadh Region, on the same road system that continues towards Al Dawadmi and Afif. At about 187 km by road it is a drive of just over two hours in light traffic, long enough that one driver for the whole trip makes sense, and short enough for a day return.",
      "A private taxi suits families visiting relatives, staff and students travelling to Shaqra University, and anyone carrying luggage or gifts. This page covers both directions, so you can ask for the outbound trip, the return, or both in the same request.",
    ],
    out: {
      heading: "Riyadh to Shaqra",
      paragraphs: [
        "Routing data starts on King Fahd Road in Riyadh, Route 65, then Banban Road and King Khalid Road, Route 535. The drive continues west on Salbukh Road and King Abdullah Road, both Route 546, and joins Route 50 only for the last few kilometres before Shaqra.",
        "Most of the distance is therefore on Route 546. If you must reach Shaqra by a set time, tell us the time and we plan the departure from Riyadh backwards from it.",
      ],
    },
    back: {
      heading: "Shaqra to Riyadh",
      paragraphs: [
        "For the trip back, we collect you from the address you give in Shaqra and drive east on the same roads. A return in the same booking, with a pickup window, is easier to plan than a request made later.",
        "If you are travelling to King Khalid International Airport, send the flight details. The pickup time in Shaqra is worked out from the flight, not from the distance alone.",
      ],
    },
    pickups: [
      { name: "A home or apartment in Riyadh", text: "Send the district, street and building, or a map pin, and the gate the car should use. Agree a meeting point outside a controlled gate if needed." },
      { name: "A hotel, office or university in Riyadh", text: "Give the building name and the entrance, and a phone number that will be answered. Large sites have several gates." },
      { name: "King Khalid International Airport (RUH)", text: "Send the flight number, date, terminal if you know it, passengers and bags. The pickup point follows the airport's rules and is agreed with you first." },
    ],
    drops: [
      { name: "Shaqra city centre", text: "King Fahad Park, the commercial market and the old hospital are all within about half a kilometre of the centre on the map. Give a street, a landmark or a pin." },
      { name: "Shaqra University", text: "OpenStreetMap places a university campus about 13 km from the centre. Send the building or gate you need, because campuses have several." },
      { name: "Ushayqir and nearby towns", text: "Ushayqir is a town about 13 km from Shaqra. Several villages lie between 4 and 20 km out, so name the village and a landmark." },
      { name: "Hospitals and health centres", text: "The old Shaqra hospital is close to the centre, and health centres serve nearby villages. Give the entrance and the appointment time. A ride is not a medical transport service." },
    ],
    placesHeading: "Real places around Shaqra",
    placesIntro: "These names come from OpenStreetMap and are useful as drop-off or pickup references. We do not publish opening hours or entry rules for any of them.",
    places: [
      { name: "Al-Subai'i House for Heritage", detail: "Museum, under 1 km", text: "A heritage house marked as a museum close to the centre. Check its opening hours before you plan a visit; we do not publish them." },
      { name: "King Fahad Park", detail: "Park, at the centre", text: "A park at the heart of the city on the map. A useful, easy-to-find meeting point." },
      { name: "Shaqra commercial market", detail: "Market, about 0.5 km", text: "The central market area. Streets here can be busy, so agree where the car should wait." },
      { name: "Ushayqir", detail: "Town, about 13 km", text: "A town north of Shaqra, with a nearby hill listed on the map. Say clearly whether you are going to Ushayqir or to Shaqra." },
      { name: "Shaqra University", detail: "University, about 13 km", text: "The main campus on the map is outside the city centre. Name the building or gate." },
    ],
    plan: [
      { title: "Pick the direction and the day", text: "Choose Riyadh to Shaqra, the reverse, or both. A day return is realistic for this distance." },
      { title: "Send both addresses", text: "A street, building or pin in Riyadh, and a street, landmark or pin in Shaqra." },
      { title: "Say who and what is travelling", text: "Passengers, bags, child seats if needed. The group size decides the vehicle." },
      { title: "Confirm the fare before you commit", text: "We reply with the vehicle, driver details and fare. Nothing is agreed until you say yes." },
    ],
    info: [
      { title: "Time on the road", text: "Routing data gives about 2 hours 10 minutes in light traffic. It is not a promised journey time, and stops, traffic and weather add to it." },
      { title: "What changes the quotation", text: "The distance, exact addresses, date and time, passengers, bags, waiting time and whether you want a return. Fares are not published." },
      { title: "Same corridor as Al Dawadmi", text: "Shaqra is on the road towards Al Dawadmi and Afif. If you are going further, ask for a plan that covers each stop, or see those pages." },
      { title: "Controlled sites", text: "Universities and hospitals can restrict who may drive in. Arrange permission yourself or agree a meeting point at the gate." },
    ],
    related: [],
    faq: [
      { q: "How can I book a taxi from Riyadh to Shaqra?", a: "Send the pickup in Riyadh, the drop-off in Shaqra, the date, time and passengers by WhatsApp, phone (+966 57 985 8464) or the booking form. We confirm the vehicle, driver and fare before you commit." },
      { q: "How far is Shaqra from Riyadh by road?", a: "About 187 km, roughly 2 hours 10 minutes in light traffic. It is not a promised journey time." },
      { q: "Can I book Shaqra to Riyadh on this page?", a: "Yes. This page covers both directions. Use the Shaqra to Riyadh WhatsApp button, or send the pickup in Shaqra and the drop-off in Riyadh." },
      { q: "Which roads does the route use?", a: "Routing data shows Route 65, Route 535 and Route 546 for most of the drive, with Route 50 for the last few kilometres. The exact route depends on your addresses and traffic." },
      { q: "Can I travel to Shaqra University?", a: "Yes. Give the building or gate you need. The campus is about 13 km from the city centre, and entry follows the university's own rules." },
      { q: "Can the driver wait while I finish my visit?", a: "Waiting can be requested. Tell us how long you expect, and we agree it and its cost before you commit." },
    ],
    directions:
      "From central Riyadh, drivers head west on King Fahd Road, Route 65, then use Banban Road and King Khalid Road, Route 535. The drive then continues west on Salbukh Road and King Abdullah Road, both signed Route 546, and only the final few kilometres join Route 50 on the approach to Shaqra. In the other direction, the same roads lead you back east to Riyadh after your visit. These road names come from OpenStreetMap routing and are a guide only. The exact route depends on your pickup address in Riyadh, your drop-off address in Shaqra, current traffic and road works.",
    localIntro: "Find Shaqra on the map, read how the roads run west from Riyadh, and open the city's landmarks and nearby villages in Google Maps.",
    linkTitles: ["Shaqra landmarks and services", "Villages near Shaqra", "More villages and towns", "Riyadh and nearby towns"],
    linkGroups: [
      [
        ["King Fahad Park, Shaqra", "حديقة الملك فهد, شقراء, السعودية"],
        ["Shaqra commercial market", "سوق شقراء التجاري, السعودية"],
        ["Al-Subai'i House for Heritage", "Al-Subai'i House for Heritage, Shaqra, Saudi Arabia"],
        ["Old Shaqra Hospital", "مستشفى شقراء القديم, السعودية"],
        ["Lake Park, Shaqra", "Lake Park, Shaqra, Saudi Arabia"],
        ["Al Waqf Park, Shaqra", "حديقة الوقف, شقراء, السعودية"],
        ["Shaqra University", "Shaqraa University, Saudi Arabia"],
      ],
      [
        ["Al Qara'in", "القرائن, شقراء, السعودية"],
        ["Ghuslah", "غسلة, شقراء, السعودية"],
        ["Hajir ash Shih", "حاجر الشيح, شقراء, السعودية"],
        ["Ash Shukayyirah", "الشكيرة, شقراء, السعودية"],
        ["Al Far'ah", "الفرعة, شقراء, السعودية"],
        ["Rawdat Du'ayj", "روضة دعيج, شقراء, السعودية"],
      ],
      [
        ["Ushayqir", "أشيقر, شقراء, السعودية"],
        ["Uthaythiyah", "أثيثية, شقراء, السعودية"],
        ["Ad Dabbiyat al Janubiyat", "الضبيات الجنوبيات, شقراء, السعودية"],
        ["Ad Dabbiyat ash Shamaliyat", "الضبيات الشماليات, شقراء, السعودية"],
        ["Al Mishash", "المشاش, شقراء, السعودية"],
        ["Al Jawfan", "الجوفان, شقراء, السعودية"],
      ],
      [
        ["Riyadh", "Riyadh, Saudi Arabia"],
        ["King Khalid International Airport", "King Khalid International Airport, Riyadh, Saudi Arabia"],
        ["Marat", "Marat, Riyadh Region, Saudi Arabia"],
        ["Thadiq", "Thadiq, Riyadh Region, Saudi Arabia"],
        ["Al Dawadmi", "Ad Dawadimi, Riyadh Region, Saudi Arabia"],
        ["Al Majma'ah", "Al Majma'ah, Riyadh Region, Saudi Arabia"],
      ],
    ],
    ctaHeading: "Ready to travel between Riyadh and Shaqra?",
    ctaText: "Message us in the direction you need, or call +966 57 985 8464. The vehicle, driver and fare are confirmed with you before you commit.",
  },
];
