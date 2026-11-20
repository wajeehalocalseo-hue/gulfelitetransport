/**
 * "Ways this service is requested": a short, useful section on every service page. Each block is an H3 with two or three plain
 * sentences about one common way people ask for the service. This is where the secondary keywords from the brief appear in
 * natural wording (as the terms people actually search with), next to what the request needs. No capability is claimed here:
 * everything is "we assess it and confirm it before you commit".
 */
export type VariantBlock = { h: string; t: string };
export type ServiceVariants = { h2: string; items: VariantBlock[] };

export const serviceVariants: Record<string, ServiceVariants> = {
  "freight-cargo-transport": {
    h2: "Ways businesses ask for freight and cargo transport",
    items: [
      { h: "Commercial freight transport between cities", t: "Commercial freight transport is the most common request: a business needs a load moved from one city to another on a set date. Road freight services suit pallets, cartons and equipment, and the quotation depends on the route, the weight and the access at each end." },
      { h: "Business cargo transport services for regular needs", t: "Some companies need business cargo transport services every week, for example from a supplier to a warehouse. Describe the pattern and we assess whether it can be supported as repeat freight transport services." },
      { h: "Goods transportation and cargo delivery services", t: "Whether you call it goods transportation services or cargo delivery services, the request starts with the same facts: what the goods are, where they are collected and where they must be delivered." },
      { h: "Freight shipping services and a cargo transport company", t: "A cargo transport company plans the movement and the customer confirms the details. For freight shipping services we ask for the load description, the addresses and the date, then reply with a quotation or questions. Cargo transportation services are confirmed one job at a time." },
    ],
  },
  "international-freight-forwarding": {
    h2: "Ways customers ask for international shipping help",
    items: [
      { h: "An international freight forwarder or a shipment coordinator", t: "Businesses often look for an international freight forwarder when they want one contact to plan a shipment. We help you organise the stages and say clearly which ones we can coordinate and which are handled by the shipper, the carrier or a customs agent." },
      { h: "Export freight forwarding and import shipments", t: "Export freight forwarding starts with the goods leaving your site and the documents the destination requires. Import shipments start from the other end. Tell us which direction you need and where each leg begins and ends." },
      { h: "Sea freight forwarding and international cargo shipping", t: "Sea freight forwarding and international cargo shipping describe how goods travel between ports. The modes and ports involved depend on the shipment, and we confirm per job what we can support. We do not list carriers or routes in advance." },
      { h: "Global freight forwarding services and cross-border freight services", t: "Global freight forwarding services and cross-border freight services both mean goods moving between countries. International shipping services in Saudi Arabia usually include an inland road leg, which is the part of the journey we can plan with you." },
    ],
  },
  "container-transportation": {
    h2: "Typical container transport requests",
    items: [
      { h: "Container haulage services from the port", t: "Container haulage services usually mean collecting a loaded container from a port or depot and hauling it to the receiver. We ask for the container size, the weight and the release details, because they decide whether the move can be supported." },
      { h: "Shipping container transportation and road container transport", t: "Shipping container transportation is the road leg between a terminal and a site, or between two cities. Road container transport depends on the route, the vehicle length that route allows and the access at the delivery site." },
      { h: "Container delivery services and commercial container transport services", t: "Container delivery services and commercial container transport services are requested by importers, exporters and factories. A container transport company plans the move around the delivery window the receiver gives." },
      { h: "Industrial and heavy container moves", t: "Industrial container transportation and heavy container transport services involve full or heavy boxes, so the gross weight must be stated. Freight container transportation for a series of containers is assessed as one plan." },
    ],
  },
  "express-urgent-delivery": {
    h2: "What customers ask for when time is short",
    items: [
      { h: "Urgent delivery services for businesses", t: "Urgent delivery services and business express delivery are requested when a part, a document pack or stock must arrive by a set time. Tell us the deadline first so we can say quickly whether it is realistic." },
      { h: "Express courier services and express parcel transport", t: "People who search for express courier services or express parcel transport usually have a small, valuable item. Give the size, the weight, the pickup and the drop-off, and we confirm what can be arranged." },
      { h: "Fast delivery services and priority delivery services", t: "Fast delivery services and priority delivery services put one job ahead of normal scheduling. What is possible depends on the distance, the pickup time and the road. We do not promise a delivery time that has not been confirmed." },
      { h: "Time-sensitive delivery services and urgent shipment transportation", t: "Time-sensitive delivery services cover items tied to a deadline such as an exhibition, a repair or a launch. Urgent shipment transportation and commercial express transport are assessed job by job." },
    ],
  },
  "refrigerated-transportation": {
    h2: "Cold transport requests we can be asked about",
    items: [
      { h: "Temperature controlled transportation and cold chain transportation services", t: "Temperature controlled transportation keeps goods within a stated range. Cold chain transportation services also depend on how goods are handled before loading and after arrival. Give us the range in degrees and who checks it at each end." },
      { h: "Chilled goods transportation and frozen goods transportation", t: "Chilled goods transportation and frozen goods transportation need different ranges, so describe them separately in your request. Perishable goods transportation is also time-limited, which affects the schedule." },
      { h: "Food transportation services and refrigerated cargo transport", t: "Food transportation services are among the most common requests. Refrigerated cargo transport for a shop, a restaurant group or a supplier is planned from the delivery list, the temperature and the opening hours at each stop." },
      { h: "Refrigerated logistics and a refrigerated transport company", t: "Refrigerated logistics covers the transport and the steps around it. A refrigerated transport company is asked about cold transport services, temperature controlled cargo delivery and cold chain logistics services. We confirm what we can support before you commit and we do not publish refrigeration specifications." },
    ],
  },
  "vehicle-transportation": {
    h2: "Ways people and businesses ask for vehicle transport",
    items: [
      { h: "Car transportation services and intercity car transportation", t: "Car transportation services are most often requested for a move between two Saudi cities, for example when a family relocates. Intercity car transportation depends on the route and the date, and the quotation depends on the vehicle." },
      { h: "Car delivery services and vehicle shipping services", t: "Car delivery services bring a vehicle to a buyer or a branch. Vehicle shipping services and auto transport services also cover vehicles sent to workshops or showrooms. Give the pickup and delivery addresses and the vehicle details." },
      { h: "Vehicle relocation services and vehicle moving services", t: "Vehicle relocation services and vehicle moving services suit people changing city for work and companies moving company vehicles. Say how many vehicles there are and whether any of them do not run." },
      { h: "Car carrier transport, a car transport company and automobile transportation", t: "Car carrier transport is one way vehicles are moved, and whether it fits your job is confirmed per request. A car transport company or vehicle transport company plans the move, and automobile transportation requests are assessed one by one." },
    ],
  },
  "furniture-household-moving": {
    h2: "Common ways households ask for moving help",
    items: [
      { h: "Household moving services and home relocation services", t: "Household moving services and home relocation services cover the whole home: furniture, boxes and appliances. Residential moving services start with a list of rooms and the access at both addresses." },
      { h: "Furniture transportation and furniture delivery services", t: "Furniture transportation can be a single sofa or a full house. Furniture delivery services and home furniture transport for new purchases need the shop address, the delivery address and the floor and lift details." },
      { h: "Intercity household moving and furniture relocation services", t: "Intercity household moving takes extra planning: dates at both ends and a vehicle for the distance. Furniture relocation services for an office also need a time that suits the building." },
      { h: "A house moving company, a furniture transport company and household item transportation", t: "When you look for a house moving company or a furniture transport company, ask what is included. Household item transportation can include loading and unloading, but packing, dismantling and storage are confirmed for each job." },
    ],
  },
  "passenger-transport": {
    h2: "How passenger transport is usually requested",
    items: [
      { h: "Passenger transfer services and private travel transportation", t: "Passenger transfer services move people between an arrival point and a destination, such as an airport and a hotel. Private travel transportation suits families, delegations and visitors who want one planned vehicle." },
      { h: "Business passenger transport services and employee transportation services", t: "Business passenger transport services cover guests and teams. Employee transportation services work best as a regular plan with fixed pickup points, days and a named contact." },
      { h: "Passenger travel services and private transport services", t: "Passenger travel services for a long intercity trip and private transport services for a day of meetings both start with the same details: who travels, from where, to where and when." },
      { h: "Choosing a passenger transportation company or passenger transfer company", t: "A passenger transportation company or a passenger transfer company should confirm the vehicle and the fare before the date. We do that, and we say clearly what has and has not been confirmed for your request." },
    ],
  },
  "taxi-cab-services": {
    h2: "Types of taxi requests",
    items: [
      { h: "Taxi booking and a private cab service", t: "Taxi booking is done through WhatsApp or the booking form, not an app. A private cab service means the car is arranged for you in advance, with the vehicle, driver and fare confirmed first." },
      { h: "Intercity taxi service and city-to-city taxi rides", t: "An intercity taxi service suits one traveller or a small group going between cities. City-to-city taxi trips are priced on the route, the date and the vehicle, and confirmed before you commit." },
      { h: "Airport taxi service and door-to-door taxi service", t: "An airport taxi service starts with the flight details. A door-to-door taxi service takes you from the address you give to the address you need, without changing vehicles." },
      { h: "A chauffeur service for planned journeys", t: "A chauffeur service style booking, where one driver stays with the guest through a day of meetings, can be asked about. Tell us the plan and we confirm whether it can be arranged." },
    ],
  },
  "equipment-machinery-moving": {
    h2: "Machinery and equipment requests",
    items: [
      { h: "Machinery moving services and machinery relocation services", t: "Machinery moving services cover a single machine going to a customer. Machinery relocation services cover a factory or workshop moving to a new site, where the order of removal and installation matters." },
      { h: "Industrial equipment moving and heavy machinery transport services", t: "Industrial equipment moving and heavy machinery transport services depend on weight, height and access. State the figures early, because they decide whether a move can be supported." },
      { h: "Commercial equipment moving and machinery delivery services", t: "Commercial equipment moving covers items such as kitchen, workshop and shop equipment. Machinery delivery services bring new machines from a supplier to a site." },
      { h: "An equipment transport company, equipment relocation and industrial equipment logistics", t: "An equipment transport company plans the vehicle and the route. Equipment relocation and industrial equipment logistics requests are assessed one by one, and we do not claim lifting equipment or special trailers unless confirmed." },
    ],
  },
  "industrial-project-logistics": {
    h2: "How project teams ask for logistics help",
    items: [
      { h: "Industrial logistics services and industrial freight solutions", t: "Industrial logistics services and industrial freight solutions are asked for by plants, contractors and suppliers. Describe the materials, the sites and the dates, and we assess what can be supported." },
      { h: "Project cargo logistics and large scale project logistics", t: "Project cargo logistics and large scale project logistics involve many deliveries over time. A clear delivery schedule and one contact per site make the plan manageable." },
      { h: "Engineering project logistics and project-based transportation services", t: "For engineering project logistics, the delivery order follows the construction or installation order. Project-based transportation services are planned around milestones rather than single trips." },
      { h: "Industrial supply chain logistics, industrial cargo handling and a project logistics company", t: "A project logistics company coordinates the transport side of a project. Industrial supply chain logistics and industrial cargo handling needs belong in the brief you send, and we say which parts we can support." },
    ],
  },
  "packaging-cargo-handling": {
    h2: "Packaging and handling requests",
    items: [
      { h: "Cargo packaging services and shipment packaging services", t: "Cargo packaging services and shipment packaging services protect goods for the road. Tell us what the goods are, how fragile they are and who supplies the materials." },
      { h: "Freight packaging and transport packaging services", t: "Freight packaging and transport packaging services cover wrapping, boxing and securing goods on pallets or in crates. We confirm per job which steps are part of the quotation." },
      { h: "Goods packing and handling services and cargo preparation services", t: "Goods packing and handling services and cargo preparation services can include sorting, labelling and grouping goods by destination before loading." },
      { h: "Cargo loading and unloading services and shipment handling services", t: "Cargo loading and unloading services and shipment handling services need information about the site: access, space and whether equipment is on hand." },
      { h: "Professional cargo handling services and a goods handling company", t: "Professional cargo handling services and commercial cargo handling for businesses are confirmed one job at a time. A goods handling company should say what it can and cannot do. We do not claim special equipment or certifications, and industrial cargo handling is assessed by weight and access." },
    ],
  },
  "trade-show-exhibition-logistics": {
    h2: "Typical exhibition transport requests",
    items: [
      { h: "Exhibition transportation services and exhibition freight services", t: "Exhibition transportation services move stand materials and products to the hall, and exhibition freight services cover larger or longer-distance shipments. Both follow the organiser's delivery rules." },
      { h: "Exhibition setup logistics and event cargo handling", t: "Exhibition setup logistics is about timing: arrival slots, access and who receives goods. Event cargo handling at the venue depends on the venue's own rules, so we ask what is allowed." },
      { h: "Trade show freight forwarding and an event logistics company", t: "Trade show freight forwarding may be needed for goods coming from abroad. An event logistics company plans the transport around the schedule you give, and we say which stages we can support." },
    ],
  },
  "contract-fleet-services": {
    h2: "What companies ask about fleet contracts",
    items: [
      { h: "Fleet contract services and contract transport services", t: "Fleet contract services and contract transport services set out the routes, days, vehicles and period in an agreement. We assess what can be offered and confirm it before any contract." },
      { h: "Long-term fleet transportation and fleet hire services", t: "Long-term fleet transportation suits steady work. Fleet hire services for a fixed period suit seasonal or project needs. State the period and the use." },
      { h: "Commercial fleet solutions and business vehicle fleet services", t: "Commercial fleet solutions and business vehicle fleet services are discussed from your routine: the vehicle types needed, the areas and the hours. We do not state fleet sizes in advance." },
      { h: "Fleet management transport services and contract logistics transportation", t: "Fleet management transport services and contract logistics transportation depend on who manages what: scheduling, vehicles and reporting. We agree and write down the split before anything starts. We do not claim fleet management software." },
    ],
  },
  "last-mile-delivery": {
    h2: "How last-mile delivery is requested",
    items: [
      { h: "Final mile delivery services and final destination delivery services", t: "Final mile delivery services and final destination delivery services move goods from a local hub or shop to the customer's address. We need the addresses, the parcel sizes and the delivery windows." },
      { h: "E-commerce delivery services and parcel delivery services", t: "E-commerce delivery services and parcel delivery services depend on order volume and the areas served. Share the average orders per day and the main delivery areas." },
      { h: "Business last mile delivery and last mile distribution", t: "Business last mile delivery covers deliveries to other businesses, such as clinics or offices. Last mile distribution means planned rounds with several stops." },
      { h: "Local delivery transportation and a last mile delivery company", t: "Local delivery transportation inside a city is planned around traffic and opening hours. A last mile delivery company agrees the plan with you, and we do not promise tracking or delivery times that are not confirmed." },
    ],
  },
  "commercial-distribution-services": {
    h2: "Typical distribution requests",
    items: [
      { h: "Commercial goods distribution and product distribution services", t: "Commercial goods distribution and product distribution services move a supplier's goods to many receivers on a timetable. We need the stop list and the delivery windows." },
      { h: "Business distribution services and B2B distribution services", t: "Business distribution services and B2B distribution services serve wholesalers, factories and suppliers delivering to shops and businesses. Volumes and frequency drive the plan." },
      { h: "Regional distribution services and commercial cargo distribution", t: "Regional distribution services cover rounds across a region or between regions. Commercial cargo distribution can combine larger loads with smaller drops." },
      { h: "Distribution transportation services and a goods distribution company", t: "Distribution transportation services are the vehicle side of distribution. A distribution company or goods distribution company often also handles stock and orders. We focus on transport and say what we can support, and commercial transport and distribution plans are confirmed in writing." },
    ],
  },
  "warehousing-storage": {
    h2: "Storage requests we can be asked about",
    items: [
      { h: "Warehouse storage services and commercial warehouse solutions", t: "Warehouse storage services and commercial warehouse solutions start with what you store, how much and for how long. We do not publish warehouse sizes or locations." },
      { h: "Short-term storage services and long-term warehouse storage", t: "Short-term storage services suit goods between transport legs. Long-term warehouse storage suits stock held for months. State the period and how often goods move." },
      { h: "Goods storage services, cargo storage and commercial storage services", t: "Goods storage services and cargo storage are requested for pallets, boxes and project materials. Commercial storage services should say how goods are counted and released, and we agree that with you." },
      { h: "Business warehousing solutions and inventory storage services", t: "Business warehousing solutions and inventory storage services depend on how stock is received, counted and picked. Inventory systems are not assumed." },
      { h: "Logistics warehousing services, distribution warehousing services and a warehousing company", t: "Logistics warehousing services and distribution warehousing services link storage to transport. A warehousing company should say where goods are held, and we confirm what is possible for each request." },
    ],
  },
  "spare-parts-automotive-logistics": {
    h2: "Parts logistics requests",
    items: [
      { h: "Automotive logistics services and automotive supply chain logistics", t: "Automotive logistics services and automotive supply chain logistics cover regular movements of parts between suppliers, workshops and stores. Describe the pattern and the places." },
      { h: "Spare parts transportation and vehicle spare parts transport", t: "Spare parts transportation and vehicle spare parts transport range from one urgent box to weekly pallets. Give the part references where you have them." },
      { h: "Auto parts delivery services and spare parts distribution services", t: "Auto parts delivery services bring parts to workshops and customers. Spare parts distribution services follow a route with several stops." },
      { h: "A car parts logistics company, auto components delivery and automotive freight services", t: "A car parts logistics company plans the transport. Auto components delivery and automotive freight services for factories need delivery windows and gate rules, and automotive cargo transport is assessed per job." },
    ],
  },
};
