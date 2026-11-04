'use client';

import { motion } from 'framer-motion';

export function CraftsmanshipSection() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Image du costume */}
          <div className="relative overflow-hidden rounded-lg shadow-elevated">
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=800&fit=crop"
              alt="Costume sur mannequin - Élégance Pressing"
              className="w-full h-[500px] md:h-[600px] object-cover grayscale"
            />
            
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Citation */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white text-base md:text-lg leading-relaxed italic max-w-3xl"
              >
                Redéfinissons votre vision de la perfection. Quand la rigueur rencontre la haute blanchisserie, 
                la propreté trouve sa plus belle expression. Ici, propre n'a jamais été aussi élégant.
              </motion.p>
            </div>
          </div>

          {/* Élément décoratif */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/20 rounded-lg -z-10" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/20 rounded-lg -z-10" />
        </motion.div>
      </div>
    </section>
  );
}