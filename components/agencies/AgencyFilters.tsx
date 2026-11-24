'use client';

import { Search } from 'lucide-react';
import type { AgencyType } from '@/lib/agencies';

interface AgencyFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  countries: string[];
  selectedCountry: string;
  onCountryChange: (value: string) => void;
  cities: string[];
  selectedCity: string;
  onCityChange: (value: string) => void;
  selectedType: 'ALL' | AgencyType;
  onTypeChange: (value: 'ALL' | AgencyType) => void;
}

export function AgencyFilters({
  search,
  onSearchChange,
  countries,
  selectedCountry,
  onCountryChange,
  cities,
  selectedCity,
  onCityChange,
  selectedType,
  onTypeChange,
}: AgencyFiltersProps) {
  return (
    <div className="bg-white border-b border-border sticky top-[72px] z-20 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Rechercher une agence..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Dropdown Pays */}
          <select
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-border bg-white text-secondary text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer min-w-[150px]"
          >
            <option value="">Tous les pays</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Dropdown Ville */}
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            disabled={!selectedCountry}
            className="px-4 py-2.5 rounded-lg border border-border bg-white text-secondary text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer min-w-[150px] disabled:bg-surface disabled:cursor-not-allowed"
          >
            <option value="">Toutes les villes</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Boutons type */}
          <div className="flex gap-2">
            <button
              onClick={() => onTypeChange('ALL')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                selectedType === 'ALL'
                  ? 'bg-secondary text-white shadow-soft'
                  : 'bg-white border border-border text-secondary hover:bg-surface'
              }`}
            >
              Tout
            </button>
            <button
              onClick={() => onTypeChange('AGENCY')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                selectedType === 'AGENCY'
                  ? 'bg-secondary text-white shadow-soft'
                  : 'bg-white border border-border text-secondary hover:bg-surface'
              }`}
            >
              Agences
            </button>
            <button
              onClick={() => onTypeChange('DEPOT')}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                selectedType === 'DEPOT'
                  ? 'bg-secondary text-white shadow-soft'
                  : 'bg-white border border-border text-secondary hover:bg-surface'
              }`}
            >
              Dépôt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}