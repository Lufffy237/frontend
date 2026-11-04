export interface Country {
    id: string;
    name: string;
    code: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    zoom: number;
    image: string;
    agencies: number;
    depots: number;
  }
  
  export const COUNTRIES: Country[] = [
    {
      id: 'cameroun',
      name: 'CAMEROUN',
      code: 'CM',
      coordinates: { lat: 3.848, lng: 11.5021 },
      zoom: 6,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      agencies: 8,
      depots: 5,
    },
    {
      id: 'tchad',
      name: 'TCHAD',
      code: 'TD',
      coordinates: { lat: 12.1348, lng: 15.0557 },
      zoom: 5,
      image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&h=400&fit=crop',
      agencies: 3,
      depots: 2,
    },
    {
      id: 'gabon',
      name: 'GABON',
      code: 'GA',
      coordinates: { lat: -0.8037, lng: 11.6094 },
      zoom: 7,
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&h=400&fit=crop',
      agencies: 4,
      depots: 3,
    },
    {
      id: 'congo',
      name: 'CONGO',
      code: 'CG',
      coordinates: { lat: -4.2634, lng: 15.2429 },
      zoom: 6,
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&h=400&fit=crop',
      agencies: 3,
      depots: 2,
    },
    {
      id: 'rdc',
      name: 'RDC',
      code: 'CD',
      coordinates: { lat: -4.0383, lng: 21.7587 },
      zoom: 5,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop',
      agencies: 2,
      depots: 1,
    },
  ];
  
  // Position des pays sur le cercle (Cameroun au centre)
  export const COUNTRY_POSITIONS: Record<string, { x: number; y: number }> = {
    cameroun: { x: 50, y: 50 }, // Centre
    tchad: { x: 50, y: 10 },    // Haut
    gabon: { x: 85, y: 50 },    // Droite
    congo: { x: 50, y: 90 },    // Bas
    rdc: { x: 15, y: 50 },      // Gauche
  };