/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_purple: "#6c27ea",
        light_purple: "#B667F7",
        extra_light_purple: "#c293eb",
        cblack: "#080212",
        cwhite: "#f8f4fc",
        extra_dark_purple: "#230e3b",
        dark_pink: "#873776",
      }
    },
  },
  plugins: [],
};
