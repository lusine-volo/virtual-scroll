import { createActionGroup, props } from "@ngrx/store";

import { Country, HttpSuccessResponse } from "../../shared/interfaces";
import { Params } from "../../shared/params.type";

export const CountryActions = createActionGroup({
    source: 'Country',
    events: {
        'Load Data': props<{ params: Params }>(),
        'Load Data Success': props<HttpSuccessResponse<Country>>(),
        'Load Data Error': props<{ errorMsg: string }>(),

        'Search': props<{ params: Params }>(),

        'Add Suggestion': props<{ params: Params }>(),

        'Load More': props<{ params: Params }>(),

    },
});