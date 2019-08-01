import React from 'react';
import './BuildControl.css';
const BuildControl = (props) => {
  return (
    <div className="BuildControl">
      <div className="Label">{props.label}</div>
      <button className="Less">LESS</button>
      <button onClick = {()=>props.added(props.type)} className="More">More</button>
    </div>
  );
}
export default BuildControl;