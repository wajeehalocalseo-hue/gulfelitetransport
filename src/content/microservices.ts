import type { ChildRecord } from "./subservices";

/**
 * Level 3 (micro-service) records that have full page content.
 *
 * A micro-service is published only when it has
 *  - verified availability (it maps to a capability the business owner confirmed), and
 *  - meaningful unique content (it explains a distinct requirement, not a copy of its parent).
 *
 * Everything else lives in ./microproposals.ts with a status and a reason, and has no page.
 * To add a micro-service: append a ChildRecord here with `level: 3` and `parentId` set to a
 * sub-service id (records here are published; to hold one back without deleting it, set its id in
 * `statusOverrides` in ./proposals.ts). The nested route
 * /services/<main>/<sub>/<micro>, breadcrumbs, canonical URL, metadata, JSON-LD, sitemap entry,
 * parent-page card and llms.txt entry are all generated from this data.
 */
export const microServices: ChildRecord[] = [
  /* ------------------------------------------------------- under Airport Transfers */
  {
    id: "airport-arrival-pickups",
    slug: "airport-arrival-pickups",
    parentId: "airport-transfers",
    level: 3,
    name: "Airport Arrival Pickups",
    icon: "plane",
    featured: true,
    order: 1,
    short: "Pickup for passengers landing at an airport, planned around the arrival details you provide.",
    audienceShort: "Arriving guests, visiting staff and their hosts",
    seoTitle: "Airport Arrival Pickups for Arriving Passengers",
    metaDescription:
      "Arrange an airport arrival pickup planned around your flight details, passenger numbers and luggage. Request a quotation from Gulf Elite Transport.",
    primaryKeyword: "airport arrival pickup",
    secondaryKeywords: ["pickup from the airport", "airport arrival transfer", "arriving passenger transport"],
    semanticKeywords: ["flight number", "arrival terminal", "landing time", "baggage reclaim", "meeting point", "luggage"],
    searchIntent: "Transactional: someone is arriving by air and needs a pre-arranged pickup.",
    related: ["airport-departure-drop-offs", "corporate-passenger-transport"],
    relatedMain: [],
    publishedAt: "2026-10-31",
    content: {
      h1: "Airport Arrival Pickups",
      lead: "A pre-arranged pickup for passengers landing at an airport, built around the arrival details you give us rather than guesswork.",
      directAnswer:
        "An airport arrival pickup is a pre-arranged ride that collects passengers when they land and takes them to their destination, such as a hotel, an office or a home. Gulf Elite Transport plans it using the airport, terminal, flight number, arrival date and time, passenger numbers and luggage you provide, and confirms availability and a quotation before you commit.",
      differs: {
        heading: "How airport arrival pickups differ from related services",
        text: "Airport Transfers is the parent service and covers both directions. This page is only about the arrival side, where the passenger lands, collects luggage and is met at an agreed point. Airport Departure Drop-offs covers the opposite journey. Corporate Passenger Transport covers a visitor's itinerary after the airport, with several stops across a trip.",
      },
      overview: [
        "The difficulty of an arrival pickup is that the schedule belongs to someone else. The aircraft lands when it lands, and the passenger then needs time for immigration, baggage and walking to the meeting point. A pickup that works is planned from the arrival details outwards, with a clear meeting point and a way to reach the passenger if something changes.",
        "Gulf Elite Transport asks for the information needed to plan the pickup, then assesses the request and confirms availability for the date. How delays or early arrivals are handled is agreed when the pickup is arranged, so the host and the driver know what to do if the flight time moves.",
      ],
      includes: [
        { title: "Arrival details planning", text: "Using the airport, terminal, flight number and expected arrival time to plan when the vehicle should be ready." },
        { title: "Agreed meeting point", text: "Settling where the passenger will be met, so there is no uncertainty on arrival." },
        { title: "Luggage and group size", text: "Matching the vehicle to the number of passengers and the amount of luggage." },
        { title: "Contact arrangements", text: "Agreeing who the driver can contact, and who the passenger can call, on the day." },
        { title: "Quotation before commitment", text: "A clear quotation for the pickup, based on the details you provide." },
      ],
      audience: [
        "Hosts arranging transport for a visiting colleague or client",
        "Travel coordinators booking for staff arriving from other offices",
        "Hotels and venues organising guest arrivals",
        "Individuals arriving who prefer a pre-arranged ride",
      ],
      applications: [
        { title: "Visiting executive", text: "A guest collected after landing and taken directly to a meeting or hotel." },
        { title: "Team arrival", text: "A group landing on the same flight and travelling together." },
        { title: "Late-night landing", text: "A pickup arranged in advance for an arrival outside normal hours." },
        { title: "Onward connection", text: "A passenger collected and taken to a second city or site." },
      ],
      steps: [
        { title: "Send the flight details", text: "Share the airport, terminal, flight number, date and arrival time." },
        { title: "Add passengers and luggage", text: "Tell us how many passengers and how many bags." },
        { title: "Agree meeting and contact", text: "Confirm the meeting point and the phone numbers on both sides." },
        { title: "Receive the quotation", text: "We confirm availability and send a quotation before anything is arranged." },
      ],
      considerations: [
        { title: "Time to exit the airport", text: "Passengers need time after landing for formalities and baggage. Discuss realistic timing for your airport." },
        { title: "Flight changes", text: "Agree in advance how delays or early arrivals are communicated and who decides." },
        { title: "Meeting point clarity", text: "A named meeting point and a phone number avoid long searches in a busy hall." },
        { title: "Luggage and equipment", text: "Large bags, equipment or a bigger group may need a different vehicle." },
      ],
      quoteInfo: [
        "Airport and arrival terminal",
        "Flight number, date and scheduled arrival time",
        "Destination address",
        "Number of passengers",
        "Luggage and any equipment",
        "Contact phone numbers for the passenger and the host",
      ],
      faqs: [
        { q: "What is an airport arrival pickup?", a: "A pre-arranged ride that collects passengers after they land and takes them to their destination." },
        { q: "What flight details do you need?", a: "The airport, terminal, flight number, date and scheduled arrival time, so the pickup can be planned around the actual arrival." },
        { q: "What happens if the flight is delayed?", a: "Tell us how you wish to be contacted. The way delays are handled is agreed when the pickup is arranged." },
        { q: "How is this different from a general airport transfer?", a: "An airport transfer covers both directions. An arrival pickup is only the journey that starts when the passenger lands." },
        { q: "How do I get a quotation?", a: "Send the arrival details and passenger numbers through the quote form, and we reply with a quotation or any questions." },
      ],
    },
  },
  {
    id: "airport-departure-drop-offs",
    slug: "airport-departure-drop-offs",
    parentId: "airport-transfers",
    level: 3,
    name: "Airport Departure Drop-offs",
    icon: "plane",
    featured: true,
    order: 2,
    short: "Pickup that gets passengers to the airport in time for their flight, planned backwards from the departure.",
    audienceShort: "Departing travellers, staff and hotels",
    seoTitle: "Airport Departure Drop-offs Planned Around Your Flight",
    metaDescription:
      "Arrange an airport drop-off timed to your departure, with pickup time, luggage and traffic buffer planned in advance. Quotation from Gulf Elite Transport.",
    primaryKeyword: "airport drop-off",
    secondaryKeywords: ["airport departure transfer", "ride to the airport", "early morning airport transfer"],
    semanticKeywords: ["check-in time", "departure terminal", "pickup time", "traffic buffer", "luggage", "flight time"],
    searchIntent: "Transactional: someone is flying out and needs a pre-arranged ride to the airport.",
    related: ["airport-arrival-pickups", "corporate-passenger-transport"],
    relatedMain: [],
    publishedAt: "2026-10-31",
    content: {
      h1: "Airport Departure Drop-offs",
      lead: "A ride to the airport planned backwards from the flight, so the pickup time reflects the journey and not a hopeful estimate.",
      directAnswer:
        "An airport departure drop-off is a pre-arranged ride that collects passengers from a home, hotel or office and takes them to the airport in time for their flight. Gulf Elite Transport works out the pickup time from the departure details you provide, the passenger numbers and the luggage, and confirms availability and a quotation before you commit.",
      differs: {
        heading: "How airport departure drop-offs differ from related services",
        text: "Airport Transfers is the parent service and covers both directions. This page covers only the departure side, where the deadline is the airport check-in. Airport Arrival Pickups covers the other direction, where the passenger lands. Corporate Passenger Transport covers a visitor's whole itinerary, of which the airport run is only one part.",
      },
      overview: [
        "Departures are unforgiving. The aircraft leaves at a fixed time, check-in and security take time, and the road to the airport can be slower than expected. Everything is therefore planned backwards: the departure time sets the time the passenger must be at the airport, which sets the time the vehicle must leave.",
        "Gulf Elite Transport helps you set that pickup time sensibly. You provide the departure details and the pickup address; we assess the request, confirm availability for the date and provide a quotation. Check-in and security timings vary by airport and airline, so we recommend you confirm those with your airline and tell us the time you need to arrive.",
      ],
      includes: [
        { title: "Backwards time planning", text: "Working from the departure time to a pickup time that leaves a sensible buffer." },
        { title: "Pickup point agreement", text: "Confirming the address and the exact point where the vehicle will wait." },
        { title: "Luggage planning", text: "Space for bags, which are often larger on departure." },
        { title: "Early and late departures", text: "Planning for flights outside normal hours." },
        { title: "Quotation before commitment", text: "A clear quotation for the drop-off." },
      ],
      audience: [
        "Business travellers flying out after a trip",
        "Hotels arranging guest departures",
        "Companies sending staff to other offices",
        "Groups travelling together who want a single ride",
      ],
      applications: [
        { title: "Early-morning flight", text: "A pickup arranged the evening before for a dawn departure." },
        { title: "Hotel check-out", text: "A guest collected at the hotel and delivered to the terminal." },
        { title: "Group departure", text: "Several travellers collected together." },
        { title: "Return from a trip", text: "A drop-off arranged together with the arrival pickup." },
      ],
      steps: [
        { title: "Send the flight details", text: "Share the airport, terminal, flight number and departure time." },
        { title: "Tell us when you need to arrive", text: "State the time you want to be at the airport, based on your airline's guidance." },
        { title: "Confirm pickup and luggage", text: "Give the pickup address, passenger numbers and bags." },
        { title: "Receive the quotation", text: "We confirm availability and send a quotation." },
      ],
      considerations: [
        { title: "Airline and airport requirements", text: "Check-in and security times vary. Confirm them and tell us the arrival time you need." },
        { title: "Traffic", text: "Journey times change through the day. Leave a margin that suits the route and time." },
        { title: "Pickup readiness", text: "Passengers should be ready at the agreed time with their bags." },
        { title: "Terminal", text: "Make sure the drop-off terminal matches the airline and flight." },
      ],
      quoteInfo: [
        "Airport and departure terminal",
        "Flight number, date and departure time",
        "Time you need to arrive at the airport",
        "Pickup address",
        "Number of passengers and luggage",
        "Contact phone number",
      ],
      faqs: [
        { q: "What is an airport departure drop-off?", a: "A pre-arranged ride that takes passengers to the airport in time for their flight." },
        { q: "How is the pickup time decided?", a: "Backwards from the departure: the time you need to arrive at the airport, plus the journey time and a sensible margin." },
        { q: "How early should I arrive at the airport?", a: "That depends on the airport, airline and flight. Check with your airline and tell us the time you want to arrive." },
        { q: "Can I book the drop-off and the arrival pickup together?", a: "Yes. Include both journeys in one request and we plan them together." },
        { q: "How do I get a quotation?", a: "Send the flight and pickup details through the quote form." },
      ],
    },
  },

  /* ------------------------------------------- under Heavy Equipment Transportation */
  {
    id: "equipment-loading-and-unloading-coordination",
    slug: "equipment-loading-and-unloading-coordination",
    parentId: "heavy-equipment-transportation",
    level: 3,
    name: "Equipment Loading and Unloading Coordination",
    icon: "cog",
    featured: true,
    order: 1,
    short: "Agreeing ramps, lifting arrangements, working areas and contacts at both sites before the equipment moves.",
    audienceShort: "Contractors, site managers and equipment suppliers",
    seoTitle: "Equipment Loading and Unloading Coordination",
    metaDescription:
      "Plan equipment loading and unloading before the move: ramps, lifting, working area and site contacts. Request a quotation from Gulf Elite Transport.",
    primaryKeyword: "equipment loading and unloading",
    secondaryKeywords: ["machinery loading coordination", "loading ramps and lifting", "site unloading arrangements"],
    semanticKeywords: ["loading ramp", "lifting equipment", "working area", "site contact", "ground conditions", "securing"],
    searchIntent: "Informational and commercial: a team needs to know how loading and unloading will be arranged for a heavy move.",
    related: ["vehicle-suitability-for-heavy-equipment", "industrial-machinery-relocation"],
    relatedMain: ["industrial-project-logistics"],
    publishedAt: "2026-10-31",
    content: {
      h1: "Equipment Loading and Unloading Coordination",
      lead: "The part of a heavy move that most often goes wrong, planned in advance so that neither site is surprised on the day.",
      directAnswer:
        "Equipment loading and unloading coordination is the advance planning of how a machine will be put on, and taken off, a transport vehicle at each site. Gulf Elite Transport asks about ramps, lifting equipment, working area, ground conditions and site contacts, and agrees the arrangements before the equipment is moved.",
      differs: {
        heading: "How loading and unloading coordination differs from related services",
        text: "Heavy Equipment Transportation is the parent service and covers the whole move. This page concerns one step within it, the loading and unloading arrangements, which are agreed with both sites. Vehicle Suitability for Heavy Equipment covers choosing the vehicle. Industrial Machinery Relocation applies the same planning across several machines in a facility move.",
      },
      overview: [
        "A vehicle can be exactly the right one and the move can still stall at the gate. The machine needs to be driven or lifted on, the vehicle needs flat and firm ground to stand on, and someone needs to be there who knows what is happening. These things are easy to arrange in advance and costly to solve on the day.",
        "Gulf Elite Transport treats loading and unloading as part of the plan, not an afterthought. We ask what ramps or lifting equipment each site has, how much working area there is, what the ground is like and who the site contact is. The arrangements are confirmed with both sites before the date, and you receive a quotation before you commit.",
      ],
      includes: [
        { title: "Ramps and lifting review", text: "Establishing what each site has available to load and unload the machine." },
        { title: "Working area check", text: "Making sure there is room for the vehicle to stand and the machine to move safely." },
        { title: "Ground conditions", text: "Considering soft, sloping or uneven ground at the loading point." },
        { title: "Site contacts", text: "Agreeing who will direct the vehicle and the machine at each end." },
        { title: "Securing guidance", text: "Using manufacturer guidance on how the machine should be secured for transport." },
      ],
      audience: [
        "Contractors moving plant between sites",
        "Site managers preparing for a delivery",
        "Equipment suppliers delivering to a customer's premises",
        "Facilities teams unloading at a new location",
      ],
      applications: [
        { title: "Delivery to a site without ramps", text: "Agreeing a lifting arrangement before the machine arrives." },
        { title: "Pickup from a yard", text: "Planning the loading point and the route out of the yard." },
        { title: "Tight working area", text: "Assessing whether the vehicle and machine have room to manoeuvre." },
        { title: "Soft or sloping ground", text: "Choosing a loading point that suits the vehicle." },
      ],
      steps: [
        { title: "Describe both sites", text: "Tell us about access, ground, ramps and lifting at pickup and delivery." },
        { title: "Identify gaps", text: "We highlight anything that needs arranging, such as lifting equipment." },
        { title: "Agree responsibilities", text: "Confirm who provides what, and who the site contact is." },
        { title: "Confirm before the date", text: "Final details are agreed with both sites before the move." },
      ],
      considerations: [
        { title: "Responsibility", text: "Be clear which party provides ramps or lifting equipment at each site." },
        { title: "Safety and clearance", text: "Keep the working area clear of people and obstacles during loading." },
        { title: "Manufacturer guidance", text: "Follow the machine's guidance on lifting points and securing." },
        { title: "Weather and ground", text: "Wet or soft ground can change the loading point." },
      ],
      quoteInfo: [
        "Machine type, weight and dimensions",
        "Pickup and delivery addresses",
        "Ramps or lifting equipment available at each site",
        "Size and condition of the working area",
        "Ground conditions at the loading and unloading points",
        "Site contact at each location",
      ],
      faqs: [
        { q: "What does loading and unloading coordination involve?", a: "Agreeing, before the move, how the machine will be put on and taken off the vehicle at each site, including ramps, lifting, working area and contacts." },
        { q: "Do you provide the lifting equipment?", a: "What is provided and by whom is agreed during planning. Tell us what each site has available and we confirm what can be supported." },
        { q: "Why does ground condition matter?", a: "Soft or sloping ground can prevent a vehicle standing safely or a machine moving onto it, so the loading point may need to change." },
        { q: "Is this a separate service from the move?", a: "It is part of planning a heavy equipment move. This page explains it in detail because it is where problems commonly arise." },
        { q: "What information helps most?", a: "Photographs of the loading points, the machine's weight and dimensions, and the name of a site contact." },
      ],
    },
  },
  {
    id: "vehicle-suitability-for-heavy-equipment",
    slug: "vehicle-suitability-for-heavy-equipment",
    parentId: "heavy-equipment-transportation",
    level: 3,
    name: "Vehicle Suitability for Heavy Equipment",
    icon: "truck",
    featured: false,
    order: 2,
    short: "Matching a machine's weight, size and loading method to a transport vehicle that can carry it safely.",
    audienceShort: "Contractors, plant operators and equipment suppliers",
    seoTitle: "Vehicle Suitability for Heavy Equipment Transport",
    metaDescription:
      "Understand how vehicle suitability is assessed for heavy equipment transport: weight, dimensions, loading method and route. Quotation from Gulf Elite Transport.",
    primaryKeyword: "vehicle suitability for heavy equipment",
    secondaryKeywords: ["choosing a vehicle for machinery transport", "equipment transport vehicle assessment", "heavy load vehicle selection"],
    semanticKeywords: ["operating weight", "overall dimensions", "load bed", "attachments", "route restrictions", "loading method"],
    searchIntent: "Informational and commercial: a business wants to know which vehicle can carry a machine.",
    related: ["equipment-loading-and-unloading-coordination", "industrial-machinery-relocation"],
    relatedMain: ["container-transportation"],
    publishedAt: "2026-10-31",
    content: {
      h1: "Vehicle Suitability for Heavy Equipment",
      lead: "How a vehicle is matched to a machine, so that what is quoted is a move that can actually be carried out.",
      directAnswer:
        "Vehicle suitability is the assessment of whether a transport vehicle can safely carry a particular machine, based on the machine's weight, dimensions and loading method and on the route and the sites involved. Gulf Elite Transport carries out this assessment before quoting a heavy equipment move, using the specification you provide.",
      differs: {
        heading: "How vehicle suitability differs from related services",
        text: "Heavy Equipment Transportation is the parent service and covers the move end to end. This page explains one decision within it, which vehicle can carry the machine. Equipment Loading and Unloading Coordination covers how the machine gets on and off. Industrial Machinery Relocation applies the same assessment to each machine in a facility move.",
      },
      overview: [
        "The vehicle for a heavy machine is not chosen by size alone. Weight decides whether the vehicle can carry the load, dimensions decide whether the machine fits and can pass along the route, and the way the machine is loaded decides what kind of bed or ramp is needed. A mismatch on any of these can stop a move.",
        "Gulf Elite Transport asks for the machine's specification and assesses suitability before pricing. The category of vehicle is confirmed during that assessment and is never assumed in advance. If the machine cannot be supported, we say so, so that you can look at other options early.",
      ],
      includes: [
        { title: "Weight assessment", text: "Comparing the machine's operating weight, including attachments, with what a vehicle can carry." },
        { title: "Dimension check", text: "Considering length, width and height against the vehicle and the route." },
        { title: "Loading method review", text: "Deciding whether the machine can drive on, or must be lifted." },
        { title: "Route and access review", text: "Checking for narrow or low points between the two sites." },
        { title: "Honest outcome", text: "Confirming what can be supported, or explaining clearly if it cannot." },
      ],
      audience: [
        "Contractors planning a first move of a new machine",
        "Operators unsure whether their equipment is movable on a standard load bed",
        "Suppliers delivering machines to customers",
        "Planners comparing transport options before committing",
      ],
      applications: [
        { title: "New machine delivery", text: "Checking the vehicle before a purchased machine is shipped." },
        { title: "Machine with attachments", text: "Assessing the combined weight and size of machine and attachments." },
        { title: "Tight route", text: "Checking whether a vehicle can reach a constrained site." },
        { title: "Comparing options", text: "Understanding why a larger or different vehicle is needed." },
      ],
      steps: [
        { title: "Send the specification", text: "Type, make, model, operating weight and dimensions." },
        { title: "Note attachments", text: "Say which attachments travel with the machine." },
        { title: "Describe the route", text: "Share the sites and any known restrictions." },
        { title: "Receive the assessment", text: "We confirm suitability and provide a quotation." },
      ],
      considerations: [
        { title: "Use the real weight", text: "Operating weight differs from a catalogue weight once attachments and fluids are included." },
        { title: "Height and width", text: "These often decide the route more than the weight does." },
        { title: "Axle loading", text: "How weight is spread across the vehicle matters as well as the total." },
        { title: "Safety margin", text: "A vehicle close to its limit is rarely the right choice." },
      ],
      quoteInfo: [
        "Machine type, make and model",
        "Operating weight including attachments",
        "Length, width and height",
        "Loading method (drive-on or lifted)",
        "Pickup and delivery sites and known restrictions",
        "Photographs or the specification sheet",
      ],
      faqs: [
        { q: "How is vehicle suitability decided?", a: "By comparing the machine's weight, dimensions and loading method with what a vehicle can safely carry, and checking the route and sites." },
        { q: "What if my machine is very heavy or large?", a: "Heavy or oversized requirements are assessed individually. We say clearly what can be supported and do not assume it from this page." },
        { q: "Do attachments matter?", a: "Yes. They add weight and change dimensions, so tell us which attachments travel with the machine." },
        { q: "Can you recommend a vehicle before I commit?", a: "The assessment is part of preparing the quotation. The vehicle category is confirmed there." },
        { q: "What should I send?", a: "The specification sheet or the machine's weight and dimensions, the two sites and photographs if you have them." },
      ],
    },
  },

  /* ----------------------------------------- under Commercial Cargo Transportation */
  {
    id: "commercial-shipment-pickup-and-delivery",
    slug: "commercial-shipment-pickup-and-delivery",
    parentId: "commercial-cargo-transportation",
    level: 3,
    name: "Commercial Shipment Pickup and Delivery",
    icon: "box",
    featured: true,
    order: 1,
    short: "How the pickup and the delivery of a commercial shipment are coordinated: contacts, windows, access and handover.",
    audienceShort: "Shippers, receiving teams and logistics coordinators",
    seoTitle: "Commercial Shipment Pickup and Delivery Coordination",
    metaDescription:
      "See how commercial shipment pickup and delivery are coordinated: contacts, time windows, access and handover. Quotation from Gulf Elite Transport.",
    primaryKeyword: "commercial shipment pickup and delivery",
    secondaryKeywords: ["cargo pickup coordination", "delivery window planning", "shipment handover"],
    semanticKeywords: ["pickup window", "delivery window", "site contact", "loading dock", "handover", "delivery instructions"],
    searchIntent: "Informational and commercial: a shipper wants to know how pickup and delivery will be coordinated.",
    related: ["scheduled-cargo-transportation"],
    relatedMain: ["last-mile-delivery"],
    publishedAt: "2026-10-31",
    content: {
      h1: "Commercial Shipment Pickup and Delivery",
      lead: "The coordination at each end of a shipment, which decides whether it is collected and received smoothly or sits waiting.",
      directAnswer:
        "Commercial shipment pickup and delivery coordination is the agreement, before a cargo moves, of who releases it, who receives it, when, where and how it is handed over. Gulf Elite Transport coordinates these details with both sites as part of a commercial cargo job and confirms them before the vehicle is dispatched.",
      differs: {
        heading: "How pickup and delivery coordination differs from related services",
        text: "Commercial Cargo Transportation is the parent service and covers the whole movement. This page explains one part of it, the coordination at the two ends. Scheduled Cargo Transportation applies when the same movement repeats. Last-Mile Delivery covers a series of final deliveries to several recipients, rather than a single shipment between two business locations.",
      },
      overview: [
        "Most delays in a cargo job are not on the road. They happen at the gate: nobody is authorised to release the goods, the receiving dock is closed, the delivery instructions are missing or the person who should sign is away. All of these are avoidable with a small amount of agreement in advance.",
        "Gulf Elite Transport collects those details when it assesses your request. We ask who the contact is at each end, which time windows the sites can accept, what access the vehicle has and what the handover should look like. These are confirmed with you before the job is arranged, and you receive a quotation first.",
      ],
      includes: [
        { title: "Contacts at both ends", text: "A named person, with a phone number, at the pickup and at the delivery." },
        { title: "Time windows", text: "Pickup and delivery windows that the sites can actually accept." },
        { title: "Access instructions", text: "Gate, dock and parking details so the vehicle can reach the right point." },
        { title: "Handover requirements", text: "Who signs, what is checked and what paperwork the receiver expects." },
        { title: "Change handling", text: "How a change of time or contact is communicated." },
      ],
      audience: [
        "Suppliers releasing goods from their premises",
        "Receiving teams at shops, depots and sites",
        "Logistics coordinators arranging transport for others",
        "Businesses new to booking commercial transport",
      ],
      applications: [
        { title: "Release from a supplier", text: "A shipment collected by arrangement with the supplier's dispatch team." },
        { title: "Delivery to a closed dock", text: "A window agreed around the receiving team's working hours." },
        { title: "Delivery to a work site", text: "Access and handover agreed with the site manager." },
        { title: "Third-party booking", text: "A coordinator booking for a supplier and a receiver who have not spoken." },
      ],
      steps: [
        { title: "Name the contacts", text: "Provide the person and number at each end." },
        { title: "Set the windows", text: "Agree pickup and delivery times each site can accept." },
        { title: "Describe access", text: "Share gate, dock and parking information." },
        { title: "Confirm the handover", text: "Agree what is checked and signed at delivery." },
      ],
      considerations: [
        { title: "Authority to release or receive", text: "The contact must be able to hand over or accept the cargo." },
        { title: "Working hours", text: "Delivery windows should match the receiving team's hours." },
        { title: "Access limits", text: "Dock height, gate width and parking affect the vehicle that can be used." },
        { title: "Paperwork", text: "Decide in advance what documents travel with the goods." },
      ],
      quoteInfo: [
        "Pickup and delivery addresses",
        "Contact person and phone at each site",
        "Preferred pickup and delivery windows",
        "Gate, dock and parking access",
        "Handover or signature requirements",
        "Cargo type, weight and packing",
      ],
      faqs: [
        { q: "What is pickup and delivery coordination?", a: "Agreeing before a shipment moves who releases it, who receives it, when, where and how it is handed over." },
        { q: "Why does it matter?", a: "Most cargo delays happen at the ends, when a contact is unavailable or access is unclear, not on the road." },
        { q: "Who needs to be involved?", a: "A contact at each site who can release or receive the goods. A third-party coordinator can arrange it on their behalf." },
        { q: "Can delivery windows be fixed?", a: "Windows are agreed for the job and availability is confirmed before the arrangement is made." },
        { q: "What should I send for a quotation?", a: "The two addresses, the contacts, preferred windows, access details and the cargo description." },
      ],
    },
  },
];
