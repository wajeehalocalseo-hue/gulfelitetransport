import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Same mark as src/components/Logo.tsx.
export default function Icon() {
  return new ImageResponse(
    (
      <svg width="64" height="64" viewBox="0 0 48 48">
        <rect width="48" height="48" rx="12" fill="#f5a623" />
        <path d="M32.5 13.5A12 12 0 1 0 36 22H25" fill="none" stroke="#101c2c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 40h6M22 40h6M32 40h4" stroke="#101c2c" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
    size,
  );
}
