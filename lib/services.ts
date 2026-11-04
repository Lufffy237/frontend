export interface Service {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    image: string;
    slug: string;
  }
  
  export const SERVICES: Service[] = [
    {
      id: 'blanchisserie',
      title: 'LA BLANCHISSERIE',
      description:
        'Ce service utilise des techniques de nettoyage humide de pointe combinant l\'usage de détergents professionnels, de détachants ciblés et de désinfectants haut de gamme pour garantir la pureté, la fraîcheur absolue et l\'éclat de votre linge quotidien.',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&h=600&fit=crop',
      slug: 'blanchisserie',
    },
    {
      id: 'nettoyage-sec',
      title: 'LE NETTOYAGE A SEC',
      description:
        'Il s\'agit d\'un nettoyage de précision à base de solvants rigoureusement sélectionnés et de détachants spécifiques, spécialement conçu pour purifier en profondeur les textiles nobles et les pièces de haute couture tout en préservant l\'intégrité de vos vêtements précieux.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      slug: 'nettoyage-sec',
    },
    {
      id: 'nettoyage-industriel',
      title: 'LE NETTOYAGE INDUSTRIEL',
      description:
        'Département le plus imposant de notre structure, ce pôle s\'appuie sur de lourds investissements matériels et humains pour assurer, en plus des particuliers, l\'entretien à grande échelle du linge des établissements hôteliers, hospitaliers et de restauration selon les normes internationales les plus strictes.',
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&h=600&fit=crop',
      slug: 'nettoyage-industriel',
    },
    {
      id: 'hygiene',
      title: 'L\'HYGIENE ET L\'ASSAINISSEMENT',
      description:
        'Ce département spécialisé a pour but d\'améliorer et de sécuriser votre cadre de vie ou vos locaux professionnels grâce à des protocoles rigoureux de désinfection, désinsectisation et dératisation afin de lutter efficacement contre la prolifération des insectes et des rongeurs.',
      image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&h=600&fit=crop',
      slug: 'hygiene',
    },
    {
      id: 'raccommodage',
      title: 'LE SERVICE PLUS',
      subtitle: '(RACCOMMODAGE - STOPPAGE)',
      description:
        'Véritable valeur ajoutée exclusive, notre atelier de couture intégré inspecte méticuleusement chaque pièce afin de corriger la moindre anomalie, qu\'il s\'agisse de boutons manquants, d\'effilochages ou de micro-déchirures, pour que votre linge vous revienne parfait et prêt à être porté.',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=600&fit=crop',
      slug: 'raccommodage',
    },
  ];