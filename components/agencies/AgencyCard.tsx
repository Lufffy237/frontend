'use client';

import { motion } from 'framer-motion';
import { Phone, Clock, MapPin } from 'lucide-react';
import type { Agency } from '@/lib/agencies';
import { AGENCY_TYPE_LABELS } from '@/lib/agencies';

interface AgencyCardProps {
  agency: Agency;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function AgencyCard({ agency, isSelected, onSelect }: AgencyCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(agency.id)}
      className={`
        p-4 border-b border-border cursor-pointer transition-all duration-300
        hover:bg-surface
        ${isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}
      `}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-bold text-secondary text-base leading-tight">
          {agency.name}
        </h3>
        <span
          className={`flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
            agency.type === 'AGENCY'
              ? 'bg-primary/10 text-primary'
              : 'bg-secondary/10 text-secondary'
          }`}
        >
          {AGENCY_TYPE_LABELS[agency.type]}
        </span>
      </div>

      {agency.province && (
        <p className="text-xs text-muted mb-1">{agency.province}</p>
      )}

      <div className="space-y-1.5 text-sm">
        <div className="flex items-start gap-2 text-muted">
          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
          <span>{agency.address}</span>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="text-xs">{agency.phone}</span>
        </div>
        <div className="flex items-start gap-2 text-muted">
          <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
          <span className="text-xs whitespace-pre-line">{agency.hours}</span>
        </div>
      </div>
    </motion.div>
  );
}