function ExpiationDescFilter({ suburbChangeFunction, suburbList }) {

    const handleSuburbSelection = (event) => {
        suburbChangeFunction(event.target.value);
    }

    return ( 
        <select className="dropdown" onChange={handleSuburbSelection}>
            <option value="noSelection">Select a suburb</option>
            {suburbList.map(Suburb => (
                <option key={Suburb} value={Suburb}>
                    {Suburb}
                </option>
            ))}
        </select>
    );

}

export default ExpiationDescFilter;