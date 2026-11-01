import type { ChildRecord } from "../subservices";

/**
 * Batch 16: ten micro-services (Level 3) under the sub-services of the five confirmed main services.
 * Same wording rules as batches 14 and 15: suitability, equipment, labour and timing are "confirmed for each
 * request". Nothing is claimed about car carriers, trailers, insurance, drivers, packing materials,
 * dismantling or reassembly, forklifts or cranes, venue labour, or parts supply.
 */
const PUB = "2026-11-02";

type Item = { title: string; text: string };

const rec = (r: {
  id: string;
  parentId: string;
  name: string;
  icon: string;
  order: number;
  short: string;
  audienceShort: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  semanticKeywords: string[];
  searchIntent: string;
  related: string[];
  relatedMain: string[];
  layout: ChildRecord["layout"];
  lead: string;
  directAnswer: string;
  differs: { heading: string; text: string };
  overview: string[];
  includes: Item[];
  audience: string[];
  applications: Item[];
  steps: Item[];
  considerations: Item[];
  quoteInfo: string[];
  faqs: { q: string; a: string }[];
}): ChildRecord => ({
  id: r.id,
  slug: r.id,
  parentId: r.parentId,
  level: 3,
  name: r.name,
  icon: r.icon,
  featured: false,
  order: r.order,
  short: r.short,
  audienceShort: r.audienceShort,
  seoTitle: r.seoTitle,
  metaDescription: r.metaDescription,
  primaryKeyword: r.primaryKeyword,
  secondaryKeywords: r.secondaryKeywords,
  semanticKeywords: r.semanticKeywords,
  searchIntent: r.searchIntent,
  related: r.related,
  relatedMain: r.relatedMain,
  publishedAt: PUB,
  layout: r.layout,
  content: {
    h1: r.name,
    lead: r.lead,
    directAnswer: r.directAnswer,
    differs: r.differs,
    overview: r.overview,
    includes: r.includes,
    audience: r.audience,
    applications: r.applications,
    steps: r.steps,
    considerations: r.considerations,
    quoteInfo: r.quoteInfo,
    faqs: r.faqs,
  },
});

export const categoryBatch16Micro: ChildRecord[] = [
  rec({
    id: "multiple-car-transport",
    parentId: "car-transportation",
    name: "Multiple Car Transport",
    icon: "truck",
    order: 2,
    short: "Moving several cars together between the same or nearby locations.",
    audienceShort: "Dealers, rental companies and businesses moving several cars",
    seoTitle: "Multiple Car Transport for Several Vehicles at Once",
    metaDescription:
      "Arrange multiple car transport for several vehicles moving together. Number and suitability confirmed per request. Gulf Elite Transport quotation.",
    primaryKeyword: "multiple car transport",
    secondaryKeywords: ["transport several cars", "multi-car delivery", "car fleet transport"],
    semanticKeywords: ["batch of cars", "loading order", "ramps", "condition list", "same route", "collection point"],
    searchIntent: "Commercial: a business needs several cars moved on one job.",
    related: ["single-car-transport", "dealership-vehicle-transport"],
    relatedMain: ["contract-fleet-services"],
    layout: { hero: "ribbon", body: "tiles", form: "bottom" },
    lead: "Moving four cars is not four times the job of one. It is a loading plan.",
    directAnswer:
      "Multiple car transport is the movement of several cars together from one or more collection points to one or more delivery points. Gulf Elite Transport asks for the number and type of cars and the route and confirms individually whether a suitable arrangement can be supported before a quotation is agreed. The number of cars per trip depends on the vehicle used and is not stated in advance.",
    differs: {
      heading: "How multiple car transport differs from related services",
      text: "This page is for several cars on one job. Single Car Transport covers one car. Dealership Vehicle Transport covers stock moving between suppliers and showrooms. Fleet relocation of commercial vehicles is covered separately.",
    },
    overview: [
      "Several cars can share a trip when they start in the same place or on a common route. The order of loading and unloading matters, and cars of different heights or lengths may not fit together.",
      "Gulf Elite Transport asks for the list of cars, the collection and delivery points and the dates. We confirm what can be supported and provide a quotation.",
    ],
    includes: [
      { title: "Car list review", text: "Models, sizes and condition checked together." },
      { title: "Loading plan", text: "Order planned to suit collection and drop-off." },
      { title: "Multi-point delivery", text: "More than one delivery address if needed." },
      { title: "Handover planning", text: "Who receives each car." },
    ],
    audience: ["Car dealers", "Rental and leasing companies", "Auction buyers", "Businesses relocating company cars"],
    applications: [
      { title: "Dealer batch", text: "Several cars delivered to a showroom." },
      { title: "Rental fleet", text: "Cars moved between branches." },
      { title: "Auction purchases", text: "Several lots moved to one buyer." },
      { title: "Company cars", text: "A group of staff cars relocated." },
    ],
    steps: [
      { title: "List the cars", text: "Model, size and whether they run." },
      { title: "Share the points", text: "Collection and delivery addresses." },
      { title: "Plan the loading", text: "Order and grouping." },
      { title: "Receive the quotation", text: "After confirmation." },
    ],
    considerations: [
      { title: "Mixed sizes", text: "Different heights affect what can share a trip." },
      { title: "Number per trip", text: "It depends on the vehicle and the cars." },
      { title: "Condition", text: "Record each car's condition." },
      { title: "Timing", text: "Several drop-offs lengthen the trip." },
    ],
    quoteInfo: ["Number and type of cars", "Whether they run", "Collection and delivery points", "Dates", "Access at each point", "Contact person"],
    faqs: [
      { q: "How many cars can you move at once?", a: "It depends on the vehicle used and the cars; this is confirmed per request." },
      { q: "Can the cars go to different addresses?", a: "Multi-point delivery can be discussed." },
      { q: "Is insurance included?", a: "Not assumed. Share what you need." },
      { q: "Can mixed car types travel together?", a: "It depends on size; we assess each combination." },
      { q: "How do I get a quotation?", a: "Send the car list, points and dates." },
    ],
  }),
  rec({
    id: "dealership-vehicle-transport",
    parentId: "car-transportation",
    name: "Dealership Vehicle Transport",
    icon: "store",
    order: 3,
    short: "Moving vehicle stock between suppliers, showrooms and customers for dealerships.",
    audienceShort: "Car dealerships, importers and showroom managers",
    seoTitle: "Dealership Vehicle Transport for Showroom Stock",
    metaDescription:
      "Plan dealership vehicle transport of showroom and supplier stock, with pickup and delivery coordinated. Gulf Elite Transport quotation.",
    primaryKeyword: "dealership vehicle transport",
    secondaryKeywords: ["showroom stock transport", "dealer car delivery", "new vehicle delivery"],
    semanticKeywords: ["showroom", "supplier yard", "new stock", "customer delivery", "delivery mileage", "protective cover"],
    searchIntent: "Commercial: a dealership needs vehicles moved to or from its premises.",
    related: ["multiple-car-transport", "single-car-transport"],
    relatedMain: ["commercial-distribution-services"],
    layout: { hero: "mirror", body: "table", form: "bottom" },
    lead: "A showroom lives on its stock. New arrivals have to reach it in showroom condition.",
    directAnswer:
      "Dealership vehicle transport is the movement of vehicle stock for dealerships: from supplier yards, ports or other branches to the showroom, and from the showroom to customers. Gulf Elite Transport coordinates the pickups and deliveries with you and provides a quotation before you commit. The vehicle carrier used and insurance are not assumed.",
    differs: {
      heading: "How dealership vehicle transport differs from related services",
      text: "This page is for dealerships and their regular stock flows. Multiple Car Transport covers any group of cars. Single Car Transport covers one-off moves. Commercial Vehicle Transport covers vans, buses and trucks.",
    },
    overview: [
      "A dealership receives, displays, sells and delivers cars. Each step can involve a transport movement, often at short notice around a sale or a delivery date.",
      "Gulf Elite Transport asks about the flows, volumes and timing. Where movements recur, a regular arrangement can be discussed.",
    ],
    includes: [
      { title: "Supplier to showroom", text: "New stock moved to the dealership." },
      { title: "Branch transfers", text: "Cars moved between dealer branches." },
      { title: "Customer delivery", text: "Sold cars delivered to buyers." },
      { title: "Recurring arrangements", text: "Regular moves can be discussed." },
    ],
    audience: ["Dealerships", "Importers", "Showroom managers", "Used car traders"],
    applications: [
      { title: "New shipment", text: "Cars collected from a port or yard." },
      { title: "Inter-branch", text: "A car moved to the branch where it sells." },
      { title: "Customer handover", text: "A sold car delivered." },
      { title: "Exhibition", text: "Cars moved to a motor show." },
    ],
    steps: [
      { title: "Describe the flow", text: "Origins, destinations and volumes." },
      { title: "List the cars", text: "Models and sizes." },
      { title: "Set the timing", text: "Dates and recurrence." },
      { title: "Receive the quotation", text: "After confirmation." },
    ],
    considerations: [
      { title: "Showroom condition", text: "New cars need protection from damage and weather." },
      { title: "Volume", text: "Regular volumes allow better planning." },
      { title: "Documentation", text: "Agree what paperwork travels with each car." },
      { title: "Timing", text: "Customer deliveries often have fixed dates." },
    ],
    quoteInfo: ["Origins and destinations", "Number and type of cars", "Frequency", "Dates", "Access at each end", "Contact person"],
    faqs: [
      { q: "Can you collect from a port?", a: "Port collection can be discussed after assessing the cars and route." },
      { q: "Can you deliver to customers?", a: "Yes, customer delivery can be discussed." },
      { q: "Do you cover new cars with protection?", a: "Protection arrangements are agreed in advance." },
      { q: "Is a regular arrangement possible?", a: "Yes, recurring movements can be discussed." },
      { q: "How do I get a quotation?", a: "Send the flows, cars and dates." },
    ],
  }),
  rec({
    id: "van-transportation",
    parentId: "commercial-vehicle-transport",
    name: "Van Transportation",
    icon: "truck",
    order: 1,
    short: "Moving panel vans and light commercial vehicles without driving them.",
    audienceShort: "Delivery fleets, dealers and van owners",
    seoTitle: "Van Transportation for Panel Vans and Light Commercial Vehicles",
    metaDescription:
      "Arrange van transportation for panel vans and light commercial vehicles. Height and weight confirmed per request. Gulf Elite Transport.",
    primaryKeyword: "van transportation",
    secondaryKeywords: ["transport a van", "light commercial vehicle transport", "delivery van transport"],
    semanticKeywords: ["van height", "high roof", "payload", "ramp", "fleet van", "converted van"],
    searchIntent: "Commercial: a business needs a van moved.",
    related: ["multiple-car-transport", "single-car-transport"],
    relatedMain: ["contract-fleet-services"],
    layout: { hero: "ribbon", body: "table", form: "hero" },
    lead: "A high-roof van is taller than most cars. The numbers decide whether it fits, not the model name.",
    directAnswer:
      "Van transportation is the movement of panel vans and light commercial vehicles from a collection point to a delivery point without driving them. Gulf Elite Transport asks for the van's height, length and weight and confirms individually whether a suitable arrangement can be supported before a quotation is agreed.",
    differs: {
      heading: "How van transportation differs from related services",
      text: "This page is for vans. Car Transportation covers cars. Commercial Vehicle Transport is the parent covering vans, buses and trucks. Moving the contents of a van is a cargo job, not a vehicle job.",
    },
    overview: [
      "Vans vary a lot in height and weight, particularly when they are loaded with shelving or converted. Height is the figure most likely to decide the vehicle and route.",
      "Gulf Elite Transport asks for the exact dimensions, whether the van runs and the locations. We confirm what can be supported and provide a quotation.",
    ],
    includes: [
      { title: "Dimension review", text: "Height, length and weight checked." },
      { title: "Loading planning", text: "Ramps and space considered." },
      { title: "Collection and delivery", text: "Between agreed addresses." },
      { title: "Multiple vans", text: "Several vans discussed together." },
    ],
    audience: ["Delivery companies", "Van dealers", "Tradespeople", "Hire companies"],
    applications: [
      { title: "Fleet purchase", text: "New vans moved to a depot." },
      { title: "Breakdown", text: "A van moved to a workshop." },
      { title: "Sale", text: "A sold van delivered to the buyer." },
      { title: "Conversion", text: "A van moved to a conversion shop." },
    ],
    steps: [
      { title: "Send dimensions", text: "Height, length, weight." },
      { title: "Describe condition", text: "Whether it runs." },
      { title: "Share locations", text: "Collection and delivery." },
      { title: "Receive the quotation", text: "After confirmation." },
    ],
    considerations: [
      { title: "Height", text: "High-roof vans need extra clearance." },
      { title: "Contents", text: "Empty the van before transport." },
      { title: "Weight", text: "Converted vans can be heavy." },
      { title: "Access", text: "Both ends need loading space." },
    ],
    quoteInfo: ["Van make and model", "Height, length and weight", "Whether it runs", "Locations", "Dates", "Contact person"],
    faqs: [
      { q: "Can you move a loaded van?", a: "Empty it first; contents are not assumed to be part of the move." },
      { q: "Can you move a high-roof van?", a: "Share the exact height so we can assess it." },
      { q: "Can you move several vans?", a: "Yes, multiple vans can be discussed." },
      { q: "Do you provide a driver for the van?", a: "No. This service moves the vehicle." },
      { q: "How do I get a quotation?", a: "Send the van details, locations and dates." },
    ],
  }),
  rec({
    id: "hotel-furniture-transportation",
    parentId: "commercial-furniture-transport",
    name: "Hotel Furniture Transportation",
    icon: "building",
    order: 1,
    short: "Delivering room, lobby and restaurant furniture to hotels, in phases that match the fit-out.",
    audienceShort: "Hotel owners, fit-out contractors and furniture suppliers",
    seoTitle: "Hotel Furniture Transportation for Fit-Outs and Refurbishments",
    metaDescription:
      "Plan hotel furniture transportation for new hotels and refurbishments, phased to the fit-out. Gulf Elite Transport quotation.",
    primaryKeyword: "hotel furniture transportation",
    secondaryKeywords: ["hotel fit-out delivery", "hospitality furniture transport", "room furniture delivery"],
    semanticKeywords: ["room sets", "lobby", "floor by floor", "service lift", "protective wrap", "opening date"],
    searchIntent: "Commercial: a hotel project needs furniture delivered.",
    related: ["office-furniture-moving", "furniture-delivery"],
    relatedMain: ["warehousing-storage"],
    layout: { hero: "mirror", body: "timeline", form: "aside" },
    lead: "A hotel opens one floor at a time. The furniture should arrive in the same order.",
    directAnswer:
      "Hotel furniture transportation is the delivery of room, lobby, restaurant and corridor furniture to a hotel, usually in phases that follow the fit-out. Gulf Elite Transport plans the loads, the delivery order and the site access with you and provides a quotation before you commit. Assembly, placement and installation are not assumed.",
    differs: {
      heading: "How hotel furniture transportation differs from related services",
      text: "This page is for hotels. Commercial Furniture Transport is the parent covering shops and restaurants too. Office Furniture Moving covers offices. Storage before the fit-out is a separate warehousing service.",
    },
    overview: [
      "Hotels need many identical room sets plus public-area furniture. Delivering floor by floor keeps corridors clear and lets finishing trades work behind the furniture.",
      "Gulf Elite Transport asks for the pieces, the sequence, the site and the service lift. We confirm what can be supported and provide a quotation.",
    ],
    includes: [
      { title: "Room set delivery", text: "Beds, wardrobes and desks delivered per floor." },
      { title: "Public-area furniture", text: "Lobby and restaurant furniture." },
      { title: "Phased deliveries", text: "Aligned with the fit-out sequence." },
      { title: "Protective handling", text: "Wrapped to protect finishes." },
    ],
    audience: ["Hotel owners", "Fit-out contractors", "Furniture importers", "Hospitality procurement teams"],
    applications: [
      { title: "New hotel", text: "All rooms furnished in phases." },
      { title: "Refurbishment", text: "A floor refurbished while others operate." },
      { title: "Resort", text: "Furniture delivered to several buildings." },
      { title: "Restaurant fit-out", text: "Tables and chairs for hotel dining." },
    ],
    steps: [
      { title: "List the sets", text: "Rooms and public areas." },
      { title: "Set the sequence", text: "Floors and dates." },
      { title: "Confirm access", text: "Service lift and loading bay." },
      { title: "Deliver", text: "Phase by phase." },
    ],
    considerations: [
      { title: "Service lift", text: "Booking and capacity limit the pace." },
      { title: "Protection", text: "Finished corridors need protection." },
      { title: "Storage", text: "Early arrivals need space." },
      { title: "Labour", text: "Unloading and placement are agreed in advance." },
    ],
    quoteInfo: ["Pieces and quantities", "Pickup point", "Hotel address and access", "Sequence and dates", "Unloading arrangements", "Contact person"],
    faqs: [
      { q: "Do you place furniture in the rooms?", a: "Placement is not assumed and is agreed in advance." },
      { q: "Can deliveries be floor by floor?", a: "Yes, phased deliveries can be discussed." },
      { q: "Do you assemble beds?", a: "No, not unless agreed in writing." },
      { q: "Can you deliver to a resort with several buildings?", a: "Multi-building delivery can be discussed." },
      { q: "How do I get a quotation?", a: "Send the pieces, sequence and site." },
    ],
  }),
  rec({
    id: "furniture-collection",
    parentId: "household-goods-transport",
    name: "Furniture Collection",
    icon: "box",
    order: 1,
    short: "Collecting furniture from a home, seller or store and delivering it to the buyer or a new address.",
    audienceShort: "Buyers and sellers of furniture",
    seoTitle: "Furniture Collection and Delivery from Seller to Buyer",
    metaDescription:
      "Arrange furniture collection from a seller, store or home, with delivery to your address. Access and timing planned. Gulf Elite Transport.",
    primaryKeyword: "furniture collection",
    secondaryKeywords: ["collect furniture", "pick up bought furniture", "furniture pickup and delivery"],
    semanticKeywords: ["marketplace purchase", "second-hand furniture", "pickup", "access", "buyer", "seller"],
    searchIntent: "Consumer or commercial: someone needs bought furniture collected.",
    related: ["office-furniture-moving", "hotel-furniture-transportation"],
    relatedMain: ["last-mile-delivery"],
    layout: { hero: "ribbon", body: "timeline", form: "aside" },
    lead: "You bought it. Now it has to get from the seller's door to yours.",
    directAnswer:
      "Furniture collection is the pickup of furniture from a seller, store or home and its delivery to the buyer or to another address. Gulf Elite Transport asks for the item, both addresses and the access and provides a quotation before you commit. Dismantling, reassembly and removal of old furniture are not assumed.",
    differs: {
      heading: "How furniture collection differs from related services",
      text: "Here the pickup is from a person or store, not from your own stock. Furniture Delivery under Last-Mile is for sellers delivering their own orders. Household Goods Transport is the parent covering a household move.",
    },
    overview: [
      "A second-hand purchase usually has a pickup window set by the seller. Knowing the size, the floor and the access at the seller's address avoids a trip that cannot lift the item.",
      "Gulf Elite Transport asks for photos and measurements, both addresses and the dates. We confirm what can be supported and provide a quotation.",
    ],
    includes: [
      { title: "Pickup from the seller", text: "At an agreed time." },
      { title: "Protective handling", text: "Items covered for the journey." },
      { title: "Delivery to the buyer", text: "To the entrance or agreed point." },
      { title: "Access planning", text: "Stairs and lifts checked beforehand." },
    ],
    audience: ["Online marketplace buyers", "Second-hand dealers", "Households", "Small businesses buying furniture"],
    applications: [
      { title: "Marketplace purchase", text: "A sofa bought online and collected." },
      { title: "Showroom sale", text: "An item collected from a showroom." },
      { title: "Estate clearance", text: "Furniture moved from a property." },
      { title: "Donation", text: "Furniture collected for a new home." },
    ],
    steps: [
      { title: "Share photos and size", text: "Item dimensions and weight." },
      { title: "Give both addresses", text: "With floors and access." },
      { title: "Agree a time", text: "With seller and buyer." },
      { title: "Collect and deliver", text: "Item moved." },
    ],
    considerations: [
      { title: "Measurements", text: "Check the item fits doors and lifts." },
      { title: "Seller availability", text: "Confirm the pickup window." },
      { title: "Condition", text: "Note existing marks." },
      { title: "Dismantling", text: "Not assumed." },
    ],
    quoteInfo: ["Item with photos and size", "Both addresses and floors", "Pickup window", "Delivery date", "Lift and stairs", "Contact person"],
    faqs: [
      { q: "Can you collect from a private seller?", a: "Yes, with the seller's address and a pickup time." },
      { q: "Do you take furniture apart?", a: "No, not unless agreed in writing." },
      { q: "Can you collect several items?", a: "Yes, send the list." },
      { q: "Do you remove old furniture?", a: "Not assumed." },
      { q: "How do I get a quotation?", a: "Send the item, addresses and dates." },
    ],
  }),
  rec({
    id: "pallet-packaging",
    parentId: "cargo-packaging-coordination",
    name: "Pallet Packaging",
    icon: "layers",
    order: 1,
    short: "Planning how goods are stacked, wrapped and protected on pallets before transport.",
    audienceShort: "Shippers and warehouses preparing pallets",
    seoTitle: "Pallet Packaging: Stacking, Wrapping and Protection",
    metaDescription:
      "Plan pallet packaging for transport: stacking, wrapping and edge protection. Materials and labour confirmed per request. Gulf Elite Transport.",
    primaryKeyword: "pallet packaging",
    secondaryKeywords: ["pallet wrapping", "palletising goods", "stacking and wrapping pallets"],
    semanticKeywords: ["stretch wrap", "edge board", "pallet height", "overhang", "label", "stability"],
    searchIntent: "Commercial: a shipper wants pallets prepared correctly.",
    related: ["pallet-loading", "warehouse-unloading"],
    relatedMain: ["warehousing-storage"],
    layout: { hero: "mirror", body: "tiles", form: "hero" },
    lead: "A pallet that holds together in the warehouse can still fall apart on the road.",
    directAnswer:
      "Pallet packaging is the preparation of goods on pallets for transport: stacking, wrapping and protecting them so they stay stable. Gulf Elite Transport advises on suitable pallet preparation for your load and confirms individually what materials and labour can be provided. Packing materials are not assumed.",
    differs: {
      heading: "How pallet packaging differs from related services",
      text: "This page is about preparing the pallet. Cargo Packaging Coordination is the parent covering cartons and crates too. Pallet Loading covers putting pallets on the vehicle, and Pallet Storage covers holding them.",
    },
    overview: [
      "A stable pallet has an even stack, no overhang, wrap that holds the load to the pallet and protection for edges and fragile tops.",
      "Gulf Elite Transport asks about the goods, the weights and the journey. We advise and confirm what can be provided.",
    ],
    includes: [
      { title: "Stacking pattern", text: "Cartons stacked to lock together." },
      { title: "Wrapping", text: "Stretch wrap to hold the load." },
      { title: "Edge and top protection", text: "Boards or covers where needed." },
      { title: "Labelling", text: "Labels on visible sides." },
    ],
    audience: ["Manufacturers", "Distributors", "Exporters", "Warehouse teams"],
    applications: [
      { title: "Carton pallet", text: "Cartons stacked and wrapped." },
      { title: "Mixed pallet", text: "Different items stable together." },
      { title: "Heavy pallet", text: "Heavy goods wrapped and secured." },
      { title: "Fragile top", text: "Delicate goods protected." },
    ],
    steps: [
      { title: "Describe the goods", text: "Dimensions and weight." },
      { title: "Choose the pattern", text: "Stacking and height." },
      { title: "Wrap and protect", text: "Wrap and edges." },
      { title: "Label", text: "Destination and handling marks." },
    ],
    considerations: [
      { title: "Overhang", text: "Keep goods within the pallet edge." },
      { title: "Height", text: "Tall pallets are less stable." },
      { title: "Pallet quality", text: "Damaged pallets cause failures." },
      { title: "Materials", text: "Not assumed; agree who supplies them." },
    ],
    quoteInfo: ["Goods and dimensions", "Weight per pallet", "Number of pallets", "Journey", "Materials needed", "Contact person"],
    faqs: [
      { q: "Do you supply wrap and boards?", a: "Not assumed; this is confirmed per request." },
      { q: "How tall can a pallet be?", a: "It depends on the goods and the vehicle; we advise per load." },
      { q: "Can you rewrap damaged pallets?", a: "Rewrapping can be discussed." },
      { q: "Do you provide the pallets?", a: "Not assumed." },
      { q: "How do I get a quotation?", a: "Send the goods and number of pallets." },
    ],
  }),
  rec({
    id: "warehouse-unloading",
    parentId: "cargo-unloading-support",
    name: "Warehouse Unloading",
    icon: "warehouse",
    order: 1,
    short: "Planning how deliveries are unloaded at a warehouse dock, from pallets to loose cartons.",
    audienceShort: "Warehouses and distributors receiving deliveries",
    seoTitle: "Warehouse Unloading at the Dock",
    metaDescription:
      "Coordinate warehouse unloading of pallets and loose cartons at the dock. Equipment and labour confirmed per request. Gulf Elite Transport.",
    primaryKeyword: "warehouse unloading",
    secondaryKeywords: ["dock unloading", "unloading pallets", "unloading loose cartons"],
    semanticKeywords: ["dock slot", "pallet jack", "hand unload", "delivery window", "receiving team", "driver wait"],
    searchIntent: "Commercial: a warehouse wants deliveries unloaded efficiently.",
    related: ["pallet-loading", "pallet-packaging"],
    relatedMain: ["warehousing-storage"],
    layout: { hero: "ribbon", body: "cards", form: "hero" },
    lead: "Every minute a vehicle waits at the dock is paid for twice, by the carrier and the receiver.",
    directAnswer:
      "Warehouse unloading is the unloading of delivery vehicles at a warehouse dock, whether pallets or loose cartons. Gulf Elite Transport agrees with you how unloading will be done, who provides the labour and equipment and when the vehicle is expected, and provides a quotation before you commit. Forklifts and pallet jacks are not assumed.",
    differs: {
      heading: "How warehouse unloading differs from related services",
      text: "This page is about the dock. Cargo Unloading Support is the parent covering other sites. Goods Receiving covers the checks made once goods are off the vehicle. Machinery Unloading Coordination covers heavy items.",
    },
    overview: [
      "A good dock process starts before the vehicle arrives: a slot booked, a team ready and the method agreed. Loose cartons take longer to unload than pallets.",
      "Gulf Elite Transport asks about the dock, the goods and the equipment on site. We confirm what can be supported and provide a quotation.",
    ],
    includes: [
      { title: "Pallet unloading", text: "With equipment agreed in advance." },
      { title: "Hand unloading", text: "Loose cartons unloaded by hand, if agreed." },
      { title: "Dock slot", text: "Arrival aligned with the receiving slot." },
      { title: "Waiting time", text: "Agreed limits on waiting." },
    ],
    audience: ["Warehouse managers", "Distributors", "Importers", "Retailers with stockrooms"],
    applications: [
      { title: "Pallet delivery", text: "Pallets unloaded at the dock." },
      { title: "Loose load", text: "Cartons unloaded by hand." },
      { title: "Peak day", text: "Several vehicles scheduled in slots." },
      { title: "Container", text: "A container unloaded at a dock." },
    ],
    steps: [
      { title: "Describe the load", text: "Pallets or loose." },
      { title: "Agree the method", text: "Equipment and labour." },
      { title: "Book the slot", text: "Arrival time." },
      { title: "Unload", text: "Cargo off the vehicle." },
    ],
    considerations: [
      { title: "Equipment", text: "Confirm what is on site." },
      { title: "Slots", text: "Missing a slot can cause a long wait." },
      { title: "Loose loads", text: "Take longer and need more people." },
      { title: "Safety", text: "Dock safety rules apply." },
    ],
    quoteInfo: ["Warehouse dock details", "Load type and volume", "Equipment on site", "Slot time", "Labour needed", "Contact person"],
    faqs: [
      { q: "Do you bring a forklift?", a: "Not assumed; equipment is confirmed per request." },
      { q: "Can you unload loose cartons?", a: "Hand unloading can be discussed; it takes longer." },
      { q: "What if the dock is not ready?", a: "Agree waiting time limits beforehand." },
      { q: "Can you unload a container?", a: "Container unloading can be discussed." },
      { q: "How do I get a quotation?", a: "Send the load, dock and slot." },
    ],
  }),
  rec({
    id: "pallet-loading",
    parentId: "cargo-loading-support",
    name: "Pallet Loading",
    icon: "layers",
    order: 1,
    short: "Planning how palletised goods are loaded and balanced on a vehicle.",
    audienceShort: "Warehouses and manufacturers loading outbound pallets",
    seoTitle: "Pallet Loading onto Vehicles",
    metaDescription:
      "Coordinate pallet loading onto vehicles with load balance and securing planned. Equipment confirmed per request. Gulf Elite Transport.",
    primaryKeyword: "pallet loading",
    secondaryKeywords: ["loading pallets onto a truck", "pallet load plan", "palletised load balance"],
    semanticKeywords: ["load order", "weight balance", "pallet positions", "dock", "tail lift", "load plan"],
    searchIntent: "Commercial: a shipper wants pallets loaded correctly.",
    related: ["pallet-packaging", "warehouse-unloading"],
    relatedMain: ["freight-cargo-transport"],
    layout: { hero: "mirror", body: "cards", form: "aside" },
    lead: "Where each pallet sits on the vehicle decides how well the load rides.",
    directAnswer:
      "Pallet loading is the placing of palletised goods onto a vehicle in a planned order, balanced and secured for the journey. Gulf Elite Transport agrees the loading method, labour and equipment with you and provides a quotation before you commit. Forklifts and tail-lifts are not assumed.",
    differs: {
      heading: "How pallet loading differs from related services",
      text: "This page is about placing pallets on the vehicle. Pallet Packaging covers preparing the pallet. Cargo Loading Support is the parent covering containers and securing. Palletized Cargo Transportation covers the journey itself.",
    },
    overview: [
      "Heavier pallets go towards the front and low, and the order of loading follows the order of delivery. A good load plan prevents shifting and speeds up unloading.",
      "Gulf Elite Transport asks for the number of pallets, their weights and the delivery stops. We confirm what can be supported and provide a quotation.",
    ],
    includes: [
      { title: "Load plan", text: "Positions set by weight and stops." },
      { title: "Loading", text: "Pallets placed on the vehicle." },
      { title: "Securing", text: "Pallets restrained for the journey." },
      { title: "Count check", text: "Pallet count checked against the note." },
    ],
    audience: ["Warehouse managers", "Manufacturers", "Distributors", "Exporters"],
    applications: [
      { title: "Single drop", text: "Pallets loaded for one customer." },
      { title: "Multi-drop", text: "Pallets loaded in delivery order." },
      { title: "Mixed weights", text: "Heavy and light pallets balanced." },
      { title: "Export load", text: "Pallets loaded for onward shipment." },
    ],
    steps: [
      { title: "List the pallets", text: "Count, weight and stops." },
      { title: "Plan positions", text: "By weight and order." },
      { title: "Load and secure", text: "Pallets placed and restrained." },
      { title: "Check", text: "Count against the note." },
    ],
    considerations: [
      { title: "Weight balance", text: "Even weight across the vehicle." },
      { title: "Delivery order", text: "Last stop loaded first." },
      { title: "Equipment", text: "Confirm forklifts and tail-lifts." },
      { title: "Stability", text: "Unstable pallets should be fixed first." },
    ],
    quoteInfo: ["Number and weight of pallets", "Pallet size", "Delivery stops", "Loading site and dock", "Equipment available", "Contact person"],
    faqs: [
      { q: "Do you provide the forklift?", a: "Not assumed; equipment is confirmed per request." },
      { q: "Can you load for several stops?", a: "Yes, loading in delivery order can be planned." },
      { q: "Do you secure the pallets?", a: "Securing is planned and agreed for each load." },
      { q: "What if a pallet is unstable?", a: "It should be repaired before loading." },
      { q: "How do I get a quotation?", a: "Send the pallets, stops and site." },
    ],
  }),
  rec({
    id: "booth-material-delivery",
    parentId: "exhibition-cargo-transportation",
    name: "Booth Material Delivery",
    icon: "box",
    order: 1,
    short: "Delivering stand parts, fittings and graphics to an exhibition venue on time.",
    audienceShort: "Exhibitors and stand builders",
    seoTitle: "Booth Material Delivery to Exhibition Venues",
    metaDescription:
      "Plan booth material delivery of stand parts, fittings and graphics to exhibition venues within the move-in window. Gulf Elite Transport.",
    primaryKeyword: "booth material delivery",
    secondaryKeywords: ["exhibition stand delivery", "stand parts transport", "booth graphics delivery"],
    semanticKeywords: ["move-in", "stand number", "crates", "graphics", "dock", "install window"],
    searchIntent: "Commercial: an exhibitor needs stand materials delivered.",
    related: ["event-equipment-logistics", "exhibition-return-logistics"],
    relatedMain: ["express-urgent-delivery"],
    layout: { hero: "ribbon", body: "columns", form: "bottom" },
    lead: "The stand cannot be built until its parts are at the venue. The venue will not wait.",
    directAnswer:
      "Booth material delivery is the transport of stand parts, fittings, graphics and display items to an exhibition venue, timed to the venue's move-in window. Gulf Elite Transport plans the delivery against your set-up time and provides a quotation before you commit. Stand building and venue labour are not assumed.",
    differs: {
      heading: "How booth material delivery differs from related services",
      text: "This page covers the stand's own materials. Exhibition Cargo Transportation is the parent also covering equipment and display products. Event Equipment Logistics covers production equipment. Exhibition Return Logistics covers the way back.",
    },
    overview: [
      "Booth materials are usually crated or rolled and labelled with the stand number. Arriving in the right slot at the right dock decides whether the stand is ready for opening.",
      "Gulf Elite Transport asks for the venue, the move-in window, the crates and the dock. We confirm what can be supported and provide a quotation.",
    ],
    includes: [
      { title: "Crated stand parts", text: "Frames, panels and fittings." },
      { title: "Graphics and signage", text: "Rolled or flat graphics protected." },
      { title: "Dock delivery", text: "Delivered to the venue dock." },
      { title: "Window planning", text: "Arrival set against the move-in slot." },
    ],
    audience: ["Exhibitors", "Stand builders", "Marketing teams", "Event agencies"],
    applications: [
      { title: "Custom stand", text: "Large crates delivered for on-site build." },
      { title: "Shell scheme", text: "Graphics and a few fittings." },
      { title: "Roadshow", text: "Materials moved city to city." },
      { title: "Late graphics", text: "Printed items delivered at the last minute." },
    ],
    steps: [
      { title: "Share the venue details", text: "Dates, dock and window." },
      { title: "List crates", text: "Sizes and weights." },
      { title: "Label", text: "Stand number and event." },
      { title: "Deliver", text: "Crates delivered to the dock." },
    ],
    considerations: [
      { title: "Move-in window", text: "Missing it may block access." },
      { title: "Labelling", text: "Unlabelled crates get lost." },
      { title: "Protection", text: "Graphics need flat, dry packing." },
      { title: "Unloading", text: "Venue labour is arranged in advance." },
    ],
    quoteInfo: ["Venue and move-in window", "Crate list with sizes", "Stand number", "Dock details", "Return plan", "Contact person"],
    faqs: [
      { q: "Do you build the stand?", a: "No. Stand building is not assumed." },
      { q: "Can you deliver after set-up has begun?", a: "Late delivery can be discussed; timing is confirmed per request." },
      { q: "Do you unload at the venue?", a: "Unloading arrangements are agreed in advance." },
      { q: "Can you collect afterwards?", a: "Return transport can be planned in advance." },
      { q: "How do I get a quotation?", a: "Send the venue, window and crate list." },
    ],
  }),
  rec({
    id: "engine-parts-transportation",
    parentId: "automotive-spare-parts-delivery",
    name: "Engine Parts Transportation",
    icon: "cog",
    order: 1,
    short: "Moving engine components and heavier automotive parts securely between suppliers and workshops.",
    audienceShort: "Engine specialists, workshops and parts suppliers",
    seoTitle: "Engine Parts Transportation for Workshops and Suppliers",
    metaDescription:
      "Plan engine parts transportation of heavy automotive components between suppliers and workshops. Gulf Elite Transport quotation.",
    primaryKeyword: "engine parts transportation",
    secondaryKeywords: ["engine component delivery", "heavy auto parts transport", "gearbox delivery"],
    semanticKeywords: ["cylinder head", "gearbox", "crate", "weight", "oil residue", "core exchange"],
    searchIntent: "Commercial: a workshop or supplier needs heavy engine parts moved.",
    related: ["urgent-parts-transportation", "emergency-spare-parts"],
    relatedMain: ["express-urgent-delivery", "equipment-machinery-moving"],
    layout: { hero: "mirror", body: "checklist", form: "hero" },
    lead: "An engine block or gearbox is small on a map and heavy on a scale.",
    directAnswer:
      "Engine parts transportation is the movement of engine components and heavier automotive parts, such as blocks, cylinder heads and gearboxes, between suppliers, remanufacturers and workshops. Gulf Elite Transport asks for the part, its weight and packing and provides a quotation before you commit. Lifting equipment and fluid handling are not assumed.",
    differs: {
      heading: "How engine parts transportation differs from related services",
      text: "This page is for heavy parts. Automotive Spare Parts Delivery is the parent covering regular parts runs. Urgent Parts Transportation covers time-sensitive moves. Heavy Equipment Transportation covers machines, not parts.",
    },
    overview: [
      "Heavy parts need a pallet or crate and a way to load and unload them. Parts that have been run may carry oil residue, which affects how they should be packed.",
      "Gulf Elite Transport asks about the part, weight, packing and the handling at both ends. We confirm what can be supported and provide a quotation.",
    ],
    includes: [
      { title: "Weight and packing review", text: "Part, crate or pallet checked." },
      { title: "Pickup and delivery", text: "Between supplier and workshop." },
      { title: "Core returns", text: "Old parts returned if requested." },
      { title: "Handling plan", text: "Loading and unloading agreed." },
    ],
    audience: ["Engine rebuilders", "Garages", "Parts suppliers", "Fleet maintenance teams"],
    applications: [
      { title: "Rebuilt engine", text: "A rebuilt engine delivered to a garage." },
      { title: "Gearbox exchange", text: "New part delivered and old one returned." },
      { title: "Supplier transfer", text: "Parts moved between suppliers." },
      { title: "Fleet depot", text: "Parts delivered to a fleet workshop." },
    ],
    steps: [
      { title: "Describe the part", text: "Type, weight and packing." },
      { title: "Share the route", text: "Pickup and delivery." },
      { title: "Agree handling", text: "Lifting at both ends." },
      { title: "Move", text: "Collected and delivered." },
    ],
    considerations: [
      { title: "Weight", text: "Heavy parts need suitable handling." },
      { title: "Fluids", text: "Drain or contain oil and coolant." },
      { title: "Packing", text: "Crate or strap to a pallet." },
      { title: "Lifting", text: "Not assumed." },
    ],
    quoteInfo: ["Part type and weight", "Packing", "Pickup and delivery", "Handling equipment at each end", "Return of core", "Contact person"],
    faqs: [
      { q: "Can you move a complete engine?", a: "Share the weight and packing and we assess it." },
      { q: "Do you provide a crane or lift?", a: "Not assumed; lifting is agreed in advance." },
      { q: "Can you return the old part?", a: "Yes, a core return can be discussed." },
      { q: "What about oil in the part?", a: "Parts should be drained or contained before transport." },
      { q: "How do I get a quotation?", a: "Send the part, weight and route." },
    ],
  }),
];
