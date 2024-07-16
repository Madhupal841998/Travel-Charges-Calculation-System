import React, { useState } from 'react';
import axios from 'axios';
import './CreateZeroCard.css';

const CreateZeroCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/zerocard', { cardNumber, balance: parseFloat(balance) });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  return (
    <div className="create-card-container">
      <h2 className="create-card-header">Create ZeroCard</h2>
      <form onSubmit={handleSubmit} className="create-card-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="balance">Balance:</label>
          <input type="number" id="balance" value={balance} onChange={(e) => setBalance(e.target.value)} required />
        </div>
        <button type="submit" className="create-card-button">Create ZeroCard</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateZeroCard;
