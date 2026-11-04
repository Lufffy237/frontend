'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import type { JobOffer } from '@/lib/jobs';

interface JobCardProps {
  job: JobOffer;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-b border-border py-12 md:py-16"
    >
      <Link
        href={`/carrieres/${job.slug}`}
        className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center group ${
          isReversed ? 'md:direction-rtl' : ''
        }`}
      >
        {/* Image */}
        <div className={`${isReversed ? 'md:order-2' : 'md:order-1'}`}>
          <div className="relative overflow-hidden rounded-lg shadow-medium">
            <img
              src={job.image}
              alt={job.title}
              className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Badge type */}
            <div className="absolute top-4 left-4">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white ${
                  job.type === 'STAGE' ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                {job.type === 'STAGE' ? 'OFFRE DE STAGE' : 'RECRUTEMENT'}
              </span>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className={`${isReversed ? 'md:order-1' : 'md:order-2'}`}>
          <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors duration-300">
            {job.title}
          </h3>

          {/* Métadonnées */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-primary" />
              {job.contract}
            </span>
          </div>

          {/* Description courte */}
          <p className="text-muted leading-relaxed mb-6">
            {job.shortDescription}
          </p>

          {/* Missions principales */}
          <div className="mb-6">
            <h4 className="font-bold text-secondary text-sm mb-3">
              Vos Missions Principales
            </h4>
            <ul className="space-y-2">
              {job.missions.slice(0, 3).map((mission, i) => (
                <li key={i} className="text-sm text-muted flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{mission}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lien Voir plus */}
          <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
            <span>Voir plus</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}