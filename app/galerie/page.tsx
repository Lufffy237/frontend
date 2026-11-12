'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Facebook, Loader2 } from 'lucide-react';
import { GalleryHero } from '@/components/gallery/GalleryHero';
import { GalleryFilters } from '@/components/gallery/GalleryFilters';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { FloatingButtons } from '@/components/services/FloatingButtons';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
// ? IMPORT DU TYPE OFFICIEL
import type { GalleryItem } from '@/lib/gallery';

export default function GalleryPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');

  // 1. Récupérer les données depuis l'API backend
  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedType !== 'ALL') params.append('type', selectedType);
        if (selectedCategory !== 'ALL') params.append('category', selectedCategory);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery?${params.toString()}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });
        
        const data = await res.json();
        if (data.success) {
          // ? Mappage pour transformer les données API en type GalleryItem officiel
          const mappedItems: GalleryItem[] = data.data.map((item: any) => ({
            id: item.id,
            // Conversion 'IMAGE'/'VIDEO' -> 'image'/'video'
            type: item.type === 'IMAGE' ? 'image' : 'video',
            // Conversion catégorie (ajustez selon les valeurs de votre lib/gallery.ts)
            category: item.category || 'EVENEMENTS',
            title: item.title,
            url: item.url,
            thumbnail: item.thumbnail || null,
            videoUrl: item.videoUrl || null,
            videoPlatform: item.videoPlatform || null,
            duration: item.duration || null,
            location: item.location || null,
            views: item.views || 0,
            likes: item.likes || 0,
            downloads: item.downloads || 0,
            date: item.createdAt || new Date().toISOString(),
          }));
          setItems(mappedItems);
        }
      } catch (error) {
        console.error('Erreur de chargement de la galerie:', error);
        toast.error('Impossible de charger la galerie');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [selectedType, selectedCategory, token]);

  // 2. Filtrer par recherche textuelle côté client
  const filteredItems = useMemo(() => {
    if (!search) return items;
    
    return items.filter((item) => {
      const searchLower = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        (item.location && item.location.toLowerCase().includes(searchLower))
      );
    });
  }, [items, search]);

  // 3. Gestion du Like
  const handleLike = async (id: string) => {
    try {
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      ));
      toast.success('Ajouté aux favoris ??');
    } catch (error) {
      toast.error('Erreur lors du like');
    }
  };

  // 4. Gestion du Téléchargement
  const handleDownload = (item: GalleryItem) => {
    if (item.type === 'video') {
      toast.info('Redirection vers la vidéo complète...');
      if (item.videoUrl) {
        window.open(item.videoUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      const link = document.createElement('a');
      link.href = item.url;
      const fileName = item.url.split('/').pop() || `elegance-pressing-${item.id}.jpg`;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Téléchargement lancé ??');
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <GalleryHero />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar filtres */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24">
                <h3 className="font-bold text-secondary mb-4">Filtrer</h3>
                <GalleryFilters
                  search={search}
                  onSearchChange={setSearch}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedType={selectedType}
                  onTypeChange={setSelectedType}
                />

                <div className="mt-6 p-4 rounded-lg bg-surface border border-border">
                  <p className="text-sm text-muted">
                    <span className="font-bold text-primary text-lg">
                      {loading ? '...' : filteredItems.length}
                    </span>{' '}
                    résultat{filteredItems.length > 1 ? 's' : ''} trouvé{filteredItems.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </motion.aside>

            {/* Grille */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <GalleryGrid
                  items={filteredItems}
                  onLike={handleLike}
                  onDownload={handleDownload}
                />
              )}
              
              {!loading && filteredItems.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted text-lg">Aucun média ne correspond à votre recherche.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-surface border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.a
            href="https://facebook.com/elegancepressing"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 text-primary font-bold text-sm md:text-base tracking-wider hover:underline"
          >
            <Facebook className="w-5 h-5" />
            DÉCOUVRIR PLUS SUR NOTRE PAGE FACEBOOK
          </motion.a>
        </div>
      </section>

      <FloatingButtons />
    </div>
  );
}