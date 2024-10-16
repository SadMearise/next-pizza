import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { Trash2Icon } from "lucide-react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import * as CartItemDetails from "./cart-item-details";
import { CountButton } from "./count-button";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

const CartDrawerItem: FC<Props> = ({
  onClickCountButton,
  onClickRemove,
  className,
  imageUrl,
  details,
  disabled,
  name,
  price,
  quantity,
}) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6", { "opacity-50 pointer-events-none": disabled }, className)}>
      <CartItemDetails.Image src={imageUrl} />

      <div className="flex-1">
        <CartItemDetails.Info
          name={name}
          details={details}
        />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton
            onClick={onClickCountButton}
            value={quantity}
          />

          <div className="flex items-center gap-3">
            <CartItemDetails.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onClickRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawerItem;
