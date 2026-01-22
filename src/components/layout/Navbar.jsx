import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        Frenzo
      </Link>
      
      {/* Mobile Toggle */}
      <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Nav Links - Desktop & Mobile */}
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
        <Link to="/services" className="nav-link" onClick={closeMenu}>Services</Link>
        <Link to="/how-it-works" className="nav-link" onClick={closeMenu}>Process</Link>
        <Link to="/vision" className="nav-link" onClick={closeMenu}>Vision</Link>
        <Link to="/contact" className="btn-primary" onClick={closeMenu}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
