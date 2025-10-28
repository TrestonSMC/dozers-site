import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["djethkxabnuydbbnbsgn.supabase.co"], // ✅ allows Supabase-hosted images/videos
  },
};

export default nextConfig;
