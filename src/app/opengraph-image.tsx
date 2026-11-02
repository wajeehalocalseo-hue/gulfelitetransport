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
          <svg width="170" height="170" viewBox="0 0 64 64">
            <path d="M32 3L57.1 17.5V46.5L32 61L6.9 46.5V17.5Z" fill="#101c2c" stroke="#f5a623" strokeWidth="3.4" strokeLinejoin="round" />
            <path d="M41.5 23.5A13 13 0 1 0 45 32H33" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M48.5 26l6 6-6 6" fill="none" stroke="#f5a623" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
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
