'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, FileText, Briefcase, Users, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface DashboardData {
  stats: {
    agencies: number;
    articles: number;
    jobOffers: number;
    contacts: number;
  };
  recentActivities: {
    contacts: any[];
    agencies: any[];
  };
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        } else {
          toast.error('Erreur de chargement des statistiques');
        }
      } catch (error) {
        toast.error('Erreur de connexion au serveur');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  const statCards = [
    { label: 'Agences & Dépôts', value: data?.stats.agencies ?? 0, icon: Building2, color: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Articles Publiés', value: data?.stats.articles ?? 0, icon: FileText, color: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Offres Actives', value: data?.stats.jobOffers ?? 0, icon: Briefcase, color: 'bg-purple-500', text: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Demandes Contact', value: data?.stats.contacts ?? 0, icon: Users, color: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-secondary">Tableau de Bord</h1>
        <p className="text-muted mt-1">Vue d'ensemble en temps réel de l'activité d'Élégance Pressing.</p>
      </motion.div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl border border-border shadow-soft hover:shadow-medium transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted font-medium">{stat.label}</p>
                <p className="text-4xl font-bold text-secondary mt-2">
                  {stat.value}
                </p>
              </div>
              <div className={`w-14 h-14 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-7 h-7 ${stat.text}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Section Activités Récentes */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Dernières demandes de contact */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-border shadow-soft p-6"
        >
          <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Dernières demandes de contact
          </h3>
          <div className="space-y-4">
            {data?.recentActivities.contacts.length === 0 ? (
              <p className="text-muted text-sm text-center py-4">Aucune demande récente.</p>
            ) : (
              data?.recentActivities.contacts.map((contact) => (
                <div key={contact.id} className="flex items-start justify-between p-3 rounded-lg bg-surface border border-border">
                  <div>
                    <p className="font-semibold text-secondary text-sm">{contact.firstName} {contact.lastName}</p>
                    <p className="text-xs text-muted mt-1">{contact.subject}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'NEW' ? 'bg-blue-100 text-blue-700' :
                      contact.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {contact.status === 'NEW' && <AlertCircle className="w-3 h-3" />}
                      {contact.status === 'RESOLVED' && <CheckCircle className="w-3 h-3" />}
                      {contact.status}
                    </span>
                    <p className="text-[10px] text-muted mt-1 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Dernières agences ajoutées */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-border shadow-soft p-6"
        >
          <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Dernières implantations
          </h3>
          <div className="space-y-4">
            {data?.recentActivities.agencies.length === 0 ? (
              <p className="text-muted text-sm text-center py-4">Aucune agence récente.</p>
            ) : (
              data?.recentActivities.agencies.map((agency) => (
                <div key={agency.id} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      agency.type === 'AGENCY' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-secondary text-sm">{agency.name}</p>
                      <p className="text-xs text-muted">{agency.city}, {agency.country}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    agency.type === 'AGENCY' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {agency.type === 'AGENCY' ? 'AGENCE' : 'DÉPÔT'}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}