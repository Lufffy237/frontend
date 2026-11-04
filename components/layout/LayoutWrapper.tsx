'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  // Si on est dans l'admin, on n'affiche QUE le contenu (le layout admin gère tout)
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Sinon, on affiche le site public avec Header et Footer
  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}