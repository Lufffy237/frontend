'use client';

import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal } from 'lucide-react';

interface AwardItem {
  id: string;
  title: string;
  year: string;
  issuer: string;
  image: string;
  // Pour remplacer plus tard :
  // image: '/images/awards/certificat-1.png'
}

// 🔧 À REMPLACER par vos certificats locaux quand vous les aurez
const awards: AwardItem[] = [
  {
    id: '1',
    title: 'Certificat de Bénéficiaire',
    year: '2020',
    issuer: 'Union Européenne',
    image: 'https://placehold.co/300x400/FF6600/FFFFFF?text=CERTIFICAT+2020&font=playfair-display',
  },
  {
    id: '2',
    title: 'Prix d\'Excellence',
    year: '2019',
    issuer: 'Chambre de Commerce',
    image: 'https://placehold.co/300x400/1A1A1A/FFFFFF?text=PRIX+2019&font=playfair-display',
  },
  {
    id: '3',
    title: 'Certificat de Reconnaissance',
    year: '2021',
    issuer: 'Ministère du Commerce',
    image: 'https://placehold.co/300x400/0066CC/FFFFFF?text=CERTIFICAT+2021&font=playfair-display',
  },
  {
    id: '4',
    title: 'Certificat de Qualité',
    year: '2022',
    issuer: 'ISO 9001',
    image: 'https://placehold.co/300x400/00AA00/FFFFFF?text=ISO+9001&font=playfair-display',
  },
];

const icons = [Award, Trophy, Star, Medal];

export function AwardsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            UN SAVOIR-FAIRE COURONNÉ D'EXCELLENCE
          </h2>
          <p className="text-primary font-semibold text-sm tracking-wider mb-6">
            NOS DISTINCTIONS & PRIX HONORIFIQUES DEPUIS 1990
          </p>
          <p className="text-muted text-sm md:text-base max-w-4xl mx-auto leading-relaxed">
            Au cours de plus de 35 ans d'histoire, la constance, la qualité de service et la rigueur 
            opérationnelle de la Maison ELP ont été régulièrement saluées au plus haut niveau. 
            Plus que de simples récompenses, ces distinctions honorifiques décernées par des institutions 
            majeures célèbrent notre engagement inéfectible pour l'excellence et confirment notre statut 
            de leader du pressing haut de gamme.
          </p>
        </motion.div>

        {/* Grille de certificats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {awards.map((award, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-surface rounded-lg border border-border p-6 hover:border-primary hover:shadow-medium transition-all duration-300">
                  {/* Icône */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-light flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Image certificat */}
                  <div className="aspect-[3/4] mb-4 overflow-hidden rounded border-2 border-border">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Infos */}
                  <div className="text-center">
                    <h3 className="font-bold text-secondary text-sm mb-1">
                      {award.title}
                    </h3>
                    <p className="text-xs text-muted mb-1">
                      {award.issuer}
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold">
                      {award.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}