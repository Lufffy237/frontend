'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Loader2, User as UserIcon, Shield, ShieldAlert, UserCheck, UserX } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
  isActive: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { token, user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'EDITOR' as User['role'], isActive: true
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (error) {
      toast.error('Erreur de chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser && (!formData.name || !formData.email || !formData.password)) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setSubmitting(true);
    try {
      const url = editingUser 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/users/${editingUser.id}`
        : process.env.NEXT_PUBLIC_API_URL + '/api/users';
      
      const method = editingUser ? 'PUT' : 'POST';
      const payload = editingUser 
        ? { name: formData.name, email: formData.email, role: formData.role, isActive: formData.isActive }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingUser ? 'Utilisateur mis à jour' : 'Utilisateur créé');
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', password: '', role: 'EDITOR', isActive: true });
        fetchUsers();
      } else {
        toast.error(data.message || 'Erreur');
      }
    } catch (error) {
      toast.error('Erreur réseau');
    } finally {
      setSubmitting(false);
    }
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    if (deleteId === currentUser?.id) {
      toast.error('Vous ne pouvez pas supprimer votre propre compte');
      setDeleteId(null);
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${deleteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Utilisateur supprimé');
        fetchUsers();
      } else {
        toast.error(data.message || 'Erreur');
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, password: '', role: user.role, isActive: user.isActive });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', role: 'EDITOR', isActive: true });
    setEditingUser(null);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return <ShieldAlert className="w-4 h-4 text-red-600" />;
      case 'ADMIN': return <Shield className="w-4 h-4 text-blue-600" />;
      default: return <UserIcon className="w-4 h-4 text-green-600" />;
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Gestion des Utilisateurs</h1>
          <p className="text-muted mt-1">Gérez les accès et les rôles du tableau de bord.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-soft"
        >
          <Plus className="w-4 h-4" />
          Ajouter un utilisateur
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-soft overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="px-6 py-4 font-semibold text-secondary">Utilisateur</th>
              <th className="px-6 py-4 font-semibold text-secondary">Rôle</th>
              <th className="px-6 py-4 font-semibold text-secondary">Statut</th>
              <th className="px-6 py-4 font-semibold text-secondary">Créé le</th>
              <th className="px-6 py-4 font-semibold text-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-secondary">{u.name}</p>
                      <p className="text-xs text-muted">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(u.role)}
                    <span className="font-medium text-secondary">{u.role.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    u.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {u.isActive ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                    {u.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted">{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEditModal(u)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Modifier">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setDeleteId(u.id)} 
                      disabled={u.id === currentUser?.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed" 
                      title={u.id === currentUser?.id ? "Vous ne pouvez pas vous supprimer" : "Supprimer"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modale de Formulaire */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-xl shadow-elevated w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-secondary">{editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-muted hover:text-secondary" /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Nom complet *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1.5">Adresse email *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                </div>
                {!editingUser && (
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1.5">Mot de passe *</label>
                    <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1.5">Rôle *</label>
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as any})} className="w-full px-3 py-2.5 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-white">
                      <option value="EDITOR">Éditeur</option>
                      <option value="ADMIN">Administrateur</option>
                      <option value="SUPER_ADMIN">Super Admin</option>
                    </select>
                  </div>
                  {editingUser && (
                    <div className="flex items-center pt-6">
                      <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                      <label htmlFor="isActive" className="ml-2 text-sm font-medium text-secondary">Compte actif</label>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-secondary hover:bg-surface rounded-lg transition-colors">Annuler</button>
                  <button type="submit" disabled={submitting} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50">
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingUser ? 'Mettre à jour' : 'Créer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmDialog 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={executeDelete} 
        title="Supprimer cet utilisateur ?" 
        description="Cette action est irréversible. L'utilisateur perdra immédiatement l'accès au tableau de bord." 
        confirmText="Oui, supprimer" 
        isLoading={isDeleting} 
      />
    </div>
  );
}