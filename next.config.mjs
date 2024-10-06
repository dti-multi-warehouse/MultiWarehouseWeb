/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
    },
    output: 'standalone',
    typescript: {
      ignoreBuildErrors: true,
    },
    webpack: (config) => {
      config.resolve.alias['@'] = path.resolve(__dirname, './'); // or './' if you're not using 'src'
      return config;
    },
  };
  
  export default nextConfig;
  