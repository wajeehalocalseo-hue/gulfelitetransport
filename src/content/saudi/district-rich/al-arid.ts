import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Arid Taxi Service: hand-written page for Al Arid (Al Aarid), a newer residential district in far-north Riyadh (built by factory.ts). Primary focus keyword: "Al Arid Taxi Service" only.
 * IMAGES: five photos from the owner's Google Drive (Al Arid folder), resized to 1000 px wide WebP (35-115 KB) in public/images/routes/riyadh-districts/al-arid-taxi-service/ and placed in the about, new-streets, airport, long-rides, north-districts sections. The photos show cars and drivers; the page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.8935/46.6060, used unchanged. OpenStreetMap shows few mapped places here (a mosque labelled Al Aarid, schools in Al Narjis), so the page leans on roads and nearby districts.
 * Figures (OSRM, light traffic, Nov 2026): RUH 26.2 km / 19 min; Olaya 27.2 / 26; KAFD 18.7 / 20; Ad Dirah 34.1 / 30; Al Malaz 30.6 / 27.
 * Roads returned: King Abdulaziz Road (first road), Rayhanah Bint Zaid Street, Abu Bakr As Siddiq Road and its branch, King Salman Branch Road, King Salman Road (airport); Imam Saud Bin Faisal Road, Thumamah Road, KAFD ring road (KAFD);
 * King Fahd Branch Road, King Fahd Road, Prince Mohammed Bin Abdulaziz Road, Olaya Street (Olaya).
 * Metro (independent riyadhmetro.org, read 19 Nov 2026): no station named Al Arid or in the north-west; none is claimed.
 * Nearby (straight-line centres): Al Qirawan 4.7 km, Al Narjis 7.0, Al Yasmin 8.6, Al Malqa 9.3, Al Sahafah 10.7, Banban 12.2.
 * OpenStreetMap labels used with their own district names: Inaya Medical College and Al Yamamah University (Al Qirawan addresses), Hamad Al Najem Mosque (Al Aarid).
 * NOT verified: malls, hospitals, parks, boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALARID_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Arid, Riyadh. The trip is [for example a home pickup, a family trip, a trip to KAFD or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alAridRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-arid",
      images: {
        about: { slot: "al-arid-family-taxi-pickup-new-villas-riyadh", alt: "A brown SUV with its boot open on a paved street of new sand-coloured villas, with a family and a man with two suitcases standing beside it", label: "Photo: al-arid-family-taxi-pickup-new-villas-riyadh.webp", w: 1000, h: 558 },
        "new-streets": { slot: "al-arid-taxi-pickup-map-pin-driver", alt: "A woman in a grey headscarf shows her phone to the driver of a silver car on an unfinished sandy road lined with new villas", label: "Photo: al-arid-taxi-pickup-map-pin-driver.webp", w: 1000, h: 558 },
        airport: { slot: "al-arid-ruh-airport-taxi-transfer", alt: "A white SUV with its boot open at the King Khalid International Airport departures kerb while a driver in a white shirt helps a man and a woman with two suitcases", label: "Photo: al-arid-ruh-airport-taxi-transfer.webp", w: 1000, h: 558 },
        "long-rides": { slot: "al-arid-kafd-olaya-private-ride", alt: "A dark red saloon with a driver and a passenger on a Riyadh highway beneath a sign for KAFD and Olaya", label: "Photo: al-arid-kafd-olaya-private-ride.webp", w: 1000, h: 558 },
        "north-districts": { slot: "al-arid-north-riyadh-door-to-door-pickup", alt: "A dark green SUV on a quiet street of new villas as a man in a white thobe opens the door for a man and a woman who walk up with a suitcase", label: "Photo: al-arid-north-riyadh-door-to-door-pickup.webp", w: 1000, h: 558 },
      },
      name: "Al Arid",
      title: "Al Arid Taxi Service Riyadh | Far-North Rides and Airport",
      description: "Al Arid Taxi Service for home pickups, family trips, city journeys and airport rides from far-north Riyadh, about 26 km from RUH. Fare confirmed first.",
      h1: "Al Arid Taxi Service in Riyadh",
      lead: "Al Arid Taxi Service from Gulf Elite Transport: private rides from your door in one of Riyadh's newer far-northern districts, where a map pin matters as much as the street name. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Arid, a newer residential district in the far north of Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, long city rides to KAFD and Olaya, and airport transfers to King Khalid International Airport (RUH), about 26 km by road. A booking does not give entry to private property or controlled entrances. Send your map pin, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 26 km by road" },
        { label: "KAFD", value: "about 19 km by road" },
        { label: "Olaya", value: "about 27 km by road" },
        { label: "Area type", value: "residential, far-north Riyadh" },
      ],
      aboutH2: "Al Arid: a newer residential district in far-north Riyadh",
      about: [
        "Al Arid is a residential district in the far north of Riyadh, north-west of Al Narjis and Al Yasmin and a few kilometres east of Al Qirawan. It is one of the newer northern districts, which means that the streets are wide, many plots are still being built on, and some roads are missing or named differently on different maps.",
        "That makes a pickup here a little different from one in an old district. A street name alone may not be enough, so we ask for a map pin, a plot or villa number and the nearest main road. With those three details the driver can find the gate without a phone call.",
        "Because Al Arid is far from the centre, rides fall into two kinds: short ones to neighbouring northern districts and the airport, and long ones to KAFD, Olaya and the old centre. We explain both below, with the distances that routing data gives.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Arid and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 26, min: 19 }, olaya: { km: 27, min: 26 }, kafd: { km: 19, min: 20 }, adDirah: { km: 34, min: 30 }, malaz: { km: 31, min: 27 } },
      blocks: [
        {
          id: "new-streets",
          h2: "Finding your pickup in a newer district",
          paragraphs: [
            "Send a map pin from your phone and write the villa or plot number beside it. Add the name of the nearest main road, such as King Abdulaziz Road, and say which side you are on. If your street is new, tell us the nearest mosque or school as well, so that a driver who only sees an older map can still reach you.",
            "If the building is in a compound or a gated plot, say which gate to use. A taxi booking does not give permission to enter private property, and we do not promise access to private roads or controlled entrances. Where entry is limited, agree a meeting point outside the gate that the car can reach. Give a phone number you will answer and tell us if the street is still under construction.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Al Arid and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 26 km from the centre of Al Arid by road, roughly 19 minutes in light traffic. Routing data starts on King Abdulaziz Road, then uses Rayhanah Bint Zaid Street, Abu Bakr As Siddiq Road and its branch, King Salman Branch Road and King Salman Road. For a district this far north, the airport is among the nearer destinations, though peak hours and your terminal can add time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your map pin. For an arrival send your landing time and your address. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "long-rides",
          h2: "Long city rides: KAFD, Olaya and the old centre",
          paragraphs: [
            "KAFD is about 19 km from Al Arid by road, roughly 20 minutes in light traffic, via King Abdulaziz Road, Imam Saud Bin Faisal Road and Thumamah Road. Olaya is about 27 km away, roughly 26 minutes, through King Fahd Branch Road and King Fahd Road. Ad Dirah is about 34 km away and Al Malaz about 31 km, each roughly half an hour in quiet traffic.",
            "These are long rides, so the time of day matters more than for a short trip. Tell us when you need to arrive and give the tower name and entrance of your destination. We agree a meeting point the car can reach and do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business in these districts.",
          ],
        },
        {
          id: "north-districts",
          h2: "Rides to nearby northern districts",
          paragraphs: [
            "Al Qirawan is the nearest district, about 5 km away in a straight line. OpenStreetMap labels Inaya Medical College and Al Yamamah University with Al Qirawan addresses, and a mosque is labelled Al Aarid, close to the centre of this district. Al Narjis, Al Yasmin and Al Malqa lie further east and south, each between 7 and 10 km away.",
            "For a school, university, hospital or clinic visit, give the name of the place, the branch and the gate, and tell us which district it is in. A ride does not include any appointment and is not an emergency or medical transport service. We do not publish opening hours or entrance details for any place.",
          ],
        },
        {
          id: "metro",
          h2: "Public transport near Al Arid",
          paragraphs: [
            "An independent Riyadh Metro information site shows no station in Al Arid or in the north-west of the city, and we could not check this against the official operator. Please read the official Riyadh Metro and bus information for current services. We do not claim a metro link for this district.",
            "A private taxi suits families, fixed pickup times and journeys that public transport does not reach. Gulf Elite Transport is not part of the metro or any bus operator and has no partnership with them.",
          ],
        },
      ],
      nearIds: ["al-qirawan", "al-narjis", "al-yasmin", "al-malqa", "al-sahafah", "banban"],
      nearIntro: "These districts are close to Al Arid in the north of Riyadh but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "KAFD", id: "king-abdullah-financial-district", note: "The financial district, about 19 km by road" }],
      whatsappTrips: "a home pickup, a family trip, a trip to KAFD or the airport",
      faq: [
        { q: "How can I book a taxi in Al Arid, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "Why do you ask for a map pin in Al Arid?", a: "Al Arid is a newer district and some streets are missing or named differently on different maps. A pin and a villa or plot number avoid a wrong turn." },
        { q: "How far is Al Arid from King Khalid International Airport?", a: "About 26 km by road, roughly 19 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Is there a metro station in Al Arid?", a: "An independent metro site shows none in the north-west of the city. Check the official Riyadh Metro information for current services." },
        { q: "Which roads lead out of Al Arid?", a: "According to routing data, drives start on King Abdulaziz Road and lead on to Abu Bakr As Siddiq Road, King Salman Road, Imam Saud Bin Faisal Road and King Fahd Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Arid?", a: "Al Qirawan, Al Narjis, Al Yasmin, Al Malqa and Al Sahafah are the closest, and Banban lies further north. Each is separate and has its own page." },
        { q: "Can I arrange a ride to KAFD or Olaya?", a: "Yes. KAFD is about 19 km by road and Olaya about 27 km, roughly 20 to 26 minutes in light traffic. Name the building and the entrance." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it for long rides. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Arid start on King Abdulaziz Road. For King Khalid International Airport, routing data uses Rayhanah Bint Zaid Street, Abu Bakr As Siddiq Road, King Salman Branch Road and King Salman Road. For KAFD, it follows Imam Saud Bin Faisal Road and Thumamah Road. For Olaya, it joins King Fahd Branch Road and King Fahd Road. Newer streets in Al Arid may be missing from some maps. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point and current traffic. Traffic can change the route at short notice.",
      localIntro: "Find Al Arid on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby north Riyadh districts", "Universities and colleges nearby", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Arid", "Al Qirawan", "Al Narjis", "Al Yasmin", "Al Malqa", "Al Sahafah", "Banban", "Al Aqiq", "Hittin", "Al Falah"],
        places: ["Inaya Medical College", "Al Yamamah University", "Imam Muhammad Ibn Saud Islamic University"],
        others: ["Olaya", "King Abdullah Financial District", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport", "Al Murabba", "Wadi Hanifah"],
        cities: ["Jeddah", "Dammam", "Buraidah", "Al Kharj"],
      },
      waMessage: ALARID_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
