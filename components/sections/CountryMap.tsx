'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Store } from 'lucide-react';
import type { Country } from '@/lib/countries';

interface CountryMapProps {
  country: Country | null;
  onClose: () => void;
}

export function CountryMap({ country, onClose }: CountryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!country) return;
    
    // âœ… CORRECTION : On capture la rÃ©fÃ©rence dans une variable locale pour que TypeScript 
    // sache qu'elle n'est pas null Ã  l'intÃ©rieur de la fonction asynchrone initMap
    const container = mapRef.current;
    if (!container) return;

    // Import dynamique de Leaflet (cÃ´tÃ© client uniquement)
    const initMap = async () => {
      const L = await import('leaflet');
      
      // Nettoyer l'instance prÃ©cÃ©dente
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // CrÃ©er la carte en utilisant la variable locale 'container'
      const map = L.map(container, {
        center: [country.coordinates.lat, country.coordinates.lng],
        zoom: country.zoom,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      // Ajouter les tuiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Â© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Ajouter un marqueur
      L.marker([country.coordinates.lat, country.coordinates.lng])
        .addTo(map)
        .bindPopup(`<b>Ã‰lÃ©gance Pressing</b><br/>${country.name}`)
        .openPopup();

      mapInstanceRef.current = map;

      // Forcer le recalcul de la taille aprÃ¨s l'animation de la modale
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [country]);

  if (!country) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white rounded-lg shadow-elevated overflow-hidden max-w-4xl w-full max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
          layoutId={`map-${country.id}`}
        >
          {/* Header */}
          <div className="bg-secondary text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-1">{country.name}</h3>
                <p className="text-gray-300 text-sm">RÃ©seau Ã‰lÃ©gance Pressing</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Fermer la carte"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{country.agencies + country.depots}</div>
                  <div className="text-xs text-gray-300">Implantations</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{country.agencies}</div>
                  <div className="text-xs text-gray-300">Agences</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{country.depots}</div>
                  <div className="text-xs text-gray-300">DÃ©pÃ´ts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Carte */}
          <div ref={mapRef} className="h-[400px] w-full" />

          {/* Footer */}
          <div className="p-4 bg-surface border-t border-border">
            <p className="text-sm text-muted text-center">
              Cliquez sur un marqueur pour voir les dÃ©tails de l'implantation
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}