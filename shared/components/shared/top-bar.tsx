import { FC } from "react";
import { Category } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import Container from "./container";
import Categories from "./categories";
import CartButton from "./cart-button";

interface Props {
  categories: Category[];
  className?: string;
}

const TopBar: FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-20", className)}>
      <Container className="flex items-center justify-between ">
        <Categories items={categories} />

        <CartButton />
      </Container>
    </div>
  );
};

export default TopBar;
