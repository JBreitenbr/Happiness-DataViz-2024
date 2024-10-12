import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import {favs} from './favs';
let artists=[];
for(let i=0;i<30;i++){
  artists.push(favs[i][0]);
}
const Barcharts = () => {
  
const svgRef = useRef();
   useEffect(()=>{
// set the dimensions and margins of the graph
let margin = {top: 20, right: 30, bottom: 20, left: 30},
  width = 360 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom, height2=height+20;
let canvas=d3.select(svgRef.current).append("svg").attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
// Add X axis
  let xScale = d3.scaleBand()
      .domain(["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"])
      .range([0, width])
      .padding([0.2])
  canvas.append("g")
    .attr("transform", "translate(30," + height2  + ")")
    .call(d3.axisBottom(xScale).tickSizeOuter(0));
                  // Add Y axis
  let yScale = d3.scaleLinear()
    .domain([0, 8])
    .range([ height , 0 ]);
  canvas.append("g").attr("transform", "translate(30,20)")
    .call(d3.axisLeft(yScale));
 },[]);
  
  return (<div className="wrapper"><h2>Timeline</h2><svg id="canvas_bar" ref={svgRef} /></div>);
}

export default Barcharts;