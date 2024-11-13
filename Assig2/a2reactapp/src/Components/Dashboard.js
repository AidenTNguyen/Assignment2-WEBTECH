import React, { useEffect, useState } from 'react';
import './MainStylesheet.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import SuburbFilter from './DashboardFilters/SuburbFilter'
import CameraTypeFilter from './DashboardFilters/CameraTypeFilter';
import DateFilter from './DashboardFilters/DateFilter';
import ExpiationDescFilter from './DashboardFilters/ExpiationDescFilter';

// For the easiest testing just select "Adelaide" -> Intersection or Mobile -> end of 2023 to march-ish 2024 i set the min and max so its hard to miss -> very top option for offence code A001

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

    // Handle location selection
    const [selectedCount, setSelectedCount] = useState(0); // Track the number of selected checkboxes
    const [selectedLocations, setselectedLocations] = useState(new Set()); // Store the selected checkboxes

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

    const handleCheckboxChange = (index) => {
        const newselectedLocations = new Set(selectedLocations);
        if (newselectedLocations.has(index)) {
            newselectedLocations.delete(index); // Deselect
            setSelectedCount(selectedCount - 1);
        } else if (selectedCount < 2) {
            newselectedLocations.add(index); // Select
            setSelectedCount(selectedCount + 1);
        }
        setselectedLocations(newselectedLocations);
    };


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
                      <table>
                          <thead>
                              <tr>
                                  <th>Location (Suburb, Road Name, Road Type)</th>
                                  <th>Total Fee Amount</th>
                                  <th>Driver State</th>
                                  <th>Incident Start Date</th>
                                  <th>Select</th> {/* New column for checkboxes */}
                              </tr>
                          </thead>
                          <tbody>
                              {finalResults.length > 0 ? (
                                  finalResults.map((result, index) => (
                                      <tr key={index}>
                                          <td>
                                              {result.cameraInfo?.suburb && result.cameraInfo?.roadName && result.cameraInfo?.roadType
                                                  ? `${result.cameraInfo.suburb}, ${result.cameraInfo.roadName}, ${result.cameraInfo.roadType}`
                                                  : "N/A"}
                                          </td>
                                          <td>{result.totalFeeAmt !== null ? `$${result.totalFeeAmt}` : "N/A"}</td>
                                          <td>{result.driverState || "N/A"}</td>
                                          <td>{result.incidentStartDate || "N/A"}</td>
                                          <td>
                                              <input
                                                  type="checkbox"
                                                  checked={selectedLocations.has(index)}
                                                  onChange={() => handleCheckboxChange(index)}
                                                  disabled={selectedCount >= 2 && !selectedLocations.has(index)} // Disable if 2 are already selected
                                              />
                                          </td>
                                      </tr>
                                  ))
                              ) : (
                                  <tr className="no-results">
                                      <td colSpan="5">No results found.</td>
                                  </tr>
                              )}
                          </tbody>
                      </table>
                  </div>

                  <div className="button-container">
                      <button
                          onClick={handleButtonClick}
                          disabled={selectedCount < 2} // Disable the button if less than 2 checkboxes are selected
                          style={{
                              backgroundColor: selectedCount < 2 ? '#d3d3d3' : '', // Grey out the button when not enough checkboxes are selected
                              cursor: selectedCount < 2 ? 'not-allowed' : 'pointer', // Honestly, this was absolutely NOT worth the effort put into it
                          }}
                      >
                          Generate Report
                      </button>
                  </div>

              </div>
          </div>
      </div>
  );
}

export default Dashboard;
