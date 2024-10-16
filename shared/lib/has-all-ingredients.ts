import { CreateCartItemValues } from "../services/dto/cart.dto";

export const hasAllIngredients = (
  currentIngredients: number[],
  requiredIngredients: CreateCartItemValues["ingredients"]
) => {
  if (!requiredIngredients) return false;

  return (
    requiredIngredients.every((ingredient) => currentIngredients.includes(ingredient)) &&
    currentIngredients.length === requiredIngredients.length
  );
};
