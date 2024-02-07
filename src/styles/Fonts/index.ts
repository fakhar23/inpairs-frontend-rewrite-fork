import { Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";

// Google Fonts:
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});

// Local Fonts:
export const bryant = localFont({
  src: [
    {
      path: "./BryantPro-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./BryantPro-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./BryantPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./BryantPro-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./BryantPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./BryantPro-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./BryantPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./BryantPro-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-bryant",
  display: "swap",
});

export const funky = localFont({
  src: "./Funkydori-Bold.otf",
  variable: "--font-funky",
  display: "swap",
});
