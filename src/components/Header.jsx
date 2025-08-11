import { Link } from 'react-router-dom';
import './Header.css';
import image1 from '../assets/image1.png'; 
import { Link } from 'react-router-dom';
import './Header.css';
import image1 from '../assets/image1.png'; 
import { useMobileMenu } from '../hooks/useMobileMenu';

export default function Header() {
  useMobileMenu();
  return (
    <header className="municipality-header">
      <div className="header-top">
        <div className="logo">
          <img src={image1} alt="Barelias Municipality Logo" />
          <h1>Barelias Municipality</h1>
        </div>
        <div className="quick-links">

        </div>
      </div>
      <nav>
        <ul>
          <h1><Link to="/admin/login">Admin Login</Link></h1>
          <h1><li><Link to="/">Home</Link></li></h1>
          <h1><li><Link to="/services">Services</Link></li></h1>
          <h1><li><Link to="/news">News</Link></li></h1>
          <h1><li><Link to="/events">Events</Link></li></h1>
          <h1><li><Link to="/report-issue">Report Issue</Link></li></h1>
          <h1><li><Link to="/Contact">Contact</Link></li></h1>
          
        </ul>
      </nav>
    </header>
    
  );
}