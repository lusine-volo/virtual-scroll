import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { Country } from '../interfaces';
import { Params } from '../params.type';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private readonly store = inject(Store);
  private baseUrl ='https://restcountries.com/v3.1';

  loadData(params: Params) : Observable<Country[]> {
    const { query } = params;
    const url = `${this.baseUrl}/${query ? `name/${query}` : 'all'}`;
    return this.http.get<Country[]>(url);
  }

}
