import React from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ArrowRight, CheckCircle, Smartphone, Globe, ShoppingBag, Users, Zap, Layout, Play, BarChart, Server } from 'lucide-react';

const Services = () => {
  const catalog = [
    {
      title: 'Creator Website',
      description: 'A personal content hub that converts audience attention into owned revenue streams.',
      features: ['Custom creator website', 'Email capture & audience ownership', 'Blog / video embedding', 'Lead magnets & funnels', 'Analytics & tracking'],
      bestFor: 'YouTubers, podcasters, writers',
      icon: <Globe size={32} color="var(--accent-primary)" />
    },
    {
      title: 'Course Platform',
      description: 'A complete platform to sell courses directly without relying on third-party marketplaces.',
      features: ['Course hosting', 'Secure login', 'Payments & subscriptions', 'Progress tracking', 'Certificates & automation'],
      bestFor: 'Educators, coaches, trainers',
      icon: <Play size={32} color="var(--accent-primary)" />
    },
    {
      title: 'E-commerce Store',
      description: 'A scalable product selling platform designed for high conversion and brand ownership.',
      features: ['Product catalog', 'Checkout & payments', 'Order management', 'Inventory tracking', 'CRM integration'],
      bestFor: 'D2C brands, startups',
      icon: <ShoppingBag size={32} color="var(--accent-primary)" />
    },
    {
      title: 'Membership Platform',
      description: 'A gated platform for exclusive content, community, and recurring revenue.',
      features: ['Member login', 'Tiered subscriptions', 'Premium content access', 'Community features', 'Automated renewals'],
      bestFor: 'Niche communities, creators',
      icon: <Users size={32} color="var(--accent-primary)" />
    },
    {
      title: 'Newsletter Platform',
      description: 'Own your audience and monetize newsletters without platform restrictions.',
      features: ['Email list ownership', 'Paid & free newsletters', 'Subscriber analytics', 'Automated campaigns', 'Payment integrations'],
      bestFor: 'Writers, analysts',
      icon: <Layout size={32} color="var(--accent-primary)" />
    },
    {
      title: 'Coaching Platform',
      description: 'A professional platform to sell high-ticket consulting or coaching services.',
      features: ['Booking & scheduling', 'Client dashboards', 'Payments & invoices', 'Resource sharing', 'CRM integrations'],
      bestFor: 'Consultants, advisors',
      icon: <Users size={32} color="var(--accent-primary)" />
    },
    {
      title: 'Community Network',
      description: 'Build a private, owned community instead of relying on social media groups.',
      features: ['Member access', 'Discussions & posts', 'Events & live sessions', 'Notifications', 'Subscription management'],
      bestFor: 'Founders, niche groups',
      icon: <Users size={32} color="var(--accent-primary)" />
    },
    {
      title: 'SaaS / MVP Builder',
      description: 'Launch your own SaaS or internal tool with scalable architecture.',
      features: ['User authentication', 'Admin dashboard', 'API integrations', 'Subscription billing', 'Analytics'],
      bestFor: 'Startups, agencies',
      icon: <Server size={32} color="var(--accent-primary)" />
    },
    {
      title: 'AI Automation System',
      description: 'Custom automation and AI systems that save time and unlock efficiency.',
      features: ['Workflow automation', 'AI integrations', 'Data pipelines', 'Custom dashboards', 'System optimization'],
      bestFor: 'Growing businesses',
      icon: <Zap size={32} color="var(--accent-primary)" />
    },
    {
      title: 'Migration & Independence',
      description: 'Move your business off third-party platforms and regain control.',
      features: ['Platform migration', 'Data ownership', 'Custom infrastructure', 'Monetization redesign', 'Scalability setup'],
      bestFor: 'Platform-dependent businesses',
      icon: <BarChart size={32} color="var(--accent-primary)" />
    }
  ];

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      {/* Hero */}
      <Section className="text-center">
         <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
           <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
             Build Your Own Platform. <br />
             <span style={{ color: 'var(--text-secondary)' }}>Own Your Revenue.</span>
           </h1>
           <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
             Frenzo designs scalable, revenue-driven platforms tailored to your business model — so you stay independent, flexible, and in control.
           </p>
         </div>

         {/* Catalog Grid */}
         <div style={{ 
           display: 'grid', 
           gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
           gap: '2rem' 
          }}>
            {catalog.map((item, i) => (
              <Card key={i}>
                <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '3rem' }}>{item.description}</p>
                
                <div style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  padding: '1rem', 
                  borderRadius: '0.5rem', 
                  marginBottom: '1.5rem' 
                }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Best For</p>
                  <p style={{ color: 'var(--text-primary)' }}>{item.bestFor}</p>
                </div>

                <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1 }}>
                  {item.features.map((feat, j) => (
                    <li key={j} style={{ 
                      marginBottom: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem'
                    }}>
                      <CheckCircle size={16} color="var(--accent-primary)" /> {feat}
                    </li>
                  ))}
                </ul>

                <Button to="/contact" variant="outline" style={{ width: '100%' }}>
                  Request This Solution <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                </Button>
              </Card>
            ))}
         </div>
      </Section>

      {/* Final CTA */}
      <Section dark>
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Not sure which solution fits your business?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.2rem' }}>
            Talk to Frenzo and we’ll design a custom system tailored to your goals.
          </p>
          <Button to="/contact" variant="primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
            Start a Conversation
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default Services;
