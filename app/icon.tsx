import { ImageResponse } from "next/og";

// Programmatic favicon — brand amber crescent on bark background.
// Renders at the standard 32×32 favicon size.

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "50%",
          position: "relative",
        }}
      >
        {/* Crescent — amber arc, suggests both moon and the brand mark */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#EC9247",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 1,
            left: 8,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#331D01",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
