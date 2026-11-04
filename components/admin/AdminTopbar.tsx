'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Search, Settings, User, LogOut, ChevronDown, 
  Shield, Mail, Calendar
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

// Titres des pages selon la route
const pageTitles: Record<string, string> = {
  '/admin': 'Tableau de bord',
  '/admin/agences': 'Agences & Dépôts',
  '/admin/articles': 'Articles & Blog',
  '/admin/carrieres': 'Offres d\'emploi',
  '/admin/galerie': 'Galerie',
  '/admin/profil': 'Mon Profil',
  '/admin/login': 'Connexion',
};

export function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const currentPageTitle = pageTitles[pathname] || 'Administration';

  // Fermer les menus au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <header className="bg-white border-b border-border px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-soft">
      {/* Partie gauche : Titre de la page + Fil d'Ariane */}
      <div className="flex items-center gap-4 flex-1">
        <div>
          <h1 className="text-lg font-bold text-secondary">{currentPageTitle}</h1>
          <p className="text-xs text-muted flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(new Date())}
          </p>
        </div>
      </div>

      {/* Partie droite : Actions */}
      <div className="flex items-center gap-3">
        {/* Recherche rapide */}
        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border hover:border-primary transition-colors text-sm text-muted">
          <Search className="w-4 h-4" />
          <span className="hidden lg:inline">Rechercher...</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-white border border-border text-xs">⌘K</kbd>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-surface transition-colors"
          >
            <Bell className="w-5 h-5 text-secondary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-border shadow-elevated overflow-hidden"
              >
                <div className="p-4 border-b border-border bg-surface">
                  <h3 className="font-bold text-secondary text-sm">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-4 hover:bg-surface transition-colors border-b border-border">
                    <p className="text-sm text-secondary font-medium">Nouvelle demande de contact</p>
                    <p className="text-xs text-muted mt-1">Il y a 5 minutes</p>
                  </div>
                  <div className="p-4 hover:bg-surface transition-colors">
                    <p className="text-sm text-secondary font-medium">Mise à jour système</p>
                    <p className="text-xs text-muted mt-1">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="p-3 border-t border-border text-center">
                  <button className="text-xs text-primary font-semibold hover:underline">
                    Voir toutes les notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Séparateur */}
        <div className="w-px h-8 bg-border"></div>

        {/* Menu Profil */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-surface transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold text-sm shadow-soft">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-secondary leading-tight">{user?.name}</p>
              <p className="text-xs text-muted leading-tight">{user?.role}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-border shadow-elevated overflow-hidden"
              >
                {/* En-tête du menu */}
                <div className="p-4 bg-surface border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold text-lg">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-secondary truncate">{user?.name}</p>
                      <p className="text-xs text-muted truncate flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 px-2 py-1.5 rounded-md bg-primary/10 border border-primary/20">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary capitalize">{user?.role?.toLowerCase()}</span>
                  </div>
                </div>

                {/* Liens du menu */}
                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      router.push('/admin/profil');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface transition-colors text-sm text-secondary"
                  >
                    <User className="w-4 h-4 text-muted" />
                    Mon Profil
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface transition-colors text-sm text-secondary">
                    <Settings className="w-4 h-4 text-muted" />
                    Paramètres
                  </button>
                </div>

                {/* Déconnexion */}
                <div className="p-2 border-t border-border">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors text-sm text-red-600 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Se déconnecter
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}