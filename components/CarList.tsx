import React from "react";
import {
  SimpleGrid,
  Box,
  Heading,
  Img,
  useBreakpointValue,
  Text,
  Badge,
  Stack,
  Skeleton,
  SkeletonText,
  Flex,
} from "@chakra-ui/react";

const CarCard = ({ car }) => (
  <Stack
    key={car.id}
    border="1px solid gray"
    p={4}
    borderRadius="4px"
    justifyContent="space-between"
  >
    <Stack>
      <Flex align="end">
        <Heading fontSize={{ base: "16px", md: "20px" }} mr={2}>
          {`${car.brand}`}
        </Heading>
        <Heading
          fontSize={{ base: "12px", md: "16px" }}
        >{` ${car.model}`}</Heading>
      </Flex>
      <Img src={car.image} h="200px" borderRadius="8px" />
      <Box pt={2} pb={2} pr={4} pl={4}>
        <Text maxH="100px" overflow="scroll">
          {car.description}
        </Text>
      </Box>
    </Stack>
    <Badge
      variant="outline"
      colorScheme="green"
      w="fit-content"
      alignSelf="end"
      justifySelf="end"
      p={1}
    >
      {Intl.NumberFormat("es-ES").format(car.price)}$
    </Badge>
  </Stack>
);
export default function CarList({ data }) {
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, xl: 4 });

  return (
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
  );
}
