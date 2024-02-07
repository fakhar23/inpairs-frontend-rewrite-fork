import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export const COLORS = {
  primary: {
    DEFAULT: "#Ef3E37",
    "50": "#fef2f2",
    "100": "#fee3e2",
    "200": "#feccca",
    "300": "#fca8a5",
    "400": "#f97570",
    "600": "#dd2c25",
    "700": "#ba211b",
    "800": "#9a1f1a",
    "900": "#80201c",
    "950": "#450c0a",

    // other sample color

    // "50": colors.zinc[50],
    // "100": colors.zinc[100],
    // "200": colors.zinc[200],
    // "300": colors.zinc[300],
    // "400": colors.zinc[400],
    // DEFAULT: colors.zinc[500],
    // "600": colors.zinc[600],
    // "700": colors.zinc[700],
    // "800": colors.zinc[800],
    // "900": colors.zinc[900],
    // "950": colors.zinc[950],
  },
  secondary: {
    DEFAULT: "#622466",
    "50": "#F5E5F6",
    "100": "#E9C6EB",
    "200": "#D492D8",
    "300": "#BD59C4",
    "400": "#97389E",
    "500": "#622466",
    "600": "#4F1D53",
    "700": "#3A153C",
    "800": "#280F29",
    "900": "#120713",
    "950": "#0B040B",

    // other sample color

    // "50": colors.yellow[50],
    // "100": colors.yellow[100],
    // "200": colors.yellow[200],
    // "300": colors.yellow[300],
    // "400": colors.yellow[400],
    // DEFAULT: colors.yellow[500],
    // "600": colors.yellow[600],
    // "700": colors.yellow[700],
    // "800": colors.yellow[800],
    // "900": colors.yellow[900],
  },
  gray: {
    DEFAULT: "#5B5B5B",
    "50": "#F0F0F0",
    "100": "#DEDEDE",
    "200": "#BDBDBD",
    "300": "#9C9C9C",
    "400": "#7D7D7D",
    "600": "#4A4A4A",
    "700": "#363636",
    "800": "#242424",
    "900": "#121212",
    "950": "#0A0A0A",
  },
  lightBlack: "#3D3C3C",
  gunmetal: "#3D3C3C",
} as const;

export const VARIANTS = {
  border: COLORS.primary.DEFAULT,
  button: COLORS.primary.DEFAULT,
  title: COLORS.secondary.DEFAULT,
} as const;

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    animation: {
      zoom: "zoom 2s ease-in-out infinite",
      spin: "spin 1s linear infinite",
    },

    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },

    extend: {
      colors: {
        primary: COLORS.primary,
        secondary: COLORS.secondary,
        gray: COLORS.gray,
        light: {
          black: COLORS.lightBlack,
        },
        gunmetal: COLORS.gunmetal,
        title: VARIANTS.title,
        border: VARIANTS.border,
        button: VARIANTS.button,
      },

      keyframes: {
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
      backgroundImage: {
        profile: "url('/src/assets/profileBg.png')",
        about: "url('/src/assets/Group-5.svg')",
      },

      fontFamily: {
        bryantProRegular: ["Bryant Pro Regular", "system-ui", "sans-serif"],
        bryantProLight: ["Bryant Pro Light", "system-ui", "sans-serif"],
        bryantProMedium: ["Bryant Pro Medium", "system-ui", "sans-serif"],
        bryantProBold: ["Bryant Pro Bold", "system-ui", "sans-serif"],
        funky: ["Funky", "system-ui", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
        pacifico: ["Pacifico", "cursive", "system-ui", "sans-serif"],
      },

      fontSize: {
        xsmall: "12px",
        footer: "14px",
        small: "24px",
        large: "40px",
        xlarge: "48px",
        regular: "16px",
      },
    },

    screens: {
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      ld: { max: "1000px" },
      md: { max: "767px" },
      ms: { max: "560px" },
      sm: { max: "420px" },
    },
  },

  plugins: [],
};

export default config;
