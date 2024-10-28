import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import './MainStylesheet.css';
import Navbar from './Navbar';

function Dashboard() {
  return (
      <div className="dashboard">
        <Navbar />

          <div className="dashboard-content">

          </div>
    </div>
  );
}

export default Dashboard;
