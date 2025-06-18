'use client'
import React from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const NewsArticlePage = ({ article }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const imageUrl = article.urlToImage || article.background_image;
  const fullImageUrl = imageUrl?.startsWith("http")
    ? imageUrl
    : `${process.env.NEXT_PUBLIC_SITE_URL}${imageUrl}`;

  return (
    <>
        <Head>
            <title>{article.title}</title>
            <meta name="description" content={article.description || article.short_description} />
            
            {/* OpenGraph / Facebook */}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={article.title} />
            <meta property="og:description" content={article.description || article.short_description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="600" />
            <meta property="og:image:alt" content={article.title} />
            {article.publishedAt && (
            <meta property="article:published_time" content={new Date(article.publishedAt).toISOString()} />
            )}
            {(article.author || article.source?.name) && (
            <meta property="article:author" content={article.author || article.source?.name} />
            )}
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={article.title} />
            <meta name="twitter:description" content={article.description || article.short_description} />
            <meta name="twitter:image" content={fullImageUrl} />
        </Head>
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <span className="badge badge-primary">{article.source?.name}</span>
          <span className="text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <img
          src={article.urlToImage || article.background_image}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </>
  );
};

export async function getStaticPaths() {
  // Fetch all possible article slugs
  const res = await fetch(
    `https://api.rawg.io/api/articles?key=${process.env.RAWG_API_KEY}`
  );
  const data = await res.json();

  const paths = data.results.map((article) => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Fetch article data based on slug
  const res = await fetch(
    `https://api.rawg.io/api/articles/${params.slug}?key=${process.env.RAWG_API_KEY}`
  );
  const article = await res.json();

  return {
    props: { article },
    revalidate: 86400, // Revalidate once per day
  };
}

export default NewsArticlePage;
