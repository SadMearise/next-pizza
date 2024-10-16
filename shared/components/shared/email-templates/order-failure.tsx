import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { FC } from "react";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

const OrderFailureTemplate: FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Ошибка при оплате заказа</h1>

    <p>К сожалению, произошла ошибка при оплате заказа #{orderId}. Попробуйте еще раз.</p>

    <hr />

    <p>Список товаров в вашем заказе:</p>
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
export default OrderFailureTemplate;
