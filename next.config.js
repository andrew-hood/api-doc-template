/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  trailingSlash: false,
  env: {
    API_URL: "public/api.json",
  },
};

module.exports = nextConfig;
