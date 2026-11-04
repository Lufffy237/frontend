export type JobType = 'EMPLOI' | 'STAGE';

export interface JobOffer {
  id: string;
  title: string;
  type: JobType;
  location: string;
  contract: string;
  image: string;
  slug: string;
  shortDescription: string;
  description: string;
  missions: string[];
  profile: string;
  howToApply: string;
  publishedAt: string;
}

// 🔧 Données fictives - À remplacer par l'API backend plus tard
export const JOB_OFFERS: JobOffer[] = [
  {
    id: '1',
    title: 'Superviseur de Réseau & Relation Client (H/F)',
    type: 'EMPLOI',
    location: 'Douala, Cameroun',
    contract: 'CDI',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    slug: 'superviseur-reseau-relation-client',
    shortDescription:
      'Dans le cadre de l\'expansion continue de notre réseau de comptoirs en Afrique Centrale, la Maison ELP recherche un Superviseur de Réseau et de Relation Client. Rattaché directement à l\'équipe dirigeante sous la vision de l\'Honorable Manfouo David...',
    description:
      'Dans le cadre de l\'expansion continue de notre réseau de comptoirs en Afrique Centrale, la Maison ELP recherche un Superviseur de Réseau et de Relation Client. Rattaché directement à l\'équipe dirigeante sous la vision de l\'Honorable Manfouo David, vous serez le garant de l\'excellence de notre service sur le terrain. Votre mission principale sera de piloter l\'animation d\'un portefeuille d\'agences, de veiller au respect strict de nos standards de prestige (le Cycle de Soin et la signature « Propre, c\'est élégant ») et de manager les responsables de comptoirs ainsi que nos équipes de caisse et de relais rapide pour garantir une satisfaction client optimale.',
    missions: [
      'Contrôle Qualité : Effectuer des audits réguliers au sein des agences pour s\'assurer de la rigueur de l\'accueil, de la propreté des comptoirs et de la conformité du traitement du linge.',
      'Management d\'Équipe : Encadrer, motiver et former les caissières-conseillères et les agents de comptoir aux standards de la haute blanchisserie.',
      'Performance Commerciale : Suivre les flux de caisse, analyser les retours clients et mettre en place des actions pour fidéliser notre clientèle de particuliers et de professionnels (Hôtels, entreprises).',
      'Coordination Logistique : Travailler en étroite collaboration avec notre important parc automobile de relais rapide pour optimiser les circuits de collecte et de livraison.',
    ],
    profile:
      'Bac+5 en Management, Commerce ou Gestion. Expérience de 5 ans minimum dans la supervision de réseau (idéalement dans le secteur des services ou de l\'hôtellerie). Excellentes capacités de leadership et de communication. Maîtrise des outils de reporting et de CRM. Disponibilité pour des déplacements fréquents en Afrique Centrale.',
    howToApply:
      'Envoyez votre CV et lettre de motivation à carriere@elegance-pressing.com avec la référence "SUPERV-2026" en objet.',
    publishedAt: '2026-10-01',
  },
  {
    id: '2',
    title: 'Responsable de la Logistique & du Parc Automobile (H/F)',
    type: 'EMPLOI',
    location: 'Douala, Cameroun',
    contract: 'CDI',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    slug: 'responsable-logistique-parc-automobile',
    shortDescription:
      'Pour soutenir l\'efficacité de notre service de relais rapide et l\'approvisionnement quotidien de notre réseau de près d\'une centaine d\'agences, la Maison ELP recherche son Responsable de la Logistique et du Parc Automobile...',
    description:
      'Pour soutenir l\'efficacité de notre service de relais rapide et l\'approvisionnement quotidien de notre réseau de près d\'une centaine d\'agences, la Maison ELP recherche son Responsable de la Logistique et du Parc Automobile. Rattaché à l\'équipe dirigeante, vous serez le chef d\'orchestre de notre flotte de véhicules en Afrique Centrale. Votre mission principale consiste à optimiser les circuits de collecte et de livraison du linge, à garantir la maintenance rigoureuse de notre important parc automobile et à manager nos équipes de chauffeurs-relais afin d\'assurer une réactivité absolue et un respect strict des délais pour notre clientèle de particuliers et de grands comptes.',
    missions: [
      'Gestion de la Flotte : Piloter l\'entretien préventif et curatif de l\'ensemble du parc automobile pour garantir la disponibilité constante de nos véhicules de relais rapide.',
      'Optimisation des Flux : Concevoir et ajuster les tournées de collecte de linge auprès des clients VIP, des hôtels partenaires et des agences de dépôt pour maximiser l\'efficacité.',
      'Management d\'Équipe : Encadrer, animer et sensibiliser l\'équipe de chauffeurs et de livreurs aux standards de ponctualité, de courtoisie et de sécurité de la Maison ELP.',
      'Suivi de Performance : Mettre en place des indicateurs logistiques (consommation, temps de trajet, taux de service client) et en assurer le reporting à la direction.',
    ],
    profile:
      'Bac+5 en Logistique, Supply Chain ou Transport. Expérience de 7 ans minimum dans la gestion de flotte automobile. Connaissance du tissu urbain des capitales d\'Afrique Centrale. Maîtrise des logiciels de géolocalisation et de planification de tournées. Permis B obligatoire.',
    howToApply:
      'Envoyez votre CV et lettre de motivation à carriere@elegance-pressing.com avec la référence "LOG-2026" en objet.',
    publishedAt: '2026-10-05',
  },
  {
    id: '3',
    title: 'Gestionnaire des Systèmes d\'Information & Suivi Client (H/F)',
    type: 'EMPLOI',
    location: 'Douala, Cameroun',
    contract: 'CDI',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop',
    slug: 'gestionnaire-systemes-information-suivi-client',
    shortDescription:
      'Pour soutenir la modernisation et la traçabilité numérique au sein de notre réseau de près d\'une centaine d\'agences en Afrique Centrale, la Maison ELP recherche un Gestionnaire des Systèmes d\'Information & Suivi Client...',
    description:
      'Pour soutenir la modernisation et la traçabilité numérique au sein de notre réseau de près d\'une centaine d\'agences en Afrique Centrale, la Maison ELP recherche un Gestionnaire des Systèmes d\'Information & Suivi Client. Sous la supervision de l\'équipe dirigeante, vous serez le garant du bon fonctionnement de nos outils informatiques de point de vente et du système de marquage unique de notre Cycle de Soin. Votre rôle sera d\'assurer la fluidité des données entre nos ateliers techniques, notre flotte logistique de relais rapide et nos comptoirs, afin de garantir une expérience client connectée et zéro défaut.',
    missions: [
      'Supervision du Réseau Informatique : Assurer la maintenance, la sécurité et la mise à jour des logiciels de caisse et de gestion client dans l\'ensemble de nos agences.',
      'Optimisation de la Traçabilité : Veiller au déploiement et à la fiabilité des technologies de code-barres et d\'identification unique permettant de suivre chaque vêtement en temps réel, de la réception à la livraison.',
      'Support aux Équipes : Accompagner et former les caissières-conseillères et les responsables de pôles à l\'utilisation optimale de nos plateformes numériques.',
      'Analyse de Données : Produire des rapports réguliers sur l\'activité des agences, les délais de traitement et la satisfaction client pour aider à la prise de décision stratégique.',
    ],
    profile:
      'Bac+5 en Informatique de Gestion, Systèmes d\'Information ou équivalent. Expérience de 3 ans minimum dans l\'administration de systèmes ERP/CRM. Connaissance des enjeux de traçabilité et de code-barres. Rigueur, sens du service et pédagogie.',
    howToApply:
      'Envoyez votre CV et lettre de motivation à carriere@elegance-pressing.com avec la référence "SI-2026" en objet.',
    publishedAt: '2026-10-08',
  },
  {
    id: '4',
    title: 'Assistant(e) Communication Digitale & Relation Client (H/F)',
    type: 'STAGE',
    location: 'Douala, Cameroun',
    contract: 'Stage 6 mois',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    slug: 'assistant-communication-digitale-relation-client',
    shortDescription:
      'Dans le cadre du dynamisme de nos activités et pour soutenir l\'animation de notre réseau de près d\'une centaine d\'agences, la Maison ELP propose un Stage Académique ou Professionnel d\'Assistant(e) Communication Digitale & Relation Client...',
    description:
      'Dans le cadre du dynamisme de nos activités et pour soutenir l\'animation de notre réseau de près d\'une centaine d\'agences, la Maison ELP propose un Stage Académique ou Professionnel d\'Assistant(e) Communication Digitale & Relation Client. Immergé(e) au cœur de notre équipe administrative sous la supervision de nos responsables de pôles, vous participerez activement au développement de la visibilité en ligne de notre marque en Afrique Centrale et à la valorisation de notre signature « Propre, c\'est élégant ». C\'est une opportunité unique d\'acquérir une expérience pratique de premier plan au sein d\'une institution leader de la sous-région CEMAC.',
    missions: [
      'Animation du Blog & Réseaux Sociaux : Participer à la rédaction d\'articles pour notre espace Actualités & Conseils (conseils d\'entretien du linge, tendances, etc.) et animer nos communautés en ligne.',
      'Création de Contenu : Produire des visuels et des vidéos courts mettant en valeur nos prestations, nos équipes et nos agences.',
      'Relation Client Digitale : Répondre aux messages et commentaires sur nos plateformes sociales avec la courtoisie et l\'élégance propres à la Maison ELP.',
      'Veille Concurrentielle : Suivre les tendances du secteur et les meilleures pratiques digitales pour proposer des améliorations continues.',
    ],
    profile:
      'En cours de formation Bac+3/5 en Communication, Marketing Digital ou Relations Publiques. Excellentes qualités rédactionnelles en français. Maîtrise des outils de création graphique (Canva, Adobe Suite). Connaissance des réseaux sociaux (Facebook, Instagram, LinkedIn). Créativité, autonomie et sens de l\'esthétique.',
    howToApply:
      'Envoyez votre CV, lettre de motivation et portfolio à carriere@elegance-pressing.com avec la référence "COM-STAGE-2026" en objet.',
    publishedAt: '2026-10-10',
  },
  {
    id: '5',
    title: 'Chef d\'Atelier de Blanchisserie Industrielle (H/F)',
    type: 'EMPLOI',
    location: 'Douala, Cameroun',
    contract: 'CDI',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop',
    slug: 'chef-atelier-blanchisserie-industrielle',
    shortDescription:
      'Au cœur de notre département le plus imposant, nous recherchons un Chef d\'Atelier expérimenté pour superviser le traitement à grande échelle du linge des établissements hôteliers, hospitaliers et de restauration...',
    description:
      'Au cœur de notre département le plus imposant, nous recherchons un Chef d\'Atelier expérimenté pour superviser le traitement à grande échelle du linge des établissements hôteliers, hospitaliers et de restauration. Vous garantirez le respect des normes internationales les plus strictes et l\'efficacité opérationnelle de nos lignes de production.',
    missions: [
      'Pilotage de la Production : Organiser et superviser les cycles de lavage, séchage et repassage pour les gros volumes.',
      'Contrôle Qualité : Vérifier la conformité de chaque lot selon les standards ELP.',
      'Management : Encadrer les équipes techniques et assurer la formation continue.',
      'Maintenance : Superviser l\'entretien des machines industrielles.',
    ],
    profile:
      'Bac+2/3 en Textile ou Chimie. Expérience de 5 ans minimum en blanchisserie industrielle. Connaissance des normes HACCP et ISO. Leadership et rigueur.',
    howToApply:
      'Envoyez votre CV et lettre de motivation à carriere@elegance-pressing.com avec la référence "ATELIER-2026" en objet.',
    publishedAt: '2026-10-12',
  },
  {
    id: '6',
    title: 'Stage en Gestion Administrative & Comptable (H/F)',
    type: 'STAGE',
    location: 'Douala, Cameroun',
    contract: 'Stage 4 mois',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    slug: 'stage-gestion-administrative-comptable',
    shortDescription:
      'Rejoignez notre service administratif pour un stage pratique en gestion comptable et administrative au sein d\'une institution leader en Afrique Centrale...',
    description:
      'Rejoignez notre service administratif pour un stage pratique en gestion comptable et administrative au sein d\'une institution leader en Afrique Centrale. Vous participerez aux opérations quotidiennes de notre siège et découvrirez les enjeux de gestion d\'un réseau de 100 agences.',
    missions: [
      'Saisie et suivi des factures fournisseurs et clients.',
      'Assistance à la préparation des états financiers mensuels.',
      'Classement et archivage des documents comptables.',
      'Support administratif à la direction financière.',
    ],
    profile:
      'Étudiant(e) en Licence ou Master Comptabilité/Finance. Maîtrise d\'Excel. Rigueur et discrétion. Disponible 4 mois à temps plein.',
    howToApply:
      'Envoyez votre CV et lettre de motivation à carriere@elegance-pressing.com avec la référence "COMPTA-STAGE-2026" en objet.',
    publishedAt: '2026-10-14',
  },
];

export const JOB_CATEGORIES = [
  { value: 'ALL', label: 'Toutes les catégories' },
  { value: 'EMPLOI', label: 'Offres d\'emploi' },
  { value: 'STAGE', label: 'Stages' },
];