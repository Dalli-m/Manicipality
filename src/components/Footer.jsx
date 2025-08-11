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
            <li><a href="/Home">Home</a></li>
            <li><a href="/Services">Services</a></li>
            <li><a href="/News">News</a></li>
            <li><a href="/Events">Events</a></li>
            <li><a href="/report-issue">Report Issue</a></li>
            <li><a href="/Contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Barelias Manicipality. All rights reserved.</p>
      </div>
    </footer>
  );
}