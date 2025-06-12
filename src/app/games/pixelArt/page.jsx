import React from 'react'
import PixelArtMain from './comp/pixelArtMain'
import { games } from "../../../components/utility/gameList";

export async function generateMetadata() {
  const seo = games[5];

  return {
    title: seo.name,
    description: seo.description,
    openGraph: {
      title: seo.name,
      description: seo.description,
      images: [`https://boringsquirrel.com${seo.image}`],
      url: `https://boringsquirrel.com${seo.link}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

const Page = () => {
  return (
    <div>
      <PixelArtMain />
    </div>
  );
}

export default Page