"use client";

import { DADATA_API_KEY } from "@/shared/constants";
import { FC } from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

const AddressInput: FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token={DADATA_API_KEY || ""}
      onChange={(data) => onChange?.(data?.value)}
      inputProps={{
        style: {
          height: "48px",
          width: "100%",
          borderRadius: "14px",
          paddingInline: "12px",
          paddingBlock: "8px",
          fontSize: "16px",
          borderColor: "hsl(var(--input))",
          boxShadow: "none",
        },
      }}
    />
  );
};

export default AddressInput;
