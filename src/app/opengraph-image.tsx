import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

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
          background: "#0b3d6b",
          color: "white",
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 700, color: "#c9a24b" }}>
          {site.name}
        </div>
        <div style={{ fontSize: 40, marginTop: 24 }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
