import React, { useState, useEffect, useRef } from 'react';
import SHA256 from 'crypto-js/sha256';
import Navbar from './Navbar';
import './MainStylesheet.css';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';

function LocationReport() {

    const [greenhillRoadData, setGreenhillRoadData] = useState([]);
    const [magillRoadData, setMagillRoadData] = useState([]);

    const svgRefGreenhill = useRef(null); // Reference to the Svg container
    const svgRefMagill = useRef(null);

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

        const svg = d3.select(svgRefGreenhill.current)
            .attr("width", 800)
            .attr("height", 600);

        // Margins
        const margin = { top: 20, right: 30, bottom: 50, left: 60 }
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

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

        // Bar graph
        const bars = g.selectAll(".bar")
            .data(expiations)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => xAxis(days[i])) // Position of xAxis based on the days
            .attr("y", height) // Position of yAxis based on the expiation count
            .attr("width", xAxis.bandwidth()) // Bar width
            .attr("height", 0) // Bar height
            .attr("fill", d => colorScale(d));

        bars.transition()
            .duration(3000) // Stagger this a tad so you have time to get here
            .attr("y", d => yAxis(d))
            .attr("height", d => height - yAxis(d));

        // X axis
        const xAxisGroup = g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xAxis));

        // Y axis
        const yAxisGroup = g.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yAxis));

        // X axis label
        svg.append("text")
            .attr("class", "x-axis-label")
            .attr("x", width / 2 + margin.left)
            .attr("y", height + margin.top + 40)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("Days of the Week");

        // Y axis label
        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("transform", "rotate(-90)") 
            .attr("x", -height / 2 - margin.top) 
            .attr("y", margin.left - 40) 
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("Number of Expiations");

    }, [greenhillRoadData]); // This is unecessary but it WOULD make sense

    // useEffect for the second graph
    useEffect(() => {
        if (!magillRoadData.expiationDaysOfWeek) return;

        let expiationDaysOfWeek = magillRoadData.expiationDaysOfWeek;
        let days = Object.keys(expiationDaysOfWeek); // Retrieve keys
        let expiations = Object.values(expiationDaysOfWeek); // Retrieve corresponding values

        const svg = d3.select(svgRefMagill.current)
            .attr("width", 800)
            .attr("height", 600);

        // Margins
        const margin = { top: 20, right: 30, bottom: 50, left: 60 }
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

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

        // Bar graph
        const bars = g.selectAll(".bar")
            .data(expiations)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => xAxis(days[i])) // Position of xAxis based on the days
            .attr("y", height) // Position of yAxis based on the expiation count
            .attr("width", xAxis.bandwidth()) // Bar width
            .attr("height", 0) // Bar height
            .attr("fill", d => colorScale(d));

        bars.transition()
            .duration(5000) // Stagger this a tad so you have time to get here
            .attr("y", d => yAxis(d))
            .attr("height", d => height - yAxis(d));

        // X axis
        const xAxisGroup = g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xAxis));

        // Y axis
        const yAxisGroup = g.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yAxis));

        // X axis label
        svg.append("text")
            .attr("class", "x-axis-label")
            .attr("x", width / 2 + margin.left)
            .attr("y", height + margin.top + 40)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("Days of the Week");

        // Y axis label
        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2 - margin.top)
            .attr("y", margin.left - 40)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("Number of Expiations");

    }, [greenhillRoadData]);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/Dashboard');
    };

    return (
        <div className="location-report">
            <Navbar />
            <div className="report-contents">
                <div className="scrollable-box">

                    <h1>Locations Report</h1>
                    <p>
                        Below are the 2 locations you selected and a brief summary on why the installation of MPDCs in these locations will prove beneficial.
                    </p>

                    <h3>Adelaide, Greenhill Road</h3>
                    <img src="https://www.mapquestapi.com/staticmap/v5/map?key=Es5yMrQayzVhmBoTsECtkSUg1DBbtyou&center=-34.9408333,138.6107222&zoom=16&size=600,400&locations=-34.9408333,138.6107222" alt="Map with Marker" />

                    <p>This location is situated near an intersection very near to Adelaide's CBD. What makes this a prime placement for a new MPDC is due to the high rates of drivers exceeding speed limits near this intersection as seen below.</p>

                    {/*SVG*/}
                    <div className="svg-container">
                    <h4>Expiations per day at Greenhill Road</h4>
                        <svg ref={svgRefGreenhill}></svg>
                    </div>

                    <br />

                    <h3>Norwood, Magill Road</h3>
                    <img src="https://www.mapquestapi.com/staticmap/v5/map?key=Es5yMrQayzVhmBoTsECtkSUg1DBbtyou&center=-34.9148889,138.639139&zoom=17&size=600,400&locations=-34.9148889,138.639139" alt="Map with Marker" />

                    <p>This location near the intersection where Magill Road intersects with Portrush Road is a high traffic area with decently high speeds to match. This is another locations where a number of drivers choose to exceed the speed limit by margins seen below.</p>

                    {/*SVG*/}
                    <div className="svg-container">
                        <h4>Expiations per day at Magill Road</h4>
                        <svg ref={svgRefMagill}></svg>
                    </div>


                    <div className="button-container">
                        <button onClick={handleButtonClick}>Return to the Dashboard</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationReport;
