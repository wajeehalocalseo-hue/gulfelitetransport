import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Ghadir Taxi Service: hand-written page for Al Ghadir, a residential district in north Riyadh beside KAFD (built by factory.ts). Primary focus keyword: "Al Ghadir Taxi Service" only.
 * IMAGES: four reserved slots: area, journey, street and pickup (factory passes four to addImages). Suggested files in al-ghadir-taxi-service/: al-ghadir-private-taxi-service-riyadh.webp, al-ghadir-to-kafd-metro-taxi.webp, al-ghadir-airport-taxi-transfer.webp.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.7742/46.6556, used unchanged. OpenStreetMap labels Alghadeer Mosque in Al Ghadir District at 24.7733/46.6453, consistent with that point.
 * Figures (OSRM, light traffic, Nov 2026): RUH 30.1 km / 22 min; Olaya 12.3 / 13; KAFD 7.9 / 10; Ad Dirah 19.2 / 17; Al Malaz 16.4 / 16. The KAFD district centre is only about 1.5 km away in a straight line, but routing gives 7.9 km, so the page says so.
 * Roads returned: Al Sayl Al Kabir Street (first road), Muhammad Al Yamami Street, Muhammad Al Muqaddami Street, King Abdulaziz Road, Northern Ring Road, Airport Road, King Salman Road (airport); Northern Ring Road, King Fahd Road, King Fahd Branch Road,
 * Prince Mohammed Bin Abdulaziz Road, Olaya Street, KAFD ring road (Olaya, KAFD); Imam Turki Bin Abdullah Street (Ad Dirah).
 * Metro (independent riyadhmetro.org, read 19 Nov 2026; no coordinates shown): no station called Al Ghadir. KAFD (Lines 1, 4 and 6 interchange), Ar Rabi (Lines 4 and 6) and Al Murooj (Line 1) are named after nearby districts; no distance is stated.
 * Nearby (straight-line centres): KAFD 1.5 km, Al Aqiq 2.5, Al Mohammadiyah 3.8, Al Sahafah 3.9, Al Wadi 4.0, Al Nakheel 4.2.
 * OpenStreetMap labels used with their own district names: Riyadh Park (Al Aqeeq District), Ar Rabi Park (Al Rabiea), Dallah Hospital (Al Nakheel), Saudi German Hospital (As Sahafah), Alghadeer Mosque (Al Ghadir).
 * NOT verified: opening hours, boundary, schools; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALGHADIR_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Ghadir, Riyadh. The trip is [for example a home pickup, a transfer to or from KAFD or a metro station, a hospital visit, a shopping trip or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alGhadirRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-ghadir",
      name: "Al Ghadir",
      title: "Al Ghadir Taxi Service Riyadh | KAFD Side, Home and Airport",
      description: "Al Ghadir Taxi Service for home pickups, rides to KAFD and metro stations, hospital and mall trips and airport transfers from north Riyadh. Fare confirmed first.",
      h1: "Al Ghadir Taxi Service in Riyadh",
      lead: "Al Ghadir Taxi Service from Gulf Elite Transport: private rides from your home in north Riyadh, next door to the financial district, to the airport, the metro and across the city. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Ghadir, a residential district in north Riyadh next to the King Abdullah Financial District (KAFD), Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, rides to KAFD and its metro interchange, hospital and shopping trips, family journeys, and airport transfers to King Khalid International Airport (RUH), about 30 km by road. A booking does not give entry to private property or controlled entrances. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 30 km by road" },
        { label: "KAFD", value: "about 8 km by road" },
        { label: "Olaya", value: "about 12 km by road" },
        { label: "Area type", value: "residential, north Riyadh" },
      ],
      aboutH2: "Al Ghadir: a residential district beside KAFD",
      about: [
        "Al Ghadir is a residential district in the north of Riyadh, east of Al Aqiq and north of Al Wurud. Its centre is only about 1.5 km from the centre of KAFD in a straight line, which makes it one of the residential districts closest to the financial district. OpenStreetMap places the Alghadeer Mosque inside it.",
        "Being close in a straight line does not always mean being close by road. The streets around KAFD form a closed network, and routing data from the centre of Al Ghadir gives about 8 km to KAFD, roughly 10 minutes in light traffic, by the Northern Ring Road. We use that road figure on this page, not the straight line.",
        "People who live here book rides for the airport, for hospital visits, for shopping at nearby malls and for journeys to Olaya and the old centre. Many are also workers at KAFD who prefer a ride to driving into a controlled car park, and we explain how that works below.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Ghadir and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances: KAFD is about 1.5 km away in a straight line but about 8 km by road. Traffic, your exact pickup and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 30, min: 22 }, olaya: { km: 12, min: 13 }, kafd: { km: 8, min: 10 }, adDirah: { km: 19, min: 17 }, malaz: { km: 16, min: 16 } },
      blocks: [
        {
          id: "kafd-side",
          h2: "Rides between Al Ghadir and KAFD",
          paragraphs: [
            "KAFD has controlled tower entrances, its own roads and a metro interchange, so the key to a good ride is a clear meeting point. Name the tower, say whether you will be at a lobby, a podium entrance or the metro station, and give the time. We agree a meeting point the car can reach and we do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business there.",
            "Routing data uses Al Sayl Al Kabir Street and Muhammad Al Yamami Street, then the Northern Ring Road, King Fahd Branch Road and the KAFD ring road. For a regular commute, tell us the days and times and we say what can be arranged. Each request is confirmed individually.",
          ],
        },
        {
          id: "metro",
          h2: "Riyadh Metro near Al Ghadir",
          paragraphs: [
            "An independent Riyadh Metro information site lists no station called Al Ghadir. It does list KAFD as an interchange of Lines 1 (Blue), 4 (Yellow) and 6 (Purple), Ar Rabi on Lines 4 and 6, and Al Murooj on Line 1. These are named after neighbouring districts. The site shows no map coordinates, so we do not state how far any of them is from a given address, and we could not check the details against the official operator.",
            "Please read the official Riyadh Metro information for current stations and services. A taxi can take you from your door to a station, or meet you there with luggage, which helps family groups and fixed pickup times. Gulf Elite Transport is not part of the metro and has no partnership with it, and we do not publish metro fares, hours or journey times.",
          ],
        },
        {
          id: "hospitals-malls",
          h2: "Hospitals, malls and parks nearby",
          paragraphs: [
            "OpenStreetMap places Riyadh Park, a large shopping centre, in Al Aqeeq District to the west, Dallah Hospital in Al Nakheel to the south, Saudi German Hospital in As Sahafah to the north-west, and Ar Rabi Park in Ar Rabi to the north. All of them are in neighbouring districts, not in Al Ghadir. We do not publish opening hours, facilities, parking or entrance details for any of them.",
            "For a hospital or clinic visit, give the name of the facility, the branch and the entrance you need, and tell us the time of the appointment. A ride does not include any appointment and is not an emergency or medical transport service. For a mall, tell us the entrance and agree a return time, because entrances are crowded in the evening and at weekends.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Al Ghadir and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 30 km from the centre of Al Ghadir by road, roughly 22 minutes in light traffic. Routing data follows Muhammad Al Muqaddami Street, King Abdulaziz Road, the Northern Ring Road, Airport Road and King Salman Road. Peak hours and your terminal can add time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your street and gate or a map pin. For an arrival send your landing time and where you are going. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "city",
          h2: "Olaya, Ad Dirah and Al Malaz",
          paragraphs: [
            "Olaya is about 12 km from Al Ghadir by road, roughly 13 minutes in light traffic, by the Northern Ring Road, King Fahd Road and Olaya Street. Ad Dirah, in the old centre, is about 19 km away, roughly 17 minutes, and Al Malaz about 16 km, roughly 16 minutes. The roads between Olaya and the northern districts are among the busiest in the city at peak hours.",
            "Name the building and the entrance of your destination, and tell us whether you need a return pickup. We agree a meeting point that the car can reach and do not promise access to restricted streets or private car parks.",
          ],
        },
      ],
      nearIds: ["al-aqiq", "al-mohammadiyah", "al-sahafah", "al-wadi", "al-nakheel", "al-wurud"],
      nearIntro: "These districts are close to Al Ghadir in north Riyadh but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "KAFD", id: "king-abdullah-financial-district", note: "The financial district, about 1.5 km in a straight line and about 8 km by road" }],
      whatsappTrips: "a home pickup, a transfer to or from KAFD or a metro station, a hospital visit or the airport",
      faq: [
        { q: "How can I book a taxi in Al Ghadir, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "Why is KAFD 8 km by road if it is so close?", a: "The district centres are about 1.5 km apart in a straight line, but the streets around KAFD form a closed network, and routing data uses the Northern Ring Road. The road figure is the one that matters for a ride." },
        { q: "How far is Al Ghadir from King Khalid International Airport?", a: "About 30 km by road, roughly 22 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Is there a metro station in Al Ghadir?", a: "An independent metro site lists no station called Al Ghadir. It lists KAFD, Ar Rabi and Al Murooj in neighbouring districts. Check the official Riyadh Metro information." },
        { q: "Which roads lead out of Al Ghadir?", a: "According to routing data, drives start on Al Sayl Al Kabir Street and Muhammad Al Yamami Street and lead on to the Northern Ring Road and King Abdulaziz Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Ghadir?", a: "Al Aqiq, Al Mohammadiyah, Al Sahafah, Al Wadi and Al Nakheel are the closest, with KAFD next door. Each is separate and has its own page." },
        { q: "Can I book a ride to a hospital?", a: "Yes. Give the name of the facility, the branch, the entrance and the time. A ride is not an emergency or medical transport service." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Ghadir start on Al Sayl Al Kabir Street and Muhammad Al Yamami Street. For King Khalid International Airport, routing data uses Muhammad Al Muqaddami Street, King Abdulaziz Road, the Northern Ring Road, Airport Road and King Salman Road. For KAFD, it joins the Northern Ring Road, King Fahd Branch Road and the KAFD ring road. For Olaya, it continues on King Fahd Road and Olaya Street. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point and current traffic. Traffic can change the route at short notice.",
      localIntro: "Find Al Ghadir on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby north Riyadh districts", "Metro stations, malls and hospitals", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Ghadir", "Al Aqiq", "Al Mohammadiyah", "Al Sahafah", "Al Wadi", "Al Nakheel", "Al Wurud", "Al Murooj", "Al Rabiea", "Al Falah", "Al Yasmin"],
        places: ["King Abdullah Financial District Metro Station", "Ar Rabi Metro Station", "Riyadh Park Mall", "Dallah Hospital Al Nakheel", "Saudi German Hospital Riyadh"],
        others: ["Olaya", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport"],
        cities: ["Jeddah", "Dammam", "Al Khobar", "Buraidah"],
      },
      waMessage: ALGHADIR_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
