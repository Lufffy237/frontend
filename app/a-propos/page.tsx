'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TEAM_MEMBERS, EXPERTS, FOUNDER } from '@/lib/team';
import { TeamMemberCard } from '@/components/about/TeamMemberCard';
import { ExpertCard } from '@/components/about/ExpertCard';
import { FloatingButtons } from '@/components/services/FloatingButtons';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO - NOTRE HISTOIRE
          ============================================ */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Notre Histoire
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 italic max-w-3xl"
          >
            L'art de la perfection, le secret de l'élégance depuis 1990
          </motion.p>
        </div>
      </section>

      {/* ============================================
          SECTION HISTOIRE - PARTIE 1
          ============================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6 leading-tight">
                Tout commence en 1990, dans l'atmosphère feutrée d'un petit atelier né d'une obsession :
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Redonner aux vêtements leur éclat originel et leur mouvement parfait. Convaincu que le vêtement est le reflet de l'âme et du statut, le fondateur d'Élégance Pressing a passé des années à étudier la réaction des tissus les plus rares face aux eaux les plus pures et aux essences de nettoyage les plus nobles.
              </p>
              <p className="text-muted leading-relaxed">
                Ce laboratoire de passion est né un savoir-faire unique, mêlant les secrets des maîtres tailleurs traditionnels aux technologies de pointe.
              </p>
            </motion.div>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="overflow-hidden rounded-lg shadow-medium">
                <img
                  src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=500&fit=crop"
                  alt="Machines à laver industrielles"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-medium mt-8">
                <img
                  src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=500&fit=crop"
                  alt="Équipement de pressing"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION HISTOIRE - PARTIE 2
          ============================================ */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 md:order-1"
            >
              <div className="overflow-hidden rounded-lg shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"
                  alt="Équipe Élégance Pressing au travail"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Texte */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6 leading-tight">
                Portée par son succès historique, la Maison a entrepris de faire voyager sa philosophie au-delà des frontières.
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Traversant les fleuves et les forêts d'Afrique Centrale, l'esprit ELP s'est déployé comme un symbole de prestige. De Douala à N'Djamena, des avenues de Malabo et Bata jusqu'aux cœurs battants de Brazzaville et Libreville, un réseau d'une centaine de points de vente modernes — notre flotte de relais rapide — sillonne les capitales chaque matin pour cueillir le linge au réveil des leaders de ce monde et le leur restituer métamorphosé.
              </p>

              {/* Chiffres clés */}
              <div className="grid grid-cols-5 gap-4 mb-8">
                {[
                  { value: '35+', label: 'Années d\'expérience' },
                  { value: '5', label: 'Pays' },
                  { value: '15+', label: 'Agences' },
                  { value: '40+', label: 'Dépôts' },
                  { value: '10Mille+', label: 'Clients satisfaits' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                      {item.value}
                    </div>
                    <div className="text-[10px] text-muted font-medium leading-tight">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Boutons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/agences"
                  className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-secondary text-secondary text-sm font-semibold hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  Découvrir Nos Agences
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white text-sm font-semibold shadow-soft hover:bg-primary-hover transition-all duration-300"
                >
                  Contactez-nous
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION DEPUIS 1990 - FOND NOIR
          ============================================ */}
      <section className="py-16 md:py-24 bg-secondary text-white relative overflow-hidden">
        {/* Motif décoratif */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              #FF6600 35px,
              #FF6600 36px
            )`,
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-bold text-sm tracking-wider mb-4"
          >
            DEPUIS 1990
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12"
          >
            En 35 ans d'existence, nos signatures ont évolué mais notre âme reste intacte. Du « Temple du Confort » au « Partenaire de l'Excellence », nous marchons vers un seul horizon :
          </motion.p>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold italic text-primary"
          >
            « Propre, c'est élégant »
          </motion.p>

          {/* Image machine */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-lg shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&h=500&fit=crop"
                alt="Machine de pressing moderne"
                className="w-full h-[300px] md:h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          MOT DU FONDATEUR
          ============================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Photo fondateur */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/30 rounded-lg" />
                <div className="relative overflow-hidden rounded-lg shadow-elevated">
                  <img
                    src={FOUNDER.image}
                    alt={FOUNDER.name}
                    className="w-full h-[500px] object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            {/* Citation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Le Mot du Fondateur
              </h2>

              <div className="relative pl-6 border-l-4 border-primary mb-6">
                <p className="text-muted leading-relaxed italic whitespace-pre-line">
                  {FOUNDER.quote}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-secondary">
                  {FOUNDER.name}
                </h3>
                <p className="text-primary font-semibold text-sm mt-1">
                  {FOUNDER.role}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          ÉQUIPE DIRIGEANTE
          ============================================ */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Les Visages de l'Excellence : Notre Équipe Dirigeante
            </h2>
            <p className="text-muted max-w-4xl mx-auto leading-relaxed">
              Derrière le rayonnement panafricain du Label ELP se cache un collectif de leaders chevronnés, animés par la vision stratégique de l'Honorable Manfouo David. Alliant rigueur de gestion, expertise sectorielle et dévouement, nos responsables de pôles orchestrent au quotidien la synergie entre nos infrastructures modernes et le savoir-faire artisanal de nos ateliers. Ensemble, ils veillent au respect de nos standards de prestige pour maintenir ELP au sommet du soin textile en Afrique Centrale.
            </p>
          </motion.div>

          {/* Grille équipe */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          RENCONTREZ LES EXPERTS
          ============================================ */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Motif décoratif */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
            <path
              d="M150 50 C200 50, 250 100, 250 150 C250 200, 200 250, 150 250 C100 250, 50 200, 50 150 C50 100, 100 50, 150 50 Z"
              stroke="#FF6600"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-secondary text-center mb-16"
          >
            RENCONTREZ LES EXPERTS
          </motion.h2>

          {/* Experts */}
          <div className="space-y-20">
            {EXPERTS.map((expert, index) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                index={index}
                reversed={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Boutons flottants */}
      <FloatingButtons />
    </div>
  );
}