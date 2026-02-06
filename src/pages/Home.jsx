import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ArrowRight, Globe, Cpu, DollarSign, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currency, setCurrency] = useState('USD');

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
      }
    };
    fetchLocation();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#050505',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'var(--header-height)'
      }}>
        {/* Background Video */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}>
          <video 
            autoPlay muted loop playsInline
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              opacity: 0.25
            }}
            poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          >
             <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-network-connection-lines-1-large.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(5,5,5,0.3) 0%, #050505 100%)',
            backdropFilter: 'blur(2px)'
          }} />
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: '800', 
            marginBottom: '1.5rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            Build Beyond Platforms. <br />
            <span style={{ 
              background: 'linear-gradient(to right, #fff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Own Your Growth.</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)',
            maxWidth: '650px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Frenzo empowers creators and businesses to build independent digital systems, control their revenue, and scale without limits.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button to="/contact" state={{ details: 'I am interested in Booking a Free Scale Strategy Session.' }} variant="primary">Book Your Free Scale Strategy <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></Button>
            <Button to="/audit" variant="outline">Audit Your Current Stack</Button>
          </div>
        </div>
      </section>

      {/* Video Section & Social Proof */}
      <Section dark>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(37, 99, 235, 0.1)', 
            color: 'var(--accent-primary)', 
            padding: '0.5rem 1rem', 
            borderRadius: '2rem', 
            fontSize: '0.9rem', 
            fontWeight: '600',
            marginBottom: '1.5rem'
          }}>
             <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></span>
             Trusted by 100+ Influencers/Businesses
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>We Build Technical Leverage.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Watch why the world's most successful creators are leaving platforms to build their own systems.
          </p>
        </div>
        
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          aspectRatio: '16/9', 
          background: '#000', 
          borderRadius: '1rem', 
          overflow: 'hidden', 
          position: 'relative',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          border: '1px solid var(--border-light)'
        }}>
           <video 
             autoPlay 
             muted 
             loop 
             playsInline
             style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
             poster="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1950&q=80"
           >
              {/* Working Together / Success Vibe */}
              <source src="https://assets.mixkit.co/videos/preview/mixkit-people-working-together-in-office-4034-large.mp4" type="video/mp4" />
           </video>
           
           <div style={{ 
             position: 'absolute', 
             top: 0, left: 0, right: 0, bottom: 0, 
             display: 'flex', 
             alignItems: 'center', 
             justifyContent: 'center',
             zIndex: 10,
             background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6))'
           }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'transform 0.2s',
                boxShadow: '0 0 30px rgba(255,255,255,0.1)'
              }}
              className="hover-scale"
              >
                 <div style={{ marginLeft: '4px', width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid #fff' }}></div>
              </div>
           </div>

           <div style={{ 
              position: 'absolute', 
              bottom: '2rem', 
              left: '2rem',
              right: '2rem',
              color: '#fff',
              zIndex: 10
           }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>"Frenzo changed how we scale."</h3>
              <p style={{ opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#fbbf24' }}>★★★★★</span> 
                <span>High-Performance Infrastructure Partners</span>
              </p>
           </div>
        </div>

        {/* Trust Badges */}
        <div style={{ 
            maxWidth: '900px', 
            margin: '4rem auto 0', 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '3rem', 
            flexWrap: 'wrap', 
            opacity: 0.5, 
            filter: 'grayscale(100%)' 
        }}>
           {['COMPANIES', 'BUILD', 'ON', 'FRENZO', 'TODAY'].map((txt, i) => (
               <span key={i} style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '2px' }}>{txt}</span>
           ))}
        </div>
      </Section>

      {/* Value Prop */}
      <Section>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Freedom to Scale</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Stop renting your audience. Start owning your business.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <Card>
            <Globe size={40} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Platform Independence</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Reduce dependency on algorithms and third-party rules. Build systems you control.</p>
          </Card>
          <Card>
            <DollarSign size={40} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Direct Monetization</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Keep more of what you earn. Custom payment flows and zero platform fees.</p>
          </Card>
          <Card>
            <Cpu size={40} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Intelligent Automation</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Leverage AI to automate operations, content workflows, and growth.</p>
          </Card>
        </div>
      </Section>

      {/* Services Snippet */}
      <Section dark>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Growth Infrastructure</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%' }}>
            {[
              { icon: <Layers size={24} />, title: 'Monetization Platforms', desc: 'Custom storefronts and membership systems.' },
              { icon: <Globe size={24} />, title: 'Custom Web Apps', desc: 'Scalable tailored applications for your business.' },
              { icon: <Cpu size={24} />, title: 'AI Automation', desc: 'Workflows that save time and optimize revenue.' }
            ].map((item, i) => (
              <div key={i} style={{ 
                padding: '2rem', 
                border: '1px solid var(--border-light)',
                borderRadius: '1rem',
                textAlign: 'left',
                background: 'var(--bg-secondary)'
              }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>{item.icon}</div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '3rem' }}>
            <Button to="/services" variant="outline">View All Solutions</Button>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div style={{ 
          background: 'linear-gradient(135deg, #111 0%, #000 100%)', 
          borderRadius: '2rem', 
          padding: '4rem 2rem', 
          textAlign: 'center',
          border: '1px solid var(--border-light)',
          position: 'relative',
          overflow: 'hidden'
        }}>
           <div style={{
            position: 'absolute',
            top: '-50%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            background: 'var(--accent-primary)',
            filter: 'blur(200px)',
            opacity: 0.1,
            zIndex: 0
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Scale?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              Join the next generation of independent digital businesses.
            </p>
            <Button to="/contact" variant="primary">Book a Strategy Call</Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;
