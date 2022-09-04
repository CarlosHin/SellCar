import { Input, InputProps } from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

interface InputControllerProps {
  name:string;
  placeholder: string;
  control :any;
  inputProps?: Partial<InputProps>;
  required?:boolean;
}

export default function InputController({
  name,
  placeholder,
  control,
  inputProps,
  required = false,
}:InputControllerProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <Input placeholder={placeholder} mb={2} {...field} {...inputProps} />
      )}
    />
  );
}
