/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
    },
    output: 'standalone',
    typescript: {
      ignoreBuildErrors: true,
    },
    webpack: (config) => {
      config.resolve.alias['@'] = path.resolve(__dirname, './');
      return config;
    },
  };
  
  export default nextConfig;
  