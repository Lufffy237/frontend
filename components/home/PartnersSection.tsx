// Exemple pour la section Partenaires sur la homepage
'use client';
import { useState, useEffect } from 'react';

export function PartnersSection() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/partners')
      .then(res => res.json())
      .then(data => { if (data.success) setPartners(data.data); });
  }, []);

  if (partners.length === 0) return null; // Ne rien afficher si vide

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-secondary mb-8">Nos Partenaires de Confiance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {partners.map((p: any) => (
            <a key={p.id} href={p.website || '#'} target="_blank" className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
              {p.logo ? (
                <img src={p.logo} alt={p.name} className="max-h-12 w-auto object-contain" />
              ) : (
                <span className="text-sm font-bold text-muted">{p.name}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}