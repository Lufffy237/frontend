'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white rounded-xl shadow-elevated w-full max-w-md overflow-hidden border border-border"
          >
            {/* En-tête avec icône (Adapté aux couleurs du projet : Orange/Primary) */}
            <div className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                <AlertTriangle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-secondary">{title}</h3>
                <p className="text-sm text-muted mt-1 leading-relaxed">{description}</p>
              </div>
              <button 
                onClick={onClose} 
                disabled={isLoading}
                className="text-muted hover:text-secondary hover:bg-surface p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pied de page avec actions */}
            <div className="px-6 py-4 bg-surface border-t border-border flex justify-end gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2.5 text-sm font-medium text-secondary hover:bg-white rounded-lg transition-colors border border-transparent hover:border-border disabled:opacity-50"
              >
                {cancelText}
              </button>
              
              {/* Bouton principal aligné avec le design système du projet (bg-primary, shadow-soft, etc.) */}
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="px-4 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors flex items-center gap-2 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}