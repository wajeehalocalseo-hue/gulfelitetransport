import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import ThirdPartyScripts from "@/components/ThirdPartyScripts";
import { site } from "@/lib/site";
import { baseGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteChrome from "@/components/SiteChrome";
import StickyCta from "@/components/StickyCta";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PromoBar from "@/components/PromoBar";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import TranslateLoader from "@/components/TranslateLoader";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0e3b2c",
};

const defaultTitle = "Gulf Elite Transport | Taxi, Cab & Freight in Saudi Arabia";
const defaultDescription =
  "Book taxi and cab rides in Saudi cities, airport transfers and intercity trips, or arrange freight and fleet services. Fare confirmed before you commit.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "E22uAF4yShQUOkUXE5-RynF_Nj7NR5CFiTbtotX_jm0",
    other: { "msvalidate.01": "D7FCDD3CA769F65AC026CAE8FD46EDEF" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <JsonLd data={baseGraph} />
        <TranslateLoader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        <SiteChrome>
          <PromoBar />
          <SiteHeader />
        </SiteChrome>
        {children}
        <SiteChrome>
          <SiteFooter />
          <StickyCta />
          <FloatingWhatsApp />
        </SiteChrome>
        <SiteChrome>
        <AnalyticsEvents />
        <ThirdPartyScripts />
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M6NX327S" height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
        </noscript>
        </SiteChrome>
      </body>
    </html>
  );
}
