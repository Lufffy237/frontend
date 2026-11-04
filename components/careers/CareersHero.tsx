'use client';

import { motion } from 'framer-motion';

export function CareersHero() {
  return (
    <section className="relative bg-secondary text-white overflow-hidden min-h-[500px] md:min-h-[600px]">
      {/* ============================================
          ÉLÉMENTS DÉCORATIFS D'ARRIÈRE-PLAN
          ============================================ */}
      
      {/* Grand cercle fin en haut à droite */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/10 pointer-events-none" />
      
      {/* Petit cercle fin en bas à gauche */}
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full border border-white/10 pointer-events-none" />
      
      {/* Points décoratifs */}
      <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-primary pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/5 w-2 h-2 rounded-full bg-white/40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-white/20 pointer-events-none" />

      {/* ============================================
          CONTENU PRINCIPAL
          ============================================ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[400px]">
          
          {/* Colonne gauche : Texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Rejoignez la Maison ELP
            </h1>
            
            <p className="text-gray-300 leading-relaxed mb-4 text-base md:text-lg">
              Sous l'impulsion de la vision stratégique de l'Honorable Manfouo David, 
              notre équipe dirigeante place l'intégrité, le dynamisme et la transmission 
              des gestes de l'art au cœur de son management.
            </p>
            
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              Nous ne recherchons pas de simples collaborateurs, mais les futurs gardiens 
              de notre standard de prestige. Que ce soit au sein de nos pôles administratifs, 
              logistiques ou au cœur de nos ateliers techniques, chaque profil est accompagné 
              pour exprimer son plein potentiel.
            </p>
          </motion.div>

          {/* Colonne droite : Images circulaires */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:flex items-center justify-center h-[450px]"
          >
            {/* Grand cercle central */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full overflow-hidden border-4 border-primary shadow-2xl z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face"
                alt="Collaborateur ELP - Homme en chemise blanche"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Petit cercle haut droit - Femme avec casque */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-4 right-4 w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
                alt="Collaboratrice ELP - Femme en gilet orange"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Petit cercle bas gauche - Homme */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute bottom-8 left-4 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"
                alt="Collaborateur ELP"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Point orange décoratif en bas à droite */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="absolute bottom-12 right-16 w-4 h-4 rounded-full bg-primary z-30"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}