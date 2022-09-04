export interface Car {
    brand: string;
    model: string;
    price: number;
    description: string;
    image: string;
    userId:string;
    fuelType?:FuelType;
    cv?:number;
    year?:number;
    km?:number;
}

export type FuelType = {
    Gasoline: "Gasoline";
    Diesel: "Diesel";
    Electric: "Electric";
    Hybrid: "Hybrid";

}