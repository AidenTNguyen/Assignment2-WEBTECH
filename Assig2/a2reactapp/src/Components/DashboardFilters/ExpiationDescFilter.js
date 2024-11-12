import React, { useEffect, useState } from 'react';

function ExpiationDescFilter({ expiationDescriptionChangeFunction }) {
    const [input, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedOffenceCode, setSelectedOffenceCode] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5147/api/Get_SearchOffencesByDescription?offenceCodesOnly=false`)
            .then(response => response.json())
            .then(data => {
                setSuggestions(data);
            });
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        expiationDescriptionChangeFunction(value);

        if (value === '') {
            setSelectedOffenceCode(null);
            expiationDescriptionChangeFunction("noSelection");
        }
    };

    const handleSelectionChange = (event) => {
        const selectedDescription = event.target.value;

        const selectedOffence = suggestions.find(offence => offence.description === selectedDescription);
        if (selectedOffence) {
            setSelectedOffenceCode(selectedOffence.offenceCode);
            expiationDescriptionChangeFunction(selectedOffence.offenceCode);
        }
    };

    return (
        <div className="autocomplete">
            <input
                type="text"
                placeholder="Expiation Description..."
                value={input}
                onChange={handleInputChange}
                onBlur={handleSelectionChange}
                list="expiation-suggestions"
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
            />

            <datalist id="expiation-suggestions">
                {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion.description} />
                ))}
            </datalist>
        </div>
    );
}

export default ExpiationDescFilter;