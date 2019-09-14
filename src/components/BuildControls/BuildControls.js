import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
];
const BuildControls = (props) => (
  <div className="BuildControls">
    <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
    {
      controls.map(control => (
        <BuildControl disabled={props.disabled[control.type]} added={props.addIngredient} removed={props.removeIngredient} type={control.type} label={control.label} key={control.label}></BuildControl>
      ))
    }
    <button onClick={props.purchasing} disabled={!props.purchaseable} className="OrderButton">{props.auth?'ORDER NOW':'SignIn To Order'}</button>
  </div>
);

export default BuildControls;