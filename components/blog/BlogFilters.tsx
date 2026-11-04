'use client';

import { motion } from 'framer-motion';
import { BLOG_CATEGORIES } from '@/lib/blog';

interface BlogFiltersProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export function BlogFilters({ selectedCategory, onCategoryChange }: BlogFiltersProps) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-bold text-secondary mb-4">CATEGORIES</h3>
      
      {/* Desktop : Boutons */}
      <div className="hidden md:flex flex-wrap gap-2">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === cat.value
                ? 'bg-primary text-white shadow-soft'
                : 'bg-white text-secondary border border-border hover:border-primary hover:text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mobile : Dropdown */}
      <div className="md:hidden">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-secondary text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {BLOG_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}