/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         amazon: "AmazonEmber",
//         amazonbold: "AmazonEmberBold",
//       },

//       colors: {
//         transparent: "transparent",
//         primary: {
//           100: "#C2F8FF",
//           200: "#99F3FF",
//           300: "#70EEFF",
//           400: "#47EAFF",
//           500: "#1FE5FF",
//           600: "#00D8F5",
//           700: "#00B4CC",
//           800: "#0090A3",
//           900: "#006C7A",
//         },
//         blue: {
//           100: "#A9C0EF",
//           200: "#86A7E9",
//           300: "#648EE3",
//           400: "#4175DC",
//           500: "#265ECF",
//           600: "#204FAC",
//           700: "#193F8A",
//           800: "#0F2552",
//           900: "#071F45",
//         },
//         warning: {
//           100: "#FEF0C7",
//           200: "#FEDF89",
//           300: "#FEC84B",
//           400: "#FDB022",
//           500: "#F79009",
//           600: "#DC6803",
//           700: "#B54708",
//           800: "#93370D",
//           900: "#792E0D",
//         },
//         error: {
//           100: "#FEE4E2",
//           200: "#FECDCA",
//           300: "#FDA29B",
//           400: "#F97066",
//           500: "#F04438",
//           600: "#D92D20",
//           700: "#B42318",
//           800: "#912018",
//           900: "#7A271A",
//         },
//         success: {
//           100: "#D1FADF",
//           200: "#A6F4C5",
//           300: "#6CE9A6",
//           400: "#32D583",
//           500: "#12B76A",
//           600: "#039855",
//           700: "#027A48",
//           800: "#05603A",
//           900: "#054F31",
//         },
//         black: {
//           100: "rgba(28, 28, 28, 0.1)",
//           200: "rgba(28, 28, 28, 0.2)",
//           300: "rgba(28, 28, 28, 0.3)",
//           400: "rgba(28, 28, 28, 0.4)",
//           500: "rgba(28, 28, 28, 0.5)",
//           600: "rgba(28, 28, 28, 0.6)",
//           700: "rgba(28, 28, 28, 0.7)",
//           800: "rgba(28, 28, 28, 0.8)",
//           900: "#1c1c1c",
//         },
//         white: {
//           100: "rgba(255, 255, 255, 0.1)",
//           200: "rgba(255, 255, 255, 0.2)",
//           300: "rgba(255, 255, 255, 0.3)",
//           400: "rgba(255, 255, 255, 0.4)",
//           700: "rgba(255, 255, 255, 0.7)",
//           800: "rgba(255, 255, 255, 0.8)",
//           900: "#ffffff",
//         },
//         secondary: {
//           darkblack: "#141920",
//           medium: "#252f3d",
//           blue: "#007185",
//           red: "#b12704",
//           yellow: "#f4bf76",
//           darkyellow: "#f2a742",
//           orange: "#c45500",
//           hoverorange: "#b65b22",
//         },
//         inputHover: "rgba(234, 234, 234, 1)",
//         loginButton: "#23BB86",
//         background: "#EFF4F2",
//         trHover: "rgba(0, 0, 0, 0.03)",
//       },
//     },
//   },
//   plugins: [],
// };

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    screens: {
      sm: "540px",
      // => @media (min-width: 576px) { ... }

      md: "720px",
      // => @media (min-width: 768px) { ... }

      lg: "960px",
      // => @media (min-width: 992px) { ... }

      xl: "1140px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1320px",
      // => @media (min-width: 1400px) { ... }
    },
    container: {
      center: true,
      padding: "16px",
      minHeight: "100%",
    },
    extend: {
      colors: {
        black: "#212b36",
        dark: "#090E34",
        "dark-700": "#090e34b3",
        primary: "#3056D3",
        secondary: "#13C296",
        "body-color": "#637381",
        warning: "#FBBF24",
        alotrade: "#00c2cb",
      },
      boxShadow: {
        input: "0px 7px 20px rgba(0, 0, 0, 0.03)",
        pricing: "0px 39px 23px -27px rgba(0, 0, 0, 0.04)",
        "switch-1": "0px 0px 5px rgba(0, 0, 0, 0.15)",
        testimonial: "0px 60px 120px -20px #EBEFFD",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
