import { createFeature, createReducer, createSelector } from "@ngrx/store";
import { immerOn } from "ngrx-immer/store";

import { initialCountryState } from "../states/country.state";
import { CountryActions } from "../actions/country.actions";

export const countryReducer = createReducer(
  initialCountryState,
  immerOn(
    CountryActions.loadData, (state, { params }) => {
      state.loading = true;
      state.currentPage = params.end;
    }),

  immerOn(
    CountryActions.addSuggestion, (state, { params }) => {
      state.searchQuery = params.query;
      const suggestionList = state.suggestionList;
      const addListItem = params.query && !suggestionList.includes(params.query);
      state.suggestionList = addListItem ? [...suggestionList, params.query] : [...suggestionList];
    }),

  immerOn(
    CountryActions.search, (state) => {
      state.currentPage = 1;
      state.startSearching = true;
    }),

  immerOn(
    CountryActions.loadDataSuccess, (state, { data, totalCount }) => {
      state.countryList = data;
      state.totalCount = totalCount;
      state.loading = false;
    }),

  immerOn(
    CountryActions.loadMore, (state, { params }) => {
      state.currentPage = params.end;
    }),

  immerOn(
    CountryActions.loadDataError,
    (state) => {
      state.loading = false;
    }
  ),
);

export const countryFeature = createFeature({
  name: 'Country',
  reducer: countryReducer,
  extraSelectors: ({
    selectCountryList,
    selectCurrentPage,
    selectItemParePage,
    selectSearchQuery,
    selectSuggestionList
  }) => ({
    selectVisibleItemst: createSelector(
      selectCountryList,
      selectCurrentPage,
      selectItemParePage,
      (countryList, currentPage, itemParePage) => {
        return [...countryList].slice(0, currentPage * itemParePage);
      }
    ),
    selectSuggestionQueries: createSelector(
      selectSearchQuery,
      selectSuggestionList,
      (searchQuery, suggestionList) => {
        return [...suggestionList].filter(item => item.includes(searchQuery.toLocaleLowerCase()));
      }
    ),
  }),
});