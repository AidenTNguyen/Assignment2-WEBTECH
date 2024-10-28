import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import coatOfArms from '../coatOfArms.png';
import './LoginPageStyle.css'

function RegisterPage() {
    return (
      // Reusing the login style so i dont have to create new ones just to replicate the current login page ones
      <div className="LoginPage">
          <div className="login-container">
              <form>
                  <img src={coatOfArms} alt="SAPOL coat of arms" />
                  <h3>Login</h3>

                  <label for="username">Username</label>
                  <input type="text" placeholder="Username" id="username" />

                  <label for="username">Password</label>
                  <input type="password" placeholder="Password" id="password" />

                  <hr />
                  <button>Log In</button>
              </form>
          </div>
      </div>
  );
}

export default RegisterPage;
