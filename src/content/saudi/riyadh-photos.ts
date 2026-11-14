/** Licensed photos of Riyadh places (Wikimedia Commons), each credited to its author with a licence link. */
export type Photo = { src: string; w: number; h: number; alt: string; caption: string; author: string; license: string; licenseUrl: string; source: string };

const BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0";
const BY_2 = "https://creativecommons.org/licenses/by/2.0";

export const photos = {
  skyline: { src: "/images/riyadh/riyadh-skyline.jpg", w: 1200, h: 675, alt: "Riyadh skyline with Kingdom Centre and the city's towers", caption: "Riyadh skyline", author: "B.alotaby", license: "CC BY-SA 4.0", licenseUrl: BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Riyadh_Skyline.jpg" },
  kafd: { src: "/images/riyadh/kafd.jpg", w: 1200, h: 800, alt: "King Abdullah Financial District towers seen from the north-east of Riyadh", caption: "King Abdullah Financial District (KAFD)", author: "B.alotaby", license: "CC BY-SA 4.0", licenseUrl: BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:KAFD_seen_from_North_east_side_of_Riyadh_City.jpg" },
  kingdomCentre: { src: "/images/riyadh/kingdom-centre.jpg", w: 1200, h: 1622, alt: "Kingdom Centre Tower on Olaya Street in Riyadh", caption: "Kingdom Centre, Olaya", author: "Hamza A. Durrani", license: "CC BY-SA 4.0", licenseUrl: BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Kingdom_Centre_Riyadh_2024.jpeg" },
  atTuraif: { src: "/images/riyadh/at-turaif-diriyah.jpg", w: 1200, h: 900, alt: "Mud-brick buildings of the At-Turaif district in Diriyah", caption: "At-Turaif, Diriyah", author: "Radosław Botev", license: "CC BY 3.0 PL", licenseUrl: "https://creativecommons.org/licenses/by/3.0/pl/deed.en", source: "https://commons.wikimedia.org/wiki/File:At-Turaif_District_in_ad-Dir%27iyah_(2).jpg" },
  masmak: { src: "/images/riyadh/masmak-fort.jpg", w: 1200, h: 798, alt: "Masmak Fort in the old city of Riyadh", caption: "Masmak Fort, Ad Dirah", author: "Francisco Anzola", license: "CC BY 2.0", licenseUrl: BY_2, source: "https://commons.wikimedia.org/wiki/File:Masmak_Fort_(12753717253).jpg" },
  boulevard: { src: "/images/riyadh/boulevard-riyadh.jpg", w: 1200, h: 1200, alt: "The square zone of Riyadh Boulevard with restaurants and lights", caption: "Boulevard Riyadh City", author: "Derivator2017", license: "CC BY-SA 4.0", licenseUrl: BY_SA_4 + "/", source: "https://commons.wikimedia.org/wiki/File:Riyadh_boulevard_square_zone.jpg" },
  nationalMuseum: { src: "/images/riyadh/national-museum.jpg", w: 1200, h: 800, alt: "National Museum of Saudi Arabia in Al Murabba, Riyadh", caption: "National Museum, Al Murabba", author: "Sammy Six", license: "CC BY 2.0", licenseUrl: BY_2, source: "https://commons.wikimedia.org/wiki/File:National_Museum_Riyadh_(6781666263).jpg" },
  airport: { src: "/images/riyadh/riyadh-airport.jpg", w: 1200, h: 900, alt: "Domestic departures hall at King Khalid International Airport in Riyadh", caption: "King Khalid International Airport (RUH)", author: "Kskhh", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Domestic_Departures_Riyadh_Airport.jpg" },
  metro: { src: "/images/riyadh/riyadh-metro.jpg", w: 1200, h: 800, alt: "A Riyadh Metro train in the city", caption: "Riyadh Metro", author: "Saudi Press Agency (SPA)", license: "CC BY-SA 4.0", licenseUrl: BY_SA_4, source: "https://commons.wikimedia.org/wiki/File:Riyadh_Metro_(2024).jpg" },
} satisfies Record<string, Photo>;

/** The district a photo belongs to, where there is a real photo of that place. */
export const districtPhoto: Record<string, Photo> = {
  olaya: photos.kingdomCentre,
  "king-abdullah-financial-district": photos.kafd,
  diriyah: photos.atTuraif,
  "ad-dirah": photos.masmak,
  "al-murabba": photos.nationalMuseum,
};
