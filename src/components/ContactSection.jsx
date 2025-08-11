import './ContactSection.css';
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa';

export default function ContactSection() {
  const whatsappNumber = "+1234567890"; 
  const facebookUrl = "https://facebook.com/yourpage"; 
  
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Contact us for more<br />information</h2>
          <p>
            Have a question or need assistance? We're here to<br />
            help with services, permits, and local info. Contact<br />
            us by phone, email, or visit in person.
          </p>
        </div>

        <div className="contact-methods">
          <div className="contact-info">
            <div className="info-item">
              <h4>Phone</h4>
              <p>+1 (234) 567-8900</p>
            </div>
            <div className="info-item">
              <h4>Email</h4>
              <p>info@barelias.gov</p>
            </div>
            <div className="info-item">
              <h4>Address</h4>
              <p>123 Municipal Street, Barelias</p>
            </div>
          </div>

          <div className="social-buttons">
            <a 
              href={`https://wa.me/${whatsappNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button whatsapp"
            >
              <FaWhatsapp className="social-icon" />
              WhatsApp
            </a>
            <a 
              href={facebookUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-button facebook"
            >
              <FaFacebookF className="social-icon" />
              Facebook
            </a>
            
            
          </div>
        </div>
      </div>
    </section>
  );
}