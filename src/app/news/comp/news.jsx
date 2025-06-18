'use client'
import React, {useEffect} from "react";
import TopNews from "./topNews";
import NewsGrid from "./newsGrid";
import CategoryTiles from "./categoryTiles";
import { useNewsStore } from "../../store/newsStore";
import Head from "next/head";

const NewsSection = () => {
    const { fetchAllNews, loading, error } = useNewsStore();

    useEffect(() => {
      fetchAllNews();
    }, [fetchAllNews]);

    if (error)
      return <div className="text-center text-error py-8">{error}</div>;
  return (
    <>
      <Head>
        <title>Latest Gaming News & Updates | GamePulse</title>
        <meta
          name="description"
          content="Stay up-to-date with the latest news, game releases, and industry buzz from top gaming sources."
        />

        {/* OpenGraph / Facebook */}
        <meta
          property="og:title"
          content="Latest Gaming News & Updates | GamePulse"
        />
        <meta
          property="og:description"
          content="Catch up on fresh headlines, reviews, and announcements from the gaming world—all in one place."
        />
        <meta property="og:image" content="/sqir.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boringsquirrel.com/news" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Latest Gaming News & Updates | GamePulse"
        />
        <meta
          name="twitter:description"
          content="The best curated gaming headlines daily—from multiple sources."
        />
        <meta name="twitter:image" content="/squir.jpg" />
      </Head>

      <section className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          GamePulse
        </h1>

        {/* Top News Carousel */}
        <div className="mb-12">
          <TopNews />
        </div>

        {/* News Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-secondary">
            Latest Updates
          </h2>
          <NewsGrid />
        </div>

        {/* Category Tiles */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-secondary">
            Browse by Category
          </h2>
          <CategoryTiles />
        </div>
      </section>
    </>
  );
};

export default NewsSection;
