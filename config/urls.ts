// Project URL Configuration
export const URLS = {
  // Navigation Routes
  HOME: '/',
  PROPERTIES: '/properties',
  PORTFOLIO: '/portfolio',
  INSIGHTS: '/insights',
  SERVICES: '/services',
  PHILOSOPHY: '/philosophy',
  ABOUT: '/about',
  CONTACT: '/contact',
  
  // Legal Pages
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
  COOKIES: '/cookies',
  
  // External Links (if needed)
  EMAIL: 'mailto:contact@spmc.com',
  PHONE: 'tel:+1234567890',
  
  // Social Media (if needed)
  LINKEDIN: 'https://linkedin.com/company/spmc',
  INSTAGRAM: 'https://instagram.com/spmc',
  FACEBOOK: 'https://facebook.com/spmc',
  
  // Assets
  CDN_BASE: 'https://cdn.jsdelivr.net/gh/arambhaniti/spmc-content@main',
  HERO_VIDEO: 'https://cdn.jsdelivr.net/gh/arambhaniti/spmc-content@main/videos/hero.mp4',
  HERO_IMAGE:'https://cdn.jsdelivr.net/gh/arambhaniti/spmc-content@main/images/hero/hero1.jpg'
} as const

// Helper function to get URL by key
export function getUrl(key: keyof typeof URLS): string {
  return URLS[key]
}
