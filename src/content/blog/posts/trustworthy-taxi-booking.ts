import { cta, links, ol, p, section, standardTakeaways, table, ul, type Article } from "../types";

/** No figures, no fares. A general guide to reading a quote, followed by how this company's own confirmation works. */
export const post: Article = {
  slug: "how-to-spot-a-trustworthy-taxi-booking-in-saudi-arabia",
  h1: "How to Spot a Trustworthy Taxi Booking in Saudi Arabia: What a Clear, Honest Quote Looks Like",
  description: "What a clear taxi quote should say, the warning signs to watch for, and the questions to ask before you agree to a long ride in Saudi Arabia.",
  category: "Safety and trust",
  tags: ["Trusted taxi", "Taxi quote", "Booking tips", "Safety", "Saudi Arabia"],
  published: "2026-11-25",
  answer:
    "A trustworthy taxi booking tells you five things before you agree: the vehicle, the driver or how you will recognise them, the fare, what the fare includes, and where and when you will meet. If a quote leaves any of these out, or the price is only decided after the ride starts, ask for the missing detail before you commit.",
  sections: [
    section(
      "why",
      "Why the quote matters more on a long ride",
      p("On a short ride across a city, a misunderstanding costs a few minutes. On a ride of several hundred kilometres, it can cost you your day. You are in a car for hours, far from where you started, and changing your mind is hard."),
      p("That is why it is worth spending two minutes on the quote. A clear quote is not a sign of a bigger company. It is a sign that someone has thought about your trip."),
    ),
    section(
      "clear",
      "What a clear quote says",
      ul(
        { title: "The route and the date", text: "Where you are picked up, where you are dropped off, and the day and time." },
        { title: "The vehicle", text: "The type of car or van, and that it fits your passengers and bags." },
        { title: "The driver, or how you will recognise them", text: "A name or a clear way to find your driver at the pickup." },
        { title: "The fare", text: "One amount, stated before the ride, and whether it is for the whole vehicle." },
        { title: "What is included", text: "Waiting time, agreed stops, large luggage and the return, if you asked for one." },
        { title: "How changes are handled", text: "What happens if your flight is late, or you add a stop." },
      ),
    ),
    section(
      "flags",
      "Warning signs",
      p("None of these proves a booking is bad, but each one is a reason to ask a question before you agree."),
      ul(
        { title: "The fare is decided after the ride starts", text: "You lose the chance to compare or to say no." },
        { title: "The answer to your question is vague", text: "If you ask what the fare includes and hear \"it depends\", ask for the details in writing." },
        { title: "Pressure to decide immediately", text: "A fair provider can wait while you check your plans." },
        { title: "No clear meeting point", text: "At an airport or a hotel, you should know exactly where to find your driver." },
        { title: "The vehicle is not described", text: "A family of six with large bags needs more than a promise of a car." },
        { title: "Nobody replies to a simple message", text: "If it is hard to get an answer before the ride, it may be harder afterwards." },
      ),
    ),
    cta("Want a quote you can check?", "Send your route, date, passengers and bags on WhatsApp. We confirm the vehicle, driver and fare before you commit."),
    section(
      "ask",
      "Five questions to ask before you say yes",
      ol(
        { title: "What is the total fare, and is it for the whole car?", text: "A single amount is easier to compare than a price per person." },
        { title: "What does it include?", text: "Waiting time, stops, bags, tolls if any, and the return." },
        { title: "Which vehicle is coming?", text: "Ask for the type, and say how many people and bags." },
        { title: "Where exactly will we meet?", text: "A hotel entrance, a terminal door or a map pin." },
        { title: "What if our plans change?", text: "A late flight, an extra stop or a change of date." },
      ),
    ),
    section(
      "ours",
      "What we confirm with you",
      p("For every request, we confirm the vehicle, the driver and the fare with you before you commit. We do not publish standard fares, because the right fare depends on your route, date, passengers, bags, stops and whether you return."),
      table(
        ["What you give us", "What we confirm back"],
        [
          ["Route, date and time", "That the ride is possible on that day"],
          ["Passengers and bags", "The vehicle that fits them"],
          ["Stops and waiting", "What the fare includes"],
          ["One way or return", "The fare for the whole plan"],
          ["Pickup point", "Where and how you meet your driver"],
        ],
        { note: "Nothing is agreed until you say yes. Availability depends on the place, the date and the time of day." },
      ),
      p("You can see how the details change a fare in [How taxi fares are worked out for long trips](/blog/how-taxi-fares-are-worked-out-for-long-trips-in-saudi-arabia)."),
    ),
    section(
      "related",
      "Related pages",
      links(
        { name: "Taxi and cab services", href: "/services/taxi-cab-services", note: "How we arrange private rides" },
        { name: "How taxi fares are worked out", href: "/blog/how-taxi-fares-are-worked-out-for-long-trips-in-saudi-arabia", note: "What changes a fare" },
        { name: "Private taxi or ride-hailing app", href: "/blog/private-taxi-or-ride-hailing-app-for-a-long-trip-in-saudi-arabia", note: "When each makes sense" },
        { name: "Book a ride", href: "/book", note: "The booking form" },
      ),
    ),
  ],
  faq: [
    { q: "Should I pay before the ride?", a: "That is for you and the provider to agree, and it should be clear in the quote. Ask when and how payment is made before you commit." },
    { q: "Is a very low quote a good sign?", a: "Not necessarily. Compare what each quote includes: the vehicle, bags, stops, waiting time and the return. A lower figure may cover less." },
    { q: "How do I know the driver is the right one?", a: "Ask how you will recognise the driver or the car, and confirm the meeting point. At an airport, agree it in advance." },
    { q: "Can I ask for the quote in writing?", a: "Yes. A message with the route, date, vehicle and fare is easy to keep, and it makes any later question simpler." },
    { q: "What if my plans change?", a: "Message us as soon as you know. The plan changes with your plans, and anything new, such as an extra stop, is agreed with you first." },
  ],
  takeaways: standardTakeaways("This guide is general. The following are not published here and are agreed with you for each request."),
};
