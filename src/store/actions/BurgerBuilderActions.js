import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}
export const removeIngredients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-4a827.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            }).catch(error => {
                console.log(error);
            })
    }
}