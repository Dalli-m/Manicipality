import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';
import image1 from '../assets/image1.png'; 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`municipality-header ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        <div className="header-top">
          <div className="logo">
            <img src={image1} alt="Barelias Municipality Logo" />
            <div className="logo-text">
              <h1>Barelias Municipality</h1>
              <p>Community • Service • Excellence</p>
            </div>
          </div>
          
          <div className="header-actions">
            <div className="quick-contact">
              <span>📞 (123) 456-7890</span>
              <span>✉️ info@barelias.gov</span>
            </div>
            
            <button 
              className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        
        <nav className={isMenuOpen ? "active" : ""}>
          <ul>
            <li>
              <Link 
                to="/" 
                onClick={closeMenu}
                className={location.pathname === '/' ? 'active' : ''}
              >
                <span className="nav-icon">🏠</span>
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                onClick={closeMenu}
                className={location.pathname === '/services' ? 'active' : ''}
              >
                <span className="nav-icon">🔧</span>
                Services
              </Link>
            </li>
            <li>
              <Link 
                to="/news" 
                onClick={closeMenu}
                className={location.pathname === '/news' ? 'active' : ''}
              >
                <span className="nav-icon">📰</span>
                News
              </Link>
            </li>
            <li>
              <Link 
                to="/events" 
                onClick={closeMenu}
                className={location.pathname === '/events' ? 'active' : ''}
              >
                <span className="nav-icon">🎉</span>
                Events
              </Link>
            </li>
            <li>
              <Link 
                to="/report-issue" 
                onClick={closeMenu}
                className={location.pathname === '/report-issue' ? 'active' : ''}
              >
                <span className="nav-icon">⚠️</span>
                Report Issue
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                onClick={closeMenu}
                className={location.pathname === '/contact' ? 'active' : ''}
              >
                <span className="nav-icon">📞</span>
                Contact
              </Link>
            </li>
            <li className="admin-link">
              <Link 
                to="/admin/login" 
                onClick={closeMenu}
                className={location.pathname === '/admin/login' ? 'active' : ''}
              >
                <span className="nav-icon">🔐</span>
                Admin Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}