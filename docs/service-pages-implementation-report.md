# Service pages: implementation and QA report

Generated from the built site (`out/`) and the source files after the implementation described in docs/service-pages-optimization-prompt.md.

## A. Pages completed

| # | URL | Status |
|---|---|---|
| 1 | https://gulfelitetransportgroup.com/services/freight-cargo-transport | Implemented, built and tested |
| 2 | https://gulfelitetransportgroup.com/services/international-freight-forwarding | Implemented, built and tested |
| 3 | https://gulfelitetransportgroup.com/services/container-transportation | Implemented, built and tested |
| 4 | https://gulfelitetransportgroup.com/services/express-urgent-delivery | Implemented, built and tested |
| 5 | https://gulfelitetransportgroup.com/services/refrigerated-transportation | Implemented, built and tested |
| 6 | https://gulfelitetransportgroup.com/services/vehicle-transportation | Implemented, built and tested |
| 7 | https://gulfelitetransportgroup.com/services/furniture-household-moving | Implemented, built and tested |
| 8 | https://gulfelitetransportgroup.com/services/passenger-transport | Implemented, built and tested |
| 9 | https://gulfelitetransportgroup.com/services/taxi-cab-services | Implemented, built and tested |
| 10 | https://gulfelitetransportgroup.com/services/equipment-machinery-moving | Implemented, built and tested |
| 11 | https://gulfelitetransportgroup.com/services/industrial-project-logistics | Implemented, built and tested |
| 12 | https://gulfelitetransportgroup.com/services/packaging-cargo-handling | Implemented, built and tested |
| 13 | https://gulfelitetransportgroup.com/services/trade-show-exhibition-logistics | Implemented, built and tested |
| 14 | https://gulfelitetransportgroup.com/services/contract-fleet-services | Implemented, built and tested |
| 15 | https://gulfelitetransportgroup.com/services/last-mile-delivery | Implemented, built and tested |
| 16 | https://gulfelitetransportgroup.com/services/commercial-distribution-services | Implemented, built and tested |
| 17 | https://gulfelitetransportgroup.com/services/warehousing-storage | Implemented, built and tested |
| 18 | https://gulfelitetransportgroup.com/services/spare-parts-automotive-logistics | Implemented, built and tested |

## B. Design (hero, section styles and the service rail)

| Page | Hero | Includes / steps / use cases / planning | Coverage style | Rail |
|---|---|---|---|---|
| freight-cargo-transport | Split hero: text left, compact form right | cards / grid / navy / cards | grid | arrows |
| international-freight-forwarding | Band hero: text and form, benefit cards underneath | ledger / timeline / columns / table | columns | stacked |
| container-transportation | Ledger hero: text and form, numbered benefits strip | tiles / chevrons / list / split | accordion | chips |
| express-urgent-delivery | Centred hero: form first, then centred text and benefit chips | cards / timeline / navy / cards | columns | stacked |
| refrigerated-transportation | Light ivory hero: text and photo left, form right | ledger / chevrons / columns / table | grid | arrows |
| vehicle-transportation | Banner hero: accent-rule headline, form beside it, wide photo below | tiles / grid / list / cards | accordion | chips |
| furniture-household-moving | Light ivory hero: text and photo left, form right | cards / timeline / columns / split | columns | arrows |
| passenger-transport | Split hero: text left, compact form right | tiles / chevrons / navy / table | grid | stacked |
| taxi-cab-services | Ledger hero: text and form, numbered benefits strip | cards / grid / columns / cards | accordion | chips |
| equipment-machinery-moving | Band hero: text and form, benefit cards underneath | ledger / chevrons / navy / split | columns | stacked |
| industrial-project-logistics | Banner hero: accent-rule headline, form beside it, wide photo below | cards / timeline / list / table | grid | arrows |
| packaging-cargo-handling | Centred hero: form first, then centred text and benefit chips | tiles / grid / columns / cards | accordion | chips |
| trade-show-exhibition-logistics | Ledger hero: text and form, numbered benefits strip | ledger / timeline / navy / split | grid | arrows |
| contract-fleet-services | Split hero: text left, compact form right | cards / chevrons / list / table | columns | stacked |
| last-mile-delivery | Light ivory hero: text and photo left, form right | tiles / timeline / columns / cards | accordion | chips |
| commercial-distribution-services | Banner hero: accent-rule headline, form beside it, wide photo below | ledger / grid / navy / split | columns | stacked |
| warehousing-storage | Ledger hero: text and form, numbered benefits strip | cards / chevrons / columns / table | grid | arrows |
| spare-parts-automotive-logistics | Centred hero: form first, then centred text and benefit chips | ledger / grid / list / cards | columns | chips |

## D. Image placements (3 per page, public/images/routes/services/<slug>/<file>.webp, about 1000 x 558)

**freight-cargo-transport**
- Hero or top of the overview: `public/images/routes/services/freight-cargo-transport/freight-cargo-transport.webp` (alt: "A loaded commercial truck on a Saudi highway")
- How it works section: `public/images/routes/services/freight-cargo-transport/freight-cargo-loading-dispatch.webp` (alt: "Palletised cargo being loaded onto a truck at a loading dock")
- Coverage section: `public/images/routes/services/freight-cargo-transport/freight-cargo-saudi-arabia-routes.webp` (alt: "A freight truck driving between Saudi cities")

**international-freight-forwarding**
- Hero or top of the overview: `public/images/routes/services/international-freight-forwarding/international-freight-forwarding.webp` (alt: "Shipping containers stacked at a port terminal")
- How it works section: `public/images/routes/services/international-freight-forwarding/international-freight-documents-handover.webp` (alt: "A logistics coordinator checking shipment documents beside cargo")
- Coverage section: `public/images/routes/services/international-freight-forwarding/international-freight-saudi-ports.webp` (alt: "A cargo ship at a Saudi port berth")

**container-transportation**
- Hero or top of the overview: `public/images/routes/services/container-transportation/container-transportation.webp` (alt: "A truck carrying a shipping container on a Saudi road")
- How it works section: `public/images/routes/services/container-transportation/container-port-haulage.webp` (alt: "A container being lifted onto a trailer at a port yard")
- Coverage section: `public/images/routes/services/container-transportation/container-delivery-site-access.webp` (alt: "A container truck arriving at an industrial site gate")

**express-urgent-delivery**
- Hero or top of the overview: `public/images/routes/services/express-urgent-delivery/express-urgent-delivery.webp` (alt: "A delivery van leaving a business site with a parcel load")
- How it works section: `public/images/routes/services/express-urgent-delivery/express-delivery-priority-pickup.webp` (alt: "A driver collecting a sealed urgent parcel from a reception desk")
- Coverage section: `public/images/routes/services/express-urgent-delivery/express-delivery-intercity-run.webp` (alt: "A delivery vehicle on a highway between Saudi cities")

**refrigerated-transportation**
- Hero or top of the overview: `public/images/routes/services/refrigerated-transportation/refrigerated-transportation.webp` (alt: "A refrigerated truck parked at a loading bay")
- How it works section: `public/images/routes/services/refrigerated-transportation/refrigerated-cold-chain-loading.webp` (alt: "Chilled food cartons being loaded into a refrigerated truck")
- Coverage section: `public/images/routes/services/refrigerated-transportation/refrigerated-intercity-route.webp` (alt: "A refrigerated truck on a long desert highway in Saudi Arabia")

**vehicle-transportation**
- Hero or top of the overview: `public/images/routes/services/vehicle-transportation/vehicle-transportation.webp` (alt: "A car carrier truck loaded with cars on a Saudi highway")
- How it works section: `public/images/routes/services/vehicle-transportation/vehicle-loading-car-carrier.webp` (alt: "A car being driven up the ramp of a car transporter")
- Coverage section: `public/images/routes/services/vehicle-transportation/vehicle-transport-saudi-routes.webp` (alt: "A vehicle transporter on a long-distance road between Saudi regions")

**furniture-household-moving**
- Hero or top of the overview: `public/images/routes/services/furniture-household-moving/furniture-household-moving.webp` (alt: "A moving truck with its ramp down outside a residential building")
- How it works section: `public/images/routes/services/furniture-household-moving/furniture-loading-protection.webp` (alt: "Furniture wrapped in protective covers being carried to a truck")
- Coverage section: `public/images/routes/services/furniture-household-moving/household-move-between-cities.webp` (alt: "A moving truck driving between Saudi cities")

**passenger-transport**
- Hero or top of the overview: `public/images/routes/services/passenger-transport/passenger-transport.webp` (alt: "A passenger van waiting at a corporate entrance in Saudi Arabia")
- How it works section: `public/images/routes/services/passenger-transport/passenger-group-transfer.webp` (alt: "A group of travellers boarding a passenger vehicle")
- Coverage section: `public/images/routes/services/passenger-transport/passenger-intercity-travel.webp` (alt: "A passenger vehicle on a highway between Saudi cities")

**taxi-cab-services**
- Hero or top of the overview: `public/images/routes/services/taxi-cab-services/taxi-cab-services.webp` (alt: "A private car and driver waiting at a kerb in a Saudi city")
- How it works section: `public/images/routes/services/taxi-cab-services/taxi-airport-pickup-saudi.webp` (alt: "A driver helping a traveller with luggage at an airport kerb")
- Coverage section: `public/images/routes/services/taxi-cab-services/taxi-intercity-saudi-arabia.webp` (alt: "A private car on a highway between two Saudi cities")

**equipment-machinery-moving**
- Hero or top of the overview: `public/images/routes/services/equipment-machinery-moving/equipment-machinery-moving.webp` (alt: "An excavator on a low-loader trailer")
- How it works section: `public/images/routes/services/equipment-machinery-moving/equipment-loading-ramp-securing.webp` (alt: "Heavy machinery being secured on a trailer with chains")
- Coverage section: `public/images/routes/services/equipment-machinery-moving/heavy-equipment-project-site.webp` (alt: "A trailer carrying a machine into a project site")

**industrial-project-logistics**
- Hero or top of the overview: `public/images/routes/services/industrial-project-logistics/industrial-project-logistics.webp` (alt: "Industrial equipment delivered to a plant construction site")
- How it works section: `public/images/routes/services/industrial-project-logistics/industrial-project-delivery-schedule.webp` (alt: "A project coordinator reviewing a delivery schedule at a site office")
- Coverage section: `public/images/routes/services/industrial-project-logistics/industrial-logistics-saudi-sites.webp` (alt: "A convoy of trucks heading to an industrial site")

**packaging-cargo-handling**
- Hero or top of the overview: `public/images/routes/services/packaging-cargo-handling/packaging-cargo-handling.webp` (alt: "Workers wrapping palletised cargo before transport")
- How it works section: `public/images/routes/services/packaging-cargo-handling/cargo-loading-unloading-dock.webp` (alt: "Cargo being unloaded from a truck at a dock")
- Coverage section: `public/images/routes/services/packaging-cargo-handling/cargo-securing-for-road.webp` (alt: "Straps securing a pallet load on a truck bed")

**trade-show-exhibition-logistics**
- Hero or top of the overview: `public/images/routes/services/trade-show-exhibition-logistics/trade-show-exhibition-logistics.webp` (alt: "Exhibition crates and display panels waiting at a venue loading area")
- How it works section: `public/images/routes/services/trade-show-exhibition-logistics/exhibition-setup-delivery-window.webp` (alt: "A delivery truck backed up to an exhibition hall loading door")
- Coverage section: `public/images/routes/services/trade-show-exhibition-logistics/exhibition-event-cargo-saudi.webp` (alt: "Event equipment loaded for transport after a show")

**contract-fleet-services**
- Hero or top of the overview: `public/images/routes/services/contract-fleet-services/contract-fleet-services.webp` (alt: "A row of commercial vehicles parked at a business site")
- How it works section: `public/images/routes/services/contract-fleet-services/contract-fleet-route-schedule.webp` (alt: "A transport manager reviewing a route schedule")
- Coverage section: `public/images/routes/services/contract-fleet-services/contract-fleet-saudi-corridors.webp` (alt: "A fleet vehicle on a highway in Saudi Arabia")

**last-mile-delivery**
- Hero or top of the overview: `public/images/routes/services/last-mile-delivery/last-mile-delivery.webp` (alt: "A delivery van at a customer's door with a parcel")
- How it works section: `public/images/routes/services/last-mile-delivery/last-mile-parcel-loading.webp` (alt: "Parcels sorted and loaded into a delivery van")
- Coverage section: `public/images/routes/services/last-mile-delivery/last-mile-city-delivery-saudi.webp` (alt: "A delivery vehicle in a residential street of a Saudi city")

**commercial-distribution-services**
- Hero or top of the overview: `public/images/routes/services/commercial-distribution-services/commercial-distribution-services.webp` (alt: "A distribution truck loaded with boxed goods at a warehouse door")
- How it works section: `public/images/routes/services/commercial-distribution-services/commercial-distribution-store-delivery.webp` (alt: "Boxes being delivered to the back door of a store")
- Coverage section: `public/images/routes/services/commercial-distribution-services/commercial-distribution-saudi-network.webp` (alt: "A distribution truck on a road linking Saudi cities")

**warehousing-storage**
- Hero or top of the overview: `public/images/routes/services/warehousing-storage/warehousing-storage.webp` (alt: "Palletised goods on racks inside a warehouse")
- How it works section: `public/images/routes/services/warehousing-storage/warehousing-inventory-handling.webp` (alt: "A worker checking inventory on shelving")
- Coverage section: `public/images/routes/services/warehousing-storage/warehousing-onward-dispatch.webp` (alt: "A truck being loaded at a warehouse dispatch bay")

**spare-parts-automotive-logistics**
- Hero or top of the overview: `public/images/routes/services/spare-parts-automotive-logistics/spare-parts-automotive-logistics.webp` (alt: "Boxed vehicle parts loaded into a delivery van")
- How it works section: `public/images/routes/services/spare-parts-automotive-logistics/automotive-parts-workshop-delivery.webp` (alt: "A driver handing a parts box to a workshop mechanic")
- Coverage section: `public/images/routes/services/spare-parts-automotive-logistics/automotive-supply-saudi-routes.webp` (alt: "A parts delivery truck on a road between Saudi cities")

## E. SEO and keyword report

### freight-cargo-transport
- URL: https://gulfelitetransportgroup.com/services/freight-cargo-transport
- Primary keyword: **Freight and Cargo Transport Services in Saudi Arabia**
- Search intent: Commercial and transactional: businesses looking for freight and cargo transportation within Saudi Arabia.
- SEO title: Freight and Cargo Transport Services in Saudi Arabia
- Meta description (158 chars): Freight and cargo transport services in Saudi Arabia: domestic road freight for businesses, with planned pickups and delivery. Describe your load for a quote.
- H1: Freight and Cargo Transport Services in Saudi Arabia
- Secondary keywords (12): Freight Transport Services Saudi Arabia; Cargo Transportation Services Saudi Arabia; Cargo Transport Company in Saudi Arabia; Commercial Freight Transport Saudi Arabia; Domestic Cargo Transportation Saudi Arabia; Business Cargo Transport Services; Freight Shipping Services in Saudi Arabia; Goods Transportation Services Saudi Arabia; B2B Freight Transport Saudi Arabia; Cargo Delivery Services Saudi Arabia; Road Freight Services Saudi Arabia; Bulk Cargo Transportation Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Freight Transport Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Cargo Transportation Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Cargo Transport Company in Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Commercial Freight Transport Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Domestic Cargo Transportation Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Business Cargo Transport Services: variants
  - Freight Shipping Services in Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Goods Transportation Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - B2B Freight Transport Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Cargo Delivery Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Road Freight Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Bulk Cargo Transportation Saudi Arabia: solutions (without the words Saudi Arabia attached)

### international-freight-forwarding
- URL: https://gulfelitetransportgroup.com/services/international-freight-forwarding
- Primary keyword: **International Freight Forwarding Services in Saudi Arabia**
- Search intent: Commercial and transactional: businesses seeking international freight forwarding and shipment coordination in Saudi Arabia.
- SEO title: International Freight Forwarding Services in Saudi Arabia
- Meta description (152 chars): International freight forwarding services in Saudi Arabia: routing, documents and handover planning for import and export cargo. Describe your shipment.
- H1: International Freight Forwarding Services in Saudi Arabia
- Secondary keywords (12): Freight Forwarding Company Saudi Arabia; International Freight Forwarder Saudi Arabia; Global Freight Forwarding Services; International Shipping Services Saudi Arabia; Import Freight Forwarding Saudi Arabia; Export Freight Forwarding Saudi Arabia; International Cargo Shipping Saudi Arabia; Sea Freight Forwarding Saudi Arabia; Air Freight Forwarding Saudi Arabia; International Logistics Services Saudi Arabia; Cross-Border Freight Services; International Shipment Coordination Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Freight Forwarding Company Saudi Arabia: FAQ (without the words Saudi Arabia attached)
  - International Freight Forwarder Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Global Freight Forwarding Services: variants
  - International Shipping Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Import Freight Forwarding Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Export Freight Forwarding Saudi Arabia: variants (without the words Saudi Arabia attached)
  - International Cargo Shipping Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Sea Freight Forwarding Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Air Freight Forwarding Saudi Arabia: FAQ (without the words Saudi Arabia attached)
  - International Logistics Services Saudi Arabia: Use cases (without the words Saudi Arabia attached)
  - Cross-Border Freight Services: variants
  - International Shipment Coordination Saudi Arabia: Overview (without the words Saudi Arabia attached)

### container-transportation
- URL: https://gulfelitetransportgroup.com/services/container-transportation
- Primary keyword: **Container Transportation Services in Saudi Arabia**
- Search intent: Commercial and transactional: businesses that need containers moved by road.
- SEO title: Container Transportation Services in Saudi Arabia
- Meta description (148 chars): Container transportation services in Saudi Arabia: road moves between ports, depots and sites. Share the container size and route for an assessment.
- H1: Container Transportation Services in Saudi Arabia
- Secondary keywords (12): Container Transport Company Saudi Arabia; Container Haulage Services Saudi Arabia; Shipping Container Transportation Saudi Arabia; Road Container Transport Saudi Arabia; Commercial Container Transport Services; Freight Container Transportation; Container Delivery Services Saudi Arabia; Port Container Transportation Saudi Arabia; Intercity Container Transport Saudi Arabia; Industrial Container Transportation; Heavy Container Transport Services; Container Logistics Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Container Transport Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Container Haulage Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Shipping Container Transportation Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Road Container Transport Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Commercial Container Transport Services: variants
  - Freight Container Transportation: variants
  - Container Delivery Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Port Container Transportation Saudi Arabia: solutions (without the words Saudi Arabia attached)
  - Intercity Container Transport Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Industrial Container Transportation: variants
  - Heavy Container Transport Services: variants
  - Container Logistics Saudi Arabia: solutions (without the words Saudi Arabia attached)

### express-urgent-delivery
- URL: https://gulfelitetransportgroup.com/services/express-urgent-delivery
- Primary keyword: **Express Delivery Services in Saudi Arabia**
- Search intent: Transactional: customers and businesses seeking urgent or time-sensitive delivery.
- SEO title: Express Delivery Services in Saudi Arabia
- Meta description (156 chars): Express delivery services in Saudi Arabia for urgent cargo and parcels. Send the pickup, the drop-off and your deadline and we tell you what we can support.
- H1: Express Delivery Services in Saudi Arabia
- Secondary keywords (12): Urgent Delivery Services Saudi Arabia; Express Courier Services Saudi Arabia; Fast Delivery Services Saudi Arabia; Same-Day Delivery Saudi Arabia; Time-Sensitive Delivery Services; Business Express Delivery Saudi Arabia; Urgent Cargo Delivery Saudi Arabia; Priority Delivery Services Saudi Arabia; Express Parcel Transport Saudi Arabia; Fast Shipment Delivery Saudi Arabia; Commercial Express Transport; Urgent Shipment Transportation Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Urgent Delivery Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Express Courier Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Fast Delivery Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Same-Day Delivery Saudi Arabia: solutions, Coverage, FAQ (without the words Saudi Arabia attached)
  - Time-Sensitive Delivery Services: variants
  - Business Express Delivery Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Urgent Cargo Delivery Saudi Arabia: What it includes (without the words Saudi Arabia attached)
  - Priority Delivery Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Express Parcel Transport Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Fast Shipment Delivery Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Commercial Express Transport: variants
  - Urgent Shipment Transportation Saudi Arabia: variants (without the words Saudi Arabia attached)

### refrigerated-transportation
- URL: https://gulfelitetransportgroup.com/services/refrigerated-transportation
- Primary keyword: **Refrigerated Transportation Services in Saudi Arabia**
- Search intent: Commercial and transactional: businesses requiring temperature-controlled transportation.
- SEO title: Refrigerated Transportation Services in Saudi Arabia
- Meta description (156 chars): Refrigerated transportation services in Saudi Arabia for chilled and frozen goods. Tell us the temperature range, the goods and the route for an assessment.
- H1: Refrigerated Transportation Services in Saudi Arabia
- Secondary keywords (12): Refrigerated Transport Company Saudi Arabia; Temperature Controlled Transportation Saudi Arabia; Cold Chain Transportation Services; Chilled Goods Transportation Saudi Arabia; Refrigerated Cargo Transport; Cold Transport Services Saudi Arabia; Perishable Goods Transportation; Food Transportation Services Saudi Arabia; Temperature Controlled Cargo Delivery; Refrigerated Logistics Saudi Arabia; Cold Chain Logistics Services; Frozen Goods Transportation Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Refrigerated Transport Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Temperature Controlled Transportation Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Cold Chain Transportation Services: variants
  - Chilled Goods Transportation Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Refrigerated Cargo Transport: variants
  - Cold Transport Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Perishable Goods Transportation: Overview, variants
  - Food Transportation Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Temperature Controlled Cargo Delivery: variants
  - Refrigerated Logistics Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Cold Chain Logistics Services: variants
  - Frozen Goods Transportation Saudi Arabia: variants (without the words Saudi Arabia attached)

### vehicle-transportation
- URL: https://gulfelitetransportgroup.com/services/vehicle-transportation
- Primary keyword: **Vehicle Transportation Services in Saudi Arabia**
- Search intent: Commercial and transactional: individuals and businesses looking for vehicle transportation.
- SEO title: Vehicle Transportation Services in Saudi Arabia
- Meta description (156 chars): Vehicle transportation services in Saudi Arabia for cars, vans and commercial vehicles between cities. Send the vehicle details and route for an assessment.
- H1: Vehicle Transportation Services in Saudi Arabia
- Secondary keywords (12): Car Transportation Services Saudi Arabia; Vehicle Transport Company Saudi Arabia; Car Transport Company Saudi Arabia; Automobile Transportation Saudi Arabia; Car Delivery Services Saudi Arabia; Vehicle Shipping Services Saudi Arabia; Intercity Car Transportation; Commercial Vehicle Transport Saudi Arabia; Vehicle Relocation Services; Car Carrier Transport Saudi Arabia; Auto Transport Services Saudi Arabia; Vehicle Moving Services Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Car Transportation Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Vehicle Transport Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Car Transport Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Automobile Transportation Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Car Delivery Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Vehicle Shipping Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Intercity Car Transportation: variants
  - Commercial Vehicle Transport Saudi Arabia: Overview, solutions (without the words Saudi Arabia attached)
  - Vehicle Relocation Services: variants
  - Car Carrier Transport Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Auto Transport Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Vehicle Moving Services Saudi Arabia: variants (without the words Saudi Arabia attached)

### furniture-household-moving
- URL: https://gulfelitetransportgroup.com/services/furniture-household-moving
- Primary keyword: **Furniture Moving Services in Saudi Arabia**
- Search intent: Transactional: households and individuals seeking furniture and household moving services.
- SEO title: Furniture Moving Services in Saudi Arabia
- Meta description (145 chars): Furniture moving services in Saudi Arabia for homes and offices, inside a city or between regions. Send your item list and addresses for a quote.
- H1: Furniture Moving Services in Saudi Arabia
- Secondary keywords (12): Household Moving Services Saudi Arabia; Furniture Transport Company Saudi Arabia; Home Relocation Services Saudi Arabia; Furniture Transportation Saudi Arabia; House Moving Company Saudi Arabia; Household Goods Transportation; Residential Moving Services Saudi Arabia; Furniture Delivery Services Saudi Arabia; Home Furniture Transport; Intercity Household Moving Saudi Arabia; Furniture Relocation Services; Household Item Transportation Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Household Moving Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Furniture Transport Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Home Relocation Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Furniture Transportation Saudi Arabia: variants (without the words Saudi Arabia attached)
  - House Moving Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Household Goods Transportation: Overview
  - Residential Moving Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Furniture Delivery Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Home Furniture Transport: variants
  - Intercity Household Moving Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Furniture Relocation Services: variants
  - Household Item Transportation Saudi Arabia: variants (without the words Saudi Arabia attached)

### passenger-transport
- URL: https://gulfelitetransportgroup.com/services/passenger-transport
- Primary keyword: **Passenger Transport Services in Saudi Arabia**
- Search intent: Commercial and transactional: individuals, groups and businesses looking for passenger transport.
- SEO title: Passenger Transport Services in Saudi Arabia
- Meta description (157 chars): Passenger transport services in Saudi Arabia for groups, staff and business travel. Tell us the group, route and schedule and we confirm what we can arrange.
- H1: Passenger Transport Services in Saudi Arabia
- Secondary keywords (12): Passenger Transportation Company Saudi Arabia; Private Passenger Transport Saudi Arabia; Passenger Transfer Services Saudi Arabia; Group Passenger Transportation; Corporate Passenger Transport Saudi Arabia; Business Passenger Transport Services; Intercity Passenger Transport Saudi Arabia; Private Transport Services Saudi Arabia; Passenger Travel Services Saudi Arabia; Employee Transportation Services Saudi Arabia; Private Travel Transportation; Passenger Transfer Company Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Passenger Transportation Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Private Passenger Transport Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Passenger Transfer Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Group Passenger Transportation: FAQ
  - Corporate Passenger Transport Saudi Arabia: solutions (without the words Saudi Arabia attached)
  - Business Passenger Transport Services: variants
  - Intercity Passenger Transport Saudi Arabia: FAQ (without the words Saudi Arabia attached)
  - Private Transport Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Passenger Travel Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Employee Transportation Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Private Travel Transportation: variants
  - Passenger Transfer Company Saudi Arabia: variants (without the words Saudi Arabia attached)

### taxi-cab-services
- URL: https://gulfelitetransportgroup.com/services/taxi-cab-services
- Primary keyword: **Taxi Services in Saudi Arabia**
- Search intent: Transactional: passengers seeking taxi, private cab and pre-arranged transport services.
- SEO title: Taxi Services in Saudi Arabia: Private Cab and Airport
- Meta description (139 chars): Taxi services in Saudi Arabia: private cab rides in cities, airport transfers and city-to-city trips. Book on WhatsApp or the booking form.
- H1: Taxi Services in Saudi Arabia
- Secondary keywords (12): Taxi Service Saudi Arabia; Cab Services Saudi Arabia; Private Taxi Service Saudi Arabia; Private Cab Service Saudi Arabia; Taxi Booking Saudi Arabia; Private Car Service Saudi Arabia; Intercity Taxi Service Saudi Arabia; City-to-City Taxi Saudi Arabia; Airport Taxi Service Saudi Arabia; Long Distance Taxi Saudi Arabia; Chauffeur Service Saudi Arabia; Door-to-Door Taxi Service Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Taxi Service Saudi Arabia: Overview, variants, FAQ (without the words Saudi Arabia attached)
  - Cab Services Saudi Arabia: Coverage, Enquiry (without the words Saudi Arabia attached)
  - Private Taxi Service Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Private Cab Service Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Taxi Booking Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Private Car Service Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Intercity Taxi Service Saudi Arabia: variants (without the words Saudi Arabia attached)
  - City-to-City Taxi Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Airport Taxi Service Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Long Distance Taxi Saudi Arabia: Overview, FAQ (without the words Saudi Arabia attached)
  - Chauffeur Service Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Door-to-Door Taxi Service Saudi Arabia: variants (without the words Saudi Arabia attached)

### equipment-machinery-moving
- URL: https://gulfelitetransportgroup.com/services/equipment-machinery-moving
- Primary keyword: **Equipment and Machinery Transportation Services in Saudi Arabia**
- Search intent: Commercial and transactional: industrial, construction and business customers requiring machinery transportation.
- SEO title: Equipment and Machinery Transportation Services Saudi Arabia
- Meta description (148 chars): Equipment and machinery transportation services in Saudi Arabia. Send the weight and dimensions of the machine and the route and we assess the move.
- H1: Equipment and Machinery Transportation Services in Saudi Arabia
- Secondary keywords (12): Machinery Moving Services Saudi Arabia; Equipment Transport Company Saudi Arabia; Heavy Equipment Transportation Saudi Arabia; Industrial Machinery Transport Saudi Arabia; Machinery Relocation Services; Industrial Equipment Moving Saudi Arabia; Heavy Machinery Transport Services; Construction Equipment Transportation; Commercial Equipment Moving; Industrial Equipment Logistics Saudi Arabia; Machinery Delivery Services Saudi Arabia; Equipment Relocation Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Machinery Moving Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Equipment Transport Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Heavy Equipment Transportation Saudi Arabia: Overview, What it includes, solutions (without the words Saudi Arabia attached)
  - Industrial Machinery Transport Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Machinery Relocation Services: variants
  - Industrial Equipment Moving Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Heavy Machinery Transport Services: variants
  - Construction Equipment Transportation: Overview
  - Commercial Equipment Moving: variants
  - Industrial Equipment Logistics Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Machinery Delivery Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Equipment Relocation Saudi Arabia: variants (without the words Saudi Arabia attached)

### industrial-project-logistics
- URL: https://gulfelitetransportgroup.com/services/industrial-project-logistics
- Primary keyword: **Industrial Project Logistics Services in Saudi Arabia**
- Search intent: Commercial and B2B: industrial companies, contractors and project-based businesses.
- SEO title: Industrial Project Logistics Services in Saudi Arabia
- Meta description (151 chars): Industrial project logistics services in Saudi Arabia: transport coordination for site projects. Outline your project and deliveries for an assessment.
- H1: Industrial Project Logistics Services in Saudi Arabia
- Secondary keywords (12): Project Logistics Company Saudi Arabia; Industrial Logistics Services Saudi Arabia; Project Cargo Transportation Saudi Arabia; Industrial Project Transportation; Project Cargo Logistics Saudi Arabia; Industrial Freight Solutions; Large Scale Project Logistics; Industrial Cargo Handling Saudi Arabia; Project Transport Coordination; Industrial Supply Chain Logistics; Engineering Project Logistics Saudi Arabia; Project-Based Transportation Services
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Project Logistics Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Industrial Logistics Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Project Cargo Transportation Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Industrial Project Transportation: Overview, solutions
  - Project Cargo Logistics Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Industrial Freight Solutions: variants
  - Large Scale Project Logistics: variants
  - Industrial Cargo Handling Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Project Transport Coordination: Overview
  - Industrial Supply Chain Logistics: variants
  - Engineering Project Logistics Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Project-Based Transportation Services: variants

### packaging-cargo-handling
- URL: https://gulfelitetransportgroup.com/services/packaging-cargo-handling
- Primary keyword: **Packaging and Cargo Handling Services in Saudi Arabia**
- Search intent: Commercial and transactional: businesses requiring cargo preparation, packaging and handling.
- SEO title: Packaging and Cargo Handling Services in Saudi Arabia
- Meta description (157 chars): Packaging and cargo handling services in Saudi Arabia: preparing, loading and unloading cargo for transport. Describe your goods and sites for an assessment.
- H1: Packaging and Cargo Handling Services in Saudi Arabia
- Secondary keywords (12): Cargo Packaging Services Saudi Arabia; Professional Cargo Handling Services; Freight Packaging Saudi Arabia; Goods Packing and Handling Services; Commercial Cargo Handling Saudi Arabia; Shipment Packaging Services; Cargo Preparation Services Saudi Arabia; Industrial Cargo Handling; Transport Packaging Services; Goods Handling Company Saudi Arabia; Shipment Handling Services; Cargo Loading and Unloading Services Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Cargo Packaging Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Professional Cargo Handling Services: variants
  - Freight Packaging Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Goods Packing and Handling Services: variants
  - Commercial Cargo Handling Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Shipment Packaging Services: variants
  - Cargo Preparation Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Industrial Cargo Handling: variants
  - Transport Packaging Services: variants
  - Goods Handling Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Shipment Handling Services: variants
  - Cargo Loading and Unloading Services Saudi Arabia: variants (without the words Saudi Arabia attached)

### trade-show-exhibition-logistics
- URL: https://gulfelitetransportgroup.com/services/trade-show-exhibition-logistics
- Primary keyword: **Exhibition Logistics Services in Saudi Arabia**
- Search intent: Commercial and transactional: event organisers, exhibitors and businesses taking part in exhibitions and trade shows.
- SEO title: Exhibition Logistics Services in Saudi Arabia
- Meta description (146 chars): Exhibition logistics services in Saudi Arabia for trade shows and events: transport of booth materials and equipment. Send venue, dates and items.
- H1: Exhibition Logistics Services in Saudi Arabia
- Secondary keywords (12): Trade Show Logistics Saudi Arabia; Exhibition Transportation Services; Exhibition Freight Services Saudi Arabia; Event Logistics Company Saudi Arabia; Exhibition Cargo Transportation; Trade Fair Logistics Saudi Arabia; Exhibition Material Delivery; Event Equipment Transportation; Exhibition Setup Logistics; Trade Show Freight Forwarding; Event Cargo Handling Saudi Arabia; Exhibition Shipment Coordination
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Trade Show Logistics Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Exhibition Transportation Services: variants
  - Exhibition Freight Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Event Logistics Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Exhibition Cargo Transportation: What it includes, solutions
  - Trade Fair Logistics Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Exhibition Material Delivery: Overview
  - Event Equipment Transportation: Overview
  - Exhibition Setup Logistics: variants
  - Trade Show Freight Forwarding: variants
  - Event Cargo Handling Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Exhibition Shipment Coordination: FAQ

### contract-fleet-services
- URL: https://gulfelitetransportgroup.com/services/contract-fleet-services
- Primary keyword: **Contract Fleet Services in Saudi Arabia**
- Search intent: B2B and commercial: companies requiring ongoing or contract-based transportation arrangements.
- SEO title: Contract Fleet Services in Saudi Arabia
- Meta description (152 chars): Contract fleet services in Saudi Arabia for businesses with regular transport needs. Describe your routine, routes and volumes and we assess a contract.
- H1: Contract Fleet Services in Saudi Arabia
- Secondary keywords (12): Fleet Contract Services Saudi Arabia; Business Fleet Transportation Services; Contract Transport Services Saudi Arabia; Dedicated Fleet Services Saudi Arabia; Long-Term Fleet Transportation; Commercial Fleet Solutions Saudi Arabia; Outsourced Fleet Transportation; Corporate Transport Contracts; Fleet Management Transport Services; Business Vehicle Fleet Services; Contract Logistics Transportation; Fleet Hire Services Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Fleet Contract Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Business Fleet Transportation Services: Overview
  - Contract Transport Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Dedicated Fleet Services Saudi Arabia: solutions (without the words Saudi Arabia attached)
  - Long-Term Fleet Transportation: variants
  - Commercial Fleet Solutions Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Outsourced Fleet Transportation: Overview
  - Corporate Transport Contracts: Overview
  - Fleet Management Transport Services: variants
  - Business Vehicle Fleet Services: variants
  - Contract Logistics Transportation: variants
  - Fleet Hire Services Saudi Arabia: variants (without the words Saudi Arabia attached)

### last-mile-delivery
- URL: https://gulfelitetransportgroup.com/services/last-mile-delivery
- Primary keyword: **Last Mile Delivery Services in Saudi Arabia**
- Search intent: Commercial and transactional: retailers, e-commerce businesses and companies requiring final-destination delivery.
- SEO title: Last Mile Delivery Services in Saudi Arabia
- Meta description (154 chars): Last mile delivery services in Saudi Arabia for retailers and online sellers: final delivery to customers. Share your volumes and areas for an assessment.
- H1: Last Mile Delivery Services in Saudi Arabia
- Secondary keywords (12): Last Mile Logistics Saudi Arabia; Final Mile Delivery Services; Last Mile Delivery Company Saudi Arabia; Business Last Mile Delivery; E-commerce Delivery Services Saudi Arabia; Customer Delivery Services; Retail Last Mile Delivery; Last Mile Distribution Saudi Arabia; Final Destination Delivery Services; Parcel Delivery Services Saudi Arabia; B2B Last Mile Logistics; Local Delivery Transportation Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Last Mile Logistics Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Final Mile Delivery Services: variants
  - Last Mile Delivery Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Business Last Mile Delivery: variants
  - E-commerce Delivery Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Customer Delivery Services: Overview
  - Retail Last Mile Delivery: Overview
  - Last Mile Distribution Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Final Destination Delivery Services: variants
  - Parcel Delivery Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - B2B Last Mile Logistics: Overview
  - Local Delivery Transportation Saudi Arabia: variants (without the words Saudi Arabia attached)

### commercial-distribution-services
- URL: https://gulfelitetransportgroup.com/services/commercial-distribution-services
- Primary keyword: **Commercial Distribution Services in Saudi Arabia**
- Search intent: B2B and commercial: manufacturers, suppliers, retailers and businesses requiring goods distribution.
- SEO title: Commercial Distribution Services in Saudi Arabia
- Meta description (158 chars): Commercial distribution services in Saudi Arabia: regular supply runs from your warehouse or supplier to shops and businesses. Outline the stops and schedule.
- H1: Commercial Distribution Services in Saudi Arabia
- Secondary keywords (12): Commercial Goods Distribution Saudi Arabia; Distribution Company Saudi Arabia; Business Distribution Services; Product Distribution Services Saudi Arabia; Commercial Transport and Distribution; Retail Distribution Logistics; B2B Distribution Services Saudi Arabia; Goods Distribution Company; Regional Distribution Services Saudi Arabia; Business Supply Distribution; Commercial Cargo Distribution; Distribution Transportation Services
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Commercial Goods Distribution Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Distribution Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Business Distribution Services: variants
  - Product Distribution Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Commercial Transport and Distribution: variants
  - Retail Distribution Logistics: Overview
  - B2B Distribution Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Goods Distribution Company: variants
  - Regional Distribution Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Business Supply Distribution: Overview
  - Commercial Cargo Distribution: variants
  - Distribution Transportation Services: variants

### warehousing-storage
- URL: https://gulfelitetransportgroup.com/services/warehousing-storage
- Primary keyword: **Warehousing and Storage Services in Saudi Arabia**
- Search intent: Commercial and transactional: businesses seeking warehousing and storage solutions.
- SEO title: Warehousing and Storage Services in Saudi Arabia
- Meta description (158 chars): Warehousing and storage services in Saudi Arabia for business goods. Describe what you store, for how long and how it leaves, and we confirm what is possible.
- H1: Warehousing and Storage Services in Saudi Arabia
- Secondary keywords (12): Warehouse Storage Services Saudi Arabia; Warehousing Company Saudi Arabia; Commercial Storage Services; Business Warehousing Solutions; Goods Storage Services Saudi Arabia; Cargo Storage Saudi Arabia; Logistics Warehousing Services; Inventory Storage Services Saudi Arabia; Distribution Warehousing Services; Short-Term Storage Services; Long-Term Warehouse Storage; Commercial Warehouse Solutions Saudi Arabia
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Warehouse Storage Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Warehousing Company Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Commercial Storage Services: variants
  - Business Warehousing Solutions: variants
  - Goods Storage Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Cargo Storage Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Logistics Warehousing Services: variants
  - Inventory Storage Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Distribution Warehousing Services: variants
  - Short-Term Storage Services: variants
  - Long-Term Warehouse Storage: Overview, variants
  - Commercial Warehouse Solutions Saudi Arabia: variants (without the words Saudi Arabia attached)

### spare-parts-automotive-logistics
- URL: https://gulfelitetransportgroup.com/services/spare-parts-automotive-logistics
- Primary keyword: **Automotive Spare Parts Logistics in Saudi Arabia**
- Search intent: Commercial and B2B: automotive parts suppliers, distributors, retailers and businesses.
- SEO title: Automotive Spare Parts Logistics in Saudi Arabia
- Meta description (145 chars): Automotive spare parts logistics in Saudi Arabia: transport of auto parts to workshops, dealers and stores. Tell us the route, volume and timing.
- H1: Automotive Spare Parts Logistics in Saudi Arabia
- Secondary keywords (12): Automotive Logistics Services Saudi Arabia; Spare Parts Transportation Saudi Arabia; Auto Parts Delivery Services; Automotive Parts Distribution Saudi Arabia; Car Parts Logistics Company; Vehicle Spare Parts Transport; Automotive Supply Chain Logistics; Spare Parts Distribution Services; Commercial Auto Parts Transportation; Automotive Cargo Transport Saudi Arabia; Auto Components Delivery Saudi Arabia; Automotive Freight Services
- Keyword-to-section mapping (12 of 12 appear in the page text as natural wording; where the page says "X services" and the brief says "X services Saudi Arabia", the "Saudi Arabia" part is carried by the surrounding sentence, the H1 and the coverage section):
  - Automotive Logistics Services Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Spare Parts Transportation Saudi Arabia: Overview, variants (without the words Saudi Arabia attached)
  - Auto Parts Delivery Services: variants
  - Automotive Parts Distribution Saudi Arabia: Overview (without the words Saudi Arabia attached)
  - Car Parts Logistics Company: variants
  - Vehicle Spare Parts Transport: variants
  - Automotive Supply Chain Logistics: variants
  - Spare Parts Distribution Services: variants
  - Commercial Auto Parts Transportation: Overview
  - Automotive Cargo Transport Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Auto Components Delivery Saudi Arabia: variants (without the words Saudi Arabia attached)
  - Automotive Freight Services: variants

## G. Contextual internal links (built pages)

**freight-cargo-transport**
- Jubail -> /taxi-saudi-arabia/eastern-province/jubail
- Riyadh -> /riyadh-taxi-service
- Jeddah -> /taxi-saudi-arabia/makkah-region/jeddah
- Madinah -> /taxi-saudi-arabia/madinah-region/madinah
- international freight forwarding -> /services/international-freight-forwarding
- container transportation -> /services/container-transportation
- warehousing and storage -> /services/warehousing-storage
- packaging and cargo handling -> /services/packaging-cargo-handling

**international-freight-forwarding**
- container transportation -> /services/container-transportation
- freight and cargo transport -> /services/freight-cargo-transport
- warehousing and storage -> /services/warehousing-storage

**container-transportation**
- international freight forwarding -> /services/international-freight-forwarding
- freight and cargo transport -> /services/freight-cargo-transport
- industrial project logistics -> /services/industrial-project-logistics

**express-urgent-delivery**
- last-mile delivery -> /services/last-mile-delivery
- commercial distribution -> /services/commercial-distribution-services
- freight and cargo transport -> /services/freight-cargo-transport

**refrigerated-transportation**
- packaging and cargo handling -> /services/packaging-cargo-handling
- warehousing and storage -> /services/warehousing-storage
- freight and cargo transport -> /services/freight-cargo-transport
- commercial distribution -> /services/commercial-distribution-services

**vehicle-transportation**
- spare parts and automotive logistics -> /services/spare-parts-automotive-logistics
- heavy equipment transportation -> /services/equipment-machinery-moving
- passenger transport -> /services/passenger-transport

**furniture-household-moving**
- Riyadh to Jeddah -> /taxi-saudi-arabia/routes/riyadh-to-jeddah
- packaging and cargo handling -> /services/packaging-cargo-handling
- commercial distribution -> /services/commercial-distribution-services
- last-mile delivery -> /services/last-mile-delivery

**passenger-transport**
- taxi and cab services -> /services/taxi-cab-services
- contract fleet services -> /services/contract-fleet-services
- freight and cargo transport -> /services/freight-cargo-transport

**taxi-cab-services**
- Riyadh taxi service -> /riyadh-taxi-service
- Saudi Arabia taxi guide -> /taxi-saudi-arabia
- passenger transport -> /services/passenger-transport
- Riyadh -> /riyadh-taxi-service
- Makkah -> /taxi-saudi-arabia/makkah-region/makkah
- Madinah -> /taxi-saudi-arabia/madinah-region/madinah
- Jeddah -> /taxi-saudi-arabia/makkah-region/jeddah

**equipment-machinery-moving**
- industrial project logistics -> /services/industrial-project-logistics
- freight and cargo transport -> /services/freight-cargo-transport
- vehicle transportation -> /services/vehicle-transportation

**industrial-project-logistics**
- equipment and machinery transportation -> /services/equipment-machinery-moving
- container transportation -> /services/container-transportation
- freight and cargo transport -> /services/freight-cargo-transport
- warehousing and storage -> /services/warehousing-storage

**packaging-cargo-handling**
- freight and cargo transport -> /services/freight-cargo-transport
- furniture and household moving -> /services/furniture-household-moving
- warehousing and storage -> /services/warehousing-storage
- exhibition logistics -> /services/trade-show-exhibition-logistics

**trade-show-exhibition-logistics**
- packaging and cargo handling -> /services/packaging-cargo-handling
- freight and cargo transport -> /services/freight-cargo-transport
- express delivery -> /services/express-urgent-delivery

**contract-fleet-services**
- freight and cargo transport -> /services/freight-cargo-transport
- commercial distribution -> /services/commercial-distribution-services
- last-mile delivery -> /services/last-mile-delivery
- passenger transport -> /services/passenger-transport

**last-mile-delivery**
- commercial distribution -> /services/commercial-distribution-services
- express delivery -> /services/express-urgent-delivery
- contract fleet services -> /services/contract-fleet-services
- furniture moving -> /services/furniture-household-moving

**commercial-distribution-services**
- contract fleet services -> /services/contract-fleet-services
- last-mile delivery -> /services/last-mile-delivery
- warehousing and storage -> /services/warehousing-storage
- freight and cargo transport -> /services/freight-cargo-transport

**warehousing-storage**
- container transportation -> /services/container-transportation
- freight and cargo transport -> /services/freight-cargo-transport
- commercial distribution -> /services/commercial-distribution-services
- packaging and cargo handling -> /services/packaging-cargo-handling

**spare-parts-automotive-logistics**
- vehicle transportation -> /services/vehicle-transportation
- express delivery -> /services/express-urgent-delivery
- commercial distribution -> /services/commercial-distribution-services
- freight and cargo transport -> /services/freight-cargo-transport

## C. Forms

- Compact hero form on all 18 pages: the site's own `QuoteForm` in a new `variant="compact"` (name, phone, email, one short "what do you need, and where" box, one button; the fields are about 300 px tall, about 400 px with the heading, on every viewport tested). Same validation, saving to the request store, WhatsApp/email fallback, honeypot and minimum-fill-time spam check, and `generate_lead` analytics event as every other form on the site.
- Bottom enquiry form on all 18 pages: the full `QuoteForm`, full width in two columns of fields. Two presentations (navy band with the copy beside it, or a centred card on the light surface). Never a tall side column; the old sticky side form was removed.
- Mobile: the compact form is the first element after the site header on all 18 pages, then the breadcrumb, H1 and text (checked in a real browser at 390 px: the form card starts about 20 px under the header and sits above the H1 on every page).
- Existing submission functionality: field validation was exercised in the browser (an empty submit shows the four existing error messages and the service value is pre-filled). A live submission was not sent, to avoid creating a real lead or opening WhatsApp. The submit code path itself is unchanged and shared with the other forms.

## F. Saudi regional coverage

- All 13 regions appear on every page (`src/content/services/coverage-regions.ts`): Riyadh, Makkah, Madinah, Eastern Province, Qassim, Asir, Jazan, Tabuk, Hail, Northern Borders, Al Jouf (Al Jawf, as the site's own pages name it), Al Bahah and Najran.
- Cities were taken from the brief's examples and cross-checked against the site's own region and town data (`src/content/saudi/regions.ts`, `cities.ts`, the Riyadh town pages). Included: Riyadh Region 12, Makkah 6, Madinah 5, Eastern Province 8, Qassim 4, Asir 4, Jazan 4, Tabuk 5, Hail 3, Northern Borders 3, Al Jouf 3, Al Bahah 3, Najran 2.
- No office, depot or warehouse is claimed anywhere. Each coverage section says these are places where goods and people move and that availability depends on the locations, the service and the dates and is confirmed before any arrangement.
- Three presentations (cards, accordion, columns) are spread across the pages. Only the passenger and taxi pages link region names to the existing region taxi pages; freight pages do not, because those pages are about taxi rides.
- Needs your confirmation: which regions and cities you can actually serve for each service. The pages promise nothing beyond "we assess and confirm".

## H. Technical SEO, schema, performance

- Titles are unique and 48 to 60 characters. The equipment page title is "Equipment and Machinery Transportation Services Saudi Arabia" (the word "in" is dropped so it fits 60 characters; the H1 keeps the full primary keyword).
- Meta descriptions are unique and 139 to 158 characters. Canonical URLs are `/services/<slug>`, no noindex, Open Graph and Twitter titles and descriptions set (the social image is the site default; no verified per-service image exists yet).
- Exactly one H1 per page, equal to the primary keyword; heading order checked (no skipped levels).
- JSON-LD: WebPage, BreadcrumbList, Service (provider Organization, `areaServed` Saudi Arabia plus the 13 regions as AdministrativeArea) and FAQPage, all parsed successfully; the FAQ schema count equals the visible FAQ count on every page. No ratings, addresses or invented entities. The FAQ list no longer repeats near-identical questions (`pageFaqs` in `seo.ts`).
- Image placements: each page has three; they are deliberate placeholders with a fixed aspect ratio (about 1000 x 558), a road-line design in the existing colours, and the expected file name printed. Dropping `<slug>/<file>.webp` into `public/images/routes/services/` replaces them with no layout change. Alt text is already written. The hero image is `priority` where it is in the hero; the others lazy-load.
- Accessibility: labelled form fields, `aria-invalid` and `role="alert"` messages, visible focus rings from the existing theme, one H1, landmark sections with `aria-labelledby`.
- Not run: Lighthouse and Core Web Vitals measurements, Google's Rich Results Test, and external keyword research tools. The keyword mapping follows the brief as given.

## I. Files changed

Created
- `src/content/services/seo-brief-a.ts`, `seo-brief-b.ts`: the primary and 12 secondary keywords per page, titles, descriptions, H1, lead, definition, intros with contextual links, H2s, FAQs, the "at a glance" rail and coverage style.
- `src/content/services/seo-variants.ts`: the "ways this service is requested" blocks (H3 plus text) that carry the secondary keywords naturally.
- `src/content/services/coverage-regions.ts`: the 13 regions and their cities.
- `docs/service-pages-implementation-report.md`: this report.

Modified
- `src/components/ServicePageView.tsx`: new heroes with the compact form, mobile form first, rail, variants, 13-region coverage, bottom form; the tall sticky side form removed.
- `src/components/QuoteForm.tsx`: new `compact` variant (additive; existing variants untouched).
- `src/content/services/seo.ts`, `seo-types.ts`, `seo-a.ts`, `seo-b.ts`, `seo-c.ts`: merge of the brief overrides over the original page data; new types; duplicate base FAQs filtered.
- `src/lib/schema.ts` and `src/app/services/[slug]/page.tsx`: `areaServed` regions and the de-duplicated FAQ list.

No file was deleted. Earlier in this session (separate work, not part of this brief) the shared `HeroBooking.tsx`, `PageHero.tsx`, `RichText.tsx`, `RichTown.tsx`, `PlaceView.tsx` and `src/lib/autolink.ts` were also changed for the mobile form order and automatic internal links.

## J. Testing results (actually performed)

- Static checks on the built pages (`out/services/*.html`), 18 of 18 passing: title and description present, in range and unique; canonical correct; no noindex; Open Graph present; exactly one H1 equal to the primary keyword; primary keyword in the title and in the opening text; exactly two forms and two honeypots; no `tel:` link; WhatsApp links present; all 13 regions present; no skipped heading levels; no broken internal links; no image without alt; JSON-LD valid with Service, BreadcrumbList, FAQPage and WebPage; FAQ schema equal to the visible FAQs; three image placements.
- Browser checks in headless Edge, 18 pages at 390, 820 and 1366 px wide (54 checks, 0 failing): no horizontal overflow, no console errors, two forms, compact hero form (fields) under 520 px tall, and on mobile the form above the H1 and directly after the header.
- Secondary keywords: 216 of 216 appear in the page text as natural wording; no phrase is shared between two pages and no page's primary keyword is another page's secondary keyword.
- Visual review of screenshots: Freight (mobile hero), Container (desktop hero and mobile coverage), Freight (desktop coverage), International Freight Forwarding (desktop bottom form). The other pages were checked by the automated tests only.
- Known limits: 404 messages for `__next.*.txt` prefetch files appear only when the site is served with `npx serve`; they are filtered out of the console check. The pages were not tested on a real phone.

## Items that need your input

- Real photographs for the 54 image placements (list in section D).
- Confirmation of which regions and cities you actually serve for each service, and whether any service should be limited.
- Whether you want a social sharing image per service page once photos exist.
- Existing pages that could link to the service pages where it reads naturally (not changed, to keep this task focused): the home page service cards and the `/services` overview already link to all 18; the taxi hub pages could link to `/services/taxi-cab-services`, and the Riyadh pages to `/services/passenger-transport`.
