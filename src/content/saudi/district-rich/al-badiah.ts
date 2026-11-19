import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Badiah Taxi Service: hand-written page for Al Badiah (Al Badi'ah), a residential district in south-west central Riyadh (see district-rich/index.ts, built by factory.ts).
 * Primary focus keyword: "Al Badiah Taxi Service" (title, H1, lead, description). One primary keyword only.
 *
 * IMAGES: four reserved slots: area, journey, street and pickup (factory passes four to addImages). Suggested files: al-badiah-taxi-service/al-badiah-private-taxi-service-riyadh.webp (street scene with a car and driver),
 * al-badiah-airport-taxi-transfer.webp (luggage at a door), al-badiah-to-ad-dirah-city-taxi.webp. Wire them later with the custom map in addImages (see al-naseem.ts).
 *
 * CENTRE POINT: riyadh-areas.ts stores Al Badiah at 24.6156/46.6815. OpenStreetMap labels a park "Al Badiah District" at 24.6125/46.6847, which is consistent with that point. Used unchanged for weather and road estimates.
 * Figures (OpenStreetMap routing from that point, light traffic, reviewed November 2026): RUH 47.7 km / 36 min; Olaya 11.3 / 11; KAFD 23.5 / 22; Ad Dirah 5.0 / 6; Al Malaz 8.9 / 11.
 * Roads in the directions are those OSRM returned: Az Zayn As Sunbuki Street, Al Fudayl Bin Iyad Street, Khaybar Street, Al Madinah Al Munawwarah Road, King Fahd Branch Road, King Fahd Road, Imam Turki Bin Abdullah Street (to Ad Dirah),
 * King Saud Road, Makkah Al Mukarramah Road, Eastern Ring Road, Airport Road, King Salman Road.
 * Metro (independent site riyadhmetro.org, read 19 Nov 2026; official sources not reachable; no coordinates are shown on that site): there is no station named Al Badiah. Dhahrat Al Badiah is Line 3 (Orange) station 6, between
 * Aishah bint Abi Bakr Street and Sultanah. It is named after the neighbouring district Dhahrat Al Badiah (a separate district), so no distance is stated.
 * Nearby districts (straight-line from riyadh-areas.ts centres): Al Uraija 2.8 km, Al Suwaidi 2.8, Ad Dirah 3.7, Al Murabba 4.8, Al Shifa 6.0, Al Malaz 7.4, Olaya 8.3. No boundary was checked.
 * OpenStreetMap place labels used with their own district names: Suwaidi Park (As-Suwaidi), Al Salam Park (Ad Dahu).
 * NOT verified / left out: malls, hospitals, schools, exact district boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALBADIAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Badiah, Riyadh. The trip is [for example a home pickup, a trip to Ad Dirah or Al Murabba, a family visit or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alBadiahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-badiah",
      name: "Al Badiah",
      title: "Al Badiah Taxi Service Riyadh | Private Rides and Airport",
      description: "Al Badiah Taxi Service for home pickups, trips to Ad Dirah and Al Murabba, family visits and airport rides from south-west central Riyadh. Fare confirmed first.",
      h1: "Al Badiah Taxi Service in Riyadh",
      lead: "Al Badiah Taxi Service from Gulf Elite Transport: private rides from your door in Al Badiah, one of the closest residential districts to the old centre of Riyadh. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Badiah, a residential district in south-west central Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, short city rides to Ad Dirah and Al Murabba, family visits, and airport transfers to King Khalid International Airport (RUH), about 48 km by road. Al Badiah has no metro station of its own: the Line 3 station called Dhahrat Al Badiah belongs to a neighbouring district. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 48 km by road" },
        { label: "Ad Dirah", value: "about 5 km by road" },
        { label: "Olaya", value: "about 11 km by road" },
        { label: "Area type", value: "residential, south-west central Riyadh" },
      ],
      aboutH2: "Al Badiah: a residential district close to the old centre",
      about: [
        "Al Badiah, also written Al Badi'ah, is a residential district in south-west central Riyadh. It sits south of Al Murabba and south-west of the old city, so it is one of the western districts from which the heart of Riyadh is only a short drive away. Streets are mostly villas and low apartment blocks, with neighbourhood shops and mosques between them.",
        "That position shapes the rides we are asked for. Many requests are short and frequent: a lift to Ad Dirah for the markets and government offices, a trip to Al Murabba, a visit to relatives in Al Uraija or Al Suwaidi, or a ride home after an appointment. Others are long and fixed, such as the airport run to the far north of the city.",
        "Be careful with the name. Dhahrat Al Badiah is a separate district to the west, and a Riyadh Metro station carries that name. If your pickup is in Al Badiah itself, say so and send a map pin, so the driver does not head for the other district.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Badiah and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 48, min: 36 }, olaya: { km: 11, min: 11 }, kafd: { km: 24, min: 22 }, adDirah: { km: 5, min: 6 }, malaz: { km: 9, min: 11 } },
      blocks: [
        {
          id: "short-rides",
          h2: "Short city rides from Al Badiah",
          paragraphs: [
            "Ad Dirah is the shortest regular journey from Al Badiah, about 5 km by road and roughly 6 minutes in light traffic. Al Malaz is about 9 km away, roughly 11 minutes, and Olaya about 11 km, roughly 11 minutes, because routing data uses the King Fahd corridor for most of the way. These times are for quiet roads, and midday and evening traffic around the centre of Riyadh is much slower.",
            "For a short ride the details that matter are the pickup point and the exact entrance at the other end. Ad Dirah has narrow streets and busy markets, so tell us the name of the place you are going to and whether the driver should wait on the street or at a nearby car park. We agree a meeting point that the car can reach and we do not promise access to restricted streets.",
          ],
        },
        {
          id: "door-to-door",
          h2: "Door-to-door pickups in Al Badiah",
          paragraphs: [
            "Most pickups in Al Badiah are from a villa gate or an apartment entrance. Send the street name, the building or villa number and one landmark that is easy to see, such as a mosque or a main-road junction. A map pin on WhatsApp is better still, because it shows which side of the district you are on and avoids a mix-up with Dhahrat Al Badiah.",
            "If your building has a controlled entrance, tell us the gate you will use. A taxi booking does not give permission to enter private property, and we do not promise access to private roads or restricted entrances. Where entry is limited, agree a meeting point outside the gate. Add a phone number you will answer, the number of passengers and the number of bags.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Al Badiah and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is in the far north of Riyadh, about 48 km from the centre of Al Badiah by road, one of the longer airport runs from the city's south-west. In light traffic routing data gives roughly 36 minutes, mainly along King Fahd Road, Makkah Al Mukarramah Road, the Eastern Ring Road and Airport Road. Busy hours, your terminal and your exact starting street can all add time.",
            "For a departure, send your flight number, the date and time, your terminal if you know it, and the passengers and luggage. For an arrival, send your landing time and where you are going in Al Badiah. Because the drive is long, build in generous time for an early flight and say so in the request. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "metro",
          h2: "Riyadh Metro near Al Badiah",
          paragraphs: [
            "We could not confirm a metro station inside Al Badiah. An independent Riyadh Metro information site lists a station called Dhahrat Al Badiah on Line 3 (Orange), between Aishah bint Abi Bakr Street and Sultanah. It carries the name of the neighbouring district, and the site shows no map coordinates, so we do not state a walking or driving distance from Al Badiah.",
            "We could not check this against the official operator, so please look at the official Riyadh Metro information for current stations and services. A taxi can take you from your door to a station, or collect you from it when you arrive with luggage. Gulf Elite Transport is not part of the metro and has no partnership with it, and we do not publish metro fares, hours or journey times.",
          ],
        },
        {
          id: "parks-places",
          h2: "Parks and places near Al Badiah",
          paragraphs: [
            "OpenStreetMap shows a park labelled Al Badiah District close to the centre of the district, and Suwaidi Park and Al Salam Park a little way to the south-east and the north-east, in Al Suwaidi and Ad Dahu. We do not publish opening hours, facilities or entrance details for any park, and we could not confirm the names and locations of malls, hospitals or schools inside Al Badiah, so we leave them out.",
            "For a hospital, clinic or school run, give the name of the place, the branch and the gate you need, and tell us which district it is in, because several well-known places near Al Badiah belong to Al Uraija, Al Suwaidi and Ad Dirah. A ride is not an emergency or medical transport service.",
          ],
        },
        {
          id: "prebook",
          h2: "Why pre-book a ride from Al Badiah",
          paragraphs: [
            "Booking ahead lets you settle the pickup street, the vehicle and the fare before the day. For the airport it also lets us work backwards from your flight, and for school and appointment runs from the time you must arrive. A return pickup is easier to arrange in the same request than to find later, especially in the busy streets of the old centre.",
          ],
        },
      ],
      nearIds: ["al-uraija", "al-suwaidi", "ad-dirah", "al-murabba", "al-shifa"],
      nearIntro: "These districts are close to Al Badiah in south-west central Riyadh but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [
        { name: "Al Malaz", id: "al-malaz", note: "Residential and sports district, about 9 km by road" },
        { name: "Olaya", id: "olaya", note: "Offices, hotels and shopping, about 11 km by road" },
      ],
      whatsappTrips: "a home pickup, a trip to Ad Dirah or Al Murabba, a family visit or the airport",
      faq: [
        { q: "How can I book a taxi in Al Badiah, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "Is Al Badiah the same as Dhahrat Al Badiah?", a: "No. Dhahrat Al Badiah is a separate district to the west, and the Line 3 metro station carries its name. Send a map pin if you are not sure which one your address is in." },
        { q: "How far is Al Badiah from King Khalid International Airport?", a: "About 48 km by road, roughly 36 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Is there a metro station in Al Badiah?", a: "We could not confirm one. An independent metro site lists Dhahrat Al Badiah on Line 3 (Orange) in the neighbouring district. Check the official Riyadh Metro information." },
        { q: "Which roads lead out of Al Badiah?", a: "According to routing data, drives start on Az Zayn As Sunbuki Street and Al Fudayl Bin Iyad Street and join Al Madinah Al Munawwarah Road and King Fahd Branch Road. The best route depends on your pickup, destination and traffic." },
        { q: "Can I book a short ride to Ad Dirah?", a: "Yes. Ad Dirah is about 5 km by road, roughly 6 minutes in light traffic. Name the place you are going to and agree where the driver should wait." },
        { q: "Which neighbourhoods are near Al Badiah?", a: "Al Uraija, Al Suwaidi, Ad Dirah, Al Murabba and Al Shifa are the closest districts. Each is a separate district with its own page." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Badiah start on Az Zayn As Sunbuki Street and Al Fudayl Bin Iyad Street, then join Khaybar Street and Al Madinah Al Munawwarah Road. For Olaya and KAFD, routing data continues onto King Fahd Branch Road and King Fahd Road. For Ad Dirah, it turns onto Imam Turki Bin Abdullah Street. For King Khalid International Airport, it follows King Saud Road, Makkah Al Mukarramah Road, the Eastern Ring Road, Airport Road and King Salman Road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point and traffic.",
      localIntro: "Find Al Badiah on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby central and south-west Riyadh districts", "Metro stations and parks", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Badiah", "Al Uraija", "Al Suwaidi", "Dhahrat Al Badiah", "Ad Dirah", "Al Murabba", "Al Shifa", "Al Malaz", "Ad Dahu", "Al Washm", "Al Jarradiyah"],
        places: ["Dhahrat Al Badiah Metro Station", "Sultanah Metro Station", "Suwaidi Park", "Al Salam Park"],
        others: ["Olaya", "King Abdullah Financial District", "Diriyah", "King Khalid International Airport", "Qasr Al Hokm", "Al Batha", "Wadi Hanifah"],
        cities: ["Jeddah", "Dammam", "Makkah"],
      },
      waMessage: ALBADIAH_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
