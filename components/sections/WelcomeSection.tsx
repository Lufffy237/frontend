'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { AfricaGlobe } from './AfricaGlobe';

export function WelcomeSection() {
  return (
    <section className="relative py-20 bg-surface overflow-hidden">
      {/* Motif décoratif discret en arrière-plan (gris subtil) */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 28px, #444 28px, #444 29px),
              repeating-linear-gradient(-45deg, transparent, transparent 28px, #444 28px, #444 29px)
            `,
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo grand, centré, sans boîte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <Logo variant="compact" />
        </motion.div>

        {/* Titre + DEPUIS 1990 en exposant */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-3 tracking-wide"
        >
          BIENVENUE À ÉLÉGANCE PRESSING
          <span className="align-super text-[10px] md:text-xs font-bold ml-1 whitespace-nowrap">
            DEPUIS 1990
          </span>
        </motion.h2>

        {/* Ligne de séparation courte */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-16 md:w-20 h-[2px] bg-secondary/80 mx-auto mb-8"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-base text-muted leading-relaxed max-w-3xl mx-auto mb-12"
        >
          Fondé il y a plus de 35 ans, Élégance Pressing est reconnu pour ses standards d'exception 
          en matière de nettoyage à sec, de blanchisserie, de retouches et de restauration de vêtements. 
          Notre réputation repose sur un savoir-faire méticuleux, un service personnalisé et un engagement 
          continu à préserver la qualité de vos pièces les plus précieuses. Cette quête permanente de 
          perfection fait d'Élégance Pressing la référence absolue du soin du linge haut de gamme.
        </motion.p>

        {/* Globe Afrique + statistiques */}
        <AfricaGlobe />
      </div>
    </section>
  );
}