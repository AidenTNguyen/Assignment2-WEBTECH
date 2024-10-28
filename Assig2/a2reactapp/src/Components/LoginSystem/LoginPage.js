import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import coatOfArms from '../coatOfArms.png';
import './LoginPageStyle.css'
import { Link } from 'react-router-dom'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (username) => {
        setUsername(username.target.value);
    };

    const handlePasswordChange = (password) => {
        setPassword(password.target.value);
    };

    return (
        <div className="LoginPage">
            <div className="login-container">
                  <form>
                  <img src={coatOfArms} alt="SAPOL coat of arms" />
                      <h3>Login</h3>

                      <label htmlFor="username">Username</label>
                      <input type="text" placeholder="Username" id="username" value={username} onChange={handleUsernameChange} />

                      <label htmlFor="username">Password</label>
                    <input type="password" placeholder="Password" id="password" value={password} onChange={handlePasswordChange} />

                      <hr />
                      <button>Log In</button>
                      <p>Dont have an account? Register <Link to="/RegisterPage">here!</Link></p>
                  </form>
              </div>
        </div>
  );
}

export default LoginPage;
