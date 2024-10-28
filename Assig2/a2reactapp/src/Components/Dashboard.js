import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import './MainStylesheet.css';
import Navbar from './Navbar';

function Dashboard() {
  return (
      <div className="dashboard">
        <Navbar />

          <div className="dashboard-content">
              <div className="rectangle">
                  <h3 className="dashboard-title">Dashboard Title</h3>

                  <div className="dropdown-section">
                      <select className="dropdown">
                          <option value="option1">Option 1</option>
                      </select>
                      <select className="dropdown">
                          <option value="option1">Option 1</option>
                      </select>
                      <select className="dropdown">
                          <option value="option1">Option 1</option>
                      </select>
                  </div>

                  <div className="scrollable-list">
                      <ul>
                          {Array.from({ length: 8 }, (_, index) => (
                              <li key={index}>List Item {index + 1}</li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
    </div>
  );
}

export default Dashboard;
