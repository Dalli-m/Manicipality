import './HeroBanner.css';
import image2 from '../assets/image2.jpg'; 

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Municipality of Barelias</h1>
          <p>Your community hub for information, services and engagement</p>
          
        </div>
        <div className="hero-image-container">
          <img 
            src={image2}  
            alt="Barelias Town Hall" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}