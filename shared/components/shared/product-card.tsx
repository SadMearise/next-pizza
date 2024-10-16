import Link from "next/link";
import React, { FC } from "react";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import Title from "./title";
import { Button } from "../ui";

interface Props {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}
const ProductCard: FC<Props> = ({ id, price, name, imageUrl, ingredients, className }) => {
  return (
    <div className={cn("relative flex flex-col", className)}>
      <div className="relative flex justify-center bg-secondary rounded-lg pt-[100%]">
        <img
          className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] p-6 xl:max-w-[215px] w-full"
          src={imageUrl}
          alt={name}
        />
      </div>
      <Title
        text={name}
        size="sm"
        className="mb-1 mt-3 font-bold"
      />

      <p className="text-sm text-gray-400">{ingredients.map((ingredient) => ingredient.name).join(", ")}</p>

      <div className="flex justify-between items-center mt-auto pt-4 gap-2">
        <span className="text-[20px] whitespace-nowrap">
          от <b>{price} ₽</b>
        </span>

        <Link
          href={`/product/${id}`}
          className="z-10"
        >
          <Button variant="secondary">
            <Plus
              size={20}
              className="mr-1"
            />
            Выбрать
          </Button>
        </Link>
      </div>
      <Link
        href={`/product/${id}`}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
};

export default ProductCard;
