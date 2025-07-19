/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'content.jdmagicbox.com',
      'natnavi.com',
      'www.wise-it.com.hk',
      'focus.hidubai.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['@ant-design/icons'],
  },
};

export default nextConfig;
