import React from 'react';
import Aux from '../../hoc/Aux';
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
const OrderSummary = (props) => {
    const orderSummary = Object.entries(props.ingredients);
    const summary = orderSummary.map(ingredient => (
        <li key={ingredient[0]}>{capitalize(ingredient[0]) + ':' + ingredient[1]}</li>
    ));
    return (
        <Aux>
            <h1>Your Order</h1>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {summary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );
}

export default OrderSummary;