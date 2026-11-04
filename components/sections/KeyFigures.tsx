'use client';

import { motion } from 'framer-motion';
import { CountUpNumber } from '@/components/ui/CountUpNumber';

interface KeyFigure {
  value: string;
  label: string;
}

const figures: KeyFigure[] = [
  { value: '35+', label: "Années d'expérience" },
  { value: '5', label: 'Pays présents' },
  { value: '15+', label: 'Agences' },
  { value: '10+', label: 'Dépôts' },
  { value: '10M+', label: 'Clients satisfaits' },
];

export function KeyFigures() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-elevated p-8 md:p-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {figures.map((figure, index) => (
            <motion.div
              key={figure.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <CountUpNumber 
                  value={figure.value} 
                  duration={2500}
                  delay={500 + index * 150}
                />
              </div>
              <div className="text-sm text-muted font-medium">
                {figure.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}