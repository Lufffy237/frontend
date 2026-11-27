'use client';

import { motion } from 'framer-motion';
import { Calendar, Globe, Building2, Warehouse, Users, Sparkles } from 'lucide-react';

interface KeyFigure {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const figures: KeyFigure[] = [
  { 
    value: '35+', 
    label: "Années d'expérience",
    icon: <Calendar className="w-6 h-6" />
  },
  { 
    value: '5', 
    label: 'Pays présents',
    icon: <Globe className="w-6 h-6" />
  },
  { 
    value: '15+', 
    label: 'Agences',
    icon: <Building2 className="w-6 h-6" />
  },
  { 
    value: '10+', 
    label: 'Dépôts',
    icon: <Warehouse className="w-6 h-6" />
  },
  { 
    value: '10M+', 
    label: 'Clients satisfaits',
    icon: <Users className="w-6 h-6" />
  },
];

export function KeyFigures() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
      {/* Fond avec gradient animé et particules */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Gradient de fond animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6600] via-[#FF8533] to-[#FFA366] animate-gradient" />
        
        {/* Particules flottantes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Contenu */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-8 md:p-12 lg:p-16"
        >
          {/* Titre avec effet de brillance */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white font-semibold text-sm">Notre Impact</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Des chiffres qui parlent
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Plus de 35 ans d'excellence au service de votre satisfaction
            </p>
          </div>

          {/* Grille de cartes glassmorphism */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {figures.map((figure, index) => (
              <motion.div
                key={figure.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Carte glassmorphism */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl overflow-hidden">
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Contenu */}
                  <div className="relative z-10 text-center">
                    {/* Icône avec cercle lumineux */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm mb-4 group-hover:bg-white/30 transition-colors"
                    >
                      <div className="text-white">
                        {figure.icon}
                      </div>
                    </motion.div>

                    {/* Chiffre avec effet de lueur */}
                    <div className="relative mb-2">
                      <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                        {figure.value}
                      </div>
                      {/* Effet de lueur derrière le chiffre */}
                      <div className="absolute inset-0 blur-xl bg-white/30 -z-10" />
                    </div>

                    {/* Label */}
                    <div className="text-white/90 text-sm font-medium leading-tight">
                      {figure.label}
                    </div>
                  </div>

                  {/* Bordure lumineuse animée */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/40 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Style pour l'animation du gradient */}
      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
}