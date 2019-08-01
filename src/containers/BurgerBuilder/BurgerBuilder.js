import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
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
    totalPrice: 4
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
      }
    }

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
        {/* <div>Build Controls</div> */}
        <BuildControls disabled={disabledInfo} addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler}></BuildControls>
      </Aux>
    );
  }
}

export default BurgerBuilder;