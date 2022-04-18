const removeImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  trailingSlash: false,
  experimental: { esmExternals: true },
};

module.exports = removeImports(nextConfig);
