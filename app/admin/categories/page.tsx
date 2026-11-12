'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Loader2, FolderOpen, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'; // ? AJOUTÉ

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    articles: number;
  };
}

export default function AdminCategoriesPage() {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  // ? États pour la modale de confirmation de suppression
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', slug: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des catégories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Le nom de la catégorie est requis');
      return;
    }

    setSubmitting(true);
    try {
      const url = editingCategory 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${editingCategory.id}`
        : process.env.NEXT_PUBLIC_API_URL + '/api/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingCategory ? 'Catégorie mise à jour' : 'Catégorie créée');
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: '', slug: '' });
        fetchCategories();
      } else {
        toast.error(data.message || 'Erreur');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    } finally {
      setSubmitting(false);
    }
  };

  // ? Ouvre la modale (avec vérification préalable des articles liés)
  const promptDelete = (id: string) => {
    const category = categories.find(c => c.id === id);
    if (category && category._count.articles > 0) {
      toast.error(`Impossible de supprimer "${category.name}" car elle contient ${category._count.articles} article(s). Déplacez ou supprimez d'abord les articles.`);
      return;
    }
    setDeleteId(id);
  };

  // ? Exécute la suppression après confirmation
  const executeDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Catégorie supprimée avec succès');
        fetchCategories();
      } else {
        toast.error(data.message || 'Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur réseau lors de la suppression');
    } finally {
      setIsDeleting(false);
      setDeleteId(null); // Ferme la modale
    }
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', slug: '' });
    setEditingCategory(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Catégories</h1>
          <p className="text-muted mt-1">Gérez les catégories de votre blog.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-soft"
        >
          <Plus className="w-4 h-4" />
          Nouvelle catégorie
        </button>
      </div>

      {/* Grille de catégories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl border border-border p-12 text-center">
            <FolderOpen className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-muted">Aucune catégorie trouvée.</p>
          </div>
        ) : (
          categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-border shadow-soft p-6 hover:shadow-medium transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FolderOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary text-lg">{category.name}</h3>
                    <p className="text-xs text-muted font-mono">/{category.slug}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-muted">
                <FileText className="w-4 h-4" />
                <span>{category._count.articles} article{category._count.articles > 1 ? 's' : ''}</span>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <button
                  onClick={() => openEditModal(category)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-surface rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Modifier
                </button>
                {/* ? Bouton modifié pour ouvrir la modale au lieu de confirm() */}
                <button
                  onClick={() => promptDelete(category.id)}
                  disabled={category._count.articles > 0}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title={category._count.articles > 0 ? "Contient des articles" : "Supprimer"}
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modale de Formulaire (Création / Édition) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-elevated w-full max-w-md"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold text-secondary">
                  {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Nom de la catégorie *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex: Actualités, Conseils d'Experts..."
                    className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="actualites (auto-généré si vide)"
                    className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                  />
                  <p className="text-xs text-muted mt-1">
                    Laissez vide pour générer automatiquement depuis le nom
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-secondary hover:bg-surface rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingCategory ? 'Mettre à jour' : 'Créer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ? Modale de confirmation de suppression personnalisée */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Supprimer cette catégorie ?"
        description="Cette action est irréversible. Assurez-vous qu'aucun article n'est encore associé à cette catégorie."
        confirmText="Oui, supprimer"
        cancelText="Annuler"
        isLoading={isDeleting}
      />
    </div>
  );
}