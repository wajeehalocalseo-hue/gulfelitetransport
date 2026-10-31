/**
 * Master service roadmap supplied by the owner: Main service -> Sub-service group -> Micro-service,
 * with the keyword topics inside each micro-service.
 *
 * THIS IS A PLANNING LIST, NOT A LIST OF VERIFIED CAPABILITIES. Every entry loads into the service
 * graph as `pending-verification` and has no page, link or sitemap entry. To publish one: confirm it
 * with the business, write unique content as a record in ./subservices.ts or ./microservices.ts,
 * and mark it covered here.
 *
 * Line format (indentation is ignored):
 *   @ Main service name | main-service-id        a main service (existing id, or a new candidate id)
 *   ## Sub-service group                          a Level 2 group
 *   ## Sub-service group => existing-sub-id       group already covered by a published sub-service;
 *                                                 its micro-services attach to that published page
 *   ## Sub-service group ~ existing-id            overlaps a published page; kept as a pending group
 *   - Micro-service :: topic | topic | topic      a Level 3 micro-service with its keyword topics
 *   ! note                                        verification warning for the group above
 */
const RAW = `
@ Freight & Cargo Transport | freight-cargo-transport
## Road Freight Transportation => road-freight-transportation
## General Cargo Transportation => commercial-cargo-transportation
- Commercial Goods Transport :: Retail goods transportation | Wholesale goods transportation | Business inventory movement
- Consumer Goods Transport :: Household goods | Packaged consumer products | General merchandise
- Boxed Cargo Transport :: Carton transportation | Crated goods movement | Packaged shipment transport
## Specialized Cargo Transportation => specialized-cargo-transportation
- Fragile Cargo Transport :: Glass products | Ceramics and porcelain | Sensitive packaged goods
- High-Value Cargo Transport :: Valuable commercial goods | Electronics transportation | Sensitive business equipment
- Oversized Cargo Transport :: Long-length cargo | Wide-load cargo | Large industrial components
- Heavy Cargo Transport :: High-weight commercial goods | Dense industrial materials | Heavy palletized cargo
- Dangerous Goods Transportation :: Regulated hazardous cargo | Chemical cargo transportation | Flammable material transport | Special handling and compliance coordination
! Dangerous goods are regulated; do not advertise without the licences, vehicles and procedures required.
## Building Materials Transportation => building-materials-transportation
- Cement Transportation :: Bagged cement delivery | Bulk cement logistics
- Steel Transportation :: Steel bars and rods | Steel coils | Structural steel | Steel sheets
- Timber Transportation :: Lumber movement | Wooden boards | Construction timber
- Construction Materials :: Bricks and blocks | Tiles and ceramics | Sand and aggregates | Pipes and fittings
- Roofing Materials :: Roofing sheets | Insulation materials | Roofing components
## Bulk Cargo Transportation => bulk-cargo-transportation
- Dry Bulk Cargo :: Sand transportation | Gravel transportation | Mineral materials | Agricultural bulk commodities
- Liquid Bulk Cargo :: Industrial liquids | Non-hazardous liquid materials | Tank-based liquid transport
- Bulk Raw Materials :: Industrial raw materials | Manufacturing inputs | Bulk commercial commodities
## Pickup & Delivery Freight Services ~ commercial-shipment-pickup-and-delivery
- Business Pickup :: Factory pickup | Warehouse pickup | Supplier pickup
- Commercial Delivery :: Business-to-business delivery | Warehouse-to-warehouse delivery | Factory-to-distributor delivery
- Multi-Stop Freight Delivery :: Multiple pickup locations | Multiple delivery locations | Scheduled multi-drop transport
- Return Freight :: Reverse cargo movement | Returned commercial goods | Reusable packaging returns

@ Passenger Transport | passenger-transport
## Corporate Transportation => corporate-passenger-transport
- Executive Transportation :: Executive car transportation | Business meeting transfers | Corporate guest transportation
- Employee Transportation :: Office employee pickup | Employee drop-off | Shift-based transportation | Employee shuttle services
- Corporate Shuttle Services :: Office-to-office shuttle | Business park shuttle | Fixed-route corporate shuttle
- Business Travel Transportation :: Corporate travel transfers | Business visitor transportation | Intercity business transfers
## Staff & Workforce Transportation => staff-transportation
- Factory Staff Transport :: Factory shift pickup | Factory shift drop-off | Employee bus services
- Remote Workforce Transport :: Remote site transfers | Long-distance employee movement | Staff camp transportation
## Airport Transportation => airport-transfers
- Airport Pickup :: Individual airport pickup | Corporate airport pickup | Group airport pickup
- Airport Drop-Off :: Business airport transfers | Family airport transfers | Group airport transfers
- Flight-Related Transfers :: Arrival transfers | Departure transfers | Scheduled flight transfers
- VIP Airport Transfers :: Executive airport transportation | Business guest transfers | Premium vehicle transfers
## Event Transportation => event-passenger-transport
- Corporate Event Transport :: Conference transportation | Seminar transportation | Business exhibition transfers
- Wedding Transportation :: Guest transportation | Wedding party transfers | Group wedding shuttles
- Sports Event Transportation :: Team transportation | Spectator group transfers | Event staff transportation
## Group Transportation => group-transportation
- Large Group Transfers :: Corporate groups | Event attendees | Organized tour groups
- Intercity Passenger Transfers :: City-to-city transfers | Business group transfers | Scheduled group journeys
## Private & Dedicated Passenger Services
- Private Chauffeur Services :: Hourly chauffeur service | Daily chauffeur service | Business chauffeur service
- Dedicated Vehicle Services :: Dedicated passenger vehicle | Dedicated corporate shuttle | Recurring passenger transportation

@ Equipment & Machinery Moving | equipment-machinery-moving
## Heavy Equipment Transportation => heavy-equipment-transportation
- Mining Equipment Transport :: Mining machinery movement | Drilling equipment transport | Crushing equipment transport
## Industrial Machinery Moving => industrial-machinery-relocation
## Oversized & Abnormal Load Transportation
- Wide Load Transportation :: Wide industrial components | Large machinery | Oversized structures
- Long Load Transportation :: Long steel structures | Industrial beams | Long pipes and components
- Heavy Load Transportation :: High-weight machinery | Large equipment components | Heavy industrial units
- Special Trailer Transportation :: Low-bed trailer movement | Extendable trailer movement | Modular trailer transport
! Oversized and abnormal loads may need permits and specialist vehicles; confirm capability first.
## Construction Machinery Relocation => construction-machinery-relocation
- Earthmoving Equipment Relocation :: Bulldozer movement | Wheel loader movement | Grader movement
- Road Construction Equipment :: Asphalt paver movement | Road roller movement | Milling machine movement
- Concrete Equipment :: Concrete pump transport | Concrete mixer equipment | Batching plant components
## Equipment Loading & Unloading Coordination ~ equipment-loading-and-unloading-coordination
- Machinery Loading Coordination :: Loading area preparation | Loading equipment assessment | Loading sequence planning
- Machinery Unloading Coordination :: Destination access assessment | Unloading area planning | Delivery placement coordination
- Securing & Handling Coordination :: Load securing assessment | Transportation restraints | Handling requirement planning
## Machinery Relocation Planning => machinery-relocation-planning
- Site-to-Site Machinery Moving :: Factory-to-factory relocation | Warehouse-to-factory relocation | Industrial site relocation
- Equipment Collection & Delivery :: Supplier equipment collection | Project site delivery | Machinery return movement

@ Contract Fleet Services | contract-fleet-services
## Dedicated Fleet Solutions => dedicated-fleet-services
- Dedicated Equipment Transport Fleet :: Dedicated machinery transport vehicles | Dedicated heavy transport arrangements
## Monthly Vehicle Contracts => monthly-vehicle-contracts
## Long-Term Fleet Leasing & Allocation
- Long-Term Vehicle Allocation :: Business vehicle allocation | Dedicated vehicle scheduling | Recurring fleet assignment
- Commercial Fleet Arrangements :: Multi-location vehicle arrangements | Department-based vehicle allocation | Project-based vehicle allocation
! Leasing is a different offering from contract allocation; confirm before using the word.
## Driver & Vehicle Coordination => driver-vehicle-coordination
- Driver Coordination :: Scheduled driver assignment | Route-based driver coordination | Shift-based driver planning
- Vehicle Coordination :: Vehicle scheduling | Vehicle availability planning | Replacement vehicle planning where available
## Staff Transportation Contracts => staff-transportation-contracts
- Industrial Workforce Contracts :: Site workforce transport | Recurring employee transfers
## Fleet Management Support => fleet-management-support
- Transport Scheduling :: Daily vehicle scheduling | Weekly vehicle scheduling | Monthly transport planning
- Fleet Utilization Planning :: Vehicle allocation | Route allocation | Transport demand planning
- Fleet Reporting :: Trip reporting | Vehicle usage reporting | Transport activity summaries

@ International Freight Forwarding | international-freight-forwarding
## International Air Freight
- Standard Air Freight :: General commercial air cargo | Consolidated air freight | Airport-to-airport cargo
- Express Air Freight :: Urgent commercial shipments | Time-sensitive cargo | Priority air cargo coordination
- Specialized Air Cargo :: Fragile air cargo | High-value cargo | Temperature-sensitive air cargo, subject to capability
## International Sea Freight
- Full Container Load (FCL) :: 20-foot container freight | 40-foot container freight | 40-foot high-cube freight
- Less Than Container Load (LCL) :: Shared container cargo | Consolidated commercial cargo | Small-volume sea freight
- Specialized Sea Freight :: Refrigerated container freight | Open-top container freight | Flat-rack cargo coordination
## International Road Freight
- Cross-Border Trucking :: Full truckload cross-border freight | Partial load cross-border freight | Commercial road cargo
- Regional Freight Coordination :: Border-to-border transport | Multi-country route coordination | International delivery planning
## Import Freight Coordination
- Import Shipment Planning :: Supplier pickup coordination | International freight booking coordination | Destination delivery planning
- Import Documentation Coordination :: Commercial invoice information | Packing list coordination | Transport documentation
- Import Cargo Delivery :: Port-to-warehouse delivery | Airport-to-warehouse delivery | Customs-release-dependent delivery
## Export Freight Coordination
- Export Shipment Planning :: Export cargo collection | International freight arrangements | Export route planning
- Export Documentation Coordination :: Shipping document coordination | Commercial invoice coordination | Packing list coordination
- Export Cargo Movement :: Warehouse-to-port transportation | Factory-to-port transportation | Airport cargo delivery
## Customs & Border Coordination
- Customs Documentation Support
- Customs Clearance Coordination
- Cross-Border Shipment Documentation
- Border Transit Coordination
- Import/Export Compliance Coordination
! Customs brokerage and clearance services must only be advertised if legally authorized and actually available.

@ Container Transportation | container-transportation
## Standard Container Transportation
- 20-Foot Container Transport :: 20ft dry container movement | 20ft commercial cargo delivery
- 40-Foot Container Transport :: 40ft dry container movement | 40ft commercial container delivery
- 40-Foot High-Cube Transport :: High-cube container movement | High-cube commercial delivery
## Port Container Transportation
- Port-to-Warehouse Transport
- Port-to-Factory Transport
- Port-to-Distribution Centre Transport
- Port-to-Project Site Transport
- Empty Container Collection
## Container Delivery & Collection
- Warehouse Container Delivery
- Factory Container Delivery
- Commercial Site Container Delivery
- Empty Container Return
- Container Relocation
## Specialized Container Transport
- Refrigerated Container Transport :: Reefer container movement | Temperature-sensitive container movement
- Open-Top Container Transport :: Top-loading cargo | Oversized cargo coordination
- Flat-Rack Container Transport :: Industrial machinery | Oversized equipment
- Tank Container Transport :: Approved liquid cargo | Specialized tank container movement
## Container Handling Coordination
- Container Loading Coordination
- Container Unloading Coordination
- Container Securing
- Container Placement
- Container Yard Movement
## Container Logistics
- Container Positioning
- Container Repositioning
- Empty Container Management
- Container Return Coordination
- Multi-Location Container Movement

@ Last-Mile Delivery | last-mile-delivery
## Business-to-Business Delivery (B2B)
- Factory-to-Retailer Delivery
- Warehouse-to-Retailer Delivery
- Supplier-to-Business Delivery
- Distributor-to-Dealer Delivery
- Business-to-Branch Delivery
## Business-to-Consumer Delivery (B2C)
- Retail Customer Delivery
- Online Order Delivery
- Home Delivery
- Scheduled Customer Delivery
- Bulk Customer Order Delivery
## Retail & E-commerce Delivery
- E-commerce Parcel Delivery
- Retail Merchandise Delivery
- Multi-Order Delivery
- Store Replenishment Delivery
- Online Furniture Delivery
## Scheduled Delivery
- Same-Day Scheduled Delivery
- Next-Day Scheduled Delivery
- Fixed-Time Delivery
- Recurring Delivery
- Appointment-Based Delivery
## Multi-Stop Delivery
- Multiple Customer Deliveries
- Multi-Store Deliveries
- Route-Based Distribution
- Clustered Delivery Routes
- Multi-Address Commercial Delivery
## Reverse Logistics
- Customer Return Collection
- Retail Return Collection
- Exchange Product Collection
- Returned Goods Transportation
- Reusable Packaging Collection
## Specialized Last-Mile Delivery
- Furniture Delivery
- Appliance Delivery
- Office Equipment Delivery
- Commercial Supply Delivery
- Pallet Delivery

@ Express & Urgent Delivery | express-urgent-delivery
## Express Road Delivery
- Priority Cargo Delivery
- Direct Truck Delivery
- Dedicated Vehicle Delivery
- Non-Stop Route Coordination
- Urgent Commercial Shipment
## Same-Day Delivery
- Same-Day Business Delivery
- Same-Day Commercial Cargo
- Same-Day Document Delivery
- Same-Day Retail Shipment
- Same-Day Parts Delivery
## Next-Day Delivery
- Next-Day Commercial Cargo
- Next-Day Business Supplies
- Next-Day Retail Distribution
- Next-Day Spare Parts Delivery
## Emergency Industrial Delivery
- Emergency Spare Parts
- Urgent Factory Supplies
- Urgent Machinery Components
- Production-Critical Materials
- Emergency Site Supplies
## Priority Shipment Coordination
- Priority Pickup Scheduling
- Priority Vehicle Allocation
- Priority Route Planning
- Urgent Shipment Tracking Coordination
- Priority Delivery Communication
## Time-Critical Transportation
- Fixed-Deadline Cargo Delivery
- Scheduled Time-Window Delivery
- Urgent Intercity Transportation
- Critical Business Shipment
- Expedited Project Material Delivery
! Same-day, emergency and express commitments depend on actual operating hours, geography, vehicle availability and capability.

@ Warehousing & Storage | warehousing-storage
## General Warehousing
- Short-Term Storage :: Temporary commercial storage | Transit cargo storage | Temporary inventory holding
- Long-Term Storage :: Business inventory storage | Industrial material storage | Commercial goods storage
- Overflow Storage :: Seasonal inventory storage | Excess stock storage | Peak-demand storage
## Pallet Storage
- Standard Pallet Storage
- Bulk Pallet Storage
- Mixed Pallet Storage
- Industrial Pallet Storage
- High-Volume Pallet Storage
## Commercial Inventory Storage
- Retail Inventory Storage
- Wholesale Inventory Storage
- E-commerce Inventory Storage
- Distributor Inventory Storage
- Business Stock Storage
## Industrial Storage
- Raw Material Storage
- Production Material Storage
- Machinery Component Storage
- Industrial Spare Parts Storage
- Construction Material Storage
## Warehouse Handling
- Goods Receiving
- Cargo Unloading
- Pallet Handling
- Goods Sorting
- Cargo Staging
- Goods Dispatch Preparation
## Inventory Management Support
- Stock Receiving Records
- Inventory Identification
- Stock Movement Records
- Dispatch Coordination
- Inventory Reporting
- Stock Reconciliation Support
## Order Fulfilment
- Order Receiving
- Picking
- Packing
- Dispatch Preparation
- Shipment Handover
- Delivery Coordination
## Cross-Docking
- Direct Inbound-to-Outbound Transfer
- Consolidation Cross-Docking
- Deconsolidation Cross-Docking
- Short-Term Transit Handling
! Warehouse ownership, bonded storage, security, temperature control and inventory technology must be verified before being advertised.

@ Refrigerated Transportation | refrigerated-transportation
## Chilled Transportation
- Fresh Food Transport :: Fresh fruits transportation | Fresh vegetables transportation | Dairy products transportation
- Chilled Beverage Transport :: Refrigerated beverage delivery | Temperature-sensitive beverage movement
- Chilled Food Distribution :: Restaurant supply delivery | Grocery supply delivery | Food distributor transportation
## Frozen Transportation
- Frozen Food Transport :: Frozen meat transportation | Frozen seafood transportation | Frozen poultry transportation
- Frozen Product Distribution :: Frozen retail goods | Frozen wholesale goods | Frozen food supply delivery
## Pharmaceutical Cold Chain
- Pharmaceutical Product Transport
- Temperature-Sensitive Medicine Transport
- Medical Supply Cold Chain
- Vaccine Transportation Coordination
- Temperature-Controlled Healthcare Shipments
! Only provide these regulated services with appropriate equipment, procedures, licensing and documented temperature controls.
## Temperature-Controlled Cargo
- Controlled-Temperature Transport
- Chilled Cargo Delivery
- Frozen Cargo Delivery
- Multi-Temperature Cargo Planning
- Temperature-Sensitive Product Distribution
## Refrigerated Container Transportation
- Reefer Container Transport
- Chilled Container Movement
- Frozen Container Movement
- Port-to-Warehouse Reefer Delivery
- Reefer Container Relocation
## Cold Chain Logistics Support
- Temperature Requirement Assessment
- Pre-Loading Temperature Checks
- Temperature Monitoring Coordination
- Cold Chain Delivery Scheduling
- Temperature Record Coordination
- Refrigerated Shipment Handover

@ Industrial & Project Logistics | industrial-project-logistics
## Industrial Project Transportation
- Factory Project Cargo :: Factory machinery delivery | Production line component transport | Industrial material transportation
- Plant Project Cargo :: Plant equipment movement | Processing unit transportation | Industrial structure transport
- Industrial Site Logistics :: Site material deliveries | Site equipment movement | Multi-phase project deliveries
## Project Cargo Transportation
- Heavy Project Cargo
- Oversized Project Cargo
- Long-Length Cargo
- High-Weight Cargo
- Multi-Component Project Cargo
## Construction Project Logistics
- Construction Equipment Delivery
- Construction Material Supply
- Site Machinery Relocation
- Concrete Equipment Transport
- Construction Component Movement
## Oil & Gas Project Logistics
- Oilfield Equipment Transportation
- Industrial Pipe Transportation
- Drilling Equipment Movement
- Oilfield Spare Parts Delivery
- Project Material Transportation
! Oil and gas work may require special permits, site approvals, vehicle specifications and HSE compliance.
## Power & Energy Logistics
- Generator Transportation
- Transformer Transportation
- Electrical Equipment Movement
- Power Plant Component Delivery
- Renewable Energy Equipment Transport
- Solar Panel Logistics
- Wind Energy Component Transportation
## Project Logistics Planning
- Project Cargo Assessment
- Transport Route Assessment
- Vehicle and Trailer Selection
- Delivery Schedule Planning
- Site Access Assessment
- Multi-Phase Delivery Coordination
- Transport Documentation Coordination
## Industrial Relocation
- Factory Relocation
- Production Line Relocation
- Warehouse Relocation
- Industrial Machinery Relocation
- Plant Equipment Relocation
- Workshop Relocation
## Project Site Logistics
- Equipment Delivery Scheduling
- Material Delivery Scheduling
- Multiple Site Transportation
- Construction Site Supply Coordination
- Project Cargo Collection
- Project Cargo Dispatch

@ Commercial Distribution Services | commercial-distribution-services
## Retail Distribution
- Supermarket Distribution :: Grocery product delivery | Retail stock replenishment | Multi-store grocery supply
- Shopping Mall Distribution :: Retail store supply | Commercial stock delivery | Mall-based business distribution
- General Retail Distribution :: Consumer goods distribution | Retail inventory movement | Store-to-store stock transfer
## Wholesale Distribution
- Wholesale Goods Delivery
- Bulk Merchandise Distribution
- Dealer Supply Distribution
- Distributor-to-Retailer Delivery
- Regional Wholesale Supply
## FMCG Distribution
- Packaged Food Distribution
- Beverage Distribution
- Household Product Distribution
- Personal Care Product Distribution
- Consumer Goods Replenishment
## Industrial Distribution
- Industrial Raw Material Delivery
- Manufacturing Supply Distribution
- Industrial Spare Parts Delivery
- Factory Supply Distribution
- Production Material Replenishment
## Multi-Location Distribution
- Multi-Branch Distribution
- Multi-Warehouse Distribution
- Regional Distribution
- Scheduled Multi-Location Delivery
- Central Warehouse-to-Branch Distribution
## Distribution Route Management
- Delivery Route Planning
- Multi-Drop Route Planning
- Delivery Schedule Coordination
- Vehicle Allocation
- Delivery Sequence Planning
- Distribution Reporting
## Dealer & Distributor Logistics
- Dealer Stock Delivery
- Distributor Replenishment
- Retailer Supply Movement
- Dealer-to-Dealer Stock Transfer
- Regional Dealer Distribution
## Reverse Distribution
- Retail Returns Collection
- Distributor Returns
- Product Exchange Movement
- Packaging Returns
- Reusable Container Returns

@ Vehicle Transportation | vehicle-transportation
## Car Transportation
- Single Car Transport
- Multiple Car Transport
- Dealership Vehicle Transport
## Commercial Vehicle Transport
- Van Transportation
- Bus Transportation
- Truck Transportation
## Fleet Relocation
- Company Fleet Relocation
- Vehicle Collection and Delivery

@ Furniture & Household Moving | furniture-household-moving
## Office Relocation
- Office Furniture Moving
- Office Equipment Moving
- Office Workstation Relocation
## Commercial Furniture Transport
- Retail Furniture Delivery
- Hotel Furniture Transportation
- Restaurant Furniture Transportation
## Household Goods Transport
- Furniture Collection
- Household Goods Delivery
- Appliance Transportation

@ Packaging & Cargo Handling | packaging-cargo-handling
## Cargo Packaging Coordination
- Carton Packaging
- Pallet Packaging
- Industrial Packaging
## Cargo Loading Support
- Pallet Loading
- Container Loading
- Cargo Securing
## Cargo Unloading Support
- Commercial Cargo Unloading
- Machinery Unloading Coordination
- Warehouse Unloading

@ Trade Show & Exhibition Logistics | trade-show-exhibition-logistics
## Exhibition Cargo Transportation
- Booth Material Delivery
- Exhibition Equipment Delivery
- Display Material Transportation
## Event Equipment Logistics
- Stage Equipment Transportation
- Lighting Equipment Transportation
- Audio Equipment Transportation
## Exhibition Return Logistics
- Booth Material Collection
- Equipment Return Transportation
- Exhibition Cargo Relocation

@ Spare Parts & Automotive Logistics | spare-parts-automotive-logistics
## Automotive Spare Parts Delivery
- Engine Parts Transportation
- Vehicle Component Delivery
- Workshop Supply Delivery
## Industrial Spare Parts Delivery
- Factory Spare Parts
- Machinery Components
- Maintenance Supplies
## Urgent Parts Transportation
- Emergency Spare Parts
- Scheduled Spare Parts
- Dealer Parts Distribution
`;

export type MasterItem = { name: string; topics: string[] };
export type MasterGroup = {
  name: string;
  /** Existing published sub-service this group is covered by (its items attach to that page). */
  covers?: string;
  /** Existing published page this group overlaps with. */
  overlaps?: string;
  notes: string[];
  items: MasterItem[];
};
export type MasterMain = { name: string; id: string; groups: MasterGroup[] };

function parse(raw: string): MasterMain[] {
  const mains: MasterMain[] = [];
  let main: MasterMain | undefined;
  let group: MasterGroup | undefined;
  for (const line of raw.split("\n").map((l) => l.trim()).filter(Boolean)) {
    if (line.startsWith("@ ")) {
      const [name, id] = line.slice(2).split("|").map((s) => s.trim());
      main = { name, id, groups: [] };
      mains.push(main);
    } else if (line.startsWith("## ") && main) {
      let name = line.slice(3).trim();
      let covers: string | undefined;
      let overlaps: string | undefined;
      const cov = name.match(/^(.*?)\s*=>\s*(\S+)$/);
      const ovl = name.match(/^(.*?)\s*~\s*(\S+)$/);
      if (cov) {
        name = cov[1];
        covers = cov[2];
      } else if (ovl) {
        name = ovl[1];
        overlaps = ovl[2];
      }
      group = { name, covers, overlaps, notes: [], items: [] };
      main.groups.push(group);
    } else if (line.startsWith("- ") && group) {
      const [name, topics] = line.slice(2).split("::").map((s) => s.trim());
      group.items.push({ name, topics: topics ? topics.split("|").map((t) => t.trim()) : [] });
    } else if (line.startsWith("! ") && group) {
      group.notes.push(line.slice(2).trim());
    }
  }
  return mains;
}

export const masterTaxonomy: MasterMain[] = parse(RAW);
