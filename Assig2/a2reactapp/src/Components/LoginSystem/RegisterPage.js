import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import coatOfArms from '../coatOfArms.png';
import './LoginPageStyle.css'

function RegisterPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    return (
      // Reusing the login style so i dont have to create new ones just to replicate the current login page ones
      <div className="LoginPage">
          <div className="login-container">
              <form>
                  <img src={coatOfArms} alt="SAPOL coat of arms" />
                  <h3>Register</h3>

                  <label for="username">Username</label>
                  <input type="text" placeholder="Username" id="username" />

                  <label for="username">Password</label>
                  <input type="password" placeholder="Password" id="password" />

                  <label for="username">Confirm Password</label>
                  <input type="password" placeholder="Confirm Password" id="passwordConfirmation" />

                  <hr />
                  <button>Register</button>
              </form>
          </div>
      </div>
  );
}

export default RegisterPage;
