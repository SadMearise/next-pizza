import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  selectedSizes: Set<string>;
  selectedPizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setSelectedPizzaTypes: (value: string) => void;
  setSelectedSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );
  const [selectedSizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : [])
  );
  const [selectedPizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.has("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",") : [])
  );
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return useMemo(
    () => ({
      selectedSizes,
      selectedPizzaTypes,
      selectedIngredients,
      prices,
      setPrices: updatePrice,
      setSelectedPizzaTypes: togglePizzaTypes,
      setSelectedSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }),
    [prices, selectedIngredients, selectedPizzaTypes, selectedSizes, toggleIngredients, togglePizzaTypes, toggleSizes]
  );
};

export default useFilters;
