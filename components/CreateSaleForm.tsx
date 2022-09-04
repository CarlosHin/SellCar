import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputController from "./InputController";
import React from "react";
const URL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

const postFetcher = (url, token, body) =>
  fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
    body: JSON.stringify(body),
  }).then((res) => res.json());

export default function CreateCarForm() {
  const router = useRouter();
  const { user, session } = Auth.useUser();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const createCar = async ({ brand, model, image, price, description }) => {
    console.log(brand, model, image);
    const res = await postFetcher("/api/createSale", session?.access_token, {
      brand,
      model,
      price,
      description,
      image,
    });
    console.log("res", res);
    toast({
      title: "Sale created.",
      description: "We've created your sale.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  console.log("errors", errors);

  useEffect(() => {
    // @ts-ignore
    !user && router.push(URL);
  }, [user,router]);

  return (
    <Box>
      <form onSubmit={handleSubmit(createCar)}>
        <InputController
          name="brand"
          control={control}
          placeholder="Brand"
          required
        />
        <InputController
          name="model"
          control={control}
          placeholder="Model"
          required
        />
        <InputController
          name="price"
          control={control}
          placeholder="Price"
          inputProps={{ type: "number" }}
          required
        />
        <InputController
          name="description"
          control={control}
          placeholder="Description"
          required
        />
        <InputController
          name="image"
          control={control}
          placeholder="Image"
          required
        />

        <Button type="submit">Create car</Button>
      </form>
    </Box>
  );
}
