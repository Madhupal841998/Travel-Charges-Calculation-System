import React, { useState } from 'react';
import axios from 'axios';
import './JourneyForm.css';

const JourneyForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [isReturnJourney, setIsReturnJourney] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/journey', {
        cardNumber,
        ageGroup,
        isReturnJourney,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="journey-form">
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="ageGroup">Age Group:</label>
        <select
          id="ageGroup"
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
          required
        >
          <option value="">Select Age Group</option>
          <option value="KID">Kid</option>
          <option value="ADULT">Adult</option>
          <option value="SENIOR_CITIZEN">Senior Citizen</option>
        </select>
      </div>
      <div className="form-group">
        <label>
        Return Journey
          <input
            type="checkbox"
            checked={isReturnJourney}
            onChange={(e) => setIsReturnJourney(e.target.checked)}
          />{' '}
          
        </label>
      </div>
      <button type="submit" className="submit-button">Submit</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default JourneyForm;
