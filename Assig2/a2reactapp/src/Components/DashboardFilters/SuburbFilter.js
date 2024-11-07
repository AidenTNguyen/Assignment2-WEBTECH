function SuburbFilter() {

    return ( 
        <select className="dropdown" onChange={handleSuburb}>
            <option value="">Select a suburb</option>
            {cameraSuburbs.map(cameraSuburbs => (
                <option key={cameraSuburbs} value={cameraSuburbs}>
                    {cameraSuburbs}
                </option>
            ))}
        </select>
    );

}