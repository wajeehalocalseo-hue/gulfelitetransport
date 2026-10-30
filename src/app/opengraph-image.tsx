import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} - Freight, Cargo & Passenger Transport`;

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
        <div style={{ fontSize: 84, fontWeight: 800, color: "#f5a623" }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 24 }}>
          Freight, Cargo & Passenger Transport
        </div>
      </div>
    ),
    size,
  );
}
