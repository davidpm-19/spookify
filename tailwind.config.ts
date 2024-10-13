import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {},
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          background: "#1c1c1c",
          foreground: "#f0f0f0",
          focus: "#F2BC64",
        }
      },
      light: {
        colors: {
          foreground: "#1c1c1c",
          background: "#f0f0f0",
          focus: "#EA7E18",
        }
      }
    },
  })],
};
export default config;
