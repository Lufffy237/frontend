'use client';

import { useState, useEffect } from 'react'; // ✅ IMPORTS AJOUTÉS ICI
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, Building2, FileText, Briefcase, Image as ImageIcon, 
  LogOut, Menu, X, Shield, Users,
  FolderOpen,
  Award,
  Handshake
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AdminTopbar } from '@/components/admin/AdminTopbar';

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/agences', label: 'Agences & Dépôts', icon: Building2 },
  { href: '/admin/categories', label: 'Catégories', icon: FolderOpen }, 
  { href: '/admin/articles', label: 'Articles & Blog', icon: FileText },
  { href: '/admin/carrieres', label: 'Offres d\'emploi', icon: Briefcase },
  { href: '/admin/galerie', label: 'Galerie', icon: ImageIcon },
  { href: '/admin/partenaires', label: 'Partenaires', icon: Handshake },
  { href: '/admin/distinctions', label: 'Distinctions', icon: Award },
  { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirection si non connecté (sauf sur la page login)
  if (!isAuthenticated && pathname !== '/admin/login') {
    router.push('/admin/login');
    return null;
  }

  // La page login n'a pas de layout admin
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-surface flex admin-layout">
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-secondary text-white 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">ELP Admin</h2>
              <p className="text-xs text-gray-400">Panel de gestion</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-white/10 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Section Utilisateur */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <Link 
            href="/admin/profil"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors mb-2"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.role}</p>
            </div>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu Principal avec Topbar */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar Admin personnalisée */}
        <AdminTopbar />

        {/* Zone de contenu scrollable */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}