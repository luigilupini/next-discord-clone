/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["uploadthing.com", "utfs.io"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactStrictMode: false,
}

export default nextConfig
