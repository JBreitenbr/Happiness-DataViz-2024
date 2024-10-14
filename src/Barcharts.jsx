import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import {stackDict} from './utils/stackDict';
import {happyDict} from './utils/happyDict';
import {facDict} from './utils/facDict';
import {countries} from './utils/countries';
const Barcharts = () => {
  const [country,setCountry]=useState ("Canada");
const handleChange = (event) => {
setCountry(event.target.value);
};
let ger = stackDict[country];
let txt = happyDict[country];
let fac = facDict[country];
let dims=["GDP per capita:","Social support:", "Healthy life expectancy:","Freedom to make life choices:","Generosity:","Perceptions of corruption:","Dystopia residual:"]
  d3.select("#canvas_bar").remove();

let canvas=d3.select("body").append("svg")
.attr("id","canvas_bar");
  let toolTip=d3.select("body").append("div").attr("id","tooltip");

 let barCols=["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494"];
const svgRef = useRef();
function showCountry(country){
// set the dimensions and margins of the graph
let margin = {top: 20, right: 30, bottom: 20, left: 30},
  width = 360 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom, height2=height+20;
//let canvas=d3.select(svgRef.current)
canvas.append("svg").attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

// Add X axis
  let xScale = d3.scaleBand()
      .domain([2015,2016,2017,2018,2019,2020,2021,2022,2023,2024])
      .range([0, width])
      .padding([0.2])
  canvas.append("g")
    .attr("transform", "translate(30," + height2  + ")")
    .call(d3.axisBottom(xScale).tickSizeOuter(0));
                  // Add Y axis
  let yScale = d3.scaleLinear()
    .domain([0, 8])
    .range([ height , 0 ]);
  let yScale2=d3.scaleLinear()
    .domain([0, 8])
    .range([0,height])
  canvas.append("g").attr("transform", "translate(30,20)")
    .call(d3.axisLeft(yScale));
for(let i=0;i<10;i++)
  for(let j=0;j<7;j++)
{
canvas.append("rect").attr("x",xScale(2015+i)+30).attr("y",yScale(ger[j][i][1])+20).attr("width",xScale.bandwidth).attr("height",yScale2(ger[j][i][1]-ger[j][i][0])).attr("fill",barCols[j]).on("mouseover",(event,item)=>{return toolTip.style("visibility","visible").html(dims[j]+"<br>"+fac[j][i]).style("left",event.pageX+10+"px").style("top",event.pageY-20+"px");});
}
for(let i=0;i<10;i++){
  canvas.append("text").attr("x",xScale(2015+i)+30).attr("y",yScale(txt[i])+15).style("font","10px arial ").text(txt[i]);
} 
 };
  showCountry(country);
  
  return (<div className="wrapper"><select value={country} onChange={handleChange}>{countries.map(item=><option key={item}>{item}</option>)}</select></div>);

  }

export default Barcharts;