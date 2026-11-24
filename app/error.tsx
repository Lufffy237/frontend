'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, RefreshCcw, AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Logger l'erreur en console pour le développement
    console.error('Erreur capturée:', error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-surface to-background">
      <div className="max-w-2xl w-full text-center">
        {/* Icône d'erreur animée */}
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: 'easeInOut',
            }}
          >
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </motion.div>
        </motion.div>

        {/* Titre */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-secondary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Une erreur est survenue
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-muted text-lg mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Nous nous excusons pour la gêne occasionnée. 
          Notre équipe technique a été notifiée et travaille à résoudre ce problème.
        </motion.p>

        {/* Code d'erreur (développement uniquement) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            className="mb-8 p-4 rounded-lg bg-red-50 border border-red-200 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <p className="text-xs font-mono text-red-900 break-all">
              <strong>Message :</strong> {error.message}
              {error.digest && <><br /><strong>Digest :</strong> {error.digest}</>}
            </p>
          </motion.div>
        )}

        {/* Boutons d'action */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-soft hover:bg-primary-hover hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
          >
            <RefreshCcw className="w-4 h-4" />
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border-2 border-border text-secondary font-semibold hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </motion.div>

        {/* Message de réassurance */}
        <motion.p
          className="mt-10 text-sm text-muted italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          "Propre c'est élégant" — et nous faisons de notre mieux pour que tout le soit, 
          même nos pages d'erreur.
        </motion.p>
      </div>
    </div>
  );
}