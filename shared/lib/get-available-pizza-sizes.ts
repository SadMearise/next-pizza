import { ProductVariant } from "@prisma/client";
import { PIZZA_SIZES, PizzaType } from "../constants";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaSizes = (type: PizzaType, variants: ProductVariant[]): Variant[] => {
  const filteredPizzasByType = variants.filter((variant) => variant.pizzaType === type);
  const availablePizzaSizes = PIZZA_SIZES.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));

  return availablePizzaSizes;
};
