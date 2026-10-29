import { ImageResponse } from "next/og";

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
          background: "#0b3d6b",
          color: "#c9a24b",
          fontSize: 36,
          fontWeight: 700,
          borderRadius: 12,
        }}
      >
        GE
      </div>
    ),
    size,
  );
}
