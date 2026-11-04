'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group bg-white rounded-lg border border-border overflow-hidden hover:shadow-medium transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badge catégorie */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
            {post.categoryLabel}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5">
        {/* Titre */}
        <h3 className="text-lg font-bold text-secondary mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>

        {/* Extrait */}
        <p className="text-sm text-muted mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Métadonnées */}
        <div className="flex items-center justify-between text-xs text-muted mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Lien Lire plus */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300"
        >
          Lire plus
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}