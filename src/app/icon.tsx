import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

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
          background: "#0a0e17",
          borderRadius: 6,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#00d4ff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}