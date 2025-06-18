import { create } from "zustand";

export const useNewsStore = create((set, get) => ({
  newsItems: [],
  loading: false,
  error: null,

  fetchAllNews: async () => {
    set({ loading: true, error: null });

    try {
      const sources = ["gamespot", "eurogamer", "pcgamer", "rockpapershotgun"];

      const allResponses = await Promise.all(
        sources.map((source) =>
          fetch(`/api/${source}`)
            .then((res) => res.json())
            .then((items) => items.map((item) => ({ ...item, source })))
            .catch(() => [])
        )
      );

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
