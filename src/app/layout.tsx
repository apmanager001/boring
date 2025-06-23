import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Header from '../components/header'
import Footer from '../components/footer'
import { Toaster } from "react-hot-toast";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const description = "Boring Squirrel is your ultimate destination for unique and engaging individual and multiplayer games. Whether you're looking for a casual challenge or a competitive showdown, our games offer exciting twists that make them stand out. Test your memory, strategy, and reflexes with a variety of interactive experiences designed for players of all skill levels. Join the fun, compete with friends, and discover new favorites—all in one place!"

export const metadata: Metadata = {
  title: "Boring Squirrel",
  description: description,
  openGraph: {
    siteName: "Boring Squirrel",
    title: "Play Free Games Online at Boring Squirrel",
    description: description,
    images: [
      {
        url: "https://boringsquirrel.com/sqir.jpg",
        width: 1200,
        height: 630,
        alt: "Boring Squirrel Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZQLCMP047S"></Script>
        <Script id='google-analytics'>
          {
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZQLCMP047S');`
          }
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Toaster
          position={"top-left"}
          toastOptions={{
            duration: 5000,
            style: {
              border: "2px solid #000",
              padding: "22px",
              color: "#713200",
              fontSize: "16px",
              fontWeight: "700",
            },
            success: {
              style: {
                background: "#CFFDBC",
              },
            },
            error: {
              style: {
                background: "#ff9494",
              },
            },
          }}
        />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
