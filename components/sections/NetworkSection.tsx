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

export function NetworkSection() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/agencies/public');
        const data = await res.json();
        if (data.success) {
          // Typage explicite de l'accumulateur
          const grouped = data.data.reduce((acc: Record<string, Agency[]>, agency: Agency) => {
            const countryName = agency.country;
            if (!acc[countryName]) acc[countryName] = [];
            acc[countryName].push(agency);
            return acc;
          }, {} as Record<string, Agency[]>);

          // ? CORRECTION : Cast explicite pour garantir que agencies est bien Agency[]
          const countriesList: CountryData[] = Object.entries(grouped).map(([name, agencies]) => ({
            id: name.toLowerCase().replace(/\s+/g, '-'),
            name: name.toUpperCase(),
            agencies: agencies as Agency[],
          }));

          setCountries(countriesList);
        }
      } catch (error) {
        console.error('Erreur de chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencies();
  }, []);

  // Positions relatives (en %) - fidèles à l'image
  const countryPositions: Record<string, { x: number; y: number }> = {
    'tchad': { x: 78, y: 18 },
    'cameroun': { x: 58, y: 48 },
    'guinée-équatoriale': { x: 18, y: 42 },
    'gabon': { x: 35, y: 78 },
    'congo': { x: 72, y: 78 },
  };

  // Formes SVG réelles des pays avec drapeaux
  const countrySVGs: Record<string, () => JSX.Element> = {
    'tchad': () => (
      <svg viewBox="0 0 100 180" className="w-full h-full" style={{ filter: 'drop-shadow(4px 6px 4px rgba(0,0,0,0.4))' }}>
        <defs>
          <clipPath id="tchad-clip">
            <path d="M35,8 L55,5 L70,8 L80,15 L88,30 L92,50 L90,75 L85,100 L75,125 L65,145 L55,160 L45,168 L35,165 L28,155 L22,140 L18,120 L15,95 L15,70 L18,45 L25,25 Z" />
          </clipPath>
        </defs>
        <path d="M35,8 L55,5 L70,8 L80,15 L88,30 L92,50 L90,75 L85,100 L75,125 L65,145 L55,160 L45,168 L35,165 L28,155 L22,140 L18,120 L15,95 L15,70 L18,45 L25,25 Z" 
              fill="#000" opacity="0.3" transform="translate(3, 5)"/>
        <g clipPath="url(#tchad-clip)">
          <rect x="0" y="0" width="33" height="180" fill="#002664"/>
          <rect x="33" y="0" width="34" height="180" fill="#FECB00"/>
          <rect x="67" y="0" width="33" height="180" fill="#C60C30"/>
        </g>
        <path d="M35,8 L55,5 L70,8 L80,15 L88,30 L92,50 L90,75 L85,100 L75,125 L65,145 L55,160 L45,168 L35,165 L28,155 L22,140 L18,120 L15,95 L15,70 L18,45 L25,25 Z" 
              fill="none" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
    'cameroun': () => (
      <svg viewBox="0 0 110 160" className="w-full h-full" style={{ filter: 'drop-shadow(4px 6px 4px rgba(0,0,0,0.4))' }}>
        <defs>
          <clipPath id="cameroun-clip">
            <path d="M55,5 L70,3 L80,8 L85,18 L88,30 L85,45 L80,55 L75,65 L72,80 L70,95 L68,110 L65,125 L60,140 L52,150 L42,155 L32,150 L25,140 L20,125 L18,110 L18,90 L20,70 L25,50 L32,35 L42,20 L50,10 Z" />
          </clipPath>
        </defs>
        <path d="M55,5 L70,3 L80,8 L85,18 L88,30 L85,45 L80,55 L75,65 L72,80 L70,95 L68,110 L65,125 L60,140 L52,150 L42,155 L32,150 L25,140 L20,125 L18,110 L18,90 L20,70 L25,50 L32,35 L42,20 L50,10 Z" 
              fill="#000" opacity="0.3" transform="translate(3, 5)"/>
        <g clipPath="url(#cameroun-clip)">
          <rect x="0" y="0" width="37" height="160" fill="#007A5E"/>
          <rect x="37" y="0" width="36" height="160" fill="#CE1126"/>
          <rect x="73" y="0" width="37" height="160" fill="#FCD116"/>
          <polygon points="55,70 58,80 68,80 60,86 63,96 55,90 47,96 50,86 42,80 52,80" fill="#FCD116"/>
        </g>
        <path d="M55,5 L70,3 L80,8 L85,18 L88,30 L85,45 L80,55 L75,65 L72,80 L70,95 L68,110 L65,125 L60,140 L52,150 L42,155 L32,150 L25,140 L20,125 L18,110 L18,90 L20,70 L25,50 L32,35 L42,20 L50,10 Z" 
              fill="none" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
    'guinée-équatoriale': () => (
      <svg viewBox="0 0 120 70" className="w-full h-full" style={{ filter: 'drop-shadow(4px 6px 4px rgba(0,0,0,0.4))' }}>
        <defs>
          <clipPath id="guinee-clip">
            <path d="M15,25 L35,20 L55,18 L75,20 L90,25 L100,32 L105,40 L100,48 L85,52 L65,54 L45,52 L25,50 L15,45 L10,38 L12,30 Z" />
          </clipPath>
        </defs>
        <path d="M15,25 L35,20 L55,18 L75,20 L90,25 L100,32 L105,40 L100,48 L85,52 L65,54 L45,52 L25,50 L15,45 L10,38 L12,30 Z" 
              fill="#000" opacity="0.3" transform="translate(3, 5)"/>
        <g clipPath="url(#guinee-clip)">
          <rect x="0" y="0" width="120" height="23" fill="#009900"/>
          <rect x="0" y="23" width="120" height="24" fill="#FFFFFF"/>
          <rect x="0" y="47" width="120" height="23" fill="#0033A0"/>
          <polygon points="0,0 35,35 0,70" fill="#CE1126"/>
          <circle cx="60" cy="35" r="8" fill="#0033A0" opacity="0.6"/>
        </g>
        <path d="M15,25 L35,20 L55,18 L75,20 L90,25 L100,32 L105,40 L100,48 L85,52 L65,54 L45,52 L25,50 L15,45 L10,38 L12,30 Z" 
              fill="none" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
    'gabon': () => (
      <svg viewBox="0 0 100 120" className="w-full h-full" style={{ filter: 'drop-shadow(4px 6px 4px rgba(0,0,0,0.4))' }}>
        <defs>
          <clipPath id="gabon-clip">
            <path d="M25,10 L45,5 L65,8 L80,15 L90,28 L95,45 L92,65 L85,85 L72,100 L58,110 L42,112 L28,105 L18,92 L12,75 L12,55 L15,35 L20,20 Z" />
          </clipPath>
        </defs>
        <path d="M25,10 L45,5 L65,8 L80,15 L90,28 L95,45 L92,65 L85,85 L72,100 L58,110 L42,112 L28,105 L18,92 L12,75 L12,55 L15,35 L20,20 Z" 
              fill="#000" opacity="0.3" transform="translate(3, 5)"/>
        <g clipPath="url(#gabon-clip)">
          <rect x="0" y="0" width="100" height="40" fill="#009E49"/>
          <rect x="0" y="40" width="100" height="40" fill="#FCD116"/>
          <rect x="0" y="80" width="100" height="40" fill="#3A75C4"/>
        </g>
        <path d="M25,10 L45,5 L65,8 L80,15 L90,28 L95,45 L92,65 L85,85 L72,100 L58,110 L42,112 L28,105 L18,92 L12,75 L12,55 L15,35 L20,20 Z" 
              fill="none" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
    'congo': () => (
      <svg viewBox="0 0 110 150" className="w-full h-full" style={{ filter: 'drop-shadow(4px 6px 4px rgba(0,0,0,0.4))' }}>
        <defs>
          <clipPath id="congo-clip">
            <path d="M35,8 L55,5 L75,8 L90,18 L100,35 L105,55 L102,80 L95,105 L82,125 L68,138 L52,142 L38,138 L25,128 L15,112 L10,92 L10,70 L15,50 L22,30 L30,15 Z" />
          </clipPath>
        </defs>
        <path d="M35,8 L55,5 L75,8 L90,18 L100,35 L105,55 L102,80 L95,105 L82,125 L68,138 L52,142 L38,138 L25,128 L15,112 L10,92 L10,70 L15,50 L22,30 L30,15 Z" 
              fill="#000" opacity="0.3" transform="translate(3, 5)"/>
        <g clipPath="url(#congo-clip)">
          <rect x="0" y="0" width="110" height="150" fill="#009543"/>
          <polygon points="0,0 110,0 110,30 0,120" fill="#FBDE4A"/>
          <polygon points="0,120 110,30 110,60 0,150" fill="#FBDE4A"/>
          <polygon points="0,150 110,60 110,150" fill="#DC241F"/>
        </g>
        <path d="M35,8 L55,5 L75,8 L90,18 L100,35 L105,55 L102,80 L95,105 L82,125 L68,138 L52,142 L38,138 L25,128 L15,112 L10,92 L10,70 L15,50 L22,30 L30,15 Z" 
              fill="none" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
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
      {/* Fond carte du monde en niveaux de gris */}
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
              ['cameroun', 'guinée-équatoriale'],
              ['cameroun', 'gabon'],
              ['cameroun', 'congo'],
              ['gabon', 'congo'],
              ['guinée-équatoriale', 'gabon'],
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

          {countries.map((country, index) => {
            const pos = countryPositions[country.id];
            const renderSVG = countrySVGs[country.id];

            if (!pos || !renderSVG) return null;

            const totalAgencies = country.agencies.length;

            return (
              <motion.div
                key={country.id}
                className="absolute cursor-pointer group"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.1, y: -5 }}
                onClick={() => setSelectedCountry(country)}
              >
                <div 
                  className="relative transition-all duration-300"
                  style={{ 
                    width: country.id === 'cameroun' ? '140px' : 
                           country.id === 'tchad' ? '110px' :
                           country.id === 'congo' ? '120px' :
                           country.id === 'gabon' ? '100px' : '90px',
                    height: country.id === 'cameroun' ? '180px' : 
                           country.id === 'tchad' ? '180px' :
                           country.id === 'congo' ? '160px' :
                           country.id === 'gabon' ? '130px' : '70px',
                  }}
                >
                  {renderSVG()}
                </div>

                <motion.div
                  className="absolute bg-white rounded-md shadow-xl px-3 py-1.5 whitespace-nowrap"
                  style={{ 
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '-10px',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
                  <div className="text-[7px] md:text-[8px] text-gray-500 font-bold uppercase tracking-wider leading-tight">
                    Élégance Pressing
                  </div>
                  <div className="text-xs md:text-sm font-extrabold text-gray-900 leading-tight">
                    {country.name}
                  </div>
                </motion.div>
              </motion.div>
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
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                {Object.entries(groupByCity(selectedCountry.agencies)).map(([city, data]) => (
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
                            <div
                              key={agency.id}
                              className="border-l-4 border-[#FF6600] bg-gray-50 rounded-r-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <h6 className="font-bold text-gray-900 mb-2">{agency.name}</h6>
                              <p className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#FF6600]" />
                                {agency.address}
                              </p>
                              <div className="space-y-1 text-xs text-gray-600">
                                {agency.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-3 h-3 text-[#FF6600]" />
                                    <a href={`tel:${agency.phone}`} className="hover:text-[#FF6600] font-medium">
                                      {agency.phone}
                                    </a>
                                  </div>
                                )}
                                {agency.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-3 h-3 text-[#FF6600]" />
                                    <a href={`mailto:${agency.email}`} className="hover:text-[#FF6600] truncate">
                                      {agency.email}
                                    </a>
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
                            <div
                              key={depot.id}
                              className="border-l-4 border-gray-600 bg-gray-50 rounded-r-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <h6 className="font-bold text-gray-900 mb-2">{depot.name}</h6>
                              <p className="text-sm text-gray-600 mb-2 flex items-start gap-2">
                                <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-gray-600" />
                                {depot.address}
                              </p>
                              <div className="space-y-1 text-xs text-gray-600">
                                {depot.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-3 h-3 text-gray-600" />
                                    <a href={`tel:${depot.phone}`} className="hover:text-[#FF6600] font-medium">
                                      {depot.phone}
                                    </a>
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
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}