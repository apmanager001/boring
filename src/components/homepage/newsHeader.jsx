'use client'
import React, {useEffect} from 'react'
import Link from 'next/link';
import { useNewsStore } from '@/app/store/newsStore';


const NewsHeader = () => {
    const { getLatest, fetchAllNews } = useNewsStore();
    const allArticles = getLatest();

    useEffect(() => {
        if (getLatest().length === 0) {
        fetchAllNews();
        console.log("ran");
        }
    }, [fetchAllNews]);

    const filterByKeyword = (keyword) =>
      allArticles.filter((article) =>
        (article.title + article.description + article.content)
          .toLowerCase()
          .includes(keyword)
      );

    const pcArticles = filterByKeyword("pc");
    const consoleArticles = filterByKeyword("console");
    const adventureArticles = filterByKeyword("adventure");
    
    const isLoading =
      pcArticles.length === 0 &&
      consoleArticles.length === 0 &&
      adventureArticles.length === 0;

    if (isLoading) {
      return (
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
          <h2 className="text-2xl text-center font-bold mb-2">Loading News...</h2> 
          <div className="flex flex-wrap justify-center gap-4">
            
            {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton h-64 w-44 rounded-lg" />
            ))}
          </div>
        </div>
      );
    }
    
    const renderArticles = (articles) => (
      // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
      <div className="flex flex-wrap justify-center gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow text-sm h-64 w-52"
          >
            <figure className="h-28 overflow-hidden">
              <img
                src={article.image || "/default-news.jpg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-3">
              <h3 className="card-title text-base font-semibold line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {article.description}
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
                  className="btn btn-xs btn-outline"
                >
                  Read
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
    
    return (
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
        <h2 className="text-2xl text-center font-bold mb-2">PC News</h2>
        {renderArticles(pcArticles.slice(0, 4))}

        <h2 className="text-2xl text-center font-bold mb-2">Console News</h2>
        {renderArticles(consoleArticles.slice(0, 4))}

        <h2 className="text-2xl text-center font-bold mb-2">Adventure News</h2>
        {renderArticles(adventureArticles.slice(0, 4))}
      </div>
    );
    
}

export default NewsHeader