'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle?: string;
  cta?: {
    label: string;
    href: string;
  };
}

const slides: Slide[] = [
  {
    image: '/images/hero-1.jpg',
    title: "L'EXCELLENCE DU PRESSING DEPUIS 1990",
    cta: {
      label: 'DÉCOUVRIR',
      href: '/services',
    },
  },
  {
    image: '/images/hero-2.jpg',
    title: 'UN SAVOIR-FAIRE RECONNU EN AFRIQUE CENTRALE',
    subtitle: 'Qualité, élégance et professionnalisme',
    cta: {
      label: 'NOS SERVICES',
      href: '/services',
    },
  },
  {
    image: '/images/hero-3.jpg',
    title: 'VOTRE LINGE MÉRITE LE MEILLEUR TRAITEMENT',
    subtitle: 'Blanchisserie, nettoyage à sec, hygiène',
    cta: {
      label: 'TROUVER UNE AGENCE',
      href: '/agences',
    },
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Image de fond */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          >
            {/* Overlay sombre pour lisibilité du texte */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>

          {/* Contenu */}
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-wide"
              >
                {slides[currentSlide].title}
              </motion.h1>

              {slides[currentSlide].subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg md:text-xl text-white/90 mb-8"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              )}

              {slides[currentSlide].cta && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <Link
                    href={slides[currentSlide].cta!.href}
                    className="inline-block px-8 py-3 border-2 border-primary text-white font-semibold text-sm tracking-wider hover:bg-primary hover:border-primary transition-all duration-300"
                  >
                    {slides[currentSlide].cta!.label}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Flèches de navigation */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors duration-300 shadow-medium"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors duration-300 shadow-medium"
          aria-label="Slide suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Indicateurs de slide */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary w-8' : 'bg-white/50'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}