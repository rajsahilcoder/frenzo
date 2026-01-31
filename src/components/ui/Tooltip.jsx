import React, { useState } from 'react';
import { Info } from 'lucide-react';

const Tooltip = ({ text }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div 
      className="tooltip-container" 
      style={{ marginLeft: '6px', position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Info size={14} color="var(--accent-primary)" style={{ cursor: 'help' }} />
      {show && (
        <div style={{
          position: 'absolute', bottom: '25px', left: '50%', transform: 'translateX(-50%)',
          width: '200px', padding: '10px', background: '#222', border: '1px solid #444', 
          borderRadius: '8px', fontSize: '0.75rem', color: '#ccc', zIndex: 50, textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
