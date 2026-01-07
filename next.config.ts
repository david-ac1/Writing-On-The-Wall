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
  webpack: (config) => {
    // Ignore react-pdf CSS imports that don't exist
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-pdf/dist/esm/Page/AnnotationLayer.css': false,
      'react-pdf/dist/esm/Page/TextLayer.css': false,
    };
    return config;
  },
};

export default nextConfig;
