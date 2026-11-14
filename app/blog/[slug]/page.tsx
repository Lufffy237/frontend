'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag, Loader2 } from 'lucide-react';
import { FloatingButtons } from '@/components/services/FloatingButtons';
import { toast } from 'sonner';

interface ArticleDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  createdAt: string;
  readTime: string | null;
  tags: string[];
  category: { name: string; slug: string } | null;
  author: { name: string };
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `'${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}`}/api/articles/public/${slug}`);
        const data = await res.json();

        if (data.success) {
          setPost(data.data);
          
          // Récupérer les articles similaires (même catégorie)
          const catSlug = data.data.category?.slug || 'ALL';
          const resRelated = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `'${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}`}/api/articles/public?category=${catSlug}&limit=4`);
          const dataRelated = await resRelated.json();
          
          if (dataRelated.success) {
            setRelatedPosts(
              dataRelated.data.filter((p: any) => p.id !== data.data.id).slice(0, 3)
            );
          }
        }
      } catch (error) {
        toast.error('Erreur de chargement de l\'article');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary mb-4">Article introuvable</h1>
          <p className="text-muted mb-8">Cet article n'existe pas ou n'est pas encore publié.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero article */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.coverImage || 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1920'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>

        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-white text-sm font-bold mb-4">
              {post.category?.name || 'Non catégorisé'}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.readTime || '3 min'} de lecture</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contenu article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-lg max-w-none">
          <p className="text-xl text-muted leading-relaxed mb-8 italic border-l-4 border-primary pl-6">{post.excerpt}</p>
          
          <div className="text-muted leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-primary" />
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-surface border border-border text-sm text-secondary">{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-between">
            <Link href="/blog" className="inline-flex items-center gap-2 text-secondary font-semibold hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour au blog
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Articles similaires */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-surface border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-secondary mb-8">Articles similaires</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group bg-white rounded-lg border border-border overflow-hidden hover:shadow-medium transition-all duration-300">
                  <div className="h-40 overflow-hidden">
                    <img src={relatedPost.coverImage || 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800'} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-secondary text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">{relatedPost.title}</h3>
                    <p className="text-xs text-muted">{new Date(relatedPost.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FloatingButtons />
    </div>
  );
}