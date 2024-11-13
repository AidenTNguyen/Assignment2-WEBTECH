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
            .duration(8000) // Stagger this a tad so you have time to get here
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
                        <h4>Speeding infractions per day at Greenhill Road</h4>
                        <svg ref={svgRefGreenhill}></svg>
                    </div>

                    <p>The data demonstrates that speeding is most common during beginning and ends of the week particularly in the case of the former. This data has been collected over a span of approximately 4 months from December of 2023 to March of 2024. A potential cause for such high rates of road rules violations is that being the subsequent days after the weekend civilians may have sufficiently adapted to the required work week routine. Due to this an argument can be made that an improperly prepared person may underestiamte the time they require to prepare themselves and commute to work. This thereby could cause drivers to become more reckless and hasty as they attempt to arrive to work more quickly to make up for the "relaxed" mindset that may have been leftover from the weekend.</p>

                    <br />
                    <p>A relatively similar point can be made on the days leading towards the weekend as workers may be eagerly seeking out relaxation. They could very well associate their home with the relaxation that is usually accompanied by the weekend and understanding that it draws closer choose to more readily embrace relaxation by rushing home. The data supports this as Wednesday in particular shows the lowest rates of speeding infractions amongst all the days of the week near the CBD which can be said to be rooted in settling into the work week routine. </p>

                    <br />
                    <p>In summary, this location in between two intersections if installed with an MPDC would prove invaluable to SAPOL reckless drivers are more likely to be caught during spats of reckless driving especially on such a long stretch of road and days close to the weekend.</p>

                    <br />
                    <hr />

                    <h3>Norwood, Magill Road</h3>
                    <img src="https://www.mapquestapi.com/staticmap/v5/map?key=Es5yMrQayzVhmBoTsECtkSUg1DBbtyou&center=-34.9148889,138.639139&zoom=17&size=600,400&locations=-34.9148889,138.639139" alt="Map with Marker" />

                    <p>This location near the intersection where Magill Road intersects with Portrush Road is a high traffic area with decently high speeds to match. This is another locations where a number of drivers choose to exceed the speed limit by margins seen below.</p>

                    {/*SVG*/}
                    <div className="svg-container">
                        <h4>Speeding infractions per day at Magill Road</h4>
                        <svg ref={svgRefMagill}></svg>
                    </div>

                    <p>The data demonstrates a noticeable outlier in Tuesdays where the numer of speeding infractions sees a dramatic increase compared to the other days of the week. This data has been collected over a span of approximately 4 months from December of 2023 to March of 2024. There is a strong possibility that Tuesday in particular has a high level of peak traffic during the day which may be caused from commuters being more active on this day due to the industry or business in the area or returning to work after the weekend trying to catch up after the start of the week.</p>

                    <br />
                    <p>Since Magill Road is a fairly major route towards Portrush Road, a busy road in itself creating a busy intersection it is likely many commuters take this stretch of road due its quick travel route. Tuesdays could see a combination of people attempting to hurry to work or experiencing delays from the previous day (monday), leading drivers to attempt to make up for lost time hurrily. This combined with the lack of curvature and it being a major arterial road could highly encourage drivers to exceed speed limits for lack of artifical danger from purposeful obstacles like speed bumps or curves in the road.</p>

                    <br />
                    <p>In summary, this location near an intersection between two major roads (Magill and Portrush Road) would prove an excellent location for the installation of a MPDC due to particular driver behaviours on Tuesday and the high traffic this area experiences.</p>

                    <div className="button-container">
                        <button onClick={handleButtonClick}>Return to the Dashboard</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationReport;
