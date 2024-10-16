import { cn } from "@/shared/lib/utils";
import { FC, ReactNode } from "react";

interface Props {
  title?: ReactNode;
  value?: ReactNode;
  className?: string;
}

const CheckoutItemDetails: FC<Props> = ({ title, value, className }) => {
  return (
    <div className={cn("flex my-4", className)}>
      <span className="flex flex-1 text-lg text-neutral-500">
        {title}
        <span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>

      <span className="font-bold text-lg">{value}</span>
    </div>
  );
};

export default CheckoutItemDetails;
