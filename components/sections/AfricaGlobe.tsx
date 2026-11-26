'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '36+', label: "ANNÉES D'EXPÉRIENCE" },
  { value: '5', label: 'Pays' },
  { value: '15+', label: 'Provinces' },
  { value: '40+', label: 'Agences' },
  { value: '10Mrds+', label: 'Pièces nettoyées' },
];

export function AfricaGlobe() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-10 w-full mt-12"
    >
      {/* ===== Globe géant débordant ===== */}
      <div className="relative w-full overflow-hidden flex justify-center">
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid meet"
          className="w-full max-w-[1100px] h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="oceanGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f2f7fc" />
              <stop offset="100%" stopColor="#d6e6f6" />
            </radialGradient>
            <radialGradient id="shadeGrad" cx="50%" cy="42%" r="62%">
              <stop offset="70%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
            </radialGradient>
            <clipPath id="globeClip">
              <circle cx="500" cy="560" r="520" />
            </clipPath>
          </defs>

          {/* Océan : cercle géant (sommet visible, côtés coupés, bas caché par la barre) */}
          <circle cx="500" cy="560" r="520" fill="url(#oceanGrad)" />

          <g clipPath="url(#globeClip)">
            {/* Grille latitudes / longitudes */}
            <g stroke="#c2d6ec" fill="none" strokeWidth="0.9" opacity="0.5">
              <line x1="-20" y1="560" x2="1020" y2="560" />
              <ellipse cx="500" cy="560" rx="520" ry="150" />
              <ellipse cx="500" cy="560" rx="520" ry="320" />
              <ellipse cx="500" cy="560" rx="150" ry="520" />
              <ellipse cx="500" cy="560" rx="320" ry="520" />
            </g>

            {/* Continents gris-blanc (Europe, Afrique, Asie, Moyen-Orient) */}
            <g fill="#eef2f6" stroke="#dde5ee" strokeWidth="0.6">
              {/* Europe */}
              <path d="M470,300 L560,290 L585,330 L560,370 L505,375 L475,345 Z" />
              {/* Moyen-Orient / Asie */}
              <path d="M590,330 L700,345 L720,410 L650,440 L600,410 L585,370 Z" />
              {/* Afrique (base gris) */}
              <path d="M470,400 L560,400 L595,455 L580,520 L600,585 L535,640 L480,620 L450,545 L445,470 Z" />
            </g>

            {/* ===== Afrique centrale surlignée en ORANGE (Tchad, Cameroun, Gabon, Congo, Guinée Eq.) ===== */}
            <path
              d="M500,405 L548,410 L562,452 L540,482 L556,520 L535,560 L552,600 L520,622 L495,602 L505,560 L480,530 L490,492 L470,462 L488,428 Z"
              fill="#FF6600"
            />
          </g>

          {/* Ombre 3D + contour du globe */}
          <circle cx="500" cy="560" r="520" fill="url(#shadeGrad)" />
          <circle cx="500" cy="560" r="520" fill="none" stroke="#c7d8e8" strokeWidth="1.2" />
        </svg>
      </div>

      {/* ===== Barre noire des statistiques (recoupe le bas du globe) ===== */}
      <div className="relative z-20 -mt-10 md:-mt-16 bg-[#141414]">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="text-2xl md:text-3xl font-extrabold text-[#FF6600] leading-tight">
                {s.value}
              </div>
              <div className="text-[11px] md:text-xs text-gray-300 uppercase tracking-wide mt-1">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}