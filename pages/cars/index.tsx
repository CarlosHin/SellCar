import React, { useEffect, useState } from "react";
import CarList from "../../components/CarList";
import { Box, Stack, Heading } from "@chakra-ui/react";
import BrandFilter from "../../components/BrandFilter";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
  }).then((res) => res.json());

const Cars = () => {
  const [data, setData] = useState(null);
  const [brand, setBrand] = useState("All");


  async function fetchData() {
    const url = brand ? `/api/cars?brand=${brand}` : `/api/myCars`
    const response = await fetcher(url);
    setData(response);
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line 
  }, [brand]);

  const filterBrand = async (brand: string) => {
    setBrand(brand);
  }

  return (
    <Box w="full" p={10}>
      <BrandFilter selectedFilter={brand} filterBrand={filterBrand} />
      <Heading mt={2} mb={4}>All cars</Heading>
      {!data?.error && <CarList data={data} />}
    </Box>
  );
};

export default Cars;
