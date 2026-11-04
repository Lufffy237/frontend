'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Agency } from '@/lib/agencies'; // Ou le chemin vers votre type Agency

interface AgencyMapProps {
  agencies: Agency[];
  selectedAgencyId: string | null;
  onSelectAgency: (id: string) => void;
}

// Correction des icônes Leaflet par défaut dans Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export function AgencyMap({ agencies, selectedAgencyId, onSelectAgency }: AgencyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    // ✅ CORRECTION : Vérifier que mapRef.current n'est pas null avant d'initialiser
    if (!mapRef.current) return;

    // Initialiser la carte uniquement si elle n'existe pas encore
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [2, 15], // Centré sur l'Afrique Centrale
        zoom: 4,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Nettoyer les anciens marqueurs
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Ajouter les nouveaux marqueurs
    agencies.forEach((agency) => {
      if (agency.latitude && agency.longitude) {
        const marker = L.marker([agency.latitude, agency.longitude]).addTo(map);
        
        // Popup au clic
        marker.bindPopup(`
          <div style="text-align: center; min-width: 150px;">
            <strong>${agency.name}</strong><br/>
            <span style="font-size: 12px; color: #666;">${agency.city}, ${agency.country}</span>
          </div>
        `);

        // Clic sur le marqueur sélectionne l'agence
        marker.on('click', () => {
          onSelectAgency(agency.id);
        });

        markersRef.current.push(marker);
      }
    });

    // Si une agence est sélectionnée, centrer la carte dessus
    if (selectedAgencyId) {
      const selected = agencies.find((a) => a.id === selectedAgencyId);
      if (selected && selected.latitude && selected.longitude) {
        map.flyTo([selected.latitude, selected.longitude], 10, {
          duration: 1.5,
        });
        
        // Ouvrir le popup du marqueur sélectionné
        const selectedMarker = markersRef.current.find((m) => {
          const latLng = m.getLatLng();
          return latLng.lat === selected.latitude && latLng.lng === selected.longitude;
        });
        if (selectedMarker) {
          selectedMarker.openPopup();
        }
      }
    }

    // Nettoyage au démontage du composant
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [agencies, selectedAgencyId, onSelectAgency]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg z-0"
      style={{ minHeight: '400px' }}
    />
  );
}