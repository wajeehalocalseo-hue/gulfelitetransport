import type { Faq } from "./services";

/**
 * Level 2 (sub-service) and Level 3 (micro-service) records that have full page content.
 * Every record here is VERIFIED against the business information the owner supplied
 * (commercial freight and cargo, staff / corporate / airport / event passenger transport,
 * heavy equipment and machinery relocation, dedicated fleet and monthly vehicle contracts,
 * scheduled and recurring transport). Unverified ideas live in ./proposals.ts and have no page.
 */
export type PageContent = {
  h1: string;
  lead: string;
  /** Direct definition shown first (answer-first). */
  directAnswer: string;
  differs: { heading: string; text: string };
  overview: string[];
  includes: { title: string; text: string }[];
  audience: string[];
  applications: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  considerations: { title: string; text: string }[];
  quoteInfo: string[];
  faqs: Faq[];
};

/**
 * Visual layout of a page, so pages do not all look the same. Defaults to split / cards / aside.
 *  hero: split (image beside text), banner (light, with a facts card), facts (dark, with a facts strip),
 *        route (pickup to delivery route line), centered (centred title on a soft gradient, facts as pills)
 *        overlay (full-width photo behind the title), ledger (light, accent rail with a numbered facts list)
 *  body: how the long sections are shown - cards, timeline, table, checklist, accordion (collapsible items)
 *        or columns (title on the left, text on the right, ruled rows)
 *  form: aside (sticky beside content), bottom (full-width at the end), hero (quick form in the hero + full form at the end)
 */
export type Layout = {
  hero: "split" | "banner" | "facts" | "route" | "centered" | "overlay" | "ledger";
  body: "cards" | "timeline" | "table" | "checklist" | "accordion" | "columns";
  form: "aside" | "bottom" | "hero";
};

export type ChildRecord = {
  id: string;
  slug: string;
  /** Id of the parent node (a Level 1 slug for sub-services, a sub-service id for micro-services). */
  parentId: string;
  level: 2 | 3;
  name: string;
  icon: string;
  featured: boolean;
  order: number;
  short: string;
  audienceShort: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  semanticKeywords: string[];
  searchIntent: string;
  /** Sibling or related node ids. */
  related: string[];
  /** Other Level 1 service ids that are genuinely related. */
  relatedMain: string[];
  /** ISO date the page was first published. */
  publishedAt?: string;
  layout?: Layout;
  content: PageContent;
};

export const subServices: ChildRecord[] = [
  /* ------------------------------------------------------------------ FREIGHT */
  {
    id: "commercial-cargo-transportation",
    slug: "commercial-cargo-transportation",
    parentId: "freight-cargo-transport",
    level: 2,
    name: "Commercial Cargo Transportation",
    icon: "truck",
    featured: true,
    order: 1,
    short: "Road transport for commercial goods between business locations, with pickup, delivery and timing coordinated.",
    audienceShort: "Suppliers, manufacturers, retailers and traders",
    seoTitle: "Commercial Cargo Transportation for Businesses",
    metaDescription:
      "Arrange commercial cargo transportation between business locations with pickup and delivery coordination. Gulf Elite Transport quotes before you commit.",
    primaryKeyword: "commercial cargo transportation",
    secondaryKeywords: ["business cargo transport", "commercial goods transportation", "cargo pickup and delivery"],
    semanticKeywords: ["pickup window", "delivery window", "palletised goods", "shipment details", "consignee", "loading access"],
    searchIntent: "Commercial: a business needs goods moved between two locations and wants a quotation.",
    related: ["scheduled-cargo-transportation", "dedicated-fleet-services"],
    relatedMain: ["commercial-distribution-services", "last-mile-delivery"],
    content: {
      h1: "Commercial Cargo Transportation",
      lead: "Road transport for commercial goods moving between business locations, planned around the cargo, the two sites and the delivery window.",
      directAnswer:
        "Commercial cargo transportation is the road movement of goods that a business ships for commercial purposes, such as stock, materials, finished products or supplies, from a pickup location to a delivery location. Gulf Elite Transport coordinates the vehicle, the pickup and delivery arrangements and the timing, and provides a quotation before the job is agreed.",
      differs: {
        heading: "How commercial cargo transportation differs from related services",
        text: "The Freight & Cargo Transport page introduces every freight service. This page is about one specific need: moving a business's goods from one place to another as a job. If the same movement repeats on set days, see Scheduled Cargo Transportation. If you want vehicles allocated to your business for a period, see Dedicated Fleet Services. If the load is heavy machinery, see Heavy Equipment Transportation.",
      },
      overview: [
        "Most businesses move goods at some point: stock from a supplier to a shop, materials to a work site, products from a workshop to a customer. What makes a movement commercial is that someone is waiting for the goods and the timing matters. A good arrangement therefore starts from the receiving end: when must the cargo arrive, who will accept it and how will it be unloaded?",
        "Gulf Elite Transport helps you plan that movement. You describe the cargo, the pickup and the delivery, and we match a suitable vehicle, confirm contact people and access at both ends, and provide a quotation. Availability depends on your locations and dates and is confirmed before anything is agreed.",
      ],
      includes: [
        { title: "Pickup coordination", text: "Agreeing the pickup time, the loading point and the person who will release the cargo." },
        { title: "Delivery coordination", text: "Confirming the delivery address, receiving contact and unloading arrangements." },
        { title: "Vehicle matching", text: "Choosing a vehicle that suits the weight, volume and packing of the cargo." },
        { title: "Handling information", text: "Recording how the cargo should be loaded and secured, including fragile or time-sensitive items." },
        { title: "Quotation before commitment", text: "A clear quotation based on the details you provide." },
      ],
      audience: [
        "Suppliers and manufacturers sending goods to customers",
        "Retailers and traders receiving stock",
        "Contractors needing materials delivered to a site",
        "Businesses with an occasional shipment that does not justify a standing arrangement",
      ],
      applications: [
        { title: "Supplier to business", text: "Goods collected from a supplier's premises and delivered to the buyer." },
        { title: "Stock to shop", text: "Products moved from a store room or depot to a retail location." },
        { title: "Materials to site", text: "Materials delivered within a window the site team can receive them." },
        { title: "Customer delivery", text: "Finished goods taken from a workshop or factory to a customer." },
      ],
      steps: [
        { title: "Describe the cargo", text: "Share what is moving, how it is packed, its weight and size." },
        { title: "Give both addresses", text: "Provide pickup and delivery locations with access details." },
        { title: "Receive the quotation", text: "We confirm availability and send a quotation or follow-up questions." },
        { title: "Move the cargo", text: "After you accept, pickup and delivery proceed as agreed." },
      ],
      considerations: [
        { title: "Packing", text: "Cargo that is palletised or boxed is quicker to load and safer in transit." },
        { title: "Weight and volume", text: "Both decide the vehicle. Bulky light goods and compact heavy goods need different planning." },
        { title: "Access", text: "Gates, docks and parking at either end affect which vehicle can reach the site." },
        { title: "Timing", text: "A delivery window agreed in advance reduces waiting for the driver and the receiving team." },
      ],
      quoteInfo: [
        "Type of cargo and how it is packed",
        "Approximate weight and dimensions",
        "Pickup and delivery addresses",
        "Preferred date and delivery window",
        "Loading and unloading access at both sites",
        "Contact person at each site",
      ],
      faqs: [
        { q: "What counts as commercial cargo?", a: "Goods shipped for a business purpose, such as stock, materials, components, supplies or finished products. Personal household moves are a different requirement." },
        { q: "Do I need to be a regular customer?", a: "No. A single commercial shipment can be requested. If the movement repeats, ask about scheduled cargo transportation." },
        { q: "How is the vehicle chosen?", a: "By the weight, volume and packing of the cargo and the access at both sites. We confirm the vehicle when we assess your request." },
        { q: "Can you collect from several locations?", a: "Multi-stop requests can be raised. Include every address and the order you need, and we confirm what is possible." },
        { q: "How do I get a quotation?", a: "Send the cargo details, both addresses and your preferred date through the quote form. We reply with a quotation or any questions." },
      ],
    },
  },
  {
    id: "scheduled-cargo-transportation",
    slug: "scheduled-cargo-transportation",
    parentId: "freight-cargo-transport",
    level: 2,
    name: "Scheduled Cargo Transportation",
    icon: "calendar",
    featured: false,
    order: 2,
    short: "Cargo movements that repeat on set days and routes, planned once and requested without starting from scratch.",
    audienceShort: "Businesses moving the same cargo on a regular basis",
    seoTitle: "Scheduled Cargo Transportation and Regular Routes",
    metaDescription:
      "Plan scheduled cargo transportation for regular business deliveries on set days and routes. Request a quotation from Gulf Elite Transport.",
    primaryKeyword: "scheduled cargo transportation",
    secondaryKeywords: ["regular business deliveries", "recurring cargo routes", "repeat freight movements"],
    semanticKeywords: ["weekly deliveries", "set routes", "standing schedule", "repeat shipments", "delivery days"],
    searchIntent: "Commercial: a business moves the same cargo repeatedly and wants a planned schedule.",
    related: ["commercial-cargo-transportation", "monthly-vehicle-contracts"],
    relatedMain: ["contract-fleet-services", "commercial-distribution-services"],
    content: {
      h1: "Scheduled Cargo Transportation",
      lead: "Cargo movements planned to repeat on set days and routes, so that regular deliveries do not have to be arranged from scratch each time.",
      directAnswer:
        "Scheduled cargo transportation is the planned, repeated road movement of cargo on agreed days and routes, such as weekly deliveries between two business locations. Gulf Elite Transport helps you define the schedule, confirm availability and provide a quotation for the recurring movement.",
      differs: {
        heading: "How scheduled cargo transportation differs from related services",
        text: "A one-off job is covered by Commercial Cargo Transportation. Scheduled cargo transportation applies when the same movement repeats and you want it planned once. If you also want vehicles allocated to your business, Dedicated Fleet Services and Monthly Vehicle Contracts cover that, and Commercial Distribution Services applies when one supply point serves several destinations.",
      },
      overview: [
        "Repeated movements behave differently from one-off jobs. The questions are no longer only what and where, but also how often, on which days and what happens when a week is busier than usual. Planning those points once makes every later delivery simpler for both sides.",
        "Gulf Elite Transport can discuss a recurring cargo schedule with you: the route, the days and times, typical volumes and how changes will be communicated. Availability for the schedule depends on your locations and is confirmed, and you receive a quotation before committing.",
      ],
      includes: [
        { title: "Schedule definition", text: "Agreeing the days, times and frequency of the movement." },
        { title: "Route planning", text: "Settling the pickup and delivery points and the route between them." },
        { title: "Volume planning", text: "Discussing typical and peak loads so the vehicle fits." },
        { title: "Change handling", text: "Agreeing how added, skipped or rescheduled runs are communicated." },
        { title: "Quotation before commitment", text: "A clear quotation for the recurring arrangement." },
      ],
      audience: [
        "Manufacturers supplying the same customers weekly",
        "Businesses moving stock between two sites on set days",
        "Suppliers with a standing delivery pattern",
        "Teams that want to stop re-booking the same job",
      ],
      applications: [
        { title: "Weekly supply run", text: "Cargo moved to the same destination on the same day each week." },
        { title: "Site-to-site transfer", text: "Regular transfers between a factory and a depot." },
        { title: "Month-end movements", text: "Predictable movements that follow a business calendar." },
        { title: "Seasonal pattern", text: "A schedule that runs only during a busy period." },
      ],
      steps: [
        { title: "Describe the pattern", text: "Share the route, days, times and typical volumes." },
        { title: "Assess the schedule", text: "We check whether the recurring movement can be supported." },
        { title: "Agree the plan", text: "After the quotation, the schedule and contacts are confirmed." },
        { title: "Run and adjust", text: "Movements proceed on schedule, with changes handled as agreed." },
      ],
      considerations: [
        { title: "Fixed versus flexible", text: "Decide which days are fixed and which can move." },
        { title: "Peak loads", text: "Tell us about busy weeks so capacity is discussed in advance." },
        { title: "Receiving hours", text: "The destination's receiving hours decide realistic delivery times." },
        { title: "Review point", text: "Agree when the arrangement is reviewed as your volumes change." },
      ],
      quoteInfo: [
        "Pickup and delivery locations",
        "Days and times of the movement",
        "Type of cargo and typical volumes",
        "Expected length of the arrangement",
        "Receiving hours at the destination",
        "How changes should be communicated",
      ],
      faqs: [
        { q: "What is scheduled cargo transportation?", a: "It is cargo movement planned to repeat on agreed days and routes, so you request the arrangement once instead of every time." },
        { q: "Is it the same as a contract?", a: "No. Scheduled cargo describes a repeating movement. A contract fleet arrangement allocates vehicles to your business for a period. They can be combined." },
        { q: "Can the schedule change?", a: "Yes. Tell us which parts are fixed and how changes should be communicated, and we plan for them." },
        { q: "How do I start?", a: "Send the route, the days and times and typical volumes through the quote form, and we respond with a quotation or questions." },
        { q: "Is every route available?", a: "No. Availability depends on the locations and timing, and we confirm it before any arrangement." },
      ],
    },
  },

  /* ---------------------------------------------------------------- PASSENGER */
  {
    id: "corporate-passenger-transport",
    slug: "corporate-passenger-transport",
    parentId: "passenger-transport",
    level: 2,
    name: "Corporate Passenger Transport",
    icon: "briefcase",
    featured: true,
    order: 1,
    short: "Transport for visiting teams, delegations and business guests between hotels, offices, meetings and venues.",
    audienceShort: "Companies, travel coordinators and executive assistants",
    seoTitle: "Corporate Passenger Transport for Business Travel",
    metaDescription:
      "Arrange corporate passenger transport for visiting teams, delegations and business guests. Request a quotation from Gulf Elite Transport.",
    primaryKeyword: "corporate passenger transport",
    secondaryKeywords: ["business guest transportation", "delegation transport", "corporate travel transport"],
    semanticKeywords: ["visiting team", "hotel to office", "meeting transfers", "itinerary", "group size", "pickup schedule"],
    searchIntent: "Commercial: a company needs transport for guests or staff on business trips.",
    related: ["airport-transfers", "event-passenger-transport", "staff-transportation"],
    relatedMain: [],
    content: {
      h1: "Corporate Passenger Transport",
      lead: "Planned transport for visiting teams, delegations and business guests, built around an itinerary rather than a single trip.",
      directAnswer:
        "Corporate passenger transport is the organised movement of business travellers, such as visiting teams, delegations and guests, between places like hotels, offices, meeting venues and airports. Gulf Elite Transport plans it around the number of passengers, the itinerary and the timing, and provides a quotation before you commit.",
      differs: {
        heading: "How corporate passenger transport differs from related services",
        text: "Corporate passenger transport follows a visitor's itinerary across several stops. Airport Transfers covers a single airport pickup or drop-off. Staff Transportation moves your own employees on a regular timetable. Event Passenger Transport moves large groups to one venue at one time.",
      },
      overview: [
        "A business trip is judged by how little the traveller has to think about transport. A visiting team that is collected on time, taken to the right place and returned without delay can focus on the purpose of the visit. Corporate transport is therefore about reliability across a day, not only a single ride.",
        "Gulf Elite Transport helps coordinators plan this. You share the number of passengers, the stops and the times; we assess the requirement, confirm availability for your dates and provide a quotation. Passenger comfort and punctuality are central to the plan.",
      ],
      includes: [
        { title: "Itinerary-based planning", text: "Transport arranged around a schedule of stops rather than one trip." },
        { title: "Guest and delegation transfers", text: "Movement for visiting teams between hotel, office and venue." },
        { title: "Pickup scheduling", text: "Clear pickup times and meeting points for the group." },
        { title: "Luggage and equipment space", text: "Planning for bags and presentation materials." },
        { title: "Quotation before commitment", text: "A clear quotation for the itinerary you describe." },
      ],
      audience: [
        "Companies hosting visiting colleagues or clients",
        "Executive assistants and travel coordinators",
        "Project teams travelling between sites",
        "Organisations receiving delegations",
      ],
      applications: [
        { title: "Client visit", text: "Collection from a hotel, meetings across the day and return." },
        { title: "Delegation programme", text: "A multi-day schedule with fixed pickup times." },
        { title: "Site visit", text: "Transport between an office and a work site." },
        { title: "Training or workshop", text: "Group movement to and from a training venue." },
      ],
      steps: [
        { title: "Share the itinerary", text: "Give the passenger numbers, stops and times." },
        { title: "Confirm requirements", text: "Tell us about luggage and any accessibility needs." },
        { title: "Receive the quotation", text: "We confirm availability and send a quotation." },
        { title: "Travel as planned", text: "Passengers are collected and delivered per the plan." },
      ],
      considerations: [
        { title: "Passenger count", text: "The number of travellers decides vehicle capacity." },
        { title: "Itinerary changes", text: "Meetings overrun. Agree in advance how timing changes are communicated." },
        { title: "Contact person", text: "A single contact for the group simplifies coordination." },
        { title: "Accessibility", text: "Share any needs early so they can be accounted for." },
      ],
      quoteInfo: [
        "Number of passengers",
        "Dates and times of each transfer",
        "Pickup and drop-off points",
        "Luggage or equipment to carry",
        "Accessibility needs",
        "Contact person for the group",
      ],
      faqs: [
        { q: "What is corporate passenger transport?", a: "Organised transport for business travellers, such as visiting teams and delegations, between hotels, offices, venues and airports." },
        { q: "Can I book for several days?", a: "Yes. Share the full itinerary and we plan the days together." },
        { q: "How is it different from an airport transfer?", a: "An airport transfer is one pickup or drop-off. Corporate transport covers the stops across an itinerary." },
        { q: "Can you adjust times on the day?", a: "Changes are communicated to the contact person. Availability for last-minute changes is confirmed individually." },
        { q: "How do I get a quotation?", a: "Send the passenger numbers, dates and stops through the quote form." },
      ],
    },
  },
  {
    id: "staff-transportation",
    slug: "staff-transportation",
    parentId: "passenger-transport",
    level: 2,
    name: "Staff Transportation",
    icon: "users",
    featured: true,
    order: 2,
    short: "Regular transport that brings employees to and from a workplace on an agreed timetable.",
    audienceShort: "Employers, HR teams and site managers",
    seoTitle: "Staff Transportation Services for Employers",
    metaDescription:
      "Arrange staff transportation for employees on a regular timetable. Share pickup points, shifts and numbers to receive a quotation from Gulf Elite Transport.",
    primaryKeyword: "staff transportation services",
    secondaryKeywords: ["employee transport", "employee shuttle", "workforce transportation"],
    semanticKeywords: ["shift times", "pickup points", "timetable", "workplace transport", "employee commute", "inter-office shuttle"],
    searchIntent: "Commercial: an employer wants regular transport for employees.",
    related: ["corporate-passenger-transport", "monthly-vehicle-contracts", "dedicated-fleet-services"],
    relatedMain: ["contract-fleet-services"],
    content: {
      h1: "Staff Transportation Services",
      lead: "Regular transport that brings your employees to and from the workplace on a timetable that follows their shifts.",
      directAnswer:
        "Staff transportation is the regular movement of employees between agreed pickup points and a workplace or site, planned around shift or working hours. Gulf Elite Transport assesses the pickup points, timings and headcount, confirms availability and provides a quotation before you commit.",
      differs: {
        heading: "How staff transportation differs from related services",
        text: "Staff transportation serves your own employees on a repeating timetable. Corporate Passenger Transport serves visitors on an itinerary. For an ongoing arrangement with vehicles allocated to you, see Monthly Vehicle Contracts and Dedicated Fleet Services. Employee shuttles and inter-office runs are covered here as forms of staff transportation.",
      },
      overview: [
        "Getting people to work on time depends on pickup points that make sense, a timetable that follows shift patterns and a vehicle that fits the group. When those three line up, staff transport becomes a dependable part of the working day.",
        "Gulf Elite Transport helps employers design that arrangement. You describe where employees will be collected, where they are going and when; we assess the requirement, confirm availability and provide a quotation. Staff transport is usually a recurring need, so we can also discuss a monthly or dedicated arrangement.",
      ],
      includes: [
        { title: "Timetable planning", text: "Pickup and return times that follow shift patterns." },
        { title: "Pickup point planning", text: "Choosing collection points that suit where staff live or gather." },
        { title: "Employee shuttle runs", text: "A fixed route between a hub and a workplace." },
        { title: "Inter-office movement", text: "Regular transfers of staff between company sites." },
        { title: "Quotation before commitment", text: "A clear quotation for the recurring arrangement." },
      ],
      audience: [
        "Employers whose site is hard to reach by public transport",
        "HR and administration teams managing commutes",
        "Contractors moving workers between accommodation and site",
        "Companies with several offices that rotate staff",
      ],
      applications: [
        { title: "Shift transport", text: "Pickups timed to the start and end of shifts." },
        { title: "Site commute", text: "Daily transport from a gathering point to a work site." },
        { title: "Office shuttle", text: "A regular run between two company locations." },
        { title: "Temporary project", text: "Staff transport for the length of a project." },
      ],
      steps: [
        { title: "Share the headcount and shifts", text: "Tell us how many staff, which days and what times." },
        { title: "Map the pickup points", text: "List where staff will be collected and the destination." },
        { title: "Receive the proposal", text: "We confirm availability and send a quotation." },
        { title: "Start and review", text: "The timetable begins and is reviewed as needs change." },
      ],
      considerations: [
        { title: "Headcount changes", text: "Numbers vary. Discuss how the vehicle size is reviewed." },
        { title: "Shift changes", text: "Agree how a change in shift times is communicated." },
        { title: "Pickup discipline", text: "Fixed pickup points and times keep the timetable on schedule." },
        { title: "Contract length", text: "Recurring staff transport is often easier to plan under a monthly arrangement." },
      ],
      quoteInfo: [
        "Number of employees",
        "Pickup points and destination",
        "Days of operation and shift times",
        "Expected duration of the arrangement",
        "Any accessibility needs",
        "Contact person for the employer",
      ],
      faqs: [
        { q: "What is staff transportation?", a: "Regular transport that moves employees between agreed pickup points and a workplace on a timetable." },
        { q: "Can it follow shift patterns?", a: "Yes. Share the shift times and the timetable can be planned around them." },
        { q: "Do you cover shuttles between offices?", a: "Inter-office and shuttle runs are requested as staff transportation. Include both locations and times." },
        { q: "Is a monthly arrangement possible?", a: "Recurring staff transport can be discussed under monthly vehicle contracts." },
        { q: "What do you need to quote?", a: "The headcount, pickup points, destination, days and shift times." },
      ],
    },
  },
  {
    id: "airport-transfers",
    slug: "airport-transfers",
    parentId: "passenger-transport",
    level: 2,
    name: "Airport Transfers",
    icon: "plane",
    featured: true,
    order: 3,
    short: "Pickup and drop-off for passengers travelling to or from an airport, planned around flight details.",
    audienceShort: "Travellers, hotels, companies and travel coordinators",
    seoTitle: "Airport Passenger Transfers: Pickup and Drop-off",
    metaDescription:
      "Book airport passenger transfers planned around your flight details and luggage. Request a quotation from Gulf Elite Transport before you commit.",
    primaryKeyword: "airport passenger transfers",
    secondaryKeywords: ["airport pickup and drop-off", "airport transfer booking", "airport transport for business travellers"],
    semanticKeywords: ["flight number", "terminal", "arrival time", "luggage", "meet and greet", "departure time"],
    searchIntent: "Transactional: a traveller or coordinator wants a transfer to or from an airport.",
    related: ["corporate-passenger-transport", "event-passenger-transport"],
    relatedMain: [],
    content: {
      h1: "Airport Passenger Transfers",
      lead: "Pickup and drop-off for passengers travelling to or from an airport, planned around the flight rather than a guess.",
      directAnswer:
        "An airport transfer is a pre-arranged ride that takes passengers from a pickup point to an airport, or from an airport to their destination. Gulf Elite Transport plans transfers using the airport, terminal, flight details, passenger numbers and luggage you provide, and confirms availability and a quotation before you commit.",
      differs: {
        heading: "How airport transfers differ from related services",
        text: "An airport transfer is a single pickup or drop-off tied to a flight. Corporate Passenger Transport covers a visitor's itinerary across several stops. Event Passenger Transport moves a large group to one venue. If you need airport runs for staff on a repeating basis, mention it, as that may suit a recurring arrangement.",
      },
      overview: [
        "Airport journeys are unusual because the deadline is set by someone else. A departure time or a flight arrival decides when the vehicle must be there, and a delay or an early landing changes the plan. That is why a transfer is planned from the flight details backwards.",
        "Gulf Elite Transport asks for the airport, terminal, flight number, passenger count and luggage, then assesses the request and confirms availability for the date. A quotation is provided before anything is agreed.",
      ],
      includes: [
        { title: "Arrival pickups", text: "Collection timed to a flight's arrival, using the details you provide." },
        { title: "Departure drop-offs", text: "Pickup timed to reach the airport with time to spare." },
        { title: "Luggage planning", text: "Space for bags matched to the vehicle." },
        { title: "Group transfers", text: "Several passengers travelling together." },
        { title: "Quotation before commitment", text: "A clear quotation for the transfer." },
      ],
      audience: [
        "Business travellers and visiting guests",
        "Hotels arranging guest transport",
        "Companies and travel coordinators",
        "Groups arriving or departing together",
      ],
      applications: [
        { title: "Arriving guest", text: "A visitor collected from the terminal and taken to a hotel or office." },
        { title: "Early departure", text: "Pickup timed for a morning flight." },
        { title: "Team arrival", text: "A group landing together." },
        { title: "Return trip", text: "A transfer there and another back, planned together." },
      ],
      steps: [
        { title: "Share flight details", text: "Provide the airport, terminal, flight number and date." },
        { title: "Add passengers and luggage", text: "Tell us the group size and bags." },
        { title: "Receive the quotation", text: "We confirm availability and send a quotation." },
        { title: "Travel", text: "Pickup or drop-off proceeds as planned." },
      ],
      considerations: [
        { title: "Flight changes", text: "Agree how delays or changes to the flight are communicated." },
        { title: "Terminal and meeting point", text: "A clear meeting point saves time on arrival." },
        { title: "Luggage volume", text: "Large bags or equipment may need a bigger vehicle." },
        { title: "Early or late hours", text: "Tell us if the flight is outside normal hours." },
      ],
      quoteInfo: [
        "Airport and terminal",
        "Flight number, date and time",
        "Pickup or drop-off address",
        "Number of passengers",
        "Luggage details",
        "Contact phone number",
      ],
      faqs: [
        { q: "What is an airport transfer?", a: "A pre-arranged ride between a location and an airport, planned around the passenger's flight." },
        { q: "What flight details are needed?", a: "The airport, terminal, flight number, date and time, so the pickup can be planned around the actual schedule." },
        { q: "What if the flight is delayed?", a: "Tell us how you wish to be contacted. How delays are handled is agreed when the transfer is arranged." },
        { q: "Can I book a return transfer?", a: "Yes. Include both journeys and we plan them together." },
        { q: "Is every airport covered?", a: "Availability depends on the airport and date, and is confirmed before any arrangement." },
      ],
    },
  },
  {
    id: "event-passenger-transport",
    slug: "event-passenger-transport",
    parentId: "passenger-transport",
    level: 2,
    name: "Event Passenger Transport",
    icon: "calendar",
    featured: false,
    order: 4,
    short: "Group movement to and from conferences, hospitality events and occasions where many people travel together.",
    audienceShort: "Event organisers, hotels and conference teams",
    seoTitle: "Event Passenger Transport for Groups and Conferences",
    metaDescription:
      "Plan event passenger transport for conferences, functions and groups. Share the venue, times and numbers to get a quotation from Gulf Elite Transport.",
    primaryKeyword: "event passenger transport",
    secondaryKeywords: ["conference transportation", "group passenger transportation", "event shuttle"],
    semanticKeywords: ["venue", "arrival window", "group size", "shuttle loop", "guest list", "return times"],
    searchIntent: "Commercial: an organiser needs to move a group to and from an event.",
    related: ["corporate-passenger-transport", "airport-transfers"],
    relatedMain: [],
    content: {
      h1: "Event Passenger Transport",
      lead: "Group transport for conferences, functions and hospitality events, planned so that people arrive together and leave on time.",
      directAnswer:
        "Event passenger transport is the movement of groups of people to and from an event venue, such as a conference, wedding or corporate function. Gulf Elite Transport plans it around the guest numbers, the venue and the event timings, confirms availability and provides a quotation before you commit.",
      differs: {
        heading: "How event passenger transport differs from related services",
        text: "Event transport is about many people reaching one venue within a window. Corporate Passenger Transport follows individual itineraries. Airport Transfers is tied to flights. Conference and group transportation are handled here as forms of event passenger transport rather than separate services.",
      },
      overview: [
        "Events compress arrivals into a short window, and the pressure is on both ends: guests must arrive before the start and leave soon after the finish. Transport that works for an event is planned around those peaks, not an average hour.",
        "Gulf Elite Transport helps organisers plan this. You share the venue, the event times and the expected numbers; we assess the requirement, confirm availability for the date and provide a quotation. Details such as pickup points and return timings are agreed before the event.",
      ],
      includes: [
        { title: "Arrival and departure planning", text: "Transport timed to the start and end of the event." },
        { title: "Group pickups", text: "Collection from one or several points." },
        { title: "Shuttle loops", text: "Repeated runs between a hotel and a venue." },
        { title: "Return arrangements", text: "Agreed times for guests leaving." },
        { title: "Quotation before commitment", text: "A clear quotation for the event." },
      ],
      audience: [
        "Event and conference organisers",
        "Hotels hosting functions",
        "Companies running corporate occasions",
        "Wedding and private-function planners",
      ],
      applications: [
        { title: "Conference shuttle", text: "Guests moved between a hotel and the conference centre." },
        { title: "Corporate function", text: "A group collected and returned after an evening event." },
        { title: "Hospitality event", text: "Transport arranged for a hotel's guests." },
        { title: "Multi-venue day", text: "Movement between more than one location." },
      ],
      steps: [
        { title: "Share event details", text: "Venue, date, start and end times." },
        { title: "Estimate numbers", text: "Give expected guest numbers and pickup points." },
        { title: "Receive the quotation", text: "We confirm availability and send a quotation." },
        { title: "Run the plan", text: "Transport runs to the agreed schedule." },
      ],
      considerations: [
        { title: "Peak arrival window", text: "Most guests arrive together. Plan capacity for that peak." },
        { title: "Return timing", text: "Agree whether return runs are fixed or on demand." },
        { title: "Guest numbers", text: "Final numbers often change. Share a range." },
        { title: "Venue access", text: "Check where vehicles can stop near the entrance." },
      ],
      quoteInfo: [
        "Event name, venue and date",
        "Start and end times",
        "Expected number of guests",
        "Pickup points",
        "Return requirements",
        "Contact person for the event",
      ],
      faqs: [
        { q: "What is event passenger transport?", a: "Group transport to and from an event, planned around the venue and the event times." },
        { q: "Do you cover conferences?", a: "Conference transportation is requested as event passenger transport. Share the venue, dates and numbers." },
        { q: "Can numbers change?", a: "Yes. Give a range and tell us how final numbers will be confirmed." },
        { q: "Can you run a shuttle all day?", a: "Shuttle loops can be requested. Include the stops and times, and availability is confirmed." },
        { q: "How do I get a quotation?", a: "Send the event details and expected numbers through the quote form." },
      ],
    },
  },

  /* ---------------------------------------------------------------- EQUIPMENT */
  {
    id: "heavy-equipment-transportation",
    slug: "heavy-equipment-transportation",
    parentId: "equipment-machinery-moving",
    level: 2,
    name: "Heavy Equipment Transportation",
    icon: "cog",
    featured: true,
    order: 1,
    short: "Transport of heavy commercial and industrial equipment between sites, planned around weight, size and access.",
    audienceShort: "Contractors, equipment suppliers and plant operators",
    seoTitle: "Heavy Equipment Transportation Between Sites",
    metaDescription:
      "Plan heavy equipment transportation with vehicle suitability and loading arrangements assessed first. Request a quotation from Gulf Elite Transport.",
    primaryKeyword: "heavy equipment transportation",
    secondaryKeywords: ["heavy equipment moving", "plant transportation", "equipment delivery to site"],
    semanticKeywords: ["weight", "dimensions", "loading ramp", "site access", "tie-down", "vehicle suitability"],
    searchIntent: "Commercial: a business needs a heavy machine moved between locations.",
    related: ["industrial-machinery-relocation"],
    relatedMain: ["industrial-project-logistics", "container-transportation"],
    content: {
      h1: "Heavy Equipment Transportation",
      lead: "Transport of heavy commercial and industrial equipment between yards, sites and facilities, planned around the machine and the access at both ends.",
      directAnswer:
        "Heavy equipment transportation is the movement of large, heavy machines and plant between locations, such as from a yard to a work site. Gulf Elite Transport collects the equipment's weight, dimensions and the site access details first, assesses vehicle suitability and loading, and provides a quotation before the move is agreed.",
      differs: {
        heading: "How heavy equipment transportation differs from related services",
        text: "Heavy Equipment Transportation is about moving a machine from one place to another. Industrial Machinery Relocation applies when equipment is being moved as part of a facility change, with several items and sequencing. Industrial & Project Logistics covers phased deliveries across a whole project. Oversized loads are assessed individually.",
      },
      overview: [
        "A heavy machine is only as movable as the route and the sites allow. Weight decides the vehicle, dimensions decide the route, and ground conditions and ramps decide whether the machine can be loaded at all. These are the reasons heavy moves are planned before they are priced.",
        "Gulf Elite Transport asks for the specification and the access details at both sites, assesses vehicle suitability and loading and confirms what is possible for your dates. Loading and unloading arrangements are agreed before the day, and a quotation is provided before you commit.",
      ],
      includes: [
        { title: "Vehicle suitability assessment", text: "Matching the machine's weight and size to a suitable transport vehicle." },
        { title: "Loading and unloading coordination", text: "Agreeing ramps, lifting and a safe working area at each site." },
        { title: "Route and access checks", text: "Considering entrances, ground and overhead clearances." },
        { title: "Securing information", text: "Using manufacturer guidance on how the machine should be secured." },
        { title: "Quotation before commitment", text: "A clear quotation based on the specification." },
      ],
      audience: [
        "Construction and contracting firms moving plant",
        "Equipment suppliers delivering to customers",
        "Plant operators relocating machines",
        "Facilities teams with heavy commercial equipment",
      ],
      applications: [
        { title: "Yard to site", text: "A machine delivered to a project location." },
        { title: "Site to site", text: "Plant moved when a project phase ends." },
        { title: "Supplier delivery", text: "A purchased machine delivered to the buyer." },
        { title: "Return to yard", text: "Equipment collected at the end of a job." },
      ],
      steps: [
        { title: "Send the specification", text: "Type, weight, dimensions and photographs." },
        { title: "Describe both sites", text: "Access, ground, ramps and lifting arrangements." },
        { title: "Receive the assessment", text: "We confirm suitability and send a quotation." },
        { title: "Load, move, unload", text: "The move proceeds to the agreed plan." },
      ],
      considerations: [
        { title: "Accurate weight", text: "Use the machine's actual operating weight, including attachments." },
        { title: "Ground conditions", text: "Soft or sloping ground can stop a vehicle reaching the machine." },
        { title: "Clearances", text: "Overhead and width restrictions can change the route." },
        { title: "Attachments", text: "State whether buckets or attachments travel with the machine." },
      ],
      quoteInfo: [
        "Machine type, make and model",
        "Operating weight and overall dimensions",
        "Pickup and delivery locations",
        "Site access and loading arrangements",
        "Preferred date and time limits",
        "Photographs or specification sheet",
      ],
      faqs: [
        { q: "What is heavy equipment transportation?", a: "The movement of large, heavy machines and plant between locations, planned around the machine's weight, size and the access at both ends." },
        { q: "What information do you need?", a: "The machine's type, weight and dimensions, both addresses, site access and your preferred date. Photographs help." },
        { q: "Can you load and unload on site?", a: "Loading and unloading are part of the planning. Tell us what ramps or lifting equipment the sites have." },
        { q: "Do you handle oversized loads?", a: "Oversized requirements are assessed individually, and we do not assume them from this page." },
        { q: "Can several machines move together?", a: "Multi-item moves can be requested. List each machine with its weight and dimensions." },
      ],
    },
  },
  {
    id: "industrial-machinery-relocation",
    slug: "industrial-machinery-relocation",
    parentId: "equipment-machinery-moving",
    level: 2,
    name: "Industrial Machinery Relocation",
    icon: "factory",
    featured: true,
    order: 2,
    short: "Relocating production machinery and workshop equipment as part of a facility move, in a planned sequence.",
    audienceShort: "Manufacturers, workshops and facilities teams",
    seoTitle: "Industrial Machinery Relocation and Factory Moves",
    metaDescription:
      "Plan industrial machinery relocation for factory, workshop and plant moves with sequencing and loading coordination. Quote from Gulf Elite Transport.",
    primaryKeyword: "industrial machinery relocation",
    secondaryKeywords: ["factory machinery relocation", "manufacturing equipment moving", "plant equipment moving"],
    semanticKeywords: ["production line", "sequence of moves", "decommissioning", "re-installation", "workshop", "facility move"],
    searchIntent: "Commercial: a business is moving production or workshop equipment to another facility.",
    related: ["heavy-equipment-transportation"],
    relatedMain: ["industrial-project-logistics", "container-transportation"],
    content: {
      h1: "Industrial Machinery Relocation",
      lead: "Moving production machinery and workshop equipment from one facility to another, in a sequence that keeps disruption low.",
      directAnswer:
        "Industrial machinery relocation is the planned movement of production machines and workshop equipment from one facility to another, usually several items in a set order. Gulf Elite Transport helps plan the sequence, assesses vehicle suitability and loading for each item, and provides a quotation before the move is agreed.",
      differs: {
        heading: "How industrial machinery relocation differs from related services",
        text: "Industrial Machinery Relocation treats a facility move as a programme of several items. Heavy Equipment Transportation covers moving a single heavy machine between sites. Industrial & Project Logistics covers ongoing deliveries across a project. Factory, manufacturing, workshop and plant moves are handled on this page rather than as separate services.",
      },
      overview: [
        "Relocating a factory floor is as much about order as about transport. Machines come out in a sequence that keeps production running where possible, and arrive in a sequence that matches installation. Getting the order wrong costs more time than the transport itself.",
        "Gulf Elite Transport helps plan the transport side of the programme. You share an equipment list with weights and dimensions, the two sites and the target dates; we assess each item, confirm what can be supported and provide a quotation. Installation and decommissioning engineering are separate matters and are not assumed.",
      ],
      includes: [
        { title: "Equipment list review", text: "Assessing each machine's weight, size and handling needs." },
        { title: "Move sequencing", text: "Planning the order in which machines leave and arrive." },
        { title: "Loading coordination", text: "Agreeing lifting, ramps and working areas at both facilities." },
        { title: "Multiple trips", text: "Planning the number of vehicle runs." },
        { title: "Quotation before commitment", text: "A clear quotation for the programme." },
      ],
      audience: [
        "Manufacturers moving a production line",
        "Workshops relocating tools and machines",
        "Facilities teams reorganising premises",
        "Businesses consolidating two sites",
      ],
      applications: [
        { title: "Plant relocation", text: "Production machinery moved to a new factory." },
        { title: "Workshop move", text: "Machines and benches transferred to new premises." },
        { title: "Line reconfiguration", text: "Equipment moved between areas of the same facility." },
        { title: "Site consolidation", text: "Equipment from two locations brought together." },
      ],
      steps: [
        { title: "List the equipment", text: "Provide each item with weight, size and condition." },
        { title: "Set the sequence", text: "Agree the order and dates for both facilities." },
        { title: "Receive the assessment", text: "We confirm what is possible and send a quotation." },
        { title: "Execute the programme", text: "Machines are moved in the agreed order." },
      ],
      considerations: [
        { title: "Equipment list accuracy", text: "A complete list avoids surprises mid-programme." },
        { title: "Dependencies", text: "Some machines cannot leave before others." },
        { title: "Production downtime", text: "Decide which machines can stop and for how long." },
        { title: "Installation", text: "Re-installation and utilities are separate from transport." },
      ],
      quoteInfo: [
        "List of machines with weights and dimensions",
        "Origin and destination facilities",
        "Target dates and downtime limits",
        "Access and loading arrangements at each site",
        "Required sequence or dependencies",
        "Contact person at each facility",
      ],
      faqs: [
        { q: "What is industrial machinery relocation?", a: "Moving production machines and workshop equipment from one facility to another, usually as a planned sequence of several items." },
        { q: "Do you do dismantling and installation?", a: "This page covers transport and loading coordination. Dismantling and installation are separate and not assumed." },
        { q: "How far ahead should I plan?", a: "As early as you can. Programmes with several machines need time to sequence." },
        { q: "Can you move during a production break?", a: "Time limits can be stated in your request, and we confirm what can be supported." },
        { q: "What do you need to quote?", a: "An equipment list with weights and dimensions, both facilities, dates and access details." },
      ],
    },
  },

  /* -------------------------------------------------------------------- FLEET */
  {
    id: "dedicated-fleet-services",
    slug: "dedicated-fleet-services",
    parentId: "contract-fleet-services",
    level: 2,
    name: "Dedicated Fleet Services",
    icon: "truck",
    featured: true,
    order: 1,
    short: "Vehicles allocated to your business for an agreed purpose, schedule or period, with a consistent point of contact.",
    audienceShort: "Businesses with steady transport needs and fixed routes",
    seoTitle: "Dedicated Fleet Services for Business Transport",
    metaDescription:
      "Arrange dedicated fleet services with vehicles allocated to your business for an agreed purpose. Request a proposal from Gulf Elite Transport.",
    primaryKeyword: "dedicated fleet services",
    secondaryKeywords: ["dedicated vehicles for business", "corporate fleet arrangements", "allocated fleet"],
    semanticKeywords: ["vehicle allocation", "fixed routes", "capacity", "single point of contact", "operating days", "fleet requirements"],
    searchIntent: "Commercial: a business wants vehicles allocated to its operation.",
    related: ["monthly-vehicle-contracts", "scheduled-cargo-transportation", "staff-transportation"],
    relatedMain: ["commercial-distribution-services"],
    content: {
      h1: "Dedicated Fleet Services",
      lead: "Vehicles allocated to your business for an agreed purpose, so your transport does not compete with everyone else's for availability.",
      directAnswer:
        "Dedicated fleet services are arrangements in which vehicles are allocated to one business for an agreed purpose, route or period, rather than booked job by job. Gulf Elite Transport discusses the vehicles, routes and operating days your operation needs and provides a proposal for review before you commit.",
      differs: {
        heading: "How dedicated fleet services differ from related services",
        text: "Dedicated Fleet Services is about vehicle allocation, whatever the payment structure. Monthly Vehicle Contracts is about the monthly contract basis. Scheduled Cargo Transportation plans a repeating movement without necessarily allocating a vehicle. Corporate fleet arrangements are covered on this page.",
      },
      overview: [
        "When a business moves goods or people every day, the cost of arranging transport job by job adds up in time and uncertainty. A dedicated arrangement removes the uncertainty: a vehicle is assigned to your purpose, and you plan around it.",
        "The right arrangement depends on the work. A single vehicle on a daily route needs different planning from several vehicles on set days. Gulf Elite Transport starts by understanding what moves, where, how often and with what flexibility, then provides a proposal. Vehicle and driver details are confirmed during the assessment.",
      ],
      includes: [
        { title: "Vehicle allocation", text: "Vehicles assigned to your operation for the agreed purpose." },
        { title: "Route and day planning", text: "Defining the routes and operating days." },
        { title: "Capacity planning", text: "Matching vehicle type and number to your volumes." },
        { title: "Single point of contact", text: "One contact for scheduling and day-to-day changes." },
        { title: "Proposal before commitment", text: "A clear proposal you can compare." },
      ],
      audience: [
        "Companies with a daily delivery route",
        "Businesses moving staff on a fixed timetable",
        "Project teams needing vehicles for several weeks",
        "Operations that want predictable capacity",
      ],
      applications: [
        { title: "Daily delivery route", text: "A vehicle assigned to the same route each day." },
        { title: "Site transport", text: "Vehicles for moving workers or materials around a project." },
        { title: "Multi-vehicle operation", text: "Several vehicles covering set days." },
        { title: "Peak support", text: "Additional capacity discussed for busy periods." },
      ],
      steps: [
        { title: "Review your operation", text: "What moves, where, how often and for how long." },
        { title: "Assess fleet needs", text: "Vehicle type, number and schedule." },
        { title: "Receive a proposal", text: "A proposal to review and compare." },
        { title: "Start and review", text: "The arrangement begins and its fit is reviewed." },
      ],
      considerations: [
        { title: "Utilisation", text: "A dedicated vehicle is best when it is used regularly." },
        { title: "Capacity mix", text: "One vehicle type may not cover every load." },
        { title: "Contract length", text: "Shorter and longer terms suit different operations." },
        { title: "Flexibility", text: "Discuss how the arrangement adapts to changes in volume." },
      ],
      quoteInfo: [
        "Type of transport (goods, passengers or equipment)",
        "Vehicle type or capacity needed",
        "Routes, locations and operating days",
        "Expected length of the arrangement",
        "Typical daily or weekly volumes",
        "Special requirements for vehicles or drivers",
      ],
      faqs: [
        { q: "What are dedicated fleet services?", a: "Arrangements where vehicles are allocated to your business for an agreed purpose or period instead of being booked job by job." },
        { q: "Is a dedicated vehicle the same as a monthly contract?", a: "Not necessarily. Dedicated describes the allocation, monthly describes the contract basis. They are often combined." },
        { q: "Are drivers included?", a: "Vehicle and driver arrangements are confirmed during the assessment, not assumed." },
        { q: "Can I add vehicles at busy times?", a: "Peak capacity can be discussed when the arrangement is planned." },
        { q: "How do I begin?", a: "Describe your operation through the quote form and we respond with a proposal or questions." },
      ],
    },
  },
  {
    id: "monthly-vehicle-contracts",
    slug: "monthly-vehicle-contracts",
    parentId: "contract-fleet-services",
    level: 2,
    name: "Monthly Vehicle Contracts",
    icon: "contract",
    featured: true,
    order: 2,
    short: "Contract-based vehicle arrangements that give your business predictable transport access month after month.",
    audienceShort: "Businesses wanting predictable monthly transport",
    seoTitle: "Monthly Vehicle Contracts for Recurring Transport",
    metaDescription:
      "Arrange monthly vehicle contracts for recurring business transport with a clear proposal before you commit. Gulf Elite Transport.",
    primaryKeyword: "monthly vehicle contracts",
    secondaryKeywords: ["monthly fleet contracts", "long-term transport contracts", "recurring transport contract"],
    semanticKeywords: ["contract term", "monthly basis", "renewal", "operating hours", "service levels", "review"],
    searchIntent: "Commercial: a business wants recurring transport under a monthly contract.",
    related: ["dedicated-fleet-services", "scheduled-cargo-transportation", "staff-transportation"],
    relatedMain: [],
    content: {
      h1: "Monthly Vehicle Contracts",
      lead: "Contract-based vehicle arrangements that give your business predictable transport access, month after month.",
      directAnswer:
        "A monthly vehicle contract is an agreement under which a business receives transport capacity on a monthly basis for an agreed purpose, rather than paying and arranging per job. Gulf Elite Transport discusses the vehicles, operating pattern and contract length with you and provides a proposal before you commit.",
      differs: {
        heading: "How monthly vehicle contracts differ from related services",
        text: "Monthly Vehicle Contracts describes the contract basis. Dedicated Fleet Services describes allocating vehicles to your business. Scheduled Cargo Transportation plans repeating cargo movements and can be priced on its own. Long-term transport contracts are covered here as longer monthly terms.",
      },
      overview: [
        "A monthly contract replaces a stream of separate bookings with one agreement. The benefit is predictability: you know what capacity you have, and the supplier knows what it must provide. The trade-off is commitment, so the terms matter.",
        "The key terms are the length of the contract, the vehicles and operating pattern, how extra needs are handled and how the arrangement is reviewed. Gulf Elite Transport talks these through with you and provides a proposal for review. Nothing is agreed until you confirm.",
      ],
      includes: [
        { title: "Contract term discussion", text: "Choosing a contract length that suits your operation." },
        { title: "Operating pattern", text: "Days, hours and routes covered by the contract." },
        { title: "Capacity definition", text: "The vehicles and volumes the contract is meant to cover." },
        { title: "Review process", text: "How and when the arrangement is reviewed." },
        { title: "Proposal before commitment", text: "A clear proposal to compare." },
      ],
      audience: [
        "Businesses with steady monthly transport needs",
        "Companies replacing repeated one-off bookings",
        "Project teams with a defined multi-month duration",
        "Employers with ongoing staff transport",
      ],
      applications: [
        { title: "Staff transport contract", text: "A monthly arrangement for employee movement." },
        { title: "Supply route contract", text: "A monthly arrangement for regular cargo." },
        { title: "Project contract", text: "A fixed-term arrangement for a project's length." },
        { title: "Trial then extend", text: "A shorter term reviewed before extension." },
      ],
      steps: [
        { title: "Share your needs", text: "Describe transport type, routes, volumes and duration." },
        { title: "Discuss the terms", text: "Length, review points and handling of extra needs." },
        { title: "Receive a proposal", text: "A written proposal to review." },
        { title: "Confirm and begin", text: "The contract starts when you confirm." },
      ],
      considerations: [
        { title: "Term length", text: "A longer term gives predictability, a shorter term gives flexibility." },
        { title: "Extra needs", text: "Agree how occasional extra trips are arranged." },
        { title: "Changes in volume", text: "Discuss what happens if your volumes rise or fall." },
        { title: "Review point", text: "A scheduled review keeps the contract fit for purpose." },
      ],
      quoteInfo: [
        "Type of transport required",
        "Vehicles or capacity needed",
        "Routes and operating days",
        "Proposed contract length",
        "Typical monthly volumes",
        "How extra requests should be handled",
      ],
      faqs: [
        { q: "What is a monthly vehicle contract?", a: "An agreement that provides transport capacity on a monthly basis for an agreed purpose, instead of arranging each job separately." },
        { q: "How long is a contract?", a: "The length is agreed with you. Shorter and longer terms can be discussed." },
        { q: "What if my needs change?", a: "Tell us how your volumes might vary so the contract can be planned with a review point." },
        { q: "Is it different from a dedicated fleet?", a: "A monthly contract is the commercial basis. A dedicated fleet is the allocation of vehicles. They are often combined." },
        { q: "How do I get a proposal?", a: "Describe your needs through the quote form and we respond with a proposal or questions." },
      ],
    },
  },
];
