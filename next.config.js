/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    seed: process.env.SIGNER_KEY,
    koinCityContract: process.env.CONTRACT_ADDRESS,
  },
};

module.exports = nextConfig;
