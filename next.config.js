/** @type {import('next').NextConfig} */
const nextConfig = {
  // âœ… INDISPENSABLE pour cPanel : génère un serveur Node.js léger et autonome
  output: 'standalone',
  
  // âœ… VOTRE configuration d'images (conservée intacte)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // âœ… VOTRE configuration ESLint (conservée intacte)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;