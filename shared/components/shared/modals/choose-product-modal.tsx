"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { ProductWithRelations } from "@/@types/prisma";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ProductForm from "../product-form";
import { Dialog, DialogContent, DialogTitle } from "../../ui";

interface Props {
  className?: string;
  product: ProductWithRelations;
}

const ChooseProductModal: FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={() => router.back()}
    >
      <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}>
        <VisuallyHidden>
          <DialogTitle>Product Modal</DialogTitle>
        </VisuallyHidden>

        <ProductForm
          product={product}
          onSubmit={() => router.back()}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;
