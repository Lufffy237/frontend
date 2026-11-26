'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { AfricaGlobe } from './AfricaGlobe';

export function WelcomeSection() {
  return (
    <section className="relative py-24 bg-surface overflow-hidden">
      {/* ===== Motif décoratif losanges / X — SUBTIL comme la capture ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waxPattern" width="90" height="90" patternUnits="userSpaceOnUse">
              <g
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeOpacity="0.10"
              >
                {/* Croix X */}
                <path d="M14,14 L34,34 M34,14 L14,34" />
                {/* Losange */}
                <path d="M60,40 L78,58 L60,76 L42,58 Z" />
                {/* Petits points */}
                <circle cx="24" cy="60" r="1.6" fill="#ffffff" stroke="none" fillOpacity="0.10" />
                <circle cx="70" cy="20" r="1.6" fill="#ffffff" stroke="none" fillOpacity="0.10" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waxPattern)" />
        </svg>
      </div>

      {/* ===== Bloc texte centré ===== */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo TRÈS GRAND, centré, sans boîte.
            Le wrapper masque tout texte enfant (p/h3/h4/span) = le tagline
            "Propre c'est élégant" interne à Logo, SANS modifier Logo.tsx. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex justify-center"
        >
          <div className="w-[380px] sm:w-[440px] md:w-[520px] lg:w-[560px] mx-auto [&_svg]:w-full [&_svg]:h-auto [&_img]:w-full [&_img]:h-auto [&_p]:hidden [&_h3]:hidden [&_h4]:hidden [&_span]:hidden">
            <Logo variant="compact" />
          </div>
        </motion.div>

        {/* Titre + DEPUIS 1990 en INDICE (subscript) collé sous la fin de PRESSING */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-4 tracking-wide"
        >
          BIENVENUE À ÉLÉGANCE PRESSING
          <span className="align-sub text-[8px] md:text-[10px] font-bold ml-0.5 whitespace-nowrap">
            DEPUIS 1990
          </span>
        </motion.h2>

        {/* Ligne de séparation courte et fine, centrée */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-36 md:w-44 h-[2px] bg-secondary/70 mx-auto mb-8"
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

      {/* ===== Globe géant + barre stats (PLEINE largeur) ===== */}
      <AfricaGlobe />
    </section>
  );
}