import {Link} from 'react-router-dom';
const Navbar = () => {
  return (
    <ul className="flex border-b">
  <li className="-mb-px mr-1">
    <Link to="/Happiness-DataViz-2024" className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">Choropleth</Link>
  </li>
  <li className="mr-1">
    <Link to="/Happiness-DataViz-2024/bars" className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">Barcharts</Link>
  </li>
  <li className="mr-1">
    <Link to="/Happiness-DataViz-2024/scatter" className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold">Scatterplot</Link>
  </li>
</ul>)
}

export default Navbar;