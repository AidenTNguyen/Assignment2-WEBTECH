import React, { useEffect, useState } from 'react';
import './MainStylesheet.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import SuburbFilter from './DashboardFilters/SuburbFilter'
import CameraTypeFilter from './DashboardFilters/CameraTypeFilter';
import DateFilter from './DashboardFilters/DateFilter';

function Dashboard() {
    // First filter (SUBURBS)
    const [cameraSuburbs, setCameraSuburbs] = useState([]);
    const [selectedSuburb, setSuburb] = useState("noSelection");

    // Second filter (CAMERA CODE)
    const [cameraTypes, setCameraTypeData] = useState([]);
    const [selectedCameraType, setCameraType] = useState("noSelection");

    // Third filter (DATE RANGE)
    const [startDate, setStartDate] = useState("noSelection");
    const [endDate, setEndDate] = useState("noSelection");

    // Redirecting
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/LocationReport');
    };

    const handleSuburbFilter = (selectedSuburb) => {
        setSuburb(selectedSuburb);
    }

    const handleCameraFilter = (selectedCameraType) => {
        setCameraType(selectedCameraType)
    }

    const handleStartDateFilter = (selectedStartDate) => {
        setStartDate(selectedStartDate)
    }

    const handleEndDateFilter = (selectedEndDate) => {
        setEndDate(selectedEndDate)
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
                setCameraTypeData(data);
            })
    }, [selectedSuburb])

    useEffect(() => {
        setCameraType("noSelection")
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
                      <DateFilter startDateChangeFunction={handleStartDateFilter} endDateChangeFunction={handleEndDateFilter} selectedCameraType={selectedCameraType} />
                      <select className="dropdown">
                          <option value="option1">Dropdown/Text Search?</option>
                      </select>
                  </div>
                  {/*Debug*/}
                  <text>Suburb: {selectedSuburb}</text>
                  <text>Camera Type: {selectedCameraType.cameraTypeCode ? selectedCameraType.cameraTypeCode : "noSelection"}</text>
                  <text>Start Date: {startDate}</text>
                  <text>End Date: {endDate}</text>

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
