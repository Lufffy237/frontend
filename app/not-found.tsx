'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, MapPin, ArrowLeft, Search } from 'lucide-react';
import { AnimatedDove } from '@/components/ui/AnimatedDove';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-surface to-background overflow-hidden">
      <div className="max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Colonne gauche : Illustration */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Halo décoratif */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-64 h-64 rounded-full bg-primary/5"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>

            {/* Colombe animée */}
            <AnimatedDove size={280} className="relative z-10" />

            {/* Chiffre 404 en arrière-plan */}
            <motion.div
              className="absolute -z-10 select-none pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-[200px] md:text-[240px] font-black text-primary/5 leading-none">
                404
              </span>
            </motion.div>
          </motion.div>

          {/* Colonne droite : Contenu */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-light text-primary text-sm font-semibold mb-4">
                Page introuvable
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold text-secondary mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Oups ! <br />
              <span className="text-primary">Cette page</span>
              <br />
              s'est envolée
            </motion.h1>

            <motion.p
              className="text-muted text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              La page que vous cherchez n'existe pas ou a été déplacée. 
              Pas de panique, notre colombe va vous ramener sur le bon chemin.
            </motion.p>

            {/* Boutons d'action */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-soft hover:bg-primary-hover hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
              >
                <Home className="w-4 h-4" />
                Retour à l'accueil
              </Link>
              <Link
                href="/agences"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border-2 border-border text-secondary font-semibold hover:border-primary hover:text-primary transition-all duration-300"
              >
                <MapPin className="w-4 h-4" />
                Trouver une agence
              </Link>
            </motion.div>

            {/* Lien secondaire */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Revenir à la page précédente
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Suggestions de navigation */}
        <motion.div
          className="mt-16 pt-10 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-center text-sm text-muted mb-6">
            Peut-être cherchiez-vous l'une de ces pages ?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Services', href: '/services', icon: Search },
              { label: 'À propos', href: '/a-propos', icon: Search },
              { label: 'Blog', href: '/blog', icon: Search },
              { label: 'Contact', href: '/contact', icon: Search },
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="block p-4 rounded-lg bg-white border border-border hover:border-primary hover:shadow-soft transition-all duration-300 text-center group"
                >
                  <item.icon className="w-4 h-4 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}