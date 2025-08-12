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
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/report-issue">Report Issue</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Barelias Manicipality. All rights reserved.</p>
      </div>
    </footer>
  );
}