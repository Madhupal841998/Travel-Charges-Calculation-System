import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CollectionSummary.css';

const CollectionSummary = () => {
  const [summary, setSummary] = useState({ totalCollected: 0, totalDiscount: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await axios.get('http://localhost:4000/summary/collection');
      setSummary(response.data);
    };

    fetchSummary();
  }, []);

  return (
    <div className="summary-container">
      <h2 className="summary-header">Collection Summary</h2>
      <p className="summary-text">Total Collected: {summary.totalCollected}</p>
      <p className="summary-text">Total Discount: {summary.totalDiscount}</p>
    </div>
  );
};

export default CollectionSummary;
