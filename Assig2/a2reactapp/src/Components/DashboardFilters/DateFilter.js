function SuburbFilter({ suburbChangeFunction, suburbList }) {

    const handleSuburbSelection = (event) => {
        suburbChangeFunction(event.target.value);
    }

    return ( 
        <div className="date-range">
            <label style={{ fontSize: "18px", padding: "10px" }}>
                Start Date:
                <input
                    type="date"
                    name="startDate"
                    style={{ marginLeft: "8px" }}
                />
            </label>

            <label style={{ fontSize: "18px", padding: "10px" }}>
                End Date:
                <input
                    type="date"
                    name="endDate"
                    style={{ marginLeft: "8px"} }
                />
            </label>
        </div>
    );

}

export default SuburbFilter;