import { PaymentData } from "@/@types/yookassa";
import axios from "axios";
import { YOOKASSA_API_KEY, YOOKASSA_CALLBACK_URL, YOOKASSA_STORE_ID } from "../constants";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    "https://api.yookassa.ru/v3/payments",
    {
      amount: {
        value: details.amount.toString(),
        currency: "RUB",
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: "redirect",
        return_url: YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: YOOKASSA_STORE_ID as string,
        password: YOOKASSA_API_KEY as string,
      },
      headers: {
        "Content-Type": "application/json",
        "Idempotence-Key": Math.random().toString(36).substring(7),
      },
    }
  );

  return data;
}
