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

        grayMedium: colors.gray[500],
        darkGray: colors.gray[700],
        inputGrayMedium: colors.gray[500],
        buttonGraylight: colors.gray[300],
        buttonGrayMedium: colors.gray[500],

        neutralLight: colors.neutral[100],
        neutralMedium: colors.neutral[500],
        neutralDark: colors.neutral[900],
        tableNeutralLight: colors.neutral[100],
        tableNeutralMedium: colors.neutral[500],
        tableNeutralDark: colors.neutral[900],
        buttonNeutralLight: colors.neutral[100],
        buttonNeutralMedium: colors.neutral[500],
        buttonNeutralDark: colors.neutral[900],
        inputNeutralLight: colors.neutral[100],
        inputNeutralMedium: colors.neutral[500],
        inputNeutralDark: colors.neutral[900],

        lightGreen: colors.green[300],
        mediumGreen: colors.green[500],
        buttonMediumGreen: colors.green[500],

        mediumPurple: colors.purple[500],
        darkPurple: colors.purple[900],
        footerDarkPurple: colors.purple[900],
        linkDarkPurple: colors.purple[900],
        linkMediumPurple: colors.purple[500],
        navDarkPurple: colors.purple[900],

        red100: colors.red[100],
        red200: colors.red[200],
        red300: colors.red[300],
        red400: colors.red[400],
        red500: colors.red[500],
        red600: colors.red[600],
        red700: colors.red[700],

        lightRose: colors.rose[200],
        buttonLightRose: colors.rose[200],
        mediumRose: colors.rose[500],

        lightSlate: colors.slate[200],
        mediumSlate: colors.slate[500],
        darkSlate: colors.slate[500],
        buttonLightSlate: colors.slate[200],
        buttonMediumSlate: colors.slate[500],
        buttonDarkSlate: colors.slate[500],
        inputLightSlate: colors.slate[200],
        inputMediumSlate: colors.slate[500],

        lightYellow: colors.yellow[100],

        darkBlack: colors.gray[900],
        buttomDarkBlack: colors.gray[900],
        linkDarkBlack: colors.gray[900],
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
