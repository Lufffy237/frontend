'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ExcellenceSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop"
                alt="Femme tenant du linge propre devant des machines à laver"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              {/* Overlay décoratif */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Élément décoratif orange */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-lg -z-10" />
          </motion.div>

          {/* Contenu texte */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-block text-primary font-bold text-sm tracking-wider mb-4">
              -DEPUIS 1990
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6 leading-tight">
              L'excellence du soin{' '}
              <span className="text-primary">au quotidien</span>
            </h2>

            <p className="text-muted leading-relaxed mb-4">
              Élégance Pressing met son expertise au service des particuliers, des entreprises 
              et des institutions en proposant des solutions professionnelles dédiées à l'entretien 
              et au soin des textiles.
            </p>

            <p className="text-muted leading-relaxed mb-8">
              Notre approche repose sur une exigence constante de qualité, une organisation rigoureuse 
              et une attention particulière portée à chaque vêtement qui nous est confié.
            </p>

            <Link
              href="/a-propos#histoire"
              className="inline-flex items-center gap-3 text-secondary font-semibold group"
            >
              <span className="border-b-2 border-primary pb-1 group-hover:text-primary transition-colors">
                Notre Histoire
              </span>
              <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-primary-hover transition-colors">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}