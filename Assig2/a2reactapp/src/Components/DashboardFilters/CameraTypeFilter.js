function CameraTypeFilter({ cameraChangeFunction, cameraTypeList }) {

    const handleCameraSelection = (event) => {
        cameraChangeFunction(event.target.value);
    }

    return (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label>
                <input type="radio" value="option1" name="camera-type" />
                Option 1
            </label>
            <label>
                <input type="radio" value="option2" name="camera-type" />
                Option 2
            </label>
            <label>
                <input type="radio" value="option3" name="camera-type" />
                Option 3
            </label>
        </div>
    );

}

export default CameraTypeFilter;