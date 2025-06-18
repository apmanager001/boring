import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  rewrites: async () => [
    {
      source: "/",
      destination: "https://www.gamespot.com/feeds/news",
    },
  ],
};

export default nextConfig;
