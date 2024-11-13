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
    const [expiationDescription, setExpiationDescription] = useState([""]);

    const [finalResults, setFinalResults] = useState([]);

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
        // Safety checks before starting the search
        if (selectedSuburb === "noSelection") {
            alert("Please select a suburb.");
            return;
        } else if (selectedCameraType === "noSelection") {
            alert("Please select a camera type");
            return;
        } else if (startDate === "noSelection" || endDate === "noSelection") {
            alert("Please enter a valid date range");
            return;
        } else if (expiationDescription.length <= 0) {
            alert("Please select an expiation description");
            return;
        }

        const locationId = selectedCameraType.locationId;
        const cameraTypeCode = selectedCameraType.cameraTypeCode;
        const offenceCodes = expiationDescription;
        const startTime = startDate;
        const endTime = endDate;

        try {
            // Fetch the expiations data
            let expyResponse = await fetch(`http://localhost:5147/api/Get_ExpiationsForLocationId?locationId=${locationId}&cameraTypeCode=${cameraTypeCode}&startTime=${startTime}&endTime=${endTime}&offenceCodes=${offenceCodes}`);
            let expyData = await expyResponse.json();

            // Fetch the camera data
            let cameraResponse = await fetch(`http://localhost:5147/api/Get_ListCamerasInSuburb?suburb=${selectedSuburb}`);
            let cameraData = await cameraResponse.json();

            // Combine expiation data with camera data
            let combinedData = expyData.map(exp => {
                let matchingCamera = cameraData.find(camera => camera.locationId === exp.cameraLocationId && camera.cameraTypeCode === exp.cameraTypeCode);
                if (matchingCamera) {
                    return { ...exp, cameraInfo: matchingCamera };
                }
                return exp;
            });

            // Log the combined data before setting state to ensure it's correct
            console.log("Combined Data:", combinedData);

            // Set the final results to state
            setFinalResults(combinedData);

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
