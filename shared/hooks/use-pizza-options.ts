import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { ProductVariant } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants";
import { Variant } from "../components/shared/group-variants";
import { getAvailablePizzaSizes } from "../lib";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentVariantId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
}

const usePizzaOptions = (variants: ProductVariant[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const availableSizes = getAvailablePizzaSizes(type, variants);

  const currentVariantId = variants.find((variant) => variant.pizzaType === type && variant.size === size)?.id;

  useEffect(() => {
    const isAvailableSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled);
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [availableSizes, size]);

  return { size, type, selectedIngredients, availableSizes, currentVariantId, setSize, setType, addIngredient };
};

export default usePizzaOptions;
