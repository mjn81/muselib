/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_purple: "#6c27ea",
        light_purple: "#a467f1",
        extra_light_purple: "#c293eb",
        cblack: "#080212",
        cwhite: "#f8f4fc",
        extra_dark_purple: "#3a1d5c",
        dark_pink: "#873776",
      }
    },
  },
  plugins: [],
};
