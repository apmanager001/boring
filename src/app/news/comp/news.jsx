'use client'
import React, {useEffect} from "react";
import TopNews from "./topNews";
import NewsGrid from "./newsGrid";
import CategoryTiles from "./categoryTiles";
import { useNewsStore } from "../../store/newsStore";

const NewsSection = () => {
    const { fetchAllNews, loading, error } = useNewsStore();

    useEffect(() => {
      fetchAllNews();
    }, [fetchAllNews]);

    if (error)
      return <div className="text-center text-error py-8">{error}</div>;
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Gaming News
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
  );
};

export default NewsSection;
