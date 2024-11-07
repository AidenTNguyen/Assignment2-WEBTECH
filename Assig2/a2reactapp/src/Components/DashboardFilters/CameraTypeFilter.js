function CameraTypeFilter({ cameraChangeFunction, SuburbList }) {

    const handleCameraSelection = (event) => {
        cameraChangeFunction(event.target.value);
    }

    return ( 
        <select className="dropdown" onChange={handleCameraSelection}>
            <option value="">Select a suburb</option>
            {SuburbList.map(Suburb => (
                <option key={Suburb} value={Suburb}>
                    {Suburb}
                </option>
            ))}
        </select>
    );

}

export default CameraTypeFilter;