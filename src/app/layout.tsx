import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Boring Squirrel",
  description: "A place to play great games with others. Most games have there own twist that make them unique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
