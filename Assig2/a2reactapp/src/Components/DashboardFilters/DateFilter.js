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
                startDateChangeFunction(selectedStartDate);
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
                endDateChangeFunction(selectedEndDate);
            }
        }
    }

    return (
        <div className="date-range">
            <label style={{ fontSize: "18px", padding: "10px" }}>
                Start Date:
                <input
                    type="date"
                    name="startDate"
                    style={{ marginLeft: "8px" }}
                    onChange={handleStartDateSelection}
                    value={startDate}
                    min="2023-12-31"
                    max="2024-04-30"
                />
            </label>

            <label style={{ fontSize: "18px", padding: "10px" }}>
                End Date:
                <input
                    type="date"
                    name="endDate"
                    style={{ marginLeft: "8px" }}
                    onChange={handleEndDateSelection}
                    value={endDate}
                    min="2023-12-31"
                    max="2024-04-30"
                />
            </label>
        </div>
    );
}

export default SuburbFilter;
