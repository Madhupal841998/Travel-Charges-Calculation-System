import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import JourneyForm from "./components/JourneyForm";
import CollectionSummary from "./components/CollectionSummary";
import PassengerSummary from "./components/PassengerSummary";
import CreateZeroCard from "./components/CreateZeroCard";
import ZeroCardBalance from "./components/ZeroCardBalance";
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="header">Metro Train System</h1>
      <Router>
        <nav className="nav-bar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Create Journey
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/collection-summary" className="nav-link">
                Collection Summary
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/passenger-summary" className="nav-link">
                Passenger Summary
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create-zerocard" className="nav-link">
                <FaCreditCard className="icon" /> Create ZeroCard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/zerocard-balance" className="nav-link">
                <FaMoneyBill className="icon" /> Check ZeroCard Balance
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/create-zerocard" element={<CreateZeroCard />} />
          <Route path="/zerocard-balance" element={<ZeroCardBalance />} />
          <Route path="/" element={<JourneyForm />} />
          <Route path="/collection-summary" element={<CollectionSummary />} />
          <Route path="/passenger-summary" element={<PassengerSummary />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
