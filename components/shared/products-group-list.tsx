"use client";

import React, { FC, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";
import Title from "./title";
import ProductCard from "./product-card";

interface Props {
  className?: string;
  listClassName?: string;
  title: string;
  categoryId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
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
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;
