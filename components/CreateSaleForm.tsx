import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Button, Center, Heading, Stack, useToast, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputController from "./InputController";
import React from "react";
import { supabase } from "../lib/initSupabase";

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
  const [fuelType, setFuelType] = useState("diesel");
  const [media, setMedia] = useState("diesel");
  const toast = useToast();
  const onChangeImage = (e) => {
    setMedia(e.target.files[0])
  }
  const createCar = async ({ brand, model, price, description, cv, year, km }) => {
    let image = "";
    if (media) {

      const response = await supabase
        .storage
        .from('cars')
        .upload(`image_${brand}_${model}_${Date.now()}.png`, media, {
          cacheControl: '3600',
          upsert: false
        })
      image = response?.data?.Key || "";
    }
    const newCar = {
      brand,
      model,
      price,
      description,
      image,
      cv,
      year,
      fuelType,
      km
    }
    const res = await postFetcher("/api/createSale", session?.access_token, newCar);
    if (res.error) {
      toast({
        title: "Error",
        description: "Error creating your sale.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Sale created.",
        description: "We've created your sale.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };


  useEffect(() => {
    // @ts-ignore
    !user && router.push(URL);
  }, [user, router]);

  return (
    <Center>
      <Box maxW="500px" p={4} bg="#f0eeee" borderRadius={8}>
        <Heading mb={10}>Poner coche en venta</Heading>
        <form onSubmit={handleSubmit(createCar)}>
          <Stack direction="row" spacing={2}>
            <Box >
              <InputController
                name="brand"
                control={control}
                placeholder="Brand"
                required
                errors={errors}
              />
            </Box>
            <Box >
              <InputController
                name="model"
                control={control}
                placeholder="Model"
                required
                errors={errors}
              />
            </Box>
          </Stack>
          <Select placeholder='Diesel' onChange={(e) => setFuelType(e.target.value || "diesel")}>
            <option value='gasoline'>Gasoline</option>
            <option value='electric'>Electric</option>
          </Select>
          <Stack spacing={2}>

            <InputController
              name="price"
              control={control}
              placeholder="Price"
              inputProps={{ type: "number", maxW: "200px" }}
              required
              errors={errors}
            />
            <InputController
              name="description"
              control={control}
              placeholder="Description"
              required
              errors={errors}
            />
            <input type="file" onChange={onChangeImage} />
          </Stack>

          <Stack direction="row" spacing={2}>
            <InputController
              name="km"
              control={control}
              placeholder="Kms"
              required
              errors={errors}
            />
            <InputController
              name="cv"
              control={control}
              placeholder="CV"
              required
              errors={errors}
            />
            <InputController
              name="year"
              control={control}
              placeholder="Year"
              required
              errors={errors}
            />
          </Stack>

          <Button type="submit">Create car</Button>
        </form>
      </Box>
    </Center>

  );
}
