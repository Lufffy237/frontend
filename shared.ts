// frontend/shared.ts

export type ContactStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED';

export interface ContactFormData {
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  attachments?: File[]; // En frontend, ce sont des objets File avant l'upload
  offerId?: string;
}

export interface JobApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  offerId: string; // Obligatoire pour une candidature
  resume: File; // Le CV est obligatoire
  coverLetter?: string;
  message?: string;
}