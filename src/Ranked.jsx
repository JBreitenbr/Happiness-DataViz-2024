import {useState} from 'react';
import Happiest from  './Happiest';
import Unhappiest from './Unhappiest';
const Ranked = () => {
  let [mood,setMood]=useState("happy");
  let moods=["happy","unhappy"];
  const handleChange = (event) => {
    setMood(event.target.value);
  }
  return (<div className="wrapper"><select value={mood} onChange={handleChange}>{moods.map(item=><option key={item} value={item}>{item}</option>)}</select>{mood=="happy"?<Happiest/>:<Unhappiest/>}</div>);
}

export default Ranked;