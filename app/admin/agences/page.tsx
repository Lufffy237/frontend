'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Loader2, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

// Interface alignée avec les données de l'API Admin
interface Agency {
  id: string;
  name: string;
  type: 'AGENCY' | 'DEPOT';
  country: string;
  city: string;
  province: string | null;
  address: string;
  phone: string | null;
  email: string | null;
  hours: string | null;
  latitude: number | null;
  longitude: number | null;
  published: boolean;
}

export default function AdminAgenciesPage() {
  const { token } = useAuth();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', type: 'AGENCY', country: '', city: '', province: '',
    address: '', phone: '', email: '', hours: '', latitude: '', longitude: '', published: true
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchAgencies = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/agencies', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setAgencies(data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des agences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAgencies(); }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingAgency 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/agencies/${editingAgency.id}`
        : process.env.NEXT_PUBLIC_API_URL + '/api/agencies';
      
      const res = await fetch(url, {
        method: editingAgency ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingAgency ? 'Agence mise à jour' : 'Agence créée');
        setIsModalOpen(false);
        setEditingAgency(null);
        resetForm();
        fetchAgencies();
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agencies/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Agence supprimée avec succès');
        fetchAgencies();
      } else {
        toast.error(data.message || 'Erreur lors de la suppression');
      }
    } catch (error) {
      toast.error('Erreur réseau lors de la suppression');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const openEditModal = (agency: Agency) => {
    setEditingAgency(agency);
    setFormData({
      name: agency.name, 
      type: agency.type, 
      country: agency.country, 
      city: agency.city,
      province: agency.province || '', 
      address: agency.address, 
      phone: agency.phone || '',
      email: agency.email || '', 
      hours: agency.hours || '', 
      latitude: agency.latitude?.toString() || '', 
      longitude: agency.longitude?.toString() || '',
      published: agency.published
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '', type: 'AGENCY', country: '', city: '', province: '',
      address: '', phone: '', email: '', hours: '', latitude: '', longitude: '', published: true
    });
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Gestion des Agences</h1>
          <p className="text-muted mt-1">Gérez les implantations, agences et dépôts.</p>
        </div>
        <button
          onClick={() => { resetForm(); setEditingAgency(null); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-soft"
        >
          <Plus className="w-4 h-4" /> Ajouter une agence
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-secondary">Nom</th>
                <th className="px-6 py-4 font-semibold text-secondary">Type</th>
                <th className="px-6 py-4 font-semibold text-secondary">Localisation</th>
                <th className="px-6 py-4 font-semibold text-secondary">Contact</th>
                <th className="px-6 py-4 font-semibold text-secondary">Statut</th>
                <th className="px-6 py-4 font-semibold text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {agencies.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-muted">Aucune agence trouvée.</td></tr>
              ) : (
                agencies.map((agency) => (
                  <tr key={agency.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-secondary">{agency.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${agency.type === 'AGENCY' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                        {agency.type === 'AGENCY' ? 'AGENCE' : 'DÉPÔT'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {agency.city}, {agency.country}</div>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {agency.phone && <div className="flex items-center gap-1"><Phone className="w-3 h-3" /> {agency.phone}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${agency.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {agency.published ? 'Publié' : 'Masqué'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(agency)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Modifier">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => promptDelete(agency.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
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
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-xl shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-bold text-secondary">{editingAgency ? 'Modifier l\'agence' : 'Nouvelle agence'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface rounded-lg"><X className="w-5 h-5" /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-secondary mb-1">Nom de l'implantation *</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Type *</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary">
                      <option value="AGENCY">Agence</option>
                      <option value="DEPOT">Dépôt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Pays *</label>
                    <input required type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Ville *</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Province/Région</label>
                    <input type="text" value={formData.province} onChange={e => setFormData({...formData, province: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-secondary mb-1">Adresse complète *</label>
                    <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Téléphone</label>
                    <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Email</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-secondary mb-1">Horaires d'ouverture</label>
                    <input type="text" value={formData.hours} onChange={e => setFormData({...formData, hours: e.target.value})} placeholder="ex: Lun-Sam: 7h30-18h" className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Latitude</label>
                    <input type="number" step="any" value={formData.latitude} onChange={e => setFormData({...formData, latitude: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">Longitude</label>
                    <input type="number" step="any" value={formData.longitude} onChange={e => setFormData({...formData, longitude: e.target.value})} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="col-span-2 flex items-center gap-2 pt-2">
                    <input type="checkbox" id="published" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                    <label htmlFor="published" className="text-sm font-medium text-secondary">Publié sur le site public</label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-secondary hover:bg-surface rounded-lg transition-colors">Annuler</button>
                  <button type="submit" disabled={submitting} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50">
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingAgency ? 'Mettre à jour' : 'Créer l\'agence'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Supprimer cette implantation ?"
        description="Cette action est irréversible. L'agence ou le dépôt sera retiré de la carte interactive et de la liste publique."
        confirmText="Oui, supprimer"
        cancelText="Annuler"
        isLoading={isDeleting}
      />
    </div>
  );
}