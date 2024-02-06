import type { Config } from "tailwindcss";

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
      textColor: {
        purple: "#622466",

        light: {
          black: "#3D3C3C",
        },
        gray: {
          charcoal: "#5B5B5B",
          gunmetal: "#3D3C3C",
        },
        red: {
          "50": "#fef2f2",
          "100": "#fee3e2",
          "200": "#feccca",
          "300": "#fca8a5",
          "400": "#f97570",
          "500": "#ef3e37",
          "600": "#dd2c25",
          "700": "#ba211b",
          "800": "#9a1f1a",
          "900": "#80201c",
          "950": "#450c0a",
        },
      },
      backgroundColor: {
        purple: "#622466",
        "theme-red": "#Ef3E37",
        "light-black": "#3D3C3C",
        charcoal: "#5B5B5B",
        gunmetal: "#3D3C3C",
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
        bryant: ["var(--font-bryant)", "system-ui", "sans-serif"],
        funky: ["var(--font-funky)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
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
