/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = require('next-pwa');

const ContentSecurityPolicy = `
  media-src blob:;
  worker-src blob:;
  connect-src 'self' localhost:3000 *.live-video.net;
  script-src  'self' localhost:3000 'wasm-unsafe-eval';
`;
// const ContentSecurityPolicy = `
//   media-src blob:;
//   connect-src 'self' *.live-video.net;
//   script-src 'self';
// `;

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
    nextScriptWorkers: false,
    modularizeImports: {},
  },
  compiler: {
    // removeConsole: {
    //   exclude: ['error', 'info'],
    // },
  },
  productionBrowserSourceMaps: false, // default false
  swcMinify: true,
  reactStrictMode: false, // 이거 하니깐 Socket 에러남
  compress: true, // default nginx에서 압축할 경우 false
  distDir: '.next', // default
  generateBuildId: async () => {
    return Date.now().toString(); // 다중 서버를 할 경우 같은 값이 되어야함.
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // {
          //   key: 'Content-Security-Policy',
          //   value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          // },
        ],
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
