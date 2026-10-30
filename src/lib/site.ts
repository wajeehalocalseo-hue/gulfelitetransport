// TODO: every value marked TODO is a placeholder - replace with real business data.
// Sections/fields backed by empty data are hidden automatically (routes, capacities, photos).
export const site = {
  name: "Gulf Elite Transport",
  tagline: "Premium Chauffeur & Airport Transfer Service",
  description:
    "Private airport transfers, intercity taxi and chauffeur services with professional drivers and comfortable vehicles. Share your journey and get a quote on WhatsApp.",
  url: "https://www.example.com", // TODO: real domain
  phone: "+000 00 000 0000", // TODO
  whatsapp: "0000000000", // TODO: digits only, with country code
  email: "info@example.com", // TODO
  // Set to true once phone/email above are real; controls whether they appear in JSON-LD.
  contactVerified: false,

  services: [
    {
      id: "airport-transfers",
      icon: "plane",
      title: "Airport Transfers",
      text: "Private pickup and drop-off between the airport and your hotel, home or office.",
    },
    {
      id: "intercity-transfers",
      icon: "map",
      title: "Intercity Taxi Service",
      text: "Direct private rides between cities, with no shared stops and no changes.",
    },
    {
      id: "chauffeur-services",
      icon: "user",
      title: "Private Chauffeur Service",
      text: "A professional driver at your disposal for meetings, events or a full day out.",
    },
    {
      id: "executive-transportation",
      icon: "briefcase",
      title: "Executive Transportation",
      text: "Discreet, punctual travel for business guests and corporate clients.",
    },
    {
      id: "family-transfers",
      icon: "users",
      title: "Family Transfers",
      text: "Comfortable rides for families and groups, with space for luggage.",
    },
    {
      id: "long-distance-transfers",
      icon: "route",
      title: "Long-Distance Transfers",
      text: "Comfortable private travel for longer journeys, quoted clearly in advance.",
    },
  ],

  benefits: [
    { icon: "user", title: "Professional Chauffeurs", text: "Courteous drivers who know the roads." },
    { icon: "shield", title: "Private Transportation", text: "Your own vehicle, never shared." },
    { icon: "plane", title: "Airport Pickup & Drop-off", text: "Smooth transfers to and from the airport." },
    { icon: "car", title: "Comfortable Vehicles", text: "Clean, well-kept cars for every trip." },
    { icon: "tag", title: "Transparent Pricing", text: "A clear quote before you confirm." },
    { icon: "headset", title: "Customer Support", text: "Reach us by phone or WhatsApp." },
  ],

  // TODO: add real routes, e.g. { from: "City A", to: "City B", text: "...", href: "/..." }
  routes: [] as { from: string; to: string; text: string; href: string }[],

  // TODO: replace with real vehicles. Capacity fields are shown only when provided.
  fleet: [
    { name: "Sedan", category: "Private car for 1-3 guests", passengers: "", luggage: "", features: [] as string[] },
    { name: "SUV", category: "Spacious private vehicle", passengers: "", luggage: "", features: [] as string[] },
    { name: "Van", category: "Group & family transfers", passengers: "", luggage: "", features: [] as string[] },
  ],

  whyUs: [
    "Private and direct transportation",
    "Professional drivers",
    "Comfortable vehicles",
    "Convenient booking by form or WhatsApp",
    "Transparent quotations",
    "Responsive customer assistance",
  ],

  steps: [
    { title: "Share Your Journey", text: "Tell us your pickup, destination, date and passengers." },
    { title: "Receive Your Quote", text: "We reply with availability and a clear price." },
    { title: "Confirm Your Booking", text: "Confirm on WhatsApp and your driver is arranged." },
  ],

  // TODO: confirm these answers match your real policies.
  faqs: [
    {
      q: "How can I book a private taxi?",
      a: "Fill in the booking form or message us on WhatsApp with your pickup, destination, date and time. We confirm availability and send you a quote.",
    },
    {
      q: "Are airport transfers available?",
      a: "Yes. We offer private airport pickup and drop-off. Include your flight details in your enquiry.",
    },
    {
      q: "Can I book a private chauffeur?",
      a: "Yes. Tell us the date, duration and plans, and we will arrange a chauffeur for you.",
    },
    {
      q: "Can I request a specific vehicle?",
      a: "You can state your vehicle preference in the booking form. We will confirm what is available for your date.",
    },
    {
      q: "How can I receive a transportation quotation?",
      a: "Send your journey details through the form or WhatsApp and we will reply with a quotation before you confirm.",
    },
    {
      q: "Are long-distance transfers available?",
      a: "Yes, we can arrange long-distance private transfers. Share your route and we will quote it.",
    },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/#airport-transfers", label: "Airport Transfers" },
  { href: "/#intercity-transfers", label: "Intercity Transfers" },
  { href: "/#chauffeur-services", label: "Chauffeur Services" },
  { href: "/#fleet", label: "Fleet" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telUrl = `tel:${site.phone.replace(/\s/g, "")}`;
