import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { Skeleton } from "../ui";

interface Props {
  className?: string;
}

const CheckoutItemSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-between h-[60px]", className)}>
      <div className="flex items-center gap-5">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
        <Skeleton className="w-40 h-5 rounded" />
      </div>
      <div className="flex items-center gap-20">
        <Skeleton className="h-5 w-10 rounded" />
        <Skeleton className="h-8 w-[133px] rounded" />
      </div>
    </div>
  );
};

export default CheckoutItemSkeleton;
