import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Falah Taxi Service: hand-written page for Al Falah, a residential district in north Riyadh (built by factory.ts). Primary focus keyword: "Al Falah Taxi Service" only.
 * IMAGES: five photos from the owner's Google Drive (Al Falah folder), resized to 1000 px wide WebP (35-115 KB) in public/images/routes/riyadh-districts/al-falah-taxi-service/ and placed in the about, airport, school-university, shopping-parks, city sections. The photos show cars and drivers; the page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.7963/46.7088, used unchanged. OpenStreetMap labels "Falah Park" (24.7920/46.7064) and Dar Al Uloom International School (24.8001/46.7092) in Al Falah District, consistent with that point.
 * Figures (OSRM, light traffic, Nov 2026): RUH 21.8 km / 17 min; Olaya 19.1 / 18; KAFD 14.7 / 15; Ad Dirah 26.0 / 22; Al Malaz 20.9 / 18.
 * Roads returned: Prince Mohammed Bin Salman Bin Abdulaziz Road, Airport Road, King Salman Road (airport); Othman Bin Affan Branch Road, Northern Ring Road, King Fahd Road, King Fahd Branch Road, Prince Mohammed Bin Abdulaziz Road, Olaya Street (Olaya);
 * Northern Ring Road, King Fahd Branch Road, KAFD Ring Road (KAFD). The first local street names (Arabic only in the data) are not stated.
 * Metro (independent riyadhmetro.org, read 19 Nov 2026): no station called Al Falah. Granadia (Line 6, station 5) carries the name of the neighbouring district Granada; no coordinates are shown, so no distance is stated.
 * Nearby (straight-line centres): Al Wadi 1.9 km, Al Izdihar 2.0, Granada 3.6, Al Mughrizat 4.0, Qurtubah 4.4, Al Hamra 5.0, Al Ghadir 5.9.
 * OpenStreetMap labels used with their own district names: Granada Mall (Ghirnatah), Mouwasat Hospital (Ghirnatah), Imam Muhammad Ibn Saud Islamic University (Al Nargis address, north of Al Falah), Princess Nourah University (Al Mugharzat).
 * NOT verified: opening hours, exact boundary; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALFALAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Falah, Riyadh. The trip is [for example a home pickup, a school or university run, a shopping trip or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alFalahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-falah",
      images: {
        about: { slot: "al-falah-family-taxi-pickup-riyadh", alt: "A white SUV on a street of walled villas as a man in a white thobe, a woman and a boy walk towards it while a man in a shirt gestures", label: "Photo: al-falah-family-taxi-pickup-riyadh.webp", w: 1000, h: 558 },
        airport: { slot: "al-falah-ruh-airport-arrivals-pickup", alt: "A grey SUV with its door open at King Khalid International Airport arrivals as a driver with a lanyard welcomes a man and a woman with suitcases", label: "Photo: al-falah-ruh-airport-arrivals-pickup.webp", w: 1000, h: 558 },
        "school-university": { slot: "al-falah-school-university-ride", alt: "A beige saloon at a paved roadside outside a modern building as three women in abayas, one with a backpack, stand beside it", label: "Photo: al-falah-school-university-ride.webp", w: 1000, h: 558 },
        "shopping-parks": { slot: "al-falah-shopping-family-trip", alt: "A blue SUV on a shopping street as a driver in a blue shirt and a family with shopping bags and a pushchair stand beside it", label: "Photo: al-falah-shopping-family-trip.webp", w: 1000, h: 558 },
        city: { slot: "al-falah-kafd-olaya-private-ride", alt: "A black saloon with a driver and a passenger on a Riyadh highway under a sign for Al Falah, KAFD and Olaya, with city towers behind", label: "Photo: al-falah-kafd-olaya-private-ride.webp", w: 1000, h: 558 },
      },
      name: "Al Falah",
      title: "Al Falah Taxi Service Riyadh | Home, School and Airport",
      description: "Al Falah Taxi Service for home pickups, school and university runs, family trips and airport rides from north Riyadh, about 22 km from RUH. Fare confirmed first.",
      h1: "Al Falah Taxi Service in Riyadh",
      lead: "Al Falah Taxi Service from Gulf Elite Transport: private rides from your home in north Riyadh to the airport, to school, to work and across the city. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Falah, a residential district in north Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, school and university runs, family and shopping trips, rides to KAFD and Olaya, and airport transfers to King Khalid International Airport (RUH), about 22 km by road. A booking does not give entry to private property. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 22 km by road" },
        { label: "KAFD", value: "about 15 km by road" },
        { label: "Olaya", value: "about 19 km by road" },
        { label: "Area type", value: "residential, north Riyadh" },
      ],
      aboutH2: "Al Falah: a residential district in the north of Riyadh",
      about: [
        "Al Falah is a residential district in the north of Riyadh, east of Al Sahafah and west of Granada. It is quieter than the business centre in Olaya, with streets of villas and apartment blocks, local shops, small parks and several schools. OpenStreetMap shows Falah Park and Dar Al Uloom International School inside the district.",
        "Its position helps with the airport. King Khalid International Airport is about 22 km away by road, which is one of the shorter transfers in this group of districts. The financial district, KAFD, is closer to Al Falah than Olaya is, because the Northern Ring Road gives a direct run along the top of the city.",
        "Families in Al Falah use taxis for the school run, for trips to relatives in neighbouring districts such as Al Wadi and Al Izdihar, for shopping at Granada Mall or Al Nakheel Mall, and for airport journeys with luggage. A pre-booked ride lets you agree the time and the pickup gate in advance.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Falah and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 22, min: 17 }, olaya: { km: 19, min: 18 }, kafd: { km: 15, min: 15 }, adDirah: { km: 26, min: 22 }, malaz: { km: 21, min: 18 } },
      blocks: [
        {
          id: "airport",
          h2: "A short airport run from Al Falah to RUH",
          paragraphs: [
            "The airport is about 22 km from the centre of Al Falah by road, roughly 17 minutes in light traffic. Routing data uses Prince Mohammed Bin Salman Bin Abdulaziz Road, then Airport Road and King Salman Road. The run is short for Riyadh, but morning and evening traffic on the northern roads can add a good deal of time, and so can the terminal you are using.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your street and gate or a map pin. For an arrival send your landing time and where you are going. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "school-university",
          h2: "School and university runs",
          paragraphs: [
            "Several schools sit in and around Al Falah, and OpenStreetMap lists Dar Al Uloom International School in the district itself. Imam Muhammad Ibn Saud Islamic University is just to the north, with an address in Al Nargis, and Princess Nourah University lies to the south-east in Al Mugharzat. We could not confirm the gates, drop-off rules or hours for any of them.",
            "For a regular run, give the school or campus, the exact gate and the time you must arrive, and allow extra time around the start and end of the day, when the roads around schools are busy. We agree a meeting point the car can reach and we do not promise access to campus roads. Ask for the return pickup in the same request, with a time window.",
          ],
        },
        {
          id: "shopping-parks",
          h2: "Shopping, parks and family outings",
          paragraphs: [
            "Granada Mall and Mouwasat Hospital stand in the neighbouring district of Granada, and Al Nakheel Mall is on Othman Bin Affan Road towards Al Mugharzat, according to OpenStreetMap. Falah Park is listed inside Al Falah, and Al Izdihar Second Park is a short drive to the south-east. We do not publish opening hours, facilities or parking for any of these.",
            "Tell us the place and the entrance you want and agree a pickup the car can reach. For a family outing, give the number of adults and children and any pushchair or shopping you expect to carry, and we choose the vehicle from that and confirm it with you before you commit.",
          ],
        },
        {
          id: "city",
          h2: "To KAFD, Olaya and the old centre",
          paragraphs: [
            "KAFD is about 15 km from Al Falah by road, roughly 15 minutes in light traffic, along the Northern Ring Road and King Fahd Branch Road to the KAFD ring road. Olaya is about 19 km away, roughly 18 minutes, via Othman Bin Affan Branch Road, the Northern Ring Road and King Fahd Road. Ad Dirah and the old centre are about 26 km away, roughly 22 minutes.",
            "KAFD and many Olaya towers have controlled entrances, so name the tower and the entrance. We agree a meeting point the car can reach, and we do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business in these districts.",
          ],
        },
        {
          id: "metro",
          h2: "Riyadh Metro near Al Falah",
          paragraphs: [
            "An independent Riyadh Metro information site lists no station called Al Falah. The stations nearest by name are in neighbouring districts, such as Granadia on Line 6 (Purple). The site shows no map coordinates, so we do not state how far any station is from an address in Al Falah, and we could not check the details against the official operator.",
            "Please read the official Riyadh Metro information for current stations and services. A taxi can take you from your door to a station, or meet you there with luggage. Gulf Elite Transport is not part of the metro and has no partnership with it, and we do not publish metro fares, hours or journey times.",
          ],
        },
      ],
      nearIds: ["al-wadi", "al-izdihar", "granada", "al-mughrizat", "qurtubah", "al-hamra"],
      nearIntro: "These districts are close to Al Falah in north Riyadh but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "KAFD", id: "king-abdullah-financial-district", note: "The financial district, about 15 km by road" }],
      whatsappTrips: "a home pickup, a school or university run, a shopping trip or the airport",
      faq: [
        { q: "How can I book a taxi in Al Falah, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "How far is Al Falah from King Khalid International Airport?", a: "About 22 km by road, roughly 17 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Can you arrange a regular school run from Al Falah?", a: "Tell us the school, the gate, the days and the times, and we say what can be arranged. Each request is confirmed individually, and we do not promise access to school grounds." },
        { q: "Is there a metro station in Al Falah?", a: "An independent metro site lists no station called Al Falah. Granadia on Line 6 carries the name of a neighbouring district. Check the official Riyadh Metro information." },
        { q: "Which roads connect Al Falah with the rest of Riyadh?", a: "According to routing data, drives join Othman Bin Affan Branch Road, the Northern Ring Road, King Fahd Road and Prince Mohammed Bin Salman Bin Abdulaziz Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Falah?", a: "Al Wadi, Al Izdihar, Granada, Al Mughrizat and Qurtubah are the closest districts. Each is separate and has its own page." },
        { q: "Can I arrange a ride to KAFD or Olaya?", a: "Yes. KAFD is about 15 km by road and Olaya about 19 km, each roughly 15 to 18 minutes in light traffic. Name the building and the entrance." },
        { q: "What should I include in a booking request?", a: "A map pin or the street and building number, your destination and its entrance, the date and time, the number of passengers and bags, and a phone number." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Falah join Othman Bin Affan Branch Road or Prince Mohammed Bin Salman Bin Abdulaziz Road. For King Khalid International Airport, routing data uses Prince Mohammed Bin Salman Bin Abdulaziz Road, Airport Road and King Salman Road. For Olaya, it follows Othman Bin Affan Branch Road, the Northern Ring Road and King Fahd Road. For KAFD, it uses the Northern Ring Road and King Fahd Branch Road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point and current traffic. Traffic can change the route at short notice.",
      localIntro: "Find Al Falah on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby north Riyadh districts", "Shopping, universities and stations", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Falah", "Al Wadi", "Al Izdihar", "Granada", "Al Mughrizat", "Qurtubah", "Al Hamra", "Al Ghadir", "Al Sahafah", "Al Nargis", "Al Yasmin"],
        places: ["Granada Mall", "Al Nakheel Mall", "Imam Muhammad Ibn Saud Islamic University", "Princess Nourah University", "Granadia Metro Station"],
        others: ["King Abdullah Financial District", "Olaya", "Ad Dirah", "Diriyah", "Hittin", "King Khalid International Airport"],
        cities: ["Jeddah", "Dammam", "Buraidah"],
      },
      waMessage: ALFALAH_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
