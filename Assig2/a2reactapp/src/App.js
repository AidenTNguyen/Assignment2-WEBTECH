import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import LoginPage from './Components/LoginSystem/LoginPage';
import { Outlet } from 'react-router-dom';

function App() {
  return (
      <div className="App">
          <div className="App-header">
              <Outlet />

              <footer>SAPOL @2024</footer>
          </div>

      </div>
  );
}

export default App;
