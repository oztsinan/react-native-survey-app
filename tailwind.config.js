/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        foreground: "var(--foreground)",
        background: "var(--background)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        comfortaa: ["Comfortaa"],
      },
      padding: {
        page: 20,
      },
      gap: {
        page: 20,
      },
    },
  },
  plugins: [],
};
