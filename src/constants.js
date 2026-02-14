/**
 * Application Constants
 */

// PRICING CONFIGURATION
export const PRICING_RATES = {
  type: { 
    starter: 4499,        // Static Portfolio (Kept for compatibility)
    standard: 4999,       // Dynamic Web (React Base)
    saas: 129999,          // Functional Software
    platform: 99999,      // Commerce/Marketplace
    mobile: 129999,        // Native App
    ecosystem: 169999      // Full Suite
  },
  intelligence: {
    none: 0, 
    chatbot: 15000, 
    agent: 30000 
  },
  design: { 
    template: 0, 
    custom: 10000, 
    motion: 20000 
  },
  pageRate: 2000, // Per additional page
  features: {
    cms: 5000,
    auth: 5000,
    payments: 5000,
    analytics: 10000,
    seo: 10000,
    copywriting: 15000,
    logo: 2000
  },
  
  // Discount Logic
  DISCOUNT_MULTIPLIER: 1.89
};
// export const PRICING_RATES = {
//   type: { 
//     starter: 2499,        // Static Portfolio (Kept for compatibility)
//     standard: 3499,       // Dynamic Web (React Base)
//     saas: 39999,          // Functional Software
//     platform: 45999,      // Commerce/Marketplace
//     mobile: 59999,        // Native App
//     ecosystem: 79999      // Full Suite
//   },
//   intelligence: {
//     none: 0, 
//     chatbot: 5000, 
//     agent: 15000 
//   },
//   design: { 
//     template: 0, 
//     custom: 5000, 
//     motion: 10000 
//   },
//   pageRate: 1000, // Per additional page
//   features: {
//     cms: 3000,
//     auth: 3000,
//     payments: 4000,
//     analytics: 2000,
//     seo: 2500,
//     copywriting: 1500,
//     logo: 2000
//   },
  
//   // Discount Logic
//   DISCOUNT_MULTIPLIER: 2.19
// };

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
  'rajsahilcoder@gmail.com'
];
