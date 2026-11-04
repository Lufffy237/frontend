'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Download, Play, Eye, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import type { GalleryItem as GalleryItemType } from '@/lib/gallery';

interface GalleryItemProps {
  item: GalleryItemType;
  index: number;
  onLike: (id: string) => void;
  onDownload: (item: GalleryItemType) => void;
}

export function GalleryItemCard({ item, index, onLike, onDownload }: GalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hauteur variable selon l'index pour effet masonry
  const heightClass = index % 5 === 0 ? 'h-96' : index % 3 === 0 ? 'h-80' : 'h-64';

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Pour les vidéos, démarrer l'aperçu après 500ms
    if (item.type === 'video') {
      hoverTimerRef.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    onLike(item.id);
    toast.success(isLiked ? 'Like retiré' : 'Ajouté aux favoris ❤️');
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(item);
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.videoUrl) {
      window.open(item.videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Incrémenter fictivement les vues au montage
  useEffect(() => {
    // Simule une vue supplémentaire à chaque chargement
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 9) * 0.05 }}
      className="relative group rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Conteneur image/vidéo */}
      <div className={`relative w-full ${heightClass} overflow-hidden bg-surface`}>
        {item.type === 'video' ? (
          <>
            {/* Thumbnail */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110 blur-sm' : 'scale-100'
              }`}
              loading="lazy"
            />

            {/* Vidéo aperçu au survol */}
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={item.thumbnail} type="video/mp4" />
            </video>

            {/* Badge Vidéo */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-medium">
                <Play className="w-3 h-3 fill-white" />
                VIDÉO
              </span>
              {item.duration && (
                <span className="px-2 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                  {item.duration}
                </span>
              )}
            </div>

            {/* Compteur de vues */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
              <Eye className="w-3 h-3" />
              <span>{item.views?.toLocaleString('fr-FR') || 0}</span>
            </div>

            {/* Overlay play au centre */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button
                onClick={handleVideoClick}
                className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 shadow-elevated"
                aria-label="Lire la vidéo"
              >
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </button>
            </div>

            {/* Plateforme */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 text-white text-xs backdrop-blur-sm">
              <ExternalLink className="w-3 h-3" />
              <span className="capitalize">{item.videoPlatform}</span>
            </div>
          </>
        ) : (
          <>
            {/* Image */}
            <img
              src={item.url}
              alt={item.title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              loading="lazy"
            />

            {/* Badge type si nécessaire */}
            {item.category === 'distinctions' && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-medium">
                  ★ DISTINCTION
                </span>
              </div>
            )}
          </>
        )}

        {/* Overlay gradient au hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Titre au hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
            {item.title}
          </h3>
          {item.location && (
            <p className="text-white/70 text-xs">{item.location}</p>
          )}
        </div>

        {/* Boutons d'action (like + download) */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <button
            onClick={handleLike}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-medium transition-all duration-300 hover:scale-110 ${
              isLiked
                ? 'bg-primary text-white'
                : 'bg-white/90 backdrop-blur-sm text-secondary hover:bg-primary hover:text-white'
            }`}
            aria-label={isLiked ? 'Retirer le like' : 'Aimer'}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={handleDownload}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-secondary flex items-center justify-center shadow-medium hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            aria-label="Télécharger"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Compteur de likes en bas */}
        <div
          className={`absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 text-white text-xs backdrop-blur-sm transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Heart className={`w-3 h-3 ${isLiked ? 'fill-primary text-primary' : ''}`} />
          <span>{likeCount.toLocaleString('fr-FR')}</span>
        </div>
      </div>
    </motion.div>
  );
}