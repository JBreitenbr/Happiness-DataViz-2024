import * as d3 from 'd3';
import {useState} from 'react';
import {rankDict} from './utils/rankDict';
import {regDict} from './utils/regDict';
const Ranks_v = () => {d3.select("#canvas_rank").remove(); d3.select("#canvas_scatter").remove()
d3.select("#canvas_bar").remove();
let [mood,setMood]=useState("happy");
let [year,setYear]=useState(2016);
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

let cnts1=rankDict[year].slice(0,med).map(d=>d[0].replace("Bosnia and Herzegovina","Bosnia a. Herzegovina"));
let lst1=0;let lend1=med;

let cnts2=rankDict[year].slice().reverse().slice(0,med-b).map(d=>d[0]);
let lst2=med;let lend2=l;

let canvas=d3.select("body").append("svg")
.attr("id","canvas_rank");
let w=+d3.select("#canvas_rank").style("width").slice(0,-2);
let h=+d3.select("#canvas_rank").style("height").slice(0,-2); 
let pad=(1/7)*w;
let xScale1=d3.scaleLinear().domain([0,8]).range([pad,w/2]);
let xScale2=d3.scaleLinear().domain([0,8]).range([w/2+pad,w-pad]);                     
let yScale1=d3.scaleBand().domain(cnts1).range([0,h-0.5*pad]).padding(0.15);
let yScale2=d3.scaleBand().domain(cnts2).range([0,h-0.5*pad]).padding(0.15);
let yAxis1=d3.axisLeft(yScale1);
let yAxis2=d3.axisLeft(yScale2);                  canvas.append('g').call(yAxis1).attr('transform','translate('+pad+',0)').style("font",`${(9/550)*h}`+"px montserrat");
                    canvas.append('g').call(yAxis2).attr('transform','translate('+0.642*w+',0)').style("font",`${(7/380)*w}`+"px montserrat");
canvas.selectAll('rect1').data(rankDict[year].slice(0,med)).enter().append('rect').attr('x',xScale1(0)).attr('y',d=>yScale1(d[0].replace("Bosnia and Herzegovina","Bosnia a. Herzegovina"))).attr('width',d=>xScale1(d[2])).attr('height',yScale1.bandwidth()).style("fill",d=>regDict[d[1]]).style("stroke","grey").style("stroke-width","0.5px");
canvas.selectAll('rect2').data(rankDict[year].slice().reverse().slice(0,med-b)).enter().append('rect').attr('x',xScale2(0)).attr('y',d=>yScale2(d[0].replace("Bosnia and Herzegovina","Bosnia a. Herzegovina"))).attr('width',d=>xScale2(d[2])).attr('height',yScale2.bandwidth()).style("fill",d=>regDict[d[1]]).style("stroke","grey").style("stroke-width","0.5px");
  return (<div>Ranked</div>)
}
export default Ranks_v;