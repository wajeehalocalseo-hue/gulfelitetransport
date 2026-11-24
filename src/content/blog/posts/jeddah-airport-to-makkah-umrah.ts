import { cta, links, ol, p, section, standardTakeaways, ul, type Article } from "../types";

/**
 * Figures: the Makkah to Jeddah route page uses about 89 km by road between the two city centres (OpenStreetMap routing, light traffic),
 * and OpenStreetMap places King Abdulaziz International Airport about 16 km from the centre of Jeddah. The airport to Makkah distance is not
 * published here, because it depends on where in Makkah you stay, and it is confirmed for each request.
 */
export const post: Article = {
  slug: "jeddah-airport-to-makkah-private-taxi-for-umrah-arrivals",
  h1: "Jeddah Airport to Makkah by Private Taxi: A Step-by-Step Guide for Umrah Arrivals",
  description: "How a private taxi from Jeddah airport to Makkah works for Umrah arrivals: what to send, what happens after landing, and the Haram drop-off point.",
  category: "Umrah and Hajj",
  tags: ["Jeddah airport", "Umrah transport", "Makkah taxi", "Pilgrims", "Airport to hotel"],
  published: "2026-11-24",
  answer:
    "Most Umrah visitors fly into Jeddah and continue to Makkah by road. A private taxi from King Abdulaziz International Airport to your Makkah hotel is arranged in advance: you send your flight, your hotel and the number of people and bags, and the vehicle, driver and fare are confirmed before you commit. Makkah is about 89 km from the centre of Jeddah by road, and the airport lies about 16 km outside that centre, so the real distance depends on your address.",
  sections: [
    section(
      "why",
      "Why this first leg matters",
      p("An Umrah trip usually begins with a long flight and then a road journey to the holy city. By the time you reach the arrivals hall you may be tired, travelling with family or with older relatives, and carrying more luggage than you expected."),
      p("A ride that is arranged before you fly gives you one clear task on arrival: find your driver and go to your hotel. You do not need to compare offers or agree a price while carrying your bags."),
    ),
    section(
      "steps",
      "The journey, step by step",
      ol(
        { title: "Before you fly: send your details", text: "Your flight number and date, your hotel in Makkah, the number of adults and children, and the number of large bags. If you do not have a hotel yet, tell us the area you prefer." },
        { title: "After you land: passport control and baggage", text: "These steps can take a while, especially on busy days. That is why we ask for your flight number and not a fixed pickup time, so the plan follows your actual arrival." },
        { title: "Meeting your driver", text: "The airport sets where cars may collect passengers, so the meeting point is agreed with you before you travel. You are told how to recognise your driver." },
        { title: "On the road to Makkah", text: "The drive follows the main highway between the two cities. Traffic changes with the season and the time of day, and prayer times and busy periods can slow it." },
        { title: "Arriving at your hotel", text: "Vehicle access near the Haram is controlled, so the final drop-off point may be set by road conditions. Tell us your hotel and we agree the best point with you in advance." },
      ),
    ),
    section(
      "distance",
      "How far is it?",
      p("The road distance between the centre of Makkah and the centre of Jeddah is about 89 km. King Abdulaziz International Airport lies about 16 km from the centre of Jeddah, so the drive from the airport to a Makkah hotel is a different figure from the city-to-city one, and it depends on where in Makkah your hotel is."),
      p("We do not publish one number for it. The distance, the likely traffic and the fare are confirmed with you when you send your hotel name. See the [Jeddah to Makkah taxi page](/taxi-saudi-arabia/routes/makkah-to-jeddah) for the route between the two cities."),
    ),
    cta("Arriving in Jeddah for Umrah?", "Send your flight, your Makkah hotel and the number of people and bags on WhatsApp. We confirm the vehicle, driver and fare first."),
    section(
      "tell",
      "What to tell us so the right vehicle comes",
      ul(
        { title: "Flight details", text: "Airline, flight number and arrival date." },
        { title: "Your hotel and area in Makkah", text: "The hotel name makes the drop-off point easy to plan." },
        { title: "People and bags", text: "Pilgrims often carry more luggage than they expect, so count every large bag." },
        { title: "Special needs", text: "Elderly travellers, wheelchair users or young children, so the vehicle and the pickup are planned around them." },
        { title: "Your return plans", text: "If you also need a ride back to the airport, or a ride on to Madinah, ask in the same message." },
      ),
    ),
    section(
      "notes",
      "Things worth knowing",
      ul(
        { title: "Entry to Makkah", text: "Entry to Makkah is for Muslims only. This is the traveller's responsibility." },
        { title: "Busy seasons", text: "Ramadan, school holidays and the Hajj season are busy. Book early, and expect traffic around prayer times." },
        { title: "A group or several families", text: "Tell us the group size. More than one vehicle can be planned for one arrival." },
        { title: "Going on to Madinah", text: "Many visitors continue from Makkah to Madinah. A ride between the two cities can be planned in the same request." },
      ),
    ),
    section(
      "related",
      "Related pages",
      links(
        { name: "Jeddah airport to Makkah", href: "/umrah-hajj-taxi/jeddah-airport-to-makkah", note: "The Umrah transfer page" },
        { name: "Umrah and Hajj taxi", href: "/umrah-hajj-taxi", note: "All pilgrim rides" },
        { name: "Jeddah to Makkah taxi", href: "/taxi-saudi-arabia/routes/makkah-to-jeddah", note: "The route between the two cities" },
        { name: "Makkah to Madinah taxi", href: "/taxi-saudi-arabia/routes/makkah-to-madinah", note: "The usual next leg" },
        { name: "Book a ride", href: "/book", note: "The booking form" },
      ),
    ),
  ],
  faq: [
    { q: "How long does it take from Jeddah airport to Makkah?", a: "It depends on the time of day, the season and where in Makkah your hotel is, so no journey time is promised in advance. Traffic around prayer times and in busy seasons can add time." },
    { q: "Can I book the ride before I leave home?", a: "Yes. Send your flight number, your Makkah hotel and the number of people and bags on WhatsApp. The vehicle, driver and fare are confirmed with you before you commit." },
    { q: "What if my flight is delayed?", a: "Tell us the flight number so the pickup follows your actual arrival. If your plans change, message us and the plan changes with them." },
    { q: "Can the driver take me to my hotel door?", a: "Vehicle access near the Haram is controlled. We agree the best drop-off point with you in advance, and it is based on your hotel and the road conditions." },
    { q: "Can I travel with older parents or children?", a: "Yes. Tell us who is travelling so the vehicle and the pickup are planned around them." },
    { q: "Can I continue to Madinah afterwards?", a: "Yes. Ask for the ride from Makkah to Madinah in the same message, or add it later." },
  ],
  takeaways: standardTakeaways("This guide describes how the ride works. The following are not published here and are agreed with you for each request."),
};
