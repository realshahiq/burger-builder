import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';
const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
}
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false
  }
  componentDidMount() {
    axios.get('https://burger-builder-4a827.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      }).catch(error => { })
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
  continuePurchaseHandler = () => {
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Syed Shahiq',
    //     address: {
    //       street: 'Teststreet 1',
    //       zipcode: '12321'
    //     },
    //     email: 'shahiqurrehman@gmail.com',
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order).then(response => {
    //   this.setState({ loading: false, purchasing: false });
    // }).catch(error => {
    //   this.setState({ loading: false, purchasing: false })
    // })
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    const queryString =  queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let order_summary = null;
    let burger = <Spinner />
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}></Burger>
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
      order_summary = <OrderSummary
        puchaseCancelled={this.cancelpurchaseHandler}
        purchaseContinue={this.continuePurchaseHandler}
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
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

export default WithErrorHandler(BurgerBuilder, axios);