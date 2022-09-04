import React from "react";
import {
    Box,
    Heading,
    Img,
    Text,
    Badge,
    Stack,
    Flex,
    WrapItem,
    Wrap,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
const URL = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL;

const CarCard = ({ car }) => {
    const router = useRouter();

    return (<Stack
        key={car.id}
        border="1px solid gray"
        p={4}
        borderRadius="4px"
        justifyContent="space-between"
        onClick={() => {
            router.push(`${URL}/cars/${car.id}`)
        }}
        cursor="pointer"
    >
        <Stack>
            <Flex align="start" justifyContent="space-between">
                <Stack mr={1} >
                    <Heading fontSize={{ base: "16px", md: "20px" }} mr={2}>
                        {`${car.brand}`}
                    </Heading>
                    <Text
                        fontSize={{ base: "12px", md: "16px" }}
                        lineHeight="100%"
                        mt="1px !important"
                    >{` ${car.model}`}</Text>
                </Stack>
                <Badge
                    variant="outline"
                    colorScheme="green"
                    w="fit-content"
                    alignSelf="start"
                    justifySelf="end"
                    p={1}
                >
                    {Intl.NumberFormat("es-ES").format(car.price)}$
                </Badge>
            </Flex>

            <Img src={car.image} h="fit-content" borderRadius="8px" />
            <Wrap spacing={1} >
                <WrapItem>
                    <Badge fontSize="10px">
                        {car.year}
                    </Badge>
                </WrapItem>
                <WrapItem>
                    <Badge fontSize="10px" >
                        {car.cv} CV
                    </Badge>
                </WrapItem>
                <WrapItem>
                    <Badge fontSize="10px" >
                        {car.fuelType}
                    </Badge>
                </WrapItem>
                <WrapItem>
                    <Badge fontSize="10px">
                        {car.km} KM
                    </Badge>
                </WrapItem>
            </Wrap>
            <Box pt={2} pb={2} pr={4} pl={4}>
                <Text maxH="100px" overflow="scroll">
                    {car.description}
                </Text>
            </Box>
        </Stack>

    </Stack >
    );
}

export default CarCard;