import React from 'react'
import Match from './comp/match'
// import { games } from "../../../components/utility/gameList";

export const metadata = {
  // const seo = games[2];
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards",
    openGraph: {
      title: "Memory Match",
      description: "Test your memory by matching pairs of cards",
      images: [
        {
          url: "https://boringsquirrel.com/hp/match.png",
          width: 1200, // optional but recommended
          height: 630, // optional but recommended
          alt: "Memory Match Game Preview",
        },
      ],
      url: "https://boringsquirrel.com/games/match",
    },
    twitter: {
      card: "summary_large_image",
    },
}

const Page = () => {
  return (
    <div>
      <Match />
    </div>
  );
}

export default Page