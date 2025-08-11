import React, { useState } from 'react';
import './ReportIssue.css';
import Header from './Header';
import Footer from './Footer';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'general',
    location: '',
    description: '',
    urgency: 'medium',
    attachments: null
  });

  const issueTypes = [
    { value: 'road', label: 'Road Maintenance' },
    { value: 'parks', label: 'Parks & Recreation' },
    { value: 'utilities', label: 'Public Utilities' },
    { value: 'noise', label: 'Noise Complaint' },
    { value: 'safety', label: 'Public Safety' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Issue reported:', formData);
    alert('Thank you for your report! Case #' + Math.floor(Math.random() * 10000));
  };

  return (
    <div className="app">
      <Header />
      
      <main className="report-issue-container">
        <section className="issue-hero">
          <div className="hero-content">
            <i className="fas fa-exclamation-triangle hero-icon" style={{
              fontSize: '4rem',
              color: '#fff',
              marginBottom: '1rem'
            }}></i>
            <h1>Report a Community Issue</h1>
            <p>Help us keep our municipality running smoothly</p>
          </div>
        </section>

        <section className="issue-form-section">
          <div className="form-container">
            <h2><i className="fas fa-edit"></i> Issue Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="issueType">Issue Type</label>
                  <select 
                    id="issueType" 
                    name="issueType" 
                    value={formData.issueType}
                    onChange={handleChange}
                    required
                  >
                    {issueTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="urgency">Urgency Level</label>
                  <select 
                    id="urgency" 
                    name="urgency" 
                    value={formData.urgency}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High (Immediate Danger)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  placeholder="Address or nearest intersection"
                  value={formData.location}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows="5"
                  placeholder="Please provide detailed information..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="attachments">Upload Photo (Optional)</label>
                <input 
                  type="file" 
                  id="attachments" 
                  name="attachments"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <i className="fas fa-paper-plane"></i> Submit Report
                </button>
              </div>
            </form>
          </div>

          <div className="info-sidebar">
            <h3><i className="fas fa-info-circle"></i> Reporting Guidelines</h3>
            <ul>
              <li>Provide accurate location information</li>
              <li>Include clear photos when possible</li>
              <li>Emergency issues? Call 911 immediately</li>
              <li>Typical response time: 3-5 business days</li>
            </ul>
            
            <div className="contact-box">
              <h4>Need Immediate Assistance?</h4>
              <p>Municipal Services Hotline:</p>
              <a href="tel:+15551234567" className="emergency-contact">
                <i className="fas fa-phone"></i> (555) 123-4567
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReportIssue;