import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../components/providers/QueryProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Boring Squirrel is your ultimate destination for unique and engaging individual and multiplayer games. Whether you're looking for a casual challenge or a competitive showdown, our games offer exciting twists that make them stand out. Test your memory, strategy, and reflexes with a variety of interactive experiences designed for players of all skill levels. Join the fun, compete with friends, and discover new favorites—all in one place!";

export const metadata: Metadata = {
  title: {
    default: "Boring Squirrel - Free Online Games | Play Fun Games",
    template: "%s | Boring Squirrel",
  },
  description: description,
  keywords: [
    "free online games",
    "browser games",
    "puzzle games",
    "strategy games",
    "multiplayer games",
    "kids games",
    "memory games",
    "sudoku",
    "minesweeper",
    "tic tac toe",
    "flow game",
    "acornsweeper",
    "pixel art",
    "dots and boxes",
    "coloring book",
    "online gaming",
    "casual games",
    "brain games",
  ],
  authors: [{ name: "Boring Squirrel" }],
  creator: "Boring Squirrel",
  publisher: "Boring Squirrel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://boringsquirrel.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boringsquirrel.com",
    siteName: "Boring Squirrel",
    title: "Play Free Games Online at Boring Squirrel",
    description: description,
    images: [
      {
        url: "https://boringsquirrel.com/sqir.jpg",
        width: 1200,
        height: 630,
        alt: "Boring Squirrel - Free Online Games",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Play Free Games Online at Boring Squirrel",
    description: description,
    images: ["https://boringsquirrel.com/sqir.jpg"],
    creator: "@boringsquirrel",
    site: "@boringsquirrel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Remove verification until you have the actual code
  // verification: {
  //   google: "your-google-verification-code", // Replace with your actual verification code
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZQLCMP047S"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZQLCMP047S');`}
        </Script>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/sqir.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="application-name" content="Boring Squirrel" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Boring Squirrel" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Additional SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Boring Squirrel",
              url: "https://boringsquirrel.com",
              description: description,
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://boringsquirrel.com/games?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <QueryProvider>
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
        </QueryProvider>
      </body>
    </html>
  );
}
