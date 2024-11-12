import React, { useEffect, useState } from 'react';

function ExpiationDescFilter({ expiationDescriptionChangeFunction }) {
    const [input, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5147/api/Get_SearchOffencesByDescription?offenceCodesOnly=false`)
            .then(response => response.json())
            .then(data => {
                setSuggestions(data.map(item => item.description));
            });
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        expiationDescriptionChangeFunction(value);

        if (event.target.value === '') {
            expiationDescriptionChangeFunction("noSelection")
        }
    };

    return (
        <div className="autocomplete">
            <input
                type="text"
                placeholder="Expiation Description..."
                value={input}
                onChange={handleInputChange}
                list="expiation-suggestions"
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
            />

            <datalist id="expiation-suggestions">
                {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                ))}
            </datalist>
        </div>
    );

}

export default ExpiationDescFilter;