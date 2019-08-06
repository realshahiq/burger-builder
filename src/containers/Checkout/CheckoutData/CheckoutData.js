import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';
import './CheckoutData.css';
class CheckoutData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: ''
      },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'text',
          placeholder: 'Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: ''
      }
    },
    loading: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      // customer: {
      //   name: 'Syed Shahiq',
      //   address: {
      //     street: 'Teststreet 1',
      //     zipcode: '12321'
      //   },
      //   email: 'shahiqurrehman@gmail.com',
      // },
      // deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order).then(response => {
      this.setState({ loading: false });
      this.props.history.push("/");
    }).catch(error => {
      this.setState({ loading: false })
    })
  }
  inputChangeHandler = (event, elementId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[elementId] };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[elementId] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  }
  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <div>
        <h4>Enter Your Contact Data</h4>
        <form>
          {formElementArray.map(formElement => (
            <Input changed={(event) => this.inputChangeHandler(event, formElement.id)} key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} />
          ))}
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


