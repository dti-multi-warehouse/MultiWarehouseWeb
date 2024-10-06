/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
    },
    output: 'standalone',
    typescript: {
      ignoreBuildErrors: true,
    },
  };
  
  export default nextConfig;
  