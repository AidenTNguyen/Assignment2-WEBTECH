import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import coatOfArms from '../coatOfArms.png';
import './LoginPage.css'

function LoginPage() {
  return (
    <div className="LoginPage">
        <div className="login-container">
              <form>
              <img src={coatOfArms} alt="SAPOL coat of arms" />
                  <h3>Login</h3>

                  <label for="username">Username</label>
                  <input type="text" placeholder="Username" id="username" />

                  <label for="username">Password</label>
                  <input type="text" placeholder="Password" id="password" />

                  <button>Log In</button>
              </form>
          </div>
    </div>
  );
}

export default LoginPage;
