import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript:{
    ignoreBuildErrors:true
  },
  serverExternalPackages:['mongoose'],
  images:{
    domains:['m.media-amazon.com']
  }
};

export default nextConfig;
