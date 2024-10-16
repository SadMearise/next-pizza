import qs from "qs";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";

const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.selectedPizzaTypes),
        sizes: Array.from(filters.selectedSizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, {
        arrayFormat: "comma",
      });

      router.push(`?${query}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [filters, router]);
};

export default useQueryFilters;
