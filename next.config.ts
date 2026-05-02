import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/dashboard/farm-map",
        destination: "/dashboard/field-management",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
