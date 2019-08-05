import React, { Component } from 'react';
import Button from '../../../UI/Button/Button';
import './CheckoutData.css';
class CheckoutData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }
  render() {
    return (
      <div className="ContactData">
        <h4>Enter Your Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Email" />
          <input type="text" name="street" placeholder="Your Street" />
          <input type="text" name="postalcode" placeholder="Your Postal Code" />
          <Button class="Success">ORDER NOW</Button>
        </form>
      </div>
    )
  }
}

export default CheckoutData;


