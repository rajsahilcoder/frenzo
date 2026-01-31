import { useState, useMemo } from 'react';
import { PRICING_RATES } from '../constants/rates';

export const usePricing = () => {
  const [projectType, setProjectType] = useState('standard'); 
  const [intelligence, setIntelligence] = useState('none'); 
  const [design, setDesign] = useState('template'); 
  const [pages, setPages] = useState(1);
  const [features, setFeatures] = useState([]);

  const total = useMemo(() => {
    let sum = PRICING_RATES.type[projectType] || 0;
    sum += PRICING_RATES.intelligence[intelligence];
    sum += PRICING_RATES.design[design];
    
    // Page cost only for web standard
    if (projectType === 'standard') {
       sum += (Math.max(1, pages) - 1) * PRICING_RATES.pageRate;
    }
    
    features.forEach(f => {
      sum += PRICING_RATES.features[f];
    });

    return sum;
  }, [projectType, intelligence, design, pages, features]);

  const toggleFeature = (f) => {
    setFeatures(prev => 
      prev.includes(f) ? prev.filter(i => i !== f) : [...prev, f]
    );
  };

  const formatPrice = (amount) => `₹${amount.toLocaleString()}`;

  return {
    state: { projectType, intelligence, design, pages, features },
    actions: { setProjectType, setIntelligence, setDesign, setPages, toggleFeature },
    total,
    formatPrice
  };
};
