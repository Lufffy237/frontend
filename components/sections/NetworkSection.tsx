'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, X, Building2, Warehouse } from 'lucide-react';

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
}

interface CountryData {
  id: string;
  name: string;
  agencies: Agency[];
}

// ✅ FONCTION DE NORMALISATION : enlève accents + harmonise les tirets/espaces
function normalizeCountryId(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ✅ LISTE FIXE DES 5 PAYS DU RÉSEAU (toujours affichés, même sans agence)
const ALL_COUNTRIES = [
  { id: 'tchad', displayName: 'TCHAD' },
  { id: 'cameroun', displayName: 'CAMEROUN' },
  { id: 'guinee-equatoriale', displayName: 'GUINÉE ÉQUATORIALE' },
  { id: 'gabon', displayName: 'GABON' },
  { id: 'congo', displayName: 'CONGO' },
];

// ============================================================
// 🗺️ FORMES SVG DES PAYS (clés SANS ACCENT)
// ============================================================
const COUNTRY_PATHS: Record<string, string> = {
  'tchad': 'M35,8 L55,5 L70,8 L80,15 L88,30 L92,50 L90,75 L85,100 L75,125 L65,145 L55,160 L45,168 L35,165 L28,155 L22,140 L18,120 L15,95 L15,70 L18,45 L25,25 Z',
  'cameroun': 'M55,5 L70,3 L80,8 L85,18 L88,30 L85,45 L80,55 L75,65 L72,80 L70,95 L68,110 L65,125 L60,140 L52,150 L42,155 L32,150 L25,140 L20,125 L18,110 L18,90 L20,70 L25,50 L32,35 L42,20 L50,10 Z',
  'guinee-equatoriale': 'M15,25 L35,20 L55,18 L75,20 L90,25 L100,32 L105,40 L100,48 L85,52 L65,54 L45,52 L25,50 L15,45 L10,38 L12,30 Z',
  'gabon': 'M25,10 L45,5 L65,8 L80,15 L90,28 L95,45 L92,65 L85,85 L72,100 L58,110 L42,112 L28,105 L18,92 L12,75 L12,55 L15,35 L20,20 Z',
  'congo': 'M35,8 L55,5 L75,8 L90,18 L100,35 L105,55 L102,80 L95,105 L82,125 L68,138 L52,142 L38,138 L25,128 L15,112 L10,92 L10,70 L15,50 L22,30 L30,15 Z',
};

// ============================================================
// 🎨 CONFIGURATION DES DRAPEAUX PAR PAYS
// ============================================================
const COUNTRY_FLAGS: Record<string, {
  viewBox: string;
  width: number;
  height: number;
  render: () => JSX.Element;
}> = {
  'tchad': {
    viewBox: '0 0 100 180',
    width: 110,
    height: 180,
    render: () => (
      <>
        <rect x="0" y="0" width="33.3" height="180" fill="#002664" />
        <rect x="33.3" y="0" width="33.4" height="180" fill="#FECB00" />
        <rect x="66.7" y="0" width="33.3" height="180" fill="#C60C30" />
      </>
    ),
  },
  'cameroun': {
    viewBox: '0 0 110 160',
    width: 140,
    height: 180,
    render: () => (
      <>
        <rect x="0" y="0" width="37" height="160" fill="#007A5E" />
        <rect x="37" y="0" width="36" height="160" fill="#CE1126" />
        <rect x="73" y="0" width="37" height="160" fill="#FCD116" />
        <polygon
          points="55,66 58.15,75.66 68.32,75.67 60.1,81.66 63.23,91.33 55,85.36 46.77,91.33 49.9,81.66 41.68,75.67 51.85,75.66"
          fill="#FCD116"
        />
      </>
    ),
  },
  'guinee-equatoriale': {
    viewBox: '0 0 120 70',
    width: 130,
    height: 70,
    render: () => (
      <>
        <rect x="0" y="0" width="120" height="23.3" fill="#3E9A4D" />
        <rect x="0" y="23.3" width="120" height="23.4" fill="#FFFFFF" />
        <rect x="0" y="46.7" width="120" height="23.3" fill="#CE1126" />
        <polygon points="0,0 32,35 0,70" fill="#0073CE" />
        <rect x="52" y="26" width="16" height="14" fill="#FFFFFF" stroke="#B0B0B0" strokeWidth="0.6" />
        <rect x="59" y="33" width="2" height="7" fill="#8B5A2B" />
        <circle cx="60" cy="31" r="4" fill="#2E7D32" />
        <circle cx="50" cy="22" r="1.1" fill="#FCD116" />
        <circle cx="54" cy="20.5" r="1.1" fill="#FCD116" />
        <circle cx="58" cy="19.8" r="1.1" fill="#FCD116" />
        <circle cx="62" cy="19.8" r="1.1" fill="#FCD116" />
        <circle cx="66" cy="20.5" r="1.1" fill="#FCD116" />
        <circle cx="70" cy="22" r="1.1" fill="#FCD116" />
      </>
    ),
  },
  'gabon': {
    viewBox: '0 0 100 120',
    width: 100,
    height: 130,
    render: () => (
      <>
        <rect x="0" y="0" width="100" height="40" fill="#009E49" />
        <rect x="0" y="40" width="100" height="40" fill="#FCD116" />
        <rect x="0" y="80" width="100" height="40" fill="#3A75C4" />
      </>
    ),
  },
  'congo': {
    viewBox: '0 0 110 150',
    width: 120,
    height: 160,
    render: () => (
      <>
        <rect x="0" y="0" width="110" height="150" fill="#007FFF" />
        <rect x="-30" y="60" width="170" height="30" fill="#F7D84C" transform="rotate(-35 55 75)" />
        <rect x="-30" y="68" width="170" height="14" fill="#CE1021" transform="rotate(-35 55 75)" />
      </>
    ),
  },
};

// ============================================================
// 🧊 COMPOSANT CARTE 3D D'UN PAYS
// ============================================================
interface Country3DMapProps {
  countryId: string;
  countryName: string;
  agencyCount: number;
  onClick: () => void;
  animationDelay: number;
}

function Country3DMap({ countryId, countryName, agencyCount, onClick, animationDelay }: Country3DMapProps) {
  const path = COUNTRY_PATHS[countryId];
  const flag = COUNTRY_FLAGS[countryId];

  if (!path || !flag) return null;

  const { viewBox, width, height, render } = flag;

  const extrusionLayers = [
    { z: -18, color: '#3d2817' },
    { z: -14, color: '#5a3d22' },
    { z: -10, color: '#7a5430' },
    { z: -6, color: '#9a6d3e' },
    { z: -3, color: '#b8874d' },
  ];

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{ width: `${width}px`, height: `${height}px` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: animationDelay }}
      onClick={onClick}
    >
      <div className="relative w-full h-full" style={{ perspective: '1200px' }}>
        <div
          className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(55deg) rotateZ(-15deg) rotateY(5deg)',
            animation: `float-${countryId} 4s ease-in-out infinite`,
          }}
        >
          {/* Ombre portée au sol */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ transform: 'translateZ(-30px) translateY(20px)', filter: 'blur(25px)', opacity: 0.35 }}
          >
            <svg viewBox={viewBox} className="w-full h-full">
              <path d={path} fill="rgba(0,0,0,0.6)" />
            </svg>
          </div>

          {/* Couches d'extrusion (épaisseur 3D) */}
          {extrusionLayers.map((layer, idx) => (
            <div key={idx} className="absolute inset-0" style={{ transform: `translateZ(${layer.z}px)` }}>
              <svg viewBox={viewBox} className="w-full h-full">
                <path d={path} fill={layer.color} />
              </svg>
            </div>
          ))}

          {/* Couche supérieure : drapeau */}
          <div
            className="absolute inset-0"
            style={{ transform: 'translateZ(0px)', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
          >
            <svg viewBox={viewBox} className="w-full h-full">
              <defs>
                <clipPath id={`clip-${countryId}`}>
                  <path d={path} />
                </clipPath>
                <linearGradient id={`shine-${countryId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
                </linearGradient>
              </defs>
              <g clipPath={`url(#clip-${countryId})`}>
                {render()}
                <rect x="0" y="0" width="100%" height="100%" fill={`url(#shine-${countryId})`} />
              </g>
              <path d={path} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Étiquette */}
      <motion.div
        className="absolute bg-white rounded-md shadow-xl px-3 py-1.5 whitespace-nowrap pointer-events-none"
        style={{ left: '50%', transform: 'translateX(-50%)', top: '-15px' }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: animationDelay + 0.4 }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
        <div className="text-[7px] md:text-[8px] text-gray-500 font-bold uppercase tracking-wider leading-tight">
          Élégance Pressing
        </div>
        <div className="text-xs md:text-sm font-extrabold text-gray-900 leading-tight">
          {countryName}
        </div>
      </motion.div>

      <style>{`
        @keyframes float-${countryId} {
          0%, 100% { transform: rotateX(55deg) rotateZ(-15deg) rotateY(5deg) translateY(0px); }
          50% { transform: rotateX(55deg) rotateZ(-15deg) rotateY(5deg) translateY(-8px); }
        }
      `}</style>
    </motion.div>
  );
}

// ============================================================
// 🌍 COMPOSANT PRINCIPAL
// ============================================================
export function NetworkSection() {
  const [dbCountries, setDbCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/agencies/public`);
        const data = await res.json();
        if (data.success) {
          const grouped = data.data.reduce((acc: Record<string, Agency[]>, agency: Agency) => {
            const key = normalizeCountryId(agency.country);
            if (!acc[key]) acc[key] = [];
            acc[key].push(agency);
            return acc;
          }, {} as Record<string, Agency[]>);

          // ✅ CORRECTION TYPESCRIPT : cast sur Object.entries AVANT le .map()
          const countriesList: CountryData[] = (Object.entries(grouped) as [string, Agency[]][]).map(([id, agencies]) => ({
            id,
            name: (agencies[0]?.country || id).toUpperCase(),
            agencies,
          }));

          setDbCountries(countriesList);
        }
      } catch (error) {
        console.error('Erreur de chargement:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAgencies();
  }, []);

  // ✅ Fusion : les 5 pays TOUJOURS présents + agences attachées (0 si aucune)
  const countriesWithAgencies = ALL_COUNTRIES.map((c) => {
    const match = dbCountries.find((db) => db.id === c.id);
    return { ...c, agencies: match ? match.agencies : [] };
  });

  const countryPositions: Record<string, { x: number; y: number }> = {
    'tchad': { x: 78, y: 18 },
    'cameroun': { x: 58, y: 48 },
    'guinee-equatoriale': { x: 18, y: 42 },
    'gabon': { x: 35, y: 78 },
    'congo': { x: 72, y: 78 },
  };

  const groupByCity = (agencies: Agency[]) => {
    return agencies.reduce((acc, agency) => {
      const city = agency.city;
      if (!acc[city]) acc[city] = { agencies: [], depots: [] };
      if (agency.type === 'AGENCY') acc[city].agencies.push(agency);
      else acc[city].depots.push(agency);
      return acc;
    }, {} as Record<string, { agencies: Agency[]; depots: Agency[] }>);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-200 to-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#FF6600] border-t-transparent rounded-full mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 relative overflow-hidden min-h-[700px]">
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 1200 700" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <g fill="#999" opacity="0.5">
            <path d="M50,100 Q150,50 250,80 T400,100 Q350,150 300,200 T200,250 Q100,200 50,150 Z" />
            <path d="M250,280 Q300,270 350,300 T400,400 Q380,500 320,580 Q280,550 260,450 T250,280 Z" />
            <path d="M500,80 Q550,60 620,80 T700,100 Q680,150 620,170 T550,160 Q510,130 500,80 Z" />
            <path d="M520,200 Q580,180 640,200 T700,280 Q720,380 680,480 Q640,540 600,520 Q560,450 540,350 T520,200 Z" />
            <path d="M700,80 Q800,60 900,100 T1050,150 Q1100,200 1050,280 Q950,300 850,280 T700,200 Z" />
            <path d="M900,400 Q980,380 1050,420 T1100,500 Q1050,540 980,520 T900,450 Z" />
          </g>
          <g stroke="#aaa" strokeWidth="0.5" opacity="0.3" fill="none">
            <path d="M0,150 Q300,130 600,150 T1200,150" />
            <path d="M0,300 Q300,280 600,300 T1200,300" />
            <path d="M0,450 Q300,430 600,450 T1200,450" />
            <path d="M200,0 Q220,200 200,400 T180,700" />
            <path d="M500,0 Q520,200 500,400 T480,700" />
            <path d="M800,0 Q820,200 800,400 T780,700" />
          </g>
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FF6600] uppercase tracking-tight">
            NOUS Y SOMMES
          </h2>
        </motion.div>

        <div className="relative aspect-[4/3] max-w-4xl mx-auto">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {[
              ['tchad', 'cameroun'],
              ['cameroun', 'guinee-equatoriale'],
              ['cameroun', 'gabon'],
              ['cameroun', 'congo'],
              ['gabon', 'congo'],
              ['guinee-equatoriale', 'gabon'],
            ].map(([from, to], idx) => {
              const fromPos = countryPositions[from];
              const toPos = countryPositions[to];
              if (!fromPos || !toPos) return null;
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={`${fromPos.x}%`}
                  y1={`${fromPos.y}%`}
                  x2={`${toPos.x}%`}
                  y2={`${toPos.y}%`}
                  stroke="white"
                  strokeWidth="1.5"
                  strokeDasharray="6,6"
                  opacity="0.6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3 + idx * 0.1 }}
                />
              );
            })}
          </svg>

          {countriesWithAgencies.map((country, index) => {
            const pos = countryPositions[country.id];
            if (!pos) return null;
            return (
              <div
                key={country.id}
                className="absolute"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)', zIndex: 10 }}
              >
                <Country3DMap
                  countryId={country.id}
                  countryName={country.displayName}
                  agencyCount={country.agencies.length}
                  onClick={() => setSelectedCountry({ id: country.id, name: country.displayName, agencies: country.agencies })}
                  animationDelay={index * 0.15}
                />
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCountry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#FF6600] text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{selectedCountry.name}</h3>
                  <p className="text-sm opacity-90">
                    {selectedCountry.agencies.length} implantation{selectedCountry.agencies.length > 1 ? 's' : ''}
                  </p>
                </div>
                <button onClick={() => setSelectedCountry(null)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                {selectedCountry.agencies.length === 0 ? (
                  <p className="text-muted text-center py-8">Aucune agence publiée pour ce pays pour le moment.</p>
                ) : (
                  Object.entries(groupByCity(selectedCountry.agencies)).map(([city, data]) => (
                    <div key={city} className="mb-8 last:mb-0">
                      <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 pb-2 border-b-2 border-[#FF6600]">
                        <MapPin className="w-5 h-5 text-[#FF6600]" />
                        {city}
                      </h4>

                      {data.agencies.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 uppercase tracking-wide">
                            <Building2 className="w-4 h-4 text-[#FF6600]" />
                            Agences ({data.agencies.length})
                          </h5>
                          <div className="grid md:grid-cols-2 gap-3">
                            {data.agencies.map((agency) => (
                              <div key={agency.id} className="border-l-4 border-[#FF6600] bg-gray-50 rounded-r-lg p-4 hover:shadow-md transition-shadow">
                                <h6 className="font-bold text-gray-900 mb-2">{agency.name}</h6>
                                <p className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#FF6600]" />
                                  {agency.address}
                                </p>
                                <div className="space-y-1 text-xs text-gray-600">
                                  {agency.phone && (
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-3 h-3 text-[#FF6600]" />
                                      <a href={`tel:${agency.phone}`} className="hover:text-[#FF6600] font-medium">{agency.phone}</a>
                                    </div>
                                  )}
                                  {agency.email && (
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-3 h-3 text-[#FF6600]" />
                                      <a href={`mailto:${agency.email}`} className="hover:text-[#FF6600] truncate">{agency.email}</a>
                                    </div>
                                  )}
                                  {agency.hours && (
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-3 h-3 text-[#FF6600]" />
                                      <span>{agency.hours}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {data.depots.length > 0 && (
                        <div>
                          <h5 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 uppercase tracking-wide">
                            <Warehouse className="w-4 h-4 text-[#FF6600]" />
                            Dépôts ({data.depots.length})
                          </h5>
                          <div className="grid md:grid-cols-2 gap-3">
                            {data.depots.map((depot) => (
                              <div key={depot.id} className="border-l-4 border-gray-600 bg-gray-50 rounded-r-lg p-4 hover:shadow-md transition-shadow">
                                <h6 className="font-bold text-gray-900 mb-2">{depot.name}</h6>
                                <p className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-gray-600" />
                                  {depot.address}
                                </p>
                                <div className="space-y-1 text-xs text-gray-600">
                                  {depot.phone && (
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-3 h-3 text-gray-600" />
                                      <a href={`tel:${depot.phone}`} className="hover:text-[#FF6600] font-medium">{depot.phone}</a>
                                    </div>
                                  )}
                                  {depot.hours && (
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-3 h-3 text-gray-600" />
                                      <span>{depot.hours}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}