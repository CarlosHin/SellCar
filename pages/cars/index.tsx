import React from "react";
import CarList from "../../components/CarList";
import { Box, Heading } from "@chakra-ui/react";
import useSWR from "swr";

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

const Cars = () => {
  const { data, error } = useSWR(["/api/cars", null], fetcher);

  return (
    <Box w="full" p={10}>
      <Heading mb={4}>All cars</Heading>
      {!data?.error && <CarList data={data} />}
    </Box>
  );
};

export default Cars;
