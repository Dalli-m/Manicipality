import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
import image1 from '../assets/image1.png'; 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="municipality-header">
      <div className="header-top">
        <div className="logo">
          <img src={image1} alt="Barelias Municipality Logo" />
          <h1>Barelias Municipality</h1>
        </div>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      <nav className={isMenuOpen ? "active" : ""}>
        <ul>
          <li><Link to="/admin/login" onClick={() => setIsMenuOpen(false)}>Admin_Login</Link></li>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
          <li><Link to="/news" onClick={() => setIsMenuOpen(false)}>News</Link></li>
          <li><Link to="/events" onClick={() => setIsMenuOpen(false)}>Events</Link></li>
          <li><Link to="/report-issue" onClick={() => setIsMenuOpen(false)}>Report_Issue</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}