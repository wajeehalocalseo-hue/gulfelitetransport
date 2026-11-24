import { cta, links, ol, p, section, standardTakeaways, table, ul, type Article } from "../types";

const D = "/riyadh-taxi-service";

/**
 * Figures: OpenStreetMap routing from King Khalid International Airport to each district centre, light traffic, reviewed November 2026
 * (the same data as the guide "Riyadh airport to every district"). Estimates only, no fares.
 */
export const post: Article = {
  slug: "taxi-from-riyadh-airport-ruh-to-the-city",
  h1: "Taxi from Riyadh Airport (RUH) to the City: How It Works and What to Ask",
  description: "How a taxi from King Khalid Airport works: pre-booking, the details to send, what to ask about the fare, and how far each Riyadh district is.",
  category: "Airport transfers",
  tags: ["Riyadh airport", "King Khalid Airport", "Airport taxi", "Pre-booking", "RUH"],
  published: "2026-11-24",
  answer:
    "A taxi from King Khalid International Airport (RUH) to the city works best when you arrange it before you fly. Send your flight number, the number of passengers and bags, and the hotel or district you are going to, and the vehicle, driver and fare are confirmed with you first. The districts of Riyadh are about 21 to 62 km from the airport by road, roughly 16 to 53 minutes in light traffic.",
  sections: [
    section(
      "before",
      "Why it helps to arrange the ride before you land",
      p("After a flight you want a short, clear path from the arrivals hall to your hotel. Passport control, baggage collection and a busy kerb can already take time, and a taxi you still have to find, explain and price adds to it."),
      p("When the ride is arranged in advance, three things are settled before you land: which vehicle is coming, who the driver is, and what the fare is. You do not have to agree a price while carrying your bags, and your hotel knows when to expect you."),
      p("The airport decides where cars may wait and collect passengers, so the meeting point is agreed with you before you travel. If your plans change, you tell us on WhatsApp and the plan changes with them."),
    ),
    section(
      "send",
      "What to send when you book an airport pickup",
      p("A short message is enough, as long as it has these details:"),
      ol(
        { title: "Flight number and date", text: "So the pickup follows your actual arrival and not a guess." },
        { title: "Terminal, if you know it", text: "If you do not, say so. It can be confirmed later." },
        { title: "Passengers and bags", text: "Count adults, children and every large bag. The vehicle is chosen from these numbers." },
        { title: "Where you are going", text: "The hotel name, or the district and a map pin from your phone." },
        { title: "Anyone who needs extra help", text: "Elderly travellers or young children, so the vehicle and the pickup are planned with them in mind." },
        { title: "A WhatsApp number that works", text: "The driver and the team can reach you quickly if the plan changes." },
      ),
    ),
    section(
      "distance",
      "How far is each part of Riyadh from the airport?",
      p("Riyadh is a wide city, and the airport is on its northern side. These are the estimated road distances and driving times from the airport to some of the places visitors ask about most. Tap a district to see its page."),
      table(
        ["District", "Road distance", "Driving time"],
        [
          ["Al Narjis", "about 21 km", "about 19 min"],
          ["Al Malqa", "about 27 km", "about 22 min"],
          ["Al Aqiq", "about 31 km", "about 24 min"],
          ["KAFD (the financial district)", "about 34 km", "about 26 min"],
          ["Hittin", "about 34 km", "about 25 min"],
          ["Diriyah", "about 37 km", "about 28 min"],
          ["Al Malaz", "about 39 km", "about 28 min"],
          ["Olaya", "about 40 km", "about 29 min"],
          ["Al Murabba", "about 42 km", "about 31 min"],
          ["Ad Dirah (old Riyadh)", "about 44 km", "about 33 min"],
          ["Diplomatic Quarter", "about 47 km", "about 36 min"],
        ],
        {
          hrefs: [`${D}/al-narjis-taxi-service`, `${D}/al-malqa-taxi-service`, `${D}/al-aqiq-taxi-service`, `${D}/king-abdullah-financial-district-taxi-service`, `${D}/hittin-taxi-service`, `${D}/diriyah-taxi-service`, `${D}/al-malaz-taxi-service`, `${D}/olaya-taxi-service`, `${D}/al-murabba-taxi-service`, `${D}/ad-dirah-taxi-service`, `${D}/diplomatic-quarter-taxi-service`],
          note: "Estimates from OpenStreetMap routing between place centres, for light traffic, reviewed in November 2026. Rush hours, roadworks and your exact address change the real figure.",
        },
      ),
      p("For all 46 districts we have figures for, see the guide [Riyadh airport to every district](/blog/riyadh-airport-to-city-districts-distance-and-time)."),
    ),
    cta("Landing in Riyadh soon?", "Send your flight and hotel on WhatsApp. We confirm the vehicle, driver and fare before you commit."),
    section(
      "ask",
      "Questions to ask before you get in any taxi",
      p("These questions help you with any airport taxi, whether you book with us or someone else."),
      ul(
        { title: "Is the fare agreed before the ride?", text: "A fare you hear after the ride starts is harder to question. Ask for it first." },
        { title: "Is it per car or per person?", text: "For a family, the difference matters." },
        { title: "What does the fare include?", text: "Waiting time, extra stops and large luggage should be clear before you leave." },
        { title: "Who is meeting me, and where?", text: "You should know the driver's name or how you will recognise the car." },
        { title: "What happens if my flight is late?", text: "Ask how the pickup time is handled so you are not left waiting alone." },
      ),
    ),
    section(
      "compare",
      "Pre-booked pickup or a taxi found at the airport?",
      p("Finding a taxi or using a ride-hailing app at the airport can work well for one traveller with light luggage and a flexible plan. A pre-booked car is easier when you travel with family, carry many bags, land late at night, or go to an address that is hard to find."),
      p("There is no single right answer. What matters is that you know the fare and the pickup point before you are tired and standing with your bags."),
    ),
    section(
      "related",
      "Related pages",
      links(
        { name: "King Khalid International Airport (RUH)", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport", note: "Airport transfers" },
        { name: "Riyadh Taxi Service", href: "/riyadh-taxi-service", note: "City rides, districts and airport transfers" },
        { name: "Riyadh airport to every district", href: "/blog/riyadh-airport-to-city-districts-distance-and-time", note: "Distance and time guide" },
        { name: "Book a ride", href: "/book", note: "The booking form" },
      ),
    ),
  ],
  faq: [
    { q: "How far is Riyadh airport from the city centre?", a: "It depends on where you are going. Olaya is about 40 km by road, roughly 29 minutes in light traffic, and Ad Dirah (old Riyadh) is about 44 km, roughly 33 minutes. These are estimates." },
    { q: "Can I book the ride back to the airport as well?", a: "Yes. Ask for both directions in one message and give the departure flight time. The pickup time is planned backwards from it." },
    { q: "Can you collect a group or a family with many bags?", a: "Yes. Tell us how many people and how many large bags there are, and the vehicle is chosen to fit them." },
    { q: "What if I land very late at night?", a: "Send the flight number in advance and say that it is a late arrival. The meeting point and plan are confirmed with you before you travel." },
    { q: "Do you publish fixed fares?", a: "No. The fare depends on the date, the district and the vehicle, so it is confirmed with you before you commit." },
  ],
  takeaways: standardTakeaways("This guide gives estimates. The following are not published here and are agreed with you for each request."),
};
