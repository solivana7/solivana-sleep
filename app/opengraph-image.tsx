import { ImageResponse } from "next/og";

// Programmatic OG image — 1200×630 social card.
// Uses the same brand palette as the site; renders at request time on
// the server. No external font fetches (system stack only) so the build
// is hermetic.

export const alt = "SoliVana Sleep — Stop tracking bad sleep. Start fixing it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F6F1EC",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#786455",
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <div style={{ width: 36, height: 36, position: "relative", display: "flex" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "#EC9247",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -4,
                left: 6,
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "#F6F1EC",
              }}
            />
          </div>
          SoliVana Sleep
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            color: "#331D01",
          }}
        >
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            Stop tracking bad sleep.
          </div>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 300,
              letterSpacing: "-0.01em",
              fontStyle: "italic",
              color: "#EC9247",
            }}
          >
            Start fixing it.
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #EC9247",
            paddingTop: 24,
            color: "#786455",
            fontSize: 22,
            letterSpacing: "0.06em",
          }}
        >
          <div>CBT-I · Real-time audio · Circadian recovery</div>
          <div style={{ fontWeight: 500 }}>sleep.solivana.io</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
