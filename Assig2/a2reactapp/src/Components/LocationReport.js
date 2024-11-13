import React, { useState, useEffect, useRef } from 'react';
import SHA256 from 'crypto-js/sha256';
import Navbar from './Navbar';
import './MainStylesheet.css';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';

function LocationReport() {

    const [greenhillRoadData, setGreenhillRoadData] = useState([]);
    const [magillRoadData, setMagillRoadData] = useState([]);

    const svgRefMagill = useRef(null); // Reference to the Svg container

    useEffect(() => {
        fetch(`http://localhost:5147/api/Get_ExpiationStatsForLocationId?locationId=51&cameraTypeCode=I%2Fsection&startTime=0&endTime=2147483647`)
            .then(response => response.json())
            .then(data => {
                setGreenhillRoadData(data);
            })

        fetch(`http://localhost:5147/api/Get_ExpiationStatsForLocationId?locationId=140&cameraTypeCode=I%2Fsection&startTime=0&endTime=2147483647`)
            .then(response => response.json())
            .then(data => {
                setMagillRoadData(data);
            })
    }, [])

    // UseEffect for rendering the first graph for Greenhill Road
    useEffect(() => {
        if (!greenhillRoadData.expiationDaysOfWeek) return;

        let expiationDaysOfWeek = greenhillRoadData.expiationDaysOfWeek;
        let days = Object.keys(expiationDaysOfWeek); // Retrieve keys
        let expiations = Object.values(expiationDaysOfWeek); // Retrieve corresponding values

        const svg = d3.select(svgRefMagill.current)
            .attr("width", 600)
            .attr("height", 400);

        // Margins
        const margin = { top: 20, right: 30, bottom: 40, left: 40 }
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // Create a group where were gonna chuck all the crap into, hoorah!
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const xAxis = d3.scaleBand()
            .domain(days)
            .range([0, width])
            .padding(0.1);

        const yAxis = d3.scaleLinear()
            .domain([0, d3.max(expiations)])
            .nice()
            .range([height, 0]);

        // Make the graph prettier
        const colorScale = d3.scaleLinear()
            .domain([Math.max(0, d3.min(expiations)), d3.max(expiations)])  // Low to high expiation count
            .range(["blue", "red"]);

        // bar graph
        g.selectAll(".bar")
            .data(expiations)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => xAxis(days[i])) // Position of xAxis based on the days
            .attr("y", d => yAxis(d)) // Position of yAxis based on the expiation count
            .attr("width", xAxis.bandwidth()) // Bar width
            .attr("height", d => height - yAxis(d)) // Bar height
            .attr("fill", d => colorScale(d));

        // X axis labels
        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xAxis));

        // Y axis labels
        g.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yAxis));
    }, [greenhillRoadData]) // This is unecessary but it WOULD make sense

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/Dashboard');
    };

    return (
        <div className="location-report">
            <Navbar />
            <div className="report-contents">
                <div className="scrollable-box">

                    <h2>Locations Report</h2>
                    <p>
                        Below are the 2 locations you selected and a brief summary on why the installation of MPDCs in these locations will prove beneficial.
                    </p>

                    <h4>Adelaide, Greenhill Road</h4>
                    <img src="https://www.mapquestapi.com/staticmap/v5/map?key=Es5yMrQayzVhmBoTsECtkSUg1DBbtyou&center=-34.9408333,138.6107222&zoom=16&size=600,400&locations=-34.9408333,138.6107222" alt="Map with Marker" />

                    <p>This location is situated near an intersection very near to Adelaide's CBD. What makes this a prime placement for a new MPDC is due to the high rates of drivers exceeding speed limits near this intersection as seen below.</p>

                    {/*SVG*/}
                    <div className="svg-container">
                        <svg ref={svgRefMagill}></svg>
                    </div>

                    <br />

                    <h4>Norwood, Magill Road</h4>
                    <img src="https://www.mapquestapi.com/staticmap/v5/map?key=Es5yMrQayzVhmBoTsECtkSUg1DBbtyou&center=-34.9148889,138.639139&zoom=17&size=600,400&locations=-34.9148889,138.639139" alt="Map with Marker" />

                    <p>This location near the intersection where Magill Road intersects with Portrush Road is a high traffic area with decently high speeds to match. This is another locations where a number of drivers choose to exceed the speed limit by margins seen below.</p>


                    <div className="button-container">
                        <button onClick={handleButtonClick}>Return to the Dashboard</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationReport;
