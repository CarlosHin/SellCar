import CarList from "../components/CarList";
import { Box, Heading } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BrandFilter from "../components/BrandFilter";

const URL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

const MyCars = () => {
  const { user, session } = Auth.useUser();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [brand, setBrand] = useState("All");

  useEffect(() => {
    !user && router.push(URL);
  }, [user, router]);


  async function fetchData() {
    const url = brand ? `/api/myCars?brand=${brand}` : `/api/myCars`
    const response = await fetcher(url, session.access_token);
    setData(response);
  }
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line 
  }, [brand]);

  const filterBrand = async (brand: string) => {
    setData(null)
    setBrand(brand);
  }

  return (
    <Box w="full" p={10}>
      <BrandFilter selectedFilter={brand} filterBrand={filterBrand} />
      <Heading mb={4}>My cars</Heading>
      {!data?.error && <CarList data={data} />}
    </Box>
  );
};

export default MyCars;
