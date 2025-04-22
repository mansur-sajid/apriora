import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXTAUTH_URL: "http://34.224.67.13:3000",
    NEXTAUTH_SECRET: "n6n3EdXvue3++hXvqTl+gxjy18fDSvtvuGyQuGehpj0=",
    output: 'export',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
