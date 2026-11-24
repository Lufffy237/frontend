export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
  }
  
  export interface Expert {
    id: string;
    name: string;
    description: string;
    image: string;
  }
  
  // ðŸ”§ Ã€ REMPLACER par vos vraies photos plus tard
  // Exemple : { id: '1', name: '...', role: '...', image: '/images/team/kenfack.jpg' }
  export const TEAM_MEMBERS: TeamMember[] = [
    {
      id: '1',
      name: 'M. KENFACK Daoudonner',
      role: 'DIRECTEUR ELP AFRIQUE',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '2',
      name: 'Dr. AZANGUE Patrick',
      role: 'DIRECTEUR ELP Gabon',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '3',
      name: 'M. MATOMBA Charles',
      role: 'DIRECTEUR ELP GuinÃ©e Ã‰quatoriale',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '4',
      name: 'Pr. AMIR NDASHI Idrissou',
      role: 'DIRECTEUR ELP Tchad',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '5',
      name: 'M. KENFACK Daoudonner',
      role: 'DIRECTEUR ELP AFRIQUE',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '6',
      name: 'Dr. AZANGUE Patrick',
      role: 'DIRECTEUR ELP Gabon',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '7',
      name: 'M. MATOMBA Charles',
      role: 'DIRECTEUR ELP GuinÃ©e Ã‰quatoriale',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '8',
      name: 'Pr. AMIR NDASHI Idrissou',
      role: 'DIRECTEUR ELP Tchad',
      image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '9',
      name: 'M. KENFACK Daoudonner',
      role: 'DIRECTEUR ELP AFRIQUE',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '10',
      name: 'Dr. AZANGUE Patrick',
      role: 'DIRECTEUR ELP Gabon',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '11',
      name: 'M. MATOMBA Charles',
      role: 'DIRECTEUR ELP GuinÃ©e Ã‰quatoriale',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    },
    {
      id: '12',
      name: 'Pr. AMIR NDASHI Idrissou',
      role: 'DIRECTEUR ELP Tchad',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    },
  ];
  
  export const EXPERTS: Expert[] = [
    {
      id: '1',
      name: 'M. KAMDEM Napoleon',
      description:
        'Expert reconnu dans le domaine du traitement textile, M. Kamdem apporte plus de 20 ans d\'expÃ©rience dans la gestion des processus de nettoyage industriel. Sa maÃ®trise des technologies de pointe et son engagement pour la qualitÃ© font de lui un pilier essentiel de notre Ã©quipe technique.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=700&fit=crop&crop=face',
    },
    {
      id: '2',
      name: 'M. KAMDEM Napoleon',
      description:
        'SpÃ©cialiste de l\'hygiÃ¨ne et de l\'assainissement, il supervise nos protocoles de dÃ©sinfection et de contrÃ´le qualitÃ©. Son expertise garantit que chaque piÃ¨ce traitÃ©e par Ã‰lÃ©gance Pressing respecte les standards internationaux les plus stricts.',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&h=700&fit=crop&crop=face',
    },
  ];
  
  export const FOUNDER = {
    name: 'L\'Honorable Manfouo David',
    role: 'Fondateur & PrÃ©sident Directeur GÃ©nÃ©ral de la Maison ELP',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop&crop=face',
    quote: `Lorsque j'ai posÃ© les fondations d'Ã‰lÃ©gance Pressing en 1990, mon ambition n'Ã©tait pas seulement de crÃ©er une blanchisserie, mais de bÃ¢tir une signature de confiance et de rigueur pour l'Afrique Centrale. Nous avons commencÃ© avec une promesse simple : celle de ne jamais transiger sur la qualitÃ©.
  
  En 35 ans d'histoire, notre continent a Ã©voluÃ©, et ELP a grandi avec lui, tissant un rÃ©seau de prÃ¨s d'une centaine d'agences. Mais au-delÃ  des machines modernes et de notre dÃ©ploiement, notre vÃ©ritable fiertÃ© rÃ©side dans la prÃ©servation du geste artisanal et de la confiance que nous accordent au quotidien les familles, les institutions et les grands acteurs Ã©conomiques. Pour nous, chaque vÃªtement confiÃ© est une responsabilitÃ©, et chaque fibre traitÃ©e doit reflÃ©ter notre credo ultime : Propre, c'est Ã©lÃ©gant.`,
  };