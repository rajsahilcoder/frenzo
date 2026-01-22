import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import MockupWindow from '../components/ui/MockupWindow';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      {/* Navigation */}
      <div className="container" style={{ padding: '2rem 0' }}>
         <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
           <ArrowLeft size={16} /> Back to Services
         </Link>
      </div>

      {/* Hero */}
      <Section style={{ paddingTop: '0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
             <div style={{ 
               padding: '1rem', 
               background: `${service.color}20`, 
               borderRadius: '1rem', 
               color: service.color 
             }}>
               {service.icon}
             </div>
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>
            {service.title}
          </h1>
          <p style={{ fontSize: '1.5rem', color: service.color, fontWeight: '600', marginBottom: '1.5rem' }}>
            {service.tagline}
          </p>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 2rem' }}>
            {service.description}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button to="/contact" variant="primary">Build This Platform</Button>
            <Button to="/contact" variant="outline">Schedule Demo</Button>
          </div>
        </div>

        {/* Demo Window */}
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <MockupWindow type={service.demoType} title={service.title} />
        </div>
      </Section>

      {/* Features */}
      <Section dark>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>Why choose our {service.title}?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {service.features.map((feature, i) => (
              <div key={i} style={{ 
                background: 'var(--bg-secondary)', 
                padding: '1.5rem', 
                borderRadius: '1rem',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <CheckCircle color={service.color} size={24} />
                <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
         <div style={{ 
            background: `linear-gradient(135deg, ${service.color}10 0%, var(--bg-secondary) 100%)`,
            borderRadius: '2rem',
            padding: '4rem 2rem',
            textAlign: 'center',
            border: `1px solid ${service.color}40`
         }}>
           <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Launch?</h2>
           <p style={{ marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
             Get a fully owned {service.title.toLowerCase()} tailored to your business.
           </p>
           <Button to="/contact" style={{ background: service.color, color: '#fff', border: 'none' }}>
             Start Your Project <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
           </Button>
         </div>
      </Section>
    </div>
  );
};

export default ServiceDetail;
