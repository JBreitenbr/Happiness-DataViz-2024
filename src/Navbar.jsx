import {Link} from 'react-router-dom';
const Navbar = () => {
  return (
    <ul className="flex border-b">
  <li className="-mb-px mr-1">
    <Link to="/Happiness-DataViz-2024" className="inline-block py-2 px-6 text-teal-500 hover:text-teal-800 font-semibold">Ranking</Link>
  </li>
  <li className="mr-1">
    <Link to="/Happiness-DataViz-2024/bars" className="inline-block py-2 px-6 text-teal-500 hover:text-teal-800 font-semibold">Barcharts</Link>
  </li>
  <li className="mr-1">
    <Link to="/Happiness-DataViz-2024/scatter" className="inline-block py-2 px-6 text-teal-500 hover:text-teal-800 font-semibold">Scatterplot</Link>
  </li>
</ul>)
}

export default Navbar;