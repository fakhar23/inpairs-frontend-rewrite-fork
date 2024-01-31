import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export const COLORS = {
  primaryColor: "#Ef3E37",
  primaryColorLight: "#f87171",
  secondaryColor: "#622466",
  lightBlack: "#3D3C3C",
  charcoal: "#5B5B5B",
  gunmetal: "#3D3C3C",
  semiTransparentLightGray: "#EFEFEF96", //colors from hardcoded JSX classNames
  mediumGray: "#7b7b7b",
  veryLightGray: "#F2F2F2",
  offWhite: "#F9F9F9",
  lightGray: "#F5F5F5",
  lightBlueGray: "#e5e7eb",
  paleGray: "#F8F8F8",
  grayish: "#999",
  lightGrayish: "#C8C3C3",
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
        primaryColor: COLORS.primaryColor,
        primaryColorLight: COLORS.primaryColorLight,
        secondaryColor: COLORS.secondaryColor,
        semiTransparentLightGray: COLORS.semiTransparentLightGray,
        offWhite: COLORS.offWhite,
        lightGray: COLORS.lightGray,
        veryLightGray: COLORS.veryLightGray,
        mediumGray: COLORS.mediumGray,
        lightBlueGray: COLORS.lightBlueGray,
        paleGray: COLORS.paleGray,

        blueButton: colors.blue[500],
        darkBlueButton: colors.blue[600],
        blueText: colors.blue[500],
        darkBlueText: colors.blue[600],
        blueLink: colors.blue[500],
        darkBlueLink: colors.blue[600],

        lightGrayOutline: colors.gray[300],
        grayOutline: colors.gray[500],
        darkGrayOutline: colors.gray[700],
        lightGrayBorder: colors.gray[300],
        grayBorder: colors.gray[500],
        darkGrayBorder: colors.gray[700],
        lightGrayText: colors.gray[300],
        grayText: colors.gray[500],
        darkGrayText: colors.gray[700],

        neutral100: colors.neutral[100],
        neutral200: colors.neutral[200],
        neutral300: colors.neutral[300],
        neutral400: colors.neutral[400],
        neutral500: colors.neutral[500],
        neutral600: colors.neutral[600],
        neutral700: colors.neutral[700],
        neutral800: colors.neutral[800],
        neutral900: colors.neutral[900],

        lightGreenText: colors.green[300],
        greenText: colors.green[500],
        lightGreenBg: colors.green[300],
        greenBg: colors.green[500],

        purpleBg: colors.purple[500],
        darkPurpleBg: colors.purple[900],
        darkPurpleText: colors.purple[900],
        darkPurpleBorder: colors.purple[900],

        red100: colors.red[100],
        red200: colors.red[200],
        red300: colors.red[300],
        red400: colors.red[400],
        red500: colors.red[500],
        red600: colors.red[600],
        red700: colors.red[700],

        lightRoseBorder: colors.rose[200],
        roseBorder: colors.rose[500],
        roseText: colors.rose[500],
        LightRoseText: colors.rose[200],
        lightRoseBackground: colors.rose[200],
        roseBackground: colors.rose[500],

        slate200: colors.slate[200],
        slate300: colors.slate[300],
        slate400: colors.slate[400],
        slate500: colors.slate[500],
        slate600: colors.slate[600],
        slate700: colors.slate[700],
        slate800: colors.slate[800],

        lightYellowBackground: colors.yellow[100],

        darkBlackText: colors.gray[900],
        darkBlackBackground: colors.gray[900],
      },
      textColor: {
        purple: COLORS.secondaryColor,
        red: COLORS.primaryColor,
        light: {
          black: COLORS.lightBlack,
        },
        gray: {
          charcoal: COLORS.charcoal,
          gunmetal: COLORS.gunmetal,
        },
      },
      backgroundColor: {
        purple: COLORS.secondaryColor,
        "theme-red": COLORS.primaryColor,
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
