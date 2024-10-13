/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
    };
    return config;
  },
};

export default nextConfig;