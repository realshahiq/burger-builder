import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import CheckoutData from './CheckoutData/CheckoutData';
import {connect} from 'react-redux';
class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ingredients} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} />
        <Route path={this.props.match.path + '/contact-data'} render={(props) => <CheckoutData price={this.props.totalPrice} ingredients={this.props.ingredients} {...this.props} />} />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.brgbuilder.ingredients,
    totalPrice: state.brgbuilder.totalPrice
  }
}

export default connect(mapStateToProps) (Checkout);