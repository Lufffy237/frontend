import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { Toaster } from 'sonner';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Élégance Pressing | Blanchisserie haut de gamme en Afrique centrale',
    template: '%s | Élégance Pressing',
  },
  description: 'Élégance Pressing offre des services de blanchisserie, nettoyage à sec et hygiène de haute qualité. Propre c\'est élégant.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-background text-secondary">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        
        <Toaster 
          position="top-right" 
          richColors 
          expand={false}
          closeButton
          toastOptions={{ duration: 4000 }}
        />
      </body>
    </html>
  );
}