import type { Config } from "tailwindcss";
const { heroui } = require("@heroui/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        gradient: "gradient 8s linear infinite",
        "fade-in-slow": "fadeIn 6s",
      },
      keyframes: {
        gradient: {
          to: { "background-position": "-200% center" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(), require("@tailwindcss/typography")],
};
export default config;
