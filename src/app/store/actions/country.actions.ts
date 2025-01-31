import { createActionGroup, props } from "@ngrx/store";

import { Country } from "../../shared/interfaces";
import { Params } from "../../shared/params.type";

export const CountryActions = createActionGroup({
    source: 'Country',
    events: {
        'Load Data': props<{ params: Params }>(),
        'Load Data Success': props<{ data: Country[] }>(),
        'Load Data Error': props<{ errorMsg: string }>(),

        'Search': props<{ params: Params }>(),

        'Load More': props<{ params: Params }>(),

    },
});