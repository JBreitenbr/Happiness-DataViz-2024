import * as d3 from 'd3';
import {useState} from 'react';
import {rankDict} from './utils/rankDict';
import {regDict} from './utils/regDict';
const Ranks_v = () => {d3.select("#canvas_rank").remove(); d3.select("#canvas_scatter").remove()
d3.select("#canvas_bar").remove();
let [year,setYear]=useState(2024);
const handleYear = (event) => {
setYear(event.target.value);
};
let l=rankDict[year].length;
let med=Math.ceil(l/2);
let b=l%2;
let years=[2015,2016,2017,2018,2019,2020,2021,2022,2023,2024];

let moodDict={"happy":"Happiest Countries (i.e. not below Median)","unhappy":"Unhappiest Countries (i.e. below Median)"}
function showRank(year){
let cnts1=rankDict[year].slice(0,med).map(d=>d[0]);
let lst1=0;let lend1=med;

let cnts2=rankDict[year].slice().reverse().slice(0,med-b).map(d=>d[0]);
let lst2=med;let lend2=l;

let canvas=d3.select("body").append("svg")
.attr("id","canvas_rank");
let w=+d3.select("#canvas_rank").style("width").slice(0,-2);
let h=+d3.select("#canvas_rank").style("height").slice(0,-2); 
let pad=(1/8)*w;
let xScale1=d3.scaleLinear().domain([0,8]).range([w/8,w/2]);
let xScale2=d3.scaleLinear().domain([0,8]).range([0.625*w,w]);          
let yScale1=d3.scaleBand().domain(cnts1).range([0.5*pad,h-0.5*pad]).padding(0.15);
let yScale2=d3.scaleBand().domain(cnts2).range([0.5*pad,h-0.5*pad]).padding(0.15);
let yAxis1=d3.axisLeft(yScale1);
let yAxis2=d3.axisLeft(yScale2);                  canvas.append('g').call(yAxis1).attr('transform','translate('+pad+',0)').style("font",`${(7/550)*Math.min(w,h)}`+"px montserrat");
                    canvas.append('g').call(yAxis2).attr('transform','translate('+0.625*w+',0)').style("font",`${(7/550)*Math.min(w,h)}`+"px montserrat");
canvas.selectAll('rect1').data(rankDict[year].slice(0,med)).enter().append('rect').attr('x',xScale1(0)).attr('y',d=>yScale1(d[0])).attr('width',d=>xScale1(d[2])-xScale1(0)).attr('height',yScale1.bandwidth()).style("fill",d=>regDict[d[1]]).style("stroke","grey").style("stroke-width","0.5px");
canvas.selectAll('rect2').data(rankDict[year].slice().reverse().slice(0,med-b)).enter().append('rect').attr('x',xScale2(0)).attr('y',d=>yScale2(d[0])).attr('width',d=>xScale2(d[2])-xScale2(0)).attr('height',yScale2.bandwidth()).style("fill",d=>regDict[d[1]]).style("stroke","grey").style("stroke-width","0.5px");
canvas.append('text').attr('x',xScale1(0)).attr('y',yScale1(cnts1[0])-8*yScale1.bandwidth()/2).text(moodDict["happy"]).style("font",`${16*Math.min(w,h)/550}px montserrat`).style("fill","#333");
for(let i=lst1; i<lend1;i++){
canvas.append('text').attr('x',xScale1(rankDict[year][i][2])+5).attr('y',yScale1(rankDict[year][i][0])+yScale1.bandwidth()/2+3).text(rankDict[year][i][2]).style("font",`${8*Math.min(w,h)/500}px montserrat`).style("fill","#333");
canvas.append('text').attr('x',xScale1(0)+15).attr('y',yScale1(rankDict[year][i][0])+yScale1.bandwidth()/2+3).text(i+1).style("font",`${8*Math.min(w,h)/550}px montserrat`).style("text-anchor","end").style("fill","#333");
 }
                    canvas.append('text').attr('x',xScale2(0)).attr('y',yScale2(cnts2[0])-8*yScale2.bandwidth()/2).text(moodDict["unhappy"]).style("font",`${16*h/550}px arial`).style("fill","#333");
for(let i=lst2; i<lend2;i++){
canvas.append('text').attr('x',xScale2(rankDict[year][i][2])+5).attr('y',yScale2(rankDict[year][i][0])+yScale2.bandwidth()/2+3).text(rankDict[year][i][2]).style("font",`${Math.min(w,h)*8/550}px montserrat`).style("fill","#333");
canvas.append('text').attr('x',xScale2(0)+15).attr('y',yScale2(rankDict[year][i][0])+yScale2.bandwidth()/2+3).text(i+1).style("font",`${Math.min(w,h)*8/550}px montserrat`).style("text-anchor","end").style("fill","#333");
                    }
}  
showRank(year);
return (<div className="wrapper"><h1 className="text-center text-bold text-xl mt-4">Ranked Happiness Score by Year</h1><select value={year} onChange={handleYear} className="mt-2" style={{backgroundColor:"#fcfcfc",border:"2px solid #21234a",borderRadius:"5px"}}>{years.map(item=><option key={item} value={item}>{item}</option>)}</select></div>)
}
export default Ranks_v;