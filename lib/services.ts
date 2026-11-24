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
        'Ce service utilise des techniques de nettoyage humide de pointe combinant l\'usage de dÃ©tergents professionnels, de dÃ©tachants ciblÃ©s et de dÃ©sinfectants haut de gamme pour garantir la puretÃ©, la fraÃ®cheur absolue et l\'Ã©clat de votre linge quotidien.',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&h=600&fit=crop',
      slug: 'blanchisserie',
    },
    {
      id: 'nettoyage-sec',
      title: 'LE NETTOYAGE A SEC',
      description:
        'Il s\'agit d\'un nettoyage de prÃ©cision Ã  base de solvants rigoureusement sÃ©lectionnÃ©s et de dÃ©tachants spÃ©cifiques, spÃ©cialement conÃ§u pour purifier en profondeur les textiles nobles et les piÃ¨ces de haute couture tout en prÃ©servant l\'intÃ©gritÃ© de vos vÃªtements prÃ©cieux.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      slug: 'nettoyage-sec',
    },
    {
      id: 'nettoyage-industriel',
      title: 'LE NETTOYAGE INDUSTRIEL',
      description:
        'DÃ©partement le plus imposant de notre structure, ce pÃ´le s\'appuie sur de lourds investissements matÃ©riels et humains pour assurer, en plus des particuliers, l\'entretien Ã  grande Ã©chelle du linge des Ã©tablissements hÃ´teliers, hospitaliers et de restauration selon les normes internationales les plus strictes.',
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&h=600&fit=crop',
      slug: 'nettoyage-industriel',
    },
    {
      id: 'hygiene',
      title: 'L\'HYGIENE ET L\'ASSAINISSEMENT',
      description:
        'Ce dÃ©partement spÃ©cialisÃ© a pour but d\'amÃ©liorer et de sÃ©curiser votre cadre de vie ou vos locaux professionnels grÃ¢ce Ã  des protocoles rigoureux de dÃ©sinfection, dÃ©sinsectisation et dÃ©ratisation afin de lutter efficacement contre la prolifÃ©ration des insectes et des rongeurs.',
      image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&h=600&fit=crop',
      slug: 'hygiene',
    },
    {
      id: 'raccommodage',
      title: 'LE SERVICE PLUS',
      subtitle: '(RACCOMMODAGE - STOPPAGE)',
      description:
        'VÃ©ritable valeur ajoutÃ©e exclusive, notre atelier de couture intÃ©grÃ© inspecte mÃ©ticuleusement chaque piÃ¨ce afin de corriger la moindre anomalie, qu\'il s\'agisse de boutons manquants, d\'effilochages ou de micro-dÃ©chirures, pour que votre linge vous revienne parfait et prÃªt Ã  Ãªtre portÃ©.',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=600&fit=crop',
      slug: 'raccommodage',
    },
  ];