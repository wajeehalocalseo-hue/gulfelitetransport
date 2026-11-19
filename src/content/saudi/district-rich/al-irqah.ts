import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Irqah Taxi Service: hand-written page for Al Irqah (Irqah / Ergah on OpenStreetMap), a residential district in west Riyadh that gives its name to a municipality (built by factory.ts). Primary focus keyword: "Al Irqah Taxi Service" only.
 * IMAGES: four reserved slots: area, journey, street and pickup (factory passes four to addImages). Suggested files in al-irqah-taxi-service/: al-irqah-private-taxi-service-riyadh.webp, al-irqah-school-run-taxi.webp, al-irqah-airport-taxi-transfer.webp.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.6841/46.5826, used unchanged. OpenStreetMap labels, in Irqah District: Ergah Hospital (24.6927/46.5847), Ibn Khaldoun School (24.6918/46.5965 and 24.6888/46.5846), Misk Schools (24.6985/46.5875), Al Tayyar Mosque (24.6855/46.5770), Mosque of Prince Mishal (24.6932/46.6023).
 * riyadh-areas.ts: Al Irqah gives its name to the Irqah municipality, which also covers Dhahrat Laban.
 * Figures (OSRM, light traffic, Nov 2026): RUH 42.7 km / 32 min; Olaya 16.6 / 17; KAFD 15.8 / 19; Ad Dirah 21.2 / 21; Al Malaz 22.0 / 21; Diplomatic Quarter 9.7 / 15; Diriyah 13.6 / 17; Dhahrat Laban 10.9 / 16.
 * Roads returned: Abdullah Kojak Street, Abdulrahman Bin Thabit Bin As Samit Street (first roads), Prince Mishal Bin Abdulaziz Road, Irqah Street, Western Ring Road, King Khalid Road, King Salman Road (airport); King Khalid Road, Jeddah Road, Makkah Al Mukarramah Road, King Fahd Road, King Fahd Branch Road (Olaya, Ad Dirah);
 * Prince Mishal Bin Abdulaziz Road, King Abdullah Road, Takhassusi Road, Thumamah Road, KAFD ring road (KAFD).
 * Metro (independent riyadhmetro.org, read 19 Nov 2026): no station called Al Irqah; none is claimed.
 * Nearby (straight-line centres): Diplomatic Quarter 3.8 km, Diriyah 5.6, Dhahrat Laban 6.4, Al Nakheel 8.3, Hittin 9.0, Al Mohammadiyah 9.2, Al Wurud 9.8.
 * NOT verified: malls, boundary, opening hours, the schools' campuses and gates; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALIRQAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Irqah, Riyadh. The trip is [for example a home pickup, a school run, a hospital visit, a ride to the Diplomatic Quarter or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alIrqahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-irqah",
      name: "Al Irqah",
      title: "Al Irqah Taxi Service Riyadh | Home, School and Airport",
      description: "Al Irqah Taxi Service for home pickups, school runs, hospital visits, rides to the Diplomatic Quarter and Diriyah and airport transfers from west Riyadh. Fare confirmed first.",
      h1: "Al Irqah Taxi Service in Riyadh",
      lead: "Al Irqah Taxi Service from Gulf Elite Transport: private rides from your door in west Riyadh to school, hospital, the Diplomatic Quarter, Diriyah and the airport. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Irqah, a residential district in west Riyadh that gives its name to the Irqah municipality, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, school runs, hospital visits, rides to the Diplomatic Quarter, Diriyah, KAFD and Olaya, and airport transfers to King Khalid International Airport (RUH), about 43 km by road. A booking does not give entry to private property. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 43 km by road" },
        { label: "KAFD", value: "about 16 km by road" },
        { label: "Olaya", value: "about 17 km by road" },
        { label: "Area type", value: "residential, west Riyadh" },
      ],
      aboutH2: "Al Irqah: a residential district that names a municipality",
      about: [
        "Al Irqah is a residential district in the west of Riyadh. It gives its name to the Irqah municipality, which also covers Dhahrat Laban, so the name appears widely on maps and official signs. Spelled Irqah or Ergah on OpenStreetMap, it lies north-east of Dhahrat Laban and close to the Diplomatic Quarter and Diriyah.",
        "OpenStreetMap shows a hospital, several schools and two mosques labelled inside the district. That is a useful guide to the kind of rides people ask for here: appointments at a hospital, the morning and afternoon school run, a lift to relatives in the neighbourhood, and the longer drives to the Diplomatic Quarter, Diriyah, KAFD and the airport.",
        "Al Irqah is nearer to the northern parts of Riyadh than most western districts. KAFD is about 16 km away by road and Diriyah about 14 km, though the airport, at about 43 km, is still a long run across the city.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Irqah and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 43, min: 32 }, olaya: { km: 17, min: 17 }, kafd: { km: 16, min: 19 }, adDirah: { km: 21, min: 21 }, malaz: { km: 22, min: 21 } },
      blocks: [
        {
          id: "school-hospital",
          h2: "School runs and hospital visits in Al Irqah",
          paragraphs: [
            "OpenStreetMap labels Ergah Hospital, Ibn Khaldoun School and Misk Schools in Irqah District, all within a couple of kilometres of the centre. We could not confirm their gates, visiting rules or hours, so we do not publish them. For a school run, give the school, the exact gate and the time you must arrive, and allow extra time around the start and end of the day, when roads near schools are busy.",
            "For a hospital visit, give the name of the facility, the entrance you need and the appointment time, and ask for a return pickup in the same request. A ride does not include any appointment and is not an emergency or medical transport service. We agree a meeting point the car can reach, and we do not promise access to restricted roads or campus car parks.",
          ],
        },
        {
          id: "door-to-door",
          h2: "Door-to-door pickups in Al Irqah",
          paragraphs: [
            "Send the street name, the villa or building number and a map pin. Routing data leaves the centre of the district on Abdullah Kojak Street and Abdulrahman Bin Thabit Bin As Samit Street before joining Prince Mishal Bin Abdulaziz Road, so naming the one nearest you can help. A landmark such as a mosque or a school makes the pickup easier.",
            "If you live in a compound, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property, and we do not promise access to private roads or controlled entrances. Where entry is limited, agree a meeting point outside the gate, and give a phone number you will answer.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Al Irqah and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 43 km from the centre of Al Irqah by road, roughly 32 minutes in light traffic. Routing data follows Prince Mishal Bin Abdulaziz Road, Irqah Street, the Western Ring Road, King Khalid Road and King Salman Road. Busy hours, your terminal and your starting street can add time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your street and gate or a map pin. Because the drive is long, allow generous time for an early flight and say so in the request. For an arrival send your landing time and where you are going. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "diplomatic-diriyah",
          h2: "Rides to the Diplomatic Quarter and Diriyah",
          paragraphs: [
            "The Diplomatic Quarter is about 10 km from Al Irqah by road, roughly 15 minutes in light traffic, and Diriyah about 14 km, roughly 17 minutes. Both are on the northern side of the district, which makes Al Irqah a convenient base for visits to either.",
            "The Diplomatic Quarter has controlled gates, so ask your host which gate and which pass apply, and give us the host's name. Diriyah has visitor areas with their own access arrangements. We agree a meeting point the car can reach and do not promise access to restricted areas, event sites or private car parks. Gulf Elite Transport has no partnership with either place.",
          ],
        },
        {
          id: "city",
          h2: "Olaya, KAFD and the old centre",
          paragraphs: [
            "Olaya is about 17 km from Al Irqah by road, roughly 17 minutes in light traffic, by King Khalid Road, Jeddah Road, Makkah Al Mukarramah Road and King Fahd Road. KAFD is about 16 km away, roughly 19 minutes, by Prince Mishal Bin Abdulaziz Road, King Abdullah Road, Takhassusi Road and Thumamah Road. Ad Dirah is about 21 km away and Al Malaz about 22 km.",
            "KAFD and many Olaya towers have controlled entrances, so name the tower and the entrance. We agree a meeting point the car can reach and do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business in these districts.",
          ],
        },
        {
          id: "metro",
          h2: "Public transport near Al Irqah",
          paragraphs: [
            "An independent Riyadh Metro information site lists no station called Al Irqah, and we could not check this against the official operator. Please read the official Riyadh Metro and bus information for current services. We do not claim a metro link for this district.",
            "A private taxi suits families, fixed pickup times and places that public transport does not reach. Gulf Elite Transport is not part of the metro or any bus operator and has no partnership with them.",
          ],
        },
      ],
      nearIds: ["diplomatic-quarter", "diriyah", "dhahrat-laban", "al-nakheel", "hittin", "al-mohammadiyah"],
      nearIntro: "These districts are close to Al Irqah in west and north-west Riyadh but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "KAFD", id: "king-abdullah-financial-district", note: "The financial district, about 16 km by road" }],
      whatsappTrips: "a home pickup, a school run, a hospital visit, a ride to the Diplomatic Quarter or the airport",
      faq: [
        { q: "How can I book a taxi in Al Irqah, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "How far is Al Irqah from King Khalid International Airport?", a: "About 43 km by road, roughly 32 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Can you arrange a regular school run in Al Irqah?", a: "Tell us the school, the gate, the days and the times, and we say what can be arranged. Each request is confirmed individually, and we do not promise access to school grounds." },
        { q: "Is there a metro station in Al Irqah?", a: "An independent metro site lists none. Check the official Riyadh Metro information for current services." },
        { q: "Which roads lead out of Al Irqah?", a: "According to routing data, drives start on Abdullah Kojak Street and Abdulrahman Bin Thabit Bin As Samit Street and lead on to Prince Mishal Bin Abdulaziz Road, King Khalid Road and the Western Ring Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Irqah?", a: "The Diplomatic Quarter, Diriyah, Dhahrat Laban, Al Nakheel and Hittin are the closest districts. Each is separate and has its own page." },
        { q: "Can I arrange a ride to the Diplomatic Quarter?", a: "Yes. It is about 10 km by road, roughly 15 minutes in light traffic. Ask your host which gate and pass apply, and give us the host's name." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Irqah start on Abdullah Kojak Street and Abdulrahman Bin Thabit Bin As Samit Street, then join Prince Mishal Bin Abdulaziz Road. For King Khalid International Airport, routing data uses Irqah Street, the Western Ring Road, King Khalid Road and King Salman Road. For Olaya and Ad Dirah, it follows King Khalid Road, Jeddah Road, Makkah Al Mukarramah Road and King Fahd Road. For KAFD, it joins King Abdullah Road, Takhassusi Road and Thumamah Road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point and current traffic.",
      localIntro: "Find Al Irqah on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby west and north-west Riyadh districts", "Hospital, valleys and heritage places", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Irqah", "Diplomatic Quarter", "Diriyah", "Dhahrat Laban", "Al Nakheel", "Hittin", "Al Mohammadiyah", "Al Wurud", "Al Uraija", "Al Khuzama", "Al Aqiq"],
        places: ["Irqah Hospital", "Wadi Hanifah", "Wadi Laban", "At-Turaif District"],
        others: ["Olaya", "King Abdullah Financial District", "Ad Dirah", "Al Malaz", "King Khalid International Airport", "Al Murabba", "Bujairi Terrace"],
        cities: ["Jeddah", "Makkah", "Taif"],
      },
      waMessage: ALIRQAH_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
