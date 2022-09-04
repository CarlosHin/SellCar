import { Box, Input, InputProps, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface InputControllerProps {
  name: string;
  placeholder: string;
  control: any;
  inputProps?: Partial<InputProps>;
  required?: boolean;
  errors?: any;
}

export default function InputController({
  name,
  placeholder,
  control,
  inputProps,
  required = false,
  errors,
}: InputControllerProps) {
  const [error, setError] = useState(false);
  useEffect(() => {
    errors && errors[name] && setError(true);
  }, [errors, name])

  return (
    <Box >
      <Text textTransform="capitalize" mb={2}>{name}</Text>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          < Input placeholder={placeholder} mb={2} {...field} {...inputProps} borderColor={error ? "red" : "inherit"} />
        )}
      />
    </Box>
  );
}
