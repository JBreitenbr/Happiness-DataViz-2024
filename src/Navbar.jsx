import {Link} from 'react-router-dom';
const Navbar = () => {
  return (
    <ul className="flex" style={{backgroundColor:"#fcfcfc",width:"100vw",borderBottom:"#21234a 1px solid"}}>
  <li className="-mb-px mr-1">
    <Link to="/Happiness-DataViz-2024" className="inline-block py-2 px-6 text-slate-600 hover:text-slate-800 font-semibold">Ranking</Link>
  </li>
  <li className="mr-1">
    <Link to="/Happiness-DataViz-2024/bars" className="inline-block py-2 px-6 text-slate-600 hover:text-slate-800 font-semibold">Barcharts</Link>
  </li>
  <li className="mr-1">
    <Link to="/Happiness-DataViz-2024/scatter" className="inline-block py-2 px-6 text-slate-600 hover:text-slate-800 font-semibold">Scatterplot</Link>
  </li>
</ul>)
}

export default Navbar;