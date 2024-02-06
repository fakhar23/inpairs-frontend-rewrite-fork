import type { Metadata } from "next";

import Head from "next/head";
import Script from "next/script";

import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import { Providers } from "./providers";
import { Next13NProgress } from "nextjs13-progress";

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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>

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
      <body>
        <Providers>
          {children}
          <ToastContainer
            className="md:text-xsmall"
            hideProgressBar={true}
            closeButton={false}
          />
        </Providers>
        <Next13NProgress />
      </body>
    </html>
  );
}
