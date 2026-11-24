import { cta, links, ol, p, section, standardTakeaways, ul, type Article } from "../types";

/** No dates are given for Ramadan, because they follow the moon. No traffic figures or fares are stated. */
export const post: Article = {
  slug: "ramadan-travel-in-saudi-arabia-how-to-plan-rides-around-iftar",
  h1: "Ramadan Travel in Saudi Arabia: How to Plan Rides Around Iftar",
  description: "How rides change in Ramadan: Iftar and Suhoor timing, busier roads and holy cities, night arrivals, and how to plan a long trip or an Umrah transfer.",
  category: "Seasons and events",
  tags: ["Ramadan travel", "Iftar", "Umrah in Ramadan", "Night travel", "Planning"],
  published: "2026-11-25",
  answer:
    "In Ramadan the day follows a different rhythm: people break the fast together at sunset, many travel at night, and the roads, hotels and holy cities are busier. Plan long rides for the early part of the day or for after Iftar, tell us if you or the driver will break the fast on the road so a stop is planned, and book early, especially for Umrah transfers.",
  sections: [
    section(
      "rhythm",
      "How the day changes in Ramadan",
      p("The month of Ramadan changes when people eat, sleep, work and travel. Iftar, the meal that breaks the fast, happens at sunset. Suhoor, the meal before the fast, happens before dawn. Many people are awake late into the night and quieter in the early afternoon."),
      p("Ramadan follows the moon, so its dates move each year and are confirmed by moon sighting. Check the dates for the year you plan to travel, and book with that in mind."),
    ),
    section(
      "roads",
      "What this means for a ride",
      ul(
        { title: "Roads near sunset", text: "Many people leave work and head home or to family meals before Iftar. A ride that needs to be quick is best planned well before sunset or after the meal." },
        { title: "Late-night activity", text: "Streets, shops and the holy cities are active late at night. A ride at 11 pm can feel like an ordinary evening." },
        { title: "Quiet afternoons", text: "Early afternoon can be calmer, but it can also be hot and tiring for people who are fasting." },
        { title: "The holy cities", text: "Makkah and Madinah are especially busy in Ramadan, and traffic around the Haram and the Prophet's Mosque can be heavy around prayer times." },
        { title: "Airports", text: "Arrivals and departures can be busy at night, so allow for extra time." },
      ),
    ),
    cta("Travelling in Ramadan?", "Send your dates, flight and hotel on WhatsApp. We confirm the vehicle, driver and fare before you commit."),
    section(
      "long",
      "Planning a long intercity ride",
      ol(
        { title: "Choose when to leave", text: "Many travellers leave in the morning after Suhoor and prayer, or after Iftar for a night drive. Choose what is safest and most comfortable for your group." },
        { title: "Plan the Iftar stop", text: "If the sun will set during the ride, tell us. A stop for Iftar and prayer can be agreed in advance, so the driver and passengers can break the fast calmly." },
        { title: "Pack water and dates", text: "Keep them within reach so you can break the fast on time wherever you are." },
        { title: "Consider an early start or a night drive", text: "Leaving early can avoid the afternoon heat, and a night drive can suit those who fast during the day. Rest before a long night ride." },
        { title: "Agree the return", text: "Ask for both directions in one request and give the dates." },
      ),
      p("For a longer checklist, read [Planning a long-distance taxi from Riyadh](/blog/how-to-plan-a-long-distance-taxi-from-riyadh)."),
    ),
    section(
      "umrah",
      "Umrah transfers in Ramadan",
      p("Many people travel for Umrah in Ramadan, so airports, roads and hotels are busier than usual. The arrival from Jeddah to Makkah, and the ride from Makkah to Madinah, take planning."),
      ul(
        { title: "Book early", text: "Send your flights and hotel as soon as you know them." },
        { title: "Expect busier traffic", text: "Roads near the Haram are controlled, and the drop-off point may be set by road conditions." },
        { title: "Allow for late arrivals", text: "Flights and baggage can take longer on busy days, so the plan follows your actual arrival." },
        { title: "Say who is travelling", text: "Elderly pilgrims and families with children need a calm, well-planned pickup." },
      ),
      p("See [Jeddah airport to Makkah by private taxi](/blog/jeddah-airport-to-makkah-private-taxi-for-umrah-arrivals) for the step-by-step."),
    ),
    section(
      "related",
      "Related pages",
      links(
        { name: "Umrah and Hajj taxi", href: "/umrah-hajj-taxi", note: "All pilgrim rides" },
        { name: "Jeddah airport to Makkah", href: "/umrah-hajj-taxi/jeddah-airport-to-makkah", note: "The Umrah transfer page" },
        { name: "Makkah to Madinah taxi", href: "/taxi-saudi-arabia/routes/makkah-to-madinah", note: "The usual next leg" },
        { name: "Intercity routes", href: "/taxi-saudi-arabia/routes", note: "Every route page" },
        { name: "Book a ride", href: "/book", note: "The booking form" },
      ),
    ),
  ],
  faq: [
    { q: "Do you operate in Ramadan?", a: "Send your request with the date and we confirm whether the ride is possible. Availability depends on the place, the date and the time of day." },
    { q: "Can the driver stop for Iftar?", a: "Yes. Tell us in advance and a stop for Iftar and prayer is planned with you." },
    { q: "Is it better to travel before or after Iftar?", a: "It depends on the route and your group. Many people leave in the morning or after Iftar. Tell us your preference and we plan around it." },
    { q: "Should I book Umrah transport early for Ramadan?", a: "Yes. It is a busy period, so send your flights and hotel as early as you can." },
    { q: "Will my fare be different in Ramadan?", a: "The fare depends on the date, the route and the vehicle, and is confirmed with you before you commit." },
  ],
  takeaways: standardTakeaways("This guide is general. The following are not published here and are agreed with you for each request."),
};
