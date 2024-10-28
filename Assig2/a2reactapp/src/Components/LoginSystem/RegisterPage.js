import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import coatOfArms from '../coatOfArms.png';
import './LoginPageStyle.css'

function RegisterPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

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
              <form>
                  <img src={coatOfArms} alt="SAPOL coat of arms" />
                  <h3>Register</h3>

                  <label for="username">Username</label>
                  <input type="text" placeholder="Username" id="username" />

                    <label for="username">Password</label>
                    <input type="password" placeholder="Password" id="password" value={password} onChange={handlePasswordChange} />

                    <label for="username">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" id="passwordConfirmation" value={confirmPassword} onChange={handleConfirmPasswordChange} />

                    {error && <p className="error-message">{error}</p>} {/*Only if there is an error*/}

                  <hr />
                  <button>Register</button>
              </form>
          </div>
      </div>
  );
}

export default RegisterPage;
