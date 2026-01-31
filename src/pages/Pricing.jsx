import React from 'react';
import Section from '../components/ui/Section';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PricingCalculator from '../features/pricing/components/PricingCalculator';
import PricingStarterCard from '../features/pricing/components/PricingStarterCard';

const Pricing = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Section dark>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Build Your Platform
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            From simple landing pages to complex ecosystems. Pricing that scales with your ambition.
          </p>
          <Link to="/services" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
             Explore Services <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* THE ANCHOR: Starter Site */}
          <PricingStarterCard />

          {/* THE CALCULATOR: Scale Builder */}
          <PricingCalculator />

        </div>
      </Section>
    </div>
  );
};

export default Pricing;
