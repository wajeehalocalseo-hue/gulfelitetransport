import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Same mark as src/components/Logo.tsx.
export default function Icon() {
  return new ImageResponse(
    (
      <svg width="64" height="64" viewBox="0 0 64 64">
        <path d="M32 3L57.1 17.5V46.5L32 61L6.9 46.5V17.5Z" fill="#101c2c" stroke="#f5a623" strokeWidth="3.4" strokeLinejoin="round" />
        <path d="M41.5 23.5A13 13 0 1 0 45 32H33" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M48.5 26l6 6-6 6" fill="none" stroke="#f5a623" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    size,
  );
}