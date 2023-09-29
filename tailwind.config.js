/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],

  theme: {
    extend: {},
    colors: {
      "darkBlue": "#1F3F77",
      "darkRed": "#A61A11",
      "teltonikaBlue": "#0054A6",
      "teltonikaGrey":"#F1F2F4",
      "searchBar": "#212121",
    },
  },

  plugins: [],
};