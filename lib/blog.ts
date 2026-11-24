export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    category: 'recrutement' | 'conseils' | 'actualites';
    categoryLabel: string;
    image: string;
    author: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
  }
  
  // ðŸ”§ DonnÃ©es fictives - Ã€ remplacer par l'API backend plus tard
  export const BLOG_POSTS: BlogPost[] = [
    {
      id: '1',
      title: 'Rejoignez l\'Ã©quipe administrative d\'ELP',
      excerpt: 'Dans le cadre de notre dÃ©veloppement continu, nous recherchons des talents pour renforcer notre Ã©quipe administrative. Rejoignez une entreprise leader en Afrique Centrale et participez Ã  notre croissance.',
      content: 'Dans le cadre de notre dÃ©veloppement continu, nous recherchons des talents pour renforcer notre Ã©quipe administrative. Rejoignez une entreprise leader en Afrique Centrale et participez Ã  notre croissance.\n\nChez Ã‰lÃ©gance Pressing, nous croyons que notre force rÃ©side dans la qualitÃ© de nos collaborateurs. Nous offrons un environnement de travail stimulant, des opportunitÃ©s d\'Ã©volution et une formation continue.\n\n**Les postes disponibles :**\n- Assistant(e) administratif(ve)\n- Responsable RH\n- Comptable\n- Gestionnaire de paie\n\n**Profil recherchÃ© :**\n- Bac+2/3 minimum\n- ExpÃ©rience de 2 ans minimum\n- MaÃ®trise des outils bureautiques\n- Excellentes capacitÃ©s de communication\n\n**Avantages :**\n- Salaire compÃ©titif\n- Mutuelle santÃ©\n- Formation continue\n- Ã‰volution de carriÃ¨re',
      slug: 'rejoignez-equipe-administrative-elp',
      category: 'recrutement',
      categoryLabel: 'Recrutement & Stages',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      author: 'Service RH',
      publishedAt: '2026-10-01',
      readTime: '3 min',
      tags: ['Recrutement', 'CarriÃ¨res', 'Administratif'],
    },
    {
      id: '2',
      title: 'L\'art d\'un assainissement professionnel pour vos espaces',
      excerpt: 'La maison ELP vous offre des solutions complÃ¨tes en matiÃ¨re d\'assainissement professionnel. DÃ©couvrez nos techniques de pointe pour des espaces sains et agrÃ©ables.',
      content: 'La maison ELP vous offre des solutions complÃ¨tes en matiÃ¨re d\'assainissement professionnel. DÃ©couvrez nos techniques de pointe pour des espaces sains et agrÃ©ables.\n\n**Nos services d\'assainissement :**\n- DÃ©sinfection des locaux\n- Traitement anti-acariens\n- Ã‰limination des mauvaises odeurs\n- Purification de l\'air\n\n**Pourquoi nous choisir ?**\n- Produits Ã©cologiques certifiÃ©s\n- Personnel formÃ© et certifiÃ©\n- Intervention rapide\n- RÃ©sultats garantis',
      slug: 'art-assainissement-professionnel-espaces',
      category: 'conseils',
      categoryLabel: 'Conseils d\'Experts',
      image: 'https://images.unsplash.com/photo-1581578731117-104f2a41272c?w=800&h=600&fit=crop',
      author: 'Ã‰quipe Technique',
      publishedAt: '2026-09-28',
      readTime: '5 min',
      tags: ['Assainissement', 'HygiÃ¨ne', 'Conseils'],
    },
    {
      id: '3',
      title: 'Les Coulisses Du Recrutement Au Sein De La Maison ELP',
      excerpt: 'DÃ©couvrez notre processus de recrutement rigoureux et transparent. De la rÃ©ception des candidatures Ã  l\'intÃ©gration, suivez le parcours d\'un candidat.',
      content: 'DÃ©couvrez notre processus de recrutement rigoureux et transparent. De la rÃ©ception des candidatures Ã  l\'intÃ©gration, suivez le parcours d\'un candidat.\n\n**Notre processus en 5 Ã©tapes :**\n\n1. **DÃ©pÃ´t de candidature** : Via notre site web ou par email\n2. **PrÃ©sÃ©lection** : Ã‰tude des CV et lettres de motivation\n3. **Entretien tÃ©lÃ©phonique** : Premier contact avec le service RH\n4. **Entretien en prÃ©sentiel** : Rencontre avec le responsable du poste\n5. **IntÃ©gration** : Formation et accompagnement\n\n**Nos critÃ¨res de sÃ©lection :**\n- CompÃ©tences techniques\n- Soft skills (communication, travail d\'Ã©quipe)\n- AdÃ©quation avec nos valeurs\n- Motivation et potentiel d\'Ã©volution',
      slug: 'coulisses-recrutement-maison-elp',
      category: 'recrutement',
      categoryLabel: 'Recrutement & Stages',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
      author: 'Direction RH',
      publishedAt: '2026-09-25',
      readTime: '4 min',
      tags: ['Recrutement', 'Processus', 'CarriÃ¨res'],
    },
    {
      id: '4',
      title: 'Comment le numÃ©rique transforme l\'expÃ©rience de votre pressing',
      excerpt: 'DÃ©couvrez comment ELP innove avec des solutions digitales pour simplifier votre quotidien. Suivi en temps rÃ©el, notifications SMS, paiement mobile...',
      content: 'DÃ©couvrez comment ELP innove avec des solutions digitales pour simplifier votre quotidien. Suivi en temps rÃ©el, notifications SMS, paiement mobile...\n\n**Nos innovations digitales :**\n- Application mobile de suivi\n- Notifications SMS en temps rÃ©el\n- Paiement mobile (Orange Money, MTN Mobile Money)\n- RÃ©servation en ligne\n- Historique digital de vos commandes\n\n**Les avantages :**\n- Gain de temps\n- TraÃ§abilitÃ© totale\n- SÃ©curitÃ© des paiements\n- Service 24h/24',
      slug: 'numerique-transforme-experience-pressing',
      category: 'actualites',
      categoryLabel: 'ActualitÃ©s',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
      author: 'Direction Innovation',
      publishedAt: '2026-09-20',
      readTime: '6 min',
      tags: ['Digital', 'Innovation', 'Technologie'],
    },
    {
      id: '5',
      title: 'Le Capital Humain Au CÅ“ur De La Croissance D\'ELP',
      excerpt: 'Notre rÃ©ussite repose sur nos Ã©quipes. DÃ©couvrez notre politique de formation continue et notre engagement pour le dÃ©veloppement des compÃ©tences.',
      content: 'Notre rÃ©ussite repose sur nos Ã©quipes. DÃ©couvrez notre politique de formation continue et notre engagement pour le dÃ©veloppement des compÃ©tences.\n\n**Nos programmes de formation :**\n- Formation technique aux nouvelles machines\n- Formation aux normes d\'hygiÃ¨ne et sÃ©curitÃ©\n- Formation au service client\n- Formation managÃ©riale\n\n**Nos engagements :**\n- 40h de formation par an et par collaborateur\n- Certifications reconnues\n- Plan de carriÃ¨re personnalisÃ©\n- Mentorat',
      slug: 'capital-humain-coeur-croissance-elp',
      category: 'actualites',
      categoryLabel: 'ActualitÃ©s',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      author: 'Direction GÃ©nÃ©rale',
      publishedAt: '2026-09-15',
      readTime: '5 min',
      tags: ['RH', 'Formation', 'DÃ©veloppement'],
    },
    {
      id: '6',
      title: 'Les Secrets Professionnels Pour L\'entretien Durable De Vos VÃªtements',
      excerpt: 'Nos experts vous rÃ©vÃ¨lent leurs astuces pour prolonger la durÃ©e de vie de vos vÃªtements. Conseils de lavage, repassage, rangement...',
      content: 'Nos experts vous rÃ©vÃ¨lent leurs astuces pour prolonger la durÃ©e de vie de vos vÃªtements. Conseils de lavage, repassage, rangement...\n\n**Conseils d\'experts :**\n\n1. **Tri des vÃªtements** : SÃ©parez les couleurs, les textures\n2. **TempÃ©rature de lavage** : Adaptez selon le tissu\n3. **Produits adaptÃ©s** : Utilisez des dÃ©tergents doux\n4. **SÃ©chage** : Ã‰vitez le sÃ¨che-linge pour les tissus dÃ©licats\n5. **Rangement** : Pliez ou suspendez selon le vÃªtement\n\n**Astuces bonus :**\n- Retournez les vÃªtements avant lavage\n- Utilisez des sacs de lavage pour les piÃ¨ces dÃ©licates\n- AÃ©rez rÃ©guliÃ¨rement votre garde-robe',
      slug: 'secrets-professionnels-entretien-durable-vetements',
      category: 'conseils',
      categoryLabel: 'Conseils d\'Experts',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      author: 'Ã‰quipe Technique',
      publishedAt: '2026-09-10',
      readTime: '7 min',
      tags: ['Conseils', 'Entretien', 'VÃªtements'],
    },
  ];
  
  export const BLOG_CATEGORIES = [
    { value: 'ALL', label: 'Toutes les catÃ©gories' },
    { value: 'recrutement', label: 'Recrutement & Stages' },
    { value: 'conseils', label: 'Conseils d\'Experts' },
    { value: 'actualites', label: 'ActualitÃ©s' },
  ];
  
  export const ITEMS_PER_PAGE = 6;