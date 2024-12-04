import './App.css'
import {useState} from 'react';

import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Navbar from './Navbar'
import Barcharts from './Barcharts'
import Scatter from './Scatter'
import Ranks from './Ranks'
import Ranks_v from './Ranks_v'
import Helper from './Helper'
export default function App() { 
let [width, setWidth]=useState(window.innerWidth);
  let [height, setHeight]=useState(window.innerHeight);
  return (
      <><Router>
        <Navbar/>
        <Routes>
          {width<1200?<Route path="/Happiness-DataViz-2024" element={<Ranks_v/>}/>:<Route path="/Happiness-DataViz-2024" element={<Helper/>}/>}
          <Route path="/Happiness-DataViz-2024/bars" element={<Barcharts/>}/>
          <Route path="/Happiness-DataViz-2024/scatter" element={<Scatter/>}/>
          </Routes>
        </Router>
    </>
  )
}
