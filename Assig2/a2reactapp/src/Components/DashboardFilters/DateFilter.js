import React, { useState } from 'react';

function SuburbFilter({ startDateChangeFunction, endDateChangeFunction}) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateSelection = (event) => {
        const selectedStartDate = event.target.value;
        setStartDate(selectedStartDate);

        // Validate if the start date is within the allowed range
        if (selectedStartDate >= '2023-12-31' && selectedStartDate <= '2024-04-30') {

            if (endDate && selectedStartDate > endDate) {
                alert('Start date cannot be greater than the end date');
                setStartDate(''); // Reset the start date input
            } else {
                let dateObject = new Date(selectedStartDate)
                let startUnixTimestamp = Math.floor(dateObject.getTime() / 1000)
                startDateChangeFunction(startUnixTimestamp);
            }
        }
    }

    const handleEndDateSelection = (event) => {
        const selectedEndDate = event.target.value;
        setEndDate(selectedEndDate);

        // Validate if the end date is within the allowed range
        if (selectedEndDate >= '2023-12-31' && selectedEndDate <= '2024-04-30') {

            if (startDate && selectedEndDate < startDate) {
                alert('End date cannot be before the start date');
                setEndDate(''); // Reset the end date input
            } else {
                let dateObject = new Date(selectedEndDate)
                let endUnixTimestamp = Math.floor(dateObject.getTime() / 1000)
                endDateChangeFunction(endUnixTimestamp);
            }
        }
    }

    return (
        <div className="date-range" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ fontSize: "18px", padding: "10px", display: "flex", flexDirection: "column", marginLeft: "15%" }}>
                <label>Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    style={{ marginTop: "8px" }}
                    onChange={handleStartDateSelection}
                    value={startDate}
                    min="2023-12-31"
                    max="2024-04-30"
                />
            </div>

            <span style={{ fontSize: "18px" }}>-</span>

            <div style={{ fontSize: "18px", padding: "10px", display: "flex", flexDirection: "column" }}>
                <label>End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    style={{ marginTop: "8px" }}
                    onChange={handleEndDateSelection}
                    value={endDate}
                    min="2023-12-31"
                    max="2024-04-30"
                />
            </div>
        </div>
    );
}

export default SuburbFilter;
