import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import { Check, ArrowRight, Zap, Shield, Crown, Loader2, Smartphone, Globe, Cpu, Bot, Layers, FileText, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);

  // Calculator State
  const [projectType, setProjectType] = useState('landing'); // landing, business, webapp, mobile, ecosystem
  const [intelligence, setIntelligence] = useState('none'); 
  const [design, setDesign] = useState('template'); 
  const [pages, setPages] = useState(1);
  const [features, setFeatures] = useState([]);

  // Base Rates in USD (INR will be calculated: USD * 40)
  const usdRates = {
    type: { 
      landing: 300,        // Bridges gap from 50 -> 2500
      business: 800,       // Mid-tier
      webapp: 2500,        // High-tier
      mobile: 5000, 
      ecosystem: 9000 
    },
    intelligence: { none: 0, chatbot: 1000, agent: 4000 },
    design: { template: 0, custom: 500, motion: 1500 },
    pageRate: 50, // Per additional page
    features: {
      cms: 300,
      auth: 800,
      payments: 800,
      analytics: 300,
      seo: 400,
      copywriting: 200,
      logo: 150
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

  // Conversion Helper: price * 100 / 2.5 = price * 40
  const convert = (usdPrice) => {
    if (currency === 'USD') return usdPrice;
    return usdPrice * 40;
  };

  const calculateTotal = () => {
    let total = usdRates.type[projectType];
    total += usdRates.intelligence[intelligence];
    total += usdRates.design[design];
    
    // Page cost applies mostly to web projects
    if (['landing', 'business', 'webapp'].includes(projectType)) {
       total += (Math.max(1, pages) - 1) * usdRates.pageRate;
    }
    
    features.forEach(f => {
      total += usdRates.features[f];
    });

    return convert(total);
  };

  const formatPrice = (amount) => {
    return currency === 'USD' 
      ? `$${amount.toLocaleString()}` 
      : `₹${amount.toLocaleString()}`;
  };

  const toggleFeature = (f) => {
    if (features.includes(f)) {
      setFeatures(features.filter(i => i !== f));
    } else {
      setFeatures([...features, f]);
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      
      {/* Hero Section */}
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
          {loading && <div style={{ marginTop: '2rem', color: '#666', display: 'flex', justifyContent: 'center', gap: '8px' }}><Loader2 className="spin" size={20} /> calibration location pricing...</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* THE ANCHOR: Loss Leader */}
          <div style={{ 
            background: '#050505', 
            border: '1px solid #222', 
            borderRadius: '24px', 
            padding: '2.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            height: 'fit-content' 
          }}>
            <div style={{ background: '#222', width: 'fit-content', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
              THE STARTER
            </div>
            
            <h3 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: '800', lineHeight: 1 }}>
              {currency === 'USD' ? '$50' : '₹2,000'}
            </h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>One-time payment.</p>

            <div style={{ padding: '1.5rem', background: '#111', borderRadius: '16px', marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.6' }}>
                <strong style={{ color: '#fff' }}>The "No Excuses" Plan.</strong><br/>
                We deploy a professional single-page website for you.
              </p>
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', flex: 1 }}>
               {[
                 'Professional Portfolio / Links Page', 
                 'Hosted on GitHub Pages (Free)', 
                 'You provide Domain + Content', 
                 'Delivery in 48 Hours',
                 'No Backend / No CMS'
                ].map((item, i) => (
                 <li key={i} style={{ display: 'flex', gap: '10px', color: '#888', fontSize: '0.95rem' }}>
                   <Check size={18} color="#444" /> {item}
                 </li>
               ))}
            </ul>

            <Link to="/contact" state={{ plan: `Starter Plan (${currency === 'USD' ? '$50' : '₹2,000'})`, details: 'I want to claim the Launch Offer for a static portfolio site.' }} style={{ 
              width: '100%', 
              padding: '1rem', 
              background: '#fff', 
              color: '#000', 
              borderRadius: '12px', 
              textAlign: 'center', 
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
              Claim Starter Spot
            </Link>
          </div>


          {/* THE CALCULATOR: Scale Builder */}
          <div style={{ 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '24px', 
            padding: '2.5rem',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{ background: 'var(--accent-primary)', position: 'absolute', top: '-15px', right: '2rem', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>
              CUSTOM BUILDER
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Configure Project</h2>

            {/* 1. Project Type */}
            <div style={{ marginBottom: '2rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>1. Project Scope</label>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <button onClick={() => setProjectType('landing')} style={getTypeStyle('landing', projectType)}>
                     <FileText size={18} /> <span style={{fontSize:'0.9rem'}}>Landing Page</span>
                  </button>
                  <button onClick={() => setProjectType('business')} style={getTypeStyle('business', projectType)}>
                     <Monitor size={18} /> <span style={{fontSize:'0.9rem'}}>Business Site</span>
                  </button>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
                   <button onClick={() => setProjectType('webapp')} style={getTypeStyle('webapp', projectType)}>
                     <Globe size={18} /> <span style={{fontSize:'0.9rem'}}>Web App</span>
                  </button>
                  <button onClick={() => setProjectType('mobile')} style={getTypeStyle('mobile', projectType)}>
                     <Smartphone size={18} /> <span style={{fontSize:'0.9rem'}}>Mobile App</span>
                  </button>
                  <button onClick={() => setProjectType('ecosystem')} style={getTypeStyle('ecosystem', projectType)}>
                     <Layers size={18} /> <span style={{fontSize:'0.9rem'}}>Ecosystem</span>
                  </button>
               </div>
            </div>

            {/* 2. Scale (Pages) - Only for Web Types */}
            {['landing', 'business', 'webapp'].includes(projectType) && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <label style={{ color: '#888', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>2. Scale / Pages</label>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>{pages} Pages</span>
                </div>
                <input 
                  type="range" min="1" max="20" value={pages} onChange={(e) => setPages(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#555' }}>
                    <span>1 Page</span>
                    <span>20+ Pages</span>
                 </div>
              </div>
            )}

            {/* 3. Design Level */}
            <div style={{ marginBottom: '2rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>3. Design Fidelity</label>
               <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '4px' }}>
                  {['template', 'custom', 'motion'].map(d => (
                    <button 
                      key={d}
                      onClick={() => setDesign(d)}
                      style={{ 
                        flex: 1, padding: '0.8rem', borderRadius: '8px', 
                        border: design === d ? '1px solid #fff' : '1px solid #333',
                        background: design === d ? '#222' : 'transparent',
                        color: design === d ? '#fff' : '#666',
                        textTransform: 'capitalize', fontWeight: '500'
                      }}
                    >
                      {d}
                    </button>
                  ))}
               </div>
            </div>
            
             {/* 4. Intelligence Layer */}
            <div style={{ marginBottom: '2rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>4. Intelligence (AI)</label>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
                  {['none', 'chatbot', 'agent'].map(ai => (
                    <button 
                      key={ai}
                      onClick={() => setIntelligence(ai)}
                      style={{ 
                        padding: '0.8rem', borderRadius: '8px', 
                        border: intelligence === ai ? '1px solid var(--accent-primary)' : '1px solid #333',
                        background: intelligence === ai ? 'rgba(37, 99, 235, 0.15)' : 'transparent', 
                        color: intelligence === ai ? '#fff' : '#888',
                        textTransform: 'capitalize', fontWeight: '500', fontSize: '0.9rem'
                      }}
                    >
                      {ai === 'none' ? 'None' : ai === 'chatbot' ? 'Smart Chatbot' : 'AI Agent'}
                    </button>
                  ))}
               </div>
            </div>

            {/* 5. Add-ons */}
            <div style={{ marginBottom: '3rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>5. Add-ons</label>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  {[
                    { id: 'cms', label: 'CMS (Easy Edits)' },
                    { id: 'auth', label: 'User Login/DB' },
                    { id: 'payments', label: 'Payment Integration' },
                    { id: 'analytics', label: 'Advanced Analytics' },
                    { id: 'seo', label: 'SEO Optimization' },
                    { id: 'copywriting', label: 'Pro Copywriting' },
                    { id: 'logo', label: 'Logo Design' }
                  ].map((feat) => (
                    <div 
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', cursor: 'pointer',
                        border: features.includes(feat.id) ? '1px solid var(--accent-primary)' : '1px solid #222',
                        background: features.includes(feat.id) ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
                        fontSize: '0.85rem'
                      }}
                    >
                       <div style={{ 
                         width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #555', 
                         background: features.includes(feat.id) ? 'var(--accent-primary)' : 'transparent',
                         display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                       }}>
                         {features.includes(feat.id) && <Check size={12} color="#fff" />}
                       </div>
                       <span style={{ color: features.includes(feat.id) ? '#fff' : '#888' }}>{feat.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* TOTAL */}
            <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', marginTop: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#888' }}>Estimated Investment</span>
                  <span style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1, color: 'var(--accent-primary)' }}>
                    {loading ? '...' : formatPrice(calculateTotal())}
                  </span>
               </div>
               
               <Link to="/contact" state={{ 
                 plan: 'Custom Build', 
                 features: `Type: ${projectType}, Pages: ${pages}, AI: ${intelligence}, Design: ${design}, Extras: ${features.join(', ')}`,
                 estimatedPrice: formatPrice(calculateTotal())
               }} style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1.2rem', 
                  background: 'var(--accent-primary)', color: '#fff', borderRadius: '12px', 
                  textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem',
                  boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)'
                }}>
                  Book Build Strategy <ArrowRight size={20} style={{ marginLeft: '10px' }} />
               </Link>
               <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#555', marginTop: '1rem' }}>
                 *Rough estimate. Final quote provided after discovery call.
               </p>
            </div>

          </div>

        </div>
      </Section>
    </div>
  );
};

const getTypeStyle = (id, current) => ({
  padding: '0.8rem', borderRadius: '12px', 
  border: current === id ? '2px solid var(--accent-primary)' : '1px solid #333',
  background: current === id ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
  textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
  color: current === id ? '#fff' : '#888'
});

export default Pricing;
