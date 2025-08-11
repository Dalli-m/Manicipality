import './Services.css';

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Report a Pothole",
      icon: "🛣️",
      description: "Quickly report road issues"
    },
   
  ];

  return (
    <section className="services-section">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <button>Learn More</button>
          </div>
        ))}
      </div>
    </section>
  );
}