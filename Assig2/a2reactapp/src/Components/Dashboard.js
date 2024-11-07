import React, { useEffect, useState } from 'react';
import './MainStylesheet.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import SuburbFilter from './DashboardFilters/SuburbFilter'

function Dashboard() {
    const [cameraSuburbs, setCameraSuburbs] = useState([]);
    const [selectedSuburb, setSuburb] = useState();

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/LocationReport');
    };

    const handleSuburbFilter = (selectedSuburb) => {
        setSuburb(selectedSuburb);
    }

    useEffect(() => {
        fetch(`http://localhost:5147/api/Get_ListCameraSuburbs`)
            .then(response => response.json())
            .then(data => {
                setCameraSuburbs(data);
            })
    }, [])

  return (
      <div className="dashboard">
        <Navbar />

          <div className="dashboard-content">
              <div className="rectangle">
                  <h3 className="dashboard-title">Dashboard Title</h3>

                  <div className="dropdown-section">
                      <SuburbFilter suburbChangeFunction={handleSuburbFilter} SuburbList={ cameraSuburbs } />
                      <select className="dropdown">
                          <option value="option1">Dropdown 2</option>
                      </select>
                      <select className="dropdown">
                          <option value="option1">Dropdown 3</option>
                      </select>
                      <select className="dropdown">
                          <option value="option1">Dropdown/Text Search?</option>
                      </select>
                  </div>

                  <div className="scrollable-list">
                      <ul>
                          {Array.from({ length: 8 }, (_, index) => (
                              <li key={index}>List Item {index + 1}</li>
                          ))}
                      </ul>
                  </div>

                  <div className="button-container">
                      <button onClick={handleButtonClick}>Generate Report</button>
                  </div>

              </div>
              {/*Debug*/}
              <p>Suburb: {selectedSuburb}</p>
          </div>
      </div>
  );
}

export default Dashboard;
