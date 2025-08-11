import React from 'react';
import './ServicesPreview.css';

const ServicesPreview = () => {
  
  const services = [
    
  ];

  return (
    <section className="services-preview">
      <h2></h2>
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <i className={service.icon}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesPreview;