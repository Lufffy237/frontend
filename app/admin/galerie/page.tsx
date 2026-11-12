'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Loader2, Image as ImageIcon, Video, MapPin, Eye, Heart, Download } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

type MediaType = 'IMAGE' | 'VIDEO';
type MediaCategory = 'EVENEMENTS' | 'EQUIPES' | 'PRESTATIONS' | 'AGENCES' | 'DISTINCTIONS';

interface GalleryItem {
  id: string;
  type: MediaType;
  category: MediaCategory;
  title: string;
  url: string;
  thumbnail: string | null;
  videoUrl: string | null;
  videoPlatform: string | null;
  videoId: string | null;   // ? AJOUTÉ
  duration: string | null;
  location: string | null;
  views: number;
  likes: number;
  downloads: number;
}

const CATEGORIES: MediaCategory[] = ['EVENEMENTS', 'EQUIPES', 'PRESTATIONS', 'AGENCES', 'DISTINCTIONS'];

export default function AdminGalleryPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtres
  const [filterType, setFilterType] = useState<'ALL' | MediaType>('ALL');
  const [filterCategory, setFilterCategory] = useState<'ALL' | MediaCategory>('ALL');

  // Modale et Formulaire
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'IMAGE' as MediaType,
    category: 'EVENEMENTS' as MediaCategory,
    title: '',
    url: '',
    thumbnail: '',
    videoUrl: '',
    videoPlatform: 'youtube',
    videoId: '',
    duration: '',
    location: '',
  });

  // Suppression
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams();
      if (filterType !== 'ALL') params.append('type', filterType);
      if (filterCategory !== 'ALL') params.append('category', filterCategory);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (error) {
      toast.error('Erreur de chargement de la galerie');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, [token, filterType, filterCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) {
      toast.error('Le titre et l\'URL principale sont requis');
      return;
    }

    setSubmitting(true);
    try {
      const url = editingItem ? `${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${editingItem.id}` : process.env.NEXT_PUBLIC_API_URL + '/api/gallery';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingItem ? 'Élément mis à jour' : 'Élément ajouté');
        setIsModalOpen(false);
        setEditingItem(null);
        resetForm();
        fetchItems();
      } else {
        toast.error(data.message || 'Erreur');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    } finally {
      setSubmitting(false);
    }
  };

  const promptDelete = (id: string) => setDeleteId(id);

  const executeDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Élément supprimé');
        fetchItems();
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      category: item.category,
      title: item.title,
      url: item.url,
      thumbnail: item.thumbnail || '',
      videoUrl: item.videoUrl || '',
      videoPlatform: item.videoPlatform || 'youtube',
      videoId: item.videoId || '',
      duration: item.duration || '',
      location: item.location || '',
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      type: 'IMAGE', category: 'EVENEMENTS', title: '', url: '', thumbnail: '',
      videoUrl: '', videoPlatform: 'youtube', videoId: '', duration: '', location: ''
    });
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Galerie Multimédia</h1>
          <p className="text-muted mt-1">Gérez les images et vidéos du site public.</p>
        </div>
        <button
          onClick={() => { resetForm(); setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-soft"
        >
          <Plus className="w-4 h-4" />
          Ajouter un média
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="ALL">Tous les types</option>
          <option value="IMAGE">Images uniquement</option>
          <option value="VIDEO">Vidéos uniquement</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as any)}
          className="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="ALL">Toutes les catégories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Grille de médias */}
      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <ImageIcon className="w-12 h-12 text-muted mx-auto mb-4" />
          <p className="text-muted">Aucun média trouvé pour ces filtres.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl border border-border shadow-soft overflow-hidden group hover:shadow-medium transition-all"
            >
              {/* Aperçu */}
              <div className="relative aspect-video bg-surface overflow-hidden">
                <img 
                  src={item.thumbnail || item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase text-white ${item.type === 'VIDEO' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {item.type === 'VIDEO' ? 'Vidéo' : 'Image'}
                  </span>
                  <span className="px-2 py-1 rounded text-[10px] font-bold uppercase text-white bg-black/60 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                {item.type === 'VIDEO' && item.duration && (
                  <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
                    {item.duration}
                  </span>
                )}
              </div>

              {/* Infos */}
              <div className="p-4">
                <h3 className="font-semibold text-secondary text-sm mb-2 line-clamp-2">{item.title}</h3>
                
                <div className="flex items-center gap-3 text-xs text-muted mb-4">
                  {item.location && (
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                  )}
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {item.views}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {item.likes}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <button onClick={() => openEditModal(item)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-secondary hover:bg-surface rounded-lg transition-colors">
                    <Edit2 className="w-3.5 h-3.5" /> Modifier
                  </button>
                  <button onClick={() => promptDelete(item.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modale de Formulaire Dynamique */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-secondary">{editingItem ? 'Modifier le média' : 'Nouveau média'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Type et Catégorie */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1.5">Type de média *</label>
                    <select 
                      value={formData.type} 
                      onChange={(e) => setFormData({...formData, type: e.target.value as MediaType})}
                      className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="IMAGE">Image</option>
                      <option value="VIDEO">Vidéo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1.5">Catégorie *</label>
                    <select 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value as MediaCategory})}
                      className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                {/* Titre et Lieu */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-secondary mb-1.5">Titre *</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1.5">Lieu (optionnel)</label>
                    <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="ex: Douala" className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                </div>

                {/* Champs spécifiques IMAGE */}
                {formData.type === 'IMAGE' && (
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1.5">URL de l'image *</label>
                    <input required type="url" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="https://..." className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm" />
                  </div>
                )}

                {/* Champs spécifiques VIDEO */}
                {formData.type === 'VIDEO' && (
                  <div className="space-y-4 p-4 bg-surface rounded-lg border border-border">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1.5">Plateforme *</label>
                        <select value={formData.videoPlatform} onChange={e => setFormData({...formData, videoPlatform: e.target.value})} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                          <option value="youtube">YouTube</option>
                          <option value="facebook">Facebook</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1.5">ID ou URL de la vidéo *</label>
                        <input required type="text" value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} placeholder="https://youtube.com/watch?v=..." className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1.5">ID Vidéo (ex: dQw4w9WgXcQ)</label>
                        <input type="text" value={formData.videoId} onChange={e => setFormData({...formData, videoId: e.target.value})} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-secondary mb-1.5">Durée (ex: 3:45)</label>
                        <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary mb-1.5">URL de la miniature (Thumbnail) *</label>
                      <input required type="url" value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} placeholder="https://..." className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm" />
                    </div>
                  </div>
                )}

                {/* Actions du formulaire */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-secondary hover:bg-surface rounded-lg transition-colors font-medium">Annuler</button>
                  <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50 shadow-soft">
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingItem ? 'Mettre à jour' : 'Ajouter à la galerie'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modale de confirmation de suppression */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Supprimer ce média ?"
        description="Cette action est irréversible. L'image ou la vidéo sera retirée de la galerie publique."
        confirmText="Oui, supprimer"
        cancelText="Annuler"
        isLoading={isDeleting}
      />
    </div>
  );
}