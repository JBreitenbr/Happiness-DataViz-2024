import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import {dimsDict} from './utils/dimsDict';
import {rangeDict} from './utils/rangeDict';

const Scatter = () => {
  
    let [dim,setDim]=useState("gdp_per_capita")
let [reg,setReg]=useState("All Regions");
 const handleChange1 = (event) => {
setDim(event.target.value);
}; 
const handleChange2 = (event) => {
  setReg(event.target.value);
};
 let dimBij={"gdp_per_capita":"GDP per capita","social_support":"Social support", "healthy_life_expectancy":"Healthy life expectancy","freedom_to_make_life_choices":"Freedom to make life choices","generosity":"Generosity","perceptions_of_corruption":"Perceptions of corruption"} 
let regions=["All Regions","Western Europe","North America and ANZ","Latin America and Caribbean","Middle East and North Africa","South Asia","East Asia","Southeast Asia","Central and Eastern Europe","Commonwealth of Independent States"]; 
let dat;

if(reg=="All Regions"){
  dat=dimsDict[dim];
}
else{
dat=dimsDict[dim].filter((item)=>item[2]==reg);
}
//document.write(dat[0]); d3.select("#canvas_scatter").remove()
d3.select("#canvas_bar").remove();


let canvas=d3.select("body").append("svg")
.attr("id","canvas_scatter");
  let toolTip=d3.select("body").append("div").attr("id","tooltip");
let w=+d3.select("#canvas_scatter").style("width").slice(0,-2);
let h=+d3.select("#canvas_scatter").style("height").slice(0,-2); 
let pad=(4/35)*w;
let xScale=d3.scaleLinear().domain(rangeDict[dim]).range([pad,w-pad]);
let yScale = d3.scaleLinear().domain([0,8]).range([h-pad,pad]);
  let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
  canvas.append('g').style("font", `${w<h?(w/88+h/88):((w>700?w/110:w/93)+h/93)}px nunito`).call(yAxis).attr('transform','translate('+pad+',0)');
canvas.append('g').style("font", `${w<h?(w/88+h/88):((w>700?w/110:w/93)+h/93)}px nunito`).call(xAxis).attr('transform','translate(0,'+(h-pad)+')');

canvas.append("circle").attr("cx",xScale(dat[0][4])).attr("cy",yScale(dat[0][3])).attr("r",10).style("fill","red");
canvas.selectAll('circle').data(dat).enter().append('circle').attr('cx',(item)=>{return xScale(item[4])}).attr('cy',(item)=>{ return  h-pad-yScale(item[3])}).attr('r',(item)=>(0.0000025*h)*Math.sqrt(item[1])).attr("fill","blue");

  return (
    <div className="bg-gray-100">Happy Scatter</div>)
}

export default Scatter;