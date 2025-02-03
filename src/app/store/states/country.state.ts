import { Country } from "../../shared/interfaces";

export type CountryState = {
    countryList: Country[];
    searchQuery: string;
    currentPage: number;
    totalCount: number;
    itemParePage: number;
    loading: boolean;
    startSearching: boolean;
    suggestionList: string[];
  };
  
  export const initialCountryState: CountryState = {
    countryList: [],
    searchQuery: '',
    currentPage: 1,
    totalCount: 0,
    itemParePage: 30,
    loading: false,
    startSearching: false,
    suggestionList: [],
  };