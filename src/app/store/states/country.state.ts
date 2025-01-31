import { Country } from "../../shared/interfaces";

export type CountryState = {
    countryList: Country[];
    searchQuery: string;
    currentPage: number;
    itemParePage: number;
    loading: boolean;
  };
  
  export const initialCountryState: CountryState = {
    countryList: [],
    searchQuery: '',
    currentPage: 1,
    itemParePage: 30,
    loading: false,
  };