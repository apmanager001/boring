import React from 'react'
import App from './comps/app'
import {games} from '../../../components/utility/gameList'

export async function generateMetadata() {
  const seo = games[4];
  return {
    title: seo.name,
    description: seo.description,
    openGraph: {
      title: seo.name,
      description: seo.description,
      image: [`https://boringsquirrel.com${seo.image}`],
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
      <App />
    </div>
  );
}

export default Page