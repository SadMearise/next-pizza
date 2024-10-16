"use client";

import { FC, PropsWithChildren, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCartItemDetails, getDeclension } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { useCart } from "@/shared/hooks";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button, Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui";
import CartDrawerItem from "./cart-drawer-item";
import Title from "./title";

const CartDrawer: FC<PropsWithChildren> = ({ children }) => {
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();
  const [redirecting, setRedirecting] = useState(false);

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;

    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <VisuallyHidden>
          <SheetTitle>Drawer</SheetTitle>
        </VisuallyHidden>
        <div className={cn("flex flex-col h-full", !totalAmount && "justify-center")}>
          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Корзина пустая"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">Добавьте хотя бы один товар, чтобы совершить заказ</p>
              <SheetClose asChild>
                <Button
                  className="w-56 h-12 text-base"
                  size="lg"
                >
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}
          {totalAmount > 0 && (
            <>
              <SheetHeader>
                <SheetTitle>
                  В корзине{" "}
                  <span className="font-bold">{getDeclension(items.length, ["товар", "товара", "товаров"])}</span>
                </SheetTitle>
              </SheetHeader>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                {items.map(({ id, imageUrl, pizzaSize, pizzaType, ingredients, disabled, name, price, quantity }) => (
                  <div
                    className="mb-2 last:mb-0"
                    key={id}
                  >
                    <CartDrawerItem
                      id={id}
                      imageUrl={imageUrl}
                      details={getCartItemDetails(ingredients, pizzaType as PizzaType, pizzaSize as PizzaSize)}
                      disabled={disabled || loading}
                      name={name}
                      price={price}
                      quantity={quantity}
                      onClickCountButton={(type) => onClickCountButton(id, quantity, type)}
                      onClickRemove={() => removeCartItem(id)}
                    />
                  </div>
                ))}
              </div>
              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      type="submit"
                      loading={redirecting}
                      className="w-full h-12 text-base"
                      onClick={() => setRedirecting(true)}
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
