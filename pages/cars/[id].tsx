import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import useSWR from "swr";
import { useRouter } from 'next/router'
import CarDetails from "../../components/CarDetails";

const fetcher = (url, token) =>
    fetch(url, {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json", token }),
        credentials: "same-origin",
    }).then((res) => res.json());

const Car = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR([`/api/cars/${id}`, null], fetcher);
    return (
        <Box w="full" p={{ base: 4, md: 10 }}>
            {data?.id && <CarDetails car={data} />}
        </Box>
    );
};

export default Car;
