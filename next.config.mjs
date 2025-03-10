/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
    NEXT_URL: process.env.NEXT_URL,
    NEXT_RESTAURANT_ID: process.env.NEXT_RESTAURANT_ID,
    NEXT_STRIPE_PUBLIC_KEY: process.env.NEXT_STRIPE_PUBLIC_KEY,
    NEXT_STRIPE_SECRET_KEY: process.env.NEXT_STRIPE_SECRET_KEY,
  },
  images: {
    domains: ["files.stripe.com"],
  },
};

export default nextConfig;
