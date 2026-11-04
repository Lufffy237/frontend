'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { ServiceItem } from '@/components/services/ServiceItem';
import { FloatingButtons } from '@/components/services/FloatingButtons';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1920&h=800&fit=crop)',
          }}
        >
          {/* Overlay orange */}
          <div className="absolute inset-0 bg-primary/85" />
        </div>

        {/* Contenu */}
        <div className="relative h-full flex items-center justify-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center tracking-wider"
          >
            NOS SERVICES
          </motion.h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-muted leading-relaxed text-base md:text-lg"
          >
            Depuis sa fondation en 1990, Élégance Pressing (ELP) met son savoir-faire historique au service du soin du linge et de l'entretien de l'habitat au Cameroun ainsi que dans toute la sous-région CEMAC. Notre maison s'appuie sur des infrastructures de pointe, un personnel hautement qualifié et une logistique intégrée grâce à un important parc automobile de relais rapide. Fort d'un réseau de près d'une centaine d'agences et de dépôts en Afrique Centrale (Cameroun, Tchad, Guinée Équatoriale, Congo et Gabon), ELP est aujourd'hui reconnu comme un label de prestige et le leader incontournable de son secteur.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface">
        {SERVICES.map((service, index) => (
          <ServiceItem key={service.id} service={service} index={index} />
        ))}
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/agences"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
            >
              Découvrir Nos Agences
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-soft hover:bg-primary-hover hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300"
            >
              Contact-Nous
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Boutons flottants */}
      <FloatingButtons />
    </div>
  );
}