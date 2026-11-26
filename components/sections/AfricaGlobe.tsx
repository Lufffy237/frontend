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
      className="w-full"
    >
      {/* Globe */}
      <div className="relative max-w-5xl mx-auto px-4">
        <svg viewBox="0 0 1000 600" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="oceanGrad" cx="50%" cy="42%" r="62%">
              <stop offset="0%" stopColor="#eef5fc" />
              <stop offset="100%" stopColor="#cfe3f5" />
            </radialGradient>
            <radialGradient id="shadeGrad" cx="50%" cy="45%" r="65%">
              <stop offset="68%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.14)" />
            </radialGradient>
            <clipPath id="globeClip">
              <circle cx="500" cy="300" r="270" />
            </clipPath>
          </defs>

          {/* Ombre au sol */}
          <ellipse cx="500" cy="588" rx="250" ry="16" fill="#000" opacity="0.06" />

          {/* Océan */}
          <circle cx="500" cy="300" r="270" fill="url(#oceanGrad)" />

          <g clipPath="url(#globeClip)">
            {/* Grille latitudes / longitudes */}
            <g stroke="#b9d2ea" fill="none" strokeWidth="0.8" opacity="0.55">
              <line x1="230" y1="300" x2="770" y2="300" />
              <ellipse cx="500" cy="300" rx="270" ry="90" />
              <ellipse cx="500" cy="300" rx="270" ry="180" />
              <ellipse cx="500" cy="300" rx="90" ry="270" />
              <ellipse cx="500" cy="300" rx="180" ry="270" />
            </g>

            {/* Continents gris clair */}
            <g fill="#dde5ee">
              <path d="M430,150 L520,145 L545,180 L520,220 L470,225 L440,195 Z" />
              <path d="M470,250 L560,250 L590,300 L580,360 L600,420 L540,470 L490,450 L460,380 L455,320 Z" />
              <path d="M550,180 L680,200 L700,260 L640,290 L580,260 L560,220 Z" />
            </g>

            {/* Afrique centrale en orange (Tchad, Cameroun, Gabon, Congo, Guinée Eq.) */}
            <path
              d="M495,255 L545,260 L560,300 L535,330 L550,370 L530,410 L550,450 L515,470 L490,450 L500,410 L475,380 L485,340 L465,310 L485,275 Z"
              fill="#FF6600"
            />
          </g>

          {/* Ombre 3D + contour */}
          <circle cx="500" cy="300" r="270" fill="url(#shadeGrad)" />
          <circle cx="500" cy="300" r="270" fill="none" stroke="#c7d8e8" strokeWidth="1" />
        </svg>
      </div>

      {/* Barre de statistiques */}
      <div className="bg-[#141414] mt-6">
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