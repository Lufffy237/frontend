'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award as AwardIcon, Loader2 } from 'lucide-react';

interface Award {
  id: string;
  title: string;
  year: number;
  issuer: string | null;
  image: string | null;
}

export function AwardsSection() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/awards')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAwards(data.data);
      })
      .catch((err) => console.error('Erreur de chargement des distinctions', err))
      .finally(() => setLoading(false));
  }, []);

  // Ne rien afficher si en chargement ou si aucune distinction n'existe
  if (loading || awards.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Nos Distinctions & Certifications
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            La reconnaissance de notre engagement envers l'excellence, la qualité et la satisfaction de nos clients.
          </p>
        </motion.div>

        {/* Grille des distinctions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-xl border border-border shadow-soft overflow-hidden hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
            >
              {/* Zone Image / Icône de fallback */}
              <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden border-b border-border">
                {award.image ? (
                  <img 
                    src={award.image} 
                    alt={award.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted">
                    <AwardIcon className="w-12 h-12 mb-2 text-primary/50" />
                    <span className="text-xs font-medium uppercase tracking-wider">Certificat</span>
                  </div>
                )}
              </div>

              {/* Zone Texte */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {award.year}
                  </span>
                  {award.issuer && (
                    <span className="text-xs text-muted font-medium">
                      Délivré par {award.issuer}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-secondary leading-snug group-hover:text-primary transition-colors">
                  {award.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}