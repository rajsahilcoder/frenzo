export const PRICING_RATES = {
  type: { 
    standard: 3000,       // Dynamic Web (React Base)
    saas: 25000,          // Functional Software
    platform: 30000,      // Commerce/Marketplace
    mobile: 50000,        // Native App
    ecosystem: 80000      // Full Suite
  },
  intelligence: { none: 0, chatbot: 5000, agent: 15000 },
  design: { template: 0, custom: 5000, motion: 10000 },
  pageRate: 1000, // Per additional page
  features: {
    cms: 3000,
    auth: 3000,
    payments: 4000,
    analytics: 2000,
    seo: 2500,
    copywriting: 1500,
    logo: 1000
  }
};

export const ADDONS = [
  { id: 'auth', label: 'User Auth + DB', tip: 'Secure login, signups, and user profiles.' },
  { id: 'cms', label: 'CMS (Easy Edits)', tip: 'Admin panel to edit text/images without coding.' },
  { id: 'payments', label: 'Payment Integration', tip: 'Stripe/Razorpay setup for accepting money.' },
  { id: 'analytics', label: 'Advanced Analytics', tip: 'Deep insights into user behavior and conversion.' },
  { id: 'seo', label: 'SEO Optimization', tip: 'Meta tags, sitemap, and performance tuning for Google.' },
  { id: 'copywriting', label: 'Pro Copywriting', tip: 'Professional sales copy to convert visitors.' },
  { id: 'logo', label: 'Logo Design', tip: 'Custom vector logo for your brand.' }
];

export const INTELLIGENCE_OPTIONS = ['none', 'chatbot', 'agent'];
export const DESIGN_OPTIONS = ['template', 'custom', 'motion'];
