export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  benefits: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  intro: string[];
  includes: { title: string; text: string }[];
  audience: string[];
  quoteInfo: string[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "freight-cargo-transport",
    icon: "truck",
    title: "Freight & Cargo Transport",
    short:
      "Commercial freight and cargo movement with pickup and delivery coordination, route planning and clear shipment information.",
    benefits: [
      "Pickup and delivery coordination",
      "Route and schedule planning",
      "Support for one-off and repeat shipments",
    ],
    metaTitle: "Freight & Cargo Transport Services",
    metaDescription:
      "Request commercial freight and cargo transportation with pickup and delivery coordination, route planning and a clear quotation from Gulf Elite Transport.",
    h1: "Freight & Cargo Transport Services",
    lead: "Commercial freight and cargo movement, coordinated around your pickup point, delivery point and delivery window.",
    intro: [
      "Moving goods well is mostly a matter of planning. The right vehicle has to be matched to the load, the pickup has to be ready when the driver arrives, and the receiving site has to know what is coming and when. Gulf Elite Transport helps businesses coordinate these details so that freight and cargo movements are arranged clearly from the first enquiry to delivery.",
      "Whether you need a single shipment moved or you manage regular cargo movements for your business, you can describe the requirement and receive a transport assessment and quotation. Availability depends on your locations and dates, so we confirm it with you before any arrangement is agreed.",
    ],
    includes: [
      {
        title: "Commercial cargo transportation",
        text: "Movement of palletised, boxed, bulk or loose commercial goods between a pickup address and a delivery address.",
      },
      {
        title: "Pickup and delivery coordination",
        text: "Agreeing contact people, access instructions, loading arrangements and delivery windows before the vehicle is dispatched.",
      },
      {
        title: "Route and schedule planning",
        text: "Matching the movement to a sensible route and timetable so that cargo arrives when your receiving team is ready for it.",
      },
      {
        title: "Shipment handling information",
        text: "Recording how the cargo should be loaded, secured and unloaded, including fragile, heavy or time-sensitive items.",
      },
      {
        title: "Repeat and scheduled movements",
        text: "Support for businesses that move goods on a regular basis and want a consistent way to request and confirm each job.",
      },
      {
        title: "Quotation before commitment",
        text: "A clear quotation based on the details you provide, so you can compare and decide before confirming.",
      },
    ],
    audience: [
      "Manufacturers and suppliers moving finished goods or materials",
      "Retailers and distributors replenishing stock",
      "Construction and industrial firms transporting materials",
      "Businesses with occasional or seasonal shipping needs",
    ],
    quoteInfo: [
      "Type of cargo and how it is packed",
      "Approximate weight and dimensions",
      "Pickup and delivery locations",
      "Preferred pickup date and delivery window",
      "Loading and unloading access at both ends",
      "Any special handling, fragile or time-sensitive items",
    ],
    faqs: [
      {
        q: "What kinds of cargo can I ask about?",
        a: "You can ask about most commercial cargo, including palletised goods, boxed shipments and bulk loads. Share the cargo type, weight and dimensions so the right vehicle can be assessed. Anything unusual is confirmed individually before a quotation is agreed.",
      },
      {
        q: "How do I get a freight quotation?",
        a: "Send the pickup and delivery locations, cargo details and preferred date using the quote form or by contacting us. We review the information and reply with a quotation or with follow-up questions if something is unclear.",
      },
      {
        q: "Can you handle regular shipments?",
        a: "Recurring freight requirements can be discussed. If your volumes are predictable, ask about contract fleet arrangements as well, which are covered on our contract fleet page.",
      },
      {
        q: "Is availability guaranteed for every route?",
        a: "No. Availability depends on the locations, vehicle type and dates involved. We confirm it with you before any arrangement is made.",
      },
    ],
  },
  {
    slug: "passenger-transport",
    icon: "bus",
    title: "Passenger Transport",
    short:
      "Staff transportation, corporate passenger movement, airport transfers and event transport arranged to a clear schedule.",
    benefits: [
      "Staff and corporate transport",
      "Airport passenger transfers",
      "Event and group transportation",
    ],
    metaTitle: "Passenger Transport & Staff Transportation",
    metaDescription:
      "Arrange corporate passenger transport, staff transportation, airport transfers and event transport with Gulf Elite Transport. Request a quotation today.",
    h1: "Passenger Transport Services",
    lead: "Staff transportation, corporate passenger movement, airport transfers and event transport arranged around your schedule.",
    intro: [
      "People travelling for work or for an event need transport that is simple to arrange and predictable on the day. Gulf Elite Transport helps organisations plan passenger transportation so that groups are collected from the right place at the right time and taken where they need to go.",
      "Passenger requirements vary widely, from a single airport transfer to a recurring staff schedule or a one-day event. Describe your requirement and we will assess it, confirm availability for your locations and send a quotation before anything is agreed.",
    ],
    includes: [
      {
        title: "Staff transportation",
        text: "Regular movement of employees between agreed pickup points and a workplace or site, planned around shift or working hours.",
      },
      {
        title: "Corporate passenger movement",
        text: "Transport for visiting teams, delegations and business guests between hotels, offices, meetings and venues.",
      },
      {
        title: "Airport passenger transfers",
        text: "Pickup and drop-off for passengers travelling to or from an airport, planned using the flight and terminal details you provide.",
      },
      {
        title: "Event transportation",
        text: "Group movement for conferences, hospitality events and other occasions where several people travel at the same time.",
      },
      {
        title: "Scheduled mobility solutions",
        text: "Repeating timetables for organisations that need passenger transport on set days and times.",
      },
      {
        title: "Quotation before commitment",
        text: "A clear quotation based on passenger numbers, route and timing, so you can decide before confirming.",
      },
    ],
    audience: [
      "Companies arranging transport for employees or visiting staff",
      "Hotels, venues and event organisers moving groups of guests",
      "Corporate travel coordinators managing airport transfers",
      "Organisations with a recurring passenger schedule",
    ],
    quoteInfo: [
      "Number of passengers",
      "Pickup and drop-off locations",
      "Date, pickup time and, for airport transfers, flight details",
      "Whether the requirement is one-off or recurring",
      "Luggage or accessibility needs",
      "Any other instructions for the driver",
    ],
    faqs: [
      {
        q: "Do you provide airport transfers?",
        a: "Airport passenger transfers are part of our passenger transport category. Share the airport, terminal, flight details and number of passengers, and we confirm availability for your date before agreeing anything.",
      },
      {
        q: "Can I arrange transport for my employees?",
        a: "Yes, staff transportation can be requested. Tell us the pickup points, destination, working hours and number of people so a suitable arrangement can be assessed.",
      },
      {
        q: "Can I book transport for an event?",
        a: "Event and group transportation can be requested. Include the event date, venue, expected passenger numbers and timing in your enquiry.",
      },
      {
        q: "How do I receive a quotation?",
        a: "Submit the quote form or contact us with your route, date and passenger details. We reply with a quotation or any follow-up questions.",
      },
    ],
  },
  {
    slug: "equipment-machinery-moving",
    icon: "cog",
    title: "Equipment & Machinery Moving",
    short:
      "Relocation and transportation of heavy equipment, industrial machinery and commercial equipment with suitable vehicle coordination.",
    benefits: [
      "Heavy and industrial equipment",
      "Vehicle suitability assessment",
      "Planned loading and unloading",
    ],
    metaTitle: "Heavy Equipment & Machinery Moving Services",
    metaDescription:
      "Plan the transportation of heavy equipment, industrial machinery and commercial equipment with suitable vehicle coordination. Request a quote from Gulf Elite Transport.",
    h1: "Equipment & Machinery Moving Services",
    lead: "Transportation and relocation of heavy equipment, industrial machinery and commercial equipment, planned around the load.",
    intro: [
      "Machinery and equipment cannot be moved like ordinary cargo. Size, weight, balance and access at both ends all affect which vehicle is suitable and how the move should be carried out. Gulf Elite Transport helps businesses plan these movements by gathering the right information first and coordinating a suitable transport arrangement.",
      "If you are relocating a production line, delivering equipment to a project site or moving machinery between facilities, describe what needs to move and where. We assess the requirement, confirm what is possible for your locations and dates, and provide a quotation before the job is agreed.",
    ],
    includes: [
      {
        title: "Heavy equipment transportation",
        text: "Movement of heavy commercial and industrial equipment between sites, yards and facilities.",
      },
      {
        title: "Machinery relocation",
        text: "Planning the relocation of machines from one location to another, including pickup and delivery coordination.",
      },
      {
        title: "Vehicle suitability",
        text: "Matching the equipment's size, weight and loading method to a suitable transport vehicle.",
      },
      {
        title: "Loading and unloading planning",
        text: "Confirming access, ramps, lifting arrangements and on-site contacts at both locations before the move.",
      },
      {
        title: "Industrial equipment movement",
        text: "Transport of equipment used in manufacturing, construction and other industrial operations.",
      },
      {
        title: "Quotation before commitment",
        text: "A clear quotation based on the equipment and route details you provide.",
      },
    ],
    audience: [
      "Manufacturers relocating or installing production equipment",
      "Construction and contracting firms moving plant between sites",
      "Equipment suppliers delivering to customers",
      "Facilities teams reorganising industrial or commercial premises",
    ],
    quoteInfo: [
      "Type of equipment or machinery",
      "Weight and overall dimensions",
      "Pickup and delivery locations",
      "Site access, loading and unloading arrangements",
      "Preferred date and any time restrictions",
      "Photos or specification sheets, if available",
    ],
    faqs: [
      {
        q: "Do you transport heavy machinery?",
        a: "Heavy equipment and machinery moves can be requested. Because every load differs, we assess the weight, dimensions and access details first and confirm what is possible before agreeing to a quotation.",
      },
      {
        q: "What information do you need to plan a machinery move?",
        a: "The equipment type, weight, dimensions, pickup and delivery locations, site access and your preferred date. Photos or specification sheets help speed up the assessment.",
      },
      {
        q: "Can you help with loading and unloading?",
        a: "Loading and unloading arrangements are part of the planning. Tell us what lifting or ramp equipment is available at each site so the move can be coordinated properly.",
      },
      {
        q: "Can I request transportation for commercial equipment?",
        a: "Yes. Commercial and industrial equipment can both be requested through the quote form or by contacting us directly.",
      },
    ],
  },
  {
    slug: "contract-fleet-services",
    icon: "contract",
    title: "Contract Fleet Services",
    short:
      "Dedicated fleet arrangements and monthly vehicle contracts for businesses with recurring transport requirements.",
    benefits: [
      "Recurring transport support",
      "Monthly vehicle arrangements",
      "A consistent point of contact",
    ],
    metaTitle: "Contract Fleet & Monthly Vehicle Services",
    metaDescription:
      "Arrange a dedicated business fleet or monthly vehicle contract for recurring transport needs with Gulf Elite Transport. Request a contract fleet quotation.",
    h1: "Contract Fleet Services",
    lead: "Dedicated fleet arrangements and monthly vehicle contracts for businesses that need transport on a recurring basis.",
    intro: [
      "Businesses that move goods or people every week often find that arranging each job separately takes more time than it should. A contract fleet arrangement lets you agree your requirements once and rely on a consistent transport setup for a defined period.",
      "Gulf Elite Transport can discuss dedicated vehicle arrangements, monthly contracts and recurring schedules with you. The structure depends on your volumes, vehicle needs and locations, so we begin by understanding how your operation works and then provide a quotation for your review.",
    ],
    includes: [
      {
        title: "Dedicated fleet arrangements",
        text: "Vehicles allocated to your business for an agreed purpose, schedule or period.",
      },
      {
        title: "Monthly vehicle contracts",
        text: "Contract-based arrangements that give you predictable access to transport month after month.",
      },
      {
        title: "Recurring transport requirements",
        text: "Support for regular deliveries, staff movements or site-to-site transfers on a repeating schedule.",
      },
      {
        title: "Flexible planning",
        text: "Discussing how the arrangement can adapt as your volumes or schedules change.",
      },
      {
        title: "Business transportation support",
        text: "A consistent point of contact for scheduling, changes and day-to-day coordination.",
      },
      {
        title: "Quotation before commitment",
        text: "A clear proposal based on your requirements, so you can compare options before committing.",
      },
    ],
    audience: [
      "Companies with regular delivery or distribution schedules",
      "Businesses that need dedicated transport for staff or sites",
      "Project teams with multi-week or multi-month transport needs",
      "Organisations looking to simplify repeated transport requests",
    ],
    quoteInfo: [
      "Type of transport required (goods, passengers or equipment)",
      "Vehicle type or capacity needed",
      "Routes, locations and operating days",
      "Expected contract length",
      "Typical daily or weekly volumes",
      "Any special requirements for drivers or vehicles",
    ],
    faqs: [
      {
        q: "Do you provide monthly fleet contracts?",
        a: "Monthly and recurring arrangements can be discussed. Share what you need moved, how often and for how long, and we will assess it and provide a quotation.",
      },
      {
        q: "Can I arrange recurring business transportation?",
        a: "Yes. Recurring goods, passenger or site-to-site transport can be requested. Tell us the schedule and routes so the arrangement can be planned.",
      },
      {
        q: "How is a contract different from one-off bookings?",
        a: "A contract agrees your requirements once for a defined period, so you do not need to arrange each job from scratch. One-off bookings are arranged job by job.",
      },
      {
        q: "How do I request a contract fleet quotation?",
        a: "Use the quote form on this page or contact us with your requirements. We will review the details and respond with a proposal or follow-up questions.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
