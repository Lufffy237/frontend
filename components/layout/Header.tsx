'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { NAV_ITEMS, NAV_CTA } from '@/lib/navigation';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-40 w-full
          transition-all duration-300 ease-out
          ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft py-3'
            : 'bg-transparent py-5'
          }
        `}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo variant={isScrolled ? 'compact' : 'full'} />

            {/* Navigation desktop */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-4 py-2 text-sm font-medium rounded-lg
                      transition-all duration-300 ease-out
                      ${active
                        ? 'text-primary bg-primary/5'
                        : 'text-secondary hover:text-primary hover:bg-primary/5'
                      }
                    `}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                    {/* Indicateur de page active */}
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {NAV_CTA.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
                    transition-all duration-300 ease-out
                    ${item.href === '/agences'
                      ? 'bg-primary text-white shadow-soft hover:bg-primary-hover hover:shadow-medium hover:-translate-y-0.5'
                      : 'bg-secondary text-white shadow-soft hover:bg-secondary-light hover:shadow-medium hover:-translate-y-0.5'
                    }
                    active:translate-y-0
                  `}
                >
                  {item.href === '/agences' && <MapPin className="w-4 h-4" />}
                  {item.href === '/contact' && <Phone className="w-4 h-4" />}
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-secondary hover:bg-surface transition-colors"
              aria-label="Ouvrir le menu"
              aria-expanded={isMobileOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navItems={NAV_ITEMS}
        ctaItems={NAV_CTA}
        isActive={isActive}
      />
    </>
  );
}