'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import { useNewsStore } from '@/app/store/newsStore';
import { Newspaper, ExternalLink, Clock, AlertCircle } from "lucide-react";

const NewsHeader = () => {
    const { getLatest, fetchAllNews } = useNewsStore();
    const allArticles = getLatest();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadNews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                if (getLatest().length === 0) {
                    await fetchAllNews();
                }
            } catch (err) {
                setError('Failed to load news articles');
                console.error('News loading error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadNews();
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
    
    const hasNoArticles = 
      pcArticles.length === 0 &&
      consoleArticles.length === 0 &&
      adventureArticles.length === 0;

    if (isLoading) {
      return (
        <section className="py-16 px-4 bg-base-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Newspaper className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4">Latest Gaming News</h2>
              <p className="text-lg text-base-content/70">Stay updated with the latest in gaming</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card bg-base-100 shadow-lg">
                  <div className="skeleton h-32 w-full rounded-t-lg" />
                  <div className="card-body p-4">
                    <div className="skeleton h-4 w-3/4 mb-2" />
                    <div className="skeleton h-3 w-full mb-2" />
                    <div className="skeleton h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (error) {
      return (
        <section className="py-16 px-4 bg-base-200">
          <div className="max-w-6xl mx-auto text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-warning" />
            <h2 className="text-2xl font-bold mb-4">News Temporarily Unavailable</h2>
            <p className="text-base-content/70 mb-6">{error}</p>
            <Link href="/news" className="btn btn-primary">
              <Newspaper className="w-4 h-4 mr-2" />
              Visit News Page
            </Link>
          </div>
        </section>
      );
    }
    
    const renderArticles = (articles, category) => (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">{category} News</h3>
          <Link 
            href="/news" 
            className="btn btn-ghost btn-sm text-primary hover:text-primary-focus"
          >
            View All
            <ExternalLink className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        {articles.length === 0 ? (
          <div className="text-center py-8 text-base-content/60">
            <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No {category.toLowerCase()} news available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.slice(0, 4).map((article) => (
              <div
                key={article.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <figure className="h-40 overflow-hidden">
                  <img
                    src={article.image || "/default-news.jpg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </figure>
                <div className="card-body p-4">
                  <h4 className="card-title text-base font-semibold line-clamp-2 mb-2">
                    {article.title}
                  </h4>
                  <p className="text-sm text-base-content/70 line-clamp-3 mb-3">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-xs text-base-content/50">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(article.pubDate).toLocaleDateString()}
                    </div>
                    <Link
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-xs"
                    >
                      Read
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
    
    return (
      <section className="py-16 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Newspaper className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Latest Gaming News</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Stay updated with the latest gaming trends, releases, and industry insights
            </p>
          </div>

          {hasNoArticles ? (
            <div className="text-center py-12">
              <Newspaper className="w-16 h-16 mx-auto mb-4 text-base-content/30" />
              <h3 className="text-xl font-semibold mb-2">No News Available</h3>
              <p className="text-base-content/60 mb-6">Check back later for the latest gaming news</p>
              <Link href="/news" className="btn btn-primary">
                Visit News Page
              </Link>
            </div>
          ) : (
            <>
              {renderArticles(pcArticles, "PC")}
              {renderArticles(consoleArticles, "Console")}
              {renderArticles(adventureArticles, "Adventure")}
            </>
          )}
        </div>
      </section>
    );
}

export default NewsHeader