import React from 'react'
import Match from './comp/match'
import Head from "next/head";
import { games } from "../../../components/utility/gameList";

const Page = () => {
  const seo = games[2];
  return (
    <div>
      <Head>
        <title>{seo.name}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.tags.join(", ")} />
        <meta property="og:title" content={seo.name} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta
          property="og:url"
          content={`https://boringsquirrel.com${seo.link}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Match />
    </div>
  );
}

export default Page