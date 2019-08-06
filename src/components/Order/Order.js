import React from 'react';
import './Order.css';
const order = (props) => (
  <div className="Order">
    <p>Ingredients:Salad({props.ingredients.salad}),Bacon({props.ingredients.bacon}),Cheese({props.ingredients.cheese}),Meat({props.ingredients.meat})</p>
    <p>Price:<strong>{props.price}</strong></p>
  </div>
)
export default order;