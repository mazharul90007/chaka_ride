import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    // Hardcode the fallback to the exact backend server to prevent infinite proxy loops
    // in case the environment variable is accidentally set to the frontend URL.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL && (process.env.NEXT_PUBLIC_API_URL.includes('chaka-ride-server') || process.env.NEXT_PUBLIC_API_URL.includes('localhost'))
      ? process.env.NEXT_PUBLIC_API_URL
      : "https://chaka-ride-server.vercel.app/api/v1";

    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/:path*`, // Proxy strictly to Backend
      },
    ];
  },
};

export default withNextIntl(nextConfig);
