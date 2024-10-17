import './App.css'
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Navbar from './Navbar'
import Ranking from './Ranking'
import Barcharts from './Barcharts'
import Scatter from './Scatter'
import Happiest from './Happiest'
import Unhappiest from './Unhappiest'
import Ranked from './Ranked'
export default function App() {
  return (
      <><Router>
        <Navbar/>
        <Routes>
           <Route path="/Happiness-DataViz-2024" element={<Ranked/>}/>
          <Route path="/Happiness-DataViz-2024/bars" element={<Barcharts/>}/>
          <Route path="/Happiness-DataViz-2024/scatter" element={<Scatter/>}/>
          </Routes>
        </Router>
    </>
  )
}
