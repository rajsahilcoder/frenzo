import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        Frenzo
      </Link>
      
      {/* Nav Links - Desktop & Mobile */}
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
        <Link to="/services" className="nav-link" onClick={closeMenu}>Services</Link>
        <Link to="/pricing" className="nav-link" onClick={closeMenu}>Pricing</Link>
        <Link to="/how-it-works" className="nav-link" onClick={closeMenu}>Process</Link>
        <Link to="/vision" className="nav-link" onClick={closeMenu}>Vision</Link>
      </div>

      <div className="nav-right">
          {/* User Menu - Always Visible */}
          <UserMenu />

          {/* Mobile Toggle */}
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
      </div>
    </nav>
  );
};

export default Navbar;
