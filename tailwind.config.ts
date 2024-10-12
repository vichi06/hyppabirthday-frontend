import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        oorange: "var(--oorange)",
        bblue: "var(--bblue)",
        sand: "var(--sand)",
        warningBorder: "var(--warning-border)",
        warningBackground: "var(--warning-background)",
      },
    },
  },
  plugins: [],
};
export default config;
