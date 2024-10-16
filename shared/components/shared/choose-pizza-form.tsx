"use client";

import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { PIZZA_TYPES, PizzaSize, PizzaType } from "@/shared/constants";
import { Ingredient, ProductVariant } from "@prisma/client";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";
import PizzaImage from "./pizza-image";
import Title from "./title";
import { Button } from "../ui";
import GroupVariants from "./group-variants";
import IngredientItem from "./ingredient-item";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];
  loading?: boolean;
  onSubmit: (variantId: number, ingredients: number[]) => void;
  className?: string;
}

const ChoosePizzaForm: FC<Props> = ({ imageUrl, name, ingredients, variants, loading, onSubmit, className }) => {
  const { size, type, selectedIngredients, availableSizes, currentVariantId, setSize, setType, addIngredient } =
    usePizzaOptions(variants);

  const { totalPrice, textDetails } = getPizzaDetails(type, size, variants, ingredients, selectedIngredients);

  const handleClickAdd = () => {
    if (currentVariantId) {
      onSubmit(currentVariantId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage
        imageUrl={imageUrl}
        size={size}
      />

      <div className="w-[490px] bg-[#F7F6F5] p-7">
        <Title
          text={name}
          size="md"
          className="font-extrabold mb-1"
        />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            variants={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            variants={PIZZA_TYPES}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};

export default ChoosePizzaForm;
