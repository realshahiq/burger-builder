import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
}
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  }
  updatePurchaseableState = (ingredients) => {
    let count = 0;
    for (var key in ingredients) {
      count = count + ingredients[key];
    }
    if (count > 0) {
      this.setState({ purchaseable: true });
    } else {
      this.setState({ purchaseable: false });
    }
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    this.updatePurchaseableState(updatedIngredient);
  }
  removeIngredientHandler = (type) => {
    const oldcount = this.state.ingredients[type];
    if (oldcount > 0) {
      const updatedCount = oldcount - 1;
      const updatedIngredient = { ...this.state.ingredients };
      updatedIngredient[type] = updatedCount;
      const priceSubtracted = INGREDIENT_PRICE[type];
      if (this.state.totalPrice > 4) {
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtracted;
        this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
        this.updatePurchaseableState(updatedIngredient);
      }
    }
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }
  cancelpurchaseHandler = () => {
    this.setState({ purchasing: false });
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}></Burger>
        <Modal cancelled={this.cancelpurchaseHandler} show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <BuildControls
          purchasing={this.purchaseHandler}
          purchaseable={this.state.purchaseable}
          price={this.state.totalPrice}
          disabled={disabledInfo}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}>
        </BuildControls>
      </Aux>
    );
  }
}

export default BurgerBuilder;