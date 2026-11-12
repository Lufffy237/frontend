'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Facebook, Linkedin, ChevronDown, Home } from 'lucide-react';

interface Agency {
  id: string;
  name: string;
  province: string | null;
  address: string;
  phone: string | null;
  email: string | null;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL + '';
        const res = await fetch(`${apiUrl}/api/agencies/public`);
        const data = await res.json();
        if (data.success) {
          setAgencies(data.data);
          if (data.data.length > 0) {
            setSelectedAgency(data.data[0]);
          }
        }
      } catch (error) {
        console.error('Erreur de chargement des agences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencies();
  }, []);

  const handleAgencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const agencyId = e.target.value;
    if (agencyId) {
      router.push(`/agences?agency=${agencyId}`);
    }
  };

  return (
    <footer className="bg-[#1a1a1a] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="#f97316"/>
                    <path d="M50 25 C35 25, 25 35, 25 50 C25 65, 35 75, 50 75 C65 75, 75 65, 75 50 C75 35, 65 25, 50 25 Z M50 35 C58 35, 65 42, 65 50 C65 58, 58 65, 50 65 C42 65, 35 58, 35 50 C35 42, 42 35, 50 35 Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight">
                    <span className="text-white">ELEGANCE</span>{' '}
                    <span className="text-[#f97316]">PRESSING</span>
                  </h3>
                  <p className="text-xs text-gray-400 tracking-widest uppercase">
                    Propre c'est élégant
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <a href="https://facebook.com/elegancepressing" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#f97316] transition-colors duration-300">
                <Facebook className="w-5 h-5 text-[#1a1a1a]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#f97316] transition-colors duration-300">
                <Linkedin className="w-5 h-5 text-[#1a1a1a]" />
              </a>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-300 mb-3">Trouver une agence</p>
              {loading ? (
                <div className="h-10 bg-white/10 rounded animate-pulse" />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 relative">
                    <select
                      value=""
                      onChange={handleAgencyChange}
                      className="w-full px-3 py-2.5 rounded bg-white text-[#1a1a1a] text-sm appearance-none cursor-pointer focus:outline-none font-medium"
                    >
                      <option value="" disabled>Sélectionnez une agence</option>
                      {agencies.map((agency) => (
                        <option key={agency.id} value={agency.id}>
                          {agency.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a] pointer-events-none" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Navigation</h3>
            <ul className="space-y-2">
              {['Accueil', 'Services', 'À propos', 'Nos étapes', 'Blog', 'Carrières', 'Galerie', 'Nos agences', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Accueil' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-300 text-sm hover:text-[#f97316] transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Nos Services</h3>
            <ul className="space-y-2">
              {['Nettoyage à sec', 'Lavage professionnel', 'Repassage', 'Traitement des textiles', 'Service express', 'Collecte et livraison', 'FAQs', 'À propos de nous'].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-gray-300 text-sm hover:text-[#f97316] transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Nos Agences</h3>
            <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
              {agencies.map((agency) => (
                <div key={agency.id}>
                  <p className="font-bold text-sm text-white">{agency.name}</p>
                  <p className="text-gray-400 text-xs">{agency.province}</p>
                  {agency.phone && (
                    <p className="text-gray-400 text-xs">{agency.phone}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f97316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="border-2 border-[#f97316] rounded-sm">
            <div className="bg-[#f97316] px-4 py-2">
              <h4 className="text-center font-bold text-white text-sm uppercase tracking-wide">
                SIEGE SOCIAL, DIRECTION GENERALE & REGIONALES AU CAMEROUN
              </h4>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h5 className="font-bold text-xs mb-2 text-white uppercase">SIEGE SOCIAL & DIRECTION GENERALE</h5>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    9 Av. De Gaulle Bonanjo, Face Beac<br />
                    BP: 12 695 Douala<br />
                    Tél: 237 233 43 35 27 / 233 43 85 01<br />
                    E-mail: elegancepressing@yahoo.fr
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-xs mb-2 text-white uppercase">DIRECTION REGIONALE DU CENTRE-SUD-EST</h5>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Elig-Essono, Face Immeuble Torrès<br />
                    B.P: 6944 Yaoundé<br />
                    Tél: 237 222 21 76 40 / 698 94 22 19
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-xs mb-2 text-white uppercase">DIRECTION REGIONALE DE L'OUEST</h5>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Dschang, Ancien Abidjan en face de Fokou<br />
                    Tél: 237 698 88 00 65
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-xs mb-2 text-white uppercase">DIRECTION REGIONALE DU GRAND-NORD</h5>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Kousseri, Quartier résidentiel en face Hôtel La Paix<br />
                    Tél: +237 691 81 90 74
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f97316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="border-2 border-[#f97316] rounded-sm">
            <div className="bg-[#f97316] px-4 py-2">
              <h4 className="text-center font-bold text-white text-sm uppercase tracking-wide">
                LES REPRESENTATIONS ETRANGERES DANS LA CEMAC
              </h4>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h5 className="font-bold text-xs mb-2 text-white uppercase">
                    REPRESENTATION DE LA GUINEE EQUATORIALE<br />MALABO
                  </h5>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    CAYDASA-UNGE, Al lado de Getesa-Los Angeles<br />
                    Tél: 00240 222 221 454 / 00240 222 696 126<br />
                    E-mail: elegancepressinggqe@gmail.com
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-xs mb-2 text-white uppercase">
                    REPRESENTATION DU TCHAD<br />NDJAMENA
                  </h5>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Moursal à côté de l'immeuble SOTEL TCHAD<br />
                    Tél: +235 66 20 67 79<br />
                    E-mail: elegancepressingtchad@gmail.com
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-xs mb-2 text-white uppercase">
                    REPRESENTATION DU CONGO<br />BRAZAVILLE
                  </h5>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Avenue Charles De Gaulle N°213 Marché plateau-ville (Ex-trésor)<br />
                    B.P: 11610 BRAZAVILLE<br />
                    Tél: +242 055 024 498 / 068 619 004<br />
                    E-mail: elegancepressingcongo1@gmail.com
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-xs mb-2 text-white uppercase">
                    REPRESENTATION DU GABON<br />LIBREVILLE
                  </h5>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    Centre Ville, Face BGD, à côté de l'immeuble CIMA-<br />
                    B.P: 14305 Libreville<br />
                    Tél: +241 07 33 83 80<br />
                    E-mail: elegancepressinggabon@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link href="/politique-confidentialite" className="text-gray-400 text-xs hover:text-[#f97316] transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/conditions-generales" className="text-gray-400 text-xs hover:text-[#f97316] transition-colors">
                Conditions générales
              </Link>
            </div>
            <p className="text-gray-400 text-xs text-center">
              © {currentYear} <span className="text-white font-semibold">Élégance Pressing</span>. Tous Droits Réservés.
            </p>
            <p className="text-gray-400 text-xs">
              conçu par le service informatique
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}