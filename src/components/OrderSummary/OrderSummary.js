import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Button from '../../UI/Button/Button';
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
class OrderSummary extends Component {
  render() {
    const orderSummary = Object.entries(this.props.ingredients);
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
        <p>Current Price: $<strong>{this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.puchaseCancelled} class="Danger">Cancel</Button>
        <Button clicked={this.props.purchaseContinue} class="Success">Continue</Button>
      </Aux>
    );
  }
}

export default OrderSummary;