"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import { FC } from "react";
import toast from "react-hot-toast";
import ChoosePizzaForm from "./choose-pizza-form";
import ChooseProductForm from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  onSubmit?: () => void;
  className?: string;
}

const ProductForm: FC<Props> = ({ product, onSubmit: _onSubmit, className }) => {
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  const firstVariant = product.variants[0];
  const isPizzaForm = Boolean(product.variants[0].pizzaType);

  const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
    try {
      const variantId = productVariantId ?? firstVariant.id;

      addCartItem({
        productVariantId: variantId,
        ingredients,
      });

      toast.success(`${product.name} добавлен в корзину`);
      _onSubmit?.();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину");
      console.log(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        className={className}
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variants={product.variants}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      className={className}
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstVariant.price}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default ProductForm;
