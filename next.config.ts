import type { NextConfig } from "next";

/* =========================================
   Next.js Config — Dakwah Tulungagung
   ========================================= */

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Directus lokal (development)
        protocol: "http",
        hostname: "localhost",
        port: "8055",
        pathname: "/assets/**",
      },
      {
        // Directus production — ganti dengan domain aktual Anda
        protocol: "https",
        hostname: process.env.DIRECTUS_HOSTNAME ?? "cms.dakwahtulungagung.or.id",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
