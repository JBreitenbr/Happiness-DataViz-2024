import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import {dimsDict} from './utils/dimsDict';
import {rangeDict} from './utils/rangeDict';
import {regDict} from './utils/regDict';
const Scatter = () => {
  
    let [dim,setDim]=useState("gdp_per_capita");
let [reg,setReg]=useState("All Regions");
 const handleChange1 = (event) => {
setDim(event.target.value);
}; 
const handleChange2 = (event) => {
  setReg(event.target.value);
};
 let dimBij={"gdp_per_capita":"GDP per capita","social_support":"Social support", "healthy_life_expectancy":"Healthy life expectancy","freedom_to_make_life_choices":"Freedom to make life choices","generosity":"Generosity","perceptions_of_corruption":"Perceptions of corruption"} 
let dims=["gdp_per_capita","social_support", "healthy_life_expectancy","freedom_to_make_life_choices","generosity","perceptions_of_corruption"];
let regions=["All Regions","Western Europe","North America and ANZ","Latin America and Caribbean","Middle East and North Africa","South Asia","East Asia","Southeast Asia","Central and Eastern Europe","Commonwealth of Independent States","Sub-Saharan Africa"]; 
function showScatter(dim,reg){
let dat;

if(reg=="All Regions"){
  dat=dimsDict[dim];
}
else{
dat=dimsDict[dim].filter((item)=>item[2]==reg);
}
 d3.select("#canvas_scatter").remove()
d3.select("#canvas_bar").remove();
d3.select("#canvas_rank").remove();

let canvas=d3.select("body").append("svg")
.attr("id","canvas_scatter");
  let toolTip=d3.select("body").append("div").attr("id","tooltip");
let w=+d3.select("#canvas_scatter").style("width").slice(0,-2);
let h=+d3.select("#canvas_scatter").style("height").slice(0,-2); 
let pad=(4/35)*w;
let xScale=d3.scaleLinear().domain(rangeDict[dim]).range([pad,w-pad]);
let yScale = d3.scaleLinear().domain([0,8]).range([h-2*pad,pad]);
  let xAxis=d3.axisBottom(xScale);
let yAxis=d3.axisLeft(yScale);
  canvas.append('g').style("font", `${w<h?(w/88+h/88):((w>700?w/110:w/93)+h/93)}px montserrat`).call(yAxis).attr('transform','translate('+pad+',0)');
canvas.append('g').style("font", `${w<h?(w/88+h/88):((w>700?w/110:w/93)+h/93)}px montserrat`).call(xAxis).attr('transform','translate(0,'+(h-2*pad)+')');
canvas.append("text").attr("x",0.5*pad).attr("y",0.5*pad).text("Happiness Score").style("font",`${w<h?(w/78+h/78):((w>700?w/100:w/w/83)+h/83)}px montserrat`);
canvas.append("text").attr("x",w-4*pad).attr("y",h-1.1*pad).text("% of Happiness Score").style("font",`${w<h?(w/78+h/78):((w>700?w/100:w/w/83)+h/83)}px montserrat`);
canvas.selectAll('circle').data(dat).enter().append('circle').attr('cx',(item)=>{return xScale(item[4])}).attr('cy',(item)=>{ return  yScale(item[3])}).attr('r',(item)=>(0.0000025*h)*Math.sqrt(item[1])).attr("fill",(item)=>{return regDict[item[2]]}).style("stroke","grey").on("mouseover",(event,item)=>{return toolTip.style("visibility","visible").html("Country: "+item[0]+"<br> Population: "+item[1]+"<br>"+dimBij[dim]+": "+item[4]+"% of Happiness Score ("+item[3]+")").style("left",event.pageX+10+"px").style( "top",event.pageY-20+"px")}).on("mouseout",(event,item)=>{return toolTip.style("visibility","hidden")});}
  showScatter(dim,reg);

  return (<div className="wrapper"><h1 className="text-center text-bold mt-4 text-xl" >Happiness Dimensions (in % of Score) vs. Happiness Score in 2024</h1><select value={dim} onChange={handleChange1} style={{backgroundColor:"#fcfcfc",border:"2px solid #21234a",borderRadius:"5px"}} className="mt-2">{dims.map(item=><option key={item} value={item}>{dimBij[item]}</option>)}</select><select value={reg} onChange={handleChange2} style={{backgroundColor:"#fcfcfc",border:"2px solid #21234a",borderRadius:"5px"}} className="my-2">{regions.map(item=><option key={item} value={item}>{item}</option>)}</select></div>);
}

export default Scatter;