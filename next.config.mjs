import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './');
    return config;
  },
};

export default nextConfig;