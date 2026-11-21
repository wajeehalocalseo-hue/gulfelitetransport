# Makkah route pages: implementation and QA report

Generated from the source files and the built site after the implementation described in the pasted "MASTER IMPLEMENTATION PROMPT" (22 Makkah intercity taxi route pages). Where something could not be done or verified exactly as the brief asks, it is said so in the section it belongs to and in the final list of items that need your input.

## Decisions that differ from the brief

- **URL structure.** The brief suggests /services/makkah-to-... The existing intercity route pages (all 26 Riyadh Region town pages and the 22 Riyadh routes) live under /taxi-saudi-arabia/routes/, so the Makkah pages use /taxi-saudi-arabia/routes/makkah-to-<place>, as the brief itself says to follow the established convention. /services/ is used by the 18 service pages and would have mixed taxi routes with services.
- **Makkah to Jeddah and Makkah to Taif already existed** (as Jeddah to Makkah and Makkah to Taif route pages). Following your answer, no duplicates were created: Makkah to Taif was rebuilt at its existing URL, and the Jeddah page now lives at /taxi-saudi-arabia/routes/makkah-to-jeddah with a 301 redirect from the old /taxi-saudi-arabia/routes/jeddah-to-makkah (public/_redirects). The two links that pointed to the old URL (book page, Umrah pages) were updated. That makes 22 pages: 20 new URLs and 2 rebuilt.
- **Hero and bottom forms** are the site's existing booking widget (pickup, destination, date, time, "Continue Booking" into the /book flow), the same component the 26 Riyadh town pages use. It was not replaced by a new form, so there is no new validation or submission code. There is no passenger-count or contact field in this widget; those are collected on the /book step.
- **Image placements.** Each page has four labelled placeholders (hero, highway, Makkah, destination), not 2 to 3, because the shared town-route layout has four slots. They cost no layout shift and are replaced by dropping files in.
- **No call option.** As with the Riyadh town pages (your earlier instruction), there is no call button or tel: link; the pages send people to WhatsApp or the booking form. The brief's phone number is therefore not displayed; WhatsApp uses the existing verified number in the site configuration.

## A. Pages

| # | URL | Status |
|---|---|---|
| 1 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-jeddah | Rebuilt at a new URL (old URL redirects); built and tested |
| 2 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-taif | Rebuilt at the existing URL; built and tested |
| 3 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-rabigh | New; built and tested |
| 4 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-al-qunfudhah | New; built and tested |
| 5 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-al-lith | New; built and tested |
| 6 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-al-jumum | New; built and tested |
| 7 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-bahrah | New; built and tested |
| 8 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-turbah | New; built and tested |
| 9 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-al-kamil | New; built and tested |
| 10 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-al-muwayh | New; built and tested |
| 11 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-ranyah | New; built and tested |
| 12 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-maysan | New; built and tested |
| 13 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-adham | New; built and tested |
| 14 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-khulais | New; built and tested |
| 15 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-khurma | New; built and tested |
| 16 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-hada | New; built and tested |
| 17 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-thuwal | New; built and tested |
| 18 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-al-hawiyah | New; built and tested |
| 19 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-dhahban | New; built and tested |
| 20 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-ash-shafa | New; built and tested |
| 21 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-hali | New; built and tested |
| 22 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/makkah-to-qiya | New; built and tested |

## B. Keywords

The primary and twelve secondary keywords are the ones assigned in the brief (src/content/saudi/makkah-routes/keywords.ts). All 22 primaries are in the title, H1 and lead; every one of the 264 secondary keywords appears in the page text (checked by script). Three extra FAQ questions per page, written as real questions about the different names for the same ride, carry the secondary keywords in natural wording.

### Jeddah
- Primary keyword: **Makkah to Jeddah Taxi Service**
- Search intent: Someone in Makkah, or in Jeddah, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Jeddah Taxi Service | Private Rides
- Meta description (149 characters): Makkah to Jeddah taxi service: private rides both ways, return trips and airport transfers, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Jeddah Taxi Service
- Secondary keywords and where they appear:
  - Jeddah to Makkah Taxi Service: Both directions, FAQ
  - Makkah to Jeddah Private Taxi: FAQ
  - Jeddah to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Jeddah Cab Service: FAQ
  - Makkah to Jeddah Car Service: FAQ
  - Makkah to Jeddah Private Car: Introduction, FAQ
  - Makkah to Jeddah Taxi Booking: Both directions, FAQ
  - Jeddah to Makkah Taxi Booking: FAQ
  - Makkah Jeddah Intercity Taxi: FAQ
  - Makkah to Jeddah Airport Taxi: FAQ
  - Jeddah to Makkah Return Taxi: FAQ
  - Makkah to Jeddah Door-to-Door Transport: FAQ

### Taif
- Primary keyword: **Makkah to Taif Taxi Service**
- Search intent: Someone in Makkah, or in Taif, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Taif Taxi Service | Private Rides
- Meta description (141 characters): Makkah to Taif taxi service: private family rides both ways over the mountain road, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Taif Taxi Service
- Secondary keywords and where they appear:
  - Taif to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Taif Private Taxi: FAQ
  - Taif to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Taif Cab Service: FAQ
  - Makkah to Taif Car Service: FAQ
  - Makkah to Taif Taxi Booking: FAQ
  - Taif to Makkah Return Taxi: FAQ
  - Makkah Taif Intercity Taxi: FAQ
  - Makkah to Taif Private Car: Introduction, FAQ
  - Makkah to Taif Door-to-Door Taxi: FAQ
  - Makkah to Taif Family Transport: Both directions, FAQ
  - Makkah to Taif Travel Service: FAQ

### Rabigh
- Primary keyword: **Makkah to Rabigh Taxi Service**
- Search intent: Someone in Makkah, or in Rabigh, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Rabigh Taxi Service | Private Rides
- Meta description (136 characters): Makkah to Rabigh taxi service: private rides both ways along the Red Sea road, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Rabigh Taxi Service
- Secondary keywords and where they appear:
  - Rabigh to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Rabigh Private Taxi: FAQ
  - Rabigh to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Rabigh Cab Service: FAQ
  - Makkah to Rabigh Car Service: FAQ
  - Makkah to Rabigh Taxi Booking: Both directions, FAQ
  - Rabigh to Makkah Return Taxi: FAQ
  - Makkah Rabigh Intercity Taxi: FAQ
  - Makkah to Rabigh Private Car: Introduction, FAQ
  - Makkah to Rabigh Door-to-Door Transport: FAQ
  - Makkah to Rabigh Passenger Transport: FAQ
  - Rabigh to Makkah Car Booking: FAQ

### Al Qunfudhah
- Primary keyword: **Makkah to Al Qunfudhah Taxi Service**
- Search intent: Someone in Makkah, or in Al Qunfudhah, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Al Qunfudhah Taxi Service | Private Rides
- Meta description (153 characters): Makkah to Al Qunfudhah taxi service: private long-distance rides both ways on the coastal road, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Al Qunfudhah Taxi Service
- Secondary keywords and where they appear:
  - Al Qunfudhah to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Al Qunfudhah Private Taxi: FAQ
  - Al Qunfudhah to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Al Qunfudhah Cab Service: FAQ
  - Makkah to Al Qunfudhah Car Service: FAQ
  - Makkah to Al Qunfudhah Taxi Booking: FAQ
  - Al Qunfudhah to Makkah Return Taxi: FAQ
  - Makkah Al Qunfudhah Intercity Taxi: FAQ
  - Makkah to Al Qunfudhah Private Car: Introduction, FAQ
  - Makkah to Al Qunfudhah Door-to-Door Transport: FAQ
  - Makkah to Al Qunfudhah Passenger Transfer: FAQ
  - Al Qunfudhah to Makkah Car Service: FAQ

### Al Lith
- Primary keyword: **Makkah to Al Lith Taxi Service**
- Search intent: Someone in Makkah, or in Al Lith, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Al Lith Taxi Service | Private Rides
- Meta description (142 characters): Makkah to Al Lith taxi service: private rides both ways down the Red Sea coast road, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Al Lith Taxi Service
- Secondary keywords and where they appear:
  - Al Lith to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Al Lith Private Taxi: FAQ
  - Al Lith to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Al Lith Cab Service: FAQ
  - Makkah to Al Lith Car Service: FAQ
  - Makkah to Al Lith Taxi Booking: FAQ
  - Al Lith to Makkah Return Taxi: FAQ
  - Makkah Al Lith Intercity Taxi: FAQ
  - Makkah to Al Lith Private Car: Introduction, FAQ
  - Makkah to Al Lith Door-to-Door Transport: FAQ
  - Makkah to Al Lith Passenger Transport: FAQ
  - Al Lith to Makkah Car Booking: FAQ

### Al Jumum
- Primary keyword: **Makkah to Al Jumum Taxi Service**
- Search intent: Someone in Makkah, or in Al Jumum, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Al Jumum Taxi Service | Private Rides
- Meta description (137 characters): Makkah to Al Jumum taxi service: private short rides both ways on Madinah Road, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Al Jumum Taxi Service
- Secondary keywords and where they appear:
  - Al Jumum to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Al Jumum Private Taxi: FAQ
  - Al Jumum to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Al Jumum Cab Service: FAQ
  - Makkah to Al Jumum Car Service: FAQ
  - Makkah to Al Jumum Taxi Booking: Both directions, FAQ
  - Al Jumum to Makkah Return Taxi: FAQ
  - Makkah Al Jumum Intercity Taxi: FAQ
  - Makkah to Al Jumum Private Car: Introduction, FAQ
  - Makkah to Al Jumum Door-to-Door Transport: FAQ
  - Makkah to Al Jumum Passenger Transport: FAQ
  - Al Jumum to Makkah Car Booking: FAQ

### Bahrah
- Primary keyword: **Makkah to Bahrah Taxi Service**
- Search intent: Someone in Makkah, or in Bahrah, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Bahrah Taxi Service | Private Rides
- Meta description (146 characters): Makkah to Bahrah taxi service: private rides both ways on the old Makkah to Jeddah road, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Bahrah Taxi Service
- Secondary keywords and where they appear:
  - Bahrah to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Bahrah Private Taxi: FAQ
  - Bahrah to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Bahrah Cab Service: FAQ
  - Makkah to Bahrah Car Service: FAQ
  - Makkah to Bahrah Taxi Booking: FAQ
  - Bahrah to Makkah Return Taxi: FAQ
  - Makkah Bahrah Intercity Taxi: FAQ
  - Makkah to Bahrah Private Car: Introduction, FAQ
  - Makkah to Bahrah Door-to-Door Transport: FAQ
  - Makkah to Bahrah Passenger Transfer: FAQ
  - Bahrah to Makkah Car Booking: FAQ

### Turbah
- Primary keyword: **Makkah to Turbah Taxi Service**
- Search intent: Someone in Makkah, or in Turbah, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Turbah Taxi Service | Private Rides
- Meta description (137 characters): Makkah to Turbah (Turabah) taxi service: private long-distance rides both ways, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Turbah Taxi Service
- Secondary keywords and where they appear:
  - Turbah to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Turbah Private Taxi: FAQ
  - Turbah to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Turbah Cab Service: FAQ
  - Makkah to Turbah Car Service: FAQ
  - Makkah to Turbah Taxi Booking: FAQ
  - Turbah to Makkah Return Taxi: FAQ
  - Makkah Turbah Intercity Taxi: FAQ
  - Makkah to Turbah Private Car: Introduction, FAQ
  - Makkah to Turbah Door-to-Door Transport: FAQ
  - Makkah to Turbah Passenger Transport: FAQ
  - Turbah to Makkah Car Booking: FAQ

### Al Kamil
- Primary keyword: **Makkah to Al Kamil Taxi Service**
- Search intent: Someone in Makkah, or in Al Kamil, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Al Kamil Taxi Service | Private Rides
- Meta description (145 characters): Makkah to Al Kamil taxi service: private rides both ways to the north of Makkah Region, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Al Kamil Taxi Service
- Secondary keywords and where they appear:
  - Al Kamil to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Al Kamil Private Taxi: FAQ
  - Al Kamil to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Al Kamil Cab Service: FAQ
  - Makkah to Al Kamil Car Service: FAQ
  - Makkah to Al Kamil Taxi Booking: FAQ
  - Al Kamil to Makkah Return Taxi: FAQ
  - Makkah Al Kamil Intercity Taxi: FAQ
  - Makkah to Al Kamil Private Car: Introduction, FAQ
  - Makkah to Al Kamil Door-to-Door Transport: FAQ
  - Makkah to Al Kamil Passenger Transfer: FAQ
  - Al Kamil to Makkah Car Booking: FAQ

### Al Muwayh
- Primary keyword: **Makkah to Al Muwayh Taxi Service**
- Search intent: Someone in Makkah, or in Al Muwayh, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Al Muwayh Taxi Service | Private Rides
- Meta description (142 characters): Makkah to Al Muwayh taxi service: private long-distance rides both ways on Route 40, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Al Muwayh Taxi Service
- Secondary keywords and where they appear:
  - Al Muwayh to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Al Muwayh Private Taxi: FAQ
  - Al Muwayh to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Al Muwayh Cab Service: FAQ
  - Makkah to Al Muwayh Car Service: FAQ
  - Makkah to Al Muwayh Taxi Booking: FAQ
  - Al Muwayh to Makkah Return Taxi: FAQ
  - Makkah Al Muwayh Intercity Taxi: FAQ
  - Makkah to Al Muwayh Private Car: Introduction, FAQ
  - Makkah to Al Muwayh Door-to-Door Transport: FAQ
  - Makkah to Al Muwayh Passenger Transport: FAQ
  - Al Muwayh to Makkah Car Booking: FAQ

### Ranyah
- Primary keyword: **Makkah to Ranyah Taxi Service**
- Search intent: Someone in Makkah, or in Ranyah, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Ranyah Taxi Service | Private Rides
- Meta description (152 characters): Makkah to Ranyah taxi service: private very long-distance rides both ways, planned with stops, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Ranyah Taxi Service
- Secondary keywords and where they appear:
  - Ranyah to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Ranyah Private Taxi: FAQ
  - Ranyah to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Ranyah Cab Service: FAQ
  - Makkah to Ranyah Car Service: FAQ
  - Makkah to Ranyah Taxi Booking: FAQ
  - Ranyah to Makkah Return Taxi: FAQ
  - Makkah Ranyah Intercity Taxi: FAQ
  - Makkah to Ranyah Private Car: Introduction, FAQ
  - Makkah to Ranyah Door-to-Door Transport: FAQ
  - Makkah to Ranyah Passenger Transfer: FAQ
  - Ranyah to Makkah Car Booking: FAQ

### Maysan
- Primary keyword: **Makkah to Maysan Taxi Service**
- Search intent: Someone in Makkah, or in Maysan, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Maysan Taxi Service | Private Rides
- Meta description (135 characters): Makkah to Maysan taxi service: private rides both ways via Taif, fare confirmed first. Send your trip on WhatsApp to book your journey.
- H1: Makkah to Maysan Taxi Service
- Secondary keywords and where they appear:
  - Maysan to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Maysan Private Taxi: FAQ
  - Maysan to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Maysan Cab Service: FAQ
  - Makkah to Maysan Car Service: FAQ
  - Makkah to Maysan Taxi Booking: FAQ
  - Maysan to Makkah Return Taxi: FAQ
  - Makkah Maysan Intercity Taxi: FAQ
  - Makkah to Maysan Private Car: Introduction, FAQ
  - Makkah to Maysan Door-to-Door Transport: FAQ
  - Makkah to Maysan Passenger Transfer: FAQ
  - Maysan to Makkah Car Booking: FAQ

### Adham
- Primary keyword: **Makkah to Adham Taxi Service**
- Search intent: Someone in Makkah, or in Adham, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Adham Taxi Service | Private Rides
- Meta description (145 characters): Makkah to Adham taxi service: private long rides both ways by way of Taif, fare confirmed first. Send your trip on WhatsApp to book your journey.
- H1: Makkah to Adham Taxi Service
- Secondary keywords and where they appear:
  - Adham to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Adham Private Taxi: FAQ
  - Adham to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Adham Cab Service: FAQ
  - Makkah to Adham Car Service: FAQ
  - Makkah to Adham Taxi Booking: FAQ
  - Adham to Makkah Return Taxi: FAQ
  - Makkah Adham Intercity Taxi: FAQ
  - Makkah to Adham Private Car: Introduction, FAQ
  - Makkah to Adham Door-to-Door Transport: FAQ
  - Makkah to Adham Passenger Transport: FAQ
  - Adham to Makkah Car Booking: FAQ

### Khulais
- Primary keyword: **Makkah to Khulais Taxi Service**
- Search intent: Someone in Makkah, or in Khulais, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Khulais Taxi Service | Private Rides
- Meta description (143 characters): Makkah to Khulais taxi service: private rides both ways on Madinah Road, fare confirmed first. Send your trip on WhatsApp to book your journey.
- H1: Makkah to Khulais Taxi Service
- Secondary keywords and where they appear:
  - Khulais to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Khulais Private Taxi: FAQ
  - Khulais to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Khulais Cab Service: FAQ
  - Makkah to Khulais Car Service: FAQ
  - Makkah to Khulais Taxi Booking: Both directions, FAQ
  - Khulais to Makkah Return Taxi: FAQ
  - Makkah Khulais Intercity Taxi: FAQ
  - Makkah to Khulais Private Car: Introduction, FAQ
  - Makkah to Khulais Door-to-Door Transport: FAQ
  - Makkah to Khulais Passenger Transfer: FAQ
  - Khulais to Makkah Car Booking: FAQ

### Khurma
- Primary keyword: **Makkah to Khurma Taxi Service**
- Search intent: Someone in Makkah, or in Khurma, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Khurma Taxi Service | Private Rides
- Meta description (140 characters): Makkah to Khurma (Al Khurmah) taxi service: private long-distance rides both ways, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Khurma Taxi Service
- Secondary keywords and where they appear:
  - Khurma to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Khurma Private Taxi: FAQ
  - Khurma to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Khurma Cab Service: FAQ
  - Makkah to Khurma Car Service: FAQ
  - Makkah to Khurma Taxi Booking: FAQ
  - Khurma to Makkah Return Taxi: FAQ
  - Makkah Khurma Intercity Taxi: FAQ
  - Makkah to Khurma Private Car: Introduction, FAQ
  - Makkah to Khurma Door-to-Door Transport: FAQ
  - Makkah to Khurma Passenger Transport: FAQ
  - Khurma to Makkah Car Booking: FAQ

### Hada
- Primary keyword: **Makkah to Hada Taxi Service**
- Search intent: Someone in Makkah, or in Hada, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Hada Taxi Service | Private Rides
- Meta description (142 characters): Makkah to Hada (Al Hada) taxi service: private rides both ways up the mountain road, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Hada Taxi Service
- Secondary keywords and where they appear:
  - Hada to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Hada Private Taxi: FAQ
  - Hada to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Hada Cab Service: FAQ
  - Makkah to Hada Car Service: FAQ
  - Makkah to Hada Taxi Booking: FAQ
  - Hada to Makkah Return Taxi: FAQ
  - Makkah Hada Intercity Taxi: FAQ
  - Makkah to Hada Private Car: Introduction, FAQ
  - Makkah to Hada Door-to-Door Transport: FAQ
  - Makkah to Hada Passenger Transfer: FAQ
  - Hada to Makkah Car Booking: FAQ

### Thuwal
- Primary keyword: **Makkah to Thuwal Taxi Service**
- Search intent: Someone in Makkah, or in Thuwal, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Thuwal Taxi Service | Private Rides
- Meta description (149 characters): Makkah to Thuwal taxi service: private rides both ways to the Red Sea coast and KAUST area, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Thuwal Taxi Service
- Secondary keywords and where they appear:
  - Thuwal to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Thuwal Private Taxi: FAQ
  - Thuwal to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Thuwal Cab Service: FAQ
  - Makkah to Thuwal Car Service: FAQ
  - Makkah to Thuwal Taxi Booking: Both directions, FAQ
  - Thuwal to Makkah Return Taxi: FAQ
  - Makkah Thuwal Intercity Taxi: FAQ
  - Makkah to Thuwal Private Car: Introduction, FAQ
  - Makkah to Thuwal Door-to-Door Transport: FAQ
  - Makkah to Thuwal Passenger Transfer: FAQ
  - Thuwal to Makkah Car Booking: FAQ

### Al Hawiyah
- Primary keyword: **Makkah to Al Hawiyah Taxi Service**
- Search intent: Someone in Makkah, or in Al Hawiyah, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Al Hawiyah Taxi Service | Private Rides
- Meta description (139 characters): Makkah to Al Hawiyah taxi service: private rides both ways on Route 40 past Taif, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Al Hawiyah Taxi Service
- Secondary keywords and where they appear:
  - Al Hawiyah to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Al Hawiyah Private Taxi: FAQ
  - Al Hawiyah to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Al Hawiyah Cab Service: FAQ
  - Makkah to Al Hawiyah Car Service: FAQ
  - Makkah to Al Hawiyah Taxi Booking: FAQ
  - Al Hawiyah to Makkah Return Taxi: FAQ
  - Makkah Al Hawiyah Intercity Taxi: FAQ
  - Makkah to Al Hawiyah Private Car: Introduction, FAQ
  - Makkah to Al Hawiyah Door-to-Door Transport: FAQ
  - Makkah to Al Hawiyah Passenger Transport: FAQ
  - Al Hawiyah to Makkah Car Booking: FAQ

### Dhahban
- Primary keyword: **Makkah to Dhahban Taxi Service**
- Search intent: Someone in Makkah, or in Dhahban, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Dhahban Taxi Service | Private Rides
- Meta description (155 characters): Makkah to Dhahban taxi service: private rides both ways via the Jeddah expressway and coast road, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Dhahban Taxi Service
- Secondary keywords and where they appear:
  - Dhahban to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Dhahban Private Taxi: FAQ
  - Dhahban to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Dhahban Cab Service: FAQ
  - Makkah to Dhahban Car Service: FAQ
  - Makkah to Dhahban Taxi Booking: FAQ
  - Dhahban to Makkah Return Taxi: FAQ
  - Makkah Dhahban Intercity Taxi: FAQ
  - Makkah to Dhahban Private Car: Introduction, FAQ
  - Makkah to Dhahban Door-to-Door Transport: FAQ
  - Makkah to Dhahban Passenger Transport: FAQ
  - Dhahban to Makkah Car Booking: FAQ

### Ash Shafa
- Primary keyword: **Makkah to Ash Shafa Taxi Service**
- Search intent: Someone in Makkah, or in Ash Shafa, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Ash Shafa Taxi Service | Private Rides
- Meta description (151 characters): Makkah to Ash Shafa taxi service: private rides both ways past Taif into the Shafa mountains, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Ash Shafa Taxi Service
- Secondary keywords and where they appear:
  - Ash Shafa to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Ash Shafa Private Taxi: FAQ
  - Ash Shafa to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Ash Shafa Cab Service: FAQ
  - Makkah to Ash Shafa Car Service: FAQ
  - Makkah to Ash Shafa Taxi Booking: FAQ
  - Ash Shafa to Makkah Return Taxi: FAQ
  - Makkah Ash Shafa Intercity Taxi: FAQ
  - Makkah to Ash Shafa Private Car: Introduction, FAQ
  - Makkah to Ash Shafa Door-to-Door Transport: FAQ
  - Makkah to Ash Shafa Passenger Transfer: FAQ
  - Ash Shafa to Makkah Car Booking: FAQ

### Hali
- Primary keyword: **Makkah to Hali Taxi Service**
- Search intent: Someone in Makkah, or in Hali, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Hali Taxi Service | Private Rides
- Meta description (153 characters): Makkah to Hali taxi service: private very long-distance rides both ways down the Red Sea coast, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Hali Taxi Service
- Secondary keywords and where they appear:
  - Hali to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Hali Private Taxi: FAQ
  - Hali to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Hali Cab Service: FAQ
  - Makkah to Hali Car Service: FAQ
  - Makkah to Hali Taxi Booking: FAQ
  - Hali to Makkah Return Taxi: FAQ
  - Makkah Hali Intercity Taxi: FAQ
  - Makkah to Hali Private Car: Introduction, FAQ
  - Makkah to Hali Door-to-Door Transport: FAQ
  - Makkah to Hali Passenger Transport: FAQ
  - Hali to Makkah Car Booking: FAQ

### Qiya
- Primary keyword: **Makkah to Qiya Taxi Service**
- Search intent: Someone in Makkah, or in Qiya, who wants a private car with a driver between the two places and needs to know how to book, what to send and whether the return is possible.
- SEO title: Makkah to Qiya Taxi Service | Private Rides
- Meta description (147 characters): Makkah to Qiya taxi service: private rides both ways through Taif to the village of Qiya, fare confirmed first. Send your trip on WhatsApp to book.
- H1: Makkah to Qiya Taxi Service
- Secondary keywords and where they appear:
  - Qiya to Makkah Taxi Service: Introduction, FAQ
  - Makkah to Qiya Private Taxi: FAQ
  - Qiya to Makkah Private Taxi: Both directions, FAQ
  - Makkah to Qiya Cab Service: FAQ
  - Makkah to Qiya Car Service: FAQ
  - Makkah to Qiya Taxi Booking: FAQ
  - Qiya to Makkah Return Taxi: FAQ
  - Makkah Qiya Intercity Taxi: FAQ
  - Makkah to Qiya Private Car: Introduction, FAQ
  - Makkah to Qiya Door-to-Door Transport: FAQ
  - Makkah to Qiya Passenger Transfer: FAQ
  - Qiya to Makkah Car Booking: FAQ

## C. Route research

Method for every route: OpenStreetMap routing (OSRM, driving profile) from the Makkah centre (the Masjid al-Haram area, 21.4225, 39.8262) to the centre point Nominatim gives for the destination, reviewed in November 2026. Distances are therefore road distances measured one consistent way, not straight lines and not mixed sources. Journey times are the routing engine's light-traffic estimate and are shown as estimates, never as promises. Administrative areas come from Nominatim (zoom 10 reverse lookup).

| Page | Verified place and area | Roads from routing | Distance | Time | Notes |
|---|---|---|---|---|---|
| Jeddah | Jeddah, Makkah Region | Jeddah to Makkah Expressway (Route 40); King Abdulaziz International Airport (JED) | 88.7 km | about 65 min |  |
| Taif | Taif, Makkah Region | Al Kara to Al Hada mountain road; From the Makkah basin to the Taif plateau | 88.8 km | about 73 min |  |
| Rabigh | Rabigh Governorate, Makkah Region | Madinah Road (Route 15), then Route 5; Seat of Rabigh Governorate | 206.5 km | about 135 min |  |
| Al Qunfudhah | Al Qunfudhah Governorate, Makkah Region | Makkah to Al Lith road, then Route 5; Seat of Al Qunfudhah Governorate | 358 km | about 250 min |  |
| Al Lith | Al Lith Governorate, Makkah Region | Makkah to Al Lith road, then Route 5; Seat of Al Lith Governorate | 202.1 km | about 146 min |  |
| Al Jumum | Al Jumum Governorate, Makkah Region | Madinah Road (Route 15); Seat of Al Jumum Governorate | 31.6 km | about 27 min |  |
| Bahrah | Bahrah Governorate, Makkah Region | Old Makkah Road; Seat of Bahrah Governorate | 46.7 km | about 37 min |  |
| Turbah | Turubah Governorate, Makkah Region | Route 40, the Makkah to Riyadh highway; Seat of Turubah Governorate | 245 km | about 176 min | Written Turbah, Turabah and Turubah. |
| Al Kamil | Al Kamil Governorate, Makkah Region | Madinah Road (Route 15), then connecting roads; Seat of Al Kamil Governorate | 161.6 km | about 143 min |  |
| Al Muwayh | Al Muwayh Governorate, Makkah Region | Route 40, the Makkah to Riyadh highway; Seat of Al Muwayh Governorate | 280.8 km | about 197 min |  |
| Ranyah | Ranyah Governorate, Makkah Region | Route 40, then Route 255; Seat of Ranyah Governorate | 449.4 km | about 318 min |  |
| Maysan | Maysan Governorate, Makkah Region | The Al Kara to Al Hada road and Taif; Seat of Maysan Governorate | 191.3 km | about 163 min | Written Maysan and Missan. |
| Adham | Adham Governorate, Makkah Region | Taif, then Routes 15, 205 and 273; Seat of Adham Governorate | 276.8 km | about 257 min | Written Adham and Adam. |
| Khulais | Khulais Governorate, Makkah Region | Madinah Road (Route 15); Seat of Khulais Governorate | 126.2 km | about 88 min | Written Khulais and Khulays. |
| Khurma | Al Khurmah Governorate, Makkah Region | Route 40, then Route 255; Seat of Al Khurmah Governorate | 316 km | about 225 min | Written Khurma and Al Khurmah. |
| Hada | Al Hada, Taif Governorate, Makkah Region | The Al Kara to Al Hada road; Town in Taif Governorate | 70.1 km | about 58 min | Al Hada on the mountain above Taif (a different neighbourhood named Al Hada exists in Jeddah). |
| Thuwal | Thuwal, Jeddah Governorate, Makkah Region | Madinah Road (Route 15), then the Jeddah to Madinah road; Town in Jeddah Governorate | 145.4 km | about 95 min | A town in Jeddah Governorate, not a separate governorate. |
| Al Hawiyah | Al Hawiyah, Taif Governorate, Makkah Region | Route 40, the Makkah to Riyadh highway; Town in Taif Governorate | 109.4 km | about 80 min |  |
| Dhahban | Dhahban, Jeddah Governorate, Makkah Region | Jeddah to Makkah Expressway, then Al Haramain Road (Route 5); Village in Jeddah Governorate | 126.6 km | about 91 min | A village north of Jeddah, in Jeddah Governorate. |
| Ash Shafa | Ash Shafa, Taif Governorate, Makkah Region | The Al Kara to Al Hada road, King Fahd Ring Road and Ash Shafa Road; Town in Taif Governorate | 117.2 km | about 98 min |  |
| Hali | Hali, Al Qunfudhah Governorate, Makkah Region | Makkah to Al Lith road, then Route 5; Village in the Al Qunfudhah area | 430.4 km | about 299 min | Hali's point on the map is approximate (rounded coordinates), so the distance is an estimate. |
| Qiya | Qiya, Taif Governorate, Makkah Region | The Al Kara to Al Hada road and Taif; Village in Taif Governorate | 161.5 km | about 124 min | Only the village itself is listed on OpenStreetMap, so no local landmarks are claimed. |

Uncertainty and limits: routing engines can choose a different road from the one a driver prefers; OSRM did not label every road number, so where a number was missing the page says "connecting roads" instead of guessing. No distance was published from a second source, so there is no disagreement to reconcile; Google Maps distances were not compared and may differ by a few kilometres.

## D. Driving directions

Every page has "Driving Directions from Makkah to <place>" as one paragraph with no list or table, counted by script at build time (the build fails if a count is not exactly 100).

| Page | Words |
|---|---|
| Jeddah | 100 |
| Taif | 100 |
| Rabigh | 100 |
| Al Qunfudhah | 100 |
| Al Lith | 100 |
| Al Jumum | 100 |
| Bahrah | 100 |
| Turbah | 100 |
| Al Kamil | 100 |
| Al Muwayh | 100 |
| Ranyah | 100 |
| Maysan | 100 |
| Adham | 100 |
| Khulais | 100 |
| Khurma | 100 |
| Hada | 100 |
| Thuwal | 100 |
| Al Hawiyah | 100 |
| Dhahban | 100 |
| Ash Shafa | 100 |
| Hali | 100 |
| Qiya | 100 |

## E. Google Maps links

"Neighbourhoods and Destinations" sits directly after the directions on every page. Links use https://www.google.com/maps/search/?api=1&query=<encoded name, place, Saudi Arabia> and open in a new tab. The build checks that there are no duplicate labels or queries.

| Page | Links |
|---|---|
| Jeddah | 25 |
| Taif | 25 |
| Rabigh | 25 |
| Al Qunfudhah | 25 |
| Al Lith | 25 |
| Al Jumum | 25 |
| Bahrah | 25 |
| Turbah | 25 |
| Al Kamil | 25 |
| Al Muwayh | 25 |
| Ranyah | 25 |
| Maysan | 25 |
| Adham | 25 |
| Khulais | 25 |
| Khurma | 25 |
| Hada | 25 |
| Thuwal | 25 |
| Al Hawiyah | 25 |
| Dhahban | 25 |
| Ash Shafa | 25 |
| Hali | 25 |
| Qiya | 18 (shortfall, see below) |

- 21 pages have exactly 25 unique links. **Qiya has 18**: OpenStreetMap lists only the village itself within about 12 km, so the list stops short rather than inventing places (the build requires a written reason for any page under 25).
- **What "verified" means here.** Place names come from OpenStreetMap or Nominatim records near each destination; Makkah districts come from OpenStreetMap neighbourhood records within 8 km of the Haram. The links are search links, so Google decides what each opens. I did not open all 531 links in Google Maps, so I cannot claim each one was checked there. Many village names are only in Arabic on OpenStreetMap, so those queries use the Arabic name with the place.
- Because remote destinations have few named features, some pages use region-level towns (for example Taif, Al Hada, Al Hawiyah) and well-known cities among the 25, as the brief's fourth priority allows ("other relevant Saudi destinations").

## F. Weather

Every page shows two live weather strips (departure and arrival) from the existing weather component on the Riyadh town pages, using Open-Meteo with the Asia/Riyadh timezone and fixed coordinates, not the visitor's location. Makkah: 21.4225, 39.8262.

| Page | Destination coordinates |
|---|---|
| Jeddah | 21.5433, 39.1728 |
| Taif | 21.2703, 40.4158 |
| Rabigh | 22.799, 39.0336 |
| Al Qunfudhah | 19.1264, 41.0789 |
| Al Lith | 20.1451, 40.2701 |
| Al Jumum | 21.6212, 39.699 |
| Bahrah | 21.4013, 39.45 |
| Turbah | 21.218, 41.6335 |
| Al Kamil | 22.264, 39.7982 |
| Al Muwayh | 22.4366, 41.7619 |
| Ranyah | 21.2572, 42.8502 |
| Maysan | 20.7372, 40.8387 |
| Adham | 20.4497, 40.8791 |
| Khulais | 22.1551, 39.3202 |
| Khurma | 21.9081, 42.0318 |
| Hada | 21.3686, 40.2847 |
| Thuwal | 22.2833, 39.1128 |
| Al Hawiyah | 21.4449, 40.503 |
| Dhahban | 21.931, 39.1182 |
| Ash Shafa | 21.0694, 40.3119 |
| Hali | 18.7, 41.3333 |
| Qiya | 21.0711, 41.0069 |

The browser test (section M) checks that real temperatures render on each page. The component shows an honest "unavailable" state, not made-up values, if the service does not answer. The brief suggests one combined heading ("Current Weather in Makkah and <place>"); the existing component uses two strips, one per place, in the order the brief requires (after the directions and maps, before the final call to action).

## G. UI and layout

The six layout families of the Riyadh town pages are reused (they use the existing brand colours and components, so nothing new was added to the theme). Each page uses one, in rotation, with its own section order; the words, FAQs, places and links of every page are written separately.

| Page | Style |
|---|---|
| Jeddah | Road style: a route line from Makkah to the destination, then intro, both directions, pickups, drop-offs, places, plan, information, related routes and FAQ. |
| Taif | Journey style: both directions first as two numbered panels, then intro, places, pickups, drop-offs, plan, information, FAQ and related routes. |
| Rabigh | Editorial style: long-form intro, then places, both directions, drop-offs, pickups, information, plan, related routes and FAQ. |
| Al Qunfudhah | Split style: intro, both directions, drop-offs, places, pickups, plan, FAQ, information and related routes in side-by-side blocks. |
| Al Lith | Board style: both directions, then intro, pickups, drop-offs, plan, places, information, FAQ and related routes as a board of cards. |
| Al Jumum | Ledger style: intro, pickups, both directions, drop-offs, information, places, plan, FAQ and related routes as a numbered ledger. |
| Bahrah | Road style: a route line from Makkah to the destination, then intro, both directions, pickups, drop-offs, places, plan, information, related routes and FAQ. |
| Turbah | Journey style: both directions first as two numbered panels, then intro, places, pickups, drop-offs, plan, information, FAQ and related routes. |
| Al Kamil | Editorial style: long-form intro, then places, both directions, drop-offs, pickups, information, plan, related routes and FAQ. |
| Al Muwayh | Split style: intro, both directions, drop-offs, places, pickups, plan, FAQ, information and related routes in side-by-side blocks. |
| Ranyah | Board style: both directions, then intro, pickups, drop-offs, plan, places, information, FAQ and related routes as a board of cards. |
| Maysan | Ledger style: intro, pickups, both directions, drop-offs, information, places, plan, FAQ and related routes as a numbered ledger. |
| Adham | Road style: a route line from Makkah to the destination, then intro, both directions, pickups, drop-offs, places, plan, information, related routes and FAQ. |
| Khulais | Journey style: both directions first as two numbered panels, then intro, places, pickups, drop-offs, plan, information, FAQ and related routes. |
| Khurma | Editorial style: long-form intro, then places, both directions, drop-offs, pickups, information, plan, related routes and FAQ. |
| Hada | Split style: intro, both directions, drop-offs, places, pickups, plan, FAQ, information and related routes in side-by-side blocks. |
| Thuwal | Board style: both directions, then intro, pickups, drop-offs, plan, places, information, FAQ and related routes as a board of cards. |
| Al Hawiyah | Ledger style: intro, pickups, both directions, drop-offs, information, places, plan, FAQ and related routes as a numbered ledger. |
| Dhahban | Road style: a route line from Makkah to the destination, then intro, both directions, pickups, drop-offs, places, plan, information, related routes and FAQ. |
| Ash Shafa | Journey style: both directions first as two numbered panels, then intro, places, pickups, drop-offs, plan, information, FAQ and related routes. |
| Hali | Editorial style: long-form intro, then places, both directions, drop-offs, pickups, information, plan, related routes and FAQ. |
| Qiya | Split style: intro, both directions, drop-offs, places, pickups, plan, FAQ, information and related routes in side-by-side blocks. |

## H. Forms and WhatsApp

- Compact booking form in the hero and a second booking form near the bottom of every page (the existing widget; two forms per page, checked by test).
- Mobile: the hero form comes straight after the header, before the H1 (the order change made for all pages earlier; measured on all 22 pages at 390 px).
- WhatsApp: every page has a button for each direction with a prefilled message ("Hello Gulf Elite Transport Group, I would like to request a private taxi from Makkah to <place>. Please confirm availability, vehicle options and fare." and the reverse). The number comes from the site configuration; the build fails if it no longer matches the verified one.
- A live submission was not sent, to avoid creating a real enquiry.

## I. Image placements

Each page has four placeholders. Add the files to public/images/routes/makkah-to-<place>/ named hero, highway, makkah and destination (webp preferred; avif, jpg, jpeg and png also work). Convert to WebP at about the sizes the placeholders show, add the file and rebuild. Alt text is already written. Paths:

- Jeddah: public/images/routes/makkah-to-jeddah/{hero,highway,makkah,destination}.webp
- Taif: public/images/routes/makkah-to-taif/{hero,highway,makkah,destination}.webp
- Rabigh: public/images/routes/makkah-to-rabigh/{hero,highway,makkah,destination}.webp
- Al Qunfudhah: public/images/routes/makkah-to-al-qunfudhah/{hero,highway,makkah,destination}.webp
- Al Lith: public/images/routes/makkah-to-al-lith/{hero,highway,makkah,destination}.webp
- Al Jumum: public/images/routes/makkah-to-al-jumum/{hero,highway,makkah,destination}.webp
- Bahrah: public/images/routes/makkah-to-bahrah/{hero,highway,makkah,destination}.webp
- Turbah: public/images/routes/makkah-to-turbah/{hero,highway,makkah,destination}.webp
- Al Kamil: public/images/routes/makkah-to-al-kamil/{hero,highway,makkah,destination}.webp
- Al Muwayh: public/images/routes/makkah-to-al-muwayh/{hero,highway,makkah,destination}.webp
- Ranyah: public/images/routes/makkah-to-ranyah/{hero,highway,makkah,destination}.webp
- Maysan: public/images/routes/makkah-to-maysan/{hero,highway,makkah,destination}.webp
- Adham: public/images/routes/makkah-to-adham/{hero,highway,makkah,destination}.webp
- Khulais: public/images/routes/makkah-to-khulais/{hero,highway,makkah,destination}.webp
- Khurma: public/images/routes/makkah-to-khurma/{hero,highway,makkah,destination}.webp
- Hada: public/images/routes/makkah-to-hada/{hero,highway,makkah,destination}.webp
- Thuwal: public/images/routes/makkah-to-thuwal/{hero,highway,makkah,destination}.webp
- Al Hawiyah: public/images/routes/makkah-to-al-hawiyah/{hero,highway,makkah,destination}.webp
- Dhahban: public/images/routes/makkah-to-dhahban/{hero,highway,makkah,destination}.webp
- Ash Shafa: public/images/routes/makkah-to-ash-shafa/{hero,highway,makkah,destination}.webp
- Hali: public/images/routes/makkah-to-hali/{hero,highway,makkah,destination}.webp
- Qiya: public/images/routes/makkah-to-qiya/{hero,highway,makkah,destination}.webp

## J. Internal links

Every page links to: its related routes (listed below), the Makkah Region page, Umrah and Hajj taxi, Jeddah airport, all routes, taxi and cab services, passenger transport, the booking page and the contact page. The sentences also pick up automatic links to other place pages. In the other direction, the new pages were added to the routes index, the Makkah Region page (a new section listing all 22) and the Makkah city page.

- Jeddah: taif, bahrah, riyadh-to-makkah, makkah-to-madinah, makkah-to-yanbu
- Taif: jeddah, hada, al-hawiyah, ash-shafa, makkah-to-madinah
- Rabigh: jeddah, khulais, thuwal, makkah-to-madinah, makkah-to-yanbu
- Al Qunfudhah: al-lith, hali, jeddah, makkah-to-taif
- Al Lith: al-qunfudhah, jeddah, makkah-to-taif, khulais
- Al Jumum: khulais, rabigh, al-kamil, makkah-to-madinah
- Bahrah: jeddah, al-jumum, khulais, dhahban
- Turbah: makkah-to-taif, al-hawiyah, khurma, ranyah
- Al Kamil: al-jumum, khulais, rabigh, makkah-to-madinah
- Al Muwayh: turbah, khurma, ranyah, makkah-to-taif
- Ranyah: turbah, khurma, al-muwayh, makkah-to-taif
- Maysan: makkah-to-taif, adham, hada, al-qunfudhah
- Adham: maysan, makkah-to-taif, hada, al-qunfudhah
- Khulais: al-jumum, al-kamil, rabigh, makkah-to-madinah
- Khurma: turbah, al-muwayh, ranyah, makkah-to-taif
- Hada: makkah-to-taif, ash-shafa, al-hawiyah, makkah-to-jeddah
- Thuwal: rabigh, dhahban, makkah-to-jeddah, khulais
- Al Hawiyah: makkah-to-taif, hada, ash-shafa, turbah
- Dhahban: jeddah, thuwal, bahrah, rabigh
- Ash Shafa: makkah-to-taif, hada, al-hawiyah, makkah-to-jeddah
- Hali: al-qunfudhah, al-lith, adham, makkah-to-jeddah
- Qiya: makkah-to-taif, maysan, adham, al-hawiyah

## K. Technical SEO

- Unique title (48 to 60 characters on the built pages) and unique description (135 to 155 characters), canonical URL /taxi-saudi-arabia/routes/makkah-to-<place>, no noindex, Open Graph title and description (default social image; no verified per-route image exists yet).
- One H1 per page, heading levels never skip.
- JSON-LD: WebPage, BreadcrumbList, Service and FAQPage from the existing page schema; FAQ schema equals the visible FAQs (nine per page).
- Sitemap: the pages come from the same page list as the sitemap, so they are included automatically.
- Not run: Lighthouse, Core Web Vitals, Google's Rich Results Test.

## L. Files changed

Created
- src/content/saudi/makkah-routes/specs-1.ts to specs-7.ts: the 22 hand-written route specs.
- src/content/saudi/makkah-routes/specs.ts: the list of 22 and the keyword FAQs.
- src/content/saudi/makkah-routes/keywords.ts: the primary and twelve secondary keywords per page and the three keyword FAQs.
- src/content/saudi/makkah-routes/shared.ts: Maps link helpers.
- docs/makkah-routes-implementation-report.md: this report.

Modified
- src/content/saudi/town-routes/factory.ts: made the builder work for any starting city (Riyadh behaves as before); optional region and area fields on a spec.
- src/content/saudi/town-routes/types.ts: two optional fields (starting-city image slot, footer links).
- src/components/RichTown.tsx: the starting city name is no longer hard-coded; default behaviour for Riyadh pages is unchanged.
- src/content/saudi/build.ts: builds both sets of pages from one function; Makkah Region, Makkah city and routes index list the new pages; the two upgraded routes are not built twice.
- src/content/saudi/places.ts: the Jeddah route is now makkah-to-jeddah.
- src/app/book/page.tsx, src/content/umrah/pages.ts: links to the renamed Jeddah route.
- public/_redirects: 301 from the old Jeddah URL.

## M. Testing (what was actually run)

- **Source checks (script, all 22 specs):** primary keyword in title, H1 and lead; all 12 secondary keywords present in the page text; title at most 60 characters; description at most 158 characters with a WhatsApp prompt and no call wording; at least five FAQs; related routes exist; Maps labels and queries unique; directions exactly 100 words. Result: 22 of 22 pass.
- **Build:** `npm run build` passes (the build itself also stops on a wrong word count, a duplicate Maps link, a missing related route or a changed WhatsApp number).
- **Built-page checks (script on out/, all 22 pages):** unique titles and descriptions, canonical URL correct, no noindex, Open Graph present, exactly one H1 equal to the primary keyword, keyword in the title, reverse-direction wording in the text, directions heading and paragraph of exactly 100 words, 25 unique Maps links (18 on Qiya), order directions then maps then weather, exactly two booking forms, WhatsApp link present, no tel: link, no "call us" text, at least two image placeholders, JSON-LD parses and contains BreadcrumbList and FAQPage, no skipped heading levels, no broken internal links, no image without alt. Result: 22 of 22 pass.
- **Browser checks (headless Edge, 22 pages at 390, 820 and 1366 px, 66 checks):** no horizontal overflow, no console errors, two forms on every page, hero form under 560 px tall, and on mobile the form sits directly under the header and above the H1 on all 22 pages. Weather: after scrolling to the strip, real temperatures rendered on all 22 pages (the strip loads lazily, so a first-load check that does not scroll reports none).
- **Visual review:** Makkah to Jeddah (desktop hero) and Makkah to Hali (mobile hero) were looked at in screenshots; the other pages were checked by the scripts only.
- **Not tested:** a live form submission (it would create a real enquiry), the WhatsApp links opening WhatsApp, Lighthouse and Core Web Vitals, Google's Rich Results Test, a real phone, every Maps link in Google Maps.

## Items that need your input

- **Photos** for the four placeholders on each page (section I).
- **Which places you really serve.** The pages promise nothing beyond "we confirm availability, vehicle and fare", but 22 destinations include very remote ones (Hali, Ranyah, Qiya). Say if any should be removed or limited.
- **Hali and Qiya.** Hali's map point is rounded, so its distance is approximate. Qiya is a village with almost nothing around it on OpenStreetMap, so it has 18 map links and no landmarks. A map pin from the customer is the practical way to book either.
- **Distances from a second source.** Only OpenStreetMap routing was used. If you want Google Maps distances compared, that needs a person with Google Maps open.
- **Phone number.** The brief lists +966 57 985 8464; the pages do not show it or offer a call, in line with your earlier instruction for the Riyadh town pages. Say if Makkah pages should differ.
- **Page tracker and push.** Nothing was committed or pushed. Before a push, `npm run tracker` must be run and docs/page-tracker.csv committed (your standing rule).
