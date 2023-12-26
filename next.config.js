/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL || process.env.VERCEL_URL,
  },
};

module.exports = nextConfig;
