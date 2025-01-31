import { CountryName } from "./country-name.interface";

export interface Country {
    name: CountryName;
    independent: boolean;
    capital: string[];
    region: string;
}