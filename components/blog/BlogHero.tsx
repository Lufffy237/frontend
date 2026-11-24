'use client';

import { motion } from 'framer-motion';

export function BlogHero() {
  return (
    <section className="relative bg-white py-16 md:py-20 overflow-hidden">
      {/* Carte du monde en arrière-plan */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          <path
            d="M150,200 Q200,150 250,180 T350,200 T450,180 T550,200 T650,180 T750,200"
            fill="none"
            stroke="#FF6600"
            strokeWidth="2"
          />
          {/* Simplification - en production utilisez une vraie carte SVG */}
          <circle cx="200" cy="250" r="150" fill="#FF6600" opacity="0.1" />
          <circle cx="600" cy="200" r="200" fill="#FF6600" opacity="0.1" />
          <circle cx="850" cy="250" r="100" fill="#FF6600" opacity="0.1" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-secondary mb-4"
        >
          L'Espace Info
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted text-lg max-w-3xl mx-auto"
        >
          Découvrez l'actualité vie à travers notre espace dédié aux opportunités de carrière, aux grands faits de société et aux conseils de nos experts.
        </motion.p>
      </div>
    </section>
  );
}