'use client';

import { motion } from 'framer-motion';

interface Partner {
  id: string;
  name: string;
  logo: string;
  // Pour remplacer plus tard par vos logos locaux :
  // logo: '/images/partners/nom-du-logo.png'
}

// 🔧 À REMPLACER par vos logos locaux quand vous les aurez
// Exemple : { id: '1', name: 'Tulip', logo: '/images/partners/tulip.png' }
const partners: Partner[] = [
  { id: '1', name: 'Tulip', logo: 'https://placehold.co/120x60/FF6600/FFFFFF?text=TULIP&font=playfair-display' },
  { id: '2', name: 'Hôtel Bel Ami', logo: 'https://placehold.co/120x60/1A1A1A/FFFFFF?text=BEL+AMI&font=playfair-display' },
  { id: '3', name: 'Business', logo: 'https://placehold.co/120x60/0066CC/FFFFFF?text=BUSINESS&font=playfair-display' },
  { id: '4', name: 'WS Studio', logo: 'https://placehold.co/120x60/FF6600/FFFFFF?text=WS&font=playfair-display' },
  { id: '5', name: 'Fuse', logo: 'https://placehold.co/120x60/1A1A1A/FFFFFF?text=FUSE&font=playfair-display' },
  { id: '6', name: 'Partenaire A', logo: 'https://placehold.co/120x60/666666/FFFFFF?text=A&font=playfair-display' },
  { id: '7', name: 'Bio', logo: 'https://placehold.co/120x60/00AA00/FFFFFF?text=BIO&font=playfair-display' },
  { id: '8', name: 'Nofia', logo: 'https://placehold.co/120x60/FF6600/FFFFFF?text=NOFIA&font=playfair-display' },
  { id: '9', name: 'Aura', logo: 'https://placehold.co/120x60/9933CC/FFFFFF?text=AURA&font=playfair-display' },
  { id: '10', name: 'Partenaire B', logo: 'https://placehold.co/120x60/666666/FFFFFF?text=B&font=playfair-display' },
  { id: '11', name: 'Partenaire C', logo: 'https://placehold.co/120x60/666666/FFFFFF?text=C&font=playfair-display' },
  { id: '12', name: 'CJM', logo: 'https://placehold.co/120x60/CC0000/FFFFFF?text=CJM&font=playfair-display' },
  { id: '13', name: 'Organic', logo: 'https://placehold.co/120x60/00AA00/FFFFFF?text=ORGANIC&font=playfair-display' },
  { id: '14', name: 'Partenaire D', logo: 'https://placehold.co/120x60/666666/FFFFFF?text=D&font=playfair-display' },
  { id: '15', name: 'Tulip 2', logo: 'https://placehold.co/120x60/FF6600/FFFFFF?text=TULIP&font=playfair-display' },
  { id: '16', name: 'Partenaire E', logo: 'https://placehold.co/120x60/666666/FFFFFF?text=E&font=playfair-display' },
  { id: '17', name: 'Partenaire F', logo: 'https://placehold.co/120x60/666666/FFFFFF?text=F&font=playfair-display' },
  { id: '18', name: 'Apple', logo: 'https://placehold.co/120x60/1A1A1A/FFFFFF?text=APPLE&font=playfair-display' },
  { id: '19', name: 'MD', logo: 'https://placehold.co/120x60/FFD700/1A1A1A?text=MD&font=playfair-display' },
  { id: '20', name: 'Sogucice', logo: 'https://placehold.co/120x60/0066CC/FFFFFF?text=SOGUCICE&font=playfair-display' },
  { id: '21', name: 'WS Studio 2', logo: 'https://placehold.co/120x60/FF6600/FFFFFF?text=WS&font=playfair-display' },
];

export function PartnersSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Motif décoratif latéral */}
      <div className="absolute left-0 top-0 bottom-0 w-16 opacity-5">
        <div className="h-full" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            #FF6600 20px,
            #FF6600 21px
          )`,
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            ILS NOUS FONT CONFIANCE
          </h2>
          <p className="text-muted text-sm md:text-base max-w-4xl mx-auto leading-relaxed">
            Parce que l'excellence opérationnelle ne souffre aucune approximation, les plus grandes institutions, 
            entreprises et établissements hôteliers confient le soin de leurs textiles à ELP. Depuis 1990, 
            nous garantissons à nos partenaires corporatifs une gestion rigoureuse, un respect strict des délais 
            et des standards de traitement de niveau international.
          </p>
        </motion.div>

        {/* Grille de logos */}
        <div className="grid grid-cols-3 md:grid-cols-7 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center justify-center p-4 bg-white rounded-lg border border-border hover:border-primary hover:shadow-soft transition-all duration-300 group cursor-pointer"
            >
              <div className="w-full h-16 flex items-center justify-center">
                {/* Logo partenaire */}
                <img
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}