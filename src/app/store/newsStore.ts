import { create } from "zustand";

interface NewsItem {
  id: string;
  title: string;
  link: string;
  description: string;
  content?: string;
  pubDate: string;
  image?: string;
  author?: string;
  categories?: string[];
  source: string; // 'gamespot' | 'eurogamer' | 'pcgamer' | 'rockpapershotgun'
}

interface NewsState {
  newsItems: NewsItem[];
  loading: boolean;
  error: string | null;
  fetchAllNews: () => Promise<void>;
  getBySource: (source: string) => NewsItem[];
  getLatest: (count: number) => NewsItem[];
}

export const useNewsStore =
  create <
  NewsState >
  ((set, get) => ({
    newsItems: [],
    loading: false,
    error: null,

    fetchAllNews: async () => {
      set({ loading: true, error: null });
      try {
        const sources = [
          "gamespot",
          "eurogamer",
          "pcgamer",
          "rockpapershotgun",
        ];
        const allResponses = await Promise.all(
          sources.map(
            (source) =>
              fetch(`/api/${source}`)
                .then((res) => res.json())
                .then((items) =>
                  items.map((item: any) => ({ ...item, source }))
                )
                .catch(() => []) // Silently handle individual feed failures
          )
        );

        // Combine and sort by date (newest first)
        const combined = allResponses
          .flat()
          .sort(
            (a, b) =>
              new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
          );

        set({ newsItems: combined, loading: false });
      } catch (err) {
        set({ error: "Failed to load news", loading: false });
        console.error("Error fetching news:", err);
      }
    },

    getBySource: (source) => {
      return get().newsItems.filter((item) => item.source === source);
    },

    getLatest: (count) => {
      return get().newsItems.slice(0, count);
    },
  }));
