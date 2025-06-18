import Parser from "rss-parser";

const parser = new Parser();

export async function fetchRSSFeed(url) {
    try {
      // Fetch the RSS feed
      const feed = await parser.parseURL(url);

      // Map through all articles in the feed
      return feed.items.map((item) => {
        // Extract the best available image
        const imageUrl =
          item.mediaContent?.[0]?.$.url ||
          item.mediaThumbnail?.$.url ||
          item.enclosure?.url ||
          "https://via.placeholder.com/800x450";

        return {
          id: item.guid || item.link, // Use link as fallback ID
          title: item.title,
          description: item.contentSnippet || item.description,
          content: item.content,
          url: item.link,
          urlToImage: imageUrl,
          publishedAt: item.isoDate || item.pubDate,
          source: {
            name: "GameSpot",
            url: "https://www.gamespot.com",
          },
          // Additional fields you might want
          author: item.creator || item.author,
          categories: item.categories || [],
        };
      });
    } catch (error) {
      console.error("Error fetching GameSpot RSS feed:", error);
      return [];
    }
}

// Example gaming RSS feeds
export const gamingFeeds = [
//   "https://www.pcgamer.com/rss",
//   "https://www.ign.com/feeds/games",
  "https://www.gamespot.com/feeds/news",
//   "https://www.eurogamer.net/feed",
//   "https://www.rockpapershotgun.com/feed",
];
