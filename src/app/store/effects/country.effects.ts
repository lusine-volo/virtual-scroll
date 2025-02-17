import { inject } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from "rxjs";

import { CountryService } from "../../shared/services/country.service";
import { CountryActions } from "../actions/country.actions";

export const loadData$ = createEffect(
    (
        actions = inject(Actions),
        countryService = inject(CountryService)
    ) => {
        return actions.pipe(
            ofType(CountryActions.loadData),
            switchMap(({ params }) =>
                countryService.loadData(params).pipe(
                    map((res) => CountryActions.loadDataSuccess(res)),
                    catchError((error) => of(CountryActions.loadDataSuccess({data: [], totalCount: 0, success: true})))
                )
            )
        );
    },
    { functional: true }
);

export const search$ = createEffect(
    (
        actions = inject(Actions),
    ) => {
        return actions.pipe(
            ofType(CountryActions.search),
            debounceTime(700),
            distinctUntilChanged(),
            map(({ params }) => CountryActions.addSuggestion({ params }))
        );
    },
    { functional: true }
);

export const addSuggestion$ = createEffect(
    (
        actions = inject(Actions),
    ) => {
        return actions.pipe(
            ofType(CountryActions.addSuggestion),
            map(({ params }) => CountryActions.loadData({ params }))
        );
    },
    { functional: true }
);

