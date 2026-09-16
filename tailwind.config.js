/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "cursive"],
        utama: ["Inter", "sans-serif"],
      },
      colors: {
        cerah: "#EDF1D6",
        primary: "#9DC08B",
        secondary: "#609966",
        gelap: "#40513B",
      },
    },
  },
  plugins: [require("daisyui")],
};
