import type { Config } from "tailwindcss";

export const COLORS = {
  primaryPurple: "#622466",
  lightRed: "#f87171",
  primaryRed: "#Ef3E37",
  lightBlack: "#3D3C3C",
  charcoal: "#5B5B5B",
  gunmetal: "#3D3C3C",
  semiTransparentLightGray: "#EFEFEF96",
  offWhite: "#F9F9F9",
  lightGray: "#F5F5F5",
  veryLightGray: "#F2F2F2",
  mediumGray: "#7b7b7b",
  lightBlueGray: "#e5e7eb",
  paleGray: "#F8F8F8",
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
        primaryRed: COLORS.primaryRed,
        primaryPurple: COLORS.primaryPurple,
        semiTransparentLightGray: COLORS.semiTransparentLightGray,
        offWhite: COLORS.offWhite,
        lightGray: COLORS.lightGray,
        lightRed: COLORS.lightRed,
        veryLightGray: COLORS.veryLightGray,
        mediumGray: COLORS.mediumGray,
        lightBlueGray: COLORS.lightBlueGray,
        paleGray: COLORS.paleGray,
      },
      textColor: {
        purple: COLORS.primaryPurple,
        red: COLORS.primaryRed,
        light: {
          black: COLORS.lightBlack,
        },
        gray: {
          charcoal: COLORS.charcoal,
          gunmetal: COLORS.gunmetal,
        },
      },
      backgroundColor: {
        purple: COLORS.primaryPurple,
        "theme-red": COLORS.primaryRed,
        "light-black": COLORS.lightBlack,
        charcoal: COLORS.charcoal,
        gunmetal: COLORS.gunmetal,
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
        circles: "url('/circles.svg')",
        profile: "url('/profileBg.png')",
        about: "url('/Group-5.svg')",
      },
      boxShadow: {
        "custom-shadow":
          "0 0px 30px 0 rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1)",
      },
      borderWidth: {
        1: "1px",
      },
      height: {
        0.8: "0.8px",
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
    // borderWidth: {
    //   DEFAULT: '1px'
    // },
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
