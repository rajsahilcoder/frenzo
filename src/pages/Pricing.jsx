import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import { Check, ArrowRight, Zap, Shield, Crown, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);

  // Pricing Data
  const prices = {
    USD: {
      launch: '$1,500 - $3,500',
      scale: '$2,500', 
    },
    INR: {
      launch: '₹50,000 - ₹1,50,000',
      scale: '₹2,50,000',
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.country_code === 'IN') {
          setCurrency('INR');
        } else {
          setCurrency('USD');
        }
      } catch (error) {
        console.error('Failed to detect location, defaulting to USD', error);
        setCurrency('USD');
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const currentPrices = prices[currency];

  return (
    <div style={{ paddingTop: '80px' }}>
      <Section dark>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Invest in Ownership
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Stop paying monthly platform rent. Build an asset you own forever.
          </p>
          {loading && <div style={{ marginTop: '1rem', color: '#666', display: 'flex', justifyContent: 'center', gap: '8px' }}><Loader2 className="spin" size={20} /> Loading local pricing...</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Starter Plan */}
          <div style={{ background: '#111', border: '1px solid #333', borderRadius: '16px', padding: '2rem', position: 'relative' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#9ca3af' }}>
                <Zap size={20} /> <span style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', fontWeight: 'bold' }}>Launch</span>
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {loading ? '...' : currentPrices.launch}
              </h3>
              <p style={{ color: '#666' }}>One-time investment</p>
            </div>
            <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '2rem' }}>
              Perfect for creators validating a new product line or course. Get a custom, owned platform in 2 weeks.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {['Custom React App', 'Stripe Integration', 'Basic CMS', 'Mobile Responsive', 'SEO Optimized'].map(feat => (
                <div key={feat} style={{ display: 'flex', gap: '10px', color: '#eee' }}>
                  <Check size={20} color="var(--accent-primary)" /> {feat}
                </div>
              ))}
            </div>
            <Link to="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1rem', background: '#333', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Get Started
            </Link>
          </div>

          {/* Growth Plan (Highlighted) */}
          <div style={{ background: '#1a1a1a', border: '2px solid var(--accent-primary)', borderRadius: '16px', padding: '2rem', position: 'relative', transform: 'scale(1.02)', boxShadow: '0 10px 40px rgba(37, 99, 235, 0.1)' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-primary)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>MOST POPULAR</div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                <Shield size={20} /> <span style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', fontWeight: 'bold' }}>Scale</span>
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                 {loading ? '...' : currentPrices.scale}
              </h3>
              <p style={{ color: '#666' }}>One-time investment</p>
            </div>
            <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '2rem' }}>
              The complete package for established businesses. Deep integrations, automations, and premium design.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {['Everything in Launch', 'User Auth & Profiles', 'Advanced Admin Dashboard', 'Email/Newsletter Engine', 'Data Migration Support', 'Priority Support (30 Days)'].map(feat => (
                <div key={feat} style={{ display: 'flex', gap: '10px', color: '#eee' }}>
                  <Check size={20} color="var(--accent-primary)" /> {feat}
                </div>
              ))}
            </div>
            <Link to="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1rem', background: 'var(--accent-primary)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Book Scaling Call
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div style={{ background: '#111', border: '1px solid #333', borderRadius: '16px', padding: '2rem', position: 'relative' }}>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#f59e0b' }}>
                <Crown size={20} /> <span style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', fontWeight: 'bold' }}>Empire</span>
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Custom</h3>
              <p style={{ color: '#666' }}>Tailored architecture</p>
            </div>
            <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '2rem' }}>
              For complex platforms requiring dedicated infrastructure, AI agents, and custom workflow automation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {['Dedicated Cloud Infra', 'Custom AI Agents', 'SLA Support', 'White-glove Onboarding', 'Legacy System Integration'].map(feat => (
                <div key={feat} style={{ display: 'flex', gap: '10px', color: '#eee' }}>
                  <Check size={20} color="var(--accent-primary)" /> {feat}
                </div>
              ))}
            </div>
            <Link to="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1rem', background: '#333', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              Contact Sales
            </Link>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '6rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No monthly fees. No revenue share.</h3>
            <p style={{ color: '#666' }}>We charge per project. You own the code.</p>
        </div>
      </Section>
    </div>
  );
};


export default Pricing;
