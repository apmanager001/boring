import React from "react";
import Minesweeper from "./minesweeper";
import { games } from "../../../components/utility/gameList";
import {
  GameSchema,
  BreadcrumbSchema,
} from "../../../components/utility/StructuredData";

export async function generateMetadata() {
  const seo = games[1];

  return {
    title: `Play ${seo.name} - Free Online Minesweeper Game | Boring Squirrel`,
    description: seo.description,
    keywords: [
      "acornsweeper",
      "minesweeper",
      "puzzle game",
      "logic game",
      "free online game",
      "browser game",
    ],
    openGraph: {
      title: `Play ${seo.name} - Free Online Minesweeper Game | Boring Squirrel`,
      description: seo.description,
      url: `https://boringsquirrel.com${seo.link}`,
      images: [`https://boringsquirrel.com${seo.image}`],
      type: "game",
    },
    twitter: {
      card: "summary_large_image",
      title: `Play ${seo.name} - Free Online Minesweeper Game`,
      description: seo.description,
      images: [`https://boringsquirrel.com${seo.image}`],
    },
    alternates: {
      canonical: `https://boringsquirrel.com${seo.link}`,
    },
  };
}

const Page = () => {
  const seo = games[1];
  const breadcrumbItems = [
    { name: "Home", url: "https://boringsquirrel.com" },
    { name: "Games", url: "https://boringsquirrel.com/games" },
    { name: seo.name, url: `https://boringsquirrel.com${seo.link}` },
  ];

  return (
    <>
      <GameSchema game={seo} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <div>
        <Minesweeper />
      </div>
    </>
  );
};

export default Page;
