import React, { Component } from 'react';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import './CheckoutData.css';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import * as actionCreatorOrder from '../../../store/actions/orderActions';
class CheckoutData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: '',
        validation: {},
        valid: true
      }
    },
    formValid: false,
    loading: false,
  }
  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let forElementIdentifier in this.state.orderForm) {
      formData[forElementIdentifier] = this.state.orderForm[forElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    // axios.post('/orders.json', order).then(response => {
    //   this.setState({ loading: false });
    //   this.props.history.push("/");
    // }).catch(error => {
    //   this.setState({ loading: false })
    // })
    this.props.onPlaceOrder(order);
  }
  inputChangeHandler = (event, elementId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[elementId] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[elementId] = updatedFormElement;
    let formValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formValid = updatedOrderForm[inputIdentifier].valid && formValid;
    }
    this.setState({ orderForm: updatedOrderForm, formValid: formValid });
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
        <form onSubmit={this.orderHandler}>
          {formElementArray.map(formElement => (
            <Input changed={(event) => this.inputChangeHandler(event, formElement.id)}
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              validations={formElement.config.validation}
            />
          ))}
          <Button class="Success" disabled={!this.state.formValid} >ORDER NOW</Button>
        </form>
      </div>
    )
    if (this.props.loading) {
      form = <Redirect to="/"/>
    }
    return (
      <div className="ContactData">
        {form}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.brgbuilder.ingredients,
    totalPrice: state.brgbuilder.totalPrice,
    loading: state.order.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onPlaceOrder: (order) => dispatch(actionCreatorOrder.placeOrder(order))
  }
}
export default connect (mapStateToProps,mapDispatchToProps)(CheckoutData);