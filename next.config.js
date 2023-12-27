/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          '@': path.resolve(__dirname, './'),
        };
    
        return config;
      },
};

module.exports = nextConfig;
