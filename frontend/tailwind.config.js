const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
const twColors = require("tailwindcss/colors");
//#5D1F1A
const colors = {
  transparent: twColors.transparent,
  black: "black",
  gray: "#CDCDCD",
  white: twColors.white,
  primary: "#17C964",
  secondary: "#0E793C",
  // "bg-color": "#F2F2F5",
  aqua: "#268697",
  green: twColors.green[400],
  red: twColors.red[400],
  purple: "#6931e0",
  blue: "#2e33bf",
  orange: "#FF9902",
  flow: "#5D1F1A",
};

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors,
    extend: {
      backgroundImage: {
        "profile-background": "url('/profile-background.jpg')",
      },
      screens: {
        mobileMin: "370px",
        mobile: "600px",
        tablet: "885px",
        laptop: "1024px",
        desktop: "1280px",
      },
      // fontSize: {
      //   responsive: "clamp(0.40rem, 1.5vw, 1rem)",
      //   xs: "0.82rem",
      //   sm: "0.98rem",
      //   base: "1.15rem",
      //   lg: "1.22rem",
      //   xl: "1.36rem",
      //   "1.5xl": "1.5rem",
      //   "2xl": "1.000rem",
      //   "3xl": "1.000rem",
      //   "4xl": "1.98rem",
      //   "5xl": "3.45rem",
      //   "6xl": "4.3rem",
      //   "7xl": "5.17rem",
      //   "8xl": "6.9rem",
      //   "9xl": "9.2rem",
      // },
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
        slideRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        opacity: "animationOpacity .5s ease-in-out",
        scaleIn: "scale-90 .35s ease-in-out",
        slideRight: "slideRight 0.5s ease-in-out forwards",
        slideLeft: "slideLeft 0.5s ease-in-out forwards",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: { DEFAULT: colors.primary, contrastText: "#ffffff" },
            secondary: { DEFAULT: colors.secondary, contrastText: "#ffffff" },
          },
        },
      },
    }),
  ],
};
