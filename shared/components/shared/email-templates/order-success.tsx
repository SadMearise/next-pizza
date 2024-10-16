import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { FC } from "react";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

const OrderSuccessTemplate: FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку! 🎉</h1>

    <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productVariant.product.name} | {item.productVariant.price} ₽ x {item.quantity} шт. ={" "}
          {item.productVariant.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);

export default OrderSuccessTemplate;
