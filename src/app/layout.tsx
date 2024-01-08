import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
        {children}
        <ToastContainer
          className="md:text-xsmall"
          hideProgressBar={true}
          closeButton={false}
        />
      </body>
    </html>
  );
}
