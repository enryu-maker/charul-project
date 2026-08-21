import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "217.216.58.183",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
