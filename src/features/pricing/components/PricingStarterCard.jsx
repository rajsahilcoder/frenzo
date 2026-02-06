import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRICING_RATES, CONTACT_MESSAGES } from '../../../constants';

const PricingStarterCard = () => {
  return (
    <div style={{ 
      background: '#050505', 
      border: '1px solid #222', borderRadius: '24px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', 
      display: 'flex', flexDirection: 'column', height: 'fit-content' 
    }}>
      <div style={{ background: '#222', width: 'fit-content', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
        THE STARTER
      </div>
      <h3 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: '800', lineHeight: 1 }}>₹{PRICING_RATES.type.starter.toLocaleString()}</h3>
      <p style={{ color: '#666', marginBottom: '2rem' }}>One-time payment.</p>

      <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', flex: 1 }}>
         {['Professional Portfolio', 'Hosted on GitHub Pages', '100% Static HTML/CSS', 'No Backend / No Updates'].map((item, i) => (
           <li key={i} style={{ display: 'flex', gap: '10px', color: '#888', fontSize: '0.95rem' }}><Check size={18} color="#444" /> {item}</li>
         ))}
      </ul>
      <Link to="/contact" state={{ plan: `Starter Plan (₹${PRICING_RATES.type.starter.toLocaleString()})`, details: CONTACT_MESSAGES.LAUNCH_OFFER }} style={{ width: '100%', padding: '1rem', background: '#fff', color: '#000', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Claim Starter Spot</Link>
    </div>
  );
};

export default PricingStarterCard;
