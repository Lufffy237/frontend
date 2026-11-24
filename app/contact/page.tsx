'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { FAQSection } from '@/components/contact/FAQSection';
import { FloatingButtons } from '@/components/services/FloatingButtons';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            NOUS CONTACTER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted leading-relaxed"
          >
            Pour toutes vos demandes, veuillez nous contacter au{' '}
            <a href="tel:+237233424242" className="text-primary font-semibold hover:underline">
              +237 233 42 42 42
            </a>{' '}
            ou{' '}
            <a href="mailto:contact@elegancepressing.com" className="text-primary font-semibold hover:underline">
              contact@elegancepressing.com
            </a>
            . Un membre de notre équipe s'engage à vous répondre dans les plus brefs délais.
          </motion.p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Coordonnées */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                title: 'Téléphone',
                content: '+237 233 42 42 42',
                link: 'tel:+237233424242',
              },
              {
                icon: Mail,
                title: 'Email',
                content: 'contact@elegancepressing.com',
                link: 'mailto:contact@elegancepressing.com',
              },
              {
                icon: MapPin,
                title: 'Adresse',
                content: 'Douala, Cameroun',
                link: '/agences',
              },
              {
                icon: Clock,
                title: 'Horaires',
                content: 'Lun - Sam : 7h30 - 18h',
                link: null,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-surface border border-border hover:border-primary hover:shadow-soft transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-light flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-secondary mb-2">{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-sm text-muted">{item.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      <FloatingButtons />
    </div>
  );
}