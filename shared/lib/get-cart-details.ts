import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO | null): ReturnProps => {
  let items: CartStateItem[] = [];

  if (data) {
    items = data.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      name: item.productVariant.product.name,
      imageUrl: item.productVariant.product.imageUrl,
      price: calcCartItemTotalPrice(item),
      disabled: false,
      pizzaSize: item.productVariant.size,
      pizzaType: item.productVariant.pizzaType,
      ingredients: item.ingredients.map((ingredient) => ({
        name: ingredient.name,
        price: ingredient.price,
      })),
    })) as CartStateItem[];
  }

  return {
    items,
    totalAmount: data ? data.totalAmount : 0,
  };
};
