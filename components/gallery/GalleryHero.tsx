'use client';

import { motion } from 'framer-motion';

export function GalleryHero() {
  return (
    <section className="relative bg-secondary text-white overflow-hidden">
      {/* Motif cercle pointillé décoratif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <svg viewBox="0 0 600 600" className="w-full h-full opacity-10">
          <circle
            cx="300"
            cy="300"
            r="280"
            fill="none"
            stroke="#FF6600"
            strokeWidth="2"
            strokeDasharray="8 8"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-none tracking-tight">
              RETOUR
              <br />
              EN
              <br />
              IMAGES
            </h1>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Explorez nos galeries pour revivre les événements marquants de notre Maison : 
              des lancement de nos agences à travers l'Afrique Centrale aux moments forts de 
              nos équipes, en passant par les distinctions qui couronnent notre savoir-faire unique.
            </p>
          </motion.div>

          {/* Collage d'images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:grid grid-cols-2 gap-3"
          >
            {/* Image 1 - grande */}
            <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden h-64">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=600&fit=crop"
                alt="Événement ELP"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Image 2 */}
            <div className="rounded-2xl overflow-hidden h-32">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
                alt="Cérémonie"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Image 3 - noir et blanc */}
            <div className="rounded-2xl overflow-hidden h-32">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop"
                alt="Équipe"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}