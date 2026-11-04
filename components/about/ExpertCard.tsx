'use client';

import { motion } from 'framer-motion';
import type { Expert } from '@/lib/team';

interface ExpertCardProps {
  expert: Expert;
  index: number;
  reversed?: boolean;
}

export function ExpertCard({ expert, index, reversed = false }: ExpertCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
        reversed ? 'md:direction-rtl' : ''
      }`}
    >
      {/* Photo */}
      <div className={`${reversed ? 'md:order-2' : 'md:order-1'}`}>
        <div className="relative">
          <div className={`absolute w-full h-full bg-primary/10 ${
            reversed ? '-top-4 -left-4' : '-bottom-4 -right-4'
          }`} />
          <div className="relative overflow-hidden rounded-lg shadow-elevated">
            <img
              src={expert.image}
              alt={expert.name}
              className="w-full h-[400px] md:h-[500px] object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Texte */}
      <div className={`${reversed ? 'md:order-1' : 'md:order-2'}`}>
        <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-6">
          {expert.name}
        </h3>
        <p className="text-muted leading-relaxed">
          {expert.description}
        </p>
      </div>
    </motion.div>
  );
}