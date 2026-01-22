import React from 'react';
import { Globe, Play, ShoppingBag, Users, Layout, Server, Zap, BarChart, Smartphone, Database } from 'lucide-react';

export const servicesData = [
  {
    id: 'creator-website',
    title: 'Creator Website',
    tagline: 'Your Content. Your Audience. Your Empire.',
    description: 'A personal content hub that converts audience attention into owned revenue streams. Stop renting your home on social media platform.',
    icon: <Globe size={40} />,
    color: '#3b82f6',
    features: [
      'Custom Bio & Portfolio',
      'Newsletter Integration',
      'Merch Storefront',
      'Affiliate Links Dashboard',
      'Booking System'
    ],
    demoType: 'creator',
    bestFor: 'YouTubers, Podcasters, Influencers'
  },
  {
    id: 'course-platform',
    title: 'Course Platform',
    tagline: 'Sell Knowledge, Not Just Time.',
    description: 'A complete LMS (Learning Management System) to host and sell your courses directly. Keep 100% of your revenue.',
    icon: <Play size={40} />,
    color: '#8b5cf6',
    features: [
      'Video Hosting & Streaming',
      'Student Progress Tracking',
      'Quizzes & Assignments',
      'Drip Content',
      'Completion Certificates'
    ],
    demoType: 'course',
    bestFor: 'Educators, Coaches, Experts'
  },
  {
    id: 'ecommerce-store',
    title: 'E-commerce Brand Store',
    tagline: 'Direct-to-Consumer Powerhouse.',
    description: 'A beautiful, high-conversion online store tailored to your brand story. No generic templates, just sales performance.',
    icon: <ShoppingBag size={40} />,
    color: '#ec4899',
    features: [
      'Custom Product Pages',
      'One-Click Checkout',
      'Inventory Management',
      'Abandoned Cart Recovery',
      'Global Payment Gateways'
    ],
    demoType: 'commerce',
    bestFor: 'D2C Brands, Merch Sellers'
  },
  {
    id: 'membership-platform',
    title: 'Membership Community',
    tagline: 'Recurring Revenue & Loyal Tribes.',
    description: 'Gate your premium content and build a thriving private community. Transform casual followers into paying members.',
    icon: <Users size={40} />,
    color: '#10b981',
    features: [
      'Tiered Access Levels',
      'Private Forums/Chat',
      'Exclusive Content Feed',
      'Member Directory',
      'Recurring Billing'
    ],
    demoType: 'community',
    bestFor: 'Community Leaders, Niche Groups'
  },
  {
    id: 'newsletter-platform',
    title: 'Newsletter Engine',
    tagline: 'Own the Inbox.',
    description: 'A publishing platform for writers who want independence. Distribute free and paid newsletters without algorithms.',
    icon: <Layout size={40} />,
    color: '#f59e0b',
    features: [
      'Email Editor',
      'Subscriber Management',
      'Paid Subscriptions',
      'Open Rate Analytics',
      'Landing Page Builder'
    ],
    demoType: 'dashboard',
    bestFor: 'Writers, Journalists'
  },
  {
    id: 'coaching-platform',
    title: 'Coaching Business Suite',
    tagline: 'High-Ticket Client Management.',
    description: 'Streamline your consulting business with a professional portal for booking, payments, and client resources.',
    icon: <Users size={40} />,
    color: '#06b6d4',
    features: [
      'Calendar Scheduling',
      'Invoicing & Contracts',
      'Client Portal',
      'File Sharing',
      'Session Notes'
    ],
    demoType: 'dashboard',
    bestFor: 'Consultants, Advisors'
  },
  {
    id: 'community-network',
    title: 'Private Social Network',
    tagline: 'Escaping the Noise.',
    description: 'Create a distraction-free social space specifically for your organization or interest group.',
    icon: <Users size={40} />,
    color: '#6366f1',
    features: [
      'Activity Feeds',
      'Group Spaces',
      'Event Management',
      'Direct Messaging',
      'Moderation Tools'
    ],
    demoType: 'community',
    bestFor: 'Alumni, Hobby Groups'
  },
  {
    id: 'saas-mvp',
    title: 'SaaS / MVP Builder',
    tagline: 'Launch Your Software Startup.',
    description: 'Robust boilerplate and infrastructure for launching your own software-as-a-service product in weeks, not months.',
    icon: <Server size={40} />,
    color: '#ef4444',
    features: [
      'Auth & User Management',
      'Subscription (Stripe)',
      'Admin Dashboard',
      'API Infrastructure',
      'Scalable Database'
    ],
    demoType: 'dashboard',
    bestFor: 'Founders, Startups'
  },
  {
    id: 'ai-automation',
    title: 'AI Automation System',
    tagline: 'Work Smarter, Not Harder.',
    description: 'Custom AI agents and workflows that automate your repetitive business tasks and data processing.',
    icon: <Zap size={40} />,
    color: '#eab308',
    features: [
      'Custom Chatbots',
      'Data Extraction',
      'Auto-Reporting',
      'Workflow Triggers',
      'LLM Integration'
    ],
    demoType: 'dashboard',
    bestFor: 'Agencies, Operations'
  },
  {
    id: 'platform-migration',
    title: 'Migration & Independence',
    tagline: 'Breaking Free.',
    description: 'Technical services to move your data and business logic off restrictive platforms to your own infrastructure.',
    icon: <Database size={40} />,
    color: '#64748b',
    features: [
      'Data Export/Import',
      'Schema Mapping',
      'Redirect Management',
      'SEO Preservation',
      'Legacy System Support'
    ],
    demoType: 'dashboard',
    bestFor: 'Scaling Businesses'
  }
];
