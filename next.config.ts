import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["djethkxabnuydbbnbsgn.supabase.co"],
  },
};

export default nextConfig;
