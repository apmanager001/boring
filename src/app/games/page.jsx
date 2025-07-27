import React from "react";
import GamePage from "./comps/gamePage";
import { BreadcrumbSchema } from "../../components/utility/StructuredData";

export const metadata = {
  title: "All Games - Free Online Games Collection | Boring Squirrel",
  description:
    "Explore our complete collection of free online games! From puzzle games and strategy challenges to multiplayer experiences and kids games. Find your next favorite game to play instantly.",
  keywords: [
    "all games",
    "game collection",
    "free games",
    "online games",
    "puzzle games",
    "strategy games",
    "multiplayer games",
    "kids games",
  ],
  openGraph: {
    title: "All Games - Free Online Games Collection | Boring Squirrel",
    description:
      "Explore our complete collection of free online games! From puzzle games and strategy challenges to multiplayer experiences and kids games.",
    url: "https://boringsquirrel.com/games",
    images: [
      {
        url: "https://boringsquirrel.com/sqir.jpg",
        width: 1200,
        height: 630,
        alt: "Boring Squirrel Games Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Games - Free Online Games Collection | Boring Squirrel",
    description:
      "Explore our complete collection of free online games! From puzzle games and strategy challenges to multiplayer experiences and kids games.",
    images: ["https://boringsquirrel.com/sqir.jpg"],
  },
  alternates: {
    canonical: "https://boringsquirrel.com/games",
  },
};

const Page = () => {
  const breadcrumbItems = [
    { name: "Home", url: "https://boringsquirrel.com" },
    { name: "Games", url: "https://boringsquirrel.com/games" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <div>
        <GamePage />
      </div>
    </>
  );
};

export default Page;
