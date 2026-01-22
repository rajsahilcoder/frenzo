import React, { useState } from 'react';
import { Lock, MessageSquare, Heart, Share2, Users, Star, Calendar } from 'lucide-react';

const MemberDemo = () => {
  const [activeTab, setActiveTab] = useState('feed'); // feed, events, members
  const [userTier, setUserTier] = useState('free'); // free, pro

  const posts = [
    { id: 1, author: 'Community Manager', role: 'Admin', time: '2h ago', content: 'Welcome to the inner circle! 🚀 Here is the recording of yesterday’s expert session on Scaling to $10k/mo.', type: 'video', locked: false, likes: 45, comments: 12 },
    { id: 2, author: 'Alex Rivera', role: 'Member', time: '4h ago', content: 'Just launched my first funnel using the templates in the Pro section. The conversion rate is already at 12%!', type: 'text', locked: false, likes: 23, comments: 5 },
    { id: 3, author: 'Sarah Jenkins', role: 'Expert', time: '6h ago', content: 'Advanced Strategy: How to use psychological triggers in your copy. [PDF Download attached]', type: 'resource', locked: true, likes: 112, comments: 45 },
  ];

  return (
    <div style={{ height: '100%', background: '#f0f2f5', color: '#111', display: 'flex' }}>
       {/* Sidebar Navigation */}
       <div style={{ width: '240px', background: '#fff', borderRight: '1px solid #e4e6eb', display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem' }} className="desktop-only">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
             <div style={{ width: '32px', height: '32px', background: '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>C</div>
             <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Creators Circle</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             {[
               { id: 'feed', label: 'Community Feed', icon: <MessageSquare size={18} /> },
               { id: 'events', label: 'Live Events', icon: <Calendar size={18} /> },
               { id: 'members', label: 'Member Directory', icon: <Users size={18} /> },
               { id: 'resources', label: 'Resource Library', icon: <Star size={18} /> },
             ].map(item => (
                <div 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{ 
                    display: 'flex', 
                    gap: '0.8rem', 
                    alignItems: 'center', 
                    padding: '0.8rem', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    background: activeTab === item.id ? '#e0e7ff' : 'transparent',
                    color: activeTab === item.id ? '#4338ca' : '#64748b',
                    fontWeight: activeTab === item.id ? '600' : '500' 
                  }}
                >
                    {item.icon} {item.label}
                </div>
             ))}
          </div>

          <div style={{ marginTop: 'auto', background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
             <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Your Plan: {userTier === 'free' ? 'Free Member' : 'Pro VIP'}</div>
             {userTier === 'free' ? (
                 <button 
                   onClick={() => setUserTier('pro')}
                   style={{ width: '100%', padding: '0.6rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}
                 > Upgrade to Pro ✨</button>
             ) : (
                <div style={{ color: '#059669', fontSize: '0.8rem', fontWeight: '600' }}>Active & Verified</div>
             )}
          </div>
       </div>

       {/* Main Feed */}
       <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
           <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              {/* Write Post Box */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                     <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ccc' }}></div>
                     <input type="text" placeholder="Share something with the community..." style={{ flex: 1, border: 'none', background: '#f1f5f9', borderRadius: '20px', padding: '0 1.5rem', outline: 'none' }} />
                  </div>
              </div>

              {/* Posts */}
              {posts.map(post => (
                  <div key={post.id} style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                      
                      {/* Post Header */}
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                         <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: post.role === 'Admin' ? '#4338ca' : '#ccc' }}></div>
                         <div>
                             <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{post.author} {post.role === 'Admin' && <span style={{ background: '#e0e7ff', color: '#4338ca', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>ADMIN</span>}</div>
                             <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{post.time}</div>
                         </div>
                      </div>

                      {/* Content */}
                      <p style={{ lineHeight: '1.5', color: '#334155', marginBottom: '1rem' }}>{post.content}</p>

                      {/* Locked Overlay */}
                      {post.locked && userTier === 'free' && (
                          <div style={{ 
                              position: 'absolute', 
                              top: 0, left: 0, right: 0, bottom: 0, 
                              background: 'rgba(255,255,255,0.1)', 
                              backdropFilter: 'blur(8px)',
                              display: 'flex', 
                              flexDirection: 'column',
                              alignItems: 'center', 
                              justifyContent: 'center',
                              zIndex: 10
                          }}>
                              <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: '80%' }}>
                                  <div style={{ background: '#fef3c7', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#d97706' }}>
                                      <Lock size={24} />
                                  </div>
                                  <h3 style={{ margin: '0 0 0.5rem 0' }}>Pro Member Exclusive</h3>
                                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Unlock this deep-dive strategy and full resource library.</p>
                                  <button onClick={() => setUserTier('pro')} style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Unlock Content</button>
                              </div>
                          </div>
                      )}

                      {/* Video Placeholder */}
                      {post.type === 'video' && !post.locked && (
                          <div style={{ width: '100%', height: '240px', background: '#000', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</div>
                          </div>
                      )}

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '1.5rem', color: '#64748b', fontSize: '0.9rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', cursor: 'pointer' }}><Heart size={18} /> {post.likes}</div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', cursor: 'pointer' }}><MessageSquare size={18} /> {post.comments}</div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', cursor: 'pointer' }}><Share2 size={18} /> Share</div>
                      </div>
                  </div>
              ))}
           </div>
       </div>
    </div>
  );
};

export default MemberDemo;
