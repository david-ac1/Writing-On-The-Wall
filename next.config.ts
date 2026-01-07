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
      // Ignore react-pdf CSS imports that don't exist
      'react-pdf/dist/esm/Page/AnnotationLayer.css': false,
      'react-pdf/dist/esm/Page/TextLayer.css': false,
    },
  },
};

export default nextConfig;
