import { useState } from 'react';
import './ServicesPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import wishMoneyLogo from '../assets/image12.png';

export default function ServicesPage() {
  const [showPotholePopup, setShowPotholePopup] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [potholeData, setPotholeData] = useState({
    location: '',
    description: '',
    image: null
  });

  const [showPermitPopup, setShowPermitPopup] = useState(false);
  const [permitData, setPermitData] = useState({
    type: 'residential',
    address: '',
    projectDescription: '',
    documents: [],
    contactEmail: ''
  });

  const [showTaxPopup, setShowTaxPopup] = useState(false);
  const [taxData, setTaxData] = useState({
    parcelNumber: '',
    ownerName: '',
    paymentAmount: '',
    email: ''
  });

  const [showServiceRequestPopup, setShowServiceRequestPopup] = useState(false);
  const [serviceRequestData, setServiceRequestData] = useState({
    serviceType: '',
    location: '',
    description: '',
    contactInfo: '',
    urgency: 'medium'
  });

  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    feedbackType: 'general',
    message: '',
    contactEmail: '',
    rating: null,
    allowContact: false
  });

  const [activeCategory, setActiveCategory] = useState('all');

  // Handlers
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setPotholeData({...potholeData, image: file});
    }
  };

  const handlePotholeSubmit = (e) => {
    e.preventDefault();
    console.log('Pothole report:', potholeData);
    alert('Pothole report submitted successfully!');
    setShowPotholePopup(false);
    setPotholeData({location: '', description: '', image: null});
    setImagePreview(null);
  };

  const handlePermitSubmit = (e) => {
    e.preventDefault();
    console.log('Permit application:', permitData);
    alert('Permit application submitted successfully!');
    setShowPermitPopup(false);
    setPermitData({
      type: 'residential',
      address: '',
      projectDescription: '',
      documents: [],
      contactEmail: ''
    });
  };

  const handleFileUpload = (e) => {
    setPermitData({
      ...permitData,
      documents: [...permitData.documents, ...Array.from(e.target.files)]
    });
  };

  const handleServiceRequestSubmit = (e) => {
    e.preventDefault();
    console.log('Service request submitted:', serviceRequestData);
    alert('Your service request has been submitted successfully!');
    setShowServiceRequestPopup(false);
    setServiceRequestData({
      serviceType: '',
      location: '',
      description: '',
      contactInfo: '',
      urgency: 'medium'
    });
  };

  const handleTaxSubmit = (e) => {
    e.preventDefault();
    const wishMoneyUrl = `https://payment.whish.money/?municipality=yourcity&service=property_tax&parcel=${taxData.parcelNumber}&amount=${taxData.paymentAmount}&email=${encodeURIComponent(taxData.email)}&name=${encodeURIComponent(taxData.ownerName)}`;
    window.open(wishMoneyUrl, '_blank');
    setShowTaxPopup(false);
    setTaxData({
      parcelNumber: '',
      ownerName: '',
      paymentAmount: '',
      email: ''
    });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedbackData);
    alert('Thank you for your feedback! We appreciate your input.');
    setShowFeedbackPopup(false);
    setFeedbackData({
      feedbackType: 'general',
      message: '',
      contactEmail: '',
      rating: null,
      allowContact: false
    });
  };

  // Service Data
  const serviceCategories = {
    all: 'All Services',
    reporting: 'Reporting Issues',
    permits: 'Permits & Applications',
    payments: 'Payments',
    community: 'Community',
    feedback: 'Feedback & Support'
  };

  const allServices = [
    {
      id: 1,
      title: "Report a Pothole",
      icon: "🚧",
      description: "Report road damage for quick repair",
      category: "reporting",
      action: () => setShowPotholePopup(true)
    },
    {
      id: 2,
      title: "Apply For a Building Permit",
      icon: "🏗️",
      description: "Apply for necessary permits for construction",
      category: "permits",
      action: () => setShowPermitPopup(true)
    },
    {
      id: 3,
      title: "Pay Property Taxes",
      icon: "💰",
      description: "Pay your property taxes online securely",
      category: "payments",
      action: () => setShowTaxPopup(true)
    },
    {
      id: 4,
      title: "Explore Community Events",
      icon: "🎪",
      description: "Discover upcoming community events and activities",
      category: "community",
      link: "/events"
    },
    {
      id: 5,
      title: "Request a Service",
      icon: "🛠️",
      description: "Request any municipal service you need",
      category: "reporting",
      action: () => setShowServiceRequestPopup(true)
    },
    {
      id: 6,
      title: "Submit Feedback",
      icon: "💬",
      description: "Share your feedback to help us improve",
      category: "feedback",
      action: () => setShowFeedbackPopup(true)
    },
    {
      id: 7,
      title: "Utility Bills",
      icon: "💧",
      description: "Pay water, electricity, and other utility bills",
      category: "payments",
      action: () => setShowTaxPopup(true)
    },
    {
      id: 8,
      title: "Park Reservations",
      icon: "🌳",
      description: "Reserve parks and recreational facilities",
      category: "community",
      link: "/parks"
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);

  return (
    <div className="services-page">
      <Header />
      
      <main className="services-main">
        {/* Hero Section */}
        <section className="services-hero">
          <div className="hero-content">
            <h1>Municipal Services</h1>
            <p>Access all municipal services in one convenient place. Quick, easy, and designed for your convenience.</p>
          </div>
          <div className="hero-graphics">
            <div className="floating-icon">🏛️</div>
            <div className="floating-icon">🔧</div>
            <div className="floating-icon">💰</div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="services-categories">
          <div className="categories-container">
            {Object.entries(serviceCategories).map(([key, label]) => (
              <button
                key={key}
                className={`category-btn ${activeCategory === key ? 'active' : ''}`}
                onClick={() => setActiveCategory(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-grid-section">
          <div className="services-grid">
            {filteredServices.map(service => (
              service.action ? (
                <button 
                  key={service.id} 
                  className="service-card"
                  onClick={service.action}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-cta">Get Started →</span>
                </button>
              ) : (
                <a href={service.link} key={service.id} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-cta">Explore →</span>
                </a>
              )
            ))}
          </div>
        </section>

       
      </main>

      
      {showPotholePopup && (
        <div className="popup-overlay" onClick={() => setShowPotholePopup(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPotholePopup(false)}>
              &times;
            </button>
            <h2>Report a Pothole</h2>
            <form onSubmit={handlePotholeSubmit}>
              <div className="form-group">
                <label>Location*</label>
                <input
                  type="text"
                  value={potholeData.location}
                  onChange={(e) => setPotholeData({...potholeData, location: e.target.value})}
                  required
                  placeholder="Street name and nearest cross street"
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={potholeData.description}
                  onChange={(e) => setPotholeData({...potholeData, description: e.target.value})}
                  placeholder="Size, depth, or any additional details"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Upload Photo*</label>
                <div className="image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                    id="pothole-image"
                  />
                  <label htmlFor="pothole-image" className="upload-btn">
                    {imagePreview ? 'Change Photo' : 'Select Photo'}
                  </label>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Pothole preview" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowPotholePopup(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Building Permit Popup */}
      {showPermitPopup && (
        <div className="popup-overlay" onClick={() => setShowPermitPopup(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPermitPopup(false)}>
              &times;
            </button>
            <h2>Building Permit Application</h2>
            <form onSubmit={handlePermitSubmit}>
              <div className="form-group">
                <label>Permit Type*</label>
                <select
                  value={permitData.type}
                  onChange={(e) => setPermitData({...permitData, type: e.target.value})}
                  required
                >
                  <option value="residential">Residential Construction</option>
                  <option value="commercial">Commercial Construction</option>
                  <option value="renovation">Renovation</option>
                  <option value="demolition">Demolition</option>
                </select>
              </div>

              <div className="form-group">
                <label>Property Address*</label>
                <input
                  type="text"
                  value={permitData.address}
                  onChange={(e) => setPermitData({...permitData, address: e.target.value})}
                  required
                  placeholder="Full street address"
                />
              </div>

              <div className="form-group">
                <label>Project Description*</label>
                <textarea
                  value={permitData.projectDescription}
                  onChange={(e) => setPermitData({...permitData, projectDescription: e.target.value})}
                  required
                  rows="4"
                  placeholder="Describe the construction work in detail"
                />
              </div>

              <div className="form-group">
                <label>Upload Required Documents*</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="permit-documents"
                    multiple
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    required={permitData.documents.length === 0}
                  />
                  <label htmlFor="permit-documents" className="upload-btn">
                    Select Files
                  </label>
                  {permitData.documents.length > 0 && (
                    <div className="file-list">
                      <p>Selected files:</p>
                      <ul>
                        {permitData.documents.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <p className="file-hint">(PDF, DOC, JPG/PNG - max 10MB each)</p>
              </div>

              <div className="form-group">
                <label>Contact Email*</label>
                <input
                  type="email"
                  value={permitData.contactEmail}
                  onChange={(e) => setPermitData({...permitData, contactEmail: e.target.value})}
                  required
                  placeholder="For permit status updates"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowPermitPopup(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Property Tax Popup */}
      {showTaxPopup && (
        <div className="popup-overlay" onClick={() => setShowTaxPopup(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowTaxPopup(false)}>
              &times;
            </button>
            <h2>Property Tax Payment</h2>
            <div className="wishmoney-header">
              <div className="wishmoney-logo">
                <img src={wishMoneyLogo} alt="Wish Money" />
                <span>Secure Payment Partner</span>
              </div>
            </div>
            <form onSubmit={handleTaxSubmit}>
              <div className="form-group">
                <label>Parcel Number*</label>
                <input
                  type="text"
                  value={taxData.parcelNumber}
                  onChange={(e) => setTaxData({...taxData, parcelNumber: e.target.value})}
                  required
                  placeholder="Enter your property parcel number"
                />
              </div>

              <div className="form-group">
                <label>Owner Name*</label>
                <input
                  type="text"
                  value={taxData.ownerName}
                  onChange={(e) => setTaxData({...taxData, ownerName: e.target.value})}
                  required
                  placeholder="Name as it appears on tax bill"
                />
              </div>

              <div className="form-group">
                <label>Payment Amount ($)*</label>
                <input
                  type="number"
                  value={taxData.paymentAmount}
                  onChange={(e) => setTaxData({...taxData, paymentAmount: e.target.value})}
                  required
                  placeholder="Enter payment amount"
                  min="1"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label>Email for Receipt*</label>
                <input
                  type="email"
                  value={taxData.email}
                  onChange={(e) => setTaxData({...taxData, email: e.target.value})}
                  required
                  placeholder="Your email address"
                />
              </div>

              <div className="payment-info-box">
                <p><i className="fas fa-redo"></i> You can view payment history anytime in your Whish Money account</p>
                <p><i className="fas fa-headset"></i> 24/7 customer support available</p>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowTaxPopup(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn whishmoney-pay-btn">
                  <i className="fas fa-external-link-alt"></i> Pay with Whish Money
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Request Popup */}
      {showServiceRequestPopup && (
        <div className="popup-overlay" onClick={() => setShowServiceRequestPopup(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowServiceRequestPopup(false)}>
              &times;
            </button>
            <h2>Request a Municipal Service</h2>
            <form onSubmit={handleServiceRequestSubmit}>
              <div className="form-group">
                <label>Service Type*</label>
                <select
                  value={serviceRequestData.serviceType}
                  onChange={(e) => setServiceRequestData({...serviceRequestData, serviceType: e.target.value})}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="trash">Trash Collection</option>
                  <option value="water">Water Service</option>
                  <option value="street">Street Maintenance</option>
                  <option value="parks">Parks & Recreation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location*</label>
                <input
                  type="text"
                  value={serviceRequestData.location}
                  onChange={(e) => setServiceRequestData({...serviceRequestData, location: e.target.value})}
                  required
                  placeholder="Where is the service needed?"
                />
              </div>

              <div className="form-group">
                <label>Description*</label>
                <textarea
                  value={serviceRequestData.description}
                  onChange={(e) => setServiceRequestData({...serviceRequestData, description: e.target.value})}
                  required
                  rows="4"
                  placeholder="Please describe the service you need in detail"
                />
              </div>

              <div className="form-group">
                <label>Contact Information*</label>
                <input
                  type="text"
                  value={serviceRequestData.contactInfo}
                  onChange={(e) => setServiceRequestData({...serviceRequestData, contactInfo: e.target.value})}
                  required
                  placeholder="Phone number or email"
                />
              </div>

              <div className="form-group">
                <label>Urgency Level</label>
                <div className="urgency-options">
                  <label>
                    <input
                      type="radio"
                      name="urgency"
                      value="low"
                      checked={serviceRequestData.urgency === 'low'}
                      onChange={() => setServiceRequestData({...serviceRequestData, urgency: 'low'})}
                    />
                    Low (can wait)
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="urgency"
                      value="medium"
                      checked={serviceRequestData.urgency === 'medium'}
                      onChange={() => setServiceRequestData({...serviceRequestData, urgency: 'medium'})}
                    />
                    Medium
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="urgency"
                      value="high"
                      checked={serviceRequestData.urgency === 'high'}
                      onChange={() => setServiceRequestData({...serviceRequestData, urgency: 'high'})}
                    />
                    High (urgent)
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowServiceRequestPopup(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {showFeedbackPopup && (
        <div className="popup-overlay" onClick={() => setShowFeedbackPopup(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowFeedbackPopup(false)}>
              &times;
            </button>
            <h2>Share Your Feedback</h2>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="form-group">
                <label>Feedback Type*</label>
                <select
                  value={feedbackData.feedbackType}
                  onChange={(e) => setFeedbackData({...feedbackData, feedbackType: e.target.value})}
                  required
                >
                  <option value="general">General Feedback</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="complaint">Complaint</option>
                  <option value="praise">Praise</option>
                  <option value="service">Service Specific</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Rating</label>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= feedbackData.rating ? 'filled' : ''}`}
                      onClick={() => setFeedbackData({...feedbackData, rating: star})}
                    >
                      {star <= feedbackData.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Your Message*</label>
                <textarea
                  value={feedbackData.message}
                  onChange={(e) => setFeedbackData({...feedbackData, message: e.target.value})}
                  required
                  rows="5"
                  placeholder="Please share your thoughts, suggestions, or concerns..."
                />
              </div>

              <div className="form-group">
                <label>Email (optional)</label>
                <input
                  type="email"
                  value={feedbackData.contactEmail}
                  onChange={(e) => setFeedbackData({...feedbackData, contactEmail: e.target.value})}
                  placeholder="If you'd like us to follow up with you"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={feedbackData.allowContact}
                    onChange={(e) => setFeedbackData({...feedbackData, allowContact: e.target.checked})}
                  />
                  I'm open to being contacted about this feedback
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowFeedbackPopup(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}