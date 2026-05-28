import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "ui-serif", "serif"],
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Space Mono", "ui-monospace", "monospace"],
      },
      animation: {
        "booking-pulse": "bookingPulse 6s ease-in-out infinite",
        "divider-shimmer": "dividerShimmer 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
