import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import coatOfArms from '../coatOfArms.png';
import './LoginPageStyle.css'
import { Link } from 'react-router-dom'

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
                  <input type="password" placeholder="Password" id="password" />

                  <hr />
                  <button>Log In</button>
                  <p>Dont have an account? Register <Link to="/RegisterPage">here!</Link></p>
              </form>
          </div>
    </div>
  );
}

export default LoginPage;
