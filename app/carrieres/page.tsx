'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { CareersHero } from '@/components/careers/CareersHero';
import { JobCard } from '@/components/careers/JobCard';
import { Pagination } from '@/components/blog/Pagination';
import { FloatingButtons } from '@/components/services/FloatingButtons';
import { toast } from 'sonner';

interface JobOffer {
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
  active: boolean;
  createdAt: string;
}

const ITEMS_PER_PAGE = 6;
const JOB_CATEGORIES = [
  { value: 'ALL', label: 'Toutes les catégories' },
  { value: 'EMPLOI', label: 'Offres d\'emploi' },
  { value: 'STAGE', label: 'Stages' },
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString(),
        });
        if (selectedCategory !== 'ALL') {
          params.append('type', selectedCategory);
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-offers/public?${params.toString()}`);
        const data = await res.json();

        if (data.success) {
          setJobs(data.data);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        toast.error('Erreur de chargement des offres');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-surface">
      <CareersHero />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-border bg-white text-secondary text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
            >
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : jobs.length > 0 ? (
            <>
              <div>
                {jobs.map((job, index) => (
                  <JobCard 
                    key={job.id} 
                    job={{
                      ...job,
                      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
                      shortDescription: job.description.substring(0, 150) + '...',
                      publishedAt: job.createdAt,
                      // ? CORRECTION : On force le type 'string' en fournissant une valeur par défaut si null
                      contract: job.contract || 'Non spécifié',
                      profile: job.profile || '',
                      howToApply: job.howToApply || ''
                    }} 
                    index={index} 
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted text-lg">Aucune offre ne correspond à cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-surface border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agences" className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-white transition-all duration-300">
              Découvrir Nos Agences
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-soft hover:bg-primary-hover hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300">
              Contact-Nous
            </Link>
          </div>
        </div>
      </section>

      <FloatingButtons />
    </div>
  );
}