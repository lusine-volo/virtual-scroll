import { createFeature, createReducer, createSelector } from "@ngrx/store";
import { immerOn } from "ngrx-immer/store";

import { initialCountryState } from "../states/country.state";
import { CountryActions } from "../actions/country.actions";

export const countryReducer = createReducer(
  initialCountryState,
  immerOn(
    CountryActions.loadData, (state, { params }) => {
      state.loading = true;
      state.searchQuery = params.query;
      state.currentPage = params.end;
    }),

  immerOn(
    CountryActions.search, (state) => {
      state.currentPage = 1;
    }),

  immerOn(
    CountryActions.loadDataSuccess, (state, { data }) => {
      state.countryList = data;
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
    selectItemParePage
  }) => ({
    selectVisibleItemst: createSelector(
      selectCountryList,
      selectCurrentPage,
      selectItemParePage,
      (countryList, currentPage, itemParePage) => {
        return [...countryList].slice(0, (currentPage + 1) * itemParePage);
      }

    ),
  }),
});