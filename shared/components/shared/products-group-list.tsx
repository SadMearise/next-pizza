"use client";

import React, { FC, useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store";
import { ProductWithRelations } from "@/@types/prisma";
import Title from "./title";
import ProductCard from "./product-card";

interface Props {
  className?: string;
  listClassName?: string;
  title: string;
  categoryId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: ProductWithRelations[];
}

const ProductsGroupList: FC<Props> = ({ className, listClassName, title, categoryId, items }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title]);

  return (
    <div
      className={className}
      id={title}
      ref={intersectionRef}
    >
      <Title
        text={title}
        size="lg"
        className="font-extrabold mb-5"
      />
      <div className={cn("grid grid-cols-1 gap-8 xl:gap-[50px] md:grid-cols-2 xl:grid-cols-3", listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variants[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;
