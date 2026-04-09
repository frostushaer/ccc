import { withContentlayer } from "next-contentlayer"

import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module: /@contentlayer\/core\/dist/,
        message:
          /Build dependencies behind this expression are ignored and might cause incorrect cache invalidation/,
      },
      {
        module: /@contentlayer\/core\/dist/,
        message: /Parsing of .* for build dependencies failed at/,
      },
    ]

    return config
  },
}

export default withContentlayer(nextConfig)
