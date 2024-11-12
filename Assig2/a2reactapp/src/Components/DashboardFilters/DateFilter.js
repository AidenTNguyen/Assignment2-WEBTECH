import React, { useEffect, useState } from 'react';
function SuburbFilter({ startDateChangeFunction, endDateChangeFunction, selectedCameraType }) {

    const handleStartDateSelection = (event) => {
        startDateChangeFunction(event.target.value);
    }

    const handleEndDateSelection = (event) => {
        endDateChangeFunction(event.target.value);
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
                />
            </label>

            <label style={{ fontSize: "18px", padding: "10px" }}>
                End Date:
                <input
                    type="date"
                    name="endDate"
                    style={{ marginLeft: "8px" }}
                    onChange={handleEndDateSelection}
                />
            </label>
        </div>
    );

}

export default SuburbFilter;