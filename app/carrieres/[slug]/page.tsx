'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, MapPin, Briefcase, Calendar, Send, CheckCircle, Loader2, Eye } from 'lucide-react';
import { FloatingButtons } from '@/components/services/FloatingButtons';
import { toast } from 'sonner';

interface JobDetail {
  id: string;
  title: string;
  slug: string;
  type: 'EMPLOI' | 'STAGE';
  location: string;
  contract: string | null;
  description: string;
  missions: string[];
  profile: string | null;
  howToApply: string | null;
  views: number;
  createdAt: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/job-offers/public/${slug}`);
        const data = await res.json();

        if (data.success) {
          setJob(data.data);
        }
      } catch (error) {
        toast.error('Erreur de chargement de l\'offre');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary mb-4">Offre introuvable</h1>
          <p className="text-muted mb-8">Cette offre n'existe pas ou a été retirée.</p>
          <Link href="/carrieres" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour aux offres
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="mb-6">
            <Link href="/carrieres" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour aux offres
            </Link>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-4 ${job.type === 'STAGE' ? 'bg-primary' : 'bg-secondary'}`}>
              {job.type === 'STAGE' ? 'OFFRE DE STAGE' : 'RECRUTEMENT'}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6 leading-tight">{job.title}</h1>

            <div className="flex flex-wrap gap-6 text-sm text-muted">
              <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {job.location}</span>
              <span className="inline-flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /> {job.contract || 'Non spécifié'}</span>
              <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Publié le {new Date(job.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="inline-flex items-center gap-2"><Eye className="w-4 h-4 text-primary" /> {job.views} vues</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <h2 className="text-2xl font-bold text-secondary mb-4">Description du poste</h2>
                <p className="text-muted leading-relaxed whitespace-pre-line">{job.description}</p>
              </motion.div>

              {job.missions && job.missions.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Vos Missions Principales</h2>
                  <ul className="space-y-3">
                    {job.missions.map((mission, i) => (
                      <li key={i} className="flex gap-3 text-muted leading-relaxed">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{mission}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {job.profile && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                  <h2 className="text-2xl font-bold text-secondary mb-4">Profil Recherché</h2>
                  <p className="text-muted leading-relaxed whitespace-pre-line">{job.profile}</p>
                </motion.div>
              )}
            </div>

            <div className="md:col-span-1">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="sticky top-24 space-y-6">
                <div className="bg-surface rounded-lg border border-border p-6">
                  <h3 className="font-bold text-secondary mb-4">Comment postuler ?</h3>
                  <p className="text-sm text-muted leading-relaxed mb-6 whitespace-pre-line">{job.howToApply || 'Veuillez nous contacter via le formulaire de contact en précisant la référence de cette offre.'}</p>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-primary text-white font-semibold shadow-soft hover:bg-primary-hover hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300">
                    <Send className="w-4 h-4" /> Postuler maintenant
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <FloatingButtons />
    </div>
  );
}