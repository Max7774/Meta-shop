/** @type {import('tailwindcss').Config} */
const twColors = require("tailwindcss/colors");

const colors = {
  transparent: twColors.transparent,
  black: "#2E3239",
  gray: "#CDCDCD",
  white: twColors.white,
  primary: "#611C35",
  secondary: "#2E5077",
  disabledpri: "#855868",
  disabled: "#73879D",
  "bg-color": "#524fff",
  "bg-color-secondary": "#F2F2F5",
  aqua: "#268697",
  green: twColors.green[400],
  red: twColors.red[400],
  purple: "#6931e0",
  blue: "#2e33bf",
  orange: "#ff8a00",
};

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "450px",
      tablet: "600px",
      laptop: "1024px",
      desktop: "1280px",
    },
    colors,
    extend: {
      fontSize: {
        xs: "0.82rem",
        sm: "0.98rem",
        base: "1.15rem",
        lg: "1.22rem",
        xl: "1.36rem",
        "1.5xl": "1.5rem",
        "2xl": "1.725rem",
        "3xl": "2.155rem",
        "4xl": "2.58rem",
        "5xl": "3.45rem",
        "6xl": "4.3rem",
        "7xl": "5.17rem",
        "8xl": "6.9rem",
        "9xl": "9.2rem",
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
      },
      keyframes: {
        animationOpacity: {
          from: { opacity: 0.2 },
          to: { opacity: 1 },
        },
        scaleIn: {
          "0%": {
            opacity: 0,
            transform: "scale(0.9)",
          },
          "50%": {
            opacity: 0.3,
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
      animation: {
        opacity: "animationOpacity .5s ease-in-out",
        scaleIn: "scaleIn .35s ease-in-out",
      },
    },
  },
  plugins: [],
};
