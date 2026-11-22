/**
 * Centralized Site and Brand Configuration for YSM Infotech
 * Source of truth for verified company credentials, contact channels, and brand assets.
 */

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  certification: string;
  contact: {
    phone: string;
    displayPhone: string;
    email: string;
    whatsapp: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    whatsapp: string;
  };
  brand: {
    primaryColor: string;
    secondaryColor: string;
    brightColor: string;
    inkColor: string;
    softColor: string;
    identityDescription: string;
    logo: {
      brandLogo: string;
      svg: string;
      original: string;
      trimmed: string;
      emblem: string;
      iconSvg: string;
      alt: string;
    };
  };
}

export const siteConfig: SiteConfig = {
  name: 'YSM Infotech',
  tagline: 'Professional Technology Education & Enterprise Skills',
  description:
    'Live Training + E-Learning, hands-on practical labs, ISO 9001:2015 certification, and placement guidance in AI, Data Analytics, and Cloud Engineering.',
  certification: 'ISO 9001:2015 Certified',
  contact: {
    phone: '+91 79977 91456',
    displayPhone: '+91 79977 91456',
    email: 'info@ysminfotech.com',
    whatsapp: 'https://wa.me/917997791456',
  },
  socialLinks: {
    facebook: 'https://www.facebook.com/profile.php?id=100091821725536',
    instagram: 'https://instagram.com/ysm.info786',
    linkedin: 'https://www.linkedin.com/in/ysm-infotech-314b15271/',
    whatsapp: 'https://wa.me/917997791456',
  },
  brand: {
    primaryColor: '#006B68',
    secondaryColor: '#008F8B',
    brightColor: '#12AFA8',
    inkColor: '#071B1C',
    softColor: '#F5FAF9',
    identityDescription: 'Turquoise, deep teal, editorial obsidian slate, and crisp white.',
    logo: {
      brandLogo: '/images/logo/ysm-brand-logo.png',
      svg: '/images/logo/ysm-logo.svg',
      original: '/images/logo/ysm-logo-original.png',
      trimmed: '/images/logo/ysm-logo-trimmed.png',
      emblem: '/icons/ysm-emblem.png',
      iconSvg: '/icons/ysm-icon.svg',
      alt: 'YSM Infotech - An ISO 9001: 2015 Certified Organization',
    },
  },
};
