import React from "react";
import { Stack } from "@chakra-ui/react";
import BrandCard from "./BrandCard";


const BrandFilter = ({ filterBrand, selectedFilter }: {
    filterBrand: Function;
    selectedFilter?: string;
}) => {
    return (
        <Stack w="full" direction="row" overflowX="scroll" p={{ base: 2, md: 8 }} alignItems="center">
            <BrandCard
                image={`url(/assets/images/brands/logos.png)`}
                name="All"
                onClick={filterBrand}
                selectedFilter={selectedFilter}
            />
            <BrandCard
                image={`url(/assets/images/brands/peugeot.png)`}
                name="Peugeot"
                onClick={filterBrand}
                selectedFilter={selectedFilter}
            />
            <BrandCard
                image={`url(/assets/images/brands/mercedes.png)`}
                name="Mercedes"
                onClick={filterBrand}
                selectedFilter={selectedFilter}
            />
            <BrandCard
                image={`url(/assets/images/brands/ford.png)`}
                name="Ford" onClick={filterBrand}
                selectedFilter={selectedFilter}
            />
            <BrandCard
                image={`url(/assets/images/brands/lamborghini.png)`}
                name="Lamborghini"
                onClick={filterBrand}
                selectedFilter={selectedFilter}
            />
            <BrandCard
                image={`url(/assets/images/brands/tesla.png)`}
                name="Tesla"
                onClick={filterBrand}
                selectedFilter={selectedFilter}
            />
            <BrandCard
                image={`url(/assets/images/brands/astonmartin.png)`}
                name="Aston Martin"
                onClick={filterBrand}
                selectedFilter={selectedFilter}
            />
            <BrandCard
                image={`url(/assets/images/brands/dacia.png)`}
                name="Dacia"
                onClick={filterBrand}
                selectedFilter={selectedFilter}
                textProps={{ bgColor: "black", color: "white", mixBlendMode: "inherit" }}
            />
        </Stack>
    );
};

export default BrandFilter;
