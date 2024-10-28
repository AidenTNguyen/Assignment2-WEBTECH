import React from 'react';
import { Link } from 'react-router-dom';
import './MainStylesheet.css';
import coatOfArms from './coatOfArms.png';

function Navbar() {
    return (
        <nav className="navbar">
                <div className="navbar-content">
                    <img src={coatOfArms} alt="SAPOL coat of arms" className="navbar-image" />
                    <div className="navbar-text">
                        <h4>SOUTH AUSTRALIA POLICE</h4>
                        <h6>GO HARD OR GO HOME</h6>
                    </div>
                </div>
        </nav>
    );
}

export default Navbar;