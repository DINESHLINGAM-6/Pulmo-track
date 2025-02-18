/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [];
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
};

console.log('Next.js Config Loaded');

export default nextConfig;
