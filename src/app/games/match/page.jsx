import React from 'react'
import Match from './comp/match'
// import { games } from "../../../components/utility/gameList";

export async function generateMetadata() {
  // const seo = games[2];

  return {
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards",
    openGraph: {
      title: "Memory Match",
      description: "Test your memory by matching pairs of cards",
      images: [`https://boringsquirrel.com/hp/match.png`],
      url: `https://boringsquirrel.com/games/match`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

const Page = () => {
  return (
    <div>
      <Match />
    </div>
  );
}

export default Page