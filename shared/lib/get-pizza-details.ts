import { Ingredient, ProductVariant } from "@prisma/client";
import { MAP_PIZZA_TYPE, PizzaSize, PizzaType } from "../constants";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(type, size, variants, ingredients, selectedIngredients);
  const textDetails = `${size} см, ${MAP_PIZZA_TYPE[type]} тесто`;

  return { totalPrice, textDetails };
};
