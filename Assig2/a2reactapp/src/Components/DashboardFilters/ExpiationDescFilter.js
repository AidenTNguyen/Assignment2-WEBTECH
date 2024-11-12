import React, { useEffect, useState } from 'react';
function ExpiationDescFilter({ expiationDescriptionChangeFunction }) {

    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5147/api/Get_SearchOffencesByDescription?offenceCodesOnly=false`)
            .then(response => response.json())
            .then(data => {
                setSuggestions(data)
                console.log(data)
            })
    }, [])

    const handleExpiationDescriptionSelection = (event) => {
        let value = event.target.value;
        setInput(value);
        expiationDescriptionChangeFunction(value);

    }

    return ( 
        <div className="autocomplete">
            <input
                type="text"
                placeholder="Expiation Description..."
                value={""}
                onChange={handleExpiationDescriptionSelection}
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
            />
        </div>
    );

}

export default ExpiationDescFilter;