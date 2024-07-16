import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PassengerSummary.css';

const PassengerSummary = () => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await axios.get('http://localhost:4000/summary/passenger');
      setPassengers(response.data);
    };

    fetchSummary();
  }, []);

  return (
    <div className="passenger-summary-container">
      <h2 className="passenger-summary-header">Passenger Summary</h2>
      <ul className="passenger-list">
        {passengers.map((passenger) => (
          <li key={passenger.type} className="passenger-item">
            {passenger.type}: {passenger.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PassengerSummary;
