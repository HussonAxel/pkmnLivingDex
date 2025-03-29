/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...require("tailwindcss/colors"),
      cream: "#F1EFD7",
      red: "#F65244",
      black: "#1E1E1E",
      grey: "#3c3c3c",
    },
    extend: {
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        worksans: ["Work Sans", "sans-serif"],
      },
    },
  },
};
