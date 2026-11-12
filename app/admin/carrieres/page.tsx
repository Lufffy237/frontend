'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, Loader2, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'; // ✅ AJOUTÉ

interface JobOffer {
  id: string;
  title: string;
  type: 'EMPLOI' | 'STAGE';
  location: string;
  contract: string | null;
  active: boolean;
  createdAt: string;
}

export default function AdminJobOffersPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ✅ États pour la modale de confirmation de suppression
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchOffers = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/job-offers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setOffers(data.data);
    } catch (error) {
      toast.error('Erreur de chargement des offres');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOffers(); }, [token]);

  // ✅ Ouvre la modale de confirmation
  const promptDelete = (id: string) => {
    setDeleteId(id);
  };

  // ✅ Exécute la suppression après confirmation
  const executeDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-offers/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        toast.success('Offre supprimée avec succès');
        fetchOffers(); // Rafraîchir la liste
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
          <h1 className="text-3xl font-bold text-secondary">Offres d'Emploi & Stages</h1>
          <p className="text-muted mt-1">Gérez les opportunités de carrière.</p>
        </div>
        <button
          onClick={() => router.push('/admin/carrieres/nouveau')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-soft"
        >
          <Plus className="w-4 h-4" />
          Nouvelle offre
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="px-6 py-4 font-semibold text-secondary">Titre du poste</th>
              <th className="px-6 py-4 font-semibold text-secondary">Type</th>
              <th className="px-6 py-4 font-semibold text-secondary">Localisation</th>
              <th className="px-6 py-4 font-semibold text-secondary">Statut</th>
              <th className="px-6 py-4 font-semibold text-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {offers.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-muted">Aucune offre trouvée.</td></tr>
            ) : (
              offers.map((offer) => (
                <tr key={offer.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-surface flex items-center justify-center text-muted">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{offer.title}</p>
                        <p className="text-xs text-muted">{offer.contract || 'Non spécifié'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      offer.type === 'EMPLOI' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {offer.type === 'EMPLOI' ? 'EMPLOI' : 'STAGE'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted">{offer.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      offer.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {offer.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => router.push(`/carrieres/${offer.title.toLowerCase().replace(/ /g, '-')}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Voir">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => router.push(`/admin/carrieres/${offer.id}`)} className="p-2 text-secondary hover:bg-surface rounded-lg" title="Modifier">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {/* ✅ Bouton modifié pour ouvrir la modale au lieu de confirm() */}
                      <button onClick={() => promptDelete(offer.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Supprimer">
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

      {/* ✅ Modale de confirmation de suppression personnalisée */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Retirer cette offre ?"
        description="Cette action est irréversible. L'offre ne sera plus visible par les candidats sur le site public."
        confirmText="Oui, supprimer"
        cancelText="Annuler"
        isLoading={isDeleting}
      />
    </div>
  );
}