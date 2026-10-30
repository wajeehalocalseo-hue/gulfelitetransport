import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// TODO: replace with the real logo when available.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101c2c",
          color: "#f5a623",
          fontSize: 34,
          fontWeight: 800,
          borderRadius: 12,
        }}
      >
        GE
      </div>
    ),
    size,
  );
}
