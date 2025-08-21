import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="municipality-footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Emergency Services */}
          <div className="footer-section">
            <h4>🚨 Emergency Services</h4>
            <div className="footer-items">
              <div className="footer-item">
                <span className="item-icon">📞</span>
                <span>Emergency: <strong>911</strong></span>
              </div>
              <div className="footer-item">
                <span className="item-icon">🚒</span>
                <span>Fire Department</span>
              </div>
              <div className="footer-item">
                <span className="item-icon">👮</span>
                <span>Police</span>
              </div>
              <div className="footer-item">
                <span className="item-icon">🚑</span>
                <span>Ambulance</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="footer-section">
            <h4>🕒 Opening Hours</h4>
            <div className="footer-items">
              <div className="footer-item">
                <span className="day">Mon-Fri</span>
                <span className="time">8:30 AM - 4:30 PM</span>
              </div>
              <div className="footer-item">
                <span className="day">Saturday</span>
                <span className="time">9:00 AM - 1:00 PM</span>
              </div>
              <div className="footer-item">
                <span className="day">Sunday</span>
                <span className="time closed">Closed</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>🔗 Quick Links</h4>
            <nav className="footer-items">
              <Link to="/" className="footer-link">
                <span className="link-icon">🏠</span>
                Home
              </Link>
              <Link to="/services" className="footer-link">
                <span className="link-icon">🔧</span>
                Services
              </Link>
              <Link to="/news" className="footer-link">
                <span className="link-icon">📰</span>
                News
              </Link>
              <Link to="/contact" className="footer-link">
                <span className="link-icon">📞</span>
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>📞 Contact Info</h4>
            <div className="footer-items">
              <div className="footer-item">
                <span className="item-icon">🏢</span>
                <span>Main Road, Barelias</span>
              </div>
              <div className="footer-item">
                <span className="item-icon">📞</span>
                <span>(123) 456-7890</span>
              </div>
              <div className="footer-item">
                <span className="item-icon">✉️</span>
                <span>info@barelias.gov</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Barelias Municipality. All rights reserved.</p>
      </div>
    </footer>
  );
}