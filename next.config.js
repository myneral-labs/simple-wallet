/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
  skipWaiting: true,
  register: true,
});

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  env: {
    SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
    JSON_RPC_URL: process.env.JSON_RPC_URL,
  },
};

// If the EXPORT environment variable is set to '1', set output to 'export'
if (process.env.EXPORT === '1') {
  nextConfig.output = 'export';
}

module.exports = withPWA(nextConfig);
