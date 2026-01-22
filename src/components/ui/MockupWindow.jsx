import React from 'react';

const MockupWindow = ({ type, title }) => {
  return (
    <div style={{
      background: '#1a1a1a',
      borderRadius: '12px',
      border: '1px solid #333',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      width: '100%',
      aspectRatio: '16/9',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Bar */}
      <div style={{
        background: '#222',
        borderBottom: '1px solid #333',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
        </div>
        <div style={{
          background: '#000',
          borderRadius: '4px',
          padding: '2px 10px',
          fontSize: '0.7rem',
          color: '#555',
          marginLeft: '1rem',
          flex: 1,
          textAlign: 'center'
        }}>
          {title.toLowerCase().replace(/\s+/g, '-')}.frenzo.app
        </div>
      </div>

      {/* Body Content (Simulated UI) */}
      <div style={{ flex: 1, padding: '1.5rem', overflow: 'hidden', position: 'relative' }}>
        
        {/* COURSE PLATFORM MOCKUP */}
        {type === 'course' && (
          <div style={{ display: 'flex', height: '100%', gap: '1rem' }}>
             <div style={{ width: '25%', background: '#252528', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ height: '30px', width: '80%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '1.5rem' }}></div>
                <div style={{ height: '10px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '0.5rem' }}></div>
                <div style={{ height: '10px', width: '90%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '0.5rem' }}></div>
                <div style={{ height: '10px', width: '60%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '1.5rem' }}></div>
                <div style={{ height: '20px', width: '100%', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '4px' }}></div>
             </div>
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, background: '#000', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>[ Video Player ]</div>
                <div style={{ height: '20px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                <div style={{ height: '10px', width: '40%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}></div>
             </div>
          </div>
        )}

        {/* E-COMMERCE MOCKUP */}
        {type === 'commerce' && (
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', height: '100%' }}>
             {[1,2,3].map(i => (
               <div key={i} style={{ background: '#252528', borderRadius: '8px', overflow: 'hidden' }}>
                 <div style={{ height: '60%', background: '#333' }}></div>
                 <div style={{ padding: '0.8rem' }}>
                   <div style={{ height: '12px', width: '80%', background: 'rgba(255,255,255,0.1)', marginBottom: '0.5rem' }}></div>
                   <div style={{ height: '10px', width: '40%', background: 'rgba(255,255,255,0.05)' }}></div>
                 </div>
               </div>
             ))}
           </div>
        )}

         {/* DASHBOARD MOCKUP (Default) */}
        {!['course', 'commerce'].includes(type) && (
           <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: '100%', gap: '1rem' }}>
              <div style={{ background: '#252528', borderRadius: '8px', padding: '1rem' }}>
                  {[1,2,3,4,5].map(i => <div key={i} style={{ height: '15px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '0.8rem' }}></div>)}
              </div>
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                   {[1,2,3].map(i => <div key={i} style={{ background: '#252528', borderRadius: '8px' }}></div>)}
                 </div>
                 <div style={{ background: '#252528', borderRadius: '8px' }}></div>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default MockupWindow;
