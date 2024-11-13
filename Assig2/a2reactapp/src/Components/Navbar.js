import React from 'react';
import { Link } from 'react-router-dom';
import './MainStylesheet.css';
import coatOfArms from './coatOfArms.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthenticationProvider';

function Navbar() {
    const { isLoggedIn, login, logout } = useAuth();

    const navigate = useNavigate();

    const dashboardRedirect = () => {
        if (isLoggedIn === false) {
            alert("You are not logged in.")
        } else {
            navigate('/Dashboard');
        }
    };

    const reportRedirect = () => {
        if (isLoggedIn === false) {
            alert("You are not logged in.")
        } else {
            navigate('/LocationReport');
        }
    };

    return (
        <nav className="navbar">
                <div className="navbar-content">
                    <img src={coatOfArms} alt="SAPOL coat of arms" className="navbar-image" />
                    <div className="navbar-text">
                        <h4>SOUTH AUSTRALIA POLICE</h4>
                        <h6>GO HARD OR GO HOME</h6>
                    </div>
            </div>

            <div className="navbar-buttons">
                <button onClick={dashboardRedirect} className="navbar-button">Dashboard</button>
                <button onClick={reportRedirect} className="navbar-button">Report</button>
            </div>

        </nav>
    );
}

export default Navbar;