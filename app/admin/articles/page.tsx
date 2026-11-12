'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'; // ? AJOUTÉ

interface Article {
  id: string;
  title: string;
  slug: string;       // ? AJOUTÉ
  excerpt: string;
  published: boolean;
  createdAt: string;
  category: { name: string } | null;
  author: { name: string };
}

export default function AdminArticlesPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ? États pour la modale de confirmation de suppression
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/articles', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setArticles(data.data);
    } catch (error) {
      toast.error('Erreur de chargement des articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, [token]);

  // ? Ouvre la modale de confirmation
  const promptDelete = (id: string) => {
    setDeleteId(id);
  };

  // ? Exécute la suppression après confirmation
  const executeDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        toast.success('Article supprimé avec succès');
        fetchArticles(); // Rafraîchir la liste
      } else {
        toast.error('Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur réseau lors de la suppression');
    } finally {
      setIsDeleting(false);
      setDeleteId(null); // Ferme la modale
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Articles & Blog</h1>
          <p className="text-muted mt-1">Gérez le contenu de votre espace info.</p>
        </div>
        <button
          onClick={() => router.push('/admin/articles/nouveau')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-soft"
        >
          <Plus className="w-4 h-4" />
          Nouvel article
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="px-6 py-4 font-semibold text-secondary">Titre</th>
              <th className="px-6 py-4 font-semibold text-secondary">Catégorie</th>
              <th className="px-6 py-4 font-semibold text-secondary">Auteur</th>
              <th className="px-6 py-4 font-semibold text-secondary">Statut</th>
              <th className="px-6 py-4 font-semibold text-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {articles.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-muted">Aucun article trouvé.</td></tr>
            ) : (
              articles.map((article) => (
                <tr key={article.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-surface flex items-center justify-center text-muted">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{article.title}</p>
                        <p className="text-xs text-muted truncate max-w-xs">{article.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">{article.category?.name || 'Non catégorisé'}</td>
                  <td className="px-6 py-4 text-muted">{article.author.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      article.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {article.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => router.push(`/blog/${article.slug}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Voir">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => router.push(`/admin/articles/${article.id}`)} className="p-2 text-secondary hover:bg-surface rounded-lg" title="Modifier">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {/* ? Bouton modifié pour ouvrir la modale au lieu de confirm() */}
                      <button onClick={() => promptDelete(article.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Supprimer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ? Modale de confirmation de suppression personnalisée */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Supprimer cet article ?"
        description="Cette action est irréversible. L'article sera définitivement retiré du site public et ne pourra pas être récupéré."
        confirmText="Oui, supprimer"
        cancelText="Annuler"
        isLoading={isDeleting}
      />
    </div>
  );
}