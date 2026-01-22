import React from 'react';
import { Database, ArrowRight, Circle, CheckCircle, AlertTriangle } from 'lucide-react';

const MigrationDemo = () => {
    return (
        <div style={{ height: '100%', background: '#fff', color: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '800px', padding: '0 2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.8rem' }}>Platform Migration Wizard</h2>

                {/* Steps */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', position: 'relative' }}>
                     <div style={{ position: 'absolute', top: '15px', left: '0', width: '100%', height: '2px', background: '#eee', zIndex: 0 }}></div>
                     {[
                         { step: 1, label: 'Connect Source', status: 'done' },
                         { step: 2, label: 'Map Schema', status: 'done' },
                         { step: 3, label: 'Validating', status: 'active' },
                         { step: 4, label: 'Import', status: 'pending' },
                     ].map((s, i) => (
                         <div key={i} style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                             <div style={{ 
                                 width: '32px', height: '32px', borderRadius: '50%', 
                                 background: s.status === 'done' ? '#16a34a' : s.status === 'active' ? '#2563eb' : '#fff',
                                 border: s.status === 'pending' ? '2px solid #ddd' : 'none',
                                 color: '#fff',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                                 margin: '0 auto 0.5rem',
                                 fontWeight: 'bold'
                             }}>
                                 {s.status === 'done' ? <CheckCircle size={18} /> : s.step}
                             </div>
                             <div style={{ fontSize: '0.85rem', fontWeight: '600', color: s.status === 'pending' ? '#ccc' : '#000' }}>{s.label}</div>
                         </div>
                     ))}
                </div>

                {/* Active View */}
                <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', items: 'center', gap: '1rem' }}>
                             <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Wordpress DB</div>
                             <ArrowRight color="#9ca3af" />
                             <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2563eb' }}>Frenzo Headless CMS</div>
                        </div>
                        <div style={{ background: '#dbeafe', color: '#1e40af', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Running Analysis..</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
                             <div style={{ display: 'flex', gap: '10px' }}>
                                 <CheckCircle color="#16a34a" size={20} />
                                 <span>User Accounts (12,405)</span>
                             </div>
                             <span style={{ color: '#16a34a', fontWeight: '600' }}>Ready</span>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
                             <div style={{ display: 'flex', gap: '10px' }}>
                                 <CheckCircle color="#16a34a" size={20} />
                                 <span>Blog Posts (452)</span>
                             </div>
                             <span style={{ color: '#16a34a', fontWeight: '600' }}>Ready</span>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#fff', borderRadius: '8px', border: '1px solid #fecaca' }}>
                             <div style={{ display: 'flex', gap: '10px' }}>
                                 <AlertTriangle color="#dc2626" size={20} />
                                 <span>WooCommerce Orders</span>
                             </div>
                             <span style={{ color: '#dc2626', fontWeight: '600' }}>Needs Review (Schema Mismatch)</span>
                         </div>
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                        <button style={{ background: '#2563eb', color: '#fff', padding: '0.8rem 2rem', borderRadius: '6px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Resolve Issues</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MigrationDemo;
