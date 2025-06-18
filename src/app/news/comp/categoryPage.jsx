'use client'
import React, {useEffect} from 'react'
import Link from 'next/link';
import { ArrowBigLeft } from "lucide-react";
import { useNewsStore } from '../../store/newsStore';
import { useParams } from "next/navigation";


const CategoryPage = () => {
    const { getLatest, fetchAllNews } = useNewsStore();
    const params = useParams();
    const searchTerm = params.id.toLowerCase();

    useEffect(() => {
      if (getLatest().length === 0) {
        fetchAllNews();
        console.log("ran");
      }
    }, [fetchAllNews]);
      

    const categoryStories = getLatest().filter((story) => {
      const title = story.title?.toLowerCase() || "";
      const description = story.description?.toLowerCase() || "";
      return title.includes(searchTerm) || description.includes(searchTerm);
    });
      
    if (categoryStories.length === 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-80 w-full"></div>
          ))}
        </div>
      );
    }

  return (
    <>
      <div className="relative my-10">
        {/* Back Button - Left aligned */}
        <Link
          href="/news"
          className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center text-lg hover:underline"
        >
          <ArrowBigLeft className="mr-1" /> Back to All News
        </Link>

        {/* Centered Heading */}
        <h2 className="text-center text-3xl font-extrabold">
          {searchTerm.toUpperCase()} News
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-10">
        {categoryStories.map((article, index) => (
          <div
            key={article.id || index}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow h-full"
          >
            <figure className="relative h-48">
              <img
                src={
                  article.image ||
                  getFirstImage(article.content) ||
                  "/default-news.jpg"
                }
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <span className="badge badge-soft badge-primary">
                  {article.source}
                </span>
              </div>
            </figure>
            <div className="card-body p-4">
              <Link
                href={article.link}
                passHref
                target="_blank"
                rel="noopener noreferrer"
                className="hover:no-underline"
              >
                <h3 className="card-title text-lg line-clamp-2 hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </Link>
              <p className="text-gray-500 text-sm line-clamp-3">
                {article.description || article.content}
              </p>
              <div className="card-actions justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {new Date(article.pubDate).toLocaleDateString()}
                </span>
                <Link
                  href={article.link}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryPage