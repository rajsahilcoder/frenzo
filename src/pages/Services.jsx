import React from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { servicesData } from '../data/servicesData';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Services = () => {
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
            {servicesData.map((item) => (
              <Card key={item.id}>
                <div style={{ marginBottom: '1.5rem', color: item.color }}>{item.icon}</div>
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
                  {item.features.slice(0, 3).map((feat, j) => (
                    <li key={j} style={{ 
                      marginBottom: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem'
                    }}>
                      <CheckCircle size={16} color={item.color} /> {feat}
                    </li>
                  ))}
                  {item.features.length > 3 && (
                     <li style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', paddingLeft: '1.75rem' }}>+ more features</li>
                  )}
                </ul>

                <Button to={`/services/${item.id}`} variant="outline" style={{ width: '100%' }}>
                  View Demo & Details <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
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
