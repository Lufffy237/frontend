'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Loader2, Award as AwardIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { ImageUploader } from '@/components/admin/ImageUploader';

export default function AdminAwardsPage() {
  const { token } = useAuth();
  const [awards, setAwards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({ title: '', year: new Date().getFullYear(), issuer: '', image: '', order: 0 });

  const fetchData = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/awards', { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setAwards(data.data);
    } catch (e) { toast.error('Erreur de chargement'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editing ? `${process.env.NEXT_PUBLIC_API_URL}/api/awards/${editing.id}` : process.env.NEXT_PUBLIC_API_URL + '/api/awards';
      const res = await fetch(url, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, year: parseInt(formData.year as any) }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing ? 'Mis à jour' : 'Ajouté');
        setIsModalOpen(false); setEditing(null); setFormData({ title: '', year: new Date().getFullYear(), issuer: '', image: '', order: 0 });
        fetchData();
      }
    } catch (e) { toast.error('Erreur réseau'); }
    finally { setSubmitting(false); }
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/awards/${deleteId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) { toast.success('Supprimé'); fetchData(); }
    } catch (e) { toast.error('Erreur'); }
    finally { setIsDeleting(false); setDeleteId(null); }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-bold text-secondary">Distinctions</h1><p className="text-muted mt-1">Gérez les prix et certifications de l'entreprise.</p></div>
        <button onClick={() => { setEditing(null); setFormData({ title: '', year: new Date().getFullYear(), issuer: '', image: '', order: 0 }); setIsModalOpen(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-soft">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface border-b border-border">
            <tr><th className="px-6 py-4 font-semibold text-secondary">Image</th><th className="px-6 py-4 font-semibold text-secondary">Titre</th><th className="px-6 py-4 font-semibold text-secondary">Année</th><th className="px-6 py-4 font-semibold text-secondary">Délivré par</th><th className="px-6 py-4 font-semibold text-secondary text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {awards.map((a) => (
              <tr key={a.id} className="hover:bg-surface/50">
                <td className="px-6 py-4"><div className="w-12 h-12 bg-surface rounded flex items-center justify-center overflow-hidden">{a.image ? <img src={a.image} alt={a.title} className="w-full h-full object-cover" /> : <AwardIcon className="w-5 h-5 text-muted" />}</div></td>
                <td className="px-6 py-4 font-medium text-secondary">{a.title}</td>
                <td className="px-6 py-4 text-muted">{a.year}</td>
                <td className="px-6 py-4 text-muted">{a.issuer || '-'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => { setEditing(a); setFormData({ title: a.title, year: a.year, issuer: a.issuer || '', image: a.image || '', order: a.order }); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteId(a.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-xl shadow-elevated w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-secondary">{editing ? 'Modifier' : 'Ajouter'}</h2><button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button></div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <ImageUploader value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} label="Image du prix/certificat" />
                <input required type="text" placeholder="Titre de la distinction *" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="number" placeholder="Année *" value={formData.year} onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  <input type="number" placeholder="Ordre" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <input type="text" placeholder="Délivré par (ex: ISO, Ministère...)" value={formData.issuer} onChange={e => setFormData({ ...formData, issuer: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-secondary hover:bg-surface rounded-lg">Annuler</button>
                  <button type="submit" disabled={submitting} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover flex items-center gap-2 disabled:opacity-50">
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />} {editing ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={executeDelete} title="Supprimer cette distinction ?" description="Cette action est irréversible." confirmText="Oui, supprimer" isLoading={isDeleting} />
    </div>
  );
}