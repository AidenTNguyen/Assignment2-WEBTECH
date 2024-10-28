import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import coatOfArms from '../coatOfArms.png';
import './LoginPageStyle.css'

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();

        if (username === '' && password === '') {
            alert('Please enter your details');
        }

        else if (error !== '' ||  password === '') {
            alert("Please enter a valid password");
        }

        else if (username === '') {
            alert("Please enter a username")
        }
        /*fetch(`http://localhost:5147/api/Register?userName=${username}&passwordHash=${password}`)*/
    }

    const handleUsernameChange = (username) => {
        setUsername(username.target.value);
    };

    const handlePasswordChange = (password) => {
        setPassword(password.target.value);
    };

    const handleConfirmPasswordChange = (passwordConfirm) => {
        setConfirmPassword(passwordConfirm.target.value);
        checkPasswords(password, passwordConfirm.target.value);
    };

    const checkPasswords = (pass, confirmPass) => {
        if (pass === '' && confirmPass === '') {
            setError('');
        }
        if (pass !== confirmPass) {
            setError('Passwords do not match.');
        } else {
            setError('');
        }
    };

    return (
      // Reusing the login style so i dont have to create new ones just to replicate the current login page ones
      <div className="LoginPage">
          <div className="login-container">
                <form onSubmit={handleRegister}>
                  <img src={coatOfArms} alt="SAPOL coat of arms" />
                  <h3>Register</h3>

                  <label for="username">Username</label>
                    <input type="text" placeholder="Username" id="username" alue={username} onChange={handleUsernameChange} />

                    <label for="username">Password</label>
                    <input type="password" placeholder="Password" id="password" value={password} onChange={handlePasswordChange} />

                    <label for="username">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" id="passwordConfirmation" value={confirmPassword} onChange={handleConfirmPasswordChange} />

                    {error && <p className="error-message">{error}</p>} {/*Only if there is an error*/}

                  <hr />
                    <button type="submit">Register</button>
              </form>
          </div>
      </div>
  );
}

export default RegisterPage;
