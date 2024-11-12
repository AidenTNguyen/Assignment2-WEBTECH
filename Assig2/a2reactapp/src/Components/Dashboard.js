import React, { useEffect, useState } from 'react';
import './MainStylesheet.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import SuburbFilter from './DashboardFilters/SuburbFilter'
import CameraTypeFilter from './DashboardFilters/CameraTypeFilter';
import DateFilter from './DashboardFilters/DateFilter';
import ExpiationDescFilter from './DashboardFilters/ExpiationDescFilter';

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

    // Fourth filter (EXPIATION DESCRIPTION)
    const [expiationDescription, setExpiationDescription] = useState("noSelection")

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

    const handleExpiationDescriptionFilter = (selectedExpiationDescription) => {
        setExpiationDescription(selectedExpiationDescription)
    }

    const handleFinalSearch = async () => {
        if (selectedSuburb === "noSelection") { // Buncha safety checks although not necessary as the API endpoint has a number of optional parameters...
            alert("Please select a suburb.")
        } else if (selectedCameraType === "noSelection") {
            alert("Please select a camera type")
        } else if (startDate === "noSelection" || endDate === "noSelection") {
            alert("Please enter a valid date range")
        } else if (expiationDescription === "noSelection") {
            alert("Please select an expiation description")
        }

        try {
            let expyResponse = await fetch(`http://localhost:5147/api/Get_ExpiationsForLocationId?locationId=${selectedCameraType.locationId}&cameraTypeCode=${selectedCameraType.cameraTypeCode}&startTime=${startDate}&endTime=${endDate}&offenceCodes=${expiationDescription}`);
            let expyData = await expyResponse.json();

            console.log('Search Results:', expyData);

            navigate('/LocationReport');
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
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

  return (
      <div className="dashboard">
        <Navbar />

          <div className="dashboard-content">
              <div className="rectangle">
                  <h3 className="dashboard-title">Suitable MPDC Locations</h3>

                  <div className="dropdown-section">
                      <SuburbFilter suburbChangeFunction={handleSuburbFilter} suburbList={cameraSuburbs} />
                      <CameraTypeFilter cameraChangeFunction={handleCameraFilter} cameraTypeList={cameraTypes} />
                      <DateFilter startDateChangeFunction={handleStartDateFilter} endDateChangeFunction={handleEndDateFilter} />
                      <ExpiationDescFilter expiationDescriptionChangeFunction={handleExpiationDescriptionFilter} />
                  </div>

                  <div id="searchButton" className="button-container btn-btn-danger" style={{ justifyContent: "center" }} onClick={handleFinalSearch}>
                      <button>Search</button>
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
          </div>
      </div>
  );
}

export default Dashboard;
