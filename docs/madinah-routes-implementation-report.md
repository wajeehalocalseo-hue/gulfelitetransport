# Madinah route pages: implementation and QA report

Generated from the source files and the built site after the implementation described in the pasted "MASTER CLAUDE CODE IMPLEMENTATION PROMPT" (15 Madinah-origin intercity taxi route pages). Where something could not be verified or was not done, it is stated.

## Decisions that differ from the brief

- **URL structure.** The brief suggests /services/madinah-to-... The existing intercity route pages (the Riyadh Region town pages, the Riyadh routes and the 22 Makkah pages) live under /taxi-saudi-arabia/routes/, so the 15 pages follow that convention: /taxi-saudi-arabia/routes/madinah-to-<place>. This keeps one route family in one place and links it into the routes index, the Madinah Region page and the Madinah city page.
- **Madinah to Yanbu already existed** (as a short route page at /taxi-saudi-arabia/routes/madinah-to-yanbu). As with Makkah to Jeddah and Makkah to Taif, it was rebuilt at the same URL as page 1 and no duplicate was created. Its distance in the older route table (220 km) was corrected to 239 km to match the routing data used for the new page.
- **Yanbu and Yanbu Al Bahr are the same road.** OpenStreetMap lists Yanbu Al Bahr as a suburb of Yanbu about 2 km from the Yanbu city point. Both pages were built because both were requested, but they differ by drop-off focus: Yanbu covers the whole city (old town, airport, Yanbu Industrial City); Yanbu Al Bahr covers the coast, the historic area and the monuments. This is a cannibalisation risk (see Items needing your input).
- **Three destinations are not in Madinah Region.** Umluj and Al Wajh are in Tabuk Region. Al Nabhaniyah is in Qassim Region. Each page says so in the direct answer, the facts strip and an FAQ, and none is described as being in Madinah Region. On the Madinah Region page they appear in a list headed "towns in Madinah Region and beyond".
- **Hero and bottom forms** are the site's existing booking widget (pickup, destination, date, time, "Continue Booking" into the /book flow), the same component used on the Riyadh and Makkah pages. It was not changed, so there is no passenger-count or contact field in the page forms; those are collected in the /book flow.
- **Image placements.** Each page has four labelled placeholders (hero, highway, Madinah, destination), not 2 to 3, because the shared town-route layout has four slots. No stock or fabricated photos were used.
- **No call option.** As with the Riyadh and Makkah pages (your earlier instruction), there is no call button or tel: link; pages send people to WhatsApp or the booking form. The phone number in the brief is not shown. WhatsApp uses the site's central contact configuration (966579858464).
- **Layouts.** The engine rotates six layout styles by page position, so the 15 pages use six distinct compositions plus different content, not 15 unique layouts.

## A. Pages

| # | URL | Status |
|---|---|---|
| 1 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-yanbu | Rebuilt at the existing URL; built and tested |
| 2 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-al-ula | New; built and tested |
| 3 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-badr | New; built and tested |
| 4 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-khaybar | New; built and tested |
| 5 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-al-hanakiyah | New; built and tested |
| 6 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-mahd-al-dhahab | New; built and tested |
| 7 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-umluj | New; built and tested |
| 8 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-al-wajh | New; built and tested |
| 9 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-al-ais | New; built and tested |
| 10 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-yanbu-al-bahr | New; built and tested |
| 11 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-yanbu-al-nakhl | New; built and tested |
| 12 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-wadi-al-fara | New; built and tested |
| 13 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-sulaylah-juhainah | New; built and tested |
| 14 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-faqrah | New; built and tested |
| 15 | https://gulfelitetransportgroup.com/taxi-saudi-arabia/routes/madinah-to-al-nabhaniyah | New; built and tested |

Madinah Region page, Madinah city page, the routes index and the Yanbu city page link to the new pages. The pages are in the sitemap through the existing route generator.

## B. Keyword strategy

### 1. Madinah to Yanbu Taxi Service

- **Primary keyword:** Madinah to Yanbu Taxi Service
- **Secondary keywords:** Yanbu to Madinah Taxi Service; Madinah to Yanbu Private Taxi; Yanbu to Madinah Private Taxi; Madinah to Yanbu Cab Service; Madinah to Yanbu Car Service; Madinah to Yanbu Taxi Booking; Yanbu to Madinah Return Taxi; Madinah Yanbu Intercity Taxi; Madinah to Yanbu Private Car; Madinah to Yanbu Door-to-Door Transport; Madinah to Yanbu Airport Taxi; Yanbu to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Yanbu, in either direction, and wants to ask for a fare.
- **SEO title (45 characters):** Madinah to Yanbu Taxi Service | Private Rides
- **Meta description (152 characters):** Madinah to Yanbu taxi service: private rides both ways, airport and industrial city transfers, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Yanbu Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Yanbu to Madinah ...) in the "Yanbu to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Airport Taxi phrases in natural questions.

### 2. Madinah to Al Ula Taxi Service

- **Primary keyword:** Madinah to Al Ula Taxi Service
- **Secondary keywords:** Al Ula to Madinah Taxi Service; Madinah to Al Ula Private Taxi; Al Ula to Madinah Private Taxi; Madinah to Al Ula Cab Service; Madinah to Al Ula Car Service; Madinah to Al Ula Taxi Booking; Al Ula to Madinah Return Taxi; Madinah Al Ula Intercity Taxi; Madinah to Al Ula Private Car; Madinah to Al Ula Door-to-Door Transport; Madinah to Al Ula Tourist Transport; Al Ula to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Al Ula, in either direction, and wants to ask for a fare.
- **SEO title (46 characters):** Madinah to Al Ula Taxi Service | Private Rides
- **Meta description (155 characters):** Madinah to Al Ula taxi service: private rides both ways for visitors and residents, return trips, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Al Ula Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Al Ula to Madinah ...) in the "Al Ula to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Tourist Transport phrases in natural questions.

### 3. Madinah to Badr Taxi Service

- **Primary keyword:** Madinah to Badr Taxi Service
- **Secondary keywords:** Badr to Madinah Taxi Service; Madinah to Badr Private Taxi; Badr to Madinah Private Taxi; Madinah to Badr Cab Service; Madinah to Badr Car Service; Madinah to Badr Taxi Booking; Badr to Madinah Return Taxi; Madinah Badr Intercity Taxi; Madinah to Badr Private Car; Madinah to Badr Door-to-Door Transport; Madinah to Badr Passenger Transport; Badr to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Badr, in either direction, and wants to ask for a fare.
- **SEO title (44 characters):** Madinah to Badr Taxi Service | Private Rides
- **Meta description (153 characters):** Madinah to Badr taxi service: private rides both ways for visitors and residents, return trips, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Badr Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Badr to Madinah ...) in the "Badr to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transport phrases in natural questions.

### 4. Madinah to Khaybar Taxi Service

- **Primary keyword:** Madinah to Khaybar Taxi Service
- **Secondary keywords:** Khaybar to Madinah Taxi Service; Madinah to Khaybar Private Taxi; Khaybar to Madinah Private Taxi; Madinah to Khaybar Cab Service; Madinah to Khaybar Car Service; Madinah to Khaybar Taxi Booking; Khaybar to Madinah Return Taxi; Madinah Khaybar Intercity Taxi; Madinah to Khaybar Private Car; Madinah to Khaybar Door-to-Door Transport; Madinah to Khaybar Passenger Transfer; Khaybar to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Khaybar, in either direction, and wants to ask for a fare.
- **SEO title (47 characters):** Madinah to Khaybar Taxi Service | Private Rides
- **Meta description (147 characters):** Madinah to Khaybar taxi service: private rides both ways on the Tabuk road, return trips, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Khaybar Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Khaybar to Madinah ...) in the "Khaybar to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transfer phrases in natural questions.

### 5. Madinah to Al Hanakiyah Taxi Service

- **Primary keyword:** Madinah to Al Hanakiyah Taxi Service
- **Secondary keywords:** Al Hanakiyah to Madinah Taxi Service; Madinah to Al Hanakiyah Private Taxi; Al Hanakiyah to Madinah Private Taxi; Madinah to Al Hanakiyah Cab Service; Madinah to Al Hanakiyah Car Service; Madinah to Al Hanakiyah Taxi Booking; Al Hanakiyah to Madinah Return Taxi; Madinah Al Hanakiyah Intercity Taxi; Madinah to Al Hanakiyah Private Car; Madinah to Al Hanakiyah Door-to-Door Transport; Madinah to Al Hanakiyah Passenger Transport; Al Hanakiyah to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Al Hanakiyah, in either direction, and wants to ask for a fare.
- **SEO title (52 characters):** Madinah to Al Hanakiyah Taxi Service | Private Rides
- **Meta description (153 characters):** Madinah to Al Hanakiyah taxi service: private rides both ways on the Qassim road, return trips, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Al Hanakiyah Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Al Hanakiyah to Madinah ...) in the "Al Hanakiyah to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transport phrases in natural questions.

### 6. Madinah to Mahd Al Dhahab Taxi Service

- **Primary keyword:** Madinah to Mahd Al Dhahab Taxi Service
- **Secondary keywords:** Mahd Al Dhahab to Madinah Taxi Service; Madinah to Mahd Al Dhahab Private Taxi; Mahd Al Dhahab to Madinah Private Taxi; Madinah to Mahd Al Dhahab Cab Service; Madinah to Mahd Al Dhahab Car Service; Madinah to Mahd Al Dhahab Taxi Booking; Mahd Al Dhahab to Madinah Return Taxi; Madinah Mahd Al Dhahab Intercity Taxi; Madinah to Mahd Al Dhahab Private Car; Madinah to Mahd Al Dhahab Door-to-Door Transport; Madinah to Mahd Al Dhahab Passenger Transfer; Mahd Al Dhahab to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Mahd Al Dhahab, in either direction, and wants to ask for a fare.
- **SEO title (48 characters):** Madinah to Mahd Al Dhahab Taxi Service | Private
- **Meta description (136 characters):** Madinah to Mahd Al Dhahab taxi service: private rides both ways, return trips, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Mahd Al Dhahab Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Mahd Al Dhahab to Madinah ...) in the "Mahd Al Dhahab to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transfer phrases in natural questions.

### 7. Madinah to Umluj Taxi Service

- **Primary keyword:** Madinah to Umluj Taxi Service
- **Secondary keywords:** Umluj to Madinah Taxi Service; Madinah to Umluj Private Taxi; Umluj to Madinah Private Taxi; Madinah to Umluj Cab Service; Madinah to Umluj Car Service; Madinah to Umluj Taxi Booking; Umluj to Madinah Return Taxi; Madinah Umluj Intercity Taxi; Madinah to Umluj Private Car; Madinah to Umluj Door-to-Door Transport; Madinah to Umluj Tourist Transport; Umluj to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Umluj, in either direction, and wants to ask for a fare.
- **SEO title (45 characters):** Madinah to Umluj Taxi Service | Private Rides
- **Meta description (148 characters):** Madinah to Umluj taxi service: private rides both ways to the Red Sea coast, return trips, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Umluj Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Umluj to Madinah ...) in the "Umluj to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Tourist Transport phrases in natural questions.

### 8. Madinah to Al Wajh Taxi Service

- **Primary keyword:** Madinah to Al Wajh Taxi Service
- **Secondary keywords:** Al Wajh to Madinah Taxi Service; Madinah to Al Wajh Private Taxi; Al Wajh to Madinah Private Taxi; Madinah to Al Wajh Cab Service; Madinah to Al Wajh Car Service; Madinah to Al Wajh Taxi Booking; Al Wajh to Madinah Return Taxi; Madinah Al Wajh Intercity Taxi; Madinah to Al Wajh Private Car; Madinah to Al Wajh Door-to-Door Transport; Madinah to Al Wajh Passenger Transport; Al Wajh to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Al Wajh, in either direction, and wants to ask for a fare.
- **SEO title (47 characters):** Madinah to Al Wajh Taxi Service | Private Rides
- **Meta description (143 characters):** Madinah to Al Wajh taxi service: private long-distance rides both ways, return trips, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Al Wajh Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Al Wajh to Madinah ...) in the "Al Wajh to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transport phrases in natural questions.

### 9. Madinah to Al Ais Taxi Service

- **Primary keyword:** Madinah to Al Ais Taxi Service
- **Secondary keywords:** Al Ais to Madinah Taxi Service; Madinah to Al Ais Private Taxi; Al Ais to Madinah Private Taxi; Madinah to Al Ais Cab Service; Madinah to Al Ais Car Service; Madinah to Al Ais Taxi Booking; Al Ais to Madinah Return Taxi; Madinah Al Ais Intercity Taxi; Madinah to Al Ais Private Car; Madinah to Al Ais Door-to-Door Transport; Madinah to Al Ais Passenger Transfer; Al Ais to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Al Ais, in either direction, and wants to ask for a fare.
- **SEO title (46 characters):** Madinah to Al Ais Taxi Service | Private Rides
- **Meta description (150 characters):** Madinah to Al Ais taxi service: private rides both ways to the north-west of Madinah Region, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Al Ais Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Al Ais to Madinah ...) in the "Al Ais to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transfer phrases in natural questions.

### 10. Madinah to Yanbu Al Bahr Taxi Service

- **Primary keyword:** Madinah to Yanbu Al Bahr Taxi Service
- **Secondary keywords:** Yanbu Al Bahr to Madinah Taxi Service; Madinah to Yanbu Al Bahr Private Taxi; Yanbu Al Bahr to Madinah Private Taxi; Madinah to Yanbu Al Bahr Cab Service; Madinah to Yanbu Al Bahr Car Service; Madinah to Yanbu Al Bahr Taxi Booking; Yanbu Al Bahr to Madinah Return Taxi; Madinah Yanbu Al Bahr Intercity Taxi; Madinah to Yanbu Al Bahr Private Car; Madinah to Yanbu Al Bahr Door-to-Door Transport; Madinah to Yanbu Al Bahr Passenger Transfer; Yanbu Al Bahr to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Yanbu Al Bahr, in either direction, and wants to ask for a fare.
- **SEO title (47 characters):** Madinah to Yanbu Al Bahr Taxi Service | Private
- **Meta description (154 characters):** Madinah to Yanbu Al Bahr taxi service: private rides both ways to the Yanbu coast, return trips, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Yanbu Al Bahr Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Yanbu Al Bahr to Madinah ...) in the "Yanbu Al Bahr to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transfer phrases in natural questions.

### 11. Madinah to Yanbu Al Nakhl Taxi Service

- **Primary keyword:** Madinah to Yanbu Al Nakhl Taxi Service
- **Secondary keywords:** Yanbu Al Nakhl to Madinah Taxi Service; Madinah to Yanbu Al Nakhl Private Taxi; Yanbu Al Nakhl to Madinah Private Taxi; Madinah to Yanbu Al Nakhl Cab Service; Madinah to Yanbu Al Nakhl Car Service; Madinah to Yanbu Al Nakhl Taxi Booking; Yanbu Al Nakhl to Madinah Return Taxi; Madinah Yanbu Al Nakhl Intercity Taxi; Madinah to Yanbu Al Nakhl Private Car; Madinah to Yanbu Al Nakhl Door-to-Door Transport; Madinah to Yanbu Al Nakhl Passenger Transport; Yanbu Al Nakhl to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Yanbu Al Nakhl, in either direction, and wants to ask for a fare.
- **SEO title (48 characters):** Madinah to Yanbu Al Nakhl Taxi Service | Private
- **Meta description (151 characters):** Madinah to Yanbu Al Nakhl taxi service: private rides both ways to the palm oasis town, return trips, fare confirmed first. Send your trip on WhatsApp.
- **H1:** Madinah to Yanbu Al Nakhl Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Yanbu Al Nakhl to Madinah ...) in the "Yanbu Al Nakhl to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transport phrases in natural questions.

### 12. Madinah to Wadi Al-Fara Taxi Service

- **Primary keyword:** Madinah to Wadi Al-Fara Taxi Service
- **Secondary keywords:** Wadi Al-Fara to Madinah Taxi Service; Madinah to Wadi Al-Fara Private Taxi; Wadi Al-Fara to Madinah Private Taxi; Madinah to Wadi Al-Fara Cab Service; Madinah to Wadi Al-Fara Car Service; Madinah to Wadi Al-Fara Taxi Booking; Wadi Al-Fara to Madinah Return Taxi; Madinah Wadi Al-Fara Intercity Taxi; Madinah to Wadi Al-Fara Private Car; Madinah to Wadi Al-Fara Door-to-Door Transport; Madinah to Wadi Al-Fara Passenger Transfer; Wadi Al-Fara to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Wadi Al-Fara, in either direction, and wants to ask for a fare.
- **SEO title (46 characters):** Madinah to Wadi Al-Fara Taxi Service | Private
- **Meta description (153 characters):** Madinah to Wadi Al-Fara taxi service: private rides both ways on the Makkah road, return trips, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Wadi Al-Fara Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Wadi Al-Fara to Madinah ...) in the "Wadi Al-Fara to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transfer phrases in natural questions.

### 13. Madinah to Sulaylah Juhainah Taxi Service

- **Primary keyword:** Madinah to Sulaylah Juhainah Taxi Service
- **Secondary keywords:** Sulaylah Juhainah to Madinah Taxi Service; Madinah to Sulaylah Juhainah Private Taxi; Sulaylah Juhainah to Madinah Private Taxi; Madinah to Sulaylah Juhainah Cab Service; Madinah to Sulaylah Juhainah Car Service; Madinah to Sulaylah Juhainah Taxi Booking; Sulaylah Juhainah to Madinah Return Taxi; Madinah Sulaylah Juhainah Intercity Taxi; Madinah to Sulaylah Juhainah Private Car; Madinah to Sulaylah Juhainah Door-to-Door Transport; Madinah to Sulaylah Juhainah Passenger Transfer; Sulaylah Juhainah to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Sulaylah Juhainah, in either direction, and wants to ask for a fare.
- **SEO title (51 characters):** Madinah to Sulaylah Juhainah Taxi Service | Private
- **Meta description (139 characters):** Madinah to Sulaylah Juhainah taxi service: private rides both ways, return trips, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Sulaylah Juhainah Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Sulaylah Juhainah to Madinah ...) in the "Sulaylah Juhainah to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transfer phrases in natural questions.

### 14. Madinah to Faqrah Taxi Service

- **Primary keyword:** Madinah to Faqrah Taxi Service
- **Secondary keywords:** Faqrah to Madinah Taxi Service; Madinah to Faqrah Private Taxi; Faqrah to Madinah Private Taxi; Madinah to Faqrah Cab Service; Madinah to Faqrah Car Service; Madinah to Faqrah Taxi Booking; Faqrah to Madinah Return Taxi; Madinah Faqrah Intercity Taxi; Madinah to Faqrah Private Car; Madinah to Faqrah Door-to-Door Transport; Madinah to Faqrah Passenger Transfer; Faqrah to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Faqrah, in either direction, and wants to ask for a fare.
- **SEO title (46 characters):** Madinah to Faqrah Taxi Service | Private Rides
- **Meta description (150 characters):** Madinah to Faqrah taxi service: private rides both ways on the road to Badr and Yanbu, return trips, fare confirmed first. Send your trip on WhatsApp.
- **H1:** Madinah to Faqrah Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Faqrah to Madinah ...) in the "Faqrah to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transfer phrases in natural questions.

### 15. Madinah to Al Nabhaniyah Taxi Service

- **Primary keyword:** Madinah to Al Nabhaniyah Taxi Service
- **Secondary keywords:** Al Nabhaniyah to Madinah Taxi Service; Madinah to Al Nabhaniyah Private Taxi; Al Nabhaniyah to Madinah Private Taxi; Madinah to Al Nabhaniyah Cab Service; Madinah to Al Nabhaniyah Car Service; Madinah to Al Nabhaniyah Taxi Booking; Al Nabhaniyah to Madinah Return Taxi; Madinah Al Nabhaniyah Intercity Taxi; Madinah to Al Nabhaniyah Private Car; Madinah to Al Nabhaniyah Door-to-Door Transport; Madinah to Al Nabhaniyah Passenger Transport; Al Nabhaniyah to Madinah Car Booking
- **Search intent:** transactional and local. Someone who wants a private car with a driver between Madinah and Al Nabhaniyah, in either direction, and wants to ask for a fare.
- **SEO title (47 characters):** Madinah to Al Nabhaniyah Taxi Service | Private
- **Meta description (152 characters):** Madinah to Al Nabhaniyah taxi service: private long-distance rides both ways to Qassim Region, fare confirmed first. Send your trip on WhatsApp to book.
- **H1:** Madinah to Al Nabhaniyah Taxi Service
- **Keyword-to-section mapping:** primary keyword in title, H1 and lead; reverse-direction keywords (Al Nabhaniyah to Madinah ...) in the "Al Nabhaniyah to Madinah" section and the direction buttons; the three keyword FAQs carry the private taxi, cab service, car service, private car, booking, return taxi, intercity, door-to-door and Passenger Transport phrases in natural questions.

## C. Destination research

Sources: Nominatim (OpenStreetMap) for identity and administrative area, OpenStreetMap routing (OSRM) for road distance, time and road references from the Madinah centre (24.4672, 39.6111), and the Overpass API for named places near each centre. No Google Maps, official government gazetteer or on-the-ground verification was used.

| Destination | Verified name / Arabic | Region | Type | Coordinates used | Nearby places used |
|---|---|---|---|---|---|
| Yanbu | Yanbu / ينبع | Madinah Region | City on the Red Sea coast (Yanbu Governorate) | 24.089, 38.0687 | Yanbu Historic Area, Yanbu Waterfront Beach Park, Yanbu General Hospital |
| Al Ula | Al Ula / العلا | Madinah Region | Town (Al Ula Governorate) | 26.5589, 37.9597 | Al Ula Old Town, Dadan, Al Ula Railway Station |
| Badr | Badr / بدر | Madinah Region | Town, seat of Badr Governorate | 23.78, 38.7907 | Battle of Badr site, Badr Martyrs' Cemetery, Al-Arish Mosque |
| Khaybar | Khaybar / خيبر | Madinah Region | Town, seat of Khaybar Governorate | 25.7025, 39.2933 | Khaybar Public Park, Qamus Fort, Al Watih Fort |
| Al Hanakiyah | Al Hanakiyah / الحناكية | Madinah Region | Town, seat of Al Hanakiyah Governorate | 24.8797, 40.5153 | Al Mohaffar, Madisis, Qusayba dam ruins |
| Mahd Al Dhahab | Mahd Al Dhahab / مهد الذهب | Madinah Region | Town, seat of Al Mahd Governorate | 23.4996, 40.8792 | Al Mahd General Hospital, As Samir, Ash Shifa |
| Umluj | Umluj / أملج | Tabuk Region | Coastal town, seat of Umluj Governorate | 25.0303, 37.2622 | Umluj General Hospital, Alhawraa Hospital, Prince Park |
| Al Wajh | Al Wajh / الوجه | Tabuk Region | Coastal city, seat of Al Wajh Governorate | 26.2444, 36.4532 | Al Wajh Castle, Al Wajh General Hospital, Sharm Al Wajh |
| Al Ais | Al Ais / العيص | Madinah Region | Town, seat of Al Ais Governorate | 25.0636, 38.1085 | Al Ayn, Technical College branch in Al Ais, Park in Al Ais |
| Yanbu Al Bahr | Yanbu Al Bahr / ينبع البحر | Madinah Region | Coastal suburb of Yanbu | 24.1061, 38.0653 | Yanbu Historic Area, Shells Monument, Fish in a Basket |
| Yanbu Al Nakhl | Yanbu Al Nakhl / ينبع النخل | Madinah Region | Inland town in Yanbu Governorate | 24.328, 38.4286 | Yanbu Al Nakhl Hospital, Suq Suwayq, Nujayl |
| Wadi Al-Fara | Wadi Al-Fara / وادي الفرع | Madinah Region | Governorate and valley (no town centre mapped) | 23.3767, 39.632 | Ash Shahba, Al Madiq, Al Basirah |
| Sulaylah Juhainah | Sulaylah Juhainah / سليلة جهينة | Madinah Region | Village in Al Ais Governorate | 25.5347, 38.4055 | As Salilah, As Salilah Primary Health Care, Az Zubayir |
| Faqrah | Faqrah / الفقرة | Madinah Region | Village | 24.3505, 38.9444 | Mith'ar (مثعر), As Sudayrah (السديرة), Al Abraqayn (الأبرقين) |
| Al Nabhaniyah | Al Nabhaniyah / النبهانية | Qassim Region | Town, seat of An Nabhaniyah Governorate | 25.8609, 43.0664 | Al Nabhaniyah General Hospital, Prince Faisal bin Bandar Park, College of Science and Arts in Al Nabhaniyah |

Notes on the destinations you asked me to check:

- **Al Nabhaniyah** is in Qassim Region (Nominatim: Al-Qassim Province), as suspected. The page says so and the road leaves Madinah Region on Route 65.
- **Umluj and Al Wajh** are in Tabuk Region, not Madinah Region.
- **Sulaylah Juhainah** is a village (OpenStreetMap: village, سليلة جهينة) in Al Ais Governorate, Madinah Region, about 10 km from the town of As Salilah. It is not a governorate seat.
- **Faqrah** is a village (الفقرة) west of Madinah; Nominatim lists it under Al Madinah Al Munawwarah. A mountain called Jabal Al Faqrah near Badr has a similar name, and the page tells readers to say which they mean.
- **Wadi Al-Fara** is mapped as a governorate and a valley, not as a town. The distance is measured to the governorate centre point (23.3767, 39.632), and the page asks for a village name or a pin. Other places have similar names (a valley called Wadi Al Fur' near Madinah, and a hamlet called Al Fara' near Al Ais), which the page warns about.
- **Yanbu Al Nakhl** is an inland town in Yanbu Governorate, not the coast. **Yanbu Al Bahr** is a coastal suburb of Yanbu.
- **Al Ais** is the town of Al Ais (العيص), seat of Al Ais Governorate, Madinah Region.

## D. Route information

| Route | Distance (OSRM) | Light-traffic time | Roads (from routing steps) | Alternative route | Uncertainty |
|---|---|---|---|---|---|
| Madinah to Yanbu | 239.2 km | 168 min | Hijra Road (Makkah to Madinah road) 12 km, Route 60 159 km, Route 5 60 km | none returned | Endpoint is the OSM town point |
| Madinah to Al Ula | 333.8 km | 299 min | Sultana Road 4 km, Route 15 (Khalid bin Walid / Madinah to Tabuk road) about 54 km, a local road 180 km, Route 328 76 km, Route 375 11 km | none returned | Endpoint is the OSM town point |
| Madinah to Badr | 151.5 km | 108 min | Hijra Road 12 km, Route 60 126 km, local road 6 km | none returned | Endpoint is the OSM town point |
| Madinah to Khaybar | 175 km | 123 min | Sultana Road 4 km, Route 15 (Madinah to Tabuk road) 164 km | none returned | Endpoint is the OSM town point |
| Madinah to Al Hanakiyah | 118.4 km | 73 min | Hijra Road 8 km, Route 65 (Qassim to Madinah road) 97 km, local road 6 km | none returned | Endpoint is the OSM town point |
| Madinah to Mahd Al Dhahab | 192.9 km | 210 min | Hijra Road 6 km, King Khalid Road (third ring road) 5 km, Madinah to Mahd Al Dhahab road 173 km | 266 km (Hijra Road, Route 15 and a local road), 230 min | Time looks long for the distance; local road speeds are uncertain |
| Madinah to Umluj | 386.8 km | 268 min | Hijra Road 12 km, Route 60 159 km, Route 5, Yanbu bypass road 43 km, Umluj to Jeddah expressway 21 km, Route 5 127 km | 322 km via Route 15 and Route 328, 300 min (slower) | Shorter route exists but is slower |
| Madinah to Al Wajh | 555.5 km | 389 min | Hijra Road 12 km, Route 60 159 km, Route 5, Yanbu bypass road 43 km, Umluj to Jeddah expressway 21 km, Route 5 and King Faisal Road about 300 km | 423 km via Route 15, a local road and Route 5, 409 min (slower) | Shorter route exists but is slower |
| Madinah to Al Ais | 222.3 km | 207 min | Sultana Road 4 km, Route 15 (Madinah to Tabuk road) about 54 km, local road 140 km, Route 328 5 km, local road 11 km | none returned | Endpoint is the OSM town point |
| Madinah to Yanbu Al Bahr | 240.6 km | 170 min | Hijra Road 12 km, Route 60 159 km, Route 5 60 km, local road 2 km | none returned | Same road as Yanbu; endpoint 2 km further |
| Madinah to Yanbu Al Nakhl | 163.3 km | 163 min | Hijra Road 12 km, Route 60 29 km, local road 115 km | none returned | Endpoint is the OSM town point |
| Madinah to Wadi Al-Fara | 161.4 km | 131 min | Hijra Road about 120 km, local roads about 33 km | none returned | Measured to a governorate centre point, not a town |
| Madinah to Sulaylah Juhainah | 189.2 km | 171 min | Sultana Road 4 km, Route 15 (Madinah to Tabuk road) about 54 km, local road 124 km | none returned | Endpoint is the OSM town point |
| Madinah to Faqrah | 90.1 km | 83 min | Hijra Road 12 km, Route 60 29 km, local road 42 km | none returned | Endpoint is the OSM town point |
| Madinah to Al Nabhaniyah | 395.5 km | 221 min | Hijra Road 8 km, Route 65 (Qassim to Madinah road) 370 km, King Abdulaziz Road (Route 414) 10 km | none returned | Endpoint is the OSM town point |

Measurement endpoints: the Madinah centre (the Prophet's Mosque area, 24.4672, 39.6111) and the town or governorate point listed in section C. Straight-line distance was not used. Road references (Route 5, 15, 60, 65, 328, 375, 414) come from the routing data as returned and were not independently confirmed from road signs. Where a step had no reference, the page says "a local road".

## E. Driving directions

| Route | Words | Paragraphs |
|---|---|---|
| Madinah to Yanbu | 100 | 1 |
| Madinah to Al Ula | 100 | 1 |
| Madinah to Badr | 100 | 1 |
| Madinah to Khaybar | 100 | 1 |
| Madinah to Al Hanakiyah | 100 | 1 |
| Madinah to Mahd Al Dhahab | 100 | 1 |
| Madinah to Umluj | 100 | 1 |
| Madinah to Al Wajh | 100 | 1 |
| Madinah to Al Ais | 100 | 1 |
| Madinah to Yanbu Al Bahr | 100 | 1 |
| Madinah to Yanbu Al Nakhl | 100 | 1 |
| Madinah to Wadi Al-Fara | 100 | 1 |
| Madinah to Sulaylah Juhainah | 100 | 1 |
| Madinah to Faqrah | 100 | 1 |
| Madinah to Al Nabhaniyah | 100 | 1 |

The count is done in the build: a page does not build unless the directions have exactly 100 words, and the built pages were counted again from the HTML.

## F. Google Maps links

| Route | Links | Unique | Verification |
|---|---|---|---|
| Madinah to Yanbu | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Al Ula | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Badr | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Khaybar | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Al Hanakiyah | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Mahd Al Dhahab | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Umluj | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Al Wajh | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Al Ais | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Yanbu Al Bahr | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Yanbu Al Nakhl | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Wadi Al-Fara | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Sulaylah Juhainah | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Faqrah | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |
| Madinah to Al Nabhaniyah | 25 | 25 | Names taken from OpenStreetMap or the page set; not opened one by one in Google Maps |

Every link uses https://www.google.com/maps/search/?api=1&query=... with the place, the area and Saudi Arabia, URL-encoded. Madinah neighbourhoods carry "Madinah", other Saudi cities carry only their own name and the country. Many OpenStreetMap names near small villages exist only in Arabic, so those links use the Arabic name and a local area; they could not be checked in Google Maps from here, and Google may return a different match for a very small village. All 25 links on each page were checked as unique in labels and queries and as valid URLs, but 375 searches were not opened.

## G. Weather

Each page shows a live Madinah and destination strip (the existing weather component: Open-Meteo, Asia/Riyadh timezone, no API key), using these coordinates:

| Page | Destination coordinates | Madinah coordinates |
|---|---|---|
| Yanbu | 24.089, 38.0687 | 24.5247, 39.5692 |
| Al Ula | 26.5589, 37.9597 | 24.5247, 39.5692 |
| Badr | 23.78, 38.7907 | 24.5247, 39.5692 |
| Khaybar | 25.7025, 39.2933 | 24.5247, 39.5692 |
| Al Hanakiyah | 24.8797, 40.5153 | 24.5247, 39.5692 |
| Mahd Al Dhahab | 23.4996, 40.8792 | 24.5247, 39.5692 |
| Umluj | 25.0303, 37.2622 | 24.5247, 39.5692 |
| Al Wajh | 26.2444, 36.4532 | 24.5247, 39.5692 |
| Al Ais | 25.0636, 38.1085 | 24.5247, 39.5692 |
| Yanbu Al Bahr | 24.1061, 38.0653 | 24.5247, 39.5692 |
| Yanbu Al Nakhl | 24.328, 38.4286 | 24.5247, 39.5692 |
| Wadi Al-Fara | 23.3767, 39.632 | 24.5247, 39.5692 |
| Sulaylah Juhainah | 25.5347, 38.4055 | 24.5247, 39.5692 |
| Faqrah | 24.3505, 38.9444 | 24.5247, 39.5692 |
| Al Nabhaniyah | 25.8609, 43.0664 | 24.5247, 39.5692 |

Live temperatures appeared on all 15 pages in the browser test (after scrolling to the section, because it loads when visible). Loading, error and unavailable states come from the existing component and were not forced in this test. The Madinah point is the city's coordinates in the site's geography file; it is not the same as the routing endpoint, which is the Prophet's Mosque area.

## H. UI/UX

The pages use the existing town-route layout and the site theme without changes: compact booking form in the hero (first on phones), facts strip, direction-focused intro, outbound and return sections, pickup and drop-off cards, real places, how-to-book steps, FAQ, directions, 25 Maps links, weather, final form and WhatsApp CTA. Six hero and body styles rotate by page position. Pages differ in text, facts, places and links, not in colour.

## I. Booking and WhatsApp

Hero and bottom forms: two forms per page (checked), the mobile form directly after the header and before the H1 (form top about 317 px, H1 about 868 to 900 px at 390 px width). WhatsApp buttons send a route-specific message in each direction using the central number. The forms submit into the site's /book flow; a live submission was not performed.

## J. Images

Four placeholders per page, reserved at fixed aspect ratios (no layout shift), labelled as images to be supplied. Folder per page: public/images/routes/madinah-to-<place>/ with hero, highway, madinah and destination files (WebP). Suggested filenames, for example: madinah-to-yanbu/hero.webp, highway.webp, madinah.webp, destination.webp.

## K. Internal linking

Each page links to 3 or 4 related Madinah route pages and an existing route (Makkah to Madinah or Riyadh to Madinah), the Madinah Region page, the Madinah airport, the Umrah and Hajj taxi page, taxi and cab services and passenger transport. The Madinah Region page, the Madinah city page, the routes index and (for Yanbu) the Yanbu city page link back.

## L. Technical SEO

Canonical, Open Graph, one H1, breadcrumbs and BreadcrumbList and FAQPage structured data are produced by the page generator and were checked in the built HTML for all 15 pages. Titles are 48 to 60 characters and unique; descriptions are 136 to 155 characters and unique. The primary keyword is in the title, H1 and lead. No ratings, reviews, fares or fleet claims were added. Lighthouse, Rich Results Test and a real phone were not run.

## M. Changed files

- src/content/saudi/madinah-routes/ (new): shared.ts (Maps helpers), keywords.ts (12 secondary keywords and three keyword FAQs per page), specs-1.ts to specs-5.ts (the 15 pages), specs.ts (the list).
- src/content/saudi/build.ts: imports the Madinah set, a Madinah origin, rebuilds madinah-to-yanbu from its spec, adds the pages to the routes index, the Madinah city page and a new towns section on the Madinah Region page.
- src/content/saudi/town-routes/factory.ts: the link block chooses the origin region name instead of a fixed Makkah wording (Riyadh and Makkah output unchanged).
- src/content/saudi/places.ts: Madinah to Yanbu distance 220 km corrected to 239 km.
- docs/page-tracker.csv: regenerated.
- docs/madinah-routes-implementation-report.md: this report.

## N. Testing

- Source guards (script mirroring the build guards): 15/15 pass. Directions exactly 100 words, exactly 25 unique Maps links, titles at most 60 characters, descriptions at most 158 characters, WhatsApp wording, no call wording, FAQs, related links exist, all 12 secondary keywords present in the page text.
- `npm run build`: passes.
- Built-page checks (script on out/): 15/15. Unique titles, descriptions and H1, canonical, Open Graph, one H1, directions 100 words in one paragraph, 25 map links, two forms, two Continue Booking buttons, no tel: link, WhatsApp link, order directions then maps then weather, JSON-LD (BreadcrumbList and FAQPage), heading order, no broken internal links, no image without alt text.
- Browser (headless Edge over the DevTools protocol), 15 pages at 390, 820 and 1366 px, 45 checks: no horizontal overflow, no console errors, two forms per page, mobile form directly under the header and before the H1, hero form about 323 px tall. The weather check initially failed on 2 pages because the strip loads when scrolled into view; the scroll-then-wait test passed 15/15.
- Screenshots of Madinah to Al Nabhaniyah (desktop) and Madinah to Al Wajh (mobile) were reviewed.
- Not run: a live form submission, Lighthouse, Rich Results Test, a real phone, opening the 375 Maps links, a check against Google Maps for distances.

## Items that need your input

1. **Photos** for the placeholders (hero, highway, madinah, destination per page).
2. **Which places you really serve.** Faqrah, Sulaylah Juhainah, Wadi Al-Fara and Al Ais are small and remote; Al Wajh and Al Nabhaniyah are 400 to 556 km. The pages promise only that a request is confirmed first, but please confirm they are real offers.
3. **Yanbu, Yanbu Al Bahr and Yanbu Al Nakhl** may compete for similar searches. Yanbu and Yanbu Al Bahr share one road and one city; consider merging Yanbu Al Bahr into the Yanbu page if rankings overlap.
4. **Distances and Maps links** come from OpenStreetMap routing and OpenStreetMap names; a spot check against Google Maps is recommended, especially for Mahd Al Dhahab (the time looks long), Wadi Al-Fara (no town centre) and the villages with Arabic-only names.
5. **The existing Madinah to Yanbu page** was replaced by the upgraded version at the same URL, as with Makkah to Taif.
