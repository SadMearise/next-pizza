import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface Props {
  name: string;
  details: string;
  className?: string;
}

const CartItemInfo: FC<Props> = ({ name, details, className }) => {
  return (
    <div>
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details && <p className="text-xs text-gray-400">{details}</p>}
    </div>
  );
};

export default CartItemInfo;
