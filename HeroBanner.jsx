import { useState, useEffect } from 'react';
import './HeroBanner.css';
import image2 from '../assets/image2.jpg'; 
import image13 from '../assets/image13.jpg';
import image14  from '../assets/image14.jpg'; 
import image15 from '../assets/image15.jpg'; 


export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      src: image2,
      alt: "Barelias Town Center",
      
    },
    {
      src: image13,
      alt: "Barelias Town Hall",
      
    },
    {
      src: image14,
      alt: "Community Park",
      
    },
    {
      src: image15,
      alt: "Community Park",
      
    },
   
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="hero-banner">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Municipality of Barelias</h1>
          <p>Your community hub for information, services and engagement</p>
        </div>
        
        <div className="hero-image-container">
          <div className="image-slider">
            {images.map((image, index) => (
              <div
                key={index}
                className={`slider-image ${index === currentImageIndex ? 'active' : ''}`}
              >
                <img 
                  src={image.src}  
                  alt={image.alt} 
                  className="hero-image"
                />
                <div className="image-title">
                  <h3>{image.title}</h3>
                </div>
              </div>
            ))}
          
            {/* Navigation arrows */}
            <button className="slider-arrow slider-arrow-prev" onClick={goToPrev}>
              &#8249;
            </button>
            <button className="slider-arrow slider-arrow-next" onClick={goToNext}>
              &#8250;
            </button>
            
            {/* Indicators */}
            <div className="slider-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`slider-indicator ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="image-overlay"></div>
        </div>
      </div>
    </section>
  );
}