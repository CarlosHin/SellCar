import React from "react";
import {
  SimpleGrid,
  useBreakpointValue,
  Stack,
  Skeleton,
  SkeletonText,
  Box,
  Text,
} from "@chakra-ui/react";
import CarCard from "./CarCard";


export default function CarList({ data }) {
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, xl: 4 });

  return (
    <>

      <SimpleGrid columns={columns} spacing={10}>
        {!data &&
          [1, 2, 3, 4, 5, 6].map((i) => (
            <Stack padding="6" boxShadow="lg" bg="white" key={i}>
              <SkeletonText noOfLines={1} w="50%" mb={4} />
              <Skeleton h="100px" w="full" borderRadius={4} />
              <SkeletonText my={4} noOfLines={4} spacing="4" />
              <Skeleton mt={8} noOfLines={1} w="20%" alignSelf="end" h="20px" />
            </Stack>
          ))}
        {data?.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </SimpleGrid>
    </>
  );
}
