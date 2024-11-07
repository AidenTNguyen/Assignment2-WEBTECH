function SuburbFilter({ suburbChangeFunction, SuburbList }) {

    const handleSuburbSelection = (event) => {
        suburbChangeFunction(event.target.value);
    }

    return ( 
        <select className="dropdown" onChange={handleSuburbSelection}>
            <option value="">Select a suburb</option>
            {SuburbList.map(Suburb => (
                <option key={Suburb} value={Suburb}>
                    {Suburb}
                </option>
            ))}
        </select>
    );

}

export default SuburbFilter;