/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
      domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    },
    output: 'export',
    basePath: '/kamome',
  };
  
  export default nextConfig;