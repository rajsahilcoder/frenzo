import React from 'react';
import { User, MessageCircle, Calendar, Image, Hash } from 'lucide-react';

const SocialDemo = () => {
  return (
    <div style={{ height: '100%', display: 'flex', background: '#f3f2ef', color: '#333' }}>
        {/* Left Sidebar */}
        <div style={{ width: '240px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }} className="desktop-only">
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.2rem', color: '#0a66c2' }}>
                 <Hash /> AlumniNet
             </div>
             
             <div>
                 <h4 style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Menu</h4>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                     <div style={{ fontWeight: '600' }}>Feed</div>
                     <div style={{ color: '#666' }}>My Network</div>
                     <div style={{ color: '#666' }}>Events</div>
                     <div style={{ color: '#666' }}>Jobs</div>
                 </div>
             </div>

             <div>
                 <h4 style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Your Groups</h4>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><Hash size={14} /> Class of 2024</div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><Hash size={14} /> NYC Founders</div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><Hash size={14} /> Tech Talks</div>
                 </div>
             </div>
        </div>

        {/* Main Feed */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
            {/* Create Post */}
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                     <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ccc' }}></div>
                     <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '30px', padding: '12px 20px', color: '#666', fontWeight: '500', background: '#f8f8f8' }}>Start a post...</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem' }}>
                     <div style={{ display: 'flex', gap: '1.5rem', color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Image size={18} color="#378fe9" /> Media</div>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={18} color="#c37d16" /> Event</div>
                     </div>
                </div>
            </div>

            {/* Posts */}
            {[1, 2].map(i => (
                <div key={i} style={{ background: '#fff', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                         <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#444' }}></div>
                         <div>
                             <div style={{ fontWeight: '600' }}>David Miller</div>
                             <div style={{ fontSize: '0.8rem', color: '#666' }}>Product Designer • 3h ago</div>
                         </div>
                    </div>
                    <p style={{ lineHeight: '1.5', color: '#333', marginBottom: '1rem' }}>
                        Just wrapped up the annual retreat! Incredible energy in this group. Can't wait to see what everyone builds this year. 🚀
                    </p>
                    <div style={{ height: '240px', background: '#eee', borderRadius: '4px', marginBottom: '1rem' }}></div>
                    <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', display: 'flex', gap: '1.5rem', color: '#666', fontSize: '0.9rem', fontWeight: '600' }}>
                        <span>Like</span>
                        <span>Comment</span>
                        <span>Repost</span>
                    </div>
                </div>
            ))}
        </div>

        {/* Right Sidebar */}
        <div style={{ width: '280px', padding: '1.5rem' }} className="desktop-only">
             <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                 <h4 style={{ margin: '0 0 1rem 0' }}>Upcoming Events</h4>
                 <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                     <div style={{ width: '40px', height: '40px', background: '#0a66c2', color: '#fff', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                         <span>OCT</span><span>24</span>
                     </div>
                     <div>
                         <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Regional Meetup</div>
                         <div style={{ fontSize: '0.8rem', color: '#666' }}>7:00 PM • Downtown</div>
                     </div>
                 </div>
             </div>
        </div>
    </div>
  );
};

export default SocialDemo;
