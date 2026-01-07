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
  // Turbopack config for development
  turbopack: {
    resolveAlias: {
      // Redirect react-pdf CSS imports to empty file since they don't exist
      'react-pdf/dist/esm/Page/AnnotationLayer.css': './src/lib/empty.css',
      'react-pdf/dist/esm/Page/TextLayer.css': './src/lib/empty.css',
    },
  },
  // Webpack config for production builds
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-pdf/dist/esm/Page/AnnotationLayer.css': require.resolve('./src/lib/empty.css'),
      'react-pdf/dist/esm/Page/TextLayer.css': require.resolve('./src/lib/empty.css'),
    };
    return config;
  },
};

export default nextConfig;
