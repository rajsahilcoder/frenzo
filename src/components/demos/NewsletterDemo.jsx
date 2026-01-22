import React, { useState } from 'react';
import { Mail, Edit3, BarChart, Users, Send, Settings, Eye, Clock } from 'lucide-react';

const NewsletterDemo = () => {
    const [view, setView] = useState('editor'); // editor, analytics

    return (
        <div style={{ height: '100%', background: '#f8f9fa', display: 'flex', color: '#333' }}>
            {/* Nav */}
            <div style={{ width: '60px', background: '#fff', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 0', gap: '1.5rem' }}>
                <div style={{ width: '32px', height: '32px', background: '#000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>N</div>
                <div onClick={() => setView('editor')} style={{ cursor: 'pointer', color: view === 'editor' ? '#000' : '#aaa' }}><Edit3 size={20} /></div>
                <div onClick={() => setView('analytics')} style={{ cursor: 'pointer', color: view === 'analytics' ? '#000' : '#aaa' }}><BarChart size={20} /></div>
                <div style={{ cursor: 'pointer', color: '#aaa' }}><Users size={20} /></div>
                <div style={{ marginTop: 'auto', cursor: 'pointer', color: '#aaa' }}><Settings size={20} /></div>
            </div>

            {/* Content Switcher */}
            {view === 'editor' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <div style={{ height: '60px', borderBottom: '1px solid #e0e0e0', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>Drafts /  <span style={{ color: '#000' }}>Issue #42: The Future of Media</span></div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                             <button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>Preview</button>
                             <button style={{ background: '#000', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '6px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                 Send <Send size={14} />
                             </button>
                        </div>
                    </div>

                    {/* Editor Canvas */}
                    <div style={{ flex: 1, padding: '3rem 2rem', overflowY: 'auto' }}>
                        <div style={{ maxWidth: '650px', margin: '0 auto', background: '#fff', minHeight: '800px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', padding: '4rem', borderRadius: '2px' }}>
                             <input 
                               type="text" 
                               defaultValue="The Future of Media is Independent" 
                               style={{ width: '100%', border: 'none', fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', outline: 'none', fontFamily: 'serif' }}
                             />
                             
                             <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem', fontFamily: 'serif' }}>
                                 We are shifting away from algorithmic feeds. The next decade belongs to creators who own their distribution.
                             </p>

                             <div style={{ margin: '2rem 0', padding: '2rem', background: '#f8f8f8', borderLeft: '4px solid #000', fontStyle: 'italic', fontFamily: 'serif', fontSize: '1.1rem' }}>
                                 "The goal is not to be famous. The goal is to be effective."
                             </div>

                             <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem', fontFamily: 'serif' }}>
                                 Yesterday, I spoke with 3 founders who are all moving their newsletter off Substack. Why? Because they want deeper integration with their own products.
                             </p>

                             {/* Image Placeholder */}
                             <div style={{ width: '100%', height: '300px', background: '#eee', margin: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                                 <span style={{ color: '#aaa' }}>Insert Image</span>
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {view === 'analytics' && (
                <div style={{ flex: 1, padding: '2rem' }}>
                    <h2 style={{ marginBottom: '2rem' }}>Performance</h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Subscribers</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>12,450</div>
                            <div style={{ color: '#16a34a', fontSize: '0.8rem' }}>+124 this week</div>
                        </div>
                        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Avg. Open Rate</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>52.4%</div>
                            <div style={{ color: '#16a34a', fontSize: '0.8rem' }}>+2.1%</div>
                        </div>
                        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                            <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Link Clicks</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>4,210</div>
                        </div>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Recent Sends</h3>
                    <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                        {[
                            { subject: 'Why I quit social media', date: 'Oct 24', opens: '54%', clicks: '12%' },
                            { subject: 'The Creator Economy Report 2026', date: 'Oct 17', opens: '62%', clicks: '18%' },
                            { subject: 'Q3 Update', date: 'Oct 10', opens: '48%', clicks: '5%' }
                        ].map((row, i) => (
                            <div key={i} style={{ display: 'flex', padding: '1rem', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                                <div style={{ flex: 1, fontWeight: '500' }}>{row.subject}</div>
                                <div style={{ width: '100px', color: '#666', fontSize: '0.9rem' }}>{row.date}</div>
                                <div style={{ width: '100px', display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={14} color="#666" /> {row.opens}</div>
                                <div style={{ width: '100px', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} color="#666" /> {row.clicks}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsletterDemo;
