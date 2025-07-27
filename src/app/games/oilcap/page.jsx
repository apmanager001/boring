import React from "react";
import OilcapGame from "./comp/grid";
import { games } from "../../../components/utility/gameList";
import {
  GameSchema,
  BreadcrumbSchema,
} from "../../../components/utility/StructuredData";

export async function generateMetadata() {
  const seo = games[0];

  return {
    title: `Play ${seo.name} - Free Online Oil Flow Game | Boring Squirrel`,
    description: seo.description,
    keywords: [
      "flow game",
      "oil flow",
      "puzzle game",
      "pipe game",
      "strategy game",
      "free online game",
      "browser game",
    ],
    openGraph: {
      title: `Play ${seo.name} - Free Online Oil Flow Game | Boring Squirrel`,
      description: seo.description,
      url: `https://boringsquirrel.com${seo.link}`,
      images: [`https://boringsquirrel.com${seo.image}`],
      type: "game",
    },
    twitter: {
      card: "summary_large_image",
      title: `Play ${seo.name} - Free Online Oil Flow Game`,
      description: seo.description,
      images: [`https://boringsquirrel.com${seo.image}`],
    },
    alternates: {
      canonical: `https://boringsquirrel.com${seo.link}`,
    },
  };
}

const Page = () => {
  const seo = games[0];
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
        <OilcapGame />
      </div>
    </>
  );
};

export default Page;
