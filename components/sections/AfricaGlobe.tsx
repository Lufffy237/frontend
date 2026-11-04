'use client';

import { motion } from 'framer-motion';

export function AfricaGlobe() {
  return (
    <div className="relative w-full max-w-md mx-auto mt-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative"
      >
        {/* Globe terrestre SVG */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cercle de base (océan) */}
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="#E5E7EB"
            opacity="0.3"
          />

          {/* Continents simplifiés (gris clair) */}
          <g fill="#D1D5DB" opacity="0.5">
            {/* Amérique du Nord */}
            <path d="M 80 120 Q 100 100, 130 110 Q 150 120, 140 140 Q 130 160, 110 150 Q 90 140, 80 120 Z" />
            {/* Amérique du Sud */}
            <path d="M 120 180 Q 140 170, 150 190 Q 160 220, 140 250 Q 120 270, 110 240 Q 100 210, 120 180 Z" />
            {/* Europe */}
            <path d="M 180 100 Q 200 90, 220 100 Q 230 110, 220 120 Q 200 130, 180 120 Q 170 110, 180 100 Z" />
            {/* Asie */}
            <path d="M 230 110 Q 260 100, 290 120 Q 310 140, 300 160 Q 280 170, 260 160 Q 240 150, 230 130 Q 220 120, 230 110 Z" />
            {/* Australie */}
            <path d="M 280 240 Q 300 230, 310 250 Q 320 270, 300 280 Q 280 290, 270 270 Q 260 250, 280 240 Z" />
          </g>

          {/* Afrique (orange) */}
          <motion.path
            d="M 180 160 Q 200 150, 220 160 Q 240 180, 230 210 Q 220 240, 200 260 Q 180 270, 170 250 Q 160 220, 170 190 Q 175 170, 180 160 Z"
            fill="#FF6600"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          />

          {/* Lignes de latitude/longitude décoratives */}
          <g stroke="#D1D5DB" strokeWidth="1" opacity="0.3" fill="none">
            <ellipse cx="200" cy="200" rx="180" ry="60" />
            <ellipse cx="200" cy="200" rx="180" ry="120" />
            <line x1="20" y1="200" x2="380" y2="200" />
            <line x1="200" y1="20" x2="200" y2="380" />
          </g>
        </svg>

        {/* Points pulsants sur l'Afrique */}
        <motion.div
          className="absolute"
          style={{ top: '55%', left: '50%' }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-3 h-3 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </div>
  );
}