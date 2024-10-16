import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import { FC } from "react";

interface Props {
  onClick?: () => void;
  className?: string;
}

const ClearButton: FC<Props> = ({ onClick, className }) => {
  return (
    <button
      aria-label="Clear"
      type="button"
      onClick={onClick}
      className={cn("opacity-30 hover:opacity-100 cursor-pointer", className)}
    >
      <X className="h-5 w-5" />
    </button>
  );
};

export default ClearButton;
