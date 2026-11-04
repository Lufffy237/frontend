'use client';

import type { GalleryItem } from '@/lib/gallery';
import { GalleryItemCard } from './GalleryItem';

interface GalleryGridProps {
  items: GalleryItem[];
  onLike: (id: string) => void;
  onDownload: (item: GalleryItem) => void;
}

export function GalleryGrid({ items, onLike, onDownload }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted text-lg">
          Aucun résultat ne correspond à votre recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="break-inside-avoid">
          <GalleryItemCard
            item={item}
            index={index}
            onLike={onLike}
            onDownload={onDownload}
          />
        </div>
      ))}
    </div>
  );
}