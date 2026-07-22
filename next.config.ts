import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow SVG files to be served as images (our placeholders)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize common formats
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
  },
  // Allow GSAP in client components
  transpilePackages: [],
};

export default nextConfig;
