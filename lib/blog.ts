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
  
  // 🔧 Données fictives - À remplacer par l'API backend plus tard
  export const BLOG_POSTS: BlogPost[] = [
    {
      id: '1',
      title: 'Rejoignez l\'équipe administrative d\'ELP',
      excerpt: 'Dans le cadre de notre développement continu, nous recherchons des talents pour renforcer notre équipe administrative. Rejoignez une entreprise leader en Afrique Centrale et participez à notre croissance.',
      content: 'Dans le cadre de notre développement continu, nous recherchons des talents pour renforcer notre équipe administrative. Rejoignez une entreprise leader en Afrique Centrale et participez à notre croissance.\n\nChez Élégance Pressing, nous croyons que notre force réside dans la qualité de nos collaborateurs. Nous offrons un environnement de travail stimulant, des opportunités d\'évolution et une formation continue.\n\n**Les postes disponibles :**\n- Assistant(e) administratif(ve)\n- Responsable RH\n- Comptable\n- Gestionnaire de paie\n\n**Profil recherché :**\n- Bac+2/3 minimum\n- Expérience de 2 ans minimum\n- Maîtrise des outils bureautiques\n- Excellentes capacités de communication\n\n**Avantages :**\n- Salaire compétitif\n- Mutuelle santé\n- Formation continue\n- Évolution de carrière',
      slug: 'rejoignez-equipe-administrative-elp',
      category: 'recrutement',
      categoryLabel: 'Recrutement & Stages',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
      author: 'Service RH',
      publishedAt: '2026-10-01',
      readTime: '3 min',
      tags: ['Recrutement', 'Carrières', 'Administratif'],
    },
    {
      id: '2',
      title: 'L\'art d\'un assainissement professionnel pour vos espaces',
      excerpt: 'La maison ELP vous offre des solutions complètes en matière d\'assainissement professionnel. Découvrez nos techniques de pointe pour des espaces sains et agréables.',
      content: 'La maison ELP vous offre des solutions complètes en matière d\'assainissement professionnel. Découvrez nos techniques de pointe pour des espaces sains et agréables.\n\n**Nos services d\'assainissement :**\n- Désinfection des locaux\n- Traitement anti-acariens\n- Élimination des mauvaises odeurs\n- Purification de l\'air\n\n**Pourquoi nous choisir ?**\n- Produits écologiques certifiés\n- Personnel formé et certifié\n- Intervention rapide\n- Résultats garantis',
      slug: 'art-assainissement-professionnel-espaces',
      category: 'conseils',
      categoryLabel: 'Conseils d\'Experts',
      image: 'https://images.unsplash.com/photo-1581578731117-104f2a41272c?w=800&h=600&fit=crop',
      author: 'Équipe Technique',
      publishedAt: '2026-09-28',
      readTime: '5 min',
      tags: ['Assainissement', 'Hygiène', 'Conseils'],
    },
    {
      id: '3',
      title: 'Les Coulisses Du Recrutement Au Sein De La Maison ELP',
      excerpt: 'Découvrez notre processus de recrutement rigoureux et transparent. De la réception des candidatures à l\'intégration, suivez le parcours d\'un candidat.',
      content: 'Découvrez notre processus de recrutement rigoureux et transparent. De la réception des candidatures à l\'intégration, suivez le parcours d\'un candidat.\n\n**Notre processus en 5 étapes :**\n\n1. **Dépôt de candidature** : Via notre site web ou par email\n2. **Présélection** : Étude des CV et lettres de motivation\n3. **Entretien téléphonique** : Premier contact avec le service RH\n4. **Entretien en présentiel** : Rencontre avec le responsable du poste\n5. **Intégration** : Formation et accompagnement\n\n**Nos critères de sélection :**\n- Compétences techniques\n- Soft skills (communication, travail d\'équipe)\n- Adéquation avec nos valeurs\n- Motivation et potentiel d\'évolution',
      slug: 'coulisses-recrutement-maison-elp',
      category: 'recrutement',
      categoryLabel: 'Recrutement & Stages',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
      author: 'Direction RH',
      publishedAt: '2026-09-25',
      readTime: '4 min',
      tags: ['Recrutement', 'Processus', 'Carrières'],
    },
    {
      id: '4',
      title: 'Comment le numérique transforme l\'expérience de votre pressing',
      excerpt: 'Découvrez comment ELP innove avec des solutions digitales pour simplifier votre quotidien. Suivi en temps réel, notifications SMS, paiement mobile...',
      content: 'Découvrez comment ELP innove avec des solutions digitales pour simplifier votre quotidien. Suivi en temps réel, notifications SMS, paiement mobile...\n\n**Nos innovations digitales :**\n- Application mobile de suivi\n- Notifications SMS en temps réel\n- Paiement mobile (Orange Money, MTN Mobile Money)\n- Réservation en ligne\n- Historique digital de vos commandes\n\n**Les avantages :**\n- Gain de temps\n- Traçabilité totale\n- Sécurité des paiements\n- Service 24h/24',
      slug: 'numerique-transforme-experience-pressing',
      category: 'actualites',
      categoryLabel: 'Actualités',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
      author: 'Direction Innovation',
      publishedAt: '2026-09-20',
      readTime: '6 min',
      tags: ['Digital', 'Innovation', 'Technologie'],
    },
    {
      id: '5',
      title: 'Le Capital Humain Au Cœur De La Croissance D\'ELP',
      excerpt: 'Notre réussite repose sur nos équipes. Découvrez notre politique de formation continue et notre engagement pour le développement des compétences.',
      content: 'Notre réussite repose sur nos équipes. Découvrez notre politique de formation continue et notre engagement pour le développement des compétences.\n\n**Nos programmes de formation :**\n- Formation technique aux nouvelles machines\n- Formation aux normes d\'hygiène et sécurité\n- Formation au service client\n- Formation managériale\n\n**Nos engagements :**\n- 40h de formation par an et par collaborateur\n- Certifications reconnues\n- Plan de carrière personnalisé\n- Mentorat',
      slug: 'capital-humain-coeur-croissance-elp',
      category: 'actualites',
      categoryLabel: 'Actualités',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      author: 'Direction Générale',
      publishedAt: '2026-09-15',
      readTime: '5 min',
      tags: ['RH', 'Formation', 'Développement'],
    },
    {
      id: '6',
      title: 'Les Secrets Professionnels Pour L\'entretien Durable De Vos Vêtements',
      excerpt: 'Nos experts vous révèlent leurs astuces pour prolonger la durée de vie de vos vêtements. Conseils de lavage, repassage, rangement...',
      content: 'Nos experts vous révèlent leurs astuces pour prolonger la durée de vie de vos vêtements. Conseils de lavage, repassage, rangement...\n\n**Conseils d\'experts :**\n\n1. **Tri des vêtements** : Séparez les couleurs, les textures\n2. **Température de lavage** : Adaptez selon le tissu\n3. **Produits adaptés** : Utilisez des détergents doux\n4. **Séchage** : Évitez le sèche-linge pour les tissus délicats\n5. **Rangement** : Pliez ou suspendez selon le vêtement\n\n**Astuces bonus :**\n- Retournez les vêtements avant lavage\n- Utilisez des sacs de lavage pour les pièces délicates\n- Aérez régulièrement votre garde-robe',
      slug: 'secrets-professionnels-entretien-durable-vetements',
      category: 'conseils',
      categoryLabel: 'Conseils d\'Experts',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      author: 'Équipe Technique',
      publishedAt: '2026-09-10',
      readTime: '7 min',
      tags: ['Conseils', 'Entretien', 'Vêtements'],
    },
  ];
  
  export const BLOG_CATEGORIES = [
    { value: 'ALL', label: 'Toutes les catégories' },
    { value: 'recrutement', label: 'Recrutement & Stages' },
    { value: 'conseils', label: 'Conseils d\'Experts' },
    { value: 'actualites', label: 'Actualités' },
  ];
  
  export const ITEMS_PER_PAGE = 6;