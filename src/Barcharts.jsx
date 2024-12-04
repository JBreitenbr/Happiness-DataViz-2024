import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import {stackDict} from './utils/stackDict';
import {happyDict} from './utils/happyDict';
import {facDict} from './utils/facDict';
import {countries} from './utils/countries';
const Barcharts = () => {
  const [country,setCountry]=useState ("Canada");
let cntDict={};
for(let i=0;i<countries.length;i++){
  cntDict[countries[i]]=countries[i];
}
cntDict["Hong Kong S.A.R. of China"] = "Hong Kong";
cntDict["Taiwan Province of China"] = "Taiwan";
const handleChange = (event) => {
setCountry(event.target.value);
};
let sta = stackDict[country];
let txt = happyDict[country];
let fac = facDict[country];
let dims=["GDP per capita:","Social support:", "Healthy life expectancy:","Freedom to make life choices:","Generosity:","Perceptions of corruption:","Dystopia residual:"]

  
  d3.select("#canvas_bar").remove();
d3.select("#canvas_rank").remove();  d3.select("#canvas_scatter").remove();

let canvas=d3.select("body").append("svg")
.attr("id","canvas_bar");
  let toolTip=d3.select("body").append("div").attr("id","tooltip");

 let barCols=["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494"];
function showCountry(country){
let w=+d3.select("#canvas_bar").style("width").slice(0,-2);
let h=+d3.select("#canvas_bar").style("height").slice(0,-2); 
let pad=(1/12)*w;
  let xScale = d3.scaleBand()
      .domain([2015,2016,2017,2018,2019,2020,2021,2022,2023,2024])
      .range([pad, w-pad])
      .padding([0.2])
  canvas.append("g")
    .attr("transform",`translate(0,${h-pad})`)
    .call(d3.axisBottom(xScale).tickSizeOuter(0));
  let yScale = d3.scaleLinear()
    .domain([0, 8])
    .range([ h-pad , pad ]);
  let yScale2=d3.scaleLinear()
    .domain([0, 8])
    .range([0,h-2*pad])
  canvas.append("g").attr("transform", `translate(${pad},0)`)
    .call(d3.axisLeft(yScale));
for(let i=0;i<10;i++)
  for(let j=0;j<7;j++)
{
canvas.append("rect").attr("x",xScale(2015+i)).attr("y",yScale(sta[j][i][1])).attr("width",xScale.bandwidth).attr("height",yScale2(sta[j][i][1]-sta[j][i][0])).style("stroke","grey").attr("fill",barCols[j]).on("mouseover",(event,item)=>{return toolTip.style("visibility","visible").html(dims[j]+" "+fac[j][i]+"<br>"+"Year: "+parseInt(i+2015)).style("left",event.pageX+10+"px").style("top",event.pageY-20+"px");}).on("mouseout",(event,item)=>{return toolTip.style("visibility","hidden")});
}
for(let i=0;i<10;i++){
  canvas.append("text").attr("x",xScale(2015+i)).attr("y",yScale(txt[i])-5).style("font","10px arial ").text(txt[i]);
} 
 };
  showCountry(country);
  
  return (<div><h1 className="text-center text-bold mt-4 text-xl" >Happiness by Dimensions Over Time</h1><div className="wrapper mt-2 p-2"><select value={country} onChange={handleChange} style={{backgroundColor:"#fcfcfc",border:"2px solid #21234a",borderRadius:"5px"}}>{countries.map(item=><option key={item} value={item} className="p-4">{cntDict[item]}</option>)}</select></div></div>);

  }

export default Barcharts;