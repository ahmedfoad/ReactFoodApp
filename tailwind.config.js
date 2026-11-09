/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#183b32",
        forest: "#245847",
        leaf: "#e8f1e9",
        mist: "#f4f7f2",
        citrus: "#f5c45e",
        coral: "#e96e52",
        muted: "#6e7c74",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Fraunces", "serif"],
      },
      boxShadow: {
        card: "0 12px 36px rgba(24, 59, 50, 0.08)",
      },
    },
  },
  plugins: [],
};
