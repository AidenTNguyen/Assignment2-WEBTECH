import React, { useState, useEffect } from 'react';

function CameraTypeFilter({ cameraChangeFunction, cameraTypeList }) {
    // This creates a set of unique camera types and then converts it back into an array
    const distinctCameraTypes = [...new Set(cameraTypeList.map(camera => camera.cameraType1))];

    // Use a separate state to manage the selected radio button
    const [selectedCamera, setSelectedCamera] = useState(null);

    // Reset selected camera on every re-render
    useEffect(() => {
        setSelectedCamera(null);
    }, [cameraTypeList]);

    const handleCameraSelection = (event) => {
        const targetCameraElement = cameraTypeList.find(camera => camera.cameraType1 === event.target.value);
        setSelectedCamera(targetCameraElement.cameraType1);
        cameraChangeFunction(targetCameraElement); 
    }

    return (
        <div>
            <div className="d-flex" style={{ display: "flex", justifyContent: "center" }}>
                {distinctCameraTypes.map((camera, index) => (
                    <div className="form-check me-3" key={index}>
                        <input
                            className="form-check-input"
                            type="radio"
                            value={camera}
                            name="camera-type"
                            checked={selectedCamera === camera}
                            onChange={handleCameraSelection}
                            style={{ marginLeft: "12px" }}
                        />
                        <label className="form-check-label" style={{ fontSize: "18px", marginLeft: "4px" }}>
                            {camera}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CameraTypeFilter;