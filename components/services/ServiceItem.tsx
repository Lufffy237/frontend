'use client';

import { motion } from 'framer-motion';
import type { Service } from '@/lib/services';

interface ServiceItemProps {
  service: Service;
  index: number;
}

export function ServiceItem({ service, index }: ServiceItemProps) {
  const isReversed = index % 2 !== 0;

  return (
    <div className="relative py-16 md:py-24">
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div
          className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
            isReversed ? 'md:direction-rtl' : ''
          }`}
        >
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className={`${isReversed ? 'md:order-2' : 'md:order-1'}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6 leading-tight">
              {service.title}
            </h2>
            {service.subtitle && (
              <p className="text-xl md:text-2xl font-bold text-primary mb-6">
                {service.subtitle}
              </p>
            )}
            <p className="text-muted leading-relaxed text-base md:text-lg">
              {service.description}
            </p>
          </motion.div>

          {/* Image avec cadre orange */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`relative ${isReversed ? 'md:order-1' : 'md:order-2'}`}
          >
            <div className="relative">
              {/* Cadre orange décoratif */}
              <div
                className={`absolute w-full h-full bg-primary ${
                  isReversed ? '-top-4 -left-4' : '-bottom-4 -right-4'
                }`}
              />
              {/* Image */}
              <div className="relative overflow-hidden shadow-elevated">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}