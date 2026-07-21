import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // /en を en/index.html として書き出し、どの静的ホストでも /en/ で開けるようにする
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
