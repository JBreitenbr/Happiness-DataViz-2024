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
let dims2=dims;
dims2[3]="Free life choices:";
  
  d3.select("#canvas_bar").remove();
d3.select("#canvas_rank").remove();  d3.select("#canvas_scatter").remove();

let canvas=d3.select("body").append("svg")
.attr("id","canvas_bar");
  let toolTip=d3.select("body").append("div").attr("id","tooltip");

 let barCols=["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494"];
function showCountry(country){
let w=+d3.select("#canvas_bar").style("width").slice(0,-2);
let h=+d3.select("#canvas_bar").style("height").slice(0,-2); 
let pad=(1/8)*w;
  let xScale = d3.scaleBand()
      .domain([2015,2016,2017,2018,2019,2020,2021,2022,2023,2024])
      .range([pad, w-pad])
      .padding([0.2])
  canvas.append("g").style("font",`${(1/36)*w}`+"px montserrat").attr("transform",`translate(0,${h-3.75*pad})`).call(d3.axisBottom(xScale).tickSizeOuter(0));
  let yScale = d3.scaleLinear()
    .domain([0, 8])
    .range([ h-3*pad , pad ]);
  let yScale2=d3.scaleLinear()
    .domain([0, 8])
    .range([0,h-4*pad])
  canvas.append("g").style("font",`${1/36*w}px montserrat`).attr("transform", `translate(${pad},${-0.75*pad})`)
    .call(d3.axisLeft(yScale));
for(let i=0;i<10;i++)
  for(let j=0;j<7;j++)
{
canvas.append("rect").attr("x",xScale(2015+i)).attr("y",yScale(sta[j][i][1])-0.75*pad).attr("width",xScale.bandwidth).attr("height",yScale2(sta[j][i][1]-sta[j][i][0])).style("stroke","black").attr("fill",barCols[j]).on("mouseover",(event,item)=>{return toolTip.style("visibility","visible").style("font",`${1/36*w}px montserrat`).html(dims[j]+" "+fac[j][i]+"<br>"+"Year: "+parseInt(i+2015)).style("left",event.pageX+10+"px").style("top",event.pageY-20+"px");}).on("mouseout",(event,item)=>{return toolTip.style("visibility","hidden")});
}
let bw=xScale.bandwidth();
for(let i=0;i<3;i++) {canvas.append("rect").attr("x",xScale(2015)-0.25*bw+i*4.3*bw).attr("y",h-3*pad+0.5*bw).attr("width",0.5*bw).attr("height",0.5*bw).style("stroke","black").attr("fill",barCols[i]);
  canvas.append("text").attr("x",xScale(2015)+0.5*bw+i*4.3*bw).attr("y",h-2.8*pad+0.5*bw).text(dims2[i].slice(0,-1)).style("font",`${1/42*w}px montserrat`).style("text-anchor","start")}
for(let i=3;i<6;i++) {canvas.append("rect").attr("x",xScale(2015)-0.25*bw+(i-3)*4.3*bw).attr("y",h-3*pad+1.5*bw).attr("width",0.5*bw).attr("height",0.5*bw).style("stroke","black").attr("fill",barCols[i]);
  canvas.append("text").attr("x",xScale(2015)+0.5*bw+(i-3)*4.3*bw).attr("y",h-2.8*pad+1.5*bw).text(dims2[i].slice(0,-1)).style("font",`${1/42*w}px montserrat`).style("text-anchor","start")}
  canvas.append("rect").attr("x",xScale(2015)-0.25*bw).attr("y",h-3*pad+2.5*bw).attr("width",0.5*bw).attr("height",0.5*bw).style("stroke","black").attr("fill",barCols[6]);
canvas.append("text").attr("x",xScale(2015)+0.5*bw).attr("y",h-3*pad+3*bw).text(dims2[6].slice(0,-1)).style("font",`${1/42*w}px montserrat`).style("text-anchor","start");
for(let i=0;i<10;i++){
  canvas.append("text").attr("x",xScale(2015+i)).attr("y",yScale(txt[i])-5-0.75*pad).style("font",`${1/42*w}px montserrat`).text(txt[i]);
} 
 };
  showCountry(country);
  
  return (<div><h1 className="text-center text-bold mt-6 mb-4 text-xl" >Happiness by Dimensions Over Time</h1><div className="wrapper mt-2 p-2"><select value={country} onChange={handleChange} style={{backgroundColor:"#fcfcfc",border:"2px solid #21234a",borderRadius:"5px"}} className="mb-4">{countries.map(item=><option key={item} value={item} className="p-4">{cntDict[item]}</option>)}</select></div></div>);

  }

export default Barcharts;