'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { AfricaGlobe } from './AfricaGlobe';

export function WelcomeSection() {
  return (
    <section className="relative py-20 bg-surface overflow-hidden">
      {/* ===== Motif décoratif losanges / X (comme sur les captures) ===== */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.55]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waxPattern" width="90" height="90" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round">
                {/* Croix X */}
                <path d="M14,14 L34,34 M34,14 L14,34" />
                {/* Losange */}
                <path d="M60,40 L78,58 L60,76 L42,58 Z" />
                {/* Petits points */}
                <circle cx="24" cy="60" r="1.6" fill="#ffffff" stroke="none" />
                <circle cx="70" cy="20" r="1.6" fill="#ffffff" stroke="none" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waxPattern)" />
        </svg>
      </div>

      {/* ===== Bloc texte centré ===== */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo GRAND, centré, sans boîte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex justify-center"
        >
          <div className="w-[300px] sm:w-[360px] md:w-[420px] mx-auto">
            <Logo variant="compact" />
          </div>
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
          <span className="align-super text-[9px] md:text-[11px] font-bold ml-1 whitespace-nowrap">
            DEPUIS 1990
          </span>
        </motion.h2>

        {/* Ligne de séparation courte */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-20 md:w-24 h-[2px] bg-secondary/80 mx-auto mb-8"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm md:text-base text-muted leading-relaxed max-w-3xl mx-auto"
        >
          Fondé il y a plus de 35 ans, Élégance Pressing est reconnu pour ses standards d'exception
          en matière de nettoyage à sec, de blanchisserie, de retouches et de restauration de vêtements.
          Notre réputation repose sur un savoir-faire méticuleux, un service personnalisé et un engagement
          continu à préserver la qualité de vos pièces les plus précieuses. Cette quête permanente de
          perfection fait d'Élégance Pressing la référence absolue du soin du linge haut de gamme.
        </motion.p>
      </div>

      {/* ===== Globe géant + barre stats (PLEINE largeur, hors du bloc texte) ===== */}
      <AfricaGlobe />
    </section>
  );
}