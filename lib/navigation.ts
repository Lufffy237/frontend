export interface NavItem {
    label: string;
    href: string;
    highlight?: boolean;
  }
  
  export const NAV_ITEMS: NavItem[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Nos étapes', href: '/etapes' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Blog / Info', href: '/blog' },
    { label: 'Carrières', href: '/carrieres' },
    { label: 'Galerie', href: '/galerie' },
  ];
  
  export const NAV_CTA: NavItem[] = [
    { label: 'Agences', href: '/agences', highlight: true },
    { label: 'Contact', href: '/contact', highlight: true },
  ];
  
  export const FOOTER_SERVICES = [
    { label: 'Blanchisserie', href: '/services#blanchisserie' },
    { label: 'Nettoyage à sec', href: '/services#nettoyage-sec' },
    { label: 'Nettoyage industriel', href: '/services#nettoyage-industriel' },
    { label: 'Hygiène & assainissement', href: '/services#hygiene' },
    { label: 'Raccommodage & stoppage', href: '/services#raccommodage' },
  ];
  
  export const FOOTER_COMPANY = [
    { label: 'Notre histoire', href: '/a-propos#histoire' },
    { label: 'Mot du fondateur', href: '/a-propos#fondateur' },
    { label: 'Équipe dirigeante', href: '/a-propos#equipe' },
    { label: 'Savoir-faire', href: '/a-propos#savoir-faire' },
  ];
  
  export const FOOTER_RESOURCES = [
    { label: 'Blog & actualités', href: '/blog' },
    { label: 'Conseils entretien', href: '/blog?category=conseils' },
    { label: 'Offres d\'emploi', href: '/carrieres' },
    { label: 'Stages', href: '/carrieres?type=INTERNSHIP' },
    { label: 'FAQ', href: '/contact#faq' },
  ];
  
  export const SOCIAL_LINKS = [
    { name: 'Facebook', href: 'https://facebook.com/elegancepressing', icon: 'facebook' },
    { name: 'Instagram', href: 'https://instagram.com/elegancepressing', icon: 'instagram' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/elegancepressing', icon: 'linkedin' },
    { name: 'WhatsApp', href: 'https://wa.me/237000000000', icon: 'whatsapp' },
  ];