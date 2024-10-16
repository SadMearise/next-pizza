import { MAP_PIZZA_TYPE, PizzaSize, PizzaType } from "../constants";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = MAP_PIZZA_TYPE[pizzaType];
    details.push(`${typeName} ${pizzaSize}см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
