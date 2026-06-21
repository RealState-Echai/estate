import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Apple touch icon, rendered to PNG at build time.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#16140f",
          color: "#faf8f5",
          fontSize: 104,
          fontWeight: 700,
          fontFamily: "serif",
        }}
      >
        E<span style={{ color: "#b8893b" }}>.</span>
      </div>
    ),
    { ...size },
  );
}
