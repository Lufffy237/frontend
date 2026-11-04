'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export default function JobOfferEditorPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const isNew = id === 'nouveau';

  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'EMPLOI',
    location: '',
    contract: '',
    description: '',
    missions: [''],
    profile: '',
    howToApply: '',
    active: true,
  });

  useEffect(() => {
    if (!isNew) {
      const fetchOffer = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/job-offers/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            setFormData({
              title: data.data.title,
              type: data.data.type,
              location: data.data.location,
              contract: data.data.contract || '',
              description: data.data.description,
              missions: data.data.missions.length > 0 ? data.data.missions : [''],
              profile: data.data.profile || '',
              howToApply: data.data.howToApply || '',
              active: data.data.active,
            });
          }
        } catch (error) {
          toast.error('Erreur de chargement de l\'offre');
          router.push('/admin/carrieres');
        } finally {
          setLoading(false);
        }
      };
      fetchOffer();
    }
  }, [id, isNew, token, router]);

  const handleMissionChange = (index: number, value: string) => {
    const newMissions = [...formData.missions];
    newMissions[index] = value;
    setFormData({ ...formData, missions: newMissions });
  };

  const addMission = () => {
    setFormData({ ...formData, missions: [...formData.missions, ''] });
  };

  const removeMission = (index: number) => {
    const newMissions = formData.missions.filter((_, i) => i !== index);
    setFormData({ ...formData, missions: newMissions.length > 0 ? newMissions : [''] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Le titre et la description sont requis');
      return;
    }

    setSubmitting(true);
    try {
      const url = isNew ? 'http://localhost:5000/api/job-offers' : `http://localhost:5000/api/job-offers/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      // Filtrer les missions vides
      const payload = {
        ...formData,
        missions: formData.missions.filter(m => m.trim() !== ''),
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
        toast.success(isNew ? 'Offre créée avec succès' : 'Offre mise à jour');
        router.push('/admin/carrieres');
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
    <div className="max-w-4xl mx-auto">
      <button onClick={() => router.push('/admin/carrieres')} className="flex items-center gap-2 text-muted hover:text-secondary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour à la liste
      </button>

      <motion.form 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        {/* En-tête */}
        <div className="bg-white p-6 rounded-xl border border-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Titre du poste (ex: Superviseur de Réseau)"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="flex-1 text-2xl font-bold text-secondary placeholder:text-gray-300 border-none focus:ring-0 p-0"
          />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm font-medium text-secondary">Offre active</span>
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
          {/* Colonne principale */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-soft space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="EMPLOI">Emploi</option>
                    <option value="STAGE">Stage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Type de contrat</label>
                  <input
                    type="text"
                    value={formData.contract}
                    onChange={(e) => setFormData({ ...formData, contract: e.target.value })}
                    placeholder="ex: CDI, Stage 6 mois"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Localisation *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="ex: Douala, Cameroun"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Description du poste *</label>
                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Missions principales</label>
                <div className="space-y-2">
                  {formData.missions.map((mission, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={mission}
                        onChange={(e) => handleMissionChange(index, e.target.value)}
                        placeholder={`Mission ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeMission(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addMission}
                    className="flex items-center gap-2 text-sm text-primary font-medium hover:underline mt-2"
                  >
                    <Plus className="w-4 h-4" /> Ajouter une mission
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-soft space-y-4">
              <h3 className="font-semibold text-secondary mb-2">Profil recherché</h3>
              <textarea
                rows={6}
                value={formData.profile}
                onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                placeholder="Diplômes, expériences et compétences requises..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
              />
            </div>

            <div className="bg-white p-6 rounded-xl border border-border shadow-soft space-y-4">
              <h3 className="font-semibold text-secondary mb-2">Comment postuler</h3>
              <textarea
                rows={4}
                value={formData.howToApply}
                onChange={(e) => setFormData({ ...formData, howToApply: e.target.value })}
                placeholder="Instructions pour l'envoi du CV..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
              />
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  );
}