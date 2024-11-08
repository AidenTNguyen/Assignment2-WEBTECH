function CameraTypeFilter({ cameraChangeFunction, cameraTypeList }) {

    const filteredCameraTypes = cameraTypeList
        .map(camera => camera.cameraType1)

    const handleCameraSelection = (event) => {
        cameraChangeFunction(event.target.value);
    }

    return (
        <div hidden={cameraTypeList.length === 0}>
            {cameraTypeList.map((camera, index) => (
                <label key={index}>
                    <input type="radio" value={camera.cameraType1} name="camera-type" /> {camera.cameraType1}
                </label>
            ))}
        </div>
    );

}

export default CameraTypeFilter;