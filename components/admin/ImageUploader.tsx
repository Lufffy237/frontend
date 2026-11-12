'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUploader({ value, onChange, label = 'Image', placeholder = 'Collez une URL ou uploadez depuis votre PC' }: ImageUploaderProps) {
  const { token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation côté client
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Format non supporté. Utilisez JPEG, PNG, GIF ou WebP');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Le fichier est trop volumineux. Taille maximale : 5 MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        onChange(data.data.url);
        setPreview(data.data.url);
        toast.success('Image uploadée avec succès');
      } else {
        toast.error(data.message || 'Erreur lors de l\'upload');
      }
    } catch (error) {
      toast.error('Erreur réseau lors de l\'upload');
    } finally {
      setUploading(false);
      // Reset l'input pour permettre de ré-uploader le même fichier
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    setPreview('');
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-secondary">{label}</label>}
      
      {preview ? (
        <div className="relative group">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border border-border" 
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
            Image chargée
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-sm text-muted">Upload en cours...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-muted" />
                <p className="text-sm text-muted">{placeholder}</p>
                <p className="text-xs text-muted">JPEG, PNG, GIF, WebP (max 5 MB)</p>
              </div>
            )}
          </label>
        </div>
      )}
    </div>
  );
}