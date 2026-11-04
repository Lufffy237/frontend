export type GalleryItemType = 'image' | 'video';
export type GalleryCategory = 'evenements' | 'equipes' | 'prestations' | 'agences' | 'distinctions';

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  category: GalleryCategory;
  title: string;
  url: string;
  thumbnail: string;
  // Pour les vidéos
  videoUrl?: string;
  videoPlatform?: 'youtube' | 'facebook';
  videoId?: string;
  views?: number;
  duration?: string;
  // Stats
  likes: number;
  downloads: number;
  // Métadonnées
  date: string;
  location?: string;
}

// 🔧 Données fictives - À remplacer par l'API backend plus tard
export const GALLERY_ITEMS: GalleryItem[] = [
  // IMAGES
  {
    id: '1',
    type: 'image',
    category: 'evenements',
    title: 'Spectacle de feu - Événement corporate',
    url: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=800&h=1000&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=800&h=1000&fit=crop',
    likes: 245,
    downloads: 32,
    date: '2026-09-15',
    location: 'Douala, Cameroun',
  },
  {
    id: '2',
    type: 'image',
    category: 'equipes',
    title: 'Journée sportive des équipes',
    url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800&h=800&fit=crop',
    likes: 189,
    downloads: 21,
    date: '2026-08-22',
    location: 'Yaoundé, Cameroun',
  },
  {
    id: '3',
    type: 'image',
    category: 'agences',
    title: 'Vue aérienne de notre agence principale',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    likes: 412,
    downloads: 67,
    date: '2026-07-10',
    location: 'Douala, Cameroun',
  },
  {
    id: '4',
    type: 'image',
    category: 'evenements',
    title: 'Cérémonie de remise de prix',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1000&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1000&fit=crop',
    likes: 567,
    downloads: 89,
    date: '2026-06-18',
  },
  {
    id: '5',
    type: 'image',
    category: 'equipes',
    title: 'Équipe technique au travail',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop',
    likes: 234,
    downloads: 45,
    date: '2026-09-01',
  },
  {
    id: '6',
    type: 'image',
    category: 'prestations',
    title: 'Traitement industriel du linge',
    url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop',
    likes: 178,
    downloads: 28,
    date: '2026-08-05',
  },
  {
    id: '7',
    type: 'image',
    category: 'agences',
    title: 'Notre siège social',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=1000&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=1000&fit=crop',
    likes: 892,
    downloads: 134,
    date: '2026-05-20',
    location: 'Douala, Cameroun',
  },
  {
    id: '8',
    type: 'image',
    category: 'evenements',
    title: 'Tournoi inter-agences',
    url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=800&fit=crop',
    likes: 445,
    downloads: 56,
    date: '2026-07-30',
  },
  {
    id: '9',
    type: 'image',
    category: 'equipes',
    title: 'Formation continue du personnel',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    likes: 312,
    downloads: 41,
    date: '2026-09-10',
  },
  {
    id: '10',
    type: 'image',
    category: 'distinctions',
    title: 'Réception du prix d\'excellence 2025',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1000&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1000&fit=crop',
    likes: 1203,
    downloads: 245,
    date: '2025-12-15',
  },
  {
    id: '11',
    type: 'image',
    category: 'prestations',
    title: 'Atelier de couture et stoppage',
    url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=800&fit=crop',
    likes: 267,
    downloads: 38,
    date: '2026-08-28',
  },
  {
    id: '12',
    type: 'image',
    category: 'agences',
    title: 'Agence de Libreville',
    url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
    likes: 534,
    downloads: 72,
    date: '2026-06-05',
    location: 'Libreville, Gabon',
  },

  // VIDÉOS
  {
    id: '13',
    type: 'video',
    category: 'prestations',
    title: 'Visite de nos installations industrielles',
    url: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&h=1000&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&h=1000&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoPlatform: 'youtube',
    videoId: 'dQw4w9WgXcQ',
    views: 15420,
    duration: '3:45',
    likes: 892,
    downloads: 156,
    date: '2026-09-20',
  },
  {
    id: '14',
    type: 'video',
    category: 'evenements',
    title: 'Cérémonie d\'inauguration agence N\'Djamena',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=800&fit=crop',
    videoUrl: 'https://www.facebook.com/watch/?v=123456789',
    videoPlatform: 'facebook',
    videoId: '123456789',
    views: 8734,
    duration: '5:12',
    likes: 445,
    downloads: 89,
    date: '2026-07-15',
    location: 'N\'Djamena, Tchad',
  },
  {
    id: '15',
    type: 'video',
    category: 'equipes',
    title: 'Témoignages de nos collaborateurs',
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=abc123xyz',
    videoPlatform: 'youtube',
    videoId: 'abc123xyz',
    views: 5621,
    duration: '2:30',
    likes: 334,
    downloads: 67,
    date: '2026-08-10',
  },
  {
    id: '16',
    type: 'video',
    category: 'distinctions',
    title: 'Remise du prix ISO 9001',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1000&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=1000&fit=crop',
    videoUrl: 'https://www.facebook.com/watch/?v=987654321',
    videoPlatform: 'facebook',
    videoId: '987654321',
    views: 12890,
    duration: '4:20',
    likes: 756,
    downloads: 123,
    date: '2025-11-25',
  },
];

export const GALLERY_CATEGORIES = [
  { value: 'ALL', label: 'Toutes les catégories' },
  { value: 'evenements', label: 'Événements' },
  { value: 'equipes', label: 'Équipes' },
  { value: 'prestations', label: 'Prestations' },
  { value: 'agences', label: 'Agences' },
  { value: 'distinctions', label: 'Distinctions' },
];

export const GALLERY_TYPES = [
  { value: 'ALL', label: 'Tous les types' },
  { value: 'image', label: 'Images' },
  { value: 'video', label: 'Vidéos' },
];