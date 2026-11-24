/** @type {import('next').NextConfig} */
const nextConfig = {
  // âœ… INDISPENSABLE pour cPanel : gÃ©nÃ¨re un serveur Node.js lÃ©ger et autonome
  output: 'standalone',
  
  // âœ… VOTRE configuration d'images (conservÃ©e intacte)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // âœ… VOTRE configuration ESLint (conservÃ©e intacte)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;