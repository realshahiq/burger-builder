import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
];
// const buildcontrol = controls.map(control=>{
//   return <BuildControl key = {control.label}label={control.label}></BuildControl>
// })
const BuildControls = (props) => (
  <div className="BuildControls">
    {
      controls.map(control => (
        <BuildControl disabled={props.disabled[control.type]} added={props.addIngredient} removed={props.removeIngredient} type={control.type} label={control.label} key={control.label}></BuildControl>
      ))
    }
    {/* {buildcontrol} */}
  </div>
);

export default BuildControls;