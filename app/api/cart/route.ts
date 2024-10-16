import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { findOrCreateCart, hasAllIngredients, updateCartTotalAmount } from "@/shared/lib";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.error("[CART_GET] Server error:", error);

    return NextResponse.json({ message: "Failed to get cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
      },
      include: {
        ingredients: true,
      },
    });

    const findCartItem = findCartItems.find((cartItem) => {
      return hasAllIngredients(
        cartItem.ingredients.map((ingredient) => ingredient.id),
        data.ingredients
      );
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productVariantId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);

    resp.cookies.set("cartToken", token);

    return resp;
  } catch (error) {
    console.error("[CART_POST] Server error:", error);

    return NextResponse.json({ message: "Failed to create cart" }, { status: 500 });
  }
}
