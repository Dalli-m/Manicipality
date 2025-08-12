import { Link } from 'react-router-dom';
import './Header.css';
import image1 from '../assets/image1.png'; 

export default function Header() {
  

  return (
    <header className="municipality-header">
      <div className="header-top">
        <div className="logo">
          <img src={image1} alt="Barelias Municipality Logo" />
          <h1>Barelias Municipality</h1> {/* Only one h1 per page */}
        </div>
        {/* Remove quick-links if unused */}
      </div>
      <nav>
        <ul>
          <li><Link to="/admin/login">Admin_Login</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/report-issue">Report_Issue</Link></li>
          <li><Link to="/contact">Contact</Link></li> 
        </ul>
      </nav>
    </header>
  );
}