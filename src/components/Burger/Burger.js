import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map(igkey => {
    return [...Array(props.ingredients[igkey])].map((_, i) => {
      return <BurgerIngredient key={igkey + i} type={igkey}></BurgerIngredient>
    });
  });
  let count_ingredients = 0;
  transformedIngredients.forEach(transformedIngredient => {
    count_ingredients = count_ingredients + transformedIngredient.length;
  });
  if (count_ingredients === 0) {
    transformedIngredients = <p>Please Add Some Ingredients</p>;
  }
    // if(transformedIngredients.isEmpty()) {
    //   console.log('DASDASDS');
    // }
    // console.log(transformedIngredients);
    // let key = 0;
    // const transformedIngredients = Object.entries(props.ingredients);
    // const burger = transformedIngredients.map(ingredient => {
    //   let ingredient_array = [];
    //   for (let index = 0; index < ingredient[1]; index++) {
    //     key++;
    //     ingredient_array[index] = <BurgerIngredient key={key} type={ingredient[0]}></BurgerIngredient>
    //   }
    //   return ingredient_array;
    // })
    return (
      <div className="burger">
        <BurgerIngredient type="bread-top"></BurgerIngredient>
        {/* {burger} */}
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom"></BurgerIngredient>
      </div>
    );
}
export default Burger;