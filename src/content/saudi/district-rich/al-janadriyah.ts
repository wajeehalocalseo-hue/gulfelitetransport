import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Janadriyah Taxi Service: hand-written page for Al Janadriyah (Al Janadiriyah on OpenStreetMap), a district in east Riyadh best known for its heritage festival (built by factory.ts). Primary focus keyword: "Al Janadriyah Taxi Service" only.
 * IMAGES: five photos from the owner's Google Drive (Al Janadriyah folder), resized to 1000 px wide WebP (35-115 KB) in public/images/routes/riyadh-districts/al-janadriyah-taxi-service/ and placed in the about, festival-visits, pickup, airport, city sections. The photos show cars and drivers; the page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.8192/46.8528, used unchanged. OpenStreetMap labels "Al Janadriyah District" schools at 24.800-24.810/46.860-46.863 and western and eastern parts (Al Gharbiyah, Ash Sharqiyah).
 * Figures (OSRM, light traffic, Nov 2026): RUH 30.2 km / 25 min; Olaya 27.4 / 22; KAFD 31.6 / 25; Ad Dirah 31.0 / 26; Al Malaz 25.7 / 21; Al Nadhim 8.3 / 10; Ishbiliyah 12.2 / 14; Al Khaleej 14.4 / 15.
 * Roads returned: Imam Abdullah Bin Saud Bin Abdulaziz Road (first road), Janadriyah Branch Road, Janadriyah Road, Muhammad Bin Faraj Street, King Salman Road (airport); Khurais Road, Makkah Al Mukarramah Road, King Fahd Road, King Fahd Branch Road (Olaya);
 * Janadriyah Road, Dammam Road, Northern Ring Road, KAFD ring road (KAFD); King Abdullah Road (Ishbiliyah).
 * The National Festival for Heritage and Culture is widely known as the Janadriyah Festival. The page mentions it only as an annual event associated with the area and gives no dates, tickets, entry rules or access arrangements.
 * Metro (independent riyadhmetro.org, read 19 Nov 2026): no station called Al Janadriyah. Al Jarradiyah (Line 3) is a different name and is not treated as the same place. No coordinates are shown on the site.
 * Nearby (straight-line centres): Al Nadhim 4.9 km, Ishbiliyah 6.5, Al Khaleej 6.9, Al Yarmuk 7.1, Qurtubah 10.4, Al Hamra 11.2.
 * NOT verified: venues, malls, hospitals, boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALJANADRIYAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Janadriyah, Riyadh. The trip is [for example a home pickup, a visit to the heritage festival, a family trip or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alJanadriyahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-janadriyah",
      images: {
        about: { slot: "al-janadriyah-district-overview-taxi", alt: "An orange SUV driving along a street of high walls and gates in a residential area at sunset", label: "Photo: al-janadriyah-district-overview-taxi.webp", w: 1000, h: 558 },
        "festival-visits": { slot: "al-janadriyah-heritage-festival-visit-taxi", alt: "A white SUV with a door open at the roadside as a woman in a dark abaya, a man holding a phone and a woman in a burgundy abaya stand beside it, with a mud-brick fort and buses in the distance", label: "Photo: al-janadriyah-heritage-festival-visit-taxi.webp", w: 1000, h: 558 },
        pickup: { slot: "al-janadriyah-family-taxi-pickup", alt: "A silver SUV with a door open on a street of high walls as a man in a shirt, a man in a thobe, a woman and two children stand beside it", label: "Photo: al-janadriyah-family-taxi-pickup.webp", w: 1000, h: 558 },
        airport: { slot: "al-janadriyah-ruh-airport-transfer", alt: "A maroon SUV with its boot open at an airport terminal as a driver in a dark shirt lifts a suitcase for a woman in a long coat and a man with a trolley bag", label: "Photo: al-janadriyah-ruh-airport-transfer.webp", w: 1000, h: 558 },
        city: { slot: "al-janadriyah-city-rides-taxi", alt: "A dark green SUV with a driver and a passenger on a wide multi-lane road with palm trees and a distant skyline", label: "Photo: al-janadriyah-city-rides-taxi.webp", w: 1000, h: 558 },
      },
      name: "Al Janadriyah",
      title: "Al Janadriyah Taxi Service Riyadh | Festival Visits and Airport",
      description: "Al Janadriyah Taxi Service for home pickups, heritage festival visits, family trips and airport rides from east Riyadh, about 30 km from RUH. Fare confirmed first.",
      h1: "Al Janadriyah Taxi Service in Riyadh",
      lead: "Al Janadriyah Taxi Service from Gulf Elite Transport: private rides to and from Al Janadriyah in east Riyadh, for residents, for visitors to the heritage festival and for airport journeys. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Janadriyah, a district in east Riyadh known for the annual Janadriyah heritage festival, Gulf Elite Transport takes bookings for private taxi pickups from homes, rides for visitors, family and group journeys, long city rides, and airport transfers to King Khalid International Airport (RUH), about 30 km by road. A booking does not give entry to private property or event grounds. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 30 km by road" },
        { label: "Olaya", value: "about 27 km by road" },
        { label: "Al Nadhim", value: "about 8 km by road" },
        { label: "Area type", value: "residential, east Riyadh" },
      ],
      aboutH2: "Al Janadriyah: an eastern district with its own road",
      about: [
        "Al Janadriyah is a district in the east of Riyadh, between Al Yarmuk to the west and Al Nadhim to the east. OpenStreetMap spells it Al Janadiriyah and labels western and eastern parts of it, so it is wider and less uniform than a central district. Janadriyah Road, one of the main roads of the east, carries its name.",
        "The name is also linked with the National Festival for Heritage and Culture, widely known as the Janadriyah Festival, an annual event. We do not publish dates, tickets, entry rules or parking for it, and we cannot promise access to event grounds, so please check the official event information before you plan a visit.",
        "For residents the district is a quieter, mostly residential area from which the airport is about 30 km away and Olaya about 27 km. For visitors, a pre-booked ride with a return time agreed in advance is often easier than finding a car after the event, when roads and exits are crowded.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Janadriyah and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, event days, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 30, min: 25 }, olaya: { km: 27, min: 22 }, kafd: { km: 32, min: 25 }, adDirah: { km: 31, min: 26 }, malaz: { km: 26, min: 21 } },
      blocks: [
        {
          id: "festival-visits",
          h2: "Visiting Al Janadriyah for the heritage festival",
          paragraphs: [
            "If you are travelling to Al Janadriyah for the heritage festival, book your ride in advance and agree the return time when you book. Event days bring heavy traffic, closed or controlled entrances and crowded exits, and none of those can be predicted from here. Tell us the date, the time you hope to arrive, the number of passengers and the entrance named in your ticket or on the official event page.",
            "We agree a meeting point that the car can reach, and we do not promise access to event grounds, parking or special lanes. A booking with us is a private ride, not an event ticket, and Gulf Elite Transport has no partnership with the festival or its organisers. Waiting is agreed separately and is never assumed.",
          ],
        },
        {
          id: "pickup",
          h2: "Pickups in a wide and varied district",
          paragraphs: [
            "Parts of Al Janadriyah are sparsely mapped, and western and eastern areas are labelled differently on different maps. Send a map pin, the street or the plot number and the nearest main road, such as Janadriyah Road or Imam Abdullah Bin Saud Bin Abdulaziz Road. If you live in a compound, tell us the name and the gate you will use.",
            "A taxi booking does not give permission to enter private property, and we do not promise access to private roads or controlled entrances. Where entry is limited, agree a meeting point outside the gate. Give a phone number you will answer, the number of passengers and the number of bags.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Al Janadriyah and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 30 km from the centre of Al Janadriyah by road, roughly 25 minutes in light traffic. Routing data uses Imam Abdullah Bin Saud Bin Abdulaziz Road, Janadriyah Branch Road, Janadriyah Road, Muhammad Bin Faraj Street and King Salman Road. Peak hours, event days and your terminal can add time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your map pin. For an arrival send your landing time and your address. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "city",
          h2: "Rides to Olaya, KAFD and the old centre",
          paragraphs: [
            "Olaya is about 27 km from Al Janadriyah by road, roughly 22 minutes in light traffic, by Khurais Road, Makkah Al Mukarramah Road and King Fahd Road. Al Malaz is about 26 km away and Ad Dirah about 31 km. KAFD is about 32 km away, roughly 25 minutes, by Janadriyah Road, Dammam Road and the Northern Ring Road.",
            "KAFD and many Olaya towers have controlled entrances, so name the tower and the entrance. We agree a meeting point the car can reach and do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business in these districts.",
          ],
        },
        {
          id: "metro",
          h2: "Public transport near Al Janadriyah",
          paragraphs: [
            "An independent Riyadh Metro information site lists no station called Al Janadriyah. Line 3 has a station named Al Jarradiyah, which is a different place, and we do not treat it as the same. The site shows no map coordinates, and we could not check the details against the official operator.",
            "Please read the official Riyadh Metro and bus information for current services. A private taxi suits families, fixed pickup times and places that public transport does not reach. Gulf Elite Transport is not part of the metro or any bus operator and has no partnership with them.",
          ],
        },
      ],
      nearIds: ["al-nadhim", "ishbiliyah", "al-khaleej", "al-yarmuk", "qurtubah", "al-hamra"],
      nearIntro: "These districts are close to Al Janadriyah in east and north-east Riyadh but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "Olaya", id: "olaya", note: "Offices, hotels and shopping, about 27 km by road" }],
      whatsappTrips: "a home pickup, a visit to the heritage festival, a family trip or the airport",
      faq: [
        { q: "How can I book a taxi in Al Janadriyah, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "Can you take me to the Janadriyah heritage festival?", a: "We can arrange a private ride to a meeting point the car can reach. We do not sell tickets or promise access to event grounds, so check the official event information for dates and entry." },
        { q: "How far is Al Janadriyah from King Khalid International Airport?", a: "About 30 km by road, roughly 25 minutes in light traffic. Busy hours, event days, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Is there a metro station in Al Janadriyah?", a: "An independent metro site lists none. Al Jarradiyah on Line 3 is a different place. Check the official Riyadh Metro information for current services." },
        { q: "Which roads lead out of Al Janadriyah?", a: "According to routing data, drives start on Imam Abdullah Bin Saud Bin Abdulaziz Road and lead on to Janadriyah Road, Khurais Road and King Salman Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Janadriyah?", a: "Al Nadhim, Ishbiliyah, Al Khaleej and Al Yarmuk are the closest districts. Each is separate and has its own page." },
        { q: "Can I arrange a ride to Olaya?", a: "Yes. Olaya is about 27 km by road, roughly 22 minutes in light traffic. Name the building and the entrance." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it, especially for event days. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Janadriyah start on Imam Abdullah Bin Saud Bin Abdulaziz Road. For King Khalid International Airport, routing data uses Janadriyah Branch Road, Janadriyah Road, Muhammad Bin Faraj Street and King Salman Road. For Olaya, it joins Khurais Road, Makkah Al Mukarramah Road and King Fahd Road. For KAFD, it follows Janadriyah Road, Dammam Road and the Northern Ring Road. For Ishbiliyah, it uses King Abdullah Road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point, destination and current traffic. Traffic can change the route at short notice.",
      localIntro: "Find Al Janadriyah on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby east and north-east Riyadh districts", "Metro stations and shopping", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Janadriyah", "Al Nadhim", "Ishbiliyah", "Al Khaleej", "Al Yarmuk", "Qurtubah", "Al Hamra", "Al Rawdah", "Al Naseem", "Al Muayzilah"],
        places: ["Al Khaleej Metro Station", "Ishbiliyah Metro Station", "King Fahd Sport City Metro Station", "Othaim Mall Khurais Road"],
        others: ["Olaya", "King Abdullah Financial District", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport", "Riyadh Exhibition Center"],
        cities: ["Jeddah", "Dammam", "Al Hofuf", "Al Khobar"],
      },
      waMessage: ALJANADRIYAH_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
