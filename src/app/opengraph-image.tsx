import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TechMathGuide — Maths, Anglais & Tech interconnectés";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: 72 }}>⚡</span>
          <span style={{ fontSize: 64, fontWeight: 700, color: "white" }}>
            Tech<span style={{ color: "#22d3ee" }}>Math</span>Guide
          </span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#cbd5e1",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Comprendre le lien réel entre Maths, Anglais technique et Tech
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "40px",
          }}
        >
          {["🤖 IA", "🛡️ Cyber", "📊 Data", "🦾 Robotique", "🌐 Web"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 20,
                  color: "#22d3ee",
                  border: "1px solid rgba(34,211,238,0.4)",
                  borderRadius: 999,
                  padding: "8px 20px",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}