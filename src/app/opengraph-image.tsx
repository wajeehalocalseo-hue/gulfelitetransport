import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} - Taxi, Freight & Passenger Transport in Saudi Arabia`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#101c2c",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="150" height="150" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="12" fill="#f5a623" />
            <path d="M32.5 13.5A12 12 0 1 0 36 22H25" fill="none" stroke="#101c2c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 40h6M22 40h6M32 40h4" stroke="#101c2c" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 36 }}>
            <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: 6 }}>GULF ELITE</div>
            <div style={{ fontSize: 34, fontWeight: 700, color: "#f5a623", letterSpacing: 14, marginTop: 6 }}>TRANSPORT</div>
          </div>
        </div>
        <div style={{ fontSize: 42, marginTop: 56, color: "rgba(255,255,255,0.88)" }}>
          Taxi, Freight & Passenger Transport in Saudi Arabia
        </div>
      </div>
    ),
    size,
  );
}
