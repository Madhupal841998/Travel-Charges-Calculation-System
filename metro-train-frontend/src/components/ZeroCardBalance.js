import React, { useState } from 'react';
import axios from 'axios';
import './ZeroCardBalance.css';

const ZeroCardBalance = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/zerocard/${cardNumber}`);
      setBalance(response.data.balance);
      setMessage('');
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'An error occurred');
      setBalance(null);
    }
  };

  return (
    <div className="zero-card-balance-container">
      <h2 className="zero-card-balance-header">Check ZeroCard Balance</h2>
      <form onSubmit={handleSubmit} className="balance-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
        </div>
        <button type="submit" className="check-balance-button">Check Balance</button>
      </form>
      {balance !== null && <p className="balance-text">Balance: {balance}</p>}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ZeroCardBalance;
