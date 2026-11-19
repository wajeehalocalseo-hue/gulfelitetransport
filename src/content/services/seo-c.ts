import type { ServiceSeo } from "./seo-types";

/** Services 13 to 18: exhibitions, contract fleet, last mile, distribution, warehousing, automotive. */
export const seoC: Record<string, ServiceSeo> = {
  "trade-show-exhibition-logistics": {
    primary: "Exhibition Logistics Services Saudi Arabia",
    secondary: ["Trade Show Logistics", "Exhibition Transportation Services", "Event Cargo Transportation", "Exhibition Equipment Transport", "Trade Fair Logistics Company", "Event Logistics Services", "Exhibition Material Handling", "Exhibition Freight Solutions"],
    metaTitle: "Exhibition Logistics Services Saudi Arabia",
    metaDescription: "Exhibition logistics services in Saudi Arabia: booth materials and event equipment delivered to the venue on time and collected after. Send your set-up dates.",
    h1: "Exhibition Logistics Services in Saudi Arabia",
    lead: "Booth materials have to reach the hall before set-up closes and leave after the show. Send the venue, the dates and the items, and we plan the transport around them.",
    directAnswer: "Exhibition logistics services in Saudi Arabia transport booth materials, display items and event equipment to an exhibition or event venue, and back again afterwards. Gulf Elite Transport Group plans the delivery around your set-up time and the venue's rules and provides a quotation before you commit. Installation and stand building are not assumed.",
    intro: [
      "Exhibition logistics services in Saudi Arabia are built around a timetable that does not move: set-up days, the show itself and the dismantling window. Gulf Elite Transport Group plans delivery and collection around those dates and around the venue's access rules.",
      "Exhibition cargo often needs more than a truck. Items that need careful packing are covered under [cargo handling](/services/packaging-cargo-handling), and goods that must reach the venue from another city use [freight transport](/services/freight-cargo-transport). If a late item is needed for the stand, [express delivery](/services/express-urgent-delivery) may help.",
    ],
    h2: { overview: "What exhibition and trade show logistics covers", includes: "What an exhibition transport request can include", how: "How exhibition transport is timed", coverage: "Exhibition and event logistics across Saudi Arabia", planning: "Details to confirm with the organiser", usecases: "Who uses exhibition logistics", faq: "Exhibition logistics: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Exhibitions and events take place in several cities, and the venue's loading rules, gates and time slots differ from one to another.",
        "We do not claim a relationship with any venue or organiser. For each event we ask for the venue's access instructions and confirm what we can support within them.",
      ],
      cities: [
        { name: "Riyadh", note: "Capital with the largest number of exhibitions and conferences" },
        { name: "Jeddah", note: "Western city with a busy events calendar" },
        { name: "Dammam", note: "Eastern Province city with industrial and trade events" },
        { name: "Al Khobar", note: "Business city close to Dammam with conferences and shows" },
        { name: "Makkah", note: "Holy city with seasonal events and hospitality exhibitions" },
        { name: "Madinah", note: "Holy city that hosts regional and religious tourism events" },
      ],
    },
    faqs: [
      { q: "Do you deliver exhibition materials to venues across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Send the venue, the set-up and dismantling dates and the items, and we confirm what we can support." },
      { q: "Do you build or install stands?", a: "No, we do not assume stand building or installation. Our service is the transport of materials and equipment to the venue and back." },
    ],
    images: [
      { slot: "trade-show-exhibition-logistics", alt: "Exhibition crates and display panels waiting at a venue loading area", label: "Expected image: trade-show-exhibition-logistics.webp" },
      { slot: "exhibition-setup-delivery-window", alt: "A delivery truck backed up to an exhibition hall loading door", label: "Expected image: exhibition-setup-delivery-window.webp" },
      { slot: "exhibition-event-cargo-saudi", alt: "Event equipment loaded for transport after a show", label: "Expected image: exhibition-event-cargo-saudi.webp" },
    ],
    layout: { hero: "ledger", includes: "ledger", steps: "timeline", usecases: "navy", planning: "split", aside: "band", order: ["overview", "how", "planning", "includes", "usecases", "coverage", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I need transport for an exhibition. The event is at [venue and city], set-up is on [date], dismantling is on [date], and the items are [description and approximate volume].",
    cta: { heading: "Plan your exhibition transport", text: "Send the venue, the set-up and dismantling dates, and the items. We plan the transport around them." },
  },

  "contract-fleet-services": {
    primary: "Contract Fleet Services Saudi Arabia",
    secondary: ["Fleet Transportation Services", "Dedicated Fleet Solutions", "Long-Term Transport Contracts", "Business Fleet Management", "Corporate Transportation Contracts", "Dedicated Vehicle Transportation", "Commercial Fleet Solutions", "Contract Logistics Services"],
    metaTitle: "Contract Fleet Services Saudi Arabia",
    metaDescription: "Contract fleet services in Saudi Arabia for businesses with regular transport needs: dedicated vehicles on a monthly or longer contract. Describe your needs.",
    h1: "Contract Fleet Services in Saudi Arabia",
    lead: "If your business moves goods or people on a routine, a standing arrangement can be simpler than booking each job. Describe the routine and we assess a contract.",
    directAnswer: "Contract fleet services in Saudi Arabia are dedicated vehicles arranged for a business on a monthly or longer agreement, instead of booking each trip. Gulf Elite Transport Group asks for the routes, the schedule and the vehicle needs and confirms individually what can be supported before a quotation is agreed. Fleet size and vehicle types are confirmed for each contract.",
    intro: [
      "Contract fleet services in Saudi Arabia suit businesses that move on a pattern: the same routes, the same days, the same type of load or passenger. Gulf Elite Transport Group asks about that pattern and confirms whether it can support a standing arrangement.",
      "A contract is worth discussing when you would otherwise book similar jobs again and again. One-off loads remain a [freight transport](/services/freight-cargo-transport) request. Regular supply runs to shops are covered under [commercial distribution](/services/commercial-distribution-services). Staff and group routes can be set up under [passenger transport](/services/passenger-transport).",
    ],
    h2: { overview: "What a contract fleet arrangement means", includes: "What a contract fleet request can include", how: "How a fleet contract is set up", coverage: "Contract transport across Saudi Arabia", planning: "What to prepare before discussing a contract", usecases: "Businesses that use contract fleets", faq: "Contract fleet services: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. A contract can be built around one city, a corridor between two cities or a wider regional pattern.",
        "We do not publish fleet size, vehicle numbers or standard contract prices. We confirm what can be supported for your routes and your schedule before you accept a quotation.",
      ],
      cities: [
        { name: "Riyadh", note: "Central region with many corporate and distribution routines" },
        { name: "Jeddah", note: "Western commercial hub with port and retail traffic" },
        { name: "Dammam", note: "Eastern Province base for industry and services" },
        { name: "Jubail", note: "Industrial city with plants and contractors" },
        { name: "Yanbu", note: "Industrial and port city" },
        { name: "Tabuk", note: "Northwest region with project and staff transport needs" },
      ],
    },
    faqs: [
      { q: "Can you provide a dedicated fleet across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Describe your routes, schedule and vehicle needs, and we confirm what a contract could cover." },
      { q: "How is a contract different from booking each trip?", a: "A contract sets a routine for a period, so you do not rebuild the arrangement each time. Booking each trip suits one-off jobs. We can discuss which fits your volumes." },
    ],
    images: [
      { slot: "contract-fleet-services", alt: "A row of commercial vehicles parked at a business site", label: "Expected image: contract-fleet-services.webp" },
      { slot: "contract-fleet-route-schedule", alt: "A transport manager reviewing a route schedule", label: "Expected image: contract-fleet-route-schedule.webp" },
      { slot: "contract-fleet-saudi-corridors", alt: "A fleet vehicle on a highway in Saudi Arabia", label: "Expected image: contract-fleet-saudi-corridors.webp" },
    ],
    layout: { hero: "split", includes: "cards", steps: "chevrons", usecases: "list", planning: "table", aside: "band", order: ["overview", "audience", "includes", "how", "planning", "usecases", "coverage", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to discuss a contract fleet. Our routine is [routes and days], the load or passengers are [description], the contract period is [months], and we are based in [city].",
    cta: { heading: "Discuss a fleet contract", text: "Send your routes, your schedule and the vehicle types you need. We tell you what a contract could cover." },
  },

  "last-mile-delivery": {
    primary: "Last Mile Delivery Services Saudi Arabia",
    secondary: ["Last Mile Logistics", "Final Mile Delivery Services", "Business Delivery Solutions", "E-commerce Delivery Services", "Door-to-Door Cargo Delivery", "Local Distribution Services", "Last Mile Transportation Company", "Customer Delivery Solutions"],
    metaTitle: "Last Mile Delivery Services Saudi Arabia",
    metaDescription: "Last mile delivery services in Saudi Arabia for businesses: orders and goods delivered to customers' doors from a pickup point. Describe your volumes.",
    h1: "Last Mile Delivery Services in Saudi Arabia",
    lead: "The last step is the one customers see. Tell us where your orders start, who receives them and how many a day, and we assess a delivery plan.",
    directAnswer: "Last mile delivery services in Saudi Arabia are the final step of getting goods from a pickup point or store to the customer's door. Gulf Elite Transport Group asks about the pickup point, the delivery area and the volumes and confirms individually what can be supported before a quotation is agreed. Delivery times are confirmed for each arrangement.",
    intro: [
      "Last mile delivery services in Saudi Arabia are where a business meets its customers. A late or missed delivery is remembered, so the plan has to cover pickup times, delivery addresses and what happens when nobody is home. Gulf Elite Transport Group asks about those points first.",
      "Last-mile delivery is the final step only. The supply run that fills a shop or warehouse belongs under [commercial distribution](/services/commercial-distribution-services), and one load that cannot wait is an [express delivery](/services/express-urgent-delivery) request. Delivering furniture to a customer's home may need [furniture moving](/services/furniture-household-moving).",
    ],
    h2: { overview: "What last-mile delivery means", includes: "What a last-mile delivery request can include", how: "How last-mile deliveries are planned", coverage: "Delivery to customers across Saudi Arabia", planning: "What to confirm for door-to-door delivery", usecases: "Who uses last-mile delivery", faq: "Last-mile delivery: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Last-mile work is local by nature, so each delivery area is looked at on its own: its size, its road network and the hours customers are home.",
        "We do not publish delivery areas, same-day promises or per-order prices. We confirm what we can support for your pickup point and your customer area before you commit.",
      ],
      cities: [
        { name: "Riyadh", note: "Large metropolitan area where deliveries cover long distances inside one city" },
        { name: "Jeddah", note: "Western city with busy retail and residential districts" },
        { name: "Dammam", note: "Eastern Province city with dense residential areas" },
        { name: "Al Khobar", note: "Business and residential city connected to Dammam" },
        { name: "Makkah", note: "Holy city with seasonal peaks in demand" },
        { name: "Buraydah", note: "Qassim city with a large local market" },
      ],
    },
    faqs: [
      { q: "Do you deliver to customers across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Send your pickup point, the delivery area and your daily volume, and we confirm what we can support." },
      { q: "Is last-mile delivery the same as express delivery?", a: "No. Last-mile delivery is the regular final step for orders. Express delivery is a priority run for one urgent load. Which one you need depends on whether the job is routine or urgent." },
    ],
    images: [
      { slot: "last-mile-delivery", alt: "A delivery van at a customer's door with a parcel", label: "Expected image: last-mile-delivery.webp" },
      { slot: "last-mile-parcel-loading", alt: "Parcels sorted and loaded into a delivery van", label: "Expected image: last-mile-parcel-loading.webp" },
      { slot: "last-mile-city-delivery-saudi", alt: "A delivery vehicle in a residential street of a Saudi city", label: "Expected image: last-mile-city-delivery-saudi.webp" },
    ],
    layout: { hero: "light-image", includes: "tiles", steps: "timeline", usecases: "columns", planning: "cards", aside: "sticky", order: ["overview", "how", "includes", "usecases", "planning", "coverage", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to ask about last-mile delivery. Our goods are [type], we deliver about [number] orders a day in [city or area], and the pickup point is [place].",
    cta: { heading: "Plan your deliveries", text: "Share the pickup point, the delivery area and your daily volume. We tell you what we can support." },
  },

  "commercial-distribution-services": {
    primary: "Commercial Distribution Services Saudi Arabia",
    secondary: ["Commercial Goods Distribution", "Business Distribution Logistics", "Retail Distribution Services", "B2B Distribution Solutions", "Product Distribution Transportation", "Wholesale Goods Transportation", "Commercial Delivery Network", "Distribution Logistics Company"],
    metaTitle: "Commercial Distribution Services Saudi Arabia",
    metaDescription: "Commercial distribution services in Saudi Arabia: scheduled supply runs from a warehouse or supplier to shops and business customers. Outline your routes.",
    h1: "Commercial Distribution Services in Saudi Arabia",
    lead: "Regular supply runs from your warehouse or supplier to shops, branches and business customers. Outline the stops and the schedule, and we assess a distribution plan.",
    directAnswer: "Commercial distribution services in Saudi Arabia are scheduled deliveries of goods from a supplier or warehouse to several shops, branches or business customers. Gulf Elite Transport Group asks about the stops, the schedule and the goods and confirms individually what can be supported before a quotation is agreed.",
    intro: [
      "Commercial distribution services in Saudi Arabia are repeat runs: the same supplier, many receivers, and a timetable that shops depend on. Gulf Elite Transport Group asks about the stops, the days and the goods, then confirms whether it can support the pattern.",
      "Distribution sits between supply and delivery to a customer's door. A standing arrangement for vehicles is covered under [contract fleet services](/services/contract-fleet-services), the final delivery step under [last-mile delivery](/services/last-mile-delivery), and holding stock before it ships under [warehousing and storage](/services/warehousing-storage).",
    ],
    h2: { overview: "What commercial distribution covers", includes: "What a distribution request can include", how: "How a distribution plan is set up", coverage: "Distribution across Saudi Arabia", planning: "What to prepare for a distribution plan", usecases: "Businesses that use distribution services", faq: "Commercial distribution: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia, so a distribution round can cover one city or link several regions. Longer rounds need more planning for timing and unloading at each stop.",
        "We do not publish distribution networks, depot locations or delivery-day promises. Each plan is confirmed for your stops and your schedule before you commit.",
      ],
      cities: [
        { name: "Riyadh", note: "Central hub for retail and wholesale distribution" },
        { name: "Jeddah", note: "Western hub where imported goods enter the market" },
        { name: "Dammam", note: "Eastern Province hub for supply to the Gulf coast" },
        { name: "Buraydah", note: "Qassim city that serves farms and northern retail" },
        { name: "Abha", note: "Asir city for supply to the south-west mountains" },
        { name: "Hail", note: "Northern city for supply across the north" },
      ],
    },
    faqs: [
      { q: "Can you run distribution rounds across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Outline your stops, schedule and goods, and we confirm what we can support." },
      { q: "How is distribution different from freight?", a: "Freight is one load between two places. Distribution is a repeated round with several stops, usually on a fixed schedule." },
    ],
    images: [
      { slot: "commercial-distribution-services", alt: "A distribution truck loaded with boxed goods at a warehouse door", label: "Expected image: commercial-distribution-services.webp" },
      { slot: "commercial-distribution-store-delivery", alt: "Boxes being delivered to the back door of a store", label: "Expected image: commercial-distribution-store-delivery.webp" },
      { slot: "commercial-distribution-saudi-network", alt: "A distribution truck on a road linking Saudi cities", label: "Expected image: commercial-distribution-saudi-network.webp" },
    ],
    layout: { hero: "banner", includes: "ledger", steps: "grid", usecases: "navy", planning: "split", aside: "sticky", order: ["overview", "includes", "usecases", "how", "coverage", "audience", "planning", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to discuss commercial distribution. We supply [goods] from [warehouse or supplier city] to about [number] stops in [cities], on [days].",
    cta: { heading: "Outline your distribution routes", text: "Send the goods, the stops and the days. We confirm what we can support." },
  },

  "warehousing-storage": {
    primary: "Warehousing and Storage Services Saudi Arabia",
    secondary: ["Warehouse Storage Services", "Commercial Warehousing", "Logistics Storage Solutions", "Goods Storage Services", "Inventory Storage Solutions", "Business Warehousing Services", "Cargo Storage Facilities", "Warehouse Logistics Company"],
    metaTitle: "Warehousing and Storage Services Saudi Arabia",
    metaDescription: "Warehousing and storage services in Saudi Arabia: holding goods between receipt and onward movement. Describe your goods and storage period to see options.",
    h1: "Warehousing and Storage Services in Saudi Arabia",
    lead: "Goods often wait between arrival and the next move. Describe what you store, for how long and how it leaves, and we confirm what can be supported.",
    directAnswer: "Warehousing and storage services in Saudi Arabia hold goods for a period between receipt and onward movement. Gulf Elite Transport Group helps customers describe their storage requirement and confirms individually what can be supported, including how stored goods connect to onward transport. Storage locations and capacity are confirmed for each request.",
    intro: [
      "Warehousing and storage services in Saudi Arabia are a link in a longer chain. Goods arrive, wait and then move on, and the storage period, the handling and the exit plan all affect the cost. Gulf Elite Transport Group asks for those details first and confirms what it can support.",
      "Storage is rarely a separate matter. Stock that leaves for shops is covered by [commercial distribution](/services/commercial-distribution-services), temperature-controlled goods may need [refrigerated transport](/services/refrigerated-transportation), and goods that must be unpacked or sorted on arrival relate to [cargo handling](/services/packaging-cargo-handling).",
    ],
    h2: { overview: "What warehousing and storage means", includes: "What a storage request can include", how: "How storage is arranged with transport", coverage: "Storage and onward movement across Saudi Arabia", planning: "What to describe about your goods", usecases: "Who needs warehousing and storage", faq: "Warehousing and storage: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia, and storage requests are linked to where the goods come from and where they go next. A request in one city can be tied to transport in and out.",
        "We do not publish warehouse addresses, capacity or temperature zones, and we do not claim facilities in any particular city. We confirm what can be supported for your goods, period and location before you commit.",
      ],
      cities: [
        { name: "Riyadh", note: "Central region with many storage needs for retail and trade" },
        { name: "Jeddah", note: "Port city where imports wait before onward movement" },
        { name: "Dammam", note: "Gulf port city that serves the Eastern Province" },
        { name: "Jubail", note: "Industrial city where plants and contractors store materials" },
        { name: "Yanbu", note: "Industrial and port city on the Red Sea" },
        { name: "Buraydah", note: "Qassim city with agricultural and food goods" },
      ],
    },
    faqs: [
      { q: "Do you provide storage across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Describe your goods, the storage period and the location you need, and we confirm what we can support." },
      { q: "Where are your warehouses?", a: "We do not publish warehouse locations on this page. Storage is confirmed for each request, including where it can be arranged." },
    ],
    images: [
      { slot: "warehousing-storage", alt: "Palletised goods on racks inside a warehouse", label: "Expected image: warehousing-storage.webp" },
      { slot: "warehousing-inventory-handling", alt: "A worker checking inventory on shelving", label: "Expected image: warehousing-inventory-handling.webp" },
      { slot: "warehousing-onward-dispatch", alt: "A truck being loaded at a warehouse dispatch bay", label: "Expected image: warehousing-onward-dispatch.webp" },
    ],
    layout: { hero: "ledger", includes: "cards", steps: "chevrons", usecases: "columns", planning: "table", aside: "band", order: ["overview", "how", "includes", "planning", "coverage", "usecases", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to ask about storage. The goods are [type, volume and packing], I need storage in [city] for about [period], and they will leave by [transport].",
    cta: { heading: "Describe your storage requirement", text: "Send the goods, the volume, the period and the location. We confirm what can be supported." },
  },

  "spare-parts-automotive-logistics": {
    primary: "Automotive Logistics Services Saudi Arabia",
    secondary: ["Spare Parts Transportation", "Automotive Parts Logistics", "Auto Parts Delivery Services", "Automotive Supply Chain Logistics", "Vehicle Spare Parts Distribution", "Automotive Cargo Transportation", "Spare Parts Distribution Services", "Automotive Freight Solutions"],
    metaTitle: "Automotive Logistics Services Saudi Arabia",
    metaDescription: "Automotive logistics services in Saudi Arabia: spare parts and supplies moved from suppliers to workshops, dealers and factories. Outline your delivery runs.",
    h1: "Automotive Logistics Services in Saudi Arabia",
    lead: "A workshop that waits for a part loses working time. Tell us where parts start, where they go and how fast, and we plan the runs with you.",
    directAnswer: "Automotive logistics services in Saudi Arabia move vehicle parts, industrial spare parts and maintenance supplies from suppliers to workshops, dealers and factories, either on a schedule or when urgent. Gulf Elite Transport Group plans the pickups and delivery runs with you and provides a quotation before you commit. Urgent delivery times are confirmed per request and are not promised in advance.",
    intro: [
      "Automotive logistics services in Saudi Arabia are about moving the right part to the right place on the right day. A dealer, a workshop or a factory line can stand still without one component, so pickup details, part references and contact names matter. Gulf Elite Transport Group plans these runs with you.",
      "Parts movement is different from moving vehicles. Cars, vans and trucks themselves are covered under [vehicle transportation](/services/vehicle-transportation). An urgent part for a breakdown may need [express delivery](/services/express-urgent-delivery), and regular parts runs to several workshops can use [commercial distribution](/services/commercial-distribution-services).",
    ],
    h2: { overview: "What spare parts and automotive logistics covers", includes: "What an automotive logistics request can include", how: "How parts runs are planned", coverage: "Parts and supplies across Saudi Arabia", planning: "What to confirm for a parts delivery", usecases: "Who uses automotive logistics", faq: "Automotive logistics: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Parts often come from ports and distributors in a few big cities, then go to workshops and dealers across the regions.",
        "We do not claim supplier agreements, parts stock or fixed delivery days. We confirm what we can support for your pickup points, delivery points and schedule before you commit.",
      ],
      cities: [
        { name: "Riyadh", note: "Large vehicle market with many dealers and workshops" },
        { name: "Jeddah", note: "Port city where many imported parts arrive" },
        { name: "Dammam", note: "Eastern Province city with port and industrial demand" },
        { name: "Taif", note: "Western city with a regional vehicle market" },
        { name: "Abha", note: "Asir city, a long route from the main ports" },
        { name: "Buraydah", note: "Qassim city with a large local vehicle market" },
      ],
    },
    faqs: [
      { q: "Do you deliver spare parts across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Send the pickup points, the delivery points and the schedule, and we confirm what we can support." },
      { q: "Can you collect a single urgent part?", a: "Often it can be looked at as an urgent delivery. Delivery times are not promised in advance, and we confirm what is possible when you send the pickup, the delivery point and your deadline." },
    ],
    images: [
      { slot: "spare-parts-automotive-logistics", alt: "Boxed vehicle parts loaded into a delivery van", label: "Expected image: spare-parts-automotive-logistics.webp" },
      { slot: "automotive-parts-workshop-delivery", alt: "A driver handing a parts box to a workshop mechanic", label: "Expected image: automotive-parts-workshop-delivery.webp" },
      { slot: "automotive-supply-saudi-routes", alt: "A parts delivery truck on a road between Saudi cities", label: "Expected image: automotive-supply-saudi-routes.webp" },
    ],
    layout: { hero: "centered", includes: "ledger", steps: "grid", usecases: "list", planning: "cards", aside: "sticky", order: ["overview", "usecases", "includes", "how", "planning", "coverage", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to arrange a parts delivery. The parts are [description, weight and number of boxes], the pickup is [supplier and city], the delivery is [workshop and city], and I need them by [date].",
    cta: { heading: "Plan your parts deliveries", text: "Send the pickup points, the delivery points and your timing. We plan the runs with you." },
  },
};
