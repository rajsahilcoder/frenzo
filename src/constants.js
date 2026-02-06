/**
 * Application Constants
 */

// PRICING CONFIGURATION
export const PRICING_RATES = {
  // Base Project Types
  type: {
    starter: 2000,        // Static Portfolio
    standard: 15000, 
    ecommerce: 30000,
    saas: 50000
    // Removed old unused ones for clarity if needed, or keep them if they are used elsewhere
  },
  
  // AI Integration Levels
  intelligence: {
    none: 0,
    basic: 10000,
    advanced: 25000
  },
  
  // Design Complexity
  design: {
    template: 0,
    custom: 15000
  },
  
  // Feature Costs
  features: {
    cms: 5000,
    payments: 8000,
    auth: 8000,
    analytics: 5000,
    seo: 5000,
    chat: 8000
  },

  // Per Page Rate (for standard sites)
  pageRate: 2000
};

// TOOLTIP TEXTS
export const TOOLTIPS = {
  projectType: {
    starter: "Quick, professional one-page portfolio. Hosted on GitHub Pages. No backend.",
    standard: "Interactive, scalable site using modern tech (React/Vue/etc). Best for businesses needing a future-proof presence.",
    saas: "Complex logic, dashboards, and tools. Includes state management.",
    platform: "Marketplaces, social networks, or multi-vendor stores. Heavy on user interactions.",
    mobile: "Native iOS and Android apps (React Native). Published to App Stores.",
    ecosystem: "Full suite: Web App + Mobile App + Admin Dashboard + Landing Page."
  },
  design: {
    template: "Clean, professional UI using standard components.",
    custom: "Unique branding, custom layouts, and tailored visual identity.",
    motion: "High-end animations, scroll effects, and immersive interactions."
  },
  intelligence: {
    chatbot: "Automated Q&A bot trained on your data.",
    agent: "Autonomous agent that can perform tasks (booking, emailing, searching)."
  }
};

// CONTACT FORM MESSAGES
export const CONTACT_MESSAGES = {
  BOOK_STRATEGY: 'I am interested in Booking a Free Scale Strategy Session.',
  AUDIT_RESULT: (score, title) => `I completed the Tech Audit and scored ${score}/55 (${title}). I need help fixing my scalability gaps.`,
  LAUNCH_OFFER: 'I want to claim the Launch Offer.'
};

// AUDIT CONFIGURATION
export const AUDIT_CONFIG = {
  MAX_SCORE: 55,
  THRESHOLDS: {
    SCALABLE: 40,
    GROWING: 20
  },
  RESULTS: {
    SCALABLE: {
      title: "Scalable Foundation",
      color: "#22c55e",
      desc: "You have a solid tech stack, but there's room to optimize with advanced AI agents."
    },
    GROWING: {
      title: "Growing Pains",
      color: "#fbbf24",
      desc: "You are relying too much on manual work or rented platforms. It's time to build your own assets."
    },
    RISK: {
      title: "At Risk",
      color: "#ef4444",
      desc: "Your business is highly dependent on manual labor or third-party rules. You need a custom infrastructure immediately."
    }
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

// COMPANY INFORMATION
export const COMPANY_INFO = {
  name: 'Frenzo Services',
  email: 'contact@frenzo.services',
  phone: '+91 8904045305',
  phoneDisplay: '+91 89040 45305',
  address: 'India', 
  website: 'https://frenzo.services'
};

// ADMIN CONFIGURATION
export const ADMIN_EMAILS = [
  'contact@frenzo.services',
  // Add developer emails here
];
