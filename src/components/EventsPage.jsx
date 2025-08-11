import React from 'react';
import './EventsPage.css';
import Header from './Header';
import Footer from './Footer';


import image9 from '../assets/image9.jpg';
import image10 from '../assets/image10.jpg';
import image11 from '../assets/image11.png';

const EventsPage = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Summer Festival",
      date: "August 12-14, 2023",
      time: "10:00 AM - 10:00 PM",
      location: "Main Street Downtown",
      description: "Three days of live music, food trucks, and family activities. Fireworks on Saturday night!",
      image: image9,
      category: "Festival",
      registerLink: "#"
    },
    {
      id: 2,
      title: "Farmers Market Opening",
      date: "Every Saturday starting June 3",
      time: "8:00 AM - 1:00 PM",
      location: "City Park Pavilion",
      description: "Fresh local produce, artisan goods, and live cooking demonstrations.",
      image: image10,
      category: "Market",
      registerLink: "#"
    },
    {
      id: 3,
      title: "Summer Concert Series",
      date: "July 15, 2023",
      time: "6:30 PM - 9:00 PM",
      location: "Riverside Amphitheater",
      description: "Featuring local jazz ensemble 'The Riverside Players'. Free admission.",
      image: image11,
      category: "Concert",
      registerLink: "#"
    }
  ];

  return (
    <div className="app">
      <Header />
      
      <main>
        <section className="events-section">
          <div className="section-header">
            <h2>Upcoming Community Events</h2>
            <div className="underline"></div>
            <p>Join your neighbors for these exciting local activities</p>
          </div>

          <div className="events-grid">
            {upcomingEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-image-container">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    loading="lazy"
                  />
                  <span className="event-category">{event.category}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <p><i className="fas fa-calendar-day"></i> {event.date}</p>
                    <p><i className="fas fa-clock"></i> {event.time}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
                  </div>
                  <p className="event-description">{event.description}</p>
                  <a href={event.registerLink} className="register-btn">
                    More Info <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventsPage;