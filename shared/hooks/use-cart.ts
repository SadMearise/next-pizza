import { useEffect } from "react";
import { useCartStore } from "../store";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../lib/get-cart-details";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  useEffect(() => {
    cartState.fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cartState;
};

export default useCart;
