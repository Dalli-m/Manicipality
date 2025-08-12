import './Footer.css';

export default function Footer() {
  return (
    <footer className="municipality-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us </h3>
          <p>Main Road</p>
          <p>Barelias</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Opening & Closing Hours</h3>
          <p>Monday-Friday: 8:30 AM - 4:30 PM</p>
          <p>Closed on weekends and holidays</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/report-issue">Report Issue</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Barelias Manicipality. All rights reserved.</p>
      </div>
    </footer>
  );
}