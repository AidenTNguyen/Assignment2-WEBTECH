function CameraTypeFilter({ cameraChangeFunction, cameraTypeList }) {

    // This creates a set of unique camera types and then converts back into an array
    const distinctCameraTypes = [...new Set(cameraTypeList.map(camera => camera.cameraType1))];

    const handleCameraSelection = (event) => {
        const targetCameraElement = cameraTypeList.find(camera => camera.cameraType1 === event.target.value);
        cameraChangeFunction(targetCameraElement);
    }

    return (
        <div hidden={cameraTypeList.length === 0}>
            <div className="d-flex" style={ { display: "flex", justifyContent: "center" }}>
                {distinctCameraTypes.map((camera, index) => (
                    <div className="form-check me-3" key={index}>
                        <input
                            className="form-check-input"
                            type="radio"
                            value={camera}
                            name="camera-type"
                            onChange={handleCameraSelection}
                            style={{ marginLeft: "12px"} }
                        />
                        <label className="form-check-label" style={{fontSize: "18px", marginLeft: "4px"} }>
                            {camera}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CameraTypeFilter;