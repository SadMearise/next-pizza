import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface Props {
  text: string;
  className?: string;
}

const ErrorText: FC<Props> = ({ text, className }) => {
  return <p className={cn("text-red-500 text-sm", className)}>{text}</p>;
};

export default ErrorText;
