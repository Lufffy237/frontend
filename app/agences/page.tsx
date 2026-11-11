'use client';

// ✅ Force le rendu dynamique pour empêcher Next.js de pré-générer cette page côté serveur
export const dynamic = 'force-dynamic';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
// ✅ Renommé en dynamicImport pour éviter le conflit de nom avec l'export 'dynamic' ci-dessus
import dynamicImport from 'next/dynamic';

// ✅ IMPORTS DYNAMIQUES AVEC SSR DÉSACTIVÉ
// Cela garantit que ces composants ne seront chargés QUE dans le navigateur, 
// éliminant à 100% les erreurs "window is not defined" lors du build.
const AgencyHero = dynamicImport(() => import('@/components/agencies/AgencyHero').then(mod => ({ default: mod.AgencyHero })), { ssr: false, loading: () => <div className="h-64 bg-surface animate-pulse" /> });
const AgencyFilters = dynamicImport(() => import('@/components/agencies/AgencyFilters').then(mod => ({ default: mod.AgencyFilters })), { ssr: false });
const AgencyCard = dynamicImport(() => import('@/components/agencies/AgencyCard').then(mod => ({ default: mod.AgencyCard })), { ssr: false });
const AgencyMap = dynamicImport(() => import('@/components/agencies/AgencyMap').then(mod => ({ default: mod.AgencyMap })), { ssr: false });
const FloatingButtons = dynamicImport(() => import('@/components/services/FloatingButtons').then(mod => ({ default: mod.FloatingButtons })), { ssr: false });

interface Agency {
  id: string;
  name: string;
  type: 'AGENCY' | 'DEPOT';
  country: string;
  city: string;
  province: string | null;
  address: string;
  phone: string | null;
  email: string | null;
  hours: string | null;
  latitude: number | null;
  longitude: number | null;
  published: boolean;
}

type AgencyType = 'AGENCY' | 'DEPOT';

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState<'ALL' | AgencyType>('ALL');
  const [selectedAgencyId, setSelectedAgencyId] = useState<string | null>(null);

  // 1. Récupérer les agences depuis l'API au chargement
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        // ✅ CORRECTION : Utilisation de la variable d'environnement avec fallback pour le local
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/agencies/public`);
        
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }
        
        const data = await res.json();
        if (data.success) {
          setAgencies(data.data);
        } else {
          throw new Error(data.message || 'Erreur inconnue');
        }
      } catch (error) {
        console.error('Erreur de chargement des agences:', error);
        toast.error('Impossible de charger la liste des agences. Vérifiez votre connexion.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgencies();
  }, []);

  // 2. Calculer les pays et villes disponibles dynamiquement depuis la BDD
  const availableCountries = useMemo(() => {
    const countries = agencies.map((a) => a.country).filter((c, i, self) => self.indexOf(c) === i);
    return countries.sort();
  }, [agencies]);

  const availableCities = useMemo(() => {
    if (!selectedCountry) return [];
    const cities = agencies
      .filter((a) => a.country === selectedCountry)
      .map((a) => a.city)
      .filter((city, index, self) => self.indexOf(city) === index);
    return cities.sort();
  }, [agencies, selectedCountry]);

  // 3. Filtrage des agences (côté client pour rapidité et géolocalisation)
  const filteredAgencies = useMemo(() => {
    return agencies.filter((agency) => {
      const matchesSearch =
        search === '' ||
        agency.name.toLowerCase().includes(search.toLowerCase()) ||
        agency.address.toLowerCase().includes(search.toLowerCase()) ||
        agency.city.toLowerCase().includes(search.toLowerCase());

      const matchesCountry = selectedCountry === '' || agency.country === selectedCountry;
      const matchesCity = selectedCity === '' || agency.city === selectedCity;
      const matchesType = selectedType === 'ALL' || agency.type === selectedType;

      return matchesSearch && matchesCountry && matchesCity && matchesType;
    });
  }, [agencies, search, selectedCountry, selectedCity, selectedType]);

  // 4. Statistiques globales
  const globalStats = useMemo(() => ({
    agencies: agencies.filter((a) => a.type === 'AGENCY').length,
    depots: agencies.filter((a) => a.type === 'DEPOT').length,
    countries: availableCountries.length,
    regions: new Set(agencies.map(a => a.province || a.city)).size,
  }), [agencies, availableCountries]);

  // 5. Handlers
  const handleCountryChange = useCallback((country: string) => {
    setSelectedCountry(country);
    setSelectedCity(''); // Réinitialiser la ville
  }, []);

  const handleSelectAgency = useCallback((id: string) => {
    setSelectedAgencyId((prev) => (prev === id ? null : id));
  }, []);

  const handleFindNearest = useCallback(() => {
    // ✅ Garde absolue : on ne fait rien si on n'est pas dans un navigateur
    if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.geolocation) {
      toast.error('La géolocalisation n\'est pas supportée par votre navigateur');
      return;
    }

    toast.loading('Recherche de l\'agence la plus proche...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Filtrer uniquement les agences ayant des coordonnées GPS
        const agenciesWithCoords = agencies.filter(a => a.latitude && a.longitude);
        
        if (agenciesWithCoords.length === 0) {
          toast.dismiss();
          toast.error('Aucune agence avec des coordonnées GPS disponibles.');
          return;
        }

        let nearestAgency = agenciesWithCoords[0];
        let minDistance = Infinity;

        agenciesWithCoords.forEach((agency) => {
          const R = 6371; // Rayon de la Terre en km
          const dLat = ((agency.latitude! - latitude) * Math.PI) / 180;
          const dLon = ((agency.longitude! - longitude) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos((latitude * Math.PI) / 180) *
              Math.cos((agency.latitude! * Math.PI) / 180) *
              Math.sin(dLon / 2) ** 2;
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;

          if (distance < minDistance) {
            minDistance = distance;
            nearestAgency = agency;
          }
        });

        toast.dismiss();
        toast.success(`Agence la plus proche : ${nearestAgency.name} (${minDistance.toFixed(1)} km)`);

        // Sélectionner l'agence et appliquer les filtres
        setSelectedCountry(nearestAgency.country);
        setSelectedCity(nearestAgency.city);
        setSelectedAgencyId(nearestAgency.id);
      },
      (error) => {
        toast.dismiss();
        if (error.code === error.PERMISSION_DENIED) {
          toast.error('Géolocalisation refusée. Veuillez sélectionner manuellement un pays et une ville.');
        } else {
          toast.error('Impossible de déterminer votre position. Recherche manuelle activée.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [agencies]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  // ✅ CONVERSION pour AgencyMap (transforme null en '' ou 0)
  const safeAgenciesForMap = filteredAgencies.map(agency => ({
    ...agency,
    province: agency.province || '',
    phone: agency.phone || '',
    email: agency.email || '',
    hours: agency.hours || '',
    latitude: agency.latitude || 0,
    longitude: agency.longitude || 0,
  }));

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <AgencyHero onFindNearest={handleFindNearest} stats={globalStats} />

      {/* Filtres */}
      <AgencyFilters
        search={search}
        onSearchChange={setSearch}
        countries={availableCountries}
        selectedCountry={selectedCountry}
        onCountryChange={handleCountryChange}
        cities={availableCities}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      {/* Section principale : Liste + Carte */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
            NOTRE RÉSEAU D'AGENCES
          </h2>
          <p className="text-muted italic">Où nous trouver en Afrique Centrale</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Liste des agences (2/5) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-soft overflow-hidden border border-border">
              {/* Header avec compteur */}
              <div className="bg-primary text-white px-4 py-3">
                <p className="text-sm font-semibold">
                  Nombre d'agences : <span className="text-lg font-bold">{filteredAgencies.length}</span>
                </p>
              </div>

              {/* Liste scrollable */}
              <div className="max-h-[600px] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {filteredAgencies.length > 0 ? (
                    filteredAgencies.map((agency) => {
                      // ✅ CONVERSION pour AgencyCard
                      const safeAgency = {
                        ...agency,
                        province: agency.province || '',
                        phone: agency.phone || '',
                        email: agency.email || '',
                        hours: agency.hours || '',
                        latitude: agency.latitude || 0,
                        longitude: agency.longitude || 0,
                      };

                      return (
                        <AgencyCard
                          key={agency.id}
                          agency={safeAgency}
                          isSelected={selectedAgencyId === agency.id}
                          onSelect={handleSelectAgency}
                        />
                      );
                    })
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 text-center"
                    >
                      <p className="text-muted">
                        Aucune agence ne correspond à votre recherche.
                      </p>
                      <button
                        onClick={() => {
                          setSearch('');
                          setSelectedCountry('');
                          setSelectedCity('');
                          setSelectedType('ALL');
                        }}
                        className="mt-4 text-primary font-semibold text-sm hover:underline"
                      >
                        Réinitialiser les filtres
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Carte (3/5) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-soft overflow-hidden border border-border h-[600px]">
              <AgencyMap
                agencies={safeAgenciesForMap} // ✅ On passe le tableau converti ici
                selectedAgencyId={selectedAgencyId}
                onSelectAgency={handleSelectAgency}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <FloatingButtons />
    </div>
  );
}