'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, MapPin, Phone, ChevronRight } from 'lucide-react';
import { NavItem } from '@/lib/navigation';
import { Logo } from '@/components/ui/Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  ctaItems: NavItem[];
  isActive: (href: string) => boolean;
}

export function MobileMenu({ isOpen, onClose, navItems, ctaItems, isActive }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden flex flex-col shadow-elevated"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            {/* Header du menu */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <Logo variant="compact" />
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-5">
              <ul className="space-y-1">
                {navItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`
                          flex items-center justify-between px-4 py-3 rounded-lg
                          text-base font-medium transition-all duration-200
                          ${active
                            ? 'bg-primary text-white shadow-soft'
                            : 'text-secondary hover:bg-surface'
                          }
                        `}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span>{item.label}</span>
                        {active ? (
                          <span className="w-2 h-2 rounded-full bg-white" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Séparateur */}
              <div className="my-4 border-t border-border" />

              {/* CTA */}
              <div className="space-y-2">
                {ctaItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + index) * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`
                        flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-lg
                        text-base font-semibold transition-all duration-300
                        ${item.href === '/agences'
                          ? 'bg-primary text-white shadow-soft'
                          : 'bg-secondary text-white shadow-soft'
                        }
                      `}
                    >
                      {item.href === '/agences' && <MapPin className="w-5 h-5" />}
                      {item.href === '/contact' && <Phone className="w-5 h-5" />}
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Footer du menu */}
            <div className="p-5 border-t border-border bg-surface">
              <p className="text-xs text-muted text-center">
                © {new Date().getFullYear()} Élégance Pressing
              </p>
              <p className="text-xs text-primary text-center italic mt-1">
                Propre c'est élégant
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}