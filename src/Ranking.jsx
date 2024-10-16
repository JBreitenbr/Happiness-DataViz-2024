import * as d3 from 'd3';
import {rankDict} from './utils/rankDict';
import {useState} from 'react';
const Ranking = () => {
d3.select("#canvas_rank").remove(); d3.select("#canvas_scatter").remove()
d3.select("#canvas_bar").remove();
let regDict={"Western Europe":"#17becf","North America and ANZ":"#8c564b","Latin America and Caribbean":"#d62728","Middle East and North Africa":"#9467bd","South Asia":"#e377e2","East Asia":"#2ca02c","Southeast Asia":"#7f7f7f","Central and Eastern Europe":"#1f77b4","Commonwealth of Independent States":"#ff7f0e","Sub-Saharan Africa":"#bcbd22"}; 
let [year,setYear]=useState(2024);
const handleChange = (event) => {
setYear(event.target.value);
};
let years=[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];
function showYear(year){
let cnts=rankDict[year].slice(0,30).map(d=>d[0]);
let canvas=d3.select("body").append("svg")
.attr("id","canvas_rank");
let w=+d3.select("#canvas_rank").style("width").slice(0,-2);
let h=+d3.select("#canvas_rank").style("height").slice(0,-2); 
let pad=(8.5/35)*w;
let xScale=d3.scaleLinear().domain([0,8]).range([pad,w-pad]);
  let xAxis=d3.axisBottom(xScale);
let yScale=d3.scaleBand().domain(cnts).range([0,h-pad]).padding(0.2)
let yAxis=d3.axisLeft(yScale);canvas.append('g').style("font", "10px nunito").call(yAxis).attr('transform','translate('+pad+',0)');
//canvas.append('g').style("font", `${w<h?(w/88+h/88):((w>700?w/110:w/93)+h/93)}px nunito`).call(xAxis).attr('transform','translate(0,'+(h-pad)+')');
canvas.selectAll('rect').data(rankDict[year].slice(0,30)).enter().append('rect').attr('x',xScale(0)).attr('y',d=>yScale(d[0])).attr('width',d=>xScale(d[2])).attr('height',yScale.bandwidth()).style("fill",d=>regDict[d[1]]).style("opacity",0.6);
for(let i=0; i<30;i++){
canvas.append('text').attr('x',xScale(rankDict[year][i][2])+30).attr('y',yScale(rankDict[year][i][0])+yScale.bandwidth()/2+3).text(rankDict[year][i][2]).style("font","10px arial").style("text-anchor","middle").style("fill","#333");
  canvas.append('text').attr('x',xScale(0)+12).attr('y',yScale(rankDict[year][i][0])+yScale.bandwidth()/2+3).text(i+1).style("font","10px arial").style("text-anchor","end").style("fill","#333");
}
}
  showYear(year);  
  return (<div className="wrapper"><select value={year} onChange={handleChange}>{years.map(item=><option key={item} value={item}>{item}</option>)}</select></div>);
 }

export default Ranking;