'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Facebook, Loader2 } from 'lucide-react';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogFilters } from '@/components/blog/BlogFilters';
import { BlogCard } from '@/components/blog/BlogCard';
import { Pagination } from '@/components/blog/Pagination';
import { FloatingButtons } from '@/components/services/FloatingButtons';
import { toast } from 'sonner';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
  readTime: string | null;
  category: { name: string; slug: string } | null;
  author: { name: string };
  tags: string[];
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString(),
        });
        if (selectedCategory !== 'ALL') {
          params.append('category', selectedCategory);
        }

        const res = await fetch(`http://localhost:5000/api/articles/public?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setArticles(data.data);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        toast.error('Erreur de chargement des articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-surface">
      <BlogHero />

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogFilters
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : articles.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((post, index) => (
                  <BlogCard 
                    key={post.id} 
                    post={{
                      ...post,
                      content: post.content || '',
                      image: post.coverImage || 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800',
                      categoryLabel: post.category?.name || 'Non catégorisé',
                      category: (post.category?.slug as "recrutement" | "conseils" | "actualites") || "actualites",
                      publishedAt: post.createdAt,
                      readTime: post.readTime || '3 min',
                      // ✅ CORRECTION : On extrait le nom de l'auteur pour correspondre au type string attendu par BlogCard
                      author: post.author?.name || 'Élégance Pressing'
                    }} 
                    index={index} 
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-muted text-lg">Aucun article ne correspond à cette catégorie pour le moment.</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-12 bg-white border-t border-border">
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