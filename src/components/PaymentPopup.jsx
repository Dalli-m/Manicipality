import React, { useState } from 'react';
import './PaymentPopup.css';

const PaymentPopup = ({ onClose }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    accountNumber: '',
    amount: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would connect to your payment gateway API
    window.open(`https://payment.wish.money/?municipality=yourcity&account=${paymentInfo.accountNumber}&amount=${paymentInfo.amount}`);
  };

  return (
    <div className="popup-overlay">
      <div className="payment-popup">
        <button className="popup-close" onClick={onClose}>×</button>
        <h3>Municipality Bill Payment</h3>
        <form onSubmit={handleSubmit}>
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
  );
};

export default PaymentPopup;