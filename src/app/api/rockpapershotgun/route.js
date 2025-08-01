// app/api/gamespot/route.ts
import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail"],
    ],
  },
  timeout: 10000, // 10 second timeout
});

export async function GET() {
  try {
    // Add timeout and better error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const feed = await parser.parseURL("https://www.rockpapershotgun.com/feed/");
    clearTimeout(timeoutId);

    if (!feed || !feed.items || !Array.isArray(feed.items)) {
      console.warn("RockPaperShotgun feed returned invalid data");
      return NextResponse.json([], { status: 200 }); // Return empty array instead of error
    }

    const formattedItems = feed.items
      .filter(item => item && item.title && item.link) // Filter out invalid items
      .slice(0, 20) // Limit to 20 items to prevent large responses
      .map((item) => ({
        id: item.guid || item.link || Math.random().toString(36).substr(2, 9),
        title: item.title || "Untitled",
        link: item.link || "#",
        description: item.contentSnippet || item.description || "",
        content: item.content || "",
        pubDate: item.pubDate || new Date().toISOString(),
        image:
          item.mediaContent?.[0]?.$?.url ||
          item.mediaThumbnail?.$?.url ||
          item.enclosure?.url ||
          "/default-news.jpg",
        author: item.creator || item.author || "RockPaperShotgun",
        categories: item.categories || [],
      }));

    return NextResponse.json(formattedItems, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache
      }
    });
  } catch (error) {
    console.error("RockPaperShotgun API error:", error);
    
    // Return empty array instead of 500 error to prevent indexing issues
    return NextResponse.json([], {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300', // 1 min cache on error
      }
    });
  }
}