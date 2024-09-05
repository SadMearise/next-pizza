import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

interface Props {
  className?: string;
}

const Container: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>;
};

export default Container;
