import React, { useState } from 'react';
import { Mail, Instagram, Twitter, Youtube, ArrowRight, Video, ShoppingBag, Layout, Heart, MessageCircle } from 'lucide-react';

const CreatorDemo = () => {
    const [activeTab, setActiveTab] = useState('home'); // home, content, shop
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if(email) setSubscribed(true);
    };

    const renderHeader = () => (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
                width: '96px', 
                height: '96px', 
                borderRadius: '50%', 
                background: 'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                margin: '0 auto 1rem',
                border: '4px solid #fff',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
            }}></div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem', color: '#111' }}>Sarah Jenkins</h1>
            <p style={{ color: '#666', maxWidth: '400px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.5' }}>
                Digital Artist & Design Educator. <br/>
                Teaching 100k+ creatives how to build a career they love.
            </p>
            
            {/* Social Pill */}
            <div style={{ display: 'inline-flex', gap: '1rem', marginTop: '1.5rem', background: '#f5f5f5', padding: '0.5rem 1.5rem', borderRadius: '2rem' }}>
                <Instagram size={20} className="hover-scale" style={{ cursor: 'pointer', color: '#E1306C' }} />
                <Twitter size={20} className="hover-scale" style={{ cursor: 'pointer', color: '#1DA1F2' }} />
                <Youtube size={20} className="hover-scale" style={{ cursor: 'pointer', color: '#FF0000' }} />
            </div>
        </div>
    );

    const renderTabs = () => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            {[
                { id: 'home', label: 'Home', icon: <Layout size={18} /> },
                { id: 'content', label: 'Content', icon: <Video size={18} /> },
                { id: 'shop', label: 'Shop', icon: <ShoppingBag size={18} /> }
            ].map(tab => (
                <div 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        cursor: 'pointer',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        background: activeTab === tab.id ? '#111' : 'transparent',
                        color: activeTab === tab.id ? '#fff' : '#666',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                    }}
                >
                    {tab.icon} {tab.label}
                </div>
            ))}
        </div>
    );

    return (
        <div style={{ 
            height: '100%', 
            background: '#ffffff', 
            color: '#000', 
            display: 'flex', 
            flexDirection: 'column', 
            overflowY: 'auto'
        }}>
            {/* Cover Banner */}
            <div style={{ height: '140px', background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)', flexShrink: 0 }}></div>
            
            <div style={{ padding: '0 1.5rem 2rem', marginTop: '-48px', flex: 1 }}>
                {renderHeader()}
                {renderTabs()}

                {activeTab === 'home' && (
                    <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Latest Drop */}
                        <div style={{ background: '#111', color: '#fff', borderRadius: '16px', padding: '1.5rem', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <span style={{ background: '#FF5F56', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>NEW</span>
                                <h3 style={{ fontSize: '1.2rem', marginTop: '0.5rem', marginBottom: '0.2rem' }}>The Freelance OS Template</h3>
                                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>Organize your entire creative business.</p>
                            </div>
                            <ArrowRight style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', zIndex: 2 }} />
                        </div>

                        {/* Link List */}
                        {[
                            '🎨 My Digital Brush Pack (Free)',
                            '📅 Book a 1:1 Portfolio Review',
                            '📹 Watch my latest Studio Vlog'
                        ].map((link, i) => (
                            <div key={i} style={{ 
                                padding: '1rem', 
                                border: '1px solid #eee', 
                                borderRadius: '12px', 
                                fontWeight: '600',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                            className="hover-bg-gray"
                            >
                                {link} <ArrowRight size={16} color="#ccc" />
                            </div>
                        ))}

                        {/* Newsletter */}
                        <div style={{ marginTop: '2rem', background: '#F9FAFB', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                            <Mail size={24} style={{ marginBottom: '0.5rem', color: '#111' }} />
                            <h4 style={{ margin: '0 0 0.5rem 0' }}>Join the Creative Club</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Weekly tips on design & business. No spam.</p>
                            {!subscribed ? (
                                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input 
                                        type="email" 
                                        placeholder="your@email.com" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ flex: 1, padding: '0.7rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                    />
                                    <button style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '8px', padding: '0 1rem', cursor: 'pointer' }}>Join</button>
                                </form>
                            ) : (
                                <div style={{ color: '#10B981', fontWeight: '600' }}>✨ You're on the list!</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div style={{ maxWidth: '600px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
                         {[1, 2, 3].map((i) => (
                             <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
                                 <div style={{ height: '180px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                     <Video size={40} color="#ccc" />
                                 </div>
                                 <div style={{ padding: '1rem' }}>
                                      <h4 style={{ margin: 0, marginBottom: '0.5rem' }}>How to find your art style in 2026</h4>
                                     <div style={{ display: 'flex', gap: '1rem', color: '#666', fontSize: '0.8rem' }}>
                                         <span>12k views</span>
                                         <span>2 days ago</span>
                                     </div>
                                 </div>
                             </div>
                         ))}
                    </div>
                )}

                {activeTab === 'shop' && (
                    <div style={{ maxWidth: '600px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {[
                            { name: 'Brush Pack V2', price: '$29' },
                            { name: 'Texture Bundle', price: '$19' },
                            { name: 'Lightroom Presets', price: '$35' },
                            { name: 'Procreate Course', price: '$149' }
                        ].map((item, i) => (
                            <div key={i} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '1rem', cursor: 'pointer' }}>
                                <div style={{ height: '100px', background: '#f5f5f5', borderRadius: '8px', marginBottom: '1rem' }}></div>
                                <h4 style={{ fontSize: '0.95rem', margin: '0 0 0.2rem 0' }}>{item.name}</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '600' }}>{item.price}</span>
                                    <span style={{ fontSize: '0.8rem', background: '#111', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>Buy</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default CreatorDemo;
