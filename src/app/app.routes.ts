import { Routes } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { HomeComponent } from './pages/home/home.component';
import { countryFeature } from './store/features/country.feature';
import * as CountryEffects from './store/effects/country.effects';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', 
        component: HomeComponent,
        providers: [
            provideEffects([CountryEffects]),
            provideState(countryFeature),
          ],
     },
];
