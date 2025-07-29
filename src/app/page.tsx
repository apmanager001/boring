import { Metadata } from "next";
import Feature from "../components/homepage/feature";
import NewsHeader from "../components/homepage/newsHeader";
import LeaderboardDisplay from "../components/homepage/leaderboardDisplay";
import IndependentGames from "../components/homepage/independent";
import Hero from "../components/homepage/hero";
import Testimonials from "../components/homepage/testimonials";
import {
  WebsiteSchema,
  OrganizationSchema,
} from "../components/utility/StructuredData";

export const metadata: Metadata = {
  title: "Free Online Games | Play Fun Browser Games at Boring Squirrel",
  description:
    "Play free online games at Boring Squirrel! Enjoy puzzle games, strategy games, multiplayer games, and kids games. No download required - play instantly in your browser.",
  keywords: [
    "free online games",
    "browser games",
    "puzzle games",
    "strategy games",
    "multiplayer games",
    "kids games",
    "no download games",
    "instant play games",
    "classic games",
    "brain games",
    "memory games",
    "sudoku",
    "minesweeper",
    "tic tac toe",
  ],
  openGraph: {
    title: "Free Online Games | Play Fun Browser Games at Boring Squirrel",
    description:
      "Play free online games at Boring Squirrel! Enjoy puzzle games, strategy games, multiplayer games, and kids games. No download required - play instantly in your browser.",
    url: "https://boringsquirrel.com",
    type: "website",
    images: [
      {
        url: "https://boringsquirrel.com/sqir.jpg",
        width: 1200,
        height: 630,
        alt: "Boring Squirrel - Free Online Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Games | Play Fun Browser Games at Boring Squirrel",
    description:
      "Play free online games at Boring Squirrel! Enjoy puzzle games, strategy games, multiplayer games, and kids games.",
    images: ["https://boringsquirrel.com/sqir.jpg"],
  },
  alternates: {
    canonical: "https://boringsquirrel.com",
  },
};

export default function Home() {
  return (
    <>
      <WebsiteSchema />
      <OrganizationSchema />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Games */}
      <Feature />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* News Section */}
      <NewsHeader />
      
      {/* Leaderboards */}
      <LeaderboardDisplay />
      
      {/* Independent Games */}
      <IndependentGames />
    </>
  );
}
