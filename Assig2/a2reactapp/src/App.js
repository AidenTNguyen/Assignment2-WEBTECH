import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import LoginPage from './Components/LoginSystem/LoginPage';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { AuthenticationProvider } from './Components/AuthenticationProvider';

function App() {
  return (
      <div className="App">
          <div className="App-header">

              <AuthenticationProvider>
                  <Navbar />
                  <Outlet />
              </AuthenticationProvider>

          </div>

      </div>
  );
}

export default App;
