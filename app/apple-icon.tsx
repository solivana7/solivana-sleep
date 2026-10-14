import { ImageResponse } from "next/og";

// iOS home-screen icon — 180×180 with the same crescent treatment as
// the favicon, scaled up.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#331D01",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            width: 124,
            height: 124,
            borderRadius: "50%",
            background: "#EC9247",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 50,
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "#331D01",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
