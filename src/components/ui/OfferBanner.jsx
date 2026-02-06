import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { PRICING_RATES } from '../../constants';
import { calculateDiscountedPrice } from '../../lib/utils';

const OfferBanner = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    // Check if user dismissed it previously
    if (localStorage.getItem('frenzo_offer_dismissed')) {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      background: 'rgba(5, 5, 5, 0.9)',
      border: '1px solid var(--accent-primary)',
      padding: '10px 20px',
      borderRadius: '50px',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      width: 'max-content',
      maxWidth: '90vw'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
         <span style={{ fontSize: '1rem' }}>🔥</span>
         <span style={{ fontSize: '0.9rem', color: '#eee' }}>
           Launch Offer: Portfolio Site for <span style={{ textDecoration: 'line-through', color: '#888', marginRight: '6px' }}>₹{calculateDiscountedPrice(PRICING_RATES.type.starter)}</span>
           <strong style={{ color: '#fff' }}>₹{PRICING_RATES.type.starter.toLocaleString()}</strong>
         </span>
      </div>
      
      <div style={{ width: '1px', height: '20px', background: '#333' }}></div>

      <Link 
        to="/pricing" 
        style={{ 
          fontSize: '0.85rem', 
          fontWeight: 'bold', 
          color: 'var(--accent-primary)', 
          textDecoration: 'none',
          whiteSpace: 'nowrap'
        }}
      >
        Claim Deal &rarr;
      </Link>

      <button 
        onClick={() => {
          setVisible(false);
          localStorage.setItem('frenzo_offer_dismissed', 'true');
        }}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#666',
          cursor: 'pointer',
          padding: '4px',
          marginLeft: '8px',
          display: 'flex'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default OfferBanner;
