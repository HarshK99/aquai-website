import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — DESIGN.md
        porcelain: "#FAFAF7",
        mist: "#EFF1F0",
        navy: "#196db5",
        "navy-deep": "#0A1830",
        steel: "#5C6B7A",
        "accent-red": "#f21928",
        chrome: "#C9CED4",
        // Finish swatches — DESIGN.md addendum
        "finish-chrome": "#C9CED4",
        "finish-gold": "#C9A24B",
        "finish-rosegold": "#C08A7D",
        "finish-mattblack": "#1E1E1E",
        "finish-mirror": "#DEE3E8",
        "finish-satin": "#B9BFC4",
        "finish-glossy": "#D6DBE0",
        "finish-cp": "#C9CED4",
      },
      fontFamily: {
        display: ["var(--font-prata)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid type scale — DESIGN.md
        hero: ["clamp(2.5rem, 4vw + 1.5rem, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.75rem, 2vw + 1rem, 2.75rem)", { lineHeight: "1.2" }],
        eyebrow: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.14em", fontWeight: "600" }],
      },
      maxWidth: {
        content: "1280px",
      },
      lineHeight: {
        body: "1.7",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
