import type { Metadata } from "next";

import { Inter } from "next/font/google";
import Script from "next/script";

import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import { QueryController } from "../contexts/QueryController";
import { Next13NProgress } from "nextjs13-progress";
import { AuthController } from "@/contexts/AuthController";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InPairs",
  description: "A matchmaking platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-CMJ4D3DC2T"
      ></Script>
      <Script id="gtag-install" async>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CMJ4D3DC2T');
         `}
      </Script>
      <body className={inter.className}>
        <QueryController>
          <AuthController>
            {children}
            <ToastContainer
              className="md:text-xsmall"
              hideProgressBar={true}
              closeButton={false}
            />
          </AuthController>
        </QueryController>
        <Next13NProgress />
      </body>
    </html>
  );
}
