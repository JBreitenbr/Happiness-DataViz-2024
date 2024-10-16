import * as d3 from 'd3';
import {useState} from 'react';
import {rankDict} from './utils/rankDict';
import {regDict} from './utils/regDict';
const Ranks = () => {
  d3.select("#canvas_rank").remove(); d3.select("#canvas_scatter").remove()
d3.select("#canvas_bar").remove();
let [mood,setMood]=useState("happy");
let [year,setYear]=useState(2024);
const handleMood = (event) => {
setMood(event.target.value);
};
const handleYear = (event) => {
setYear(event.target.value);
};
let l=rankDict[year].length;
let med=Math.ceil(l/2);
let b=l%2;
let years=[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];
let moods=["happy","unhappy"];
let moodDict={"happy":"Happiest Countries (i.e. not below Median)","unhappy":"Unhappiest Countries (i.e. below Median)"}
function showRanks(year,mood){
let cnts,lst,lend;
if(mood=="happy"){
cnts=rankDict[year].slice(0,med).map(d=>d[0]);
lst=0;lend=med;
}
if(mood=="unhappy"){
cnts=rankDict[year].slice().reverse().slice(0,med-b).map(d=>d[0]);
lst=med;lend=l;
}
let canvas=d3.select("body").append("svg")
.attr("id","canvas_rank");
let w=+d3.select("#canvas_rank").style("width").slice(0,-2);
let h=+d3.select("#canvas_rank").style("height").slice(0,-2); 
let pad=(8.5/35)*w;
let xScale=d3.scaleLinear().domain([0,8]).range([pad,w-pad]);
  let xAxis=d3.axisBottom(xScale);
let yScale=d3.scaleBand().domain(cnts).range([0,h-pad]).padding(0.15)
let yAxis=d3.axisLeft(yScale);
canvas.append('g').call(yAxis).attr('transform','translate('+pad+',0)').style("font", "7px montserrat");
  if(mood=="happy"){canvas.selectAll('rect').data(rankDict[year].slice(0,med)).enter().append('rect').attr('x',xScale(0)).attr('y',d=>yScale(d[0])).attr('width',d=>xScale(d[2])).attr('height',yScale.bandwidth()).style("fill",d=>regDict[d[1]])};
 if(mood=="unhappy"){canvas.selectAll('rect').data(rankDict[year].slice().reverse().slice(0,med-b)).enter().append('rect').attr('x',xScale(0)).attr('y',d=>yScale(d[0])).attr('width',d=>xScale(d[2])).attr('height',yScale.bandwidth()).style("fill",d=>regDict[d[1]])};
for(let i=lst; i<lend;i++){
canvas.append('text').attr('x',xScale(rankDict[year][i][2])+30).attr('y',yScale(rankDict[year][i][0])+yScale.bandwidth()/2+3).text(rankDict[year][i][2]).style("font","8px arial").style("text-anchor","middle").style("fill","#333");
canvas.append('text').attr('x',xScale(0)+12).attr('y',yScale(rankDict[year][i][0])+yScale.bandwidth()/2+3).text(i+1).style("font","8px arial").style("text-anchor","end").style("fill","#333");
 }
}
  showRanks(year,mood);
  return (<div className="wrapper"><select value={year} onChange={handleYear}>{years.map(item=><option key={item} value={item}>{item}</option>)}</select><select value={mood} onChange={handleMood}>{moods.map(item=><option key={item} value={item}>{moodDict[item]}</option>)}</select></div>)
}

export default Ranks;