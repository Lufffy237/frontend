'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, User, Mail, Phone, FileText, X, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { ContactFormData, JobApplicationData } from '../../shared';

type FormMode = 'contact' | 'application';

export function ContactForm() {
  const [mode, setMode] = useState<FormMode>('contact');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // État formulaire contact
  const [contactData, setContactData] = useState<ContactFormData>({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // État formulaire candidature
  const [applicationData, setApplicationData] = useState<JobApplicationData>({
    offerId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cv: null as any,
    coverLetter: null as any,
    message: '',
  });

  // Erreurs
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fichiers uploadés
  const [cvFileName, setCvFileName] = useState<string>('');
  const [coverLetterFileName, setCoverLetterFileName] = useState<string>('');
  const [attachmentFileName, setAttachmentFileName] = useState<string>('');

  // --- NOUVEAU : État du Captcha fonctionnel ---
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Générer de nouveaux nombres pour le captcha
  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaInput('');
    setCaptchaError('');
  };

  // Initialiser le captcha au montage
  useEffect(() => {
    generateCaptcha();
  }, []);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\+?[\d\s\-\(\)]{10,}$/.test(phone);

  // Validation du captcha
  const validateCaptcha = () => {
    if (parseInt(captchaInput) !== captchaNum1 + captchaNum2) {
      setCaptchaError('Vérification échouée. Veuillez résoudre l\'opération.');
      return false;
    }
    setCaptchaError('');
    return true;
  };

  const validateContact = () => {
    const newErrors: Record<string, string> = {};

    if (!contactData.firstName.trim()) newErrors.firstName = 'Le nom est requis';
    if (!contactData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(contactData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!contactData.subject.trim()) newErrors.subject = 'Le motif est requis';
    if (!contactData.message.trim()) newErrors.message = 'Le message est requis';

    if (contactData.phone && !validatePhone(contactData.phone)) {
      newErrors.phone = 'Téléphone invalide';
    }

    // Validation captcha
    if (!validateCaptcha()) {
      newErrors.captcha = 'Vérification anti-robot échouée';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateApplication = () => {
    const newErrors: Record<string, string> = {};

    if (!applicationData.firstName.trim()) newErrors.firstName = 'Le nom est requis';
    if (!applicationData.lastName.trim()) newErrors.lastName = 'Le prénom est requis';
    if (!applicationData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(applicationData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!applicationData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!validatePhone(applicationData.phone)) {
      newErrors.phone = 'Téléphone invalide';
    }
    if (!applicationData.cv) {
      newErrors.cv = 'Le CV est requis';
    }

    // Validation captcha
    if (!validateCaptcha()) {
      newErrors.captcha = 'Vérification anti-robot échouée';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'cv' | 'coverLetter' | 'attachment'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error('Le fichier dépasse la taille maximale de 10 Mo');
      e.target.value = '';
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Format non autorisé. Utilisez PDF, JPEG ou PNG');
      e.target.value = '';
      return;
    }

    if (type === 'cv') {
      setApplicationData((prev) => ({ ...prev, cv: file }));
      setCvFileName(file.name);
    } else if (type === 'coverLetter') {
      setApplicationData((prev) => ({ ...prev, coverLetter: file }));
      setCoverLetterFileName(file.name);
    } else {
      setAttachmentFileName(file.name);
    }

    setErrors((prev) => ({ ...prev, [type]: '' }));
  };

  // ✅ CORRECTION : Ajout de 'as any' pour satisfaire le type strict de JobApplicationData
  const removeFile = (type: 'cv' | 'coverLetter' | 'attachment') => {
    if (type === 'cv') {
      setApplicationData((prev) => ({ ...prev, cv: null as any }));
      setCvFileName('');
    } else if (type === 'coverLetter') {
      setApplicationData((prev) => ({ ...prev, coverLetter: null as any }));
      setCoverLetterFileName('');
    } else {
      setAttachmentFileName('');
    }
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Contact form data:', contactData);
      setSuccess(true);
      toast.success('Message envoyé avec succès ! Nous vous répondrons rapidement.');
      
      // Reset
      setContactData({ title: '', firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
      setAttachmentFileName('');
      generateCaptcha(); // Nouveau captcha pour le prochain envoi
    } catch (error) {
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateApplication()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Application form data:', applicationData);
      setSuccess(true);
      toast.success('Candidature envoyée avec succès ! Nous étudierons votre dossier.');
      
      // ✅ CORRECTION : Ajout de 'as any' pour la réinitialisation
      setApplicationData({ 
        offerId: '', 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '', 
        cv: null as any, 
        coverLetter: null as any, 
        message: '' 
      });
      setCvFileName('');
      setCoverLetterFileName('');
      generateCaptcha(); // Nouveau captcha pour le prochain envoi
    } catch (error) {
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: FormMode) => {
    setMode(newMode);
    setErrors({});
    setSuccess(false);
    generateCaptcha();
  };

  // Calcul pour savoir si le captcha est visuellement validé (pour la coche verte)
  const isCaptchaValid = parseInt(captchaInput) === captchaNum1 + captchaNum2;

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-elevated p-12 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-secondary mb-3">
          {mode === 'contact' ? 'Message envoyé !' : 'Candidature reçue !'}
        </h3>
        <p className="text-muted mb-8">
          {mode === 'contact'
            ? 'Nous vous répondrons dans les plus brefs délais.'
            : 'Notre équipe RH étudiera votre dossier et vous contactera rapidement.'}
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover transition-colors"
        >
          Envoyer un nouveau message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-elevated p-6 md:p-10">
      {/* Toggle entre les deux modes */}
      <div className="flex gap-2 mb-8 p-1 bg-surface rounded-lg">
        <button
          onClick={() => switchMode('contact')}
          className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all duration-300 ${
            mode === 'contact'
              ? 'bg-primary text-white shadow-soft'
              : 'text-secondary hover:bg-white'
          }`}
        >
          Contact Simple
        </button>
        <button
          onClick={() => switchMode('application')}
          className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all duration-300 ${
            mode === 'application'
              ? 'bg-primary text-white shadow-soft'
              : 'text-secondary hover:bg-white'
          }`}
        >
          Candidature
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'contact' ? (
          <motion.form
            key="contact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmitContact}
            className="space-y-5"
          >
            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Titre</label>
              <input
                type="text"
                value={contactData.title}
                onChange={(e) => setContactData({ ...contactData, title: e.target.value })}
                placeholder="M., Mme, Dr..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Nom et Prénom */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Nom<span className="text-primary ml-1">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    value={contactData.firstName}
                    onChange={(e) => setContactData({ ...contactData, firstName: e.target.value })}
                    placeholder="Nom"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.firstName ? 'border-red-500' : 'border-border'
                    }`}
                  />
                </div>
                {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Prénom</label>
                <input
                  type="text"
                  value={contactData.lastName}
                  onChange={(e) => setContactData({ ...contactData, lastName: e.target.value })}
                  placeholder="Prénom"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email et Téléphone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Email<span className="text-primary ml-1">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="votre@email.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-border'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="tel"
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="+237 6XX XXX XXX"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.phone ? 'border-red-500' : 'border-border'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Motif */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Motif De La Demande<span className="text-primary ml-1">*</span>
              </label>
              <input
                type="text"
                value={contactData.subject}
                onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                placeholder="Objet de votre demande"
                className={`w-full px-4 py-3 rounded-lg border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                  errors.subject ? 'border-red-500' : 'border-border'
                }`}
              />
              {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Demande<span className="text-primary ml-1">*</span>
              </label>
              <textarea
                value={contactData.message}
                onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                placeholder="Votre message..."
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none ${
                  errors.message ? 'border-red-500' : 'border-border'
                }`}
              />
              {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
            </div>

            {/* Upload fichier */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Attacher Documents Ou Image</label>
              <div className="relative">
                <input
                  type="file"
                  id="attachment"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'attachment')}
                  className="hidden"
                />
                <label
                  htmlFor="attachment"
                  className="flex items-center justify-between px-4 py-3 rounded-lg border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 text-muted">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">
                      {attachmentFileName || 'Cliquez pour ajouter un fichier (PDF, JPG, PNG - max 10 Mo)'}
                    </span>
                  </div>
                  {attachmentFileName && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFile('attachment');
                      }}
                      className="text-muted hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </label>
              </div>
            </div>

            {/* --- NOUVEAU : Captcha compact et fonctionnel --- */}
            <div>
              <div className="flex flex-wrap items-center gap-3 p-3 bg-surface rounded-lg border border-border w-fit">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all duration-300 ${
                    isCaptchaValid ? 'bg-green-100 border-green-500' : 'bg-white border-border'
                  }`}>
                    {isCaptchaValid && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <span className="text-sm font-medium text-secondary select-none">Je ne suis pas un robot</span>
                </div>

                <div className="flex items-center gap-2 pl-3 border-l border-border">
                  <span className="text-sm text-muted">
                    <strong>{captchaNum1}</strong> + <strong>{captchaNum2}</strong> =
                  </span>
                  <input
                    type="number"
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value);
                      setCaptchaError('');
                    }}
                    className={`w-16 px-2 py-1.5 text-sm rounded border bg-white focus:outline-none focus:ring-2 focus:ring-primary text-center ${
                      captchaError ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="?"
                  />
                </div>
                {captchaError && (
                  <span className="text-xs text-red-600 w-full">{captchaError}</span>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3 rounded-lg bg-primary text-white font-semibold shadow-soft hover:bg-primary-hover hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.form
            key="application"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmitApplication}
            className="space-y-5"
          >
            {/* Offre d'emploi */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Offre concernée</label>
              <select
                value={applicationData.offerId}
                onChange={(e) => setApplicationData({ ...applicationData, offerId: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">Sélectionnez une offre...</option>
                <option value="1">Superviseur de Réseau & Relation Client</option>
                <option value="2">Responsable de la Logistique & du Parc Automobile</option>
                <option value="3">Gestionnaire des Systèmes d'Information</option>
                <option value="4">Assistant(e) Communication Digitale</option>
              </select>
            </div>

            {/* Nom et Prénom */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Nom<span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={applicationData.firstName}
                  onChange={(e) => setApplicationData({ ...applicationData, firstName: e.target.value })}
                  placeholder="Nom"
                  className={`w-full px-4 py-3 rounded-lg border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.firstName ? 'border-red-500' : 'border-border'
                  }`}
                />
                {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Prénom<span className="text-primary ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={applicationData.lastName}
                  onChange={(e) => setApplicationData({ ...applicationData, lastName: e.target.value })}
                  placeholder="Prénom"
                  className={`w-full px-4 py-3 rounded-lg border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                    errors.lastName ? 'border-red-500' : 'border-border'
                  }`}
                />
                {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email et Téléphone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Email<span className="text-primary ml-1">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                    placeholder="votre@email.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-border'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Téléphone<span className="text-primary ml-1">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="tel"
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                    placeholder="+237 6XX XXX XXX"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.phone ? 'border-red-500' : 'border-border'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Upload CV */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                CV<span className="text-primary ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="cv"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'cv')}
                  className="hidden"
                />
                <label
                  htmlFor="cv"
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer hover:border-primary transition-colors ${
                    errors.cv ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <div className="flex items-center gap-2 text-muted">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">
                      {cvFileName || 'Cliquez pour ajouter votre CV (PDF, JPG, PNG - max 10 Mo)'}
                    </span>
                  </div>
                  {cvFileName && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFile('cv');
                      }}
                      className="text-muted hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </label>
              </div>
              {errors.cv && <p className="text-xs text-red-600 mt-1">{errors.cv}</p>}
            </div>

            {/* Upload Lettre de motivation */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Lettre de motivation</label>
              <div className="relative">
                <input
                  type="file"
                  id="coverLetter"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'coverLetter')}
                  className="hidden"
                />
                <label
                  htmlFor="coverLetter"
                  className="flex items-center justify-between px-4 py-3 rounded-lg border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 text-muted">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">
                      {coverLetterFileName || 'Cliquez pour ajouter votre lettre (PDF, JPG, PNG - max 10 Mo)'}
                    </span>
                  </div>
                  {coverLetterFileName && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFile('coverLetter');
                      }}
                      className="text-muted hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </label>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Message complémentaire</label>
              <textarea
                value={applicationData.message}
                onChange={(e) => setApplicationData({ ...applicationData, message: e.target.value })}
                placeholder="Parlez-nous de vous, de vos motivations..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* --- NOUVEAU : Captcha compact et fonctionnel --- */}
            <div>
              <div className="flex flex-wrap items-center gap-3 p-3 bg-surface rounded-lg border border-border w-fit">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all duration-300 ${
                    isCaptchaValid ? 'bg-green-100 border-green-500' : 'bg-white border-border'
                  }`}>
                    {isCaptchaValid && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                  <span className="text-sm font-medium text-secondary select-none">Je ne suis pas un robot</span>
                </div>

                <div className="flex items-center gap-2 pl-3 border-l border-border">
                  <span className="text-sm text-muted">
                    <strong>{captchaNum1}</strong> + <strong>{captchaNum2}</strong> =
                  </span>
                  <input
                    type="number"
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value);
                      setCaptchaError('');
                    }}
                    className={`w-16 px-2 py-1.5 text-sm rounded border bg-white focus:outline-none focus:ring-2 focus:ring-primary text-center ${
                      captchaError ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="?"
                  />
                </div>
                {captchaError && (
                  <span className="text-xs text-red-600 w-full">{captchaError}</span>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3 rounded-lg bg-primary text-white font-semibold shadow-soft hover:bg-primary-hover hover:shadow-medium hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer la candidature'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}