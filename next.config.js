/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = require('next-pwa');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['miko-image.s3.ap-northeast-2.amazonaws.com'],
  },
  typescript: {
    ignoreBuildErrors: true, // dangerous
  },
  eslint: {
    ignoreDuringBuilds: true, // dangerous
  },
  experimental: {
    reactRoot: true,
    nextScriptWorkers: true,
    modularizeImports: {},
  },
  compiler: {
    removeConsole: {
      exclude: ['error', 'info'],
    },
  },
  productionBrowserSourceMaps: false, // default false
  swcMinify: true,
  reactStrictMode: true,
  compress: true, // default nginx에서 압축할 경우 false
  distDir: '.next', // default
  generateBuildId: async () => {
    return Date.now().toString(); // 다중 서버를 할 경우 같은 값이 되어야함.
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
      },
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      },
    ];
  },
};

module.exports = withPlugins([
  [withBundleAnalyzer],
  [
    withPWA,
    {
      pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development',
      },
    },
  ],
  nextConfig,
]);
