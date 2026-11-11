import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import { baseGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteChrome from "@/components/SiteChrome";
import StickyCta from "@/components/StickyCta";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#101c2c",
};

const defaultTitle = "Gulf Elite Transport | Taxi, Freight & Passenger Transport in Saudi Arabia";
const defaultDescription =
  "Request taxi and cab rides by Saudi city and route, or arrange freight, cargo, passenger transport, equipment moving and fleet services. Fares are confirmed before you commit.";

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
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={baseGraph} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        <SiteChrome>
          <SiteHeader />
        </SiteChrome>
        {children}
        <SiteChrome>
          <SiteFooter />
          <StickyCta />
        </SiteChrome>
        <SiteChrome>
        <Script id="gtm" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({"gtm.start":new Date().getTime(),event:"gtm.js"});(function(){var s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtm.js?id=GTM-M6NX327S";document.head.appendChild(s);})();`}
        </Script>
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="o2Jqnxe9R1hrIxQNqUHPSQ" strategy="afterInteractive" />
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M6NX327S" height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
        </noscript>
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","zbv8e0hevw");`}
        </Script>
        </SiteChrome>
      </body>
    </html>
  );
}
