import { NextConfig } from "next/dist/types";


const nextConfig: NextConfig = {
  /* config options here */
  //  productionBrowserSourceMaps: false,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  reactCompiler: true,
};

export default nextConfig;
