/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["uploadthing.com", "utfs.io"],
    remotePatterns: [
      {
        hostname: "uploadthing.com",
        protocol: "https",
      },
      {
        hostname: "utfs.io",
        protocol: "https",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactStrictMode: false,
}

export default nextConfig
