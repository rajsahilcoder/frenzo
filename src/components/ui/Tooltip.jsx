import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

const Tooltip = ({ text }) => {
  const [show, setShow] = useState(false);
  const triggerRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      setCoords({
        top: rect.top + scrollY - 10, // 10px above
        left: rect.left + scrollX + (rect.width / 2) // center
      });
    }
  };

  useEffect(() => {
    if (show) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [show]);

  const toggleTooltip = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShow(!show);
  };

  return (
    <>
      <span 
        ref={triggerRef}
        className="tooltip-trigger" 
        style={{ marginLeft: '6px', position: 'relative', display: 'inline-flex', alignItems: 'center' }}
        onMouseEnter={() => { updatePosition(); setShow(true); }}
        onMouseLeave={() => setShow(false)}
        onClick={toggleTooltip}
      >
        <Info size={14} color="var(--accent-primary)" style={{ cursor: 'help' }} />
      </span>

      {show && createPortal(
        <div style={{
          position: 'absolute', 
          top: coords.top, 
          left: coords.left,
          transform: 'translate(-50%, -100%)', // Center and move above
          width: '200px', 
          padding: '10px', 
          background: '#222', 
          border: '1px solid #444', 
          borderRadius: '8px', 
          fontSize: '0.75rem', 
          color: '#ccc', 
          zIndex: 9999, // Super high z-index
          textAlign: 'center',
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {text}
          {/* Arrow */}
          <div style={{
             position: 'absolute',
             bottom: '-6px',
             left: '50%',
             transform: 'translateX(-50%)',
             width: '0', 
             height: '0', 
             borderLeft: '6px solid transparent',
             borderRight: '6px solid transparent',
             borderTop: '6px solid #444'
          }} />
           <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translate(-50%, -90%); }
              to { opacity: 1; transform: translate(-50%, -100%); }
            }
          `}</style>
        </div>,
        document.body
      )}
    </>
  );
};

export default Tooltip;
