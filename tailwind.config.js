/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",      // Scan all JS/TS/JSX/TSX in src/
    "./src/styles/**/*.{css}"          // Scan all CSS in styles/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}