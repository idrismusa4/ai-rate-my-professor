/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.nileuniversity.edu.ng',
          },
        ],
      },
};

export default nextConfig;
