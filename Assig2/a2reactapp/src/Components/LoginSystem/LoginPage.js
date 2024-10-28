import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import coatOfArms from '../coatOfArms.png';
import './LoginPageStyle.css'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (username) => {
        setUsername(username.target.value);
    };

    const handlePasswordChange = (password) => {
        setPassword(password.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();

        if (username === '' && password === '') {
            alert('Please enter your details');
            return;
        }

        else if (password === '') {
            alert("Please enter a password");
            return;
        }

        else if (username === '') {
            alert("Please enter a username");
            return;
        }

        const hashedPassword = (SHA256(password));

        fetch(`http://localhost:5147/api/Login?userName=${username}&passwordHash=${hashedPassword}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data === true) {
                    navigate('/Dashboard');
                } else {
                    setError('Username or Password do not match!');
                }
            });
    }

    return (
        <div className="LoginPage">
            <div className="login-container">
                <form onSubmit={handleLogin}>
                  <img src={coatOfArms} alt="SAPOL coat of arms" />
                      <h3>Login</h3>

                      <label htmlFor="username">Username</label>
                      <input type="text" placeholder="Username" id="username" value={username} onChange={handleUsernameChange} />

                      <label htmlFor="username">Password</label>
                    <input type="password" placeholder="Password" id="password" value={password} onChange={handlePasswordChange} />

                    {error && <p className="error-message">{error}</p>} {/*Only if there is an error*/}

                      <hr />
                      <button type="submit">Log In</button>
                      <p>Dont have an account? Register <Link to="/RegisterPage">here!</Link></p>
                  </form>
              </div>
        </div>
  );
}

export default LoginPage;
