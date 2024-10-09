/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        foreground: "var(--foreground)",
        background: "var(--background)",
        secondaryBackground: "var(--secondaryBackground)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
};
