import React, { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../features/projects/api/projectService';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const PublicProjects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getPublicProjects();
                setProjects(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const categories = ['All', 'Web App', 'Mobile App', 'Consulting'];
    
    // Simple mock category logic since we don't have categories in DB yet
    // In real app, we'd add category field to projects
    const getProjectCategory = (title) => {
        if (title.toLowerCase().includes('app')) return 'Mobile App';
        if (title.toLowerCase().includes('web') || title.toLowerCase().includes('platform')) return 'Web App';
        return 'Consulting';
    };

    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(p => getProjectCategory(p.title) === filter);

    if (loading) return <div className="loading-screen">Loading Showcase...</div>;

    return (
        <div style={{ paddingTop: 'var(--header-height)' }}>
             <Section className="text-center">
                 <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our Work</h1>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Explore how we've helped ambitious brands build scalable growth systems.
                 </p>
                 
                 {/* Filters */}
                 <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: '20px',
                                border: filter === cat ? '1px solid var(--accent-primary)' : '1px solid var(--border-light)',
                                background: filter === cat ? 'var(--accent-primary)' : 'transparent',
                                color: filter === cat ? '#fff' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: '0.3s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                 </div>

                 {projects.length === 0 ? (
                     <div style={{ padding: '4rem', border: '1px dashed #333', borderRadius: '12px' }}>
                         <h3 style={{ color: '#666' }}>No case studies published yet.</h3>
                         <p style={{ color: '#444' }}>Check back soon or start your own project today.</p>
                     </div>
                 ) : (
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                         {filteredProjects.map(project => (
                             <Card key={project.id} style={{ padding: '0', overflow: 'hidden', textAlign: 'left', transition: 'transform 0.3s' }} className="hover-lift">
                                  {/* Thumbnail Placeholder */}
                                  <div style={{ height: '200px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-light)' }}>
                                      <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-tertiary)', opacity: 0.3 }}>
                                          {project.title.charAt(0)}
                                      </span>
                                  </div>
                                  
                                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: 'calc(100% - 200px)' }}>
                                      <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                          {getProjectCategory(project.title)}
                                      </div>
                                      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>{project.title}</h3>
                                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6', flex: 1 }}>
                                          {project.requirements ? project.requirements.substring(0, 100) + '...' : 'A custom growth solution designed for scale.'}
                                      </p>
                                      
                                      {project.review && (
                                          <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                                              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#fbbf24', marginBottom: '0.5rem' }}>"{project.review.text.substring(0, 80)}..."</p>
                                              <div style={{ fontSize: '0.8rem', color: '#888' }}>— Verified Client</div>
                                          </div>
                                      )}

                                      <Button 
                                        variant="outline" 
                                        style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
                                        onClick={() => navigate('/contact', { state: { details: `I saw the ${project.title} case study and want something similar.` } })}
                                      >
                                          View Case Study <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                                      </Button>
                                  </div>
                             </Card>
                         ))}
                     </div>
                 )}
             </Section>
        </div>
    );
};

export default PublicProjects;
