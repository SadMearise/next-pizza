import { FC } from "react";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import WhiteBlock from "../white-block";
import CheckoutItem from "../checkout-item";
import CheckoutItemSkeleton from "../checkout-item-skeleton";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

const CheckoutCart: FC<Props> = ({ items, onClickCountButton, removeCartItem, loading, className }) => {
  return (
    <WhiteBlock
      title="1. Корзина"
      className={className}
    >
      <div className="flex flex-col gap-5">
        {loading && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)}

        {!loading &&
          items.map(({ id, imageUrl, pizzaSize, pizzaType, ingredients, disabled, name, price, quantity }) => (
            <CheckoutItem
              key={id}
              id={id}
              imageUrl={imageUrl}
              details={getCartItemDetails(ingredients, pizzaType as PizzaType, pizzaSize as PizzaSize)}
              name={name}
              price={price}
              quantity={quantity}
              disabled={disabled}
              onClickCountButton={(type) => onClickCountButton(id, quantity, type)}
              onClickRemove={() => removeCartItem(id)}
            />
          ))}
      </div>
    </WhiteBlock>
  );
};

export default CheckoutCart;
