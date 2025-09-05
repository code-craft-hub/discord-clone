import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "q4gs84vsqn.ufs.sh",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["socket.io"],
  },
};

export default nextConfig;
