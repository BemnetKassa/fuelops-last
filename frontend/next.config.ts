import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: {
    allowedDevOrigins: ["http://10.144.56.37:3000"],
  },
};

export default nextConfig;
