import React from 'react';
import { Link } from 'react-router-dom';
import './MainStylesheet.css';
import coatOfArms from './coatOfArms.png';

function Navbar() {
    return (
        <nav className="navbar">
                <div className="navbar-content">
                    <img src={coatOfArms} alt="SAPOL coat of arms" />
                </div>
        </nav>
    );
}

export default Navbar;