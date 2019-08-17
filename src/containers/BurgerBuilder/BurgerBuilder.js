import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as actionCreatorBurgerBuilder from '../../store/actions/BurgerBuilderActions';
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false
  }
  componentDidMount() {
    // axios.get('https://burger-builder-4a827.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   }).catch(error => { })
  }
  updatePurchaseableState = (ingredients) => {
    let count = 0;
    for (var key in ingredients) {
      count = count + ingredients[key];
    }
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredient = { ...this.state.ingredients };
  //   updatedIngredient[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
  //   this.updatePurchaseableState(updatedIngredient);
  // }
  // removeIngredientHandler = (type) => {
  //   const oldcount = this.state.ingredients[type];
  //   if (oldcount > 0) {
  //     const updatedCount = oldcount - 1;
  //     const updatedIngredient = { ...this.state.ingredients };
  //     updatedIngredient[type] = updatedCount;
  //     const priceSubtracted = INGREDIENT_PRICE[type];
  //     if (this.state.totalPrice > 4) {
  //       const oldPrice = this.state.totalPrice;
  //       const newPrice = oldPrice - priceSubtracted;
  //       this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
  //       this.updatePurchaseableState(updatedIngredient);
  //     }
  //   }
  // }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }
  cancelpurchaseHandler = () => {
    this.setState({ purchasing: false });
  }
  continuePurchaseHandler = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
    this.props.history.push('/checkout');
  }
  render() {
    const disabledInfo = {
      ...this.props.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let order_summary = null;
    let burger = <Spinner />
    if (this.props.ingredients) {
      let check = this.updatePurchaseableState(this.props.ingredients);
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients}></Burger>
          <BuildControls
            purchasing={this.purchaseHandler}
            purchaseable={check}
            price={this.props.totalPrice}
            disabled={disabledInfo}
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}>
          </BuildControls>
        </Aux>
      );
      order_summary = <OrderSummary
        puchaseCancelled={this.cancelpurchaseHandler}
        purchaseContinue={this.continuePurchaseHandler}
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
      />;
    }
    if (this.state.loading) {
      order_summary = <Spinner />;
    }
    return (
      <Aux>
        <Modal cancelled={this.cancelpurchaseHandler} show={this.state.purchasing}>
          {order_summary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actionCreatorBurgerBuilder.addIngredients(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actionCreatorBurgerBuilder.removeIngredients(ingName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));