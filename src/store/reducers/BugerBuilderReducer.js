import * as actionTypes from '../actions/actionTypes';
const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
}
const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  },
  totalPrice: 4,
}
const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_INGREDIENTS) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    }
  }
  if (action.type === actionTypes.REMOVE_INGREDIENTS) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
    }
  }
  return state;
}


export default reducer;