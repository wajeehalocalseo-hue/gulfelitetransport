import { cta, links, ol, p, section, standardTakeaways, table, ul, type Article } from "../types";

/**
 * Figures: OpenStreetMap routing from the Olaya district centre (the same data as the Olaya page), light traffic, reviewed November 2026:
 * King Khalid International Airport about 39.5 km and 29 minutes (38 to 40 km and 30 to 35 minutes depending on the airport entrance used),
 * KAFD 12.7 km and 14 minutes, Ad Dirah 8.8 km and 9 minutes, Diriyah 18.8 km and 19 minutes. Kingdom Centre about 3 km and Al Faisaliah Tower about 2 km.
 * The Riyadh Metro Blue Line runs along Olaya Street, but no station is named because the names were not verified. No hotel or mall partnership is claimed.
 */
export const post: Article = {
  slug: "olaya-riyadh-getting-a-car-at-busy-times",
  h1: "Olaya, Riyadh: Hotels, Offices and the Best Way to Get a Car at Busy Times",
  description: "Olaya is one of Riyadh's busiest districts. How far it is from the airport, KAFD and Diriyah, and how to arrange a car at busy times without waiting.",
  category: "Riyadh areas",
  tags: ["Olaya", "Riyadh taxi", "Business travel", "Airport transfer", "KAFD"],
  published: "2026-11-25",
  answer:
    "Olaya is a busy mixed district in Riyadh with offices, towers, malls and hotels along Olaya Street. It is about 40 km from King Khalid International Airport, roughly 29 minutes in light traffic, and about 13 km from KAFD. At busy times, the easiest way to get a car is to arrange it ahead, give the exact entrance or tower name, and send a map pin.",
  sections: [
    section(
      "about",
      "What Olaya is like",
      p("Olaya is one of the best-known districts of Riyadh. It is a mixed area with office buildings, shopping and hotels, and two of the city's landmarks: Kingdom Centre, about 3 km from the district centre, and Al Faisaliah Tower, about 2 km away."),
      p("The Riyadh Metro Blue Line runs along Olaya Street. A private car is still useful when you carry luggage, travel as a group, have an early flight, or go to a place that is not close to a station."),
    ),
    section(
      "distance",
      "How far is Olaya from other places?",
      table(
        ["From Olaya to", "Road distance", "Driving time"],
        [
          ["Ad Dirah (old Riyadh)", "about 9 km", "about 9 min"],
          ["KAFD", "about 13 km", "about 14 min"],
          ["Diriyah", "about 19 km", "about 19 min"],
          ["King Khalid International Airport (RUH)", "about 40 km", "about 29 min"],
        ],
        {
          hrefs: ["/riyadh-taxi-service/ad-dirah-taxi-service", "/riyadh-taxi-service/king-abdullah-financial-district-taxi-service", "/riyadh-taxi-service/diriyah-taxi-service", "/taxi-saudi-arabia/airports/king-khalid-international-airport"],
          note: "Estimates from OpenStreetMap routing between place centres, for light traffic, reviewed in November 2026. The airport figure changes by a few kilometres and minutes depending on the entrance used.",
        },
      ),
    ),
    section(
      "busy",
      "Why it can be hard to get a car at busy times",
      p("Olaya has many people in a small area. At the start and end of the working day, around lunch, and on evenings and weekends when people go out, many cars are looking for the same streets and entrances. A ride that takes minutes at a quiet time can take much longer when the roads are full."),
      ul(
        { title: "Rush periods", text: "The start and end of office hours are the busiest. Allow extra time, or arrange the pickup earlier." },
        { title: "Evenings and weekends", text: "People go to malls, cafes and hotels, so the main roads and entrances are busier." },
        { title: "Large buildings with several doors", text: "A tower or mall can have more than one entrance, and the car has to be at the right one." },
        { title: "One-way and service roads", text: "A pickup on the other side of a road can mean a long detour. A pin helps." },
      ),
    ),
    cta("Need a car in Olaya?", "Send your pickup, destination and time on WhatsApp. We confirm the vehicle, driver and fare before you commit."),
    section(
      "how",
      "How to arrange a car without waiting",
      ol(
        { title: "Arrange it ahead for important trips", text: "A flight, a meeting or a dinner booking should not depend on finding a car at the last minute." },
        { title: "Give the exact meeting point", text: "The name of the tower, mall or hotel, and the entrance or gate you will wait at." },
        { title: "Send a map pin", text: "A pin from your phone is clearer than an address on a busy road." },
        { title: "Say how many people and bags", text: "A group with luggage needs a different vehicle." },
        { title: "Add the destination and any stops", text: "KAFD, the airport, Diriyah or a hotel, and anything on the way." },
        { title: "Ask for the fare first", text: "You should know the fare, and what it includes, before the car comes." },
      ),
      p("For the details of the district, see the [Olaya taxi page](/riyadh-taxi-service/olaya-taxi-service)."),
    ),
    section(
      "airport",
      "Olaya and the airport",
      p("Visitors to Olaya often arrive from King Khalid International Airport, and leave for it again. The ride is about 40 km. For a morning flight, plan the pickup time backwards from the departure, with a margin for traffic and check-in."),
      p("See [Taxi from Riyadh Airport to the city](/blog/taxi-from-riyadh-airport-ruh-to-the-city) for what to send when you book an airport pickup."),
    ),
    section(
      "related",
      "Related pages",
      links(
        { name: "Olaya taxi service", href: "/riyadh-taxi-service/olaya-taxi-service", note: "The Olaya page" },
        { name: "Riyadh Taxi Service", href: "/riyadh-taxi-service", note: "City rides, districts and airport transfers" },
        { name: "KAFD taxi service", href: "/riyadh-taxi-service/king-abdullah-financial-district-taxi-service", note: "The financial district" },
        { name: "King Khalid International Airport", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport", note: "Airport transfers" },
        { name: "Book a ride", href: "/book", note: "The booking form" },
      ),
    ),
  ],
  faq: [
    { q: "How far is Olaya from Riyadh airport?", a: "About 40 km by road, roughly 29 minutes in light traffic. The exact figure depends on the airport entrance used, and it changes with traffic." },
    { q: "How far is Olaya from KAFD?", a: "About 13 km, roughly 14 minutes in light traffic. These are estimates." },
    { q: "Can you pick me up from a tower or mall in Olaya?", a: "Yes. Tell us the name and the entrance or gate you will wait at, and send a map pin." },
    { q: "Can I book a ride ahead for an early flight?", a: "Yes. Send your flight details and we plan the pickup time backwards from the departure." },
    { q: "Is a car better than the metro?", a: "It depends. The metro runs along Olaya Street and suits many trips. A car is useful for luggage, groups and places away from a station." },
  ],
  takeaways: standardTakeaways("This guide gives estimates. The following are not published here and are agreed with you for each request."),
};
