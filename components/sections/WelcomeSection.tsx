'use client';

import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { AfricaGlobe } from './AfricaGlobe';

export function WelcomeSection() {
  return (
    <section className="relative py-20 bg-surface overflow-hidden">
      {/* Motif décoratif en arrière-plan */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            #FF6600 35px,
            #FF6600 36px
          )`,
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-block bg-white p-4 rounded-lg shadow-soft">
            <Logo variant="compact" />
          </div>
        </motion.div>

        {/* Titre */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary mb-4 tracking-wide"
        >
          BIENVENUE CHEZ ÉLÉGANCE PRESSING
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted font-medium mb-8"
        >
          Le Leader Historique Et Institutionnel En Afrique Centrale
        </motion.p>

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

        {/* Globe avec Afrique */}
        <AfricaGlobe />
      </div>
    </section>
  );
}
