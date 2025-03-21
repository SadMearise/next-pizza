import { PaymentCallbackData } from "@/@types/yookassa";
import prisma from "@/prisma/prisma-client";
import { OrderFailureTemplate, OrderSuccessTemplate } from "@/shared/components";
import { PROJECT_NAME } from "@/shared/constants";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        `${PROJECT_NAME} / Ваш заказ успешно оформлен 🎉`,
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    } else {
      await sendEmail(
        order.email,
        `${PROJECT_NAME} / Произошла ошибка при оплате заказа`,
        OrderFailureTemplate({ orderId: order.id, items })
      );
    }
  } catch (error) {
    console.error("[Checkout Callback] Server error:", error);
    return NextResponse.json({ error: "Server error" });
  }
}
