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

// ðŸ”§ DonnÃ©es fictives - Ã€ remplacer par l'API backend plus tard
export const JOB_OFFERS: JobOffer[] = [
  {
    id: '1',
    title: 'Superviseur de RÃ©seau & Relation Client (H/F)',
    type: 'EMPLOI',
    location: 'Douala, Cameroun',
    contract: 'CDI',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    slug: 'superviseur-reseau-relation-client',
    shortDescription:
      'Dans le cadre de l\'expansion continue de notre rÃ©seau de comptoirs en Afrique Centrale, la Maison ELP recherche un Superviseur de RÃ©seau et de Relation Client. RattachÃ© directement Ã  l\'Ã©quipe dirigeante sous la vision de l\'Honorable Manfouo David...',
    description:
      'Dans le cadre de l\'expansion continue de notre rÃ©seau de comptoirs en Afrique Centrale, la Maison ELP recherche un Superviseur de RÃ©seau et de Relation Client. RattachÃ© directement Ã  l\'Ã©quipe dirigeante sous la vision de l\'Honorable Manfouo David, vous serez le garant de l\'excellence de notre service sur le terrain. Votre mission principale sera de piloter l\'animation d\'un portefeuille d\'agences, de veiller au respect strict de nos standards de prestige (le Cycle de Soin et la signature Â« Propre, c\'est Ã©lÃ©gant Â») et de manager les responsables de comptoirs ainsi que nos Ã©quipes de caisse et de relais rapide pour garantir une satisfaction client optimale.',
    missions: [
      'ContrÃ´le QualitÃ© : Effectuer des audits rÃ©guliers au sein des agences pour s\'assurer de la rigueur de l\'accueil, de la propretÃ© des comptoirs et de la conformitÃ© du traitement du linge.',
      'Management d\'Ã‰quipe : Encadrer, motiver et former les caissiÃ¨res-conseillÃ¨res et les agents de comptoir aux standards de la haute blanchisserie.',
      'Performance Commerciale : Suivre les flux de caisse, analyser les retours clients et mettre en place des actions pour fidÃ©liser notre clientÃ¨le de particuliers et de professionnels (HÃ´tels, entreprises).',
      'Coordination Logistique : Travailler en Ã©troite collaboration avec notre important parc automobile de relais rapide pour optimiser les circuits de collecte et de livraison.',
    ],
    profile:
      'Bac+5 en Management, Commerce ou Gestion. ExpÃ©rience de 5 ans minimum dans la supervision de rÃ©seau (idÃ©alement dans le secteur des services ou de l\'hÃ´tellerie). Excellentes capacitÃ©s de leadership et de communication. MaÃ®trise des outils de reporting et de CRM. DisponibilitÃ© pour des dÃ©placements frÃ©quents en Afrique Centrale.',
    howToApply:
      'Envoyez votre CV et lettre de motivation Ã  carriere@elegance-pressing.com avec la rÃ©fÃ©rence "SUPERV-2026" en objet.',
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
      'Pour soutenir l\'efficacitÃ© de notre service de relais rapide et l\'approvisionnement quotidien de notre rÃ©seau de prÃ¨s d\'une centaine d\'agences, la Maison ELP recherche son Responsable de la Logistique et du Parc Automobile...',
    description:
      'Pour soutenir l\'efficacitÃ© de notre service de relais rapide et l\'approvisionnement quotidien de notre rÃ©seau de prÃ¨s d\'une centaine d\'agences, la Maison ELP recherche son Responsable de la Logistique et du Parc Automobile. RattachÃ© Ã  l\'Ã©quipe dirigeante, vous serez le chef d\'orchestre de notre flotte de vÃ©hicules en Afrique Centrale. Votre mission principale consiste Ã  optimiser les circuits de collecte et de livraison du linge, Ã  garantir la maintenance rigoureuse de notre important parc automobile et Ã  manager nos Ã©quipes de chauffeurs-relais afin d\'assurer une rÃ©activitÃ© absolue et un respect strict des dÃ©lais pour notre clientÃ¨le de particuliers et de grands comptes.',
    missions: [
      'Gestion de la Flotte : Piloter l\'entretien prÃ©ventif et curatif de l\'ensemble du parc automobile pour garantir la disponibilitÃ© constante de nos vÃ©hicules de relais rapide.',
      'Optimisation des Flux : Concevoir et ajuster les tournÃ©es de collecte de linge auprÃ¨s des clients VIP, des hÃ´tels partenaires et des agences de dÃ©pÃ´t pour maximiser l\'efficacitÃ©.',
      'Management d\'Ã‰quipe : Encadrer, animer et sensibiliser l\'Ã©quipe de chauffeurs et de livreurs aux standards de ponctualitÃ©, de courtoisie et de sÃ©curitÃ© de la Maison ELP.',
      'Suivi de Performance : Mettre en place des indicateurs logistiques (consommation, temps de trajet, taux de service client) et en assurer le reporting Ã  la direction.',
    ],
    profile:
      'Bac+5 en Logistique, Supply Chain ou Transport. ExpÃ©rience de 7 ans minimum dans la gestion de flotte automobile. Connaissance du tissu urbain des capitales d\'Afrique Centrale. MaÃ®trise des logiciels de gÃ©olocalisation et de planification de tournÃ©es. Permis B obligatoire.',
    howToApply:
      'Envoyez votre CV et lettre de motivation Ã  carriere@elegance-pressing.com avec la rÃ©fÃ©rence "LOG-2026" en objet.',
    publishedAt: '2026-10-05',
  },
  {
    id: '3',
    title: 'Gestionnaire des SystÃ¨mes d\'Information & Suivi Client (H/F)',
    type: 'EMPLOI',
    location: 'Douala, Cameroun',
    contract: 'CDI',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop',
    slug: 'gestionnaire-systemes-information-suivi-client',
    shortDescription:
      'Pour soutenir la modernisation et la traÃ§abilitÃ© numÃ©rique au sein de notre rÃ©seau de prÃ¨s d\'une centaine d\'agences en Afrique Centrale, la Maison ELP recherche un Gestionnaire des SystÃ¨mes d\'Information & Suivi Client...',
    description:
      'Pour soutenir la modernisation et la traÃ§abilitÃ© numÃ©rique au sein de notre rÃ©seau de prÃ¨s d\'une centaine d\'agences en Afrique Centrale, la Maison ELP recherche un Gestionnaire des SystÃ¨mes d\'Information & Suivi Client. Sous la supervision de l\'Ã©quipe dirigeante, vous serez le garant du bon fonctionnement de nos outils informatiques de point de vente et du systÃ¨me de marquage unique de notre Cycle de Soin. Votre rÃ´le sera d\'assurer la fluiditÃ© des donnÃ©es entre nos ateliers techniques, notre flotte logistique de relais rapide et nos comptoirs, afin de garantir une expÃ©rience client connectÃ©e et zÃ©ro dÃ©faut.',
    missions: [
      'Supervision du RÃ©seau Informatique : Assurer la maintenance, la sÃ©curitÃ© et la mise Ã  jour des logiciels de caisse et de gestion client dans l\'ensemble de nos agences.',
      'Optimisation de la TraÃ§abilitÃ© : Veiller au dÃ©ploiement et Ã  la fiabilitÃ© des technologies de code-barres et d\'identification unique permettant de suivre chaque vÃªtement en temps rÃ©el, de la rÃ©ception Ã  la livraison.',
      'Support aux Ã‰quipes : Accompagner et former les caissiÃ¨res-conseillÃ¨res et les responsables de pÃ´les Ã  l\'utilisation optimale de nos plateformes numÃ©riques.',
      'Analyse de DonnÃ©es : Produire des rapports rÃ©guliers sur l\'activitÃ© des agences, les dÃ©lais de traitement et la satisfaction client pour aider Ã  la prise de dÃ©cision stratÃ©gique.',
    ],
    profile:
      'Bac+5 en Informatique de Gestion, SystÃ¨mes d\'Information ou Ã©quivalent. ExpÃ©rience de 3 ans minimum dans l\'administration de systÃ¨mes ERP/CRM. Connaissance des enjeux de traÃ§abilitÃ© et de code-barres. Rigueur, sens du service et pÃ©dagogie.',
    howToApply:
      'Envoyez votre CV et lettre de motivation Ã  carriere@elegance-pressing.com avec la rÃ©fÃ©rence "SI-2026" en objet.',
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
      'Dans le cadre du dynamisme de nos activitÃ©s et pour soutenir l\'animation de notre rÃ©seau de prÃ¨s d\'une centaine d\'agences, la Maison ELP propose un Stage AcadÃ©mique ou Professionnel d\'Assistant(e) Communication Digitale & Relation Client...',
    description:
      'Dans le cadre du dynamisme de nos activitÃ©s et pour soutenir l\'animation de notre rÃ©seau de prÃ¨s d\'une centaine d\'agences, la Maison ELP propose un Stage AcadÃ©mique ou Professionnel d\'Assistant(e) Communication Digitale & Relation Client. ImmergÃ©(e) au cÅ“ur de notre Ã©quipe administrative sous la supervision de nos responsables de pÃ´les, vous participerez activement au dÃ©veloppement de la visibilitÃ© en ligne de notre marque en Afrique Centrale et Ã  la valorisation de notre signature Â« Propre, c\'est Ã©lÃ©gant Â». C\'est une opportunitÃ© unique d\'acquÃ©rir une expÃ©rience pratique de premier plan au sein d\'une institution leader de la sous-rÃ©gion CEMAC.',
    missions: [
      'Animation du Blog & RÃ©seaux Sociaux : Participer Ã  la rÃ©daction d\'articles pour notre espace ActualitÃ©s & Conseils (conseils d\'entretien du linge, tendances, etc.) et animer nos communautÃ©s en ligne.',
      'CrÃ©ation de Contenu : Produire des visuels et des vidÃ©os courts mettant en valeur nos prestations, nos Ã©quipes et nos agences.',
      'Relation Client Digitale : RÃ©pondre aux messages et commentaires sur nos plateformes sociales avec la courtoisie et l\'Ã©lÃ©gance propres Ã  la Maison ELP.',
      'Veille Concurrentielle : Suivre les tendances du secteur et les meilleures pratiques digitales pour proposer des amÃ©liorations continues.',
    ],
    profile:
      'En cours de formation Bac+3/5 en Communication, Marketing Digital ou Relations Publiques. Excellentes qualitÃ©s rÃ©dactionnelles en franÃ§ais. MaÃ®trise des outils de crÃ©ation graphique (Canva, Adobe Suite). Connaissance des rÃ©seaux sociaux (Facebook, Instagram, LinkedIn). CrÃ©ativitÃ©, autonomie et sens de l\'esthÃ©tique.',
    howToApply:
      'Envoyez votre CV, lettre de motivation et portfolio Ã  carriere@elegance-pressing.com avec la rÃ©fÃ©rence "COM-STAGE-2026" en objet.',
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
      'Au cÅ“ur de notre dÃ©partement le plus imposant, nous recherchons un Chef d\'Atelier expÃ©rimentÃ© pour superviser le traitement Ã  grande Ã©chelle du linge des Ã©tablissements hÃ´teliers, hospitaliers et de restauration...',
    description:
      'Au cÅ“ur de notre dÃ©partement le plus imposant, nous recherchons un Chef d\'Atelier expÃ©rimentÃ© pour superviser le traitement Ã  grande Ã©chelle du linge des Ã©tablissements hÃ´teliers, hospitaliers et de restauration. Vous garantirez le respect des normes internationales les plus strictes et l\'efficacitÃ© opÃ©rationnelle de nos lignes de production.',
    missions: [
      'Pilotage de la Production : Organiser et superviser les cycles de lavage, sÃ©chage et repassage pour les gros volumes.',
      'ContrÃ´le QualitÃ© : VÃ©rifier la conformitÃ© de chaque lot selon les standards ELP.',
      'Management : Encadrer les Ã©quipes techniques et assurer la formation continue.',
      'Maintenance : Superviser l\'entretien des machines industrielles.',
    ],
    profile:
      'Bac+2/3 en Textile ou Chimie. ExpÃ©rience de 5 ans minimum en blanchisserie industrielle. Connaissance des normes HACCP et ISO. Leadership et rigueur.',
    howToApply:
      'Envoyez votre CV et lettre de motivation Ã  carriere@elegance-pressing.com avec la rÃ©fÃ©rence "ATELIER-2026" en objet.',
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
      'Rejoignez notre service administratif pour un stage pratique en gestion comptable et administrative au sein d\'une institution leader en Afrique Centrale. Vous participerez aux opÃ©rations quotidiennes de notre siÃ¨ge et dÃ©couvrirez les enjeux de gestion d\'un rÃ©seau de 100 agences.',
    missions: [
      'Saisie et suivi des factures fournisseurs et clients.',
      'Assistance Ã  la prÃ©paration des Ã©tats financiers mensuels.',
      'Classement et archivage des documents comptables.',
      'Support administratif Ã  la direction financiÃ¨re.',
    ],
    profile:
      'Ã‰tudiant(e) en Licence ou Master ComptabilitÃ©/Finance. MaÃ®trise d\'Excel. Rigueur et discrÃ©tion. Disponible 4 mois Ã  temps plein.',
    howToApply:
      'Envoyez votre CV et lettre de motivation Ã  carriere@elegance-pressing.com avec la rÃ©fÃ©rence "COMPTA-STAGE-2026" en objet.',
    publishedAt: '2026-10-14',
  },
];

export const JOB_CATEGORIES = [
  { value: 'ALL', label: 'Toutes les catÃ©gories' },
  { value: 'EMPLOI', label: 'Offres d\'emploi' },
  { value: 'STAGE', label: 'Stages' },
];