import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import './CheckoutData.css';
class CheckoutData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Syed Shahiq',
        address: {
          street: 'Teststreet 1',
          zipcode: '12321'
        },
        email: 'shahiqurrehman@gmail.com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order).then(response => {
      this.setState({ loading: false });
      this.props.history.push("/");
    }).catch(error => {
      this.setState({ loading: false })
    })
  }
  render() {
    let form = (
      <div>
        <h4>Enter Your Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Email" />
          <input type="text" name="street" placeholder="Your Street" />
          <input type="text" name="postalcode" placeholder="Your Postal Code" />
          <Button class="Success" clicked={this.orderHandler}>ORDER NOW</Button>
        </form>
      </div>
    )
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className="ContactData">
        {form}
      </div>
    )
  }
}

export default CheckoutData;


