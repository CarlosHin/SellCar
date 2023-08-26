import React from "react";
import {
    Box,
    Heading,
    Img,
    Text,
    Badge,
    Stack,
    WrapItem,
    Wrap,
} from "@chakra-ui/react";

const CarDetails = ({ car }) => {
    const src = car.image.includes("http") ?
        car.image :
        `https://hplhhgpsejrueiebrxac.supabase.co/storage/v1/object/public/${car.image}`;
    return (
        <Stack p={{ mobile: 0, md: 4 }} direction={{ base: "column", md: "row" }} spacing={8} align="start" justifyContent="space-between">
            <Stack w="full">
                <Stack direction="row" spacing={4} justifyContent="space-between">
                    <Box >
                        <Heading fontSize={{ base: "25px", md: "30px" }} mr={2}>
                            {`${car.brand}`}
                        </Heading>
                        <Text
                            fontSize={{ base: "16px", md: "20px" }}
                            lineHeight="100%"
                            mt="1px !important"
                        >{` ${car.model}`}</Text>
                    </Box>
                    <Badge
                        variant="outline"
                        colorScheme="green"
                        w="fit-content"
                        alignSelf="start"
                        justifySelf="end"
                        p={2}
                        fontSize="25px"
                        borderRadius={4}
                    >
                        {Intl.NumberFormat("es-ES").format(car.price)}$
                    </Badge>
                </Stack>
                <Wrap spacing={4} pt={4} >
                    <WrapItem>
                        <Badge fontSize="15px">
                            {car.year}
                        </Badge>
                    </WrapItem>
                    <WrapItem>
                        <Badge fontSize="15px" >
                            {car.cv} CV
                        </Badge>
                    </WrapItem>
                    <WrapItem>
                        <Badge fontSize="15px" >
                            {car.fuelType}
                        </Badge>
                    </WrapItem>
                    <WrapItem>
                        <Badge fontSize="15px">
                            {car.km} KM
                        </Badge>
                    </WrapItem>
                </Wrap>
                <Box pt={2} pb={2} >
                    <Text>{car.description}</Text>
                </Box>
            </Stack>
            <Img src={src} w="fit-content" alignSelf="center" maxH={{ mad: "50vh" }} maxW={{ md: "50%" }} borderRadius="8px" />

        </Stack>

    )
};

export default CarDetails;