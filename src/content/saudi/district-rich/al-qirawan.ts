import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Qirawan Taxi Service: hand-written page for Al Qirawan, a residential district in north-west Riyadh (built by factory.ts). Primary focus keyword: "Al Qirawan Taxi Service" only.
 * IMAGES: four reserved slots: area, journey, street and pickup (factory passes four to addImages). Suggested files in al-qirawan-taxi-service/: al-qirawan-private-taxi-service-riyadh.webp, al-qirawan-hospital-appointment-taxi.webp, al-qirawan-airport-taxi-transfer.webp.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.8794/46.5626, used unchanged. OpenStreetMap addresses Al Habib hospital (24.8629/46.5873), Al Yamamah University (24.8628/46.5920) and Inaya Medical College (24.8638/46.5838) in Al Qirawan.
 * OpenStreetMap lists the district under the Ad Diriyah municipality; riyadh-areas.ts says it is on the way toward Diriyah.
 * Figures (OSRM, light traffic, Nov 2026): RUH 31.6 km / 31 min; Olaya 27.8 / 28; KAFD 21.0 / 23; Ad Dirah 34.8 / 32; Al Malaz 35.8 / 33; Al Arid 9.5 / 15.
 * Roads returned: Asma Bint Malik Street (first road), Olaya Street, Rayhanah Bint Zaid Street, Abu Bakr As Siddiq Road, King Salman Branch Road, King Salman Road (airport); King Fahd Road, King Fahd Branch Road, Prince Mohammed Bin Abdulaziz Road (Olaya); King Fahd Road, KAFD ring road (KAFD).
 * Metro (independent riyadhmetro.org, read 19 Nov 2026): no station in this area; none is claimed.
 * Nearby (straight-line centres): Al Arid 4.7 km, Al Malqa 8.6, Al Narjis 9.6, Al Yasmin 10.3, Al Sahafah 11.1, Hittin 13.0.
 * NOT verified: malls, schools, parks, boundary, opening hours, the hospital's exact name beyond the OpenStreetMap label; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALQIRAWAN_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Qirawan, Riyadh. The trip is [for example a home pickup, a hospital or university visit, a family trip or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alQirawanRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-qirawan",
      name: "Al Qirawan",
      title: "Al Qirawan Taxi Service Riyadh | Hospital, Campus and Airport",
      description: "Al Qirawan Taxi Service for home pickups, hospital and university visits, family trips and airport rides from north-west Riyadh. Fare confirmed first.",
      h1: "Al Qirawan Taxi Service in Riyadh",
      lead: "Al Qirawan Taxi Service from Gulf Elite Transport: private rides from your door in north-west Riyadh to the hospital, the campus, the airport or across the city. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Qirawan, a residential district in north-west Riyadh on the way toward Diriyah, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, rides to hospital and university visits nearby, family and group journeys, rides to KAFD and Olaya, and airport transfers to King Khalid International Airport (RUH), about 32 km by road. A booking does not give entry to private property. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 32 km by road" },
        { label: "KAFD", value: "about 21 km by road" },
        { label: "Olaya", value: "about 28 km by road" },
        { label: "Area type", value: "residential, north-west Riyadh" },
      ],
      aboutH2: "Al Qirawan: a residential district in north-west Riyadh",
      about: [
        "Al Qirawan is a residential district in the north-west of Riyadh. It lies west of Al Arid and north-west of Al Malqa, on the side of the city that leads towards Diriyah, and OpenStreetMap lists it under the Ad Diriyah municipality. Most of the district is villas and apartment buildings, with larger sites along the main roads.",
        "Several of those larger sites matter for transport. OpenStreetMap addresses a hospital labelled Al Habib, Al Yamamah University and Inaya Medical College in Al Qirawan. People travel to them from across the north-west, and staff and students come and go at fixed times of day, which suits a pre-booked ride.",
        "For residents, the district is mostly about the school run, trips to relatives, appointments, and the long drives to KAFD, Olaya and the airport. We describe each below, with distances from routing data.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Qirawan and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 32, min: 31 }, olaya: { km: 28, min: 28 }, kafd: { km: 21, min: 23 }, adDirah: { km: 35, min: 32 }, malaz: { km: 36, min: 33 } },
      blocks: [
        {
          id: "hospital-campus",
          h2: "Hospital appointments and campus journeys",
          paragraphs: [
            "A hospital labelled Al Habib, Inaya Medical College and Al Yamamah University, which has an address on King Fahd Road, all appear in Al Qirawan on OpenStreetMap. We could not confirm their entrances, visiting rules or hours, and a booking with us gives no access or appointment. Give the exact name of the place, the building and the gate you need, and we plan the pickup around it.",
            "For an appointment, tell us the time you must be there and whether you need a return pickup, and we suggest adding a margin for parking and walking. A ride is not an emergency or medical transport service. For a student or staff member who travels at the same time each day, tell us the days and times and we say what can be arranged. Each request is confirmed individually.",
          ],
        },
        {
          id: "door-to-door",
          h2: "Door-to-door pickups in Al Qirawan",
          paragraphs: [
            "Send the street name, the villa or building number and a landmark that is easy to see. A map pin on WhatsApp is best, because parts of the district are still being built and some streets appear differently on different maps. If your home is in a compound, tell us the name and the gate you will use.",
            "A taxi booking does not give permission to enter private property, and we do not promise access to private roads or restricted entrances. Where entry is controlled, agree a meeting point outside the gate that the car can reach. Add a phone number you will answer, the number of passengers and the number of bags.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Al Qirawan and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 32 km from the centre of Al Qirawan by road, roughly 31 minutes in light traffic. Routing data starts on Asma Bint Malik Street, then follows Olaya Street, Rayhanah Bint Zaid Street, Abu Bakr As Siddiq Road, King Salman Branch Road and King Salman Road. Peak hours and your terminal can add time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your street and gate or a map pin. For an arrival send your landing time and where you are going. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "city",
          h2: "KAFD, Olaya and the old centre",
          paragraphs: [
            "KAFD is about 21 km from Al Qirawan by road, roughly 23 minutes in light traffic, along King Fahd Road and the KAFD ring road. Olaya is about 28 km away, roughly 28 minutes, through King Fahd Road, King Fahd Branch Road and Prince Mohammed Bin Abdulaziz Road. Ad Dirah and Al Malaz are 35 to 36 km away, roughly half an hour in quiet traffic.",
            "KAFD and many Olaya towers have controlled entrances, so name the tower and the entrance. We agree a meeting point the car can reach and do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business in these districts.",
          ],
        },
        {
          id: "north-west",
          h2: "Nearby districts and Diriyah",
          paragraphs: [
            "Al Arid is the nearest district, about 5 km away in a straight line and about 10 km by road. Al Malqa, Al Narjis and Al Yasmin are 9 to 10 km away in a straight line, and Hittin about 13 km. Diriyah, with its historic district, is also in this direction, and riyadh-areas notes that Al Qirawan is on the way toward it.",
            "Because the north-west of Riyadh has fewer connecting roads than the centre, a journey to a district that looks close on the map can be longer by road. Tell us where you are going and we confirm the route with you.",
          ],
        },
      ],
      nearIds: ["al-arid", "al-malqa", "al-narjis", "al-yasmin", "al-sahafah", "hittin"],
      nearIntro: "These districts are in north and north-west Riyadh, close to Al Qirawan but not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "Diriyah", id: "diriyah", note: "The historic district, in the direction of Diriyah from Al Qirawan" }],
      whatsappTrips: "a home pickup, a hospital or university visit, a family trip or the airport",
      faq: [
        { q: "How can I book a taxi in Al Qirawan, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "Can you take me to a hospital or university in Al Qirawan?", a: "Yes. Give the name of the place, the building and the gate. We confirm the pickup and a return if you need one. A ride is not an emergency or medical transport service." },
        { q: "How far is Al Qirawan from King Khalid International Airport?", a: "About 32 km by road, roughly 31 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Is there a metro station in Al Qirawan?", a: "An independent metro site shows none in the north-west of the city. Check the official Riyadh Metro information for current services." },
        { q: "Which roads lead out of Al Qirawan?", a: "According to routing data, drives start on Asma Bint Malik Street and lead on to Olaya Street, King Fahd Road and Abu Bakr As Siddiq Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Qirawan?", a: "Al Arid, Al Malqa, Al Narjis, Al Yasmin and Al Sahafah are the closest, and Hittin lies to the south. Each is separate and has its own page." },
        { q: "Can I arrange a ride to KAFD or Olaya?", a: "Yes. KAFD is about 21 km by road and Olaya about 28 km, roughly 23 to 28 minutes in light traffic. Name the building and the entrance." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Qirawan start on Asma Bint Malik Street. For King Khalid International Airport, routing data continues on Olaya Street, Rayhanah Bint Zaid Street, Abu Bakr As Siddiq Road, King Salman Branch Road and King Salman Road. For Olaya, it joins King Fahd Road, King Fahd Branch Road and Prince Mohammed Bin Abdulaziz Road. For KAFD, it uses King Fahd Road and the KAFD ring road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point, your destination entrance and current traffic. Please confirm your pickup point with us.",
      localIntro: "Find Al Qirawan on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby north and north-west Riyadh districts", "Universities and open spaces", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Qirawan", "Al Arid", "Al Malqa", "Al Narjis", "Al Yasmin", "Al Sahafah", "Hittin", "Banban", "Al Aqiq", "Al Ghadir"],
        places: ["Al Yamamah University", "Inaya Medical College", "Imam Muhammad Ibn Saud Islamic University", "Wadi Hanifah"],
        others: ["Olaya", "King Abdullah Financial District", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport", "Al Murabba", "Diplomatic Quarter"],
        cities: ["Jeddah", "Dammam", "Buraidah"],
      },
      waMessage: ALQIRAWAN_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
