/* eslint-disable import/no-extraneous-dependencies */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withPWA = require('next-pwa');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['miko-image.s3.ap-northeast-2.amazonaws.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    reactRoot: true,
    nextScriptWorkers: true,
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withPlugins([
  // [
  //   withBundleAnalyzer,
  //   {
  //     enabled: process.env.ANALYZE === 'true',
  //   },
  // ],
  // [
  //   withPWA,
  //   {
  //     pwa: {
  //       dest: 'public',
  //       register: true,
  //       skipWaiting: true,
  //       disable: process.env.NODE_ENV === 'development',
  //     },
  //   },
  // ],
  nextConfig,
]);
