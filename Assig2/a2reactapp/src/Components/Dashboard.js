import React, { useEffect, useState } from 'react';
import './MainStylesheet.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import SuburbFilter from './DashboardFilters/SuburbFilter'
import CameraTypeFilter from './DashboardFilters/CameraTypeFilter';

function Dashboard() {
    const [cameraSuburbs, setCameraSuburbs] = useState([]);
    const [selectedSuburb, setSuburb] = useState("noSelection");

    const [cameraTypes, setCameraTypeData] = useState([]);
    const [selectedCameraType, setCameraType] = useState("noSelection");

    // Redirecting
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/LocationReport');
    };

    const handleSuburbFilter = (selectedSuburb) => {
        setSuburb(selectedSuburb);
    }

    const handleCameraFilter = (selectedCameraType) => {
        setCameraType(selectedCameraType);
    }


    // Fetches
    useEffect(() => {
        fetch(`http://localhost:5147/api/Get_ListCameraSuburbs`)
            .then(response => response.json())
            .then(data => {
                setCameraSuburbs(data);
            })
    }, [])

    useEffect (() => {
        fetch(`http://localhost:5147/api/Get_ListCamerasInSuburb?suburb=${selectedSuburb}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCameraTypeData(data);
            })
    }, [selectedSuburb])

  return (
      <div className="dashboard">
        <Navbar />

          <div className="dashboard-content">
              <div className="rectangle">
                  <h3 className="dashboard-title">Dashboard Title</h3>

                  <div className="dropdown-section">
                      <SuburbFilter suburbChangeFunction={handleSuburbFilter} suburbList={cameraSuburbs} />
                      <CameraTypeFilter cameraChangeFunction={handleCameraFilter} cameraTypeList={cameraTypes} />
                      <select className="dropdown">
                          <option value="option1">Dropdown 3</option>
                      </select>
                      <select className="dropdown">
                          <option value="option1">Dropdown/Text Search?</option>
                      </select>
                  </div>
                  {/*Debug*/}
                  <p>Suburb: {selectedSuburb}</p>
                  <p>Camera Type: {selectedCameraType}</p>

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
          </div>
      </div>
  );
}

export default Dashboard;
