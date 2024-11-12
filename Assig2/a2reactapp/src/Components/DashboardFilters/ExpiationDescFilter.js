function ExpiationDescFilter({ expiationDescriptionChangeFunction }) {

    const handleExpiationDescriptionSelection = (event) => {
        expiationDescriptionChangeFunction(event.target.value);
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