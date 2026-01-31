import React from 'react';
import { ArrowRight, FileText, Monitor, Globe, Smartphone, Layers, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tooltip from '../../../components/ui/Tooltip';
import { usePricing } from '../hooks/usePricing';
import { ADDONS, DESIGN_OPTIONS, INTELLIGENCE_OPTIONS } from '../constants/rates';
import { Info } from 'lucide-react';

const getTypeStyle = (id, current) => ({
  padding: '0.8rem', borderRadius: '12px', 
  border: current === id ? '2px solid var(--accent-primary)' : '1px solid #333',
  background: current === id ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
  textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
  color: current === id ? '#fff' : '#888'
});

const PricingCalculator = () => {
  const { state, actions, total, formatPrice } = usePricing();
  const { projectType, intelligence, design, pages, features } = state;
  const { setProjectType, setIntelligence, setDesign, setPages, toggleFeature } = actions;

  return (
    <div style={{ background: '#111', border: '1px solid #333', borderRadius: '24px', padding: '2.5rem', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
      <div style={{ background: 'var(--accent-primary)', position: 'absolute', top: '-15px', right: '2rem', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>
        CUSTOM BUILDER
      </div>

      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Configure Project</h2>

      {/* 1. Foundation Type */}
      <div style={{ marginBottom: '2rem' }}>
         <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>1. Foundation Type</label>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
            <button onClick={() => setProjectType('standard')} style={getTypeStyle('standard', projectType)}>
               <div style={{display:'flex', alignItems:'center'}}>
                  <FileText size={18} /> <span style={{fontSize:'0.9rem', marginLeft:'6px'}}>Dynamic Web</span>
                  <Tooltip text="Interactive, scalable site using modern tech (React/Vue/etc). Best for businesses needing a future-proof presence." />
               </div>
            </button>
            <button onClick={() => setProjectType('saas')} style={getTypeStyle('saas', projectType)}>
               <div style={{display:'flex', alignItems:'center'}}>
                  <Monitor size={18} /> <span style={{fontSize:'0.9rem', marginLeft:'6px'}}>Software / SaaS</span>
                  <Tooltip text="Complex logic, dashboards, and tools. Includes state management." />
               </div>
            </button>
         </div>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
             <button onClick={() => setProjectType('platform')} style={getTypeStyle('platform', projectType)}>
               <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                 <Globe size={18} /> <span style={{fontSize:'0.9rem', marginLeft:'6px'}}>Platform</span>
                 <Tooltip text="Marketplaces, social networks, or multi-vendor stores. Heavy on user interactions." />
               </div>
            </button>
            <button onClick={() => setProjectType('mobile')} style={getTypeStyle('mobile', projectType)}>
               <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                 <Smartphone size={18} /> <span style={{fontSize:'0.9rem', marginLeft:'6px'}}>Mobile App</span>
                 <Tooltip text="Native iOS and Android apps (React Native). Published to App Stores." />
               </div>
            </button>
            <button onClick={() => setProjectType('ecosystem')} style={getTypeStyle('ecosystem', projectType)}>
               <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                 <Layers size={18} /> <span style={{fontSize:'0.9rem', marginLeft:'6px'}}>Ecosystem</span>
                 <Tooltip text="Full suite: Web App + Mobile App + Admin Dashboard + Landing Page." />
               </div>
            </button>
         </div>
         
         {projectType === 'standard' && (
           <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(37,99,235,0.1)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'flex', gap: '10px' }}>
              <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                <strong>Why ₹3,000 vs ₹2,000?</strong> <br/>
                The standard foundation uses modern tech (React/Vue/etc) making it scalable. Starter is purely static HTML.
              </span>
           </div>
         )}
      </div>

      {/* 2. Scale (Pages) */}
      {projectType === 'standard' && (
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
            {DESIGN_OPTIONS.map(d => (
              <button 
                key={d}
                onClick={() => setDesign(d)}
                style={{ 
                  flex: 1, padding: '0.8rem', borderRadius: '8px', 
                  border: design === d ? '1px solid #fff' : '1px solid #333',
                  background: design === d ? '#222' : 'transparent',
                  color: design === d ? '#fff' : '#666',
                  textTransform: 'capitalize', fontWeight: '500',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                }}
              >
                {d}
                {d === 'template' && <Tooltip text="Clean, professional UI using standard components." />}
                {d === 'custom' && <Tooltip text="Unique branding, custom layouts, and tailored visual identity." />}
                {d === 'motion' && <Tooltip text="High-end animations, scroll effects, and immersive interactions." />}
              </button>
            ))}
         </div>
      </div>
      
       {/* 4. Intelligence Layer */}
      <div style={{ marginBottom: '2rem' }}>
         <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>4. Intelligence (AI)</label>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
            {INTELLIGENCE_OPTIONS.map(ai => (
              <button 
                key={ai}
                onClick={() => setIntelligence(ai)}
                style={{ 
                  padding: '0.8rem', borderRadius: '8px', 
                  border: intelligence === ai ? '1px solid var(--accent-primary)' : '1px solid #333',
                  background: intelligence === ai ? 'rgba(37, 99, 235, 0.15)' : 'transparent', 
                  color: intelligence === ai ? '#fff' : '#888',
                  textTransform: 'capitalize', fontWeight: '500', fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                }}
              >
                {ai === 'none' ? 'None' : ai === 'chatbot' ? 'Smart Chatbot' : 'AI Agent'}
                {ai === 'chatbot' && <Tooltip text="Automated Q&A bot trained on your data." />}
                {ai === 'agent' && <Tooltip text="Autonomous agent that can perform tasks (booking, emailing, searching)." />}
              </button>
            ))}
         </div>
      </div>

      {/* 5. Add-ons */}
      <div style={{ marginBottom: '3rem' }}>
         <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>5. Modules & Add-ons</label>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            {ADDONS.map((feat) => (
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
                 <Tooltip text={feat.tip} />
              </div>
            ))}
         </div>
      </div>

      {/* TOTAL */}
      <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', marginTop: '2rem' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <span style={{ color: '#888' }}>Estimated Investment</span>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1, color: 'var(--accent-primary)' }}>
              {formatPrice(total)}
            </span>
         </div>
         
         <Link to="/contact" state={{ 
           plan: 'Custom Build', 
           features: `Type: ${projectType}, Pages: ${pages}, AI: ${intelligence}, Design: ${design}, Extras: ${features.join(', ')}`,
           estimatedPrice: formatPrice(total)
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
  );
};

export default PricingCalculator;
