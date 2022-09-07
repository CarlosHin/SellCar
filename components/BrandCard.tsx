import React from "react";
import { Box, Text, TextProps } from "@chakra-ui/react";

const BrandCard = ({ image, name, onClick, textProps, selectedFilter }: {
    image: string;
    name: string;
    onClick: Function;
    textProps?: Partial<TextProps>;
    selectedFilter?: string;
}) => {

    return (
        <Box
            mt={2}
            mb={2}
            bg={image}
            minW="150px"
            h="100px"
            backgroundSize="contain"
            borderRadius="10px"
            display="inline-grid"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            cursor="pointer"
            onClick={() => onClick(name)}
            sx={{
                transition: "all 0.1s ease-out"
            }}
            {...(selectedFilter === name ? { filter: "opacity(1)", transform: "scale(1.05)" } : { filter: "opacity(0.6)" })}
        >
            <Text
                p={2}
                mt={2}
                mr={2}
                fontSize="10px"
                bgColor="white"
                mixBlendMode="screen"
                justifySelf="end"
                alignSelf="start"
                fontWeight={600}
                borderRadius="8px"
                {...textProps}
            >
                {name}
            </Text>
        </Box>
    );
};

export default BrandCard;
