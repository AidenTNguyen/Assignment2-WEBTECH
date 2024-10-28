import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import LoginPage from './Components/LoginSystem/LoginPage';

function App() {
  return (
      <div className="App">
          <div className="App-header">
              <LoginPage />

              <footer>SAPOL @2024</footer>
          </div>

    </div>
  );
}

export default App;
