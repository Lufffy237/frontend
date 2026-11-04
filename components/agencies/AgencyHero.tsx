'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface AgencyHeroProps {
  onFindNearest: () => void;
  stats: {
    agencies: number;
    depots: number;
    countries: number;
    regions: number;
  };
}

export function AgencyHero({ onFindNearest, stats }: AgencyHeroProps) {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Image de fond - fourgon */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&h=1000&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Statistiques en haut */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-10 bg-white/95 backdrop-blur-sm rounded-lg px-6 py-4 shadow-medium">
            {/* Bouton agence la plus proche */}
            <button
              onClick={onFindNearest}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold shadow-soft hover:bg-primary-hover hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300"
            >
              <MapPin className="w-4 h-4" />
              L'agence La Plus Proche
            </button>

            {/* Stats */}
            <div className="flex items-center gap-6 md:gap-10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  {stats.agencies}
                </div>
                <div className="text-xs md:text-sm text-muted font-medium">
                  Agences
                </div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  {stats.depots}
                </div>
                <div className="text-xs md:text-sm text-muted font-medium">
                  Dépôts
                </div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  {stats.countries}
                </div>
                <div className="text-xs md:text-sm text-muted font-medium">
                  Pays
                </div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  {stats.regions}
                </div>
                <div className="text-xs md:text-sm text-muted font-medium">
                  Régions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bloc orange descriptif */}
      <div className="absolute bottom-12 left-4 md:left-12 lg:left-20 z-10 max-w-lg">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-primary text-white p-6 md:p-8 rounded-lg shadow-elevated"
        >
          <p className="text-sm md:text-base leading-relaxed">
            Fort d'un maillage stratégique s'étendant sur cinq pays clés : le Cameroun, le Tchad, 
            la Guinée Équatoriale, le Congo et le Gabon, le réseau d'Élégance Pressing orchestré 
            par ELP s'impose comme le leader incontesté du soin textile en Afrique Centrale.
          </p>
          <p className="text-sm md:text-base leading-relaxed mt-4">
            Pour assurer la fluidité absolue de nos services, notre important parc automobile de 
            relais rapide déploie une logistique de pointe, connectant quotidiennement nos agences, 
            nos ateliers et nos centres de dépôts. Cette flotte moderne garantit un acheminement 
            sécurisé et ultra-réactif du linge, offrant une rigueur opérationnelle zéro défaut aussi 
            bien à nos clients particuliers qu'à nos hôtels et institutions partenaires de confiance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}