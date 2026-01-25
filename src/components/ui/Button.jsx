import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, to, variant = 'primary', className = '', style: propStyle = {}, ...props }) => {
  const baseStyle = {
    padding: '0.8rem 2rem',
    borderRadius: '2rem',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const variants = {
    primary: {
      background: 'var(--text-primary)',
      color: '#000000', // Hardcoded for max visibility
      border: '1px solid var(--text-primary)',
    },
    outline: {
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'var(--text-primary)',
    },
    accent: {
      background: 'var(--accent-primary)',
      color: 'white',
      border: '1px solid var(--accent-primary)',
    },
    ghost: {
      background: 'transparent',
      border: 'none',
      color: 'var(--text-secondary)',
      padding: '0.5rem 1rem',
    }
  };

  const mergedStyle = { ...baseStyle, ...variants[variant], ...propStyle };

  const handleMouseEnter = (e) => {
    if (variant === 'primary') {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.15)';
    } else if (variant === 'outline') {
      e.currentTarget.style.borderColor = 'var(--text-primary)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.background = variants[variant].background;
    if (variant === 'outline') {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
    }
  };

  if (to) {
    return (
      <Link 
        to={to} 
        style={mergedStyle} 
        className={className} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      style={mergedStyle} 
      className={className} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
