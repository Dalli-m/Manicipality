import { useState } from 'react';
import './ExploreTown.css';
import { Link } from 'react-router-dom';

export default function ExploreTown() {
  const [showTrashSchedule, setShowTrashSchedule] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    accountNumber: '',
    amount: '',
    email: ''
  });

  const trashScheduleData = [
    { day: 'Monday', type: 'Recycling', area: 'North District' },
    { day: 'Tuesday', type: 'General Waste', area: 'Central District' },
    { day: 'Wednesday', type: 'Yard Waste', area: 'South District' },
    { day: 'Thursday', type: 'Recycling', area: 'East District' },
    { day: 'Friday', type: 'General Waste', area: 'West District' }
  ];

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // This would connect to your payment gateway API
    window.open(`https://payment.whish.money/?municipality=yourcity&account=${paymentInfo.accountNumber}&amount=${paymentInfo.amount}`);
  };

  const townFeatures = [
    {
      id: 1,
      title: "Pay Bills",
      description: "Right away from your mobile phone",
      icon: "fas fa-money-bill-wave",
      color: "#27ae60",
      action: () => setShowPaymentPopup(true)
    },
    {
      id: 3,
      title: "Trash Schedule",
      description: "See all times and dates",
      icon: "fas fa-trash-alt",
      color: "#e67e22",
      action: () => setShowTrashSchedule(true)
    },
    {
      id: 4,
      title: "Report a Problem",
      description: "We're here to help",
      icon: "fas fa-exclamation-triangle",
      color: "#e74c3c",
      link: "/report-issue"
    }
  ];

  return (
    <section className="explore-town">
      <div className="section-header">
        <h2 className="title-gradient">Municipal Services</h2>
        <p className="section-subtitle">Quick access to essential services</p>
      </div>
      
      <div className="features-grid">
        {townFeatures.map(feature => (
          <div 
            key={feature.id} 
            className="feature-card"
            style={{ '--feature-color': feature.color }}
          >
            <div className="feature-icon">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="feature-id">#{feature.id.toString().padStart(2, '0')}</div>
            {feature.action ? (
              <button 
                className="explore-btn"
                onClick={feature.action}
              >
                View Details <i className="fas fa-chevron-right"></i>
              </button>
            ) : (
              <Link to={feature.link} className="explore-btn">
                View Details <i className="fas fa-chevron-right"></i>
              </Link>
            )}
          </div>
        ))}
      </div>

      
      {showTrashSchedule && (
        <div className="popup-overlay" onClick={() => setShowTrashSchedule(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button 
              className="popup-close"
              onClick={() => setShowTrashSchedule(false)}
              aria-label="Close schedule"
            >
              &times;
            </button>
            <h3>Trash Collection Schedule</h3>
            <div className="popup-table">
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Type</th>
                    <th>Area</th>
                  </tr>
                </thead>
                <tbody>
                  {trashScheduleData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.day}</td>
                      <td>{item.type}</td>
                      <td>{item.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="popup-notes">
              <h4>Important Notes:</h4>
              <ul>
                <li>Place bins out by 6:30 AM</li>
                <li>No collection on holidays</li>
                <li>Bins must not exceed 50 lbs</li>
                <li>Recycling must be separated</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      
      {showPaymentPopup && (
        <div className="popup-overlay" onClick={() => setShowPaymentPopup(false)}>
          <div className="payment-popup" onClick={e => e.stopPropagation()}>
            <button 
              className="popup-close"
              onClick={() => setShowPaymentPopup(false)}
              aria-label="Close payment"
            >
              &times;
            </button>
            <h3>Municipality Bill Payment</h3>
            <form onSubmit={handlePaymentSubmit}>
              <div className="form-group">
                <label>Account Number</label>
                <input 
                  type="text" 
                  value={paymentInfo.accountNumber}
                  onChange={(e) => setPaymentInfo({...paymentInfo, accountNumber: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input 
                  type="number" 
                  value={paymentInfo.amount}
                  onChange={(e) => setPaymentInfo({...paymentInfo, amount: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Receipt To</label>
                <input 
                  type="email" 
                  value={paymentInfo.email}
                  onChange={(e) => setPaymentInfo({...paymentInfo, email: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="payment-submit-btn">
                Pay via Wish Money
              </button>
            </form>
            <div className="payment-help">
              <p>Need help? Call (123) 456-7890</p>
            </div>
          </div>
        </div>
      )}

      <div className="services-button-container">
        <Link to="/services" className="services-cta-button">
          View All Services
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
}