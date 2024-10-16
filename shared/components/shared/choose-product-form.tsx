import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { Button } from "../ui";
import Title from "./title";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  onSubmit?: () => void;
  loading?: boolean;
  className?: string;
}

const ChooseProductForm: FC<Props> = ({ name, imageUrl, onSubmit, price, loading, className }) => {
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="flex flex-col justify-between w-[490px] bg-[#F7F6F5] p-7">
        <Title
          text={name}
          size="md"
          className="font-extrabold mb-1"
        />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};

export default ChooseProductForm;
