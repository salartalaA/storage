import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "192.168.1.7",
    "192.168.1.55",
    "100.127.255.253",
    "192.168.1.51",
    "10.137.194.62",
  ],
  images: {
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
      },
      {
        hostname: "**",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;
