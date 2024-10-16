import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants";

/**
 * Function for pizza cost calculation
 * @param type - batter type
 * @param size - pizza size
 * @param variants - variants list
 * @param ingredients - ingredients list
 * @param selectedIngredients - selected ingredients
 * @returns {number} total price
 * @example
 * // Example usage:
 * const totalPrice = calcTotalPizzaPrice(type, size, variants, ingredients, selectedIngredients);
 * console.error(totalPrice); // Outputs: 13
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice = variants.find((variant) => variant.pizzaType === type && variant.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = pizzaPrice + totalIngredientsPrice;

  return totalPrice;
};
