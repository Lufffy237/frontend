'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center gap-1 mt-12"
    >
      {/* Première page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-secondary hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Première page"
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>

      {/* Page précédente */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-secondary hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Page précédente"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Numéros de page */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
            page === currentPage
              ? 'bg-primary text-white shadow-soft'
              : page === '...'
              ? 'cursor-default'
              : 'bg-white text-secondary border border-border hover:bg-primary hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Page suivante */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-secondary hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Page suivante"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dernière page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-lg flex items-center justify-center text-secondary hover:bg-primary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Dernière page"
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}