'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

// Import dynamique de React Quill pour éviter les erreurs SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function ArticleEditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const isNew = id === 'nouveau';

  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<any[]>([]); // ✅ Déplacé au niveau supérieur
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    categoryId: '',
    tags: '',
    published: false,
  });

  // 1. Charger l'article si on est en mode édition
  useEffect(() => {
    if (!isNew) {
      const fetchArticle = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/articles/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            setFormData({
              title: data.data.title,
              slug: data.data.slug,
              excerpt: data.data.excerpt || '',
              content: data.data.content,
              coverImage: data.data.coverImage || '',
              categoryId: data.data.categoryId || '',
              tags: data.data.tags ? data.data.tags.join(', ') : '',
              published: data.data.published,
            });
          }
        } catch (error) {
          toast.error('Erreur de chargement de l\'article');
          router.push('/admin/articles');
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id, isNew, token, router]);

  // 2. Charger les catégories pour le sélecteur
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/categories', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setCategories(data.data);
      } catch (error) {
        console.error('Erreur de chargement des catégories');
      }
    };
    fetchCategories();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Le titre et le contenu sont requis');
      return;
    }

    setSubmitting(true);
    try {
      const url = isNew ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/articles' : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/articles/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };
      
      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? 'Article créé avec succès' : 'Article mis à jour');
        router.push('/admin/articles');
      } else {
        toast.error(data.message || 'Erreur');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={() => router.push('/admin/articles')} className="flex items-center gap-2 text-muted hover:text-secondary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour à la liste
      </button>

      <motion.form 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        {/* En-tête de l'éditeur */}
        <div className="bg-white p-6 rounded-xl border border-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Titre de l'article"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-3xl font-bold text-secondary placeholder:text-gray-300 border-none focus:ring-0 p-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm font-medium text-secondary">Publier immédiatement</span>
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Enregistrer
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Colonne principale : Contenu */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-soft">
              <label className="block text-sm font-medium text-secondary mb-2">Contenu de l'article</label>
              <div className="min-h-[400px] bg-white">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  className="h-[350px] mb-12"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                />
              </div>
            </div>
          </div>

          {/* Colonne latérale : Métadonnées */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-soft">
              <h3 className="font-semibold text-secondary mb-4">Métadonnées</h3>
              
              <div className="space-y-4">
                {/* ✅ Sélecteur de catégorie ajouté ici */}
                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Catégorie</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >
                    <option value="">Aucune catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Slug (URL)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="mon-super-article"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Extrait (Résumé)</label>
                  <textarea
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Court résumé pour les cartes..."
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted mb-1">Tags (séparés par des virgules)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="conseils, blanchisserie, astuce"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border shadow-soft">
              <h3 className="font-semibold text-secondary mb-4">Image de couverture</h3>
              <div className="relative">
                {formData.coverImage ? (
                  <div className="relative group">
                    <img src={formData.coverImage} alt="Cover" className="w-full h-40 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImage: '' })}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-muted mx-auto mb-2" />
                    <p className="text-xs text-muted">Collez l'URL de l'image ci-dessous</p>
                  </div>
                )}
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full mt-3 px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  );
}