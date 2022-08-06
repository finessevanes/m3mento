/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["opensea.mypinata.cloud", "openseauserdata.com", "ipfs.infura.io"],
  },
};

module.exports = nextConfig;
