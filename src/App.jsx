import './App.css'
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Navbar from './Navbar'
import Choropleth from './Choropleth'
import Barcharts from './Barcharts'
import Scatter from './Scatter'
export default function App() {
  return (
      <><Router>
        <Navbar/>
        <Routes>
           <Route path="/" element={<Choropleth/>}/>
          <Route path="/bars" element={<Barcharts/>}/>
          <Route path="/scatter" element={<Scatter/>}/>
          </Routes>
        </Router>
    </>
  )
}
