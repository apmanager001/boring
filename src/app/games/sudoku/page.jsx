import Sudoku from "./comp/sudoku";
import { games } from "../../../components/utility/gameList";
import { Metadata } from "next";
import {
  GameSchema,
  BreadcrumbSchema,
} from "../../../components/utility/StructuredData";

export async function generateMetadata() {
  const seo = games.find((game) => game.id === 8);

  return {
    title: `Play ${seo.name} - Free Online Sudoku Puzzle Game | Boring Squirrel`,
    description: seo.description,
    keywords: [
      "sudoku",
      "puzzle game",
      "logic game",
      "number puzzle",
      "brain teaser",
      "free online game",
      "browser game",
    ],
    openGraph: {
      title: `Play ${seo.name} - Free Online Sudoku Puzzle Game | Boring Squirrel`,
      description: seo.description,
      url: `https://boringsquirrel.com${seo.link}`,
      images: [`https://boringsquirrel.com${seo.image}`],
      type: "game",
    },
    twitter: {
      card: "summary_large_image",
      title: `Play ${seo.name} - Free Online Sudoku Puzzle Game`,
      description: seo.description,
      images: [`https://boringsquirrel.com${seo.image}`],
    },
    alternates: {
      canonical: `https://boringsquirrel.com${seo.link}`,
    },
  };
}

const Page = () => {
  const seo = games.find((game) => game.id === 8);
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
        <Sudoku />
      </div>
    </>
  );
};

export default Page;
