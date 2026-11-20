import type { ServiceBase } from "./seo-types";

/** Services 1 to 6: freight and cargo, international forwarding, containers, express, refrigerated, vehicles. */
export const seoA: Record<string, ServiceBase> = {
  "freight-cargo-transport": {
    primary: "Freight Transport Services in Saudi Arabia",
    secondary: ["Cargo Transport Services Saudi Arabia", "Freight Transportation Company Saudi Arabia", "Domestic Freight Services", "Commercial Cargo Transportation", "Business Freight Solutions", "Goods Transportation Services", "Road Freight Services Saudi Arabia", "Nationwide Cargo Delivery"],
    metaTitle: "Freight Transport Services in Saudi Arabia",
    metaDescription: "Freight transport services in Saudi Arabia for businesses: road cargo between cities with planned pickups and delivery windows. Send your load for a quote.",
    h1: "Freight Transport Services in Saudi Arabia",
    lead: "Road freight for businesses across Saudi Arabia. Tell us what you are moving, where it starts and where it must arrive, and we reply with an assessment and a quotation.",
    directAnswer: "Freight transport services in Saudi Arabia move commercial goods by road from a pickup point to a delivery point, inside one city or between cities. Gulf Elite Transport Group coordinates these movements for businesses across the Kingdom: it matches a vehicle to the load, agrees pickup and delivery windows, and sends a quotation before you commit. Availability depends on the route and the date and is confirmed for each request.",
    intro: [
      "Freight transport services in Saudi Arabia cover a lot of ground. A load can leave a factory in Jubail for a store in Riyadh, or go from a Jeddah supplier to a site in Madinah. Gulf Elite Transport Group arranges this kind of domestic road freight for businesses across the Kingdom, and it starts with a clear description of the load.",
      "This page is about moving goods between two points on a planned job. If your goods need to cross a border, see [international freight forwarding](/services/international-freight-forwarding). If you need a port-to-site container run, see [container transportation](/services/container-transportation). For repeat deliveries to many shops or customers, read about [commercial distribution](/services/commercial-distribution-services).",
    ],
    h2: { overview: "What freight and cargo transport covers", includes: "What road freight and cargo services include", how: "How a freight job is arranged", coverage: "Freight across Saudi Arabia", planning: "What to prepare before you request freight transport", usecases: "Where business freight is used", faq: "Freight transport in Saudi Arabia: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia, so a freight request can start and end in different regions. Long-haul runs between the central, western and eastern regions are among the most common questions we hear.",
        "We do not publish fixed routes, transit times or a list of depots. Each job is assessed on its own: the locations, the load and the date decide what can be supported, and we confirm that with you before anything is agreed.",
      ],
      cities: [
        { name: "Riyadh", note: "Capital and a major centre for trade and distribution in the central region" },
        { name: "Jeddah", note: "Western commercial city with a large Red Sea port" },
        { name: "Dammam", note: "Main city of the Eastern Province, close to Gulf ports and industry" },
        { name: "Jubail", note: "Industrial city on the Gulf coast" },
        { name: "Yanbu", note: "Industrial and port city on the Red Sea" },
        { name: "Buraydah", note: "Main city of Qassim, an agricultural region" },
      ],
    },
    faqs: [
      { q: "Do you provide freight transport across Saudi Arabia?", a: "Yes, Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Each freight job is assessed for its own route and date, and availability is confirmed with you before it is agreed." },
      { q: "How is freight different from distribution or last-mile delivery?", a: "Freight moves a load from one point to another. Commercial distribution is a repeated supply run to several shops or customers, and last-mile delivery is the final step to a door. If your job is one load between two places, freight is the right page." },
    ],
    images: [
      { slot: "freight-cargo-transport", alt: "A loaded commercial truck on a Saudi highway", label: "Expected image: freight-cargo-transport.webp" },
      { slot: "freight-cargo-loading-dispatch", alt: "Palletised cargo being loaded onto a truck at a loading dock", label: "Expected image: freight-cargo-loading-dispatch.webp" },
      { slot: "freight-cargo-saudi-arabia-routes", alt: "A freight truck driving between Saudi cities", label: "Expected image: freight-cargo-saudi-arabia-routes.webp" },
    ],
    layout: { hero: "split", includes: "cards", steps: "grid", usecases: "navy", planning: "cards", aside: "sticky", order: ["overview", "includes", "how", "usecases", "coverage", "planning", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like a quotation for freight transport. The cargo is [cargo type, weight and size], the pickup is in [city], the delivery is in [city], and the date is [date].",
    cta: { heading: "Ask about your freight job", text: "Send the cargo, the pickup city, the delivery city and the date. We reply with a quotation or the questions we need answered." },
  },

  "international-freight-forwarding": {
    primary: "International Freight Forwarding Saudi Arabia",
    secondary: ["International Freight Services", "Freight Forwarding Company Saudi Arabia", "Global Cargo Shipping Services", "Import and Export Logistics", "International Cargo Transportation", "Cross-Border Freight Solutions", "International Logistics Services", "Customs Documentation Support"],
    metaTitle: "International Freight Forwarding Saudi Arabia",
    metaDescription: "International freight forwarding from Saudi Arabia: routing, documents and handover for import and export cargo. Describe your shipment for an assessment.",
    h1: "International Freight Forwarding in Saudi Arabia",
    lead: "Import and export cargo needs a plan for each stage: the route, the paperwork and who hands the goods to whom. Describe the shipment and we assess what we can support.",
    directAnswer: "International freight forwarding in Saudi Arabia is the planning and coordination of goods that move between countries, including routing, documents and the handover between each stage. Gulf Elite Transport Group helps businesses describe an import or export shipment and receive an assessment and quotation. Which stages we support, and who is responsible for each, is confirmed in writing for every shipment.",
    intro: [
      "International freight forwarding Saudi Arabia businesses use is mostly about order. Goods leave a supplier, pass a port or border, clear customs and reach a site, and each handover needs the right documents and the right contact. Gulf Elite Transport Group helps customers plan that chain for import and export cargo.",
      "The inland legs of an international move are road jobs. Port-to-depot or port-to-site runs are covered under [container transportation](/services/container-transportation), and ordinary city-to-city loads under [freight transport](/services/freight-cargo-transport). Cargo that needs packing or loading support before it ships may also need [cargo handling](/services/packaging-cargo-handling).",
    ],
    h2: { overview: "What international freight forwarding means", includes: "What an international freight service can include", how: "How an import or export shipment is planned", coverage: "Where international cargo enters and leaves Saudi Arabia", planning: "Documents and details to have ready", usecases: "Who uses international freight forwarding", faq: "International freight forwarding: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia, and international cargo usually has an inland leg at one end or both. The port or border a shipment uses depends on where it comes from, where it is going and what it is.",
        "We do not claim offices, bonded facilities or customs licences at any port. For each shipment we confirm which stages we can support and what the customer, the shipper or other parties handle.",
      ],
      cities: [
        { name: "Jeddah", note: "Major Red Sea port city, often used for cargo to and from the west and Africa" },
        { name: "Dammam", note: "Gulf port city serving the Eastern Province and the central region" },
        { name: "Jubail", note: "Industrial city with port activity on the Gulf coast" },
        { name: "Yanbu", note: "Red Sea industrial port city" },
        { name: "Riyadh", note: "Inland commercial centre where many imports are delivered and many exports begin" },
        { name: "Al Khobar", note: "Eastern Province business city near Dammam" },
      ],
    },
    faqs: [
      { q: "Do you handle shipments to and from every part of Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. For international shipments, the port, border and inland legs are assessed one by one and confirmed in writing." },
      { q: "Do you clear customs?", a: "Customs steps differ for each shipment and each party. We confirm which stages we support and which are handled by you or others before a quotation is agreed. We do not assume customs clearance is included." },
      { q: "What is the difference between freight forwarding and freight transport?", a: "Freight forwarding plans a shipment across borders, including routes and documents. Freight transport is the road movement of goods between two places in the country. Many international shipments need both." },
    ],
    images: [
      { slot: "international-freight-forwarding", alt: "Shipping containers stacked at a port terminal", label: "Expected image: international-freight-forwarding.webp" },
      { slot: "international-freight-documents-handover", alt: "A logistics coordinator checking shipment documents beside cargo", label: "Expected image: international-freight-documents-handover.webp" },
      { slot: "international-freight-saudi-ports", alt: "A cargo ship at a Saudi port berth", label: "Expected image: international-freight-saudi-ports.webp" },
    ],
    layout: { hero: "band", includes: "ledger", steps: "timeline", usecases: "columns", planning: "table", aside: "sticky", order: ["overview", "how", "includes", "coverage", "audience", "usecases", "planning", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like an assessment for an international shipment. It is an [import or export], the goods are [description, weight and volume], the origin is [place], the destination is [place], and the date is [date].",
    cta: { heading: "Describe your international shipment", text: "Send the goods, the origin, the destination and the date. We tell you what we can support and what you or others will handle." },
  },

  "container-transportation": {
    primary: "Container Transportation Services Saudi Arabia",
    secondary: ["Container Transport Company Saudi Arabia", "Shipping Container Transportation", "Container Haulage Services", "Port Container Transport", "Commercial Container Logistics", "Heavy Container Transportation", "Container Delivery Services", "Inland Container Transportation"],
    metaTitle: "Container Transportation Services Saudi Arabia",
    metaDescription: "Container transportation services in Saudi Arabia: road haulage between ports, depots and customer sites. Share the container details for an assessment.",
    h1: "Container Transportation Services in Saudi Arabia",
    lead: "Road moves for shipping containers between a port, a depot and your site. Share the container size, the route and the access details, and we assess the move.",
    directAnswer: "Container transportation services in Saudi Arabia are the road movement of shipping containers between locations such as a port, a depot and a customer's site. Gulf Elite Transport Group helps customers describe a container move and receive an assessment of vehicle suitability, site access and timing, followed by a quotation. Availability depends on the route and date and is confirmed for each request.",
    intro: [
      "Container transportation services in Saudi Arabia are usually about the inland leg of a bigger journey. A container arrives by sea, and someone has to collect it, move it by road and deliver it to a warehouse, a factory or a yard. Gulf Elite Transport Group helps customers plan that road leg.",
      "Container hauling is one part of a wider shipment. The paperwork and routing across borders belong to [international freight forwarding](/services/international-freight-forwarding), while loose or palletised goods between two places are covered by [freight transport](/services/freight-cargo-transport). Very heavy or oversized loads that are not in a standard container may fit [heavy equipment transportation](/services/equipment-machinery-moving).",
    ],
    h2: { overview: "What container transportation involves", includes: "What a container transport service can include", how: "How a container move is arranged", coverage: "Container moves across Saudi Arabia", planning: "What to check before a container is collected", usecases: "Typical container movements", faq: "Container transportation: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Container work often starts at a Red Sea or Gulf port and ends at an inland site, so distance and access matter as much as the container itself.",
        "We do not publish port gate procedures, fixed transit times or depot locations. Port rules and release steps are set by the port and the shipping line, and we ask you for the details we need before we confirm a move.",
      ],
      cities: [
        { name: "Jeddah", note: "Large Red Sea port city; containers move from here to inland sites" },
        { name: "Dammam", note: "Gulf port city and a base for Eastern Province trade" },
        { name: "Jubail", note: "Industrial city with factories that receive and ship containers" },
        { name: "Yanbu", note: "Industrial city and Red Sea port" },
        { name: "Riyadh", note: "Inland destination for many containers arriving from the coast" },
        { name: "Jazan", note: "Port and economic city in the south-west" },
      ],
    },
    faqs: [
      { q: "Can you move containers between Saudi cities?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Send the container size, the pickup and delivery places and the date, and we assess the move and confirm availability." },
      { q: "Who arranges the release at the port?", a: "Release steps are set by the port and the shipping line and are usually handled by the cargo owner or their agent. We ask for the release details we need and confirm what we handle for each move." },
      { q: "Is container transport the same as freight transport?", a: "No. Container transportation is about moving the container itself, often to or from a port. Freight transport is the road movement of loads between two places, whether or not they are in a container." },
    ],
    images: [
      { slot: "container-transportation", alt: "A truck carrying a shipping container on a Saudi road", label: "Expected image: container-transportation.webp" },
      { slot: "container-port-haulage", alt: "A container being lifted onto a trailer at a port yard", label: "Expected image: container-port-haulage.webp" },
      { slot: "container-delivery-site-access", alt: "A container truck arriving at an industrial site gate", label: "Expected image: container-delivery-site-access.webp" },
    ],
    layout: { hero: "ledger", includes: "tiles", steps: "chevrons", usecases: "list", planning: "split", aside: "sticky", order: ["overview", "includes", "how", "coverage", "usecases", "planning", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to ask about a container move. The container is [size and weight], it moves from [port or depot] to [site and city], and the date is [date].",
    cta: { heading: "Ask about your container move", text: "Send the container size, the pickup point, the delivery site and the date. We reply with an assessment or the questions we need answered." },
  },

  "express-urgent-delivery": {
    primary: "Express Delivery Services Saudi Arabia",
    secondary: ["Urgent Delivery Services", "Express Cargo Delivery", "Same-Day Delivery Services", "Time-Sensitive Cargo Transportation", "Priority Delivery Services", "Fast Business Delivery Solutions", "Urgent Shipment Transportation", "Express Logistics Company Saudi Arabia"],
    metaTitle: "Express Delivery Services Saudi Arabia",
    metaDescription: "Express delivery services in Saudi Arabia for urgent business cargo: priority pickups and direct runs. Send the deadline and route to check what is possible.",
    h1: "Express Delivery Services in Saudi Arabia",
    lead: "For cargo that cannot wait. Send the pickup, the delivery place and your deadline, and we tell you straight away whether we can support it.",
    directAnswer: "Express delivery services in Saudi Arabia move urgent business cargo on a priority basis, usually in a direct run from pickup to delivery. Gulf Elite Transport Group looks at the route, the load and your deadline and tells you whether it can support the job. Delivery times are not promised in advance; they are confirmed for each request.",
    intro: [
      "Express delivery services in Saudi Arabia are for the job that has a deadline: a missing part, a contract document pack, a replacement item, stock for an opening day. Gulf Elite Transport Group looks at the route and the load and confirms whether a priority run is possible.",
      "Speed is only part of it. The same pickup details, contact names and access notes matter more when time is short. For regular deliveries to customers' doors, see [last-mile delivery](/services/last-mile-delivery). For parts moving to workshops and factories, see [spare parts and automotive logistics](/services/spare-parts-automotive-logistics). For heavier planned loads, use [freight transport](/services/freight-cargo-transport).",
    ],
    h2: { overview: "What express and urgent delivery means", includes: "What an express delivery request can include", how: "How an urgent request is handled", coverage: "Urgent deliveries across Saudi Arabia", planning: "What helps an urgent job run smoothly", usecases: "When businesses ask for express delivery", faq: "Express delivery: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Urgent jobs are most common inside a metropolitan area or between nearby cities, and longer intercity runs are looked at one by one.",
        "We do not promise same-day delivery or a fixed time on any route. Distance, traffic, the pickup time and the load all change what is possible, so we answer each request with what we can actually support.",
      ],
      cities: [
        { name: "Riyadh", note: "Large city where urgent business runs often cross town" },
        { name: "Jeddah", note: "Western commercial hub with busy trade and port traffic" },
        { name: "Dammam", note: "Eastern Province city with strong industrial links" },
        { name: "Al Khobar", note: "Business city next to Dammam" },
        { name: "Makkah", note: "Holy city with heavy seasonal movement" },
        { name: "Madinah", note: "Holy city and regional centre in the west" },
      ],
    },
    faqs: [
      { q: "Do you offer same-day delivery in Saudi Arabia?", a: "It depends on the route, the load and the time you ask. We do not promise same-day delivery in advance. We tell you what we can support when you send the pickup, the delivery place and the deadline." },
      { q: "What is the difference between express delivery and last-mile delivery?", a: "Express delivery is a priority run for one urgent job. Last-mile delivery is the regular final step of getting orders to customers. If you have one urgent load, use express. If you deliver to many customers every day, ask about last-mile." },
    ],
    images: [
      { slot: "express-urgent-delivery", alt: "A delivery van leaving a business site with a parcel load", label: "Expected image: express-urgent-delivery.webp" },
      { slot: "express-delivery-priority-pickup", alt: "A driver collecting a sealed urgent parcel from a reception desk", label: "Expected image: express-delivery-priority-pickup.webp" },
      { slot: "express-delivery-intercity-run", alt: "A delivery vehicle on a highway between Saudi cities", label: "Expected image: express-delivery-intercity-run.webp" },
    ],
    layout: { hero: "centered", includes: "cards", steps: "timeline", usecases: "navy", planning: "cards", aside: "band", order: ["overview", "how", "includes", "usecases", "coverage", "planning", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I have an urgent delivery. The goods are [description, weight and size], the pickup is [place and city], the delivery is [place and city], and I need it by [date and time].",
    cta: { heading: "Send your urgent request", text: "Give us the pickup, the delivery place and your deadline. We tell you quickly what we can support." },
  },

  "refrigerated-transportation": {
    primary: "Refrigerated Transport Services Saudi Arabia",
    secondary: ["Temperature-Controlled Transportation", "Chilled Cargo Transportation", "Cold Chain Logistics Saudi Arabia", "Refrigerated Truck Transportation", "Perishable Goods Transportation", "Temperature-Sensitive Cargo", "Cold Transport Services", "Refrigerated Logistics Company"],
    metaTitle: "Refrigerated Transport Services Saudi Arabia",
    metaDescription: "Refrigerated transport services in Saudi Arabia for chilled and frozen goods. Tell us the temperature range and route and we confirm what can be supported.",
    h1: "Refrigerated Transport Services in Saudi Arabia",
    lead: "Chilled and frozen goods need a set temperature all the way. Tell us the range, the goods and the route, and we confirm what can be supported before you commit.",
    directAnswer: "Refrigerated transport services in Saudi Arabia move temperature-sensitive goods, such as food, medicines or other perishables, within a set temperature range. Gulf Elite Transport Group asks for the temperature requirement, the goods and the route, and confirms individually whether a suitable arrangement can be supported before a quotation is agreed.",
    intro: [
      "Refrigerated transport services in Saudi Arabia have to cope with long distances and high summer heat, so the temperature range and the loading plan matter from the start. Gulf Elite Transport Group asks for those details first and confirms whether it can support the move.",
      "Cold-chain work also depends on what happens before and after the drive. Packing and loading steps are covered under [cargo handling](/services/packaging-cargo-handling), while holding goods between moves is covered under [warehousing and storage](/services/warehousing-storage). Goods that are not temperature-sensitive can use ordinary [freight transport](/services/freight-cargo-transport).",
    ],
    h2: { overview: "What temperature-controlled transport means", includes: "What a refrigerated transport request can include", how: "How a temperature-controlled move is arranged", coverage: "Cold-chain transport across Saudi Arabia", planning: "Temperature details to confirm first", usecases: "Goods that need refrigerated transport", faq: "Refrigerated transport: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. For refrigerated goods, long drives in hot weather and the time spent at loading and unloading points have a direct effect on the plan.",
        "We do not claim a fleet size, a certified cold-chain system or fixed delivery times. For each request we confirm whether a suitable arrangement is possible and what temperature records, if any, can be supported.",
      ],
      cities: [
        { name: "Riyadh", note: "Large consumer market that receives chilled and frozen food" },
        { name: "Jeddah", note: "Port city where many imported perishables arrive" },
        { name: "Dammam", note: "Eastern Province city with port and food distribution" },
        { name: "Makkah", note: "Holy city with strong seasonal food demand" },
        { name: "Madinah", note: "Holy city that needs steady supplies for residents and visitors" },
        { name: "Abha", note: "Mountain city in Asir, a long drive from the main ports" },
      ],
    },
    faqs: [
      { q: "Can you move chilled or frozen goods across Saudi Arabia?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. For refrigerated goods we need the temperature range, the goods and the route, and we confirm individually whether a suitable arrangement can be supported." },
      { q: "Do you guarantee a temperature record?", a: "We do not assume it. If you need a temperature record for the move, tell us in your request and we will confirm what can be supported." },
      { q: "How is this different from ordinary freight?", a: "Ordinary freight does not control temperature. Refrigerated transport keeps goods within a set range, so the vehicle, the loading time and the route all need more care." },
    ],
    images: [
      { slot: "refrigerated-transportation", alt: "A refrigerated truck parked at a loading bay", label: "Expected image: refrigerated-transportation.webp" },
      { slot: "refrigerated-cold-chain-loading", alt: "Chilled food cartons being loaded into a refrigerated truck", label: "Expected image: refrigerated-cold-chain-loading.webp" },
      { slot: "refrigerated-intercity-route", alt: "A refrigerated truck on a long desert highway in Saudi Arabia", label: "Expected image: refrigerated-intercity-route.webp" },
    ],
    layout: { hero: "light-image", includes: "ledger", steps: "chevrons", usecases: "columns", planning: "table", aside: "sticky", order: ["overview", "coverage", "includes", "how", "planning", "usecases", "audience", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like to ask about refrigerated transport. The goods are [description and weight], the required temperature is [range], the pickup is [place and city], the delivery is [place and city], and the date is [date].",
    cta: { heading: "Tell us the temperature range", text: "Send the goods, the temperature requirement, the route and the date. We confirm what can be supported." },
  },

  "vehicle-transportation": {
    primary: "Vehicle Transportation Services Saudi Arabia",
    secondary: ["Car Transport Services Saudi Arabia", "Vehicle Shipping Services", "Automobile Transportation Company", "Car Relocation Services", "Commercial Vehicle Transport", "Intercity Car Transportation", "Vehicle Delivery Services", "Automotive Transport Solutions"],
    metaTitle: "Vehicle Transportation Services Saudi Arabia",
    metaDescription: "Vehicle transportation services in Saudi Arabia: cars, vans and commercial vehicles moved between cities. Send the vehicle details for an assessment.",
    h1: "Vehicle Transportation Services in Saudi Arabia",
    lead: "Move a car, van, bus or truck from one city to another without driving it yourself. Send the vehicle details and the route, and we assess the move.",
    directAnswer: "Vehicle transportation services in Saudi Arabia move cars, vans, buses, trucks and other vehicles from a collection point to a delivery point. Gulf Elite Transport Group asks for the vehicle details and the route and confirms individually whether a suitable arrangement can be supported before a quotation is agreed.",
    intro: [
      "Vehicle transportation services in Saudi Arabia help when a vehicle has to travel and driving it is not practical. That can mean a car for a family that is relocating, a new van for a business, or a broken-down truck that needs to reach a workshop. Gulf Elite Transport Group asks for the vehicle details and the route first.",
      "This page is about moving vehicles themselves. Moving vehicle parts and supplies is covered under [spare parts and automotive logistics](/services/spare-parts-automotive-logistics), and the movement of very large machines under [heavy equipment transportation](/services/equipment-machinery-moving). If you need to move people and not vehicles, see [passenger transport](/services/passenger-transport).",
    ],
    h2: { overview: "What vehicle transportation covers", includes: "What a vehicle transport request can include", how: "How a vehicle move is arranged", coverage: "Vehicle moves between Saudi cities", planning: "What to prepare before a vehicle is collected", usecases: "When people and businesses move vehicles", faq: "Vehicle transportation: questions" },
    coverage: {
      paragraphs: [
        "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Distances between regions are long, so moving a car by road transport is a real option for relocations and dealership deliveries.",
        "We do not publish fixed prices or journey times for any route. Vehicle size, condition, route and date decide what is possible, and we confirm it before you commit.",
      ],
      cities: [
        { name: "Riyadh", note: "Largest vehicle market and a common start or end point" },
        { name: "Jeddah", note: "Western city and a major port for imported vehicles" },
        { name: "Dammam", note: "Eastern Province city with port and dealer activity" },
        { name: "Abha", note: "Asir city in the south-west, far from the main ports" },
        { name: "Tabuk", note: "Northwest city, a long route from the central region" },
        { name: "Hail", note: "Northern city on routes between Riyadh and the north" },
      ],
    },
    faqs: [
      { q: "Can you move a vehicle between any two Saudi cities?", a: "Gulf Elite Transport Group provides transportation and logistics services across Saudi Arabia. Send the vehicle details, the pickup and the delivery city, and we confirm whether we can support the move." },
      { q: "What vehicle details do you need?", a: "The make and model, the size and weight, whether it runs and drives, and any damage. The vehicle's size and condition decide what equipment is needed." },
    ],
    images: [
      { slot: "vehicle-transportation", alt: "A car carrier truck loaded with cars on a Saudi highway", label: "Expected image: vehicle-transportation.webp" },
      { slot: "vehicle-loading-car-carrier", alt: "A car being driven up the ramp of a car transporter", label: "Expected image: vehicle-loading-car-carrier.webp" },
      { slot: "vehicle-transport-saudi-routes", alt: "A vehicle transporter on a long-distance road between Saudi regions", label: "Expected image: vehicle-transport-saudi-routes.webp" },
    ],
    layout: { hero: "banner", includes: "tiles", steps: "grid", usecases: "list", planning: "cards", aside: "band", order: ["overview", "audience", "includes", "usecases", "how", "coverage", "planning", "info", "faq", "related"] },
    waMessage: "Hello Gulf Elite Transport Group, I would like a quotation to move a vehicle. It is a [make, model and size], it [runs and drives / does not run], the pickup is in [city], the delivery is in [city], and the date is [date].",
    cta: { heading: "Ask about moving your vehicle", text: "Send the vehicle, the pickup city, the delivery city and the date. We reply with a quotation or follow-up questions." },
  },
};
