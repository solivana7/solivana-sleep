import type { Config } from "tailwindcss";

// SoliVana brand truth — locked colors, locked typography
// Per user_solivana_brand: #EC9247 orange (accent only), #331D01 brown,
// #B49F90 warm gray (decorative — fails AA on white), #F0EDED off-white,
// #786455 mid brown (use for body/labels on light surfaces).
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bark: "#331D01",
        amber: "#EC9247",
        mid: "#786455",
        sand: "#B49F90",
        cream: "#F0EDED",
        warm: "#F6F1EC",
        ink: "#1F1208",
      },
      fontFamily: {
        // Brand spec: Jost ALL CAPS for hero/labels; Montserrat for headers + body.
        display: ["var(--font-jost)", "system-ui", "sans-serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      maxWidth: {
        prose: "62ch",
      },
      boxShadow: {
        elevated: "0 24px 64px rgba(51,29,1,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
