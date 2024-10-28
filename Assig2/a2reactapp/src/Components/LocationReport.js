import React, { useState } from 'react';
import SHA256 from 'crypto-js/sha256';
import Navbar from './Navbar';
import './MainStylesheet.css';
import { useNavigate } from 'react-router-dom';

function LocationReport() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/Dashboard');
    };

    return (
        <div className="location-report">
            <Navbar />
            <div className="report-contents">
                <div className="scrollable-box">

                    <h2>Report Content</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </p>

                    <p>
                        Content line 1<br />
                        Content line 2<br />
                        Content line 3<br />
                        Content line 4<br />
                        Content line 5<br />
                        Content line 6<br />
                        Content line 7<br />
                        Content line 8<br />
                        Content line 9<br />
                        Content line 10<br />
                        Content line 11<br />
                        Content line 12<br />
                        Content line 13<br />
                        Content line 14<br />
                        Content line 15<br />
                        Content line 16<br />
                        Content line 17<br />
                        Content line 18<br />
                        Content line 19<br />
                        Content line 20<br />
                    </p>
                    <div className="button-container">
                        <button onClick={handleButtonClick}>Return to the Dashboard</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationReport;
