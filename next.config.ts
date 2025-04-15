import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  /* config options here */
  env: {
    NEXTAUTH_URL: "http://34.224.67.13:3000",
  },
};

export default nextConfig;
