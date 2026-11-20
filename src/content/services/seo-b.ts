import type { ServiceBase } from "./seo-types";

/** Services 7 to 12: furniture moving, passenger transport, taxi, heavy equipment, industrial projects, cargo handling. */
export const seoB: Record<string, ServiceBase> = {
  "furniture-household-moving": {
    primary: "Furniture Moving Services Saudi Arabia",
    secondary: ["Household Moving Services", "Furniture Transportation Company", "Home Relocation Services Saudi Arabia", "Residential Moving Services", "Furniture Delivery Services", "Household Goods Transportation", "Home Furniture Transport", "Furniture Relocation Company"],
    metaTitle: "Furniture Moving Services Saudi Arabia",
    metaDescription: "Furniture moving services in Saudi Arabia for homes and offices: transport of furniture and household goods in your city or to another. Get a quotation first.",
    h1: "Furniture Moving Services in Saudi Arabia",
    lead: "Moving home or office furniture takes planning at both ends. Send the item list, the two addresses and the access details, and we reply with a quotation before you commit.",
    directAnswer: "Furniture moving services in Saudi Arabia transport furniture, equipment and household goods from one location to another, for homes, offices and commercial premises. Gulf Elite Transport Group asks for the item list, the locations and the access at both ends, and provides a quotation before you commit. Packing, dismantling and reassembly are not assumed.",
    intro: [
      "Furniture moving services in Saudi Arabia cover short moves inside a city and long moves between regions. A family can be relocating from Riyadh to Jeddah, or an office can be moving to a new building across town. Gulf Elite Transport Group asks about the items and the access first, because that decides the vehicle and the plan.",
      "Moves go better when the goods are packed and protected before the truck arrives. Packing and loading support is a separate topic under [packaging and cargo handling](/services/packaging-cargo-handling). Business goods moving in bulk to shops belong under [commercial distribution](/services/commercial-distribution-services), and single deliveries of new furniture to customers can fit [last-mile delivery](/services/last-mile-delivery).",
    ],
    h2: { overview: "What household and furniture moving covers", includes: "What a furniture moving request can include", how: "How a home or office move is arranged", coverage: "Home and office moves across Saudi Arabia", planning: "What to prepare before moving day", usecases: "Common furniture and household moves", faq: "Furniture moving: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia, so a household move can run inside one city or between regions. Moves between cities depend on the distance, the amount of furniture and the dates.",
        "We do not publish fixed prices or journey times for any move. We ask for the item list, the access details and the dates, and confirm what we can support before you accept a quotation.",
      ],
      cities: [
        { name: "Riyadh", note: "Large city with many apartment and villa moves each year" },
        { name: "Jeddah", note: "Western coastal city, a common move from or to the capital" },
        { name: "Dammam", note: "Eastern Province city with company relocations" },
        { name: "Al Khobar", note: "Residential and business city next to Dammam" },
        { name: "Madinah", note: "Holy city with a growing residential population" },
        { name: "Taif", note: "Mountain city near Makkah, popular for family homes" },
      ],
    },
    faqs: [
      { q: "Do you move furniture between cities in Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Send your item list and the pickup and delivery cities, and we confirm whether we can support the move." },
      { q: "Is packing and reassembly included?", a: "We do not assume it. If you need packing, dismantling or reassembly, say so in your request and we confirm what can be supported and what is quoted separately." },
    ],
    images: [
      { slot: "furniture-household-moving", alt: "A moving truck with its ramp down outside a residential building", label: "Expected image: furniture-household-moving.webp" },
      { slot: "furniture-loading-protection", alt: "Furniture wrapped in protective covers being carried to a truck", label: "Expected image: furniture-loading-protection.webp" },
      { slot: "household-move-between-cities", alt: "A moving truck driving between Saudi cities", label: "Expected image: household-move-between-cities.webp" },
    ],
    layout: { hero: "light-image", includes: "cards", steps: "timeline", usecases: "columns", planning: "split", aside: "sticky", order: ["overview", "how", "includes", "planning", "usecases", "coverage", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like a quotation to move furniture. It is a [home or office] move from [address and city] to [address and city], with about [number] items, on [date]. Access at both ends is [floor, lift or stairs].",
    cta: { heading: "Ask for a moving quotation", text: "Send the item list, both addresses, the floors and lifts, and your dates. We reply with a quotation." },
  },

  "passenger-transport": {
    primary: "Passenger Transport Services Saudi Arabia",
    secondary: ["Passenger Transportation Company", "Group Passenger Transport", "Corporate Passenger Transportation", "Staff Transportation Services", "Private Passenger Transport", "Intercity Passenger Transport", "Business Travel Transportation", "Passenger Transfer Services"],
    metaTitle: "Passenger Transport Services Saudi Arabia",
    metaDescription: "Passenger transport services in Saudi Arabia for staff, groups and business travel: planned transfers and intercity trips. Send your group size and schedule.",
    h1: "Passenger Transport Services in Saudi Arabia",
    lead: "Planned transport for staff, groups and business travellers. Tell us the group size, the route and the schedule, and we confirm what we can arrange.",
    directAnswer: "Passenger transport services in Saudi Arabia move groups and individuals on a planned schedule, such as staff transport, corporate travel, airport transfers and event groups. Gulf Elite Transport Group asks for the number of passengers, the route and the timetable, and confirms the arrangement and the fare before you commit. Vehicle availability is confirmed for each request.",
    intro: [
      "Passenger transport services in Saudi Arabia work best when the plan is clear: who travels, from where, to where and when. Gulf Elite Transport Group arranges transport for staff, corporate guests and groups across the Kingdom, and confirms the vehicle and the fare with you before the date.",
      "This page is for planned and group travel. If you need an individual taxi or private car for a single ride, go to [taxi and cab services](/services/taxi-cab-services). If a company needs vehicles for a whole contract period, read about [contract fleet services](/services/contract-fleet-services). Companies that move staff and cargo together will often need [freight transport](/services/freight-cargo-transport) as well.",
    ],
    h2: { overview: "What passenger transport includes", includes: "What a passenger transport request can include", how: "How group and staff transport is arranged", coverage: "Passenger transport across Saudi Arabia", planning: "What to tell us about your group", usecases: "Who books passenger transport", faq: "Passenger transport: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia, including passenger work between cities and to and from airports. Distances are long, so a schedule with rest stops is part of the plan.",
        "We do not publish fixed timetables or promise vehicle types in advance. We confirm the vehicle, the driver and the fare for your group, and any change is agreed in writing.",
      ],
      cities: [
        { name: "Riyadh", note: "Capital with many corporate and government groups" },
        { name: "Jeddah", note: "Western commercial city and a main air gateway" },
        { name: "Makkah", note: "Holy city with large seasonal group travel" },
        { name: "Madinah", note: "Holy city with visitor and pilgrim groups" },
        { name: "Dammam", note: "Eastern Province city with industrial staff transport" },
        { name: "Abha", note: "Asir city for tourism and regional business trips" },
      ],
    },
    faqs: [
      { q: "Do you provide group transport across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Send your group size, the route and the schedule, and we confirm whether we can arrange it." },
      { q: "What is the difference between passenger transport and taxi service?", a: "Passenger transport is planned for groups, staff or a set schedule. A taxi or private car is for individual rides. Both are available, and each has its own page." },
    ],
    images: [
      { slot: "passenger-transport", alt: "A passenger van waiting at a corporate entrance in Saudi Arabia", label: "Expected image: passenger-transport.webp" },
      { slot: "passenger-group-transfer", alt: "A group of travellers boarding a passenger vehicle", label: "Expected image: passenger-group-transfer.webp" },
      { slot: "passenger-intercity-travel", alt: "A passenger vehicle on a highway between Saudi cities", label: "Expected image: passenger-intercity-travel.webp" },
    ],
    layout: { hero: "split", includes: "tiles", steps: "chevrons", usecases: "navy", planning: "table", aside: "band", order: ["overview", "audience", "how", "includes", "usecases", "coverage", "planning", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to arrange passenger transport. There are [number] passengers, the trip is from [place and city] to [place and city], on [date and time], and I need a return at [time].",
    cta: { heading: "Plan your group transport", text: "Send the number of passengers, the route and the schedule. We confirm the arrangement and the fare before you commit." },
  },

  "taxi-cab-services": {
    primary: "Taxi Services Saudi Arabia",
    secondary: ["Taxi Service Saudi Arabia", "Private Taxi Services", "Corporate Taxi Transportation", "City-to-City Taxi Service", "Airport Taxi Transportation", "Business Taxi Services", "Private Car with Driver", "Taxi Booking Services"],
    metaTitle: "Taxi Services Saudi Arabia: Private Rides and Airport",
    metaDescription: "Taxi services in Saudi Arabia: city rides, airport transfers and trips between cities. Send your route and time on WhatsApp and the fare is confirmed first.",
    h1: "Taxi Services in Saudi Arabia",
    lead: "Private taxi rides in cities, to airports and between cities. Message us your pickup, destination and time, and we confirm the vehicle, driver and fare before you commit.",
    directAnswer: "Taxi services in Saudi Arabia are rides by car between a pickup point and a destination. Gulf Elite Transport Group arranges rides within cities, to and from airports, and between cities. You tell us where, when and how many people, and we confirm the vehicle, driver and fare before you commit. Fares, journey times and availability are not published and are confirmed for each request.",
    intro: [
      "Taxi services in Saudi Arabia range from a short city ride to a long drive between regions. Gulf Elite Transport Group takes bookings for private taxi rides in cities, airport transfers and intercity trips, and every booking is confirmed with you before the day. You can book on WhatsApp or through the booking form.",
      "This is the overview of our taxi and cab work. For a specific place, use the city, area and airport pages, which list real roads and destinations. [Riyadh taxi service](/riyadh-taxi-service) covers the capital, and the [Saudi Arabia taxi guide](/taxi-saudi-arabia) lists regions, cities, airports and routes. For groups and staff, see [passenger transport](/services/passenger-transport).",
    ],
    h2: { overview: "What a taxi and cab service covers", includes: "What you can book", how: "How to book a taxi", coverage: "Taxi rides across Saudi Arabia", planning: "What to send when you book", usecases: "When people book a private taxi", faq: "Taxi services in Saudi Arabia: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia, including taxi and cab rides in major cities, at airports and on intercity routes. Each city has its own page, with its own districts, roads and places.",
        "We do not publish standard fares or journey times. The fare is quoted for your request and you confirm it before you commit. Where a city has no page yet, you can still send us a request.",
      ],
      cities: [
        { name: "Riyadh", note: "Capital city with district pages and airport transfers" },
        { name: "Jeddah", note: "Western city with a major airport and Red Sea coast" },
        { name: "Dammam", note: "Eastern Province city, close to Al Khobar" },
        { name: "Makkah", note: "Holy city, with Umrah and Hajj travel covered on its own pages" },
        { name: "Madinah", note: "Holy city and a regional centre" },
        { name: "Al Khobar", note: "Business and residential city in the Eastern Province" },
      ],
    },
    faqs: [
      { q: "Where can I book a taxi in Saudi Arabia?", a: "Gulf Elite Transport Group provides taxi and cab rides across Saudi Arabia. Browse the city, area and airport pages, or send us your pickup and destination directly." },
      { q: "How is this page different from the taxi guide to Saudi Arabia?", a: "This is the overview of the taxi service. The taxi guide lists regions, cities, airports and intercity routes, each with its own details. Use whichever you need." },
    ],
    images: [
      { slot: "taxi-cab-services", alt: "A private car and driver waiting at a kerb in a Saudi city", label: "Expected image: taxi-cab-services.webp" },
      { slot: "taxi-airport-pickup-saudi", alt: "A driver helping a traveller with luggage at an airport kerb", label: "Expected image: taxi-airport-pickup-saudi.webp" },
      { slot: "taxi-intercity-saudi-arabia", alt: "A private car on a highway between two Saudi cities", label: "Expected image: taxi-intercity-saudi-arabia.webp" },
    ],
    layout: { hero: "ledger", includes: "cards", steps: "grid", usecases: "columns", planning: "cards", aside: "sticky", order: ["overview", "how", "includes", "coverage", "usecases", "planning", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to book a taxi. My pickup is [place and city], my destination is [place and city], the date and time are [date and time], and there are [number] passengers and [number] bags.",
    cta: { heading: "Book your ride", text: "Send your pickup, destination, date and time. We confirm the vehicle, driver and fare before you commit." },
  },

  "equipment-machinery-moving": {
    primary: "Heavy Equipment Transportation Saudi Arabia",
    secondary: ["Machinery Moving Services", "Industrial Equipment Transportation", "Heavy Machinery Transport Company", "Equipment Relocation Services", "Construction Equipment Transportation", "Oversized Equipment Transport", "Industrial Machinery Moving", "Heavy Load Transportation"],
    metaTitle: "Heavy Equipment Transportation Saudi Arabia",
    metaDescription: "Heavy equipment transportation in Saudi Arabia: machinery and construction equipment moved to sites and yards. Share weight, size and access for a plan.",
    h1: "Heavy Equipment Transportation in Saudi Arabia",
    lead: "Machines and equipment need a vehicle, a route and a loading plan that match their weight and size. Send the details early and we assess the move.",
    directAnswer: "Heavy equipment transportation in Saudi Arabia is the movement of machinery and equipment that is too heavy, large or awkward for ordinary freight. Gulf Elite Transport Group asks for the weight, the dimensions, the loading method and the access at both ends, and confirms individually what can be supported before a quotation is agreed.",
    intro: [
      "Heavy equipment transportation in Saudi Arabia starts with numbers: weight, length, width and height. Those four figures decide the vehicle, the route and whether any permits or escorts are needed. Gulf Elite Transport Group asks for them first and confirms what it can support.",
      "Equipment moves are often a part of a larger site programme. Multi-stage projects with many deliveries are covered under [industrial and project logistics](/services/industrial-project-logistics), while vehicles that can be driven or loaded on a car carrier fall under [vehicle transportation](/services/vehicle-transportation). Smaller loads can use ordinary [freight transport](/services/freight-cargo-transport).",
    ],
    h2: { overview: "What equipment and machinery moving covers", includes: "What an equipment transport request can include", how: "How a heavy equipment move is planned", coverage: "Equipment moves across Saudi Arabia", planning: "Details to confirm before an equipment move", usecases: "Equipment that is moved", faq: "Heavy equipment transport: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia, including moves to project sites that are far from main cities. Roads, bridges and access points on the route affect what is possible.",
        "We do not claim a heavy-haul fleet, escorts or permits. For each move we confirm what can be supported, and permit or escort needs are discussed before a quotation is agreed.",
      ],
      cities: [
        { name: "Riyadh", note: "Large construction and infrastructure market in the central region" },
        { name: "Jubail", note: "Industrial city with plants and heavy equipment" },
        { name: "Yanbu", note: "Industrial and port city on the Red Sea" },
        { name: "Dammam", note: "Eastern Province hub for industry and oil services" },
        { name: "Tabuk", note: "Northwest region with large development projects" },
        { name: "Jazan", note: "South-west city with port and economic-zone activity" },
      ],
    },
    faqs: [
      { q: "Can you move heavy equipment across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Send the weight, the dimensions and the route, and we confirm whether we can support the move." },
      { q: "Do you arrange permits and escorts?", a: "We do not assume them. If your load needs permits or escorts, tell us and we confirm what can be supported and what must be arranged by others." },
    ],
    images: [
      { slot: "equipment-machinery-moving", alt: "An excavator on a low-loader trailer", label: "Expected image: equipment-machinery-moving.webp" },
      { slot: "equipment-loading-ramp-securing", alt: "Heavy machinery being secured on a trailer with chains", label: "Expected image: equipment-loading-ramp-securing.webp" },
      { slot: "heavy-equipment-project-site", alt: "A trailer carrying a machine into a project site", label: "Expected image: heavy-equipment-project-site.webp" },
    ],
    layout: { hero: "band", includes: "ledger", steps: "chevrons", usecases: "navy", planning: "split", aside: "sticky", order: ["overview", "planning", "includes", "how", "usecases", "coverage", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to ask about moving equipment. It is a [machine type], weighing about [weight] with dimensions [length, width, height], from [place and city] to [place and city], around [date].",
    cta: { heading: "Send the equipment details", text: "Weight, size, loading method and both sites. We reply with an assessment or the questions we need answered." },
  },

  "industrial-project-logistics": {
    primary: "Industrial Logistics Services Saudi Arabia",
    secondary: ["Industrial Project Logistics", "Project Cargo Transportation", "Industrial Transportation Solutions", "Project Logistics Company Saudi Arabia", "Heavy Project Cargo", "Industrial Cargo Management", "Specialized Project Transportation", "Large-Scale Logistics Services"],
    metaTitle: "Industrial Logistics Services Saudi Arabia",
    metaDescription: "Industrial logistics services in Saudi Arabia for project teams: planned transport of machinery and materials to site. Outline your project for a plan.",
    h1: "Industrial Logistics Services in Saudi Arabia",
    lead: "Project sites need equipment and materials in the right order. Outline the project and the delivery stages, and we assess how the transport can be planned.",
    directAnswer: "Industrial logistics services in Saudi Arabia plan and coordinate the transport for projects where machinery, equipment and materials arrive at a site over time. Gulf Elite Transport Group helps project teams outline their transport needs and confirms individually what can be supported before a quotation is agreed.",
    intro: [
      "Industrial logistics services in Saudi Arabia are about sequence. A plant build or site upgrade rarely needs everything at once: foundations come before machines, and machines come before the finishing items. Gulf Elite Transport Group helps project teams outline the delivery stages and confirms what it can support.",
      "Project transport usually combines several services. Heavy single moves are covered under [heavy equipment transportation](/services/equipment-machinery-moving), holding materials before they are needed under [warehousing and storage](/services/warehousing-storage), and long-term vehicle needs under [contract fleet services](/services/contract-fleet-services).",
    ],
    h2: { overview: "What industrial and project logistics means", includes: "What a project logistics request can include", how: "How project transport is planned", coverage: "Industrial logistics across Saudi Arabia", planning: "What a project team should prepare", usecases: "Projects that need logistics planning", faq: "Industrial logistics: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Industrial projects often sit away from city centres, so distance, site access and delivery windows shape the plan.",
        "We do not claim project references, site facilities or fixed schedules. For each project we confirm what we can support and which parts you or other contractors handle.",
      ],
      cities: [
        { name: "Jubail", note: "Industrial city on the Gulf coast with a large cluster of plants" },
        { name: "Yanbu", note: "Industrial city and port on the Red Sea" },
        { name: "Dammam", note: "Eastern Province centre for oil and industrial services" },
        { name: "Riyadh", note: "Central region with industrial zones and large developments" },
        { name: "Jazan", note: "South-west city with an economic zone and port" },
        { name: "Tabuk", note: "Northwest region with major development projects" },
      ],
    },
    faqs: [
      { q: "Do you support industrial projects across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Outline your project, the sites and the delivery stages, and we confirm what we can support." },
      { q: "What is the difference between project logistics and freight?", a: "Freight is one load between two places. Project logistics plans many deliveries over time to a site, with timing and order that depend on the project programme." },
    ],
    images: [
      { slot: "industrial-project-logistics", alt: "Industrial equipment delivered to a plant construction site", label: "Expected image: industrial-project-logistics.webp" },
      { slot: "industrial-project-delivery-schedule", alt: "A project coordinator reviewing a delivery schedule at a site office", label: "Expected image: industrial-project-delivery-schedule.webp" },
      { slot: "industrial-logistics-saudi-sites", alt: "A convoy of trucks heading to an industrial site", label: "Expected image: industrial-logistics-saudi-sites.webp" },
    ],
    layout: { hero: "banner", includes: "cards", steps: "timeline", usecases: "list", planning: "table", aside: "sticky", order: ["overview", "how", "usecases", "includes", "planning", "coverage", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to discuss transport for an industrial project. The site is in [city], the project involves [type of equipment or materials], the delivery stages are [dates], and my contact is [name].",
    cta: { heading: "Outline your project", text: "Share the site, the materials and the delivery stages. We tell you what we can support." },
  },

  "packaging-cargo-handling": {
    primary: "Cargo Handling Services Saudi Arabia",
    secondary: ["Cargo Packaging Services", "Freight Packaging Solutions", "Commercial Cargo Handling", "Goods Handling Services", "Shipment Preparation Services", "Cargo Loading and Unloading", "Transport Packaging Solutions", "Freight Handling Company"],
    metaTitle: "Cargo Handling Services Saudi Arabia",
    metaDescription: "Cargo handling services in Saudi Arabia: packing, loading, securing and unloading around your transport. Describe your goods and we confirm what we support.",
    h1: "Cargo Handling Services in Saudi Arabia",
    lead: "How cargo is packed, loaded and secured decides how it arrives. Describe the goods and the sites, and we confirm which handling steps we can support.",
    directAnswer: "Cargo handling services in Saudi Arabia coordinate how goods are packed, loaded, secured and unloaded around their transport. Gulf Elite Transport Group asks for the cargo and the locations and confirms individually what can be supported. Packing materials, handling equipment and labour are not assumed and are agreed for each request.",
    intro: [
      "Cargo handling services in Saudi Arabia cover the work around the drive: packing the goods, loading them in a safe order, securing them for the road and unloading them at the other end. Gulf Elite Transport Group asks about the cargo and both sites first, because access and equipment decide what is possible.",
      "Handling is rarely the only service. Goods that then travel between cities use [freight transport](/services/freight-cargo-transport), home and office items fit [furniture and household moving](/services/furniture-household-moving), and goods moving for an event may need [exhibition logistics](/services/trade-show-exhibition-logistics).",
    ],
    h2: { overview: "What cargo handling involves", includes: "What a cargo handling request can include", how: "How handling is arranged around transport", coverage: "Cargo handling across Saudi Arabia", planning: "What to confirm about your cargo", usecases: "When cargo handling matters", faq: "Cargo handling: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Handling needs depend on the sites at each end, so we ask about docks, lifts, gates and unloading space.",
        "We do not assume that packing materials, forklifts or labour are included, and we do not claim handling facilities in any city. We confirm what can be supported for each request and what is quoted separately.",
      ],
      cities: [
        { name: "Riyadh", note: "Central region with many warehouses, shops and offices" },
        { name: "Jeddah", note: "Port city where goods are often unloaded and repacked" },
        { name: "Dammam", note: "Eastern Province city with industrial and port cargo" },
        { name: "Al Khobar", note: "Business city where offices and retail move goods often" },
        { name: "Madinah", note: "Holy city that receives goods for retail and hospitality" },
        { name: "Buraydah", note: "Qassim city with agricultural and food cargo" },
      ],
    },
    faqs: [
      { q: "Is cargo handling available across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Tell us the cargo and the sites, and we confirm which handling steps we can support." },
      { q: "Do you provide packing materials and labour?", a: "We do not assume them. If you need packing materials or loading labour, say so in your request and we confirm what can be supported and what is priced separately." },
    ],
    images: [
      { slot: "packaging-cargo-handling", alt: "Workers wrapping palletised cargo before transport", label: "Expected image: packaging-cargo-handling.webp" },
      { slot: "cargo-loading-unloading-dock", alt: "Cargo being unloaded from a truck at a dock", label: "Expected image: cargo-loading-unloading-dock.webp" },
      { slot: "cargo-securing-for-road", alt: "Straps securing a pallet load on a truck bed", label: "Expected image: cargo-securing-for-road.webp" },
    ],
    layout: { hero: "centered", includes: "tiles", steps: "grid", usecases: "columns", planning: "cards", aside: "band", order: ["overview", "includes", "planning", "how", "coverage", "usecases", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to ask about cargo handling. The goods are [description, weight and packing], the pickup is [place and city], the delivery is [place and city], and I need [packing / loading / securing / unloading].",
    cta: { heading: "Describe your cargo", text: "Send the goods, the packing, the two sites and the handling you need. We confirm what can be supported." },
  },
};
