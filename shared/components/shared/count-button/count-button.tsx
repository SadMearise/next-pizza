import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import CountIconButton from "./count-icon-button";
import { ButtonSize } from "./count-button.types";

interface CountButtonProps {
  value?: number;
  size?: ButtonSize;
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
}

const CountButton: FC<CountButtonProps> = ({ className, onClick, value = 1, size = "sm" }) => {
  return (
    <div className={cn("inline-flex items-center justify-between gap-3", className)}>
      <CountIconButton
        onClick={() => onClick?.("minus")}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>

      <CountIconButton
        onClick={() => onClick?.("plus")}
        size={size}
        type="plus"
      />
    </div>
  );
};

export default CountButton;
