import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      // Redirect react-pdf CSS imports to empty file since they don't exist
      'react-pdf/dist/esm/Page/AnnotationLayer.css': './src/lib/empty.css',
      'react-pdf/dist/esm/Page/TextLayer.css': './src/lib/empty.css',
    },
  },
};

export default nextConfig;
